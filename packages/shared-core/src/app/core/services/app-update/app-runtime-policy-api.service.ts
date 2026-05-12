import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AppRuntimePolicy,
  AppRuntimeStatus,
} from '../../models/app-runtime-policy';
import { HttpService } from '../http/http.service';

@Injectable()
export class AppRuntimePolicyApiService {
  private static readonly APP_ENDPOINT = 'app';

  constructor(private readonly httpService: HttpService) {}

  public getRuntimeStatus(): Observable<AppRuntimeStatus> {
    return this.httpService.get<AppRuntimeStatus>(
      `${AppRuntimePolicyApiService.APP_ENDPOINT}/runtime-status`
    );
  }

  public getRuntimePolicy(): Observable<AppRuntimePolicy> {
    return this.httpService.get<AppRuntimePolicy>(
      `${AppRuntimePolicyApiService.APP_ENDPOINT}/runtime-policy`
    );
  }

  public updateRuntimePolicy(
    policy: AppRuntimePolicy
  ): Observable<AppRuntimePolicy> {
    return this.httpService.put<AppRuntimePolicy>(
      `${AppRuntimePolicyApiService.APP_ENDPOINT}/runtime-policy`,
      policy
    );
  }
}
