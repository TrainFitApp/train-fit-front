import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppRuntimeStatus } from '../../models/app-runtime-policy';
import { AppUpdateModalComponent } from 'src/app/features/app-update/app-update-modal.component';
import { MaintenanceModalComponent } from 'src/app/features/app-update/maintenance-modal.component';
import { AppRuntimePolicyApiService } from './app-runtime-policy-api.service';

@Injectable()
export class AppUpdateService {
  private isChecking = false;
  private updateModal: HTMLIonModalElement | null = null;
  private maintenanceModal: HTMLIonModalElement | null = null;

  constructor(
    private readonly appRuntimePolicyApiService: AppRuntimePolicyApiService,
    private readonly modalController: ModalController
  ) {}

  public async checkForRequiredUpdate(): Promise<void> {
    if (this.isChecking) {
      return;
    }

    this.isChecking = true;
    try {
      const status = await firstValueFrom(
        this.appRuntimePolicyApiService.getRuntimeStatus()
      );

      if (status?.maintenance?.applies) {
        await this.dismissUpdateModal();
        await this.showMaintenanceModal(status);
        return;
      }

      await this.dismissMaintenanceModal();

      if (status?.updateRequired?.applies) {
        await this.showRequiredUpdateModal(status);
        return;
      }

      await this.dismissUpdateModal();
    } catch (error) {
      // Fail-safe: if runtime policy cannot be loaded, users can keep using the app.
      console.warn('App runtime policy check failed', error);
    } finally {
      this.isChecking = false;
    }
  }

  private async showMaintenanceModal(status: AppRuntimeStatus): Promise<void> {
    if (this.maintenanceModal) {
      return;
    }

    let modal: HTMLIonModalElement;
    modal = await this.modalController.create({
      component: MaintenanceModalComponent,
      componentProps: {
        title: status.maintenance.title,
        message: status.maintenance.message,
        expectedEndAt: status.maintenance.expectedEndAt,
      },
      cssClass: 'app-maintenance-modal',
      backdropDismiss: false,
      canDismiss: async (_data?: unknown, role?: string) =>
        role === 'policy-cleared',
    });

    modal.onDidDismiss().then(() => {
      if (this.maintenanceModal === modal) {
        this.maintenanceModal = null;
      }
    });

    this.maintenanceModal = modal;
    await modal.present();
  }

  private async showRequiredUpdateModal(status: AppRuntimeStatus): Promise<void> {
    if (this.updateModal) {
      return;
    }

    const modal = await this.modalController.create({
      component: AppUpdateModalComponent,
      componentProps: {
        title: status.updateRequired.title,
        message: status.updateRequired.message,
        currentVersion:
          status.updateRequired.currentVersion || environment.APP_VERSION,
        requiredVersion: status.updateRequired.minVersion || 'ultima',
        updateHandler: () => this.openStore(),
      },
      cssClass: 'app-update-required-modal',
      backdropDismiss: false,
      canDismiss: async (_data?: unknown, role?: string) =>
        role === 'policy-cleared',
    });

    modal.onDidDismiss().then(() => {
      if (this.updateModal === modal) {
        this.updateModal = null;
      }
    });

    this.updateModal = modal;
    await modal.present();
  }

  private async dismissMaintenanceModal(): Promise<void> {
    if (!this.maintenanceModal) {
      return;
    }

    try {
      await this.maintenanceModal.dismiss(undefined, 'policy-cleared');
    } catch (error) {
      console.warn('Failed to dismiss maintenance modal', error);
    } finally {
      this.maintenanceModal = null;
    }
  }

  private async dismissUpdateModal(): Promise<void> {
    if (!this.updateModal) {
      return;
    }

    try {
      await this.updateModal.dismiss(undefined, 'policy-cleared');
    } catch (error) {
      console.warn('Failed to dismiss update modal', error);
    } finally {
      this.updateModal = null;
    }
  }

  private async openStore(): Promise<void> {
    const platform = Capacitor.getPlatform();
    const url =
      platform === 'ios'
        ? environment.APP_STORE_URL
        : environment.GOOGLE_PLAY_URL;

    if (!url) {
      console.warn('Missing store URL for update flow');
      return;
    }

    await Browser.open({ url });
  }
}
