import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { SearchFilterGroupExercises } from 'src/app/shared/models/filterGroup';
import { FilterInputPage } from 'src/app/shared/components/filter-input/filter-input.page';
import { ExerciseDetailModalComponent } from './components/exercise-detail-modal/exercise-detail-modal.component';

// TASK-042 (MASTER_BACKLOG.md) — antes el catálogo de ejercicios solo era
// alcanzable como modal picker dentro de construir un workout
// (SearchExercisesPage, con `pickerMode`/`isChangeMode`/etc. atados a un
// `workout` real). Esta pantalla reutiliza el mismo `ExerciseService` +
// `FilterInputPage` (mismo mecanismo: FilterInputPage llama a
// `searchExercise()` y publica el resultado vía `exerciseService.
// setExercises`, este componente solo se suscribe a `getExercises`) pero es
// una ruta real, navegable, de solo consulta — clicar un ejercicio abre
// ExerciseDetailModalComponent (lectura, sin guardar nada), no
// ConfigExercisePage (que exige contexto de `workout` real para poder
// guardar).
@Component({
  selector: 'app-exercise-library',
  templateUrl: 'exercise-library.page.html',
  styleUrls: ['exercise-library.page.scss'],
})
export class ExerciseLibraryPage implements OnInit {
  public exercises: Exercise[] = [];
  public loading = true;
  public loadingMore = false;
  public searchFilterGroupExercises = new SearchFilterGroupExercises();

  private searchDebounceHandle: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private exerciseService: ExerciseService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.exerciseService.getExercises.subscribe((exercises) => {
      this.exercises = exercises || [];
    });
    this.search();
  }

  // Mismo bug de caché de ion-router-outlet ya corregido en otras páginas
  // esta sesión (RoutinesPage, DietTemplatesListPage, TemplatesPage,
  // ClientDetailPage) — aquí el catálogo no cambia entre visitas tan a
  // menudo como esas, pero re-buscar es barato y evita mostrar resultados
  // de un filtro que ya no aplica si el usuario vuelve tras usar el modal
  // de detalle.
  public ionViewWillEnter(): void {
    this.search();
  }

  public onSearchInput(value: string): void {
    this.searchFilterGroupExercises.search = value;
    if (this.searchDebounceHandle) clearTimeout(this.searchDebounceHandle);
    this.searchDebounceHandle = setTimeout(() => this.search(), 300);
  }

  private search(): void {
    this.loading = true;
    this.searchFilterGroupExercises.page = 0;
    this.exerciseService.searchExercise(this.searchFilterGroupExercises).subscribe({
      next: (exercises) => {
        this.exercises = exercises || [];
        this.exerciseService.setExercises = this.exercises;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  public loadMore(event: any): void {
    this.searchFilterGroupExercises.page = (this.searchFilterGroupExercises.page || 0) + 1;
    this.exerciseService.searchExercise(this.searchFilterGroupExercises).subscribe({
      next: (nextExercises) => {
        this.exercises = this.exercises.concat(nextExercises || []);
        this.exerciseService.setExercises = this.exercises;
        event.target.complete();
        if (!nextExercises || nextExercises.length < 10) {
          event.target.disabled = true;
        }
      },
      error: () => {
        event.target.complete();
      },
    });
  }

  public openFilterModal(): void {
    this.ionicUtilService.showModal({
      component: FilterInputPage,
      cssClass: ['mini-modal', 'tf-panel-modal'],
      componentProps: {
        searchFilterGroupExercises: this.searchFilterGroupExercises,
        showExerciseTypeFilter: true,
      },
    });
  }

  public openExerciseDetail(exercise: Exercise): void {
    this.ionicUtilService.showModal({
      component: ExerciseDetailModalComponent,
      componentProps: { exercise },
      cssClass: 'tf-panel-modal',
    });
  }

  public muscleGroupsPreview(exercise: Exercise): string {
    const groups = [...(exercise.muscleGroups1 || []), ...(exercise.muscleGroups2 || [])].filter(
      (g) => g && g.trim().length > 0
    );
    return groups.slice(0, 3).join(' · ');
  }

  public trackByExerciseId(_index: number, exercise: Exercise): string {
    return exercise._id;
  }
}
