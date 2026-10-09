import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { NutritionComplianceDay } from '../../models/client-detail.model';
import { DietPhaseApiService, onDaySkipped } from '../../../../../../shared/services/diet-phase-api.service';
import { DietPhase } from '../../../../../../shared/models/diet-phase.model';
import { compareChain } from '../../../../../../shared/models/phase-state';
import { PHASE_COLORS, buildPhaseColorMap } from '../../phase-color.util';
import { canSkipDate } from './skip-day.util';
import { PhaseStartVerdict, addIsoDays, phaseStartVerdict } from '../../../../../../shared/utils/phase-start.util';
import { uiLocale, localizeList } from 'src/app/core/i18n/localized-catalog';
import { localIsoDate } from 'src/app/core/utils/local-date.util';

interface CalendarPhaseInfo {
  // Id de la fase: la clave del color y de la leyenda.
  key: string;
  color: string;
  name: string;
  // Semana de la fase en la que cae este día ("S3"), o null si ese día no
  // cae en ninguna. Las calcula el backend (diet-timeline).
  weekLabel: string | null;
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
  // Suplementos pautados vigentes ese día (docs/plan-semanas.md): la
  // suplementación va por fechas, así que también se ve en el calendario.
  supplements: string[];
  // Solo al elegir el inicio de una fase nueva (startPicker): si puede
  // empezar este día y qué le pasa a la fase que ya hay.
  start: PhaseStartVerdict<DietPhase> | null;
}

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
localizeList(WEEKDAY_LABELS, 'WEIGHT_INFO.DAYS_INITIALS');
const MONTH_LABELS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
localizeList(MONTH_LABELS, 'WEIGHT_INFO.MONTHS');

