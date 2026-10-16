import { localizeList } from 'src/app/core/i18n/localized-catalog';

// Días de la semana de un suplemento en corto ("Lun, Mié"), en el idioma de
// la app. Lo usan Coach > Suplementos y la hoja del suplemento en Dietas.
const WEEKDAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
localizeList(WEEKDAY_LABELS, 'SUPPLEMENTS.WEEKDAYS_SHORT');

/** La semana de lunes a domingo, para elegir días (0 = domingo). */
export const SUPPLEMENT_WEEK: ReadonlyArray<{ value: number; label: string }> = [1, 2, 3, 4, 5, 6, 0].map((value) => ({
  value,
  get label() {
    return WEEKDAY_LABELS[value];
  },
}));

/** Vacío = todos los días, que es el caso normal y no se escribe. */
export function supplementWeekdaysLabel(weekdays: number[] | undefined): string {
  return (weekdays || []).map((day) => WEEKDAY_LABELS[day] || '').filter(Boolean).join(', ');
}
