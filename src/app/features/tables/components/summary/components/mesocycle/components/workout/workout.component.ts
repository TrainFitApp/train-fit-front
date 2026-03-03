import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ActionSheetOptions,
  AlertOptions,
  ModalController,
  ModalOptions,
  PopoverOptions,
  ToastOptions,
} from '@ionic/angular';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Split } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { ConfigExercisePage } from 'src/app/features/exercises/components/config-exercise/config-exercise.page';
import { SearchExercisesPage } from 'src/app/shared/components/search-exercises/search-exercises.page';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTION_VALUES,
  ACTIONS,
} from 'src/app/shared/constants/actions';
import { STATES } from 'src/app/shared/constants/states';
import { WorkoutClipboard } from 'src/app/shared/models/workout-clipboard';
import { OrderExercisesPage } from '../order-exercises/order-exercises.page';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent {
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
  public isPopoverOpen: boolean;

  @Input()
  public pasteMode = false;

  @Input()
  public tableInUse: Table;

  @Output()
  public pasteEvent = new EventEmitter();

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

  public workoutClipboard: Workout;

  public note: string;

  public arrowRotate = false;

  public visibleMuscleGroups: boolean = false;

  public load = true;

  public STATES = STATES;

  public ACTION_VALUES = ACTION_VALUES;
  public ACTION_TYPES = ACTION_TYPES;

  public test: boolean = false;

  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private workoutService: WorkoutService,
    private customExerciseService: CustomExerciseService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private tableService: TableService,
    private navigationService: NavigationService
  ) {}

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
          case ACTIONS[this.ACTION_TYPES.copy].id:
            this.pasteMode = true;
            this.pasteEvent.emit({
              workoutId: this.workout._id,
              paste: this.pasteMode,
              workoutIndex: this.workoutIndex,
            });
            this.workoutService.setWorkoutClipboard = this.workout;
            this.utilService.setCancelMode = true;
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
        }
      }
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
      header: 'Eliminar entrenamientos',
      message: `Se borrarán todos los entrenamientos ${this.workout.name} de todos los micro-ciclos`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'ELIMINAR',
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
                  message: `¡${workoutsToDelete[0].name} eliminado con éxito!`,
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
      header: 'Eliminar ejercicio',
      message: `¿Estás seguro de que quieres eliminar ${exerciseName}? Esto lo eliminará también de todos los micro-ciclos.`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'ELIMINAR',
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
          if (workout._id === workoutTemp._id)
            workoutTemp.exercises = workout.exercises;
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

  public searchExercises(workout: Workout, currentSplit: Split) {
    this.pasteEvent.emit();
    this.workout = workout;
    const modalOptions: ModalOptions = {
      component: SearchExercisesPage,
      componentProps: {
        workout: workout,
        workoutIndex: this.workoutIndex,
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

  public createWorkoutFromClipboard(): void {
    this.load = false;

    this.workoutClipboard = this.workoutService.getWorkoutClipboard;

    this.workoutService
      .pasteWorkout(new WorkoutClipboard(this.workoutClipboard, this.workout))
      .subscribe((resWorkout) => {
        this.workout = resWorkout;

        // Actualizar el workout en la tabla local
        this.tableInUse.splits[this.splitIndex].workouts[this.workoutIndex] =
          resWorkout;

        // Propagar el cambio a través del signal
        this.tableService.setCurrentTable = this.tableInUse;

        this.pasteEvent.emit({
          paste: false,
          workoutIndex: this.workoutIndex,
          pasted: true,
        });

        const toast: ToastOptions = {
          message: 'Entrenamiento pegado',
          duration: 2000,
        };
        this.ionicUtilService.showToast(toast);

        this.utilService.setCancelMode = false;

        this.load = true;
      });
  }

  private getActionsPopover(): ACTION_TYPE[] {
    let actions = this.ACTION_VALUES;
    if (this.workout.exercises.length === 0) {
      actions = actions.filter(
        (actionTemp) =>
          actionTemp.id === ACTIONS[this.ACTION_TYPES.delete].id ||
          actionTemp.id === ACTIONS[this.ACTION_TYPES.edit].id
      );
    } else
      actions = actions.filter(
        (actionTemp) =>
          actionTemp.id !== ACTIONS[this.ACTION_TYPES.deselect].id &&
          actionTemp.id !== ACTIONS[this.ACTION_TYPES.duplicate].id
      );

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
      header: 'Notas',
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          value: this.workout.notes,
          placeholder: 'Escribe tus notas aquí...',
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'GUARDAR',
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
                message: 'El campo no puede estar vacío',
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

  public canPaste(): boolean {
    let indexCopiedWorkout: number;
    let splitIndex: number;

    this.tableInUse.splits.forEach((splitTemp, indexSplit) => {
      splitTemp.workouts.forEach((workoutTemp, indexWorkout) => {
        if (this.workoutService.getWorkoutClipboard?._id === workoutTemp._id) {
          indexCopiedWorkout = indexWorkout;
          splitIndex = indexSplit;
        }
      });
    });
    return (
      indexCopiedWorkout === this.workoutIndex && this.splitIndex !== splitIndex
    );
  }

  public alreadyCopied(): boolean {
    let indexCopiedWorkout: number;
    let splitIndex: number;

    this.tableInUse.splits.forEach((splitTemp, indexSplit) => {
      splitTemp.workouts.forEach((workoutTemp, indexWorkout) => {
        if (this.workoutService.getWorkoutClipboard?._id === workoutTemp._id) {
          indexCopiedWorkout = indexWorkout;
          splitIndex = indexSplit;
        }
      });
    });
    return (
      indexCopiedWorkout === this.workoutIndex && this.splitIndex === splitIndex
    );
  }

  private updateWorkoutName(): void {
    const alertOptions: AlertOptions = {
      header: 'Cambiar nombre',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.workout.name,
          placeholder: 'Nombre del entrenamiento',
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'GUARDAR',
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
                    message: 'Nombre de entrenamientos actualizados',
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
    return sets.sort((a, b) => a.order - b.order);
  }

  // TODO: Actualmente se usa workout.date para comprobar que un
  // entrenamiento está terminado
  public isWorkoutDoned(): boolean {
    return this.utilService.isWorkoutDoned(this.workout);
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
        message: 'Fecha actualizada',
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
    this.workoutService.setCurrentWorkout = this.workout;
    this.navigationService.goToCurrentWorkout();

    if (this.workout._id !== this.user.workoutInUse) {
      const alertOptions: AlertOptions = {
        header: 'Iniciar entrenamiento',
        message:
          this.workout.name +
          ' se mostrará en la pestaña de resumen y perfil como entrenamiento en uso',
        buttons: [
          {
            text: 'CANCELAR',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'INICIAR',
            handler: () => {
              delete this.workout.date;
              this.workoutService.modifyWorkout(this.workout).subscribe(() => {
                this.user.workoutInUse = this.workout._id;

                this.userService.updateUser(this.user).subscribe(() => {
                  this.workoutService.setCurrentWorkout = this.workout;
                });
              });
            },
          },
        ],
      };
      this.ionicUtilService.showAlert(alertOptions);
    }
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

  public isFail(set: any): boolean {
    if (set?.doned) {
      return set.rir === -1;
    }

    return !!(
      set.expectedRir &&
      (set.expectedRir[0] === -1 || set.expectedRir[1] === -1)
    );
  }

  public showNavigationToast(event: Event): void {
    event.stopPropagation();

    const toastOptions: ToastOptions = {
      message:
        'Navega a otros micro-ciclos para pegar el entrenamiento que tienes copiado',
      duration: 2000,
    };

    this.ionicUtilService.showToast(toastOptions);
  }
}
