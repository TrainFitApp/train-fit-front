import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpService } from '../http/http.service';

@Injectable()
export class AuthApiService {
  public static readonly AUTHORIZATION_TOKEN_ENDPOINT = 'users/sign-in';
  public static readonly REGISTER_ENDPOINT = 'users';
  public static readonly REFRESH_ENDPOINT = 'users/refresh-token';
  public static readonly LOGOUT_ENDPOINT = 'users/logout';
  public static readonly VERIFY_GOOGLE_ENDPOINT = 'users/auth/verify-google';
  public static readonly VERIFY_APPLE_ENDPOINT = 'users/auth/verify-apple';

  constructor(private http: HttpService) {}

  public login(email: string, password: string): Observable<any> {
    const authorizationHeaders = this.http.getLoginAuthorizationHeaders(
      email,
      password
    );

    return this.http.post<any>(
      AuthApiService.AUTHORIZATION_TOKEN_ENDPOINT,
      null,
      authorizationHeaders,
      true // withCredentials: ensure browser stores httpOnly cookie
    );
  }

  public save(user: User): Observable<any> {
    return this.http.put<User>(AuthApiService.REGISTER_ENDPOINT, user);
  }

  public refreshToken(): Observable<any> {
    // POST request with withCredentials to send httpOnly cookie
    return this.http.post<any>(
      AuthApiService.REFRESH_ENDPOINT,
      {},
      undefined,
      true // withCredentials
    );
  }

  public logout(): Observable<any> {
    // POST request with withCredentials to clear httpOnly cookie
    return this.http.post<any>(
      AuthApiService.LOGOUT_ENDPOINT,
      {},
      undefined,
      true // withCredentials
    );
  }

  public verifyGoogle(email: string, tokenGoogle: string): Observable<any> {
    return this.http.post<User>(AuthApiService.VERIFY_GOOGLE_ENDPOINT, {
      email,
      tokenGoogle,
    });
  }

  public verifyApple(email: string | null, tokenApple: string): Observable<any> {
    return this.http.post<User>(AuthApiService.VERIFY_APPLE_ENDPOINT, {
      email,
      tokenApple,
    });
  }
}
