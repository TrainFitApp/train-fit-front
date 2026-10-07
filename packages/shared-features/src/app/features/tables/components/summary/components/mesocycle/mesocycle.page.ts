import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  effect,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { AlertOptions, ModalController, Platform, ToastOptions } from "@ionic/angular";
import { Split } from "src/app/core/models/split";
import { Subject, Subscription } from "rxjs";
import { Table } from "src/app/core/models/table";
import { User } from "src/app/core/models/user";
import { Workout } from "src/app/core/models/workout";
import { CustomExercise } from "src/app/core/models/customExercise";
import { SplitService } from "src/app/core/services/split/split.service";
import { TableService } from "src/app/core/services/table/table.service";
import { UserService } from "src/app/core/services/user/user.service";
import { BillingService } from "src/app/core/services/billing/billing.service";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";
import { TranslateService } from "@ngx-translate/core";
import { UtilService } from "src/app/core/services/util/util.service";
import { WorkoutService } from "src/app/core/services/workout/workout.service";
import { WorkoutTemplateApiService } from "src/app/core/services/workout-template/workout-template-api.service";
// Alias — evita colisión con la interfaz local WorkoutTemplate (mock legado
// de WORKOUT_TEMPLATES, sin motor real, ver más abajo en este archivo).
import { WorkoutTemplate as WorkoutTemplateDoc } from "src/app/core/models/workout-template";
import { ExerciseClipboard } from "src/app/shared/models/exercise-clipboard";
import {
  ACTIONS_FAB,
  ACTIONS_FAB_TYPES,
} from "src/app/shared/constants/actions-fab";
import { STATES } from "src/app/shared/constants/states";
import { TABLE_MODE_TYPES } from "src/app/shared/constants/table-mode";
import { SplitMenuPopoverComponent } from "./components/split-menu-popover/split-menu-popover.component";
import { DeleteSplitsModalComponent } from "./components/delete-splits-modal/delete-splits-modal.component";
import { ClipboardExercisesModalComponent } from "./components/clipboard-exercises-modal/clipboard-exercises-modal.component";
import { DB_ES_EN_MAP } from "src/app/shared/constants/db-translations/es-en-db.map";
import { EXERCISE_NAMES_ES_EN } from "src/app/shared/constants/db-translations/exercise-names-es-en.map";
import { APP_SHELL_CONFIG } from "src/app/app-shell.config";
import {
  OPEN_WORKOUT_FROM_CALENDAR_KEY,
  OpenWorkoutFromCalendarState,
} from "../routine-calendar/routine-calendar.component";
import { isPremiumActive } from "src/app/core/utils/premium-status.util";

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

