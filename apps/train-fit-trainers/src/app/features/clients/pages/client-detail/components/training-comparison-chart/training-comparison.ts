import type { BlockExerciseProgress, BlockMuscleGroup, TrainingBlock, TrainingComparisonMetric } from '../../models/client-progress.model';

export interface ComparisonRow {
  key: string;
  label: string;
  unit: string;
  a: number | null;
  b: number | null;
  textA?: string;
  textB?: string;
  direction: 'up' | 'down' | 'flat' | 'missing';
  delta: string;
  percentage: string | null;
}

export function formatMetric(value: number | null | undefined): string {
  return value == null || !Number.isFinite(value) ? '—' : value.toLocaleString('es-ES', { maximumFractionDigits: 1 });
}

export function comparisonRow(key: string, label: string, unit: string, a?: number | null, b?: number | null): ComparisonRow {
  const left = a != null && Number.isFinite(a) ? a : null;
  const right = b != null && Number.isFinite(b) ? b : null;
  const difference = left == null || right == null ? null : Math.round((right - left) * 10) / 10;
  return {
    key, label, unit, a: left, b: right,
    direction: difference == null ? 'missing' : difference > 0 ? 'up' : difference < 0 ? 'down' : 'flat',
    delta: difference == null ? 'Sin comparación' : difference === 0 ? '=' : `${difference > 0 ? '↑ +' : '↓ −'}${formatMetric(Math.abs(difference))}${unit ? ' ' + unit : ''}`,
    percentage: difference == null || !left || difference === 0 ? null : `${difference > 0 ? '+' : '−'}${formatMetric(Math.abs(((right! - left) / left) * 100))}%`,
  };
}

export function blockMetric(block: TrainingBlock | undefined, metric: TrainingComparisonMetric): number | null {
  if (!block) return null;
  if (metric === 'sessions') return block.sessions;
  if (metric === 'sets') return block.sessions ? block.sets / block.sessions : null;
  return block.volumePerSession;
}

function rirValue(exercise?: BlockExerciseProgress): number | null {
  const values = exercise?.bestSet?.rir;
  if (!values?.length || values.some((value) => value !== values[0]) || values[0] < 0) return null;
  return values[0];
}

function rirText(exercise?: BlockExerciseProgress): string {
  return exercise?.bestSet?.rir?.map((value) => value === -1 ? 'Fallo' : formatMetric(value)).join('–') || '—';
}

export function exerciseRows(a?: BlockExerciseProgress, b?: BlockExerciseProgress): ComparisonRow[] {
  const rir = comparisonRow('rir', 'RIR · misma serie', '', rirValue(a), rirValue(b));
  rir.textA = rirText(a);
  rir.textB = rirText(b);
  // El RIR es una escala: mostrar cambio absoluto, nunca un porcentaje.
  rir.percentage = null;
  return [
    comparisonRow('load', 'Carga máxima', 'kg', a?.maxWeight, b?.maxWeight),
    comparisonRow('reps', 'Reps · serie de mayor carga', '', a?.bestSet?.reps, b?.bestSet?.reps),
    rir,
    comparisonRow('sets', 'Series realizadas', '', a?.sets, b?.sets),
    comparisonRow('totalReps', 'Repeticiones totales', '', a?.totalReps, b?.totalReps),
    comparisonRow('volume', 'Volumen del ejercicio', 'kg', a?.volume, b?.volume),
  ];
}

export function overviewRows(a?: TrainingBlock, b?: TrainingBlock): ComparisonRow[] {
  return [
    comparisonRow('volume', 'Volumen / sesión', 'kg', blockMetric(a, 'volume'), blockMetric(b, 'volume')),
    comparisonRow('sets', 'Series / sesión', '', blockMetric(a, 'sets'), blockMetric(b, 'sets')),
    comparisonRow('sessions', 'Sesiones registradas', '', a?.sessions, b?.sessions),
    comparisonRow('totalSets', 'Series totales', '', a?.sets, b?.sets),
  ];
}

export function muscleRows(a: BlockMuscleGroup | undefined, b: BlockMuscleGroup | undefined, sessionsA: number, sessionsB: number): ComparisonRow[] {
  const groups = new Set([...(a?.muscleGroups || []), ...(b?.muscleGroups || [])].map((group) => group.group));
  // Un grupo ausente solo es cero cuando existe un desglose con conteos.
  const value = (block: BlockMuscleGroup | undefined, group: string, sessions: number): number | null => {
    if (!block || !sessions || block.muscleGroups.some((item) => item.sets == null)) return null;
    return (block.muscleGroups.find((item) => item.group === group)?.sets ?? 0) / sessions;
  };
  return [...groups].map((group) => comparisonRow(group, group, '', value(a, group, sessionsA), value(b, group, sessionsB)))
    .sort((left, right) => Math.max(right.a ?? 0, right.b ?? 0) - Math.max(left.a ?? 0, left.b ?? 0));
}
