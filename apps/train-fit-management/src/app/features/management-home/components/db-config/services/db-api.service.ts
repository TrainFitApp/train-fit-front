import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface DbProfile {
  name: string;
  isActive: boolean;
}

export interface DbProfilesResponse {
  success: boolean;
  profiles: DbProfile[];
}

export interface DbSwitchResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class DbApiService {
  constructor(private http: HttpService) {}

  public getProfiles(): Observable<DbProfilesResponse> {
    return this.http.get<DbProfilesResponse>('env/db-profiles');
  }

  public switchDb(name: string): Observable<DbSwitchResponse> {
    return this.http.post<DbSwitchResponse>('env/db-switch', { name });
  }
}
