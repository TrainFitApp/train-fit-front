import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

interface ProjectedDay {
  isPlannedRestDay: boolean;
  name: string;
  // Fase A2 (2026-09) — antes splitId/splitName, derivado cruzando
  // workoutId contra la tabla de la fase EN USO nada más: en cuanto
  // /active/schedule empezó a devolver días de VARIAS fases (programar una
  // siguiente ya no tapa la anterior, ver routine-assignment-projection.js
  // en el backend), esos días se quedaban sin match. Ahora el padre resuelve
  // la fase completa (id/nombre/color) por el assignmentId que cada día ya
  // trae — mismo color en toda la ficha, no un algoritmo aparte solo para
  // este calendario. null en días sin fase resuelta (mientras faltan datos
  // por llegar).
  phaseId: string | null;
  phaseName: string | null;
  phaseColor: string | null;
}

// Leyenda dinámica de fases visibles en el mes actual — mismo patrón que
// PhaseLegendItem en <app-nutrition-calendar>.
export interface PhaseLegendItem {
  id: string;
  color: string;
  label: string;
}

// Movimiento adherencia-por-fase (2026-09) — antes "hecho" era un booleano
// (sessionDates: Set<string>, solo "hubo sesión ese día sí/no"). El
// entrenador pidió ver qué se entrenó y cuánto se cumplió sin tener que
// tocar el día: el padre ya tiene el Workout completo cargado
// (completedWorkouts), así que enriquecer esto no cuesta ninguna llamada
// nueva, solo mapear lo que ya existe.
export interface CompletedDay {
  name: string;
  // null cuando el workout no tiene ninguna serie con expectedReps que
  // medir (p.ej. un día suelto sin series prescritas) — "hubo sesión" pero
  // no hay fidelidad que calcular. Se pinta como completado a secas, sin
  // graduar el relleno (ver fillOpacity).
  completionPercentage: number | null;
}

interface TrainingCalendarCell {
  date: string | null;
  dayNumber: number | null;
  completed: CompletedDay | null;
  projected: ProjectedDay | null;
}

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTH_LABELS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

// Tarea 4 (2026-09) — mismos presets que <app-nutrition-calendar>: el
// entrenador piensa en semanas/meses, no en "7d/30d/90d".
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

function addIsoDays(deltaDays: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + deltaDays);
  return date.toISOString().slice(0, 10);
}

function buildMonthGrid(year: number, month: number): TrainingCalendarCell[] {
  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const totalDays = daysInMonth(year, month);
  const cells: TrainingCalendarCell[] = [];

  const prevMonthLastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ date: null, dayNumber: prevMonthLastDay - i, completed: null, projected: null });
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push({ date: isoDate(year, month, day), dayNumber: day, completed: null, projected: null });
  }
  let nextMonthDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, dayNumber: nextMonthDay, completed: null, projected: null });
    nextMonthDay++;
  }
  return cells;
}

// Tarea 4 (2026-09), enriquecido (2026-09) — calendario de rango para la
// comparación de microciclos en Entrenamiento. Adaptado de
// <app-nutrition-calendar>: mismo mecanismo de selección de rango (presets +
// clic-clic) y el mismo patrón de dos capas visuales (fondo previsto +
// relleno de cumplimiento graduado encima), con los datos que el padre ya
// tiene cargados (completedWorkouts/projectedTrainingDays), sin ninguna
// llamada propia añadida.
@Component({
  selector: 'app-training-calendar',
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.scss'],
})
export class TrainingCalendarComponent implements OnChanges, OnInit {
  @Input() completedDays: Map<string, CompletedDay> = new Map();

  // Tarea 4 (2026-09) — capa independiente de `sessionDates` (que es solo
  // lo YA hecho): lo que la rutina activa PREVÉ para cada día, con fecha
  // real de por medio (RoutineAssignment.startDate + posición en la
  // secuencia). Dos capas visuales sobre la misma celda, mismo patrón de
  // composición que ya usa <app-nutrition-calendar> (color de fase de
  // fondo + relleno de cumplimiento encima).
  @Input() projectedDays: Map<string, ProjectedDay> = new Map();

