import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

interface TrainingCalendarCell {
  date: string | null;
  dayNumber: number | null;
  hasSession: boolean;
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
    cells.push({ date: null, dayNumber: prevMonthLastDay - i, hasSession: false });
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push({ date: isoDate(year, month, day), dayNumber: day, hasSession: false });
  }
  let nextMonthDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, dayNumber: nextMonthDay, hasSession: false });
    nextMonthDay++;
  }
  return cells;
}

// Tarea 4 (2026-09) — calendario de rango para la comparación de
// microciclos en Entrenamiento. Adaptado de <app-nutrition-calendar>: mismo
// mecanismo de selección de rango (presets + clic-clic), pero sin fases de
// plan ni cumplimiento por día (no aplican aquí) — el relleno es solo "hubo
// sesión ese día", con los datos que el padre ya tiene cargados
// (completedWorkouts), sin ninguna llamada propia.
@Component({
  selector: 'app-training-calendar',
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.scss'],
})
export class TrainingCalendarComponent implements OnChanges, OnInit {
  @Input() sessionDates: Set<string> = new Set();

  @Input() public set activeRange(range: { start: string; end: string } | null) {
    if (!range) return;
    this.rangeStart = range.start;
    this.rangeEnd = range.end;
  }

  @Output() rangeSelected = new EventEmitter<{ start: string; end: string }>();

  public readonly weekdayLabels = WEEKDAY_LABELS;
  public readonly rangePresets = RANGE_PRESETS;
  public monthDate = new Date();
  public cells: TrainingCalendarCell[] = [];
  public readonly todayIso = todayIso();

  public rangeStart: string | null = null;
  public rangeEnd: string | null = null;
  public activePreset: number | null = 90;
  public hoverDate: string | null = null;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['sessionDates']) {
      this.cells = this.withSessions(this.cells.length ? this.cells : buildMonthGrid(this.monthDate.getUTCFullYear(), this.monthDate.getUTCMonth()));
    }
  }

  public ngOnInit(): void {
    this.cells = this.withSessions(buildMonthGrid(this.monthDate.getUTCFullYear(), this.monthDate.getUTCMonth()));
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
    this.cells = this.withSessions(buildMonthGrid(next.getUTCFullYear(), next.getUTCMonth()));
  }

  private withSessions(cells: TrainingCalendarCell[]): TrainingCalendarCell[] {
    return cells.map((cell) => ({
      ...cell,
      hasSession: !!cell.date && this.sessionDates.has(cell.date),
    }));
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

  public selectDay(cell: TrainingCalendarCell): void {
    if (!cell.date) return;
    this.handleRangeClick(cell.date);
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
