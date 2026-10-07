import { Split } from 'src/app/core/models/split';
import { Workout } from 'src/app/core/models/workout';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Set as ExerciseSet } from 'src/app/core/models/set';
import { formatRirValue } from 'src/app/core/models/rir';
import { MUSCLE_GROUPS, MuscleGroup } from 'src/app/core/constants/muscle-catalog';
import { MuscleTreeGroupCount, countMuscleTree, countSplitMuscleTree } from './planner-metrics';
import { uiText } from 'src/app/core/i18n/localized-catalog';

/**
 * Motor de comparación de dos microciclos (2026-09). Puro y sin
 * dependencias de Angular: no toca red, no toca estado, no muta nada.
 *
 * Responde una sola pregunta que hoy no responde ninguna pantalla: "¿qué
 * cambié en la PAUTA del microciclo A al B?". Lo EJECUTADO no se calcula
 * aquí (eso ya es terreno de Estadísticas); solo se declara con el contador
 * de series completadas.
 */

export type ExercisePairStatus = 'same' | 'changed' | 'moved' | 'added' | 'removed';

export interface PrescriptionSummary {
  // "4×8-10 · 80 kg · RIR 2", o con "~" delante cuando las series de ese
  // ejercicio no son homogéneas y hay que dar la envolvente.
  label: string;
  sets: number;
  weight: string;
  reps: string;
  rir: string;
  topWeight: number | null;
  uniformReps: number | null;
  uniformRir: number | null;
  details: string[];
}

export interface CompareExerciseRow {
  name: string;
  status: ExercisePairStatus;
  a: PrescriptionSummary | null;
  b: PrescriptionSummary | null;
  // Solo lo que CAMBIÓ, en texto ya montado: "Series 3 → 4", "Peso +5 kg".
  chips: string[];
  movedFrom: number | null;
  // Mismo ejercicio en los dos microciclos, con series en ambos, y NADA
  // cambia (ni peso, ni reps, ni series, ni RIR). No es un error: repetir
  // una semana es una decisión legítima. Pero si se repite sin querer —el
  // caso habitual al duplicar y retocar solo los primeros días— esto es lo
  // único que lo hace visible.
  stagnant: boolean;
  // +1 subió el peso top, -1 lo bajó, 0 igual o sin peso comparable.
  weightTrend: -1 | 0 | 1;
}

export interface CompareWorkoutRow {
  index: number;
  nameA: string | null;
  nameB: string | null;
  setsA: number;
  setsB: number;
  restDayA: boolean;
  restDayB: boolean;
  // 'a' = esta fila solo existe en A (sobra respecto a B), y viceversa.
  onlyIn: 'a' | 'b' | null;
  exercises: CompareExerciseRow[];
  hasChanges: boolean;
}

// Porción de un grupo (pectoral superior, medio…) o la fila "Todo el grupo"
// (ejercicios etiquetados al grupo entero), con sus series fraccionales en A
// y en B. Mismo desglose que la pestaña Análisis (planner-metrics.ts).
export interface CompareMusclePortionRow {
  id: string;
  label: string;
  isWholeGroup?: boolean;
  a: number;
  b: number;
}

export interface CompareMuscleRow {
  groupId: string;
  name: string;
  a: number;
  b: number;
  delta: number;
  // Vacío si ningún ejercicio del grupo precisa porción en A ni en B (igual
  // que en Análisis: pintarlas a 0 diría "no lo trabajas" cuando es "no se
  // sabe").
  portions: CompareMusclePortionRow[];
  // Frecuencia: en cuántos DÍAS distintos se toca ese grupo. 12 series en un
  // día y 12 repartidas en dos no son la misma semana de entrenamiento, y el
  // conteo de series solo no distingue una de otra.
  daysA: number;
  daysB: number;
}

// Lo que un entrenador quiere saber de un vistazo al comparar dos semanas,
// sin leer la lista entera: cuántos ejercicios subieron carga, cuántos
// bajaron y —el que de verdad importa— cuántos repiten EXACTAMENTE la misma
// pauta, que es lo que se le escapa cuando duplica un microciclo y solo
// retoca los dos primeros días.
export interface CompareProgress {
  progressed: number;
  regressed: number;
  stagnant: number;
  added: number;
  removed: number;
}

