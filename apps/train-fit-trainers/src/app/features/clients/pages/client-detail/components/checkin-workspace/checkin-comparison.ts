import { CHECKIN_FIELDS_BY_KEY, checkinAnchorFor, scaleLevelsFor } from 'src/app/core/constants/checkin-fields';
import { CalendarCheckin, CheckinComparisonRow } from './checkin-workspace.model';

const number = (value: number): string => value.toLocaleString('es-ES', { maximumFractionDigits: 2 });
function description(entry: CalendarCheckin | null, key: string): { label: string; type: string; unit: string; max?: number } {
  const field = key.startsWith('custom:') ? entry?.customQuestions?.find(q => String(q._id) === key.slice(7)) : CHECKIN_FIELDS_BY_KEY.get(key);
  return { label: field?.label || 'Pregunta del histórico', type: field?.type || 'unknown', unit: field?.unit || '',
    max: field?.type === 'scale_1_5' ? (key.startsWith('custom:') ? 5 : scaleLevelsFor(CHECKIN_FIELDS_BY_KEY.get(key))) : undefined };
}
function display(value: unknown, info: ReturnType<typeof description>): string {
  if (value == null) return '—';
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  if (typeof value === 'number') return `${number(value)}${info.max ? '/' + info.max : info.unit ? ' ' + info.unit : ''}`;
  return String(value);
}
export function compareCheckins(current: CalendarCheckin, previous: CalendarCheckin | null): CheckinComparisonRow[] {
  const keys = new Set([...Object.keys(current.values || {}), ...Object.keys(previous?.values || {})]);
  return [...keys].map(key => {
    const a = previous?.values?.[key];
    const b = current.values?.[key];
    const info = description(current, key);
    const old = description(previous, key);
    const comparable = previous?.scheduleId === current.scheduleId && info.type !== 'unknown' && info.type === old.type && info.unit === old.unit && info.max === old.max;
    const delta = comparable && typeof a === 'number' && typeof b === 'number' ? Math.round((b - a) * 100) / 100 : null;
    return { key, label: info.label, previous: display(a, old), current: display(b, info),
      direction: delta == null ? 'missing' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat',
      change: delta == null ? (a == null || b == null ? '—' : !comparable ? 'No comparable' : a === b ? 'Igual' : 'Cambió')
        : delta === 0 ? 'Igual' : `${delta > 0 ? '+' : '−'}${number(Math.abs(delta))}${info.max ? Math.abs(delta) === 1 ? ' punto' : ' puntos' : info.unit ? ' ' + info.unit : ''}`,
      anchor: checkinAnchorFor(key, b),
    };
  });
}
