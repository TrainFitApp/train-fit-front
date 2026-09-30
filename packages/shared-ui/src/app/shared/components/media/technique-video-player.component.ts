import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TechniqueVideoView } from 'src/app/core/models/media';

/**
 * Vídeo de técnica del entrenador, sea cual sea su origen: subido (MP4,
 * <video>), YouTube (el mismo proxy de embed que usa el catálogo) o Vimeo.
 */
@Component({
  selector: 'app-technique-video-player',
  templateUrl: './technique-video-player.component.html',
  styleUrls: ['./technique-video-player.component.scss'],
})
export class TechniqueVideoPlayerComponent implements OnChanges {
  @Input() public video: TechniqueVideoView | null = null;
  @Input() public autoplay = false;

  public embedUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnChanges(): void {
    this.embedUrl = null;
    if (!this.video) return;
    if (this.video.source === 'youtube' && this.video.youtubeId) {
      const url = `https://trainfit.net/youtube-embed.html?v=${encodeURIComponent(this.video.youtubeId)}${this.autoplay ? '&autoplay=1' : ''}`;
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else if (this.video.source === 'vimeo' && this.video.vimeoId) {
      const url = `https://player.vimeo.com/video/${encodeURIComponent(this.video.vimeoId)}?dnt=1${this.autoplay ? '&autoplay=1' : ''}`;
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
