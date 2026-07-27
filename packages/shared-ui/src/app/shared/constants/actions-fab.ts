export enum ACTIONS_FAB_TYPES {
  addWorkout = 0,
  addMicrocycle = 1,
  deleteMicrocycle = 2,
  addProduct = 4,
  createProduct = 5,
  addExercise = 6,
  duplicateMicrocycle = 7,
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
    value: 'ACTIONS_FAB.ADD_WORKOUT',
    icon: 'barbell-outline',
  },
  [ACTIONS_FAB_TYPES.addMicrocycle]: {
    id: ACTIONS_FAB_TYPES.addMicrocycle,
    value: 'ACTIONS_FAB.ADD_MICROCYCLE',
    icon: 'albums-outline',
    color: 'tertiary',
  },
  [ACTIONS_FAB_TYPES.duplicateMicrocycle]: {
    id: ACTIONS_FAB_TYPES.duplicateMicrocycle,
    value: 'ACTIONS_FAB.DUPLICATE_MICROCYCLE',
    icon: 'albums-outline',
    color: 'tertiary',
  },
  [ACTIONS_FAB_TYPES.deleteMicrocycle]: {
    id: ACTIONS_FAB_TYPES.deleteMicrocycle,
    value: 'ACTIONS_FAB.DELETE_MICROCYCLE',
    icon: 'trash-bin-outline',
    color: 'danger',
    role: 'destructive',
  },
  [ACTIONS_FAB_TYPES.addProduct]: {
    id: ACTIONS_FAB_TYPES.addProduct,
    value: 'ACTIONS_FAB.ADD_PRODUCT',
    icon: 'nutrition-outline',
    color: 'primary',
  },
  [ACTIONS_FAB_TYPES.createProduct]: {
    id: ACTIONS_FAB_TYPES.createProduct,
    value: 'ACTIONS_FAB.CREATE_PRODUCT',
    icon: 'add-circle-outline',
    color: 'primary',
  },
  [ACTIONS_FAB_TYPES.createRecipe]: {
    id: ACTIONS_FAB_TYPES.createRecipe,
    value: 'ACTIONS_FAB.CREATE_RECIPE',
    icon: 'restaurant-outline',
    color: 'secondary',
  },
  [ACTIONS_FAB_TYPES.addExercise]: {
    id: ACTIONS_FAB_TYPES.addExercise,
    value: 'ACTIONS_FAB.ADD_EXERCISE',
    icon: 'add-outline',
    color: 'primary',
  },
  [ACTIONS_FAB_TYPES.createExercise]: {
    id: ACTIONS_FAB_TYPES.createExercise,
    value: 'ACTIONS_FAB.CREATE_EXERCISE',
    icon: 'add-circle-outline',
    color: 'primary',
  },
};

export const ACTIONS_FAB_VALUES = Object.values(ACTIONS_FAB);
