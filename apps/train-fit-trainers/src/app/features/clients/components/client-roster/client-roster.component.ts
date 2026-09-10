import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { TrainerNavigationService } from '../../../../core/services/trainer-navigation.service';
import { ClientRosterApiService } from '../../services/client-roster-api.service';
import {
  AdherenceDimensionKey,
  RosterClient,
  RosterDimension,
} from '../../models/client-roster.model';
import { ClientDetailTab } from '../../pages/client-detail/models/client-detail.model';

type ViewState = 'loading' | 'error' | 'empty' | 'loaded';

interface RosterViewState {
  searchQuery: string;
  showFilters: boolean;
  filterWeakest: AdherenceDimensionKey | null;
  filterOnlyWithAlerts: boolean;
  filterOnlyOverdueCheckin: boolean;
  filterOnlyOverdueWeightPlan: boolean;
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
  | 'alerts';

interface SortState {
  key: RosterSortKey;
  // true = de mayor a menor / más reciente primero.
  descending: boolean;
}

const DIMENSION_LABELS: Record<AdherenceDimensionKey, string> = {
  nutrition: 'Nutrición',
  training: 'Entrenamiento',
  habits: 'Hábitos',
  checkins: 'Check-ins',
};

// A qué subpestaña de la ficha del cliente lleva cada dimensión del
// desglose. "habits" se llama "tasks" ahí (ver client-detail.model.ts) —
// mismo desajuste de nombres que ya existe entre Roster y la ficha.
const DIMENSION_TAB: Record<AdherenceDimensionKey, ClientDetailTab> = {
  nutrition: 'nutrition',
  training: 'training',
  habits: 'tasks',
  checkins: 'checkins',
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
  public state: ViewState = 'loading';
  public periodDays = 28;
  public rows: RosterClient[] = [];

  // Búsqueda y filtros se aplican EN CLIENTE sobre las filas ya cargadas: la
  // Cartera trae la cartera entera de una vez (una petición con presupuesto
  // fijo, ver roster-service), así que pedir al servidor por cada tecla
  // sería trabajo de red para reordenar algo que ya está en memoria.
  public searchQuery = '';
  public showFilters = false;
  public filterWeakest: AdherenceDimensionKey | null = null;
  public filterOnlyWithAlerts = false;
  public filterOnlyOverdueCheckin = false;
  public filterOnlyOverdueWeightPlan = false;

  public get visibleRows(): RosterClient[] {
    const consulta = this.searchQuery.trim().toLowerCase();
    return this.rows.filter((row) => {
      if (consulta) {
        const heno = `${row.clientName} ${row.clientEmail || ''}`.toLowerCase();
        if (!heno.includes(consulta)) return false;
      }
      if (this.filterWeakest && row.adherence.weakest !== this.filterWeakest) return false;
      if (this.filterOnlyWithAlerts && !row.openAlerts) return false;
      // "Vencido" = más de un ciclo sin responder. El dato exacto lo tiene el
      // motor de alertas; aquí basta con el umbral visible de la columna.
      if (this.filterOnlyOverdueCheckin && !row.checkinOverdue) return false;
      // Mismo criterio: null (cliente "libre", sin pauta) no cuenta como
      // atrasado, así que no aparece al filtrar por este check.
      if (this.filterOnlyOverdueWeightPlan && !this.isWeightPlanOverdue(row)) return false;
      return true;
    });
  }

  public get activeFilterCount(): number {
    return (
      (this.filterWeakest ? 1 : 0) +
      (this.filterOnlyWithAlerts ? 1 : 0) +
      (this.filterOnlyOverdueCheckin ? 1 : 0) +
      (this.filterOnlyOverdueWeightPlan ? 1 : 0)
    );
  }

  public clearFilters(): void {
    this.filterWeakest = null;
    this.filterOnlyWithAlerts = false;
    this.filterOnlyOverdueCheckin = false;
    this.filterOnlyOverdueWeightPlan = false;
  }

  // Por defecto, la adherencia más baja primero: es el orden que responde
  // "¿a quién tengo que mirar hoy?", que es para lo que existe esta tabla.
  public sort: SortState = { key: 'adherence', descending: false };

  // Fila desplegada con el desglose de las 4 dimensiones. Una sola a la vez:
  // varias abiertas convierten la tabla en la lista de tarjetas que ya
  // existe al lado.
  public expandedClientId: string | null = null;

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
    private navigation: TrainerNavigationService
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
      filterOnlyOverdueWeightPlan: this.filterOnlyOverdueWeightPlan,
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
    this.filterOnlyOverdueWeightPlan = stored.filterOnlyOverdueWeightPlan ?? false;
    // El orden se aplica sobre las filas en load(), que llega después.
    this.sort = stored.sort;
  }

