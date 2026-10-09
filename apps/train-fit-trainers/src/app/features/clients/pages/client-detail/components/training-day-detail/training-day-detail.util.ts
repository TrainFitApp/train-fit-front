import { formatRirValue, isRirFail } from 'src/app/core/models/rir';

// Detalle de una sesión hecha para el entrenador (Plan > Entrenamiento, al
// tocar un día en el calendario): serie a serie lo que hizo el cliente junto
// a lo que tenía pautado, y la mejor serie de cada ejercicio comparada con la
// vez anterior que lo hizo. Funciones puras (training-day-detail.test.cjs);
// todo sale de las rutinas que la ficha ya tiene cargadas.

// Lo mínimo que se lee de una serie, un ejercicio y un entrenamiento (los
// modelos de shared-core lo cumplen; aquí se tipa en estructura para poder
// probarlo con datos planos).
export interface DaySetSource {
  order?: number;
  displayOrder?: number;
  doned?: boolean;
  weight?: number | null;
  reps?: number | null;
  rir?: number | number[] | null;
  time?: string | null;
  distance?: number | null;
  expectedReps?: number[];
  expectedRir?: number[];
  expectedTime?: string | null;
  expectedDistance?: number | null;
  drop?: boolean;
  restPause?: number | null;
}

export interface DayExerciseSource {
  _id?: string;
  exercise?: { _id?: string; name?: string; isCardio?: boolean; isIsometric?: boolean } | null;
  clientNotes?: string;
  sets?: DaySetSource[];
}

export interface DayWorkoutSource {
  _id?: string;
  date?: Date | string | null;
  exercises?: DayExerciseSource[];
}

export type DayExerciseKind = 'strength' | 'isometric' | 'cardio';

export interface DaySetRow {
  index: number;
  done: boolean;
  // Lo hecho: "80 kg × 8", "8 reps", "00:30" o "20:00 · 4 km". Vacío si no
  // la marcó como hecha.
  performed: string;
  // RIR hecho ("2"); vacío si no hay o si fue al fallo (va en `failure`).
  rir: string;
  failure: boolean;
  drop: boolean;
  restPause: number | null;
  // Lo pautado: "8-10 · RIR 1-2", "00:30"… Vacío si no había pauta.
  planned: string;
}

export interface BestSet {
  weight: number;
  reps: number;
}

export interface ProgressDelta {
  // 'weight': cambió la carga de la mejor serie; 'reps': misma carga, otras
  // repeticiones; 'same': igual.
  kind: 'weight' | 'reps' | 'same';
  diff: number;
  previous: BestSet;
  previousDate: Date | string;
}

export interface DayExerciseRow {
  key: string;
  name: string;
  kind: DayExerciseKind;
  sets: DaySetRow[];
  doneCount: number;
  clientNote: string;
  progress: ProgressDelta | null;
}

function kindOf(exercise: DayExerciseSource['exercise']): DayExerciseKind {
  if (exercise?.isCardio) return 'cardio';
  if (exercise?.isIsometric) return 'isometric';
  return 'strength';
}

