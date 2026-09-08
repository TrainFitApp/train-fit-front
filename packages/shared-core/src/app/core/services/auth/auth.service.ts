import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { Token } from '../../models/token';
import { User } from '../../models/user';
import { UserLocalstorageService } from '../user/user-localstorage.service';
import { BillingService } from '../billing/billing.service';
import { NavigationService } from '../util/navigation.service';
import { SecureStorageService } from '../security/secure-storage.service';
import { AuthApiService } from './auth-api.service';
import { PendingEmailVerificationService } from './pending-email-verification.service';
import { RefreshTokenStoreService } from './refresh-token-store.service';

/** Keys used in SecureStorage for token persistence on native. */
const SS_ACCESS_TOKEN_KEY = 'auth_access_token';

@Injectable()
export class AuthService {
  private _user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private readonly EXPIRATION_KEY = 'exp';

  /** In-memory access token — the source of truth for all request signing. */
  private accessToken: string | null = null;

  /**
   * Shared in-flight refresh Observable.
   * Reused by every concurrent caller so the API is only hit once.
   */
  private refreshInFlight$: Observable<any> | null = null;

  private isLoggingOut = false;
  private impersonating = false;

  constructor(
    private authApiService: AuthApiService,
    private userLocalstorageService: UserLocalstorageService,
    private billingService: BillingService,
    private navigationService: NavigationService,
    private refreshTokenStore: RefreshTokenStoreService,
    private secureStorage: SecureStorageService,
    private pendingEmailVerificationService: PendingEmailVerificationService,
  ) {
    // Legacy cleanup: never leave tokens in plain localStorage.
    this.userLocalstorageService.removeUserToken();
    localStorage.removeItem('admin_token');
  }

  // ─── Public getters ────────────────────────────────────────────────────────

  public get user(): User | null {
    return this._user$.value;
  }

  public get user$(): Observable<User | null> {
    return this._user$.asObservable();
  }

  public set setUser(user: User | null) {
    this._user$.next(user);
  }

  public get isImpersonating(): boolean {
    return this.impersonating;
  }

  /** Returns the current in-memory access token (null when not authenticated). */
  public getAccessToken(): string | null {
    return this.accessToken;
  }

  // ─── Session validity ──────────────────────────────────────────────────────

  public isAuthenticated(): boolean {
    return this.isSessionValid();
  }

  public isSessionValid(): boolean {
    const decoded = this.getDecodedUser({ access_token: this.accessToken ?? '' });
    const exp = decoded?.[this.EXPIRATION_KEY] ?? null;
    return !!exp && exp >= Date.now() / 1000;
  }

  public isAccessTokenExpiringSoon(bufferSeconds = 60): boolean {
    const decoded = this.getDecodedUser({ access_token: this.accessToken ?? '' });
    const exp = decoded?.[this.EXPIRATION_KEY] ?? null;
    if (!exp) {
      return true;
    }
    return exp <= Date.now() / 1000 + bufferSeconds;
  }

  public hasStoredAccessToken(): boolean {
    return !!this.accessToken;
  }

  // ─── JWT helpers ───────────────────────────────────────────────────────────

  public getDecodedUser(token: Token): any {
    if (!token?.access_token || token.access_token.length <= 0) {
      return undefined;
    }

    let decoded: any = null;
    try {
      const parts = token.access_token.split('.');
      if (parts.length > 1 && parts[1]) {
        decoded = JSON.parse(this.decodeJwtPayload(parts[1]));
      }
    } catch (error) {
      console.warn('[AUTH] jwt_decode_failed', error);
    }
    return decoded;
  }

