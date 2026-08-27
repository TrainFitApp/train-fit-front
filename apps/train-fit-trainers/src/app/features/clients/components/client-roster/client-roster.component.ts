import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ClientRosterApiService } from '../../services/client-roster-api.service';
import {
  AdherenceDimensionKey,
  RosterClient,
  RosterDimension,
} from '../../models/client-roster.model';

type ViewState = 'loading' | 'error' | 'empty' | 'loaded';

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

// Mismas etiquetas que la pestaña Resumen de la ficha
// (client-summary.component.ts): dos textos distintos para el mismo estado
// harían dudar de si son el mismo dato.
const UNAVAILABLE_LABELS: Record<string, string> = {
  sin_datos: 'Sin datos suficientes',
  sin_plan: 'Sin rutina asignada',
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

// Espejo de CHECKIN_CADENCE_DAYS (components/trainerCheckins/checkin-due.js).
// "once" no está a propósito: un check-in de una sola vez no se puede
// "atrasar", igual que en el backend.
const CHECKIN_CADENCE_DAYS: Record<string, number> = { weekly: 7, biweekly: 14 };

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
      if (this.filterOnlyOverdueCheckin && (row.daysSinceCheckin ?? 0) <= 7) return false;
      return true;
    });
  }

  public get activeFilterCount(): number {
    return (
      (this.filterWeakest ? 1 : 0) +
      (this.filterOnlyWithAlerts ? 1 : 0) +
      (this.filterOnlyOverdueCheckin ? 1 : 0)
    );
  }

  public clearFilters(): void {
    this.filterWeakest = null;
    this.filterOnlyWithAlerts = false;
    this.filterOnlyOverdueCheckin = false;
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

  constructor(private rosterApi: ClientRosterApiService, private router: Router) {}

  public ngAfterViewInit(): void {
    document.body.appendChild(this.panelHost.nativeElement);
  }

  public ngOnDestroy(): void {
    this.panelHost?.nativeElement?.remove();
  }

  public ngOnInit(): void {
    this.load();
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

  // Un check-in "atrasado" solo tiene sentido si hay cadencia periódica
  // configurada: sin ella (o con cadencia "once") no hay nada que incumplir.
  // Mismos días que CHECKIN_CADENCE_DAYS en checkin-due.js.
  public isCheckinOverdue(row: RosterClient): boolean {
    const cadenceDays = CHECKIN_CADENCE_DAYS[row.checkinCadence || ''];
    if (!cadenceDays) return false;
    return row.daysSinceCheckin === null || row.daysSinceCheckin > cadenceDays;
  }

  public toggleRow(row: RosterClient): void {
    this.expandedClientId = this.expandedClientId === row.clientId ? null : row.clientId;
  }

  public openClient(row: RosterClient): void {
    this.router.navigate(['/tabs/clients', row.clientId], {
      queryParams: { name: row.clientName },
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
