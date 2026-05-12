import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthApiService } from "../services/auth/auth-api.service";
import { AuthService } from "../services/auth/auth.service";
import { UserLocalstorageService } from "../services/user/user-localstorage.service";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  private readonly clientPlatform = Capacitor.getPlatform();
  private readonly clientFamily =
    environment.auth?.clientFamily || "trainfit-front";
  private readonly clientVersion = environment.APP_VERSION || "";

  constructor(
    private authService: AuthService,
    private userLocalstorageService: UserLocalstorageService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const requestWithClientHeader = request.clone({
      setHeaders: {
        "x-client-platform": this.clientPlatform,
        "x-client-family": this.clientFamily,
        "x-client-version": this.clientVersion,
      },
    });

    const token = this.getTokenFromLocalStorage();
    const isUsersCreateEndpoint =
      requestWithClientHeader.method === "POST" &&
      /\/users\/?$/.test(requestWithClientHeader.url);
    const isPublicHashCheckEndpoint =
      requestWithClientHeader.method === "GET" &&
      requestWithClientHeader.url.includes("/users/hash/");

    // Public endpoints that don't require authentication
    const isPublicEndpoint =
      requestWithClientHeader.url.includes(AuthApiService.AUTHORIZATION_TOKEN_ENDPOINT) || // sign-in
      requestWithClientHeader.url.includes(AuthApiService.REFRESH_ENDPOINT) || // refresh token
      requestWithClientHeader.url.includes(AuthApiService.LOGOUT_ENDPOINT) || // logout
      requestWithClientHeader.url.includes(AuthApiService.VERIFY_GOOGLE_ENDPOINT) || // google auth
      requestWithClientHeader.url.includes(AuthApiService.VERIFY_APPLE_ENDPOINT) || // apple auth
      requestWithClientHeader.url.includes(AuthApiService.SOCIAL_REGISTER_ENDPOINT) || // social register
      requestWithClientHeader.url.includes(AuthApiService.ACTIVATE_ENDPOINT) || // account activation
      requestWithClientHeader.url.includes("/users/check/") || // check if email exists
      requestWithClientHeader.url.includes("/users/send/mail/code") || // forgot password - send code
      isPublicHashCheckEndpoint || // email verification
      isUsersCreateEndpoint;

    // Decide whether to send cookies (withCredentials) on this request
    // TODOS los endpoints de auth necesitan withCredentials:
    // - sign-in: para RECIBIR y guardar la cookie httpOnly
    // - refresh-token: para ENVIAR la cookie httpOnly
    // - logout: para ENVIAR la cookie httpOnly y que el servidor la borre
    // Solo excluimos endpoints que no necesitan cookies en absoluto
    const excludeCookieEndpoints =
      requestWithClientHeader.url.includes(AuthApiService.REGISTER_ENDPOINT) &&
      requestWithClientHeader.method === "PUT"; // create/update user API uses PUT here

    const reqWithCreds = excludeCookieEndpoints
      ? requestWithClientHeader
      : requestWithClientHeader.clone({ withCredentials: true });

    // Public endpoints: no token header, but may still send cookies depending on endpoint
    if (isPublicEndpoint) {
      return next.handle(reqWithCreds);
    }

    // Protected endpoints: add token if available and handle 401 errors.
    // IMPORTANT: Even if there's no token in localStorage (e.g. iOS WKWebView
    // purged it from memory after >15 min in background), we MUST still attach
    // the catchError handler so that the 401 response triggers the refresh flow.
    // Without catchError here, the 401 would skip the interceptor and go directly
    // to the subscriber, which calls logout() instead of attempting a token refresh.
    if (token) {
      const authReq = reqWithCreds.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return next
        .handle(authReq)
        .pipe(
          catchError((error: HttpErrorResponse) =>
            this.handleError(error, request, next),
          ),
        );
    }

    // No token in localStorage but protected endpoint:
    // Still attach catchError so a 401 can trigger the refresh-token flow.
    // The refresh token cookie might still be valid even if localStorage was cleared.
    return next
      .handle(reqWithCreds)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError(error, request, next),
        ),
      );
  }

  private getTokenFromLocalStorage(): string | null {
    return this.userLocalstorageService.getAccessToken();
  }

  private cloneRequestWithTokenAuthorization(
    request: HttpRequest<unknown>,
    token: string,
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleError(
    err: HttpErrorResponse,
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (err.status === 401) {
      if (this.requiresRelogin(err)) {
        console.warn("[AUTH] Refresh flow requires re-login", {
          reason: err?.error?.message || err?.message || "requiresRelogin",
          url: request.url,
        });
        this.authService.logout();
        return throwError(() => err);
      }

      if (this.isRefreshing) {
        return this.refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => {
            if (token === "FAILED") return throwError(() => err);
            return this.intercept(
              this.cloneRequestWithToken(request, token),
              next,
            );
          }),
        );
      }

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          const newToken = response.access_token;
          this.userLocalstorageService.setUserToken({ access_token: newToken });
          this.refreshTokenSubject.next(newToken);
          return this.intercept(
            this.cloneRequestWithToken(request, newToken),
            next,
          );
        }),
        catchError((refreshErr) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next("FAILED");
          console.warn("[AUTH] Refresh request failed", {
            reason:
              refreshErr?.error?.message ||
              refreshErr?.message ||
              "unknown",
            status: refreshErr?.status,
            requiresRelogin: this.requiresRelogin(refreshErr),
          });

          // Logout only when backend explicitly requests re-login.
          // Network errors or transient backend failures should not force logout.
          if (this.requiresRelogin(refreshErr)) {
            this.authService.logout();
          }

          return throwError(() => refreshErr);
        }),
      );
    }

    return throwError(() => err);
  }

  private requiresRelogin(error: any): boolean {
    return !!(error?.error?.requiresRelogin || error?.requiresRelogin);
  }

  private cloneRequestWithToken(
    req: HttpRequest<unknown>,
    token: string,
  ): HttpRequest<unknown> {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  }
}
