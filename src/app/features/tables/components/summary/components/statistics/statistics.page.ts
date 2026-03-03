import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AlertOptions, NavController } from '@ionic/angular';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Set as ISet } from 'src/app/core/models/set';
import { TableService } from 'src/app/core/services/table/table.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

Chart.register(...registerables);

interface SubSerie {
  reps?: number;
  weight?: number;
  rir?: number;
}

interface SessionSet {
  weight?: number;
  reps?: number;
  rir?: string | number;
  velocity?: number;
  timeMin?: number;
  timeSec?: number;
  isDropSet: boolean;
  isRestPause: boolean;
  isFail: boolean;
  restPause?: number;
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
  totalTimeMin: number;
  totalTimeSec: number;
  isCardio: boolean;
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
}

interface CalendarDay {
  day: number | string;
  date: string;
  workoutNames: string[];
  workouts: Array<{ name: string; color: string }>;
  completed: boolean;
  inactive: boolean;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit, OnDestroy {
  @ViewChild('progressionCanvas') progressionCanvas: ElementRef;

  public table: Table;

  // Selectors Data
  public workouts: Workout[] = [];
  public exercises: CustomExercise[] = [];

  // Selection State
  public selectedWorkoutName: string = '';
  public selectedExerciseId: string | null = null;
  public selectedExerciseName: string | null = null;
  public selectedSetIndex: number = 0; // 0 significa "Serie 1"
  public availableSetOptions: number[] = [];

  // Chart State
  public chart: Chart | null = null;
  public chartMode: 'evolution' | 'volume' = 'evolution'; // evolution (series) o volume (efectivo/RIR)

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

  // Metrics
  public metrics = {
    totalVolume: 0,
    max1RM: 0,
  };
  public personalRecord = 0;
  public workoutCompletionCount = 0;
  public isCardio: boolean = false;

  // Calendar State
  public calendarCurrentDate: Date = new Date();
  public calendarDays: CalendarDay[] = [];
  public monthYearString: string = '';
  public hasCompletedWorkouts: boolean = false;
  public uniqueWorkoutTypes: Array<{ name: string; color: string }> = [];

  // Data structures for efficient lookup
  private workoutMap: Map<string, string[]> = new Map();
  private workoutColors: Map<string, string> = new Map();

  private readonly SET_COLORS = [
    '#fe9000',
    '#d4af37',
    '#3880ff',
    '#2dd36f',
    '#eb445a',
    '#a78bfa',
    '#ffc409',
    '#00d98b',
    '#4a9eff',
    '#ffd359',
  ];

  private availableColors = [
    '#fe9000',
    '#3880ff',
    '#2dd36f',
    '#ffd359',
    '#ffc455',
    '#eb445a',
    '#a78bfa',
    '#00d98b',
    '#ffc409',
    '#4a9eff',
  ];
  public weekDaysHeader = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  constructor(
    private tableService: TableService,
    private navCtrl: NavController,
    private ionicUtilService: IonicUtilService
  ) {}

  ngOnInit() {
    this.table = this.tableService.currentTable();
    if (this.table && this.table.splits) {
      this.extractWorkouts();
      this.preProcessWorkoutData();
      this.updateCalendarDisplay();
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  public goBack() {
    this.navCtrl.back();
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
      a.name.localeCompare(b.name)
    );
  }

  private updateCalendarDisplay() {
    this.generateMonthYearString();
    this.generateCalendarDays();
    this.hasCompletedWorkouts = this.calendarDays.some((d) => d.completed);
  }

  private generateMonthYearString() {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    this.monthYearString = `${
      months[this.calendarCurrentDate.getMonth()]
    } ${this.calendarCurrentDate.getFullYear()}`;
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
        day: '',
        date: '',
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
        color: this.workoutColors.get(name) || '#ff6b35',
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
      1
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
      this.selectedExerciseName = exercise.exercise?.name || 'Ejercicio';
      this.selectedSetIndex = 0; // Reset a primera serie
      this.chartMode = 'evolution'; // Default mode
      this.generateHistoryData();
    }
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
        (w) => w.name === this.selectedWorkoutName
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
      (e) => e._id === this.selectedExerciseId
    );
    const targetExDefId = targetExDef?.exercise?._id;
    if (!targetExDefId) return;

    this.isCardio = !!targetExDef?.exercise?.isCardio;

    this.table.splits.forEach((split, index) => {
      const workout = split.workouts.find(
        (w) => w.name === this.selectedWorkoutName
      );
      if (workout && workout.date) {
        const targetEx = workout.exercises.find(
          (e) => e.exercise?._id === targetExDefId
        );
        if (targetEx && this.isExerciseStarted(targetEx)) {
          const filteredSets = targetEx.sets.filter(
            (s) =>
              s.doned ||
              (s.weight > 0 && s.reps > 0) ||
              (s.velocity && s.velocity > 0) ||
              (s.timeMin && s.timeMin > 0)
          );

          // Build SessionSet array with sub-series
          const sessionSets: SessionSet[] = filteredSets.map((s) => ({
            weight: s.weight || 0,
            reps: s.reps || 0,
            rir: s.rir !== undefined && s.rir !== null ? s.rir : '-',
            velocity: s.velocity || 0,
            timeMin: s.timeMin || 0,
            timeSec: s.timeSec || 0,
            isDropSet: s.drop === true,
            isRestPause: !!(s.restPause && s.restPause > 0),
            isFail: s.rir === -1,
            dropSeries: s.dropSetSeries || [],
            restPauseSeries: s.restPauseSeries || [],
          }));

          // Real volume: base + all DS/RP sub-series
          const volumeBase = this.calculateVolume(filteredSets);
          const volumeReal = this.calculateVolumeWithSubSeries(filteredSets);

          const bestSet = this.getBestSet(targetEx.sets);
          const totalTimeMin = sessionSets.reduce(
            (acc, s) => acc + (s.timeMin || 0),
            0
          );
          const totalTimeSec = sessionSets.reduce(
            (acc, s) => acc + (s.timeSec || 0),
            0
          );
          const maxV = Math.max(...sessionSets.map((s) => s.velocity || 0), 0);

          // Average RIR (only numeric, non-fail)
          const rirSets = sessionSets.filter(
            (s) => typeof s.rir === 'number' && (s.rir as number) >= 0
          );
          const avgRir =
            rirSets.length > 0
              ? rirSets.reduce((acc, s) => acc + (s.rir as number), 0) /
                rirSets.length
              : -1;

          // Calculate Effective Volume
          let effectiveVolume = 0;
          if (!this.isCardio) {
            sessionSets.forEach((s) => {
              const weight = s.weight || 0;
              const reps = s.reps || 0;
              let factor = 0.5; // Default for RIR 4+ or no RIR

              if (s.isFail || s.rir === 0 || s.rir === 1) factor = 1.0;
              else if (s.rir === 2 || s.rir === 3) factor = 0.8;

              effectiveVolume += weight * reps * factor;
            });
          }

          const dropSetCount = sessionSets.filter((s) => s.isDropSet).length;
          const restPauseCount = sessionSets.filter(
            (s) => s.isRestPause
          ).length;
          let sessionMax1RM = 0;
          if (!this.isCardio) {
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
            totalTimeMin,
            totalTimeSec,
            isCardio: this.isCardio,
            notes: targetEx.notes || '',
            avgRir,
            minRir:
              rirSets.length > 0
                ? Math.min(...rirSets.map((s) => s.rir as number))
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
        ...this.historyData.map((h) => h.maxVelocity)
      );
      this.metrics.max1RM = this.historyData.reduce(
        (acc, h) => acc + h.totalTimeMin + h.totalTimeSec / 60,
        0
      );
      this.metrics.totalVolume = this.historyData.length;
    } else {
      this.personalRecord = Math.max(
        ...this.historyData.map((h) => h.maxWeight)
      );

      let peak1RM = 0;
      this.historyData.forEach((session) => {
        session.sets.forEach((set) => {
          if (set.weight && set.reps) {
            const current1RM = this.calculate1RM(
              set.weight,
              set.reps as number
            );
            if (current1RM > peak1RM) peak1RM = current1RM;
          }
        });
      });
      this.metrics.max1RM = peak1RM;
      this.metrics.totalVolume = this.historyData.reduce(
        (acc, h) => acc + (h.volume || 0),
        0
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

    if (this.chartMode === 'evolution') {
      this.buildProgressionChart(data);
    } else {
      this.buildEffectiveVolumeChart(data);
    }
  }

  private buildEffectiveVolumeChart(data: SessionData[]) {
    const ctx = this.progressionCanvas.nativeElement.getContext('2d');
    const labels = data.map((h) => `M${h.splitIndex}`);

    const volData = data.map((h) => h.effectiveVolume);
    const rirData = data.map((h) => (h.avgRir >= 0 ? h.avgRir : null));

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Vol. Efectivo (kg)',
            data: volData,
            backgroundColor: 'rgba(254, 144, 0, 0.4)',
            borderColor: '#fe9000',
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: 'y',
          },
          {
            type: 'line',
            label: 'RIR Medio',
            data: rirData,
            borderColor: '#3880ff',
            backgroundColor: 'transparent',
            borderWidth: 3,
            pointRadius: 4,
            tension: 0.3,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: 'rgba(255,255,255,0.7)', font: { size: 10 } },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.datasetIndex === 0) return ` Volumen: ${ctx.raw} kg`;
                return ` RIR Medio: ${ctx.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: 'rgba(255,255,255,0.5)' },
          },
          y: {
            position: 'left',
            title: {
              display: true,
              text: 'kg',
              color: 'rgba(255,255,255,0.3)',
            },
            ticks: { color: 'rgba(255,255,255,0.5)' },
          },
          y1: {
            position: 'right',
            reverse: true, // RIR bajo es más intenso
            title: {
              display: true,
              text: 'RIR',
              color: 'rgba(255,255,255,0.3)',
            },
            grid: { drawOnChartArea: false },
            min: 0,
            ticks: { color: 'rgba(56, 128, 255, 0.8)' },
          },
        },
      },
    });
  }

  // --- Chart: Progression (Weight and Reps of Selected/Best Set) ---
  private buildProgressionChart(data: SessionData[]) {
    const ctx = this.progressionCanvas.nativeElement.getContext('2d');
    const labels = data.map((h) => `Microciclo ${h.splitIndex}`);

    let weightData: (number | null)[] = [];
    let repsData: (number | null)[] = [];

    // Serie específica (1, 2, 3...)
    weightData = data.map((h) => {
      const s = h.sets[this.selectedSetIndex];
      if (!s) return null;
      return this.isCardio ? s.velocity || 0 : s.weight || 0;
    });
    repsData = data.map((h) => {
      const s = h.sets[this.selectedSetIndex];
      if (!s) return null;
      return this.isCardio ? s.timeMin || 0 : s.reps || 0;
    });

    const yUnit = this.isCardio ? 'km/h' : 'kg';
    const repsUnit = this.isCardio ? 'min' : 'reps';

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: this.isCardio ? 'Velocidad' : 'Peso (kg)',
            data: weightData as any,
            borderColor: '#fe9000',
            backgroundColor: 'rgba(254, 144, 0, 0.12)',
            borderWidth: 3,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#fe9000',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            spanGaps: true,
            yAxisID: 'y',
          },
          {
            label: this.isCardio ? 'Tiempo' : 'Reps',
            data: repsData as any,
            borderColor: '#3880ff',
            backgroundColor: 'rgba(56, 128, 255, 0.05)',
            borderWidth: 2,
            borderDash: [5, 4],
            tension: 0.3,
            fill: false,
            pointBackgroundColor: '#3880ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 1,
            pointRadius: 3,
            pointHoverRadius: 5,
            spanGaps: true,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'rgba(255,255,255,0.7)',
              font: { family: 'Outfit', size: 10 },
              usePointStyle: true,
              padding: 12,
              boxWidth: 8,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(18,18,18,0.96)',
            titleColor: '#fe9000',
            bodyColor: '#fff',
            borderColor: 'rgba(254,144,0,0.35)',
            borderWidth: 1,
            cornerRadius: 8,
            titleFont: { family: 'Outfit', size: 13, weight: 'bold' },
            bodyFont: { family: 'Outfit', size: 12 },
            padding: 12,
            boxPadding: 5,
            callbacks: {
              label: (ctx) => {
                const v = ctx.raw as number;
                if (v == null) return '';
                if (ctx.datasetIndex === 0)
                  return ` ${
                    this.isCardio ? 'Velocidad' : 'Peso'
                  }: ${v} ${yUnit}`;
                return ` ${
                  this.isCardio ? 'Tiempo' : 'Reps'
                }: ${v} ${repsUnit}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: {
              color: 'rgba(255,255,255,0.6)',
              font: { family: 'Outfit', size: 10 },
            },
          },
          y: {
            position: 'left',
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: {
              color: 'rgba(255,255,255,0.6)',
              font: { family: 'Outfit', size: 10 },
              callback: (v) => `${v} ${yUnit}`,
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: 'rgba(56,128,255,0.6)',
              font: { family: 'Outfit', size: 10 },
              callback: (v) => `${v} ${repsUnit}`,
            },
          },
        },
        animation: { duration: 900, easing: 'easeInOutQuart' },
      },
    });
  }

  public async showNoteAlert(notes: string, title: string = 'Nota') {
    const alertOptions: AlertOptions = {
      header: title,
      message: notes,
      buttons: ['OK'],
      cssClass: 'notes-alert',
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  // --- Helpers ---

  public getDiffIcon(diff: number): string {
    if (diff > 0) return 'trending-up-outline';
    if (diff < 0) return 'trending-down-outline';
    return 'remove-outline';
  }

  public getDiffClass(diff: number, inverse: boolean = false): string {
    if (diff === 0) return 'neutral';
    const positive = diff > 0;
    if (inverse) return positive ? 'negative' : 'positive'; // for RIR: lower is better
    return positive ? 'positive' : 'negative';
  }

  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private isExerciseStarted(ex: CustomExercise): boolean {
    return (
      ex.sets && ex.sets.some((s) => s.doned || (s.weight > 0 && s.reps > 0))
    );
  }

  private getBestSet(sets: ISet[]): ISet | null {
    if (!sets || sets.length === 0) return null;
    return sets.reduce((prev, curr) => {
      const prevW = prev ? prev.weight || 0 : 0;
      const currW = curr ? curr.weight || 0 : 0;
      return currW >= prevW ? curr : prev;
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
