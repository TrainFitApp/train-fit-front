import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { Exercise } from 'src/app/core/models/exercise';
import {
  ExerciseHistoryService,
  ExerciseHistoryStats,
} from 'src/app/core/services/exercise-history/exercise-history.service';
import { formatSecondsAsTime, splitTextIntoSteps } from 'src/app/shared/utils';
import { TechniqueVideoView } from 'src/app/core/models/media';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { MediaGateService } from 'src/app/shared/components/media/media-gate.service';
import { FormCheckSubmitModalComponent } from 'src/app/shared/components/media/form-check-submit-modal.component';
import { FormCheckListComponent } from 'src/app/shared/components/media/form-check-list.component';
import { parseYouTubeId } from 'src/app/core/utils/youtube-id.util';

export interface VideoModalFormCheckContext {
  exerciseId: string | null;
  exerciseName: string;
  tableId: string | null;
  sets: Record<string, any>[];
  date: string;
}

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent implements OnInit {
  @Input() public videoUrl: string;
  @Input() public exercise: Exercise;
  // Vídeo de su entrenador para este ejercicio (manda sobre el del catálogo).
  @Input() public techniqueVideo: TechniqueVideoView | null = null;
  // Con entrenador de entrenamiento: sus revisiones de técnica y el botón de enviar.
  @Input() public formCheck: VideoModalFormCheckContext | null = null;

  @ViewChild(FormCheckListComponent) private formCheckList?: FormCheckListComponent;
  public showCatalogVideo = false;

  public videoEmbedSrcSafe: any;
  public historicalStats: ExerciseHistoryStats | null = null;
  public historicalStatsLoading = false;

  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private exerciseHistoryService: ExerciseHistoryService,
    private ionicUtilService: IonicUtilService,
    private mediaGate: MediaGateService
  ) {}

  public async sendFormCheck(): Promise<void> {
    if (!this.formCheck) return;
    const gate = await this.mediaGate.ensureCanUpload();
    if (gate !== 'ok') return;
    const result = await this.ionicUtilService.showModal({
      component: FormCheckSubmitModalComponent,
      componentProps: { ...this.formCheck },
      cssClass: 'fullscreen-modal',
    });
    if (result?.role === 'sent') this.formCheckList?.load();
  }

  public ngOnInit(): void {
    this.updateVideoEmbedSrc();
    this.loadHistoricalStats();
  }

  private loadHistoricalStats(): void {
    if (!this.exercise) return;

    this.historicalStatsLoading = true;
    this.exerciseHistoryService
      .getStatsForExercise$(this.exercise._id ?? null, this.exercise.name ?? '')
      .pipe(take(1))
      .subscribe({
        next: (stats) => {
          this.historicalStats = stats;
          this.historicalStatsLoading = false;
        },
        error: () => {
          this.historicalStatsLoading = false;
        },
      });
  }

  private parseYouTubeIdFromUrl(url: string): string {
    return parseYouTubeId(url);
  }

  private updateVideoEmbedSrc(): void {
    const id = this.parseYouTubeIdFromUrl(this.videoUrl);
    if (!id) {
      this.videoEmbedSrcSafe = null;
      return;
    }
    const proxyUrl = `https://trainfit.net/youtube-embed.html?v=${id}&autoplay=1`;
    this.videoEmbedSrcSafe =
      this.sanitizer.bypassSecurityTrustResourceUrl(proxyUrl);
  }

  public close(): void {
    this.modalController.dismiss();
  }

  public getValidMuscleGroups(): string[] {
    if (!this.exercise || !this.exercise.muscleGroups1) return [];
    return this.exercise.muscleGroups1.filter((g) => g && g.trim().length > 0);
  }

  public formatSeconds(seconds: number): string {
    return formatSecondsAsTime(seconds || 0);
  }

  public getDescriptionSteps(descriptionText: string): string[] {
    return splitTextIntoSteps(descriptionText);
  }
}