  @Input() public set activeRange(range: { start: string; end: string } | null) {
    if (!range) return;
    this.rangeStart = range.start;
    this.rangeEnd = range.end;
  }

  @Output() rangeSelected = new EventEmitter<{ start: string; end: string }>();

  // 2026-09 (día suelto) — antes CADA clic pasaba por handleRangeClick (un
  // rango de 2 toques, nunca un solo día). El entrenador quiere elegir UN
  // día tan fácil como un rango: por defecto un toque selecciona ese día al
  // momento; este toggle es el único que arma el flujo de 2 toques de
  // siempre, sin cambiar cómo funciona ese flujo.
  @Output() daySelected = new EventEmitter<string>();

  public readonly weekdayLabels = WEEKDAY_LABELS;
  public readonly rangePresets = RANGE_PRESETS;
  public monthDate = new Date();
  public cells: TrainingCalendarCell[] = [];
  public readonly todayIso = todayIso();

  public isRangeMode = false;
  public rangeStart: string | null = null;
  public rangeEnd: string | null = null;
  public activePreset: number | null = 90;
  public hoverDate: string | null = null;

  // Leyenda dinámica de fases visibles — el color YA llega resuelto por
  // celda (phaseColor, ver ProjectedDay), no hay mapa propio que mantener
  // aquí (evita que este calendario invente un color distinto al que ya usa
  // el resto de la ficha para la misma fase).
  public visiblePhaseLegend: PhaseLegendItem[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['completedDays'] || changes['projectedDays']) {
      this.cells = this.applyOverlays(this.cells.length ? this.cells : buildMonthGrid(this.monthDate.getUTCFullYear(), this.monthDate.getUTCMonth()));
    }
  }

  public ngOnInit(): void {
    this.cells = this.applyOverlays(buildMonthGrid(this.monthDate.getUTCFullYear(), this.monthDate.getUTCMonth()));
    this.selectPresetRange(this.activePreset ?? 90);
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
    this.cells = this.applyOverlays(buildMonthGrid(next.getUTCFullYear(), next.getUTCMonth()));
  }

  private applyOverlays(cells: TrainingCalendarCell[]): TrainingCalendarCell[] {
    const mapped = cells.map((cell) => ({
      ...cell,
      completed: (cell.date && this.completedDays.get(cell.date)) || null,
      projected: (cell.date && this.projectedDays.get(cell.date)) || null,
    }));
    this.visiblePhaseLegend = this.buildVisiblePhaseLegend(mapped);
    return mapped;
  }

  // Deduplica por id conservando el orden de aparición en el mes visible —
  // mismo patrón que buildVisiblePhaseLegend en <app-nutrition-calendar>.
  private buildVisiblePhaseLegend(cells: TrainingCalendarCell[]): PhaseLegendItem[] {
    const seen = new Set<string>();
    const legend: PhaseLegendItem[] = [];
    for (const cell of cells) {
      const phaseId = cell.projected?.phaseId;
      if (!phaseId || seen.has(phaseId)) continue;
      seen.add(phaseId);
      legend.push({
        id: phaseId,
        color: cell.projected?.phaseColor || 'var(--tf-accent)',
        label: cell.projected?.phaseName || 'Rutina',
      });
    }
    return legend;
  }

  // Mismo patrón que <app-nutrition-calendar>#cellFillOpacity: tinte, nunca
  // bloque sólido (el número del día se sigue leyendo encima), mismo rango
  // 0.14-0.55 para que las dos capas visuales de la ficha del cliente
  // hablen el mismo idioma. Sin `completionPercentage` (nada que medir) se
  // pinta con el tope, no con 0: "hubo sesión" sigue siendo una señal.
  private static readonly MIN_FILL_OPACITY = 0.14;
  private static readonly MAX_FILL_OPACITY = 0.55;

  public fillOpacity(cell: TrainingCalendarCell): number {
    if (!cell.completed) return 0;
    const pct = cell.completed.completionPercentage;
    if (pct === null) return TrainingCalendarComponent.MAX_FILL_OPACITY;
    const { MIN_FILL_OPACITY: MIN, MAX_FILL_OPACITY: MAX } = TrainingCalendarComponent;
    return MIN + (Math.max(0, Math.min(100, pct)) / 100) * (MAX - MIN);
  }

  // "Torso A" -> "TA", "Piernas" -> "PI". Dos caracteres es lo único que se
  // lee con garantías en una celda de ~30px — el nombre completo sigue
  // disponible en el title (tooltip). Prioriza lo HECHO sobre lo previsto:
  // si un día se entrenó distinto de lo pautado, lo que importa a golpe de
  // vista es qué se hizo de verdad.
  public monogram(cell: TrainingCalendarCell): string {
    const name = cell.completed?.name || cell.projected?.name;
    if (!name) return '';
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return (words[0] || '').slice(0, 2).toUpperCase();
  }

  public cellTitle(cell: TrainingCalendarCell): string | null {
    if (cell.completed && cell.projected && !cell.projected.isPlannedRestDay) {
      return `${cell.completed.name} (previsto: ${cell.projected.name})`;
    }
    return cell.completed?.name || cell.projected?.name || null;
  }

  public selectPresetRange(days: number): void {
    const daysBack = Math.ceil(days / 2);
    const daysForward = Math.floor(days / 2);
    const start = addIsoDays(-daysBack);
    const end = addIsoDays(daysForward);
    this.rangeStart = start;
    this.rangeEnd = end;
    this.activePreset = days;
    this.hoverDate = null;
    this.rangeSelected.emit({ start, end });
  }

  // Despacha el tap de una celda: en modo rango arma/cierra el rango de 2
  // toques de siempre; si no (por defecto), selecciona ese día al momento.
  public selectDay(cell: TrainingCalendarCell): void {
    if (!cell.date) return;
    if (this.isRangeMode) {
      this.handleRangeClick(cell.date);
      return;
    }
    this.selectSingleDay(cell.date);
  }

  // Arma/desarma el modo de rango a mano (clic-clic). Salir a medio
  // seleccionar (ya se pulsó el inicio, falta el fin) abandona esa
  // selección a medias sin tocar el último día/rango ya confirmado.
  public toggleRangeMode(): void {
    this.isRangeMode = !this.isRangeMode;
    this.hoverDate = null;
    if (!this.isRangeMode && this.rangeStart && !this.rangeEnd) {
      this.rangeStart = null;
    }
  }

  private selectSingleDay(date: string): void {
    this.rangeStart = date;
    this.rangeEnd = date;
    this.activePreset = null;
    this.hoverDate = null;
    this.daySelected.emit(date);
  }

  private handleRangeClick(date: string): void {
    if (!this.rangeStart || this.rangeEnd) {
      this.rangeStart = date;
      this.rangeEnd = null;
      this.activePreset = null;
      return;
    }

    const start = this.rangeStart <= date ? this.rangeStart : date;
    const end = this.rangeStart <= date ? date : this.rangeStart;
    this.rangeStart = start;
    this.rangeEnd = end;
    this.hoverDate = null;
    this.rangeSelected.emit({ start, end });
  }

  public onCellHover(cell: TrainingCalendarCell): void {
    if (!cell.date || !this.rangeStart || this.rangeEnd) return;
    this.hoverDate = cell.date;
  }

  public onGridMouseLeave(): void {
    this.hoverDate = null;
  }

  public isInRange(date: string | null): boolean {
    if (!date || !this.rangeStart) return false;

    if (!this.rangeEnd && this.hoverDate) {
      const start = this.rangeStart <= this.hoverDate ? this.rangeStart : this.hoverDate;
      const end = this.rangeStart <= this.hoverDate ? this.hoverDate : this.rangeStart;
      return date >= start && date <= end;
    }

    const end = this.rangeEnd || this.rangeStart;
    return date >= this.rangeStart && date <= end;
  }

  public trackByCell(index: number, cell: TrainingCalendarCell): string {
    return cell.date || `blank-${index}`;
  }
}
