import { CustomExercise } from './customExercise';

export class Workout {
  _id: string;
  name: string;
  notes: string;
  date?: Date;
  cronometer?: Date;
  exercises: CustomExercise[];
}
