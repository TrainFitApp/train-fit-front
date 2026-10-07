import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject, firstValueFrom, forkJoin, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { Exercise } from 'src/app/core/models/exercise';
import { TechniqueVideoView } from 'src/app/core/models/media';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { mediaErrorKey } from 'src/app/core/services/media/media-errors';
import { MediaUploadService } from 'src/app/core/services/media/media-upload.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SearchFilterGroupExercises } from 'src/app/shared/models/filterGroup';
import { VideoLink, parseVideoLink } from 'src/app/core/utils/video-link.util';

type Source = 'upload' | 'youtube' | 'vimeo';

/**
 * Alta y edición de un vídeo de la biblioteca (panel lateral). Subido o
 * enlace se elige al crearlo: cambiar un vídeo subido por un enlace es borrar
 * uno y crear otro. El enlace sí se puede cambiar después, también de YouTube
 * a Vimeo: la plataforma sale del propio enlace.
 */
@Component({
  selector: 'app-technique-video-editor',
  templateUrl: './technique-video-editor.component.html',
  styleUrls: ['./technique-video-editor.component.scss'],
})
export class TechniqueVideoEditorComponent implements OnInit {
  @Input() public video: TechniqueVideoView | null = null;
  /** Lo que enseña el reproductor: el vídeo con el último enlace válido escrito (también al crearlo). */
  public preview: TechniqueVideoView | null = null;
  /** Plataforma del enlace escrito; null si está vacío o no es de YouTube ni de Vimeo. */
  public link: VideoLink | null = null;

  public title = '';
  public cues = '';
  public source: Source = 'upload';
  public externalUrl = '';
  public file: File | null = null;
  public fileDuration = 0;
  public exercises: { id: string; name: string }[] = [];

  public searchResults: Exercise[] = [];
  public searching = false;
  private readonly search$ = new Subject<string>();

  public saving = false;
  public progress = 0;
  public error = '';

  constructor(
    private modalController: ModalController,
    private mediaApi: MediaApiService,
    private mediaUpload: MediaUploadService,
    private exerciseService: ExerciseService,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    if (this.video) {
      this.title = this.video.title;
      this.cues = this.video.cues;
      this.source = this.video.source;
      this.externalUrl = this.video.externalUrl || '';
      this.exercises = [...this.video.exercises];
      this.link = parseVideoLink(this.externalUrl);
      this.preview = this.video;
    }
    this.search$
      .pipe(
        debounceTime(250),
        switchMap((term) => {
          this.searching = true;
          // Con userId el buscador solo devuelve los ejercicios propios: se
          // pide el catálogo y los propios a la vez y se juntan.
          const catalog = new SearchFilterGroupExercises();
          catalog.search = term;
          catalog.page = 0;
          const own = new SearchFilterGroupExercises();
          own.search = term;
          own.page = 0;
          own.userId = this.userService.localUser()?._id;
          return forkJoin([
            this.exerciseService.searchExercise(own).pipe(catchError(() => of([] as Exercise[]))),
            this.exerciseService.searchExercise(catalog).pipe(catchError(() => of([] as Exercise[]))),
          ]).pipe(map(([mine, all]) => [...(mine || []), ...(all || [])]));
        })
      )
      .subscribe({
        next: (results) => {
          const seen = new Set<string>();
          this.searchResults = (results || []).filter((exercise) => {
            if (!exercise._id || seen.has(exercise._id)) return false;
            seen.add(exercise._id);
            return !this.exercises.some((item) => item.id === exercise._id);
          });
          this.searching = false;
        },
        error: () => (this.searching = false),
      });
  }

  public get isEdit(): boolean {
    return !!this.video;
  }

  public get canSave(): boolean {
    if (!this.title.trim() || this.saving) return false;
    if (this.source === 'upload') return this.isEdit || !!this.file;
    return !!this.link;
  }

  /** Hay algo escrito que no es un enlace de YouTube ni de Vimeo. */
  public get linkInvalid(): boolean {
    return this.source !== 'upload' && !!this.externalUrl.trim() && !this.link;
  }

