export enum STEPS_TYPES {
  notCounted = 0,
  lessThan1000 = 1,
  between2000And6000 = 2,
  between7000And9000 = 3,
  betweenThan10000And15000 = 4,
  betweenThan16000And18000 = 5,
  moreThan19000 = 6,
}

export type STEP_TYPE = {
  id: STEPS_TYPES;
  name: string;
  value: string;
};

// Cuando le da a ninguno
export const STEPS = {
  [STEPS_TYPES.notCounted]: {
    id: STEPS_TYPES.notCounted,
    name: 'No los he contado',
    value: 1,
  },
  [STEPS_TYPES.lessThan1000]: {
    id: STEPS_TYPES.lessThan1000,
    name: 'Menos de 1000',
    value: 1.2,
  },
  [STEPS_TYPES.between2000And6000]: {
    id: STEPS_TYPES.between2000And6000,
    name: 'Entre 2000 y 6000',
    value: 1.37,
  },
  [STEPS_TYPES.between7000And9000]: {
    id: STEPS_TYPES.between7000And9000,
    name: 'Entre 7000 y 9000',
    value: 1.46,
  },
  [STEPS_TYPES.betweenThan10000And15000]: {
    id: STEPS_TYPES.betweenThan10000And15000,
    name: 'Entre 10000 y 15000',
    value: 1.55,
  },
  [STEPS_TYPES.betweenThan16000And18000]: {
    id: STEPS_TYPES.betweenThan16000And18000,
    name: 'Entre 16000 y 18000',
    value: 1.71,
  },
  [STEPS_TYPES.moreThan19000]: {
    id: STEPS_TYPES.moreThan19000,
    name: 'Más de 19000',
    value: 1.86,
  },
};

export const STEPS_VALUES = Object.values(STEPS);
