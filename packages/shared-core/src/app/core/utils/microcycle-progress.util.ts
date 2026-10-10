// «Microciclo N de M» del resumen de la rutina en uso: el que toca ahora es
// el primero que no está terminado. Antes salía «Microciclo 0 de 1» al
// empezar (contaba los terminados y le restaba uno) (QA 2026-10-09).

interface WorkoutLike {
  date?: unknown;
  rest?: boolean;
  isPlannedRestDay?: boolean;
}

interface SplitLike {
  workouts?: WorkoutLike[] | null;
}

// Terminado = con entrenamientos y todos hechos, saltados o de descanso.
export function isSplitFinished(split: SplitLike | null | undefined): boolean {
  const workouts = split?.workouts || [];
  return workouts.length > 0 && workouts.every((workout) => !!workout?.date || !!workout?.rest || !!workout?.isPlannedRestDay);
}

/** Número (desde 1) del microciclo en curso; con todos terminados, el último. 0 sin microciclos. */
export function currentMicrocycleNumber(splits: SplitLike[] | null | undefined): number {
  const list = splits || [];
  if (!list.length) return 0;
  const done = list.filter(isSplitFinished).length;
  return Math.min(done + 1, list.length);
}
