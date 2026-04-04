import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { finalize, map, shareReplay, switchMap } from 'rxjs/operators';
import { Token } from '../../models/token';
import { User } from '../../models/user';
import { UserLocalstorageService } from '../user/user-localstorage.service';
import { NavigationService } from '../util/navigation.service';
import { AuthApiService } from './auth-api.service';
import { RefreshTokenStoreService } from './refresh-token-store.service';

@Injectable()
export class AuthService {
  private _user$: BehaviorSubject<User>;
  private readonly EXPIRATION_KEY: string = 'exp';
  private refreshInFlight$: Observable<any> | null = null;
  private isLoggingOut = false;

  constructor(
    private authApiService: AuthApiService,
    private userLocalstorageService: UserLocalstorageService,
    private navigationService: NavigationService,
    private refreshTokenStore: RefreshTokenStoreService
  ) {
    this.initUser();
  }

  private initUser() {
    const token: Token = this.userLocalstorageService.getUserToken();
    const user: User | null = this.getDecodedUser(token) ?? null;
    this._user$ = new BehaviorSubject<User>(user);
  }

  public get user(): User {
    return this._user$.value;
  }

  public get user$() {
    return this._user$.asObservable();
  }

  public set setUser(user) {
    this._user$.next(user);
  }

  public isAuthenticated(): boolean {
    return !!this._user$?.value;
  }

  public isSessionValid(): boolean {
    const user = this._user$?.value;
    let isSessionValid = false;
    if (!!user) {
      const jwtExpirationDate = user[this.EXPIRATION_KEY] ?? null;
      isSessionValid =
        !!jwtExpirationDate && jwtExpirationDate >= Date.now() / 1000;
    }
    return isSessionValid;
  }

  public getDecodedUser(token: Token): User {
    if (!token?.access_token || token.access_token.length <= 0) {
      return;
    }
    let userDecoded: User = null;
    try {
      const tokenArraySplitted = token.access_token.split('.');
      if (tokenArraySplitted && tokenArraySplitted.length > 1) {
        const userEncoded = tokenArraySplitted[1];
        if (!!userEncoded) {
          userDecoded = JSON.parse(atob(userEncoded));
        }
      }
    } catch (error) {
      console.log('Error');
    }
    return userDecoded;
  }

  public login(email: string, password: string): Observable<void> {
    return this.authApiService.login(email, password).pipe(
      map((token: Token) => {
        if (!!token?.error) {
          throw new Error(token?.error);
        }

        const userDecoded = this.getDecodedUser(token);
        this.persistAuthTokens(token);
        this.setUser = userDecoded;
      })
    );
  }

  public persistAuthTokens(token: Partial<Token> | null | undefined): void {
    if (!token?.access_token) {
      return;
    }

    this.userLocalstorageService.setUserToken({
      access_token: token.access_token,
    });

    if (this.refreshTokenStore.isNativeClient && token.refresh_token) {
      this.refreshTokenStore.save(token.refresh_token).catch((error) => {
        console.warn('Could not store native refresh token', error);
      });
    }
  }

  public refreshToken(): Observable<any> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }

    const refreshRequest$ = this.refreshTokenStore.isNativeClient
      ? from(this.refreshTokenStore.get()).pipe(
          switchMap((refreshToken) =>
            this.authApiService.refreshTokenWithHeader(refreshToken || undefined)
          )
        )
      : this.authApiService.refreshToken();

    this.refreshInFlight$ = refreshRequest$.pipe(
      map((response: any) => {
        if (!!response?.error) {
          throw new Error(response?.error);
        }

        if (response?.refresh_token && this.refreshTokenStore.isNativeClient) {
          this.refreshTokenStore.save(response.refresh_token).catch((error) => {
            console.warn('Could not rotate native refresh token', error);
          });
        }

        if (response?.access_token) {
          this.userLocalstorageService.setUserToken({
            access_token: response.access_token,
          });
        }

        // Update in-memory user state safely (interceptor handles localStorage)
        try {
          const token: Token = { access_token: response.access_token };
          const userDecoded = this.getDecodedUser(token);
          if (userDecoded) {
            this.setUser = userDecoded;
          }
        } catch (e) {
          // Non-fatal: user state will be reloaded from localStorage on next navigation
          console.warn('Could not decode user from refreshed token', e);
        }

        return response;
      }),
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

    // Clear local state immediately to avoid race conditions and duplicate flows
    this.userLocalstorageService.removeUserToken();
    this.refreshTokenStore.clear().catch((error) => {
      console.warn('Could not clear native refresh token', error);
    });
    this._user$.next(null);
    this.navigationService.goToLoginPage();

    // Best effort call to backend to clear httpOnly cookie and server-side token chain
    const logoutRequest$ = this.refreshTokenStore.isNativeClient
      ? this.authApiService.logoutWithHeader(
          nativeRefreshTokenSnapshot || undefined
        )
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
