import { WorkoutTemplateBlockType, WorkoutTemplateSet } from 'src/app/core/models/workout-template';

// Series de una plantilla de entrenamiento, en funciones puras
// (template-sets.test.cjs).
//
// El builder se construye como el Planificador (workout.component en
// plannerMode): tabla de series editable en celda, "Serie objetivo"
// (manage-set) para una serie y "Configurar ejercicio" para el ejercicio.
// Aquí viven las conversiones entre la serie guardada, la que se edita y la
// que entiende "Serie objetivo", con las mismas reglas que el Planificador
// (rangos, fallo = RIR -1, límites).

export type ExerciseKind = 'strength' | 'isometric' | 'cardio';

export interface SetDraft {
  repsMin: number | null;
  repsMax: number | null;
  rirMin: number | null;
  rirMax: number | null;
  time: string;
  distance: number | null;
  restSeconds: number | null;
  drop: boolean;
  restPause: number | null;
}

// Mismos límites que Validators.min/max de ManageSetComponent y que la
// edición en celda del Planificador (workout.component#SET_LIMITS).
export const SET_LIMITS = {
  rest: { min: 0, max: 600 },
  reps: { min: 0, max: 999 },
  rir: { min: 0, max: 20 },
};

export function exerciseKind(exercise: { isCardio?: boolean; isIsometric?: boolean } | null | undefined): ExerciseKind {
  if (exercise?.isCardio) return 'cardio';
  if (exercise?.isIsometric) return 'isometric';
  return 'strength';
}

function finiteOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

// [8] → 8–8; [8, 12] → 8–12; [] → sin valor.
export function rangeToDraft(values: unknown[] | undefined): [number | null, number | null] {
  const list = (values || []).map(finiteOrNull).filter((v): v is number => v !== null);
  if (!list.length) return [null, null];
  return [list[0], list.length > 1 ? list[1] : list[0]];
}

// Sin series guardadas, sin series: como en el Planificador, el ejercicio
// enseña "Añadir series".
export function fromTemplateSets(sets: WorkoutTemplateSet[] | undefined): SetDraft[] {
  return (sets || []).map((set) => {
    const [repsMin, repsMax] = rangeToDraft(set.expectedReps);
    const [rirMin, rirMax] = rangeToDraft(set.expectedRir);
    return {
      repsMin,
      repsMax,
      rirMin,
      rirMax,
      time: (set.expectedTime || '').trim(),
      distance: finiteOrNull(set.expectedDistance),
      restSeconds: finiteOrNull(set.restSeconds),
      drop: Boolean(set.drop),
      restPause: finiteOrNull(set.restPause),
    };
  });
}

// Rango como lo guarda el Planificador: [min, max] si son distintos, un
// solo valor si coinciden o falta uno, [] si no hay ninguno. Fallo es [-1].
function toRange(min: number | null, max: number | null): number[] {
  if (min === -1 || max === -1) return [-1];
  const values = [min, max].filter((v): v is number => v !== null && Number.isFinite(v));
  if (values.length === 2 && values[0] === values[1]) return [values[0]];
  if (values.length === 2 && values[0] > values[1]) return [values[1], values[0]];
  return values;
}

const seconds = (value: number | null): number | null => {
  const num = finiteOrNull(value);
  return num === null ? null : Math.min(SET_LIMITS.rest.max, Math.max(SET_LIMITS.rest.min, Math.round(num)));
};

export function toTemplateSets(drafts: SetDraft[], kind: ExerciseKind): WorkoutTemplateSet[] {
  return drafts.map((set) => {
    const base: WorkoutTemplateSet = {
      expectedReps: [],
      expectedRir: [],
      expectedTime: '',
      expectedDistance: null,
      restSeconds: seconds(set.restSeconds),
      drop: false,
      restPause: null,
    };
    if (kind === 'strength') {
      return {
        ...base,
        expectedReps: toRange(set.repsMin, set.repsMax),
        expectedRir: toRange(set.rirMin, set.rirMax),
        drop: Boolean(set.drop),
        restPause: seconds(set.restPause),
      };
    }
    if (kind === 'isometric') return { ...base, expectedTime: (set.time || '').trim() };
    return { ...base, expectedTime: (set.time || '').trim(), expectedDistance: finiteOrNull(set.distance) };
  });
}

export function cloneSets(drafts: SetDraft[]): SetDraft[] {
  return drafts.map((set) => ({ ...set }));
}

export function isFailure(set: SetDraft): boolean {
  return set.rirMin === -1 || set.rirMax === -1;
}

// "8 - 12", "8" o "—": el formato de la tabla del Planificador
// (workout.component#formatExpectedReps).
export function formatRange(min: number | null, max: number | null): string {
  if (min === null && max === null) return '—';
  if (min === null || max === null || min === max) return String(min ?? max);
  return `${min} - ${max}`;
}

