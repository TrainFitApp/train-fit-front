import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MediaStatusView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { MEDIA_CONSENT_SHEET_OPTIONS, MediaConsentSheetComponent } from './media-consent-sheet.component';

export type MediaGateResult = 'ok' | 'premium' | 'declined' | 'disabled';

/**
 * Antes de subir nada: ¿puede (plan) y ha dado su consentimiento? Si falta
 * el consentimiento, lo pide en ese momento con la hoja de explicación.
 */
@Injectable({ providedIn: 'root' })
export class MediaGateService {
  private cached: { status: MediaStatusView; at: number } | null = null;

  constructor(private api: MediaApiService, private ionicUtilService: IonicUtilService) {}

  /** Estado de media (cacheado 30 s: se pide en varias pantallas seguidas). */
  public async status(force = false): Promise<MediaStatusView> {
    if (!force && this.cached && Date.now() - this.cached.at < 30000) return this.cached.status;
    const status = await firstValueFrom(this.api.status());
    this.cached = { status, at: Date.now() };
    return status;
  }

  public invalidate(): void {
    this.cached = null;
  }

  public async ensureCanUpload(): Promise<MediaGateResult> {
    const status = await this.status();
    if (!status.enabled) return 'disabled';
    if (!status.canUpload) return 'premium';
    if (status.consentAt) return 'ok';
    const result = await this.ionicUtilService.showModal({
      component: MediaConsentSheetComponent,
      componentProps: { hasTrainer: status.hasActiveTrainer },
      ...MEDIA_CONSENT_SHEET_OPTIONS,
    });
    if (result?.data === true) {
      this.cached = { status: { ...status, consentAt: new Date().toISOString() }, at: Date.now() };
      return 'ok';
    }
    return 'declined';
  }
}
