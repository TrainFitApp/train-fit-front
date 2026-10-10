import { Component, ViewChild, effect, inject } from "@angular/core";
import { AlertOptions, Platform, ToastOptions } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { CustomExercise } from "src/app/core/models/customExercise";
import { Table } from "src/app/core/models/table";
import { User } from "src/app/core/models/user";
import { Workout } from "src/app/core/models/workout";
import { CoachService } from "src/app/core/services/coach/coach.service";
import { CustomExerciseService } from "src/app/core/services/custom-exercise/custom-exercise.service";
import { TableService } from "src/app/core/services/table/table.service";
import { UserService } from "src/app/core/services/user/user.service";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";
import { UtilService } from "src/app/core/services/util/util.service";
import { WorkoutService } from "src/app/core/services/workout/workout.service";
import { TABLE_MODE_TYPES } from "src/app/shared/constants/table-mode";
import { SearchFilterGroup } from "src/app/shared/models/filterGroup";
import { Theme } from "src/app/shared/models/theme";
import { AdMobService } from "src/app/core/services/util/ad-mob.service";
import { BillingService } from "src/app/core/services/billing/billing.service";
import { PinnedExerciseNoteService } from "src/app/core/services/pinned-exercise-note/pinned-exercise-note.service";
import { PinnedExerciseNote } from "src/app/core/models/pinned-exercise-note";
import { RemoteConfigGateService } from "src/app/core/services/remote-config/remote-config-gate.service";
import { Subscription } from "rxjs";
import { APP_SHELL_CONFIG } from "src/app/app-shell.config";
import { isPremiumActive } from "src/app/core/utils/premium-status.util";
import { nextTrainingDay } from "src/app/core/utils/training-day.util";
import { currentMicrocycleNumber } from "src/app/core/utils/microcycle-progress.util";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.page.html",
  styleUrls: ["./summary.page.scss"],
})
export class SummaryPage {
  @ViewChild("ionContent")
  public ionContent: any;
  public tableList: Table[];
  public user: User;
  public search: string = "";

  public get isManagementAdmin(): boolean {
    return APP_SHELL_CONFIG.managementEntryEnabled && this.user?.roles?.includes('admin');
  }

  public searchFilterGroup: SearchFilterGroup;
  public shieldFilter: boolean;
  public load: boolean;

  public tableInUse: Table;

  public workout: Workout;

  public pinnedNotes: PinnedExerciseNote[] = [];
  private pinnedNoteCacheSub: Subscription | null = null;

  // Inyección de servicios
  private readonly userService = inject(UserService);
  private readonly tableService = inject(TableService);
  private readonly workoutService = inject(WorkoutService);
  private readonly adMobService = inject(AdMobService);
  private readonly billingService = inject(BillingService);
  private readonly translate = inject(TranslateService);
  private readonly pinnedExerciseNoteService = inject(PinnedExerciseNoteService);
  private readonly remoteConfigGate = inject(RemoteConfigGateService);
  public readonly coachService = inject(CoachService);

  constructor(
    public platform: Platform,
    private utilService: UtilService,
    private customExerciseService: CustomExerciseService,
    private navigationService: NavigationService,
    private ionicUtilService: IonicUtilService,
  ) {
    // Effect para el usuario
    effect(() => {
      this.user = this.userService.localUser();
    });

    // Effect para la tabla actual
    effect(() => {
      this.tableInUse = this.tableService.currentTable();
    });

    effect(() => {
      this.workout = this.workoutService.currentWorkoutSignal();
    });
  }

  public ionViewWillEnter(): void {
    this.loadPinnedNotes();
    this.pinnedNoteCacheSub = this.pinnedExerciseNoteService.cache$.subscribe(() => {
      this.loadPinnedNotes();
    });
  }

  public ionViewWillLeave(): void {
    this.pinnedNoteCacheSub?.unsubscribe();
  }

  private loadPinnedNotes(): void {
    if (this.tableInUse?._id) {
      this.pinnedExerciseNoteService.getByTable(this.tableInUse._id).subscribe((notes) => {
        this.pinnedNotes = notes;
      });
    }
  }

