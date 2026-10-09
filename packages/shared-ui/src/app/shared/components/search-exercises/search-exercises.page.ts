import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { ModalController, ModalOptions, AlertOptions, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
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
import { UtilService } from 'src/app/core/services/util/util.service';
import { FilterInputPage } from '../filter-input/filter-input.page';
import {
  SearchFilterGroup,
  SearchFilterGroupExercises,
} from '../../models/filterGroup';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfigExercisePage } from 'src/app/features/exercises/components/config-exercise/config-exercise.page';
import { ACTIONS_FAB_TYPES } from '../../constants/actions-fab';
import { muscleGroupOf, muscleLabel, muscleNeedsGroup, primaryMuscleLabels } from 'src/app/core/constants/muscle-catalog';

@Component({
  selector: 'app-search-exercises',
  templateUrl: './search-exercises.page.html',
  styleUrls: ['./search-exercises.page.scss'],
})
export class SearchExercisesPage implements OnInit, OnDestroy {
  // Referencia al contenedor que proporciona AngularDelegate de Ionic.
  public modal?: HTMLIonModalElement;

  @ViewChild('searchbar', { static: false }) searchbar: any;
  @ViewChild('content', { read: ElementRef }) private contentRef?: ElementRef<HTMLIonContentElement>;

  // Ejercicios por página. Múltiplo de 2, 3 y 4 para que la rejilla de
  // escritorio no deje la última fila a medias en cada página.
  private static readonly PAGE_SIZE = 24;
  // El mismo umbral que el ion-infinite-scroll de la plantilla.
  private static readonly SCROLL_THRESHOLD_PX = 100;

  @Input() user: User;
  @Input() workout: Workout;
  @Input() workoutIndex: number;
  @Input() splitIndex: number;
  @Input() currentSplit: Split;
  @Input() tableInUse: Table;
  @Input() isChangeMode: boolean;
  @Input() sourceIsCardio: boolean;
  @Input() sourceIsIsometric: boolean;

  // Plantillas de entrenamiento — elegir un ejercicio para un estado local
  // todavía sin guardar (el builder de plantillas no tiene un Workout/
  // tableInUse real hasta pulsar "Guardar"). A diferencia de isChangeMode
  // (pide confirmación de "sustitución", pensada para reemplazar un
  // ejercicio ya en curso), aquí se selecciona y se cierra sin más: no hay
  // nada que sustituir, solo añadir.
  @Input() pickerMode = false;

  // Plantillas de entrenamiento (routine-builder) — el mismo comportamiento
  // que en el Planificador: el checkbox añade o quita el ejercicio al momento
  // (sin series, el buscador sigue abierto) y tocar el resto de la tarjeta
  // abre "Configurar ejercicio" encima del buscador; si se guarda, el
  // buscador se cierra. Quien abre el picker da estas funciones; sin ellas,
  // el picker es la selección múltiple con "Añadir" en el pie.
  @Input() pickerIsAdded?: (exercise: Exercise) => boolean;
  @Input() pickerToggle?: (exercise: Exercise) => void | Promise<void>;
  @Input() pickerConfigure?: (exercise: Exercise, origin?: HTMLIonModalElement) => Promise<boolean>;
  @Input() pickerAddedLabel = '';

  public get pickerLive(): boolean {
    return this.pickerMode && !!this.pickerToggle;
  }

  // Biblioteca de ejercicios (TASK-042) — misma pantalla de picker
  // reutilizada como catálogo navegable de solo consulta: sin workout, sin
  // ConfigExercisePage. En 'library' el tap emite exerciseSelected en vez de
  // abrir/seleccionar, y el header/checkbox de picker se ocultan.
  @Input() mode: 'default' | 'library' = 'default';
  @Output() exerciseSelected = new EventEmitter<Exercise>();

  // Biblioteca a pantalla completa (exercise-library, entrenadores): el alta
  // es la primera tarjeta de la lista. Solo aparece si la página escucha el
  // evento (el picker de Puntuaciones no lo hace).
  @Output() create = new EventEmitter<void>();

  public exercises: Exercise[];
  public load: boolean;

  // Paginación (POST /exercises/search?withTotal=1): cuántos coinciden con
  // la búsqueda y si quedan páginas por pedir. null hasta la primera
  // respuesta.
  public exercisesTotal: number | null = null;
  public hasMore = false;
  private loadingMore = false;
  // Cada búsqueda nueva invalida las respuestas de las anteriores: una
  // página que llega tarde no se mezcla con la lista de otra búsqueda.
  private searchRequest = 0;
  private librarySearchTimer?: ReturnType<typeof setTimeout>;

