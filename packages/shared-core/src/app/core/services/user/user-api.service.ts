import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpService } from '../http/http.service';

@Injectable()
export class UserAPIService {
  private static readonly USERS_ENDPOINT = 'users';
  private static readonly AUTH_ACTIVATE_ENDPOINT = 'auth/activate';
  private static readonly AUTH_SOCIAL_REGISTER_ENDPOINT = 'auth/social/register';
  private static readonly AUTH_SOCIAL_COMPLETE_ENDPOINT = 'auth/social/complete';
  private static readonly USERS_SEND_MAIL_CODE_ENDPOINT = 'send/mail/code';

  constructor(private http: HttpService) {}

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${UserAPIService.USERS_ENDPOINT}/${email}`);
  }

  public checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${UserAPIService.USERS_ENDPOINT}/check/${email}`
    );
  }

  public createUser(user: User, date: Date): Observable<User> {
    return this.http.post<User>(`${UserAPIService.USERS_ENDPOINT}`, {
      user,
      date,
    });
  }

  public createGoogleUser(
    user: User,
    date: Date,
    tokenGoogle: string
  ): Observable<User> {
    return this.http.post<User>(`${UserAPIService.AUTH_SOCIAL_REGISTER_ENDPOINT}`, {
      user,
      date,
      provider: 'google',
      tokenGoogle,
    });
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${UserAPIService.USERS_ENDPOINT}`, user);
  }

  public updateGoogleUser(user: User): Observable<any> {
    return this.http.put<User>(
      `${UserAPIService.AUTH_SOCIAL_COMPLETE_ENDPOINT}`,
      user
    );
  }

  public createAppleUser(
    user: User,
    date: Date,
    tokenApple: string
  ): Observable<User> {
    return this.http.post<User>(`${UserAPIService.AUTH_SOCIAL_REGISTER_ENDPOINT}`, {
      user,
      date,
      tokenApple,
      provider: 'apple',
    });
  }

  public updateAppleUser(user: User): Observable<any> {
    return this.http.put<User>(
      `${UserAPIService.AUTH_SOCIAL_COMPLETE_ENDPOINT}`,
      user
    );
  }

  public playStopDiet(idUser: string, idDietInUse: string): Observable<any> {
    return this.http.put<any>(
      `${UserAPIService.USERS_ENDPOINT}/playstopdiet/${idUser}/${idDietInUse}`,
      null
    );
  }

  public searchArchivedsByFilter(searchFilters: any): Observable<any> {
    return this.http.post<any>(
      `${UserAPIService.USERS_ENDPOINT}/search/by`,
      searchFilters
    );
  }

  public searchUsers(
    page: number,
    search: string,
    filters?: { premiumOnly?: boolean; withHashOnly?: boolean }
  ): Observable<{ users: User[]; total: number }> {
    return this.http.post<{ users: User[]; total: number }>(
      `${UserAPIService.USERS_ENDPOINT}/search`,
      {
      page,
      search,
      filters,
      }
    );
  }

  public checkHash(id: string, hash: string): Observable<User> {
    return this.http.get<User>(
      `${UserAPIService.USERS_ENDPOINT}/hash/${id}/${hash}`
    );
  }

  public clearUserHash(id: string): Observable<void> {
    return this.http.delete<void>(`${UserAPIService.USERS_ENDPOINT}/hash/${id}`);
  }

  public addFavoriteProduct(
    idUser: string,
    idProduct: string
  ): Observable<{ isFavorite: boolean; message?: string }> {
    return this.http.put<{ isFavorite: boolean; message?: string }>(
      `${UserAPIService.USERS_ENDPOINT}/favProduct`,
      {
        idUser,
        idProduct,
      }
    );
  }

  public sendMailCode(email: string): Observable<string> {
    return this.http.get<string>(
      `${UserAPIService.USERS_ENDPOINT}/${UserAPIService.USERS_SEND_MAIL_CODE_ENDPOINT}/${email}`
    );
  }

  public checkRestoreCode(
    email: string,
    password: string,
    hash: string
  ): Observable<any> {
    return this.http.post<any>(
      `${UserAPIService.USERS_ENDPOINT}/${UserAPIService.USERS_SEND_MAIL_CODE_ENDPOINT}`,
      { email, password, hash }
    );
  }

  public sendSuggestions(
    email: string,
    suggestions: string
  ): Observable<string> {
    return this.http.post<string>(
      `${UserAPIService.USERS_ENDPOINT}/suggestions`,
      { email, suggestions }
    );
  }

  public deleteById(id: string): Observable<string> {
    return this.http.delete<string>(`${UserAPIService.USERS_ENDPOINT}/${id}`);
  }

  public verifyPassword(password: string): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(
      `${UserAPIService.USERS_ENDPOINT}/verify-password`,
      { password }
    );
  }

  public updateUserRoles(id: string, roles: string[]): Observable<{ message: string; roles: string[] }> {
    return this.http.put<{ message: string; roles: string[] }>(
      `${UserAPIService.USERS_ENDPOINT}/roles/${id}`,
      { roles }
    );
  }
  public activateAccount(email: string, code: string): Observable<any> {
    return this.http.post<any>(`${UserAPIService.AUTH_ACTIVATE_ENDPOINT}`, {
      email,
      code,
    });
  }
}