// Lo que se ve de un ejercicio con las series plegadas: el rango de reps y
// de RIR de todas sus series (o sus tiempos) y si alguna lleva fallo, drop
// set o rest-pause.
export interface SetsOverview {
  reps: string;
  rir: string;
  time: string;
  failure: boolean;
  drop: boolean;
  restPause: boolean;
}

function spanOf(values: (number | null)[]): string {
  const list = values.filter((v): v is number => v !== null);
  return list.length ? formatRange(Math.min(...list), Math.max(...list)) : '';
}

export function setsOverview(drafts: SetDraft[], kind: ExerciseKind): SetsOverview {
  const strength = kind === 'strength';
  const times = [...new Set(drafts.map((set) => set.time).filter(Boolean))];
  return {
    reps: strength ? spanOf(drafts.flatMap((set) => [set.repsMin, set.repsMax])) : '',
    rir: strength ? spanOf(drafts.flatMap((set) => [set.rirMin, set.rirMax]).filter((v) => v !== -1)) : '',
    time: strength ? '' : times.slice(0, 2).join(' / ') + (times.length > 2 ? '…' : ''),
    failure: strength && drafts.some(isFailure),
    drop: strength && drafts.some((set) => set.drop),
    restPause: strength && drafts.some((set) => set.restPause !== null),
  };
}

// --- Edición en celda (workout.component#parseRangeParts) ---

// Rango escrito en las dos cajas de la celda. null = no válido (mínimo
// mayor o igual que el máximo, o no es un número). RIR -1 es fallo.
export function parseRangeInput(minRaw: string, maxRaw: string, field: 'reps' | 'rir'): number[] | null {
  const parse = (raw: string): number | null => {
    const trimmed = (raw || '').trim();
    return trimmed === '' ? null : Number(trimmed.replace(',', '.'));
  };
  const parsedMin = parse(minRaw);
  const parsedMax = parse(maxRaw);
  if ((parsedMin !== null && !Number.isFinite(parsedMin)) || (parsedMax !== null && !Number.isFinite(parsedMax))) {
    return null;
  }
  if (field === 'rir' && (parsedMin === -1 || parsedMax === -1)) return [-1];

  const limits = SET_LIMITS[field];
  const clamp = (value: number) => Math.min(Math.max(value, limits.min), limits.max);
  const min = parsedMin === null ? null : clamp(parsedMin);
  const max = parsedMax === null ? null : clamp(parsedMax);
  if (min !== null && max !== null && min >= max) return null;
  return [min, max].filter((v): v is number => v !== null);
}

// Descanso escrito en la celda: segundos acotados, null si se vacía,
// undefined si no es un número.
export function parseRestInput(raw: string): number | null | undefined {
  const trimmed = (raw || '').trim();
  if (trimmed === '') return null;
  const parsed = Number(trimmed.replace(',', '.'));
  if (!Number.isFinite(parsed)) return undefined;
  return Math.min(Math.max(Math.round(parsed), SET_LIMITS.rest.min), SET_LIMITS.rest.max);
}

// --- Paneles compartidos con el Planificador ---

// La serie en la forma que leen "Serie objetivo" (manage-set) y la hoja de
// intensidad. `_id` marca cuál se edita: el formulario distingue "editar"
// de "añadir otra" por él.
export function toManageSet(draft: SetDraft, kind: ExerciseKind, id?: string): WorkoutTemplateSet & { _id?: string } {
  const [set] = toTemplateSets([draft], kind);
  return id ? { ...set, _id: id } : set;
}

// Lo que devuelven, de vuelta a serie de plantilla. El peso, la velocidad y
// lo hecho (rir, reps) no son de una pauta y se descartan.
export function fromManageSet(set: Partial<WorkoutTemplateSet> | null | undefined): SetDraft {
  const [draft] = fromTemplateSets([
    {
      expectedReps: set?.expectedReps || [],
      expectedRir: set?.expectedRir || [],
      drop: set?.drop,
      restPause: set?.restPause,
      expectedTime: set?.expectedTime,
      expectedDistance: set?.expectedDistance,
      restSeconds: set?.restSeconds,
    },
  ]);
  return draft;
}

// --- Resumen de la sesión ---

