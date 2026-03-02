import { Workout } from '../../core/models/workout';

export class WorkoutClipboard {
  public workoutClipboard: Workout;
  public workoutToPaste: Workout;

  constructor(workoutClipboard: Workout, workoutToPaste: Workout) {
    this.workoutClipboard = workoutClipboard;
    this.workoutToPaste = workoutToPaste;
  }
}
