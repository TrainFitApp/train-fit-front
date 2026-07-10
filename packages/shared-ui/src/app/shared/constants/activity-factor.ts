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
    name: 'ACTIVITY_FACTOR.VERY_LIGHT',
    value: 1.15,
    description: 'ACTIVITY_FACTOR.VERY_LIGHT_DESC',
  },
  [ACTIVITY_FACTOR_TYPES.light]: {
    id: ACTIVITY_FACTOR_TYPES.light,
    name: 'ACTIVITY_FACTOR.LIGHT',
    value: 1.3,
    description: 'ACTIVITY_FACTOR.LIGHT_DESC',
  },
  [ACTIVITY_FACTOR_TYPES.moderate]: {
    id: ACTIVITY_FACTOR_TYPES.moderate,
    name: 'ACTIVITY_FACTOR.MODERATE',
    value: 1.45,
    description: 'ACTIVITY_FACTOR.MODERATE_DESC',
  },
  [ACTIVITY_FACTOR_TYPES.active]: {
    id: ACTIVITY_FACTOR_TYPES.active,
    name: 'ACTIVITY_FACTOR.ACTIVE',
    value: 1.6,
    description: 'ACTIVITY_FACTOR.ACTIVE_DESC',
  },
  [ACTIVITY_FACTOR_TYPES.veryActive]: {
    id: ACTIVITY_FACTOR_TYPES.veryActive,
    name: 'ACTIVITY_FACTOR.VERY_ACTIVE',
    value: 1.75,
    description: 'ACTIVITY_FACTOR.VERY_ACTIVE_DESC',
  },
};

export const ACTIVITY_FACTOR_VALUES = Object.values(ACTIVITY_FACTOR);
