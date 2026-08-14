import { CustomExercise } from '../models/customExercise';
import { Workout, WorkoutBlock } from '../models/workout';

// Rediseño de entrenamiento Fase B — utilidad ÚNICA de agrupado por bloque,
// compartida de verdad entre current-workout.page.html (cliente real) y
// workout.component.html (editor real del entrenador). La lección directa
// del error de la Fase 1 revertida: si cada pantalla reimplementa su propio
// agrupado, es fácil que una de las dos quede desincronizada o simplemente
// nunca se conecte.
export interface WorkoutExerciseGroup {
  // null = ejercicios sueltos, sin agrupar (siempre al final).
  block: WorkoutBlock | null;
  exercises: CustomExercise[];
}

export function groupExercisesByBlock(workout: Workout | null | undefined): WorkoutExerciseGroup[] {
  const exercises = workout?.exercises || [];
  const blocks = [...(workout?.blocks || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const blockIds = new Set(blocks.map((block) => block._id));

  const exercisesByBlockId = new Map<string, CustomExercise[]>();
  const ungrouped: CustomExercise[] = [];

  exercises.forEach((exercise) => {
    const blockId = exercise.blockId;
    if (blockId && blockIds.has(blockId)) {
      if (!exercisesByBlockId.has(blockId)) exercisesByBlockId.set(blockId, []);
      exercisesByBlockId.get(blockId)!.push(exercise);
    } else {
      // Sin blockId, o apuntando a un bloque que ya no existe (huérfano) —
      // nunca se pierde silenciosamente, cae en el grupo "sin agrupar".
      ungrouped.push(exercise);
    }
  });

  const groups: WorkoutExerciseGroup[] = blocks.map((block) => ({
    block,
    exercises: exercisesByBlockId.get(block._id) || [],
  }));

  if (ungrouped.length > 0) {
    groups.push({ block: null, exercises: ungrouped });
  }

  return groups;
}

// Verdadero solo si el workout tiene al menos un bloque con contenido —
// usado para decidir si vale la pena renderizar cabeceras de bloque o si es
// más simple mostrar la lista plana de siempre (workout sin bloques todavía).
export function hasRenderableBlocks(workout: Workout | null | undefined): boolean {
  return (workout?.blocks?.length ?? 0) > 0;
}
