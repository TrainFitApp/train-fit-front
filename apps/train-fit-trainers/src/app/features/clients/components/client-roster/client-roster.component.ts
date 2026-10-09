import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject, Subscription, catchError, debounceTime, filter, forkJoin, of, takeUntil } from 'rxjs';
import { TrainerNavigationService } from '../../../../core/services/trainer-navigation.service';
import { ClientRosterApiService } from '../../services/client-roster-api.service';
import {
  AdherenceDimensionKey,
  RosterClient,
  RosterDimension,
  RosterFilterCounts,
  RosterQuery,
  RosterResponse,
  RosterSortKey,
} from '../../models/client-roster.model';
import { ClientDetailTab } from '../../pages/client-detail/models/client-detail.model';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerInvitesApiService } from '../../../invites/services/trainer-invites-api.service';
import { ClientIntake, TrainerInvite } from '../../../invites/models/trainer-invite.model';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';
import { localIsoDate } from 'src/app/core/utils/local-date.util';

type ViewState = 'loading' | 'error' | 'loaded';

// Invitación sin aceptar, agrupada por email: invitar entrenamiento y
// nutrición a la vez crea una por scope (mismo criterio que invites.page.ts).
interface PendingInviteGroup {
  clientEmail: string;
  clientName: string | null;
  invites: TrainerInvite[];
  // La más antigua: lo que lleva esperando.
  invitedAt: string;
}

interface RosterViewState {
  searchQuery: string;
  showFilters: boolean;
  filterWeakest: AdherenceDimensionKey | null;
  filterOnlyWithAlerts: boolean;
  filterOnlyOverdueCheckin: boolean;
  filterOnlyWithPending?: boolean;
  sort: SortState;
  page?: number;
}

interface SortState {
  key: RosterSortKey;
  // true = de mayor a menor / más reciente primero.
  descending: boolean;
}

const SCOPE_LABELS: Record<string, string> = {
  training: 'Entrenamiento',
  nutrition: 'Nutrición',
};
localizeRecord(SCOPE_LABELS, 'CLIENTS.SCOPES');

const DIMENSION_LABELS: Record<AdherenceDimensionKey, string> = {
  nutrition: 'Nutrición',
  training: 'Entrenamiento',
  habits: 'Hábitos',
  checkins: 'Check-ins',
};
localizeRecord(DIMENSION_LABELS, 'CLIENT_SUMMARY.DIMENSIONS');

// A qué subpestaña de la ficha del cliente lleva cada dimensión del
// desglose. "habits" se llama "tasks" ahí (ver client-detail.model.ts) —
// mismo desajuste de nombres que ya existe entre Roster y la ficha.
const DIMENSION_TAB: Record<AdherenceDimensionKey, ClientDetailTab> = {
  nutrition: 'nutrition',
  training: 'training',
  habits: 'tasks',
  // "Medidas y check-ins" es un solo panel desde la fusión de las dos
  // subpestañas.
  checkins: 'measurements',
};

// Mismas etiquetas que la pestaña Resumen de la ficha
// (client-summary.component.ts): dos textos distintos para el mismo estado
// harían dudar de si son el mismo dato.
const UNAVAILABLE_LABELS: Record<string, string> = {
  sin_datos: 'Sin datos suficientes',
  // Tarea 5 (2026-09) — ahora hace falta una FASE con fecha (RoutineAssignment),
  // no solo una tabla asignada: un cliente con tableInUse pero sin ninguna
  // fase programada también cae en este motivo.
  sin_plan: 'Sin fase programada',
  sin_tareas: 'Sin hábitos asignados',
  sin_cadencia: 'Sin check-in configurado',
  periodo_corto: 'Aún no tocaba ninguno',
};
localizeRecord(UNAVAILABLE_LABELS, 'CLIENTS.ROSTER_UNAVAILABLE');

// Umbrales de color de la adherencia. Los mismos que usa el evaluador de
// señales para decidir qué es "baja" y qué es "crítica"
// (coach-signals-service.js#SIGNAL_THRESHOLDS): si la app pinta de rojo un
// 65% pero solo avisa por debajo de 70, el color y la alerta se contradicen.
const ADHERENCE_LOW = 70;
const ADHERENCE_CRITICAL = 50;

