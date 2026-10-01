import { localizeProp } from 'src/app/core/i18n/localized-catalog';

export enum SEX_TYPES {
    female = 0,
    male = 1
}

export const SEX = {
  [SEX_TYPES.female]: 'Femenino',
  [SEX_TYPES.male]: 'Masculino'
} as const;

localizeProp(SEX as Record<string, string>, String(SEX_TYPES.female), 'SEX_NAMES.FEMALE');
localizeProp(SEX as Record<string, string>, String(SEX_TYPES.male), 'SEX_NAMES.MALE');
