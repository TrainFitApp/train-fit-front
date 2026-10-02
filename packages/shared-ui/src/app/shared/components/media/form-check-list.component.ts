import { Component, EventEmitter, Input, OnChanges, Output, QueryList, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { FormCheckComment, FormCheckView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { MediaVideoPlayerComponent } from './media-video-player.component';
import { executedSummary, prescribedSummary } from './set-summary.util';

/**
 * Las revisiones de técnica del cliente para un ejercicio, con la respuesta
 * del entrenador. Tocar un comentario salta a ese segundo del vídeo. Lo que
 * dice el entrenador va en naranja: es pautado y se distingue a simple vista.
 */
@Component({
  selector: 'app-form-check-list',
  templateUrl: './form-check-list.component.html',
  styleUrls: ['./form-check-list.component.scss'],
})
export class FormCheckListComponent implements OnChanges {
  @Input() public exerciseId: string | null = null;
  // Lista de todos los ejercicios: se enseña el nombre de cada uno.
  @Input() public showExercise = false;
  // Revisión que abrir al cargar (p. ej. desde una notificación).
  @Input() public focusId: string | null = null;
  @Output() public loaded = new EventEmitter<FormCheckView[]>();

  @ViewChildren(MediaVideoPlayerComponent) private players?: QueryList<MediaVideoPlayerComponent>;

  public loading = true;
  public formChecks: FormCheckView[] = [];
  public weeklyUsed = 0;
  public weeklyLimit = 5;
  public expanded: string | null = null;

  constructor(private mediaApi: MediaApiService, private translate: TranslateService) {}

  public ngOnChanges(): void {
    this.load();
  }

  public async load(): Promise<void> {
    this.loading = true;
    try {
      const result = await firstValueFrom(this.mediaApi.listMyFormChecks(this.exerciseId));
      this.markerCache.clear();
      this.formChecks = result.formChecks;
      this.weeklyUsed = result.weeklyUsed;
      this.weeklyLimit = result.weeklyLimit;
      // Se abre la más reciente con respuesta sin leer; si no, la última.
      const focused = this.formChecks.find((check) => check.id === this.focusId);
      const unseen = this.formChecks.find((check) => check.unseenFeedback);
      const open = focused || unseen || this.formChecks[0];
      this.expanded = open?.id || null;
      if (open?.unseenFeedback) this.markSeen(open);
      this.loaded.emit(this.formChecks);
    } catch {
      this.formChecks = [];
    } finally {
      this.loading = false;
    }
  }

  public toggle(check: FormCheckView): void {
    this.expanded = this.expanded === check.id ? null : check.id;
    if (this.expanded && check.unseenFeedback) this.markSeen(check);
  }

  private markSeen(check: FormCheckView): void {
    check.unseenFeedback = false;
    this.mediaApi.markFormCheckSeen(check.id).subscribe({ error: () => undefined });
  }

  public seek(check: FormCheckView, comment: FormCheckComment): void {
    // Solo hay una revisión abierta a la vez: su reproductor es el único.
    if (comment.atSec == null || this.expanded !== check.id) return;
    this.players?.first?.seek(comment.atSec);
  }

  // Marcas por revisión, calculadas al cargar: un array nuevo en cada
  // detección de cambios haría que el reproductor se repintara sin parar.
  private markerCache = new Map<string, { atSec: number }[]>();

  public markersOf(check: FormCheckView): { atSec: number }[] {
    if (!this.markerCache.has(check.id)) {
      this.markerCache.set(
        check.id,
        check.comments.filter((comment) => comment.atSec != null).map((comment) => ({ atSec: comment.atSec as number }))
      );
    }
    return this.markerCache.get(check.id)!;
  }

  public time(seconds: number | null): string {
    const total = Math.max(0, Math.round(seconds || 0));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  public dateLabel(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(this.translate.currentLang || 'es', { day: 'numeric', month: 'short' });
  }

  public executed(check: FormCheckView): string | null {
    return executedSummary(check.setSnapshot, this.translate.instant('MEDIA.RIR_FAIL'));
  }

  public prescribed(check: FormCheckView): string | null {
    return prescribedSummary(check.setSnapshot, this.translate.instant('MEDIA.RIR_FAIL'));
  }

  public trackCheck(_index: number, check: FormCheckView): string {
    return check.id;
  }

  public trackComment(_index: number, comment: FormCheckComment): string {
    return comment.id;
  }
}
