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
import { Observable, Subscription, catchError, filter, forkJoin, of } from 'rxjs';
import { TrainerNavigationService } from '../../../../core/services/trainer-navigation.service';
import { ClientRosterApiService } from '../../services/client-roster-api.service';
import {
  AdherenceDimensionKey,
  RosterClient,
  RosterDimension,
} from '../../models/client-roster.model';
import { ClientDetailTab } from '../../pages/client-detail/models/client-detail.model';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerInvitesApiService } from '../../../invites/services/trainer-invites-api.service';
import { ClientIntake, TrainerInvite } from '../../../invites/models/trainer-invite.model';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

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

interface RosterFilters {
  weakest: AdherenceDimensionKey | null;
  onlyWithAlerts: boolean;
  onlyOverdueCheckin: boolean;
  onlyWithPending: boolean;
}

interface RosterViewState {
  searchQuery: string;
  showFilters: boolean;
  filterWeakest: AdherenceDimensionKey | null;
  filterOnlyWithAlerts: boolean;
  filterOnlyOverdueCheckin: boolean;
  filterOnlyWithPending?: boolean;
  sort: SortState;
}

// Por qué se ordena por columnas y no por un "score" único: cualquier
// fórmula que mezcle adherencia, peso y alertas en un número esconde
// exactamente lo que el entrenador necesita ver, y además tendría que
// justificar sus pesos. Ordenar por la columna que le importa hoy no
// necesita justificación ninguna.
export type RosterSortKey =
  | 'name'
  | 'adherence'
  | 'weight'
  | 'checkin'
  | 'sessions'
  | 'review'
  | 'alerts';

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
  public rows: RosterClient[] = [];

  // Bloque "Pendientes" sobre la tabla: invitaciones sin aceptar y clientes
  // con el intake sin enviar o por revisar. Dentro de la tabla caían al
  // final (sin adherencia, los nulos van abajo) y con muchos clientes no se
  // veían. Búsqueda y filtros no los tocan: es la lista de cosas por hacer.
  public pendingInvites: PendingInviteGroup[] = [];
  public cancellingEmail: string | null = null;

  // Por revisar primero (te toca a ti), luego sin enviar (se espera al cliente).
  public get gatedRows(): RosterClient[] {
    return this.rows
      .filter((row) => this.isGated(row))
      .sort((a, b) => Number(b.intakeStatus === 'submitted') - Number(a.intakeStatus === 'submitted'));
  }

  public get activeRows(): RosterClient[] {
    return this.rows.filter((row) => !this.isGated(row));
  }

  public get pendingCount(): number {
    return this.pendingInvites.length + this.gatedRows.length;
  }

  // Búsqueda y filtros se aplican EN CLIENTE sobre las filas ya cargadas: la
  // Cartera trae la cartera entera de una vez (una petición con presupuesto
  // fijo, ver roster-service), así que pedir al servidor por cada tecla
  // sería trabajo de red para reordenar algo que ya está en memoria.
  public searchQuery = '';
  public showFilters = false;
  public filterWeakest: AdherenceDimensionKey | null = null;
  public filterOnlyWithAlerts = false;
  public filterOnlyOverdueCheckin = false;
  public filterOnlyWithPending = false;

  public get visibleRows(): RosterClient[] {
    return this.rowsMatching({});
  }

  // Cuántos clientes quedarían al elegir una opción del panel, con la
  // búsqueda y el resto de filtros como están: el número se lee ANTES de
  // pulsar, así que ninguna opción lleva por sorpresa a una tabla vacía.
  public countWith(override: Partial<RosterFilters>): number {
    return this.rowsMatching(override).length;
  }

  private rowsMatching(override: Partial<RosterFilters>): RosterClient[] {
    const { weakest, onlyWithAlerts, onlyOverdueCheckin, onlyWithPending }: RosterFilters = {
      weakest: this.filterWeakest,
      onlyWithAlerts: this.filterOnlyWithAlerts,
      onlyOverdueCheckin: this.filterOnlyOverdueCheckin,
      onlyWithPending: this.filterOnlyWithPending,
      ...override,
    };
    const consulta = this.searchQuery.trim().toLowerCase();
    return this.activeRows.filter((row) => {
      if (consulta) {
        const heno = `${row.clientName} ${row.clientEmail || ''}`.toLowerCase();
        if (!heno.includes(consulta)) return false;
      }
      if (weakest && row.adherence.weakest !== weakest) return false;
      if (onlyWithAlerts && !row.openAlerts) return false;
      // "Vencido" = pasó la fecha del siguiente check-in. El dato exacto lo tiene el
      // motor de alertas; aquí basta con el umbral visible de la columna.
      if (onlyOverdueCheckin && (row.daysSinceCheckin ?? 0) <= 7) return false;
      if (onlyWithPending && !pendingOf(row)) return false;
      return true;
    });
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

  // Búsqueda, filtros y orden se recuperan al VOLVER a la cartera (desde la
  // ficha de un cliente, por ejemplo): perder el filtro montado para revisar
  // a diez clientes en cuanto se abre el primero obligaba a rehacerlo diez
  // veces. Entrar de nuevo desde el menú lateral, en cambio, arranca limpio
  // (ver TrainerNavigationService#consumeViewState).
  private static readonly VIEW_STATE_KEY = 'clients-roster';

  private navigationSubscription: Subscription | null = null;

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
    this.navigationSubscription?.unsubscribe();
    this.rememberViewState();
  }

  public ngOnInit(): void {
    this.restoreViewState();
    this.load();

    // ion-router-outlet mantiene viva la página mientras se navega hacia
    // dentro, así que ngOnDestroy puede no llegar: se anota el estado al
    // arrancar cada navegación.
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
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
    // El orden se aplica sobre las filas en load(), que llega después.
    this.sort = stored.sort;
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
    forkJoin([this.rosterApi.getRoster(), invites$]).subscribe({
      next: ([response, invites]) => {
        this.periodDays = response.periodDays;
        this.rows = response.clients || [];
        if (invites) this.pendingInvites = groupPendingInvites(invites);
        this.state = 'loaded';
        this.applySort();
        this.applyPendingFocus();
      },
      error: () => {
        if (keepVisible) return;
        this.rows = [];
        this.state = 'error';
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
    this.applySort();
  }

  public sortIcon(key: RosterSortKey): string {
    if (this.sort.key !== key) return 'swap-vertical-outline';
    return this.sort.descending ? 'arrow-down-outline' : 'arrow-up-outline';
  }

  private applySort(): void {
    const direction = this.sort.descending ? -1 : 1;
    const key = this.sort.key;
    const byName = (a: RosterClient, b: RosterClient): number =>
      a.clientName.localeCompare(b.clientName, 'es');

    this.rows = [...this.rows].sort((a, b) => {
      if (key === 'name') return byName(a, b) * direction;

      const left = valueFor(a, key);
      const right = valueFor(b, key);

      // Los nulos van SIEMPRE al final, se ordene como se ordene — por eso
      // se resuelven ANTES de aplicar la dirección. Un cliente sin datos no
      // es "el mejor" ni "el peor": es el que todavía no se puede comparar,
      // y colarlo en cabeza dejaría fuera de la vista al que sí importa.
      if (left === null && right === null) return byName(a, b);
      if (left === null) return 1;
      if (right === null) return -1;

      // Empate a número: por nombre, para que el orden sea estable y la
      // tabla no baile entre renders.
      return (left - right) * direction || byName(a, b);
    });
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
  public weightLabel(row: RosterClient): string {
    if (!row.weightChange) return '—';
    const { absolute } = row.weightChange;
    const sign = absolute > 0 ? '+' : '';
    return `${sign}${formatEs(absolute)} kg`;
  }

  public weightDetail(row: RosterClient): string {
    if (!row.weightChange) return this.translate.instant('CLIENTS.SIN_PESO_REGISTRADO_EN_DIAS', { periodDays: this.periodDays });
    const { from, to, measurements } = row.weightChange;
    return `${formatEs(from.weight)} → ${formatEs(to.weight)} kg · ${measurements} mediciones`;
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
    return row.nextCheckinDate < new Date().toISOString().slice(0, 10);
  }

  // Intake sin enviar o por revisar: no hay seguimiento todavía y no se
  // entra en la ficha (el guard tampoco deja): va a "Pendientes" y despliega
  // el intake.
  private isGated(row: RosterClient): boolean {
    return row.intakeStatus === 'pending' || row.intakeStatus === 'submitted';
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
    const row = this.rows.find((r) => r.clientId === this.pendingFocusId);
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
        this.rows = this.rows.filter((r) => r.clientId !== row.clientId);
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

function pendingOf(row: RosterClient): number {
  return (row.pendingCheckins || 0) + (row.pendingFormChecks || 0);
}

function valueFor(row: RosterClient, key: RosterSortKey): number | null {
  switch (key) {
    case 'adherence':
      return row.adherence.overall;
    case 'weight':
      return row.weightChange ? row.weightChange.absolute : null;
    case 'checkin':
      return row.daysSinceCheckin;
    case 'sessions':
      return row.sessions;
    case 'review':
      return pendingOf(row);
    case 'alerts':
      // Las urgentes desempatan: 1 urgente pesa más que 2 menores, y sin
      // esto quedarían mezcladas en el mismo escalón.
      return row.openAlerts + row.urgentAlerts * 0.5;
    default:
      return null;
  }
}

// Solo las 'pending': cuestionario_pendiente/en_revision son datos antiguos
// de clientes que ya aceptaron (salen en la Cartera).
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
