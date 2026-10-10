// PURO — un día o un rango de días "YYYY-MM-DD" para leer: «9 oct» o
// «9 oct → 15 oct» (con año si el rango cruza de año). QA 2026-10-09: el
// calendario de entrenamiento pintaba «Rango 2026-10-09».
const formatIsoDay = (iso: string, locale: string, options: Intl.DateTimeFormatOptions): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { ...options, timeZone: 'UTC' }).replace('.', '');

export function dayRangeLabel(start: string | null | undefined, end: string | null | undefined, locale: string): string | null {
  if (!start || !end) return null;
  const crossesYear = start.slice(0, 4) !== end.slice(0, 4);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', ...(crossesYear ? { year: 'numeric' } : {}) };
  const from = formatIsoDay(start, locale, options);
  return start === end ? from : `${from} → ${formatIsoDay(end, locale, options)}`;
}