export interface CompareResult {
  workouts: CompareWorkoutRow[];
  muscles: CompareMuscleRow[];
  // Series de fuerza cuyo ejercicio aún no tiene músculos: no cuentan en el
  // volumen y se dice cuántas son, como en Análisis.
  unclassifiedSets: { a: number; b: number };
  progress: CompareProgress;
  // Distinto número de entrenamientos: el emparejamiento por posición sigue
  // valiendo, pero hay filas sin pareja y hay que decirlo con los números
  // concretos, nunca con un aviso genérico.
  structure: { a: number; b: number } | null;
  changedExercises: number;
}

// El emparejamiento de ENTRENAMIENTOS es por posición, no por nombre ni por
// _id: es el invariante que el backend mantiene activamente (crear card,
// plantillas y borrar hacen fan-out a todos los microciclos en el mismo
// índice; reorderWorkoutRows reordena la fila entera), y es el mismo
// criterio que ya usa PlannerRowSyncService ("el índice es lo único
// comparable entre columnas").
export function compareSplits(a: Split | null, b: Split | null): CompareResult {
  const workoutsA = a?.workouts || [];
  const workoutsB = b?.workouts || [];
  const rows: CompareWorkoutRow[] = [];

  const length = Math.max(workoutsA.length, workoutsB.length);
  for (let index = 0; index < length; index++) {
    rows.push(buildWorkoutRow(index, workoutsA[index] || null, workoutsB[index] || null));
  }

  const allExercises = rows.flatMap((row) => row.exercises);

  return {
    workouts: rows,
    muscles: buildMuscleRows(a, b),
    unclassifiedSets: {
      a: countSplitMuscleTree(a).unclassifiedSets,
      b: countSplitMuscleTree(b).unclassifiedSets,
    },
    progress: {
      progressed: allExercises.filter((e) => e.weightTrend > 0).length,
      regressed: allExercises.filter((e) => e.weightTrend < 0).length,
      stagnant: allExercises.filter((e) => e.stagnant).length,
      added: allExercises.filter((e) => e.status === 'added').length,
      removed: allExercises.filter((e) => e.status === 'removed').length,
    },
    structure:
      workoutsA.length === workoutsB.length
        ? null
        : { a: workoutsA.length, b: workoutsB.length },
    changedExercises: allExercises.filter((e) => e.status !== 'same').length,
  };
}

function buildWorkoutRow(
  index: number,
  a: Workout | null,
  b: Workout | null
): CompareWorkoutRow {
  const exercises = pairExercises(a?.exercises || [], b?.exercises || []);

  return {
    index,
    nameA: a?.name ?? null,
    nameB: b?.name ?? null,
    setsA: countSets(a),
    setsB: countSets(b),
    restDayA: !!a?.isPlannedRestDay,
    restDayB: !!b?.isPlannedRestDay,
    onlyIn: a && !b ? 'a' : b && !a ? 'b' : null,
    exercises,
    hasChanges:
      exercises.some((e) => e.status !== 'same') ||
      // Un día que pasa de entrenamiento a descanso (o al revés) no cambia
      // el número de filas, así que el aviso de estructura no lo ve: aquí sí.
      !!a?.isPlannedRestDay !== !!b?.isPlannedRestDay,
  };
}

function countSets(workout: Workout | null): number {
  if (!workout) return 0;
  return (workout.exercises || []).reduce((sum, e) => sum + (e.sets?.length || 0), 0);
}

/**
 * Emparejamiento de EJERCICIOS en tres pasadas, nunca por nombre:
 * Exercise.userId permite nombres repetidos entre el catálogo y la
 * biblioteca propia del entrenador, y updateWorkoutsName propaga el nombre
 * de la FILA a todos los microciclos, así que el nombre no identifica nada.
 *
 * 1. misma posición y mismo exercise._id → par fuerte
 * 2. mismo _id en otra posición, consumiendo ocurrencias en orden → "movido"
 *    (hace falta consumirlas porque "pegar ejercicios" permite dos
 *    CustomExercise con el mismo exercise._id en el mismo entrenamiento)
 * 3. lo que sobra → "solo en A" / "solo en B"
 */
