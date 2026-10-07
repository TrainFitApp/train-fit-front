import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { formatSoreness } from 'src/app/core/constants/soreness';
import { CompletedWorkoutEntry } from '../../models/client-detail.model';

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
  sorenessText: string;
}

// 2026-09 (día suelto) — ficha de UN día, alternativa a la comparativa por
// rango cuando el entrenador toca un solo día en <app-training-calendar>.
// Todo sale de datos que el padre YA tiene cargados (completedWorkouts/
// projectedTrainingDays) — sin llamada a red propia, ver plan de la tarea.
@Component({
  selector: 'app-training-day-detail',
  templateUrl: './training-day-detail.component.html',
  styleUrls: ['./training-day-detail.component.scss'],
})
export class TrainingDayDetailComponent implements OnChanges {
  @Input() public date: string | null = null;
  @Input() public workouts: CompletedWorkoutEntry[] = [];
  @Input() public projectedDay: DayProjection | null = null;
  @Output() public close = new EventEmitter<void>();

  // Campo, no getter: el *ngFor de la plantilla no lleva trackBy, así que una
  // referencia nueva en cada ciclo de detección de cambios (lo que hace un
  // getter que mapea `workouts`) hace que Angular destruya y recree las
  // tarjetas en cada ciclo — se recalcula solo cuando `workouts` cambia de
  // verdad.
  public summaries: WorkoutDaySummary[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['workouts']) return;
    this.summaries = this.workouts.map((workout) => ({
      workout,
      splitLabel: [workout.tableName, workout.splitName].filter(Boolean).join(' · '),
      completionPercentage: this.completionPercentage(workout),
      volume: this.volume(workout),
      sorenessText: formatSoreness(workout.sorenessPre),
    }));
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
  // ponderar por RIR ni nada más — un vistazo simple, no el detalle por
  // ejercicio que ya tiene Estadísticas (app cliente).
  private volume(workout: CompletedWorkoutEntry): number {
    const sets = (workout.exercises || []).flatMap((exercise) => exercise.sets || []);
    return sets
      .filter((set) => set.doned)
      .reduce((acc, set) => acc + (set.weight || 0) * (set.reps || 0), 0);
  }

  public trackBySummary(summary: WorkoutDaySummary): string {
    return summary.workout._id;
  }
}
