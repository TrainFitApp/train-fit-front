import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { NutritionComplianceDay } from '../../models/client-detail.model';
import { PlanAssignmentApiService } from '../../../../../../shared/services/plan-assignment-api.service';
import { PlanAssignment } from '../../../../../../shared/models/plan-assignment.model';

interface CalendarPhaseInfo {
  color: string;
  planName: string | null;
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
// confundan entre sí en la misma celda.
const PHASE_COLORS = ['#60a5fa', '#a78bfa', '#34d399', '#f472b6', '#fbbf24', '#38bdf8'];

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
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
  @Output() dateSelected = new EventEmitter<string>();
  // F20-quinquies — click día inicio, click día fin: alimenta el rango de
  // <app-nutrition-tracking-chart> en el padre. Modo aparte del click de
  // día normal (selectDay/dateSelected) para no confundir "qué día veo el
  // detalle" con "qué rango ve la gráfica de abajo".
  @Output() rangeSelected = new EventEmitter<{ start: string; end: string }>();

  public readonly weekdayLabels = WEEKDAY_LABELS;
  public monthDate = new Date();
  public cells: CalendarCell[] = [];
  public isLoading = false;
  public readonly todayIso = new Date().toISOString().slice(0, 10);
  public isRangeMode = false;
  public rangeStart: string | null = null;
  public rangeEnd: string | null = null;

  // Historial completo de fases (todas, no solo la activa) — se pide una
  // vez por cliente, no por mes: son pocos documentos y así un tramo que
  // cruza dos meses se pinta igual en ambos sin refetch.
  private planPhases: PlanAssignment[] = [];

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private planAssignmentApi: PlanAssignmentApiService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && this.clientId) {
      this.monthDate = this.selectedDate ? new Date(`${this.selectedDate}T00:00:00.000Z`) : new Date();
      this.loadPlanPhases();
      this.loadMonth();
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
    }
  }

  public clearRange(): void {
    this.rangeStart = null;
    this.rangeEnd = null;
    this.isRangeMode = false;
  }

  private handleRangeClick(date: string): void {
    if (!this.rangeStart || this.rangeEnd) {
      // Primer click de una selección nueva (o la anterior ya estaba
      // completa) — empieza de cero en vez de extender el rango previo.
      this.rangeStart = date;
      this.rangeEnd = null;
      return;
    }

    const start = this.rangeStart <= date ? this.rangeStart : date;
    const end = this.rangeStart <= date ? date : this.rangeStart;
    this.rangeStart = start;
    this.rangeEnd = end;
    this.isRangeMode = false;
    this.rangeSelected.emit({ start, end });
  }

  public isInRange(date: string | null): boolean {
    if (!date || !this.rangeStart) return false;
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
    return cells.map((cell) => ({
      ...cell,
      phase: cell.date ? this.findPhaseForDate(cell.date) : null,
    }));
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
      color: PHASE_COLORS[index % PHASE_COLORS.length],
      planName: phase.planName || null,
    };
  }

  public cellFillOpacity(cell: CalendarCell): number {
    const pct = cell.compliance?.completionPercentage;
    if (pct === null || pct === undefined) return 0;
    return Math.max(0.14, pct / 100);
  }

  public trackByCell(index: number, cell: CalendarCell): string {
    return cell.date || `blank-${index}`;
  }
}
