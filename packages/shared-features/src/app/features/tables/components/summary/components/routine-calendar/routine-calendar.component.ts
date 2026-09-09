import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { Table } from "src/app/core/models/table";
import { TableService } from "src/app/core/services/table/table.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";

interface CalendarWorkoutDot {
  name: string;
  color: string;
}

// Sesión concreta hecha un día: su posición exacta dentro de la rutina
// (microciclo + hueco de workout). Al pulsar el día del calendario se pasa
// esto a Mesociclo para abrir justo esa sesión.
interface DaySession {
  splitIndex: number; // 0-based
  splitNumber: number; // 1-based (badge "M1", "M2"...)
  workoutIndex: number; // posición dentro de split.workouts
  workoutId: string;
  workoutName: string;
}

interface CalendarDay {
  day: number | string;
  date: string;
  workouts: CalendarWorkoutDot[];
  sessions: DaySession[];
  // Microciclos (splits) a los que pertenece algún entrenamiento hecho ese
  // día — normalmente uno solo. Se pinta como "M1", "M2"... arriba a la
  // derecha de la celda, heredado del antiguo mapa de contribuciones que
  // esta vista sustituye (ahí cada columna era un microciclo).
  microcycles: number[];
  completed: boolean;
  inactive: boolean;
}

// Presets de rango (7/30/90d) — mismo mecanismo que el calendario de
// nutrición/entrenamiento en trainers (RANGE_PRESETS + selectPresetRange
// centrado en hoy). Solo visible cuando el host activa enableRangeSelector.
const RANGE_PRESETS = [7, 30, 90];

// Clave de traspaso a Mesociclo (NavigationService.tempData). La lee
// MesocyclePage.ionViewDidEnter para posicionarse en la sesión pulsada.
export const OPEN_WORKOUT_FROM_CALENDAR_KEY = "openWorkoutFromCalendar";

export interface OpenWorkoutFromCalendarState {
  tableId: string;
  splitIndex: number;
  workoutIndex: number;
  workoutId: string;
}

// Mismo calendario en dos sitios: la card "Rutina en uso" del resumen y la
// página de Estadísticas. La lógica de mes/rejilla/leyenda vivía duplicada
// en statistics.page.ts; ahora la comparten vía este componente. Se pinta
// "desnudo" (sin ion-card): cada host decide el marco exterior.
@Component({
  selector: "app-routine-calendar",
  templateUrl: "./routine-calendar.component.html",
  styleUrls: ["./routine-calendar.component.scss"],
})
export class RoutineCalendarComponent implements OnInit, OnDestroy, DoCheck {
  // Selector de rango (7/30/90d + rango a mano) — apagado por defecto: la
  // card compacta "Rutina en uso" del resumen no tiene nada que filtrar con
  // un rango, solo lo activa Estadísticas. Sin esto, el calendario se
  // comporta exactamente igual que antes (tocar un día abre Mesociclo).
  @Input() public enableRangeSelector = false;
  @Output() public rangeSelected = new EventEmitter<{ start: string; end: string } | null>();

  public readonly rangePresets = RANGE_PRESETS;
  public isRangeMode = false;
  public rangeStart: string | null = null;
  public rangeEnd: string | null = null;
  public activePreset: number | null = null;
  public hoverDate: string | null = null;

  public calendarCurrentDate: Date = new Date();
  public calendarDays: CalendarDay[] = [];
  public monthYearString = "";
  public weekDaysHeader: string[] = [];
  public hasCompletedWorkouts = false;
  public uniqueWorkoutTypes: CalendarWorkoutDot[] = [];

  // date (yyyy-MM-dd) -> nombres de workout hechos ese día (para los puntos)
  private workoutMap: Map<string, string[]> = new Map();
  // date (yyyy-MM-dd) -> sesiones hechas ese día (para badge + navegación)
  private daySessionMap: Map<string, DaySession[]> = new Map();
  private workoutColors: Map<string, string> = new Map();
  private langSub?: Subscription;
  private lastSignature = "";

  private readonly palette = [
    "#fe9000",
    "#3880ff",
    "#2dd36f",
    "#ffd359",
    "#ffc455",
    "#eb445a",
    "#a78bfa",
    "#00d98b",
    "#ffc409",
    "#4a9eff",
  ];

