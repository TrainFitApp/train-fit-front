import { CustomExercise } from 'src/app/core/models/customExercise';

export class ExerciseClipboard {
  public sourceWorkoutId: string;
  public selectedExercises: CustomExercise[] = [];
  public isFullWorkout: boolean = true;

  constructor(sourceWorkoutId: string, exercises: CustomExercise[]) {
    this.sourceWorkoutId = sourceWorkoutId;
    this.selectedExercises = [...exercises];
    this.isFullWorkout =
      exercises.length > 0;
  }

  public get exerciseCount(): number {
    return this.selectedExercises.length;
  }

  public hasSelection(): boolean {
    return this.selectedExercises.length > 0;
  }
}