function pairExercises(
  exercisesA: CustomExercise[],
  exercisesB: CustomExercise[]
): CompareExerciseRow[] {
  const usedA = new Set<number>();
  const usedB = new Set<number>();
  const rows: CompareExerciseRow[] = [];

  // Pasada 1 — misma posición, mismo ejercicio.
  const paired = Math.min(exercisesA.length, exercisesB.length);
  for (let i = 0; i < paired; i++) {
    if (exerciseId(exercisesA[i]) && exerciseId(exercisesA[i]) === exerciseId(exercisesB[i])) {
      usedA.add(i);
      usedB.add(i);
      rows.push(buildPairRow(exercisesA[i], exercisesB[i], null));
    }
  }

  // Pasada 2 — mismo ejercicio en otra posición: movido, no quitado+nuevo.
  for (let i = 0; i < exercisesA.length; i++) {
    if (usedA.has(i)) continue;
    const id = exerciseId(exercisesA[i]);
    if (!id) continue;

    const j = exercisesB.findIndex(
      (candidate, index) => !usedB.has(index) && exerciseId(candidate) === id
    );
    if (j < 0) continue;

    usedA.add(i);
    usedB.add(j);
    rows.push(buildPairRow(exercisesA[i], exercisesB[j], i));
  }

  // Pasada 3 — lo que queda sin pareja por cada lado.
  for (let i = 0; i < exercisesA.length; i++) {
    if (usedA.has(i)) continue;
    rows.push({
      name: exerciseName(exercisesA[i]),
      status: 'removed',
      a: summarize(exercisesA[i]),
      b: null,
      chips: [],
      movedFrom: null,
      stagnant: false,
      weightTrend: 0,
    });
  }
  for (let j = 0; j < exercisesB.length; j++) {
    if (usedB.has(j)) continue;
    rows.push({
      name: exerciseName(exercisesB[j]),
      status: 'added',
      a: null,
      b: summarize(exercisesB[j]),
      chips: [],
      movedFrom: null,
      stagnant: false,
      weightTrend: 0,
    });
  }

  return rows;
}

function buildPairRow(
  a: CustomExercise,
  b: CustomExercise,
  movedFrom: number | null
): CompareExerciseRow {
  const chips = buildChips(a, b);
  const weightA = topWeight(a);
  const weightB = topWeight(b);
  const hasSets = !!a.sets?.length && !!b.sets?.length;

  return {
    name: exerciseName(b) || exerciseName(a),
    status: movedFrom !== null ? 'moved' : chips.length ? 'changed' : 'same',
    a: summarize(a),
    b: summarize(b),
    chips,
    movedFrom,
    // Estancado = mismo ejercicio, con series en los dos lados, y ni una
    // sola diferencia de pauta. Se marca aunque esté "movido": cambiar de
    // orden no es progresar.
    stagnant: hasSets && !chips.length,
    weightTrend:
      weightA === null || weightB === null ? 0 : weightB > weightA ? 1 : weightB < weightA ? -1 : 0,
  };
}

// Solo se pinta lo que CAMBIÓ: con 6 días × 7 ejercicios, 42 filas
// idénticas entierran las 3 que importan.
function buildChips(a: CustomExercise, b: CustomExercise): string[] {
  const chips: string[] = [];

  const setsA = a.sets?.length || 0;
  const setsB = b.sets?.length || 0;
  if (setsA !== setsB) chips.push(uiText('PLANNER.SERIES_3', { setsA, setsB }));

  const weightA = topWeight(a);
  const weightB = topWeight(b);
  if (weightA !== weightB) {
    if (weightA === null) chips.push(uiText('PLANNER.PESO_KG', { weightB }));
    else if (weightB === null) chips.push(uiText('PLANNER.PESO_KG_SIN_PESO', { weightA }));
    else {
      const diff = weightB - weightA;
      chips.push(uiText('PLANNER.PESO_KG_2', { p0: diff > 0 ? '+' : '−', p1: Math.abs(diff), weightA, weightB }));
    }
  }

  pushIfChanged(chips, uiText('PLANNER.REPS'), repsLabel(a), repsLabel(b));
  pushIfChanged(chips, 'RIR', rirLabel(a), rirLabel(b));
  pushIfChanged(chips, uiText('PLANNER.DESCANSO'), restLabel(a), restLabel(b));

  // Las envolventes y el peso máximo pueden ocultar cambios en series intermedias.
  const signature = (exercise: CustomExercise) => JSON.stringify((exercise.sets || []).map((set) => [
    set.expectedReps || [], set.weight ?? null, set.expectedRir || [],
    set.restSeconds ?? null, set.expectedTime ?? null, set.expectedDistance ?? null,
    set.drop ?? false, set.restPause ?? null, set.dropSetSeries ?? [], set.restPauseSeries ?? [],
  ]));
  if (!chips.length && signature(a) !== signature(b)) chips.push(uiText('PLANNER.DISTRIBUCION_DE_SERIES_MODIFICADA'));

  if ((a.notes || '').trim() !== (b.notes || '').trim()) chips.push(uiText('PLANNER.NOTA_DEL_ENTRENADOR_EDITADA'));

  return chips;
}

