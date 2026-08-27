import { Exercise } from './exercise';
import { Set } from './set';

export class CustomExercise {
  _id: string;
  // Movimiento 2 Coach Pro — `notes` es LA NOTA DEL ENTRENADOR (la
  // indicación que acompaña al ejercicio) y `clientNotes` la que escribe el
  // cliente durante la sesión. Antes compartían campo y el último en
  // escribir borraba lo del otro. Ver custom-exercise-schema.js.
  notes?: string;
  clientNotes?: string;
  order?: number;
  sets: Set[];
  exercise: Exercise;
  // Rediseño de entrenamiento Fase B — apunta al _id de un elemento de
  // Workout.blocks[] (subdocumento del Workout padre). null/ausente =
  // ejercicio suelto, sin agrupar.
  blockId?: string | null;
}
