import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
  inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Chart, registerables } from "chart.js";
import { ActivatedRoute } from "@angular/router";
import { AlertOptions } from "@ionic/angular";
import { Capacitor } from "@capacitor/core";
import { TranslateService } from "@ngx-translate/core";
import { Table } from "src/app/core/models/table";
import { Workout } from "src/app/core/models/workout";
import { CustomExercise } from "src/app/core/models/customExercise";
import { Set as ISet } from "src/app/core/models/set";
import {
  formatRirValue,
  isRirFail,
  normalizeRirValue,
  RIR_FAIL_VALUE,
} from "src/app/core/models/rir";
import { TableService } from "src/app/core/services/table/table.service";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import {
  ExerciseHistoryService,
  ExerciseHistoryStats,
} from "src/app/core/services/exercise-history/exercise-history.service";
import { take } from "rxjs/operators";
import { formatSecondsAsTime, parseTimeToSeconds } from "src/app/shared/utils";
import { PinnedExerciseNoteService } from "src/app/core/services/pinned-exercise-note/pinned-exercise-note.service";
import { PinnedExerciseNote } from "src/app/core/models/pinned-exercise-note";

Chart.register(...registerables);

interface SubSerie {
  reps?: number;
  weight?: number;
  rir?: number | number[];
}

interface SessionSet {
  weight?: number;
  reps?: number;
  rir?: string;
  rirNumeric?: number;
  velocity?: number;
  time?: string;
  timeSeconds?: number;
  distance?: number;
  isDropSet: boolean;
  isRestPause: boolean;
  isFail: boolean;
  restPause?: number;
  restSeconds?: number;
  dropSeries?: SubSerie[];
  restPauseSeries?: SubSerie[];
}

interface SessionData {
  date: Date;
  splitIndex: number;
  sets: SessionSet[];
  volume: number; // real volume including sub-series
  volumeBase: number; // base volume (no sub-series) for comparison
  maxWeight: number;
  maxReps: number;
  maxVelocity: number;
  totalTimeSeconds: number;
  maxHoldSeconds: number;
  isCardio: boolean;
  isIsometric: boolean;
  notes: string;
  avgRir: number;
  minRir: number;
  dropSetCount: number;
  restPauseCount: number;
  sessionMax1RM: number;
  effectiveVolume: number;
}

interface ComparisonData {
  prevSplit: number;
  currSplit: number;
  prevMaxWeight: number;
  currMaxWeight: number;
  weightDiff: number;
  weightPct: number;
  prevVolume: number;
  currVolume: number;
  volumeDiff: number;
  volumePct: number;
  prevAvgRir: number;
  currAvgRir: number;
  rirDiff: number;
  prevSets: number;
  currSets: number;
  setsDiff: number;
  prevDropSets: number;
  currDropSets: number;
  prevRestPauses: number;
  currRestPauses: number;
  prevEffectiveVolume: number;
  currEffectiveVolume: number;
  effVolumeDiff: number;
  effVolumePct: number;

  // Cardio specific
  prevMaxVelocity?: number;
  currMaxVelocity?: number;
  velocityDiff?: number;
  velocityPct?: number;
  prevTotalTime?: number;
  currTotalTime?: number;
  timeDiff?: number;
  timePct?: number;

  // Isometric specific
  prevMaxHold?: number;
  currMaxHold?: number;
  maxHoldDiff?: number;
  maxHoldPct?: number;
}

interface CalendarDay {
  day: number | string;
  date: string;
  workoutNames: string[];
  workouts: Array<{ name: string; color: string }>;
  completed: boolean;
  inactive: boolean;
}

// Tarea 2 (2026-08) — componente propio de Trainers, ya no
// StatisticsPage/statistics.module de shared-features: mismo motor de
// cálculo (RIR, 1RM, volumen efectivo, comparador de microciclos, histórico
// cross-rutina) porque es lógica de datos pura, no UI — lo que cambia es la
// plantilla/estilos, ahora en el lenguaje visual de esta app (tokens
// --tf-*, tf-page-header), y la ruta, ahora anidada bajo 'tabs' (mismo
// criterio que TASK-026 ya aplicó al Planificador: sin eso, esta pantalla
// pierde el sidebar persistente al abrirse).
@Component({
  selector: "app-training-statistics",
  templateUrl: "./statistics.page.html",
  styleUrls: ["./statistics.page.scss"],
})
export class StatisticsPage implements OnInit, OnDestroy {
  @ViewChild("progressionCanvas") progressionCanvas: ElementRef;

  // Modo incrustado: la ficha del cliente la pinta a la izquierda del panel
  // de Sesiones (client-detail, "Ver progresión por ejercicio") sin navegar.
  // Ahí no hay :clientId en la ruta (la ficha usa :id) y "Volver" cierra la
  // vista en vez de abandonar la ficha.
  @Input() public clientId: string | null = null;
  @Input() public embedded = false;
  @Output() public closed = new EventEmitter<void>();

