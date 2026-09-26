import { CHECKIN_FIELDS, CHECKIN_FIELDS_BY_KEY, checkinAnchorFor, scaleLevelsFor } from 'src/app/core/constants/checkin-fields';
import { CustomCheckinQuestion } from '../checkin-templates/models/checkin-template.model';
import { checkinFieldLabel, checkinValueLabel, shortDayLabel } from './checkin-labels.util';

// Cómo se pinta UNA respuesta de check-in en el panel de semana: el peso
// arriba, los datos agrupados por tipo, la frase que eligió el cliente en cada
// escala y lo que ha cambiado frente al check-in anterior. Es PURO: la
// plantilla solo recorre lo que devuelve, sin calcular nada en cada detección
// de cambios (ver el comentario de `checkins` en week-summary-panel).

type CheckinValue = number | string | boolean;

interface ResponseLike {
  respondedAt: string;
  values: Record<string, CheckinValue>;
  customQuestions?: CustomCheckinQuestion[];
}

export interface CheckinDisplayRow {
  key: string;
  label: string;
  value: string;
  // Respuesta larga (comentario, pregunta abierta): va a ancho completo.
  long: boolean;
  // Lo que el cliente eligió en una escala, con sus palabras ("Duermo bien
  // casi todas las noches"): así se lee lo mismo que él respondió.
  anchor: string | null;
  // Cambio frente al check-in anterior, solo en datos numéricos. Sin juicio:
  // subir o bajar no es bueno ni malo sin conocer la fase.
  delta: string | null;
}

export interface CheckinDisplayGroup {
  key: string;
  label: string;
  // Medidas cortas en dos columnas; el resto, una fila por dato.
  layout: 'grid' | 'list';
  rows: CheckinDisplayRow[];
}

export interface CheckinDisplay {
  lead: CheckinDisplayRow | null;
  groups: CheckinDisplayGroup[];
  // "15 sept" cuando algún dato trae cambio: a qué check-in se compara.
  comparedTo: string | null;
}

const GROUPS: Omit<CheckinDisplayGroup, 'rows'>[] = [
  { key: 'composition', label: 'Composición corporal', layout: 'grid' },
  { key: 'perimeters', label: 'Perímetros', layout: 'grid' },
  { key: 'wellbeing', label: 'Bienestar', layout: 'list' },
  { key: 'custom', label: 'Tus preguntas', layout: 'list' },
  { key: 'comment', label: '', layout: 'list' },
];

// Orden del catálogo: antes salían en el de las claves de la respuesta, que
// cambia de un formulario a otro. Las preguntas propias, al final y en su orden.
const CATALOG_ORDER = new Map(CHECKIN_FIELDS.map((field, index) => [field.key, index]));

const CUSTOM_ORDER = 10000;
const LONG_TEXT_CHARS = 32;

const fmt = (value: number): string => value.toLocaleString('es-ES', { maximumFractionDigits: 2 });

function groupOf(key: string): string {
  if (key.startsWith('custom:')) return 'custom';
  if (key === 'comment') return 'comment';
  const group = CHECKIN_FIELDS_BY_KEY.get(key)?.group;
  if (group === 'composicion_corporal') return 'composition';
  return group === 'perimetros' ? 'perimeters' : 'wellbeing';
}

function fieldOf(
  key: string,
  questions: CustomCheckinQuestion[]
): { type?: string; unit: string; levels: number } {
  if (key.startsWith('custom:')) {
    const question = questions.find((q) => String(q._id) === key.slice('custom:'.length));
    return { type: question?.type, unit: question?.unit || '', levels: 5 };
  }
  const field = CHECKIN_FIELDS_BY_KEY.get(key);
  return { type: field?.type, unit: field?.unit || '', levels: scaleLevelsFor(field) };
}

function deltaText(current: number, previous: number, unit: string): string {
  const diff = Math.round((current - previous) * 100) / 100;
  if (diff === 0) return 'Igual';
  return `${diff > 0 ? '+' : '−'}${fmt(Math.abs(diff))}${unit ? ' ' + unit : ''}`;
}

function rowFor(
  key: string,
  value: CheckinValue,
  questions: CustomCheckinQuestion[],
  previous: ResponseLike | null
): CheckinDisplayRow {
  const { type, unit, levels } = fieldOf(key, questions);
  const isScale = type === 'scale_1_5' && typeof value === 'number';
  const before = previous?.values?.[key];

  let shown: string;
  if (typeof value === 'number') shown = isScale ? `${fmt(value)}/${levels}` : `${fmt(value)}${unit ? ' ' + unit : ''}`;
  else shown = checkinValueLabel(value);

  return {
    key,
    label: checkinFieldLabel(key, questions),
    value: shown,
    long: type === 'text' || (typeof value === 'string' && value.length > LONG_TEXT_CHARS),
    anchor: isScale ? checkinAnchorFor(key, value) : null,
    delta: !isScale && typeof value === 'number' && typeof before === 'number' ? deltaText(value, before, unit) : null,
  };
}

export function buildCheckinDisplay(response: ResponseLike, previous: ResponseLike | null): CheckinDisplay {
  const questions = response.customQuestions || [];
  const rows = Object.entries(response.values || {})
    .filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => rowFor(key, value, questions, previous))
    .sort((a, b) => (CATALOG_ORDER.get(a.key) ?? CUSTOM_ORDER) - (CATALOG_ORDER.get(b.key) ?? CUSTOM_ORDER));

  // El peso va aparte y arriba: es el dato con el que se decide la semana
  // siguiente. Si no vino en la respuesta, no hay cabecera.
  const lead = rows.find((row) => row.key === 'weight') || null;
  const rest = rows.filter((row) => row !== lead);

  return {
    lead,
    groups: GROUPS.map((group) => ({ ...group, rows: rest.filter((row) => groupOf(row.key) === group.key) })).filter(
      (group) => group.rows.length
    ),
    comparedTo: previous && rows.some((row) => row.delta) ? shortDayLabel(previous.respondedAt.slice(0, 10)) : null,
  };
}
