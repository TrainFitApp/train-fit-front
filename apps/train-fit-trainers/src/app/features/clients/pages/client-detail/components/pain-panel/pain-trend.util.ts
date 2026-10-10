// PURO — hacia dónde va el dolor de una zona. QA 2026-10-09: con un solo
// registro salía «Igual», y comparar el último día con el peor del periodo
// nunca podía dar «peor» (el peor siempre es ≥ el último).

export type PainTrend = 'mejor' | 'peor' | 'igual';

/** El último registro frente al anterior; con menos de dos no hay tendencia. */
export function painTrend(latest: number | null | undefined, previous: number | null | undefined): PainTrend | null {
  if (latest == null || previous == null) return null;
  if (latest < previous) return 'mejor';
  if (latest > previous) return 'peor';
  return 'igual';
}
