import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import {
  MediaStatusView,
  ProgressDayView,
  ProgressPose,
  ProgressTrainerShare,
  REQUIRED_POSES,
} from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { mediaErrorKey } from 'src/app/core/services/media/media-errors';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { CompareSide } from './photo-compare.component';
import { MediaGateService } from './media-gate.service';
import { PhotoSessionModalComponent } from './photo-session-modal.component';
import { PhotoViewerModalComponent } from './photo-viewer-modal.component';

/**
 * Fotos de progreso: comparador antes/después, línea temporal por días y
 * privacidad con cada profesional (docs/plan-medidas-multimedia.md).
 *
 *   mode="client": las del propio usuario, con captura guiada, card de
 *     premium y la pregunta única de compartir el historial.
 *   mode="trainer": las que un profesional puede ver de su cliente
 *     (`clientId`), solo lectura.
 */
@Component({
  selector: 'app-progress-photos',
  templateUrl: './progress-photos.component.html',
  styleUrls: ['./progress-photos.component.scss'],
})
export class ProgressPhotosComponent implements OnInit, OnChanges {
  @Input() public mode: 'client' | 'trainer' = 'client';
  @Input() public clientId: string | null = null;

  public loading = true;
  public failed = false;
  public status: MediaStatusView | null = null;
  public days: ProgressDayView[] = [];
  public trainers: ProgressTrainerShare[] = [];
  public since: string | null = null;
  public historyShared = false;

  public comparePose: ProgressPose = 'front';
  public beforeDate: string | null = null;
  public afterDate: string | null = null;
  public compareMode: 'slider' | 'side' = 'slider';
  public readonly comparePoses: ProgressPose[] = REQUIRED_POSES;

