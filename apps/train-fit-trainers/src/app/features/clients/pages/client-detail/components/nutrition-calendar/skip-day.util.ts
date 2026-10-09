// ¿Se ofrece marcar `date` como día saltado? Solo si cae dentro de una fase de
// dieta, la misma condición que exige el backend
// (diet-phase-dao.js#findCoveringDate: un día sin fase que lo cubra da 400), y
// si no está saltado ya.
export function canSkipDate(
  date: string,
  phases: { startDate: string; endDate: string | null }[],
  alreadySkipped: boolean
): boolean {
  if (!date || alreadySkipped) return false;
  return phases.some((phase) => phase.startDate <= date && (!phase.endDate || phase.endDate >= date));
}
