import { Split } from 'src/app/core/models/split';
import { Workout } from 'src/app/core/models/workout';
import { CustomExercise } from 'src/app/core/models/customExercise';
import {
  MUSCLE_GROUPS,
  MUSCLE_ROLE_FACTOR,
  isMuscleGroup,
  muscleGroupOf,
  normalizeMuscles,
} from 'src/app/core/constants/muscle-catalog';
import { uiText } from 'src/app/core/i18n/localized-catalog';

/**
 * Métricas de microciclo del Planificador, en funciones puras.
 *
 * MOVIMIENTO LITERAL (2026-09) desde los privados de
 * planner-column.component.ts: mismos cuerpos, mismas firmas. (El conteo
 * plano por muscleGroups1 que venía de muscle-volume-panel se eliminó al
 * pasar al árbol muscular de más abajo: nadie lo usaba ya.) Se extraen porque el modal de comparación necesita
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

export function topWeight(exercise: CustomExercise | null): number | null {
  if (!exercise) return null;
  let max: number | null = null;
  for (const set of exercise.sets || []) {
    if (!set.weight) continue;
    if (max === null || set.weight > max) max = set.weight;
  }
  return max;
}

// --- Árbol muscular con énfasis (2026-09) ---
//
// Sustituye en la pestaña Análisis al conteo plano de arriba, que se queda
// para el comparador de microciclos. Lee Exercise.muscles (ver
// constants/muscle-catalog.ts) y cuenta SERIES FRACCIONALES: principal ×1,
// secundario ×0,5, estabilizador ×0.
//
// Regla contra el doble conteo: un ejercicio aporta a su GRUPO el mayor
// factor entre sus músculos de ese grupo, no la suma. Un press plano con
// pectoral medio (principal) y superior (secundario) suma 4 series a
// Pectoral, no 6 — pero sí 4 al medio y 2 al superior en el desglose.

export interface MuscleTreeGroupCount {
  groupId: string;
  // Series fraccionales del grupo: el número que se compara con el rango.
  sets: number;
  // Series en las que el grupo era objetivo (×1) y en las que colaboraba
  // (×0,5), sin ponderar: el desglose que ve el entrenador en el tooltip.
  directSets: number;
  indirectSets: number;
  // Series fraccionales por porción (ids de muscle-catalog).
  portions: Record<string, number>;
  // Ejercicios etiquetados al grupo entero, sin porción concreta.
  general: number;
}

export interface MuscleTreeCount {
  groups: Record<string, MuscleTreeGroupCount>;
  // Series de fuerza cuyo ejercicio aún no tiene músculos asignados: se
  // cuentan aparte para que el panel avise, en vez de desaparecer.
  unclassifiedSets: number;
}

export function countMuscleTree(workouts: Workout[]): MuscleTreeCount {
  const groups: Record<string, MuscleTreeGroupCount> = {};
  let unclassifiedSets = 0;

  const groupCount = (groupId: string): MuscleTreeGroupCount =>
    (groups[groupId] ||= {
      groupId,
      sets: 0,
      directSets: 0,
      indirectSets: 0,
      portions: {},
      general: 0,
    });

  for (const workout of workouts) {
    for (const customExercise of workout?.exercises || []) {
      const setCount = customExercise.sets?.length || 0;
      const exercise = customExercise.exercise;
      if (!setCount || !exercise || exercise.isCardio) continue;

      // Sin migrar (campo ausente) no es lo mismo que "no trabaja ningún
      // músculo" ([], acondicionamiento): solo lo primero es un aviso.
      if (!Array.isArray(exercise.muscles)) {
        unclassifiedSets += setCount;
        continue;
      }

      const factorByGroup = new Map<string, number>();
      for (const { muscle, role } of normalizeMuscles(exercise.muscles)) {
        const factor = MUSCLE_ROLE_FACTOR[role];
        if (!factor) continue;

        const group = muscleGroupOf(muscle);
        if (!group) continue;
        factorByGroup.set(group.id, Math.max(factorByGroup.get(group.id) || 0, factor));

        const count = groupCount(group.id);
        if (isMuscleGroup(muscle)) {
          count.general += setCount * factor;
        } else {
          count.portions[muscle] = (count.portions[muscle] || 0) + setCount * factor;
        }
      }

      for (const [groupId, factor] of factorByGroup) {
        const count = groupCount(groupId);
        count.sets += setCount * factor;
        if (factor === MUSCLE_ROLE_FACTOR.primary) count.directSets += setCount;
        else count.indirectSets += setCount;
      }
    }
  }

  return { groups, unclassifiedSets };
}

export function countSplitMuscleTree(split: Split | null): MuscleTreeCount {
  return countMuscleTree(split?.workouts || []);
}

export function countWorkoutMuscleTree(workout: Workout | null): MuscleTreeCount {
  return countMuscleTree(workout ? [workout] : []);
}

export interface MuscleTreePortionRow {
  id: string;
  label: string;
  // Fila de ejercicios etiquetados al grupo entero, sin porción: no es una
  // porción anatómica y se pinta distinta para que no se lea como una.
  isWholeGroup?: boolean;
  sets: number;
  // Porcentaje de las series fraccionales de la porción sobre el total de
  // porciones del grupo: el reparto del énfasis dentro del grupo.
  share: number;
}

export interface MuscleTreeRow {
  groupId: string;
  label: string;
  sets: number;
  directSets: number;
  indirectSets: number;
  previousSets: number | null;
  portions: MuscleTreePortionRow[];
}

/**
 * Filas para pintar: grupos con trabajo, de más a menos series, y debajo
 * TODAS sus porciones en orden anatómico fijo (superior, medio, inferior),
 * también las que están a 0 — "no estás tocando el pectoral superior" es
 * justo el aviso que el entrenador necesita ver. La fila "Todo el grupo"
 * solo aparece si algún ejercicio está etiquetado al grupo entero (curl con
 * barra: trabaja el bíceps sin enfatizar ninguna cabeza).
 *
 * Excepción: si NINGÚN ejercicio del grupo precisa porción (todo es
 * "Todo el grupo"), no hay desglose que enseñar. Pintar las porciones a 0 diría
 * "no trabajas el recto femoral" cuando lo cierto es "no se sabe".
 */
