import { CHECKIN_FIELDS, CHECKIN_FIELDS_BY_KEY, checkinAnchorFor, scaleLevelsFor } from 'src/app/core/constants/checkin-fields';
import { CalendarCheckin, CheckinComparisonRow, ComparisonTab } from './checkin-workspace.model';

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
// Pedido explícito del entrenador: peso separado de composición corporal
// (hoy comparten grupo de catálogo), seguimiento del entrenamiento y
// comentario cada uno con su propia pestaña (son un único campo cada uno,
// pero conceptualmente no tienen nada que ver con una medida corporal), y
// una pestaña "Bienestar" de reserva para el resto de preguntas de
// bienestar (sueño, hidratación, estrés…) que no tienen pestaña propia —
// así un check-in de bienestar completo no pierde datos de vista aunque el
// entrenador solo haya pedido 5 pestañas.
export const TAB_ORDER: ComparisonTab[] = ['peso', 'composicion_corporal', 'perimetros', 'entrenamiento', 'bienestar', 'comentario', 'custom'];
export const TAB_LABELS: Record<ComparisonTab, string> = {
  peso: 'Peso',
  composicion_corporal: 'Composición corporal',
  perimetros: 'Perímetros',
  entrenamiento: 'Seguimiento del entrenamiento',
  bienestar: 'Bienestar',
  comentario: 'Comentario',
  custom: 'Tus preguntas',
};

// El orden del catálogo, que ya agrupa composición → perímetros → bienestar.
// Antes las filas salían de un Set de claves del objeto de respuestas: sin
// orden ninguno, y distinto entre dos respuestas del mismo formulario.
const CATALOG_ORDER = new Map(CHECKIN_FIELDS.map((field, index) => [field.key, index]));

function tabOf(key: string): ComparisonTab {
  if (key.startsWith('custom:')) return 'custom';
  if (key === 'weight') return 'peso';
  if (key === 'training_adherence') return 'entrenamiento';
  if (key === 'comment') return 'comentario';
  const group = CHECKIN_FIELDS_BY_KEY.get(key)?.group;
  if (group === 'composicion_corporal') return 'composicion_corporal';
  if (group === 'perimetros') return 'perimetros';
  return 'bienestar';
}

// Las preguntas propias del entrenador van al final: son suyas, no del
// catálogo, y mezclarlas entre medias rompe el orden aprendido.
function orderOf(key: string): number {
  return key.startsWith('custom:') ? 10000 : (CATALOG_ORDER.get(key) ?? 9999);
}

export function compareCheckins(current: CalendarCheckin, previous: CalendarCheckin | null): CheckinComparisonRow[] {
  const keys = new Set([...Object.keys(current.values || {}), ...Object.keys(previous?.values || {})]);
  return [...keys].sort((a, b) => orderOf(a) - orderOf(b)).map((key): CheckinComparisonRow => {
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
      tab: tabOf(key),
    };
  });
}

// Solo las pestañas con algo que enseñar, en el orden fijo de TAB_ORDER —
// nunca el orden en que aparecen los datos, o "Comentario" saltaría de
// sitio según el check-in.
export function tabsFor(rows: CheckinComparisonRow[]): { key: ComparisonTab; label: string; count: number }[] {
  const counts = new Map<ComparisonTab, number>();
  for (const row of rows) counts.set(row.tab, (counts.get(row.tab) || 0) + 1);
  return TAB_ORDER.filter(tab => counts.has(tab)).map(tab => ({ key: tab, label: TAB_LABELS[tab], count: counts.get(tab)! }));
}
