import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  effect,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AlertOptions, Platform, ToastOptions } from '@ionic/angular';
import { Split } from 'src/app/core/models/split';
import { Subject } from 'rxjs';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { SplitService } from 'src/app/core/services/split/split.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import {
  ACTIONS_FAB,
  ACTIONS_FAB_TYPES,
} from 'src/app/shared/constants/actions-fab';
import { STATES } from 'src/app/shared/constants/states';
import { TABLE_MODE_TYPES } from 'src/app/shared/constants/table-mode';
import { SplitMenuPopoverComponent } from './components/split-menu-popover/split-menu-popover.component';

@Component({
  selector: 'app-mesocycle',
  templateUrl: './mesocycle.page.html',
  styleUrls: ['./mesocycle.page.scss'],
})
export class MesocyclePage implements OnInit, AfterViewInit {
  @Output()
  public currentIndex = new EventEmitter<number>();

  public user: User;
  private _currentSplitIndex: number = 0;

  public get currentSplitIndex(): number {
    return this._currentSplitIndex;
  }

  public set currentSplitIndex(value: number) {
    this._currentSplitIndex = value;
    this.updateCurrentSplit();
    this.currentIndex.emit(this._currentSplitIndex);
    setTimeout(() => {
      this.scrollToOpenWorkout();
    }, 200);
  }
  public currentSplit: Split;
  public tableInUse: Table;
  public tableInUseAux: Table;
  public currentWorkout: Workout;
  public pasteMode: boolean;
  public workoutIdPaste: string;
  public loadTable: boolean;
  public loadingFab: boolean;
  public loadingSplit: boolean = false;
  public stateSelected = STATES.static;

  public tableMode: string;
  public openWorkoutIndex: number;

  public TABLE_MODE_TYPES = TABLE_MODE_TYPES;

  // Control de animaciones de navegación
  public animatingLeft: boolean = false;
  public animatingRight: boolean = false;

  // Getter para obtener splits ordenados por índice descendente
  private _reversedSplitsWithIndex: Array<{
    split: any;
    originalIndex: number;
  }> = [];

  public get reversedSplitsWithIndex(): Array<{
    split: any;
    originalIndex: number;
  }> {
    return this._reversedSplitsWithIndex;
  }

  private updateReversedSplitsWithIndex(): void {
    if (!this.tableInUseAux?.splits) {
      this._reversedSplitsWithIndex = [];
      return;
    }

    this._reversedSplitsWithIndex = this.tableInUseAux.splits
      .map((split, index) => ({ split, originalIndex: index }))
      .reverse();
  }

  // Inyección de servicios con Signals
  public readonly tableService = inject(TableService);
  private readonly userService = inject(UserService);
  private readonly workoutService = inject(WorkoutService);

  // Subject para gestionar el ciclo de vida de suscripciones
  private destroy$ = new Subject<void>();

