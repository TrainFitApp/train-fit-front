import { Split } from '../models/split';
import { Workout } from '../models/workout';
import { localIsoDate } from './local-date.util';

// Lo siguiente que le toca al cliente en su rutina: el siguiente entreno
// pendiente o uno de los descansos pautados que lo preceden.
//
// Las filas de la rutina se leen como días seguidos, contados desde el día
// del último entreno hecho. Con Piernas hecho hoy y un descanso detrás, lo
// siguiente es el descanso; mañana, que es el descanso, lo siguiente ya es
// el entreno de después (aunque esté en el microciclo siguiente). Si entrena
// más tarde, los descansos ya han pasado y lo siguiente es el entreno: nunca
// se salta uno. Sin ningún entreno con fecha no hay desde dónde contar, así
// que lo siguiente es el entreno.

const DAY_MS = 24 * 60 * 60 * 1000;

// Mismo criterio que UtilService#getCurrentPlayingSplit.
function isPending(workout: Workout): boolean {
  return !workout.date && !workout.rest && !workout.isPlannedRestDay;
}

function isoToUtcMs(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((isoToUtcMs(toIso) - isoToUtcMs(fromIso)) / DAY_MS);
}

// Día (del dispositivo) del último entreno hecho; un entreno saltado no
// guarda fecha y no cuenta.
function lastTrainedDay(rows: Workout[]): string | null {
  return rows.reduce<string | null>((latest, workout) => {
    if (!workout.date || workout.isPlannedRestDay) return latest;
    const day = localIsoDate(workout.date);
    return !latest || day > latest ? day : latest;
  }, null);
}

export function nextTrainingDay(
  splits: Split[] | null | undefined,
  today: string = localIsoDate(),
): Workout | null {
  const rows = (splits || []).flatMap((split) => split.workouts || []);
  const nextIndex = rows.findIndex(isPending);
  if (nextIndex < 0) return null;
  const next = rows[nextIndex];

  // Descansos seguidos justo antes del siguiente entreno, aunque crucen de
  // un microciclo al siguiente.
  let restStart = nextIndex;
  while (restStart > 0 && rows[restStart - 1].isPlannedRestDay) restStart--;
  const rests = rows.slice(restStart, nextIndex);

  const lastDay = lastTrainedDay(rows);
  if (!rests.length || !lastDay) return next;

  // Días desde el último entreno: 0 si entrenó hoy, y hoy es el descanso
  // número `elapsed`. Lo siguiente es la fila de después. Un entreno con
  // fecha "futura" (viaje entre zonas) cuenta como de hoy.
  const elapsed = Math.max(0, daysBetween(lastDay, today));
  return elapsed < rests.length ? rests[elapsed] : next;
}
