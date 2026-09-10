import { CHECKIN_FIELDS, CHECKIN_FIELDS_BY_KEY, checkinAnchorFor, scaleLevelsFor } from 'src/app/core/constants/checkin-fields';
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
const GROUP_LABELS: Record<string, string> = {
  composicion_corporal: 'Composición corporal',
  perimetros: 'Perímetros',
  bienestar: 'Cómo se encuentra',
  custom: 'Tus preguntas',
};

// El orden del catálogo, que ya agrupa composición → perímetros → bienestar.
// Antes las filas salían de un Set de claves del objeto de respuestas: sin
// orden ninguno, y distinto entre dos respuestas del mismo formulario.
const CATALOG_ORDER = new Map(CHECKIN_FIELDS.map((field, index) => [field.key, index]));

function groupOf(key: string): string {
  if (key.startsWith('custom:')) return 'custom';
  return CHECKIN_FIELDS_BY_KEY.get(key)?.group || 'bienestar';
}

// Las preguntas propias del entrenador van al final: son suyas, no del
// catálogo, y mezclarlas entre medias rompe el orden aprendido.
function orderOf(key: string): number {
  return key.startsWith('custom:') ? 10000 : (CATALOG_ORDER.get(key) ?? 9999);
}

export function compareCheckins(current: CalendarCheckin, previous: CalendarCheckin | null): CheckinComparisonRow[] {
  const keys = new Set([...Object.keys(current.values || {}), ...Object.keys(previous?.values || {})]);
  const rows: CheckinComparisonRow[] = [...keys].sort((a, b) => orderOf(a) - orderOf(b)).map((key): CheckinComparisonRow => {
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
      group: groupOf(key),
      groupLabel: '',
    };
  });

  // La cabecera la lleva la primera fila de cada grupo: así la tabla sigue
  // siendo una sola —el entrenador necesita ver el peso y el sueño a la vez
  // para interpretarlos— pero deja de leerse como una lista plana.
  let previousGroup = '';
  for (const row of rows) {
    if (row.group !== previousGroup) {
      row.groupLabel = GROUP_LABELS[row.group] || '';
      previousGroup = row.group;
    }
  }
  return rows;
}
