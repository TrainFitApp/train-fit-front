import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '../../models/token';
import { User } from '../../models/user';
import { UserLocalstorageService } from '../user/user-localstorage.service';
import { NavigationService } from '../util/navigation.service';
import { AuthApiService } from './auth-api.service';

@Injectable()
export class AuthService {
  private _user$: BehaviorSubject<User>;
  private readonly EXPIRATION_KEY: string = 'exp';

  constructor(
    private authApiService: AuthApiService,
    private userLocalstorageService: UserLocalstorageService,
    private navigationService: NavigationService
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
        this.userLocalstorageService.setUserToken(token);
        this.setUser = userDecoded;
      })
    );
  }

  public refreshToken(): Observable<any> {
    return this.authApiService.refreshToken().pipe(
      map((response: any) => {
        if (!!response?.error) {
          throw new Error(response?.error);
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
      })
    );
  }

  public verifyGoogle(email: string, tokenGoogle: string): Observable<any> {
    return this.authApiService.verifyGoogle(email, tokenGoogle);
  }

  public verifyApple(email: string, tokenApple: string): Observable<any> {
    return this.authApiService.verifyApple(email, tokenApple);
  }

  public logout(): void {
    // Call backend logout to clear httpOnly cookie and DB
    this.authApiService.logout().subscribe({
      next: () => {
        this.userLocalstorageService.removeUserToken();
        this._user$.next(null);
        this.navigationService.goToLoginPage();
      },
      error: (err) => {
        // Even if logout fails, clear local data
        console.error('Logout error:', err);
        this.userLocalstorageService.removeUserToken();
        this._user$.next(null);
        this.navigationService.goToLoginPage();
      },
    });
  }
}
