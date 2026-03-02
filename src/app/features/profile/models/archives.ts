export enum ARCHIVED_TYPES {
  diet = 'Dieta',
  dietDay = 'Dieta del día',
  meal = 'Comida',
  product = 'Producto',
  table = 'Rutina de entrenamientos',
  split = 'Micro-ciclo',
  workout = 'Entrenamiento',
  exercise = 'Ejercicio',
  ownExercise = 'Ejercicio creado por tí',
}

export const ARCHIVEDS = {
  [ARCHIVED_TYPES.diet]: {
    value: 'Dieta',
    node: 'diet',
    nodeArchived: 'archivedDiets',
  },
  [ARCHIVED_TYPES.dietDay]: {
    value: 'Dieta del día',
    node: 'dietdays',
    nodeArchived: 'archivedDietDays',
  },
  [ARCHIVED_TYPES.meal]: {
    value: 'Comida',
    node: 'meals',
    nodeArchived: 'archivedMeals',
  },

  [ARCHIVED_TYPES.product]: {
    value: 'Producto',
    node: 'products',
    nodeArchived: 'archivedProducts',
  },
  [ARCHIVED_TYPES.table]: {
    value: 'Rutina de entrenamientos',
    node: 'tables',
    nodeArchived: 'archivedTables',
  },
  [ARCHIVED_TYPES.split]: {
    value: 'Micro-ciclo',
    node: 'splits',
    nodeArchived: 'archivedSplits',
  },
  [ARCHIVED_TYPES.workout]: {
    value: 'Entrenamiento',
    node: 'workouts',
    nodeArchived: 'archivedWorkouts',
  },
  [ARCHIVED_TYPES.exercise]: {
    value: 'Ejercicio',
    node: 'exercises',
    nodeArchived: 'archivedExercises',
  },
} as const;
