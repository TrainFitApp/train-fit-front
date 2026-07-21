import { Injectable } from "@angular/core";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import { ModalController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { AppUpdateModalComponent } from "src/app/features/app-update/app-update-modal.component";
import { RemoteConfigForceUpdateStatus } from "../../models/remote-config-status";

@Injectable()
export class AppUpdateService {
  private isModalOpen = false;

  constructor(private modalController: ModalController) {}

  // `forceUpdate` viene ya calculado por RemoteConfigService/RemoteConfigGateService
  // (comparación semver de versión mínima por plataforma, hecha en el backend).
  public async presentRequiredUpdate(
    forceUpdate: RemoteConfigForceUpdateStatus,
  ): Promise<void> {
    if (!forceUpdate?.required || this.isModalOpen) {
      return;
    }

    await this.showRequiredUpdateModal(
      environment.APP_VERSION,
      forceUpdate.minVersion || "",
      forceUpdate.message || "",
    );
  }

  private async showRequiredUpdateModal(
    currentVersion: string,
    requiredVersion: string,
    customMessage: string,
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
        customMessage,
        updateHandler: () => this.openStore(),
      },
      cssClass: "app-update-required-modal",
      backdropDismiss: false,
      canDismiss: false,
    });

    modal.onDidDismiss().then(() => {
      this.isModalOpen = false;
    });

    await modal.present();
  }

  private async openStore(): Promise<void> {
    const platform = Capacitor.getPlatform();

    // Web no tiene tienda de apps: la "actualización" es simplemente recargar,
    // el usuario ya recibe el build más reciente al hacerlo.
    if (platform === "web") {
      window.location.reload();
      return;
    }

    const url =
      platform === "ios"
        ? environment.APP_STORE_URL
        : environment.GOOGLE_PLAY_URL;

    if (!url) {
      console.warn("Missing store URL for update flow");
      return;
    }

    await Browser.open({ url });
  }
}
