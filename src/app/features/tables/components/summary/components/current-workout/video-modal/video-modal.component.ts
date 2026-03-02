import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/core/models/exercise';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent implements OnInit {
  @Input() public videoUrl: string;
  @Input() public exercise: Exercise;

  public videoEmbedSrcSafe: any;

  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.updateVideoEmbedSrc();
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
