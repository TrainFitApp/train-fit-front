import { Component, Input, OnInit } from '@angular/core';
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
import { FilterInputPage } from '../filter-input/filter-input.page';
import {
  SearchFilterGroup,
  SearchFilterGroupExercises,
} from '../../models/filterGroup';
import { Theme, THEMES } from '../../models/theme';
import { ExerciseService } from '../../../core/services/exercise/exercise.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfigExercisePage } from '../../../features/exercises/components/config-exercise/config-exercise.page';
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
  @Input() currentSplit: Split;
  @Input() tableInUse: Table;
  @Input() isChangeMode: boolean;

  public exercises: Exercise[];
  public exercisesCount: number;
  public load: boolean;
  public theme: ColorMode;

  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

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
    private ionicUtilService: IonicUtilService,
    private userService: UserService
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
    this.searchByFilter();
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
      },
    };

    this.ionicUtilService.showModal(modalOptions).then((res) => {
      if (res.data) {
        this.searchByFilter(); // Refresh list after creation
        this.modalController.dismiss(res.data);
      }
    });
  }
}