  // Desplegables: en web abren la lista anclada al campo (popover), como el
  // resto de la app de escritorio; en el móvil nativo, hoja inferior. Los
  // ion-select llevan mode="ios" por la hoja, así que el popover se fuerza a
  // md (sin flecha ni velo), el mismo de los .tf-select; labelPlacement
  // "stacked" hace que Ionic lo abra con el ancho del campo.
  private static readonly WEB_POPOVER = { mode: "md", showBackdrop: false };
  public readonly selectInterface = Capacitor.isNativePlatform()
    ? "action-sheet"
    : "popover";
  public readonly pickerOptions = Capacitor.isNativePlatform()
    ? { cssClass: "no-cancel-action-sheet" }
    : StatisticsPage.WEB_POPOVER;
  public readonly microcyclePickerOptions = Capacitor.isNativePlatform()
    ? { cssClass: "white-text-action-sheet" }
    : StatisticsPage.WEB_POPOVER;
  public readonly setPickerOptions = Capacitor.isNativePlatform()
    ? {}
    : StatisticsPage.WEB_POPOVER;

  public table: Table;

  // Selectors Data
  public workouts: Workout[] = [];
  public exercises: CustomExercise[] = [];

  // Selection State
  public selectedWorkoutName: string = "";
  public selectedExerciseId: string | null = null;
  public selectedExerciseName: string | null = null;
  public selectedSetIndex: number = 0; // 0 significa "Serie 1"
  public availableSetOptions: number[] = [];

  // Chart State
  public chart: Chart | null = null;
  public chartMode: "evolution" | "volume" = "evolution"; // evolution (series) o volume (efectivo/RIR)

  // Data State
  public historyData: SessionData[] = [];
  public filteredHistory: SessionData[] = [];
  public comparisonData: ComparisonData | null = null;

  // Comparison selectors (index within filteredHistory, desc order)
  public compareIndexA: number = 1; // "de" (origen, más antiguo)
  public compareIndexB: number = 0; // "a"  (destino, más reciente)

  // Opciones válidas para cada selector (se recalculan al cambiar selección)
  public optionsForA: Array<{ idx: number; splitIndex: number }> = [];
  public optionsForB: Array<{ idx: number; splitIndex: number }> = [];

  public get compareSplitIndexA(): number | undefined {
    return this.optionsForA.find((o) => o.idx === this.compareIndexA)
      ?.splitIndex;
  }

  public get compareSplitIndexB(): number | undefined {
    return this.optionsForB.find((o) => o.idx === this.compareIndexB)
      ?.splitIndex;
  }

  // Metrics
  public metrics = {
    totalVolume: 0,
    max1RM: 0,
  };
  public personalRecord = 0;
  public workoutCompletionCount = 0;
  public isCardio: boolean = false;
  public isIsometric: boolean = false;

  public get isStrength(): boolean {
    return !this.isCardio && !this.isIsometric;
  }

  // Calendar State
  public calendarCurrentDate: Date = new Date();
  public calendarDays: CalendarDay[] = [];
  public monthYearString: string = "";
  public hasCompletedWorkouts: boolean = false;
  public uniqueWorkoutTypes: Array<{ name: string; color: string }> = [];

  // Data structures for efficient lookup
  private workoutMap: Map<string, string[]> = new Map();
  private workoutColors: Map<string, string> = new Map();
  private langChangeSubscription: any;

