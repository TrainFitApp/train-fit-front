import { Workout } from 'src/app/core/models/workout';
import { Set } from 'src/app/core/models/set';
import { formatRirValue, isRirFail, rirFailLabel } from 'src/app/core/models/rir';
import { localizeProp } from 'src/app/core/i18n/localized-catalog';
import { formatLocalNumber } from 'src/app/core/utils/local-number.util';

// Nombre de reserva de un ejercicio borrado del catálogo, en el idioma del usuario.
const FALLBACK = { exerciseName: 'Ejercicio' };
localizeProp(FALLBACK, 'exerciseName', 'WORKOUT_NOTIFICATION.EXERCISE');

// Mismo mapeo de color que el resto de la app: RP azul, DS rojo, FALLO
// primary (ver set.component.scss / statistics.page.scss).
export interface WorkoutSummaryBadge {
  label: string;
  type: 'drop' | 'restPause' | 'fail';
}

export interface WorkoutSummarySet {
  index: number;
  primary: string;
  secondary: string;
  badges: WorkoutSummaryBadge[];
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
  incompleteExerciseNames: string[];
}

function formatNumber(value: number, digits: string = '1.0-1'): string {
  if (!Number.isFinite(value)) return '0';
  const maxDecimals = Number(digits.split('-')[1] || 1);
  return formatLocalNumber(value, { maxDecimals });
}

function getSetOrder(set: Set, fallbackIndex: number): number {
  return (set.displayOrder ?? set.order ?? fallbackIndex) + 1;
}

function buildSetSummary(
  set: Set,
  fallbackIndex: number,
  isCardio: boolean,
  isIsometric: boolean
): WorkoutSummarySet {
  const badges: WorkoutSummaryBadge[] = [];
  if (set.drop) badges.push({ label: 'DS', type: 'drop' });
  if (set.restPause) badges.push({ label: `RP ${set.restPause}`, type: 'restPause' });
  if (!isCardio && !isIsometric && isRirFail(set.rir)) {
    badges.push({ label: rirFailLabel(), type: 'fail' });
  }

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

  return {
    index: getSetOrder(set, fallbackIndex),
    primary: `${formatNumber(weight)} kg x ${formatNumber(reps, '1.0-0')}`,
    secondary: formatRirValue(set.rir, { includeUnit: true, emptyLabel: '' }),
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
  const incompleteExerciseNames: string[] = [];

  (workout.exercises || []).forEach((customExercise) => {
    const doneSets = (customExercise.sets || [])
      .filter((set) => set.doned)
      .sort((a, b) => getSetOrder(a, 0) - getSetOrder(b, 0));
    if (doneSets.length === 0) {
      incompleteExerciseNames.push(
        customExercise.exercise?.name || FALLBACK.exerciseName
      );
      return;
    }

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
      name: customExercise.exercise?.name || FALLBACK.exerciseName,
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
    incompleteExerciseNames,
  };
}
