import { Injectable } from '@angular/core';
import { ActionPerformed, LocalNotifications } from '@capacitor/local-notifications';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { CustomExercise } from '../../models/customExercise';
import { Set as WorkoutSet } from '../../models/set';
import { Workout } from '../../models/workout';
import { LiveActivityService } from '../live-activity/live-activity.service';
import { NavigationService } from '../util/navigation.service';
import { RestTimerService } from '../rest-timer/rest-timer.service';
import { SetService } from '../set/set.service';
import { WorkoutService } from '../workout/workout.service';

const SET_NOTIFICATION_ID = 888888;
const SET_ACTION_TYPE_ID = 'CURRENT_SET_ACTIONS';

interface PendingSetInfo {
  exercise: CustomExercise;
  set: WorkoutSet;
  exerciseIndex: number;
  totalExercises: number;
  /** Posición del set dentro del ejercicio, en el orden real (`order`). */
  setNumber: number;
}

/**
 * Notificación local con el siguiente set pendiente del entrenamiento
 * activo, con acciones "Hecha" (marca el set con sus valores planificados
 * y avanza) y "Saltar" (avanza sin marcarlo, solo para esta sesión). No es
 * una Live Activity: sin steppers ni edición de valores en la propia
 * notificación — para ajustar peso/reps hay que abrir la app.
 */
@Injectable({ providedIn: 'root' })
export class WorkoutNotificationService {
  // Sets saltados en esta sesión — en memoria, no persistido: al volver a
  // abrir la app o reiniciarla, un set saltado vuelve a aparecer como
  // pendiente (saltar no es lo mismo que descartar el set para siempre).
  private readonly skippedSetIds = new Set<string>();
  private listenerRegistered = false;
  private permissionRequested = false;
  // En fila, como en LiveActivityService: dos refrescos cruzados podían
  // dejar programada la notificación de un set ya superado.
  private refreshChain: Promise<unknown> = Promise.resolve();

  constructor(
    private workoutService: WorkoutService,
    private setService: SetService,
    private restTimerService: RestTimerService,
    private navigationService: NavigationService,
    private liveActivityService: LiveActivityService,
    private translate: TranslateService,
  ) {}

