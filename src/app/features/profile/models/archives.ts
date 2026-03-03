export enum ARCHIVED_TYPES {
  diet = 'Dieta',
  product = 'Producto',
  table = 'Rutina de entrenamientos',
  exercise = 'Ejercicio',
  ownExercise = 'Ejercicio creado por tí',
}

export const ARCHIVEDS = {
  [ARCHIVED_TYPES.diet]: {
    value: 'Dieta',
    node: 'diet',
    nodeArchived: 'archivedDiets',
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
  [ARCHIVED_TYPES.exercise]: {
    value: 'Ejercicio',
    node: 'exercises',
    nodeArchived: 'archivedExercises',
  },
} as const;