function pushIfChanged(chips: string[], label: string, a: string, b: string): void {
  if (a === b) return;
  if (!a && !b) return;
  chips.push(`${label} ${a || '—'} → ${b || '—'}`);
}

// "4×8-10 · 80 kg · RIR 2". Cuando las series del ejercicio no son
// homogéneas se da la envolvente con "~" delante, en vez de mentir con la
// primera serie o inventar una media.
function summarize(exercise: CustomExercise | null): PrescriptionSummary | null {
  if (!exercise) return null;
  const sets = exercise.sets || [];

  const parts: string[] = [];
  const reps = repsLabel(exercise);
  const weight = weightLabel(exercise);
  const rir = rirLabel(exercise);

  if (reps) parts.push(`${sets.length}×${reps}`);
  else parts.push(`${sets.length} series`);
  if (weight) parts.push(weight);
  if (rir) parts.push(`RIR ${rir}`);

  const homogeneous = isHomogeneous(exercise);
  return {
    label: sets.length ? `${homogeneous ? '' : '~'}${parts.join(' · ')}` : uiText('PLANNER.SIN_SERIES'),
    sets: sets.length,
    weight: weight || '—',
    reps: reps || '—',
    rir: rir || '—',
    topWeight: topWeight(exercise),
    uniformReps: uniformValue(sets.map((set) => set.expectedReps)),
    uniformRir: uniformValue(sets.map((set) => set.expectedRir)),
    details: sets.map((set, index) => {
      const single = { ...exercise, sets: [set] };
      const duration = set.expectedTime ? ` · ${set.expectedTime}` : '';
      const distance = set.expectedDistance != null ? ` · ${set.expectedDistance} km` : '';
      return `${index + 1}. ${repsLabel(single) || '—'} reps · ${weightLabel(single) || '—'} · RIR ${rirLabel(single) || '—'}${duration}${distance}`;
    }),
  };
}

function uniformValue(ranges: (number[] | undefined)[]): number | null {
  const first = ranges[0]?.[0];
  if (typeof first !== 'number' || !Number.isFinite(first) || first < 0) return null;
  return ranges.every((range) => !!range?.length && range.every((value) => value === first))
    ? first : null;
}

// El cero es una carga registrada; cardio e isométricos no son comparables en kg.
function topWeight(exercise: CustomExercise): number | null {
  if (exercise.exercise?.isCardio || exercise.exercise?.isIsometric) return null;
  const weights = (exercise.sets || []).map((set) => set.weight)
    .filter((value): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0);
  return weights.length ? Math.max(...weights) : null;
}

function isHomogeneous(exercise: CustomExercise): boolean {
  const sets = exercise.sets || [];
  if (sets.length < 2) return true;
  const key = (set: ExerciseSet) =>
    `${(set.expectedReps || []).join('-')}|${set.weight ?? ''}|${(set.expectedRir || []).join('-')}`;
  const first = key(sets[0]);
  return sets.every((set) => key(set) === first);
}

// Envolvente de un rango: "8-10" si todas coinciden, "6-12" si no.
function repsLabel(exercise: CustomExercise): string {
  const values: number[] = [];
  for (const set of exercise.sets || []) {
    for (const value of set.expectedReps || []) {
      if (typeof value === 'number' && !isNaN(value)) values.push(value);
    }
  }
  return rangeLabel(values);
}

function weightLabel(exercise: CustomExercise): string {
  if (exercise.exercise?.isCardio || exercise.exercise?.isIsometric) return '';
  const values = (exercise.sets || [])
    .map((set) => set.weight)
    .filter((weight): weight is number => typeof weight === 'number' && !isNaN(weight));
  const range = rangeLabel(values);
  return range ? `${range} kg` : '';
}

