import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { Exercise } from 'src/app/core/models/exercise';
import {
  ExerciseHistoryService,
  ExerciseHistoryStats,
} from 'src/app/core/services/exercise-history/exercise-history.service';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent implements OnInit {
  @Input() public videoUrl: string;
  @Input() public exercise: Exercise;

  public videoEmbedSrcSafe: any;
  public historicalStats: ExerciseHistoryStats | null = null;
  public historicalStatsLoading = false;

  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private exerciseHistoryService: ExerciseHistoryService
  ) {}

  public ngOnInit(): void {
    this.updateVideoEmbedSrc();
    this.loadHistoricalStats();
  }

  private loadHistoricalStats(): void {
    if (!this.exercise || this.exercise.isCardio) return;

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
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1]?.split('?')[0] || '';
    }
    return '';
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
}
