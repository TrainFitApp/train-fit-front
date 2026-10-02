import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { MediaStatusView, ProgressDayView, ProgressVideoView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { mediaErrorKey } from 'src/app/core/services/media/media-errors';
import { MediaUploadService } from 'src/app/core/services/media/media-upload.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { MediaGateService } from './media-gate.service';
import { openMediaCamera } from './media-camera-modal.component';
import { confirmMediaDelete } from './media-confirm';

interface VideoEntry {
  day: ProgressDayView;
  video: ProgressVideoView;
}

interface Draft {
  file: File;
  durationSec: number;
  note: string;
  uploading: boolean;
  progress: number;
}

/**
 * Vídeos de progreso (posing, movilidad…), fuera de un ejercicio concreto.
 * mode="client": los suyos, con subida; mode="trainer": los de su cliente.
 */
@Component({
  selector: 'app-progress-videos',
  templateUrl: './progress-videos.component.html',
  styleUrls: ['./progress-videos.component.scss'],
})
export class ProgressVideosComponent implements OnInit, OnChanges {
  @Input() public mode: 'client' | 'trainer' = 'client';
  @Input() public clientId: string | null = null;

  public loading = true;
  public failed = false;
  public status: MediaStatusView | null = null;
  public entries: VideoEntry[] = [];
  public draft: Draft | null = null;
  public playing: string | null = null;

  constructor(
    private mediaApi: MediaApiService,
    private mediaUpload: MediaUploadService,
    private mediaGate: MediaGateService,
    private ionicUtilService: IonicUtilService,
    private utilService: UtilService,
    private translate: TranslateService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && !changes['clientId'].firstChange) this.load();
  }

  public get isClient(): boolean {
    return this.mode === 'client';
  }

  public get canUpload(): boolean {
    return !!this.status?.enabled && !!this.status?.canUpload;
  }

  public async load(): Promise<void> {
    this.loading = true;
    this.failed = false;
    try {
      let days: ProgressDayView[] = [];
      if (this.isClient) {
        const [status, progress] = await Promise.all([this.mediaGate.status(true), firstValueFrom(this.mediaApi.listMyProgress())]);
        this.status = status;
        days = progress.days;
      } else if (this.clientId) {
        days = (await firstValueFrom(this.mediaApi.listClientProgress(this.clientId))).days;
      }
      this.entries = days
        .flatMap((day) => day.videos.map((video) => ({ day, video })))
        .sort((a, b) => String(b.video.createdAt).localeCompare(String(a.video.createdAt)));
    } catch {
      this.failed = true;
    } finally {
      this.loading = false;
    }
  }

  public async pick(input: HTMLInputElement): Promise<void> {
    // Con todo en regla se abre el selector en el mismo toque: iOS no deja
    // abrir un <input type="file"> después de una espera asíncrona.
    if (this.status?.canUpload && this.status?.consentAt) {
      input.click();
      return;
    }
    const gate = await this.mediaGate.ensureCanUpload();
    if (gate === 'ok') {
      this.status = await this.mediaGate.status();
      input.click();
    } else if (gate === 'premium') {
      this.status = await this.mediaGate.status(true);
    }
  }

  // Cámara de la app, con temporizador. Aquí sí se puede esperar al permiso
  // y al consentimiento antes: abre un modal, no un <input type="file">.
  public async record(): Promise<void> {
    if (!(this.status?.canUpload && this.status?.consentAt)) {
      const gate = await this.mediaGate.ensureCanUpload();
      if (gate === 'premium') this.status = await this.mediaGate.status(true);
      if (gate !== 'ok') return;
      this.status = await this.mediaGate.status();
    }
    const file = await openMediaCamera(this.modalController, {
      mode: 'video',
      title: this.translate.instant('MEDIA.SECTION_VIDEOS'),
      maxDurationSec: 180,
    });
    if (file) await this.useFile(file);
  }

  public async onFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file) await this.useFile(file);
  }

  private async useFile(file: File): Promise<void> {
    try {
      const info = await this.mediaUpload.inspectVideo(file);
      this.draft = { file, durationSec: info.durationSec, note: '', uploading: false, progress: 0 };
    } catch (error) {
      this.showError(error);
    }
  }

  public cancelDraft(): void {
    if (this.draft?.uploading) return;
    this.draft = null;
  }

  public async upload(): Promise<void> {
    const draft = this.draft;
    if (!draft || draft.uploading) return;
    draft.uploading = true;
    draft.progress = 0;
    try {
      const asset = await this.mediaUpload.uploadVideo(draft.file, 'progress_video', (progress) => {
        draft.progress = progress.fraction;
      });
      const today = this.utilService.formatDateToYYYYMMDD(new Date());
      await firstValueFrom(this.mediaApi.addVideo(today, asset.id, draft.note.trim()));
      this.draft = null;
      await this.load();
    } catch (error) {
      draft.uploading = false;
      this.showError(error);
    }
  }

  public async remove(entry: VideoEntry): Promise<void> {
    if (!(await confirmMediaDelete(this.ionicUtilService, this.translate, 'video'))) return;
    try {
      await firstValueFrom(this.mediaApi.removeVideo(entry.day.date, entry.video.asset.id));
      this.entries = this.entries.filter((item) => item.video.asset.id !== entry.video.asset.id);
    } catch (error) {
      this.showError(error);
    }
  }

  public longDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(this.translate.currentLang || 'es', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  public duration(seconds: number | null | undefined): string {
    const total = Math.round(seconds || 0);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  public trackEntry(_index: number, entry: VideoEntry): string {
    return entry.video.asset.id;
  }

  public onNote(event: Event): void {
    if (this.draft) this.draft.note = (event.target as HTMLTextAreaElement).value;
  }

  private showError(error: unknown): void {
    this.ionicUtilService.showToast({
      message: this.translate.instant(mediaErrorKey(error)),
      duration: 2800,
      position: 'bottom',
      color: 'danger',
    });
  }
}
