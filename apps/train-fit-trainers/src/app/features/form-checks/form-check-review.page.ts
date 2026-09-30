import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { FormCheckComment, FormCheckView, TechniqueVideoView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { mediaErrorKey } from 'src/app/core/services/media/media-errors';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { MediaVideoPlayerComponent } from 'src/app/shared/components/media/media-video-player.component';
import { executedSummary, prescribedSummary } from 'src/app/shared/components/media/set-summary.util';

/**
 * Responder a un vídeo de técnica: comentarios anclados a un segundo del
 * vídeo (se toma el segundo en el que está pausado), un vídeo de la
 * biblioteca como referencia, y «Enviar respuesta» avisa al cliente.
 */
@Component({
  selector: 'app-form-check-review',
  templateUrl: './form-check-review.page.html',
  styleUrls: ['./form-check-review.page.scss'],
})
export class FormCheckReviewPage {
  @ViewChild(MediaVideoPlayerComponent) private player?: MediaVideoPlayerComponent;

  public state: 'loading' | 'error' | 'loaded' = 'loading';
  private currentCheck: FormCheckView | null = null;

  public get check(): FormCheckView | null {
    return this.currentCheck;
  }

  public set check(value: FormCheckView | null) {
    // Cada respuesta del servidor trae URL firmadas nuevas: si el vídeo es el
    // mismo, se conserva la anterior para no recargarlo (volvería al 0:00).
    if (value?.video?.id !== this.currentCheck?.video?.id) {
      this.videoSrc = value?.video?.url || null;
      this.videoPoster = value?.video?.thumbUrl || null;
    }
    this.currentCheck = value;
    this.markers = (value?.comments || [])
      .filter((comment) => comment.atSec != null)
      .map((comment) => ({ atSec: comment.atSec as number }));
  }
  public currentTime = 0;
  public anchorToTime = true;
  public text = '';
  public library: TechniqueVideoView[] = [];
  public libraryLoaded = false;
  public attachVideoId: string | null = null;
  public busy = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mediaApi: MediaApiService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ionViewWillEnter(): void {
    this.load();
  }

  public async load(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.state = this.check ? 'loaded' : 'loading';
    try {
      this.check = (await firstValueFrom(this.mediaApi.getTrainerFormCheck(id))).formCheck;
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
    if (!this.libraryLoaded) this.loadLibrary();
  }

  private async loadLibrary(): Promise<void> {
    try {
      this.library = (await firstValueFrom(this.mediaApi.listLibrary())).videos;
    } catch {
      this.library = [];
    } finally {
      this.libraryLoaded = true;
    }
  }

  // Se recalculan solo cuando cambia la revisión (setter de `check` abajo).
  public markers: { atSec: number }[] = [];
  public videoSrc: string | null = null;
  public videoPoster: string | null = null;

  public get executed(): string | null {
    return executedSummary(this.check?.setSnapshot, this.translate.instant('MEDIA.RIR_FAIL'));
  }

  public get prescribed(): string | null {
    return prescribedSummary(this.check?.setSnapshot, this.translate.instant('MEDIA.RIR_FAIL'));
  }

  public onTime(seconds: number): void {
    this.currentTime = seconds;
  }

  public time(seconds: number | null): string {
    const total = Math.max(0, Math.round(seconds || 0));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  public dateLabel(date: string | null | undefined): string {
    if (!date) return '';
    const value = date.length === 10 ? new Date(`${date}T12:00:00`) : new Date(date);
    return value.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  public seek(comment: FormCheckComment): void {
    if (comment.atSec != null) this.player?.seek(comment.atSec);
  }

  public onText(event: Event): void {
    this.text = (event.target as HTMLTextAreaElement).value;
  }

  public onAttach(event: Event): void {
    this.attachVideoId = (event as CustomEvent).detail?.value || null;
  }

  public get canComment(): boolean {
    return !!this.text.trim() || !!this.attachVideoId;
  }

  public async addComment(): Promise<void> {
    if (!this.check || !this.canComment || this.busy) return;
    this.busy = true;
    try {
      const atSec = this.anchorToTime ? Math.round((this.player?.currentTime ?? this.currentTime) * 10) / 10 : null;
      this.check = (
        await firstValueFrom(
          this.mediaApi.addFormCheckComment(this.check.id, {
            atSec,
            text: this.text.trim(),
            techniqueVideoId: this.attachVideoId,
          })
        )
      ).formCheck;
      this.text = '';
      this.attachVideoId = null;
    } catch (error) {
      this.showError(error);
    } finally {
      this.busy = false;
    }
  }

  public async removeComment(comment: FormCheckComment): Promise<void> {
    if (!this.check || this.busy) return;
    this.busy = true;
    try {
      this.check = (await firstValueFrom(this.mediaApi.removeFormCheckComment(this.check.id, comment.id))).formCheck;
    } catch (error) {
      this.showError(error);
    } finally {
      this.busy = false;
    }
  }

  public async review(): Promise<void> {
    if (!this.check || this.busy) return;
    this.busy = true;
    try {
      this.check = (await firstValueFrom(this.mediaApi.reviewFormCheck(this.check.id))).formCheck;
      this.ionicUtilService.showToast({
        message: this.translate.instant('MEDIA.TRAINER.REVIEW_SENT'),
        duration: 2200,
        position: 'bottom',
        color: 'success',
      });
    } catch (error) {
      this.showError(error);
    } finally {
      this.busy = false;
    }
  }

  public async toggleKeep(): Promise<void> {
    if (!this.check || this.busy) return;
    this.busy = true;
    try {
      this.check = (await firstValueFrom(this.mediaApi.keepFormCheck(this.check.id, !this.check.keep))).formCheck;
    } catch (error) {
      this.showError(error);
    } finally {
      this.busy = false;
    }
  }

  public openClient(): void {
    if (this.check) void this.router.navigate(['/tabs/clients', this.check.clientId]);
  }

  public trackComment(_index: number, comment: FormCheckComment): string {
    return comment.id;
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
