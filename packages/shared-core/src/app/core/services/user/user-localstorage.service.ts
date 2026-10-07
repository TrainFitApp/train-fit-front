import { Injectable } from '@angular/core';

@Injectable()
export class UserLocalstorageService {
  public static readonly CURRENT_USER_KEY = 'currentUser';

  public getAccessToken(): string | null {
    return null;
  }

  public removeUserToken(): void {
    localStorage.removeItem(UserLocalstorageService.CURRENT_USER_KEY);
  }
}
