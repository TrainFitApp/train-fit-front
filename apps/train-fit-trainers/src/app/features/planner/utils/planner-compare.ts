import { Split } from 'src/app/core/models/split';
import { Workout } from 'src/app/core/models/workout';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Set as ExerciseSet } from 'src/app/core/models/set';
import { formatRirValue } from 'src/app/core/models/rir';
import { countByMuscleGroup, topWeight } from './planner-metrics';

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

export interface CompareMuscleRow {
  name: string;
  a: number;
  b: number;
  delta: number;
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
  if (setsA !== setsB) chips.push(`Series ${setsA} → ${setsB}`);

  const weightA = topWeight(a);
  const weightB = topWeight(b);
  if (weightA !== weightB) {
    if (weightA === null) chips.push(`Peso → ${weightB} kg`);
    else if (weightB === null) chips.push(`Peso ${weightA} kg → sin peso`);
    else {
      const diff = weightB - weightA;
      chips.push(`Peso ${diff > 0 ? '+' : '−'}${Math.abs(diff)} kg (${weightA} → ${weightB})`);
    }
  }

  pushIfChanged(chips, 'Reps', repsLabel(a), repsLabel(b));
  pushIfChanged(chips, 'RIR', rirLabel(a), rirLabel(b));
  pushIfChanged(chips, 'Descanso', restLabel(a), restLabel(b));

  if ((a.notes || '').trim() !== (b.notes || '').trim()) chips.push('Nota del entrenador editada');

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
  if (!sets.length) return { label: 'sin series', sets: 0 };

  const parts: string[] = [];
  const reps = repsLabel(exercise);
  const weight = weightLabel(exercise);
  const rir = rirLabel(exercise);

  if (reps) parts.push(`${sets.length}×${reps}`);
  else parts.push(`${sets.length} series`);
  if (weight) parts.push(weight);
  if (rir) parts.push(`RIR ${rir}`);

  const homogeneous = isHomogeneous(exercise);
  return { label: `${homogeneous ? '' : '~'}${parts.join(' · ')}`, sets: sets.length };
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
function buildMuscleRows(a: Split | null, b: Split | null): CompareMuscleRow[] {
  const countsA = countByMuscleGroup(a);
  const countsB = countByMuscleGroup(b);
  const daysA = countDaysByMuscleGroup(a);
  const daysB = countDaysByMuscleGroup(b);
  // `Set` aquí es el nativo: el modelo homónimo se importa como ExerciseSet.
  const names = new Set<string>([...Object.keys(countsA), ...Object.keys(countsB)]);

  return [...names]
    .map((name) => {
      const countA = countsA[name] || 0;
      const countB = countsB[name] || 0;
      return {
        name,
        a: countA,
        b: countB,
        delta: countB - countA,
        daysA: daysA[name] || 0,
        daysB: daysB[name] || 0,
      };
    })
    .sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta) || y.b - x.b);
}

// Frecuencia: en cuántos entrenamientos DISTINTOS aparece cada grupo
// muscular con al menos una serie. 12 series de pecho en un día y 12
// repartidas en dos semanas distintas no son la misma programación, y el
// conteo de series por sí solo no las distingue.
function countDaysByMuscleGroup(split: Split | null): Record<string, number> {
  const days: Record<string, number> = {};
  if (!split) return days;

  for (const workout of split.workouts || []) {
    const inThisDay = new Set<string>();
    for (const exercise of workout.exercises || []) {
      if (!exercise.sets?.length) continue;
      for (const group of exercise.exercise?.muscleGroups1 || []) inThisDay.add(group);
    }
    for (const group of inThisDay) days[group] = (days[group] || 0) + 1;
  }

  return days;
}
