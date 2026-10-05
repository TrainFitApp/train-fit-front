import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { buildPhaseColorMap } from '../../pages/client-detail/phase-color.util';
import { RoutineAssignment } from '../../../../shared/models/routine-assignment.model';
import { uiLocale, localizeList } from 'src/app/core/i18n/localized-catalog';
import { localIsoDate } from 'src/app/core/utils/local-date.util';

interface PhaseScheduleCell {
  date: string | null;
  dayNumber: number | null;
  phase: RoutineAssignment | null;
}

// Tramo real que pinta una fase en el calendario — end EXCLUSIVO siempre,
// para que la comparación `date < end` valga igual venga de la siguiente
// fase o de estimatedEndDate (ver buildRanges).
interface PhaseRange {
  phase: RoutineAssignment;
  start: string;
  end: string | null;
}

export interface PhaseLegendItem {
  id: string;
  color: string;
  label: string;
}

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
localizeList(WEEKDAY_LABELS, 'WEIGHT_INFO.DAYS_INITIALS');
const MONTH_LABELS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
localizeList(MONTH_LABELS, 'WEIGHT_INFO.MONTHS');

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

function addIsoDays(iso: string, delta: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + delta)).toISOString().slice(0, 10);
}

function buildMonthGrid(year: number, month: number): PhaseScheduleCell[] {
  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const totalDays = daysInMonth(year, month);
  const cells: PhaseScheduleCell[] = [];

  const prevMonthLastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ date: null, dayNumber: prevMonthLastDay - i, phase: null });
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push({ date: isoDate(year, month, day), dayNumber: day, phase: null });
  }
  let nextMonthDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, dayNumber: nextMonthDay, phase: null });
    nextMonthDay++;
  }
  return cells;
}

// Fase A1 (2026-09) — reemplaza el `<input type="date">` a ciegas de
// ApplyRoutineModalComponent: para elegir CUÁNDO empieza una fase hace falta
// ver qué hay ya programado alrededor, no solo escribir una fecha suelta.
// Mismo patrón visual que <app-training-calendar> (grid/celda/leyenda),
// simplificado — sin proyección de sesiones ni relleno de cumplimiento, solo
// qué fase de rutina rige cada día.
@Component({
  selector: 'app-phase-schedule-calendar',
  templateUrl: './phase-schedule-calendar.component.html',
  styleUrls: ['./phase-schedule-calendar.component.scss'],
})
export class PhaseScheduleCalendarComponent implements OnChanges {
  private readonly translate = inject(TranslateService);

  // Cronológicas (mismo orden que routinePhases en client-detail.page.ts) —
  // "qué fase rige un día" se resuelve por posición, ver buildRanges: hasta
  // el startDate de la siguiente fase, o hasta su propio estimatedEndDate
  // si es la última.
  @Input() public phases: RoutineAssignment[] = [];
  @Input() public selectedDate = '';
  @Output() public dateSelected = new EventEmitter<string>();

  public readonly weekdayLabels = WEEKDAY_LABELS;
  public readonly todayIso = localIsoDate();
  public monthDate = new Date();
  public cells: PhaseScheduleCell[] = [];
  public legend: PhaseLegendItem[] = [];

  private phaseColorMap = new Map<string, string>();
  private ranges: PhaseRange[] = [];
  private jumpedToSelection = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['phases']) {
      this.phaseColorMap = buildPhaseColorMap(this.phases.map((p) => p._id));
      this.ranges = this.buildRanges();
    }
    // Solo la PRIMERA vez que llega una fecha (apertura del panel): saltar al
    // mes de la fecha sugerida. Cambios posteriores de selectedDate vienen de
    // un clic en este mismo calendario — no debe saltar de mes bajo los pies
    // de quien lo está usando.
    if (changes['selectedDate'] && !this.jumpedToSelection && this.selectedDate) {
      this.jumpedToSelection = true;
      const [y, m] = this.selectedDate.split('-').map(Number);
      this.monthDate = new Date(Date.UTC(y, m - 1, 1));
    }
    this.rebuild();
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
    this.rebuild();
  }

  private rebuild(): void {
    const grid = buildMonthGrid(this.monthDate.getUTCFullYear(), this.monthDate.getUTCMonth());
    this.cells = grid.map((cell) => ({ ...cell, phase: cell.date ? this.phaseForDate(cell.date) : null }));
    this.legend = this.buildLegend();
  }

  // Fases ordenadas por fecha ascendente (garantizado por quien las pasa,
  // igual que routinePhases). Cada tramo termina donde EMPIEZA la siguiente
  // fase (la corta ahí, siempre — da igual su propia proyección); la última
  // fase, sin nada que la corte todavía, termina en su estimatedEndDate
  // (mismo dato que ya enseña la tarjeta "Fin previsto el..." — antes este
  // calendario lo ignoraba y pintaba esa fase indefinidamente hacia
  // adelante, por eso "toda la vista" salía de un único color y no
  // coincidía con la fecha de fin prevista). Sin estimatedEndDate (tabla sin
  // entrenamientos con los que proyectar), el tramo se queda sin cierre: no
  // hay fecha real que dibujar, así que no se inventa una.
  private buildRanges(): PhaseRange[] {
    return this.phases.map((phase, index) => {
      const next = this.phases[index + 1];
      const end = next ? next.startDate : phase.estimatedEndDate ? addIsoDays(phase.estimatedEndDate, 1) : null;
      return { phase, start: phase.startDate, end };
    });
  }

  private phaseForDate(date: string): RoutineAssignment | null {
    const range = this.ranges.find((r) => date >= r.start && (r.end === null || date < r.end));
    return range?.phase ?? null;
  }

  private buildLegend(): PhaseLegendItem[] {
    const seen = new Set<string>();
    const legend: PhaseLegendItem[] = [];
    for (const cell of this.cells) {
      const phase = cell.phase;
      if (!phase || seen.has(phase._id)) continue;
      seen.add(phase._id);
      legend.push({
        id: phase._id,
        color: this.phaseColorMap.get(phase._id) ?? 'var(--tf-accent)',
        label: phase.tableName || this.translate.instant('CLIENTS.RUTINA'),
      });
    }
    return legend;
  }

  public phaseColor(cell: PhaseScheduleCell): string | null {
    return cell.phase ? this.phaseColorMap.get(cell.phase._id) ?? null : null;
  }

  public phaseSoftBackground(cell: PhaseScheduleCell): string | null {
    const color = this.phaseColor(cell);
    return color ? this.hexToRgba(color, 0.16) : null;
  }

  public cellTitle(cell: PhaseScheduleCell): string | null {
    if (!cell.phase) return null;
    const range = this.ranges.find((r) => r.phase._id === cell.phase!._id);
    const name = cell.phase.tableName || this.translate.instant('CLIENTS.RUTINA');
    if (!range?.end) return this.translate.instant('CLIENTS.DESDE_EL_3', { name, p1: this.formatShortDate(cell.phase.startDate) });
    return `${name} · ${this.formatShortDate(cell.phase.startDate)} – ${this.formatShortDate(addIsoDays(range.end, -1))}`;
  }

  public selectDay(cell: PhaseScheduleCell): void {
    if (!cell.date) return;
    this.dateSelected.emit(cell.date);
  }

  public trackByCell(index: number, cell: PhaseScheduleCell): string {
    return cell.date || `blank-${index}`;
  }

  private formatShortDate(iso: string): string {
    return new Date(`${iso}T00:00:00.000Z`).toLocaleDateString(uiLocale(), {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
