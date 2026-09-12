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
  private syncing = false;
  private activeWorkoutId: string | null = null;

  constructor(
    private workoutService: WorkoutService,
    private setService: SetService,
  ) {}

  public async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') return;

    // El listener se registra siempre, aunque ahora mismo no haya soporte: el
    // usuario puede encender las actividades en directo con la app abierta.
    // Al volver a primer plano se vuelcan al backend las series confirmadas
    // desde la notificación (todavía no hay botones: no habrá ninguna hasta el
    // paso 2, pero el volcado ya queda montado).
    void CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (isActive) void this.syncPendingActions();
    });

    await this.syncPendingActions();
  }

  public async isSupported(): Promise<boolean> {
    // Solo se cachea el "sí". Un "no" puede ser temporal —el usuario tenía las
    // actividades en directo apagadas y las enciende, o ActivityKit aún no
    // estaba listo al arrancar— y cachearlo dejaba la notificación muerta el
    // resto de la sesión.
    if (this.supported) return true;
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') {
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
      // El signal del workout arranca en null y emite ese null en cuanto la
      // app se lanza — y tocar la notificación (o pulsar uno de sus botones)
      // lanza la app. Cerrar aquí la Live Activity la mataba justo al usarla.
      // Solo se cierra si en esta ejecución ya había un entrenamiento vivo.
      if (this.activeWorkoutId === null) return true;
      await this.end();
      return true;
    }

    // Las series marcadas desde la pantalla de bloqueo pueden estar todavía
    // pendientes de volcar: al arrancar la app el workout aún no estaba
    // cargado y el volcado se saltó. Si se aplica algo, el propio volcado
    // reemite el workout y esta pasada sobra.
    if (await this.syncPendingActions()) return true;

    const items = this.buildItems(workout);
    // Sin series pendientes no hay nada que pilotar desde la notificación
    // (entrenamiento terminado o completado desde la propia notificación).
    const pendingIndex = items.findIndex((item) => !item.doned);
    if (!items.length || pendingIndex === -1) {
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
      // Primera serie sin hacer; el nativo respeta la serie a la que haya
      // navegado el usuario con las flechas si sigue pendiente.
      currentIndex: pendingIndex,
      items,
    };

    // El descarte de publicaciones repetidas lo hace el nativo, que además
    // sabe si la notificación sigue viva: filtrarlo aquí impedía recuperarla
    // cuando el sistema la había cerrado.
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

  /**
   * Todas las series del workout en orden. Se mandan también las ya hechas:
   * el widget navega entre ellas con las flechas y necesita `doned` para
   * pintar el check encendido y poder desmarcarlas.
   */
  private buildItems(workout: Workout): LiveActivitySetItem[] {
    const exercises = workout.exercises || [];
    const items: LiveActivitySetItem[] = [];

    exercises.forEach((exercise, exerciseIndex) => {
      const sets = [...(exercise.sets || [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
      sets.forEach((set, setIndex) => {
        if (!set._id) return;
        const doned = !!set.doned;
        items.push({
          setId: set._id,
          exerciseName: exercise.exercise?.name || 'Ejercicio',
          exerciseIndex: exerciseIndex + 1,
          totalExercises: exercises.length,
          setIndex: setIndex + 1,
          totalSets: sets.length,
          // En una serie hecha se muestra lo que se registró; en una
          // pendiente, lo pautado.
          reps: doned
            ? set.reps ?? 0
            : this.firstExpectedValue(set.expectedReps) ?? set.reps ?? 0,
          weight: set.weight ?? 0,
          rir: doned
            ? this.currentRir(set)
            : this.firstExpectedValue(
                Array.isArray(set.expectedRir) ? set.expectedRir : undefined,
              ) ?? 0,
          doned,
          // gifUrl en BD es una ruta relativa ("/assets/img/exercises/...")
          // resuelta contra un CDN aparte del backend — misma lógica que ya
          // usa SafePipe para pintarla en el resto de la app.
          imageUrl: resolveExerciseImageUrl(exercise.exercise?.gifUrl),
        });
      });
    });

    return items;
  }

  private currentRir(set: WorkoutSet): number {
    if (typeof set.rir === 'number') return set.rir;
    if (Array.isArray(set.rir)) return this.firstExpectedValue(set.rir) ?? 0;
    return 0;
  }

  private firstExpectedValue(values?: number[]): number | null {
    if (!values || !values.length) return null;
    const value = values.find((v) => v !== null && v !== undefined && v !== -1);
    return value === undefined ? null : value;
  }

  /** @returns `true` si aplicó alguna acción (y por tanto reemitió el workout). */
  private async syncPendingActions(): Promise<boolean> {
    if (this.syncing) return false;
    if (!(await this.isSupported())) return false;

    let actions: LiveActivityPendingAction[] = [];
    try {
      actions = (await LiveActivity.getPendingActions()).actions || [];
    } catch {
      return false;
    }
    if (!actions.length) return false;

    const workout = this.workoutService.currentWorkout;
    // Todavía sin workout cargado: las acciones se quedan pendientes y se
    // vuelcan en cuanto llegue (ver refreshForWorkout).
    if (!workout) return false;

    this.syncing = true;
    try {
      return await this.applyPendingActions(workout, actions);
    } catch {
      // Un fallo volcando no puede tumbar el refresco de la notificación.
      return false;
    } finally {
      this.syncing = false;
    }
  }

  private async applyPendingActions(
    workout: Workout,
    actions: LiveActivityPendingAction[],
  ): Promise<boolean> {
    // El usuario puede marcar y desmarcar la misma serie varias veces desde
    // la pantalla de bloqueo: solo cuenta el último estado de cada una.
    const lastBySet = new Map<string, LiveActivityPendingAction>();
    for (const action of actions) {
      if (action.skipped) continue;
      lastBySet.set(action.setId, action);
    }

    let updatedWorkout = workout;
    let applied = false;
    for (const action of lastBySet.values()) {
      const persisted = await this.persistAction(updatedWorkout, action);
      if (persisted) {
        updatedWorkout = persisted;
        applied = true;
      }
    }

    await LiveActivity.clearPendingActions();
    if (!applied) return false;

    this.workoutService.setCurrentWorkout = updatedWorkout;
    return true;
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
    if (!target || !!target.doned === action.doned) return null;

    // Al desmarcar solo se quita el `doned` (el backend limpia `donedAt`);
    // los valores registrados se conservan.
    const updated: WorkoutSet = action.doned
      ? {
          ...target,
          doned: true,
          reps: action.reps,
          weight: action.weight,
          rir: action.rir,
        }
      : { ...target, doned: false };

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