  public load(): void {
    this.state = 'loading';
    this.rosterApi.getRoster().subscribe({
      next: (response) => {
        this.periodDays = response.periodDays;
        this.rows = response.clients || [];
        this.state = this.rows.length ? 'loaded' : 'empty';
        this.applySort();
      },
      error: () => {
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
      return UNAVAILABLE_LABELS[dimension?.reason || ''] || 'No aplica';
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
    if (!row.weightChange) return `Sin peso registrado en ${this.periodDays} días`;
    const { from, to, measurements } = row.weightChange;
    return `${formatEs(from.weight)} → ${formatEs(to.weight)} kg · ${measurements} mediciones`;
  }

  public checkinLabel(row: RosterClient): string {
    if (row.daysSinceCheckin === null) return 'Nunca';
    if (row.daysSinceCheckin === 0) return 'Hoy';
    if (row.daysSinceCheckin === 1) return 'Ayer';
    return `Hace ${row.daysSinceCheckin} días`;
  }

  // "Atrasado" lo decide el backend contando solicitudes reales cerradas sin
  // responder (ver checkin-occurrences.js). Antes se calculaba aquí a partir
  // de una cadencia declarada que solo tenía el sistema legacy: un cliente
  // con check-ins de calendario nunca salía vencido, respondiera o no.
  public isCheckinOverdue(row: RosterClient): boolean {
    return row.checkinOverdue;
  }

  // Fase 6 — mismo criterio que isCheckinOverdue: el backend ya decide qué es
  // "atrasado" (complianceFor, weight-plan-service.js), esto solo lo lee.
  public isWeightPlanOverdue(row: RosterClient): boolean {
    return !!row.weightPlan && !row.weightPlan.upToDate;
  }

  public weightPlanLabel(row: RosterClient): string {
    const plan = row.weightPlan;
    if (!plan) return 'Libre';
    if (plan.upToDate) return 'Al día';
    if (plan.neverWeighed) return 'Sin pesar';
    return `Atrasado ${plan.overdueDays} día${plan.overdueDays === 1 ? '' : 's'}`;
  }

  public weightPlanDetail(row: RosterClient): string {
    const plan = row.weightPlan;
    if (!plan) return 'Sin pauta de peso asignada';
    return `Pauta cada ${plan.intervalDays} día${plan.intervalDays === 1 ? '' : 's'}`;
  }

  public toggleRow(row: RosterClient): void {
    this.expandedClientId = this.expandedClientId === row.clientId ? null : row.clientId;
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

  public trackByClientId(_index: number, row: RosterClient): string {
    return row.clientId;
  }

  public trackByDimension(_index: number, key: AdherenceDimensionKey): string {
    return key;
  }
}

// --- helpers de módulo ---

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
    case 'alerts':
      // Las urgentes desempatan: 1 urgente pesa más que 2 menores, y sin
      // esto quedarían mezcladas en el mismo escalón.
      return row.openAlerts + row.urgentAlerts * 0.5;
    default:
      return null;
  }
}

function formatEs(value: number): string {
  return String(value).replace('.', ',');
}
