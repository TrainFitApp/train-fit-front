import { Workout } from 'src/app/core/models/workout';
import { Set } from 'src/app/core/models/set';

export interface WorkoutSummarySet {
  index: number;
  primary: string;
  secondary: string;
  badges: string[];
}

export interface WorkoutSummaryExercise {
  name: string;
  sets: WorkoutSummarySet[];
}

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
  exercises: WorkoutSummaryExercise[];
}

function formatNumber(value: number, digits: string = '1.0-1'): string {
  if (!Number.isFinite(value)) return '0';
  const maxDecimals = Number(digits.split('-')[1] || 1);
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

function formatRir(rir: number | number[] | undefined): string {
  if (rir === undefined || rir === null) return '';
  if (Array.isArray(rir)) {
    return rir.filter((value) => value !== undefined && value !== null).join('/');
  }
  return String(rir);
}

function getSetOrder(set: Set, fallbackIndex: number): number {
  return set.displayOrder ?? set.order ?? fallbackIndex + 1;
}

function buildSetSummary(
  set: Set,
  fallbackIndex: number,
  isCardio: boolean,
  isIsometric: boolean
): WorkoutSummarySet {
  const badges: string[] = [];
  if (set.drop) badges.push('DS');
  if (set.restPause) badges.push(`RP ${set.restPause}`);

  if (isCardio) {
    const velocity = Number(set.velocity) || 0;
    const distance = Number(set.distance) || 0;
    return {
      index: getSetOrder(set, fallbackIndex),
      primary: set.time || '--',
      secondary: `${formatNumber(velocity)} km/h / ${formatNumber(distance)} km`,
      badges,
    };
  }

  if (isIsometric) {
    return {
      index: getSetOrder(set, fallbackIndex),
      primary: set.time || '--',
      secondary: '',
      badges,
    };
  }

  const weight = Number(set.weight) || 0;
  const reps = Number(set.reps) || 0;
  const rir = formatRir(set.rir);

  return {
    index: getSetOrder(set, fallbackIndex),
    primary: `${formatNumber(weight)} kg x ${formatNumber(reps, '1.0-0')}`,
    secondary: rir ? `${rir} RIR` : '',
    badges,
  };
}

// Pure, reusable across any screen that needs to show a finished workout's
// summary (right after finishing it, or later from a history view like
// mesocycle) - no DI needed, just plain data in, plain data out.
export function buildWorkoutSummary(
  workout: Workout,
  finishedAt: Date
): WorkoutSummary {
  let exercisesCount = 0;
  let setsCount = 0;
  let volumeKg = 0;
  const exercises: WorkoutSummaryExercise[] = [];

  (workout.exercises || []).forEach((customExercise) => {
    const doneSets = (customExercise.sets || [])
      .filter((set) => set.doned)
      .sort((a, b) => getSetOrder(a, 0) - getSetOrder(b, 0));
    if (doneSets.length === 0) return;

    exercisesCount += 1;
    setsCount += doneSets.length;

    const isCardio = Boolean(customExercise.exercise?.isCardio);
    const isIsometric = Boolean(customExercise.exercise?.isIsometric);

    if (!customExercise.exercise?.isCardio) {
      doneSets.forEach((set) => {
        const weight = Number(set.weight) || 0;
        const reps = Number(set.reps) || 0;
        volumeKg += weight * reps;
      });
    }

    exercises.push({
      name: customExercise.exercise?.name || 'Exercise',
      sets: doneSets.map((set, index) =>
        buildSetSummary(set, index, isCardio, isIsometric)
      ),
    });
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
    exercises,
  };
}
