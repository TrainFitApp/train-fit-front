// Texto que explica cómo se resuelve el contenido de una fase/ciclo según su
// modo (mismo TemplateMode que DietTemplate.mode, ver diet-template.model.ts
// y docs/domain.md). Se repite en los 3 sitios donde el entrenador elige o
// confirma una fase (empezar fase, aplicar plantilla, siguiente ciclo): sin
// esto, "sequential"/"recurring"/"choice" solo se entendía mirando el
// código, nunca se decía en la propia UI.
export type PhaseMode = 'sequential' | 'recurring' | 'choice';

export function phaseModeLabel(
  mode: PhaseMode | null | undefined,
  daysCount: number | null | undefined
): string {
  if (mode === 'recurring') return 'Por días de la semana';
  if (mode === 'choice') return 'El cliente elige cada día';
  const n: number | null = daysCount && daysCount > 0 ? daysCount : null;
  return n ? `Fase de ${n} día${n === 1 ? '' : 's'}` : 'Fase por días';
}

export function phaseModeHint(
  mode: PhaseMode | null | undefined,
  daysCount: number | null | undefined
): string {
  if (mode === 'recurring') {
    return 'El patrón asignado a cada día de la semana se repite cada semana natural (lunes a domingo).';
  }
  if (mode === 'choice') {
    return 'No hay días fijos: el cliente elige cada día cuál de los patrones sigue.';
  }
  const n: number | null = daysCount && daysCount > 0 ? daysCount : null;
  return n
    ? `El bloque de ${n} día${n === 1 ? '' : 's'} se repite seguido desde la fecha de inicio.`
    : 'El bloque de días se repite seguido desde la fecha de inicio.';
}
