import { Workout } from 'src/app/core/models/workout';

export interface WorkoutSummary {
  workoutName: string;
  // null when startedAt couldn't be determined (workouts started before the
  // chronometer feature existed and finished before ever re-entering the page).
  elapsedMs: number | null;
  exercisesCount: number;
  exercisesTotal: number;
  setsCount: number;
  volumeKg: number;
  finishedAt: Date;
}

// Pure, reusable across any screen that needs to show a finished workout's
// summary (right after finishing it, or later from a history view like
// mesocycle) — no DI needed, just plain data in, plain data out.
export function buildWorkoutSummary(
  workout: Workout,
  finishedAt: Date
): WorkoutSummary {
  let exercisesCount = 0;
  let setsCount = 0;
  let volumeKg = 0;

  (workout.exercises || []).forEach((customExercise) => {
    const doneSets = (customExercise.sets || []).filter((set) => set.doned);
    if (doneSets.length === 0) return;

    exercisesCount += 1;
    setsCount += doneSets.length;

    if (!customExercise.exercise?.isCardio) {
      doneSets.forEach((set) => {
        const weight = Number(set.weight) || 0;
        const reps = Number(set.reps) || 0;
        volumeKg += weight * reps;
      });
    }
  });

  const elapsedMs = workout.startedAt
    ? Math.max(0, finishedAt.getTime() - new Date(workout.startedAt).getTime())
    : null;

  return {
    workoutName: workout.name,
    elapsedMs,
    exercisesCount,
    exercisesTotal: (workout.exercises || []).length,
    setsCount,
    volumeKg: Math.round(volumeKg),
    finishedAt,
  };
}
