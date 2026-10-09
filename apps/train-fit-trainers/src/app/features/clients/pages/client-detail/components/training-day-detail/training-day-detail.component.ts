import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { formatSoreness } from 'src/app/core/constants/soreness';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { CompletedWorkoutEntry } from '../../models/client-detail.model';
import {
  DayExerciseRow,
  DayWorkoutSource,
  ProgressDelta,
  buildExerciseRows,
  formatBestSet,
  formatDelta,
} from './training-day-detail.util';

// Mismo shape que ProjectedDay en training-calendar.component.ts (no se
// exporta desde ahí — se replica aquí tal cual, igual que ese fichero ya
// declara su propia copia local en vez de importarla de client-detail.page).
export interface DayProjection {
  isPlannedRestDay: boolean;
  name: string;
  phaseName: string | null;
}

interface WorkoutDaySummary {
  workout: CompletedWorkoutEntry;
  splitLabel: string;
  completionPercentage: number | null;
  volume: number;
  duration: string | null;
  sorenessText: string;
  clientNote: string;
  exercises: DayExerciseRow[];
  hasProgress: boolean;
}

// 2026-09 (día suelto) — ficha de UN día, alternativa a la comparativa por
// rango cuando el entrenador toca un solo día en <app-training-calendar>.
// 2026-10 — con el detalle de lo que hizo: ejercicio a ejercicio, cada serie
// hecha junto a lo pautado, la mejor serie frente a la vez anterior que hizo
// ese ejercicio y las notas del cliente (training-day-detail.util.ts).
// Todo sale de datos que el padre YA tiene cargados (completedWorkouts) —
// sin llamada a red propia.
@Component({
  selector: 'app-training-day-detail',
  templateUrl: './training-day-detail.component.html',
  styleUrls: ['./training-day-detail.component.scss'],
})
export class TrainingDayDetailComponent implements OnChanges {
  @Input() public date: string | null = null;
  @Input() public workouts: CompletedWorkoutEntry[] = [];
  // Todas las sesiones hechas del cliente: de aquí sale "la vez anterior".
  @Input() public history: CompletedWorkoutEntry[] = [];
  @Input() public projectedDay: DayProjection | null = null;
  @Output() public close = new EventEmitter<void>();

  // Campo, no getter: el *ngFor de la plantilla no lleva trackBy, así que una
  // referencia nueva en cada ciclo de detección de cambios (lo que hace un
  // getter que mapea `workouts`) hace que Angular destruya y recree las
  // tarjetas en cada ciclo — se recalcula solo cuando `workouts` cambia de
  // verdad.
  public summaries: WorkoutDaySummary[] = [];

  // Ejercicios plegados (por key). Por defecto, todo desplegado.
  public collapsed = new Set<string>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['workouts'] && !changes['history']) return;
    if (changes['workouts']) this.collapsed.clear();
    const locale = uiLocale();
    const history = this.history as unknown as DayWorkoutSource[];
    this.summaries = this.workouts.map((workout) => {
      const exercises = buildExerciseRows(workout as unknown as DayWorkoutSource, history, locale);
      return {
        workout,
        splitLabel: [workout.tableName, workout.splitName].filter(Boolean).join(' · '),
        completionPercentage: this.completionPercentage(workout),
        volume: this.volume(workout),
        duration: this.duration(workout),
        sorenessText: formatSoreness(workout.sorenessPre),
        clientNote: (workout.clientNotes || '').trim(),
        exercises,
        hasProgress: exercises.some((exercise) => !!exercise.progress),
      };
    });
  }

  // Misma fórmula que completedDaysMap en client-detail.page.ts — una serie
  // sin rango prescrito (expectedReps) no es incumplimiento, es un dato que
  // no aplica, así que no cuenta ni en el numerador ni en el denominador.
  private completionPercentage(workout: CompletedWorkoutEntry): number | null {
    const sets = (workout.exercises || []).flatMap((exercise) => exercise.sets || []);
    const measurable = sets.filter((set) => set.expectedReps?.length);
    if (!measurable.length) return null;
    const doned = measurable.filter((set) => set.doned).length;
    return Math.round((doned / measurable.length) * 100);
  }

  // Peso × repeticiones de lo REALMENTE hecho (series marcadas), sin
  // ponderar por RIR ni nada más.
  private volume(workout: CompletedWorkoutEntry): number {
    const sets = (workout.exercises || []).flatMap((exercise) => exercise.sets || []);
    return sets
      .filter((set) => set.doned)
      .reduce((acc, set) => acc + (set.weight || 0) * (set.reps || 0), 0);
  }

  // Mismo cálculo que workoutDuration en client-detail.page.ts.
  private duration(workout: CompletedWorkoutEntry): string | null {
    if (!workout.startedAt || !workout.date) return null;
    const ms = new Date(workout.date).getTime() - new Date(workout.startedAt).getTime();
    if (ms <= 0) return null;
    const totalMinutes = Math.round(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  }

  public trackBySummary(_index: number, summary: WorkoutDaySummary): string {
    return summary.workout._id;
  }

  public trackByKey(_index: number, row: DayExerciseRow): string {
    return row.key;
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public isCollapsed(row: DayExerciseRow): boolean {
    return this.collapsed.has(row.key);
  }

  public toggle(row: DayExerciseRow): void {
    if (this.collapsed.has(row.key)) this.collapsed.delete(row.key);
    else this.collapsed.add(row.key);
  }

  public delta(progress: ProgressDelta): string {
    return formatDelta(progress, uiLocale());
  }

  public previousLabel(progress: ProgressDelta): string {
    return formatBestSet(progress.previous, uiLocale());
  }
}
