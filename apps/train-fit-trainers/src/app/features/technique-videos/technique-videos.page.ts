import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { MediaStatusView, TechniqueVideoView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { mediaErrorKey } from 'src/app/core/services/media/media-errors';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TechniqueVideoEditorComponent } from './technique-video-editor.component';

/**
 * Biblioteca de vídeos de técnica: vídeos subidos o enlaces de YouTube y
 * Vimeo, vinculados a ejercicios. Un vídeo vinculado a un ejercicio es el que
 * ven todos sus clientes de entrenamiento en ese ejercicio, salvo que a uno
 * concreto le asigne otro desde el Planificador.
 */
@Component({
  selector: 'app-technique-videos',
  templateUrl: './technique-videos.page.html',
  styleUrls: ['./technique-videos.page.scss'],
})
export class TechniqueVideosPage {
  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public videos: TechniqueVideoView[] = [];
  public status: MediaStatusView | null = null;
  public search = '';
  public playing: string | null = null;

  constructor(private mediaApi: MediaApiService, private ionicUtilService: IonicUtilService, private translate: TranslateService) {}

  public ionViewWillEnter(): void {
    this.load();
  }

  public async load(): Promise<void> {
    if (!this.videos.length) this.state = 'loading';
    try {
      const [library, status] = await Promise.all([firstValueFrom(this.mediaApi.listLibrary()), firstValueFrom(this.mediaApi.status())]);
      this.videos = library.videos;
      this.status = status;
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
  }

  public get filtered(): TechniqueVideoView[] {
    const term = this.search.trim().toLowerCase();
    if (!term) return this.videos;
    return this.videos.filter(
      (video) =>
        video.title.toLowerCase().includes(term) || video.exercises.some((exercise) => exercise.name.toLowerCase().includes(term))
    );
  }

  public get usedPercent(): number {
    if (!this.status?.libraryBytes) return 0;
    return Math.min(100, Math.round(((this.status.libraryUsedBytes || 0) / this.status.libraryBytes) * 100));
  }

  public formatBytes(bytes: number | null | undefined): string {
    const value = Number(bytes || 0);
    if (value >= 1024 ** 3) return `${(value / 1024 ** 3).toLocaleString('es-ES', { maximumFractionDigits: 1 })} GB`;
    return `${Math.round(value / 1024 ** 2).toLocaleString('es-ES')} MB`;
  }

  public onSearch(event: Event): void {
    this.search = String((event as CustomEvent).detail?.value || '');
  }

  public async openEditor(video?: TechniqueVideoView): Promise<void> {
    const result = await this.ionicUtilService.showModal({
      component: TechniqueVideoEditorComponent,
      componentProps: { video: video || null },
      cssClass: 'tf-panel-modal',
    });
    if (result?.data?.saved) this.load();
  }

  public async remove(video: TechniqueVideoView): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('MEDIA.TRAINER.DELETE_VIDEO_TITLE'),
      message: this.translate.instant('MEDIA.TRAINER.DELETE_VIDEO_MESSAGE', { title: video.title }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('MEDIA.TRAINER.DELETE'),
          role: 'destructive',
          handler: () => {
            this.mediaApi.deleteLibraryVideo(video.id).subscribe({
              next: () => (this.videos = this.videos.filter((item) => item.id !== video.id)),
              error: (error) =>
                this.ionicUtilService.showToast({
                  message: this.translate.instant(mediaErrorKey(error)),
                  duration: 2400,
                  position: 'bottom',
                  color: 'danger',
                }),
            });
          },
        },
      ],
    });
  }

  public sourceLabel(video: TechniqueVideoView): string {
    return video.source === 'upload' ? 'MEDIA.TRAINER.SOURCE_UPLOAD' : video.source === 'youtube' ? 'YouTube' : 'Vimeo';
  }

  public trackVideo(_index: number, video: TechniqueVideoView): string {
    return video.id;
  }
}
