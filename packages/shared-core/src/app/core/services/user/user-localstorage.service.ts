import { Injectable } from '@angular/core';
import { Token } from '../../models/token';

@Injectable()
export class UserLocalstorageService {
  public static readonly CURRENT_USER_KEY = 'currentUser';
  public static readonly ACCESS_TOKEN_KEY = 'access_token';

  public getUserToken(): Token | null {
    return null;
  }

  public getAccessToken(): string | null {
    return null;
  }

  public setUserToken(token: Token): void {
    localStorage.removeItem(UserLocalstorageService.CURRENT_USER_KEY);
  }

  public removeUserToken(): void {
    localStorage.removeItem(UserLocalstorageService.CURRENT_USER_KEY);
  }
}
