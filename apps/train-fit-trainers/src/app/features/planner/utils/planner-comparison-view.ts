import { Split } from 'src/app/core/models/split';
import { normalizeRirValue } from 'src/app/core/models/rir';
import { countDoneSets, sumSets } from './planner-metrics';
import { CompareExerciseRow, PrescriptionSummary } from './planner-compare';

export type ComparisonMode = 'plan' | 'done';
export type MetricKey = 'weight' | 'reps' | 'sets' | 'rir';
export interface MetricComparison {
  key: string;
  label: string;
  a: string;
  b: string;
  delta: string;
  percent: string | null;
  direction: 'up' | 'down' | 'flat' | 'unknown';
}

const numberFormat = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 });
export const formatMetric = (value: number): string => numberFormat.format(value);

export function metricComparison(
  key: string, label: string, a: number | null, b: number | null, unit = '', percentage = true
): MetricComparison {
  const delta = a === null || b === null ? null : Math.round((b - a) * 100) / 100;
  const signed = (value: number) => `${value > 0 ? '+' : value < 0 ? '−' : ''}${formatMetric(Math.abs(value))}`;
  return {
    key, label,
    a: a === null ? '—' : `${formatMetric(a)}${unit}`,
    b: b === null ? '—' : `${formatMetric(b)}${unit}`,
    delta: delta === null ? 'Sin dato comparable' : `${signed(delta)}${unit}`,
    percent: percentage && a !== null && a > 0 && delta !== null ? `${signed(delta / a * 100)}%` : null,
    direction: delta === null ? 'unknown' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat',
  };
}

// Solo lectura: no reutilizar reps/RIR pautados como si fueran registros del cliente.
export function comparisonSnapshot(split: Split | null, mode: ComparisonMode): Split | null {
  if (!split || mode === 'plan') return split;
  return {
    ...split,
    workouts: (split.workouts || []).map((workout) => ({
      ...workout,
      exercises: (workout.exercises || []).map((exercise) => ({
        ...exercise,
        notes: undefined,
        sets: (exercise.sets || []).filter((set) => set.doned === true).map((set) => ({
          ...set,
          expectedReps: typeof set.reps === 'number' && Number.isFinite(set.reps) ? [set.reps] : [],
          expectedRir: normalizeRirValue(set.rir) || [],
          expectedTime: set.time,
          expectedDistance: set.distance,
          restSeconds: undefined,
        })),
      })),
    })),
  };
}

export function overviewMetrics(a: Split | null, b: Split | null): MetricComparison[] {
  const rirStats = (split: Split | null) => {
    const ranges = (split?.workouts || []).flatMap((workout) => workout.exercises || [])
      .filter((exercise) => !exercise.exercise?.isCardio && !exercise.exercise?.isIsometric)
      .flatMap((exercise) => exercise.sets || []).map((set) => normalizeRirValue(set.expectedRir));
    const values = ranges.filter((range): range is number[] => !!range && !range.includes(-1))
      .map((range) => range.reduce((sum, value) => sum + value, 0) / range.length);
    return { mean: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null,
      failure: ranges.filter((range) => range?.includes(-1)).length };
  };
  const rirA = rirStats(a);
  const rirB = rirStats(b);
  const days = (split: Split | null) => (split?.workouts || []).filter((workout) =>
    !workout.isPlannedRestDay && workout.exercises?.some((exercise) => exercise.sets?.length)
  ).length;
  return [
    metricComparison('sets', 'Series', sumSets(a), sumSets(b)),
    metricComparison('rir', 'RIR medio', rirA.mean, rirB.mean, '', false),
    metricComparison('failure', 'Series al fallo', rirA.failure, rirB.failure, '', false),
    metricComparison('days', 'Sesiones con series', days(a), days(b), '', false),
  ];
}

export function completionSummary(split: Split | null): { done: number; total: number; percent: number } {
  const total = sumSets(split);
  const done = countDoneSets(split);
  return { done, total, percent: total ? Math.round(done / total * 100) : 0 };
}

export function exerciseMetrics(row: CompareExerciseRow): MetricComparison[] {
  const value = (summary: PrescriptionSummary | null, key: MetricKey): number | null => {
    if (!summary) return null;
    if (key === 'sets') return summary.sets;
    if (key === 'weight') return summary.topWeight;
    return key === 'reps' ? summary.uniformReps : summary.uniformRir;
  };
  return (['weight', 'reps', 'sets', 'rir'] as const).map((key) => {
    const result = metricComparison(key, { weight: 'Carga', reps: 'Reps', sets: 'Series', rir: 'RIR' }[key],
      value(row.a, key), value(row.b, key), key === 'weight' ? ' kg' : '', key !== 'rir');
    if (key !== 'sets') {
      result.a = row.a?.[key] || '—';
      result.b = row.b?.[key] || '—';
    }
    if (result.direction === 'unknown') {
      result.delta = result.a === result.b && result.a !== '—' ? 'Igual' :
        result.a === '—' || result.b === '—' ? '—' : 'Ver series';
    }
    return result;
  });
}
