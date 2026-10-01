import { Component, Input, OnChanges } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProgressDayView, ProgressPose, REQUIRED_POSES } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { CompareSide } from 'src/app/shared/components/media/photo-compare.component';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

/**
 * Pestaña «Fotos» de la revisión de un check-in: las fotos de esta respuesta
 * frente a las de la respuesta de referencia, pose a pose.
 */
@Component({
  selector: 'app-checkin-photos-compare',
  templateUrl: './checkin-photos-compare.component.html',
  styleUrls: ['./checkin-photos-compare.component.scss'],
})
export class CheckinPhotosCompareComponent implements OnChanges {
  @Input() public clientId = '';
  @Input() public currentDayId: string | null = null;
  @Input() public referenceDayId: string | null = null;
  @Input() public currentLabel = '';
  @Input() public referenceLabel = '';

  public loading = true;
  public current: ProgressDayView | null = null;
  public reference: ProgressDayView | null = null;
  public pose: ProgressPose = 'front';
  public mode: 'slider' | 'side' = 'side';
  // Calculadas al cambiar algo, no en cada detección de cambios.
  public poses: ProgressPose[] = [];
  public currentSide: CompareSide | null = null;
  public referenceSide: CompareSide | null = null;

  constructor(private mediaApi: MediaApiService) {}

  public async ngOnChanges(): Promise<void> {
    this.loading = true;
    try {
      const [current, reference] = await Promise.all([this.loadDay(this.currentDayId), this.loadDay(this.referenceDayId)]);
      this.current = current;
      this.reference = reference;
      const present = new Set([...(current?.photos || []), ...(reference?.photos || [])].map((photo) => photo.pose));
      this.poses = [...REQUIRED_POSES, 'extra' as ProgressPose].filter((pose) => present.has(pose));
      if (!this.poses.includes(this.pose)) this.pose = this.poses[0] || 'front';
      this.recompute();
    } finally {
      this.loading = false;
    }
  }

  private async loadDay(dayId: string | null): Promise<ProgressDayView | null> {
    if (!dayId || !this.clientId) return null;
    try {
      return (await firstValueFrom(this.mediaApi.clientProgressDay(this.clientId, dayId))).day;
    } catch {
      return null;
    }
  }

  public selectPose(pose: ProgressPose): void {
    this.pose = pose;
    this.recompute();
  }

  private recompute(): void {
    this.currentSide = this.sideOf(this.current, this.currentLabel);
    this.referenceSide = this.sideOf(this.reference, this.referenceLabel);
  }

  private sideOf(day: ProgressDayView | null, label: string): CompareSide | null {
    const photo = day?.photos.find((item) => item.pose === this.pose);
    if (!day || !photo) return null;
    const weight = day.anthropometry?.['weight'];
    return {
      url: photo.asset.url || photo.asset.thumbUrl,
      label,
      sub: weight ? `${Number(weight).toLocaleString(uiLocale(), { maximumFractionDigits: 1 })} kg` : undefined,
    };
  }
}
