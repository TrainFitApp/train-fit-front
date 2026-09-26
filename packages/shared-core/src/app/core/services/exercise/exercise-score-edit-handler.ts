import { Injectable } from '@angular/core';
import { Exercise } from '../../models/exercise';

// SearchExercisesPage vive en shared-ui (se compila en las 3 apps), pero
// puntuar un ejercicio (ExerciseScoresApiService, ScoreEditorModalComponent)
// es una feature exclusiva de train-fit-trainers ("Mi método") — importarla
// ahí directamente rompería la build de train-fit-front/train-fit-management
// (sus tsconfig no tienen alias para esos ficheros). Esta clase abstracta es
// el punto de extensión: shared-ui la inyecta con @Optional() y solo pinta
// el botón de puntuar si alguien la ha provisto; train-fit-trainers es la
// única app que la provee (ver apps/train-fit-trainers/src/app/app.module.ts),
// con la implementación real que sí puede importar sus propios servicios.
@Injectable()
export abstract class ExerciseScoreEditHandler {
  public abstract editScore(exercise: Exercise, origin?: HTMLElement): void;
}