function num(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatKg(value: number, locale?: string): string {
  return value.toLocaleString(locale, { maximumFractionDigits: 2 });
}

// "8 - 12" → "8-12", "8": el mismo rango que se escribe en la tabla.
function formatRange(values: number[] | undefined): string {
  const list = (values || []).filter((v) => Number.isFinite(Number(v)));
  if (!list.length) return '';
  return list.length > 1 && list[0] !== list[1] ? `${list[0]}-${list[1]}` : String(list[0]);
}

function setOrder(set: DaySetSource, fallback: number): number {
  return set.displayOrder ?? set.order ?? fallback;
}

export function sortedSets(sets: DaySetSource[] | undefined): DaySetSource[] {
  return (sets || [])
    .map((set, index) => ({ set, index }))
    .sort((a, b) => setOrder(a.set, a.index) - setOrder(b.set, b.index))
    .map((entry) => entry.set);
}

function performedLabel(set: DaySetSource, kind: DayExerciseKind, locale?: string): string {
  if (!set.doned) return '';
  if (kind === 'isometric') return set.time || '—';
  if (kind === 'cardio') {
    const distance = num(set.distance);
    return [set.time || '', distance ? `${formatKg(distance, locale)} km` : ''].filter(Boolean).join(' · ') || '—';
  }
  const weight = num(set.weight);
  const reps = num(set.reps);
  return weight > 0 ? `${formatKg(weight, locale)} kg × ${reps}` : `${reps} reps`;
}

function plannedLabel(set: DaySetSource, kind: DayExerciseKind, locale?: string): string {
  if (kind === 'isometric') return set.expectedTime || '';
  if (kind === 'cardio') {
    const distance = num(set.expectedDistance);
    return [set.expectedTime || '', distance ? `${formatKg(distance, locale)} km` : ''].filter(Boolean).join(' · ');
  }
  const reps = formatRange(set.expectedReps);
  const rir = set.expectedRir?.length ? formatRirValue(set.expectedRir, { includeUnit: true, emptyLabel: '' }) : '';
  return [reps, rir].filter(Boolean).join(' · ');
}

export function buildSetRows(sets: DaySetSource[] | undefined, kind: DayExerciseKind, locale?: string): DaySetRow[] {
  return sortedSets(sets).map((set, index) => {
    const strength = kind === 'strength';
    const failure = strength && set.doned === true && isRirFail(set.rir);
    return {
      index: index + 1,
      done: !!set.doned,
      performed: performedLabel(set, kind, locale),
      rir: strength && set.doned && !failure ? formatRirValue(set.rir, { emptyLabel: '' }) : '',
      failure,
      drop: !!set.drop,
      restPause: set.restPause ? num(set.restPause) : null,
      planned: plannedLabel(set, kind, locale),
    };
  });
}

// Mejor serie de fuerza: la de más carga y, a igual carga, la de más
// repeticiones. null si no hizo ninguna con carga.
export function bestSet(sets: DaySetSource[] | undefined): BestSet | null {
  let best: BestSet | null = null;
  for (const set of sets || []) {
    if (!set.doned) continue;
    const weight = num(set.weight);
    const reps = num(set.reps);
    if (weight <= 0 || reps <= 0) continue;
    if (!best || weight > best.weight || (weight === best.weight && reps > best.reps)) best = { weight, reps };
  }
  return best;
}

function exerciseIdOf(exercise: DayExerciseSource): string | null {
  return exercise.exercise?._id ? String(exercise.exercise._id) : null;
}

function timeOf(date: Date | string | null | undefined): number {
  return date ? new Date(date).getTime() : NaN;
}

// La vez anterior que hizo ese mismo ejercicio (en cualquier rutina o
// entrenamiento), antes de esta sesión, con al menos una serie con carga.
export function previousBest(
  exerciseId: string,
  before: Date | string | null | undefined,
  history: DayWorkoutSource[]
): { best: BestSet; date: Date | string } | null {
  const limit = timeOf(before);
  if (!Number.isFinite(limit)) return null;
  let found: { best: BestSet; date: Date | string; time: number } | null = null;
  for (const workout of history) {
    const time = timeOf(workout.date);
    if (!Number.isFinite(time) || time >= limit || (found && time <= found.time)) continue;
    const sets = (workout.exercises || [])
      .filter((exercise) => exerciseIdOf(exercise) === exerciseId)
      .flatMap((exercise) => exercise.sets || []);
    const best = bestSet(sets);
    if (best) found = { best, date: workout.date as Date | string, time };
  }
  return found ? { best: found.best, date: found.date } : null;
}

export function compareBest(current: BestSet, previous: BestSet): Pick<ProgressDelta, 'kind' | 'diff'> {
  if (current.weight !== previous.weight) {
    return { kind: 'weight', diff: Math.round((current.weight - previous.weight) * 100) / 100 };
  }
  if (current.reps !== previous.reps) return { kind: 'reps', diff: current.reps - previous.reps };
  return { kind: 'same', diff: 0 };
}

export function buildExerciseRows(
  workout: DayWorkoutSource,
  history: DayWorkoutSource[],
  locale?: string
): DayExerciseRow[] {
  return (workout.exercises || []).map((exercise, index) => {
    const kind = kindOf(exercise.exercise);
    const sets = buildSetRows(exercise.sets, kind, locale);
    const exerciseId = exerciseIdOf(exercise);

    let progress: ProgressDelta | null = null;
    const current = kind === 'strength' ? bestSet(exercise.sets) : null;
    if (current && exerciseId) {
      const previous = previousBest(exerciseId, workout.date, history);
      if (previous) progress = { ...compareBest(current, previous.best), previous: previous.best, previousDate: previous.date };
    }

    return {
      key: exercise._id || `${exerciseId || 'ex'}-${index}`,
      name: exercise.exercise?.name || '',
      kind,
      sets,
      doneCount: sets.filter((set) => set.done).length,
      clientNote: (exercise.clientNotes || '').trim(),
      progress,
    };
  });
}

// "+2,5 kg", "-1 rep", "=": lo que se pinta en el chip de progreso.
export function formatDelta(progress: ProgressDelta, locale?: string): string {
  if (progress.kind === 'same') return '=';
  const sign = progress.diff > 0 ? '+' : '−';
  const value = Math.abs(progress.diff);
  return progress.kind === 'weight'
    ? `${sign}${formatKg(value, locale)} kg`
    : `${sign}${value} ${value === 1 ? 'rep' : 'reps'}`;
}

export function formatBestSet(best: BestSet, locale?: string): string {
  return `${formatKg(best.weight, locale)} kg × ${best.reps}`;
}
