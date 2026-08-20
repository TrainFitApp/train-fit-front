import { Component } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ExerciseDetailModalComponent } from './components/exercise-detail-modal/exercise-detail-modal.component';

// TASK-042 (MASTER_BACKLOG.md) — antes el catálogo de ejercicios solo era
// alcanzable como modal picker dentro de construir un workout. Ahora esta
// pantalla reutiliza directamente SearchExercisesPage (app-search-exercises,
// la misma que usa routine-builder para buscar ejercicios) en mode="library":
// header/buscador/chips/infinite-scroll idénticos, pero el tap emite
// exerciseSelected en vez de abrir ConfigExercisePage, así que aquí solo
// abrimos ExerciseDetailModalComponent (lectura, sin guardar nada).
@Component({
  selector: 'app-exercise-library',
  templateUrl: 'exercise-library.page.html',
  styleUrls: ['exercise-library.page.scss'],
})
export class ExerciseLibraryPage {
  constructor(private ionicUtilService: IonicUtilService) {}

  public openExerciseDetail(exercise: Exercise): void {
    this.ionicUtilService.showModal({
      component: ExerciseDetailModalComponent,
      componentProps: { exercise },
      cssClass: 'tf-panel-modal',
    });
  }
}
