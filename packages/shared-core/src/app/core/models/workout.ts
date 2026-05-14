import { CustomExercise } from './customExercise';

export class Workout {
  _id: string;
  name: string;
  notes: string;
  date?: Date | null;
  cronometer?: Date;
  exercises: CustomExercise[];
}
