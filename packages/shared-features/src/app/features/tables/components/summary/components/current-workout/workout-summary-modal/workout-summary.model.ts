export interface WorkoutSummary {
  workoutName: string;
  // null when startedAt couldn't be determined (workouts started before the
  // chronometer feature existed and finished before ever re-entering the page).
  elapsedMs: number | null;
  exercisesCount: number;
  setsCount: number;
  volumeKg: number;
  finishedAt: Date;
}
