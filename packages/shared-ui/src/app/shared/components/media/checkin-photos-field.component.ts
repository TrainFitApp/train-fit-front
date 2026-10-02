import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProgressDayView, ProgressPose, REQUIRED_POSES } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { MediaGateService } from './media-gate.service';
import { PhotoSessionModalComponent } from './photo-session-modal.component';

/**
 * Campo «Fotos de progreso» de un check-in. La respuesta es el día de
 * progreso (su id): el cliente hace las fotos con la misma captura guiada de
 * Medidas › Fotos y quedan enviadas al profesional que pidió el check-in.
 */
@Component({
  selector: 'app-checkin-photos-field',
  templateUrl: './checkin-photos-field.component.html',
  styleUrls: ['./checkin-photos-field.component.scss'],
})
export class CheckinPhotosFieldComponent implements OnInit {
  @Input() public value: unknown = null;
  @Input() public poses: ProgressPose[] | undefined = REQUIRED_POSES;
  @Output() public valueChange = new EventEmitter<string | null>();

  public day: ProgressDayView | null = null;
  public previousDay: ProgressDayView | null = null;
  public loading = true;

  constructor(
    private mediaApi: MediaApiService,
    private mediaGate: MediaGateService,
    private ionicUtilService: IonicUtilService,
    private utilService: UtilService
  ) {}

  private get today(): string {
    return this.utilService.formatDateToYYYYMMDD(new Date());
  }

  public async ngOnInit(): Promise<void> {
    try {
      const from = this.utilService.formatDateToYYYYMMDD(new Date(Date.now() - 60 * 86400000));
      const { days } = await firstValueFrom(this.mediaApi.listMyProgress({ from }));
      const withPhotos = days.filter((day) => day.photos.length);
      // Lo ya respondido manda; si no, las fotos de hoy si las hay.
      this.day = withPhotos.find((day) => day.id === this.value) || withPhotos.find((day) => day.date === this.today) || null;
      this.previousDay = withPhotos.find((day) => day.date < (this.day?.date || this.today)) || null;
      if (this.day && this.day.id !== this.value) this.valueChange.emit(this.day.id);
    } catch {
      this.day = null;
    } finally {
      this.loading = false;
    }
  }

  public get requiredPoses(): ProgressPose[] {
    return (this.poses?.length ? this.poses : REQUIRED_POSES).filter((pose) => pose !== 'extra');
  }

  public get missing(): number {
    return this.requiredPoses.filter((pose) => !this.day?.photos.some((photo) => photo.pose === pose)).length;
  }

  public async open(): Promise<void> {
    const gate = await this.mediaGate.ensureCanUpload();
    if (gate !== 'ok') return;
    const date = this.day?.date || this.today;
    const result = await this.ionicUtilService.showModal({
      component: PhotoSessionModalComponent,
      componentProps: {
        date,
        day: this.day,
        previousDay: this.previousDay,
        hasTrainer: true,
        mode: 'checkin',
        poses: this.poses?.length ? this.poses : REQUIRED_POSES,
      },
      cssClass: 'fullscreen-modal',
    });
    // Cerrado sin pasar por «Listo» (botón atrás de Android): se deja como estaba.
    if (result?.role !== 'done') return;
    const updated = (result.data as ProgressDayView | null) || null;
    this.day = updated;
    this.valueChange.emit(updated?.photos?.length ? updated.id : null);
  }
}
