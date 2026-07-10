import { Injector, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerAndroidScanningLibrary,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerScanOrientation,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';
import { Capacitor } from '@capacitor/core';
import { AlertOptions } from '@ionic/angular';
import { IonicUtilService } from './ionic-util.service';

@Injectable()
export class BarCodeScannerService {
  private flashEnabled = false;
  private _translate: TranslateService | null = null;

  private get translate(): TranslateService {
    if (!this._translate) {
      this._translate = this.injector.get(TranslateService);
    }
    return this._translate;
  }

  constructor(
    private ionicUtilService: IonicUtilService,
    private injector: Injector
  ) { }

  public async startScanner(): Promise<string | undefined> {
    try {
      if (!Capacitor.isNativePlatform() && !this.isSecureOrigin()) {
        await this.ionicUtilService.showAlert({
          header: this.translate.instant('BARCODE.CAMERA_BLOCKED'),
          message: this.translate.instant('BARCODE.CAMERA_BLOCKED_MSG'),
          buttons: [this.translate.instant('COMMON.OK')],
        });
      }

      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
        scanInstructions: 'Código de barras',
        scanButton: false,
        scanText: ' ',
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
        scanOrientation: CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
        android: {
          scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.ZXING,
        },
        web: {
          // Permitir elegir cámara en web (p.ej. traseros en móviles)
          showCameraSelection: true,
          scannerFPS: 30,
        },
      });
      // El plugin gestiona su propio ciclo de vida; no llamamos a stopScanner

      if (result && result.ScanResult) {
        return result.ScanResult;
      }
      // Sin resultados (no cancel): mostrar aviso con alerta de Ionic
      const alertOptions: AlertOptions = {
        header: this.translate.instant('COMMON.ERROR'),
        message: this.translate.instant('BARCODE.NO_DATA'),
        buttons: [
          {
            text: this.translate.instant('ACTIONS.ACCEPT'),
            cssClass: 'primary',
          },
        ],
      };
      await this.ionicUtilService.showAlert(alertOptions);
      return undefined;
    } catch (error: any) {
      const msg = (error && error.message) || '';
      if (/cancel/i.test(msg)) {
        return undefined;
      }
      const alertOptions: AlertOptions = {
        header: this.translate.instant('COMMON.ERROR'),
        message: msg || this.translate.instant('BARCODE.CAMERA_ERROR'),
        buttons: [
          {
            text: this.translate.instant('ACTIONS.ACCEPT'),
            cssClass: 'primary',
          },
        ],
      };
      await this.ionicUtilService.showAlert(alertOptions);
      return undefined;
    } 
  }

  public async toggleFlash(enabled: boolean): Promise<void> {
    // El plugin @capacitor/barcode-scanner no expone control de flash de forma universal.
    // Notificamos al usuario y mantenemos el estado local para el icono.
    this.flashEnabled = enabled;
    const alertOptions: AlertOptions = {
      header: this.translate.instant('COMMON.INFORMATION'),
      message: this.translate.instant('BARCODE.FLASH_UNAVAILABLE'),
      buttons: [
        {
          text: this.translate.instant('ACTIONS.ACCEPT'),
          cssClass: 'primary',
        },
      ],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  public getFlashStatus(): boolean {
    return this.flashEnabled;
  }

  public async scanFromGallery(): Promise<string | null> {
    try {
      console.log('Función de galería no implementada en este plugin');
      const alertOptions: AlertOptions = {
        header: this.translate.instant('COMMON.INFORMATION'),
        message: this.translate.instant('BARCODE.GALLERY_UNAVAILABLE'),
        buttons: [
          {
            text: this.translate.instant('ACTIONS.ACCEPT'),
            cssClass: 'primary',
          },
        ],
      };
      await this.ionicUtilService.showAlert(alertOptions);
      return null;
    } catch (error) {
      console.error('Error al acceder a la galería:', error);
      const alertOptions: AlertOptions = {
        header: this.translate.instant('COMMON.ERROR'),
        message: this.translate.instant('BARCODE.GALLERY_ERROR'),
        buttons: [
          {
            text: this.translate.instant('ACTIONS.ACCEPT'),
            cssClass: 'primary',
          },
        ],
      };
      await this.ionicUtilService.showAlert(alertOptions);
      return null;
    }
  }

  private isSecureOrigin(): boolean {
    try {
      const isSecure = (window as any).isSecureContext;
      const protocolSecure = location.protocol === 'https:';
      const host = location.hostname || '';
      const isLocal =
        host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
      return !!(isSecure || protocolSecure || isLocal);
    } catch {
      return false;
    }
  }
}
