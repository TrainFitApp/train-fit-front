// Qué suplementos tocan un día concreto en la pantalla de dieta.
//
// El backend ya filtra por fechas (inicio y fin de la pauta), pero no por
// días de la semana: la pantalla de Suplementos del Coach lista la pauta
// entera con su "Solo lunes, miércoles", y la de dieta tiene que enseñar
// solo lo que toca el día que se está mirando.

export interface DaySupplement {
  // Días de la semana (0 = domingo). Vacío = todos los días.
  weekdays?: number[];
}

/** Día de la semana (0 = domingo) de una fecha "YYYY-MM-DD", sin depender de la zona horaria. */
export function weekdayOf(isoDate: string): number {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

/** Los que se toman ese día, en el mismo orden en que llegan. */
export function supplementsForDay<T extends DaySupplement>(supplements: T[], isoDate: string): T[] {
  const weekday = weekdayOf(isoDate);
  return supplements.filter((supplement) => !supplement.weekdays?.length || supplement.weekdays.includes(weekday));
}
