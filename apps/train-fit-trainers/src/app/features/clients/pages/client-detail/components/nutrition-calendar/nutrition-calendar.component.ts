import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { NutritionComplianceDay } from '../../models/client-detail.model';
import { PlanAssignmentApiService } from '../../../../../../shared/services/plan-assignment-api.service';
import { PlanAssignment } from '../../../../../../shared/models/plan-assignment.model';

interface CalendarPhaseInfo {
  id: string;
  color: string;
  planName: string | null;
}

// Leyenda dinámica: qué fases pinta el mes que se está viendo, con su
// nombre real en vez del genérico "Fase del plan (un color por fase)" de
// antes — solo las que de verdad aparecen, no todo el historial del
// cliente (que puede acumular muchas y no caben ni aportan aquí).
export interface PhaseLegendItem {
  id: string;
  color: string;
  label: string;
}

interface CalendarCell {
  date: string | null;
  dayNumber: number | null;
  compliance: NutritionComplianceDay | null;
  phase: CalendarPhaseInfo | null;
}

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTH_LABELS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

// Paleta categórica para tramos de plan (una fase = un color, cíclico por
// orden de inicio) — deliberadamente fuera de la gama naranja/roja ya
// usada por el relleno de cumplimiento y el punto de excepción, para que
// los tres canales visuales (fase / cumplimiento / excepción) no se
// confundan entre sí en la misma celda. MISMOS valores que
// weekdayPatternColors en client-detail.page.ts (un solo origen
// conceptual, dos usos) — cambiar aquí implica cambiar allí.
//
// Historial de esta paleta (2026-09):
//   1ª pasada (quieter, ~S48%/L60%) — desaturada a propósito para no
//   competir con el resto del sistema. Tenía dos azules casi idénticos
//   (#6e99cd/#4f9fc2, 13º de diferencia de tono).
//   2ª pasada — mismo S/L, tonos repartidos uniformemente (47º mínimo
//   entre cualquier par) por el arco libre de rojo/naranja. Seguía
//   viéndose deslavada: a saturación tan baja, todo el conjunto lee como
//   variaciones de un mismo gris pastel, angulo de tono aparte.
//   3ª pasada — prioriza distinguirse sobre "quieter": S~72% (casi la
//   saturación original de Tailwind, ~92%) y luminosidad ALTERNADA 56%/66%
//   entre índices consecutivos. Seguía fallando en lo que más importa: los
//   tonos estaban ordenados de menor a mayor, o sea que dos fases SEGUIDAS
//   caían siempre a la mínima distancia posible (47º) — fase 1 lima y fase
//   2 verde, las dos verdes.
//   4ª pasada (actual) — mismos 6 tonos, REORDENADOS para que cada índice
//   salte al lado opuesto de la rueda: separación mínima entre fases
//   consecutivas 95º en vez de 47º (fuerza bruta sobre las 720
//   permutaciones, maximizando el mínimo). Orden resultante: lima, azul,
//   verde, magenta, turquesa, violeta. La luminosidad se alterna sobre el
//   orden YA definitivo, así que dos fases seguidas siguen difiriendo en
//   tono Y en claridad. Sigue fuera de la banda [335º,360º)∪[0º,50º)
//   reservada arriba.
const PHASE_COLORS = ['#bae03e', '#6a9ce7', '#3ee041', '#e76ad0', '#3ee0c2', '#9c6ae7'];

// F20-terdecies — presets de rango (7/30/90d), antes vivían en
// <app-nutrition-tracking-chart> — se mueven aquí porque conceptualmente
// "qué rango de fechas ver" es del calendario, no de la gráfica; la
// gráfica solo se limita a dibujar lo que le llega por [customRange].
const RANGE_PRESETS = [7, 30, 90];

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

// deltaDays negativo = hacia atrás, positivo = hacia delante.
function addIsoDays(deltaDays: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + deltaDays);
  return date.toISOString().slice(0, 10);
}

function buildMonthGrid(year: number, month: number): CalendarCell[] {
  // Lunes=0 — mismo criterio que el resto de calendarios de la app.
  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const totalDays = daysInMonth(year, month);
  const cells: CalendarCell[] = [];

  // Días de relleno (mes anterior/siguiente) — muestran su número REAL en
  // gris (ver .is-blank en el scss) en vez de una celda totalmente vacía,
  // para que se note que son "el mes de al lado", no un hueco sin más.
  // `date` se queda en null a propósito: siguen sin ser clicables ni
  // formar parte de ningún rango, mismo comportamiento que antes.
  const prevMonthLastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ date: null, dayNumber: prevMonthLastDay - i, compliance: null, phase: null });
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push({ date: isoDate(year, month, day), dayNumber: day, compliance: null, phase: null });
  }
  let nextMonthDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, dayNumber: nextMonthDay, compliance: null, phase: null });
    nextMonthDay++;
  }
  return cells;
}

