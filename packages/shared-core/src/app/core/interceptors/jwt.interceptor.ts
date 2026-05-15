import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthApiService } from "../services/auth/auth-api.service";
import { AuthService } from "../services/auth/auth.service";

const AUTH_RETRY_ATTEMPTED = new HttpContextToken<boolean>(() => false);

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private readonly clientPlatform = Capacitor.getPlatform();
  private readonly clientFamily =
    environment.auth?.clientFamily || "trainfit-front";

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const baseRequest = request.clone({
      setHeaders: {
        "x-client-platform": this.clientPlatform,
        "x-client-family": this.clientFamily,
      },
      withCredentials: true,
    });

    if (this.isPublicEndpoint(baseRequest)) {
      return next.handle(baseRequest);
    }

    const token = this.authService.getAccessToken();
    const authRequest = token
      ? this.cloneRequestWithToken(baseRequest, token)
      : baseRequest;

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) =>
        this.handleAuthError(error, baseRequest, next),
      ),
    );
  }

  private isPublicEndpoint(request: HttpRequest<unknown>): boolean {
    const isUsersCreateEndpoint =
      request.method === "POST" && /\/users\/?$/.test(request.url);
    const isPublicHashCheckEndpoint =
      request.method === "GET" && request.url.includes("/users/hash/");

    return (
      request.url.includes(AuthApiService.AUTHORIZATION_TOKEN_ENDPOINT) ||
      request.url.includes(AuthApiService.REFRESH_ENDPOINT) ||
      request.url.includes(AuthApiService.LOGOUT_ENDPOINT) ||
      request.url.includes(AuthApiService.VERIFY_GOOGLE_ENDPOINT) ||
      request.url.includes(AuthApiService.VERIFY_APPLE_ENDPOINT) ||
      request.url.includes(AuthApiService.SOCIAL_REGISTER_ENDPOINT) ||
      request.url.includes(AuthApiService.ACTIVATE_ENDPOINT) ||
      request.url.includes("/users/check/") ||
      request.url.includes("/users/send/mail/code") ||
      isPublicHashCheckEndpoint ||
      isUsersCreateEndpoint
    );
  }

  private handleAuthError(
    err: HttpErrorResponse,
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (err.status !== 401) {
      return throwError(() => err);
    }

    if (this.authService.isTerminalAuthError(err)) {
      this.authService.logout();
      return throwError(() => err);
    }

    if (request.context.get(AUTH_RETRY_ATTEMPTED)) {
      return throwError(() => err);
    }

    return this.authService.refreshToken().pipe(
      switchMap((response: any) => {
        const newToken = response?.access_token || this.authService.getAccessToken();
        if (!newToken) {
          return throwError(() => err);
        }

        return next.handle(this.cloneRequestWithToken(request, newToken, true));
      }),
      catchError((refreshErr) => {
        if (this.authService.isTerminalAuthError(refreshErr)) {
          this.authService.logout();
        }
        return throwError(() => refreshErr);
      }),
    );
  }

  private cloneRequestWithToken(
    req: HttpRequest<unknown>,
    token: string,
    markRetry = false,
  ): HttpRequest<unknown> {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      withCredentials: true,
      context: markRetry ? req.context.set(AUTH_RETRY_ATTEMPTED, true) : req.context,
    });
  }
}