  // pickerMode — selección múltiple: antes cada tap (tarjeta o checkbox)
  // cerraba el modal al instante con un solo ejercicio, así que marcar el
  // checkbox no dejaba elegir más de uno. Ahora se acumulan aquí y el
  // footer confirma con todos a la vez (ver confirmPickerSelection()).
  public pickerSelectedExercises: Exercise[] = [];

  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  public isFooterHidden: boolean = false;

  public searchFilterGroupExercises: SearchFilterGroupExercises;

  protected readonly EXERCISE_PLACEHOLDER = 'assets/logo_light.png';

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
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private userService: UserService,
    private platform: Platform,
    private customExerciseService: CustomExerciseService,
    private workoutService: WorkoutService,
    private tableService: TableService
  ) {}

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
        this.searchFilterGroupExercises.isStrength = true;
      }
    }

    this.searchByFilter();
  }

  public ngOnDestroy(): void {
    clearTimeout(this.librarySearchTimer);
  }

  public get canCreate(): boolean {
    return this.create.observed;
  }

  // Filtros puestos en el panel de Filtros (el número del botón). En
  // sustituir, el tipo lo fija el ejercicio de origen y no se puede tocar.
  public get activeFilterCount(): number {
    const filters = this.searchFilterGroupExercises;
    if (!filters) return 0;
    const typeFilter = !this.isChangeMode && (filters.isStrength || filters.isCardio || filters.isIsometric) ? 1 : 0;
    return (
      (filters.category?.length || 0) +
      (filters.muscles?.length || 0) +
      (filters.equipment?.length || 0) +
      typeFilter
    );
  }

  public goBack(): void {
    void this.modalController.dismiss();
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

  // Campo de búsqueda de la biblioteca (input nativo, sin el debounce de
  // ion-searchbar).
  public onLibrarySearch(value: string): void {
    clearTimeout(this.librarySearchTimer);
    this.librarySearchTimer = setTimeout(() => {
      const search = (value || '').trim();
      if (search === (this.searchFilterGroupExercises.search || '')) return;
      this.searchFilterGroupExercises.search = search;
      this.searchByFilter();
    }, 300);
  }

  private searchByFilter(): void {
    const request = ++this.searchRequest;
    this.load = false;
    this.loadingMore = false;
    this.hasMore = false;

    this.searchFilterGroupExercises.page = 0;
    this.exerciseService
      .searchExercisePage(this.searchFilterGroupExercises, 0, SearchExercisesPage.PAGE_SIZE)
      .subscribe({
        next: (result) => {
          if (request !== this.searchRequest) return;
          const filteredExercises = result?.items || [];

          if (!this.isChangeMode && this.workout?.exercises) {
            const selectedIds = this.workout.exercises.map((ce) => ce.exercise?._id);
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
          this.exercisesTotal = result?.total ?? filteredExercises.length;
          this.hasMore = !!result?.hasMore;
          this.load = true;
          this.fillViewport(request);
        },
        error: (error) => {
          if (request !== this.searchRequest) return;
          this.exercises = [];
          this.exercisesTotal = null;
          this.load = true;
          void this.ionicUtilService.showErrorToast(
            error,
            this.translate.instant('SEARCH_EXERCISES.LOAD_ERROR')
          );
        },
      });
  }

  public loadData(event): void {
    this.loadNextPage(() => event.target.complete());
  }

  private loadNextPage(done?: () => void): void {
    if (!this.hasMore || this.loadingMore) {
      done?.();
      return;
    }

    const request = this.searchRequest;
    const nextPage = (this.searchFilterGroupExercises.page || 0) + 1;
    this.loadingMore = true;

    // Si falla, la página no avanza y hasMore sigue igual: volver a bajar
    // la reintenta.
    this.exerciseService
      .searchExercisePage(this.searchFilterGroupExercises, nextPage, SearchExercisesPage.PAGE_SIZE)
      .pipe(
        finalize(() => {
          if (request === this.searchRequest) this.loadingMore = false;
          done?.();
        })
      )
      .subscribe({
        next: (result) => {
          if (request !== this.searchRequest) return;
          // Un ejercicio creado mientras tanto desplaza las páginas: no se
          // repite el que ya está en la lista.
          const known = new Set(this.exercises.map((exercise) => exercise._id));
          const nextExercises = (result?.items || []).filter((exercise) => !known.has(exercise._id));

          this.searchFilterGroupExercises.page = nextPage;
          this.exercises = this.exercises.concat(nextExercises);
          this.exerciseService.setExercises = this.exercises;
          this.exercisesTotal = result?.total ?? this.exercisesTotal;
          this.hasMore = !!result?.hasMore;
          this.fillViewport(request);
        },
        error: () => undefined,
      });
  }

  // ion-infinite-scroll solo pide la página siguiente al hacer scroll. En
  // escritorio la rejilla de varias columnas enseña la primera página entera
  // sin scroll, así que nunca llegaba a pedir más: se piden páginas hasta
  // que la lista desborde o no queden.
  private fillViewport(request: number): void {
    setTimeout(async () => {
      if (request !== this.searchRequest || !this.hasMore) return;
      const scrollElement = await this.contentRef?.nativeElement?.getScrollElement?.();
      if (!scrollElement) return;
      const overflow = scrollElement.scrollHeight - scrollElement.clientHeight;
      if (overflow <= SearchExercisesPage.SCROLL_THRESHOLD_PX) {
        this.loadNextPage();
      }
    });
  }

  public addExerciseModal(
    exercise?: Exercise,
    customExercise?: CustomExercise
  ): void {
    if (this.isChangeMode) {
      // Mostrar alerta de confirmación antes de proceder con el cambio
      const alertOptions: AlertOptions = {
        header: this.translate.instant('SEARCH_EXERCISES.SWAP_CONFIRM_HEADER'),
        message: this.translate.instant('SEARCH_EXERCISES.SWAP_CONFIRM_MSG'),
        buttons: [
          {
            text: this.translate.instant('COMMON.CANCEL'),
            role: 'cancel',
          },
          {
            text: this.translate.instant('SEARCH_EXERCISES.SWAP_CONFIRM_BTN'),
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
      },
      cssClass: 'tf-panel-modal',
    };

    // Configurar ejercicio se abre ENCIMA del buscador (misma columna); lo que
    // abra él (añadir series...) sale a su izquierda. Filtros, si estaba
    // abierto, se cierra: los filtros ya están aplicados (se editan por
    // referencia).
    void this.ionicUtilService.closeChildSidePanels(this.modal);
    this.ionicUtilService.showNestedModal(modalOptions, this.modal, { overParent: true }).then((res) => {
      if (res.data) this.modalController.dismiss(res.data);
    });
  }

  public isExerciseSelected(exercise: Exercise): boolean {
    if (this.pickerLive) return !!this.pickerIsAdded?.(exercise);
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

    // Como addExerciseModal: "Configurar ejercicio" encima del buscador.
    if (this.pickerLive && this.pickerConfigure) {
      void this.ionicUtilService.closeChildSidePanels(this.modal);
      void this.pickerConfigure(exercise, this.modal).then((added) => {
        if (added) void this.modalController.dismiss();
      });
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

  public toggleExerciseSelection(exercise: Exercise, event?: Event): void {
    if (this.pickerLive) {
      // Quien abre el picker puede pedir confirmación (quitar un ejercicio ya
      // pautado). Si se cancela, el checkbox ya cambió por dentro: se vuelve
      // a poner como diga la plantilla.
      const checkbox = event?.target as HTMLIonCheckboxElement | undefined;
      void Promise.resolve(this.pickerToggle!(exercise)).then(() => {
        if (checkbox) checkbox.checked = this.isExerciseSelected(exercise);
      });
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

    if (!this.load) return;

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

  public openFilterModal(): void {
    const modalOptions: ModalOptions = {
      component: FilterInputPage,
      cssClass: ['mini-modal', 'tf-panel-modal'],
      componentProps: {
        searchFilterGroupExercises: this.searchFilterGroupExercises,
        showExerciseTypeFilter: !this.isChangeMode,
        onFiltersChange: () => this.searchByFilter(),
      },
      animated: true,
    };

    this.ionicUtilService.showNestedModal(modalOptions, this.modal);
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

  public getValidMuscleGroups(exercise: Exercise): string[] {
    return primaryMuscleLabels(exercise?.muscles);
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
      cssClass: 'tf-panel-modal',
    };

    // Configurar ejercicio se abre ENCIMA del buscador (misma columna); lo que
    // abra él (añadir series...) sale a su izquierda. Filtros, si estaba
    // abierto, se cierra: los filtros ya están aplicados (se editan por
    // referencia).
    void this.ionicUtilService.closeChildSidePanels(this.modal);
    this.ionicUtilService.showNestedModal(modalOptions, this.modal, { overParent: true }).then((res) => {
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
