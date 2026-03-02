export enum ACTIVITY_FACTOR_TYPES {
  veryLight = 1,
  light = 2,
  moderate = 3,
  active = 4,
  veryActive = 5,
}

export type ACTIVITY_FACTOR_TYPE = {
  id: ACTIVITY_FACTOR_TYPES;
  value: number;
  name: string;
  description: string;
};

export const ACTIVITY_FACTOR = {
  [ACTIVITY_FACTOR_TYPES.veryLight]: {
    id: ACTIVITY_FACTOR_TYPES.veryLight,
    name: 'Muy ligero',
    value: 1.15,
    description: 'Poco o ningún movimiento físico, principalmente inactivo',
  },
  [ACTIVITY_FACTOR_TYPES.light]: {
    id: ACTIVITY_FACTOR_TYPES.light,
    name: 'Ligero',
    value: 1.3,
    description: 'Actividad física mínima, como estar sentado o de pie',
  },
  [ACTIVITY_FACTOR_TYPES.moderate]: {
    id: ACTIVITY_FACTOR_TYPES.moderate,
    name: 'Moderado',
    value: 1.45,
    description:
      'Actividad física regular, como caminar o tareas domésticas ligeras',
  },
  [ACTIVITY_FACTOR_TYPES.active]: {
    id: ACTIVITY_FACTOR_TYPES.active,
    name: 'Activo',
    value: 1.6,
    description: 'Participación regular en actividades físicas, como correr',
  },
  [ACTIVITY_FACTOR_TYPES.veryActive]: {
    id: ACTIVITY_FACTOR_TYPES.veryActive,
    name: 'Muy activo',
    value: 1.75,
    description:
      'Nivel alto de actividad física, como entrenamientos cardiovasculares intensos',
  },
};

export const ACTIVITY_FACTOR_VALUES = Object.values(ACTIVITY_FACTOR);
