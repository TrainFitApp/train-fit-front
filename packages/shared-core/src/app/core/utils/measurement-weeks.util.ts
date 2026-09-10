export interface DatedWeight { date: string; weight?: number | null; }
export interface WeightWeek { start: string; end: string; average: number | null; count: number; partial: boolean; }

export function isCivilDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function addCivilDays(date: string, count: number): string {
  return new Date(new Date(`${date}T00:00:00.000Z`).getTime() + count * 86400000).toISOString().slice(0, 10);
}

export function mondayOf(date: string): string {
  if (!isCivilDate(date)) throw new Error('Invalid civil date');
  const weekday = new Date(`${date}T00:00:00.000Z`).getUTCDay();
  return addCivilDays(date, -((weekday + 6) % 7));
}

export function measurementToday(timeZone: string = 'UTC', now: Date = new Date()): string {
  let formatter: Intl.DateTimeFormat;
  try { formatter = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }); }
  catch { formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' }); }
  const parts = formatter.formatToParts(now);
  const part = (type: string): string => parts.find((item) => item.type === type)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function positiveWeight(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function weightAverage(values: readonly unknown[]): number | null {
  const valid = values.filter(positiveWeight);
  return valid.length ? Math.round((valid.reduce((sum, value) => sum + value, 0) / valid.length + Number.EPSILON) * 100) / 100 : null;
}

export function weightWeek(entries: readonly DatedWeight[], date: string, today: string): WeightWeek {
  const start = mondayOf(date);
  const end = addCivilDays(start, 6);
  const days = new Map<string, number>();
  for (const entry of entries) {
    if (isCivilDate(entry.date) && entry.date >= start && entry.date <= end && entry.date <= today && positiveWeight(entry.weight)) {
      days.set(entry.date, entry.weight);
    }
  }
  return { start, end, average: weightAverage([...days.values()]), count: days.size, partial: end >= today };
}
