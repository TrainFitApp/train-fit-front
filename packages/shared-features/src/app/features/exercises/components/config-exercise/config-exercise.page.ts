import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import {
  AlertButton,
  AlertInput,
  AlertOptions,
  ItemReorderEventDetail,
  ModalController,
  ModalOptions,
  Platform,
  ToastController,
  ToastOptions,
} from "@ionic/angular";
import { Subscription, lastValueFrom } from "rxjs";
import { CustomExercise } from "src/app/core/models/customExercise";
import { Exercise } from "src/app/core/models/exercise";
import { Set as ExerciseSet } from "src/app/core/models/set";
import { Split } from "src/app/core/models/split";
import { Table } from "src/app/core/models/table";
import { User } from "src/app/core/models/user";
import { Workout } from "src/app/core/models/workout";
import { CustomExerciseService } from "src/app/core/services/custom-exercise/custom-exercise.service";
import { SetService } from "src/app/core/services/set/set.service";
import { TableService } from "src/app/core/services/table/table.service";
import { UserService } from "src/app/core/services/user/user.service";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { UtilService } from "src/app/core/services/util/util.service";
import { WorkoutService } from "src/app/core/services/workout/workout.service";
import { ManageSetComponent } from "src/app/features/tables/components/summary/components/manage-set/manage-set.component";
import { AdMobService } from "src/app/core/services/util/ad-mob.service";
import { BillingService } from "src/app/core/services/billing/billing.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";
import { ExerciseService } from "src/app/core/services/exercise/exercise.service";
import { SearchExercisesPage } from "src/app/shared/components/search-exercises/search-exercises.page";
import { SearchFilterGroupExercises } from "src/app/shared/models/filterGroup";
import { FilterInputPage } from "src/app/shared/components/filter-input/filter-input.page";
import { PinnedExerciseNoteService } from "src/app/core/services/pinned-exercise-note/pinned-exercise-note.service";
import { PinnedExerciseNote, PinnedExerciseNoteUpsertDto } from "src/app/core/models/pinned-exercise-note";
import { splitTextIntoSteps } from "src/app/shared/utils";
import { EXERCISE_DESCRIPTIONS_ES_EN } from "src/app/shared/constants/db-translations/exercise-descriptions-es-en.map";

@Component({
  selector: "app-config-exercise",
  templateUrl: "./config-exercise.page.html",
  styleUrls: ["./config-exercise.page.scss"],
})
export class ConfigExercisePage implements OnInit, OnDestroy {
  public muscleGroups: string[] = [
    "Espalda",
    "Pecho",
    "Pierna",
    "Hombros",
    "Brazos",
    "Abdominales",
  ];

  public tableInUse: Table;
  public form: FormGroup;
  public exercise: Exercise;
  public videoUrl: string;
  public exercises: Exercise[] = [];
  public workout: Workout;
  public workoutIndex: number;
  public user: User;
  public notes: string;
  public details: SearchFilterGroupExercises = new SearchFilterGroupExercises();

  public noteToCreate: boolean;
  public setList: ExerciseSet[] = [];
  public setsToCreate: ExerciseSet[] = [];
  public setsToUpdate: ExerciseSet[] = [];
  public setsToDelete: string[] = [];
  private initialDisplayOrderMap: Map<string, number> = new Map();
  private nextDisplayOrder: number = 1;
  private hasInitializedDisplayOrder: boolean = false;
  public idCounter: number = 0;

  public customExercise: CustomExercise;
  public currentSplit: Split;
  public pendingPinNoteText: string | null = null;
  public splitIndex: number;

  public setForm: FormGroup;

  public currentSet: ExerciseSet;

  public originSetsOrdered: ExerciseSet[] = [];

  public exerciseArchived: boolean;
  public isArchiving: boolean;

  public isExerciseFavorited: boolean = false;
  public isFavoritingExercise: boolean = false;

  public backButton$: Subscription;

  public load = true;
  // Track exercise change to allow revert on "DESCARTAR"
  public originalExercise?: Exercise;
  public exerciseChanged: boolean = false;
  public videoEmbedSrcSafe: any;

  public isCreateMode: boolean;
  public exerciseMode: "fuerza" | "cardio" | "isometrico" = "fuerza";
  public isEditingOwnExercise: boolean = false;

  public showFilters: boolean = true;
  public isOwnExercise: boolean = false;

  private originalNotes: string;
  private originalExerciseMode: "fuerza" | "cardio" | "isometrico" = "fuerza";
  private originalDetails: {
    category: string[];
    muscleGroups1: string[];
    muscleGroups2: string[];
    equipment: string[];
  };

  public pinnedNote: PinnedExerciseNote | null = null;
  private pinnedNoteCacheSub: Subscription | null = null;

  public get exerciseIndex(): number {
    if (!this.workout?.exercises || !this.customExercise?._id) return -1;
    return this.workout.exercises.findIndex((e) => e._id === this.customExercise._id);
  }

  public get isCurrentExerciseCardio(): boolean {
    const ex = this.customExercise?.exercise || this.exercise;
    return !!ex?.isCardio;
  }

  public get isCurrentExerciseIsometric(): boolean {
    const ex = this.customExercise?.exercise || this.exercise;
    return !!ex?.isIsometric;
  }

  public filterCategories = [
    "Cardio",
    "Empujes",
    "Tirón",
    "Tirón horizontal",
    "Tirón vertical",
    "Cadena posterior",
    "Cadena anterior",
    "Tren inferior",
    "Torso/Tren superior",
  ];

  public getExerciseDescriptionSteps(): string[] {
    return splitTextIntoSteps(this.getTranslatedExerciseDescription());
  }

  public descriptionSteps: string[] = [];
  public readonly maxDescriptionSteps = 20;
  public readonly maxStepLength = 300;
  public showDescriptionDetails = false;

  @ViewChildren("stepTextarea") private stepTextareaRefs: QueryList<any>;

  public trackByIndex(index: number): number {
    return index;
  }

  public addDescriptionStep(): void {
    if (this.descriptionSteps.length >= this.maxDescriptionSteps) return;

    this.descriptionSteps.push("");
    this.syncDescriptionFormFromSteps();
    setTimeout(() => this.stepTextareaRefs?.last?.setFocus(), 0);
  }

  public removeDescriptionStep(index: number): void {
    this.descriptionSteps.splice(index, 1);
    this.syncDescriptionFormFromSteps();
  }

  public onDescriptionStepChange(index: number, value: string): void {
    this.descriptionSteps[index] = (value ?? "").slice(0, this.maxStepLength);
    this.syncDescriptionFormFromSteps();
  }

  private syncDescriptionStepsFromForm(): void {
    this.descriptionSteps = splitTextIntoSteps(this.form?.get("description")?.value);
  }

  private syncDescriptionFormFromSteps(): void {
    this.form?.get("description")?.setValue(this.descriptionSteps.join("\n"));
    this.form?.get("description")?.markAsDirty();
  }

  private getTranslatedExerciseDescription(): string {
    const targetExercise = this.exercise ?? this.customExercise?.exercise;
    if (!targetExercise) return "";

    const currentLang = this.translate.currentLang || "es";
    if (currentLang === "en") {
      const translated = EXERCISE_DESCRIPTIONS_ES_EN[targetExercise.name];
      if (translated) return translated;
    }

    return targetExercise.description || "";
  }

  public filterMuscleGroup1: string[] = [
    "Brazos",
    "Bíceps",
    "Tríceps",
    "Antebrazo",
    "Hombro",
    "Deltoides anterior",
    "Deltoides lateral",
    "Deltoides posterior",
    "Pectoral",
    "Pectoral superior",
    "Pectoral inferior",
    "Abdomen",
    "Cuello",
    "Espalda",
    "Espalda alta",
    "Espalda baja",
    "Piernas",
    "Cuádriceps",
    "Aductor",
    "Femoral",
    "Glúteo",
    "Gemelo",
    "Sóleo",
  ];

