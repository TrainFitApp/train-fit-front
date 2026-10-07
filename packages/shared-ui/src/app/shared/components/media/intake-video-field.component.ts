import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { MediaStatusView, ProgressVideoView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { mediaErrorKey } from 'src/app/core/services/media/media-errors';
import { MediaUploadService } from 'src/app/core/services/media/media-upload.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import { MediaGateService } from './media-gate.service';
import { openMediaCamera } from './media-camera-modal.component';

/**
 * Un vídeo que el profesional pide en el cuestionario de alta («Sentadilla
 * sin peso, de perfil»). El cliente lo graba con la cámara de la app o lo
 * elige de la galería; se sube como vídeo de progreso de hoy, con lo que se
 * pidió como nota, y la respuesta es su id. Al enviar el cuestionario queda
 * enviado a ese profesional. `readonly`: solo lo enseña.
 */
@Component({
  selector: 'app-intake-video-field',
  templateUrl: './intake-video-field.component.html',
  styleUrls: ['./intake-video-field.component.scss'],
})
export class IntakeVideoFieldComponent implements OnInit {
  @Input() public label = '';
  @Input() public assetId: string | null = null;
  @Input() public readonly = false;
  @Output() public assetIdChange = new EventEmitter<string | null>();
  // Mientras sube, el paso no se puede dejar (se perdería la subida).
  @Output() public uploadingChange = new EventEmitter<boolean>();

  public loading = true;
  public video: ProgressVideoView | null = null;
  private status: MediaStatusView | null = null;
  public uploading = false;
  public progress = 0;

  constructor(
    private mediaApi: MediaApiService,
    private mediaUpload: MediaUploadService,
    private mediaGate: MediaGateService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService,
    private modalController: ModalController
  ) {}

  public async ngOnInit(): Promise<void> {
    if (!this.readonly) this.mediaGate.status().then((status) => (this.status = status)).catch(() => {});
    if (!this.assetId) {
      this.loading = false;
      return;
    }
    // El vídeo ya respondido sigue en su progreso (si no lo ha borrado).
    try {
      const { days } = await firstValueFrom(this.mediaApi.listMyProgress());
      this.video = days.flatMap((day) => day.videos).find((video) => video.asset.id === this.assetId) || null;
      if (!this.video && !this.readonly) this.assetIdChange.emit(null);
    } catch {
      this.video = null;
    } finally {
      this.loading = false;
    }
  }

  // Cámara de la app, con temporizador (abre un modal: se puede esperar al
  // consentimiento antes).
  public async record(): Promise<void> {
    if (this.uploading || !(await this.canUpload())) return;
    const file = await openMediaCamera(this.modalController, { mode: 'video', title: this.label, maxDurationSec: 180 });
    if (file) await this.upload(file);
  }

  // iOS no abre un <input type="file"> después de una espera: con todo en
  // regla se abre en el mismo toque; si no, primero el consentimiento.
  public async pick(input: HTMLInputElement): Promise<void> {
    if (this.uploading) return;
    if (this.status?.canUpload && this.status?.consentAt) {
      input.click();
      return;
    }
    if (await this.canUpload()) input.click();
  }

  public async onFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file) await this.upload(file);
  }

  private async canUpload(): Promise<boolean> {
    const ok = (await this.mediaGate.ensureCanUpload()) === 'ok';
    if (ok) this.status = await this.mediaGate.status();
    return ok;
  }

  private async upload(file: File): Promise<void> {
    this.setUploading(true);
    this.progress = 0;
    try {
      const info = await this.mediaUpload.inspectVideo(file);
      const asset = await this.mediaUpload.uploadVideo(file, 'progress_video', (progress) => (this.progress = progress.fraction), info);
      const { day } = await firstValueFrom(this.mediaApi.addVideo(localIsoDate(), asset.id, this.label.slice(0, 500)));
      this.video = day.videos.find((video) => video.asset.id === asset.id) || null;
      this.assetIdChange.emit(this.video ? asset.id : null);
    } catch (error) {
      this.ionicUtilService.showToast({
        message: this.translate.instant(mediaErrorKey(error)),
        duration: 2800,
        position: 'bottom',
        color: 'danger',
      });
    } finally {
      this.setUploading(false);
    }
  }

  private setUploading(uploading: boolean): void {
    this.uploading = uploading;
    this.uploadingChange.emit(uploading);
  }

  public duration(seconds: number | null | undefined): string {
    const total = Math.round(seconds || 0);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }
}
