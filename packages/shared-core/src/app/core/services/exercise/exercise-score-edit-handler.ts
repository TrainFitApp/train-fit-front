import { Injectable } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { ScoreHighlights } from '../../constants/exercise-score';

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
  // Resuelve al cerrarse el editor (se haya guardado o no): quien lo abrió
  // vuelve a pedir el resumen para enseñar el estado nuevo.
  public abstract editScore(exercise: Exercise, origin?: HTMLElement): Promise<void>;

  // Cómo está puntuado el ejercicio para este entrenador, para enseñarlo en
  // "Configurar ejercicio" sin tener que abrir el editor.
  public abstract getSummary(exercise: Exercise): Promise<ExerciseScoreSummary>;
}

// 'mine': puntuación propia guardada. 'suggested': no hay propia, pero cuenta
// la sugerencia por su patrón de movimiento. 'none': no cuenta en la carga
// de la sesión ni en el estrés articular.
export type ExerciseScoreState = 'none' | 'suggested' | 'mine';

export interface ExerciseScoreSummary extends ScoreHighlights {
  state: ExerciseScoreState;
}