  public filterEquipment: string[] = [
    "Barra",
    "Mancuernas",
    "Polea",
    "Peso corporal",
    "Kettlebell",
    "Máquina",
    "Máquina smith/multipower",
    "Disco",
    "Banda elástica",
  ];

  private _idExerciseToAdd: string;
  private selectedExerciseToAdd?: Exercise;

  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private customExerciseService: CustomExerciseService,
    private workoutService: WorkoutService,
    private setService: SetService,
    private tableService: TableService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private exerciseService: ExerciseService,
    private userService: UserService,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private adMobService: AdMobService,
    private billingService: BillingService,
    private navigationService: NavigationService,
    private translate: TranslateService,
    private pinnedExerciseNoteService: PinnedExerciseNoteService
  ) {}

  public ngOnInit(): void {
    if (!this.user) {
      this.user = this.userService.getLocalUser;
    }
    this.isCreateMode = !this.customExercise && !this.exercise;
    this.initForm();
    this.isExerciseArchived();
    this.checkIfExerciseIsFavorited();

    const currentExerciseObj = this.exercise || this.customExercise?.exercise;
    if (currentExerciseObj?.userId === this.user?._id) {
      this.isOwnExercise = true;
    }

    // Establish video URL safely based on available inputs
    if (this.exercise) {
      this.videoUrl = this.exercise.videoUrl;
    } else if (this.customExercise && this.customExercise.exercise) {
      this.videoUrl = this.customExercise.exercise.videoUrl;
    } else {
      this.videoUrl = "";
    }
    this.updateVideoEmbedSrc();

    // Initialize details from current exercise
    const baseExercise = this.exercise || this.customExercise?.exercise;
    if (baseExercise) {
      this.exerciseMode = baseExercise.isIsometric
        ? "isometrico"
        : baseExercise.isCardio
        ? "cardio"
        : "fuerza";
      this.originalExerciseMode = this.exerciseMode;
      this.syncDetailsFromExercise(baseExercise);

      // Store original state for change detection
      this.originalNotes = this.notes;
      this.originalDetails = {
        category: [...this.details.category],
        muscleGroups1: [...this.details.muscleGroups1],
        muscleGroups2: [...this.details.muscleGroups2],
        equipment: [...this.details.equipment],
      };
    }
    this.loadPinnedNote();
    this.pinnedNoteCacheSub = this.pinnedExerciseNoteService.cache$.subscribe(() => {
      this.loadPinnedNote();
    });
  }

  public ngOnDestroy(): void {
    this.pinnedNoteCacheSub?.unsubscribe();
    this.pendingPinNoteText = null;
  }

  private syncDetailsFromExercise(exercise: Exercise): void {
    this.details.category = Array.isArray(exercise.category)
      ? [...exercise.category]
      : exercise.category
      ? [exercise.category]
      : [];
    this.details.muscleGroups1 = [...(exercise.muscleGroups1 || [])];
    this.details.muscleGroups2 = [...(exercise.muscleGroups2 || [])];
    this.details.equipment = [...(exercise.equipment || [])];
  }

  private loadPinnedNote(): void {
    if (this.tableInUse?._id && this.workout?._id && this.workoutIndex !== undefined && this.customExercise) {
      const exerciseIndex = this.workout.exercises.findIndex(e => e._id === this.customExercise._id);
      this.pinnedExerciseNoteService
        .getByPosition(this.tableInUse._id, this.workoutIndex, exerciseIndex)
        .subscribe((note) => {
          this.pinnedNote = note;
        });
    }
  }

  public cancelPendingPin(): void {
    this.pendingPinNoteText = null;
  }

  public editPendingPin(): void {
    const alertInputs: AlertInput[] = [
      {
        name: "notes",
        type: "textarea",
        value: this.pendingPinNoteText,
        placeholder: this.translate.instant("EXERCISE_CONFIG.YOUR_NOTES"),
        attributes: { maxlength: 500 },
      },
    ];

    const alertOptions: AlertOptions = {
      header: this.translate.instant("NOTES.TITLE"),
      inputs: alertInputs,
      buttons: [
        {
          text: this.translate.instant("COMMON.CANCEL"),
          role: "cancel",
        },
        {
          text: this.translate.instant("COMMON.CONFIRM"),
          handler: (res) => {
            const notesText = (res.notes || '').trim();
            this.pendingPinNoteText = notesText || null;
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public deletePinnedNote(): void {
    if (!this.pinnedNote) return;
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
            this.pinnedExerciseNoteService.delete(this.pinnedNote._id, this.tableInUse._id).subscribe({
              next: () => {
                this.pinnedNote = null;
                console.debug('[ConfigExercisePage] Pinned note deleted');
              },
              error: (err) => console.error('[ConfigExercisePage] Failed to delete pinned note', err),
            });
            return true;
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public editPinnedNote(): void {
    if (!this.pinnedNote) return;

    const alertOptions: AlertOptions = {
      header: this.translate.instant('NOTES.TITLE'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          value: this.pinnedNote.notes,
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
            const exerciseIdx = this.exerciseIndex;
            if (exerciseIdx < 0) return false;
            const dto: PinnedExerciseNoteUpsertDto = {
              tableId: this.tableInUse._id,
              workoutIndex: this.workoutIndex,
              exerciseIndex: exerciseIdx,
              notes: newNotes,
            };
            this.pinnedExerciseNoteService.upsert(dto).subscribe({
              next: (updated) => {
                this.pinnedNote = updated;
                console.debug('[ConfigExercisePage] Pinned note updated');
              },
              error: (err) => console.error('[ConfigExercisePage] Failed to update pinned note', err),
            });
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public ionViewDidEnter(): void {
    console.log(this._idExerciseToAdd);
  }

  private parseYouTubeIdFromUrl(url: string): string {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.split("v=")[1]?.split("&")[0] || "";
    }
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1]?.split("?")[0] || "";
    }
    if (url.includes("youtube.com/embed/")) {
      return url.split("embed/")[1]?.split("?")[0] || "";
    }
    return "";
  }

  private updateVideoEmbedSrc(): void {
    const id = this.parseYouTubeIdFromUrl(this.videoUrl);
    if (!id) {
      this.videoEmbedSrcSafe = null;
      return;
    }
    const proxyUrl = `https://trainfit.net/youtube-embed.html?v=${id}`;
    this.videoEmbedSrcSafe =
      this.sanitizer.bypassSecurityTrustResourceUrl(proxyUrl);
  }

  public ionViewWillEnter(): void {
    this.initializeBackButtonCustomHandler();
    this.utilService.initFakeModalState();
  }

  public ionViewWillLeave(): void {
    this.backButton$?.unsubscribe();
    this.utilService.endFakeModalState();
  }

  public initForm(): void {
    // Reset display order tracking for this session
    this.initialDisplayOrderMap = new Map();
    this.nextDisplayOrder = 1;
    this.hasInitializedDisplayOrder = false;

    let exerciseConfig = new CustomExercise();
    // Viene de buscar ejercicios
    if (this.exercise) {
      exerciseConfig.sets = [];
      exerciseConfig.exercise = this.exercise;
      this.originSetsOrdered = [];
    }
    // Viene para editar
    else if (this.customExercise) {
      exerciseConfig = this.customExercise;
      this.notes = this.customExercise.notes;
      this.originSetsOrdered = this.cloneSets(this.customExercise.sets);
      this.setList = this.cloneSets(this.customExercise.sets);
      this.initDisplayOrderFromInitialList();
      // Guardar ejercicio original para posibles reversiones
      this.originalExercise = this.customExercise.exercise;
    }
    // Modo creación: sin ejercicio ni customExercise
    else {
      exerciseConfig.sets = [];
      exerciseConfig.exercise = {
        _id: undefined,
        name: "",
        description: "",
        videoUrl: "",
        muscleGroups1: [],
        muscleGroups2: [],
        category: [],
        equipment: [],
        gifUrl: "",
        isCardio: false,
        isIsometric: false,
        userId: this.user?._id,
      } as Exercise;
      this.exercise = exerciseConfig.exercise;
      this.originSetsOrdered = [];
    }

    this.form = new FormGroup({
      name: new FormControl(
        exerciseConfig.exercise.name,
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ),
      description: new FormControl(exerciseConfig.exercise.description || ""),
    });

    this.syncDescriptionStepsFromForm();
  }

  private isExerciseArchived(): void {
    const idExercise = this.exercise
      ? this.exercise._id
      : this.customExercise.exercise._id;

    this.exerciseArchived = this.user.archivedExercises.includes(idExercise);
    this.isArchiving = false;
  }

  private checkIfExerciseIsFavorited(): void {
    const idExercise = this.exercise
      ? this.exercise._id
      : this.customExercise?.exercise?._id;

    if (idExercise && this.user) {
      this.isExerciseFavorited =
        this.user.archivedExercises.includes(idExercise);
    }
    this.isFavoritingExercise = false;
  }

  public changeExercise(): void {
    const baseExercise = this.customExercise?.exercise || this.exercise;
    const currentIsCardio =
      this.exerciseMode === "cardio" || !!baseExercise?.isCardio;
    const currentIsIsometric =
      this.exerciseMode === "isometrico" || !!baseExercise?.isIsometric;

    const modalOptions: ModalOptions = {
      component: SearchExercisesPage,
      componentProps: {
        isChangeMode: true,
        sourceIsCardio: currentIsCardio,
        sourceIsIsometric: currentIsIsometric,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) {
        const sameType =
          currentIsCardio === !!res.data.isCardio &&
          currentIsIsometric === !!res.data.isIsometric;

        if (!sameType) {
          const alertOptions: AlertOptions = {
            header: this.translate.instant("EXERCISE_CONFIG.WARNING"),
            message: this.translate.instant("EXERCISE_CONFIG.CANT_SWAP_CARDIO_STRENGTH"),
            buttons: [
              {
                text: this.translate.instant("COMMON.CONFIRM"),
                role: "destructive",
              },
            ],
          };
          this.ionicUtilService.showAlert(alertOptions);
          return;
        }

        this.selectNewExercise(res.data);
      }
    });
  }

  public toggleOwnExerciseEditMode(): void {
    if (!this.isOwnExercise || this.isCreateMode) {
      return;
    }

    // ENTRANDO al modo edición
    if (!this.isEditingOwnExercise) {
      this.isEditingOwnExercise = true;
      this.showFilters = true;
    }
    // SALIENDO del modo edición
    else {
      if (this.hasExerciseChanges()) {
        const alertOptions: AlertOptions = {
          header: this.translate.instant("EXERCISE_CONFIG.UNSAVED_CHANGES"),
          message: this.translate.instant("EXERCISE_CONFIG.LEAVE_EDIT_MODE_WARNING"),
          cssClass: "alert-grid-buttons",
          buttons: [
            {
              text: this.translate.instant("COMMON.CANCEL"),
              role: "cancel",
            },
            {
              text: this.translate.instant("ACTIONS.DISCARD"),
              role: "confirm",
              cssClass: "alert-button-primary",
              handler: () => {
                this.revertExerciseChanges();
                this.isEditingOwnExercise = false;
              },
            },
          ],
        };
        this.ionicUtilService.showAlert(alertOptions);
      } else {
        this.isEditingOwnExercise = false;
      }
    }
  }

  private hasExerciseChanges(): boolean {
    return (
      (this.form && this.form.dirty) ||
      this.areDetailsChanged() ||
      this.isExerciseModeChanged()
    );
  }

  private hasSetsChanges(): boolean {
    return (
      this.setsToCreate.length > 0 ||
      this.setsToUpdate.length > 0 ||
      this.setsToDelete.length > 0
    );
  }

  private hasCustomExerciseChanges(): boolean {
    return (
      this.notes !== this.originalNotes ||
      this.hasSetsChanges() ||
      this.exerciseChanged
    );
  }

  private revertExerciseChanges(): void {
    const baseExercise =
      this.originalExercise || this.exercise || this.customExercise?.exercise;
    if (!baseExercise) return;

    this.form?.patchValue({
      name: baseExercise.name,
      description: baseExercise.description || "",
    });
    this.form?.markAsPristine();
    this.syncDescriptionStepsFromForm();

    if (this.originalDetails) {
      this.details.category = [...this.originalDetails.category];
      this.details.muscleGroups1 = [...this.originalDetails.muscleGroups1];
      this.details.muscleGroups2 = [...this.originalDetails.muscleGroups2];
      this.details.equipment = [...this.originalDetails.equipment];
    }

    this.applyExerciseMode(this.originalExerciseMode);

    this.videoUrl = baseExercise.videoUrl || "";
    this.updateVideoEmbedSrc();
    this.exerciseChanged = false;
  }

  public async saveOwnExerciseOnly(): Promise<void> {
    if (!this.isEditingOwnExercise || this.form?.invalid) {
      return;
    }

    const currentExercise =
      this._idExerciseToAdd && this.selectedExerciseToAdd
        ? this.selectedExerciseToAdd
        : this.customExercise?.exercise || this.exercise;
    if (!currentExercise?._id) {
      return;
    }

    this.load = false;
    const payload: Partial<Exercise> = {
      name: this.form.get("name")?.value?.trim() || currentExercise.name,
      description:
        this.form.get("description")?.value?.trim() ||
        currentExercise.description ||
        "",
      videoUrl: this.videoUrl || currentExercise.videoUrl || "",
      category: this.details.category?.length
        ? this.details.category
        : Array.isArray(currentExercise.category)
        ? currentExercise.category
        : currentExercise.category
        ? [currentExercise.category]
        : [],
      muscleGroups1: this.details.muscleGroups1?.length
        ? this.details.muscleGroups1
        : currentExercise.muscleGroups1 || [],
      muscleGroups2: this.details.muscleGroups2?.length
        ? this.details.muscleGroups2
        : currentExercise.muscleGroups2 || [],
      equipment: this.details.equipment?.length
        ? this.details.equipment
        : currentExercise.equipment || [],
      userId: currentExercise.userId || this.user?._id,
    };

    payload.isCardio = this.exerciseMode === "cardio";
    payload.isIsometric = this.exerciseMode === "isometrico";

    try {
      const updatedExercise = await lastValueFrom(
        this.exerciseService.updateExercise(currentExercise._id, payload),
      );

      const mergedExercise: Exercise = {
        ...currentExercise,
        ...(payload as Exercise),
        ...(updatedExercise || {}),
      };

      if (this.customExercise?.exercise) {
        this.customExercise.exercise = {
          ...this.customExercise.exercise,
          ...mergedExercise,
        };
      }

      if (this.exercise) {
        this.exercise = {
          ...this.exercise,
          ...mergedExercise,
        };
      }

      if (this._idExerciseToAdd && this.selectedExerciseToAdd) {
        this.selectedExerciseToAdd = {
          ...this.selectedExerciseToAdd,
          ...mergedExercise,
        };
      }

      // Propagar mergedExercise a todos los customExercises de la tabla local
      const tableInUse = this.tableService.tableInUse;
      if (tableInUse && mergedExercise._id) {
        tableInUse.splits?.forEach((splitTemp) => {
          splitTemp.workouts?.forEach((workoutTemp) => {
            workoutTemp.exercises?.forEach((ceTemp) => {
              const ceExId = (ceTemp.exercise as any)?._id;
              if (ceExId?.toString() === mergedExercise._id.toString()) {
                ceTemp.exercise = { ...mergedExercise };
              }
            });
          });
        });
        this.tableService.setCurrentTable = tableInUse;
      }

      this.form.patchValue({
        name: mergedExercise.name || "",
        description: mergedExercise.description || "",
      });

      this.details.category = Array.isArray(mergedExercise.category)
        ? mergedExercise.category
        : mergedExercise.category
        ? [mergedExercise.category]
        : [];
      this.details.muscleGroups1 = mergedExercise.muscleGroups1 || [];
      this.details.muscleGroups2 = mergedExercise.muscleGroups2 || [];
      this.details.equipment = mergedExercise.equipment || [];

      this.isEditingOwnExercise = false;
      const toastOptions: ToastOptions = {
        message: this.translate.instant("EXERCISE_CONFIG.EXERCISE_UPDATED"),
        duration: 1800,
      };
      this.ionicUtilService.showToast(toastOptions);
    } finally {
      this.load = true;
    }
  }

  private selectNewExercise(exercise: Exercise): void {
    this._idExerciseToAdd = exercise._id;
    this.selectedExerciseToAdd = { ...exercise };

    // Actualizar datos visuales y de estado
    this.videoUrl = exercise.videoUrl;
    this.updateVideoEmbedSrc();

    // Actualizar formulario con los datos del nuevo ejercicio
    this.form?.patchValue({
      name: exercise.name,
      description: exercise.description || "",
    });

    // Sincronizar detalles (músculos, categorías, equipamiento)
    this.syncDetailsFromExercise(exercise);

    // Sincronizar el modo (fuerza/cardio/isometrico)
    this.exerciseMode = exercise.isIsometric
      ? "isometrico"
      : exercise.isCardio
      ? "cardio"
      : "fuerza";

    // Recalcular propiedad y modo edición
    this.isOwnExercise = exercise?.userId === this.user?._id;
    if (!this.isOwnExercise) {
      this.isEditingOwnExercise = false;
    }

    // Actualizar el objeto de ejercicio local
    // Esto es CRÍTICO para que la lógica de guardado detecte que el ejercicio ya tiene ID
    // y no intente crearlo como uno nuevo (evitando la "copia" de campos errónea)
    this.exercise = { ...exercise };
    if (this.customExercise) {
      this.customExercise.exercise = { ...exercise };
    }

    this.exerciseChanged = true;
  }

  public configSets(set?: ExerciseSet): void {
    const modalOptions: ModalOptions = {
      component: ManageSetComponent,
      componentProps: {
        set: set,
        isCardio: this.isCurrentExerciseCardio,
        isIsometric: this.isCurrentExerciseIsometric,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      // Se ha configurado serie
      if (res.data) {
        const setConfig: ExerciseSet = res.data;
        // Añadir nueva serie
        const indexSet = this.setList.findIndex(
          (setTemp) => setTemp._id === setConfig._id,
        );

        if (indexSet < 0) {
          setConfig._id = --this.idCounter + "";
          setConfig.order = this.setList ? this.setList.length : 0;
          if ((setConfig as any).displayOrder == null) {
            (setConfig as any).displayOrder = this.nextDisplayOrder++;
          }
          this.setList.push(setConfig);
          this.setsToCreate.push(setConfig);
        }
        // Actualizar serie
        else {
          const existingDisplayOrder = (this.setList[indexSet] as any)
            ?.displayOrder;
          if ((setConfig as any).displayOrder == null) {
            (setConfig as any).displayOrder =
              existingDisplayOrder ?? this.getInitialDisplayOrder(setConfig);
          }
          this.setList[indexSet] = { ...setConfig };

          const indexCreateSet = this.setsToCreate.findIndex(
            (setTemp) => setTemp._id === setConfig._id,
          );
          if (indexCreateSet !== -1)
            this.setsToCreate[indexCreateSet] = { ...setConfig };

          const indexUpdateSet = this.setsToUpdate.findIndex(
            (setTemp) => setTemp._id === setConfig._id,
          );
          // REVISAR ELSE IF
          if (indexUpdateSet !== -1)
            this.setsToUpdate[indexUpdateSet] = { ...setConfig };
          else if (this.isPersistedSet(set)) this.setsToUpdate.push(setConfig);
        }

        this.normalizeSetOrder();
      }
    });
  }

  public copySet(set: ExerciseSet): void {
    const index = this.setList.findIndex((setTemp) => setTemp._id === set._id);
    if (index !== -1) {
      const setCopy = { ...set };
      setCopy._id = --this.idCounter + "";
      (setCopy as any).displayOrder = this.nextDisplayOrder++;
      this.setList.splice(index + 1, 0, setCopy);
      this.setsToCreate.push(setCopy);
      this.normalizeSetOrder();
    }
  }

  public async addCustomExercise(): Promise<void> {
    // Prevent saving without a valid name
    if (this.form?.invalid || !this.form?.get("name")?.value?.trim()) {
      await this.showInvalidExerciseFormAlert();
      return Promise.resolve();
    }

    if (this.isCreateMode) {
      if (await this.billingService.isFreshLimitReached("customExercises")) {
        await this.showExerciseLimitAlert();
        return;
      }
    }

    this.load = false;

    // In create mode, use addDataExerciseToWorkout which handles exercise creation
    if (this.isCreateMode && this.exercise && !this.exercise._id) {
      try {
        // Prepare sets
        this.setList.forEach((setTemp) => delete setTemp._id);
        const newSets = await this.setService
          .createSets(this.setList)
          .toPromise();

        // Prepare exercise data (backend will create it)
        const exerciseData = {
          name: this.form.get("name")?.value?.trim(),
          description: this.form.get("description")?.value?.trim() || "",
          videoUrl: this.videoUrl || "",
          muscleGroups1: this.details.muscleGroups1?.length
            ? this.details.muscleGroups1
            : this.exercise.muscleGroups1 || [],
          muscleGroups2: this.details.muscleGroups2?.length
            ? this.details.muscleGroups2
            : this.exercise.muscleGroups2 || [],
          category: this.details.category?.length
            ? this.details.category
            : Array.isArray(this.exercise.category)
            ? this.exercise.category
            : this.exercise.category
            ? [this.exercise.category]
            : [],
          equipment: this.details.equipment?.length
            ? this.details.equipment
            : this.exercise.equipment || [],
          keywords: [],
          userId: this.user._id,
        };

        if (this.exerciseMode === "cardio") {
          (exerciseData as any).isCardio = true;
        } else if (this.exerciseMode === "isometrico") {
          (exerciseData as any).isIsometric = true;
        }

        // Prepare dataExercise with embedded exercise
        const dataExerciseData = {
          notes: this.notes || null,
          sets: newSets.map((s) => s._id),
          exercise: exerciseData, // Backend will create this and replace with ID
        };

        // Add to workout - backend creates exercise first, then dataExercise
        const updatedWorkout = await this.workoutService
          .addDataExerciseToWorkout(this.workout._id, dataExerciseData)
          .toPromise();

        // Propagate to other splits at same workoutIndex (empty sets), like the else path
        const createdExercise =
          updatedWorkout.exercises[updatedWorkout.exercises.length - 1]
            ?.exercise;
        const otherPromises = [];
        if (createdExercise && this.tableInUse?.splits) {
          this.tableInUse.splits.forEach((splitTemp) => {
            splitTemp.workouts.forEach((workoutTemp, index) => {
              if (
                this.workoutIndex === index &&
                workoutTemp._id !== this.workout._id
              ) {
                const customExercise = new CustomExercise();
                customExercise.notes = this.notes;
                customExercise.exercise = createdExercise;
                customExercise.sets = [];
                otherPromises.push(
                  this.workoutService
                    .updateWorkout(workoutTemp, customExercise)
                    .toPromise(),
                );
              }
            });
          });
        }

        const otherWorkouts =
          otherPromises.length > 0 ? await Promise.all(otherPromises) : [];

        if (this.pendingPinNoteText && this.tableInUse?._id && this.workoutIndex !== undefined) {
          const exerciseIdx = updatedWorkout.exercises.length - 1;
          if (exerciseIdx >= 0) {
            this.pinnedExerciseNoteService.upsert({
              tableId: this.tableInUse._id,
              workoutIndex: this.workoutIndex,
              exerciseIndex: exerciseIdx,
              notes: this.pendingPinNoteText,
            }).subscribe();
          }
          this.pendingPinNoteText = null;
        }

        void this.billingService.refreshBackendEntitlements();
        this.adMobService.interstitial("create_exercise"); // Estrategia AdMob
        this.modalController.dismiss([updatedWorkout, ...otherWorkouts]);
        return Promise.resolve();
      } catch (error) {
        console.error("Error creating exercise:", error);
        if (this.handleExerciseLimitError(error)) {
          this.load = true;
          return Promise.resolve();
        }
        this.load = true;
        return Promise.reject(error);
      }
    }

    if (this.customExercise) {
      this.normalizeSetOrder();
      const newCustomExercise = { ...this.customExercise };
      newCustomExercise.sets = this.cloneSets(this.setList);
      newCustomExercise.notes = this.notes;

      if (
        this.isEditingOwnExercise &&
        newCustomExercise.exercise &&
        !this._idExerciseToAdd
      ) {
        newCustomExercise.exercise = {
          ...newCustomExercise.exercise,
          name:
            this.form.get("name")?.value?.trim() ||
            newCustomExercise.exercise.name,
          description:
            this.form.get("description")?.value?.trim() ||
            newCustomExercise.exercise.description ||
            "",
          category: this.details.category?.length
            ? this.details.category
            : Array.isArray(newCustomExercise.exercise.category)
            ? newCustomExercise.exercise.category
            : newCustomExercise.exercise.category
            ? [newCustomExercise.exercise.category]
            : [],
          muscleGroups1: this.details.muscleGroups1?.length
            ? this.details.muscleGroups1
            : newCustomExercise.exercise.muscleGroups1 || [],
          muscleGroups2: this.details.muscleGroups2?.length
            ? this.details.muscleGroups2
            : newCustomExercise.exercise.muscleGroups2 || [],
          equipment: this.details.equipment?.length
            ? this.details.equipment
            : newCustomExercise.exercise.equipment || [],
        };
      }

      // Guardar información sobre los cambios antes de enviar
      const setsCreatedCount = this.setsToCreate.length;
      const setsUpdatedCount = this.setsToUpdate.length;
      const setsDeletedCount = this.setsToDelete.length;

      return new Promise((resolve) => {
        this.customExerciseService
          .updateCustomExercise(
            newCustomExercise,
            this.setsToCreate,
            this.setsToUpdate,
            this.setsToDelete,
          )
          .subscribe((resCustomExercise) => {
            resCustomExercise.sets = this.sortSetsByOrder(
              resCustomExercise.sets || [],
            );
            this.customExercise = resCustomExercise;
            this.setList = this.cloneSets(resCustomExercise.sets || []);
            this.originSetsOrdered = this.cloneSets(
              resCustomExercise.sets || [],
            );
            this.setsToCreate = [];
            this.setsToUpdate = [];
            this.setsToDelete = [];

            const indexCustomExercise = this.workout.exercises.findIndex(
              (exerciseTemp) => exerciseTemp._id === this.customExercise._id,
            );
            if (indexCustomExercise >= 0) {
              this.workout.exercises[indexCustomExercise] =
                this.customExercise;
            }

            const tableInUse = this.tableInUse || this.tableService.tableInUse;
            const workoutInTable =
              tableInUse?.splits?.[this.splitIndex]?.workouts?.[
                this.workoutIndex
              ];
            const customExerciseId = this.customExercise._id?.toString();
            let indexCustomExerciseInTable =
              workoutInTable?.exercises?.findIndex(
                (exerciseTemp) =>
                  exerciseTemp._id?.toString() === customExerciseId,
              ) ?? -1;

            if (workoutInTable) {
              if (!workoutInTable.exercises) {
                workoutInTable.exercises = [];
              }

              if (indexCustomExerciseInTable >= 0) {
                workoutInTable.exercises[indexCustomExerciseInTable] =
                  this.customExercise;
              } else {
                workoutInTable.exercises.push(this.customExercise);
                indexCustomExerciseInTable =
                  workoutInTable.exercises.length - 1;
              }
            }

            // Si se editó el exercise propio, propagar el nombre/datos a todos los
            // customExercises de la tabla que referencien ese mismo exercise._id
            if (
              this.isEditingOwnExercise &&
              resCustomExercise.exercise &&
              tableInUse?.splits
            ) {
              const updatedExercise = resCustomExercise.exercise;
              const exerciseId = (updatedExercise as any)?._id;
              if (exerciseId) {
                tableInUse.splits.forEach((splitTemp) => {
                  splitTemp.workouts?.forEach((workoutTemp) => {
                    workoutTemp.exercises?.forEach((ceTemp) => {
                      const ceExId = (ceTemp.exercise as any)?._id;
                      if (ceExId?.toString() === exerciseId.toString()) {
                        ceTemp.exercise = updatedExercise;
                      }
                    });
                  });
                });
              }
            }

            // Pasar información sobre el tipo de cambio
            if (tableInUse) {
              this.tableInUse = tableInUse;
              this.tableService.setCurrentTable = tableInUse;
            }

            const changeInfo = {
              exerciseIndex:
                indexCustomExerciseInTable >= 0
                  ? indexCustomExerciseInTable
                  : indexCustomExercise,
              setsCreated: setsCreatedCount,
              setsUpdated: setsUpdatedCount,
              setsDeleted: setsDeletedCount,
              totalSets: resCustomExercise.sets?.length || 0,
              workoutIndex: this.workoutIndex,
              tableInUse: tableInUse, // Pasar la tabla actualizada
              exerciseChanged: this.exerciseChanged,
            };

            if (!this._idExerciseToAdd) {
              // Cerrar el modal con toda la información necesaria
              this.modalController.dismiss({ setChangeInfo: changeInfo });
              this.syncWorkoutInUseAfterExerciseChange();
              resolve();
            } else {
              // Ejecutar la actualización remota y solo resolver cuando termine
              this.updateChangeExercise()
                .then(() => {
                  // Actualizar la tabla en changeInfo con la tabla final del servicio
                  changeInfo.tableInUse = this.tableService.tableInUse;
                  this.modalController.dismiss({ setChangeInfo: changeInfo });
                  resolve();
                })
                .catch(() => {
                  // En caso de error fallback: cerrar modal y resolver
                  changeInfo.tableInUse = this.tableService.tableInUse;
                  this.modalController.dismiss({ setChangeInfo: changeInfo });
                  resolve();
                });
            }
          });
      });
    } else {
      this.setList.forEach((setTemp) => delete setTemp._id);
      let newSets = await this.setService.createSets(this.setList).toPromise();

      if (this.isEditingOwnExercise && this.exercise) {
        this.exercise = {
          ...this.exercise,
          name: this.form.get("name")?.value?.trim() || this.exercise.name,
          description:
            this.form.get("description")?.value?.trim() ||
            this.exercise.description ||
            "",
          category: this.details.category?.length
            ? this.details.category
            : Array.isArray(this.exercise.category)
            ? this.exercise.category
            : this.exercise.category
            ? [this.exercise.category]
            : [],
          muscleGroups1: this.details.muscleGroups1?.length
            ? this.details.muscleGroups1
            : this.exercise.muscleGroups1 || [],
          muscleGroups2: this.details.muscleGroups2?.length
            ? this.details.muscleGroups2
            : this.exercise.muscleGroups2 || [],
          equipment: this.details.equipment?.length
            ? this.details.equipment
            : this.exercise.equipment || [],
        };
      }

      let promises = [];
      this.tableInUse.splits.forEach((splitTemp) => {
        splitTemp.workouts.forEach((workoutTemp, index) => {
          if (this.workoutIndex === index) {
            let customExercise = new CustomExercise();
            customExercise.notes = this.notes;
            customExercise.exercise = this.exercise;

            if (workoutTemp._id === this.workout._id) {
              customExercise.sets = newSets;
            }

            promises.push(
              this.workoutService
                .updateWorkout(workoutTemp, customExercise)
                .toPromise(),
            );
          }
        });
      });

      if (promises.length > 0) {
        return Promise.all(promises).then((resWorkoutsUpdates: Workout[]) => {
          if (this.pendingPinNoteText && this.tableInUse?._id && this.workoutIndex !== undefined) {
            const updatedWorkout = resWorkoutsUpdates.find(w => w._id === this.workout._id);
            if (updatedWorkout?.exercises) {
              const exerciseIdx = updatedWorkout.exercises.length - 1;
              if (exerciseIdx >= 0) {
                this.pinnedExerciseNoteService.upsert({
                  tableId: this.tableInUse._id,
                  workoutIndex: this.workoutIndex,
                  exerciseIndex: exerciseIdx,
                  notes: this.pendingPinNoteText,
                }).subscribe();
              }
            }
            this.pendingPinNoteText = null;
          }

          return this.tableService
            .getTableById(this.user.tableInUse)
            .toPromise()
            .then((resTable) => {
              this.tableInUse = resTable;
              this.modalController.dismiss(resWorkoutsUpdates);
            });
        });
      } else {
        this.modalController.dismiss();
        return Promise.resolve();
      }
    }
  }

  public selectCategory(category: string): void {
    if (this.details.category.includes(category)) {
      const i = this.details.category.indexOf(category);
      this.details.category.splice(i, 1);
    } else {
      this.details.category.push(category);
    }
  }

  public selectMuscleGroup1(muscle: string): void {
    if (this.details.muscleGroups1.includes(muscle)) {
      const i = this.details.muscleGroups1.indexOf(muscle);
      this.details.muscleGroups1.splice(i, 1);
    } else {
      this.details.muscleGroups1.push(muscle);
    }
  }

  public selectMuscleGroup2(muscle: string): void {
    if (this.details.muscleGroups2.includes(muscle)) {
      const i = this.details.muscleGroups2.indexOf(muscle);
      this.details.muscleGroups2.splice(i, 1);
    } else {
      this.details.muscleGroups2.push(muscle);
    }
  }

  public selectEquipment(equipment: string): void {
    if (this.details.equipment.includes(equipment)) {
      const i = this.details.equipment.indexOf(equipment);
      this.details.equipment.splice(i, 1);
    } else {
      this.details.equipment.push(equipment);
    }
  }

  public toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  public async setExerciseMode(mode: any): Promise<void> {
    if (mode !== "fuerza" && mode !== "cardio" && mode !== "isometrico") {
      return;
    }

    if (mode === this.exerciseMode) {
      return;
    }

    if (this.setList?.length > 0) {
      const alertOptions: AlertOptions = {
        header: this.translate.instant("EXERCISE_CONFIG.CHANGE_EXERCISE_TYPE"),
        message: this.translate.instant("EXERCISE_CONFIG.SWITCH_MODE_WARNING"),
        buttons: [
          {
            text: this.translate.instant("COMMON.CANCEL"),
            role: "cancel",
          },
          {
            text: this.translate.instant("COMMON.CONFIRM"),
            role: "confirm",
            cssClass: "alert-button-primary",
          },
        ],
      };

      const result = await this.ionicUtilService.showAlert(alertOptions);
      if (result.role !== "confirm") {
        return;
      }

      this.clearSetsForModeChange();
    }

    this.applyExerciseMode(mode);
  }

  private applyExerciseMode(mode: "fuerza" | "cardio" | "isometrico"): void {
    this.exerciseMode = mode;
    const isCardio = mode === "cardio";
    const isIsometric = mode === "isometrico";

    if (this.exercise) {
      this.exercise.isCardio = isCardio;
      this.exercise.isIsometric = isIsometric;
    }

    if (this.customExercise?.exercise) {
      this.customExercise.exercise.isCardio = isCardio;
      this.customExercise.exercise.isIsometric = isIsometric;
    }
  }

  private clearSetsForModeChange(): void {
    this.setList.forEach((set) => {
      if (set?._id && isNaN(Number(set._id))) {
        if (!this.setsToDelete.includes(set._id)) {
          this.setsToDelete.push(set._id);
        }
      }
    });

    this.setList = [];
    this.setsToCreate = [];
    this.setsToUpdate = [];
  }

  public openDetailsModal(): void {
    const modalOptions: ModalOptions = {
      component: FilterInputPage,
      cssClass: "mini-modal",
      componentProps: {
        searchFilterGroupExercises: this.details,
        isCreateMode: this.isCreateMode,
      },
      animated: true,
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      const data = res?.data;
      if (data?.searchFilterGroupExercises) {
        this.details = data.searchFilterGroupExercises;
      }
    });
  }

  public removeDetailCategory(category: string): void {
    const i = this.details.category.indexOf(category);
    if (i >= 0) this.details.category.splice(i, 1);
  }

  public getValidDetails(array?: string[]): string[] {
    if (!array) return [];
    return array.filter((item) => item && item.trim().length > 0);
  }

  public removeDetailMuscle1(m: string): void {
    const i = this.details.muscleGroups1.indexOf(m);
    if (i >= 0) this.details.muscleGroups1.splice(i, 1);
  }

  public removeDetailMuscle2(m: string): void {
    const i = this.details.muscleGroups2.indexOf(m);
    if (i >= 0) this.details.muscleGroups2.splice(i, 1);
  }

  private handleExerciseLimitError(error: any): boolean {
    if (error?.error?.code !== "PREMIUM_LIMIT_EXERCISES") {
      return false;
    }

    void this.showExerciseLimitAlert();
    return true;
  }

  private async showExerciseLimitAlert(): Promise<void> {
    await this.ionicUtilService.showPremiumLimitAlert({
      message: this.translate.instant("EXERCISE_CONFIG.LIMIT_REACHED"),
      onUpgrade: () => this.navigationService.goToPremium(),
    });
  }

  private async showInvalidExerciseFormAlert(): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant("EXERCISE_CONFIG.INCOMPLETE_DATA"),
      message: this.translate.instant("EXERCISE_CONFIG.ENTER_NAME"),
      buttons: [
        {
          text: this.translate.instant("COMMON.OK"),
          role: "cancel",
        },
      ],
    });
  }

  private updateChangeExercise(): Promise<void> {
    if (!this._idExerciseToAdd) return Promise.resolve();
    this.load = false;
    return lastValueFrom(
      this.workoutService.updateCustomExercises(
        this.tableService.tableInUse._id,
        this.workout._id,
        this.customExercise._id,
        this._idExerciseToAdd,
      ),
    ).then((resTable) => {
      this.tableService.setCurrentTable = resTable;
      const toastOptions: ToastOptions = {
        message: this.translate.instant("EXERCISE_CONFIG.EXERCISE_REPLACED"),
        duration: 2000,
      };
      this.ionicUtilService.showToast(toastOptions);
      this.syncWorkoutInUseAfterExerciseChange();
    });
  }

  private syncWorkoutInUseAfterExerciseChange(): void {
    const updatedWorkout =
      this.tableService.tableInUse.splits[this.splitIndex].workouts[
        this.workoutIndex
      ];

    if (
      updatedWorkout &&
      this.workoutService.currentWorkout &&
      this.workoutService.currentWorkout._id === updatedWorkout._id
    ) {
      this.workoutService.setCurrentWorkout = updatedWorkout;
    }
  }

  public async addExerciseToLibrary(): Promise<void> {
    this.isArchiving = true;
    // TODO: En el futuro habrá que tener en cuenta ownExercises cuando
    // se puedan crear ejercicios propios
    const idExercise = this.exercise
      ? this.exercise._id
      : this.customExercise.exercise._id;

    this.exerciseService
      .archiveExercise(idExercise, this.user._id)
      .subscribe(() => {
        if (this.exerciseArchived)
          this.user.archivedExercises.splice(
            this.user.archivedExercises.findIndex(
              (archivedExercisesTemp) => archivedExercisesTemp === idExercise,
            ),
            1,
          );
        else this.user.archivedExercises.push(idExercise);

        this.userService.updateUser(this.user).subscribe((resUser) => {
          this.user = resUser;
          setTimeout(() => this.isExerciseArchived(), 1000);
        });
      });
    const toastOptions: ToastOptions = {
      message: this.exerciseArchived
        ? this.translate.instant("EXERCISE_CONFIG.FAVORITE_REMOVED")
        : this.translate.instant("EXERCISE_CONFIG.FAVORITE_ADDED"),
      duration: 2000,
    };
    this.ionicUtilService.showToast(toastOptions);
  }

  public deleteSet(set: ExerciseSet, setIndex: number) {
    this.setList.splice(setIndex, 1);

    if (this.isPersistedSet(set)) {
      if (set._id && !this.setsToDelete.includes(set._id)) {
        this.setsToDelete.push(set._id);
      }

      const indexSetToUpdate = this.setsToUpdate.findIndex(
        (setTemp) => setTemp._id === set._id,
      );
      if (indexSetToUpdate >= 0) {
        this.setsToUpdate.splice(indexSetToUpdate, 1);
      }
    } else {
      // Comprobar si existen en toCreate y toUpdate
      const indexSetToCreate = this.setsToCreate.findIndex(
        (setTemp) => setTemp._id === set._id,
      );
      if (this.setsToCreate.length > 0 && indexSetToCreate >= 0)
        this.setsToCreate.splice(indexSetToCreate, 1);

      const indexSetToUpdate = this.setsToUpdate.findIndex(
        (setTemp) => setTemp._id === set._id,
      );
      if (this.setsToUpdate.length > 0 && indexSetToUpdate >= 0)
        this.setsToUpdate.splice(indexSetToUpdate, 1);
    }

    this.normalizeSetOrder();
  }

  public getExerciseMuscleGroups(): string[] {
    let groups: string[] = [];
    if (this.exercise) {
      groups = this.exercise.muscleGroups1;
    } else if (this.customExercise) {
      groups = this.customExercise.exercise.muscleGroups1;
    }
    return (groups || []).filter((g) => g && g.trim().length > 0);
  }

  public onNotesUpdate(notes: string | undefined): void {
    this.notes = notes;
  }

  public manageNote(): void {
    const hasContext = !!(this.tableInUse?._id && this.workoutIndex !== undefined);

    let shouldPin = false;

    const confirmButtons: AlertButton[] = [
      {
        text: this.translate.instant("COMMON.CONFIRM"),
        handler: (res) => {
          shouldPin = false;
          this.noteToCreate = !!res.notes;
          this.notes = res.notes;
          return true;
        },
      },
      {
        text: this.translate.instant('NOTES.PIN_TO_POSITION'),
        cssClass: 'alert-button-pin',
        handler: (res) => {
          shouldPin = true;
          this.noteToCreate = !!res.notes;
          return true;
        },
      },
    ];

    const alertInputs: AlertInput[] = [
      {
        name: "notes",
        type: "textarea",
        value: this.notes,
        placeholder: this.translate.instant("EXERCISE_CONFIG.YOUR_NOTES"),
        attributes: { maxlength: 500 },
      },
    ];

    const alertOptions: AlertOptions = {
      header: this.translate.instant("EXERCISE_CONFIG.NOTES"),
      inputs: alertInputs,
      buttons: [
        {
          text: this.translate.instant("COMMON.CANCEL"),
          role: "cancel",
        },
        ...confirmButtons,
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then((res) => {
      if (shouldPin && hasContext) {
        const notesText = res.data?.values?.notes || '';

        if (this.isCreateMode || !this.customExercise) {
          this.pendingPinNoteText = notesText;
          this.notes = '';
          return;
        }

        const exerciseIdx = this.exerciseIndex;
        if (exerciseIdx >= 0) {
          const dto: PinnedExerciseNoteUpsertDto = {
            tableId: this.tableInUse._id,
            workoutIndex: this.workoutIndex,
            exerciseIndex: exerciseIdx,
            notes: notesText,
          };
          this.pinnedExerciseNoteService.upsert(dto).subscribe({
            next: (note) => {
              this.pinnedNote = note;
            },
            error: (err) => console.error('[ConfigExercisePage] Failed to save pinned note', err),
          });
        }
        return;
      }
      if (res.data) {
        this.notes = res.data.values.notes;
      }
    });
  }

  public deleteNotes(): void {
    this.notes = undefined;
  }

  public handleReorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    console.log("Dragged from index", ev.detail.from, "to", ev.detail.to);

    const element = this.setList[ev.detail.from];
    this.setList.splice(ev.detail.from, 1);
    this.setList.splice(ev.detail.to, 0, element);
    this.normalizeSetOrder();

    ev.detail.complete();
  }

  private initDisplayOrderFromInitialList(): void {
    if (this.hasInitializedDisplayOrder) {
      return;
    }

    this.setList.forEach((setItem, index) => {
      const key = this.getDisplayOrderKey(setItem, index);
      const displayOrder = index + 1;
      this.initialDisplayOrderMap.set(key, displayOrder);
      (setItem as any).displayOrder = displayOrder;
    });

    this.nextDisplayOrder = this.setList.length + 1;
    this.hasInitializedDisplayOrder = true;
  }

  private getInitialDisplayOrder(setItem: ExerciseSet): number {
    const key = this.getDisplayOrderKey(setItem);
    const stored = this.initialDisplayOrderMap.get(key);
    if (stored != null) {
      return stored;
    }

    const fallback = this.nextDisplayOrder++;
    this.initialDisplayOrderMap.set(key, fallback);
    return fallback;
  }

  private getDisplayOrderKey(setItem: ExerciseSet, index?: number): string {
    if (setItem?._id != null) {
      return String(setItem._id);
    }
    return `idx-${index ?? this.setList.indexOf(setItem)}`;
  }

  private normalizeSetOrder(): void {
    this.setList.forEach((setItem, index) => {
      setItem.order = index;

      if (this.isPersistedSet(setItem)) {
        this.upsertSetToUpdate(setItem);
      } else {
        const indexSetToCreate = this.setsToCreate.findIndex(
          (stuTemp) => stuTemp._id === setItem._id,
        );
        if (indexSetToCreate >= 0) {
          this.setsToCreate[indexSetToCreate] = { ...setItem };
        }
      }
    });
  }

  private cloneSet(setItem: ExerciseSet): ExerciseSet {
    return {
      ...setItem,
      expectedRir: setItem.expectedRir
        ? [...setItem.expectedRir]
        : setItem.expectedRir,
      expectedReps: setItem.expectedReps
        ? [...setItem.expectedReps]
        : setItem.expectedReps,
      restPauseSeries: setItem.restPauseSeries
        ? setItem.restPauseSeries.map((serie) => ({ ...serie }))
        : setItem.restPauseSeries,
      dropSetSeries: setItem.dropSetSeries
        ? setItem.dropSetSeries.map((serie) => ({ ...serie }))
        : setItem.dropSetSeries,
    };
  }

  private cloneSets(sets: ExerciseSet[] = []): ExerciseSet[] {
    return sets.map((setItem) => this.cloneSet(setItem));
  }

  private sortSetsByOrder(sets: ExerciseSet[] = []): ExerciseSet[] {
    return this.cloneSets(sets).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  private isPersistedSet(setItem?: ExerciseSet): boolean {
    return !!setItem?._id && isNaN(Number(setItem._id));
  }

  private upsertSetToUpdate(setItem: ExerciseSet): void {
    if (!this.isPersistedSet(setItem)) {
      return;
    }

    const indexSetToUpdate = this.setsToUpdate.findIndex(
      (stuTemp) => stuTemp._id === setItem._id,
    );
    const setToUpdate = this.cloneSet(setItem);

    if (indexSetToUpdate !== -1) {
      this.setsToUpdate[indexSetToUpdate] = setToUpdate;
    } else {
      this.setsToUpdate.push(setToUpdate);
    }
  }

  private hasChanges(): boolean {
    return this.hasExerciseChanges() || this.hasCustomExerciseChanges();
  }

  private isExerciseModeChanged(): boolean {
    return this.exerciseMode !== this.originalExerciseMode;
  }

  private areDetailsChanged(): boolean {
    if (!this.originalDetails) return false;

    const compareArrays = (a: string[], b: string[]) => {
      if (a.length !== b.length) return true;
      return a.some((val, index) => val !== b[index]);
    };

    return (
      compareArrays(this.details.category, this.originalDetails.category) ||
      compareArrays(
        this.details.muscleGroups1,
        this.originalDetails.muscleGroups1,
      ) ||
      compareArrays(
        this.details.muscleGroups2,
        this.originalDetails.muscleGroups2,
      ) ||
      compareArrays(this.details.equipment, this.originalDetails.equipment)
    );
  }

  private checkChanges(): void {
    if (this.hasChanges()) {
      const alertOptions: AlertOptions = {
        header: this.translate.instant("COMMON.UNSAVED_CHANGES"),
        message: this.translate.instant("COMMON.UNSAVED_CHANGES_SAVE"),
        cssClass: "alert-grid-buttons",
        buttons: [
          {
            text: this.translate.instant("COMMON.CANCEL"),
            role: "cancel",
          },
          {
            text: this.translate.instant("ACTIONS.DISCARD"),
            role: "destructive",
            handler: () => {
              // Revertir cambios locales si es necesario
              if (this.customExercise) {
                this.customExercise.sets = this.cloneSets(
                  this.originSetsOrdered,
                );
                this.setList = this.cloneSets(this.originSetsOrdered);
                this.setsToCreate = [];
                this.setsToUpdate = [];
                this.setsToDelete = [];
                this.customExercise.notes = this.originalNotes;
              }
              this.revertExerciseChanges();

              this.backButton$?.unsubscribe();
              this.modalController.dismiss();
            },
          },
          {
            text: this.translate.instant("COMMON.SAVE"),
            cssClass: "alert-button-confirm",
            handler: async () => {
              await this.saveFromHeaderBack();
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    } else {
      this.backButton$?.unsubscribe();
      this.modalController.dismiss();
    }
  }

  private async saveFromHeaderBack(): Promise<void> {
    const shouldSaveExercise =
      this.isEditingOwnExercise && this.hasExerciseChanges();
    const shouldCreateExercise =
      this.isCreateMode &&
      (this.hasExerciseChanges() || this.hasCustomExerciseChanges());
    const shouldSaveCustom =
      this.hasCustomExerciseChanges() || shouldCreateExercise;

    if (shouldSaveExercise) {
      await this.saveOwnExerciseOnly();
    }

    if (shouldSaveCustom) {
      await this.addCustomExercise();
      this.backButton$?.unsubscribe();
      return;
    }

    this.backButton$?.unsubscribe();
    this.modalController.dismiss();
  }

  private initializeBackButtonCustomHandler(): void {
    this.backButton$ = this.platform.backButton.subscribeWithPriority(
      9999,
      () => this.checkChanges(),
    );
  }

  public close(): void {
    this.checkChanges();
  }

  public addExerciseToFavorites(): void {
    if (!this.user || (!this.exercise && !this.customExercise)) {
      return;
    }

    const idExercise = this.exercise
      ? this.exercise._id
      : this.customExercise.exercise._id;

    if (!this.user.archivedExercises) {
      this.user.archivedExercises = [];
    }

    this.isFavoritingExercise = true;

    // Call API to persist changes
    this.exerciseService
      .addExerciseToFavorites(idExercise, this.user._id)
      .subscribe({
        next: (response: { isFavorite: boolean; message?: string }) => {
          const isFavorite = !!response?.isFavorite;
          const favoriteSet = new globalThis.Set<string>(
            this.user.archivedExercises,
          );

          if (isFavorite) {
            favoriteSet.add(idExercise);
          } else {
            favoriteSet.delete(idExercise);
          }

          this.user.archivedExercises = Array.from(favoriteSet);
          this.isExerciseFavorited = isFavorite;
          this.isFavoritingExercise = false;
        },
        error: (err) => {
          console.error("Error adding exercise to favorites:", err);
          this.isFavoritingExercise = false;
        },
      });
  }

  public async deleteOwnExercise() {
    const currentExerciseObj = this.exercise || this.customExercise?.exercise;

    if (!currentExerciseObj?._id) return;

    const impact = this.getExerciseDeleteImpact(currentExerciseObj._id);
    const impactLines: string[] = [
      this.translate.instant("EXERCISE_CONFIG.DELETE_IMPACT_1"),
      this.translate.instant("EXERCISE_CONFIG.DELETE_IMPACT_2"),
      this.translate.instant("EXERCISE_CONFIG.DELETE_IMPACT_3"),
    ];

    if (impact.occurrences > 0) {
      impactLines.push(
        this.translate.instant("EXERCISE_CONFIG.DELETE_IMPACT_COUNT", {
          occurrences: impact.occurrences,
          workouts: impact.workouts,
          splits: impact.splits,
        }),
      );
    }

    const alertOptions: any = {
      header: this.translate.instant("EXERCISE_CONFIG.DELETE_EXERCISE"),
      message: impactLines.join(" "),
      buttons: [
        {
          text: this.translate.instant("COMMON.CANCEL"),
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: this.translate.instant("ACTIONS.DELETE"),
          role: "destructive",
          handler: () => {
            this.exerciseService
              .deleteExercise(currentExerciseObj._id)
              .subscribe({
                next: () => {
                  if (this.user?.archivedExercises) {
                    this.user.archivedExercises =
                      this.user.archivedExercises.filter(
                        (id) => id !== currentExerciseObj._id,
                      );
                  }

                  const tableInUseRef =
                    this.tableInUse || this.tableService.tableInUse;

                  if (tableInUseRef?.splits) {
                    let shouldUpdateTable = false;
                    tableInUseRef.splits.forEach((s) => {
                      s.workouts.forEach((w: any) => {
                        if (w.exercises) {
                          const originalLength = w.exercises.length;
                          w.exercises = w.exercises.filter((ce: any) => {
                            const exerciseId =
                              typeof ce?.exercise === "string"
                                ? ce.exercise
                                : ce?.exercise?._id;

                            return exerciseId !== currentExerciseObj._id;
                          });
                          if (w.exercises.length !== originalLength) {
                            shouldUpdateTable = true;
                          }
                        }
                      });
                    });

                    if (shouldUpdateTable) {
                      this.tableInUse = tableInUseRef;
                      this.tableService.setCurrentTable = tableInUseRef;
                    }
                  }

                  this.ionicUtilService.showToast({
                    message: this.translate.instant("EXERCISE_CONFIG.DELETED"),
                    duration: 2000,
                  });
                  void this.billingService.refreshBackendEntitlements();

                  this.modalController.dismiss({
                    setChangeInfo: {
                      exerciseDeleted: true,
                      exerciseIndex:
                        this.workoutIndex !== undefined
                          ? this.workoutIndex
                          : null,
                      tableInUse: tableInUseRef,
                    },
                  });
                },
                error: () => {
                  this.ionicUtilService.showToast({
                    message: this.translate.instant("EXERCISE_CONFIG.DELETE_FAILED"),
                    duration: 2500,
                  });
                },
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private getExerciseDeleteImpact(exerciseId: string): {
    occurrences: number;
    workouts: number;
    splits: number;
  } {
    const splitIds = new globalThis.Set<string>();
    const workoutIds = new globalThis.Set<string>();
    let occurrences = 0;

    if (!this.tableInUse?.splits?.length) {
      return { occurrences: 0, workouts: 0, splits: 0 };
    }

    this.tableInUse.splits.forEach((split) => {
      let splitHasMatch = false;

      split.workouts?.forEach((workout) => {
        let workoutHasMatch = false;

        workout.exercises?.forEach((customExercise) => {
          if (customExercise?.exercise?._id === exerciseId) {
            occurrences += 1;
            workoutHasMatch = true;
            splitHasMatch = true;
          }
        });

        if (workoutHasMatch) {
          workoutIds.add(workout._id);
        }
      });

      if (splitHasMatch) {
        splitIds.add(split._id);
      }
    });

    return {
      occurrences,
      workouts: workoutIds.size,
      splits: splitIds.size,
    };
  }
}