  // 2026-09 — con rutina asignada, lo del entrenador sale como círculo
  // (app-trainer-note-dot) y no como nota editable.
  public get hasTrainer(): boolean {
    return !!this.tableInUse?.assignedByTrainerId;
  }

  public getTrainerPinnedNote(exerciseIndex: number): PinnedExerciseNote | undefined {
    const note = this.getExercisePinnedNote(exerciseIndex);
    return note?.authorRole === 'trainer' ? note : undefined;
  }

  public getExercisePinnedNote(exerciseIndex: number): PinnedExerciseNote | undefined {
    const workoutIndex = this.getWorkoutIndex();
    if (workoutIndex < 0) return undefined;
    return this.pinnedNotes.find(
      (n) => n.workoutIndex === workoutIndex && n.exerciseIndex === exerciseIndex
    );
  }

  private getWorkoutIndex(): number {
    if (!this.tableInUse || !this.workout) return -1;
    for (const split of this.tableInUse.splits) {
      const idx = split.workouts.findIndex((w: any) => w._id === this.workout._id);
      if (idx >= 0) return idx;
    }
    return -1;
  }

  public onTabChange(event: { tab: string }): void {
    let tableMode: TABLE_MODE_TYPES;

    if (event.tab === "summary") tableMode = TABLE_MODE_TYPES.summaryGeneral;
    else tableMode = TABLE_MODE_TYPES.mesocycle;

    this.utilService.setTableMode = tableMode;
  }