  public setSource(source: Source): void {
    if (this.isEdit) return;
    this.source = source;
    if (source === 'upload') this.preview = null;
    else this.refreshLink();
  }

  public onInput(field: 'title' | 'cues', event: Event): void {
    this[field] = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  /** Un enlace de la otra plataforma cambia el origen solo y refresca la vista previa. */
  public onLinkInput(event: Event): void {
    this.externalUrl = (event.target as HTMLInputElement).value;
    this.refreshLink();
  }

  // La vista previa solo cambia cuando cambia el vídeo (no a cada tecla que
  // deja el mismo id): recargar el iframe cortaría la reproducción.
  private refreshLink(): void {
    this.link = parseVideoLink(this.externalUrl);
    if (!this.link) return;
    this.source = this.link.source;
    const current = this.preview;
    if (current && current.source === this.link.source && current.youtubeId === this.link.youtubeId && current.vimeoId === this.link.vimeoId) {
      return;
    }
    const base: TechniqueVideoView = this.video || {
      id: '',
      trainerId: '',
      trainerName: '',
      title: this.title,
      cues: '',
      source: this.link.source,
      externalUrl: null,
      youtubeId: null,
      vimeoId: null,
      video: null,
      exercises: [],
      updatedAt: '',
    };
    this.preview = { ...base, ...this.link, externalUrl: this.externalUrl.trim() };
  }

  public get platformName(): string {
    return this.link?.source === 'vimeo' ? 'Vimeo' : 'YouTube';
  }

  public async onFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    this.error = '';
    try {
      const info = await this.mediaUpload.inspectVideo(file);
      this.file = file;
      this.fileDuration = info.durationSec;
      if (!this.title.trim()) this.title = file.name.replace(/\.[^.]+$/, '').slice(0, 120);
    } catch (error) {
      this.error = this.translate.instant(mediaErrorKey(error));
    }
  }

  public onSearch(event: Event): void {
    const term = String((event as CustomEvent).detail?.value || '').trim();
    if (term.length < 2) {
      this.searchResults = [];
      return;
    }
    this.search$.next(term);
  }

  public addExercise(exercise: Exercise): void {
    if (!exercise._id || this.exercises.some((item) => item.id === exercise._id)) return;
    this.exercises = [...this.exercises, { id: exercise._id, name: exercise.name || '' }];
    this.searchResults = this.searchResults.filter((item) => item._id !== exercise._id);
  }

  public removeExercise(id: string): void {
    this.exercises = this.exercises.filter((item) => item.id !== id);
  }

  public duration(seconds: number): string {
    const total = Math.round(seconds || 0);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  public async save(): Promise<void> {
    if (!this.canSave) return;
    this.saving = true;
    this.error = '';
    this.progress = 0;
    const exerciseIds = this.exercises.map((item) => item.id);
    try {
      if (this.isEdit && this.video) {
        await firstValueFrom(
          this.mediaApi.updateLibraryVideo(this.video.id, {
            title: this.title.trim(),
            cues: this.cues.trim(),
            exerciseIds,
            ...(this.source !== 'upload' ? { externalUrl: this.externalUrl.trim() } : {}),
          })
        );
      } else if (this.source === 'upload' && this.file) {
        const asset = await this.mediaUpload.uploadVideo(this.file, 'technique_video', (progress) => (this.progress = progress.fraction));
        await firstValueFrom(
          this.mediaApi.createLibraryVideo({ title: this.title.trim(), cues: this.cues.trim(), source: 'upload', assetId: asset.id, exerciseIds })
        );
      } else {
        await firstValueFrom(
          this.mediaApi.createLibraryVideo({
            title: this.title.trim(),
            cues: this.cues.trim(),
            source: this.source,
            externalUrl: this.externalUrl.trim(),
            exerciseIds,
          })
        );
      }
      await this.modalController.dismiss({ saved: true });
    } catch (error) {
      this.error = this.translate.instant(mediaErrorKey(error));
      this.saving = false;
    }
  }

  public close(): void {
    if (this.saving) return;
    this.modalController.dismiss();
  }

  public trackExercise(_index: number, exercise: Exercise): string {
    return exercise._id || '';
  }
}
