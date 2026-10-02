import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';

export const MEDIA_CONSENT_SHEET_OPTIONS = {
  cssClass: 'media-consent-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};

/**
 * Consentimiento explícito antes de la primera foto o vídeo (RGPD): qué se
 * guarda, quién lo ve y cómo se borra. Cierra con `true` si acepta; la fecha
 * queda guardada en el servidor.
 */
@Component({
  selector: 'app-media-consent-sheet',
  templateUrl: './media-consent-sheet.component.html',
  styleUrls: ['./media-consent-sheet.component.scss'],
})
export class MediaConsentSheetComponent {
  // Con entrenador activo se explica que lo verá por defecto.
  @Input() public hasTrainer = false;

  public saving = false;
  public failed = false;

  constructor(private modalController: ModalController, private mediaApi: MediaApiService) {}

  public async accept(): Promise<void> {
    if (this.saving) return;
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
