import { Injectable } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { Set as WorkoutSet } from '../../models/set';
import { Workout } from '../../models/workout';
import { resolveExerciseImageUrl } from '../../utils/exercise-image-url.util';
import { SetService } from '../set/set.service';
import { TableService } from '../table/table.service';
import { WorkoutService } from '../workout/workout.service';
import {
  LiveActivity,
  LiveActivityLabels,
  LiveActivityPendingAction,
  LiveActivitySessionOptions,
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
  private syncing = false;
  private activeWorkoutId: string | null = null;
  // Primer plano de verdad (no solo "proceso vivo"). Ver initialize().
  private appActive = false;

  // Los refrescos van en fila. Cada emisión del workout lanzaba el suyo en
  // paralelo y, al arrancar la app, dos `start` se cruzaban.
  private refreshChain: Promise<unknown> = Promise.resolve();
  private refreshTicket = 0;

  constructor(
    private workoutService: WorkoutService,
    private setService: SetService,
    private tableService: TableService,
    private translate: TranslateService,
  ) {}

  public async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') return;

    // Cada botón de la tarjeta despierta la app en segundo plano (iOS solo
    // deja actualizar la tarjeta desde su proceso). Ese trabajo lo hace entero
    // el nativo sobre el App Group; esta capa se queda quieta hasta que el
    // usuario abre la app: entonces vuelca al backend lo marcado en la
    // tarjeta, actualiza el workout y refresca la tarjeta. Tocarla desde aquí
    // en segundo plano (abrirla, sincronizar, llamar al backend) era lo que se
    // cruzaba con los botones y la dejaba bloqueada.
    void CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      this.appActive = isActive;
      if (isActive) void this.onForeground();
    });

    if (await this.isForeground()) await this.syncPendingActions();
  }

  private async isForeground(): Promise<boolean> {
    // Un "no" se vuelve a preguntar: durante el arranque la app puede estar
    // aún inactiva y el aviso de primer plano llegar antes que el listener.
    if (this.appActive) return true;
    try {
      this.appActive = (await CapacitorApp.getState()).isActive;
    } catch {
      this.appActive = true;
    }
    return this.appActive;
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
  public refreshForWorkout(workout: Workout | null): Promise<boolean> {
    const ticket = ++this.refreshTicket;
    const run = this.refreshChain.then(() =>
      // Ya hay otro refresco detrás con un workout más nuevo: este sobra.
      ticket === this.refreshTicket ? this.doRefresh(workout) : this.supported === true,
    );
    this.refreshChain = run.catch(() => undefined);
    return run;
  }

  private async doRefresh(workout: Workout | null): Promise<boolean> {
    if (!(await this.isSupported())) return false;
    // En segundo plano no se toca nada (ver initialize): al volver a primer
    // plano, onForeground repite este refresco con el workout del momento.
    if (!(await this.isForeground())) return true;

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
    // (entrenamiento terminado o completado desde la propia notificación). El
    // nativo decide solo qué serie enseña: la primera sin hacer.
    if (!items.length || items.every((item) => item.doned)) {
      await this.end();
      return true;
    }

    const options: LiveActivitySessionOptions = {
      workoutId: workout._id,
      workoutName: workout.name || (await this.text('WORKOUT_NOTIFICATION.WORKOUT')),
      items,
      labels: await this.labels(),
    };
    // startedAt real del workout para que el cronómetro de la pantalla de
    // bloqueo no se reinicie al reabrir la app a mitad de sesión. Sin él, el
    // nativo conserva el de la tarjeta viva: uno inventado aquí la hacía
    // parecer de otra sesión.
    if (workout.startedAt) {
      options.startedAt = new Date(workout.startedAt).getTime();
    }

    // `start` reutiliza la tarjeta si ya hay una de esta sesión (la app puede
    // estar recién relanzada por un botón de la propia tarjeta), así que
    // pedirlo en cada arranque es seguro. El descarte de publicaciones
    // repetidas lo hace el nativo.
    try {
      if (this.activeWorkoutId !== workout._id) {
        const result = await LiveActivity.start(options);
        // Pospuesta: app en segundo plano y sin tarjeta que reutilizar. Se
        // reintenta al volver a primer plano; mientras, nada de notificación
        // simple, que duplicaría la tarjeta en cuanto se abra.
        if (result.deferred) return true;
        this.activeWorkoutId = workout._id;
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
    if (!(await this.isSupported())) return;
    try {
      await LiveActivity.end();
    } catch {
      // La actividad pudo cerrarla ya el sistema; no hay nada que recuperar.
    }
  }

  private async onForeground(): Promise<void> {
    // Lo marcado en la tarjeta se vuelca dentro del refresco
    // (syncPendingActions), que además reemite el workout ya actualizado.
    await this.refreshForWorkout(this.workoutService.currentWorkout);
  }

  /**
   * Todas las series del workout en orden. Se mandan también las ya hechas: el
   * nativo las necesita para saber cuál es la primera pendiente (la que enseña
   * la tarjeta) y para la barra de progreso.
   */
  private buildItems(workout: Workout): LiveActivitySetItem[] {
    const exercises = workout.exercises || [];
    const items: LiveActivitySetItem[] = [];
    const fallbackName = this.translate.instant('WORKOUT_NOTIFICATION.EXERCISE');

    exercises.forEach((exercise, exerciseIndex) => {
      const sets = [...(exercise.sets || [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
      sets.forEach((set, setIndex) => {
        if (!set._id) return;
        const doned = !!set.doned;
        items.push({
          setId: set._id,
          exerciseName: exercise.exercise?.name || fallbackName,
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
          // null = sin dato («—»). Rellenarlo con 0 hacía que marcar la serie
          // desde la tarjeta guardase un «RIR 0» que nadie había indicado.
          rir: doned ? this.firstRir(set.rir) : this.firstRir(set.expectedRir),
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

  /** Primer valor de RIR, fallo (-1) incluido; `null` si no hay. */
  private firstRir(value?: number | number[] | null): number | null {
    if (typeof value === 'number') return value;
    if (!Array.isArray(value)) return null;
    const found = value.find((v) => typeof v === 'number');
    return found === undefined ? null : found;
  }

  private firstExpectedValue(values?: number[]): number | null {
    if (!values || !values.length) return null;
    const value = values.find((v) => v !== null && v !== undefined && v !== -1);
    return value === undefined ? null : value;
  }

  // translate.get espera a que carguen las traducciones; instant devolvía
  // la clave si la app acababa de arrancar (p. ej. relanzada por un botón).
  private async labels(): Promise<LiveActivityLabels> {
    const keys = {
      exercise: 'WORKOUT_NOTIFICATION.EXERCISE',
      set: 'WORKOUT_NOTIFICATION.SET_LABEL',
      done: 'WORKOUT_NOTIFICATION.SET_DONE',
      fail: 'RIR.FAIL',
      weight: 'WORKOUT_NOTIFICATION.UNIT_WEIGHT',
      reps: 'WORKOUT_NOTIFICATION.UNIT_REPS',
      rir: 'WORKOUT_NOTIFICATION.UNIT_RIR',
    };
    const texts: Record<string, string> = await firstValueFrom(
      this.translate.get(Object.values(keys)),
    );
    return {
      exercise: texts[keys.exercise],
      set: texts[keys.set],
      done: texts[keys.done],
      fail: texts[keys.fail],
      weight: texts[keys.weight],
      reps: texts[keys.reps],
      rir: texts[keys.rir],
    };
  }

  private text(key: string): Promise<string> {
    return firstValueFrom(this.translate.get(key));
  }

  /** @returns `true` si aplicó alguna acción (y por tanto reemitió el workout). */
  private async syncPendingActions(): Promise<boolean> {
    if (this.syncing || !(await this.isForeground())) return false;
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
    const failed = new Set<string>();
    for (const action of lastBySet.values()) {
      const result = await this.persistAction(updatedWorkout, action);
      if (result === 'failed') {
        failed.add(action.setId);
      } else if (result) {
        updatedWorkout = result;
        applied = true;
      }
    }

    // Solo se borran las acciones volcadas (o que ya no aplican): las que han
    // llegado mientras tanto y las que han fallado por red se quedan para el
    // siguiente intento.
    await LiveActivity.clearPendingActions({
      ids: actions.filter((action) => !failed.has(action.setId)).map((action) => action.id),
    });
    if (!applied) return false;

    this.workoutService.setCurrentWorkout = updatedWorkout;
    this.syncTable(updatedWorkout);
    return true;
  }

  /**
   * @returns el workout actualizado, `null` si no había nada que guardar o
   * `'failed'` si el backend no lo aceptó.
   */
  private async persistAction(
    workout: Workout,
    action: LiveActivityPendingAction,
  ): Promise<Workout | null | 'failed'> {
    let target: WorkoutSet | undefined;
    for (const exercise of workout.exercises || []) {
      target = (exercise.sets || []).find((set) => set._id === action.setId);
      if (target) break;
    }
    if (!target) return null;

    const rir = action.rir === null || action.rir === undefined ? null : [action.rir];
    const sameDone = !!target.doned === action.doned;
    // Los steppers mandan los valores de la serie en curso, así que marcarla
    // también guarda kg/reps/rir aunque el `doned` no cambie.
    const sameValues =
      !action.doned ||
      ((target.reps ?? 0) === action.reps &&
        (target.weight ?? 0) === action.weight &&
        this.firstRir(target.rir) === action.rir);
    if (sameDone && sameValues) return null;

    // Al desmarcar solo se quita el `doned` (el backend limpia `donedAt`);
    // los valores registrados se conservan. El RIR va como en la app: array,
    // o null explícito para «sin dato».
    const updated: WorkoutSet = action.doned
      ? {
          ...target,
          doned: true,
          reps: action.reps,
          weight: action.weight,
          rir,
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
      return 'failed';
    }
  }

  // La pantalla del entrenamiento toma el workout de la tabla al abrirse
  // (current-workout.page#initVariables). Sin esto, abrirla después de
  // marcar series desde la tarjeta las devolvía a «sin hacer».
  private syncTable(workout: Workout): void {
    const table = this.tableService.tableInUse;
    if (!table?.splits) return;
    let found = false;
    for (const split of table.splits) {
      const index = (split.workouts || []).findIndex((w) => w._id === workout._id);
      if (index !== -1) {
        split.workouts[index] = { ...workout };
        found = true;
      }
    }
    if (found) this.tableService.setCurrentTable = table;
  }
}
