import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { ModalController, ModalOptions, AlertOptions, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DB_ES_EN_MAP } from 'src/app/shared/constants/db-translations/es-en-db.map';
// No importar IonSearchbar directamente para evitar errores en NgModules
import { CUSTOM_PRODUCT_VALUES } from 'src/app/core/models/customProduct';
import { Exercise } from 'src/app/core/models/exercise';
import { Split } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  ColorMode,
  ThemeService,
} from 'src/app/core/services/util/theme.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { FilterInputPage } from '../filter-input/filter-input.page';
import {
  SearchFilterGroup,
  SearchFilterGroupExercises,
} from '../../models/filterGroup';
import { Theme, THEMES } from '../../models/theme';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfigExercisePage } from 'src/app/features/exercises/components/config-exercise/config-exercise.page';
import { ACTIONS_FAB_TYPES } from '../../constants/actions-fab';

@Component({
  selector: 'app-search-exercises',
  templateUrl: './search-exercises.page.html',
  styleUrls: ['./search-exercises.page.scss'],
})
export class SearchExercisesPage implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar: any;

  @Input() user: User;
  @Input() workout: Workout;
  @Input() workoutIndex: number;
  @Input() splitIndex: number;
  @Input() currentSplit: Split;
  @Input() tableInUse: Table;
  @Input() isChangeMode: boolean;
  @Input() sourceIsCardio: boolean;
  @Input() sourceIsIsometric: boolean;

  // Planificador visual (Fase C) — por defecto, toggleExerciseSelection()
  // barre this.tableInUse.splits[*] para añadir/quitar el ejercicio en TODOS
  // los splits que tengan un workout en la misma posición (workoutIndex),
  // modelo viejo de "fila de workout compartida entre semanas". En
  // singleWorkoutMode opera SOLO sobre this.workout._id — cada card del
  // tablero es independiente. Comportamiento por defecto (false) sin
  // cambios, retrocompatible.
  @Input() singleWorkoutMode = false;

  // Plantillas de entrenamiento — elegir un ejercicio para un estado local
  // todavía sin guardar (el builder de plantillas no tiene un Workout/
  // tableInUse real hasta pulsar "Guardar"). A diferencia de isChangeMode
  // (pide confirmación de "sustitución", pensada para reemplazar un
  // ejercicio ya en curso), aquí se selecciona y se cierra sin más: no hay
  // nada que sustituir, solo añadir.
  @Input() pickerMode = false;

  // Biblioteca de ejercicios (TASK-042) — misma pantalla de picker
  // reutilizada como catálogo navegable de solo consulta: sin workout, sin
  // ConfigExercisePage. En 'library' el tap emite exerciseSelected en vez de
  // abrir/seleccionar, y el header/checkbox de picker se ocultan.
  @Input() mode: 'default' | 'library' = 'default';
  @Output() exerciseSelected = new EventEmitter<Exercise>();

  // TASK-021 (MASTER_BACKLOG.md) — hilo pasante hacia ConfigExercisePage
  // (ver showQuickSeriesGenerator ahí). Mismo criterio que singleWorkoutMode:
  // false por defecto, solo train-fit-trainers lo pone a true.
  @Input() showQuickSeriesGenerator = false;

  public exercises: Exercise[];
  public exercisesCount: number;
  public load: boolean;
  public theme: ColorMode;

  // pickerMode — selección múltiple: antes cada tap (tarjeta o checkbox)
  // cerraba el modal al instante con un solo ejercicio, así que marcar el
  // checkbox no dejaba elegir más de uno. Ahora se acumulan aquí y el
  // footer confirma con todos a la vez (ver confirmPickerSelection()).
  public pickerSelectedExercises: Exercise[] = [];

  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  public isFooterHidden: boolean = false;

  public searchFilterGroupExercises: SearchFilterGroupExercises;

  protected readonly GIF_LOCAL_ROUTE_LIGHT =
    '../../../../../assets/img/logo/login_light.svg';

  protected readonly GIF_LOCAL_ROUTE_DARK =
    '../../../../../assets/img/logo/login_dark.svg';

  public THEMES = THEMES;

  private keyboardWillShowHandle?: PluginListenerHandle;
  private keyboardWillHideHandle?: PluginListenerHandle;
  private keyboardDidShowHandle?: PluginListenerHandle;
  private keyboardDidHideHandle?: PluginListenerHandle;
  private visualViewportResizeHandler?: () => void;
  private baseViewportHeight?: number;

  getWorkoutNameTranslated(workout: Workout | null): string {
    const name = workout?.name || '';
    if (this.translate.currentLang === 'en') {
      return DB_ES_EN_MAP[name] || name;
    }
    return name;
  }

  constructor(
    public modalController: ModalController,
    private exerciseService: ExerciseService,
    private translate: TranslateService,
    private themeService: ThemeService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private userService: UserService,
    private platform: Platform,
    private customExerciseService: CustomExerciseService,
    private workoutService: WorkoutService,
    private tableService: TableService
  ) {
    this.themeService.theme.subscribe((res: Theme) => (this.theme = res));
  }

  public ngOnInit(): void {
    // Inputs from Ionic modal are available here
    // Asegurar usuario para mostrar FAB y filtrar correctamente
    if (!this.user) {
      try {
        this.user = this.userService.getLocalUser;
      } catch {}
    }
    this.initVariables();

    if (this.isChangeMode) {
      if (this.sourceIsCardio) {
        this.searchFilterGroupExercises.isCardio = true;
      } else if (this.sourceIsIsometric) {
        this.searchFilterGroupExercises.isIsometric = true;
      } else {
        this.searchFilterGroupExercises.isCardio = undefined;
      }
    }

    this.searchByFilter();
  }

  public ionViewWillEnter(): void {
    this.utilService.initFakeModalState();
    void this.initializeKeyboardListeners();
  }

  public ionViewDidEnter(): void {
    // Auto-focus removido
  }

  public ionViewWillLeave(): void {
    void this.removeKeyboardListeners();
    this.utilService.endFakeModalState();
  }

  private initVariables(): void {
    this.searchFilterGroupExercises = new SearchFilterGroupExercises();

    this.exerciseService.getExercises.subscribe(
      (resExercises) => (this.exercises = resExercises)
    );
  }

  public searchExercise(event: Event): void {
    this.searchFilterGroupExercises.search =
      this.utilService.getEventString(event);

    this.searchByFilter();
  }

  private searchByFilter(): void {
    this.load = false;

    this.searchFilterGroupExercises.page = 0;
    this.exerciseService
      .searchExercise(this.searchFilterGroupExercises)
      .subscribe((resExercises) => {
        const filteredExercises =
          this.isChangeMode && !this.sourceIsCardio && !this.sourceIsIsometric
            ? (resExercises || []).filter(
                (exercise) => !exercise?.isCardio && !exercise?.isIsometric
              )
            : resExercises;

        if (!this.isChangeMode && this.workout?.exercises) {
           const selectedIds = this.workout.exercises.map(ce => ce.exercise?._id);
           filteredExercises.sort((a, b) => {
              const aSelected = selectedIds.includes(a._id);
              const bSelected = selectedIds.includes(b._id);
              if (aSelected && !bSelected) return -1;
              if (!aSelected && bSelected) return 1;
              return 0;
           });
        }

        this.exercises = filteredExercises;
        this.exerciseService.setExercises = this.exercises;
        this.load = true;
      });
  }

  public loadData(event): void {
    this.searchFilterGroupExercises.page++;
    setTimeout(() => {
      event.target.complete();
      // TODO: Unificar las busquedas
      this.exerciseService
        .searchExercise(this.searchFilterGroupExercises)
        .subscribe((resExercises) => {
          const nextExercises =
            this.isChangeMode && !this.sourceIsCardio && !this.sourceIsIsometric
              ? (resExercises || []).filter(
                  (exercise) => !exercise?.isCardio && !exercise?.isIsometric
                )
              : resExercises;

          this.exercises = this.exercises.concat(nextExercises);
          this.exerciseService.setExercises = this.exercises;
          this.load = true;
        });
      // this.searchByFilter();
    }, 500);
  }

  public addExerciseModal(
    exercise?: Exercise,
    customExercise?: CustomExercise
  ): void {
    if (this.isChangeMode) {
      // Mostrar alerta de confirmación antes de proceder con el cambio
      const alertOptions: AlertOptions = {
        header: 'Confirmar cambio',
        message:
          'Este ejercicio se sustituirá en este entrenamiento para todos los micro-ciclos',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Confirmar',
            handler: () => this.modalController.dismiss(exercise),
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
      return;
    }

    const modalOptions: ModalOptions = {
      component: ConfigExercisePage,
      componentProps: {
        workout: this.workout,
        exercise: customExercise ? null : exercise,
        customExercise,
        user: this.user,
        tableInUse: this.tableInUse,
        workoutIndex: this.workoutIndex,
        splitIndex: this.getResolvedSplitIndex(),
        currentSplit: this.currentSplit,
        showQuickSeriesGenerator: this.showQuickSeriesGenerator,
      },
      cssClass: 'tf-panel-modal',
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) this.modalController.dismiss(res.data);
    });
  }

  public isExerciseSelected(exercise: Exercise): boolean {
    if (this.pickerMode) {
      return this.pickerSelectedExercises.some((e) => e._id === exercise._id);
    }
    if (this.isChangeMode || !this.workout?.exercises) return false;
    return !!this.workout.exercises.find(
      (ce) => ce.exercise?._id === exercise._id
    );
  }

  private togglePickerSelection(exercise: Exercise): void {
    const index = this.pickerSelectedExercises.findIndex((e) => e._id === exercise._id);
    if (index >= 0) {
      this.pickerSelectedExercises = this.pickerSelectedExercises.filter((_, i) => i !== index);
    } else {
      this.pickerSelectedExercises = [...this.pickerSelectedExercises, exercise];
    }
  }

  public confirmPickerSelection(): void {
    if (!this.pickerSelectedExercises.length) return;
    this.modalController.dismiss(this.pickerSelectedExercises);
  }

  public onExerciseCardClick(exercise: Exercise): void {
    if (this.mode === 'library') {
      this.exerciseSelected.emit(exercise);
      return;
    }

    if (this.pickerMode) {
      this.togglePickerSelection(exercise);
      return;
    }

    if (this.isChangeMode) {
      this.addExerciseModal(exercise);
      return;
    }

    const existingCustomExercise = this.getExistingCustomExercise(exercise);
    if (existingCustomExercise) {
      this.addExerciseModal(undefined, existingCustomExercise);
      return;
    }

    this.addExerciseModal(exercise);
  }

  public toggleExerciseSelection(exercise: Exercise): void {
    if (this.pickerMode) {
      this.togglePickerSelection(exercise);
      return;
    }

    if (this.isChangeMode) {
      this.addExerciseModal(exercise);
      return;
    }

    if (!this.load) return;

    if (this.singleWorkoutMode) {
      this.toggleExerciseSelectionSingleWorkout(exercise);
      return;
    }

    const existingCustomExercise = this.getExistingCustomExercise(exercise);

    this.load = false;

    if (existingCustomExercise) {
      // Remove it
      let deletedExercises: string[] = [];
      if (this.tableInUse?.splits) {
        this.tableInUse.splits.forEach((splitTemp) => {
          if (splitTemp.workouts[this.workoutIndex]) {
            const ceToRemove = splitTemp.workouts[this.workoutIndex].exercises.find(
              ce => ce.exercise?._id === exercise._id
            );
            if (ceToRemove) {
              deletedExercises.push(ceToRemove._id);
              splitTemp.workouts[this.workoutIndex].exercises = splitTemp.workouts[this.workoutIndex].exercises.filter(
                ce => ce._id !== ceToRemove._id
              );
            }
          }
        });
      }
      
      // Also update this.workout reference if it's not the same as the one in tableInUse
      if (this.workout && this.workout.exercises) {
         this.workout.exercises = this.workout.exercises.filter(
           ce => ce.exercise?._id !== exercise._id
         );
      }

      this.customExerciseService.deleteCustomExercises(deletedExercises).subscribe(() => {
        this.tableService.setCurrentTable = this.tableInUse;
        this.load = true;
      });

    } else {
      // Add it
      const workoutIds: string[] = [];
      const targetWorkouts: any[] = [];
      
      if (this.tableInUse?.splits) {
        this.tableInUse.splits.forEach((splitTemp) => {
          if (splitTemp.workouts[this.workoutIndex]) {
            workoutIds.push(splitTemp.workouts[this.workoutIndex]._id);
            targetWorkouts.push(splitTemp.workouts[this.workoutIndex]);
          }
        });
      }

      // Fallback in case tableInUse doesn't have it but we have a valid workout
      if (workoutIds.length === 0 && this.workout?._id) {
        workoutIds.push(this.workout._id);
        targetWorkouts.push(this.workout);
      }
      
      this.workoutService.addExerciseToWorkouts(workoutIds, exercise._id).subscribe((results) => {
         // results is an array of { workoutId, customExercise }
         results.forEach((resItem) => {
            const targetWorkout = targetWorkouts.find(w => w._id === resItem.workoutId);
            if (targetWorkout) {
               if (!targetWorkout.exercises) targetWorkout.exercises = [];
               const alreadyExists = targetWorkout.exercises.some(ce => ce.exercise?._id === exercise._id);
               if (!alreadyExists) {
                  targetWorkout.exercises.push(resItem.customExercise);
               }
            }
            
            // Also explicitly update this.workout if it matches
            if (this.workout && this.workout._id === resItem.workoutId && !targetWorkouts.includes(this.workout)) {
               if (!this.workout.exercises) this.workout.exercises = [];
               const alreadyExists = this.workout.exercises.some(ce => ce.exercise?._id === exercise._id);
               if (!alreadyExists) {
                  this.workout.exercises.push(resItem.customExercise);
               }
            }
         });
         
         this.tableService.setCurrentTable = this.tableInUse;
         this.load = true;
      });
    }
  }

  // Planificador visual (Fase C) — alta/baja instantánea scoped a UN solo
  // workout (this.workout._id), sin barrer tableInUse.splits[*]. Reutiliza
  // addExerciseToWorkouts con un array de un solo elemento — mismo endpoint
  // que ya crea el CustomExercise real, sin necesidad de uno nuevo.
  private toggleExerciseSelectionSingleWorkout(exercise: Exercise): void {
    const existingCustomExercise = this.getExistingCustomExercise(exercise);
    this.load = false;

    if (existingCustomExercise) {
      this.customExerciseService.deleteCustomExercise(existingCustomExercise._id).subscribe(() => {
        this.workout.exercises = (this.workout.exercises || []).filter(
          (ce) => ce._id !== existingCustomExercise._id
        );
        if (this.tableInUse) this.tableService.setCurrentTable = this.tableInUse;
        this.load = true;
      });
      return;
    }

    this.workoutService.addExerciseToWorkouts([this.workout._id], exercise._id).subscribe((results) => {
      const resItem = results?.[0];
      if (resItem) {
        if (!this.workout.exercises) this.workout.exercises = [];
        const alreadyExists = this.workout.exercises.some((ce) => ce.exercise?._id === exercise._id);
        if (!alreadyExists) this.workout.exercises.push(resItem.customExercise);
      }
      if (this.tableInUse) this.tableService.setCurrentTable = this.tableInUse;
      this.load = true;
    });
  }

  public openFilterModal(): void {
    const modalOptions: ModalOptions = {
      component: FilterInputPage,
      cssClass: ['mini-modal', 'tf-panel-modal'],
      componentProps: {
        searchFilterGroupExercises: this.searchFilterGroupExercises,
        showExerciseTypeFilter: !this.isChangeMode,
      },
      animated: true,
    };

    this.ionicUtilService.showModal(modalOptions);
  }

  public spliceCategory(category: string): void {
    const indexCategory =
      this.searchFilterGroupExercises.category.indexOf(category);
    this.searchFilterGroupExercises.category.splice(indexCategory, 1);
    this.searchByFilter();
  }

  public spliceMuscleGroup1(muscle: string): void {
    const indexCategory =
      this.searchFilterGroupExercises.muscleGroups1.indexOf(muscle);
    this.searchFilterGroupExercises.muscleGroups1.splice(indexCategory, 1);
    this.searchByFilter();
  }

  public spliceMuscleGroup2(muscle: string): void {
    const indexCategory =
      this.searchFilterGroupExercises.muscleGroups2.indexOf(muscle);
    this.searchFilterGroupExercises.muscleGroups2.splice(indexCategory, 1);
    this.searchByFilter();
  }

  public getValidMuscleGroups(exercise: Exercise): string[] {
    if (!exercise || !exercise.muscleGroups1) return [];
    return exercise.muscleGroups1.filter((g) => g && g.trim().length > 0);
  }

  public setFilterIconsValueBySelection(event: SearchFilterGroup): void {
    // Para ejercicios, ownFilter es redundante: usar presence de userId
    const isOwn = !!event.ownFilter;
    const isFav = !!event.favFilter;

    this.searchFilterGroupExercises.favFilter = isFav;

    if (isOwn || isFav) {
      this.searchFilterGroupExercises.userId = this.user?._id;
    } else {
      this.searchFilterGroupExercises.userId = undefined; // "Todo": globales
    }

    this.searchFilterGroupExercises.page = 0;
    this.exercises = [];
    this.searchByFilter();
  }

  public onCloseFab(actionFab: ACTIONS_FAB_TYPES): void {
    if (actionFab === ACTIONS_FAB_TYPES.createExercise) {
      this.createExercise();
    }
  }

  public createExercise(): void {
    const modalOptions: ModalOptions = {
      component: ConfigExercisePage,
      componentProps: {
        workout: this.workout,
        exercise: null, // No exercise means create mode
        user: this.user,
        tableInUse: this.tableInUse,
        workoutIndex: this.workoutIndex,
        currentSplit: this.currentSplit,
        showQuickSeriesGenerator: this.showQuickSeriesGenerator,
      },
      cssClass: 'tf-panel-modal',
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) {
        this.searchByFilter(); // Refresh list after creation
        this.modalController.dismiss(res.data);
      }
    });
  }

  private async initializeKeyboardListeners(): Promise<void> {
    await this.removeKeyboardListeners();

    const handleShow = () => this.setFooterHidden(true);
    const handleHide = () => this.setFooterHidden(false);

    try {
      this.keyboardWillShowHandle = await Keyboard.addListener(
        'keyboardWillShow',
        handleShow
      );
      this.keyboardWillHideHandle = await Keyboard.addListener(
        'keyboardWillHide',
        handleHide
      );
      this.keyboardDidShowHandle = await Keyboard.addListener(
        'keyboardDidShow',
        handleShow
      );
      this.keyboardDidHideHandle = await Keyboard.addListener(
        'keyboardDidHide',
        handleHide
      );
    } catch (error) {
      console.error('[Keyboard] Failed to register listeners', error);
    }

    if (this.platform.is('ios') && window.visualViewport) {
      this.baseViewportHeight = window.visualViewport.height;
      this.visualViewportResizeHandler = () => {
        const currentHeight = window.visualViewport?.height;
        if (!currentHeight) {
          return;
        }

        if (
          !this.baseViewportHeight ||
          currentHeight > this.baseViewportHeight
        ) {
          this.baseViewportHeight = currentHeight;
        }

        const isKeyboardVisible =
          currentHeight < (this.baseViewportHeight ?? currentHeight) - 120;

        this.setFooterHidden(isKeyboardVisible);

        if (!isKeyboardVisible) {
          this.baseViewportHeight = currentHeight;
        }
      };

      window.visualViewport.addEventListener(
        'resize',
        this.visualViewportResizeHandler
      );
    }
  }

  private async removeKeyboardListeners(): Promise<void> {
    try {
      await this.keyboardWillShowHandle?.remove();
      await this.keyboardWillHideHandle?.remove();
      await this.keyboardDidShowHandle?.remove();
      await this.keyboardDidHideHandle?.remove();
    } catch (error) {
      console.error('[Keyboard] Failed to remove listeners', error);
    }

    this.keyboardWillShowHandle = undefined;
    this.keyboardWillHideHandle = undefined;
    this.keyboardDidShowHandle = undefined;
    this.keyboardDidHideHandle = undefined;

    if (this.visualViewportResizeHandler && window.visualViewport) {
      window.visualViewport.removeEventListener(
        'resize',
        this.visualViewportResizeHandler
      );
    }

    this.visualViewportResizeHandler = undefined;
    this.baseViewportHeight = undefined;
  }

  private setFooterHidden(hidden: boolean): void {
    if (this.isFooterHidden === hidden) {
      return;
    }

    this.isFooterHidden = hidden;
  }

  private getExistingCustomExercise(
    exercise: Exercise
  ): CustomExercise | undefined {
    return this.workout?.exercises?.find(
      (ce) => ce.exercise?._id === exercise._id
    );
  }

  private getResolvedSplitIndex(): number | undefined {
    if (typeof this.splitIndex === 'number' && this.splitIndex >= 0) {
      return this.splitIndex;
    }

    if (this.currentSplit?._id && this.tableInUse?.splits?.length) {
      const currentSplitIndex = this.tableInUse.splits.findIndex(
        (split) => split._id === this.currentSplit._id
      );
      if (currentSplitIndex >= 0) {
        return currentSplitIndex;
      }
    }

    if (
      typeof this.workoutIndex === 'number' &&
      this.workout?._id &&
      this.tableInUse?.splits?.length
    ) {
      const workoutSplitIndex = this.tableInUse.splits.findIndex(
        (split) => split.workouts?.[this.workoutIndex]?._id === this.workout._id
      );
      if (workoutSplitIndex >= 0) {
        return workoutSplitIndex;
      }
    }

    return undefined;
  }
}
