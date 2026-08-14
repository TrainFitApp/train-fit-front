import { Exercise } from './exercise';
import { Set } from './set';

export class CustomExercise {
  _id: string;
  notes?: string;
  order?: number;
  sets: Set[];
  exercise: Exercise;
  // Rediseño de entrenamiento Fase B — apunta al _id de un elemento de
  // Workout.blocks[] (subdocumento del Workout padre). null/ausente =
  // ejercicio suelto, sin agrupar.
  blockId?: string | null;
}