// F20-bis — sustituye al stepper de flechas ±1 día (nunca daba vista de
// conjunto ni salto directo a una fecha). Vista de mes con una celda por
// día: cumplimiento del plan (relleno según %), excepciones (punto) y días
// sin plan (atenuados). Al hacer click en un día, el padre (client-detail)
// recarga esa fecha con el mismo loadNutrition() de siempre — este
// componente no sabe nada de dietas, solo de cumplimiento.
@Component({
  selector: 'app-nutrition-calendar',
  templateUrl: './nutrition-calendar.component.html',
  styleUrls: ['./nutrition-calendar.component.scss'],
})
export class NutritionCalendarComponent implements OnChanges {
  @Input() clientId = '';
  @Input() selectedDate = '';

  // El rango llega ahora desde fuera: los presets se eligen encima de la
  // gráfica. Sin este Input, el calendario dejaría de pintar sombreado el
  // periodo que la gráfica está mostrando y habría dos verdades a la vez.
  @Input() public set activeRange(range: { start: string; end: string } | null) {
    if (!range) return;
    this.rangeStart = range.start;
    this.rangeEnd = range.end;
  }
  @Output() dateSelected = new EventEmitter<string>();

  // Solo tiene sentido ofrecerlo si hay plan activo que saltarse: lo sabe
  // la ficha, no el calendario.
  @Input() canCreateException = false;
  @Input() isCreatingException = false;
  @Output() exceptionRequested = new EventEmitter<string>();

  public get selectedDateLabel(): string {
    if (!this.selectedDate) return 'este día';
    const fecha = new Date(this.selectedDate + 'T00:00:00Z');
    const etiqueta = fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
    return this.selectedDate === todayIso() ? `hoy (${etiqueta})` : `el ${etiqueta}`;
  }
  // F20-quinquies — click día inicio, click día fin: alimenta el rango de
  // <app-nutrition-tracking-chart> en el padre. Modo aparte del click de
  // día normal (selectDay/dateSelected) para no confundir "qué día veo el
  // detalle" con "qué rango ve la gráfica de abajo".
  @Output() rangeSelected = new EventEmitter<{ start: string; end: string }>();

  public readonly weekdayLabels = WEEKDAY_LABELS;
  public readonly rangePresets = RANGE_PRESETS;
  public monthDate = new Date();
  public cells: CalendarCell[] = [];
  public isLoading = false;
  public readonly todayIso = todayIso();
  public isRangeMode = false;

  // Modo "elegir un rango y nada más": lo usa el panel de aplicar plantilla,
  // donde el calendario sirve para fijar inicio y fin de la fase nueva. Se
  // sigue pintando lo que ya hay pautado —fases y cumplimiento— porque es
  // justo lo que evita elegir unas fechas que pisen otra fase.
  @Input() public set pickerMode(activo: boolean) {
    if (!activo) return;
    this.isPickerMode = true;
    this.isRangeMode = true;
    this.rangeStart = null;
    this.rangeEnd = null;
  }

  // A diferencia de isRangeMode (se apaga solo al completar un rango, ver
  // handleRangeClick), esto se queda fijo mientras dure la instancia: es
  // "este calendario entero es un selector de fechas para una fase nueva",
  // no "hay una selección en curso ahora mismo". Cambia qué se ve
  // (cuadradito sólido por fase en vez de barra) y qué se puede pulsar
  // (un día ya ocupado por otra fase no es seleccionable aquí).
  public isPickerMode = false;
  public rangeStart: string | null = null;
  public rangeEnd: string | null = null;
  // F20-terdecies — qué preset está activo (null si el rango actual es uno
  // elegido a mano). Puramente de UI (qué botón se ve resaltado); el rango
  // real que ve la gráfica es siempre rangeStart/rangeEnd.
  public activePreset: number | null = 30;
  // F20-terdecies — día bajo el ratón mientras se elige el día final (entre
  // el primer click y el segundo): previsualiza el tramo antes de
  // confirmarlo, mismo gesto que cualquier selector de rango de fechas.
  public hoverDate: string | null = null;

