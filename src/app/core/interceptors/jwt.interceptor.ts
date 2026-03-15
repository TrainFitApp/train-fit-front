import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthApiService } from '../services/auth/auth-api.service';
import { AuthService } from '../services/auth/auth.service';
import { UserLocalstorageService } from '../services/user/user-localstorage.service';
import { Token } from '../models/token';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    private userLocalstorageService: UserLocalstorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.getTokenFromLocalStorage();

    // Public endpoints that don't require authentication
    const isPublicEndpoint =
      request.url.includes(AuthApiService.AUTHORIZATION_TOKEN_ENDPOINT) || // sign-in
      request.url.includes('refresh-token') || // refresh token
      request.url.includes('logout') || // logout
      request.url.includes('/users/check/') || // check if email exists
      request.url.includes('/users/send/mail/code') || // forgot password - send code
      request.url.includes('/users/auth/verify-google') || // google auth
      request.url.includes('/users/auth/verify-apple') || // apple auth
      (request.url.includes('/users/') &&
        request.method === 'POST' &&
        !request.url.includes('/favProduct') &&
        !request.url.includes('/favRecipe') &&
        !request.url.includes('/users/suggestions')) || // POST endpoints for user creation (exclude protected ones)
      request.url.includes('/users/hash/') || // email verification
      request.url.includes('/users/restore'); // restore password

    // Decide whether to send cookies (withCredentials) on this request
    // TODOS los endpoints de auth necesitan withCredentials:
    // - sign-in: para RECIBIR y guardar la cookie httpOnly
    // - refresh-token: para ENVIAR la cookie httpOnly
    // - logout: para ENVIAR la cookie httpOnly y que el servidor la borre
    // Solo excluimos endpoints que no necesitan cookies en absoluto
    const excludeCookieEndpoints =
      request.url.includes(AuthApiService.REGISTER_ENDPOINT) &&
      request.method === 'PUT'; // create/update user API uses PUT here

    const reqWithCreds = excludeCookieEndpoints
      ? request
      : request.clone({ withCredentials: true });

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
            this.handleError(error, request, next)
          )
        );
    }

    // No token in localStorage but protected endpoint:
    // Still attach catchError so a 401 can trigger the refresh-token flow.
    // The refresh token cookie might still be valid even if localStorage was cleared.
    return next
      .handle(reqWithCreds)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError(error, request, next)
        )
      );
  }

  private getTokenFromLocalStorage(): string | null {
    const parsedUser = this.userLocalstorageService.getUserToken();
    return parsedUser
      ? parsedUser[UserLocalstorageService.ACCESS_TOKEN_KEY]
      : null;
  }

  private cloneRequestWithTokenAuthorization(
    request: HttpRequest<unknown>,
    token: string
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
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (err.status === 401) {
      if (err.error?.requiresRelogin) {
        this.authService.logout();
        return throwError(() => err);
      }

      if (this.isRefreshing) {
        return this.refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => {
            if (token === 'FAILED') return throwError(() => err);
            return this.intercept(
              this.cloneRequestWithToken(request, token),
              next
            );
          })
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
            next
          );
        }),
        catchError((refreshErr) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next('FAILED');
          this.authService.logout();
          return throwError(() => refreshErr);
        })
      );
    }

    if (err.status === 403) {
      this.authService.logout();
    }

    return throwError(() => err);
  }

  private cloneRequestWithToken(
    req: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  }
}