  private availableColors = [
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
  public weekDaysHeader: string[];

  public historicalStats: ExerciseHistoryStats | null = null;
  public historicalStatsLoading = false;

  // TASK-020 (MASTER_BACKLOG.md) — reemplaza el gate de TASK-007
  // (hideHistoricalStats): ahora que el endpoint de histórico admite un
  // cliente explícito, la tarjeta se muestra siempre — solo cambia a qué
  // endpoint apunta la petición (ver loadHistoricalStats). null en la ruta
  // de consumidor ('/statistics', sin :clientId): pide su propio histórico,
  // exactamente como siempre.
  public clientIdForHistory: string | null = null;
  // Nota anclada a la posición (día+ejercicio) de este ejercicio en el
  // microciclo más reciente de la tabla — no varía al navegar el histórico,
  // es la misma nota que se ve en "Añadir ejercicio" (config-exercise.page).
  public pinnedNote: PinnedExerciseNote | null = null;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private tableService: TableService,
    private ionicUtilService: IonicUtilService,
    private exerciseHistoryService: ExerciseHistoryService,
    private route: ActivatedRoute,
    private pinnedExerciseNoteService: PinnedExerciseNoteService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.weekDaysHeader = [
      this.translate.instant("COMMON.MON"),
      this.translate.instant("COMMON.TUE"),
      this.translate.instant("COMMON.WED"),
      this.translate.instant("COMMON.THU"),
      this.translate.instant("COMMON.FRI"),
      this.translate.instant("COMMON.SAT"),
      this.translate.instant("COMMON.SUN"),
    ];
    this.clientIdForHistory =
      this.clientId ?? this.route.snapshot.paramMap.get("clientId");

    this.table = this.tableService.currentTable();
    if (this.table && this.table.splits) {
      this.extractWorkouts();
      this.preProcessWorkoutData();
      this.updateCalendarDisplay();
    }

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.weekDaysHeader = [
        this.translate.instant("COMMON.MON"),
        this.translate.instant("COMMON.TUE"),
        this.translate.instant("COMMON.WED"),
        this.translate.instant("COMMON.THU"),
        this.translate.instant("COMMON.FRI"),
        this.translate.instant("COMMON.SAT"),
        this.translate.instant("COMMON.SUN"),
      ];
      this.updateCalendarDisplay();
      if (this.chart) {
        this.updateChart();
      }
    });
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }

  // --- Data Pre-processing ---

  private extractWorkouts() {
    const workoutMap = new Map<string, Workout>();

    if (!this.table || !this.table.splits) return;

    this.table.splits.forEach((split) => {
      split.workouts.forEach((w) => {
        if (!workoutMap.has(w.name)) {
          // Clonar para no mutar el original
          workoutMap.set(w.name, { ...w, exercises: [...w.exercises] });
        } else {
          const existingWorkout = workoutMap.get(w.name)!;
          // Añadir solo ejercicios que no estén ya en la lista
          w.exercises.forEach((newEx) => {
            const alreadyExists = existingWorkout.exercises.some((ex) => {
              // Comparación robusta: ID de base de ejercicio o nombre si no hay base
              const idMatches =
                ex.exercise?._id &&
                newEx.exercise?._id &&
                ex.exercise._id === newEx.exercise._id;
              const nameMatches =
                !ex.exercise?._id &&
                !newEx.exercise?._id &&
                ex.exercise?.name === newEx.exercise?.name;
              return idMatches || nameMatches;
            });

            if (!alreadyExists) {
              existingWorkout.exercises.push(newEx);
            }
          });
        }
      });
    });

    this.workouts = Array.from(workoutMap.values());
  }

  private preProcessWorkoutData() {
    this.workoutMap.clear();
    this.workoutColors.clear();

    if (!this.table || !this.table.splits) return;

    this.table.splits.forEach((split) => {
      split.workouts.forEach((w) => {
        if (w.date) {
          const dateObj = new Date(w.date);
          const dateStr = this.formatDate(dateObj);

          if (!this.workoutMap.has(dateStr)) {
            this.workoutMap.set(dateStr, []);
          }

          const workoutsOnDate = this.workoutMap.get(dateStr)!;
          if (!workoutsOnDate.includes(w.name)) {
            workoutsOnDate.push(w.name);
          }

          if (!this.workoutColors.has(w.name)) {
            const colorIndex =
              this.workoutColors.size % this.availableColors.length;
            this.workoutColors.set(w.name, this.availableColors[colorIndex]);
          }
        }
      });
    });

    const types: Array<{ name: string; color: string }> = [];
    this.workoutColors.forEach((color, name) => {
      types.push({ name, color });
    });
    this.uniqueWorkoutTypes = types.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  private updateCalendarDisplay() {
    this.generateMonthYearString();
    this.generateCalendarDays();
    this.hasCompletedWorkouts = this.calendarDays.some((d) => d.completed);
  }

  private generateMonthYearString() {
    const locale = this.translate.currentLang === "en" ? "en" : "es";
    this.monthYearString = this.calendarCurrentDate.toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });
  }

  private generateCalendarDays() {
    this.calendarDays = [];
    const year = this.calendarCurrentDate.getFullYear();
    const month = this.calendarCurrentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const startDayOfWeek = firstDay.getDay();
    let adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    for (let i = 0; i < adjustedStartDay; i++) {
      this.calendarDays.push({
        day: "",
        date: "",
        workoutNames: [],
        workouts: [],
        completed: false,
        inactive: true,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = this.formatDate(new Date(year, month, i));
      const workoutNames = this.workoutMap.get(dateStr) || [];

      const workoutsWithColors = workoutNames.map((name) => ({
        name,
        color: this.workoutColors.get(name) || "#ff6b35",
      }));

      this.calendarDays.push({
        day: i,
        date: dateStr,
        workoutNames: workoutNames,
        workouts: workoutsWithColors,
        completed: workoutNames.length > 0,
        inactive: false,
      });
    }
  }

  public changeMonth(delta: number) {
    this.calendarCurrentDate = new Date(
      this.calendarCurrentDate.getFullYear(),
      this.calendarCurrentDate.getMonth() + delta,
      1,
    );
    this.updateCalendarDisplay();
  }

  // --- Events ---

  public onWorkoutChange(event: any) {
    const workoutName = event.detail.value;
    if (!workoutName) return;

    this.selectedWorkoutName = workoutName;
    const workout = this.workouts.find((w) => w.name === workoutName);

    if (workout) {
      this.exercises = workout.exercises;
      this.selectedExerciseId = null;
      this.selectedExerciseName = null;
      this.pinnedNote = null;
      this.historyData = [];
      this.filteredHistory = [];
      this.comparisonData = null;
      this.compareIndexA = 1;
      this.compareIndexB = 0;
      this.calculateWorkoutStats();
    }
  }

  public onExerciseChange(event: any) {
    const exerciseId = event.detail.value;
    if (!exerciseId) return;

    this.selectedExerciseId = exerciseId;
    const exercise = this.exercises.find((ex) => ex._id === exerciseId);
    if (exercise) {
      this.selectedExerciseName =
        exercise.exercise?.name ||
        this.translate.instant("TABLES.STATS_SELECT_EXERCISE");
      this.selectedSetIndex = 0; // Reset a primera serie
      this.chartMode = "evolution"; // Default mode
      this.generateHistoryData();
      this.loadHistoricalStats(exercise);
      this.loadPinnedNote(exercise);
    }
  }

  // Nota anclada del ejercicio en el microciclo más reciente de la tabla —
  // misma nota que ya se ve en "Añadir ejercicio" (config-exercise.page),
  // no cambia al navegar el histórico de microciclos pasados.
  private loadPinnedNote(exercise: CustomExercise): void {
    this.pinnedNote = null;

    const targetExDefId = exercise.exercise?._id;
    const latestSplit = this.table?.splits?.[this.table.splits.length - 1];
    if (!this.table?._id || !targetExDefId || !latestSplit) return;

    const workoutIndex = latestSplit.workouts.findIndex(
      (w) => w.name === this.selectedWorkoutName,
    );
    if (workoutIndex === -1) return;

    const exerciseIndex = latestSplit.workouts[
      workoutIndex
    ].exercises.findIndex((e) => e.exercise?._id === targetExDefId);
    if (exerciseIndex === -1) return;

    this.pinnedExerciseNoteService
      .getByPosition(this.table._id, workoutIndex, exerciseIndex)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((note) => {
        this.pinnedNote = note;
      });
  }

  // Histórico a través de TODAS las rutinas del usuario (no solo la actual)
  // — distinto de generateHistoryData()/personalRecord, que están
  // escopeados a la rutina abierta + el nombre de workout seleccionado.
  private loadHistoricalStats(exercise: CustomExercise): void {
    this.historicalStats = null;
    this.historicalStatsLoading = true;
    this.exerciseHistoryService
      .getStatsForExercise$(
        exercise.exercise?._id ?? null,
        exercise.exercise?.name ?? "",
        this.clientIdForHistory,
      )
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (stats) => {
          this.historicalStats = stats;
          this.historicalStatsLoading = false;
        },
        error: () => {
          this.historicalStatsLoading = false;
        },
      });
  }

  public onChartModeChange(event: any) {
    this.chartMode = event.detail.value;
    setTimeout(() => this.updateChart());
  }

  public onSetTypeChange(event: any) {
    this.selectedSetIndex = event.detail.value;
    setTimeout(() => this.updateChart());
  }

  public onCompareChange() {
    // A debe ser más antiguo (índice mayor en array desc) que B
    if (this.compareIndexA <= this.compareIndexB) return;
    this.refreshCompareOptions();
    this.calculateComparison();
  }

  private refreshCompareOptions() {
    // optionsForA: solo microciclos con índice > compareIndexB (más antiguos que B)
    this.optionsForA = this.filteredHistory
      .map((s, i) => ({ idx: i, splitIndex: s.splitIndex }))
      .filter((o) => o.idx > this.compareIndexB);

    // optionsForB: solo microciclos con índice < compareIndexA (más recientes que A)
    this.optionsForB = this.filteredHistory
      .map((s, i) => ({ idx: i, splitIndex: s.splitIndex }))
      .filter((o) => o.idx < this.compareIndexA);
  }

  // --- Core Logic ---

  private calculateWorkoutStats() {
    this.workoutCompletionCount = 0;
    if (!this.table || !this.table.splits || !this.selectedWorkoutName) return;

    this.table.splits.forEach((split) => {
      const workout = split.workouts.find(
        (w) => w.name === this.selectedWorkoutName,
      );
      if (workout && workout.date) {
        const isStarted =
          workout.exercises &&
          workout.exercises.some((ex) => this.isExerciseStarted(ex));
        if (isStarted) this.workoutCompletionCount++;
      }
    });
  }

  private generateHistoryData() {
    this.historyData = [];
    this.comparisonData = null;
    if (!this.selectedWorkoutName || !this.selectedExerciseId || !this.table)
      return;

    const targetExDef = this.exercises.find(
      (e) => e._id === this.selectedExerciseId,
    );
    const targetExDefId = targetExDef?.exercise?._id;
    if (!targetExDefId) return;

    this.isCardio = !!targetExDef?.exercise?.isCardio;
    this.isIsometric = !!targetExDef?.exercise?.isIsometric;

    this.table.splits.forEach((split, index) => {
      const workout = split.workouts.find(
        (w) => w.name === this.selectedWorkoutName,
      );
      if (workout && workout.date) {
        const targetEx = workout.exercises.find(
          (e) => e.exercise?._id === targetExDefId,
        );
        if (targetEx && this.isExerciseStarted(targetEx)) {
          const filteredSets = targetEx.sets.filter(
            (s) =>
              s.doned ||
              (s.weight > 0 && s.reps > 0) ||
              (s.velocity && s.velocity > 0) ||
              (s.time && parseTimeToSeconds(s.time) > 0),
          );

          // Build SessionSet array with sub-series
          const sessionSets: SessionSet[] = filteredSets.map((s) => {
            const normalizedRir = normalizeRirValue(s.rir);
            const rirNumeric =
              normalizedRir && normalizedRir[0] !== RIR_FAIL_VALUE
                ? normalizedRir[0]
                : undefined;

            return {
              weight: s.weight || 0,
              reps: s.reps || 0,
              rir: formatRirValue(normalizedRir),
              rirNumeric,
              velocity: s.velocity || 0,
              time: s.time,
              timeSeconds: parseTimeToSeconds(s.time),
              distance: s.distance || 0,
              isDropSet: s.drop === true,
              isRestPause: !!(s.restPause && s.restPause > 0),
              isFail: isRirFail(s.rir),
              restSeconds: s.restSeconds,
              dropSeries: s.dropSetSeries || [],
              restPauseSeries: s.restPauseSeries || [],
            };
          });

          // Real volume: base + all DS/RP sub-series
          const volumeBase = this.calculateVolume(filteredSets);
          const volumeReal = this.calculateVolumeWithSubSeries(filteredSets);

          const bestSet = this.getBestSet(targetEx.sets);
          const totalTimeSeconds = sessionSets.reduce(
            (acc, s) => acc + (s.timeSeconds || 0),
            0,
          );
          const maxHoldSeconds = Math.max(
            ...sessionSets.map((s) => s.timeSeconds || 0),
            0,
          );
          const maxV = Math.max(...sessionSets.map((s) => s.velocity || 0), 0);

          // Average RIR (only numeric, non-fail)
          const rirSets = sessionSets.filter(
            (s) => typeof s.rirNumeric === "number" && s.rirNumeric >= 0,
          );
          const avgRir =
            rirSets.length > 0
              ? rirSets.reduce((acc, s) => acc + (s.rirNumeric ?? 0), 0) /
                rirSets.length
              : -1;

          // Calculate Effective Volume
          let effectiveVolume = 0;
          if (!this.isCardio && !this.isIsometric) {
            sessionSets.forEach((s) => {
              const weight = s.weight || 0;
              const reps = s.reps || 0;
              let factor = 0.5; // Default for RIR 4+ or no RIR

              if (s.isFail || s.rirNumeric === 0 || s.rirNumeric === 1)
                factor = 1.0;
              else if (s.rirNumeric === 2 || s.rirNumeric === 3) factor = 0.8;

              effectiveVolume += weight * reps * factor;
            });
          }

          const dropSetCount = sessionSets.filter((s) => s.isDropSet).length;
          const restPauseCount = sessionSets.filter(
            (s) => s.isRestPause,
          ).length;
          let sessionMax1RM = 0;
          if (!this.isCardio && !this.isIsometric) {
            sessionSets.forEach((s) => {
              if (s.weight && s.reps) {
                const oneRM = this.calculate1RM(s.weight, s.reps);
                if (oneRM > sessionMax1RM) sessionMax1RM = oneRM;
              }
            });
          }

          this.historyData.push({
            date: new Date(workout.date),
            splitIndex: index + 1,
            sets: sessionSets,
            volume: volumeReal,
            volumeBase: volumeBase,
            maxWeight: bestSet ? bestSet.weight : 0,
            maxReps: bestSet ? bestSet.reps : 0,
            maxVelocity: maxV,
            totalTimeSeconds,
            maxHoldSeconds,
            isCardio: this.isCardio,
            isIsometric: this.isIsometric,
            notes: targetEx.notes || "",
            avgRir,
            minRir:
              rirSets.length > 0
                ? Math.min(...rirSets.map((s) => s.rirNumeric ?? 0))
                : -1,
            dropSetCount,
            restPauseCount,
            sessionMax1RM,
            effectiveVolume,
          });
        }
      }
    });

    this.historyData.sort((a, b) => b.splitIndex - a.splitIndex);
    this.filteredHistory = [...this.historyData];

    // Calcular cuántas series máximas hay para este ejercicio en el historial
    const maxSets = Math.max(...this.historyData.map((h) => h.sets.length), 0);
    this.availableSetOptions = Array.from({ length: maxSets }, (_, i) => i);

    this.calculateMetrics();
    // Reset compare indices to last two by default
    this.compareIndexA = Math.min(1, this.filteredHistory.length - 1);
    this.compareIndexB = 0;
    this.refreshCompareOptions();
    this.calculateComparison();

    setTimeout(() => this.updateChart());
  }

  private calculateComparison() {
    this.comparisonData = null;
    if (this.filteredHistory.length < 2) return;

    // Use selected indices; A = "from", B = "to"
    const prev = this.filteredHistory[this.compareIndexA];
    const curr = this.filteredHistory[this.compareIndexB];
    if (!prev || !curr) return;

    const weightDiff = curr.maxWeight - prev.maxWeight;
    const weightPct =
      prev.maxWeight > 0 ? (weightDiff / prev.maxWeight) * 100 : 0;

    const volumeDiff = curr.volume - prev.volume;
    const volumePct = prev.volume > 0 ? (volumeDiff / prev.volume) * 100 : 0;

    const rirDiff =
      curr.avgRir >= 0 && prev.avgRir >= 0 ? curr.avgRir - prev.avgRir : 0;
    const setsDiff = curr.sets.length - prev.sets.length;

    const effVolumeDiff = curr.effectiveVolume - prev.effectiveVolume;
    const effVolumePct =
      prev.effectiveVolume > 0
        ? (effVolumeDiff / prev.effectiveVolume) * 100
        : 0;

    // Cardio specific diffs
    const velocityDiff = curr.maxVelocity - prev.maxVelocity;
    const velocityPct =
      prev.maxVelocity > 0 ? (velocityDiff / prev.maxVelocity) * 100 : 0;

    const prevTimeTotal = prev.totalTimeSeconds / 60;
    const currTimeTotal = curr.totalTimeSeconds / 60;
    const timeDiff = currTimeTotal - prevTimeTotal;
    const timePct = prevTimeTotal > 0 ? (timeDiff / prevTimeTotal) * 100 : 0;

    // Isometric specific diffs
    const maxHoldDiff = curr.maxHoldSeconds - prev.maxHoldSeconds;
    const maxHoldPct =
      prev.maxHoldSeconds > 0 ? (maxHoldDiff / prev.maxHoldSeconds) * 100 : 0;

    this.comparisonData = {
      prevSplit: prev.splitIndex,
      currSplit: curr.splitIndex,
      prevMaxWeight: prev.maxWeight,
      currMaxWeight: curr.maxWeight,
      weightDiff,
      weightPct,
      prevVolume: prev.volume,
      currVolume: curr.volume,
      volumeDiff,
      volumePct,
      prevAvgRir: prev.avgRir,
      currAvgRir: curr.avgRir,
      rirDiff,
      prevSets: prev.sets.length,
      currSets: curr.sets.length,
      setsDiff,
      prevDropSets: prev.dropSetCount,
      currDropSets: curr.dropSetCount,
      prevRestPauses: prev.restPauseCount,
      currRestPauses: curr.restPauseCount,
      prevEffectiveVolume: prev.effectiveVolume,
      currEffectiveVolume: curr.effectiveVolume,
      effVolumeDiff,
      effVolumePct,
      // Cardio fields
      prevMaxVelocity: prev.maxVelocity,
      currMaxVelocity: curr.maxVelocity,
      velocityDiff,
      velocityPct,
      prevTotalTime: prevTimeTotal,
      currTotalTime: currTimeTotal,
      timeDiff,
      timePct,
      // Isometric fields
      prevMaxHold: prev.maxHoldSeconds,
      currMaxHold: curr.maxHoldSeconds,
      maxHoldDiff,
      maxHoldPct,
    };
  }

  private calculateMetrics() {
    if (this.historyData.length === 0) {
      this.personalRecord = 0;
      this.metrics.max1RM = 0;
      this.metrics.totalVolume = 0;
      return;
    }

    if (this.isCardio) {
      this.personalRecord = Math.max(
        ...this.historyData.map((h) => h.maxVelocity),
      );
      this.metrics.max1RM = this.historyData.reduce(
        (acc, h) => acc + h.totalTimeSeconds / 60,
        0,
      );
      this.metrics.totalVolume = this.historyData.length;
    } else if (this.isIsometric) {
      // personalRecord reciclado como "aguante más largo" (segundos), a
      // propósito, mismo patrón que ya usa cardio con maxVelocity.
      this.personalRecord = Math.max(
        ...this.historyData.map((h) => h.maxHoldSeconds),
      );
      this.metrics.max1RM = this.historyData.reduce(
        (acc, h) => acc + h.totalTimeSeconds / 60,
        0,
      );
      this.metrics.totalVolume = this.historyData.length;
    } else {
      this.personalRecord = Math.max(
        ...this.historyData.map((h) => h.maxWeight),
      );

      let peak1RM = 0;
      this.historyData.forEach((session) => {
        session.sets.forEach((set) => {
          if (set.weight && set.reps) {
            const current1RM = this.calculate1RM(
              set.weight,
              set.reps as number,
            );
            if (current1RM > peak1RM) peak1RM = current1RM;
          }
        });
      });
      this.metrics.max1RM = peak1RM;
      this.metrics.totalVolume = this.historyData.reduce(
        (acc, h) => acc + (h.volume || 0),
        0,
      );
    }
  }

  // --- Chart Dispatcher ---

  private updateChart() {
    if (!this.progressionCanvas || !this.progressionCanvas.nativeElement)
      return;

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const data = [...this.filteredHistory].reverse();
    if (data.length === 0) return;

    if (this.chartMode === "evolution") {
      this.buildProgressionChart(data);
    } else {
      this.buildEffectiveVolumeChart(data);
    }
  }

  private buildEffectiveVolumeChart(data: SessionData[]) {
    const ctx = this.progressionCanvas.nativeElement.getContext("2d");
    const labels = data.map((h) => `M${h.splitIndex}`);

    if (this.isCardio) {
      const timeData = data.map((h) => h.totalTimeSeconds / 60);
      const velocityData = data.map((h) => h.maxVelocity);

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              type: "bar",
              label:
                this.translate.instant("TABLES.STATS_TOTAL_TIME") + " (min)",
              data: timeData,
              backgroundColor: "rgba(56, 128, 255, 0.4)",
              borderColor: "#3880ff",
              borderWidth: 1,
              borderRadius: 4,
              yAxisID: "y",
            },
            {
              type: "line",
              label:
                this.translate.instant("TABLES.STATS_BEST_SPEED") + " (km/h)",
              data: velocityData,
              borderColor: "#fe9000",
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 4,
              yAxisID: "y1",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: { color: "rgba(255,255,255,0.7)", font: { size: 10 } },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  if (ctx.datasetIndex === 0)
                    return ` ${this.translate.instant("TABLES.STATS_TIME")}: ${
                      ctx.raw
                    } min`;
                  return ` ${this.translate.instant("TABLES.STATS_SPEED")}: ${
                    ctx.raw
                  } km/h`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "rgba(255,255,255,0.5)" },
            },
            y: {
              position: "left",
              title: {
                display: true,
                text: "min",
                color: "rgba(255,255,255,0.3)",
              },
              ticks: { color: "rgba(255,255,255,0.5)" },
            },
            y1: {
              position: "right",
              title: {
                display: true,
                text: "km/h",
                color: "rgba(254, 144, 0, 0.8)",
              },
              grid: { drawOnChartArea: false },
              ticks: { color: "rgba(254, 144, 0, 0.8)" },
            },
          },
        },
      });
    } else if (this.isIsometric) {
      // Solo una serie (tiempo total aguantado), sin segundo eje — a
      // diferencia de cardio, isométrico no tiene una segunda métrica de ritmo.
      const timeData = data.map((h) => h.totalTimeSeconds / 60);

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              type: "bar",
              label:
                this.translate.instant("TABLES.STATS_TOTAL_TIME") + " (min)",
              data: timeData,
              backgroundColor: "rgba(56, 128, 255, 0.4)",
              borderColor: "#3880ff",
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: { color: "rgba(255,255,255,0.7)", font: { size: 10 } },
            },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  ` ${this.translate.instant("TABLES.STATS_TIME")}: ${
                    ctx.raw
                  } min`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "rgba(255,255,255,0.5)" },
            },
            y: {
              position: "left",
              title: {
                display: true,
                text: "min",
                color: "rgba(255,255,255,0.3)",
              },
              ticks: { color: "rgba(255,255,255,0.5)" },
            },
          },
        },
      });
    } else {
      const volData = data.map((h) => h.effectiveVolume);
      const rirData = data.map((h) => (h.avgRir >= 0 ? h.avgRir : null));

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              type: "bar",
              label:
                this.translate.instant("TABLES.STATS_EFFECTIVE_VOLUME") +
                " (kg)",
              data: volData,
              backgroundColor: "rgba(254, 144, 0, 0.4)",
              borderColor: "#fe9000",
              borderWidth: 1,
              borderRadius: 4,
              yAxisID: "y",
            },
            {
              type: "line",
              label: this.translate.instant("TABLES.STATS_AVG_RIR"),
              data: rirData,
              borderColor: "#3880ff",
              backgroundColor: "transparent",
              borderWidth: 3,
              pointRadius: 4,
              tension: 0.3,
              yAxisID: "y1",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: { color: "rgba(255,255,255,0.7)", font: { size: 10 } },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  if (ctx.datasetIndex === 0)
                    return ` ${this.translate.instant(
                      "TABLES.STATS_VOLUME",
                    )}: ${ctx.raw} kg`;
                  return ` ${this.translate.instant("TABLES.STATS_AVG_RIR")}: ${
                    ctx.raw
                  }`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "rgba(255,255,255,0.5)" },
            },
            y: {
              position: "left",
              title: {
                display: true,
                text: "kg",
                color: "rgba(255,255,255,0.3)",
              },
              ticks: { color: "rgba(255,255,255,0.5)" },
            },
            y1: {
              position: "right",
              reverse: true, // RIR bajo es más intenso
              title: {
                display: true,
                text: "RIR",
                color: "rgba(255,255,255,0.3)",
              },
              grid: { drawOnChartArea: false },
              min: 0,
              ticks: { color: "rgba(56, 128, 255, 0.8)" },
            },
          },
        },
      });
    }
  }

  // --- Chart: Progression (Weight and Reps of Selected/Best Set) ---
  private buildProgressionChart(data: SessionData[]) {
    const ctx = this.progressionCanvas.nativeElement.getContext("2d");
    const labels = data.map((h) =>
      this.translate.instant("TABLES.STATS_MICROCYCLE", { n: h.splitIndex }),
    );

    let weightData: (number | null)[] = [];
    let repsData: (number | null)[] = [];

    // Serie específica (1, 2, 3...)
    weightData = data.map((h) => {
      const s = h.sets[this.selectedSetIndex];
      if (!s) return null;
      if (this.isCardio) return s.velocity || 0;
      if (this.isIsometric) return s.timeSeconds ? s.timeSeconds / 60 : 0;
      return s.weight || 0;
    });
    repsData = data.map((h) => {
      const s = h.sets[this.selectedSetIndex];
      if (!s) return null;
      return this.isCardio
        ? s.timeSeconds
          ? s.timeSeconds / 60
          : 0
        : s.reps || 0;
    });

    const yUnit = this.isCardio ? "km/h" : this.isIsometric ? "min" : "kg";
    const repsUnit = this.isCardio ? "min" : "reps";

    const primaryLabel = this.isCardio
      ? this.translate.instant("TABLES.STATS_SPEED")
      : this.isIsometric
      ? this.translate.instant("TABLES.STATS_TIME")
      : this.translate.instant("TABLES.STATS_WEIGHT") + " (kg)";

    const datasets: any[] = [
      {
        label: primaryLabel,
        data: weightData as any,
        borderColor: "#fe9000",
        backgroundColor: "rgba(254, 144, 0, 0.12)",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#fe9000",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        spanGaps: true,
        yAxisID: "y",
      },
    ];

    // Isométrico: una sola serie (tiempo), sin segunda métrica.
    if (!this.isIsometric) {
      datasets.push({
        label: this.isCardio
          ? this.translate.instant("TABLES.STATS_TIME")
          : this.translate.instant("TABLES.STATS_REPS"),
        data: repsData as any,
        borderColor: "#3880ff",
        backgroundColor: "rgba(56, 128, 255, 0.05)",
        borderWidth: 2,
        borderDash: [5, 4],
        tension: 0.3,
        fill: false,
        pointBackgroundColor: "#3880ff",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 5,
        spanGaps: true,
        yAxisID: "y1",
      });
    }

    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: { color: "rgba(255,255,255,0.7)", font: { size: 10 } },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const v = ctx.raw as number;
                if (v == null) return "";
                if (ctx.datasetIndex === 0)
                  return ` ${
                    this.isCardio
                      ? this.translate.instant("TABLES.STATS_SPEED")
                      : this.translate.instant("TABLES.STATS_WEIGHT")
                  }: ${v} ${yUnit}`;
                return ` ${
                  this.isCardio
                    ? this.translate.instant("TABLES.STATS_TIME")
                    : this.translate.instant("TABLES.STATS_REPS")
                }: ${v} ${repsUnit}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "rgba(255,255,255,0.5)" },
          },
          y: {
            position: "left",
            ticks: { color: "rgba(255,255,255,0.5)" },
          },
          y1: {
            position: "right",
            grid: { drawOnChartArea: false },
            ticks: { color: "rgba(56, 128, 255, 0.8)" },
          },
        },
      },
    });
  }

  public async showNoteAlert(
    notes: string,
    title: string = this.translate.instant("NOTES.TITLE"),
  ) {
    const alertOptions: AlertOptions = {
      header: title,
      message: notes,
      buttons: [this.translate.instant("COMMON.OK")],
      cssClass: "notes-alert",
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  // --- Helpers ---

  public getDiffIcon(diff: number): string {
    if (diff > 0) return "trending-up-outline";
    if (diff < 0) return "trending-down-outline";
    return "remove-outline";
  }

  public getDiffClass(diff: number, inverse: boolean = false): string {
    if (diff === 0) return "neutral";
    const positive = diff > 0;
    if (inverse) return positive ? "negative" : "positive"; // for RIR: lower is better
    return positive ? "positive" : "negative";
  }

  public formatPerformedRir(rir: unknown): string {
    return formatRirValue(rir);
  }

  public formatSeconds(seconds: number): string {
    return formatSecondsAsTime(seconds || 0);
  }

  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  private isExerciseStarted(ex: CustomExercise): boolean {
    return (
      ex.sets &&
      ex.sets.some(
        (s) =>
          s.doned ||
          (s.weight > 0 && s.reps > 0) ||
          (s.velocity && s.velocity > 0) ||
          (s.distance && s.distance > 0) ||
          parseTimeToSeconds(s.time) > 0,
      )
    );
  }

  private getBestSet(sets: ISet[]): ISet | null {
    if (!sets || sets.length === 0) return null;
    return sets.reduce((prev, curr) => {
      if (this.isCardio) {
        const prevV = prev ? prev.velocity || 0 : 0;
        const currV = curr ? curr.velocity || 0 : 0;
        return currV >= prevV ? curr : prev;
      } else if (this.isIsometric) {
        const prevT = prev ? parseTimeToSeconds(prev.time) : 0;
        const currT = curr ? parseTimeToSeconds(curr.time) : 0;
        return currT >= prevT ? curr : prev;
      } else {
        const prevW = prev ? prev.weight || 0 : 0;
        const currW = curr ? curr.weight || 0 : 0;
        return currW >= prevW ? curr : prev;
      }
    }, sets[0]);
  }

  private calculateVolume(sets: ISet[]): number {
    return sets
      ? sets.reduce((acc, s) => acc + (s.weight || 0) * (s.reps || 0), 0)
      : 0;
  }

  private calculateVolumeWithSubSeries(sets: ISet[]): number {
    let total = 0;
    sets.forEach((s) => {
      // Main set
      total += (s.weight || 0) * (s.reps || 0);
      // Drop set sub-series
      if (s.dropSetSeries && s.dropSetSeries.length > 0) {
        s.dropSetSeries.forEach((ds) => {
          total += (ds.weight || 0) * (ds.reps || 0);
        });
      }
      // Rest pause sub-series
      if (s.restPauseSeries && s.restPauseSeries.length > 0) {
        s.restPauseSeries.forEach((rp) => {
          total += (rp.weight || 0) * (rp.reps || 0);
        });
      }
    });
    return total;
  }

  private calculate1RM(weight: number, reps: number): number {
    if (reps <= 0) return 0;
    if (reps === 1) return weight;
    return weight * (1 + reps / 30);
  }
}