  public async initialize(): Promise<void> {
    if (this.listenerRegistered) return;
    this.listenerRegistered = true;

    await LocalNotifications.registerActionTypes({
      types: [
        {
          id: SET_ACTION_TYPE_ID,
          actions: [
            { id: 'done', title: this.translate.instant('WORKOUT_NOTIFICATION.DONE') },
            { id: 'skip', title: this.translate.instant('WORKOUT_NOTIFICATION.SKIP') },
          ],
        },
      ],
    });

    LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
      void this.handleAction(action);
    });
  }

  // Se llama cada vez que cambia el workout activo (arranca uno nuevo, se
  // marca/edita un set desde la propia app, etc.) — mantiene la
  // notificación siempre apuntando al siguiente set pendiente real.
  public refreshForWorkout(workout: Workout | null): Promise<void> {
    const run = this.refreshChain.then(() => this.doRefresh(workout));
    this.refreshChain = run.catch(() => undefined);
    return run;
  }

  private async doRefresh(workout: Workout | null): Promise<void> {
    // Donde hay Live Activity (iOS 17+) manda esa: trae steppers de
    // KG/REPS/RIR y check en la propia pantalla de bloqueo. La notificación
    // simple es el plan B del resto de plataformas.
    if (await this.liveActivityService.refreshForWorkout(workout)) {
      await this.cancel();
      return;
    }

    if (!workout) {
      await this.cancel();
      return;
    }

    const pending = this.findNextPendingSet(workout);
    if (!pending) {
      await this.cancel();
      return;
    }

    // Pedido perezoso — al primer set pendiente real, no al arrancar la
    // app, para no interrumpir con un permiso antes de que tenga sentido.
    if (!this.permissionRequested) {
      this.permissionRequested = true;
      await LocalNotifications.requestPermissions().catch(() => undefined);
    }

    await this.scheduleNotification(workout, pending);
  }

  public async cancel(): Promise<void> {
    await LocalNotifications.cancel({ notifications: [{ id: SET_NOTIFICATION_ID }] });
  }

  private findNextPendingSet(workout: Workout): PendingSetInfo | null {
    const exercises = workout.exercises || [];
    for (let exerciseIndex = 0; exerciseIndex < exercises.length; exerciseIndex++) {
      const exercise = exercises[exerciseIndex];
      const sets = [...(exercise.sets || [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
      const setIndex = sets.findIndex(
        (candidate) => !candidate.doned && !this.skippedSetIds.has(candidate._id || ''),
      );
      if (setIndex !== -1) {
        return {
          exercise,
          set: sets[setIndex],
          exerciseIndex,
          totalExercises: exercises.length,
          setNumber: setIndex + 1,
        };
      }
    }
    return null;
  }

  private async scheduleNotification(workout: Workout, pending: PendingSetInfo): Promise<void> {
    const { exercise, set, exerciseIndex, totalExercises, setNumber } = pending;
    const exerciseName = exercise.exercise?.name || this.translate.instant('WORKOUT_NOTIFICATION.EXERCISE');
    const totalSets = exercise.sets?.length || 0;

    const reps = this.firstExpectedValue(set.expectedReps);
    const rir = this.firstExpectedValue(
      Array.isArray(set.expectedRir) ? set.expectedRir : undefined,
    );

    let target = this.translate.instant('WORKOUT_NOTIFICATION.SET', { current: setNumber, total: totalSets });
    if (reps !== null) target += `: ${reps} reps`;
    if (rir !== null) target += ` · RIR ${rir}`;

    const body = this.translate.instant('WORKOUT_NOTIFICATION.BODY', {
      current: exerciseIndex + 1,
      total: totalExercises,
      name: exerciseName,
      target,
    });
    const attachments = exercise.exercise?.gifUrl
      ? [{ id: 'exercise-image', url: exercise.exercise.gifUrl }]
      : undefined;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: SET_NOTIFICATION_ID,
            title: workout.name || this.translate.instant('WORKOUT_NOTIFICATION.WORKOUT'),
            body,
            actionTypeId: SET_ACTION_TYPE_ID,
            attachments,
            extra: { setId: set._id },
          },
        ],
      });
    } catch {
      // Un adjunto remoto (gifUrl es una URL http, no un archivo local)
      // puede fallar en la creación nativa del attachment — reintenta sin
      // él en vez de dejar al usuario sin notificación.
      if (attachments) {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: SET_NOTIFICATION_ID,
              title: workout.name || this.translate.instant('WORKOUT_NOTIFICATION.WORKOUT'),
              body,
              actionTypeId: SET_ACTION_TYPE_ID,
              extra: { setId: set._id },
            },
          ],
        });
      }
    }
  }

  private firstExpectedValue(values?: number[]): number | null {
    if (!values || !values.length) return null;
    const value = values.find((v) => v !== null && v !== undefined && v !== -1);
    return value === undefined ? null : value;
  }

  private async handleAction(action: ActionPerformed): Promise<void> {
    const workout = this.workoutService.currentWorkout;
    if (!workout) return;

    const setId = (action.notification.extra as { setId?: string } | undefined)?.setId;

    if (setId && action.actionId === 'done') {
      await this.markSetDoneWithPlannedValues(workout, setId);
    } else if (setId && action.actionId === 'skip') {
      this.skippedSetIds.add(setId);
    } else if (action.actionId === 'tap') {
      this.navigationService.goToCurrentWorkout();
    }

    await this.refreshForWorkout(this.workoutService.currentWorkout);
  }

  private async markSetDoneWithPlannedValues(workout: Workout, setId: string): Promise<void> {
    let targetSet: WorkoutSet | undefined;
    for (const exercise of workout.exercises || []) {
      const found = (exercise.sets || []).find((s) => s._id === setId);
      if (found) {
        targetSet = found;
        break;
      }
    }
    if (!targetSet) return;

    const updated: WorkoutSet = {
      ...targetSet,
      doned: true,
      reps: this.firstExpectedValue(targetSet.expectedReps) ?? targetSet.reps,
      rir: Array.isArray(targetSet.expectedRir) ? targetSet.expectedRir : targetSet.rir,
      time: targetSet.expectedTime ?? targetSet.time,
      distance: targetSet.expectedDistance ?? targetSet.distance,
    };

    const saved = await firstValueFrom(this.setService.updateSet(updated));

    const updatedWorkout: Workout = {
      ...workout,
      exercises: workout.exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((s) => (s._id === setId ? saved : s)),
      })),
    };
    this.workoutService.setCurrentWorkout = updatedWorkout;

    if (saved.restSeconds) {
      this.restTimerService.start(workout._id, saved._id || setId, saved.restSeconds);
    }
  }
}
