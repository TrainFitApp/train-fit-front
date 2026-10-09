import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Exercise } from 'src/app/core/models/exercise';
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerNavigationService } from '../../core/services/trainer-navigation.service';
import { ExerciseDetailModalComponent } from './components/exercise-detail-modal/exercise-detail-modal.component';
import { ExerciseFormModalComponent } from './components/exercise-form-modal/exercise-form-modal.component';

// TASK-042 (MASTER_BACKLOG.md) — antes el catálogo de ejercicios solo era
// alcanzable como modal picker dentro de construir un workout. Ahora esta
// pantalla reutiliza directamente SearchExercisesPage (app-search-exercises,
// la misma que usa routine-builder para buscar ejercicios) en mode="library":
// buscador/chips/infinite-scroll idénticos, pero el tap emite
// exerciseSelected en vez de abrir ConfigExercisePage, así que aquí solo
// abrimos ExerciseDetailModalComponent (lectura), y el alta/edición va por
// ExerciseFormModalComponent, que guarda contra /exercises sin necesitar una
// rutina abierta. La cabecera es la común (app-page-header); el buscador y
// los filtros van dentro del contenido y "+ Ejercicio" es la primera tarjeta
// de la lista, que el buscador pinta al escuchar (create).
@Component({
  selector: 'app-exercise-library',
  templateUrl: 'exercise-library.page.html',
  styleUrls: ['exercise-library.page.scss'],
})
export class ExerciseLibraryPage {
  private readonly translate = inject(TranslateService);

  // app-search-exercises no expone forma de recargar su lista desde fuera, y
  // es un componente compartido con la app de consumidor. Alternar este flag
  // lo vuelve a montar, que es lo que relanza la búsqueda tras crear, editar
  // o borrar.
  public listVisible = true;

  constructor(
    public navigation: TrainerNavigationService,
    private ionicUtilService: IonicUtilService,
    private exerciseService: ExerciseService
  ) {}

  public async openExerciseDetail(exercise: Exercise): Promise<void> {
    const result = await this.ionicUtilService.showModal({
      component: ExerciseDetailModalComponent,
      componentProps: { exercise },
      cssClass: 'tf-panel-modal',
    });

    if (result?.data?.action === 'edit') {
      void this.openExerciseForm(exercise);
      return;
    }

    if (result?.data?.action === 'delete') {
      void this.confirmDelete(exercise);
    }
  }

  public async openExerciseForm(exercise?: Exercise): Promise<void> {
    const result = await this.ionicUtilService.showModal({
      component: ExerciseFormModalComponent,
      componentProps: { exercise },
      cssClass: 'tf-panel-modal',
    });

    if (result?.data?.saved) {
      this.reloadList();
    }
  }

  private async confirmDelete(exercise: Exercise): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('EXERCISE_LIBRARY.ELIMINAR_EJERCICIO'),
      message: this.translate.instant('EXERCISE_LIBRARY.DESAPARECERA_DE_TU_BIBLIOTECA_DE', { name: exercise.name }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.exerciseService.deleteExercise(exercise._id).subscribe({
              next: () => {
                void this.ionicUtilService.showSuccessToast(
                  this.translate.instant('EXERCISE_LIBRARY.EJERCICIO_ELIMINADO')
                );
                this.reloadList();
              },
              // El backend responde 409 EXERCISE_IN_USE con su propio texto
              // cuando el ejercicio está en una plantilla de rutina.
              error: (error) =>
                void this.ionicUtilService.showErrorToast(
                  error,
                  this.translate.instant('EXERCISE_LIBRARY.NO_SE_PUDO_ELIMINAR_EL')
                ),
            });
          },
        },
      ],
    });
  }

  private reloadList(): void {
    this.listVisible = false;
    setTimeout(() => (this.listVisible = true));
  }
}
