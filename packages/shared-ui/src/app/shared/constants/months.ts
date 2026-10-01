import { localizeProp } from 'src/app/core/i18n/localized-catalog';

export const MONTHS = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre',
} as const;

Object.keys(MONTHS).forEach((index) =>
  localizeProp(MONTHS as Record<string, string>, index, `WEIGHT_INFO.MONTHS.${index}`)
);