  constructor(
    private tableService: TableService,
    private navigationService: NavigationService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.refreshWeekDaysHeader();
    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.refreshWeekDaysHeader();
      this.lastSignature = "";
      this.rebuild();
    });
    this.rebuild();
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  // La tabla activa se muta in-place (marcar una serie, cerrar una sesión y
  // fijar Workout.date...) sin reemplazar el objeto entero — mismo motivo
  // que el antiguo heatmap usaba ngDoCheck. Guarda de firma para no
  // reconstruir la rejilla en cada ciclo de detección de cambios.
  ngDoCheck(): void {
    const signature = this.computeSignature();
    if (signature === this.lastSignature) return;
    this.lastSignature = signature;
    this.preProcess();
    this.updateCalendarDisplay();
  }

  public changeMonth(delta: number): void {
    this.calendarCurrentDate = new Date(
      this.calendarCurrentDate.getFullYear(),
      this.calendarCurrentDate.getMonth() + delta,
      1,
    );
    this.updateCalendarDisplay();
  }

  // Despacha el tap de una celda: en modo rango arma/cierra el rango; si
  // no, mantiene el comportamiento de siempre (abrir Mesociclo).
  public onCellClick(day: CalendarDay): void {
    if (this.isRangeMode) {
      if (!day.date) return;
      this.handleRangeClick(day.date);
      return;
    }
    this.openDay(day);
  }

  // Arma/desarma el modo de selección de rango a mano (clic-clic). Salir a
  // medio seleccionar (ya se pulsó el inicio, falta el fin) abandona esa
  // selección a medias sin tocar un rango ya confirmado antes.
  public toggleRangeMode(): void {
    this.isRangeMode = !this.isRangeMode;
    this.hoverDate = null;
    if (!this.isRangeMode && this.rangeStart && !this.rangeEnd) {
      this.rangeStart = null;
    }
  }

  // Mismo mecanismo que el calendario de nutrición/entrenamiento en
  // trainers: rango centrado en hoy (mitad hacia atrás, mitad hacia
  // delante). Los presets no dependen de isRangeMode — son botones aparte,
  // no interfieren con el tap normal de una celda.
  public selectPresetRange(days: number): void {
    const daysBack = Math.ceil(days / 2);
    const daysForward = Math.floor(days / 2);
    this.rangeStart = this.addIsoDays(-daysBack);
    this.rangeEnd = this.addIsoDays(daysForward);
    this.activePreset = days;
    this.isRangeMode = false;
    this.hoverDate = null;
    this.rangeSelected.emit({ start: this.rangeStart, end: this.rangeEnd });
  }

  public clearRange(): void {
    this.rangeStart = null;
    this.rangeEnd = null;
    this.activePreset = null;
    this.isRangeMode = false;
    this.hoverDate = null;
    this.rangeSelected.emit(null);
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
    this.isRangeMode = false;
    this.rangeSelected.emit({ start, end });
  }

  public onCellHover(day: CalendarDay): void {
    if (!this.isRangeMode || !day.date || !this.rangeStart || this.rangeEnd) return;
    this.hoverDate = day.date;
  }

  public onGridMouseLeave(): void {
    this.hoverDate = null;
  }

  public isInRange(date: string): boolean {
    if (!date || !this.rangeStart) return false;

    if (!this.rangeEnd && this.hoverDate) {
      const start = this.rangeStart <= this.hoverDate ? this.rangeStart : this.hoverDate;
      const end = this.rangeStart <= this.hoverDate ? this.hoverDate : this.rangeStart;
      return date >= start && date <= end;
    }

    const end = this.rangeEnd || this.rangeStart;
    return date >= this.rangeStart && date <= end;
  }

  private addIsoDays(deltaDays: number): string {
    const date = new Date();
    date.setDate(date.getDate() + deltaDays);
    return this.formatDate(date);
  }

  // Pulsar un día con sesión: navega a Mesociclo y abre esa sesión (su
  // microciclo + su workout). Varias sesiones el mismo día es raro (dos
  // splits cerrados en la misma fecha) — se abre la primera.
  public openDay(day: CalendarDay): void {
    const session = day.sessions[0];
    if (!session) return;

    const table = this.tableService.currentTable();
    if (!table?._id) return;

    const state: OpenWorkoutFromCalendarState = {
      tableId: table._id,
      splitIndex: session.splitIndex,
      workoutIndex: session.workoutIndex,
      workoutId: session.workoutId,
    };
    this.navigationService.setTempData(OPEN_WORKOUT_FROM_CALENDAR_KEY, state);
    this.navigationService.goToMesocycle();
  }

  private rebuild(): void {
    this.lastSignature = this.computeSignature();
    this.preProcess();
    this.updateCalendarDisplay();
  }

  private computeSignature(): string {
    const table = this.tableService.currentTable();
    const splits = table?.splits ?? [];
    const parts: string[] = [];
    splits.forEach((split, index) => {
      (split.workouts || []).forEach((w) => {
        if (w.date) {
          parts.push(`${index}:${new Date(w.date).getTime()}:${w.name || ""}`);
        }
      });
    });
    const month = `${this.calendarCurrentDate.getFullYear()}-${this.calendarCurrentDate.getMonth()}`;
    return `${table?._id || "none"}|${month}|${this.translate.currentLang}|${parts.join(",")}`;
  }

  private preProcess(): void {
    this.workoutMap.clear();
    this.daySessionMap.clear();
    this.workoutColors.clear();

    const table: Table | null = this.tableService.currentTable();
    if (!table || !table.splits) {
      this.uniqueWorkoutTypes = [];
      return;
    }

    table.splits.forEach((split, splitIndex) => {
      (split.workouts || []).forEach((w, workoutIndex) => {
        if (!w.date) return;

        const dateStr = this.formatDate(new Date(w.date));

        if (!this.daySessionMap.has(dateStr)) {
          this.daySessionMap.set(dateStr, []);
        }
        this.daySessionMap.get(dateStr)!.push({
          splitIndex,
          splitNumber: splitIndex + 1,
          workoutIndex,
          workoutId: w._id,
          workoutName: w.name || "",
        });

        // Un descanso pautado no es un "tipo de entrenamiento": no va a la
        // leyenda ni pinta punto de color, pero sí cuenta como día con
        // sesión (badge M1/M2, navegable) — la sesión ocurrió.
        if (w.isPlannedRestDay) return;

        if (!this.workoutMap.has(dateStr)) {
          this.workoutMap.set(dateStr, []);
        }
        const names = this.workoutMap.get(dateStr)!;
        if (w.name && !names.includes(w.name)) {
          names.push(w.name);
        }

        if (w.name && !this.workoutColors.has(w.name)) {
          const colorIndex = this.workoutColors.size % this.palette.length;
          this.workoutColors.set(w.name, this.palette[colorIndex]);
        }
      });
    });

    const types: CalendarWorkoutDot[] = [];
    this.workoutColors.forEach((color, name) => types.push({ name, color }));
    this.uniqueWorkoutTypes = types.sort((a, b) => a.name.localeCompare(b.name));
  }

  private updateCalendarDisplay(): void {
    this.generateMonthYearString();
    this.generateCalendarDays();
    this.hasCompletedWorkouts = this.calendarDays.some((d) => d.completed);
  }

  private generateMonthYearString(): void {
    const locale = this.translate.currentLang === "en" ? "en" : "es";
    this.monthYearString = this.calendarCurrentDate.toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });
  }

  private generateCalendarDays(): void {
    this.calendarDays = [];
    const year = this.calendarCurrentDate.getFullYear();
    const month = this.calendarCurrentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const startDayOfWeek = firstDay.getDay();
    const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    for (let i = 0; i < adjustedStartDay; i++) {
      this.calendarDays.push({
        day: "",
        date: "",
        workouts: [],
        sessions: [],
        microcycles: [],
        completed: false,
        inactive: true,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = this.formatDate(new Date(year, month, i));
      const workoutNames = this.workoutMap.get(dateStr) || [];
      const sessions = (this.daySessionMap.get(dateStr) || [])
        .slice()
        .sort((a, b) => a.splitIndex - b.splitIndex);
      const microcycles = Array.from(
        new Set(sessions.map((s) => s.splitNumber)),
      ).sort((a, b) => a - b);

      this.calendarDays.push({
        day: i,
        date: dateStr,
        workouts: workoutNames.map((name) => ({
          name,
          color: this.workoutColors.get(name) || "#ff6b35",
        })),
        sessions,
        microcycles,
        completed: sessions.length > 0,
        inactive: false,
      });
    }
  }

  private refreshWeekDaysHeader(): void {
    this.weekDaysHeader = [
      this.translate.instant("COMMON.MON"),
      this.translate.instant("COMMON.TUE"),
      this.translate.instant("COMMON.WED"),
      this.translate.instant("COMMON.THU"),
      this.translate.instant("COMMON.FRI"),
      this.translate.instant("COMMON.SAT"),
      this.translate.instant("COMMON.SUN"),
    ];
  }

  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
}