  constructor(
    private mediaApi: MediaApiService,
    private mediaGate: MediaGateService,
    private ionicUtilService: IonicUtilService,
    private utilService: UtilService,
    private translate: TranslateService
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

  public get today(): string {
    return this.utilService.formatDateToYYYYMMDD(new Date());
  }

  public get todayDay(): ProgressDayView | null {
    return this.days.find((day) => day.date === this.today) || null;
  }

  public get photoDays(): ProgressDayView[] {
    return this.days.filter((day) => day.photos.length > 0);
  }

  // Estado del comparador, calculado solo cuando cambia algo (no en cada
  // detección de cambios: los getters devolvían objetos nuevos cada vez).
  public compareCandidates: ProgressDayView[] = [];
  public beforeSide: CompareSide | null = null;
  public afterSide: CompareSide | null = null;
  public compareDeltas: { key: string; value: string }[] = [];

  private candidatesFor(pose: ProgressPose): ProgressDayView[] {
    return this.photoDays
      .filter((day) => day.photos.some((photo) => photo.pose === pose))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  public get pendingHistoryPrompts(): ProgressTrainerShare[] {
    return this.trainers.filter((trainer) => !trainer.historyAsked && trainer.previousDays > 0);
  }

  public async load(): Promise<void> {
    this.loading = true;
    this.failed = false;
    try {
      if (this.isClient) {
        const [status, progress, trainers] = await Promise.all([
          this.mediaGate.status(true),
          firstValueFrom(this.mediaApi.listMyProgress()),
          firstValueFrom(this.mediaApi.listMyTrainers()),
        ]);
        this.status = status;
        this.days = progress.days;
        this.trainers = trainers.trainers;
      } else if (this.clientId) {
        const progress = await firstValueFrom(this.mediaApi.listClientProgress(this.clientId));
        this.days = progress.days;
        this.since = progress.since;
        this.historyShared = progress.historyShared;
      }
      this.resetCompare();
    } catch {
      this.failed = true;
    } finally {
      this.loading = false;
    }
  }

  private resetCompare(): void {
    // Si la pose elegida no tiene dos fechas, se busca otra que sí.
    if (this.candidatesFor(this.comparePose).length < 2) {
      const pose = this.comparePoses.find((candidate) => this.candidatesFor(candidate).length >= 2);
      if (pose) this.comparePose = pose;
    }
    const candidates = this.candidatesFor(this.comparePose);
    this.beforeDate = candidates.length ? candidates[0].date : null;
    this.afterDate = candidates.length ? candidates[candidates.length - 1].date : null;
    this.recomputeCompare();
  }

  private recomputeCompare(): void {
    this.compareCandidates = this.candidatesFor(this.comparePose);
    this.beforeSide = this.sideOf(this.beforeDate);
    this.afterSide = this.sideOf(this.afterDate);
    this.compareDeltas = this.deltasBetween(this.beforeDate, this.afterDate);
  }

  public selectComparePose(pose: ProgressPose): void {
    this.comparePose = pose;
    const candidates = this.candidatesFor(pose);
    if (!candidates.some((day) => day.date === this.beforeDate)) this.beforeDate = candidates[0]?.date || null;
    if (!candidates.some((day) => day.date === this.afterDate)) this.afterDate = candidates[candidates.length - 1]?.date || null;
    this.recomputeCompare();
  }

  public onBeforeChange(event: Event): void {
    this.beforeDate = (event.target as HTMLSelectElement).value || null;
    this.recomputeCompare();
  }

  public onAfterChange(event: Event): void {
    this.afterDate = (event.target as HTMLSelectElement).value || null;
    this.recomputeCompare();
  }

  private dayOf(date: string | null): ProgressDayView | null {
    return this.days.find((day) => day.date === date) || null;
  }

  private sideOf(date: string | null): CompareSide | null {
    const day = this.dayOf(date);
    const photo = day?.photos.find((item) => item.pose === this.comparePose);
    if (!day || !photo) return null;
    const weight = day.anthropometry?.['weight'];
    return {
      url: photo.asset.url || photo.asset.thumbUrl,
      label: this.shortDate(day.date),
      sub: weight ? `${this.formatNumber(weight)} kg` : undefined,
    };
  }

  /** Diferencias de peso y perímetros entre las dos fechas comparadas. */
  private deltasBetween(beforeDate: string | null, afterDate: string | null): { key: string; value: string }[] {
    const before = this.dayOf(beforeDate)?.anthropometry;
    const after = this.dayOf(afterDate)?.anthropometry;
    if (!before || !after) return [];
    const fields: { field: string; key: string; unit: string }[] = [
      { field: 'weight', key: 'MEDIA.DELTA_WEIGHT', unit: 'kg' },
      { field: 'waist', key: 'MEDIA.DELTA_WAIST', unit: 'cm' },
      { field: 'hip', key: 'MEDIA.DELTA_HIP', unit: 'cm' },
      { field: 'chest', key: 'MEDIA.DELTA_CHEST', unit: 'cm' },
    ];
    // No se juzga si subir o bajar es mejor: depende del objetivo.
    return fields
      .filter(({ field }) => Number.isFinite(before[field]) && Number.isFinite(after[field]))
      .map(({ field, key, unit }) => {
        const diff = Number(after[field]) - Number(before[field]);
        const sign = diff > 0 ? '+' : diff < 0 ? '−' : '±';
        return { key, value: `${sign}${this.formatNumber(Math.abs(diff))} ${unit}` };
      });
  }

  public shortDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    const sameYear = year === new Date().getFullYear();
    return new Date(year, month - 1, day).toLocaleDateString(this.translate.currentLang || 'es', {
      day: 'numeric',
      month: 'short',
      ...(sameYear ? {} : { year: 'numeric' }),
    });
  }

  public longDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(this.translate.currentLang || 'es', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  public formatNumber(value: number): string {
    return Number(value).toLocaleString(this.translate.currentLang || 'es', { maximumFractionDigits: 1 });
  }

  public trackDay(_index: number, day: ProgressDayView): string {
    return day.id;
  }

  public trackDelta(_index: number, delta: { key: string }): string {
    return delta.key;
  }

  public trackTrainer(_index: number, trainer: ProgressTrainerShare): string {
    return trainer.trainerId;
  }

  // --- Acciones del cliente ---

  public async openSession(date: string = this.today): Promise<void> {
    const gate = await this.mediaGate.ensureCanUpload();
    if (gate !== 'ok') {
      if (gate === 'premium') this.status = await this.mediaGate.status(true);
      return;
    }
    const existing = this.dayOf(date);
    const previous = this.photoDays.filter((day) => day.date < date).sort((a, b) => b.date.localeCompare(a.date))[0] || null;
    const result = await this.ionicUtilService.showModal({
      component: PhotoSessionModalComponent,
      componentProps: {
        date,
        day: existing,
        previousDay: previous,
        hasTrainer: !!this.status?.hasActiveTrainer,
        mode: 'gallery',
      },
      cssClass: 'fullscreen-modal',
    });
    // Aunque cierre sin fotos, puede haber borrado alguna: se recarga.
    if (result?.role === 'done' || result?.role === 'backdrop' || result?.role === undefined) {
      await this.reloadDays();
    }
  }

  private async reloadDays(): Promise<void> {
    try {
      const progress = await firstValueFrom(this.mediaApi.listMyProgress());
      this.days = progress.days;
      this.resetCompare();
    } catch {
      // Se queda con lo que tenía; el siguiente ionViewWillEnter recarga.
    }
  }

  public openViewer(day: ProgressDayView, pose: ProgressPose): void {
    this.ionicUtilService.showModal({
      component: PhotoViewerModalComponent,
      componentProps: { day, pose },
      cssClass: 'fullscreen-modal',
    });
  }

  public async toggleDayVisibility(day: ProgressDayView): Promise<void> {
    try {
      const { day: updated } = await firstValueFrom(
        this.mediaApi.updateDay(day.date, { hiddenFromTrainers: !day.hiddenFromTrainers })
      );
      this.days = this.days.map((item) => (item.date === updated.date ? updated : item));
    } catch (error) {
      this.showError(error);
    }
  }

  public async answerHistory(trainer: ProgressTrainerShare, shared: boolean): Promise<void> {
    try {
      const { trainers } = await firstValueFrom(this.mediaApi.setHistoryShared(trainer.trainerId, shared));
      this.trainers = trainers;
    } catch (error) {
      this.showError(error);
    }
  }

  public async toggleHistory(trainer: ProgressTrainerShare, event: Event): Promise<void> {
    const shared = (event as CustomEvent).detail?.checked === true;
    if (shared === trainer.historyShared) return;
    await this.answerHistory(trainer, shared);
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
