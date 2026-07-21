import { Injectable, NgZone } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { MaintenanceModalComponent } from 'src/app/features/maintenance/maintenance-modal.component';
import { RemoteConfigMaintenanceStatus } from '../../models/remote-config-status';
import { RemoteConfigService } from '../remote-config/remote-config.service';

const POLL_INTERVAL_MS = 5_000;

@Injectable({ providedIn: 'root' })
export class MaintenanceModalService {
  private isModalOpen = false;
  private activeModal: HTMLIonModalElement | null = null;
  private pollHandle: ReturnType<typeof setInterval> | null = null;

  constructor(
    private modalController: ModalController,
    private remoteConfigService: RemoteConfigService,
    private navController: NavController,
    private ngZone: NgZone,
  ) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopPolling();
      } else if (this.isModalOpen) {
        this.startPolling();
      }
    });
  }

  public async presentIfActive(
    maintenance: RemoteConfigMaintenanceStatus,
  ): Promise<void> {
    if (maintenance?.state !== 'active' || this.isModalOpen) {
      return;
    }

    await this.present(maintenance.message || '');
  }

  private async present(message: string): Promise<void> {
    this.isModalOpen = true;
    const modal = await this.modalController.create({
      component: MaintenanceModalComponent,
      componentProps: { message },
      cssClass: 'maintenance-modal',
      backdropDismiss: false,
    });

    this.activeModal = modal;
    modal.onDidDismiss().then(() => {
      this.isModalOpen = false;
      this.activeModal = null;
      this.stopPolling();
      this.ngZone.run(() => {
        void this.navController.navigateForward(['user-loader'], {
          replaceUrl: true,
        });
      });
    });

    await modal.present();
    this.startPolling();
  }

  private startPolling(): void {
    this.stopPolling();
    this.pollHandle = setInterval(async () => {
      const status = await this.remoteConfigService.checkConfig();
      if (status.maintenance.state !== 'active') {
        await this.activeModal?.dismiss();
      }
    }, POLL_INTERVAL_MS);
  }

  private stopPolling(): void {
    if (this.pollHandle) {
      clearInterval(this.pollHandle);
      this.pollHandle = null;
    }
  }
}
