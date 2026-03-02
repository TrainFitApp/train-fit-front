import { STEPS, STEPS_TYPES } from './steps';

export enum TRAINING_TYPES {
  veryLight = 1,
  light = 2,
  moderate = 3,
  active = 4,
}

export type TRAINING_TYPE = {
  id: TRAINING_TYPES;
  name: string;
  value: string;
};

export const calculateTrainingValues = (selectedStep: number) => {
  switch (selectedStep) {
    case STEPS[STEPS_TYPES.notCounted].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'Ninguno',
          value: 1,
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: '1 o 2 días',
          value: 1.02,
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: '3 o 4 días',
          value: 1.05,
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: '5 o 6 días',
          value: 1.07,
        },
      };
    case STEPS[STEPS_TYPES.lessThan1000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'Ninguno',
          value: 1.0862,
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: '1 o 2 días',
          value: 1.107,
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: '3 o 4 días',
          value: 1.14,
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: '5 o 6 días',
          value: 1.162,
        },
      };
    case STEPS[STEPS_TYPES.between2000And6000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'Ninguno',
          value: 1.24,
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: '1 o 2 días',
          value: 1.264,
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: '3 o 4 días',
          value: 1.301,
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: '5 o 6 días',
          value: 1.326,
        },
      };
    case STEPS[STEPS_TYPES.between7000And9000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'Ninguno',
          value: 1.321,
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: '1 o 2 días',
          value: 1.348,
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: '3 o 4 días',
          value: 1.387,
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: '5 o 6 días',
          value: 1.413,
        },
      };
    case STEPS[STEPS_TYPES.betweenThan10000And15000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'Ninguno',
          value: 1.402,
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: '1 o 2 días',
          value: 1.431,
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: '3 o 4 días',
          value: 1.472,
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: '5 o 6 días',
          value: 1.5,
        },
      };
    case STEPS[STEPS_TYPES.betweenThan16000And18000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'Ninguno',
          value: 1.547,
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: '1 o 2 días',
          value: 1.578,
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: '3 o 4 días',
          value: 1.625,
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: '5 o 6 días',
          value: 1.655,
        },
      };
    case STEPS[STEPS_TYPES.moreThan19000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'Ninguno',
          value: 1.683,
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: '1 o 2 días',
          value: 1.717,
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: '3 o 4 días',
          value: 1.767,
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: '5 o 6 días',
          value: 1.801,
        },
      };
    // Agregar más casos según sea necesario para otros valores de STEPS_TYPES
    default:
      return null; // Valor por defecto o un objeto vacío
  }
};

