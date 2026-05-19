import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface TokenResponse {
  success: boolean;
  token: string;
}

export interface PullResponse {
  success: boolean;
  stdout: string;
  stderr: string;
}

@Injectable({
  providedIn: 'root',
})
export class RepoApiService {
  private static readonly ENDPOINT = 'git';

  constructor(private http: HttpService) {}

  public getToken(): Observable<TokenResponse> {
    return this.http.get<TokenResponse>(`${RepoApiService.ENDPOINT}/token`);
  }

  public saveToken(token: string): Observable<{ success: boolean }> {
    return this.http.put<{ success: boolean }>(`${RepoApiService.ENDPOINT}/token`, { token });
  }

  public pull(): Observable<PullResponse> {
    return this.http.post<PullResponse>(`${RepoApiService.ENDPOINT}/pull`, {});
  }
}
