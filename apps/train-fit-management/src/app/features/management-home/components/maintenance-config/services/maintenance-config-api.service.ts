import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface RemoteConfigMaintenance {
  enabled: boolean;
  startAt: string | null;
  endAt: string | null;
  message: string;
  warningMessage: string;
  warningFrom: string | null;
}

export interface RemoteConfigForceUpdate {
  minVersionIos: string;
  minVersionAndroid: string;
  minVersionWeb: string;
  message: string;
}

export interface RemoteConfig {
  maintenance: RemoteConfigMaintenance;
  forceUpdate: RemoteConfigForceUpdate;
  updatedBy: string;
  updatedAt: string;
}

export interface RemoteConfigResponse {
  success: boolean;
  config: RemoteConfig;
}

@Injectable({
  providedIn: 'root',
})
export class MaintenanceConfigApiService {
  constructor(private http: HttpService) {}

  public getConfig(): Observable<RemoteConfigResponse> {
    return this.http.get<RemoteConfigResponse>('config/admin');
  }

  public updateConfig(patch: Partial<RemoteConfig>): Observable<RemoteConfigResponse> {
    return this.http.put<RemoteConfigResponse>('config/admin', patch);
  }
}
