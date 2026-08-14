import { WorkoutTemplateSet } from 'src/app/core/models/workout-template';

// Builder de plantillas — genera series de PRESCRIPCIÓN (no hay Set real
// persistido durante la autoría, todo vive en memoria hasta "Guardar") a
// partir de un esquema compacto (series × reps/RIR, o series × tiempo para
// isométricos, o series × tiempo+distancia para cardio). Reimplementación
// local del generador que existía en exercise-scheme-editor (quitado de la
// card del Planner por ser redundante con el panel lateral existente) — aquí
// no compite con ningún otro flujo: es la única forma de prescribir series
// en una plantilla nueva.

export interface NormalScheme {
  kind: 'normal';
  count: number;
  repsMin: number;
  repsMax: number;
  rirMin: number;
  rirMax: number;
}

export interface IsometricScheme {
  kind: 'isometric';
  count: number;
  expectedTime: string;
}

export interface CardioScheme {
  kind: 'cardio';
  count: number;
  expectedTime: string;
  expectedDistance: number | null;
}

export type ExerciseScheme = NormalScheme | IsometricScheme | CardioScheme;

interface ExerciseTypeFlags {
  isCardio?: boolean;
  isIsometric?: boolean;
}

export function defaultSchemeFor(exercise: ExerciseTypeFlags | undefined): ExerciseScheme {
  if (exercise?.isCardio) {
    return { kind: 'cardio', count: 3, expectedTime: '', expectedDistance: null };
  }
  if (exercise?.isIsometric) {
    return { kind: 'isometric', count: 3, expectedTime: '' };
  }
  return { kind: 'normal', count: 3, repsMin: 8, repsMax: 12, rirMin: 1, rirMax: 2 };
}

// Reconstruye un esquema editable a partir de series ya existentes (al abrir
// una plantilla guardada) — toma la primera serie como representativa, mismo
// criterio que schemeFromExistingSets en el componente ya borrado.
export function schemeFromExistingSets(
  sets: WorkoutTemplateSet[] | undefined,
  exercise: ExerciseTypeFlags | undefined
): ExerciseScheme {
  const list = sets || [];
  if (!list.length) return defaultSchemeFor(exercise);

  const first = list[0];

  if (exercise?.isCardio) {
    return {
      kind: 'cardio',
      count: list.length,
      expectedTime: first.expectedTime || '',
      expectedDistance: first.expectedDistance ?? null,
    };
  }

  if (exercise?.isIsometric) {
    return {
      kind: 'isometric',
      count: list.length,
      expectedTime: first.expectedTime || '',
    };
  }

  const reps = first.expectedReps || [];
  const rir = first.expectedRir || [];
  return {
    kind: 'normal',
    count: list.length,
    repsMin: reps[0] ?? 8,
    repsMax: reps[1] ?? reps[0] ?? 12,
    rirMin: rir[0] ?? 1,
    rirMax: rir[1] ?? rir[0] ?? 2,
  };
}

export function buildSetsFromScheme(scheme: ExerciseScheme): WorkoutTemplateSet[] {
  const count = Math.max(1, Math.min(20, Math.round(scheme.count) || 1));

  if (scheme.kind === 'cardio') {
    const expectedTime = (scheme.expectedTime || '').trim();
    const expectedDistance = scheme.expectedDistance ?? null;
    return Array.from({ length: count }, () => ({
      expectedReps: [],
      expectedRir: [],
      expectedTime,
      expectedDistance,
    }));
  }

  if (scheme.kind === 'isometric') {
    const expectedTime = (scheme.expectedTime || '').trim();
    return Array.from({ length: count }, () => ({
      expectedReps: [],
      expectedRir: [],
      expectedTime,
      expectedDistance: null,
    }));
  }

  const repsMin = Math.max(0, Math.round(scheme.repsMin) || 0);
  const repsMax = Math.max(repsMin, Math.round(scheme.repsMax) || repsMin);
  const rirMin = Number.isFinite(scheme.rirMin) ? Math.round(scheme.rirMin) : 0;
  const rirMax = Math.max(rirMin, Number.isFinite(scheme.rirMax) ? Math.round(scheme.rirMax) : rirMin);

  return Array.from({ length: count }, () => ({
    expectedReps: [repsMin, repsMax],
    expectedRir: [rirMin, rirMax],
    expectedTime: '',
    expectedDistance: null,
  }));
}

export function schemeSummary(scheme: ExerciseScheme): string {
  if (scheme.kind === 'cardio') {
    const time = scheme.expectedTime || '—';
    const distance = scheme.expectedDistance ? ` · ${scheme.expectedDistance} km` : '';
    return `${scheme.count} × ${time}${distance}`;
  }
  if (scheme.kind === 'isometric') {
    return `${scheme.count} × ${scheme.expectedTime || '—'}`;
  }
  return `${scheme.count} × ${scheme.repsMin}-${scheme.repsMax} reps · RIR ${scheme.rirMin}-${scheme.rirMax}`;
}
