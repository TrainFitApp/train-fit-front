import { localizeList } from '../i18n/localized-catalog';

// Movimiento 6 Coach Pro — el método del entrenador, en números.
//
// Espejo EXACTO de train-fit-back/components/exerciseScores/
// exercise-score-catalog.js (backend) — comprobado por
// exercise-score-catalog.test.js.
//
// QUÉ ES ESTO
// Cuánto estimula cada ejercicio a cada músculo (IEM) y cuánto castiga a
// cada articulación (IEA). Lo puntúa EL ENTRENADOR, no la app: dos
// profesionales con la misma sentadilla le dan valores distintos según su
// escuela, y una puntuación "oficial" sería inventarse un criterio que nadie
// le ha pedido a la aplicación.

export interface ExerciseScoreEntry {
  name: string;
  score: number;
}

export interface ExerciseScore {
  _id?: string;
  exerciseId: string;
  muscleScores: ExerciseScoreEntry[];
  jointScores: ExerciseScoreEntry[];
  // Duración estimada de UNA serie, sin descanso. null = se usa el valor por
  // defecto al estimar la sesión.
  secondsPerSet: number | null;
}

// Escala 0-3 y no 0-10: puntuar 200 ejercicios × 16 músculos es un trabajo
// enorme, y cuantos más niveles haya menos consistente será el criterio del
// propio entrenador entre el ejercicio nº 3 y el nº 180.
export const SCORE_MIN = 0;
export const SCORE_MAX = 3;

export const MUSCLE_SCORE_ANCHORS: string[] = [
  'No lo trabaja',
  'Lo trabaja de forma secundaria',
  'Lo trabaja de forma importante',
  'Es el objetivo principal del ejercicio',
];

export const JOINT_SCORE_ANCHORS: string[] = [
  'No la compromete',
  'Carga baja, tolerable a diario',
  'Carga alta: hay que dosificarla',
  'Muy exigente: no encadenar sesiones',
];

// Las articulaciones son datos guardados (se traducen al pintar con
// translateDb); las anclas solo se muestran.
localizeList(MUSCLE_SCORE_ANCHORS, 'EXERCISE_SCORE.MUSCLE_ANCHORS');
localizeList(JOINT_SCORE_ANCHORS, 'EXERCISE_SCORE.JOINT_ANCHORS');

export const SCORE_LEVELS: number[] = Array.from(
  { length: SCORE_MAX - SCORE_MIN + 1 },
  (_unused, index) => SCORE_MIN + index
);

// Los grupos con puntuación 0 no se guardan (la ausencia ya significa cero),
// así que la interfaz necesita rellenar el hueco al pintar la rejilla.
export function scoreFor(entries: ExerciseScoreEntry[] | undefined, name: string): number {
  return entries?.find((entry) => entry.name === name)?.score ?? 0;
}