  private decodeJwtPayload(payload: string): string {
    const normalized = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(payload.length / 4) * 4, '=');
    return atob(normalized);
  }

  // ─── Auth actions ──────────────────────────────────────────────────────────

  public login(email: string, password: string): Observable<void> {
    return this.authApiService.login(email, password).pipe(
      switchMap((response: any) => this.applyAuthResponse(response)),
      map(() => undefined),
    );
  }

  public impersonate(userId: string): Observable<void> {
    return this.authApiService.impersonate(userId).pipe(
      switchMap((response: any) => this.applyAuthResponse(response)),
      map(() => undefined),
    );
  }

  public revertImpersonation(): Observable<void> {
    return this.authApiService.revertImpersonation().pipe(
      switchMap((response: any) => this.applyAuthResponse(response)),
      map(() => undefined),
      catchError((error) => {
        if (this.isTerminalAuthError(error)) {
          this.logout();
        }
        return throwError(() => error);
      }),
    );
  }

  public revertImpersonationLocally(): void {
    return;
  }

  public restoreSessionSilently(): Observable<boolean> {
    return this.ensureAuthenticated();
  }

  public ensureAuthenticated(): Observable<boolean> {
    if (this.isSessionValid()) {
      return of(true);
    }

    return this.refreshToken().pipe(
      map((response: any) => !!response?.access_token),
      catchError((error) => {
        if (this.isTerminalAuthError(error) || this.isTransientAuthError(error)) {
          throw error;
        }
        return of(false);
      }),
    );
  }

  // ─── Error classification ──────────────────────────────────────────────────

  private isTransientAuthError(error: any): boolean {
    return (
      error?.status === 0 ||
      error?.status === 408 ||
      error?.status === 409 ||
      error?.status === 429 ||
      error?.status >= 500 ||
      error?.name === 'TimeoutError'
    );
  }

  public isTerminalAuthError(error: any): boolean {
    const code = error?.code || error?.error?.code;
    return (
      error?.requiresRelogin === true ||
      error?.error?.requiresRelogin === true ||
      ['SESSION_REPLACED', 'REFRESH_INVALID', 'REFRESH_EXPIRED', 'PASSWORD_CHANGED'].includes(code)
    );
  }

  // ─── Token persistence ─────────────────────────────────────────────────────

  /**
   * Persist auth tokens after a successful login or refresh.
   *
   * On native platforms both `access_token` and `refresh_token` are stored
   * in SecureStorage (via the community plugin `capacitor-secure-storage-plugin`).
   * The access token is also kept in-memory for fast synchronous access.
   */
  public async persistAuthTokens(token: Partial<Token> | null | undefined): Promise<void> {
    if (!token?.access_token) {
      return;
    }

    if (this.secureStorage.isNativeClient) {
      // Persist access token in SecureStorage for cross-session restore.
      try {
        await this.secureStorage.set(SS_ACCESS_TOKEN_KEY, token.access_token);
        console.info('[AUTH] access_token_persisted_secure');
      } catch (error) {
        console.warn('[AUTH] access_token_persist_failed', error);
      }

      // Persist refresh token (delegated to RefreshTokenStoreService).
      if (token.refresh_token) {
        console.info('[AUTH] persist_refresh_token_native');
        await this.refreshTokenStore.save(token.refresh_token);
      }
    }

    // Always keep the access token in-memory.
    this.accessToken = token.access_token;

    const userDecoded = this.getDecodedUser({ access_token: token.access_token });
    if (userDecoded) {
      this._user$.next(userDecoded as User);
      this.impersonating = !!userDecoded.imp;
      this.pendingEmailVerificationService.clear();
      console.info('[AUTH] access_token_applied', {
        email: userDecoded.email ?? null,
        impersonating: this.impersonating,
      });
    }
  }

  /** Build a Token object from a raw API response and persist it. */
  public applyAuthResponse(response: any): Observable<void> {
    const token: Token = {
      access_token: response?.access_token,
      refresh_token: response?.refresh_token,
      expires_in: response?.expires_in,
      token_type: response?.token_type,
    };

    return from(this.persistAuthTokens(token)).pipe(
      map(() => {
        if (response?.user) {
          this._user$.next(response.user);
        }
        this.impersonating = !!response?.is_impersonating;
        console.info('[AUTH] auth_response_applied', {
          hasAccessToken: !!response?.access_token,
          hasRefreshToken: !!response?.refresh_token,
          nativeClient: this.secureStorage.isNativeClient,
          impersonating: this.impersonating,
        });
      }),
    );
  }

  // ─── Token refresh ─────────────────────────────────────────────────────────

  /**
   * Refresh the access token.
   *
   * Multiple concurrent callers share the same in-flight Observable via
   * `shareReplay(1)` so the network call is made exactly once.
   * On success, tokens are persisted and the shared Observable is cleared.
   * On terminal failure the caller is responsible for triggering logout.
   */
  public refreshToken(): Observable<any> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }

    const refreshRequest$: Observable<any> = this.secureStorage.isNativeClient
      ? from(this.refreshTokenStore.get()).pipe(
          switchMap((storedRefreshToken) => {
            if (!storedRefreshToken) {
              return throwError(() => ({
                status: 401,
                code: 'REFRESH_INVALID',
                message: 'No refresh token in secure storage',
                requiresRelogin: true,
              }));
            }
            console.info('[AUTH] refresh_with_native_token');
            return this.authApiService.refreshTokenWithHeader(storedRefreshToken);
          }),
        )
      : this.authApiService.refreshToken();

    this.refreshInFlight$ = refreshRequest$.pipe(
      switchMap((response: any) =>
        this.applyAuthResponse(response).pipe(map(() => response)),
      ),
      catchError((error) => {
        console.error('[AUTH] refresh_failed', {
          status: error?.status,
          code: error?.code ?? error?.error?.code,
        });

        // On a terminal error, wipe secure storage so the next boot is clean.
        if (this.isTerminalAuthError(error)) {
          void this.clearSecureTokens();
        }

        return throwError(() => error);
      }),
      finalize(() => {
        this.refreshInFlight$ = null;
      }),
      shareReplay(1),
    );

    return this.refreshInFlight$;
  }

  // ─── Social auth ───────────────────────────────────────────────────────────

  public verifyGoogle(email: string, tokenGoogle: string): Observable<any> {
    return this.authApiService.verifyGoogle(email, tokenGoogle);
  }

  public verifyApple(email: string, tokenApple: string): Observable<any> {
    return this.authApiService.verifyApple(email, tokenApple);
  }

  // ─── Logout ────────────────────────────────────────────────────────────────

  public logout(): void {
    if (this.isLoggingOut) {
      return;
    }
    this.isLoggingOut = true;

    const nativeRefreshTokenSnapshot = this.secureStorage.isNativeClient
      ? this.refreshTokenStore.peek()
      : null;

    // Clear in-memory state immediately.
    this.accessToken = null;
    this.impersonating = false;
    this.userLocalstorageService.removeUserToken();
    localStorage.removeItem('admin_token');

    // Clear SecureStorage asynchronously.
    void this.clearSecureTokens();
    void this.billingService.logOut();

    this._user$.next(null);
    this.navigationService.goToLoginPage();

    const logoutRequest$ = this.secureStorage.isNativeClient
      ? this.authApiService.logoutWithHeader(nativeRefreshTokenSnapshot ?? undefined)
      : this.authApiService.logout();

    logoutRequest$.subscribe({
      next: () => { this.isLoggingOut = false; },
      error: (err) => {
        console.error('[AUTH] logout_error', err);
        this.isLoggingOut = false;
      },
    });
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  /** Remove both tokens from SecureStorage. Fire-and-forget safe. */
  private async clearSecureTokens(): Promise<void> {
    await Promise.all([
      this.secureStorage.remove(SS_ACCESS_TOKEN_KEY).catch(() => undefined),
      this.refreshTokenStore.clear().catch(() => undefined),
    ]);
    console.info('[AUTH] secure_tokens_cleared');
  }
}
