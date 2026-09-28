import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { ModalController, ModalOptions, AlertOptions, Platform } from '@ionic/angular';
// No importar IonSearchbar directamente para evitar errores en NgModules
import { CUSTOM_PRODUCT_VALUES } from 'src/app/core/models/customProduct';
import { Exercise } from 'src/app/core/models/exercise';
import { Split } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { FilterInputPage } from 'src/app/shared/components/filter-input/filter-input.page';
import { SearchFilterGroupExercises } from 'src/app/shared/models/filterGroup';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { ConfigExercisePage } from '../config-exercise/config-exercise.page';
import { muscleGroupOf, muscleLabel, muscleNeedsGroup } from 'src/app/core/constants/muscle-catalog';

@Component({
  selector: 'app-exercises',
  templateUrl: './search-exercises.page.html',
  styleUrls: ['./search-exercises.page.scss'],
})
export class SearchExercisesPageComponent {
  @ViewChild('searchbar', { static: false }) searchbar: any;

  public exercises: Exercise[];
  public exercisesCount: number;
  public workout: Workout;
  public user: User;
  public workoutIndex: number;
  public currentSplit: Split;
  public tableInUse: Table;
  public isChangeMode: boolean;
  public load: boolean;

  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  public isFooterHidden: boolean = false;

  // public selectedCategories: string[] = [];
  // public selectedMuscleGroup1: string[] = [];
  // public selectedMuscleGroup2: string[] = [];

  public searchFilterGroupExercises: SearchFilterGroupExercises;
  public cardioMode: 'all' | 'cardio' = 'all';

  protected readonly EXERCISE_PLACEHOLDER = 'assets/logo_light.png';

  private keyboardWillShowHandle?: PluginListenerHandle;
  private keyboardWillHideHandle?: PluginListenerHandle;
  private keyboardDidShowHandle?: PluginListenerHandle;
  private keyboardDidHideHandle?: PluginListenerHandle;
  private visualViewportResizeHandler?: () => void;
  private baseViewportHeight?: number;

  constructor(
    public modalController: ModalController,
    private exerciseService: ExerciseService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private platform: Platform
  ) {
    this.initVariables();
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
        this.exercises = resExercises;
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
          this.exercises = this.exercises.concat(resExercises);
          this.exerciseService.setExercises = this.exercises;
          this.load = true;
        });
      // this.searchByFilter();
    }, 500);
  }

  public addExerciseModal(exercise?: Exercise): void {
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
        exercise: exercise,
        user: this.user,
        tableInUse: this.tableInUse,
        workoutIndex: this.workoutIndex,
        currentSplit: this.currentSplit,
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) this.modalController.dismiss(res.data);
    });
  }

  public openFilterModal(): void {
    const modalOptions: ModalOptions = {
      component: FilterInputPage,
      cssClass: 'mini-modal',
      componentProps: {
        searchFilterGroupExercises: this.searchFilterGroupExercises,
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

  public muscleFilterLabel(id: string): string {
    return muscleLabel(id);
  }

  public muscleFilterGroup(id: string): string | null {
    return muscleNeedsGroup(id) ? muscleGroupOf(id)?.label || null : null;
  }

  public spliceMuscle(id: string): void {
    this.searchFilterGroupExercises.muscles = (this.searchFilterGroupExercises.muscles || []).filter(
      (muscle) => muscle !== id
    );
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

  public setCardioMode(mode: 'all' | 'cardio'): void {
    if (this.cardioMode === mode) {
      return;
    }

    this.cardioMode = mode;
    this.searchFilterGroupExercises.isCardio =
      mode === 'cardio' ? true : undefined;
    this.searchByFilter();
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
}

