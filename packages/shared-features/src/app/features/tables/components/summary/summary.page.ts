import { Component, ViewChild, effect, inject } from "@angular/core";
import { AlertOptions, Platform, ToastOptions } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { CustomExercise } from "src/app/core/models/customExercise";
import { Table } from "src/app/core/models/table";
import { User } from "src/app/core/models/user";
import { Workout } from "src/app/core/models/workout";
import { CustomExerciseService } from "src/app/core/services/custom-exercise/custom-exercise.service";
import { TableService } from "src/app/core/services/table/table.service";
import { UserService } from "src/app/core/services/user/user.service";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";
import { ThemeService } from "src/app/core/services/util/theme.service";
import { UtilService } from "src/app/core/services/util/util.service";
import { WorkoutService } from "src/app/core/services/workout/workout.service";
import { TABLE_MODE_TYPES } from "src/app/shared/constants/table-mode";
import { SearchFilterGroup } from "src/app/shared/models/filterGroup";
import { Theme } from "src/app/shared/models/theme";
import { AdMobService } from "src/app/core/services/util/ad-mob.service";
import { BillingService } from "src/app/core/services/billing/billing.service";
import { AiImportService } from "src/app/core/services/ai-import/ai-import.service";
import { AiTablePreview } from "src/app/core/models/ai-import";
import { ExcelImportComponent } from "./components/excel-import/excel-import.component";

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

  public searchFilterGroup: SearchFilterGroup;
  public shieldFilter: boolean;
  public favouriteFilter: boolean;
  public load: boolean;

  public tableInUse: Table;

  public workout: Workout;

  public aiLoading = false;
  public aiLoadingMessage = '';

  // Inyección de servicios
  private readonly userService = inject(UserService);
  private readonly tableService = inject(TableService);
  private readonly workoutService = inject(WorkoutService);
  private readonly adMobService = inject(AdMobService);
  private readonly billingService = inject(BillingService);
  private readonly aiImportService = inject(AiImportService);
  private readonly modalController = inject(ModalController);

  constructor(
    public platform: Platform,
    private utilService: UtilService,
    private customExerciseService: CustomExerciseService,
    private navigationService: NavigationService,
    private themeService: ThemeService,
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

  public ionViewWillEnter(): void {}

  public ionViewWillLeave(): void {}

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

    const alertOptions: AlertOptions = {
      header: "Crear rutina",
      message: "Introduce el nombre para tu nueva rutina de entrenamiento",
      inputs: [
        {
          name: "routineName",
          type: "text",
          placeholder: "Nombre de la rutina",
          value: "",
        },
      ],
      buttons: [
        {
          text: "CANCELAR",
          role: "cancel",
          cssClass: "alert-button-primary",
        },
        {
          text: "CREAR",
          cssClass: "alert-button-success",
          handler: (data) => {
            if (!data.routineName || data.routineName.trim() === "") {
              const toastOptions: ToastOptions = {
                message: "El campo no puede estar vacio",
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
        this.tableService
          .createTableToUser(this.user._id, result.data.values.routineName)
          .subscribe({
            next: (resTable) => {
              this.tableInUse = resTable;
              this.user.tableInUse = this.tableInUse._id;
              this.user.workoutInUse = undefined;
              this.user.ownTables.push(this.tableInUse._id);
              this.userService.setLocalUser = this.user;
              this.tableService.setCurrentTable = this.tableInUse;
              void this.billingService.refreshBackendEntitlements();
              this.navigationService.goToMesocycle();

              if (!this.user?.premium?.entitled) {
                this.adMobService.interstitial("create_routine");
              }
              const toastOptions: ToastOptions = {
                message: "Rutina creada con exito",
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
                "No se pudo crear la rutina",
              );
            },
          });
      }
    });
  }

  public async importExcels(): Promise<void> {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv';

    fileInput.onchange = async (event: any) => {
      const file = event.target?.files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        this.ionicUtilService.showErrorToast(null, 'El archivo excede el límite de 10MB');
        return;
      }

      try {
        this.showAiLoading('IA analizando la rutina...');

        const { sheets, fileName } = await this.aiImportService.parseExcel(file);

        const preview = await this.aiImportService.interpretExcel(sheets, fileName);

        this.hideAiLoading();
        await this.showImportPreview(preview);
      } catch (error: any) {
        this.hideAiLoading();
        this.ionicUtilService.showErrorToast(error, 'Error al importar el archivo');
      }
    };

    fileInput.click();
  }

  private async showImportPreview(preview: AiTablePreview): Promise<void> {
    const modal = await this.modalController.create({
      component: ExcelImportComponent,
      componentProps: { preview },
      cssClass: 'fullscreen-modal',
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.confirmed) {
      await this.confirmImport(preview);
    }
  }

  private async confirmImport(preview: AiTablePreview): Promise<void> {
    if (await this.billingService.isFreshLimitReached("routines")) {
      await this.showRoutineLimitAlert();
      return;
    }

    try {
      this.showAiLoading('Creando rutina en TrainFit...');

      const table = await this.aiImportService.createTable(preview);

      this.hideAiLoading();

      this.tableService.setCurrentTable = table;
      this.user.tableInUse = table._id;
      this.user.workoutInUse = undefined;
      const tableIdStr = table._id;
      if (!this.user.ownTables.find((id: any) => String(id) === String(tableIdStr))) {
        this.user.ownTables.push(table._id);
      }
      this.userService.setLocalUser = this.user;
      void this.billingService.refreshBackendEntitlements();

      const toastOptions: ToastOptions = {
        message: 'Rutina importada correctamente',
        duration: 2000,
      };
      this.ionicUtilService.showToast(toastOptions);

      this.navigationService.goToMesocycle();
    } catch (error: any) {
      await this.ionicUtilService.hideLoading();
      if (error?.code === 'PREMIUM_LIMIT_ROUTINES') {
        await this.showRoutineLimitAlert();
        return;
      }
      this.ionicUtilService.showErrorToast(error, 'Error al crear la rutina importada');
    }
  }

  private showAiLoading(message: string): void {
    this.aiLoadingMessage = message;
    this.aiLoading = true;
    const tabBar = document.querySelector('ion-tab-bar');
    if (tabBar) tabBar.style.display = 'none';
  }

  private hideAiLoading(): void {
    this.aiLoading = false;
    const tabBar = document.querySelector('ion-tab-bar');
    if (tabBar) tabBar.style.display = '';
  }

  private async showRoutineLimitAlert(): Promise<void> {
    await this.ionicUtilService.showPremiumLimitAlert({
      message: "Has alcanzado el limite de rutinas. Activa Pro para crear mas.",
      onUpgrade: () => this.navigationService.goToPremium(),
    });
  }

  private handleRoutineLimitError(error: any): boolean {
    if (error?.error?.code !== "PREMIUM_LIMIT_ROUTINES") {
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

  public getCompletedExercisesCount(): number {
    if (!this.workout || !this.workout.exercises) return 0;
    return this.workout.exercises.filter((ex) =>
      this.isCustomExerciseCompleted(ex),
    ).length;
  }

  public isCustomExerciseCompleted(customExercise: CustomExercise): boolean {
    return this.customExerciseService.isCustomExerciseCompleted(customExercise);
  }

  public selectWorkout(): void {
    this.navigationService.goToCurrentWorkout();
  }

  public countDoneSplits(): number {
    return (
      this.tableInUse.splits.reduce((totalDoneSplits, split) => {
        // Verificar si todos los workouts en el split tienen todos los sets hechos
        const allWorkoutsDone = split.workouts.every((workout) => workout.date);

        // Si todos los sets de todos los ejercicios en todos los workouts están hechos, sumar el split
        return allWorkoutsDone ? totalDoneSplits + 1 : totalDoneSplits;
      }, 0) - 1
    );
  }

  public getRoutineProgressPercentage(): number {
    if (!this.tableInUse || !this.tableInUse.splits.length) return 0;
    return Math.round(
      (this.countDoneSplits() / this.tableInUse.splits.length) * 100,
    );
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

  public openSearchTables(isOwn?: boolean): void {
    this.navigationService.goToSearchTables(isOwn);
  }

  public async goToStatistics(): Promise<void> {
    if (!this.shouldRequireAdPrompt()) {
      this.navigationService.goToStatistics();
      return;
    }

    const alertOptions: AlertOptions = {
      header: "Estadísticas Premium",
      message:
        "Mira un breve anuncio para desbloquear el acceso a tus estadísticas detalladas.",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "alert-button-primary",
        },
        {
          text: "Ver Anuncio",
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

    return !Boolean(this.user?.premium?.entitled);
  }

  // Nuevos métodos para la interfaz móvil
  public backgroundClass: string = "light-theme";
  public theme: Theme;

  private initTheme(): void {
    this.themeService.theme.subscribe((theme: string) => {
      this.theme = theme as Theme;
      this.backgroundClass = theme === "dark" ? "dark-theme" : "light-theme";
    });
  }

  public getWorkoutProgress(): number {
    if (!this.workout || !this.workout.exercises.length) return 0;

    const completedExercises = this.workout.exercises.filter((exercise) =>
      this.isCustomExerciseCompleted(exercise),
    ).length;

    return (completedExercises / this.workout.exercises.length) * 100;
  }

  public getEstimatedTime(): number {
    if (!this.workout || !this.workout.exercises.length) return 0;

    // Estimación: 3-4 minutos por serie + tiempo de descanso
    const totalSets = this.getWorkoutSets();
    return Math.round(totalSets * 3.5);
  }

  public getCompletedExercises(): number {
    if (!this.workout || !this.workout.exercises.length) return 0;

    return this.workout.exercises.filter((exercise) =>
      this.isCustomExerciseCompleted(exercise),
    ).length;
  }

  public getEstimatedCalories(): number {
    if (!this.workout || !this.workout.exercises.length) return 0;

    // Estimación: 8-12 calorías por minuto de entrenamiento
    const estimatedTime = this.getEstimatedTime();
    return Math.round(estimatedTime * 10);
  }

  public getCompletedSets(): number {
    if (!this.workout) return 0;
    return this.workout.exercises.reduce((count, exercise) => {
      return count + exercise.sets.filter((set) => set.doned).length;
    }, 0);
  }

  public getTotalSets(): number {
    if (!this.workout) return 0;
    return this.workout.exercises.reduce((count, exercise) => {
      return count + exercise.sets.length;
    }, 0);
  }

  public handleWorkoutSectionClick(): void {
    // Solo hacer scroll si no hay workout en uso
    if (this.user.workoutInUse) {
      this.ionicUtilService.scrollToBottom(this.ionContent);
    }
  }

  public async showExerciseNoteAlert(exercise: CustomExercise): Promise<void> {
    const alertOptions: AlertOptions = {
      header: exercise.exercise.name,
      message: exercise.notes,
      buttons: ["CONFIRMAR"],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  public get isPremiumActive(): boolean {
    return Boolean(this.user?.premium?.entitled);
  }

  public goToPremium(): void {
    this.navigationService.goToPremium();
  }
}
