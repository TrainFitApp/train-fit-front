import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { LINKS } from 'src/app/shared/constants/links';

export const MEDIA_CONSENT_SHEET_OPTIONS = {
  cssClass: 'media-consent-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};

/**
 * Consentimiento explícito antes de la primera foto o vídeo (RGPD): qué se
 * guarda, quién lo ve y cómo se borra, y una casilla aparte, sin marcar, para
 * los datos de físico y salud que pueden mostrar. Solo lo enseña
 * MediaGateService a quien puede subir, en el momento de pulsar el botón.
 * Cierra con `true` si acepta; la fecha y la versión del texto quedan
 * guardadas en el servidor (media-access#MEDIA_CONSENT_VERSION: si cambia
 * este texto, sube esa versión).
 */
@Component({
  selector: 'app-media-consent-sheet',
  templateUrl: './media-consent-sheet.component.html',
  styleUrls: ['./media-consent-sheet.component.scss'],
})
export class MediaConsentSheetComponent {
  // Con entrenador activo se explica que lo verá por defecto.
  @Input() public hasTrainer = false;

  // Casilla de datos de salud: nunca marcada de serie.
  public agreed = false;
  public readonly privacyUrl = LINKS.privacyAndPolicy;
  public saving = false;
  public failed = false;

  constructor(private modalController: ModalController, private mediaApi: MediaApiService) {}

  public toggleAgreed(): void {
    this.agreed = !this.agreed;
  }

  public async openPrivacy(event: Event): Promise<void> {
    event.stopPropagation();
    event.preventDefault();
    await Browser.open({ url: LINKS.privacyAndPolicy });
  }

  public async accept(): Promise<void> {
    if (this.saving || !this.agreed) return;
    this.saving = true;
    this.failed = false;
    try {
      await firstValueFrom(this.mediaApi.giveConsent());
      await this.modalController.dismiss(true);
    } catch {
      this.failed = true;
    } finally {
      this.saving = false;
    }
  }

  public cancel(): void {
    this.modalController.dismiss(false);
  }
}
