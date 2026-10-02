import { Component, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { TechniqueVideoView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

/**
 * App del entrenador (Planificador): qué vídeo de su biblioteca ve ESTE
 * cliente en ESTE ejercicio. Sin elegir nada ve el vídeo por defecto del
 * entrenador para el ejercicio (si lo hay) o el del catálogo.
 */
@Component({
  selector: 'app-client-technique-video-picker',
  templateUrl: './client-technique-video-picker.component.html',
  styleUrls: ['./client-technique-video-picker.component.scss'],
})
export class ClientTechniqueVideoPickerComponent implements OnChanges {
  @Input() public clientId: string | null = null;
  @Input() public exerciseId: string | null = null;

  public loading = true;
  public saving = false;
  public videos: TechniqueVideoView[] = [];
  public selectedId: string | null = null;

  constructor(private mediaApi: MediaApiService, private ionicUtilService: IonicUtilService, private translate: TranslateService) {}

  public async ngOnChanges(): Promise<void> {
    if (!this.clientId || !this.exerciseId) return;
    this.loading = true;
    try {
      const [library, overrides] = await Promise.all([
        firstValueFrom(this.mediaApi.listLibrary()),
        firstValueFrom(this.mediaApi.clientVideoOverrides(this.clientId)),
      ]);
      this.videos = library.videos;
      this.selectedId = overrides.overrides.find((item) => item.exerciseId === this.exerciseId)?.techniqueVideoId || null;
    } catch {
      this.videos = [];
    } finally {
      this.loading = false;
    }
  }

  /** Vídeo por defecto del entrenador para este ejercicio (el que verá sin elegir). */
  public get defaultVideo(): TechniqueVideoView | null {
    return this.videos.find((video) => video.exercises.some((exercise) => exercise.id === this.exerciseId)) || null;
  }

  public async select(event: Event): Promise<void> {
    const value = (event as CustomEvent).detail?.value || null;
    const next = value === '__default' ? null : value;
    if (next === this.selectedId || !this.clientId || !this.exerciseId) return;
    this.saving = true;
    try {
      await firstValueFrom(this.mediaApi.setClientVideoOverride(this.clientId, this.exerciseId, next));
      this.selectedId = next;
    } catch {
      this.ionicUtilService.showToast({
        message: this.translate.instant('MEDIA.ERRORS.GENERIC'),
        duration: 2400,
        position: 'bottom',
        color: 'danger',
      });
    } finally {
      this.saving = false;
    }
  }
}
