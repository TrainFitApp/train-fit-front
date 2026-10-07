import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, firstValueFrom } from 'rxjs';
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
import { openMediaCamera } from './media-camera-modal.component';
import { confirmMediaDelete } from './media-confirm';

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
  // checkin / intake: la sesión responde a un check-in o al cuestionario de
  // alta (siempre visible para quien lo pidió).
  @Input() public mode: 'gallery' | 'checkin' | 'intake' = 'gallery';
  @Input() public poses: ProgressPose[] = PROGRESS_POSES;

  public slots: SlotState[] = [];
  public showGuide = true;
  public savingVisibility = false;

  // Fotos que se están guardando en el día ahora mismo. Con varias a la vez
  // (frente y perfil terminan de subir juntas) cada respuesta trae el día
  // tal y como lo dejó su petición, y la que llega la última no tiene por
  // qué ser la más reciente: al acabar todas se relee el día.
  private pendingWrites = 0;
  private writesOverlapped = false;

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

  // Las poses que cuentan son las pedidas (un check-in o el cuestionario de
  // alta pueden pedir solo algunas); la foto libre `extra` nunca cuenta.
  public get requiredPoses(): ProgressPose[] {
    return this.slots.map((slot) => slot.pose).filter((pose) => REQUIRED_POSES.includes(pose));
  }

  public get requiredDone(): number {
    return this.requiredPoses.filter((pose) => this.photoOf(pose)).length;
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

  // Cámara de la app con temporizador y la foto anterior de esta pose
  // superpuesta para repetir el encuadre.
  public async takePhoto(slot: SlotState): Promise<void> {
    if (slot.uploading) return;
    const reference = this.referenceOf(slot.pose) || this.photoOf(slot.pose);
    const file = await openMediaCamera(this.modalController, {
      mode: 'photo',
      title: this.translate.instant('MEDIA.POSE_' + slot.pose.toUpperCase()),
      referenceUrl: reference ? reference.asset.url || reference.asset.thumbUrl : null,
    });
    if (file) await this.upload(slot, file);
  }

  public async onFile(slot: SlotState, event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file) await this.upload(slot, file);
  }

  private async upload(slot: SlotState, file: Blob): Promise<void> {
    if (slot.uploading) return;
    slot.uploading = true;
    slot.progress = 0;
    try {
      const asset = await this.mediaUpload.uploadPhoto(file, 'progress_photo', (progress) => {
        slot.progress = progress.fraction;
      });
      await this.writeDay(this.mediaApi.setPhoto(this.date, slot.pose, asset.id));
    } catch (error) {
      this.showError(error);
    } finally {
      slot.uploading = false;
    }
  }

  public async remove(slot: SlotState): Promise<void> {
    if (slot.uploading) return;
    const pose = this.translate.instant('MEDIA.POSE_' + slot.pose.toUpperCase()).toLowerCase();
    if (!(await confirmMediaDelete(this.ionicUtilService, this.translate, 'photo', { pose }))) return;
    slot.uploading = true;
    slot.progress = 0;
    try {
      await this.writeDay(this.mediaApi.removePhoto(this.date, slot.pose));
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

  private async writeDay(request: Observable<{ day: ProgressDayView | null }>): Promise<void> {
    this.pendingWrites += 1;
    if (this.pendingWrites > 1) this.writesOverlapped = true;
    try {
      this.day = (await firstValueFrom(request)).day;
    } finally {
      this.pendingWrites -= 1;
      if (!this.pendingWrites && this.writesOverlapped) {
        this.writesOverlapped = false;
        await this.reloadDay();
      }
    }
  }

  private async reloadDay(): Promise<void> {
    try {
      const { days } = await firstValueFrom(this.mediaApi.listMyProgress({ from: this.date, to: this.date }));
      this.day = days.find((day) => day.date === this.date) || null;
    } catch {
      // Se queda con lo último que llegó: el día del servidor ya es el bueno.
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
