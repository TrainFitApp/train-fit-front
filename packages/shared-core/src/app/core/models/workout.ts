import { CustomExercise } from './customExercise';

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
  exercises: CustomExercise[];
}
