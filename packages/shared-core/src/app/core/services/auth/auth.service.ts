import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, shareReplay, switchMap } from 'rxjs/operators';
import { Token } from '../../models/token';
import { User } from '../../models/user';
import { UserLocalstorageService } from '../user/user-localstorage.service';
import { BillingService } from '../billing/billing.service';
import { NavigationService } from '../util/navigation.service';
import { AuthApiService } from './auth-api.service';
import { RefreshTokenStoreService } from './refresh-token-store.service';

@Injectable()
export class AuthService {
  private _user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  private readonly EXPIRATION_KEY = 'exp';
  private accessToken: string | null = null;
  private refreshInFlight$: Observable<any> | null = null;
  private isLoggingOut = false;
  private impersonating = false;

  constructor(
    private authApiService: AuthApiService,
    private userLocalstorageService: UserLocalstorageService,
    private billingService: BillingService,
    private navigationService: NavigationService,
    private refreshTokenStore: RefreshTokenStoreService
  ) {
    this.userLocalstorageService.removeUserToken();
    localStorage.removeItem('admin_token');
  }

  public get user(): User | null {
    return this._user$.value;
  }

  public get user$() {
    return this._user$.asObservable();
  }

  public set setUser(user: User | null) {
    this._user$.next(user);
  }

  public get isImpersonating(): boolean {
    return this.impersonating;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public isAuthenticated(): boolean {
    return this.isSessionValid();
  }

  public isSessionValid(): boolean {
    const decoded = this.getDecodedUser({ access_token: this.accessToken || '' });
    const jwtExpirationDate = decoded?.[this.EXPIRATION_KEY] ?? null;
    return !!jwtExpirationDate && jwtExpirationDate >= Date.now() / 1000;
  }

  public isAccessTokenExpiringSoon(bufferSeconds = 60): boolean {
    const decoded = this.getDecodedUser({ access_token: this.accessToken || '' });
    const jwtExpirationDate = decoded?.[this.EXPIRATION_KEY] ?? null;
    if (!jwtExpirationDate) {
      return true;
    }

    return jwtExpirationDate <= Date.now() / 1000 + bufferSeconds;
  }

  public hasStoredAccessToken(): boolean {
    return !!this.accessToken;
  }

  public getDecodedUser(token: Token): any {
    if (!token?.access_token || token.access_token.length <= 0) {
      return;
    }
    let userDecoded: any = null;
    try {
      const tokenArraySplitted = token.access_token.split('.');
      if (tokenArraySplitted && tokenArraySplitted.length > 1) {
        const userEncoded = tokenArraySplitted[1];
        if (!!userEncoded) {
          userDecoded = JSON.parse(this.decodeJwtPayload(userEncoded));
        }
      }
    } catch (error) {
      console.warn('Could not decode JWT payload', error);
    }
    return userDecoded;
  }

  private decodeJwtPayload(payload: string): string {
    const normalizedPayload = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(payload.length / 4) * 4, '=');

    return atob(normalizedPayload);
  }

  public login(email: string, password: string): Observable<void> {
    return this.authApiService.login(email, password).pipe(
      switchMap((response: any) => this.applyAuthResponse(response)),
      map(() => undefined)
    );
  }

  public impersonate(userId: string): Observable<void> {
    return this.authApiService.impersonate(userId).pipe(
      switchMap((response: any) => this.applyAuthResponse(response)),
      map(() => undefined)
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
      })
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
      })
    );
  }

  private isTransientAuthError(error: any): boolean {
    return (
      error?.status === 0 ||
      error?.status === 409 ||
      error?.status >= 500 ||
      error?.name === 'TimeoutError'
    );
  }

  public isTerminalAuthError(error: any): boolean {
    const code = error?.code || error?.error?.code;
    return (
      error?.requiresRelogin === true ||
      error?.error?.requiresRelogin === true ||
      [
        'SESSION_REPLACED',
        'REFRESH_INVALID',
        'REFRESH_EXPIRED',
        'PASSWORD_CHANGED',
      ].includes(code)
    );
  }

  public async persistAuthTokens(
    token: Partial<Token> | null | undefined
  ): Promise<void> {
    if (!token?.access_token) {
      return;
    }

    if (this.refreshTokenStore.isNativeClient && token.refresh_token) {
      console.info('[AUTH] persist_auth_tokens_native_refresh_start');
      await this.refreshTokenStore.save(token.refresh_token);
    }

    this.accessToken = token.access_token;
    const userDecoded = this.getDecodedUser({ access_token: token.access_token });
    if (userDecoded) {
      this._user$.next(userDecoded as User);
      this.impersonating = !!userDecoded.imp;
      console.info('[AUTH] access_token_applied', {
        email: userDecoded.email || null,
        impersonating: this.impersonating,
      });
    }
  }

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
          nativeClient: this.refreshTokenStore.isNativeClient,
          impersonating: this.impersonating,
        });
      })
    );
  }

  public refreshToken(): Observable<any> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }

    const refreshRequest$ = this.refreshTokenStore.isNativeClient
      ? from(this.refreshTokenStore.get()).pipe(
          switchMap((refreshToken) => {
            if (!refreshToken) {
              return throwError(() => ({
                status: 401,
                code: 'REFRESH_INVALID',
                message: 'No refresh token',
                requiresRelogin: true,
              }));
            }
            console.info('[AUTH] refresh_with_native_token');
            return this.authApiService.refreshTokenWithHeader(refreshToken);
          })
        )
      : this.authApiService.refreshToken();

    this.refreshInFlight$ = refreshRequest$.pipe(
      switchMap((response: any) =>
        this.applyAuthResponse(response).pipe(map(() => response))
      ),
      finalize(() => {
        this.refreshInFlight$ = null;
      }),
      shareReplay(1)
    );

    return this.refreshInFlight$;
  }

  public verifyGoogle(email: string, tokenGoogle: string): Observable<any> {
    return this.authApiService.verifyGoogle(email, tokenGoogle);
  }

  public verifyApple(email: string, tokenApple: string): Observable<any> {
    return this.authApiService.verifyApple(email, tokenApple);
  }

  public logout(): void {
    if (this.isLoggingOut) {
      return;
    }
    this.isLoggingOut = true;

    const nativeRefreshTokenSnapshot = this.refreshTokenStore.isNativeClient
      ? this.refreshTokenStore.peek()
      : null;

    this.accessToken = null;
    this.impersonating = false;
    this.userLocalstorageService.removeUserToken();
    localStorage.removeItem('admin_token');
    this.refreshTokenStore.clear().catch((error) => {
      console.warn('Could not clear native refresh token', error);
    });
    void this.billingService.logOut();
    this._user$.next(null);
    this.navigationService.goToLoginPage();

    const logoutRequest$ = this.refreshTokenStore.isNativeClient
      ? this.authApiService.logoutWithHeader(nativeRefreshTokenSnapshot || undefined)
      : this.authApiService.logout();

    logoutRequest$.subscribe({
      next: () => {
        this.isLoggingOut = false;
      },
      error: (err) => {
        console.error('Logout error:', err);
        this.isLoggingOut = false;
      },
    });
  }
}
