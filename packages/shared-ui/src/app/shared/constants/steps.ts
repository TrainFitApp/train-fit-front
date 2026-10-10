export enum STEPS_TYPES {
  notCounted = 0,
  lessThan1000 = 1,
  between2000And6000 = 2,
  between7000And9000 = 3,
  betweenThan10000And15000 = 4,
  betweenThan16000And18000 = 5,
  moreThan19000 = 6,
}

// Rangos contiguos: los cortes son los puntos medios con los que el back
// reparte una media real de pasos (nutritionalGoals/training-factor.js,
// `upTo`). QA 2026-10-09: «Menos de 1000», «Entre 2000 y 6000»… dejaban
// huecos sin opción.
export const STEPS = {
  [STEPS_TYPES.notCounted]: {
    id: STEPS_TYPES.notCounted,
    name: 'STEPS.NOT_COUNTED',
    value: 1,
  },
  [STEPS_TYPES.lessThan1000]: {
    id: STEPS_TYPES.lessThan1000,
    name: 'STEPS.UNDER_1500',
    value: 1.2,
  },
  [STEPS_TYPES.between2000And6000]: {
    id: STEPS_TYPES.between2000And6000,
    name: 'STEPS.FROM_1500_TO_6500',
    value: 1.37,
  },
  [STEPS_TYPES.between7000And9000]: {
    id: STEPS_TYPES.between7000And9000,
    name: 'STEPS.FROM_6500_TO_9500',
    value: 1.46,
  },
  [STEPS_TYPES.betweenThan10000And15000]: {
    id: STEPS_TYPES.betweenThan10000And15000,
    name: 'STEPS.FROM_9500_TO_15500',
    value: 1.55,
  },
  [STEPS_TYPES.betweenThan16000And18000]: {
    id: STEPS_TYPES.betweenThan16000And18000,
    name: 'STEPS.FROM_15500_TO_18500',
    value: 1.71,
  },
  [STEPS_TYPES.moreThan19000]: {
    id: STEPS_TYPES.moreThan19000,
    name: 'STEPS.OVER_18500',
    value: 1.86,
  },
};

export const STEPS_VALUES = Object.values(STEPS);
