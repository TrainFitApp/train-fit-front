export enum SEX_TYPES {
    female = 0,
    male = 1
}

export const SEX = {
  [SEX_TYPES.female]: 'Femenino',
  [SEX_TYPES.male]: 'Masculino'
} as const;
