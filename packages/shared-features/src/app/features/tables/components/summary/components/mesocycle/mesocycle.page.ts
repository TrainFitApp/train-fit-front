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
} from "@angular/core";
import { AlertOptions, Platform, ToastOptions } from "@ionic/angular";
import { Split } from "src/app/core/models/split";
import { Subject } from "rxjs";
import { Table } from "src/app/core/models/table";
import { User } from "src/app/core/models/user";
import { Workout } from "src/app/core/models/workout";
import { SplitService } from "src/app/core/services/split/split.service";
import { TableService } from "src/app/core/services/table/table.service";
import { UserService } from "src/app/core/services/user/user.service";
import { BillingService } from "src/app/core/services/billing/billing.service";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";
import { TranslateService } from "@ngx-translate/core";
import { UtilService } from "src/app/core/services/util/util.service";
import { WorkoutService } from "src/app/core/services/workout/workout.service";
import {
  ACTIONS_FAB,
  ACTIONS_FAB_TYPES,
} from "src/app/shared/constants/actions-fab";
import { STATES } from "src/app/shared/constants/states";
import { TABLE_MODE_TYPES } from "src/app/shared/constants/table-mode";
import { SplitMenuPopoverComponent } from "./components/split-menu-popover/split-menu-popover.component";
import { DeleteSplitsModalComponent } from "./components/delete-splits-modal/delete-splits-modal.component";

interface PreserveFinishedWorkoutSplitState {
  tableId: string;
  splitId: string;
  splitIndex: number;
  workoutId: string;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  workouts: string[];
}

const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: "upper-lower",
    name: "Torso / Pierna",
    description: "4 dias",
    workouts: ["Torso A", "Pierna A", "Torso B", "Pierna B"],
  },
  {
    id: "push-pull-legs",
    name: "Push / Pull / Legs",
    description: "6 dias",
    workouts: ["Empuje (Push) A", "Tirón (Pull) A", "Pierna (Legs) A", "Empuje (Push) B", "Tirón (Pull) B", "Pierna (Legs) B"],
  },
  {
    id: "full-body",
    name: "Full Body",
    description: "3 dias",
    workouts: ["Cuerpo Completo A", "Cuerpo Completo B", "Cuerpo Completo C"],
  },
  {
    id: "arnold-split",
    name: "Arnold Split",
    description: "3 dias",
    workouts: ["Pecho y Espalda", "Hombros y Brazos", "Piernas y Abdomen"],
  },
  {
    id: "weider",
    name: "Rutina Weider",
    description: "5 dias",
    workouts: ["Pecho", "Espalda", "Hombros", "Piernas", "Brazos"],
  },
  {
    id: "push-pull",
    name: "Empuje / Tirón",
    description: "4 dias",
    workouts: ["Empuje A", "Tirón A", "Empuje B", "Tirón B"],
  },
];