/**
 * Devuelve la MISMA referencia mientras el contenido no cambie. Los paneles
 * recalculan las filas en un getter (split/workout se mutan en sitio y
 * ngOnChanges no se entera), pero las pasan como @Input a <app-muscle-tree>:
 * un array nuevo en cada comprobación dispararía
 * ExpressionChangedAfterItHasBeenChecked.
 */
export function keepReferenceWhileEqual<T>(): (next: T) => T {
  let key: string | null = null;
  let current: T;
  return (next: T) => {
    const nextKey = JSON.stringify(next);
    if (nextKey !== key) {
      key = nextKey;
      current = next;
    }
    return current;
  };
}

export function buildMuscleTreeRows(
  current: MuscleTreeCount,
  previous: MuscleTreeCount | null = null
): MuscleTreeRow[] {
  const groupIds = new Set([
    ...Object.keys(current.groups),
    ...Object.keys(previous?.groups || {}),
  ]);

  return MUSCLE_GROUPS.filter((group) => groupIds.has(group.id))
    .map((group) => {
      const count = current.groups[group.id];
      const portionSets = group.muscles.map((muscle) => count?.portions[muscle.id] || 0);
      const general = count?.general || 0;
      const portionTotal = portionSets.reduce((sum, sets) => sum + sets, 0) + general;
      const share = (sets: number) => (portionTotal ? Math.round((sets / portionTotal) * 100) : 0);

      const portions: MuscleTreePortionRow[] = group.muscles.map((muscle, index) => ({
        id: muscle.id,
        label: muscle.label,
        sets: portionSets[index],
        share: share(portionSets[index]),
      }));
      if (!portionSets.some((sets) => sets > 0)) portions.length = 0;
      else if (general > 0) {
        // Mismo nombre que la chip del formulario de ejercicio.
        portions.push({
          id: `${group.id}__whole`,
          label: uiText('PLANNER.TODO_EL_GRUPO'),
          isWholeGroup: true,
          sets: general,
          share: share(general),
        });
      }

      return {
        groupId: group.id,
        label: group.label,
        sets: count?.sets || 0,
        directSets: count?.directSets || 0,
        indirectSets: count?.indirectSets || 0,
        previousSets: previous ? previous.groups[group.id]?.sets || 0 : null,
        portions,
      };
    })
    .sort((a, b) => b.sets - a.sets);
}
