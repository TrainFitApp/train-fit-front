import { Injectable } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { firstValueFrom } from 'rxjs';
import { Set as WorkoutSet } from '../../models/set';
import { Workout } from '../../models/workout';
import { resolveExerciseImageUrl } from '../../utils/exercise-image-url.util';
import { SetService } from '../set/set.service';
import { WorkoutService } from '../workout/workout.service';
import {
  LiveActivity,
  LiveActivityPendingAction,
  LiveActivitySetItem,
} from './live-activity.definitions';

/**
 * Live Activity (pantalla de bloqueo / Dynamic Island) con la serie en curso
 * y steppers de KG/REPS/RIR + check, todo pulsable sin abrir la app.
 *
 * Los botones corren en un AppIntent nativo que solo toca el App Group: la
 * serie confirmada queda como "acción pendiente" y se persiste en el backend
 * cuando la app vuelve a primer plano (el webview no está vivo mientras el
 * usuario toca la notificación).
 */
@Injectable({ providedIn: 'root' })
export class LiveActivityService {
  private supported: boolean | null = null;
  private initialized = false;
  private startedAt: number | null = null;
  private activeWorkoutId: string | null = null;

  constructor(
    private workoutService: WorkoutService,
    private setService: SetService,
  ) {}

  public async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    if (!(await this.isSupported())) return;

    // Al volver a primer plano se vuelcan al backend las series que el
    // usuario confirmó desde la pantalla de bloqueo.
    void CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (isActive) void this.syncPendingActions();
    });

    await this.syncPendingActions();
  }

  public async isSupported(): Promise<boolean> {
    if (this.supported !== null) return this.supported;
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') {
      this.supported = false;
      return false;
    }
    try {
      const result = await LiveActivity.isSupported();
      this.supported = result.supported && result.interactive;
    } catch {
      this.supported = false;
    }
    return this.supported;
  }

  /**
   * Sincroniza la Live Activity con el workout activo. Devuelve `false` si la
   * plataforma no la soporta, para que el llamante caiga en la notificación
   * simple.
   */
  public async refreshForWorkout(workout: Workout | null): Promise<boolean> {
    if (!(await this.isSupported())) return false;

    if (!workout) {
      await this.end();
      return true;
    }

    const items = this.buildItems(workout);
    if (!items.length) {
      await this.end();
      return true;
    }

    const isNewWorkout = this.activeWorkoutId !== workout._id;
    if (isNewWorkout || this.startedAt === null) {
      // startedAt real del workout para que el cronómetro de la pantalla de
      // bloqueo no se reinicie al reabrir la app a mitad de sesión.
      this.startedAt = workout.startedAt
        ? new Date(workout.startedAt).getTime()
        : Date.now();
      this.activeWorkoutId = workout._id;
    }

    const options = {
      workoutId: workout._id,
      workoutName: workout.name || 'Entrenamiento',
      startedAt: this.startedAt,
      currentIndex: 0,
      items,
    };

    try {
      if (isNewWorkout) {
        await LiveActivity.start(options);
      } else {
        await LiveActivity.update(options);
      }
    } catch {
      return false;
    }
    return true;
  }

  public async end(): Promise<void> {
    this.activeWorkoutId = null;
    this.startedAt = null;
    if (!(await this.isSupported())) return;
    try {
      await LiveActivity.end();
    } catch {
      // La actividad pudo cerrarla ya el sistema; no hay nada que recuperar.
    }
  }

  /** Series pendientes en orden: la primera es la que muestra el widget. */
  private buildItems(workout: Workout): LiveActivitySetItem[] {
    const exercises = workout.exercises || [];
    const items: LiveActivitySetItem[] = [];

    exercises.forEach((exercise, exerciseIndex) => {
      const sets = [...(exercise.sets || [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
      sets.forEach((set, setIndex) => {
        if (set.doned || !set._id) return;
        items.push({
          setId: set._id,
          exerciseName: exercise.exercise?.name || 'Ejercicio',
          exerciseIndex: exerciseIndex + 1,
          totalExercises: exercises.length,
          setIndex: setIndex + 1,
          totalSets: sets.length,
          reps: this.firstExpectedValue(set.expectedReps) ?? set.reps ?? 0,
          weight: set.weight ?? 0,
          rir: this.firstExpectedValue(
            Array.isArray(set.expectedRir) ? set.expectedRir : undefined,
          ) ?? 0,
          // gifUrl en BD es una ruta relativa ("/assets/img/exercises/...")
          // resuelta contra un CDN aparte del backend — misma lógica que ya
          // usa SafePipe para pintarla en el resto de la app.
          imageUrl: resolveExerciseImageUrl(exercise.exercise?.gifUrl),
        });
      });
    });

    return items;
  }

  private firstExpectedValue(values?: number[]): number | null {
    if (!values || !values.length) return null;
    const value = values.find((v) => v !== null && v !== undefined && v !== -1);
    return value === undefined ? null : value;
  }

  private async syncPendingActions(): Promise<void> {
    if (!(await this.isSupported())) return;

    let actions: LiveActivityPendingAction[] = [];
    try {
      actions = (await LiveActivity.getPendingActions()).actions || [];
    } catch {
      return;
    }
    if (!actions.length) return;

    const workout = this.workoutService.currentWorkout;
    if (!workout) return;

    let updatedWorkout = workout;
    for (const action of actions) {
      if (action.skipped) continue;
      const persisted = await this.persistAction(updatedWorkout, action);
      if (persisted) updatedWorkout = persisted;
    }

    this.workoutService.setCurrentWorkout = updatedWorkout;
    await LiveActivity.clearPendingActions();
  }

  private async persistAction(
    workout: Workout,
    action: LiveActivityPendingAction,
  ): Promise<Workout | null> {
    let target: WorkoutSet | undefined;
    for (const exercise of workout.exercises || []) {
      target = (exercise.sets || []).find((set) => set._id === action.setId);
      if (target) break;
    }
    if (!target || target.doned) return null;

    const updated: WorkoutSet = {
      ...target,
      doned: true,
      reps: action.reps,
      weight: action.weight,
      rir: action.rir,
    };

    try {
      const saved = await firstValueFrom(this.setService.updateSet(updated));
      return {
        ...workout,
        exercises: workout.exercises.map((exercise) => ({
          ...exercise,
          sets: exercise.sets.map((set) => (set._id === action.setId ? saved : set)),
        })),
      };
    } catch {
      return null;
    }
  }
}