  public async createTableAndAddToUser(): Promise<void> {
    if (await this.billingService.isFreshLimitReached("routines")) {
      await this.showRoutineLimitAlert();
      return;
    }

    // La rutina en uso la pautó el entrenador: la nueva será propia y él no
    // la verá ni podrá hacerle seguimiento.
    const trainerWarning = this.tableInUse?.assignedByTrainerId
      ? ` ${this.translate.instant('TABLES.TRAINER_UNTRACKED_ROUTINE_WARNING')}`
      : '';

    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.CREATE_ROUTINE_ALERT'),
      message: this.translate.instant('TABLES.CREATE_ROUTINE_MSG') + trainerWarning,
      inputs: [
        {
          name: "routineName",
          type: "text",
          placeholder: this.translate.instant('TABLES.ROUTINE_NAME_PLACEHOLDER'),
          value: "",
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
          cssClass: "alert-button-primary",
        },
        {
          text: this.translate.instant('TABLES.CREATE_BTN'),
          cssClass: "alert-button-success",
          handler: (data) => {
            if (!data.routineName || data.routineName.trim() === "") {
              const toastOptions: ToastOptions = {
                message: this.translate.instant('COMMON.FIELD_EMPTY'),
                duration: 2000,
              };
              this.ionicUtilService.showToast(toastOptions);
              return false;
            }
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then((result) => {
      if (result.role !== "cancel" && result.data?.values?.routineName) {
        const routineName = result.data.values.routineName;

        if (this.isManagementAdmin) {
          const defaultAlert: AlertOptions = {
            header: this.translate.instant('TABLES.CREATE_AS_DEFAULT'),
            message: `${this.translate.instant('TABLES.CREATE_AS_DEFAULT_MSG')} "${routineName}"`,
            buttons: [
              {
                text: this.translate.instant('COMMON.CANCEL'),
                role: "cancel",
                cssClass: "alert-button-primary",
              },
              {
                text: this.translate.instant('TABLES.CREATE_PRIVATE'),
                cssClass: "alert-button-primary",
                handler: () => { this.doCreateTable(routineName, false); },
              },
              {
                text: this.translate.instant('TABLES.CREATE_AS_DEFAULT'),
                cssClass: "alert-button-success",
                handler: () => { this.doCreateTable(routineName, true); },
              },
            ],
          };
          this.ionicUtilService.showAlert(defaultAlert);
        } else {
          this.doCreateTable(routineName, false);
        }
      }
    });
  }

  private doCreateTable(routineName: string, isDefault: boolean): void {
    const createObservable = isDefault
      ? this.tableService.createDefaultTable(routineName)
      : this.tableService.createTableToUser(this.user._id, routineName);

    createObservable.subscribe({
      next: (resTable) => {
        this.tableInUse = resTable;
        this.user.tableInUse = this.tableInUse._id;
        this.user.workoutInUse = undefined;
        this.userService.setLocalUser = this.user;
        this.tableService.setCurrentTable = this.tableInUse;
        void this.billingService.refreshBackendEntitlements();
        this.navigationService.goToMesocycle();

        if (!isPremiumActive(this.user?.premium)) {
          this.adMobService.interstitial("create_routine");
        }
        const toastOptions: ToastOptions = {
          message: this.translate.instant('TABLES.ROUTINE_CREATED_SUCCESS'),
          duration: 2000,
        };
        this.ionicUtilService.showToast(toastOptions);
      },
      error: (error) => {
        if (this.handleRoutineLimitError(error)) {
          return;
        }

        this.ionicUtilService.showErrorToast(
          error,
          this.translate.instant('TABLES.ROUTINE_CREATE_ERROR'),
        );
      },
    });
  }

  private async showRoutineLimitAlert(): Promise<void> {
    await this.ionicUtilService.showPremiumLimitAlert({
      message: this.translate.instant('TABLES.ROUTINE_LIMIT_REACHED'),
      onUpgrade: () => this.navigationService.goToPremium(),
    });
  }

  private handleRoutineLimitError(error: any): boolean {
    if (
      error?.code !== "PREMIUM_LIMIT_ROUTINES" &&
      error?.error?.code !== "PREMIUM_LIMIT_ROUTINES"
    ) {
      return false;
    }

    void this.showRoutineLimitAlert();
    return true;
  }

  public getWorkoutSets(): number {
    return this.workout.exercises.reduce((totalSets, exercise) => {
      return totalSets + exercise.sets.length;
    }, 0);
  }

  public isCustomExerciseCompleted(customExercise: CustomExercise): boolean {
    return this.customExerciseService.isCustomExerciseCompleted(customExercise);
  }

  // Resumen desplegable de la card "Continuar" (sustituye a la vieja card
  // suelta "Detalle del entrenamiento") — toggle vía el icono info.
  public isWorkoutSummaryExpanded = false;

  public toggleWorkoutSummary(): void {
    this.isWorkoutSummaryExpanded = !this.isWorkoutSummaryExpanded;
  }

  public getExerciseCompletedSets(exercise: CustomExercise): number {
    return (exercise.sets || []).filter((set) => set.doned).length;
  }

  public getExerciseSetsProgress(exercise: CustomExercise): number {
    const total = exercise.sets?.length || 0;
    if (!total) return 0;
    return Math.round((this.getExerciseCompletedSets(exercise) / total) * 100);
  }

  public selectWorkout(): void {
    this.navigationService.goToCurrentWorkout();
  }

  // Sin entreno en curso: lo siguiente que toca, un entreno o un descanso
  // pautado (ver training-day.util).
  public getNextTrainingDay(): Workout | null {
    return nextTrainingDay(this.tableInUse?.splits);
  }

  public currentMicrocycle(): number {
    return currentMicrocycleNumber(this.tableInUse?.splits);
  }

  public isWorkoutInSplit(split: any): boolean {
    if (!split || !split.workouts || !this.user?.workoutInUse) return false;
    return split.workouts.some((w: any) => w?._id === this.user.workoutInUse);
  }

  public getSplitClass(split: any): string {
    // Prioridad: naranja si el workout en uso pertenece al split;
    // en otro caso, verde si el split está terminado; si no, sin color.
    if (this.isWorkoutInSplit(split)) return "current";
    const done = this.utilService.isSplitDoned
      ? this.utilService.isSplitDoned(split)
      : false;
    return done ? "done" : "";
  }

  public openMesocycle(): void {
    if (this.user.tableInUse) this.navigationService.goToMesocycle();
    else this.openSearchTables();
  }

  public openSearchTables(): void {
    this.navigationService.goToSearchTables();
  }

  // Confirmación INLINE (Summary Screen Redesign), no alert nativo — "Salir"
  // se cambia por una fila "¿Salir de {{rutina}}? Cancelar / Confirmar"
  // dentro de la propia tarjeta, calcada del diseño de referencia.
  public isConfirmingExit = false;

  public requestExit(): void {
    this.isConfirmingExit = true;
  }

  public cancelExit(): void {
    this.isConfirmingExit = false;
  }

  public confirmExit(): void {
    this.isConfirmingExit = false;
    this.tableInUse = undefined;
    this.user.tableInUse = undefined;
    this.user.workoutInUse = undefined;
    this.workout = undefined;
    this.workoutService.setCurrentWorkout = undefined;
    this.tableService.setCurrentTable = undefined;
    this.userService.updateUser(this.user).subscribe();
  }

  public async goToStatistics(): Promise<void> {
    if (!this.shouldRequireAdPrompt()) {
      this.navigationService.goToStatistics();
      return;
    }

    const alertOptions: AlertOptions = {
      header: this.translate.instant('TABLES.PREMIUM_STATISTICS'),
      message:
        this.translate.instant('TABLES.PREMIUM_STATISTICS_MSG'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: "cancel",
          cssClass: "alert-button-primary",
        },
        {
          text: this.translate.instant('TABLES.WATCH_AD'),
          cssClass: "alert-button-success",
          handler: () => {
            this.adMobService
              .interstitial("start_statistics")
              .then(() => {
                this.navigationService.goToStatistics();
              })
              .catch((err) => {
                console.error("Error al mostrar anuncio intersticial", err);
                this.navigationService.goToStatistics();
              });
          },
        },
      ],
    };

    await this.ionicUtilService.showAlert(alertOptions);
  }

  private shouldRequireAdPrompt(): boolean {
    const entitlements = this.billingService.getCachedEntitlements();
    if (typeof entitlements?.adsEnabled === "boolean") {
      return entitlements.adsEnabled;
    }

    return !isPremiumActive(this.user?.premium);
  }

  // Nuevos métodos para la interfaz móvil
  public backgroundClass: string = "light-theme";
  public theme: Theme;

  public getWorkoutProgress(): number {
    if (!this.workout || !this.workout.exercises.length) return 0;

    const completedExercises = this.workout.exercises.filter((exercise) =>
      this.isCustomExerciseCompleted(exercise),
    ).length;

    return (completedExercises / this.workout.exercises.length) * 100;
  }

  public getCompletedExercises(): number {
    if (!this.workout || !this.workout.exercises.length) return 0;

    return this.workout.exercises.filter((exercise) =>
      this.isCustomExerciseCompleted(exercise),
    ).length;
  }

  public async showExerciseNoteAlert(exercise: CustomExercise): Promise<void> {
    const alertOptions: AlertOptions = {
      header: exercise.exercise?.name || this.translate.instant('TABLES.EXERCISE_DELETED'),
      message: exercise.notes,
      buttons: [this.translate.instant('COMMON.CONFIRM')],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  public async showPinnedNoteAlert(exerciseIndex: number): Promise<void> {
    const note = this.getExercisePinnedNote(exerciseIndex);
    if (!note) return;
    const exercise = this.workout?.exercises?.[exerciseIndex];
    const alertOptions: AlertOptions = {
      header: exercise?.exercise?.name,
      message: note.notes,
      buttons: [this.translate.instant('COMMON.CONFIRM')],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  public get isPremiumActive(): boolean {
    return isPremiumActive(this.user?.premium);
  }

  public goToPremium(): void {
    this.navigationService.goToPremium();
  }

  public get maintenanceWarning$() {
    return this.remoteConfigGate.warningBanner$;
  }

  public dismissMaintenanceWarning(): void {
    this.remoteConfigGate.dismissWarningBanner();
  }
}