  constructor(
    public utilService: UtilService,
    public platform: Platform,
    private splitService: SplitService,
    private ionicUtilService: IonicUtilService,
    private navigationService: NavigationService,
    private cdr: ChangeDetectorRef
  ) {
    this.initVariables();
    // Effect para la tabla actual (reemplaza la suscripción)
    effect(() => {
      const resTableInUse = this.tableService.currentTable();
      if (resTableInUse) {
        // Hacer una copia profunda de la tabla para evitar mutaciones compartidas
        this.tableInUseAux = JSON.parse(JSON.stringify(resTableInUse));
        this.tableInUse = JSON.parse(JSON.stringify(resTableInUse));

        this.tableInUseAux.splits = this.tableInUseAux.splits.map((sTemp) => {
          // Clonar el objeto sTemp para evitar referencias compartidas
          let clonedTemp = { ...sTemp };
          delete clonedTemp.name;
          delete clonedTemp.workouts;
          return clonedTemp;
        });

        this.updateReversedSplitsWithIndex();
        this.initPaginatedSplit();
        this.updateCurrentSplit();
      }
    });

    // Effect para el usuario
    effect(() => {
      this.user = this.userService.localUser();
    });

    // Effect para el workout actual
    effect(() => {
      const resCurrentWorkout = this.workoutService.currentWorkoutSignal();
      if (resCurrentWorkout && this.tableInUse?.splits) {
        this.currentWorkout = { ...resCurrentWorkout };

        // Actualizamos puntualmente el workout en la tabla para evitar refresco completo
        this.tableInUse.splits.forEach((split) => {
          const index = split.workouts.findIndex(
            (w) => w._id === resCurrentWorkout._id
          );
          if (index !== -1) {
            split.workouts[index] = { ...resCurrentWorkout };
          }
        });

        // Si el split actual contiene el workout, lo actualizamos también
        if (this.currentSplit?.workouts) {
          const index = this.currentSplit.workouts.findIndex(
            (w) => w._id === resCurrentWorkout._id
          );
          if (index !== -1) {
            this.currentSplit.workouts[index] = { ...resCurrentWorkout };
          }
        }
        this.cdr.markForCheck();
      }
    });
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeNavigation();
    });
  }

  public ionViewDidEnter(): void {
    if (!this.tableInUse?.splits?.length) return;

    // Si no hay entrenamiento en uso, auto-posicionamos según progreso (caso Summary -> Mesocycle)
    if (!this.user?.workoutInUse) {
      const indexSplit = this.tableInUse.splits.findIndex(
        (sTemp) => !this.utilService.isSplitDoned(sTemp)
      );

      // Si todos están terminados, ir al último; de lo contrario al primero pendiente
      const targetSplitIndex =
        indexSplit !== -1 ? indexSplit : this.tableInUse.splits.length - 1;

      if (targetSplitIndex === this.currentSplitIndex) {
        this.scrollToOpenWorkout();
      } else {
        this.currentSplitIndex = targetSplitIndex;
      }
      return;
    }

    // Lógica para cuando hay un entrenamiento en uso
    let targetSplitIndex = -1;
    let targetWorkoutIndex = -1;
    for (let s = 0; s < this.tableInUse.splits.length; s++) {
      const split = this.tableInUse.splits[s];
      const wIndex = split?.workouts?.findIndex(
        (w) => w?._id === this.user.workoutInUse
      );
      if (wIndex !== undefined && wIndex !== -1) {
        targetSplitIndex = s;
        targetWorkoutIndex = wIndex;
        break;
      }
    }

    if (targetSplitIndex === -1 || targetWorkoutIndex === -1) return;

    this.openWorkoutIndex = targetWorkoutIndex;
    if (targetSplitIndex === this.currentSplitIndex) {
      this.scrollToOpenWorkout();
    } else {
      this.currentSplitIndex = targetSplitIndex;
    }
  }

  public ionViewWillLeave(): void {
    this.validateAndSyncTableNotes();
    this.cancelCopyMode();
  }

  private validateAndSyncTableNotes(): void {
    const signalTable = this.tableService.tableInUse;
    if (!signalTable || !this.tableInUse) return;

    const mismatch = this.getFirstExerciseNoteMismatch(
      this.tableInUse,
      signalTable
    );

    if (!mismatch) return;

    console.debug('[MesocyclePage] Note mismatch detected, syncing table', {
      tableId: this.tableInUse?._id,
      customExerciseId: mismatch.customExerciseId,
      localNote: mismatch.localNote,
      signalNote: mismatch.signalNote,
    });

    this.tableService.setCurrentTable = this.tableInUse;
  }

  private getFirstExerciseNoteMismatch(
    localTable: Table,
    signalTable: Table
  ):
    | {
      customExerciseId: string;
      localNote: string | undefined;
      signalNote: string | undefined;
    }
    | undefined {
    const signalNotesById = new Map<string, string | undefined>();
    signalTable.splits
      .flatMap((split) => split.workouts)
      .flatMap((workout) => workout.exercises)
      .forEach((exercise) => {
        signalNotesById.set(exercise._id, exercise.notes);
      });

    const localNotesById = new Map<string, string | undefined>();
    const localExercises = localTable.splits
      .flatMap((split) => split.workouts)
      .flatMap((workout) => workout.exercises);

    for (const exercise of localExercises) {
      localNotesById.set(exercise._id, exercise.notes);
      const signalNote = signalNotesById.get(exercise._id);
      if (exercise.notes !== signalNote) {
        return {
          customExerciseId: exercise._id,
          localNote: exercise.notes,
          signalNote,
        };
      }
    }

    for (const [customExerciseId, signalNote] of signalNotesById.entries()) {
      if (!localNotesById.has(customExerciseId)) {
        return {
          customExerciseId,
          localNote: undefined,
          signalNote,
        };
      }
    }

    return;
  }

  public initVariables(): void {
    console.log('init');

    this.utilService.getTableMode.subscribe(
      (resTableMode) => (this.tableMode = resTableMode)
    );

    this.splitService._addOrDeleteSplitSlide$.subscribe((res) => {
      setTimeout(() => {
        if (res) {
          // Al agregar un split, navegar al siguiente
          this.currentSplitIndex = Math.min(
            this.currentSplitIndex + 1,
            this.tableInUseAux.splits.length - 1
          );
        } else if (!res && this.currentSplitIndex !== 0) {
          // Al eliminar un split, navegar al anterior si no estamos en el primero
          this.currentSplitIndex = Math.max(this.currentSplitIndex - 1, 0);
        }
        this.updateCurrentSplit();
        this.currentIndex.emit(this.currentSplitIndex);
      });
    });

    this.utilService.getCancelMode.subscribe((resCancelMode) => {
      if (resCancelMode) {
        // Lógica para modo cancelar si es necesaria
      } else {
        this.pasteMode = undefined;
        this.workoutIdPaste = undefined;
      }
    });

    this.utilService.getScrollToExercise.subscribe((data) => {
      if (data) {
        this.openWorkoutIndex = data.workoutIndex;
        setTimeout(() => {
          this.scrollToExerciseWithRetry(
            data.workoutIndex,
            data.exerciseIndex,
            data.highlightClass
          );
        }, 400);
      }
    });
  }

  // Nuevos métodos para navegación con flechas y combo
  public navigateToPreviousSplit(): void {
    if (this.currentSplitIndex > 0) {
      this.animatingLeft = true;
      this.loadingSplit = true;
      setTimeout(() => {
        this.animatingLeft = false;
      }, 300);
      setTimeout(() => {
        this.currentSplitIndex = this.currentSplitIndex - 1;
        this.loadingSplit = false;
        // No hacer scroll si estamos en modo paste
        if (!this.pasteMode) {
          this.scrollToOpenWorkout();
        }
      }, 200);
    }
  }

  public navigateToNextSplit(): void {
    if (this.currentSplitIndex < this.tableInUse?.splits?.length - 1) {
      this.animatingRight = true;
      this.loadingSplit = true;
      setTimeout(() => {
        this.animatingRight = false;
      }, 300);
      setTimeout(() => {
        this.currentSplitIndex = this.currentSplitIndex + 1;
        this.loadingSplit = false;
        // No hacer scroll si estamos en modo paste
        if (!this.pasteMode) {
          this.scrollToOpenWorkout();
        }
      }, 200);
    }
  }

  private updateCurrentSplit(): void {
    if (
      this.tableInUse &&
      this.tableInUse.splits &&
      this.tableInUse.splits[this.currentSplitIndex]
    ) {
      // Crear una nueva referencia del split para forzar la detección de cambios
      this.currentSplit = { ...this.tableInUse.splits[this.currentSplitIndex] };
      // También crear nuevas referencias de los workouts
      if (this.currentSplit.workouts) {
        this.currentSplit.workouts = this.currentSplit.workouts.map((w) => ({
          ...w,
        }));
      }
    }
  }

  private initializeNavigation(): void {
    if (!this.tableInUse?.splits?.length) return;

    // Inicializar en el primer split sin workouts completados
    const indexSplit = this.tableInUse.splits.findIndex(
      (sTemp) => !this.utilService.isSplitDoned(sTemp)
    );

    if (indexSplit !== -1) {
      this.currentSplitIndex = indexSplit;
    } else {
      // Si todos están terminados, ir al último
      this.currentSplitIndex = this.tableInUse.splits.length - 1;
    }

    this.updateCurrentSplit();
    this.currentIndex.emit(this.currentSplitIndex);
  }

  public getSplitIndex(): void {
    this.currentIndex.emit(this._currentSplitIndex);
  }

  private initPaginatedSplit(): void {
    if (!this._currentSplitIndex) this._currentSplitIndex = 0;
    this.tableInUseAux.splits.forEach((sTemp, index) => {
      if (
        this._currentSplitIndex === index &&
        Object.keys(sTemp).length === 2
      ) {
        this.tableInUseAux.splits[index] = this.tableInUse.splits[index];
      }
    });
  }

  public isCurrentSplitCompleted(currentSplit: Split): boolean {
    if (
      !this.tableInUse ||
      !this.tableInUse.splits ||
      this.currentSplitIndex < 0
    ) {
      return false;
    }
    return this.utilService.isSplitDoned(currentSplit);
  }

  public editTableName(): void {
    const alertOptions = {
      header: 'Editar nombre de rutina',
      inputs: [
        {
          name: 'tableName',
          type: 'textarea' as 'textarea',
          value: this.tableInUse?.name,
          placeholder: 'Nombre de la rutina',
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'CONFIRMAR',
          cssClass: 'alert-button-primary',
          handler: (data) => {
            if (data.tableName.trim() === '') {
              this.ionicUtilService.showToast({
                message: 'El campo no puede estar vacío',
                duration: 2000,
                color: 'danger',
              });
              return false;
            }
            this.tableInUse.name = data.tableName;
            this.tableService.updateTableName(this.tableInUse).subscribe(() => {
              this.tableService.setCurrentTable = this.tableInUse;
              const message = 'Nombre de rutina actualizado';
              const duration = 1000;
              const toastOptions: ToastOptions = {
                message: message,
                duration: duration,
              };
              this.ionicUtilService.showToast(toastOptions);
            });
            return true;
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public unlinkTable(): void {
    const alertOptions = {
      header: 'Salir de ' + this.tableInUse.name,
      message: 'Podrás volver a encontrar esta rutina en Mis rutinas',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'CONFIRMAR',
          cssClass: 'alert-button-primary',
          handler: () => {
            this.tableInUse = undefined;
            this.user.tableInUse = this.tableInUse;
            this.user.workoutInUse = undefined;
            this.currentWorkout = undefined;
            this.workoutService.setCurrentWorkout = this.currentWorkout;
            this.tableService.setCurrentTable = this.tableInUse;
            this.navigationService.goToTabsSummaryPage();
            this.userService.updateUser(this.user).subscribe();
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public addWorkout(): void {
    const alertOptions = {
      header: 'Añadir entrenamiento',
      message: 'Introduce el nombre del entrenamiento',
      inputs: [
        {
          name: 'workoutName',
          type: 'text' as 'text',
          placeholder: 'Ej: Empujes',
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'AÑADIR',
          cssClass: 'alert-button-confirm',
          handler: (data: any) => {
            if (!data.workoutName || data.workoutName.trim() === '') {
              return false; // Prevent closing if empty
            }

            let workout = new Workout();
            workout.name = data.workoutName.trim();

            this.workoutService
              .addWorkoutsToSplits(this.user.tableInUse, workout)
              .subscribe((resSplits) => {
                this.tableInUse.splits = resSplits;
                this.tableService.setCurrentTable = this.tableInUse;

                const message = 'Entrenamiento ' + workout.name + ' añadido';
                const duration = 500;
                const toastOptions: ToastOptions = {
                  message: message,
                  duration: duration,
                };
                this.ionicUtilService.showToast(toastOptions);
              });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public workoutIndexPaste: number;

  public paste(event): void {
    this.pasteMode = event?.paste ?? undefined;
    this.workoutIdPaste = event?.workoutId ?? undefined;
    this.workoutIndexPaste = event?.workoutIndex ?? undefined;

    if (event?.pasted) {
      this.openWorkoutIndex = event.workoutIndex;
      this.scrollToOpenWorkout();
    }
  }

  public toggleAccordion(event: any, index: number): void {
    const value = event.detail.value;
    const isOpen = Array.isArray(value)
      ? value.includes('open')
      : value === 'open';

    if (isOpen) {
      this.openWorkoutIndex = index;
    } else {
      if (this.openWorkoutIndex === index) {
        this.openWorkoutIndex = undefined;
      }
    }
  }

  private scrollToOpenWorkout(): void {
    if (this.openWorkoutIndex !== undefined && this.openWorkoutIndex !== null) {
      setTimeout(() => {
        const element = document.getElementById(
          `workout-${this.openWorkoutIndex}`
        );
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }

  public onExerciseAdded(event: {
    workoutIndex: number;
    exerciseIndex: number;
  }): void {
    // Abrir el accordion del workout
    this.openWorkoutIndex = event.workoutIndex;

    // Esperar a que el DOM se actualice y hacer scroll al nuevo ejercicio
    setTimeout(() => {
      const exerciseElement = document.getElementById(
        `exercise-${event.workoutIndex}-${event.exerciseIndex}`
      );
      if (exerciseElement) {
        exerciseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Añadir efecto visual de highlight
        exerciseElement.classList.add('highlight-new');
        setTimeout(() => {
          exerciseElement.classList.remove('highlight-new');
        }, 2000);
      } else {
        // Fallback: scroll al workout si no encuentra el ejercicio
        this.scrollToOpenWorkout();
      }
    }, 400);
  }

  public onSetAdded(event: {
    workoutIndex: number;
    exerciseIndex: number;
  }): void {
    // Abrir el accordion del workout
    this.openWorkoutIndex = event.workoutIndex;

    // Ejecutar scroll al ejercicio con highlight success
    setTimeout(() => {
      this.scrollToExerciseWithRetry(
        event.workoutIndex,
        event.exerciseIndex,
        'highlight-new-set'
      );
    }, 100);
  }

  public onSetUpdated(event: {
    workoutIndex: number;
    exerciseIndex: number;
  }): void {
    // Abrir el accordion del workout
    this.openWorkoutIndex = event.workoutIndex;

    // Scroll al ejercicio con highlight primary
    setTimeout(() => {
      this.scrollToExerciseWithRetry(
        event.workoutIndex,
        event.exerciseIndex,
        'highlight-updated-set'
      );
    }, 400);
  }

  public onSetDeleted(event: {
    workoutIndex: number;
    exerciseIndex: number;
  }): void {
    // Abrir el accordion del workout
    this.openWorkoutIndex = event.workoutIndex;

    // Ejecutar scroll directamente con un pequeño delay para que Angular renderice
    setTimeout(() => {
      this.scrollToExerciseWithRetry(
        event.workoutIndex,
        event.exerciseIndex,
        'highlight-deleted'
      );
    }, 100);
  }

  public onWorkoutNameUpdated(event: {
    workoutIndex: number;
    newName: string;
  }): void {
    // Actualizar el nombre del workout en todos los splits localmente
    // sin disparar el effect que regenera toda la vista
    this.tableInUse.splits.forEach((splitTemp) => {
      if (splitTemp.workouts[event.workoutIndex]) {
        splitTemp.workouts[event.workoutIndex].name = event.newName;
      }
    });

    // Actualizar también currentSplit para reflejar el cambio
    if (this.currentSplit?.workouts[event.workoutIndex]) {
      this.currentSplit.workouts[event.workoutIndex].name = event.newName;
    }
  }

  /**
   * Hace scroll a un ejercicio con reintentos para esperar que el DOM se actualice
   */
  private scrollToExerciseWithRetry(
    workoutIndex: number,
    exerciseIndex: number,
    highlightClass: string,
    attempt: number = 0
  ): void {
    const maxAttempts = 20;
    const delay = attempt === 0 ? 600 : 200;

    setTimeout(() => {
      const exerciseElement = document.getElementById(
        `exercise-${workoutIndex}-${exerciseIndex}`
      );

      if (exerciseElement) {
        exerciseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        exerciseElement.classList.add(highlightClass);
        setTimeout(() => {
          exerciseElement.classList.remove(highlightClass);
        }, 2000);
      } else if (attempt < maxAttempts) {
        this.scrollToExerciseWithRetry(
          workoutIndex,
          exerciseIndex,
          highlightClass,
          attempt + 1
        );
      }
    }, delay);
  }

  public createTableAndAddToUser(): void {
    this.loadTable = false;

    const alertOptions = {
      header: 'Crear rutina',
      message: 'Introduce el nombre de la rutina',
      inputs: [
        {
          name: 'tableName',
          type: 'text' as 'text',
          placeholder: 'Nombre de la rutina',
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'alert-button-primary',
          handler: () => {
            this.loadTable = true;
          },
        },
        {
          text: 'CREAR',
          cssClass: 'alert-button-success',
          handler: (data: any) => {
            if (!data.tableName || data.tableName.trim() === '') {
              return false; // Prevent closing if empty
            }

            this.tableService
              .createTableToUser(this.user._id, data.tableName.trim())
              .subscribe((resTable) => {
                this.tableInUse = resTable;
                this.user.tableInUse = this.tableInUse._id;
                this.user.ownTables.push(this.tableInUse._id);
                this.userService.setLocalUser = this.user;
                this.tableService.setCurrentTable = this.tableInUse;
                this.loadTable = true;
              });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public addSplitToTable(): void {
    this.loadingFab = true;

    let alertOptions: AlertOptions;

    if (this.tableInUse.splits.length > 20) {
      alertOptions = {
        header: 'Error',
        message: 'Número máximo de micro-ciclos alcanzados',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
          },
        ],
      };
    } else if (
      this.tableInUse.splits.length > 0 &&
      this.tableInUse.splits
        .flatMap((splitTemp) => splitTemp.workouts)
        .find((workoutTemp) => workoutTemp.exercises.length > 0)
    ) {
      const isLast =
        this._currentSplitIndex === this.tableInUse.splits.length - 1;
      const message = isLast
        ? 'Se creará uno nuevo copiando los datos del actual incluyendo notas'
        : 'Se creará uno nuevo entre el micro-ciclo ' +
        (this._currentSplitIndex + 1) +
        ' y ' +
        (this._currentSplitIndex + 2) +
        ', copiando los datos del actual incluyendo notas';
      alertOptions = {
        header: ACTIONS_FAB[ACTIONS_FAB_TYPES.duplicateMicrocycle].value,
        cssClass: 'alert-grid-buttons',
        message: message,
        buttons: [
          {
            text: 'CANCELAR',
            role: 'cancel',
          },
          {
            text: 'SIN SERIES',
            handler: () => {
              this.loadingSplit = true;
              const idSplit =
                this.tableInUse.splits[this._currentSplitIndex]?._id;
              this.splitService
                .addSplitToTable(this.tableInUse._id, idSplit, false)
                .subscribe((resSplit) => {
                  this.tableInUse.splits.splice(
                    this._currentSplitIndex + 1,
                    0,
                    resSplit
                  );
                  this.tableService.setCurrentTable = this.tableInUse;
                  this.splitService._addOrDeleteSplitSlide$.next(true);

                  const toastOptions: ToastOptions = {
                    message: 'Micro-ciclo añadido',
                    duration: 500,
                  };
                  this.ionicUtilService.showToast(toastOptions);
                  this.loadingFab = false;

                  this.loadingSplit = false;
                }, (error) => this.handleAddSplitError(error));
            },
          },
          {
            text: 'COMPLETO',
            cssClass: 'alert-button-success',
            handler: () => {
              this.loadingSplit = true;
              const idSplit =
                this.tableInUse.splits[this._currentSplitIndex]?._id;
              this.splitService
                .addSplitToTable(this.tableInUse._id, idSplit, true)
                .subscribe((resSplit) => {
                  this.tableInUse.splits.splice(
                    this._currentSplitIndex + 1,
                    0,
                    resSplit
                  );
                  this.tableService.setCurrentTable = this.tableInUse;
                  this.splitService._addOrDeleteSplitSlide$.next(true);

                  const toastOptions: ToastOptions = {
                    message: 'Micro-ciclo añadido',
                    duration: 500,
                  };
                  this.ionicUtilService.showToast(toastOptions);
                  this.loadingFab = false;
                  this.loadingSplit = false;
                }, (error) => this.handleAddSplitError(error));
            },
          },
        ],
      };
    } else {
      alertOptions = {
        message: ACTIONS_FAB[ACTIONS_FAB_TYPES.duplicateMicrocycle].value,
        buttons: [
          {
            text: 'CANCELAR',
            role: 'cancel',
          },
          {
            text: 'OK',
            cssClass: 'alert-button-primary',
            handler: () => {
              const idSplit =
                this.tableInUse.splits[this._currentSplitIndex]?._id;
              this.splitService
                .addSplitToTable(this.tableInUse._id, idSplit, true)
                .subscribe((resSplit) => {
                  this.tableInUse.splits.splice(
                    this._currentSplitIndex + 1,
                    0,
                    resSplit
                  );
                  this.tableService.setCurrentTable = this.tableInUse;
                  this.splitService._addOrDeleteSplitSlide$.next(true);

                  const toastOptions: ToastOptions = {
                    message: 'Micro-ciclo añadido',
                    duration: 500,
                  };
                  this.ionicUtilService.showToast(toastOptions);
                  this.loadingFab = false;
                }, (error) => this.handleAddSplitError(error));
            },
          },
        ],
      };
    }

    this.ionicUtilService.showAlert(alertOptions);
  }

  public addFirstSplitToTable(): void {
    this.loadingFab = true;

    const idSplit = this.tableInUse.splits[this._currentSplitIndex]?._id;
    this.splitService
      .addSplitToTable(this.tableInUse._id, idSplit)
      .subscribe((resSplit) => {
        this.tableInUse.splits.splice(this._currentSplitIndex + 1, 0, resSplit);
        this.tableService.setCurrentTable = this.tableInUse;
        this.splitService._addOrDeleteSplitSlide$.next(true);

        const toastOptions: ToastOptions = {
          message: 'Micro-ciclo añadido',
          duration: 500,
        };
        this.ionicUtilService.showToast(toastOptions);
        this.loadingFab = false;
      }, (error) => this.handleAddSplitError(error));
  }

  private handleAddSplitError(error: any): void {
    this.loadingFab = false;
    this.loadingSplit = false;

    if (error?.error?.code === 'PREMIUM_LIMIT_MICROCYCLES') {
      this.ionicUtilService.showAlert({
        header: 'Limite Free alcanzado',
        message:
          'Has alcanzado el limite de micro-ciclos para esta rutina. Activa Premium para seguir anadiendo.',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Ver Premium',
            cssClass: 'alert-button-primary',
            handler: () => this.navigationService.goToPremium(),
          },
        ],
      });
      return;
    }

    this.ionicUtilService.showToast({
      message: error?.error?.message || 'No se pudo anadir el micro-ciclo',
      duration: 2000,
      color: 'danger',
    });
  }

  public onCloseFab(actionFab: ACTIONS_FAB_TYPES): void {
    switch (actionFab) {
      case ACTIONS_FAB_TYPES.addWorkout:
        this.addWorkoutToSplit();
        break;
      case ACTIONS_FAB_TYPES.duplicateMicrocycle:
        this.addSplitToTable();
        break;
      case ACTIONS_FAB_TYPES.deleteMicrocycle:
        this.deleteSplit();
        break;
      case ACTIONS_FAB_TYPES.cancelCopy:
        this.cancelCopyMode();
        break;
    }
  }

  public deleteSplit(): void {
    const alertOptions: AlertOptions = {
      header: ACTIONS_FAB[ACTIONS_FAB_TYPES.deleteMicrocycle].value,
      message: '¿Estás seguro de eliminar este micro-ciclo?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            this.loadingFab = false;
          },
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          handler: () => {
            this.loadingFab = true;
            this.loadingSplit = true;
            this.setCurrentSplit();

            if (
              this.currentSplit.workouts.find(
                (workout) => workout._id === this.user.workoutInUse
              )
            )
              this.userService
                .updateUser({ ...this.user, workoutInUse: undefined })
                .subscribe();

            this.splitService
              .deleteSplit(this.tableInUse._id, this.currentSplit._id)
              .subscribe(() => {
                this.tableInUse.splits.splice(this._currentSplitIndex, 1);
                this.tableService.setCurrentTable = this.tableInUse;

                this.splitService._addOrDeleteSplitSlide$.next(false);

                const toastOptions: ToastOptions = {
                  message: 'Micro-ciclo eliminado',
                  duration: 500,
                };
                this.ionicUtilService.showToast(toastOptions);
                this.loadingFab = false;
                this.loadingSplit = false;
              });
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  private setCurrentSplit(): void {
    this.currentSplit = this.tableInUse?.splits[this._currentSplitIndex];
  }

  private addWorkoutToSplit(): void {
    this.loadingFab = true;
    const alertOptions: AlertOptions = {
      header: ACTIONS_FAB[ACTIONS_FAB_TYPES.addWorkout].value,
      inputs: [
        {
          name: 'workoutName',
          type: 'text',
          placeholder: 'Nombre',
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            this.loadingFab = false;
          },
        },
        {
          text: 'CONFIRMAR',
          handler: (data) => {
            if (data.workoutName && data.workoutName.trim() !== '') {
              const workout = this.workoutService.getStandarWorkout();
              workout.name = data.workoutName;
              this.workoutService
                .addWorkoutsToSplits(this.user.tableInUse, workout)
                .subscribe((resSplits) => {
                  this.tableInUse.splits = resSplits;
                  this.tableService.setCurrentTable = this.tableInUse;
                  const toastOptions: ToastOptions = {
                    message: data.workoutName + ' añadido',
                    duration: 500,
                  };
                  this.ionicUtilService.showToast(toastOptions);
                  this.loadingFab = false;
                });
              return true;
            } else {
              // Show error if name is empty
              const errorToast: ToastOptions = {
                message: 'El nombre no puede estar vacío',
                duration: 2000,
              };
              this.ionicUtilService.showToast(errorToast);
              return false;
            }
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public cancelCopyMode(): void {
    this.utilService.setCancelMode = false;
    this.pasteMode = false;
    this.workoutIdPaste = undefined;
    this.workoutIndexPaste = undefined;
  }

  public async showSplitMenu(event: Event): Promise<void> {
    const popoverOptions = {
      component: SplitMenuPopoverComponent,
      event: event,
      componentProps: {
        onDuplicate: () => this.addSplitToTable(),
        onDelete: () => this.deleteSplit(),
      },
    };

    await this.ionicUtilService.showPopover(popoverOptions);
  }

  public close(): void {
    this.navigationService.goToTabsSummaryPage();
  }

  public trackByWorkout(index: number, item: Workout): string {
    return item._id;
  }
}
