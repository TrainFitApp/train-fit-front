import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface EnvEntry {
  key: string;
  value: string;
  commented: boolean;
}

export interface EnvListResponse {
  success: boolean;
  entries: EnvEntry[];
}

export interface EnvSingleResponse {
  success: boolean;
  entry: EnvEntry;
}

@Injectable({
  providedIn: 'root',
})
export class EnvApiService {
  private static readonly ENDPOINT = 'env';

  constructor(private http: HttpService) {}

  public list(): Observable<EnvListResponse> {
    return this.http.get<EnvListResponse>(EnvApiService.ENDPOINT);
  }

  public create(key: string, value: string): Observable<EnvSingleResponse> {
    return this.http.post<EnvSingleResponse>(EnvApiService.ENDPOINT, { key, value });
  }

  public update(key: string, value: string): Observable<EnvSingleResponse> {
    return this.http.put<EnvSingleResponse>(`${EnvApiService.ENDPOINT}/${key}`, { value });
  }

  public toggle(key: string): Observable<EnvSingleResponse> {
    return this.http.put<EnvSingleResponse>(`${EnvApiService.ENDPOINT}/${key}/toggle`, {});
  }

  public delete(key: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${EnvApiService.ENDPOINT}/${key}`);
  }
}
