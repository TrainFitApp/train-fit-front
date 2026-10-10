// PURO — qué modos de la barra del Planner tienen sentido con lo que hay en
// la rutina. QA 2026-10-09: con 0 microciclos seguían activos «Alinear
// filas» y «Reordenar microciclos/entrenamientos», que no hacían nada.

export interface ToolbarSplit {
  workouts?: unknown[] | null;
}

const workoutsIn = (split: ToolbarSplit): number => split.workouts?.length || 0;

/** Alinear filas compara la misma fila entre microciclos: hacen falta dos con entrenamientos. */
export function canSyncRows(splits: ToolbarSplit[] | null | undefined): boolean {
  return (splits?.length || 0) >= 2 && splits!.some((split) => workoutsIn(split) > 0);
}

/** Reordenar microciclos: al menos dos. */
export function canReorderWeeks(splits: ToolbarSplit[] | null | undefined): boolean {
  return (splits?.length || 0) >= 2;
}

/** Reordenar entrenamientos: algún microciclo con dos o más (los mueve en toda la fila). */
export function canReorderCards(splits: ToolbarSplit[] | null | undefined): boolean {
  return (splits || []).some((split) => workoutsIn(split) >= 2);
}
