export enum OBJETIVE_TYPES {
  gain = 0,
  maintenance = 1,
  loss = 2,
}

export type OBJETIVE_TYPE = {
  id: OBJETIVE_TYPES;
  name: string;
  key: string;
  value?: number;
};

export const OBJETIVES: {
  [id: number]: OBJETIVE_TYPE;
} = {
  [OBJETIVE_TYPES.gain]: {
    id: OBJETIVE_TYPES.gain,
    name: 'Ganancia Peso',
    key: 'superávit',
    value: 300,
  },
  [OBJETIVE_TYPES.maintenance]: {
    id: OBJETIVE_TYPES.maintenance,
    name: 'Mantener Peso',
    key: 'mantenimiento',
    value: 0,
  },
  [OBJETIVE_TYPES.loss]: {
    id: OBJETIVE_TYPES.loss,
    name: 'Perder Peso',
    key: 'déficit',
    value: -300,
  },
} as const;

export const OBJETIVES_VALUES = Object.values(OBJETIVES);
