import { ACTION_TYPE, ACTION_TYPES, ACTIONS } from 'src/app/shared/constants/actions';

// Qué ofrece el entreno en curso cuando la rutina se la pautó su entrenador
// (y sigue siéndolo): solo lectura de la pauta. Lo que el back rechazaría
// (TABLE_ASSIGNED_BY_TRAINER) no se enseña, en vez de ofrecerlo y avisar
// después con un toast (QA 2026-10-09, M5). Registrar lo hecho, las notas
// propias y la calculadora siguen disponibles.

/** Menú ⋮ del entrenamiento. */
export function workoutOptions(readonly: boolean, inProgress: boolean): ACTION_TYPE[] {
  const options: ACTION_TYPE[] = [];
  if (!readonly) options.push(ACTIONS[ACTION_TYPES.moveExercises]);
  options.push(ACTIONS[ACTION_TYPES.note], ACTIONS[ACTION_TYPES.rmCalculator]);
  // Solo tiene sentido detener un entrenamiento que está en curso.
  if (inProgress) options.push(ACTIONS[ACTION_TYPES.stopWorkout]);
  return options;
}

/** Menú ⋮ de un ejercicio. */
export function exerciseOptions(readonly: boolean): ACTION_TYPE[] {
  return readonly
    ? [ACTIONS[ACTION_TYPES.note]]
    : [ACTIONS[ACTION_TYPES.moveSets], ACTIONS[ACTION_TYPES.addSet], ACTIONS[ACTION_TYPES.note]];
}

/** Menú ⋮ de una serie: sin él cuando la pauta es de solo lectura. */
export function setOptions(readonly: boolean): ACTION_TYPE[] {
  if (readonly) return [];
  // Orden visual coherente: acciones de contenido y finalmente la destructiva.
  // "Mover series" solo vive en el menú del ejercicio, no aquí.
  return [ACTIONS[ACTION_TYPES.edit], ACTIONS[ACTION_TYPES.duplicate], ACTIONS[ACTION_TYPES.delete]];
}
