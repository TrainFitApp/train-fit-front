import { CHECKIN_FIELDS, CHECKIN_FIELDS_BY_KEY, checkinAnchorFor, scaleLevelsFor } from 'src/app/core/constants/checkin-fields';
import { CheckinEntry, CheckinComparisonRow, ComparisonTab } from './checkin-workspace.model';

// Pestañas de la revisión: peso aparte de la composición corporal, y el
// seguimiento del entrenamiento y el comentario con la suya propia. El resto
// de bienestar cae en "Bienestar" para que ningún dato se quede sin pestaña.
const TAB_ORDER: ComparisonTab[] = ['peso', 'composicion_corporal', 'perimetros', 'fotos', 'entrenamiento', 'bienestar', 'comentario', 'custom'];
const TAB_LABELS: Record<ComparisonTab, string> = {
  peso: 'Peso',
  composicion_corporal: 'Composición corporal',
  perimetros: 'Perímetros',
  fotos: 'Fotos',
  entrenamiento: 'Seguimiento del entrenamiento',
  bienestar: 'Bienestar',
  comentario: 'Comentario',
  custom: 'Tus preguntas',
};

// Filas en el orden del catálogo (y las preguntas propias al final): antes
// salían en el orden de las claves de la respuesta, distinto entre dos
// respuestas del mismo formulario.
const CATALOG_ORDER = new Map(CHECKIN_FIELDS.map((field, index) => [field.key, index]));

function tabOf(key: string): ComparisonTab {
  if (key.startsWith('custom:')) return 'custom';
  if (key === 'weight') return 'peso';
  if (key === 'training_adherence') return 'entrenamiento';
  if (key === 'comment') return 'comentario';
  const group = CHECKIN_FIELDS_BY_KEY.get(key)?.group;
  if (group === 'fotos') return 'fotos';
  return group === 'composicion_corporal' || group === 'perimetros' ? group : 'bienestar';
}

function orderOf(key: string): number {
  return key.startsWith('custom:') ? 10000 : (CATALOG_ORDER.get(key) ?? 9999);
}

const number = (value: number): string => value.toLocaleString('es-ES', { maximumFractionDigits: 2 });
function description(entry: CheckinEntry | null, key: string): { label: string; type: string; unit: string; max?: number } {
  const field = key.startsWith('custom:') ? entry?.customQuestions?.find(q => String(q._id) === key.slice(7)) : CHECKIN_FIELDS_BY_KEY.get(key);
  return { label: field?.label || 'Pregunta del histórico', type: field?.type || 'unknown', unit: field?.unit || '',
    max: field?.type === 'scale_1_5' ? (key.startsWith('custom:') ? 5 : scaleLevelsFor(CHECKIN_FIELDS_BY_KEY.get(key))) : undefined };
}
function display(value: unknown, info: ReturnType<typeof description>): string {
  if (value == null) return '—';
  // Fotos: el valor es el id del día; las fotos se ven en su pestaña.
  if (info.type === 'photos') return 'Enviadas';
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  if (typeof value === 'number') return `${number(value)}${info.max ? '/' + info.max : info.unit ? ' ' + info.unit : ''}`;
  return String(value);
}
export function compareCheckins(current: CheckinEntry, previous: CheckinEntry | null): CheckinComparisonRow[] {
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

// Solo las pestañas con algo que enseñar, en el orden fijo de TAB_ORDER.
export function tabsFor(rows: CheckinComparisonRow[]): { key: ComparisonTab; label: string; count: number }[] {
  const counts = new Map<ComparisonTab, number>();
  for (const row of rows) counts.set(row.tab, (counts.get(row.tab) || 0) + 1);
  return TAB_ORDER.filter(tab => counts.has(tab)).map(tab => ({ key: tab, label: TAB_LABELS[tab], count: counts.get(tab)! }));
}