// El RIR pasa por formatRirValue para que un [-1] se lea "FALLO" y no "−1".
function rirLabel(exercise: CustomExercise): string {
  const labels = new Set<string>();
  for (const set of exercise.sets || []) {
    if (!set.expectedRir?.length) continue;
    labels.add(formatRirValue(set.expectedRir, { emptyLabel: '' }));
  }
  const list = [...labels].filter(Boolean);
  if (!list.length) return '';
  return list.length === 1 ? list[0] : list.join(' / ');
}

function restLabel(exercise: CustomExercise): string {
  const values = (exercise.sets || [])
    .map((set) => set.restSeconds)
    .filter((rest): rest is number => typeof rest === 'number' && !isNaN(rest));
  const range = rangeLabel(values);
  return range ? `${range} s` : '';
}


function rangeLabel(values: number[]): string {
  if (!values.length) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min}` : `${min}-${max}`;
}

function exerciseId(customExercise: CustomExercise | null): string {
  const id = (customExercise?.exercise as { _id?: string })?._id;
  return id ? String(id) : '';
}

function exerciseName(customExercise: CustomExercise | null): string {
  return customExercise?.exercise?.name || '';
}

// Unión de grupos musculares de A y B, con relleno a 0 en el lado que no lo
// tiene, ORDENADA POR |delta|: en un comparador se busca lo que cambió, no
// el ranking (eso ya lo da la pestaña "Semana" del panel lateral).
//
// 2026-09 — mismo conteo que la pestaña Análisis (series fraccionales por
// GRUPO, planner-metrics.ts#countMuscleTree): el mismo microciclo tiene que
// dar la misma cifra en las dos pantallas. Antes contaba muscleGroups1 plano
// y "Pectoral" y "Pectoral superior" salían como dos músculos distintos.
function buildMuscleRows(a: Split | null, b: Split | null): CompareMuscleRow[] {
  const countsA = countSplitMuscleTree(a).groups;
  const countsB = countSplitMuscleTree(b).groups;
  const daysA = countDaysByMuscleGroup(a);
  const daysB = countDaysByMuscleGroup(b);

  return MUSCLE_GROUPS.filter((group) => countsA[group.id] || countsB[group.id])
    .map((group) => {
      const countA = countsA[group.id]?.sets || 0;
      const countB = countsB[group.id]?.sets || 0;
      return {
        groupId: group.id,
        name: group.label,
        a: countA,
        b: countB,
        delta: roundSets(countB - countA),
        portions: buildPortionRows(group, countsA[group.id], countsB[group.id]),
        daysA: daysA[group.id] || 0,
        daysB: daysB[group.id] || 0,
      };
    })
    .sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta) || y.b - x.b);
}

// Porciones en orden anatómico fijo, también las que están a 0 en los dos
// lados (no tocar una porción es justo lo que hay que ver), y "Todo el
// grupo" solo si algún ejercicio está etiquetado al grupo entero.
function buildPortionRows(
  group: MuscleGroup,
  countA: MuscleTreeGroupCount | undefined,
  countB: MuscleTreeGroupCount | undefined
): CompareMusclePortionRow[] {
  const portions: CompareMusclePortionRow[] = group.muscles.map((muscle) => ({
    id: muscle.id,
    label: muscle.label,
    a: countA?.portions[muscle.id] || 0,
    b: countB?.portions[muscle.id] || 0,
  }));
  if (!portions.some((portion) => portion.a > 0 || portion.b > 0)) return [];

  const generalA = countA?.general || 0;
  const generalB = countB?.general || 0;
  if (generalA > 0 || generalB > 0) {
    portions.push({
      id: `${group.id}__whole`,
      label: uiText('PLANNER.TODO_EL_GRUPO'),
      isWholeGroup: true,
      a: generalA,
      b: generalB,
    });
  }
  return portions;
}

// Las series fraccionales (×0,5) restadas dan restos de coma flotante.
function roundSets(value: number): number {
  return Math.round(value * 10) / 10;
}

// Frecuencia: en cuántos entrenamientos DISTINTOS recibe series cada grupo
// muscular (como principal o secundario; el estabilizador no cuenta, igual
// que en el volumen). 12 series de pecho en un día y 12 repartidas en dos
// no son la misma programación, y el conteo de series no las distingue.
function countDaysByMuscleGroup(split: Split | null): Record<string, number> {
  const days: Record<string, number> = {};
  for (const workout of split?.workouts || []) {
    for (const groupId of Object.keys(countMuscleTree([workout]).groups)) {
      days[groupId] = (days[groupId] || 0) + 1;
    }
  }
  return days;
}