// Filas por página de la tabla. 25 cubre la cartera típica (20-30 clientes,
// PRODUCT.md) en una o dos páginas sin que cada una se haga eterna.
const ROSTER_PAGE_SIZE = 25;

// Espera tras la última tecla del buscador antes de pedir la página: sin
// ella, escribir "María" serían cinco peticiones.
const SEARCH_DEBOUNCE_MS = 300;

const EMPTY_COUNTS: RosterFilterCounts = {
  weakest: { any: 0, nutrition: 0, training: 0, habits: 0, checkins: 0 },
  alerts: 0,
  overdue: 0,
  pending: 0,
};

/**
 * Movimiento 1 Coach Pro — la CARTERA.
 *
 * Hasta ahora comparar clientes entre sí era abrir fichas de una en una y
 * acordarse. El panel Hoy enseña lo urgente; esto enseña el estado general,
 * que no es lo mismo: un cliente al 45% que todavía no ha disparado ninguna
 * alerta es invisible en Hoy y evidente aquí.
 *
 * Vive dentro de Clientes y no como destino propio del menú: es otra forma
 * de mirar la misma lista, no otro sitio al que ir.
 */
@Component({
  selector: 'app-client-roster',
  templateUrl: 'client-roster.component.html',
  styleUrls: ['client-roster.component.scss'],
})
export class ClientRosterComponent implements AfterViewInit, OnDestroy, OnInit {
  private readonly translate = inject(TranslateService);

  public state: ViewState = 'loading';
  public periodDays = 28;

  // La tabla ya no tiene la cartera entera: solo la página que sirvió el
  // servidor, con la búsqueda, los filtros y el orden aplicados allí.
  public rows: RosterClient[] = [];
  // Filas que cumplen búsqueda + filtros / filas de la tabla sin ninguno.
  public total = 0;
  public totalActive = 0;
  public page = 0;
  public readonly pageSize = ROSTER_PAGE_SIZE;
  // Recuentos del panel de filtros, también del servidor.
  public counts: RosterFilterCounts = EMPTY_COUNTS;
  // Pidiendo otra página, orden o filtro sobre la tabla ya pintada: se
  // atenúa en vez de volver al esqueleto, para no perder el sitio.
  public refreshing = false;

  // Bloque "Pendientes" sobre la tabla: invitaciones sin aceptar y clientes
  // con el intake sin enviar o por revisar. Dentro de la tabla caían al
  // final (sin adherencia, los nulos van abajo) y con muchos clientes no se
  // veían. Búsqueda y filtros no los tocan: es la lista de cosas por hacer.
  public pendingInvites: PendingInviteGroup[] = [];
  public cancellingEmail: string | null = null;

  // Intake sin enviar o por revisar. Llega entero y fuera de la paginación,
  // ya ordenado: por revisar primero (te toca a ti), luego sin enviar.
  public gatedRows: RosterClient[] = [];

  public get pendingCount(): number {
    return this.pendingInvites.length + this.gatedRows.length;
  }

  // Búsqueda, filtros y orden se resuelven en el SERVIDOR: la tabla solo
  // tiene una página, así que filtrar aquí dejaría fuera a los clientes de
  // las demás (ver roster-service.js#paginateRoster).
  public searchQuery = '';
  public showFilters = false;
  public filterWeakest: AdherenceDimensionKey | null = null;
  public filterOnlyWithAlerts = false;
  public filterOnlyOverdueCheckin = false;
  public filterOnlyWithPending = false;

  // Cuántos clientes quedarían al elegir una opción del panel, con la
  // búsqueda y el resto de filtros como están: el número se lee ANTES de
  // pulsar, así que ninguna opción lleva por sorpresa a una tabla vacía.
  public weakestCount(key: AdherenceDimensionKey | null): number {
    return this.counts.weakest[key ?? 'any'] ?? 0;
  }

  public get activeFilterCount(): number {
    return (
      (this.filterWeakest ? 1 : 0) +
      (this.filterOnlyWithAlerts ? 1 : 0) +
      (this.filterOnlyOverdueCheckin ? 1 : 0) +
      (this.filterOnlyWithPending ? 1 : 0)
    );
  }

  public clearFilters(): void {
    this.filterWeakest = null;
    this.filterOnlyWithAlerts = false;
    this.filterOnlyOverdueCheckin = false;
    this.filterOnlyWithPending = false;
    this.onFiltersChange();
  }

