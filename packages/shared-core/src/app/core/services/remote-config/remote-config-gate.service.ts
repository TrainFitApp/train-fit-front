import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppUpdateService } from '../app-update/app-update.service';
import { MaintenanceModalService } from '../maintenance/maintenance-modal.service';
import { RemoteConfigService } from './remote-config.service';

export interface MaintenanceWarningBanner {
  message: string;
}

// Orquesta la prioridad: mantenimiento activo > actualización forzada >
// aviso previo > nada. Un único punto de entrada (checkAndPresent) para que
// AppComponent no acumule checks independientes.
@Injectable({ providedIn: 'root' })
export class RemoteConfigGateService {
  private warningBannerSubject = new BehaviorSubject<MaintenanceWarningBanner | null>(null);
  public readonly warningBanner$ = this.warningBannerSubject.asObservable();

  private dismissedWarningThisSession = false;

  constructor(
    private remoteConfigService: RemoteConfigService,
    private appUpdateService: AppUpdateService,
    private maintenanceModalService: MaintenanceModalService,
  ) {}

  public async checkAndPresent(): Promise<void> {
    const status = await this.remoteConfigService.checkConfig();

    if (status.maintenance.state === 'active') {
      this.warningBannerSubject.next(null);
      await this.maintenanceModalService.presentIfActive(status.maintenance);
      return;
    }

    if (status.forceUpdate.required) {
      this.warningBannerSubject.next(null);
      await this.appUpdateService.presentRequiredUpdate(status.forceUpdate);
      return;
    }

    if (status.maintenance.state === 'warning' && !this.dismissedWarningThisSession) {
      this.warningBannerSubject.next({ message: status.maintenance.message || '' });
      return;
    }

    this.warningBannerSubject.next(null);
  }

  // Descartable solo durante la sesión actual — no se persiste, vuelve a
  // aparecer si el usuario relanza la app.
  public dismissWarningBanner(): void {
    this.dismissedWarningThisSession = true;
    this.warningBannerSubject.next(null);
  }
}
