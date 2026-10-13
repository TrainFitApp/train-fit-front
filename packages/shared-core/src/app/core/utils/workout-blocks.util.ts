import { CustomExercise } from '../models/customExercise';
import { Workout, WorkoutBlock } from '../models/workout';

// Rediseño de entrenamiento Fase B — utilidad ÚNICA de agrupado por bloque,
// compartida de verdad entre current-workout.page.html (cliente real) y
// workout.component.html (editor real del entrenador). La lección directa
// del error de la Fase 1 revertida: si cada pantalla reimplementa su propio
// agrupado, es fácil que una de las dos quede desincronizada o simplemente
// nunca se conecte.
//
// El orden manda `Workout.exercises`: cada bloque se pinta en la posición de
// su primer ejercicio y los sueltos quedan donde están, entre bloques. Antes
// todos los bloques iban arriba y los sueltos al final, así que un entreno
// "suelto → superserie → suelto" no se podía ni ver ni construir.
// Lo mínimo que hace falta de un entreno para agruparlo u ordenarlo.
export type WorkoutBlocksInput = Pick<Workout, 'exercises' | 'blocks'>;

export interface WorkoutExerciseGroup {
  // Identifica el grupo entre repintados (trackBy): el _id del bloque, o el
  // del primer ejercicio de una tanda de sueltos (puede haber varias).
  key: string;
  // null = ejercicios sueltos, sin agrupar.
  block: WorkoutBlock | null;
  exercises: CustomExercise[];
}

// Un elemento movible de la lista de orden: un ejercicio suelto, o un bloque
// entero con sus ejercicios. `index` es la posición ORIGINAL en
// workout.exercises (la permutación que espera el back se expresa en ellas).
export interface WorkoutOrderEntry {
  exercise: CustomExercise;
  index: number;
}

export interface WorkoutOrderItem {
  key: string;
  block: WorkoutBlock | null;
  exercises: WorkoutOrderEntry[];
}

// Cada ejercicio suelto es un elemento; cada bloque, uno solo colocado en la
// posición de su primer miembro (con todos sus miembros juntos). Los bloques
// sin ejercicios no tienen posición: van al final, por su `order`.
function placeExercises(workout: WorkoutBlocksInput | null | undefined): WorkoutOrderItem[] {
  const exercises = workout?.exercises || [];
  const blocks = [...(workout?.blocks || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const blocksById = new Map(blocks.map((block) => [block._id, block]));

  const items: WorkoutOrderItem[] = [];
  const itemByBlockId = new Map<string, WorkoutOrderItem>();

  exercises.forEach((exercise, index) => {
    const block = exercise.blockId ? blocksById.get(exercise.blockId) : undefined;
    if (!block) {
      // Sin blockId, o apuntando a un bloque que ya no existe (huérfano) —
      // nunca se pierde silenciosamente, queda como suelto en su sitio.
      items.push({ key: exercise._id, block: null, exercises: [{ exercise, index }] });
      return;
    }
    let item = itemByBlockId.get(block._id);
    if (!item) {
      item = { key: block._id, block, exercises: [] };
      itemByBlockId.set(block._id, item);
      items.push(item);
    }
    item.exercises.push({ exercise, index });
  });

  blocks
    .filter((block) => !itemByBlockId.has(block._id))
    .forEach((block) => items.push({ key: block._id, block, exercises: [] }));

  return items;
}

export function groupExercisesByBlock(workout: WorkoutBlocksInput | null | undefined): WorkoutExerciseGroup[] {
  const groups: WorkoutExerciseGroup[] = [];
  let loose: WorkoutExerciseGroup | null = null;

  placeExercises(workout).forEach((item) => {
    if (item.block) {
      loose = null;
      groups.push({ key: item.key, block: item.block, exercises: item.exercises.map((entry) => entry.exercise) });
      return;
    }
    // Sueltos seguidos = un solo grupo (una cabecera "sin agrupar", no una por ejercicio).
    if (!loose) {
      loose = { key: `loose-${item.key}`, block: null, exercises: [] };
      groups.push(loose);
    }
    loose.exercises.push(item.exercises[0].exercise);
  });

  return groups;
}

// Verdadero solo si el workout tiene al menos un bloque con contenido —
// usado para decidir si vale la pena renderizar cabeceras de bloque o si es
// más simple mostrar la lista plana de siempre (workout sin bloques todavía).
export function hasRenderableBlocks(workout: WorkoutBlocksInput | null | undefined): boolean {
  return (workout?.blocks?.length ?? 0) > 0;
}

// --- Mover ejercicios y bloques --------------------------------------------------------
//
// PURO. La lista de orden trabaja con elementos (suelto o bloque entero) y
// devuelve la permutación `order[posición] = índice original` que ya consume
// updateWorkoutsOrder. Los miembros de un bloque quedan consecutivos, que es
// como se pintan.

// Los bloques vacíos no se pueden mover (no tienen ejercicios que ordenar).
export function buildOrderItems(workout: WorkoutBlocksInput | null | undefined): WorkoutOrderItem[] {
  return placeExercises(workout)
    .filter((item) => item.exercises.length > 0)
    .map((item) => ({ ...item, exercises: [...item.exercises] }));
}

function moved<T>(list: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) return list;
  const next = [...list];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}

/** Mueve un elemento entero (un bloque con sus ejercicios, o un suelto). */
export function moveOrderItem(items: WorkoutOrderItem[], from: number, to: number): WorkoutOrderItem[] {
  return moved(items, from, to);
}

/** Mueve un ejercicio DENTRO de su bloque; los demás elementos no cambian. */
export function moveOrderItemExercise(
  items: WorkoutOrderItem[],
  itemIndex: number,
  from: number,
  to: number,
): WorkoutOrderItem[] {
  const item = items[itemIndex];
  if (!item?.block) return items;
  const exercises = moved(item.exercises, from, to);
  if (exercises === item.exercises) return items;
  return items.map((candidate, i) => (i === itemIndex ? { ...candidate, exercises } : candidate));
}

/** `order[posición] = índice original del ejercicio que pasa a ocuparla`. */
export function orderFromItems(items: WorkoutOrderItem[]): number[] {
  return items.flatMap((item) => item.exercises.map((entry) => entry.index));
}
