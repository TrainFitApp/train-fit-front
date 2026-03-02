import { Injectable } from '@angular/core';
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

  constructor(private ionicUtilService: IonicUtilService) { }

  public async startScanner(): Promise<string | undefined> {
    try {
      if (!Capacitor.isNativePlatform() && !this.isSecureOrigin()) {
        await this.ionicUtilService.showAlert({
          header: 'Cámara bloqueada',
          message:
            'Para usar el escáner en navegador, abre la app en https o localhost. En móvil conectando por IP (http) el navegador bloquea la cámara.',
          buttons: ['OK'],
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
        header: 'Error',
        message: 'Datos no encontrados',
        buttons: [
          {
            text: 'ACEPTAR',
            cssClass: 'primary',
          },
        ],
      };
      await this.ionicUtilService.showAlert(alertOptions);
      return undefined;
    } catch (error: any) {
      const msg = (error && error.message) || '';
      // Si el error parece ser por cancelación del usuario, no mostrar mensaje
      if (/cancel/i.test(msg)) {
        return undefined;
      }
      const alertOptions: AlertOptions = {
        header: 'Error',
        message: msg || 'Acceso a cámara no permitido o error de escaneo',
        buttons: [
          {
            text: 'ACEPTAR',
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
      header: 'Información',
      message: 'Control de flash no disponible con este escáner',
      buttons: [
        {
          text: 'ACEPTAR',
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
        header: 'Información',
        message: 'Función de galería no disponible',
        buttons: [
          {
            text: 'ACEPTAR',
            cssClass: 'primary',
          },
        ],
      };
      await this.ionicUtilService.showAlert(alertOptions);
      return null;
    } catch (error) {
      console.error('Error al acceder a la galería:', error);
      const alertOptions: AlertOptions = {
        header: 'Error',
        message: 'Error al acceder a la galería',
        buttons: [
          {
            text: 'ACEPTAR',
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