const TRANSLATE_DB_MAP: Record<string, string> = {
  ...DB_ES_EN_MAP,
  ...EXERCISE_NAMES_ES_EN,
};

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
  // TAREA5 — presentado como panel lateral (ModalController) desde
  // train-fit-trainers en vez de como ruta de nivel superior; sin esto,
  // close() navegaría a 'tabs/summary' (ruta del CONSUMIDOR que no existe en
  // esa app) en vez de simplemente cerrar el panel. Por defecto false —
  // train-fit-front sigue usándolo como ruta normal, sin cambios.
  @Input()
  public isModal = false;

  private readonly modalController = inject(ModalController);

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
  public exercisePasteMode = false;
  public exerciseCopyActive = false;
  public exerciseOriginWorkoutId: string;
  public exerciseClipboard: ExerciseClipboard | null = null;
  public clipboardAnimateScale = 1;
  private clipboardPrevCount = 0;
  private exerciseClipboardSub: Subscription;
  public loadTable: boolean;
  public loadingFab: boolean;
  public loadingSplit: boolean = false;
  public stateSelected = STATES.static;

  // 2026-09 — un cliente no debe poder modificar una rutina que le asignó su
  // entrenador (renombrar/añadir/borrar microciclos, entrenamientos,
  // ejercicios, series). El límite real vive en el backend
  // (table-access.js#rejectIfAssignedTableLockedForOwner, aplicado en todos
  // los endpoints de mutación); esto es solo UX — no enseñar controles que
  // fallarían con 403. No aplica al entrenador editando la tabla de su
  // cliente desde train-fit-trainers (assignedByTrainerId es del cliente
  // dueño, no de quien está mirando esta pantalla ahí).
  public get isReadonly(): boolean {
    return !!this.tableInUse?.assignedByTrainerId;
  }

  public get isManagementAdmin(): boolean {
    return APP_SHELL_CONFIG.managementEntryEnabled && this.user?.roles?.includes('admin');
  }

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

  public getSplitInfoHeader(): string {
    const split = this.currentSplit;
    if (!split) return '';
    const title = this.translate.instant('GLOSSARY.MICROCYCLE.TITLE');
    const description = this.translate.instant('GLOSSARY.MICROCYCLE.DESCRIPTION');
    return '\u200B' + title + ': ' + description;
  }

  public get completedSplitsCount(): number {
    if (!this.tableInUse?.splits) return 0;
    return this.tableInUse.splits.filter((s) => this.utilService.isSplitDoned(s)).length;
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
  private readonly workoutTemplateApi = inject(WorkoutTemplateApiService);
  public applyingTemplate = false;

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

  public ngOnInit(): void {
    this.exerciseClipboardSub = this.workoutService.exerciseClipboard$.subscribe(
      (clipboard) => {
        const prevCount = this.clipboardPrevCount;
        this.exerciseClipboard = clipboard;
        this.exercisePasteMode = !!clipboard;
        if (clipboard && clipboard.exerciseCount > prevCount) {
          this.clipboardAnimateScale = 1.04;
          setTimeout(() => { this.clipboardAnimateScale = 0.97; }, 100);
          setTimeout(() => { this.clipboardAnimateScale = 1; }, 200);
        }
        this.clipboardPrevCount = clipboard?.exerciseCount ?? 0;
        this.cdr.markForCheck();
      }
    );
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeNavigation();
    });
  }

  public ionViewDidEnter(): void {
    void this.loadMicrocycleLimit();
    this.maybeOfferNewMicrocycle();

    if (!this.tableInUse?.splits?.length) return;

    // Llegada desde el calendario de rutina (pulsar un día): posicionar en
    // esa sesión concreta y hacer el parpadeo, gane a cualquier otra lógica.
    if (this.tryOpenWorkoutFromCalendar()) return;

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

  // Puede repetirse en visitas sucesivas si el usuario no añade otro
  // micro-ciclo — decisión intencional, no llevamos estado de "ya preguntado".
  private maybeOfferNewMicrocycle(): void {
    const splits = this.tableInUse?.splits;
    if (!splits?.length) return;

    // Solo el último (el "frontera" del progreso) — si ya hay uno siguiente
    // no hace falta ofrecer nada.
    const lastSplit = splits[splits.length - 1];
    if (!this.utilService.isSplitDoned(lastSplit)) return;

    // Rutina pautada por el entrenador: los microciclos los añade él, no el
    // cliente (el backend lo rechazaría con 403).
    if (this.isReadonly) return;

    // No ofrecer lo que no se puede dar — evita el "sí puedes... ah no, hazte Pro".
    if (this.isMicrocycleCreationLimitReached()) return;

    void this.ionicUtilService.showAlert({
      header: this.translate.instant('TABLES.MICROCYCLE_COMPLETED_TITLE'),
      message: this.translate.instant('TABLES.MICROCYCLE_COMPLETED_MSG'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('TABLES.ADD_MICROCYCLE'),
          cssClass: 'alert-button-success',
          handler: () => this.addSplitToTable(),
        },
      ],
    });
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

  // Traspaso desde <app-routine-calendar>: el usuario pulsó un día con
  // sesión. Nos colocamos en su microciclo + su workout y disparamos el
  // parpadeo (mismo patrón visual que "serie añadida/editada/borrada").
  private tryOpenWorkoutFromCalendar(): boolean {
    const state =
      this.navigationService.getTempData<OpenWorkoutFromCalendarState>(
        OPEN_WORKOUT_FROM_CALENDAR_KEY,
      );
    if (!state) return false;

    this.navigationService.clearTempData(OPEN_WORKOUT_FROM_CALENDAR_KEY);

    if (!this.tableInUse?.splits?.length) return false;
    if (
      state.tableId &&
      this.tableInUse._id &&
      state.tableId !== this.tableInUse._id
    ) {
      return false;
    }

    // Preferimos localizar por workoutId (robusto si se reordenaron los
    // workouts); si no aparece, caemos al índice guardado.
    let targetSplitIndex = -1;
    let targetWorkoutIndex = -1;

    if (state.workoutId) {
      for (let s = 0; s < this.tableInUse.splits.length; s++) {
        const wIndex = this.tableInUse.splits[s]?.workouts?.findIndex(
          (w) => w?._id === state.workoutId,
        );
        if (wIndex !== undefined && wIndex !== -1) {
          targetSplitIndex = s;
          targetWorkoutIndex = wIndex;
          break;
        }
      }
    }

    if (
      targetSplitIndex === -1 &&
      state.splitIndex >= 0 &&
      state.splitIndex < this.tableInUse.splits.length
    ) {
      targetSplitIndex = state.splitIndex;
      targetWorkoutIndex = Math.max(0, state.workoutIndex ?? 0);
    }

    if (targetSplitIndex === -1) return false;

    this.openWorkoutIndex = targetWorkoutIndex;
    if (targetSplitIndex === this.currentSplitIndex) {
      this.updateCurrentSplit();
      this.scrollToOpenWorkout();
    } else {
      this.currentSplitIndex = targetSplitIndex;
    }

    this.flashWorkoutWithRetry(targetWorkoutIndex);
    return true;
  }

  // Espera a que el acordeón del workout esté en el DOM (cambiar de split lo
  // re-renderiza) y le añade la clase de parpadeo un par de segundos —
  // calcado de scrollToExerciseWithRetry pero a nivel de workout.
  private flashWorkoutWithRetry(workoutIndex: number, attempt = 0): void {
    const maxAttempts = 20;
    const delay = attempt === 0 ? 700 : 200;

    setTimeout(() => {
      const element = document.getElementById(`workout-${workoutIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        element.classList.add("highlight-workout");
        setTimeout(() => {
          element.classList.remove("highlight-workout");
        }, 2000);
      } else if (attempt < maxAttempts) {
        this.flashWorkoutWithRetry(workoutIndex, attempt + 1);
      }
    }, delay);
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
        this.scrollToOpenWorkout();
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
        this.scrollToOpenWorkout();
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
    if (isPremiumActive(this.user?.premium)) return false;
    if (typeof this.microcyclesPerRoutineLimit !== "number") return false;
    return splitIndex >= this.microcyclesPerRoutineLimit;
  }

  public isCurrentSplitLocked(): boolean {
    return this.isSplitLocked(this.currentSplitIndex);
  }

  private isMicrocycleCreationLimitReached(): boolean {
    if (isPremiumActive(this.user?.premium)) return false;
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

  public isCurrentSplitInUse(): boolean {
    if (!this.currentSplit || !this.user?.workoutInUse) return false;
    return this.currentSplit.workouts.some(
      (w) => w._id === this.user?.workoutInUse
    );
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
          attributes: { maxlength: 100 },
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

  // Replanteamiento MVP (rutinas): this.user.tableInUse es la tabla en uso
  // del usuario LOGUEADO, undefined para un profesional que no tiene rutina
  // propia — usa this.tableInUse._id (la tabla que este componente ya tiene
  // cargada, cliente incluido). Punto único usado tanto por el CTA principal
  // (addWorkout) como por el FAB (addWorkoutToSplit) — antes eran dos
  // implementaciones divergentes que hacían lo mismo.
  private openAddWorkoutAlert(options: {
    header: string;
    message?: string;
    placeholder: string;
    confirmText: string;
    toastMessageKey: string;
    requiredInput: boolean;
    showEmptyErrorToast: boolean;
    isFab: boolean;
  }): void {
    if (this.isCurrentSplitLocked()) {
      this.openPremiumFromLockedSplit();
      return;
    }

    if (options.isFab) {
      this.loadingFab = true;
    }

    const alertOptions: AlertOptions = {
      header: this.translate.instant(options.header),
      ...(options.message
        ? { message: this.translate.instant(options.message) }
        : {}),
      inputs: [
        {
          name: "workoutName",
          type: "text" as "text",
          placeholder: this.translate.instant(options.placeholder),
          ...(options.requiredInput ? { attributes: { required: true } } : {}),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
          handler: () => {
            if (options.isFab) this.loadingFab = false;
          },
        },
        {
          text: this.translate.instant(options.confirmText),
          cssClass: options.isFab ? undefined : "alert-button-confirm",
          handler: (data: any) => {
            const name = data?.workoutName?.trim();
            if (!name) {
              if (options.showEmptyErrorToast) {
                const errorToast: ToastOptions = {
                  message: this.translate.instant('TABLES.WORKOUT_NAME_EMPTY'),
                  duration: 2000,
                };
                this.ionicUtilService.showToast(errorToast);
              }
              return false; // Prevent closing if empty
            }

            const workout = this.workoutService.getStandarWorkout();
            workout.name = name;

            this.workoutService
              .addWorkoutsToSplits(this.tableInUse._id, workout)
              .subscribe((resSplits) => {
                this.tableInUse.splits = resSplits;
                this.tableService.setCurrentTable = this.tableInUse;

                const toastOptions: ToastOptions = {
                  message: this.translate.instant(options.toastMessageKey, { name }),
                  duration: 500,
                };
                this.ionicUtilService.showToast(toastOptions);

                if (options.isFab) this.loadingFab = false;
              });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public addWorkout(): void {
    this.openAddWorkoutAlert({
      header: 'TABLES.ADD_WORKOUT_ALERT',
      message: 'TABLES.ADD_WORKOUT_MSG',
      placeholder: 'TABLES.WORKOUT_EXAMPLE',
      confirmText: 'TABLES.ADD_BTN',
      toastMessageKey: 'TABLES.WORKOUT_ADDED',
      requiredInput: true,
      showEmptyErrorToast: false,
      isFab: false,
    });
  }

  // 2026-09 — el cliente no tenía forma de crearse un día de descanso
  // propio: train-fit-trainers ya lo permite para el entrenador pautando a
  // un cliente (planner-column.component.ts#addRestDayCard, mismo endpoint),
  // pero aquí solo existía "Crear entrenamiento" con nombre libre. Sin
  // prompt de nombre a propósito — igual que la versión de trainers, un
  // descanso no necesita que el usuario elija nada, el nombre por defecto ya
  // lo dice todo.
  public addRestDay(): void {
    if (this.isCurrentSplitLocked()) {
      this.openPremiumFromLockedSplit();
      return;
    }
    if (this.loadingFab) return;
    this.loadingFab = true;

    const workout = new Workout();
    workout.name = this.translate.instant('TABLES.REST_DAY_DEFAULT_NAME');
    workout.exercises = [];
    workout.isPlannedRestDay = true;

    this.workoutService.addWorkoutsToSplits(this.tableInUse._id, workout).subscribe({
      next: (resSplits) => {
        this.tableInUse.splits = resSplits;
        this.tableService.setCurrentTable = this.tableInUse;
        this.loadingFab = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('TABLES.REST_DAY_ADDED'),
          duration: 800,
        } as ToastOptions);
      },
      error: (error) => {
        this.loadingFab = false;
        this.ionicUtilService.showErrorToast(
          error,
          this.translate.instant('TABLES.REST_DAY_ADD_ERROR')
        );
      },
    });
  }

  public get shouldShowWorkoutTemplates(): boolean {
    const workoutCount =
      this.tableInUse?.splits?.reduce(
        (total, split) => total + (split.workouts?.length ?? 0),
        0
      ) ?? 0;

    return (
      !this.loadingSplit &&
      (workoutCount === 0 || this.workoutTemplateLoadingId !== null)
    );
  }

  private translateDbValue(value: string): string {
    const currentLang = this.translate.currentLang || 'es';
    if (currentLang === 'en') {
      const translated = TRANSLATE_DB_MAP[value.trim()];
      if (translated) {
        return translated;
      }
    }
    return value;
  }

  public confirmWorkoutTemplate(template: WorkoutTemplate): void {
    if (this.isCurrentSplitLocked()) {
      this.openPremiumFromLockedSplit();
      return;
    }

    if (this.workoutTemplateLoadingId) return;

    const workoutList = template.workouts
      .map((workoutName) => `- ${this.translateDbValue(workoutName)}`)
      .join("\n");
    const alertOptions: AlertOptions = {
      header: this.translateDbValue(template.name),
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

    const workouts = template.workouts.map((name) => {
      const workout = new Workout();
      workout.name = this.translateDbValue(name);
      return workout;
    });

    this.workoutService
      .addWorkoutsToSplits(this.tableInUse._id, workouts)
      .subscribe({
        next: (resSplits) => {
          this.tableInUse.splits = resSplits;
          this.tableService.setCurrentTable = this.tableInUse;
          this.workoutTemplateLoadingId = null;
          this.updateCurrentSplit();
          this.ionicUtilService.showToast({
            message: this.translate.instant('TABLES.TEMPLATE_CREATED', { name: this.translateDbValue(template.name) }),
            duration: 1200,
            color: "success",
          } as ToastOptions);
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

  public onExerciseCopyEvent(event: {
    workoutId: string;
    workoutIndex: number;
    selectionMode: boolean;
    selectedIndices: Set<number>;
  }): void {
    if (!event.selectionMode) {
      this.exerciseCopyActive = false;
      this.exerciseOriginWorkoutId = undefined;
      return;
    }

    this.exerciseOriginWorkoutId = event.workoutId;
    this.exerciseCopyActive = event.selectionMode;
    this.openWorkoutIndex = event.workoutIndex;
    this.exerciseClipboard = this.workoutService.getExerciseClipboard;
    this.exercisePasteMode = !!this.exerciseClipboard;
    this.cdr.markForCheck();
    this.scrollToOpenWorkout();
  }

  public toggleAccordion(event: any, index: number): void {
    const value = event?.detail?.value;
    if (value === undefined) return;
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
              return false;
            }
            const routineName = data.tableName.trim();

            if (this.isManagementAdmin) {
              const defaultAlert: AlertOptions = {
                header: this.translate.instant('TABLES.CREATE_AS_DEFAULT'),
                message: `${this.translate.instant('TABLES.CREATE_AS_DEFAULT_MSG')} "${routineName}"`,
                buttons: [
                  {
                    text: this.translate.instant('COMMON.CANCEL'),
                    role: "cancel",
                    cssClass: "alert-button-primary",
                    handler: () => { this.loadTable = true; },
                  },
                  {
                    text: this.translate.instant('TABLES.CREATE_PRIVATE'),
                    cssClass: "alert-button-primary",
                    handler: () => { this.doCreateTableMeso(routineName, false); },
                  },
                  {
                    text: this.translate.instant('TABLES.CREATE_AS_DEFAULT'),
                    cssClass: "alert-button-success",
                    handler: () => { this.doCreateTableMeso(routineName, true); },
                  },
                ],
              };
              this.ionicUtilService.showAlert(defaultAlert);
            } else {
              this.doCreateTableMeso(routineName, false);
            }
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private doCreateTableMeso(routineName: string, isDefault: boolean): void {
    const createObservable = isDefault
      ? this.tableService.createDefaultTable(routineName)
      : this.tableService.createTableToUser(this.user._id, routineName);

    createObservable.subscribe((resTable) => {
      this.tableInUse = resTable;
      this.user.tableInUse = this.tableInUse._id;
      this.userService.setLocalUser = this.user;
      this.tableService.setCurrentTable = this.tableInUse;
      this.loadTable = true;
    });
  }

  public addSplitToTable(): void {
    if (this.isMicrocycleCreationLimitReached()) {
      this.showMicrocycleLimitAlert();
      return;
    }

    let alertOptions: AlertOptions;

    // Techo real del usuario (4 free / 50 pro, ver feature-access-service.js).
    // No hardcodear el número aquí — isMicrocycleCreationLimitReached() de
    // arriba exime a los usuarios premium, así que este es el único punto
    // que realmente frena la creación una vez alcanzado el límite premium.
    const microcycleCeiling = this.microcyclesPerRoutineLimit ?? 50;
    if (this.tableInUse.splits.length >= microcycleCeiling) {
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
        header: this.translate.instant(ACTIONS_FAB[ACTIONS_FAB_TYPES.duplicateMicrocycle].value),
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
              this.loadingFab = true;
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
              this.loadingFab = true;
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
        message: this.translate.instant(ACTIONS_FAB[ACTIONS_FAB_TYPES.duplicateMicrocycle].value),
        buttons: [
          {
            text: this.translate.instant('COMMON.CANCEL'),
            role: "cancel",
          },
          {
            text: this.translate.instant('COMMON.CONFIRM'),
            cssClass: "alert-button-primary",
            handler: () => {
              this.loadingFab = true;
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
    }
  }

  public async deleteSplit(): Promise<void> {
    if (this.loadingSplit || !this.tableInUse?.splits?.length) return;

    const modalResult = await this.ionicUtilService.showModal({
      component: DeleteSplitsModalComponent,
      componentProps: {
        splits: this.tableInUse.splits,
        currentSplitIndex: this._currentSplitIndex,
        workoutInUse: this.user?.workoutInUse,
      },
      cssClass: ["delete-splits-modal", "tf-panel-modal"],
    });

    const splitIds = modalResult.data?.splitIds as string[] | undefined;
    if (modalResult.role !== "confirm" || !splitIds?.length) return;

    const splitCount = splitIds.length;
    const alertOptions: AlertOptions = {
      header: this.translate.instant(ACTIONS_FAB[ACTIONS_FAB_TYPES.deleteMicrocycle].value),
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

  // Rediseño de entrenamiento (Fase A) — aplica una WorkoutTemplate real
  // (biblioteca del profesional) dentro del split actual, materializando
  // exercises/sets ya prescritos. Solo visible en el panel del entrenador
  // (isModal=true, ver comentario del campo) — nunca en train-fit-front,
  // que reutiliza este mismo componente para la rutina propia del cliente y
  // no tiene relación trainer-cliente que satisfaga la ruta del backend.
  public async openApplyTemplateAlert(): Promise<void> {
    if (this.applyingTemplate || !this.currentSplit || !this.tableInUse?.userId) return;

    this.applyingTemplate = true;
    this.workoutTemplateApi.list().subscribe({
      next: (templates: WorkoutTemplateDoc[]) => {
        this.applyingTemplate = false;
        if (!templates.length) {
          this.ionicUtilService.showToast({
            message: this.translate.instant('TABLES.NO_WORKOUT_TEMPLATES'),
            duration: 3000,
          });
          return;
        }
        this.showApplyTemplatePicker(templates);
      },
      error: () => {
        this.applyingTemplate = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('TABLES.TEMPLATES_LOAD_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  private async showApplyTemplatePicker(templates: WorkoutTemplateDoc[]): Promise<void> {
    const inputs: AlertOptions['inputs'] = templates.map((template, index) => ({
      type: 'radio',
      label: template.name,
      value: template._id,
      checked: index === 0,
    }));

    await this.ionicUtilService.showAlert({
      header: this.translate.instant('TABLES.APPLY_TEMPLATE_HEADER'),
      inputs,
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          handler: (templateId: string) => {
            if (templateId) this.applyTemplateToTable(templateId);
          },
        },
      ],
    });
  }

  // La plantilla entra como un entrenamiento nuevo en TODOS los microciclos
  // (applyToTable), igual que crear uno a mano: un entrenamiento de un solo
  // microciclo descuadraría las filas.
  private applyTemplateToTable(templateId: string): void {
    const clientId = this.tableInUse.userId;

    this.applyingTemplate = true;
    this.workoutTemplateApi.applyToTable(clientId, this.tableInUse._id, templateId).subscribe({
      next: (resSplits) => {
        this.applyingTemplate = false;
        this.tableInUse.splits = resSplits;
        this.tableService.setCurrentTable = this.tableInUse;
        this.ionicUtilService.showToast({ message: this.translate.instant('TABLES.TEMPLATE_APPLIED'), duration: 1500 });
      },
      error: () => {
        this.applyingTemplate = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('TABLES.TEMPLATE_APPLY_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  private deleteSelectedSplits(splitIds: string[]): void {
    if (this.loadingSplit) return;

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
    this.openAddWorkoutAlert({
      header: ACTIONS_FAB[ACTIONS_FAB_TYPES.addWorkout].value,
      placeholder: 'TABLES.ROUTINE_NAME_PLACEHOLDER',
      confirmText: 'COMMON.CONFIRM',
      toastMessageKey: 'TABLES.WORKOUT_ADDED_SIMPLE',
      requiredInput: false,
      showEmptyErrorToast: true,
      isFab: true,
    });
  }

  public async openClipboardModal(): Promise<void> {
    if (!this.exerciseClipboard) return;

    const modalResult = await this.ionicUtilService.showModal({
      component: ClipboardExercisesModalComponent,
      componentProps: {
        exercises: this.exerciseClipboard.selectedExercises,
        mode: 'view',
      },
      cssClass: ['clipboard-modal', 'tf-panel-modal'],
    });

    if (modalResult.role !== 'confirm') return;

    const selectedExercises = modalResult.data
      .selectedExercises as CustomExercise[];

    this.workoutService.setExerciseClipboard = new ExerciseClipboard(
      this.exerciseClipboard.sourceWorkoutId,
      selectedExercises
    );
  }

  public cancelCopyMode(): void {
    this.exercisePasteMode = false;
    this.exerciseCopyActive = false;
    this.exerciseOriginWorkoutId = undefined;
    this.workoutService.clearExerciseClipboard();
  }

  public async showSplitMenu(event: Event): Promise<void> {
    if (this.loadingSplit || this.isReadonly) return;

    const popoverOptions = {
      component: SplitMenuPopoverComponent,
      event: event,
      componentProps: {
        onDuplicate: () => this.addSplitToTable(),
        onDelete: () => this.deleteSplit(),
        duplicateDisabled: this.loadingSplit || this.isCurrentSplitLocked(),
      },
    };

    await this.ionicUtilService.showPopover(popoverOptions);
  }

  public close(): void {
    if (this.isModal) {
      void this.modalController.dismiss();
      return;
    }
    this.navigationService.goToTabsSummaryPage();
  }

  public trackByWorkout(index: number, item: Workout): string {
    return item._id;
  }
}
