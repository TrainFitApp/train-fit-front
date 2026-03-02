export enum ACTION_TYPES {
  edit = 0,
  copy = 1,
  // share = 2,
  delete = 3,
  deselect = 4,
  // paste = 5,
  // archived = 6,
  moveExercises = 7,
  note = 8,
  duplicate = 9,
}

export type ACTION_TYPE = {
  id: ACTION_TYPES;
  value: string;
  icon: string;
  color: string;
};

export const ACTIONS: {
  [id: number]: ACTION_TYPE;
} = {
  // [ACTION_TYPES.archived]: {
  //   id: ACTION_TYPES.archived,
  //   value: 'Guardados',
  //   icon: 'bookmark',
  //   color: 'tertiary',
  // },
  [ACTION_TYPES.edit]: {
    id: ACTION_TYPES.edit,
    value: 'Editar',
    icon: 'pencil-outline',
    color: 'alternative',
  },
  [ACTION_TYPES.copy]: {
    id: ACTION_TYPES.copy,
    value: 'Copiar',
    icon: 'copy-outline',
    color: 'primary',
  },
  [ACTION_TYPES.note]: {
    id: ACTION_TYPES.note,
    value: 'Nota',
    icon: 'create-outline',
    color: 'secondary',
  },
  // [ACTION_TYPES.share]: {
  //   id: ACTION_TYPES.share,
  //   value: 'Compartir',
  //   icon: 'share-social-outline',
  //   color: 'success',
  // },
  [ACTION_TYPES.delete]: {
    id: ACTION_TYPES.delete,
    value: 'Eliminar',
    icon: 'trash-outline',
    color: 'danger',
  },
  [ACTION_TYPES.moveExercises]: {
    id: ACTION_TYPES.moveExercises,
    value: 'Mover ejercicios',
    icon: 'repeat-outline',
    color: 'medium',
  },
  [ACTION_TYPES.deselect]: {
    id: ACTION_TYPES.deselect,
    value: 'Deseleccionar todo',
    icon: 'remove-circle-outline',
    color: 'danger',
  },
  // [ACTION_TYPES.paste]: {
  //   id: ACTION_TYPES.paste,
  //   value: 'Pegar',
  //   icon: 'clipboard-outline',
  //   color: 'secondary',
  // },
  [ACTION_TYPES.duplicate]: {
    id: ACTION_TYPES.duplicate,
    value: 'Duplicar',
    icon: 'duplicate-outline',
    color: 'secondary',
  },
};

export const ACTION_VALUES = Object.values(ACTIONS);
