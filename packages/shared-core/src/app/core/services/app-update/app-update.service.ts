import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUpdateModalComponent } from 'src/app/features/app-update/app-update-modal.component';
import { AppVersionResponse } from '../../models/app-version-response';
import { HttpService } from '../http/http.service';

@Injectable()
export class AppUpdateService {
  private readonly isRequiredUpdateScreenDisabled = true;
  private isChecking = false;
  private isModalOpen = false;

  constructor(
    private httpService: HttpService,
    private modalController: ModalController
  ) {}

  public async checkForRequiredUpdate(): Promise<void> {
    if (
      this.isRequiredUpdateScreenDisabled ||
      !Capacitor.isNativePlatform() ||
      this.isChecking ||
      this.isModalOpen
    ) {
      return;
    }

    this.isChecking = true;
    try {
      const response = await firstValueFrom(
        this.httpService.get<AppVersionResponse>('app/version')
      );
      const backendVersion = String(response?.version || '').trim();
      const appVersion = String(environment.APP_VERSION || '').trim();

      if (!backendVersion || !appVersion || backendVersion === appVersion) {
        return;
      }

      await this.showRequiredUpdateModal(appVersion, backendVersion);
    } catch (error) {
      // Fail-safe: if version check cannot complete, users can keep using the app.
      console.warn('App version check failed', error);
    } finally {
      this.isChecking = false;
    }
  }

  private async showRequiredUpdateModal(
    currentVersion: string,
    requiredVersion: string
  ): Promise<void> {
    if (this.isModalOpen) {
      return;
    }

    this.isModalOpen = true;
    const modal = await this.modalController.create({
      component: AppUpdateModalComponent,
      componentProps: {
        currentVersion,
        requiredVersion,
        updateHandler: () => this.openStore(),
      },
      cssClass: 'app-update-required-modal',
      backdropDismiss: false,
      canDismiss: false,
    });

    await modal.present();
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
