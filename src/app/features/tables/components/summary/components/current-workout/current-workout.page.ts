import {
  Component,
  OnDestroy,
  OnInit,
  effect,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertOptions } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import {
  ColorMode,
  ThemeService,
} from 'src/app/core/services/util/theme.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { Theme, THEMES } from 'src/app/shared/models/theme';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';

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

  constructor(
    private navigationService: NavigationService,
    private customExerciseService: CustomExerciseService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
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
      header: 'Comenzar entrenamiento',
      message:
        this.currentWorkout.name +
        ' se mostrará en la pesataña de summary y perfil como entrenamiento en uso',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'INICIAR',
          handler: () => {
            delete this.currentWorkout.date;
            this.workoutService
              .modifyWorkout(this.currentWorkout)
              .subscribe(() => {
                this.user.workoutInUse = this.currentWorkout._id;
                this.userService
                  .updateUser(this.user)
                  .subscribe(() => {
                    this.workoutService.setCurrentWorkout = this.currentWorkout;

                    // Lanzar fuera del ciclo del alert para mejorar fiabilidad en iOS/Android.
                    setTimeout(() => {
                      const localUser = this.userService.getLocalUser;
                      if (!localUser?.isPremium) {
                        this.adMobService
                          .interstitial('start_workout')
                          .catch((error) =>
                            console.error(
                              'Error mostrando interstitial start_workout:',
                              error
                            )
                          );
                      }
                    }, 120);
                  });
              });
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public stopWorkout(): void {
    if (this.currentWorkout._id === this.user.workoutInUse) {
      const alertOptions: AlertOptions = {
        header: 'Detener entrenamiento',
        message: `¿Desea parar el entrenamiento ${this.currentWorkout.name}?`,
        buttons: [
          {
            text: 'CANCELAR',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'DETENER',
            cssClass: 'danger',
            handler: () => {
              // Sincronizar el workout completo con la tabla antes de navegar
              this.syncFullWorkoutWithTable();

              delete this.user.workoutInUse;
              this.userService.updateUser(this.user).subscribe(() => {
                this.workoutService.setCurrentWorkout = undefined;
                this.navigationService.goToTabsSummaryPage();
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
      header: 'Finalizar',
      message:
        'Terminar el entrenamiento ' +
        this.currentWorkout.name +
        ' a fecha del ' +
        this.utilService.toStringDateDateFormat(new Date()),
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            this.loading = false;
          },
        },
        {
          text: 'CONFIRMAR',
          cssClass: 'success',
          handler: () => {
            this.loading = true;
            // Ensure date is properly set
            const finishDate = new Date();
            this.workoutService
              .finishWorkout(this.currentWorkout._id, finishDate)
              .subscribe({
                next: (result) => {
                  const updatedWorkout = result?.workout;

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
                  } else {
                    console.error(
                      'Warning: Workout date was not saved properly by server'
                    );
                  }

                  delete this.user.workoutInUse;
                  this.userService.setLocalUser = { ...this.user };

                  this.navigationService.goBack();
                  const successAlertOptions = {
                    header: 'Completado',
                    message: `¡${this.currentWorkout.name} finalizado con éxito!`,
                    buttons: [
                      {
                        text: 'OK',
                        cssClass: 'alert-button-primary',
                      },
                    ],
                  };
                  this.ionicUtilService.showAlert(successAlertOptions);

                  this.currentWorkout = undefined;
                  this.workoutService.setCurrentWorkout = null;
                  this.loading = false;
                },
                error: (err) => {
                  console.error('Error finishing workout:', err);
                  this.loading = false;
                  this.ionicUtilService.showAlert({
                    header: 'Error',
                    message:
                      'No se pudo finalizar el entrenamiento. Inténtalo de nuevo.',
                    buttons: ['OK'],
                  });
                },
              });
          },
        },
      ],
    };
    await this.ionicUtilService.showAlert(alertOptions);
    // Al cerrar el alert (cancel o confirm), permitir nuevos alerts
    this.sweetAlertOpened = false;
    this.autoEndTriggered = false;
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
}