@Component({
  selector: "app-mesocycle",
  templateUrl: "./mesocycle.page.html",
  styleUrls: ["./mesocycle.page.scss"],
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
  public microcyclesPerRoutineLimit: number | null = null;
  public workoutTemplateLoadingId: string | null = null;
  public savingWorkoutOrder = false;

  public TABLE_MODE_TYPES = TABLE_MODE_TYPES;
  public STATES = STATES;
  public readonly workoutTemplates = WORKOUT_TEMPLATES;

  // Control de animaciones de navegación
  public animatingLeft: boolean = false;
  public animatingRight: boolean = false;
  private readonly preserveFinishedWorkoutSplitKey =
    "preserveFinishedWorkoutSplit";
  private workoutOrderSnapshot: Workout[][] | null = null;

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
    private billingService: BillingService,
    private ionicUtilService: IonicUtilService,
    private navigationService: NavigationService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
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
            (w) => w._id === resCurrentWorkout._id,
          );
          if (index !== -1) {
            split.workouts[index] = { ...resCurrentWorkout };
          }
        });

        // Si el split actual contiene el workout, lo actualizamos también
        if (this.currentSplit?.workouts) {
          const index = this.currentSplit.workouts.findIndex(
            (w) => w._id === resCurrentWorkout._id,
          );
          if (index !== -1) {
            this.currentSplit.workouts[index] = { ...resCurrentWorkout };
          }
        }
        this.cdr.markForCheck();
      }
    });
  }

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeNavigation();
    });
  }

  public ionViewDidEnter(): void {
    void this.loadMicrocycleLimit();

    if (!this.tableInUse?.splits?.length) return;

    // Si no hay entrenamiento en uso, auto-posicionamos según progreso (caso Summary -> Mesocycle)
    if (!this.user?.workoutInUse) {
      if (this.restoreFinishedWorkoutSplit()) return;

      const indexSplit = this.tableInUse.splits.findIndex(
        (sTemp) => !this.utilService.isSplitDoned(sTemp),
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
        (w) => w?._id === this.user.workoutInUse,
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

  private restoreFinishedWorkoutSplit(): boolean {
    const preserveState =
      this.navigationService.getTempData<PreserveFinishedWorkoutSplitState>(
        this.preserveFinishedWorkoutSplitKey,
      );

    if (!preserveState) return false;

    this.navigationService.clearTempData(
      this.preserveFinishedWorkoutSplitKey,
    );

    if (preserveState.tableId !== this.tableInUse?._id) return false;

    let targetSplitIndex = this.tableInUse.splits.findIndex(
      (split) => split?._id === preserveState.splitId,
    );

    if (
      targetSplitIndex === -1 &&
      preserveState.splitIndex >= 0 &&
      preserveState.splitIndex < this.tableInUse.splits.length
    ) {
      targetSplitIndex = preserveState.splitIndex;
    }

    if (targetSplitIndex === -1) {
      targetSplitIndex = this.tableInUse.splits.findIndex((split) =>
        split.workouts?.some(
          (workout) => workout?._id === preserveState.workoutId,
        ),
      );
    }

    if (targetSplitIndex === -1) return false;

    const targetSplit = this.tableInUse.splits[targetSplitIndex];
    const targetWorkoutIndex = targetSplit.workouts?.findIndex(
      (workout) => workout?._id === preserveState.workoutId,
    );

    if (targetWorkoutIndex !== undefined && targetWorkoutIndex !== -1) {
      this.openWorkoutIndex = targetWorkoutIndex;
    }

    if (targetSplitIndex === this.currentSplitIndex) {
      this.updateCurrentSplit();
      this.scrollToOpenWorkout();
    } else {
      this.currentSplitIndex = targetSplitIndex;
    }

    return true;
  }

  public ionViewWillLeave(): void {
    this.validateAndSyncTableNotes();
    this.cancelWorkoutMoveMode();
    this.cancelCopyMode();
  }

  private validateAndSyncTableNotes(): void {
    const signalTable = this.tableService.tableInUse;
    if (!signalTable || !this.tableInUse) return;

    const mismatch = this.getFirstExerciseNoteMismatch(
      this.tableInUse,
      signalTable,
    );

    if (!mismatch) return;

    console.debug("[MesocyclePage] Note mismatch detected, syncing table", {
      tableId: this.tableInUse?._id,
      customExerciseId: mismatch.customExerciseId,
      localNote: mismatch.localNote,
      signalNote: mismatch.signalNote,
    });

    this.tableService.setCurrentTable = this.tableInUse;
  }

  private getFirstExerciseNoteMismatch(
    localTable: Table,
    signalTable: Table,
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
    console.log("init");
    void this.loadMicrocycleLimit();

    this.utilService.getTableMode.subscribe(
      (resTableMode) => (this.tableMode = resTableMode),
    );

    this.splitService._addOrDeleteSplitSlide$.subscribe((res) => {
      setTimeout(() => {
        if (res) {
          // Al agregar un split, navegar al siguiente
          this.currentSplitIndex = Math.min(
            this.currentSplitIndex + 1,
            this.tableInUseAux.splits.length - 1,
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
            data.highlightClass,
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

  private async loadMicrocycleLimit(): Promise<void> {
    const entitlements = await this.billingService.getBackendEntitlements();
    this.microcyclesPerRoutineLimit =
      entitlements?.limits?.microcyclesPerRoutine ?? null;
    this.cdr.markForCheck();
  }

  public isSplitLocked(splitIndex: number): boolean {
    if (this.user?.premium?.entitled) return false;
    if (typeof this.microcyclesPerRoutineLimit !== "number") return false;
    return splitIndex >= this.microcyclesPerRoutineLimit;
  }

  public isCurrentSplitLocked(): boolean {
    return this.isSplitLocked(this.currentSplitIndex);
  }

  private isMicrocycleCreationLimitReached(): boolean {
    if (this.user?.premium?.entitled) return false;
    if (typeof this.microcyclesPerRoutineLimit !== "number") return false;
    return (this.tableInUse?.splits?.length || 0) >= this.microcyclesPerRoutineLimit;
  }

  private showMicrocycleLimitAlert(): void {
    void this.ionicUtilService.showPremiumLimitAlert({
      message: this.translate.instant('TABLES.PREMIUM_LIMIT_MICROCYCLES'),
      onUpgrade: () => this.navigationService.goToPremium(),
    });
  }

  public openPremiumFromLockedSplit(event?: Event): void {
    event?.stopPropagation();
    this.navigationService.goToPremium();
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
      (sTemp) => !this.utilService.isSplitDoned(sTemp),
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
      header: this.translate.instant('TABLES.EDIT_ROUTINE_NAME'),
      inputs: [
        {
          name: "tableName",
          type: "textarea" as "textarea",
          value: this.tableInUse?.name,
          placeholder: this.translate.instant('TABLES.ROUTINE_NAME_PLACEHOLDER'),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          cssClass: "alert-button-primary",
          handler: (data) => {
            if (data.tableName.trim() === "") {
              this.ionicUtilService.showToast({
                message: this.translate.instant('TABLES.FIELD_NOT_EMPTY'),
                duration: 2000,
                color: "danger",
              });
              return false;
            }
            this.tableInUse.name = data.tableName;
            this.tableService.updateTableName(this.tableInUse).subscribe(() => {
              this.tableService.setCurrentTable = this.tableInUse;
              const message = this.translate.instant('TABLES.ROUTINE_NAME_UPDATED');
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
      header: this.translate.instant('TABLES.UNLINK_ROUTINE', { name: this.tableInUse.name }),
      message: this.translate.instant('TABLES.UNLINK_ROUTINE_MSG'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          cssClass: "alert-button-primary",
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
    if (this.isCurrentSplitLocked()) {
      this.openPremiumFromLockedSplit();
      return;
    }

    const alertOptions = {
      header: this.translate.instant('TABLES.ADD_WORKOUT_ALERT'),
      message: this.translate.instant('TABLES.ADD_WORKOUT_MSG'),
      inputs: [
        {
          name: "workoutName",
          type: "text" as "text",
          placeholder: this.translate.instant('TABLES.WORKOUT_EXAMPLE'),
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
        },
        {
          text: this.translate.instant('TABLES.ADD_BTN'),
          cssClass: "alert-button-confirm",
          handler: (data: any) => {
            if (!data.workoutName || data.workoutName.trim() === "") {
              return false; // Prevent closing if empty
            }

            let workout = new Workout();
            workout.name = data.workoutName.trim();

            this.workoutService
              .addWorkoutsToSplits(this.user.tableInUse, workout)
              .subscribe((resSplits) => {
                this.tableInUse.splits = resSplits;
                this.tableService.setCurrentTable = this.tableInUse;

                const toastOptions: ToastOptions = {
                  message: this.translate.instant('TABLES.WORKOUT_ADDED', { name: workout.name }),
                  duration: 500,
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

  public get shouldShowWorkoutTemplates(): boolean {
    const workoutCount =
      this.tableInUse?.splits?.reduce(
        (total, split) => total + (split.workouts?.length ?? 0),
        0
      ) ?? 0;

    return (
      !this.loadingSplit &&
      !this.pasteMode &&
      (workoutCount === 0 || this.workoutTemplateLoadingId !== null)
    );
  }

  public confirmWorkoutTemplate(template: WorkoutTemplate): void {
    if (this.isCurrentSplitLocked()) {
      this.openPremiumFromLockedSplit();
      return;
    }

    if (this.workoutTemplateLoadingId) return;

    const workoutList = template.workouts
      .map((workoutName) => `- ${workoutName}`)
      .join("\n");
    const alertOptions: AlertOptions = {
      header: template.name,
      message: this.translate.instant('TABLES.TEMPLATE_CREATE_CONFIRM', { workoutList }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
        },
        {
          text: this.translate.instant('TABLES.CREATE_TEMPLATE_BTN'),
          cssClass: "alert-button-confirm",
          handler: () => {
            this.createWorkoutTemplate(template);
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private createWorkoutTemplate(template: WorkoutTemplate): void {
    this.workoutTemplateLoadingId = template.id;
    this.createTemplateWorkoutAtIndex(template, 0);
  }

  private createTemplateWorkoutAtIndex(
    template: WorkoutTemplate,
    workoutIndex: number
  ): void {
    const workoutName = template.workouts[workoutIndex];
    if (!workoutName) {
      this.workoutTemplateLoadingId = null;
      this.updateCurrentSplit();
      this.ionicUtilService.showToast({
        message: this.translate.instant('TABLES.TEMPLATE_CREATED', { name: template.name }),
        duration: 1200,
        color: "success",
      } as ToastOptions);
      return;
    }

    const workout = new Workout();
    workout.name = workoutName;

    this.workoutService
      .addWorkoutsToSplits(this.user.tableInUse, workout)
      .subscribe({
        next: (resSplits) => {
          this.tableInUse.splits = resSplits;
          this.tableService.setCurrentTable = this.tableInUse;
          this.createTemplateWorkoutAtIndex(template, workoutIndex + 1);
        },
        error: (error) => {
          this.workoutTemplateLoadingId = null;
          this.ionicUtilService.showErrorToast(
            error,
            this.translate.instant('TABLES.TEMPLATE_CREATE_ERROR')
          );
        },
      });
  }

  public workoutIndexPaste: number;

  public paste(event): void {
    if (this.stateSelected === STATES.move) return;

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
      ? value.includes("open")
      : value === "open";

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
          `workout-${this.openWorkoutIndex}`,
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
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
        `exercise-${event.workoutIndex}-${event.exerciseIndex}`,
      );
      if (exerciseElement) {
        exerciseElement.scrollIntoView({ behavior: "smooth", block: "center" });
        // Añadir efecto visual de highlight
        exerciseElement.classList.add("highlight-new");
        setTimeout(() => {
          exerciseElement.classList.remove("highlight-new");
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
        "highlight-new-set",
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
        "highlight-updated-set",
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
        "highlight-deleted",
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

  public onWorkoutDuplicated(event: { workoutIndex: number }): void {
    this.openWorkoutIndex = event.workoutIndex;
    this.updateCurrentSplit();
    this.scrollToOpenWorkout();
  }

  public enterWorkoutMoveMode(): void {
    if (this.isCurrentSplitLocked()) {
      this.openPremiumFromLockedSplit();
      return;
    }

    if (!this.currentSplit?.workouts?.length || this.savingWorkoutOrder) return;

    this.cancelCopyMode();
    this.workoutOrderSnapshot = this.tableInUse.splits.map((split) => [
      ...(split.workouts || []),
    ]);
    this.stateSelected = STATES.move;
    this.openWorkoutIndex = undefined;
  }

  public cancelWorkoutMoveMode(): void {
    if (this.stateSelected !== STATES.move) return;

    if (this.workoutOrderSnapshot) {
      this.tableInUse.splits.forEach((split, splitIndex) => {
        split.workouts = [...(this.workoutOrderSnapshot?.[splitIndex] || [])];
      });
      this.updateCurrentSplit();
    }

    this.workoutOrderSnapshot = null;
    this.stateSelected = STATES.static;
    this.savingWorkoutOrder = false;
  }

  public handleWorkoutReorder(event: CustomEvent): void {
    if (this.stateSelected !== STATES.move) {
      event.detail.complete();
      return;
    }

    const fromIndex = event.detail.from;
    const toIndex = event.detail.to;

    this.tableInUse.splits.forEach((splitTemp) => {
      const [movedWorkout] = splitTemp.workouts.splice(fromIndex, 1);
      splitTemp.workouts.splice(toIndex, 0, movedWorkout);
    });

    event.detail.complete();
    this.updateCurrentSplit();
  }

  public confirmWorkoutOrder(): void {
    if (this.stateSelected !== STATES.move || this.savingWorkoutOrder) return;

    const workoutIdsOrder =
      this.tableInUse.splits[this.currentSplitIndex]?.workouts?.map(
        (workout) => workout._id,
      ) || [];

    if (!workoutIdsOrder.length) return;

    this.savingWorkoutOrder = true;
    this.workoutService
      .reorderWorkoutRows(this.tableInUse._id, workoutIdsOrder)
      .subscribe({
        next: (resSplits) => {
          this.tableInUse.splits = resSplits;
          this.tableService.setCurrentTable = this.tableInUse;
          this.updateCurrentSplit();
          this.workoutOrderSnapshot = null;
          this.stateSelected = STATES.static;
          this.savingWorkoutOrder = false;
          this.ionicUtilService.showToast({
            message: this.translate.instant('TABLES.WORKOUT_ORDER_UPDATED'),
            duration: 1000,
            color: "success",
          } as ToastOptions);
        },
        error: (error) => {
          this.savingWorkoutOrder = false;
          this.ionicUtilService.showErrorToast(
            error,
            this.translate.instant('TABLES.WORKOUT_ORDER_UPDATE_ERROR'),
          );
        },
      });
  }

  /**
   * Hace scroll a un ejercicio con reintentos para esperar que el DOM se actualice
   */
  private scrollToExerciseWithRetry(
    workoutIndex: number,
    exerciseIndex: number,
    highlightClass: string,
    attempt: number = 0,
  ): void {
    const maxAttempts = 20;
    const delay = attempt === 0 ? 600 : 200;

    setTimeout(() => {
      const exerciseElement = document.getElementById(
        `exercise-${workoutIndex}-${exerciseIndex}`,
      );

      if (exerciseElement) {
        exerciseElement.scrollIntoView({ behavior: "smooth", block: "center" });
        exerciseElement.classList.add(highlightClass);
        setTimeout(() => {
          exerciseElement.classList.remove(highlightClass);
        }, 2000);
      } else if (attempt < maxAttempts) {
        this.scrollToExerciseWithRetry(
          workoutIndex,
          exerciseIndex,
          highlightClass,
          attempt + 1,
        );
      }
    }, delay);
  }

  public createTableAndAddToUser(): void {
    this.loadTable = false;

    const alertOptions = {
      header: this.translate.instant('TABLES.CREATE_ROUTINE_ALERT'),
      message: this.translate.instant('TABLES.CREATE_ROUTINE_MSG_MESO'),
      inputs: [
        {
          name: "tableName",
          type: "text" as "text",
          placeholder: this.translate.instant('TABLES.ROUTINE_NAME_PLACEHOLDER'),
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
          cssClass: "alert-button-primary",
          handler: () => {
            this.loadTable = true;
          },
        },
        {
          text: this.translate.instant('TABLES.CREATE_BTN'),
          cssClass: "alert-button-success",
          handler: (data: any) => {
            if (!data.tableName || data.tableName.trim() === "") {
              return false; // Prevent closing if empty
            }

            this.tableService
              .createTableToUser(this.user._id, data.tableName.trim())
              .subscribe((resTable) => {
                this.tableInUse = resTable;
                this.user.tableInUse = this.tableInUse._id;
                if (!this.user.tables) this.user.tables = [];
                this.user.tables.push(this.tableInUse._id);
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
    if (this.isMicrocycleCreationLimitReached()) {
      this.showMicrocycleLimitAlert();
      return;
    }

    this.loadingFab = true;

    let alertOptions: AlertOptions;

    if (this.tableInUse.splits.length > 20) {
      alertOptions = {
        header: this.translate.instant('TABLES.MAX_MICROCYCLES_ERROR'),
        message: this.translate.instant('TABLES.MAX_MICROCYCLES_ERROR_MSG'),
        buttons: [
          {
            text: this.translate.instant('COMMON.CONFIRM'),
            role: "cancel",
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
        ? this.translate.instant('TABLES.DUPLICATE_MICROCYCLE_MSG_LAST')
        : this.translate.instant('TABLES.DUPLICATE_MICROCYCLE_MSG_BETWEEN', { current: this._currentSplitIndex + 1, next: this._currentSplitIndex + 2 });
      alertOptions = {
        header: ACTIONS_FAB[ACTIONS_FAB_TYPES.duplicateMicrocycle].value,
        cssClass: "alert-grid-buttons",
        message: message,
        buttons: [
          {
            text: this.translate.instant('COMMON.CANCEL'),
            role: "cancel",
          },
          {
            text: this.translate.instant('TABLES.WITHOUT_SERIES'),
            handler: () => {
              this.loadingSplit = true;
              const idSplit =
                this.tableInUse.splits[this._currentSplitIndex]?._id;
              this.splitService
                .addSplitToTable(this.tableInUse._id, idSplit, false)
                .subscribe(
                  (resSplit) => {
                    this.tableInUse.splits.splice(
                      this._currentSplitIndex + 1,
                      0,
                      resSplit,
                    );
                    this.tableService.setCurrentTable = this.tableInUse;
                    this.splitService._addOrDeleteSplitSlide$.next(true);

                    const toastOptions: ToastOptions = {
                      message: this.translate.instant('TABLES.MICROCYCLE_ADDED'),
                      duration: 500,
                    };
                    this.ionicUtilService.showToast(toastOptions);
                    this.loadingFab = false;

                    this.loadingSplit = false;
                  },
                  (error) => this.handleAddSplitError(error),
                );
            },
          },
          {
            text: this.translate.instant('TABLES.COMPLETE_COPY'),
            cssClass: "alert-button-success",
            handler: () => {
              this.loadingSplit = true;
              const idSplit =
                this.tableInUse.splits[this._currentSplitIndex]?._id;
              this.splitService
                .addSplitToTable(this.tableInUse._id, idSplit, true)
                .subscribe(
                  (resSplit) => {
                    this.tableInUse.splits.splice(
                      this._currentSplitIndex + 1,
                      0,
                      resSplit,
                    );
                    this.tableService.setCurrentTable = this.tableInUse;
                    this.splitService._addOrDeleteSplitSlide$.next(true);

                    const toastOptions: ToastOptions = {
                      message: this.translate.instant('TABLES.MICROCYCLE_ADDED'),
                      duration: 500,
                    };
                    this.ionicUtilService.showToast(toastOptions);
                    this.loadingFab = false;
                    this.loadingSplit = false;
                  },
                  (error) => this.handleAddSplitError(error),
                );
            },
          },
        ],
      };
    } else {
      alertOptions = {
        message: ACTIONS_FAB[ACTIONS_FAB_TYPES.duplicateMicrocycle].value,
        buttons: [
          {
            text: this.translate.instant('COMMON.CANCEL'),
            role: "cancel",
          },
          {
            text: this.translate.instant('COMMON.CONFIRM'),
            cssClass: "alert-button-primary",
            handler: () => {
              const idSplit =
                this.tableInUse.splits[this._currentSplitIndex]?._id;
              this.splitService
                .addSplitToTable(this.tableInUse._id, idSplit, true)
                .subscribe(
                  (resSplit) => {
                    this.tableInUse.splits.splice(
                      this._currentSplitIndex + 1,
                      0,
                      resSplit,
                    );
                    this.tableService.setCurrentTable = this.tableInUse;
                    this.splitService._addOrDeleteSplitSlide$.next(true);

                    const toastOptions: ToastOptions = {
                      message: this.translate.instant('TABLES.MICROCYCLE_ADDED'),
                      duration: 500,
                    };
                    this.ionicUtilService.showToast(toastOptions);
                    this.loadingFab = false;
                  },
                  (error) => this.handleAddSplitError(error),
                );
            },
          },
        ],
      };
    }

    this.ionicUtilService.showAlert(alertOptions);
  }

  public addFirstSplitToTable(): void {
    if (this.loadingFab) return;

    this.loadingFab = true;

    const idSplit = this.tableInUse.splits[this._currentSplitIndex]?._id;
    this.splitService.addSplitToTable(this.tableInUse._id, idSplit).subscribe(
      (resSplit) => {
        this.tableInUse.splits.splice(this._currentSplitIndex + 1, 0, resSplit);
        this.tableService.setCurrentTable = this.tableInUse;
        this.splitService._addOrDeleteSplitSlide$.next(true);

        const toastOptions: ToastOptions = {
          message: this.translate.instant('TABLES.MICROCYCLE_ADDED'),
          duration: 500,
        };
        this.ionicUtilService.showToast(toastOptions);
        this.loadingFab = false;
      },
      (error) => this.handleAddSplitError(error),
    );
  }

  private handleAddSplitError(error: any): void {
    this.loadingFab = false;
    this.loadingSplit = false;

    if (
      error?.code === "PREMIUM_LIMIT_MICROCYCLES" ||
      error?.error?.code === "PREMIUM_LIMIT_MICROCYCLES"
    ) {
      this.showMicrocycleLimitAlert();
      return;
    }

    this.ionicUtilService.showToast({
      message: error?.error?.message || this.translate.instant('TABLES.ADD_MICROCYCLE_ERROR'),
      duration: 2000,
      color: "danger",
    });
  }

  public onCloseFab(actionFab: ACTIONS_FAB_TYPES): void {
    if (
      this.isCurrentSplitLocked() &&
      actionFab !== ACTIONS_FAB_TYPES.cancelCopy &&
      actionFab !== ACTIONS_FAB_TYPES.deleteMicrocycle
    ) {
      this.openPremiumFromLockedSplit();
      return;
    }

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

  public async deleteSplit(): Promise<void> {
    if (!this.tableInUse?.splits?.length) return;

    const modalResult = await this.ionicUtilService.showModal({
      component: DeleteSplitsModalComponent,
      componentProps: {
        splits: this.tableInUse.splits,
        currentSplitIndex: this._currentSplitIndex,
        workoutInUse: this.user?.workoutInUse,
      },
      cssClass: "delete-splits-modal",
    });

    const splitIds = modalResult.data?.splitIds as string[] | undefined;
    if (modalResult.role !== "confirm" || !splitIds?.length) return;

    const splitCount = splitIds.length;
    const alertOptions: AlertOptions = {
      header: ACTIONS_FAB[ACTIONS_FAB_TYPES.deleteMicrocycle].value,
      message:
        splitCount === 1
          ? this.translate.instant('TABLES.DELETE_MICROCYCLES_CONFIRM_SINGLE')
          : this.translate.instant('TABLES.DELETE_MICROCYCLES_CONFIRM_MULTIPLE', { count: splitCount }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
        },
        {
          text: this.translate.instant('TABLES.DELETE_BTN'),
          role: "destructive",
          handler: () => {
            this.deleteSelectedSplits(splitIds);
          },
        },
      ],
    };

    await this.ionicUtilService.showAlert(alertOptions);
  }

  private deleteSelectedSplits(splitIds: string[]): void {
    this.loadingFab = true;
    this.loadingSplit = true;

    const previousSplits = [...this.tableInUse.splits];
    const selectedSplitIds = new Set(splitIds);
    const deletedWorkoutIds = new Set(
      previousSplits
        .filter((split) => selectedSplitIds.has(split._id))
        .flatMap((split) => split.workouts || [])
        .map((workout) => workout._id),
    );

    this.splitService
      .deleteSplits(this.tableInUse._id, splitIds)
      .subscribe({
        next: (response) => {
          this.applyDeletedSplits(
            previousSplits,
            response.deletedSplitIds,
            response.clearedWorkoutInUse,
            deletedWorkoutIds,
          );

          const deletedCount = response.deletedSplitIds.length;
          const toastOptions: ToastOptions = {
            message:
              deletedCount === 1
                ? this.translate.instant('TABLES.MICROCYCLE_DELETED')
                : this.translate.instant('TABLES.MICROCYCLES_DELETED_MULTIPLE', { count: deletedCount }),
            duration: 800,
          };
          this.ionicUtilService.showToast(toastOptions);
          this.loadingFab = false;
          this.loadingSplit = false;
        },
        error: (error) => {
          this.loadingFab = false;
          this.loadingSplit = false;
          void this.ionicUtilService.showAlert({
            header: this.translate.instant('COMMON.ERROR'),
            message:
              error?.error?.message ||
              this.translate.instant('TABLES.DELETE_MICROCYCLES_ERROR'),
            buttons: [this.translate.instant('COMMON.OK')],
          });
        },
      });
  }

  private applyDeletedSplits(
    previousSplits: Split[],
    deletedIds: string[],
    clearedWorkoutInUse: boolean,
    deletedWorkoutIds: Set<string>,
  ): void {
    const deletedSplitIds = new Set(deletedIds);
    const previousCurrentIndex = this._currentSplitIndex;
    const previousCurrentSplitId =
      previousSplits[previousCurrentIndex]?._id;
    const remainingSplits = previousSplits.filter(
      (split) => !deletedSplitIds.has(split._id),
    );

    let targetSplitIndex = 0;
    if (remainingSplits.length > 0) {
      const survivingCurrentIndex = remainingSplits.findIndex(
        (split) => split._id === previousCurrentSplitId,
      );

      if (survivingCurrentIndex !== -1) {
        targetSplitIndex = survivingCurrentIndex;
      } else {
        const previousSurvivingSplit = previousSplits
          .slice(0, previousCurrentIndex)
          .reverse()
          .find((split) => !deletedSplitIds.has(split._id));

        if (previousSurvivingSplit) {
          targetSplitIndex = remainingSplits.findIndex(
            (split) => split._id === previousSurvivingSplit._id,
          );
        }
      }
    }

    this.tableInUse = {
      ...this.tableInUse,
      splits: remainingSplits,
    };
    this.tableInUseAux = JSON.parse(JSON.stringify(this.tableInUse));
    this.updateReversedSplitsWithIndex();

    const workoutInUseId = this.user?.workoutInUse?.toString();
    const currentWorkoutId = this.workoutService.currentWorkout?._id;
    const shouldClearWorkoutInUse =
      clearedWorkoutInUse ||
      (workoutInUseId && deletedWorkoutIds.has(workoutInUseId));
    const shouldClearCurrentWorkout =
      shouldClearWorkoutInUse ||
      (currentWorkoutId && deletedWorkoutIds.has(currentWorkoutId));

    if (shouldClearWorkoutInUse) {
      if (this.user) {
        const updatedUser = { ...this.user };
        delete updatedUser.workoutInUse;
        this.user = updatedUser;
        this.userService.setLocalUser = updatedUser;
      }
    }

    if (shouldClearCurrentWorkout) {
      this.currentWorkout = undefined;
      this.workoutService.setCurrentWorkout = null;
    }

    this.tableService.setCurrentTable = this.tableInUse;

    if (remainingSplits.length > 0) {
      this.currentSplitIndex = targetSplitIndex;
    } else {
      this._currentSplitIndex = 0;
      this.currentSplit = undefined;
      this.openWorkoutIndex = undefined;
      this.currentIndex.emit(0);
    }
  }

  private addWorkoutToSplit(): void {
    if (this.isCurrentSplitLocked()) {
      this.openPremiumFromLockedSplit();
      return;
    }

    this.loadingFab = true;
    const alertOptions: AlertOptions = {
      header: ACTIONS_FAB[ACTIONS_FAB_TYPES.addWorkout].value,
      inputs: [
        {
          name: "workoutName",
          type: "text",
          placeholder: this.translate.instant('TABLES.ROUTINE_NAME_PLACEHOLDER'),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
          handler: () => {
            this.loadingFab = false;
          },
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (data) => {
            if (data.workoutName && data.workoutName.trim() !== "") {
              const workout = this.workoutService.getStandarWorkout();
              workout.name = data.workoutName;
              this.workoutService
                .addWorkoutsToSplits(this.user.tableInUse, workout)
                .subscribe((resSplits) => {
                  this.tableInUse.splits = resSplits;
                  this.tableService.setCurrentTable = this.tableInUse;
                  const toastOptions: ToastOptions = {
                    message: this.translate.instant('TABLES.WORKOUT_ADDED_SIMPLE', { name: data.workoutName }),
                    duration: 500,
                  };
                  this.ionicUtilService.showToast(toastOptions);
                  this.loadingFab = false;
                });
              return true;
            } else {
              const errorToast: ToastOptions = {
                message: this.translate.instant('TABLES.WORKOUT_NAME_EMPTY'),
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
        duplicateDisabled: this.isCurrentSplitLocked(),
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
