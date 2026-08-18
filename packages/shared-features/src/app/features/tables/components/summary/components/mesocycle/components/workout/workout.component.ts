import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription, forkJoin, tap } from 'rxjs';
import {
  ActionSheetOptions,
  AlertOptions,
  ModalController,
  ModalOptions,
  PopoverOptions,
  ToastOptions,
} from '@ionic/angular';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { formatRirValue, isRirFail } from 'src/app/core/models/rir';
import { Split } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { RestTimerService } from 'src/app/core/services/rest-timer/rest-timer.service';
import { ConfigExercisePage } from 'src/app/features/exercises/components/config-exercise/config-exercise.page';
import { SearchExercisesPage } from 'src/app/shared/components/search-exercises/search-exercises.page';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import { SkipWorkoutModalComponent, WorkoutSkipItem } from '../skip-workout-modal/skip-workout-modal.component';
import { ClipboardExercisesModalComponent } from '../clipboard-exercises-modal/clipboard-exercises-modal.component';
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTION_VALUES,
  ACTIONS,
} from 'src/app/shared/constants/actions';
import { STATES } from 'src/app/shared/constants/states';
import { ExerciseClipboard } from 'src/app/shared/models/exercise-clipboard';
import { OrderExercisesPage } from '../order-exercises/order-exercises.page';
import { PinnedExerciseNoteService } from 'src/app/core/services/pinned-exercise-note/pinned-exercise-note.service';
import { PinnedExerciseNote, PinnedExerciseNoteUpsertDto } from 'src/app/core/models/pinned-exercise-note';
import { WorkoutSummaryModalComponent } from 'src/app/features/tables/components/summary/components/current-workout/workout-summary-modal/workout-summary-modal.component';
import { buildWorkoutSummary } from 'src/app/features/tables/components/summary/components/current-workout/workout-summary-modal/workout-summary.model';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnDestroy {
  @Input()
  public user: User;

  @Input()
  public split: Split;

  @Input()
  public splitIndex: number;

  @Input()
  public workout: Workout;

  @Input()
  public workoutColor: string;

  @Input()
  public workoutIndex: number;

  @Input()
  public stateSelected: number;

  @Input()
  public savingWorkoutOrder = false;

  @Input()
  public isPopoverOpen: boolean;

  @Input()
  public exercisePasteMode = false;

  @Input()
  public exerciseCopyActive = false;

  @Input()
  public exerciseOriginWorkoutId: string;

  @Input()
  public tableInUse: Table;

  @Output()
  public exerciseCopyEvent = new EventEmitter<{
    workoutId: string;
    workoutIndex: number;
    selectionMode: boolean;
    selectedIndices: Set<number>;
  }>();

  @Output()
  public exerciseAddedEvent = new EventEmitter<{
    workoutIndex: number;
    exerciseIndex: number;
  }>();

  @Output()
  public setAddedEvent = new EventEmitter<{
    workoutIndex: number;
    exerciseIndex: number;
  }>();

  @Output()
  public setUpdatedEvent = new EventEmitter<{
    workoutIndex: number;
    exerciseIndex: number;
  }>();

  @Output()
  public setDeletedEvent = new EventEmitter<{
    workoutIndex: number;
    exerciseIndex: number;
  }>();

  @Output()
  public workoutNameUpdatedEvent = new EventEmitter<{
    workoutIndex: number;
    newName: string;
  }>();

  @Output()
  public workoutDuplicatedEvent = new EventEmitter<{
    workoutIndex: number;
  }>();

  public exerciseSelectionMode = false;
  public selectedExerciseIndices: Set<number> = new Set();
  public exerciseClipboardLoad = false;

  public note: string;

  public arrowRotate = false;

  public visibleMuscleGroups: boolean = false;

  public load = true;

  public STATES = STATES;

  public ACTION_VALUES = ACTION_VALUES;
  public ACTION_TYPES = ACTION_TYPES;

  public test: boolean = false;

  public pinnedNotes: PinnedExerciseNote[] = [];
  private pinnedNoteCacheSub: Subscription | null = null;
  private clipboardSub: Subscription | null = null;

  get locale(): string {
    return this.translate.currentLang === 'en' ? 'en-US' : 'es-ES';
  }

  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private workoutService: WorkoutService,
    private customExerciseService: CustomExerciseService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private tableService: TableService,
    private navigationService: NavigationService,
    private adMobService: AdMobService,
    private translate: TranslateService,
    private pinnedExerciseNoteService: PinnedExerciseNoteService,
    private restTimerService: RestTimerService
  ) { }

  ngOnInit(): void {
    this.loadPinnedNotes();
    this.pinnedNoteCacheSub = this.pinnedExerciseNoteService.cache$.subscribe(() => {
      this.loadPinnedNotes();
    });
    this.clipboardSub = this.workoutService.exerciseClipboard$.subscribe(
      (clipboard) => {
        if (!this.exerciseSelectionMode || !this.workout) return;
        if (!clipboard || clipboard.sourceWorkoutId !== this.workout._id) {
          this.selectedExerciseIndices = new Set();
          return;
        }
        const newIndices = new Set<number>();
        this.workout.exercises.forEach((ex, i) => {
          if (clipboard.selectedExercises.some((ce) => ce._id === ex._id)) {
            newIndices.add(i);
          }
        });
        this.selectedExerciseIndices = newIndices;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exerciseCopyActive'] && !changes['exerciseCopyActive'].currentValue) {
      this.exerciseSelectionMode = false;
      this.selectedExerciseIndices = new Set();
    }
  }

  ngOnDestroy(): void {
    this.pinnedNoteCacheSub?.unsubscribe();
    this.clipboardSub?.unsubscribe();
  }

  private loadPinnedNotes(): void {
    if (this.tableInUse?._id) {
      this.pinnedExerciseNoteService.getByTable(this.tableInUse._id).subscribe((notes) => {
        this.pinnedNotes = notes;
      });
    }
  }

  public getPinnedNote(workoutIndex: number, exerciseIndex: number): PinnedExerciseNote | undefined {
    return this.pinnedNotes.find(
      (n) => n.workoutIndex === workoutIndex && n.exerciseIndex === exerciseIndex
    );
  }

  public deletePinnedNote(workoutIndex: number, exerciseIndex: number): void {
    const note = this.pinnedNotes.find(
      (n) => n.workoutIndex === workoutIndex && n.exerciseIndex === exerciseIndex
    );
    if (!note) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.DELETE_PINNED_TITLE'),
      message: this.translate.instant('NOTES.DELETE_PINNED_CONFIRM'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.pinnedExerciseNoteService.delete(note._id, this.tableInUse._id).subscribe({
              next: () => {
                this.pinnedNotes = this.pinnedNotes.filter((n) => n._id !== note._id);
                console.debug('[WorkoutComponent] Pinned note deleted');
              },
              error: (err) => console.error('[WorkoutComponent] Failed to delete pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public editPinnedNote(workoutIndex: number, exerciseIndex: number): void {
    const note = this.pinnedNotes.find(
      (n) => n.workoutIndex === workoutIndex && n.exerciseIndex === exerciseIndex
    );
    if (!note) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.TITLE'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          value: note.notes,
          placeholder: this.translate.instant('NOTES.PLACEHOLDER'),
          attributes: { maxlength: 500 },
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            const newNotes = (data.notes || '').trim();
            const dto: PinnedExerciseNoteUpsertDto = {
              tableId: this.tableInUse._id,
              workoutIndex,
              exerciseIndex,
              notes: newNotes,
            };
            this.pinnedExerciseNoteService.upsert(dto).subscribe({
              next: (updated) => {
                const idx = this.pinnedNotes.findIndex((n) => n._id === note._id);
                if (idx >= 0) this.pinnedNotes[idx] = updated;
                console.debug('[WorkoutComponent] Pinned note updated');
              },
              error: (err) => console.error('[WorkoutComponent] Failed to update pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public showPinnedNoteAlert(workoutIndex: number, exerciseIndex: number): void {
    const note = this.pinnedNotes.find(
      (n) => n.workoutIndex === workoutIndex && n.exerciseIndex === exerciseIndex
    );
    if (!note) return;
    const exercise = this.workout?.exercises?.[exerciseIndex];
    const alertOptions: AlertOptions = {
      header: exercise?.exercise?.name,
      message: note.notes,
      buttons: [this.translate.instant('COMMON.CONFIRM')],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public workoutActions(
    event,
    workoutIndex?: number,
    customExercise?: CustomExercise
  ): void {
    const popoverOptions: PopoverOptions = {
      component: PopoverActionsComponent,
      event: event,
      showBackdrop: false,
      componentProps: {
        table: this.tableInUse,
        workout: this.workout,
        actionsPopover: this.getActionsPopover(),
      },
    };
    this.ionicUtilService.showPopover(popoverOptions).then((res) => {
      if (res.data) {
        switch (res.data.id) {
          case ACTIONS[this.ACTION_TYPES.copyExercises].id:
            this.enterExerciseSelectionMode();
            break;

          case ACTIONS[this.ACTION_TYPES.duplicate].id:
            this.duplicateWorkoutRow();
            break;

          // case ACTIONS[this.ACTION_TYPES.share].id:
          //   this.presentActionSheet();
          //   break;

          case ACTIONS[this.ACTION_TYPES.note].id:
            this.setWorkoutNote();
            break;

          case ACTIONS[this.ACTION_TYPES.moveExercises].id:
            this.openOrderModal();
            break;

          case ACTIONS[this.ACTION_TYPES.edit].id:
            this.updateWorkoutName();
            break;

          case ACTIONS[this.ACTION_TYPES.delete].id:
            this.deleteWorkouts(workoutIndex);
            break;

          case ACTIONS[this.ACTION_TYPES.viewSummary].id:
            this.viewWorkoutSummary();
            break;

          case ACTIONS[this.ACTION_TYPES.skipWorkout].id:
            this.skipWorkout();
            break;

          case ACTIONS[this.ACTION_TYPES.unskipWorkout].id:
            this.unskipWorkout();
            break;

          case ACTIONS[this.ACTION_TYPES.stopWorkout].id:
            this.stopWorkout();
            break;
        }
      }
    });
  }

  // Misma lógica que current-workout.page.ts#stopWorkout, adaptada a este
  // contexto (lista de días): no navega a ningún sitio al terminar, solo
  // sincroniza el estado local — ya estamos en la pantalla de la rutina.
  private stopWorkout(): void {
    if (this.workout._id !== this.user?.workoutInUse) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.STOP_WORKOUT'),
      message: this.translate.instant('TABLES.STOP_WORKOUT_CONFIRM', { name: this.workout.name }),
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
            this.workout.startedAt = null;
            this.restTimerService.skip();

            this.workoutService.clearStartedAt(this.workout).subscribe(() => {
              this.tableService.setCurrentTable = this.tableInUse;

              delete this.user.workoutInUse;
              this.userService.updateUser(this.user).subscribe(() => {
                this.workoutService.setCurrentWorkout = undefined;
              });
            });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private viewWorkoutSummary(): void {
    // Solo tiene sentido para un entreno ya terminado (workout.date presente).
    if (!this.workout.date) return;

    const summary = buildWorkoutSummary(
      this.workout,
      new Date(this.workout.date)
    );

    this.ionicUtilService.showModal({
      component: WorkoutSummaryModalComponent,
      componentProps: {
        summary,
        closeButtonLabel: this.translate.instant('COMMON.CERRAR'),
      },
      cssClass: 'workout-summary-modal',
    });
  }

  public openOrderModal(workoutIndex?: number): void {
    const modalOptions: ModalOptions = {
      component: OrderExercisesPage,
      componentProps: {
        customExercises: this.workout.exercises,
        idWorkout: this.workout._id,
        idTable: this.tableInUse._id,
      },
    };

    this.ionicUtilService.showModal(modalOptions);
  }

  private async presentActionSheet() {
    const header = 'SHARE';
    const buttons = [
      {
        text: 'WhatsApp',
        role: 'destructive',
        icon: 'logo-whatsapp',
        id: 'delete-button',
        data: {
          type: 'delete',
        },
        handler: () => {
          console.log('Delete clicked');
        },
      },
      {
        text: 'Twitter',
        icon: 'logo-twitter',
        data: 10,
        handler: () => {
          console.log('Share clicked');
        },
      },
      {
        text: 'Instagram',
        icon: 'logo-instagram',
        data: 'Data value',
        handler: () => {
          console.log('Play clicked');
        },
      },
      {
        text: 'CANCELAR',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];

    const actionSheet: ActionSheetOptions = {
      header: header,
      buttons: buttons,
    };

    this.ionicUtilService.showActionSheet(actionSheet);
  }

  private deleteWorkouts(workoutIndex: number): void {
    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.DELETE_WORKOUTS'),
      message: this.translate.instant('TABLES.DELETE_WORKOUTS_CONFIRM', { name: this.workout.name }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translate.instant('TABLES.DELETE_BTN'),
          cssClass: 'danger',
          handler: () => {
            const workoutsToDelete: Workout[] = [];

            this.tableInUse.splits.forEach((splitTemp) => {
              const workoutTemp = splitTemp.workouts[workoutIndex];
              workoutsToDelete.push(workoutTemp);

              splitTemp.workouts = splitTemp.workouts.filter(
                (_, index) => index !== workoutIndex
              );
            });
            this.tableService.setCurrentTable = this.tableInUse;

            if (this.user.workoutInUse) {
              delete this.user.workoutInUse;
              this.workoutService.setCurrentWorkout = undefined;
              this.userService.updateUser(this.user).subscribe();
            }

            this.workoutService
              .deleteWorkouts(workoutsToDelete)
              .subscribe(() => {
                const toastOptions: ToastOptions = {
                  message: this.translate.instant('TABLES.WORKOUT_DELETED_SUCCESS', { name: workoutsToDelete[0].name }),
                  duration: 2000,
                };
                this.ionicUtilService.showToast(toastOptions);
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private async skipWorkout(): Promise<void> {
    const modal = await this.modalController.create({
      component: SkipWorkoutModalComponent,
      componentProps: {
        workoutItems: [{ workout: this.workout, splitIndex: this.splitIndex }],
        header: this.translate.instant('TABLES.SKIP_WORKOUT'),
        message: this.translate.instant('TABLES.SKIP_WORKOUT_CONFIRM', { name: this.workout.name }),
        confirmText: this.translate.instant('TABLES.SKIP_BTN'),
      },
    });
    await modal.present();
    const { role } = await modal.onDidDismiss();
    if (role === 'confirm') {
      this.applyWorkoutSkip(this.workout, true).subscribe(() => {
        const toastOptions: ToastOptions = {
          message: this.translate.instant('TABLES.WORKOUT_SKIPPED_SUCCESS', { name: this.workout.name }),
          duration: 2000,
        };
        this.ionicUtilService.showToast(toastOptions);
      });
    }
  }

  private unskipWorkout(): void {
    this.applyWorkoutSkip(this.workout, false).subscribe(() => {
      const toastOptions: ToastOptions = {
        message: this.translate.instant('TABLES.WORKOUT_UNSKIPPED_SUCCESS', { name: this.workout.name }),
        duration: 2000,
      };
      this.ionicUtilService.showToast(toastOptions);
    });
  }

  // Persiste el flag `rest` del workout y refleja el resultado en el estado local
  // (tabla en uso + usuario si el workout saltado era el que tenía en curso).
  private applyWorkoutSkip(workout: Workout, rest: boolean) {
    return this.workoutService.skipWorkout(workout._id, rest).pipe(
      tap(() => {
        workout.rest = rest;
        if (rest) {
          delete workout.date;
          if (this.user.workoutInUse === workout._id) {
            delete this.user.workoutInUse;
          }
        }

        // `workout` puede ser una copia desconectada (mesocycle reconstruye
        // currentSplit.workouts en cada refresco); sincronizar por _id contra
        // el grafo real de tableInUse antes de propagar la señal, si no el
        // efecto de mesocycle.page.ts la reconstruye a partir del dato viejo.
        this.tableInUse.splits
          .flatMap((splitTemp) => splitTemp.workouts)
          .forEach((wTemp) => {
            if (wTemp._id === workout._id) {
              wTemp.rest = rest;
              if (rest) delete wTemp.date;
            }
          });

        this.tableService.setCurrentTable = this.tableInUse;
      })
    );
  }

  private duplicateWorkoutRow(): void {
    this.load = false;

    const nameSuffix = this.translate.instant('TABLES.WORKOUT_COPY_SUFFIX');

    this.workoutService
      .duplicateWorkoutRow(this.tableInUse._id, this.workout._id, nameSuffix)
      .subscribe({
        next: (resSplits) => {
          this.tableInUse.splits = resSplits;
          this.tableService.setCurrentTable = this.tableInUse;

          const duplicatedWorkoutIndex = this.workoutIndex + 1;
          this.workoutDuplicatedEvent.emit({
            workoutIndex: duplicatedWorkoutIndex,
          });

          const toastOptions: ToastOptions = {
            message: this.translate.instant('TABLES.WORKOUT_DUPLICATED'),
            duration: 1000,
            color: 'success',
          };
          this.ionicUtilService.showToast(toastOptions);
          this.load = true;
        },
        error: (error) => {
          this.load = true;
          this.ionicUtilService.showErrorToast(
            error,
            this.translate.instant('TABLES.WORKOUT_DUPLICATE_ERROR')
          );
        },
      });
  }

  public async deleteExercises(indexWorkout: number, indexExercise: number) {
    let deletedExercises: string[] = [];
    this.tableInUse.splits.forEach((splitTemp) => {
      if (
        splitTemp.workouts[indexWorkout] &&
        splitTemp.workouts[indexWorkout].exercises[indexExercise]
      ) {
        deletedExercises.push(
          splitTemp.workouts[indexWorkout].exercises[indexExercise]._id
        );
        splitTemp.workouts[indexWorkout].exercises.splice(indexExercise, 1);
      }
    });

    this.tableService.setCurrentTable = this.tableInUse;

    this.customExerciseService
      .deleteCustomExercises(deletedExercises)
      .subscribe();
  }

  public async deleteExercisesAlert(
    exerciseName: string,
    indexWorkout: number,
    indexExercise: number
  ) {
    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.DELETE_EXERCISE'),
      message: this.translate.instant('TABLES.DELETE_EXERCISE_CONFIRM', { name: exerciseName }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translate.instant('TABLES.DELETE_BTN'),
          role: 'destructive',
          handler: () => {
            this.deleteExercises(indexWorkout, indexExercise);
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public async addExerciseModal(customExercise: CustomExercise) {
    const modal = await this.modalController.create({
      component: ConfigExercisePage,
      componentProps: {
        user: this.user,
        tableInUse: this.tableInUse,
        workout: this.workout,
        workoutIndex: this.workoutIndex,
        splitIndex: this.splitIndex,
        customExercise: customExercise,
      },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data?.setChangeInfo) {
        this.handleSetChangeInfo(res.data.setChangeInfo);
      } else if (res.data) {
        // Se añadió un nuevo ejercicio
        this.getCurrentWorkout(res.data);
      }
    });
    return modal.present();
  }

  public exerciseCardClick(exercise: CustomExercise, event: Event): void {
    event.stopPropagation();
    if (!this.exercisePasteMode && !this.exerciseCopyActive) {
      this.addExerciseModal(exercise);
    }
  }

  public getCurrentWorkout(workoutsPayload: Workout[] | any) {
    const workouts = Array.isArray(workoutsPayload)
      ? workoutsPayload
      : Array.isArray(workoutsPayload?.workouts)
        ? workoutsPayload.workouts
        : [];

    if (!workouts.length) {
      if (workoutsPayload?.setChangeInfo) {
        this.handleSetChangeInfo(workoutsPayload.setChangeInfo);
      } else if (workoutsPayload?.tableInUse) {
        this.tableInUse = workoutsPayload.tableInUse;
        this.tableService.setCurrentTable = workoutsPayload.tableInUse;
      }
      return;
    }

    this.tableInUse.splits.forEach((splitTemp) => {
      workouts.forEach((workout) => {
        splitTemp.workouts.forEach((workoutTemp) => {
          if (workout._id === workoutTemp._id) {
            workoutTemp.exercises = this.mergeCustomExercises(
              workoutTemp.exercises,
              workout.exercises
            );
          }
        });
      });
    });

    // Actualizar el workout actual
    const updatedWorkout =
      this.tableInUse.splits[this.splitIndex].workouts[this.workoutIndex];
    this.workoutService.setCurrentWorkout = updatedWorkout;

    // Actualizar la tabla para que mesocycle reciba el cambio
    this.tableService.setCurrentTable = this.tableInUse;

    // Emitir evento para abrir accordion y scroll al nuevo ejercicio
    const newExerciseIndex = updatedWorkout.exercises.length - 1;
    this.exerciseAddedEvent.emit({
      workoutIndex: this.workoutIndex,
      exerciseIndex: newExerciseIndex,
    });
  }

  private mergeCustomExercises(
    currentExercises: CustomExercise[] = [],
    incomingExercises: CustomExercise[] = []
  ): CustomExercise[] {
    const mergedExercises = [...(currentExercises || [])];

    (incomingExercises || []).forEach((incomingExercise) => {
      const incomingId = incomingExercise?._id?.toString();
      const existingIndex = incomingId
        ? mergedExercises.findIndex(
          (currentExercise) =>
            currentExercise?._id?.toString() === incomingId
        )
        : -1;

      if (existingIndex >= 0) {
        mergedExercises[existingIndex] = incomingExercise;
      } else {
        mergedExercises.push(incomingExercise);
      }
    });

    return mergedExercises;
  }

  public searchExercises(workout: Workout, currentSplit: Split) {
    this.workout = workout;
    const modalOptions: ModalOptions = {
      component: SearchExercisesPage,
      componentProps: {
        workout: workout,
        workoutIndex: this.workoutIndex,
        splitIndex: this.splitIndex,
        user: this.user,
        tableInUse: this.tableInUse,
        currentSplit: currentSplit,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data?.setChangeInfo) {
        this.handleSetChangeInfo(res.data.setChangeInfo);
        return;
      }

      if (res.data) this.getCurrentWorkout(res.data);
    });

    // this.navigationService.goToExercises(
    //   workout,
    //   this.workoutIndex,
    //   this.user,
    //   this.tableInUse,
    //   currentSplit
    // );
  }

  private enterExerciseSelectionMode(): void {
    this.exerciseSelectionMode = true;
    this.selectedExerciseIndices = new Set();
    const clipboard = new ExerciseClipboard(this.workout._id, []);
    this.workoutService.setExerciseClipboard = clipboard;
    this.exerciseCopyEvent.emit({
      workoutId: this.workout._id,
      workoutIndex: this.workoutIndex,
      selectionMode: true,
      selectedIndices: this.selectedExerciseIndices,
    });
  }

  public onExerciseCheckboxChange(index: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (!this.exerciseSelectionMode) {
      this.enterExerciseSelectionMode();
    }
    if (this.selectedExerciseIndices.has(index)) {
      this.selectedExerciseIndices.delete(index);
    } else {
      this.selectedExerciseIndices.add(index);
    }
    const selected = Array.from(this.selectedExerciseIndices).map(
      (i) => this.workout.exercises[i]
    );
    this.workoutService.setExerciseClipboard = new ExerciseClipboard(
      this.workout._id,
      selected
    );
    this.exerciseCopyEvent.emit({
      workoutId: this.workout._id,
      workoutIndex: this.workoutIndex,
      selectionMode: true,
      selectedIndices: this.selectedExerciseIndices,
    });
  }

  public toggleExerciseSelection(index: number): void {
    if (!this.exerciseSelectionMode) return;
    if (this.selectedExerciseIndices.has(index)) {
      this.selectedExerciseIndices.delete(index);
    } else {
      this.selectedExerciseIndices.add(index);
    }
    const selected = Array.from(this.selectedExerciseIndices).map(
      (i) => this.workout.exercises[i]
    );
    this.workoutService.setExerciseClipboard = new ExerciseClipboard(
      this.workout._id,
      selected
    );
    this.exerciseCopyEvent.emit({
      workoutId: this.workout._id,
      workoutIndex: this.workoutIndex,
      selectionMode: true,
      selectedIndices: this.selectedExerciseIndices,
    });
  }

  public isExerciseSelected(index: number): boolean {
    return this.selectedExerciseIndices.has(index);
  }

  public canPasteExercises(): boolean {
    if (!this.workoutService.hasExerciseClipboard()) return false;
    const clipboard = this.workoutService.getExerciseClipboard;
    return clipboard.sourceWorkoutId !== this.workout._id && clipboard.selectedExercises.length > 0;
  }

  public async pasteExercises(): Promise<void> {
    const clipboard = this.workoutService.getExerciseClipboard;
    if (!clipboard || clipboard.selectedExercises.length === 0) return;

    const modalResult = await this.ionicUtilService.showModal({
      component: ClipboardExercisesModalComponent,
      componentProps: {
        exercises: clipboard.selectedExercises,
        mode: 'paste',
      },
      cssClass: 'clipboard-modal',
    });

    if (modalResult.role !== 'confirm') return;

    const selected = modalResult.data.selectedExercises as CustomExercise[];
    if (selected.length === 0) return;

    this.exerciseClipboardLoad = true;

    const prevExerciseCount = this.workout.exercises.length;

    this.workoutService
      .pasteExercises(
        this.tableInUse._id,
        clipboard.sourceWorkoutId,
        this.workout._id,
        selected
      )
      .subscribe((res) => {
        if (res?.tableInUse) {
          this.tableInUse = res.tableInUse;
          this.tableService.setCurrentTable = res.tableInUse;
        }
        this.exerciseClipboardLoad = false;

        const firstPastedIndex = prevExerciseCount;
        this.utilService.requestScrollToExercise({
          workoutIndex: this.workoutIndex,
          exerciseIndex: firstPastedIndex,
          highlightClass: 'highlight-new-set',
        });

        const highlighted = new Set<number>();
        const highlightAllPasted = (attempt = 0) => {
          if (attempt > 30) return;
          let allFound = true;
          for (let i = 0; i < selected.length; i++) {
            if (highlighted.has(i)) continue;
            const idx = firstPastedIndex + i;
            const el = document.getElementById(
              `exercise-${this.workoutIndex}-${idx}`
            );
            if (el) {
              highlighted.add(i);
              el.classList.add('highlight-new-set');
              setTimeout(() => el.classList.remove('highlight-new-set'), 2000);
            } else {
              allFound = false;
            }
          }
          if (!allFound) {
            setTimeout(() => highlightAllPasted(attempt + 1), 200);
          }
        };
        setTimeout(() => highlightAllPasted(), 600);
        const toast: ToastOptions = {
          message: this.translate.instant('TABLES.EXERCISES_PASTED'),
          duration: 2000,
        };
        this.ionicUtilService.showToast(toast);
        this.workoutService.clearExerciseClipboard();
        this.exerciseCopyEvent.emit({
          workoutId: null,
          workoutIndex: null,
          selectionMode: false,
          selectedIndices: new Set(),
        });
      });
  }

  public exitExerciseSelectionMode(): void {
    this.exerciseSelectionMode = false;
    this.selectedExerciseIndices = new Set();
    this.workoutService.clearExerciseClipboard();
    this.exerciseCopyEvent.emit({
      workoutId: null,
      workoutIndex: null,
      selectionMode: false,
      selectedIndices: new Set(),
    });
  }

  private getActionsPopover(): ACTION_TYPE[] {
    const actions: ACTION_TYPE[] = [];

    if (this.workout.exercises.length === 0) {
      // Sin ejercicios: solo acciones básicas del workout.
      actions.push(ACTIONS[this.ACTION_TYPES.edit]);
      actions.push(ACTIONS[this.ACTION_TYPES.duplicate]);
      actions.push(ACTIONS[this.ACTION_TYPES.delete]);
      return actions;
    }

    // Orden visual coherente: acciones de contenido, luego de estado, y
    // finalmente las destructivas.
    actions.push(ACTIONS[this.ACTION_TYPES.edit]);

    if (this.workout.exercises.length > 0) {
      actions.push(ACTIONS[this.ACTION_TYPES.copyExercises]);
      actions.push(ACTIONS[this.ACTION_TYPES.moveExercises]);
    }

    actions.push(ACTIONS[this.ACTION_TYPES.note]);

    // "Ver resumen" solo se ofrece si el entreno ya está terminado.
    if (this.workout.date) {
      actions.push(ACTIONS[this.ACTION_TYPES.viewSummary]);
    }

    // "Saltar día" solo si aún no está terminado ni saltado;
    // "Quitar descanso" solo si ya está marcado como saltado.
    if (this.workout.rest) {
      actions.push(ACTIONS[this.ACTION_TYPES.unskipWorkout]);
    } else if (!this.workout.date) {
      actions.push(ACTIONS[this.ACTION_TYPES.skipWorkout]);
    }

    // "Detener entrenamiento" solo si este es el que está en curso ahora mismo.
    if (this.workout._id === this.user?.workoutInUse) {
      actions.push(ACTIONS[this.ACTION_TYPES.stopWorkout]);
    }

    actions.push(ACTIONS[this.ACTION_TYPES.delete]);

    return actions;
  }

  private handleSetChangeInfo(changeInfo: any): void {
    if (!changeInfo) return;

    if (changeInfo.tableInUse) {
      this.tableInUse = changeInfo.tableInUse;
      this.tableService.setCurrentTable = changeInfo.tableInUse;
    }

    if (changeInfo.exerciseChanged) {
      this.setUpdatedEvent.emit({
        workoutIndex: this.workoutIndex,
        exerciseIndex: changeInfo.exerciseIndex,
      });

      this.utilService.requestScrollToExercise({
        workoutIndex: this.workoutIndex,
        exerciseIndex: changeInfo.exerciseIndex,
        highlightClass: 'highlight-updated-set',
      });
    } else if (changeInfo.setsCreated > 0) {
      this.setAddedEvent.emit({
        workoutIndex: this.workoutIndex,
        exerciseIndex: changeInfo.exerciseIndex,
      });
    } else if (changeInfo.exerciseDeleted) {
      return;
    } else if (changeInfo.setsDeleted > 0) {
      this.setDeletedEvent.emit({
        workoutIndex: this.workoutIndex,
        exerciseIndex: changeInfo.exerciseIndex,
      });
    } else if (changeInfo.setsUpdated > 0) {
      this.setUpdatedEvent.emit({
        workoutIndex: this.workoutIndex,
        exerciseIndex: changeInfo.exerciseIndex,
      });
    }
  }

  private setWorkoutNote(): void {
    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.WORKOUT_NOTE'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          value: this.workout.notes,
          placeholder: this.translate.instant('TABLES.WORKOUT_NOTES_PLACEHOLDER'),
          attributes: { maxlength: 500 },
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            if (data.notes && data.notes.trim() !== '') {
              this.workout.notes = data.notes;
              this.workoutService
                .modifyWorkout(this.workout)
                .subscribe(
                  (resWorkout) =>
                    (this.workoutService.setCurrentWorkout = resWorkout)
                );
            } else {
              const toastOptions: ToastOptions = {
                message: this.translate.instant('TABLES.FIELD_NOT_EMPTY'),
                duration: 2000,
              };
              this.ionicUtilService.showToast(toastOptions);
              return false;
            }
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private updateWorkoutName(): void {
    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.CHANGE_NAME'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.workout.name,
          placeholder: this.translate.instant('TABLES.WORKOUT_NAME_PLACEHOLDER'),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            if (data.name && data.name.trim() !== '') {
              this.load = false;
              this.workoutService
                .updateWorkoutsName(
                  this.tableInUse._id,
                  this.workout._id,
                  data.name
                )
                .subscribe(() => {
                  // Emitir evento para que mesocycle actualice solo los nombres
                  this.workoutNameUpdatedEvent.emit({
                    workoutIndex: this.workoutIndex,
                    newName: data.name,
                  });

                  this.load = true;
                  const toastOptions: ToastOptions = {
                    message: this.translate.instant('TABLES.WORKOUT_NAME_UPDATED'),
                    duration: 1000,
                  };

                  this.ionicUtilService.showToast(toastOptions);
                });
            }
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public getWorkoutMuscleGroups(): string[] {
    const muscleGroupsSet = new Set<string>();

    this.workout.exercises.forEach((exerciseTemp) => {
      exerciseTemp.exercise.muscleGroups1.forEach((group) => {
        muscleGroupsSet.add(group);
      });

      // exerciseTemp.exercise.muscleGroups2.forEach((group) => {
      //   muscleGroupsSet.add(group);
      // });
    });

    return Array.from(muscleGroupsSet);
  }

  public isCustomExerciseCompleted(customExercise: CustomExercise): boolean {
    return this.customExerciseService.isCustomExerciseCompleted(customExercise);
  }

  public manageNote(customExercise: CustomExercise): void {
    this.workout.exercises.forEach((exerciseTemp) => {
      if (exerciseTemp._id === customExercise._id) {
        exerciseTemp.notes = customExercise.notes;
      }
    });
    this.utilService.manageNote(customExercise, this.customExerciseService);
  }

  public sortSets(sets: any[]): any[] {
    if (!sets) return [];
    return [...sets].sort((a, b) => a.order - b.order);
  }

  // TODO: Actualmente se usa workout.date para comprobar que un
  // entrenamiento está terminado
  public isWorkoutDoned(): boolean {
    return this.utilService.isWorkoutDoned(this.workout);
  }

  // Verde = terminado (workout.date), azul = saltado (workout.rest).
  public getWorkoutStatusColor(fallback: string = ''): string {
    if (this.workout.date) return 'var(--ion-color-success)';
    if (this.workout.rest) return 'var(--ion-color-alternative)';
    return fallback;
  }

  public getWorkoutSets(): number {
    return this.workout.exercises.reduce((totalSets, exercise) => {
      return totalSets + exercise.sets.length;
    }, 0);
  }

  public generatePopoverId(date: Date): string {
    return date
      ? 'w-open-date-split-' + this.workoutIndex + '-' + this.splitIndex
      : '';
  }

  public stopPropagation(workout: Workout, event: Event): void {
    if (workout.date) event.stopPropagation();
  }

  public getISODate(workoutDate: Date): string {
    return workoutDate ? new Date(workoutDate).toISOString() : undefined;
  }

  public changeWorkoutDate(workout: Workout, dateISO) {
    if (!dateISO) return;
    workout.date = new Date(dateISO);

    // Actualizar el date en el workout correspondiente dentro de la tabla
    this.tableInUse.splits
      .flatMap((splitTemp) => splitTemp.workouts)
      .forEach((wTemp) => {
        if (workout._id === wTemp._id) {
          wTemp.date = workout.date;
        }
      });

    this.workoutService.modifyWorkout(workout).subscribe(() => {
      this.tableService.setCurrentTable = this.tableInUse;
      const toastOptions: ToastOptions = {
        message: this.translate.instant('TABLES.DATE_UPDATED'),
        duration: 2000,
      };
      this.ionicUtilService.showToast(toastOptions);
    });
  }

  public updateWorkoutNote(note: string | undefined): void {
    if (note) this.workout.notes = note;
    else delete this.workout.notes;
    this.tableInUse.splits
      .flatMap((splitTemp) => splitTemp.workouts)
      .forEach((wTemp) => {
        if (this.workout._id === wTemp._id) {
          if (note) wTemp.notes = note;
          else delete wTemp.notes;
        }
      });

    const isCurrentWorkout =
      this.workoutService.currentWorkout?._id === this.workout._id;
    if (isCurrentWorkout) {
      this.workoutService.setCurrentWorkout = this.workout;
    }

    this.tableService.setCurrentTable = this.tableInUse;
  }

  public updateExerciseNote(
    note: string | undefined,
    customExercise: CustomExercise
  ): void {
    if (note) customExercise.notes = note;
    else delete customExercise.notes;

    this.tableInUse.splits
      .flatMap((splitTemp) => splitTemp.workouts)
      .flatMap((wTemp) => wTemp.exercises)
      .forEach((exerciseTemp) => {
        if (exerciseTemp?._id === customExercise._id) {
          if (note) exerciseTemp.notes = note;
          else delete exerciseTemp.notes;
        }
      });

    const isCurrentWorkout =
      this.workoutService.currentWorkout?._id === this.workout._id;

    console.debug('[WorkoutComponent] Exercise note updated', {
      tableId: this.tableInUse?._id,
      workoutId: this.workout?._id,
      customExerciseId: customExercise?._id,
      isCurrentWorkout,
      noteExists: !!note,
    });

    if (isCurrentWorkout) {
      this.workoutService.setCurrentWorkout = this.workout;
    }

    this.tableService.setCurrentTable = this.tableInUse;
  }

  public playWorkout(): void {
    if (this.workout._id !== this.user.workoutInUse) {
      const pendingPreviousWorkouts = this.getPendingPreviousWorkouts();

      if (pendingPreviousWorkouts.length > 0) {
        this.confirmSkipPreviousWorkouts(pendingPreviousWorkouts);
        return;
      }

      this.showStartWorkoutAlert();
      return;
    }

    this.workoutService.setCurrentWorkout = this.workout;
    this.navigationService.goToCurrentWorkout();
  }

  // Todos los entrenamientos anteriores a este en la rutina completa, cruzando
  // micro-ciclos (orden = Table.splits[].workouts[] tal cual se muestran), que
  // no estén ni terminados ni ya saltados.
  private getPendingPreviousWorkouts(): Workout[] {
    const flatWorkouts =
      this.tableInUse?.splits?.flatMap((splitTemp) => splitTemp.workouts) ??
      [];
    const currentIndex = flatWorkouts.findIndex(
      (workoutTemp) => workoutTemp._id === this.workout._id
    );

    if (currentIndex <= 0) return [];
    return flatWorkouts
      .slice(0, currentIndex)
      .filter((workoutTemp) => !workoutTemp.date && !workoutTemp.rest);
  }

  private async confirmSkipPreviousWorkouts(pendingWorkouts: Workout[]): Promise<void> {
    const workoutItems: WorkoutSkipItem[] = pendingWorkouts.map((w) => {
      const si = this.tableInUse.splits.findIndex((s) =>
        s.workouts.some((sw) => sw._id === w._id)
      );
      return { workout: w, splitIndex: si >= 0 ? si : 0 };
    });
    const modal = await this.modalController.create({
      component: SkipWorkoutModalComponent,
      componentProps: {
        workoutItems,
        header: this.translate.instant('TABLES.PREVIOUS_WORKOUT_PENDING'),
        message: this.translate.instant('TABLES.PREVIOUS_WORKOUT_PENDING_MSG'),
        confirmText: this.translate.instant('TABLES.SKIP_AND_CONTINUE_BTN'),
        showSecondaryAction: true,
        secondaryText: this.translate.instant('TABLES.CONTINUE_WITHOUT_SKIP_BTN'),
      },
    });
    await modal.present();
    const { role } = await modal.onDidDismiss();
    if (role === 'confirm') {
      forkJoin(
        pendingWorkouts.map((workoutTemp) =>
          this.applyWorkoutSkip(workoutTemp, true)
        )
      ).subscribe(() => {
        this.showStartWorkoutAlert();
      });
    } else if (role === 'secondary') {
      this.showStartWorkoutAlert();
    }
  }

  private showStartWorkoutAlert(): void {
    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.START_WORKOUT'),
      message: this.translate.instant('TABLES.START_WORKOUT_CONFIRM', { name: this.workout.name }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translate.instant('TABLES.START'),
          handler: () => {
            if (this.user?.premium?.entitled) {
              this.startWorkoutAndNavigate();
              return;
            }

            this.adMobService
              .interstitial('start_workout')
              .then(() => {
                this.startWorkoutAndNavigate();
              })
              .catch((error) => {
                console.error(
                  'Error al mostrar anuncio start_workout:',
                  error
                );
              });
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  private startWorkoutAndNavigate(): void {
    const dangling = this.workoutService.getDanglingWorkout(
      this.user.workoutInUse,
      this.workout._id,
      this.tableInUse
    );

    if (!dangling) {
      this.proceedStartWorkoutAndNavigate();
      return;
    }

    if (!this.workoutService.hasProgress(dangling)) {
      this.stopDanglingWorkout(dangling, () => this.proceedStartWorkoutAndNavigate());
      return;
    }

    this.showResolveDanglingWorkoutAlert(dangling, () =>
      this.proceedStartWorkoutAndNavigate()
    );
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

  private proceedStartWorkoutAndNavigate(): void {
    // If the workout was completed, reset everything
    const wasCompleted = !!this.workout.date;
    this.workout.date = null;

    // Reset startedAt if the workout was completed before
    if (!this.workout.startedAt || wasCompleted) {
      this.workout.startedAt = new Date();
    }

    // If the workout was completed, reset all sets to not done
    if (wasCompleted) {
      this.workout.exercises = this.workout.exercises?.map(exercise => ({
        ...exercise,
        sets: exercise.sets?.map(set => ({
          ...set,
          doned: false
        }))
      }));
    }

    // Update the workout in tableInUse as well, so it's in sync
    if (this.tableInUse) {
      this.tableInUse.splits.forEach(split => {
        const workoutIndex = split.workouts.findIndex(w => w._id === this.workout._id);
        if (workoutIndex !== -1) {
          split.workouts[workoutIndex] = { ...this.workout };
        }
      });
      this.tableService.setCurrentTable = this.tableInUse;
    }

    this.workoutService.modifyWorkout(this.workout).subscribe(() => {
      this.user.workoutInUse = this.workout._id;

      this.userService.updateUser(this.user).subscribe(() => {
        this.workoutService.setCurrentWorkout = this.workout;
        this.navigationService.goToCurrentWorkout();
      });
    });
  }

  // Funciones para formatear valores esperados
  public formatExpectedReps(expectedReps: number[]): string {
    if (!expectedReps || expectedReps.length === 0) return '—';

    const firstExpected =
      expectedReps[0] !== null &&
      expectedReps[0] !== undefined &&
      !isNaN(expectedReps[0]);
    const secondExpected =
      expectedReps[1] !== null &&
      expectedReps[1] !== undefined &&
      !isNaN(expectedReps[1]);

    if (firstExpected && secondExpected) {
      return `${expectedReps[0]} - ${expectedReps[1]}`;
    } else if (firstExpected) {
      return `${expectedReps[0]}`;
    } else if (secondExpected) {
      return `${expectedReps[1]}`;
    } else {
      return '—';
    }
  }

  public formatExpectedRir(expectedRir: number[]): string {
    if (!expectedRir || expectedRir.length === 0) return '— RIR';

    const firstExpected =
      expectedRir[0] !== null &&
      expectedRir[0] !== undefined &&
      !isNaN(expectedRir[0]);
    const secondExpected =
      expectedRir[1] !== null &&
      expectedRir[1] !== undefined &&
      !isNaN(expectedRir[1]);

    if (firstExpected && secondExpected) {
      return `${expectedRir[0]} - ${expectedRir[1]} RIR`;
    } else if (firstExpected) {
      return `${expectedRir[0]} RIR`;
    } else if (secondExpected) {
      return `${expectedRir[1]} RIR`;
    } else {
      return '— RIR';
    }
  }

  public hasValidExpectedRir(expectedRir: number[]): boolean {
    if (!expectedRir || expectedRir.length === 0) return false;

    const firstExpected =
      expectedRir[0] !== null &&
      expectedRir[0] !== undefined &&
      !isNaN(expectedRir[0]);
    const secondExpected =
      expectedRir[1] !== null &&
      expectedRir[1] !== undefined &&
      !isNaN(expectedRir[1]);

    return firstExpected || secondExpected;
  }

  public formatPerformedRir(rir: unknown): string {
    return formatRirValue(rir, { includeUnit: true });
  }

  public isFail(set: any): boolean {
    if (set?.doned) {
      return isRirFail(set.rir);
    }

    return !!(
      set.expectedRir &&
      (set.expectedRir[0] === -1 || set.expectedRir[1] === -1)
    );
  }


}
