import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthApiService } from '../services/auth/auth-api.service';
import { AuthService } from '../services/auth/auth.service';
import { MaintenanceModalService } from '../services/maintenance/maintenance-modal.service';
import { RemoteConfigMaintenanceStatus } from '../models/remote-config-status';
import { IonicUtilService } from '../services/util/ionic-util.service';

// 2026-09 — códigos de error que el backend ya devuelve con un mensaje
// pensado para enseñárselo tal cual al usuario (ver
// table-access.js#rejectIfAssignedTableLockedForOwner). Antes cada punto de
// mutación tenía que acordarse de capturar el 403 y mostrarlo — bastaba con
// olvidar uno (pasó de verdad: current-workout dejaba el error sin
// manejar, "Uncaught (in promise)" en consola) para que el cliente se
// quedara sin saber qué pasó. Un solo sitio, para cualquier endpoint,
// presente o futuro.
const SELF_EXPLANATORY_ERROR_CODES = new Set(['TABLE_ASSIGNED_BY_TRAINER']);

/**
 * Context token that marks a request as already having been retried after
 * a 401. Prevents infinite retry loops.
 */
const AUTH_RETRY_ATTEMPTED = new HttpContextToken<boolean>(() => false);

/**
 * JWTInterceptor — HTTP Interceptor with Semaphore Queue
 *
 * Handles token injection and automatic refresh on 401 responses.
 *
 * ── Semaphore / Queue pattern ──────────────────────────────────────────────
 *
 *  • `isRefreshing` — boolean flag that becomes true the moment the first
 *    401 is caught and a refresh call is in progress.
 *
 *  • `refreshToken$` — BehaviorSubject<string | null> that acts as a queue:
 *      - Starts as null.
 *      - While a refresh is in progress subsequent 401 requests subscribe to
 *        this subject and **pause** via `filter(token => token !== null)` +
 *        `take(1)`.  They will not proceed until the subject emits a value.
 *      - Once the new token arrives the subject emits it, all waiting
 *        requests resume simultaneously with the fresh token.
 *
 *  • If the refresh call itself fails with a terminal error, `logout()` is
 *    called.  In all failure cases the subject emits null, queued requests
 *    are unblocked and receive the original 401 error.
 */
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private readonly clientPlatform = Capacitor.getPlatform();
  private readonly clientFamily =
    environment.auth?.clientFamily ?? 'trainfit-front';

  // ─── Semaphore state ──────────────────────────────────────────────────────

  /** True while a refresh call is in-flight. */
  private isRefreshing = false;

  /**
   * Queue subject.
   * Emits null when idle or when a refresh fails; emits the new access
   * token string when a refresh succeeds, unblocking all queued requests.
   */
  private refreshToken$ = new BehaviorSubject<string | null>(null);

  private maintenanceModal: MaintenanceModalService | null = null;
  private ionicUtilService: IonicUtilService | null = null;

  constructor(
    private authService: AuthService,
    private injector: Injector,
  ) {}

  // ─── Intercept ────────────────────────────────────────────────────────────

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Always attach platform headers.
    const baseRequest = request.clone({
      setHeaders: {
        'x-client-platform': this.clientPlatform,
        'x-client-family': this.clientFamily,
      },
      withCredentials: true,
    });

    // Public endpoints bypass auth header injection and 401 handling.
    if (this.isPublicEndpoint(baseRequest)) {
      return next.handle(baseRequest);
    }

    // Attach the current in-memory access token if available.
    const token = this.authService.getAccessToken();
    const authRequest = token
      ? this.addAuthorizationHeader(baseRequest, token)
      : baseRequest;

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) =>
        this.handleError(error, baseRequest, next),
      ),
    );
  }

  // ─── Error Handler ────────────────────────────────────────────────────────

  private handleError(
    error: HttpErrorResponse,
    originalRequest: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // 503 with MAINTENANCE_ACTIVE → show maintenance screen.
    if (
      error.status === 503 &&
      error.error?.code === 'MAINTENANCE_ACTIVE'
    ) {
      if (!this.maintenanceModal) {
        this.maintenanceModal = this.injector.get(MaintenanceModalService);
      }
      const maintenance: RemoteConfigMaintenanceStatus = {
        state: 'active',
        message: error.error?.message || '',
      };
      void this.maintenanceModal.presentIfActive(maintenance);
      return throwError(() => error);
    }

    // Errores con mensaje ya pensado para el usuario final (ver
    // SELF_EXPLANATORY_ERROR_CODES arriba) — se muestran aquí, una sola vez,
    // para que ningún punto de mutación necesite acordarse de capturarlos.
    // El error sigue propagándose (throwError) para que la lógica optimista
    // de cada componente revierta su cambio local igual que con cualquier
    // otro fallo.
    if (SELF_EXPLANATORY_ERROR_CODES.has(error.error?.code)) {
      if (!this.ionicUtilService) {
        this.ionicUtilService = this.injector.get(IonicUtilService);
      }
      this.ionicUtilService.showToast({
        message: error.error?.message || 'No se pudo completar la acción.',
        duration: 3500,
      });
      return throwError(() => error);
    }

    // Pass through non-401 errors unchanged.
    if (error.status !== 401) {
      return throwError(() => error);
    }

    // A terminal error means the session is irrecoverable → force logout.
    if (this.authService.isTerminalAuthError(error)) {
      this.authService.logout();
      return throwError(() => error);
    }

    // A request that has already been retried once should not retry again.
    if (originalRequest.context.get(AUTH_RETRY_ATTEMPTED)) {
      this.authService.logout();
      return throwError(() => error);
    }

    // ── Semaphore gate ────────────────────────────────────────────────────
    if (this.isRefreshing) {
      // A refresh is already in flight.
      // Pause this request until the refresh completes (success OR failure).
      // We filter on `!isRefreshing` instead of `token !== null` so that
      // a failed refresh (which emits null) also unblocks queued requests.
      return this.refreshToken$.pipe(
        filter(() => !this.isRefreshing),
        take(1),
        switchMap((newToken) => {
          if (!newToken) {
            // Refresh failed — propagate the original 401 to this request.
            return throwError(() => error);
          }
          return next.handle(this.addAuthorizationHeader(originalRequest, newToken, true));
        }),
      );
    }

    // ── First request to hit 401: start the refresh ───────────────────────
    this.isRefreshing = true;
    this.refreshToken$.next(null); // reset subject so queued requests wait

    return this.authService.refreshToken().pipe(
      switchMap((response: any) => {
        const newToken: string | null =
          response?.access_token ?? this.authService.getAccessToken();

        if (!newToken) {
          this.finalizeRefresh(null);
          return throwError(() => error);
        }

        // Unblock all queued requests with the fresh token.
        this.finalizeRefresh(newToken);

        return next.handle(
          this.addAuthorizationHeader(originalRequest, newToken, true),
        );
      }),
      catchError((refreshError) => {
        // Refresh failed — signal failure to queued requests and logout.
        this.finalizeRefresh(null);

        if (this.authService.isTerminalAuthError(refreshError)) {
          this.authService.logout();
        }

        return throwError(() => refreshError);
      }),
    );
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  /**
   * Called after a refresh attempt (success or failure).
   * Resets the semaphore flag and emits on the queue subject.
   *
   * @param newToken The fresh access token on success, or `null` on failure.
   */
  private finalizeRefresh(newToken: string | null): void {
    this.isRefreshing = false;
    this.refreshToken$.next(newToken);
  }

  /** Clone `req` adding a Bearer Authorization header. */
  private addAuthorizationHeader(
    req: HttpRequest<unknown>,
    token: string,
    markRetry = false,
  ): HttpRequest<unknown> {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      withCredentials: true,
      context: markRetry
        ? req.context.set(AUTH_RETRY_ATTEMPTED, true)
        : req.context,
    });
  }

  /** Returns true for endpoints that never require an Authorization header. */
  private isPublicEndpoint(request: HttpRequest<unknown>): boolean {
    const isUsersCreate =
      request.method === 'POST' && /\/users\/?$/.test(request.url);
    const isPublicHashCheck =
      request.method === 'GET' && request.url.includes('/users/hash/');

    return (
      request.url.includes(AuthApiService.AUTHORIZATION_TOKEN_ENDPOINT) ||
      request.url.includes(AuthApiService.REFRESH_ENDPOINT) ||
      request.url.includes(AuthApiService.LOGOUT_ENDPOINT) ||
      request.url.includes(AuthApiService.VERIFY_GOOGLE_ENDPOINT) ||
      request.url.includes(AuthApiService.VERIFY_APPLE_ENDPOINT) ||
      request.url.includes(AuthApiService.SOCIAL_REGISTER_ENDPOINT) ||
      request.url.includes(AuthApiService.ACTIVATE_ENDPOINT) ||
      request.url.includes('/users/check/') ||
      request.url.includes('/users/send/mail/code') ||
      isPublicHashCheck ||
      isUsersCreate
    );
  }
}
