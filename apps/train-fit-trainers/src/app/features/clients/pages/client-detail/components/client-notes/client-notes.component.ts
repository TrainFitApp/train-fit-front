import { Component, DestroyRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import {
  ClientNote,
  ClientNoteDomain,
  ClientNoteSource,
  ClientNotesUnread,
} from '../../models/client-notes.model';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

type ViewState = 'loading' | 'error' | 'loaded';

const SOURCE_ICONS: Record<ClientNoteSource, string> = {
  workout: 'barbell-outline',
  exercise: 'barbell-outline',
  pinned: 'pin-outline',
  pain: 'bandage-outline',
  dietDay: 'nutrition-outline',
  meal: 'restaurant-outline',
};

const DATE_FORMAT = () => new Intl.DateTimeFormat(uiLocale(), { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

interface NotesFilters {
  domain: ClientNoteDomain | null;
  seen: boolean | null;
  query: string;
}

// Filtros por cliente mientras la app siga abierta: volver del Planificador
// o cambiar de pestaña dentro de la ficha no los pierde. En memoria a
// propósito: al recargar se empieza de cero. Solo se guarda lo que toca el
// entrenador, así que el "No vistas" por defecto sigue aplicando hasta que
// cambie un filtro.
const savedFilters = new Map<string, NotesFilters>();

/**
 * Plan > Notas del cliente — todo lo que el cliente ha escrito en
 * entrenamiento (sesión, ejercicio, nota fijada, dolor) y nutrición (día,
 * comida), con la ruta de dónde está. Pulsar una nota lleva a su sitio (lo
 * resuelve la ficha con `openNote`); "vista" es un estado del entrenador que
 * el cliente no ve.
 */
@Component({
  selector: 'app-client-notes',
  templateUrl: 'client-notes.component.html',
  styleUrls: ['client-notes.component.scss'],
})
export class ClientNotesComponent implements OnChanges {
  private readonly translate = inject(TranslateService);

  @Input() clientId = '';
  // No vistas que ya conoce la ficha: con pendientes, la pestaña abre en "No vistas".
  @Input() unreadHint = 0;
  @Output() openNote = new EventEmitter<ClientNote>();
  @Output() unreadChange = new EventEmitter<ClientNotesUnread>();

  public state: ViewState = 'loading';
  public notes: ClientNote[] = [];
  public scopes: ClientNoteDomain[] = [];
  public unread: ClientNotesUnread = { total: 0, training: 0, nutrition: 0 };
  public total = 0;
  public hasMore = false;
  public loadingMore = false;
  public markingAll = false;

  public domain: ClientNoteDomain | null = null;
  public seen: boolean | null = null;
  public query = '';

  private page = 0;
  private readonly search$ = new Subject<string>();
  private readonly api = inject(ClientDetailApiService);
  private readonly ionicUtil = inject(IonicUtilService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.saveFilters();
        this.load();
      });
  }

  // Solo al cambiar de cliente: unreadHint cambia cada vez que se marca una
  // nota y no debe recargar la lista.
  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['clientId'] || !this.clientId) return;
    const saved = savedFilters.get(this.clientId);
    this.domain = saved ? saved.domain : null;
    this.seen = saved ? saved.seen : this.unreadHint > 0 ? false : null;
    this.query = saved ? saved.query : '';
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.page = 0;
    this.fetch(false);
  }

  public loadMore(): void {
    if (!this.hasMore || this.loadingMore) return;
    this.loadingMore = true;
    this.page += 1;
    this.fetch(true);
  }

  private fetch(append: boolean): void {
    this.api
      .getClientNotes(this.clientId, { domain: this.domain, seen: this.seen, q: this.query, page: this.page })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.notes = append ? [...this.notes, ...result.items] : result.items;
          this.scopes = result.scopes;
          this.total = result.total;
          this.hasMore = result.hasMore;
          this.setUnread(result.unread);
          this.state = 'loaded';
          this.loadingMore = false;
        },
        error: () => {
          this.loadingMore = false;
          if (append) {
            this.page -= 1;
            this.ionicUtil.showToast({ message: this.translate.instant('CLIENTS.NO_SE_PUDIERON_CARGAR_MAS'), duration: 2500 });
          } else {
            this.state = 'error';
          }
        },
      });
  }

  // Pulsar un chip activo lo apaga (vuelve a "todas"); pulsar el otro del par cambia a él.
  public toggleDomain(domain: ClientNoteDomain): void {
    this.domain = this.domain === domain ? null : domain;
    this.saveFilters();
    this.load();
  }

  public toggleSeenFilter(seen: boolean): void {
    this.seen = this.seen === seen ? null : seen;
    this.saveFilters();
    this.load();
  }

  public clearFilters(): void {
    this.domain = null;
    this.seen = null;
    this.saveFilters();
    this.load();
  }

  private saveFilters(): void {
    savedFilters.set(this.clientId, { domain: this.domain, seen: this.seen, query: this.query });
  }

  public onQueryInput(value: string): void {
    this.query = value;
    this.search$.next(value.trim());
  }

  public open(note: ClientNote): void {
    this.openNote.emit(note);
  }

  // Optimista: la marca cambia al momento y se deshace si falla.
  public toggleSeen(note: ClientNote, event: Event): void {
    event.stopPropagation();
    const next = !note.seen;
    note.seen = next;
    this.api
      .setClientNotesSeen(this.clientId, next, [note.key])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ unread }) => {
          this.setUnread(unread);
          // Con el filtro "No vistas"/"Vistas", la nota ya no pertenece a la lista.
          if (this.seen !== null && this.seen !== next) {
            this.notes = this.notes.filter((candidate) => candidate.key !== note.key);
            this.total = Math.max(0, this.total - 1);
          }
        },
        error: () => {
          note.seen = !next;
          this.ionicUtil.showToast({ message: this.translate.instant('PAIN.SAVE_ERROR'), duration: 2500 });
        },
      });
  }

  public markAllSeen(): void {
    if (this.markingAll) return;
    this.markingAll = true;
    this.api
      .setClientNotesSeen(this.clientId, true, null, { domain: this.domain, q: this.query })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ unread }) => {
          this.markingAll = false;
          this.setUnread(unread);
          this.load();
        },
        error: () => {
          this.markingAll = false;
          this.ionicUtil.showToast({ message: this.translate.instant('CLIENTS.NO_SE_PUDIERON_MARCAR_LAS'), duration: 2500 });
        },
      });
  }

  // "Marcar todas" solo tiene sentido si hay no vistas dentro del filtro de ámbito.
  public get unreadInFilter(): number {
    return this.domain ? this.unread[this.domain] : this.unread.total;
  }

  public get hasFilters(): boolean {
    return this.domain !== null || this.seen !== null || this.query.trim() !== '';
  }

  // Solo "No vistas" activo y lista vacía: está todo leído.
  public get isCaughtUp(): boolean {
    return !this.notes.length && this.seen === false && !this.domain && !this.query.trim();
  }

  public iconFor(note: ClientNote): string {
    return SOURCE_ICONS[note.sourceType] || 'document-text-outline';
  }

  public dateLabel(note: ClientNote): string {
    if (!note.date) return '';
    // 'YYYY-MM-DD' (dieta, dolor) es un día de calendario: sin hora, para que
    // el huso no lo mueva al día anterior.
    const date = /^\d{4}-\d{2}-\d{2}$/.test(note.date) ? new Date(`${note.date}T12:00:00`) : new Date(note.date);
    return Number.isNaN(date.getTime()) ? '' : DATE_FORMAT().format(date);
  }

  // El primer tramo ("Entrenamiento"/"Nutrición") ya lo dice la etiqueta de ámbito.
  public locationOf(note: ClientNote): string {
    return note.path.slice(1).join(' · ');
  }

  public trackByKey(_index: number, note: ClientNote): string {
    return note.key;
  }

  private setUnread(unread: ClientNotesUnread): void {
    this.unread = unread;
    this.unreadChange.emit(unread);
  }
}