// Segundos de un tiempo escrito a mano o del selector de tiempo: "30 s",
// "45\"", "10 min", "10'", "1:30", "00:00:45", "1 h". Un número suelto se lee
// en `bareUnit`.
export function parseDurationSeconds(text: string | null | undefined, bareUnit: 'seconds' | 'minutes' = 'seconds'): number | null {
  const value = (text || '').trim().toLowerCase().replace(',', '.');
  if (!value) return null;

  const clock = value.match(/^(\d+):(\d{1,2})(?::(\d{1,2}))?$/);
  if (clock) {
    const [a, b, c] = [clock[1], clock[2], clock[3]].map((n) => (n === undefined ? null : Number(n)));
    return c === null ? a! * 60 + b! : a! * 3600 + b! * 60 + c;
  }

  let total = 0;
  let matched = false;
  const unitPattern = /(\d+(?:\.\d+)?)\s*(h|hora|horas|min|mins|minutos?|m|'|s|seg|segs|segundos?|sec|")/g;
  let match: RegExpExecArray | null;
  while ((match = unitPattern.exec(value))) {
    matched = true;
    const amount = Number(match[1]);
    const unit = match[2];
    if (unit.startsWith('h')) total += amount * 3600;
    else if (unit === 'm' || unit === "'" || unit.startsWith('min')) total += amount * 60;
    else total += amount;
  }
  if (matched) return Math.round(total);

  const bare = Number(value);
  if (!Number.isFinite(bare)) return null;
  return Math.round(bareUnit === 'minutes' ? bare * 60 : bare);
}

export interface DurationBlock {
  type: WorkoutTemplateBlockType;
  restBetweenExercises: number | null;
  restBetweenRounds: number | null;
  exercises: { kind: ExerciseKind; sets: SetDraft[] }[];
}

// Descanso que se supone si no se pautó, solo para estimar la duración.
const ASSUMED_REST: Record<ExerciseKind, number> = { strength: 90, isometric: 60, cardio: 0 };

// Lo que dura una serie, aproximado: ~3,5 s por repetición más la
// colocación; isométricos y cardio, su tiempo pautado.
function workSeconds(set: SetDraft | undefined, kind: ExerciseKind): number {
  if (!set) return 0;
  if (kind === 'strength') {
    const reps = [set.repsMin, set.repsMax].filter((v): v is number => v !== null && v >= 0);
    const average = reps.length ? reps.reduce((a, b) => a + b, 0) / reps.length : 10;
    return Math.round(average * 3.5 + 10);
  }
  if (kind === 'isometric') return parseDurationSeconds(set.time, 'seconds') ?? 30;
  return parseDurationSeconds(set.time, 'minutes') ?? 0;
}

// Duración estimada de la sesión, en segundos: cada serie más su descanso
// (el supuesto si no se pautó). En superseries y circuitos, por ronda (una
// serie de cada ejercicio): los descansos del bloque si los tiene y, si no,
// el de la serie del último ejercicio de la ronda.
export function estimateSessionSeconds(blocks: DurationBlock[]): number {
  let total = 0;
  for (const block of blocks) {
    if (!block.exercises.length) continue;
    if (block.type === 'superset' || block.type === 'circuit') {
      const rounds = Math.max(...block.exercises.map((ex) => ex.sets.length));
      for (let round = 0; round < rounds; round++) {
        const active = block.exercises.filter((ex) => ex.sets.length > round);
        total += active.reduce((sum, ex) => sum + workSeconds(ex.sets[round], ex.kind), 0);
        total += (block.restBetweenExercises ?? 0) * Math.max(0, active.length - 1);
        const last = active[active.length - 1];
        total += block.restBetweenRounds ?? last?.sets[round]?.restSeconds ?? ASSUMED_REST[last?.kind || 'strength'];
      }
      continue;
    }
    for (const exercise of block.exercises) {
      for (const set of exercise.sets) {
        total += workSeconds(set, exercise.kind);
        total += set.restSeconds ?? ASSUMED_REST[exercise.kind];
      }
    }
  }
  return total;
}

// Minutos para pintar: redondeado a 5 a partir de 15 (es una estimación,
// la precisión al minuto daría una falsa exactitud).
export function roundedMinutes(totalSeconds: number): number {
  if (totalSeconds <= 0) return 0;
  const minutes = totalSeconds / 60;
  return minutes < 15 ? Math.max(1, Math.round(minutes)) : Math.round(minutes / 5) * 5;
}

// Material de la sesión: el de sus ejercicios, sin repetir y en el orden en
// que aparece. Se calcula siempre (no se escribe a mano): así no puede
// quedarse desfasado al cambiar un ejercicio.
export function templateEquipment(exercises: ({ equipment?: string[] } | null | undefined)[]): string[] {
  const seen = new Map<string, string>();
  for (const exercise of exercises) {
    for (const item of exercise?.equipment || []) {
      const value = (item || '').trim();
      if (value && !seen.has(value.toLowerCase())) seen.set(value.toLowerCase(), value);
    }
  }
  return [...seen.values()];
}
