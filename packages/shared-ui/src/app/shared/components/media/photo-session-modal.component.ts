import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import {
  PROGRESS_POSES,
  ProgressDayView,
  ProgressPhotoView,
  ProgressPose,
  REQUIRED_POSES,
} from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { mediaErrorKey } from 'src/app/core/services/media/media-errors';
import { MediaUploadService } from 'src/app/core/services/media/media-upload.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

interface SlotState {
  pose: ProgressPose;
  uploading: boolean;
  progress: number;
}

/**
 * Sesión de fotos guiada: una ranura por pose, con la foto de la última vez
 * en pequeño para repetir el encuadre. Cada foto se sube al hacerla; al
 * cerrar devuelve el día actualizado (o null si no quedó ninguna foto).
 *
 * Las fotos se toman con <input type="file" capture>: no pasan por el carrete
 * del móvil (decisión de privacidad del plan).
 */
@Component({
  selector: 'app-photo-session-modal',
  templateUrl: './photo-session-modal.component.html',
  styleUrls: ['./photo-session-modal.component.scss'],
})
export class PhotoSessionModalComponent implements OnInit {
  @Input() public date = '';
  @Input() public day: ProgressDayView | null = null;
  // Sesión anterior, para enseñar la foto de referencia de cada pose.
  @Input() public previousDay: ProgressDayView | null = null;
  @Input() public hasTrainer = false;
  // checkin: la sesión responde a un check-in (siempre visible para quien lo pidió).
  @Input() public mode: 'gallery' | 'checkin' = 'gallery';
  @Input() public poses: ProgressPose[] = PROGRESS_POSES;

  public slots: SlotState[] = [];
  public showGuide = true;
  public savingVisibility = false;

  constructor(
    private modalController: ModalController,
    private mediaApi: MediaApiService,
    private mediaUpload: MediaUploadService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    const poses = this.poses?.length ? this.poses : PROGRESS_POSES;
    // `extra` siempre al final y opcional.
    const ordered = [...REQUIRED_POSES.filter((pose) => poses.includes(pose)), ...poses.filter((pose) => !REQUIRED_POSES.includes(pose))];
    this.slots = [...new Set(ordered)].map((pose) => ({ pose, uploading: false, progress: 0 }));
    // La guía se abre sola solo la primera vez (sin fotos aún).
    this.showGuide = !this.day?.photos?.length;
  }

  public get dateLabel(): string {
    if (!this.date) return '';
    const [year, month, day] = this.date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(this.translate.currentLang || 'es', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  public get requiredDone(): number {
    return REQUIRED_POSES.filter((pose) => this.photoOf(pose)).length;
  }

  public get anyUploading(): boolean {
    return this.slots.some((slot) => slot.uploading);
  }

  public photoOf(pose: ProgressPose): ProgressPhotoView | null {
    return this.day?.photos?.find((photo) => photo.pose === pose) || null;
  }

  public referenceOf(pose: ProgressPose): ProgressPhotoView | null {
    return this.previousDay?.photos?.find((photo) => photo.pose === pose) || null;
  }

  public trackSlot(_index: number, slot: SlotState): string {
    return slot.pose;
  }

  public async onFile(slot: SlotState, event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file || slot.uploading) return;
    slot.uploading = true;
    slot.progress = 0;
    try {
      const asset = await this.mediaUpload.uploadPhoto(file, 'progress_photo', (progress) => {
        slot.progress = progress.fraction;
      });
      const { day } = await firstValueFrom(this.mediaApi.setPhoto(this.date, slot.pose, asset.id));
      this.day = day;
    } catch (error) {
      this.showError(error);
    } finally {
      slot.uploading = false;
    }
  }

  public async remove(slot: SlotState): Promise<void> {
    if (slot.uploading) return;
    slot.uploading = true;
    slot.progress = 0;
    try {
      const { day } = await firstValueFrom(this.mediaApi.removePhoto(this.date, slot.pose));
      this.day = day;
    } catch (error) {
      this.showError(error);
    } finally {
      slot.uploading = false;
    }
  }

  public async toggleVisibility(event: Event): Promise<void> {
    const visible = (event as CustomEvent).detail?.checked !== false;
    if (!this.day) return;
    this.savingVisibility = true;
    try {
      const { day } = await firstValueFrom(this.mediaApi.updateDay(this.date, { hiddenFromTrainers: !visible }));
      this.day = day;
    } catch (error) {
      this.showError(error);
    } finally {
      this.savingVisibility = false;
    }
  }

  public close(): void {
    if (this.anyUploading) return;
    this.modalController.dismiss(this.day?.photos?.length ? this.day : null, 'done');
  }

  private showError(error: unknown): void {
    this.ionicUtilService.showToast({
      message: this.translate.instant(mediaErrorKey(error)),
      duration: 2600,
      position: 'bottom',
      color: 'danger',
    });
  }
}
