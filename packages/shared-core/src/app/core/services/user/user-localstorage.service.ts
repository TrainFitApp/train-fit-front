import { Injectable } from '@angular/core';
import { Token } from '../../models/token';

@Injectable()
export class UserLocalstorageService {
  public static readonly CURRENT_USER_KEY = 'currentUser';
  public static readonly ACCESS_TOKEN_KEY = 'access_token';

  public getUserToken(): Token | null {
    const currentUser = localStorage.getItem(
      UserLocalstorageService.CURRENT_USER_KEY
    );
    if (!currentUser || currentUser.length <= 0) {
      return null;
    }

    let token: Token | null = null;
    try {
      token = JSON.parse(currentUser) ?? null;
    } catch (error) {}
    return token;
  }

  public getAccessToken(): string | null {
    const token = this.getUserToken();
    return token ? token.access_token : null;
  }

  public setUserToken(token: Token): void {
    if (!token) {
      localStorage.removeItem(UserLocalstorageService.CURRENT_USER_KEY);
      return;
    }

    localStorage.setItem(
      UserLocalstorageService.CURRENT_USER_KEY,
      JSON.stringify(token)
    );
  }

  public removeUserToken(): void {
    localStorage.removeItem(UserLocalstorageService.CURRENT_USER_KEY);
  }
}
