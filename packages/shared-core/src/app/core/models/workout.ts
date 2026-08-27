import { CustomExercise } from './customExercise';
import { SorenessEntry } from '../constants/soreness';

// Rediseño de entrenamiento Fase B — bloques/superseries reintroducidos,
// esta vez consumidos de verdad en current-workout.page.html (cliente real)
// y workout.component.html (editor real del entrenador). Solo metadata de
// agrupación — las exercises ya existen como CustomExercise independientes,
// cada una apunta a un bloque vía CustomExercise.blockId.
export type WorkoutBlockType =
  | 'straight'
  | 'superset'
  | 'circuit'
  | 'warmup'
  | 'finisher';

export class WorkoutBlock {
  _id: string;
  name?: string;
  type: WorkoutBlockType;
  order: number;
  rounds?: number | null;
  restBetweenExercises?: number | null;
  restBetweenRounds?: number | null;
  instructions?: string;
}

export class Workout {
  _id: string;
  name: string;
  notes: string;
  date?: Date | null;
  cronometer?: Date;
  // Set once, the moment the workout truly starts (first "play"). Combined
  // with `date` (finish timestamp, null while in progress) this derives the
  // elapsed time as `(date ?? now) - startedAt` — no interval-accumulated
  // counter, so it survives app kills/backgrounding/navigation untouched.
  startedAt?: Date | null;
  // True when the user explicitly skipped this training day. Mutually
  // exclusive with `date`: a skipped workout is never marked as finished.
  rest?: boolean;
  blocks?: WorkoutBlock[];
  exercises: CustomExercise[];
  // MVP-trainers F18 — pulso opcional de readiness/esfuerzo por sesión (1-5),
  // visible para el profesional junto al historial de entrenamientos (F09).
  readinessPre?: number | null;
  perceivedEffortPost?: number | null;
  // Movimiento 2 Coach Pro — agujetas al LLEGAR a la sesión, por grupo
  // muscular. Solo los grupos marcados por encima de "nada"; vacío = nada
  // reportado. Ver constants/soreness.ts para por qué se pregunta antes de
  // entrenar y no después.
  sorenessPre?: SorenessEntry[];
}
