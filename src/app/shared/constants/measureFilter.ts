export enum MEASURE_FILTER_TYPES {
  auto = -1,
  cieng = 0,
  racion = 1,
  total = 2
}

export type MEASURE_FILTER_TYPE = {
  id: MEASURE_FILTER_TYPES;
  name: string;
  description: string;
};

export const MEASURE_FILTER: {
  [id: number]: MEASURE_FILTER_TYPE;
} = {
  [MEASURE_FILTER_TYPES.auto]: {
    id: MEASURE_FILTER_TYPES.auto,
    name: 'Auto',
    description: 'Automático',
  },
  [MEASURE_FILTER_TYPES.total]: {
    id: MEASURE_FILTER_TYPES.total,
    name: 'Peso total',
    description: 'Por peso total',
  },
  [MEASURE_FILTER_TYPES.cieng]: {
    id: MEASURE_FILTER_TYPES.cieng,
    name: 'Cada 100g',
    description: 'Por cada 100g',
  },
  [MEASURE_FILTER_TYPES.racion]: {
    id: MEASURE_FILTER_TYPES.racion,
    name: 'Ración',
    description: 'Por ración',
  },
};

export const MEASURE_FILTER_VALUES = Object.values(MEASURE_FILTER_TYPES);