  // Historial completo de fases (todas, no solo la activa) — se pide una
  // vez por cliente, no por mes: son pocos documentos y así un tramo que
  // cruza dos meses se pinta igual en ambos sin refetch.
  private planPhases: PlanAssignment[] = [];
  // Solo las fases que aparecen en el mes visible ahora mismo, en orden
  // cronológico — se recalcula en withPhases() cada vez que cambian las
  // celdas (mes nuevo o fases recién cargadas).
  public visiblePhaseLegend: PhaseLegendItem[] = [];

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private planAssignmentApi: PlanAssignmentApiService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && this.clientId) {
      this.monthDate = this.selectedDate ? new Date(`${this.selectedDate}T00:00:00.000Z`) : new Date();
      this.loadPlanPhases();
      this.loadMonth();
      // Emite un rango por defecto (30d) sin esperar a que el usuario toque
      // nada — <app-nutrition-tracking-chart> ya no tiene fallback propio,
      // depende por completo de lo que le llegue aquí.
      this.selectPresetRange(this.activePreset ?? 30);
    }
  }

  public get monthLabel(): string {
    return `${MONTH_LABELS[this.monthDate.getUTCMonth()]} ${this.monthDate.getUTCFullYear()}`;
  }

  public previousMonth(): void {
    this.shiftMonth(-1);
  }

  public nextMonth(): void {
    this.shiftMonth(1);
  }

  private shiftMonth(delta: number): void {
    const next = new Date(this.monthDate);
    next.setUTCMonth(next.getUTCMonth() + delta);
    this.monthDate = next;
    this.loadMonth();
  }

  public selectDay(cell: CalendarCell): void {
    if (!cell.date) return;
    // Un día ya ocupado por otra fase no puede ser ni inicio ni fin del
    // rango nuevo — bloqueado aquí en el click, no solo avisado al aplicar
    // (el 409 del backend se queda como red de seguridad para el caso de
    // un rango que ENGLOBE una fase entera sin tocar sus extremos).
    if (this.isPickerMode && cell.phase) return;
    if (this.isRangeMode) {
      this.handleRangeClick(cell.date);
      return;
    }
    this.dateSelected.emit(cell.date);
  }

  public get rangeToggleLabel(): string {
    if (!this.isRangeMode) return 'Seleccionar rango';
    return this.rangeStart ? 'Elige el día final' : 'Elige el día inicial';
  }

  public toggleRangeMode(): void {
    this.isRangeMode = !this.isRangeMode;
    if (this.isRangeMode) {
      // Empieza una selección limpia — no arrastra el rango anterior a
      // medias.
      this.rangeStart = null;
      this.rangeEnd = null;
      this.hoverDate = null;
    }
  }

  public clearRange(): void {
    this.rangeStart = null;
    this.rangeEnd = null;
    this.isRangeMode = false;
    this.activePreset = null;
  }

  // F20-quattuordecies — CENTRADO en hoy, no "los últimos N días": un
  // trainer pautea a menudo unos días por delante (p. ej. un patrón
  // recurring que cae la semana que viene) y quiere verlo reflejado en la
  // gráfica sin tener que ir a "Seleccionar rango" a mano cada vez. Reparte
  // días hacia atrás/adelante a partes iguales (algo más de historia que
  // de futuro si N es impar — ceil hacia atrás).
  public selectPresetRange(days: number): void {
    const daysBack = Math.ceil(days / 2);
    const daysForward = Math.floor(days / 2);
    const start = addIsoDays(-daysBack);
    const end = addIsoDays(daysForward);
    this.rangeStart = start;
    this.rangeEnd = end;
    this.activePreset = days;
    this.isRangeMode = false;
    this.hoverDate = null;
    this.rangeSelected.emit({ start, end });
  }

  private handleRangeClick(date: string): void {
    if (!this.rangeStart || this.rangeEnd) {
      // Primer click de una selección nueva (o la anterior ya estaba
      // completa) — empieza de cero en vez de extender el rango previo.
      this.rangeStart = date;
      this.rangeEnd = null;
      this.activePreset = null;
      return;
    }

    const start = this.rangeStart <= date ? this.rangeStart : date;
    const end = this.rangeStart <= date ? date : this.rangeStart;
    this.rangeStart = start;
    this.rangeEnd = end;
    this.isRangeMode = false;
    this.hoverDate = null;
    this.rangeSelected.emit({ start, end });
  }

  // F20-terdecies — con el día inicial ya puesto y el ratón encima de otro
  // día (todavía sin confirmar), previsualiza el tramo completo hasta ahí.
  public onCellHover(cell: CalendarCell): void {
    if (!cell.date || !this.isRangeMode || !this.rangeStart || this.rangeEnd) return;
    this.hoverDate = cell.date;
  }

  public onGridMouseLeave(): void {
    this.hoverDate = null;
  }

  public isInRange(date: string | null): boolean {
    if (!date || !this.rangeStart) return false;

    if (this.isRangeMode && !this.rangeEnd && this.hoverDate) {
      const start = this.rangeStart <= this.hoverDate ? this.rangeStart : this.hoverDate;
      const end = this.rangeStart <= this.hoverDate ? this.hoverDate : this.rangeStart;
      return date >= start && date <= end;
    }

    const end = this.rangeEnd || this.rangeStart;
    return date >= this.rangeStart && date <= end;
  }

  private loadMonth(): void {
    if (!this.clientId) return;
    const year = this.monthDate.getUTCFullYear();
    const month = this.monthDate.getUTCMonth();
    const from = isoDate(year, month, 1);
    const to = isoDate(year, month, daysInMonth(year, month));

    this.cells = this.withPhases(buildMonthGrid(year, month));
    this.isLoading = true;
    this.clientDetailApi.getNutritionCompliance(this.clientId, from, to).subscribe({
      next: (summary) => {
        this.isLoading = false;
        this.applyCompliance(summary?.dailyBreakdown || []);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private loadPlanPhases(): void {
    this.planAssignmentApi.getHistory(this.clientId).subscribe({
      next: (phases) => {
        // Orden estable por fecha de inicio — así el color de cada fase no
        // cambia de un mes a otro dentro de la misma sesión.
        this.planPhases = (phases || []).slice().sort((a, b) => a.startDate.localeCompare(b.startDate));
        this.cells = this.withPhases(this.cells);
      },
      error: () => {
        this.planPhases = [];
      },
    });
  }

  private applyCompliance(days: NutritionComplianceDay[]): void {
    const byDate = new Map(days.map((d) => [d.date, d]));
    this.cells = this.cells.map((cell) => ({
      ...cell,
      compliance: cell.date ? byDate.get(cell.date) || null : null,
    }));
  }

  private withPhases(cells: CalendarCell[]): CalendarCell[] {
    const mapped = cells.map((cell) => ({
      ...cell,
      phase: cell.date ? this.findPhaseForDate(cell.date) : null,
    }));
    this.visiblePhaseLegend = this.buildVisiblePhaseLegend(mapped);
    return mapped;
  }

  // Deduplica por id conservando el orden de aparición (días 1..N del mes,
  // en orden) — así la leyenda lee de arriba abajo igual que el calendario
  // de izquierda a derecha.
  private buildVisiblePhaseLegend(cells: CalendarCell[]): PhaseLegendItem[] {
    const seen = new Set<string>();
    const legend: PhaseLegendItem[] = [];
    for (const cell of cells) {
      if (!cell.phase || seen.has(cell.phase.id)) continue;
      seen.add(cell.phase.id);
      legend.push({
        id: cell.phase.id,
        color: cell.phase.color,
        label: cell.phase.planName || 'Plan aplicado',
      });
    }
    return legend;
  }

  // Un plan vigente ('active') gana sobre cualquier fase pasada que, por
  // algún dato inconsistente, también cubriese la misma fecha — en el caso
  // normal (fases consecutivas sin solape) esto no hace ninguna diferencia.
  private findPhaseForDate(date: string): CalendarPhaseInfo | null {
    const matches = this.planPhases.filter((p) => p.startDate <= date && (!p.endDate || p.endDate >= date));
    if (!matches.length) return null;

    const phase = matches.find((p) => p.status === 'active') || matches[matches.length - 1];
    const index = this.planPhases.indexOf(phase);
    return {
      id: phase._id,
      color: PHASE_COLORS[index % PHASE_COLORS.length],
      planName: phase.planName || null,
    };
  }

  // impeccable/quieter — antes llegaba a 1.0 (naranja SÓLIDO) al 100% de
  // cumplimiento: en un mes con varios días perfectos, un bloque de celdas
  // completamente opacas es lo más "chillón" de toda la pestaña, y de paso
  // el número del día en blanco encima quedaba a 2.3:1 de contraste (falla
  // AA, mínimo 3:1 para texto grande). Techo en 0.55 — sigue siendo la
  // señal más fuerte del calendario (100% > 50% > 14% se distingue igual de
  // bien), pero se queda en TINTE, nunca en bloque sólido; a 0.55 el número
  // blanco queda en 5.7:1, con margen sobre el mínimo AA.
  public cellFillOpacity(cell: CalendarCell): number {
    const pct = cell.compliance?.completionPercentage;
    if (pct === null || pct === undefined) return 0;
    const MIN_OPACITY = 0.14;
    const MAX_OPACITY = 0.55;
    return MIN_OPACITY + (Math.max(0, Math.min(100, pct)) / 100) * (MAX_OPACITY - MIN_OPACITY);
  }

  public trackByCell(index: number, cell: CalendarCell): string {
    return cell.date || `blank-${index}`;
  }
}
