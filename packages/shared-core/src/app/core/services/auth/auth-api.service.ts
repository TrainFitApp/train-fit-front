import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { HttpService } from "../http/http.service";

@Injectable()
export class AuthApiService {
  public static readonly AUTHORIZATION_TOKEN_ENDPOINT = "auth/login";
  public static readonly REGISTER_ENDPOINT = "users";
  public static readonly REFRESH_ENDPOINT = "auth/refresh";
  public static readonly LOGOUT_ENDPOINT = "auth/logout";
  public static readonly VERIFY_GOOGLE_ENDPOINT = "auth/social/google/verify";
  public static readonly VERIFY_APPLE_ENDPOINT = "auth/social/apple/verify";
  public static readonly SOCIAL_REGISTER_ENDPOINT = "auth/social/register";
  public static readonly ACTIVATE_ENDPOINT = "auth/activate";
  public static readonly IMPERSONATE_ENDPOINT = "auth/impersonate";
  public static readonly REVERT_IMPERSONATE_ENDPOINT =
    "auth/impersonate/revert";

  constructor(private http: HttpService) {}

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      AuthApiService.AUTHORIZATION_TOKEN_ENDPOINT,
      { email, password },
      undefined,
      true, // withCredentials: ensure browser stores httpOnly cookie
    );
  }

  public save(user: User): Observable<any> {
    return this.http.put<User>(AuthApiService.REGISTER_ENDPOINT, user);
  }

  public refreshToken(): Observable<any> {
    return this.refreshTokenWithHeader();
  }

  public refreshTokenWithHeader(refreshToken?: string): Observable<any> {
    const headers = refreshToken
      ? ({ "x-refresh-token": refreshToken } as any)
      : undefined;

    // withCredentials keeps web cookie flow active.
    return this.http.post<any>(
      AuthApiService.REFRESH_ENDPOINT,
      {},
      headers,
      true, // withCredentials
    );
  }

  public logout(): Observable<any> {
    return this.logoutWithHeader();
  }

  public logoutWithHeader(refreshToken?: string): Observable<any> {
    const headers = refreshToken
      ? ({ "x-refresh-token": refreshToken } as any)
      : undefined;

    // withCredentials keeps web cookie flow active.
    return this.http.post<any>(
      AuthApiService.LOGOUT_ENDPOINT,
      {},
      headers,
      true, // withCredentials
    );
  }

  public impersonate(userId: string): Observable<any> {
    return this.http.post<any>(
      AuthApiService.IMPERSONATE_ENDPOINT,
      { userId },
      undefined,
      true, // withCredentials
    );
  }

  public revertImpersonation(): Observable<any> {
    return this.http.post<any>(
      AuthApiService.REVERT_IMPERSONATE_ENDPOINT,
      {},
      undefined,
      true,
    );
  }

  public verifyGoogle(email: string, tokenGoogle: string): Observable<any> {
    return this.http.post<User>(
      AuthApiService.VERIFY_GOOGLE_ENDPOINT,
      {
        email,
        tokenGoogle,
      },
      undefined,
      true,
    );
  }

  public verifyApple(
    email: string | null,
    tokenApple: string,
  ): Observable<any> {
    return this.http.post<User>(
      AuthApiService.VERIFY_APPLE_ENDPOINT,
      {
        email,
        tokenApple,
      },
      undefined,
      true,
    );
  }
}
