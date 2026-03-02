export enum ACTIONS_FAB_TYPES {
  addWorkout = 0,
  addMicrocycle = 1,
  deleteMicrocycle = 2,
  addProduct = 4,
  createProduct = 5,
  addExercise = 6,
  duplicateMicrocycle = 7,
  cancelCopy = 8,
  createExercise = 9,
  createRecipe = 10,
}

export type ACTIONS_FAB_TYPE = {
  id: ACTIONS_FAB_TYPES;
  value: string;
  icon: string;
  color?: string;
  role?: string;
};

export const ACTIONS_FAB: {
  [id: number]: ACTIONS_FAB_TYPE;
} = {
  [ACTIONS_FAB_TYPES.addWorkout]: {
    id: ACTIONS_FAB_TYPES.addWorkout,
    value: 'Añadir entrenamiento',
    icon: 'barbell-outline',
  },
  [ACTIONS_FAB_TYPES.addMicrocycle]: {
    id: ACTIONS_FAB_TYPES.addMicrocycle,
    value: 'Añadir micro-ciclo',
    icon: 'albums-outline',
    color: 'tertiary',
  },
  [ACTIONS_FAB_TYPES.duplicateMicrocycle]: {
    id: ACTIONS_FAB_TYPES.duplicateMicrocycle,
    value: 'Duplicar micro-ciclo',
    icon: 'albums-outline',
    color: 'tertiary',
  },
  [ACTIONS_FAB_TYPES.deleteMicrocycle]: {
    id: ACTIONS_FAB_TYPES.deleteMicrocycle,
    value: 'Eliminar micro-ciclo',
    icon: 'trash-bin-outline',
    color: 'danger',
    role: 'destructive',
  },
  [ACTIONS_FAB_TYPES.addProduct]: {
    id: ACTIONS_FAB_TYPES.addProduct,
    value: 'Añadir producto',
    icon: 'nutrition-outline',
    color: 'primary',
  },
  [ACTIONS_FAB_TYPES.createProduct]: {
    id: ACTIONS_FAB_TYPES.createProduct,
    value: 'Create Product',
    icon: 'add-circle-outline',
    color: 'primary',
  },
  [ACTIONS_FAB_TYPES.createRecipe]: {
    id: ACTIONS_FAB_TYPES.createRecipe,
    value: 'Create Recipe',
    icon: 'restaurant-outline',
    color: 'secondary',
  },
  [ACTIONS_FAB_TYPES.addExercise]: {
    id: ACTIONS_FAB_TYPES.addExercise,
    value: 'Añadir ejercicio',
    icon: 'add-outline',
    color: 'primary',
  },
  [ACTIONS_FAB_TYPES.createExercise]: {
    id: ACTIONS_FAB_TYPES.createExercise,
    value: 'Crear ejercicio',
    icon: 'add-circle-outline',
    color: 'primary',
  },
  [ACTIONS_FAB_TYPES.cancelCopy]: {
    id: ACTIONS_FAB_TYPES.cancelCopy,
    value: 'Cancelar copia',
    icon: 'close-outline',
    color: 'medium',
  },
};

export const ACTIONS_FAB_VALUES = Object.values(ACTIONS_FAB);
