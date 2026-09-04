import { Split } from 'src/app/core/models/split';
import { Workout } from 'src/app/core/models/workout';
import { CustomExercise } from 'src/app/core/models/customExercise';

/**
 * Métricas de microciclo del Planificador, en funciones puras.
 *
 * MOVIMIENTO LITERAL (2026-09) desde los privados de
 * planner-column.component.ts y muscle-volume-panel.component.ts: mismos
 * cuerpos, mismas firmas. Se extraen porque el modal de comparación necesita
 * exactamente los mismos números que ya pinta la columna, y dos copias de
 * estas fórmulas se desincronizarían en cuanto alguien tocara una — con el
 * agravante de que el entrenador vería dos cifras distintas para lo mismo en
 * dos sitios de la misma pantalla.
 *
 * Si alguna vez hace falta un modo "pautado / hecho", se hace en una función
 * NUEVA, nunca cambiando estas firmas: la feature planner no tiene tests, y
 * lo único que hace seguro este movimiento es que sea literal.
 */

// --- Movidas tal cual desde planner-column.component.ts ---

export function midpoint(range: number[] | undefined): number | null {
  if (!range || range.length === 0) return null;
  const a = range[0];
  const b = range[1];
  const hasA = a !== null && a !== undefined && !isNaN(a);
  const hasB = b !== null && b !== undefined && !isNaN(b);
  if (hasA && hasB) return (a + b) / 2;
  if (hasA) return a;
  if (hasB) return b;
  return null;
}

export function sumSets(split: Split | null): number {
  if (!split) return 0;
  return (split.workouts || []).reduce(
    (sum, w) => sum + (w.exercises || []).reduce((s, e) => s + (e.sets?.length || 0), 0),
    0
  );
}

export function averageRir(split: Split | null): number | null {
  if (!split) return null;
  let sum = 0;
  let count = 0;
  for (const workout of split.workouts || []) {
    for (const exercise of workout.exercises || []) {
      for (const set of exercise.sets || []) {
        const rir = midpoint(set.expectedRir);
        // -1 codifica "al fallo" (ver config-exercise.page.ts) — no es un
        // RIR numérico real; contarlo como "0" sesgaría la media hacia más
        // intensidad de la que refleja el dato.
        if (rir === null || rir === -1) continue;
        sum += rir;
        count++;
      }
    }
  }
  return count > 0 ? sum / count : null;
}

export function formatSignedDelta(
  value: number,
  formatMagnitude: (n: number) => string
): string {
  if (Math.abs(value) < 0.05) return '· 0';
  const arrow = value > 0 ? '▲' : '▼';
  const sign = value > 0 ? '+' : '−';
  return `${arrow} ${sign}${formatMagnitude(Math.abs(value))}`;
}

// --- Movida tal cual desde muscle-volume-panel.component.ts ---

// Cada serie cuenta entera para cada grupo muscular PRIMARIO del ejercicio
// (muscleGroups1) — un press banca con 4 series suma 4 a "Pecho" y 4 a
// "Tríceps" si ambos están listados, no 2+2. Es la misma simplificación
// que ya usa el resto de la app al listar "músculos principales" por
// workout (ver WorkoutComponent#getWorkoutMuscleGroups): un reparto
// fraccionario por grupo sería más preciso pero no es un dato que el
// catálogo de ejercicios modele hoy (sin peso relativo entre grupos).
// muscleGroups2 (secundarios) queda fuera a propósito: mezclar primarios y
// secundarios en la misma cuenta diluiría la señal.
export function countByMuscleGroup(split: Split | null): Record<string, number> {
  const counts: Record<string, number> = {};
  if (!split) return counts;

  for (const workout of split.workouts || []) {
    for (const exercise of workout.exercises || []) {
      const setCount = exercise.sets?.length || 0;
      if (!setCount) continue;

      for (const group of exercise.exercise?.muscleGroups1 || []) {
        counts[group] = (counts[group] || 0) + setCount;
      }
    }
  }

  return counts;
}

// Mismo conteo que countByMuscleGroup pero de UN entrenamiento, no de todo
// el microciclo (2026-09): el entrenador necesita ver el reparto real de la
// sesión que está montando, no solo el agregado semanal. Series REALES por
// grupo muscular primario — sin depender de que haya puntuado ejercicios en
// "Mi método", a diferencia del reparto de carga.
export function countWorkoutByMuscleGroup(workout: Workout | null): Record<string, number> {
  if (!workout) return {};
  return countByMuscleGroup({ workouts: [workout] } as Split);
}

// --- Añadidos para el comparador (no tocan las de arriba) ---

// Series realmente ejecutadas. `doned` es el ÚNICO indicador fiable: al
// duplicar un microciclo con "Copia completa" el backend arrastra
// reps/weight/rir del origen y solo borra doned (split-dao.js), así que
// `set.reps != null` NO significa "hecho".
export function countDoneSets(split: Split | null): number {
  if (!split) return 0;
  let done = 0;
  for (const workout of split.workouts || []) {
    for (const exercise of workout.exercises || []) {
      for (const set of exercise.sets || []) {
        if (set.doned === true) done += 1;
      }
    }
  }
  return done;
}

// Series al fallo: no entran en la media de RIR (ver averageRir), así que
// se cuentan aparte o desaparecen del análisis sin dejar rastro.
export function countFailureSets(split: Split | null): number {
  if (!split) return 0;
  let count = 0;
  for (const workout of split.workouts || []) {
    for (const exercise of workout.exercises || []) {
      for (const set of exercise.sets || []) {
        if (set.expectedRir?.[0] === -1) count += 1;
      }
    }
  }
  return count;
}

// Series sin peso comparable (cardio e isométrico): no se pueden leer como
// progresión de carga, así que se cuentan aparte en vez de mezclarlas con
// las de fuerza y hacer parecer que el trabajo bajó.
export function countUnweightedSets(split: Split | null): number {
  if (!split) return 0;
  let count = 0;
  for (const workout of split.workouts || []) {
    for (const exercise of workout.exercises || []) {
      if (!exercise.exercise?.isCardio && !exercise.exercise?.isIsometric) continue;
      count += exercise.sets?.length || 0;
    }
  }
  return count;
}

// Días con trabajo de verdad: los descansos pautados no cuentan como
// entrenamiento aunque ocupen una fila del microciclo.
export function countTrainableDays(split: Split | null): number {
  if (!split) return 0;
  return (split.workouts || []).filter((w) => !w.isPlannedRestDay).length;
}

export function topWeight(exercise: CustomExercise | null): number | null {
  if (!exercise) return null;
  let max: number | null = null;
  for (const set of exercise.sets || []) {
    if (!set.weight) continue;
    if (max === null || set.weight > max) max = set.weight;
  }
  return max;
}
