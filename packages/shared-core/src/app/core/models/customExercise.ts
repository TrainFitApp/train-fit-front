import { Exercise } from './exercise';
import { Set } from './set';

export class CustomExercise {
  _id: string;
  notes?: string;
  sets: Set[];
  exercise: Exercise;
}
