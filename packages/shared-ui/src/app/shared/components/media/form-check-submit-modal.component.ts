import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { mediaErrorKey } from 'src/app/core/services/media/media-errors';
import { MediaUploadService } from 'src/app/core/services/media/media-upload.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { executedSummary, prescribedSummary, setSnapshotOf } from './set-summary.util';
import { openMediaCamera } from './media-camera-modal.component';

/**
 * Enviar un vídeo de una serie al entrenador (revisión de técnica). El vídeo
 * viaja con la serie elegida —prescrito y ejecutado— para que el entrenador
 * vea qué se hizo en ESE vídeo. Cierra con role 'sent' y la revisión creada.
 */
@Component({
  selector: 'app-form-check-submit-modal',
  templateUrl: './form-check-submit-modal.component.html',
  styleUrls: ['./form-check-submit-modal.component.scss'],
})
export class FormCheckSubmitModalComponent implements OnInit, OnDestroy {
  @Input() public exerciseId: string | null = null;
  @Input() public exerciseName = '';
  @Input() public tableId: string | null = null;
  @Input() public sets: Record<string, any>[] = [];
  @Input() public date = '';

  public file: File | null = null;
  public previewUrl: SafeUrl | null = null;
  private rawPreviewUrl: string | null = null;
  public durationSec = 0;
  public selectedSet: number | null = null;
  public note = '';
  public uploading = false;
  public progress = 0;
  public inspecting = false;

  constructor(
    private modalController: ModalController,
    private mediaApi: MediaApiService,
    private mediaUpload: MediaUploadService,
    private ionicUtilService: IonicUtilService,
    private utilService: UtilService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    if (!this.date) this.date = this.utilService.formatDateToYYYYMMDD(new Date());
    // Por defecto, la última serie hecha (la que acaba de grabar), o la primera.
    const lastDone = [...(this.sets || [])].map((set, index) => ({ set, index })).reverse().find(({ set }) => set['doned']);
    this.selectedSet = lastDone ? lastDone.index : this.sets?.length ? 0 : null;
  }

  public ngOnDestroy(): void {
    this.revokePreview();
  }

  private revokePreview(): void {
    if (this.rawPreviewUrl) URL.revokeObjectURL(this.rawPreviewUrl);
    this.rawPreviewUrl = null;
    this.previewUrl = null;
  }

  public executed(set: Record<string, any>): string | null {
    return executedSummary(set, this.translate.instant('MEDIA.RIR_FAIL'));
  }

  public prescribed(set: Record<string, any>): string | null {
    return prescribedSummary(set, this.translate.instant('MEDIA.RIR_FAIL'));
  }

  // Cámara de la app: con temporizador se puede apoyar el móvil, ponerse en
  // posición y grabar la serie entera sin que nadie sujete el móvil.
  public async record(): Promise<void> {
    if (this.inspecting) return;
    const file = await openMediaCamera(this.modalController, {
      mode: 'video',
      title: this.translate.instant('MEDIA.FORM_CHECK_TITLE'),
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
    this.inspecting = true;
    try {
      const info = await this.mediaUpload.inspectVideo(file);
      this.revokePreview();
      this.file = file;
      this.durationSec = info.durationSec;
      this.rawPreviewUrl = URL.createObjectURL(file);
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(this.rawPreviewUrl);
    } catch (error) {
      this.showError(error);
    } finally {
      this.inspecting = false;
    }
  }

  public clearFile(): void {
    if (this.uploading) return;
    this.revokePreview();
    this.file = null;
  }

  public onNote(event: Event): void {
    this.note = (event.target as HTMLTextAreaElement).value;
  }

  public async send(): Promise<void> {
    if (!this.file || this.uploading) return;
    this.uploading = true;
    this.progress = 0;
    try {
      const asset = await this.mediaUpload.uploadVideo(this.file, 'form_check', (progress) => {
        this.progress = progress.fraction;
      });
      const set = this.selectedSet != null ? this.sets[this.selectedSet] : null;
      const { formCheck } = await firstValueFrom(
        this.mediaApi.createFormCheck({
          assetId: asset.id,
          exerciseId: this.exerciseId,
          exerciseName: this.exerciseName,
          tableId: this.tableId,
          date: this.date,
          setSnapshot: this.selectedSet != null ? setSnapshotOf(set, this.selectedSet) : null,
          clientNote: this.note.trim(),
        })
      );
      this.ionicUtilService.showToast({
        message: this.translate.instant('MEDIA.FORM_CHECK_SENT'),
        duration: 2200,
        position: 'bottom',
        color: 'success',
      });
      await this.modalController.dismiss(formCheck, 'sent');
    } catch (error) {
      this.showError(error);
      this.uploading = false;
    }
  }

  public close(): void {
    if (this.uploading) return;
    this.modalController.dismiss(null, 'cancel');
  }

  public duration(seconds: number): string {
    const total = Math.round(seconds || 0);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  private showError(error: unknown): void {
    this.ionicUtilService.showToast({
      message: this.translate.instant(mediaErrorKey(error)),
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });
  }
}