// Paleta y algoritmo de asignación — ver phase-color.util.ts (historial
// completo de cómo se eligieron estos 6 tonos ahí, junto con el porqué de
// asignarlos por proximidad y no por índice%6).

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
    cells.push({ date: null, dayNumber: prevMonthLastDay - i, compliance: null, phase: null, supplements: [], start: null });
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push({ date: isoDate(year, month, day), dayNumber: day, compliance: null, phase: null, supplements: [], start: null });
  }
  let nextMonthDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, dayNumber: nextMonthDay, compliance: null, phase: null, supplements: [], start: null });
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
  private readonly translate = inject(TranslateService);

  @Input() clientId = '';
  @Input() selectedDate = '';

  // El rango llega ahora desde fuera: los presets se eligen encima de la
  // gráfica. Sin este Input, el calendario dejaría de pintar sombreado el
  // periodo que la gráfica está mostrando y habría dos verdades a la vez.
  @Input() public set activeRange(range: { start: string; end: string } | null) {
    if (!range) return;
    this.rangeStart = range.start;
    this.rangeEnd = range.end;
    this.openEnded = false;
    this.awaitingRangeEnd = false;
  }
  @Output() dateSelected = new EventEmitter<string>();

  // Fin abierto: el tramo no termina en rangeEnd (que es null), sigue más
  // allá de lo que se ve. Solo al elegir el inicio de una fase nueva: la fase
  // se crea abierta.
  public openEnded = false;

  // Primer click de rango dado, falta el segundo. Antes esto se deducía de
  // `!rangeStart || rangeEnd`, que ya no vale: con un fin abierto rangeEnd es
  // null legítimamente y esa cuenta lo confundía con "a media selección".
  private awaitingRangeEnd = false;

  // Solo la ficha ofrece saltar días (el selector de fechas de una fase
  // nueva, no). Qué día se puede saltar lo decide showSkipDay.
  @Input() canSkipDay = false;
  @Input() isSkippingDay = false;
  @Output() skipDayRequested = new EventEmitter<string>();

  // El botón sale solo si el día elegido cae dentro de una fase y no está
  // saltado ya. Se mira contra todas las fases (planPhases), no contra las
  // celdas del mes: el día elegido puede quedar fuera del mes que se ve.
  public get showSkipDay(): boolean {
    const selected = this.cells.find((cell) => cell.date === this.selectedDate);
    return this.canSkipDay && canSkipDate(this.selectedDate, this.planPhases, !!selected?.compliance?.skipped);
  }

  public get selectedDateLabel(): string {
    if (!this.selectedDate) return this.translate.instant('CLIENTS.ESTE_DIA');
    const fecha = new Date(this.selectedDate + 'T00:00:00Z');
    const etiqueta = fecha.toLocaleDateString(uiLocale(), {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
    return this.selectedDate === localIsoDate() ? this.translate.instant('CLIENTS.HOY_2', { etiqueta }) : `el ${etiqueta}`;
  }
  // F20-quinquies — click día inicio, click día fin: alimenta el rango de
  // <app-nutrition-tracking-chart> en el padre. Modo aparte del click de
  // día normal (selectDay/dateSelected) para no confundir "qué día veo el
  // detalle" con "qué rango ve la gráfica de abajo".
  @Output() rangeSelected = new EventEmitter<{ start: string; end: string }>();

  public readonly weekdayLabels = WEEKDAY_LABELS;
  public monthDate = new Date();
  public cells: CalendarCell[] = [];
  public isLoading = false;
  public readonly todayIso = localIsoDate();
  public isRangeMode = false;

  // "¿Desde qué día empieza la fase nueva?" (PhaseStartSheetComponent): el
  // mismo calendario de la ficha, con todos sus datos, en el que pulsar un
  // día lo propone como inicio (dateSelected) si una fase puede empezar ahí
  // (phaseStartVerdict, la regla del backend). La fase nueva se pinta desde
  // `selectedDate` en adelante, abierta, como queda al crearla.
  @Input() startPicker = false;
  // Por qué no se puede empezar el día que se acaba de pulsar. Va escrito
  // bajo el calendario y no solo en el globo: en táctil no hay hover que lo
  // explique antes.
  public startNotice: string | null = null;
  public rangeStart: string | null = null;
  public rangeEnd: string | null = null;
  // F20-terdecies — día bajo el ratón mientras se elige el día final (entre
  // el primer click y el segundo): previsualiza el tramo antes de
  // confirmarlo, mismo gesto que cualquier selector de rango de fechas.
  public hoverDate: string | null = null;

  // Aviso flotante al pasar por encima de un día que ya tiene fase (solo al
  // elegir el inicio de una fase nueva). Se resuelve en JS y no con el
  // `title` nativo por dos razones: el `title` del navegador tarda ~1s, no se
  // puede estilar y —lo que lo hacía inútil aquí— un <button disabled> ni
  // siquiera dispara eventos de ratón, así que en las celdas ocupadas, que
  // son justo las que hay que explicar, no salía nunca.
  public startTooltip: { text: string; left: number; top: number } | null = null;

  // Qué suplementos toca ese día. Va SOLO en el icono, no en la celda: el día
  // entero ya se pulsa para otra cosa, y un globo que saltara al pasar por
  // cualquier día taparía el calendario entero al recorrerlo. Tampoco con el
  // `title` nativo: el icono lleva pointer-events desactivado para no comerse
  // el click del día, y así el navegador nunca lo da por señalado.
  public supplementTooltip: { text: string; left: number; top: number } | null = null;

  public onSupplementEnter(cell: CalendarCell, event: MouseEvent): void {
    const icono = event.currentTarget as HTMLElement | null;
    const celda = icono?.closest('.nutrition-calendar__cell') as HTMLElement | null;
    if (!cell.supplements.length || !celda) return;
    this.supplementTooltip = {
      text: cell.supplements.join('\n'),
      left: this.tooltipLeft(celda),
      top: celda.offsetTop,
    };
  }

  public onSupplementLeave(): void {
    this.supplementTooltip = null;
  }

  // Historial completo de fases (todas, no solo la activa) — se pide una
  // vez por cliente, no por mes: son pocos documentos y así un tramo que
  // cruza dos meses se pinta igual en ambos sin refetch.
  private planPhases: DietPhase[] = [];
  // Ventanas de semana del rango visible, tal y como las calcula el
  // backend a partir de los check-ins programados del cliente.
  private weekWindows: { phaseId: string; number: number; start: string; end: string }[] = [];
  // Suplementos con fechas, para pintar su icono en los días que cubren.
  private supplements: { name: string; dose: string; startDate: string; endDate: string | null }[] = [];
  // Color por fase, calculado una vez al cargar planPhases (no en cada
  // findPhaseForDate — eso lo recalcularía hasta ~35 veces por render de
  // mes sin necesidad, ver assignPhaseColors en phase-color.util.ts).
  private phaseColorMap = new Map<string, string>();
  // Solo las fases que aparecen en el mes visible ahora mismo, en orden
  // cronológico — se recalcula en withPhases() cada vez que cambian las
  // celdas (mes nuevo o fases recién cargadas).
  public visiblePhaseLegend: PhaseLegendItem[] = [];

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private dietPhaseApi: DietPhaseApiService
  ) {
    // El panel de suplementación está en la misma pantalla: sin esto, lo
    // que se añade o se quita allí no aparecía aquí hasta recargar.
    this.clientDetailApi.supplementsChanged$.pipe(takeUntilDestroyed()).subscribe((clientId) => {
      if (clientId !== this.clientId) return;
      this.supplements = [];
      this.loadSupplements();
    });

    // Saltar un día se ve al momento en su celda; el cumplimiento del mes se
    // relee por detrás (el día queda vacío de lo pautado y cambia su %).
    onDaySkipped(
      () => this.clientId,
      (date) => {
        this.cells = this.cells.map((cell) =>
          cell.date === date
            ? {
                ...cell,
                compliance: { ...(cell.compliance ?? { date, hasPlan: true, completionPercentage: null }), skipped: true },
              }
            : cell
        );
        if (this.cells.some((cell) => cell.date === date)) this.loadCompliance();
      }
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Elegido el inicio, la fase nueva queda pintada desde ahí y abierta.
    if (this.startPicker && changes['selectedDate']) {
      this.rangeStart = this.selectedDate || null;
      this.rangeEnd = null;
      this.openEnded = !!this.selectedDate;
    }
    if (changes['clientId'] && this.clientId) {
      // La caché es por cliente: al cambiar de ficha se pintaban los
      // suplementos del anterior.
      this.supplements = [];
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
    // Un día en el que la fase nueva no puede empezar se explica en vez de
    // elegirse: dejarlo pasar acabaría en el 409 del backend al aplicar.
    if (this.startPicker) {
      if (cell.start?.kind === 'blocked') {
        this.startNotice = this.blockedText(cell.start.phase, cell.date);
        return;
      }
      this.startNotice = null;
      this.dateSelected.emit(cell.date);
      return;
    }
    if (this.isRangeMode) {
      this.handleRangeClick(cell.date);
      return;
    }
    this.dateSelected.emit(cell.date);
  }

  public get rangeToggleLabel(): string {
    if (!this.isRangeMode) return this.translate.instant('CLIENTS.SELECCIONAR_RANGO');
    return this.awaitingRangeEnd ? this.translate.instant('CLIENTS.ELIGE_EL_DIA_FINAL') : this.translate.instant('CLIENTS.ELIGE_EL_DIA_INICIAL');
  }

  public toggleRangeMode(): void {
    this.isRangeMode = !this.isRangeMode;
    if (this.isRangeMode) {
      // Empieza una selección limpia — no arrastra el rango anterior a
      // medias.
      this.rangeStart = null;
      this.rangeEnd = null;
      this.openEnded = false;
      this.hoverDate = null;
      this.awaitingRangeEnd = false;
    }
  }

  public clearRange(): void {
    this.rangeStart = null;
    this.rangeEnd = null;
    this.openEnded = false;
    this.isRangeMode = false;
    this.awaitingRangeEnd = false;
  }

  private handleRangeClick(date: string): void {
    if (!this.awaitingRangeEnd) {
      // Primer click de una selección nueva (o la anterior ya estaba
      // completa) — empieza de cero en vez de extender el rango previo.
      this.rangeStart = date;
      this.rangeEnd = null;
      this.openEnded = false;
      this.awaitingRangeEnd = true;
      return;
    }

    const start = this.rangeStart <= date ? this.rangeStart : date;
    const end = this.rangeStart <= date ? date : this.rangeStart;

    this.rangeStart = start;
    this.rangeEnd = end;
    this.openEnded = false;
    this.isRangeMode = false;
    this.hoverDate = null;
    this.awaitingRangeEnd = false;
    this.rangeSelected.emit({ start, end });
  }

  // F20-terdecies — con el día inicial ya puesto y el ratón encima de otro
  // día (todavía sin confirmar), previsualiza el tramo completo hasta ahí.
  public onCellHover(cell: CalendarCell, event?: MouseEvent): void {
    this.updateStartTooltip(cell, event);
    if (!cell.date || !this.awaitingRangeEnd) return;
    this.hoverDate = cell.date;
  }

  public onGridMouseLeave(): void {
    this.hoverDate = null;
    this.startTooltip = null;
    this.supplementTooltip = null;
  }

  // Qué se dice al pasar por encima de un día con fase al elegir el inicio
  // de una nueva: por qué no puede empezar ahí o qué le pasa a la que hay.
  // Sin esto el profesional no sabe por qué unas celdas de color se pueden
  // pulsar y otras no.
  private updateStartTooltip(cell: CalendarCell, event?: MouseEvent): void {
    const celda = event?.currentTarget as HTMLElement | undefined;
    const start = cell.start;
    if (!this.startPicker || !cell.date || !start || start.kind === 'free' || !celda) {
      this.startTooltip = null;
      return;
    }

    this.startTooltip = {
      text: start.kind === 'blocked' ? this.blockedText(start.phase, cell.date) : this.replacesText(start.phase, cell.date),
      left: this.tooltipLeft(celda),
      // offsetTop va contra la propia rejilla (position: relative en el
      // scss), que es donde se pinta el globo — así no hace falta medir la
      // ventana ni recolocarlo al hacer scroll.
      top: celda.offsetTop,
    };
  }

  // Por qué la fase nueva no puede empezar en `date`. Cuatro casos que se
  // resuelven distinto: un día pasado es historial; una fase programada más
  // adelante choca porque la nueva queda abierta; una abierta ocupa todo lo
  // que viene (hay que ponerle fin antes), y una cerrada, su tramo.
  private blockedText(phase: DietPhase, date: string): string {
    const name = phase.name;
    if (date < this.todayIso && phase.startDate <= date) {
      return this.translate.instant('CLIENTS.START_BLOCKED_PAST', { name });
    }
    if (phase.startDate > date) {
      return this.translate.instant('CLIENTS.START_BLOCKED_LATER', { name, start: this.shortDate(phase.startDate) });
    }
    if (phase.endDate === null) {
      return this.translate.instant('CLIENTS.START_BLOCKED_OPEN', { name, start: this.shortDate(phase.startDate) });
    }
    return this.translate.instant('CLIENTS.START_BLOCKED_CLOSED', {
      name,
      start: this.shortDate(phase.startDate),
      end: this.shortDate(phase.endDate),
    });
  }

  // Qué le pasa a la fase que rige `date` si la nueva empieza ese día.
  private replacesText(phase: DietPhase, date: string): string {
    return phase.startDate === date
      ? this.translate.instant('CLIENTS.START_REPLACES_SAME_DAY', { name: phase.name })
      : this.translate.instant('CLIENTS.START_REPLACES', { name: phase.name, end: this.shortDate(addIsoDays(date, -1)) });
  }

  private shortDate(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short', timeZone: 'UTC' });
  }

  // El globo se centra en la celda, pero en las columnas de los extremos eso
  // lo saca de la rejilla y el panel lo recorta (overflow horizontal oculto),
  // justo en lunes y domingo. Se empuja hacia dentro lo justo para que quepa
  // entero; si la rejilla es más estrecha que el globo, se centra en ella y
  // no hay nada mejor que hacer.
  private tooltipLeft(celda: HTMLElement): number {
    const MAX_ANCHO = 190; // mismo tope que .nutrition-calendar__tooltip
    const mitad = MAX_ANCHO / 2;
    const centro = celda.offsetLeft + celda.offsetWidth / 2;
    const anchoRejilla = celda.parentElement?.clientWidth ?? 0;
    if (!anchoRejilla) return centro;
    if (anchoRejilla < MAX_ANCHO) return anchoRejilla / 2;
    return Math.min(Math.max(centro, mitad), anchoRejilla - mitad);
  }

  public isInRange(date: string | null): boolean {
    if (!date || !this.rangeStart) return false;

    if (this.awaitingRangeEnd && this.hoverDate) {
      const start = this.rangeStart <= this.hoverDate ? this.rangeStart : this.hoverDate;
      const end = this.rangeStart <= this.hoverDate ? this.hoverDate : this.rangeStart;
      return date >= start && date <= end;
    }

    // Indefinido: no hay fin que comparar, así que entra todo lo que venga
    // después del inicio. Al no acotar por mes, cualquier mes posterior que
    // se navegue sale entero pintado, que es exactamente lo que significa.
    if (this.openEnded) return date >= this.rangeStart;

    const end = this.rangeEnd || this.rangeStart;
    return date >= this.rangeStart && date <= end;
  }

  // Último día del mes que se está viendo cuando el tramo es indefinido: ahí
  // va la marca de "sigue" (ver el ›› del template). Sin ella, el rango
  // parecería terminar justo donde se acaba la cuadrícula.
  public isOpenEndedTail(cell: CalendarCell): boolean {
    if (!this.openEnded || !cell.date || !this.isInRange(cell.date)) return false;
    const year = this.monthDate.getUTCFullYear();
    const month = this.monthDate.getUTCMonth();
    return cell.date === isoDate(year, month, daysInMonth(year, month));
  }

  private loadMonth(): void {
    if (!this.clientId) return;
    const year = this.monthDate.getUTCFullYear();
    const month = this.monthDate.getUTCMonth();
    const from = isoDate(year, month, 1);
    const to = isoDate(year, month, daysInMonth(year, month));

    this.cells = this.withPhases(buildMonthGrid(year, month));
    this.isLoading = true;
    this.loadCompliance(() => (this.isLoading = false));

    // Semanas del mes visible: es la única fuente de los badges R1/R2 —
    // las ventanas dependen de los check-ins programados del cliente.
    this.dietPhaseApi.getTimeline(this.clientId, from, to).subscribe({
      next: (timeline) => {
        this.weekWindows = timeline?.weeks || [];
        this.cells = this.withPhases(this.cells);
      },
      error: () => {
        this.weekWindows = [];
      },
    });

    this.loadSupplements();
  }

  // Cumplimiento del mes visible sobre las celdas que ya hay, sin vaciarlas
  // mientras llega.
  private loadCompliance(done: () => void = () => undefined): void {
    const year = this.monthDate.getUTCFullYear();
    const month = this.monthDate.getUTCMonth();
    const from = isoDate(year, month, 1);
    const to = isoDate(year, month, daysInMonth(year, month));
    this.clientDetailApi.getNutritionCompliance(this.clientId, from, to).subscribe({
      next: (summary) => {
        done();
        this.applyCompliance(summary?.dailyBreakdown || []);
      },
      error: done,
    });
  }

  // Los suplementos no cambian de un mes a otro: se piden una vez y se
  // recortan por fecha en cada celda.
  private loadSupplements(): void {
    if (this.supplements.length) {
      this.cells = this.withSupplements(this.cells);
      return;
    }
    this.clientDetailApi.getSupplements(this.clientId).subscribe({
      next: (supplements) => {
        this.supplements = (supplements || [])
          .filter((supplement) => supplement.active !== false && !!supplement.startDate)
          .map((supplement) => ({
            name: supplement.name,
            dose: supplement.dose || '',
            startDate: supplement.startDate as string,
            endDate: supplement.endDate ?? null,
          }));
        this.cells = this.withSupplements(this.cells);
      },
      error: () => {
        this.supplements = [];
      },
    });
  }

  private withSupplements(cells: CalendarCell[]): CalendarCell[] {
    return cells.map((cell) => ({
      ...cell,
      supplements: cell.date
        ? this.supplements
            .filter((s) => s.startDate <= cell.date! && (!s.endDate || s.endDate >= cell.date!))
            .map((s) => (s.dose ? `${s.name} · ${s.dose}` : s.name))
        : [],
    }));
  }

  private loadPlanPhases(): void {
    this.dietPhaseApi.list(this.clientId).subscribe({
      next: (phases) => {
        // Orden estable por fecha de inicio: así el color de cada fase no
        // cambia de un mes a otro dentro de la misma sesión.
        this.planPhases = (phases || []).slice().sort(compareChain);
        this.phaseColorMap = buildPhaseColorMap(this.planPhases.map((p) => p._id));
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
    const mapped = this.withSupplements(cells).map((cell) => ({
      ...cell,
      phase: cell.date ? this.findPhaseForDate(cell.date) : null,
      start: cell.date && this.startPicker ? phaseStartVerdict(cell.date, this.planPhases, this.todayIso) : null,
    }));
    this.visiblePhaseLegend = this.buildVisiblePhaseLegend(mapped);
    return mapped;
  }

  // Deduplica por fase (no por documento: ver CalendarPhaseInfo.key) conservando
  // el orden de aparición (días 1..N del mes, en orden) — así la leyenda lee de
  // arriba abajo igual que el calendario de izquierda a derecha.
  private buildVisiblePhaseLegend(cells: CalendarCell[]): PhaseLegendItem[] {
    const seen = new Set<string>();
    const legend: PhaseLegendItem[] = [];
    for (const cell of cells) {
      if (!cell.phase || seen.has(cell.phase.key)) continue;
      seen.add(cell.phase.key);
      legend.push({
        id: cell.phase.key,
        color: cell.phase.color,
        label: cell.phase.name,
      });
    }
    return legend;
  }

  // Con dos fases que cubren la fecha (se sustituyó una el mismo día en que
  // empezó), manda la más reciente: planPhases va en el orden de la cadena.
  private findPhaseForDate(date: string): CalendarPhaseInfo | null {
    const matches = this.planPhases.filter((p) => p.startDate <= date && (!p.endDate || p.endDate >= date));
    if (!matches.length) return null;

    const phase = matches[matches.length - 1];
    const phaseKey = phase._id;
    return {
      key: phaseKey,
      color: this.phaseColorMap.get(phaseKey) ?? PHASE_COLORS[0],
      name: phase.name,
      // Solo las semanas de ESTA fase: la numeración se reinicia en cada
      // fase nueva.
      weekLabel: this.weekLabelFor(date, phaseKey),
    };
  }

  // "R3" si ese día cae dentro de una semana de la fase; null si no hay
  // check-ins que la partan todavía.
  private weekLabelFor(date: string, phaseKey: string): string | null {
    const window = this.weekWindows.find(
      (w) => w.phaseId === phaseKey && w.start <= date && w.end >= date
    );
    return window ? `S${window.number}` : null;
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
