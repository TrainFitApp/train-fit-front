import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalController, ModalOptions, AlertOptions } from '@ionic/angular';
// No importar IonSearchbar directamente para evitar errores en NgModules
import { CUSTOM_PRODUCT_VALUES } from 'src/app/core/models/customProduct';
import { Exercise } from 'src/app/core/models/exercise';
import { Split } from 'src/app/core/models/split';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  ColorMode,
  ThemeService,
} from 'src/app/core/services/util/theme.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { FilterInputPage } from 'src/app/shared/components/filter-input/filter-input.page';
import { SearchFilterGroupExercises } from 'src/app/shared/models/filterGroup';
import { Theme, THEMES } from 'src/app/shared/models/theme';
import { ExerciseService } from '../../../../core/services/exercise/exercise.service';
import { ConfigExercisePage } from '../config-exercise/config-exercise.page';

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
  public theme: ColorMode;

  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  // public selectedCategories: string[] = [];
  // public selectedMuscleGroup1: string[] = [];
  // public selectedMuscleGroup2: string[] = [];

  public searchFilterGroupExercises: SearchFilterGroupExercises;

  protected readonly GIF_LOCAL_ROUTE_LIGHT =
    '../../../../../assets/img/logo/login_light.svg';

  protected readonly GIF_LOCAL_ROUTE_DARK =
    '../../../../../assets/img/logo/login_dark.svg';

  public THEMES = THEMES;

  constructor(
    public modalController: ModalController,
    private exerciseService: ExerciseService,
    private themeService: ThemeService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService
  ) {
    this.initVariables();
    this.searchByFilter();
    this.themeService.theme.subscribe((res: Theme) => (this.theme = res));
  }

  public ionViewWillEnter(): void {
    this.utilService.initFakeModalState();
  }

  public ionViewDidEnter(): void {
    // Auto-focus removido
  }

  public ionViewWillLeave(): void {
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
}
