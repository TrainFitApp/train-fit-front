import {
  Component,
  OnDestroy,
  OnInit,
  effect,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertOptions, ModalOptions, PopoverOptions } from '@ionic/angular';
import { Subject, Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout, WorkoutBlock } from 'src/app/core/models/workout';
import {
  groupExercisesByBlock,
  hasRenderableBlocks,
  WorkoutExerciseGroup,
} from 'src/app/core/utils/workout-blocks.util';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import {
  ColorMode,
  ThemeService,
} from 'src/app/core/services/util/theme.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { ExerciseHistoryService } from 'src/app/core/services/exercise-history/exercise-history.service';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTIONS,
} from 'src/app/shared/constants/actions';
import { Theme, THEMES } from 'src/app/shared/models/theme';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';
import { OrderExercisesPage } from '../mesocycle/components/order-exercises/order-exercises.page';
import { WorkoutSummaryModalComponent } from './workout-summary-modal/workout-summary-modal.component';
import {
  WorkoutSummary,
  buildWorkoutSummary,
} from './workout-summary-modal/workout-summary.model';

interface PreserveFinishedWorkoutSplitState {
  tableId: string;
  splitId: string;
  splitIndex: number;
  workoutId: string;
}

@Component({
  selector: 'app-current-workout',
  templateUrl: './current-workout.page.html',
  styleUrls: ['./current-workout.page.scss'],
})
export class CurrentWorkoutPage implements OnInit, OnDestroy {
  public currentWorkout: Workout;
  public previousWorkout: Workout;
  public tableInUse: Table;
  public user: User;

  // TODO: ES NECESARIO ESTO AQUÍ?
  public previousWorkoutDate: Date;

  public loading: boolean;

  // Carousel properties
  public selectedExerciseIndex: number = 0;
  public selectedExercise: CustomExercise;

  public theme: ColorMode;

  private sweetAlertOpened: boolean;
  // Seguimiento de cambios en sets completadas (doned)
  private hasInitializedDoneTracking = false;
  private previousDoneSets = 0;
  private previousTotalSets = 0;
  // Evitar alertes duplicados en ráfaga
  private autoEndScheduled = false;
  private autoEndTimeoutId: any;
  // Guarda persistente hasta que se cierra el alert
  private autoEndTriggered = false;
  private readonly preserveFinishedWorkoutSplitKey =
    'preserveFinishedWorkoutSplit';

  protected readonly GIF_LOCAL_ROUTE_LIGHT =
    '../../../../../assets/img/logo/login_light.svg';

  protected readonly GIF_LOCAL_ROUTE_DARK =
    '../../../../../assets/img/logo/login_dark.svg';

  public THEMES = THEMES;

  // Inyección de servicios con Signals
  private readonly userService = inject(UserService);
  private readonly tableService = inject(TableService);
  private readonly workoutService = inject(WorkoutService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly adMobService = inject(AdMobService);
  private readonly exerciseHistoryService = inject(ExerciseHistoryService);

  constructor(
    private navigationService: NavigationService,
    private customExerciseService: CustomExerciseService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService,
    private themeService: ThemeService
  ) {
    // Effect para el usuario
    effect(() => {
      this.user = this.userService.localUser();
    });

    // Effect para la tabla actual
    effect(() => {
      const resTable = this.tableService.currentTable();
      if (resTable) {
        this.tableInUse = resTable;
        // Solo establecer previousWorkout si aún no se ha establecido
        // para evitar que cambios en la tabla (como actualizar notas)
        // vuelvan a calcular el previousWorkout incorrectamente
        if (!this.previousWorkout && this.currentWorkout) {
          this.setPreviousWorkout();
        }
      }
    });

    // Effect para el workout actual
    effect(
      () => {
        const resCurrentWorkout = this.workoutService.currentWorkoutSignal();
        if (resCurrentWorkout) {
          const isNewWorkout =
            this.currentWorkout?._id !== resCurrentWorkout._id;
          this.currentWorkout = { ...resCurrentWorkout };
          this.syncFullWorkoutWithTable();
          this.evaluateAutoEndOnDoneChange();

          // Recalcular previousWorkout solo si cambió a un workout diferente
          if (isNewWorkout && this.tableInUse) {
            this.setPreviousWorkout();
          }

          this.syncElapsedTimer();
        } else {
          this.stopElapsedTicker();
        }
      },
      { allowSignalWrites: true }
    );
  }

  public ngOnInit(): void {
    this.themeService.theme
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Theme) => (this.theme = res));

