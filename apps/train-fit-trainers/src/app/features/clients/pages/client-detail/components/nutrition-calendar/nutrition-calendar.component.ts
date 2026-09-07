import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { NutritionComplianceDay } from '../../models/client-detail.model';
import { PlanAssignmentApiService } from '../../../../../../shared/services/plan-assignment-api.service';
import { PlanAssignment } from '../../../../../../shared/models/plan-assignment.model';

interface CalendarPhaseInfo {
  id: string;
  color: string;
  planName: string | null;
  // ¿Impide que una fase nueva empiece en este día? Misma regla que el
  // backend (plan-assignment-service.js#blocksNewPhase): una fase con
  // fecha de fin cerrada bloquea; una INDEFINIDA ya en curso no, porque
  // "le cambio el plan a partir de hoy" es el caso normal y se resuelve
  // cortándola. Sin esta distinción el selector se quedaría muerto para
  // cualquier cliente con plan indefinido: esa fase cubre todos los días
  // desde su inicio en adelante, así que no quedaría ni un día pulsable.
  blocksNewPhase: boolean;
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
// orden de inicio). MISMOS valores que weekdayPatternColors en
// client-detail.page.ts (un solo origen conceptual, dos usos) — cambiar
// aquí implica cambiar allí.
//
// Verde, azul-violeta, turquesa, rosa, dorado, azul cielo.
//
// Historial (2026-09) — cuatro intentos fallidos, todos por el mismo error
// de método: repartir TONOS en HSL. El ángulo de tono no mide lo que ve el
// ojo, así que "40º de separación" puede leerse idéntico (verde 100º y
// verde 140º) o clarísimo (amarillo 50º y verde 90º). Los tres primeros
// intentos ajustaban saturación/luminosidad; el cuarto reordenaba para
// maximizar la distancia entre fases CONSECUTIVAS — pero todas las fases
// se ven a la vez en el calendario y en la leyenda, así que lo que hay que
// separar es CUALQUIER par, no solo los vecinos. Con ese criterio, la
// paleta anterior tenía fase 1 (#bae03e) y fase 3 (#3ee041) a ΔE 14: dos
// verdes prácticamente iguales.
//
// Esta versión se eligió optimizando sobre distancia perceptual real
// (CIEDE2000 en espacio Lab, el estándar para "¿estos dos se parecen?"),
// maximizando el MÍNIMO ΔE entre todos los pares. Resultado: ΔE ≥ 28.9
// entre cualquier par (>10 ya es "claramente distintos"), y ≥ 48 entre
// consecutivos. Restricciones de la búsqueda:
//   · contraste ≥ 4.8:1 sobre el fondo #141414 (legibles en oscuro)
//   · ΔE ≥ 22 respecto a --tf-danger (#eb445a, punto de excepción) y a
//     --tf-accent (#fe9000, hoy/seleccionado) — antes se excluía la banda
//     roja/naranja ENTERA, y eso dejaba solo 285º de rueda para 6 colores,
//     que es justo lo que forzaba los pares indistinguibles. Con distancia
//     medida en vez de un veto por sector caben rosa y dorado sin
//     confundirse con esos dos (quedan a 22.2 y 22.5).
// El script de búsqueda no se versiona: es de un solo uso, y estos 6
// valores son el resultado.
const PHASE_COLORS = ['#5db530', '#7b72ee', '#4cf6df', '#e49ab8', '#f4cd2f', '#12b7f3'];

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
  // Solo en modo selector: por qué se ha rechazado el tramo que se acababa
  // de marcar (se solapa con una fase con fechas cerradas). Se limpia en
  // cuanto se empieza una selección nueva.
  public rangeError: string | null = null;
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
  // ¿El mes visible tiene días de una fase indefinida en curso? (ver
  // withPhases) — solo lo usa la leyenda del selector.
  public hasOpenEndedVisible = false;

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
    // Un día que ya pertenece a una fase BLOQUEANTE no puede ser ni inicio
    // ni fin del rango nuevo — se corta aquí, en el click, en vez de dejar
    // llegar hasta el 409 del backend. Los días de una fase indefinida ya
    // en curso sí son pulsables: el backend los acepta (corta la fase
    // anterior), y es justo el caso de "le cambio el plan a partir de hoy".
    if (this.isPickerMode && cell.phase?.blocksNewPhase) return;
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
      this.rangeError = null;
      return;
    }

    const start = this.rangeStart <= date ? this.rangeStart : date;
    const end = this.rangeStart <= date ? date : this.rangeStart;

    // Los dos extremos pueden estar libres y aun así el tramo tragarse una
    // fase entera por el medio. Bloquear el click día a día no lo cubre:
    // hay que mirar el rango completo, y hacerlo aquí evita que el trainer
    // rellene el resto del formulario para descubrirlo en el 409 al aplicar.
    if (this.isPickerMode) {
      const choque = this.findBlockingPhaseInRange(start, end);
      if (choque) {
        this.rangeError = `Ese tramo se solapa con otra fase (${choque.startDate} → ${
          choque.endDate || 'indefinido'
        }). Elige otras fechas.`;
        this.rangeStart = null;
        this.rangeEnd = null;
        this.hoverDate = null;
        return;
      }
    }

    this.rangeError = null;
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
    // Solo para la leyenda del selector: si en el mes visible hay días de
    // una fase indefinida en curso, se pintan con barra y SÍ son pulsables
    // — un caso a medio camino entre "ocupado" y "libre" que hay que
    // explicar, o parece una incoherencia.
    this.hasOpenEndedVisible = mapped.some((cell) => cell.phase && !cell.phase.blocksNewPhase);
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
      blocksNewPhase: phase.endDate !== null,
    };
  }

  // ¿Hay alguna fase con fin cerrado pisando este tramo? Misma condición de
  // solape que findOverlapping en el backend, pero filtrando por la misma
  // regla que blocksNewPhase: una indefinida ya en curso no cuenta.
  //
  // Se comprueba contra planPhases (el historial ENTERO), no contra las
  // celdas del mes: un rango puede cruzar de un mes a otro y tragarse una
  // fase que ni siquiera se ve en la cuadrícula actual.
  private findBlockingPhaseInRange(start: string, end: string): PlanAssignment | null {
    return (
      this.planPhases.find((phase) => {
        const solapa = phase.startDate <= end && (!phase.endDate || phase.endDate >= start);
        if (!solapa) return false;
        const abiertaYaEnCurso = phase.endDate === null && phase.startDate <= start;
        return !abiertaYaEnCurso;
      }) || null
    );
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
