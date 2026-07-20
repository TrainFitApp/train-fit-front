import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaintenanceModalComponent } from 'src/app/features/maintenance/maintenance-modal.component';
import { RemoteConfigMaintenanceStatus } from '../../models/remote-config-status';
import { RemoteConfigService } from '../remote-config/remote-config.service';

const POLL_INTERVAL_MS = 30 * 1000;

@Injectable({ providedIn: 'root' })
export class MaintenanceModalService {
  private isModalOpen = false;
  private activeModal: HTMLIonModalElement | null = null;
  private pollHandle: ReturnType<typeof setInterval> | null = null;

  constructor(
    private modalController: ModalController,
    private remoteConfigService: RemoteConfigService,
  ) {}

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
      canDismiss: false,
    });

    this.activeModal = modal;
    modal.onDidDismiss().then(() => {
      this.isModalOpen = false;
      this.activeModal = null;
      this.stopPolling();
    });

    await modal.present();
    this.startPolling();
  }

  // Mientras el modal esté abierto, reintenta cada 30s y se autocierra en
  // cuanto el estado deje de ser 'active' (mantenimiento puede terminar con
  // la app en foreground, a diferencia del flujo de update forzada).
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
