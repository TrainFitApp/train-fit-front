import { Component } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';
import { ExerciseEditorModalComponent } from 'src/app/shared/components/exercise-editor-modal/exercise-editor-modal.component';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ExerciseDetailModalComponent } from './components/exercise-detail-modal/exercise-detail-modal.component';

// TASK-042 (MASTER_BACKLOG.md) — antes el catálogo de ejercicios solo era
// alcanzable como modal picker dentro de construir un workout. Ahora esta
// pantalla reutiliza directamente SearchExercisesPage (app-search-exercises,
// la misma que usa routine-builder para buscar ejercicios) en mode="library":
// header/buscador/chips/infinite-scroll idénticos, pero el tap emite
// exerciseSelected en vez de abrir ConfigExercisePage.
//
// Ejercicios propios de entrenador (MASTER_BACKLOG) — si el ejercicio
// tocado es de este entrenador, abre el editor completo (nombre, vídeo,
// músculos, borrar); si es del catálogo del sistema, sigue abriendo el
// detalle de solo lectura de siempre.
@Component({
  selector: 'app-exercise-library',
  templateUrl: 'exercise-library.page.html',
  styleUrls: ['exercise-library.page.scss'],
})
export class ExerciseLibraryPage {
  // Truco de refresco: SearchExercisesPage cachea su propia lista y no
  // expone un método público para forzar un re-fetch desde fuera. Destruir
  // y recrear el componente (toggle de *ngIf) re-ejecuta su ngOnInit, que sí
  // vuelve a buscar — más simple que ensanchar la API pública de un
  // componente ya muy usado solo para este caso.
  public showList = true;

  constructor(
    private ionicUtilService: IonicUtilService,
    private userService: UserService,
  ) {}

  public openExerciseDetail(exercise: Exercise): void {
    const currentUserId = this.userService.getLocalUser?._id;
    const isOwnExercise = !!exercise.userId && exercise.userId === currentUserId;

    if (isOwnExercise) {
      this.openExerciseEditor(exercise);
      return;
    }

    this.ionicUtilService.showModal({
      component: ExerciseDetailModalComponent,
      componentProps: { exercise },
      cssClass: 'tf-panel-modal',
    });
  }

  private openExerciseEditor(exercise: Exercise): void {
    this.ionicUtilService
      .showModal({
        component: ExerciseEditorModalComponent,
        componentProps: { exercise, user: this.userService.getLocalUser },
        cssClass: ['exercise-editor-modal', 'tf-panel-modal'],
      })
      .then((res) => {
        if (res.role === 'confirm' || res.role === 'delete') {
          this.refreshList();
        }
      });
  }

  private refreshList(): void {
    this.showList = false;
    setTimeout(() => (this.showList = true), 0);
  }
}
