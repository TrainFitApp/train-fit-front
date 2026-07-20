import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RemoteConfigStatus } from '../../models/remote-config-status';
import { HttpService } from '../http/http.service';

const CACHE_KEY = 'trainfit_remote_config';

const FALLBACK_STATUS: RemoteConfigStatus = {
  maintenance: { state: 'normal' },
  forceUpdate: { required: false },
};

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  constructor(private httpService: HttpService) {}

  public async checkConfig(): Promise<RemoteConfigStatus> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<RemoteConfigStatus>(
          `config?version=${environment.APP_VERSION}`,
        ),
      );

      if (response?.maintenance && response?.forceUpdate) {
        this.cacheStatus(response);
        return response;
      }

      return this.getCachedStatus();
    } catch (error) {
      console.warn('Remote config check failed', error);
      return this.getCachedStatus();
    }
  }

  private cacheStatus(status: RemoteConfigStatus): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(status));
    } catch {}
  }

  // Fail-open: sin caché válida, no bloquear nunca la app.
  private getCachedStatus(): RemoteConfigStatus {
    const cached = this.httpService.getFromLocalStorage(CACHE_KEY);
    if (cached?.maintenance && cached?.forceUpdate) {
      return cached;
    }
    return FALLBACK_STATUS;
  }
}
