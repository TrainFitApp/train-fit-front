import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Exercise } from 'src/app/core/models/exercise';
import { ExerciseScoreEditHandler } from 'src/app/core/services/exercise/exercise-score-edit-handler';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ExerciseScore } from 'src/app/core/constants/exercise-score';
import { ExerciseScoresApiService, ScoreCatalog } from './exercise-scores-api.service';
import { ScoreEditorModalComponent } from '../components/score-editor-modal/score-editor-modal.component';

// Implementación real de ExerciseScoreEditHandler (ver ese fichero para el
// porqué de la clase abstracta) — provista solo en AppModule de esta app
// (train-fit-trainers/src/app/app.module.ts), nunca importada desde
// shared-ui/shared-features directamente.
//
// Mismo criterio exacto que ExerciseScoresPage#onExerciseSelected/openEditor:
// se reutiliza esa lógica tal cual (puntuación ya guardada > sugerencia por
// patrón de movimiento > editor en blanco) para que puntuar desde Configurar
// ejercicio se comporte igual que puntuar desde "Mi método".
@Injectable({ providedIn: 'root' })
export class TrainerExerciseScoreEditHandlerService extends ExerciseScoreEditHandler {
  private catalog: ScoreCatalog | null = null;

  constructor(
    private exerciseScoresApi: ExerciseScoresApiService,
    private ionicUtilService: IonicUtilService
  ) {
    super();
  }

  public editScore(exercise: Exercise): void {
    void this.open(exercise);
  }

  private async open(exercise: Exercise): Promise<void> {
    if (!this.catalog) {
      this.catalog = await lastValueFrom(this.exerciseScoresApi.getCatalog()).catch(() => null);
    }

    const [mine, defaultScore] = await Promise.all([
      lastValueFrom(this.exerciseScoresApi.getMine()).catch(() => [] as ExerciseScore[]),
      lastValueFrom(this.exerciseScoresApi.getDefault(exercise._id)).catch(() => null),
    ]);

    const existing =
      (mine || []).find((score) => this.scoreExerciseId(score) === exercise._id) || null;
    const isDefault = !existing && !!defaultScore;
    const initial = existing || (defaultScore ? { ...defaultScore, secondsPerSet: null } : null);

    await this.ionicUtilService.showModal({
      component: ScoreEditorModalComponent,
      componentProps: {
        exerciseId: exercise._id,
        exerciseName: exercise.name,
        existing: initial,
        isDefault,
        catalog: this.catalog,
      },
      cssClass: 'tf-panel-modal',
    });
  }

  // exerciseId viene poblado por Mongoose ({_id, name}) en getMine(), pero
  // tipado como string en ExerciseScore — mismo cast que ya hace
  // exercise-scores.page.ts#toRow para leerlo.
  private scoreExerciseId(score: ExerciseScore): string | undefined {
    const id = (score as unknown as { exerciseId?: { _id?: string } | string }).exerciseId;
    return typeof id === 'string' ? id : id?._id;
  }
}