  // Cada cambio del panel pide la primera página con los filtros nuevos.
  public onFiltersChange(): void {
    this.page = 0;
    this.refreshPage();
  }

  public onSearchChange(value: string): void {
    this.searchQuery = value;
    this.searchChanges$.next();
  }

  // --- Paginación ---
  public get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  public get rangeStart(): number {
    return this.total ? this.page * this.pageSize + 1 : 0;
  }

  public get rangeEnd(): number {
    return Math.min(this.total, (this.page + 1) * this.pageSize);
  }

  // Números de página con huecos (null) cuando hay muchas: siempre la
  // primera, la última y las vecinas de la actual.
  public get pageItems(): Array<number | null> {
    const last = this.totalPages - 1;
    if (last <= 6) return Array.from({ length: last + 1 }, (_, index) => index);
    const pages = [...new Set([0, this.page - 1, this.page, this.page + 1, last])]
      .filter((page) => page >= 0 && page <= last)
      .sort((a, b) => a - b);
    const items: Array<number | null> = [];
    pages.forEach((page, index) => {
      if (index && page - pages[index - 1] > 1) items.push(null);
      items.push(page);
    });
    return items;
  }

  public goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages || page === this.page || this.refreshing) return;
    this.page = page;
    this.refreshPage(() =>
      // De vuelta al principio de la tabla: el paginador está al final y la
      // página nueva se lee desde arriba.
      this.tableTop?.nativeElement.scrollIntoView({ block: 'start' })
    );
  }

  public trackByPageItem(index: number, item: number | null): string {
    return item === null ? `gap-${index}` : String(item);
  }

  // Por defecto, la adherencia más baja primero: es el orden que responde
  // "¿a quién tengo que mirar hoy?", que es para lo que existe esta tabla.
  public sort: SortState = { key: 'adherence', descending: false };

  // Fila desplegada con el desglose de las 4 dimensiones. Una sola a la vez:
  // varias abiertas convierten la tabla en la lista de tarjetas que ya
  // existe al lado.
  public expandedClientId: string | null = null;

  // Intake por revisar de la fila desplegada: se pide al desplegarla, no
  // con la Cartera (la mayoría de filas nunca se abren).
  public intakeState: 'loading' | 'error' | 'loaded' = 'loading';
  public expandedIntake: ClientIntake | null = null;
  // Fila con "Marcar revisado" o "Rechazar" en curso.
  public busyClientId: string | null = null;
  // Cliente a desplegar en cuanto llegue la Cartera: viene del guard de la
  // ficha (?review=, ver intake-reviewed.guard.ts).
  private pendingFocusId: string | null = null;

  public readonly dimensionKeys: AdherenceDimensionKey[] = [
    'nutrition',
    'training',
    'habits',
    'checkins',
  ];

  // Mismo patrón que el panel de suplementos: el contenedor se traslada al
  // body porque dentro del árbol su position:fixed lo captura el contain de
  // ion-content.
  @ViewChild('panelHost') private panelHost!: ElementRef<HTMLElement>;
  @ViewChild('tableTop') private tableTop?: ElementRef<HTMLElement>;

  // Búsqueda, filtros y orden se recuperan al VOLVER a la cartera (desde la
  // ficha de un cliente, por ejemplo): perder el filtro montado para revisar
  // a diez clientes en cuanto se abre el primero obligaba a rehacerlo diez
  // veces. Entrar de nuevo desde el menú lateral, en cambio, arranca limpio
  // (ver TrainerNavigationService#consumeViewState).
  private static readonly VIEW_STATE_KEY = 'clients-roster';

  private readonly destroy$ = new Subject<void>();
  private readonly searchChanges$ = new Subject<void>();
  // Petición de la tabla en curso: se cancela si llega otra (cambiar de
  // página o de filtro antes de que responda la anterior), para que una
  // respuesta vieja no pise a la nueva.
  private rosterRequest: Subscription | null = null;

  constructor(
    private rosterApi: ClientRosterApiService,
    private router: Router,
    private navigation: TrainerNavigationService,
    private invitesApi: TrainerInvitesApiService,
    private clientDetailApi: ClientDetailApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngAfterViewInit(): void {
    document.body.appendChild(this.panelHost.nativeElement);
  }

  public ngOnDestroy(): void {
    this.panelHost?.nativeElement?.remove();
    this.rememberViewState();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.restoreViewState();
    this.load();

    this.searchChanges$
      .pipe(debounceTime(SEARCH_DEBOUNCE_MS), takeUntil(this.destroy$))
      .subscribe(() => this.onFiltersChange());

    // ion-router-outlet mantiene viva la página mientras se navega hacia
    // dentro, así que ngOnDestroy puede no llegar: se anota el estado al
    // arrancar cada navegación.
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.rememberViewState());
  }

  private rememberViewState(): void {
    this.navigation.saveViewState(ClientRosterComponent.VIEW_STATE_KEY, {
      searchQuery: this.searchQuery,
      showFilters: this.showFilters,
      filterWeakest: this.filterWeakest,
      filterOnlyWithAlerts: this.filterOnlyWithAlerts,
      filterOnlyOverdueCheckin: this.filterOnlyOverdueCheckin,
      filterOnlyWithPending: this.filterOnlyWithPending,
      sort: this.sort,
      page: this.page,
    });
  }

  private restoreViewState(): void {
    const stored = this.navigation.consumeViewState<RosterViewState>(
      ClientRosterComponent.VIEW_STATE_KEY
    );
    if (!stored) return;
    this.searchQuery = stored.searchQuery;
    this.showFilters = stored.showFilters;
    this.filterWeakest = stored.filterWeakest;
    this.filterOnlyWithAlerts = stored.filterOnlyWithAlerts;
    this.filterOnlyOverdueCheckin = stored.filterOnlyOverdueCheckin;
    this.filterOnlyWithPending = stored.filterOnlyWithPending ?? false;
    // Orden y página van en la primera petición de load(), que llega después.
    this.sort = stored.sort;
    this.page = stored.page ?? 0;
  }

  private currentQuery(): RosterQuery {
    return {
      page: this.page,
      limit: this.pageSize,
      search: this.searchQuery,
      sort: this.sort.key,
      descending: this.sort.descending,
      weakest: this.filterWeakest,
      onlyWithAlerts: this.filterOnlyWithAlerts,
      onlyOverdueCheckin: this.filterOnlyOverdueCheckin,
      onlyWithPending: this.filterOnlyWithPending,
    };
  }

  private applyResponse(response: RosterResponse): void {
    this.periodDays = response.periodDays;
    this.rows = response.clients || [];
    this.gatedRows = response.pending || [];
    this.total = response.total ?? this.rows.length;
    this.totalActive = response.totalActive ?? this.total;
    // El servidor devuelve la última página si la pedida ya no existe.
    this.page = response.page ?? 0;
    this.counts = response.counts || EMPTY_COUNTS;
    // La fila desplegada puede no estar en la página nueva.
    if (this.expandedClientId && !this.findRow(this.expandedClientId)) this.expandedClientId = null;
  }

  private findRow(clientId: string): RosterClient | undefined {
    return this.rows.find((row) => row.clientId === clientId) || this.gatedRows.find((row) => row.clientId === clientId);
  }

  // silent: recarga sobre lo ya pintado (volver a Clientes, tirar para
  // refrescar), sin esqueleto: ni parpadea ni pierde el scroll, y si falla
  // se queda con las filas que ya había.
  public load(silent = false): void {
    const keepVisible = silent && this.state === 'loaded';
    if (!keepVisible) this.state = 'loading';
    // Si fallan las invitaciones, la Cartera sale igual (sin ese bloque).
    const invites$: Observable<TrainerInvite[] | null> = this.invitesApi
      .getMyInvites()
      .pipe(catchError(() => of(null)));
    this.rosterRequest?.unsubscribe();
    this.refreshing = false;
    this.rosterRequest = forkJoin([this.rosterApi.getRoster(this.currentQuery()), invites$])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([response, invites]) => {
          this.applyResponse(response);
          if (invites) this.pendingInvites = groupPendingInvites(invites);
          this.state = 'loaded';
          this.applyPendingFocus();
        },
        error: () => {
          if (keepVisible) return;
          this.rows = [];
          this.gatedRows = [];
          this.state = 'error';
        },
      });
  }

  // Solo la tabla (página, orden, búsqueda o filtros), sin volver a pedir
  // las invitaciones ni pasar por el esqueleto. Si falla, se queda con la
  // página que había.
  private refreshPage(onLoaded?: () => void): void {
    if (this.state !== 'loaded') {
      this.load();
      return;
    }
    this.rosterRequest?.unsubscribe();
    this.refreshing = true;
    this.rosterRequest = this.rosterApi
      .getRoster(this.currentQuery())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.applyResponse(response);
          this.refreshing = false;
          onLoaded?.();
        },
        error: () => {
          this.refreshing = false;
          this.ionicUtilService.showToast({
            message: this.translate.instant('CLIENTS.ROSTER_REFRESH_ERROR'),
            duration: 3000,
          });
        },
      });
  }

  // --- Orden ---
  public toggleSort(key: RosterSortKey): void {
    if (this.sort.key === key) {
      this.sort = { key, descending: !this.sort.descending };
    } else {
      // Al cambiar de columna se arranca por el extremo que interesa mirar:
      // la peor adherencia, el que lleva más sin reportar, el que más
      // alertas tiene. Empezar siempre ascendente obligaría a un segundo
      // clic en casi todos los casos.
      this.sort = { key, descending: key !== 'name' && key !== 'adherence' };
    }
    this.page = 0;
    this.refreshPage();
  }

  public sortIcon(key: RosterSortKey): string {
    if (this.sort.key !== key) return 'swap-vertical-outline';
    return this.sort.descending ? 'arrow-down-outline' : 'arrow-up-outline';
  }

  public ariaSort(key: RosterSortKey): 'ascending' | 'descending' | null {
    if (this.sort.key !== key) return null;
    return this.sort.descending ? 'descending' : 'ascending';
  }

  // --- Presentación ---
  public adherenceLabel(row: RosterClient): string {
    return row.adherence.overall === null ? '—' : `${row.adherence.overall}%`;
  }

  public adherenceLevel(row: RosterClient): 'none' | 'critical' | 'low' | 'ok' {
    const overall = row.adherence.overall;
    if (overall === null) return 'none';
    if (overall < ADHERENCE_CRITICAL) return 'critical';
    if (overall < ADHERENCE_LOW) return 'low';
    return 'ok';
  }

  public weakestLabel(row: RosterClient): string {
    return row.adherence.weakest ? DIMENSION_LABELS[row.adherence.weakest] : '—';
  }

  public dimensionLabel(key: AdherenceDimensionKey): string {
    return DIMENSION_LABELS[key];
  }

  public dimensionValue(dimension: RosterDimension): string {
    if (!dimension?.applicable) {
      return UNAVAILABLE_LABELS[dimension?.reason || ''] || this.translate.instant('CLIENTS.NO_APLICA');
    }
    return `${dimension.percentage}%`;
  }

  // El peso se muestra con signo explícito: "-2 kg" y "+2 kg" son noticias
  // opuestas y el signo es lo primero que se lee.
  // Con una sola medida no hay variación: se enseña el peso (sin signo).
  public weightLabel(row: RosterClient): string {
    if (!row.weightChange) return '—';
    const { absolute, to } = row.weightChange;
    if (absolute === null) return `${formatEs(to.weight)} kg`;
    const sign = absolute > 0 ? '+' : '';
    return `${sign}${formatEs(absolute)} kg`;
  }

  public weightDetail(row: RosterClient): string {
    if (!row.weightChange) return this.translate.instant('CLIENTS.SIN_PESO_REGISTRADO_EN_DIAS', { periodDays: this.periodDays });
    const { from, to, measurements, absolute } = row.weightChange;
    if (absolute === null) {
      return this.translate.instant('CLIENTS.UNA_SOLA_MEDIDA_EN_DIAS', { weight: formatEs(to.weight), periodDays: this.periodDays });
    }
    return this.translate.instant('CLIENTS.VARIACION_DE_PESO_DETALLE', {
      from: formatEs(from.weight),
      to: formatEs(to.weight),
      count: measurements,
    });
  }

  public checkinLabel(row: RosterClient): string {
    if (row.daysSinceCheckin === null) return this.translate.instant('CLIENTS.NUNCA');
    if (row.daysSinceCheckin === 0) return this.translate.instant('TRAINER_COMMON.TODAY');
    if (row.daysSinceCheckin === 1) return this.translate.instant('TRAINER_COMMON.YESTERDAY');
    return this.translate.instant('CLIENTS.HACE_DIAS', { daysSinceCheckin: row.daysSinceCheckin });
  }

  // Atrasado = ya pasó la fecha del siguiente check-in programado y sigue
  // sin responder. Sin programación no hay nada que incumplir.
  public isCheckinOverdue(row: RosterClient): boolean {
    if (!row.nextCheckinDate) return false;
    return row.nextCheckinDate < localIsoDate();
  }

  public toggleRow(row: RosterClient): void {
    this.expandedClientId = this.expandedClientId === row.clientId ? null : row.clientId;
    if (this.expandedClientId && row.intakeStatus === 'submitted') this.loadIntake(row.clientId);
  }

  // Desde el guard: se despliega su fila en "Pendientes" (búsqueda y filtros
  // no la ocultan). Espera a la carga si aún no está la fila.
  public focusClient(clientId: string): void {
    this.pendingFocusId = clientId;
    if (this.state === 'loaded') this.applyPendingFocus();
  }

  private applyPendingFocus(): void {
    const row = this.gatedRows.find((r) => r.clientId === this.pendingFocusId);
    if (!row) return;
    this.pendingFocusId = null;
    if (this.expandedClientId !== row.clientId) this.toggleRow(row);
    setTimeout(() =>
      document.getElementById('roster-detail-' + row.clientId)?.scrollIntoView({ block: 'center' })
    );
  }

  public loadIntake(clientId: string): void {
    this.intakeState = 'loading';
    this.expandedIntake = null;
    this.invitesApi.getClientIntake(clientId).subscribe({
      next: (intake) => {
        // Pudo desplegar otra fila mientras llegaba.
        if (this.expandedClientId !== clientId) return;
        this.expandedIntake = intake;
        this.intakeState = 'loaded';
      },
      error: () => {
        if (this.expandedClientId === clientId) this.intakeState = 'error';
      },
    });
  }

  // Revisarlo es lo que abre la ficha: marca revisado (el cliente ya no
  // puede cambiarlo) y entra directamente a su seguimiento.
  public markIntakeReviewed(row: RosterClient): void {
    if (this.busyClientId) return;
    this.busyClientId = row.clientId;
    this.invitesApi.markIntakeReviewed(row.clientId).subscribe({
      next: () => {
        this.busyClientId = null;
        row.intakeStatus = 'reviewed';
        this.expandedClientId = null;
        this.openClient(row);
      },
      error: (err) => {
        this.busyClientId = null;
        this.ionicUtilService.showToast({
          message: err?.error?.message || this.translate.instant('CLIENTS.NO_SE_PUDO_MARCAR_COMO'),
          duration: 3000,
        });
      },
    });
  }

  // Sin poder entrar en la ficha, "Rechazar" es la única forma de terminar
  // con un cliente que no se quiere (y de liberar su plaza).
  public async confirmReject(row: RosterClient): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('CLIENTS.RECHAZAR', { clientName: row.clientName }),
      message: this.translate.instant('CLIENTS.DEJARA_DE_SER_TU_CLIENTE'),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        { text: this.translate.instant('ONBOARDING.DECLINE'), cssClass: 'alert-button-danger', handler: () => this.reject(row) },
      ],
    });
  }

  private reject(row: RosterClient): void {
    if (this.busyClientId || !row.scopes.length) return;
    this.busyClientId = row.clientId;
    // Una relación por scope (ver trainer-client-schema.js): se terminan todas.
    forkJoin(row.scopes.map((scope) => this.clientDetailApi.revokeRelation(row.clientId, scope))).subscribe({
      next: () => {
        this.busyClientId = null;
        this.expandedClientId = null;
        this.gatedRows = this.gatedRows.filter((r) => r.clientId !== row.clientId);
        this.ionicUtilService.showToast({ message: this.translate.instant('CLIENTS.HAS_RECHAZADO', { clientName: row.clientName }), duration: 2500 });
      },
      error: () => {
        this.busyClientId = null;
        this.ionicUtilService.showToast({ message: this.translate.instant('CLIENTS.NO_SE_PUDO_RECHAZAR_AL'), duration: 3000 });
      },
    });
  }

  // --- Invitaciones sin aceptar ---
  public scopesLabel(scopes: string[]): string {
    return scopes.map((scope) => SCOPE_LABELS[scope] || scope).join(' · ');
  }

  public inviteScopes(group: PendingInviteGroup): string[] {
    return group.invites.map((invite) => invite.scope);
  }

  public invitedLabel(group: PendingInviteGroup): string {
    const days = daysSinceDate(group.invitedAt);
    if (days <= 0) return this.translate.instant('CLIENTS.ENVIADA_HOY');
    if (days === 1) return this.translate.instant('CLIENTS.ENVIADA_AYER');
    return this.translate.instant('CLIENTS.ENVIADA_HACE_DIAS', { days });
  }

  public async confirmCancelInvite(group: PendingInviteGroup): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('CLIENTS.CANCELAR_INVITACION'),
      message: this.translate.instant('CLIENTS.YA_NO_PODRA_ACEPTARLA', { p0: group.clientName || group.clientEmail }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        { text: this.translate.instant('CLIENTS.CANCELAR_INVITACION'), cssClass: 'alert-button-danger', handler: () => this.cancelInvite(group) },
      ],
    });
  }

  private cancelInvite(group: PendingInviteGroup): void {
    if (this.cancellingEmail) return;
    this.cancellingEmail = group.clientEmail;
    forkJoin(group.invites.map((invite) => this.invitesApi.cancelInvite(invite._id))).subscribe({
      next: () => {
        this.cancellingEmail = null;
        this.pendingInvites = this.pendingInvites.filter((g) => g !== group);
        this.ionicUtilService.showToast({ message: this.translate.instant('CLIENTS.INVITACION_CANCELADA'), duration: 2500 });
      },
      error: () => {
        this.cancellingEmail = null;
        this.ionicUtilService.showToast({ message: this.translate.instant('CLIENTS.NO_SE_PUDO_CANCELAR_LA'), duration: 3000 });
      },
    });
  }

  public trackByEmail(_index: number, group: PendingInviteGroup): string {
    return group.clientEmail;
  }

  public openClient(row: RosterClient): void {
    this.router.navigate(['/tabs/clients', row.clientId], {
      queryParams: { name: row.clientName },
    });
  }

  // Cada card del desglose abre la ficha directamente en su sección, en vez
  // de dejar que el entrenador la busque él mismo entre las subpestañas.
  public openClientDimension(row: RosterClient, key: AdherenceDimensionKey, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/tabs/clients', row.clientId], {
      queryParams: { name: row.clientName, tab: DIMENSION_TAB[key] },
    });
  }

  // «Por revisar»: los check-ins se revisan en la ficha (Progreso › Medidas
  // y check-ins abre en «Esperan tu respuesta»); los vídeos, en la bandeja
  // filtrada por ese cliente.
  public openPendingCheckins(row: RosterClient, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/tabs/clients', row.clientId], {
      queryParams: { name: row.clientName, tab: 'measurements' },
    });
  }

  public goToInvite(): void {
    void this.router.navigate(['/tabs/invites']);
  }

  public openPendingFormChecks(row: RosterClient, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/tabs/review'], { queryParams: { type: 'form_check', client: row.clientId } });
  }

  public trackByClientId(_index: number, row: RosterClient): string {
    return row.clientId;
  }

  public trackByDimension(_index: number, key: AdherenceDimensionKey): string {
    return key;
  }
}

// --- helpers de módulo ---

// Solo las invitaciones sin responder: quien aceptó ya sale en la Cartera.
function groupPendingInvites(invites: TrainerInvite[]): PendingInviteGroup[] {
  const groups = new Map<string, PendingInviteGroup>();
  for (const invite of invites) {
    if (invite.status !== 'pending') continue;
    const key = invite.clientEmail.toLowerCase();
    const name = [invite.client?.name, invite.client?.lastname].filter(Boolean).join(' ') || null;
    const group = groups.get(key);
    if (!group) {
      groups.set(key, { clientEmail: invite.clientEmail, clientName: name, invites: [invite], invitedAt: invite.invitedAt });
      continue;
    }
    group.invites.push(invite);
    group.clientName = group.clientName || name;
    if (invite.invitedAt < group.invitedAt) group.invitedAt = invite.invitedAt;
  }
  // Las que más llevan esperando, arriba.
  return [...groups.values()].sort((a, b) => a.invitedAt.localeCompare(b.invitedAt));
}

function daysSinceDate(iso: string): number {
  const start = new Date(iso);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - start.getTime()) / 86400000);
}

function formatEs(value: number): string {
  return String(value).replace('.', ',');
}