    // Suscripciones principales
    this.initVariables();
  }

  public ngOnDestroy(): void {
    // Cancelar todas las suscripciones y timers para evitar múltiples alerts desde instancias previas
    this.destroy$.next();
    this.destroy$.complete();
    if (this.autoEndTimeoutId) {
      clearTimeout(this.autoEndTimeoutId);
      this.autoEndTimeoutId = undefined;
    }
    this.sweetAlertOpened = false;
    this.autoEndTriggered = false;
    this.autoEndScheduled = false;
  }

  public playWorkout(): void {
    const alertOptions = {
      header: this.translate.instant('TABLES.START_WORKOUT_ALT'),
      message: this.translate.instant('TABLES.START_WORKOUT_CONFIRM', { name: this.currentWorkout.name }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('TABLES.START'),
          handler: () => {
            if (this.user?.premium?.entitled) {
              this.startWorkoutFlow();
              return;
            }
            this.adMobService
              .interstitial('start_workout')
              .then(() => {
                this.startWorkoutFlow();
              })
              .catch((error) => {
                console.error('Error al mostrar start_workout interstitial:', error);
              });
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  private startWorkoutFlow(): void {
    const dangling = this.workoutService.getDanglingWorkout(
      this.user.workoutInUse,
      this.currentWorkout._id,
      this.tableInUse
    );

    if (!dangling) {
      this.promptReadinessThenStart();
      return;
    }

    if (!this.workoutService.hasProgress(dangling)) {
      this.stopDanglingWorkout(dangling, () => this.promptReadinessThenStart());
      return;
    }

    this.showResolveDanglingWorkoutAlert(dangling, () =>
      this.promptReadinessThenStart()
    );
  }

  // MVP-trainers F18 — "¿Cómo llegas hoy?" antes de empezar. Opcional y
  // saltable: no bloquea nunca el inicio del entrenamiento. El valor se
  // persiste vía el mismo `modifyWorkout` que ya hace `proceedStartWorkoutFlow`,
  // sin una llamada HTTP adicional.
  private promptReadinessThenStart(): void {
    const inputs: AlertOptions['inputs'] = [1, 2, 3, 4, 5].map((n) => ({
      type: 'radio',
      label: String(n),
      value: n,
    }));

    this.ionicUtilService.showAlert({
      header: this.translate.instant('TABLES.READINESS_TITLE'),
      message: this.translate.instant('TABLES.READINESS_MESSAGE'),
      inputs,
      buttons: [
        {
          text: this.translate.instant('TABLES.SKIP'),
          role: 'cancel',
          handler: () => this.proceedStartWorkoutFlow(),
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (value: number) => {
            this.currentWorkout.readinessPre = value ?? null;
            this.proceedStartWorkoutFlow();
          },
        },
      ],
    });
  }

  // Además de limpiar el startedAt en backend, hay que mutar el objeto local:
  // `dangling` es la misma referencia que vive dentro de tableInUse, y si no
  // se actualiza aquí, retomar ese workout en la misma sesión (sin recargar)
  // seguiría viendo el startedAt viejo y no le asignaría uno nuevo al empezar.
  private stopDanglingWorkout(dangling: Workout, onDone: () => void): void {
    this.workoutService.clearStartedAt(dangling).subscribe(() => {
      dangling.startedAt = null;
      if (this.tableInUse) this.tableService.setCurrentTable = this.tableInUse;
      onDone();
    });
  }

  private showResolveDanglingWorkoutAlert(
    dangling: Workout,
    onResolved: () => void
  ): void {
    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.RESOLVE_PREVIOUS_WORKOUT'),
      message: this.translate.instant('TABLES.RESOLVE_PREVIOUS_WORKOUT_MSG', { name: dangling.name }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translate.instant('TABLES.STOP_BTN'),
          cssClass: 'danger',
          handler: () => {
            this.stopDanglingWorkout(dangling, onResolved);
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  private proceedStartWorkoutFlow(): void {
    // If the workout was completed (has a date), reset everything
    const wasCompleted = !!this.currentWorkout.date;

    // Create a new workout object to ensure signal updates
    const updatedWorkout = { ...this.currentWorkout };
    updatedWorkout.date = null;

    // Reset startedAt if it's a new start or if the workout was completed before
    if (!updatedWorkout.startedAt || wasCompleted) {
      updatedWorkout.startedAt = new Date();
    }

    // If the workout was completed, reset all sets to not done
    if (wasCompleted) {
      updatedWorkout.exercises = updatedWorkout.exercises?.map(exercise => ({
        ...exercise,
        sets: exercise.sets?.map(set => ({
          ...set,
          doned: false
        }))
      }));
    }

    // Update the current workout with the new object
    this.currentWorkout = updatedWorkout;

    // Immediately update the elapsed label and restart the ticker
    this.updateElapsedLabel();
    this.syncElapsedTimer();

    // Update the workout in tableInUse as well, so it's in sync
    if (this.tableInUse) {
      this.tableInUse.splits.forEach(split => {
        const workoutIndex = split.workouts.findIndex(w => w._id === this.currentWorkout._id);
        if (workoutIndex !== -1) {
          split.workouts[workoutIndex] = { ...this.currentWorkout };
        }
      });
      this.tableService.setCurrentTable = this.tableInUse;
    }

    this.workoutService.modifyWorkout(this.currentWorkout).subscribe(() => {
      this.user.workoutInUse = this.currentWorkout._id;
      this.userService.updateUser(this.user).subscribe(() => {
        this.workoutService.setCurrentWorkout = this.currentWorkout;
      });
    });
  }

  public stopWorkout(): void {
    if (this.currentWorkout._id === this.user.workoutInUse) {
      const alertOptions: AlertOptions = {
        header: this.translate.instant('TABLES.STOP_WORKOUT'),
        message: this.translate.instant('TABLES.STOP_WORKOUT_CONFIRM', { name: this.currentWorkout.name }),
        buttons: [
          {
            text: this.translate.instant('COMMON.CANCEL'),
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: this.translate.instant('TABLES.STOP_BTN'),
            cssClass: 'danger',
            handler: () => {
              // Limpiar startedAt para que el cronómetro no siga contando
              // desde este timestamp si se retoma el workout más adelante.
              this.currentWorkout = { ...this.currentWorkout, startedAt: null };
              this.stopElapsedTicker();

              this.workoutService.clearStartedAt(this.currentWorkout).subscribe(() => {
                // Sincronizar el workout completo con la tabla antes de navegar
                this.syncFullWorkoutWithTable();

                delete this.user.workoutInUse;
                this.userService.updateUser(this.user).subscribe(() => {
                  this.workoutService.setCurrentWorkout = undefined;
                  this.navigationService.goToTabsSummaryPage();
                });
              });
            },
          },
        ],
      };
      this.ionicUtilService.showAlert(alertOptions);
    }
  }

  public updateWorkoutNote(note: string | undefined): void {
    if (note) this.currentWorkout.notes = note;
    else delete this.currentWorkout.notes;

    // Actualizar en el servicio de workout
    this.workoutService.setCurrentWorkout = this.currentWorkout;

    // Actualizar la nota en todos los workouts de la tabla
    this.tableInUse.splits
      .flatMap((splitTemp) => splitTemp.workouts)
      .forEach((wTemp) => {
        if (this.currentWorkout._id === wTemp._id) {
          if (note) wTemp.notes = note;
          else delete wTemp.notes;
        }
      });

    // Forzar la actualización de la tabla emitiendo una nueva referencia
    this.tableService.setCurrentTable = { ...this.tableInUse };
  }

  public isCustomExerciseCompleted(customExercise: CustomExercise): boolean {
    return this.customExerciseService.isCustomExerciseCompleted(customExercise);
  }

  public getCustomExerciseSetsDoned(customExercise: CustomExercise): number {
    return customExercise.sets.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.doned ? 1 : 0),
      0
    );
  }

  public async endWorkout(): Promise<void> {
    // Evitar múltiples alerts superpuestos
    if (this.sweetAlertOpened) return;
    this.sweetAlertOpened = true;
    const alertOptions = {
      header: this.translate.instant('TABLES.FINISH_ALERT'),
      message: this.translate.instant('TABLES.FINISH_WORKOUT_CONFIRM', { name: this.currentWorkout.name, date: this.utilService.toStringDateDateFormat(new Date()) }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
          handler: () => {
            this.loading = false;
          },
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          cssClass: 'success',
          handler: () => {
            this.promptEffortThenFinish();
          },
        },
      ],
    };
    await this.ionicUtilService.showAlert(alertOptions);
    // Al cerrar el alert (cancel o confirm), permitir nuevos alerts
    this.sweetAlertOpened = false;
    this.autoEndTriggered = false;
  }

  // MVP-trainers F18 — "¿Cómo de duro ha sido?" al terminar. Opcional y
  // saltable: no bloquea nunca el cierre del entrenamiento. El valor se
  // persiste con un `modifyWorkout` explícito ANTES de `finishWorkout`, porque
  // el DAO de `finishWorkout` solo hace `$set: { date }` + `$unset: { paused }`
  // (no acepta campos arbitrarios como sí hace `modifyWorkout`).
  private promptEffortThenFinish(): void {
    const inputs: AlertOptions['inputs'] = [1, 2, 3, 4, 5].map((n) => ({
      type: 'radio',
      label: String(n),
      value: n,
    }));

    this.ionicUtilService.showAlert({
      header: this.translate.instant('TABLES.EFFORT_TITLE'),
      message: this.translate.instant('TABLES.EFFORT_MESSAGE'),
      inputs,
      buttons: [
        {
          text: this.translate.instant('TABLES.SKIP'),
          role: 'cancel',
          handler: () => this.proceedFinishWorkout(),
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (value: number) => {
            this.currentWorkout.perceivedEffortPost = value ?? null;
            this.workoutService
              .modifyWorkout(this.currentWorkout)
              .subscribe(() => this.proceedFinishWorkout());
          },
        },
      ],
    });
  }

  private proceedFinishWorkout(): void {
    this.loading = true;
    // Ensure date is properly set
    const finishDate = new Date();
    this.workoutService
      .finishWorkout(this.currentWorkout._id, finishDate)
      .subscribe({
                next: (result) => {
                  // Un PR recién hecho debe verse sin esperar a recargar la app.
                  this.exerciseHistoryService.invalidateCache();

                  const updatedWorkout = result?.workout;
                  let summary: WorkoutSummary | null = null;

                  if (updatedWorkout && updatedWorkout.date) {
                    const serverDate = new Date(updatedWorkout.date);

                    this.currentWorkout = {
                      ...updatedWorkout,
                      date: serverDate,
                    };
                    this.workoutService.setCurrentWorkout = this.currentWorkout;

                    this.tableInUse.splits
                      .flatMap((splitTemp) => splitTemp.workouts)
                      .forEach((wTemp) => {
                        if (this.currentWorkout._id === wTemp._id)
                          wTemp.date = serverDate;
                      });

                    this.tableService.setCurrentTable = this.tableInUse;

                    summary = buildWorkoutSummary(
                      this.currentWorkout,
                      serverDate
                    );
                  } else {
                    console.error(
                      'Warning: Workout date was not saved properly by server'
                    );
                  }

                  delete this.user.workoutInUse;
                  this.userService.setLocalUser = { ...this.user };

                  this.preserveFinishedWorkoutSplitIfCompleted(
                    this.currentWorkout._id
                  );

                  this.stopElapsedTicker();
                  this.loading = false;

                  const finishAndNavigateBack = () => {
                    this.currentWorkout = undefined;
                    this.workoutService.setCurrentWorkout = null;
                    this.navigationService.goBack();
                  };

                  if (summary) {
                    this.ionicUtilService
                      .showModal({
                        component: WorkoutSummaryModalComponent,
                        componentProps: { summary },
                        cssClass: 'workout-summary-modal',
                      })
                      .then(finishAndNavigateBack);
                  } else {
                    // Fallback si por algún motivo no se pudo construir el
                    // resumen: no bloquear el cierre del entrenamiento.
                    this.ionicUtilService
                      .showAlert({
                        header: this.translate.instant('TABLES.COMPLETED_TITLE'),
                        message: this.translate.instant('TABLES.WORKOUT_FINISHED_SUCCESS', { name: this.currentWorkout?.name }),
                        buttons: [
                          {
                            text: this.translate.instant('COMMON.OK'),
                            cssClass: 'alert-button-primary',
                          },
                        ],
                      })
                      .then(finishAndNavigateBack);
                  }
                },
                error: (err) => {
                  console.error('Error finishing workout:', err);
                  this.loading = false;
                  this.ionicUtilService.showAlert({
                    header: this.translate.instant('TABLES.FINISH_ERROR_TITLE'),
                    message: this.translate.instant('TABLES.FINISH_ERROR'),
                    buttons: [this.translate.instant('COMMON.OK')],
                  });
                },
              });
  }

  private preserveFinishedWorkoutSplitIfCompleted(workoutId: string): void {
    if (!this.tableInUse?._id || !this.tableInUse.splits?.length) return;

    const splitIndex = this.tableInUse.splits.findIndex((split) =>
      split.workouts?.some((workout) => workout?._id === workoutId)
    );

    if (splitIndex === -1) return;

    const finishedSplit = this.tableInUse.splits[splitIndex];
    if (!this.utilService.isSplitDoned(finishedSplit)) return;

    const preserveState: PreserveFinishedWorkoutSplitState = {
      tableId: this.tableInUse._id,
      splitId: finishedSplit._id,
      splitIndex,
      workoutId,
    };

    this.navigationService.setTempData(
      this.preserveFinishedWorkoutSplitKey,
      preserveState
    );
  }

  public setPreviousWorkout(): void {
    if (!this.tableInUse || !this.currentWorkout) return;

    const indexSplit: number = this.tableInUse.splits.findIndex((sTemp) =>
      sTemp.workouts.find((wTemp) => wTemp._id === this.currentWorkout._id)
    );

    // Si no se encuentra el split, no continuar
    if (indexSplit === -1) return;

    const indexWorkout: number = this.tableInUse.splits[
      indexSplit
    ].workouts.findIndex((wTemp) => wTemp._id === this.currentWorkout._id);

    if (indexSplit > 0 && indexWorkout !== -1) {
      const previousSplitWorkouts =
        this.tableInUse.splits[indexSplit - 1]?.workouts;
      // Verificar que existe el workout en la misma posición del split anterior
      if (previousSplitWorkouts && previousSplitWorkouts[indexWorkout]) {
        this.previousWorkout = previousSplitWorkouts[indexWorkout];
        this.previousWorkoutDate = this.previousWorkout?.date;
      } else {
        this.previousWorkout = null;
        this.previousWorkoutDate = null;
      }
    } else {
      // Si es el primer split, no hay workout anterior
      this.previousWorkout = null;
      this.previousWorkoutDate = null;
    }
  }

  public manageNote(): void {
    this.utilService.manageNote(this.currentWorkout, this.workoutService);
  }

  public openWorkoutOptions(event: Event): void {
    const popoverOptions: PopoverOptions = {
      component: PopoverActionsComponent,
      event,
      showBackdrop: false,
      componentProps: {
        actionsPopover: this.getWorkoutOptions(),
      },
    };

    this.ionicUtilService.showPopover(popoverOptions).then((res) => {
      if (!res?.data) return;

      switch (res.data.id) {
        case ACTIONS[ACTION_TYPES.note].id:
          this.manageNote();
          break;
        case ACTIONS[ACTION_TYPES.moveExercises].id:
          this.openOrderExercisesModal();
          break;
        case ACTIONS[ACTION_TYPES.rmCalculator].id:
          this.navigationService.goToRmCalculator();
          break;
      }
    });
  }

  public openOrderExercisesModal(): void {
    if (!this.currentWorkout || !this.tableInUse) return;

    const modalOptions: ModalOptions = {
      component: OrderExercisesPage,
      componentProps: {
        customExercises: this.currentWorkout.exercises || [],
        idWorkout: this.currentWorkout._id,
        idTable: this.tableInUse._id,
      },
    };

    this.ionicUtilService.showModal(modalOptions);
  }

  private getWorkoutOptions(): ACTION_TYPE[] {
    return [
      ACTIONS[ACTION_TYPES.note],
      ACTIONS[ACTION_TYPES.moveExercises],
      ACTIONS[ACTION_TYPES.rmCalculator],
    ];
  }

  public async navigateYTVideo(url: string, exercise?: any) {
    if (!url) return;
    await this.ionicUtilService.showModal({
      component: VideoModalComponent,
      componentProps: {
        videoUrl: url,
        exercise: exercise?.exercise || exercise,
      },
    });
  }

  public selectExercise(index: number): void {
    this.selectedExerciseIndex = index;
    this.selectedExercise = this.currentWorkout?.exercises[index];
  }

  private initVariables(): void {
    // Las suscripciones principales ahora se gestionan con effects en el constructor

    const currentWorkoutId = this.workoutService.currentWorkout?._id;
    if (currentWorkoutId) {
      const foundWorkout = this.tableInUse?.splits
        ?.map((splitTemp) =>
          splitTemp.workouts.find(
            (workoutTemp) => workoutTemp._id === currentWorkoutId
          )
        )
        .find((workoutTemp) => !!workoutTemp);

      if (foundWorkout) {
        this.workoutService.setCurrentWorkout = foundWorkout;
      }
    }
  }

  /**
   * Sincroniza TODO el workout actual con la tabla local
   * Reemplaza completamente el workout en la tabla con el estado actual
   */
  private syncFullWorkoutWithTable(): void {
    if (!this.currentWorkout || !this.tableInUse?.splits) return;

    this.tableInUse.splits.forEach((split) => {
      const workoutIndex = split.workouts?.findIndex(
        (w) => w._id === this.currentWorkout._id
      );
      if (workoutIndex !== undefined && workoutIndex !== -1) {
        // Reemplazar el workout completo con el estado actual
        split.workouts[workoutIndex] = { ...this.currentWorkout };
      }
    });

    // Emitir una nueva referencia de la tabla
    this.tableService.setCurrentTable = { ...this.tableInUse };
  }

  public goToSummary(): void {
    this.navigationService.goBack();
  }

  public ionViewWillLeave(): void {
    this.syncFullWorkoutWithTable();
  }

  /**
   * Comprueba si el número total de sets hechos (doned)
   * es igual al número total de sets del entrenamiento y,
   * si coincide, lanza automáticamente endWorkout una única vez.
   */
  private tryAutoEndWorkout(): void {
    if (!this.currentWorkout) return;
    // Si el entrenamiento ya tiene fecha, se considera terminado
    if (this.currentWorkout.date) return;
    const exercises = this.currentWorkout.exercises || [];
    // Contar sets totales y sets hechos
    const { totalSets, doneSets } = exercises.reduce(
      (acc, exercise) => {
        const sets = exercise.sets || [];
        acc.totalSets += sets.length;
        acc.doneSets += sets.filter((s) => !!s.doned).length;
        return acc;
      },
      { totalSets: 0, doneSets: 0 }
    );

    // Evitar finalizar si no hay sets
    if (totalSets === 0) return;

    if (doneSets === totalSets) {
      this.endWorkout();
    }
  }

  /**
   * Evalúa si debe lanzarse el auto-fin sólo cuando cambia el número de sets marcadas como hechas (doned).
   * No se dispara por cambios en inputs de sets (peso, reps, tiempo, etc.).
   */
  private evaluateAutoEndOnDoneChange(): void {
    if (!this.currentWorkout || this.currentWorkout.date) return;
    const exercises = this.currentWorkout.exercises || [];
    const { totalSets, doneSets } = exercises.reduce(
      (acc, exercise) => {
        const sets = exercise.sets || [];
        acc.totalSets += sets.length;
        acc.doneSets += sets.filter((s) => !!s.doned).length;
        return acc;
      },
      { totalSets: 0, doneSets: 0 }
    );

    // Inicializar seguimiento sin disparar auto-fin
    if (!this.hasInitializedDoneTracking) {
      this.previousTotalSets = totalSets;
      this.previousDoneSets = doneSets;
      this.hasInitializedDoneTracking = true;
      return;
    }

    // Sólo actuar si cambió el número de sets hechas (toggle de checkbox)
    const doneChanged = doneSets !== this.previousDoneSets;
    this.previousTotalSets = totalSets;
    this.previousDoneSets = doneSets;

    if (!doneChanged) return;

    // Si todas las sets están hechas, lanzar el flujo de finalización
    if (totalSets > 0 && doneSets === totalSets) {
      this.scheduleAutoEnd();
    }
  }

  private scheduleAutoEnd(): void {
    if (this.sweetAlertOpened || this.autoEndTriggered || this.autoEndScheduled)
      return;
    this.autoEndTriggered = true;
    this.autoEndScheduled = true;
    this.autoEndTimeoutId = setTimeout(() => {
      this.autoEndScheduled = false;
      this.tryAutoEndWorkout();
    }, 150);
  }

  // Subject para gestionar el ciclo de vida de suscripciones
  private destroy$ = new Subject<void>();

  public trackByCustomExercise(index: number, item: CustomExercise): string {
    return item._id;
  }

  // Rediseño de entrenamiento Fase B — pantalla real del cliente: agrupa por
  // bloque (nombre/tipo/rondas/descansos visibles antes de cada grupo) en
  // vez del *ngFor plano de siempre. `globalExerciseIndex` conserva el
  // índice GLOBAL sobre currentWorkout.exercises (no el índice dentro del
  // grupo) porque isCustomExerciseCompleted/trackBy/"i === 0" dependen de la
  // posición real en la lista completa.
  public get exerciseGroups(): WorkoutExerciseGroup[] {
    return groupExercisesByBlock(this.currentWorkout);
  }

  public get showsBlocks(): boolean {
    return hasRenderableBlocks(this.currentWorkout);
  }

  public globalExerciseIndex(customExercise: CustomExercise): number {
    return this.currentWorkout?.exercises?.indexOf(customExercise) ?? -1;
  }

  public trackByBlockGroup(index: number, group: WorkoutExerciseGroup): string {
    return group.block?._id || 'ungrouped';
  }

  public blockTypeLabel(type: WorkoutBlock['type']): string {
    switch (type) {
      case 'superset':
        return this.translate.instant('TABLES.BLOCK_TYPE_SUPERSET');
      case 'circuit':
        return this.translate.instant('TABLES.BLOCK_TYPE_CIRCUIT');
      case 'warmup':
        return this.translate.instant('TABLES.BLOCK_TYPE_WARMUP');
      case 'finisher':
        return this.translate.instant('TABLES.BLOCK_TYPE_FINISHER');
      default:
        return this.translate.instant('TABLES.BLOCK_TYPE_STRAIGHT');
    }
  }

  // ---------- Cronómetro (basado en timestamps, no en un contador acumulado) ----------
  public elapsedLabel: string = '00:00:00';
  private elapsedTickerSub?: Subscription;

  private syncElapsedTimer(): void {
    if (!this.currentWorkout || this.currentWorkout.date) {
      // Sin workout activo, o ya finalizado: no seguir contando, solo mostrar
      // la foto final (o el estado vacío por defecto).
      this.stopElapsedTicker();
      this.updateElapsedLabel();
      return;
    }

    // Workout en curso pero sin startedAt: sesión iniciada antes de que
    // existiera esta funcionalidad. Backfill best-effort para que el
    // cronómetro arranque ya en vez de quedar roto para siempre.
    if (!this.currentWorkout.startedAt) {
      this.currentWorkout.startedAt = new Date();
      this.workoutService.modifyWorkout(this.currentWorkout).subscribe();
    }

    this.updateElapsedLabel();
    if (!this.elapsedTickerSub) {
      this.elapsedTickerSub = interval(1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.updateElapsedLabel());
    }
  }

  private stopElapsedTicker(): void {
    this.elapsedTickerSub?.unsubscribe();
    this.elapsedTickerSub = undefined;
  }

  private updateElapsedLabel(): void {
    this.elapsedLabel = this.formatElapsedMs(this.getElapsedMs());
  }

  private getElapsedMs(): number {
    if (!this.currentWorkout?.startedAt) return 0;
    const start = new Date(this.currentWorkout.startedAt).getTime();
    const end = this.currentWorkout.date
      ? new Date(this.currentWorkout.date).getTime()
      : Date.now();
    return Math.max(0, end - start);
  }

  private formatElapsedMs(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

}
