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
    name: 'MEASURE_FILTER.AUTO',
    description: 'MEASURE_FILTER.AUTO_DESC',
  },
  [MEASURE_FILTER_TYPES.total]: {
    id: MEASURE_FILTER_TYPES.total,
    name: 'MEASURE_FILTER.TOTAL_WEIGHT',
    description: 'MEASURE_FILTER.TOTAL_WEIGHT_DESC',
  },
  [MEASURE_FILTER_TYPES.cieng]: {
    id: MEASURE_FILTER_TYPES.cieng,
    name: 'MEASURE_FILTER.PER_100G',
    description: 'MEASURE_FILTER.PER_100G_DESC',
  },
  [MEASURE_FILTER_TYPES.racion]: {
    id: MEASURE_FILTER_TYPES.racion,
    name: 'MEASURE_FILTER.SERVING',
    description: 'MEASURE_FILTER.SERVING_DESC',
  },
};

export const MEASURE_FILTER_VALUES = Object.values(MEASURE_FILTER_TYPES);
