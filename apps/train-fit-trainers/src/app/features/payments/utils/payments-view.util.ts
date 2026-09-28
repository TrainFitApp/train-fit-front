import {
  ChargeOrigin,
  ClientPaymentsSummary,
  PaymentCharge,
  PaymentMethod,
  PaymentsApiError,
  RecurrenceUnit,
} from '../models/payments.model';

// PURO — cómo se leen importes, fechas y estados de cobro en la app del
// entrenador. Sin Angular ni HTTP: lo prueba payments-view.test.cjs.

const MONEY_FORMATTERS = new Map<string, Intl.NumberFormat>();

export function formatCents(cents: number, currency = 'EUR'): string {
  let formatter = MONEY_FORMATTERS.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });
    MONEY_FORMATTERS.set(currency, formatter);
  }
  return formatter.format(Math.round(cents) / 100);
}

// Valor inicial de un campo de importe ("40,50"): coma decimal, sin símbolo.
export function centsToInput(cents: number): string {
  return (Math.round(cents) / 100).toFixed(2).replace('.', ',');
}

// Misma regla que el backend (money.ts): positivo, hasta 2 decimales,
// coma o punto. null = no válido.
export function parseAmountInput(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (!/^\d{1,7}(?:[.,]\d{1,2})?$/.test(text)) return null;
  const [whole, fraction = ''] = text.split(/[.,]/);
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return cents > 0 && cents <= 100_000_000 ? cents : null;
}

// --- Días civiles -----------------------------------------------------------

const DAY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function dayToUtc(day: string): Date | null {
  const match = DAY_RE.exec(day || '');
  if (!match) return null;
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12));
}

// Formateadores creados una vez: se usan por fila en cada ciclo de pintado.
const DATE_FORMATTERS = new Map<string, Intl.DateTimeFormat>();

function dateFormatter(key: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  let formatter = DATE_FORMATTERS.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('es-ES', options);
    DATE_FORMATTERS.set(key, formatter);
  }
  return formatter;
}

// Formato en UTC a propósito: el día civil ya es el que es; ninguna zona del
// dispositivo puede moverlo.
export function formatDay(day: string, withYear = false): string {
  const date = dayToUtc(day);
  if (!date) return day || '—';
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', timeZone: 'UTC', ...(withYear ? { year: 'numeric' } : {}) };
  return dateFormatter(withYear ? 'day-year' : 'day', options).format(date).replace('.', '');
}

export function formatDayLong(day: string): string {
  const date = dayToUtc(day);
  if (!date) return day || '—';
  const text = dateFormatter('day-long', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(date)
    .replace(/\./g, '');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Instante (cuándo se anotó algo) en español y en la hora del dispositivo.
export function formatInstant(value: string | Date | null | undefined, timeZone?: string): string {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...(timeZone ? { timeZone } : {}),
  };
  return dateFormatter(`instant:${timeZone ?? ''}`, options).format(date).replace('.', '');
}

export function addDays(day: string, delta: number): string {
  const date = dayToUtc(day);
  if (!date) return day;
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  const a = dayToUtc(from);
  const b = dayToUtc(to);
  if (!a || !b) return 0;
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

// "Hoy", "Mañana", "En 3 días", "Hace 2 días": relativo al HOY del backend
// (zona del entrenador), nunca al reloj del dispositivo.
export function dueRelative(dueDay: string, today: string): string {
  const diff = daysBetween(today, dueDay);
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  if (diff === -1) return 'Ayer';
  if (diff > 1) return `En ${diff} días`;
  return `Hace ${-diff} días`;
}

// Mismo cálculo que el backend (calendar.ts): siempre desde el ancla, así que
// el 31 cae en el último día de febrero y vuelve al 31 en marzo.
export function addMonthsClamped(anchor: string, months: number): string {
  const match = DAY_RE.exec(anchor || '');
  if (!match) return anchor;
  const total = Number(match[2]) - 1 + months;
  const year = Number(match[1]) + Math.floor(total / 12);
  const month = ((total % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const day = Math.min(Number(match[3]), lastDay);
  return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

// Próximos `count` vencimientos desde `fromDay` (incluido) de una regla.
export function occurrencesFrom(unit: RecurrenceUnit, interval: number, anchorDay: string, fromDay: string, count: number): string[] {
  const result: string[] = [];
  if (!DAY_RE.test(anchorDay || '') || !Number.isInteger(interval) || interval < 1) return result;
  for (let index = 0; result.length < count && index < 2000; index += 1) {
    const day = unit === 'week' ? addDays(anchorDay, index * 7 * interval) : addMonthsClamped(anchorDay, index * interval);
    if (day >= fromDay) result.push(day);
  }
  return result;
}

// --- Frecuencia ----------------------------------------------------------------

export interface FrequencyPreset {
  key: string;
  unit: RecurrenceUnit;
  interval: number;
  label: string;
  hint: string;
}

// Mensual y "cada 4 semanas" son modalidades distintas: 12 cobros al año
// frente a 13, y el día del mes se mueve con la segunda.
export const FREQUENCY_PRESETS: FrequencyPreset[] = [
  { key: 'monthly', unit: 'month', interval: 1, label: 'Mensual', hint: 'El mismo día de cada mes · 12 al año' },
  { key: 'four-weeks', unit: 'week', interval: 4, label: 'Cada 4 semanas', hint: 'Mismo día de la semana · 13 al año' },
  { key: 'weekly', unit: 'week', interval: 1, label: 'Semanal', hint: 'Cada semana, mismo día' },
  { key: 'biweekly', unit: 'week', interval: 2, label: 'Cada 2 semanas', hint: 'Cada 14 días' },
  { key: 'quarterly', unit: 'month', interval: 3, label: 'Trimestral', hint: 'Cada 3 meses' },
  { key: 'semiannual', unit: 'month', interval: 6, label: 'Semestral', hint: 'Cada 6 meses' },
  { key: 'annual', unit: 'month', interval: 12, label: 'Anual', hint: 'Una vez al año' },
];

export const INTERVAL_LIMITS: Record<RecurrenceUnit, { min: number; max: number }> = {
  week: { min: 1, max: 52 },
  month: { min: 1, max: 24 },
};

export function frequencyLabel(unit: RecurrenceUnit, interval: number): string {
  const preset = FREQUENCY_PRESETS.find((item) => item.unit === unit && item.interval === interval);
  if (preset) return preset.label;
  return unit === 'week' ? `Cada ${interval} semanas` : `Cada ${interval} meses`;
}

// --- Métodos y estados ---------------------------------------------------------

export const PAYMENT_METHODS: Array<{ value: Exclude<PaymentMethod, 'unknown'>; label: string; icon: string }> = [
  { value: 'bizum', label: 'Bizum', icon: 'phone-portrait-outline' },
  { value: 'transfer', label: 'Transferencia', icon: 'swap-horizontal-outline' },
  { value: 'cash', label: 'Efectivo', icon: 'cash-outline' },
  { value: 'card_external', label: 'Tarjeta (externa)', icon: 'card-outline' },
  { value: 'other', label: 'Otro', icon: 'ellipsis-horizontal-outline' },
];

export function methodLabel(method: PaymentMethod): string {
  if (method === 'unknown') return 'Método desconocido';
  return PAYMENT_METHODS.find((item) => item.value === method)?.label ?? 'Otro';
}

export function chargeTitle(charge: { concept: string | null; origin: ChargeOrigin }): string {
  if (charge.concept) return charge.concept;
  if (charge.origin === 'recurring') return 'Cuota';
  if (charge.origin === 'legacy') return 'Cobro';
  return 'Cobro puntual';
}

export type ChipTone = 'danger' | 'warning' | 'accent' | 'success' | 'muted';

export interface StatusChip {
  label: string;
  tone: ChipTone;
}

// Pago y temporalidad son ejes distintos: un cobro puede ser "Parcial" Y
// "Vencido" a la vez, así que salen dos chips, no uno.
export function statusChips(charge: Pick<PaymentCharge, 'status' | 'temporal' | 'receivedCents' | 'cancelledCents' | 'forecast' | 'anomalies' | 'historical'>): StatusChip[] {
  const chips: StatusChip[] = [];
  if (charge.status === 'void') return [{ label: 'Anulada (previsión)', tone: 'muted' }];
  if (charge.status === 'settled') chips.push({ label: 'Liquidado', tone: 'success' });
  if (charge.status === 'cancelled') {
    chips.push({ label: charge.receivedCents > 0 ? 'Resto anulado' : 'Anulado', tone: 'muted' });
  }
  if (charge.status === 'open') {
    if (charge.temporal === 'overdue') chips.push({ label: 'Vencido', tone: 'danger' });
    if (charge.temporal === 'due_today') chips.push({ label: 'Vence hoy', tone: 'warning' });
    if (charge.receivedCents > 0) chips.push({ label: 'Parcial', tone: 'accent' });
    if (charge.forecast) chips.push({ label: 'Previsto', tone: 'muted' });
  }
  if (charge.historical) chips.push({ label: 'Deuda anterior', tone: 'muted' });
  if (charge.anomalies.length) chips.push({ label: 'Revisar datos', tone: 'warning' });
  return chips;
}

// Segmentos de la barra de saldo: recibido + anulado + pendiente = importe.
export interface BalanceSegments {
  received: number;
  cancelled: number;
  pending: number;
}

export function balanceSegments(charge: Pick<PaymentCharge, 'amountCents' | 'receivedCents' | 'cancelledCents' | 'balanceCents'>): BalanceSegments {
  const total = Math.max(charge.amountCents, 1);
  const pct = (value: number) => Math.max(0, Math.min(100, (value / total) * 100));
  return { received: pct(charge.receivedCents), cancelled: pct(charge.cancelledCents), pending: pct(charge.balanceCents) };
}

export const ANOMALY_LABELS: Record<string, string> = {
  non_eur_currency: 'Divisa distinta de EUR: no se suma a los totales en euros.',
  amount_precision: 'Importe antiguo con más de dos decimales.',
  invalid_amount: 'Importe antiguo no válido: corrígelo antes de registrar pagos.',
  invalid_due_date: 'Fecha de vencimiento antigua no válida.',
  ambiguous_due_date: 'Fecha antigua ambigua: comprueba que el día es correcto.',
  invalid_paid_at: 'Fecha de pago antigua no válida.',
};

// --- Tarjeta del Resumen ---------------------------------------------------------

export type CardAction = 'configure-fee' | 'register' | 'manage' | 'history';
export type CardTone = 'danger' | 'warning' | 'accent' | 'calm' | 'muted';

export interface PaymentsCardView {
  tone: CardTone;
  headline: string;
  amount: string | null;
  detail: string | null;
  context: string | null;
  primary: { label: string; action: CardAction };
  secondary: { label: string; action: CardAction } | null;
  notes: string[];
}

function count(value: number, singular: string, plural: string): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

// La deuda manda: pausar una cuota no esconde lo que se debe.
export function paymentsCardView(summary: ClientPaymentsSummary): PaymentsCardView {
  const plan = summary.plan;
  const planLabel = plan ? `Cuota ${frequencyLabel(plan.unit, plan.interval).toLowerCase()}` : null;
  const notes: string[] = [];
  if (plan?.status === 'paused' && summary.state !== 'paused') notes.push('Cuota pausada');
  for (const other of summary.otherCurrencies) notes.push(`${formatCents(other.balanceCents, other.currency)} pendientes en ${other.currency} (divisa antigua)`);
  if (summary.needsReview) notes.push(`${count(summary.needsReview, 'cobro antiguo', 'cobros antiguos')} por revisar`);

  switch (summary.state) {
    case 'overdue': {
      const overdue = summary.overdue!;
      return {
        tone: 'danger',
        headline: 'Vencido',
        amount: formatCents(overdue.balanceCents),
        detail: `${count(overdue.count, 'cobro', 'cobros')} · el más antiguo del ${formatDay(overdue.oldestDueDay)}`,
        context: planLabel,
        primary: { label: 'Gestionar cobros', action: 'manage' },
        secondary: null,
        notes,
      };
    }
    case 'due_today': {
      const due = summary.dueToday!;
      return {
        tone: 'warning',
        headline: 'Vence hoy',
        amount: formatCents(due.balanceCents),
        detail: due.count > 1 ? `${count(due.count, 'cobro', 'cobros')} pendientes hoy` : 'pendiente hoy',
        context: planLabel,
        primary: due.chargeId ? { label: 'Registrar pago', action: 'register' } : { label: 'Gestionar cobros', action: 'manage' },
        secondary: due.chargeId ? { label: 'Gestionar cobros', action: 'manage' } : null,
        notes,
      };
    }
    case 'paused':
      return {
        tone: 'muted',
        headline: 'Cuota pausada',
        amount: summary.pendingCents > 0 ? formatCents(summary.pendingCents) : null,
        detail: summary.pendingCents > 0 ? 'pendientes de antes de la pausa' : 'Sin deuda pendiente',
        context: planLabel,
        primary: { label: 'Gestionar cobros', action: 'manage' },
        secondary: null,
        notes,
      };
    case 'upcoming': {
      const next = summary.next!;
      return {
        tone: 'calm',
        headline: 'Próximo cobro',
        amount: formatCents(next.amountCents),
        detail: formatDayLong(next.dueDay),
        context: next.origin === 'plan' || next.origin === 'recurring' ? planLabel : 'Cobro puntual',
        primary: { label: 'Gestionar cobros', action: 'manage' },
        secondary: null,
        notes,
      };
    }
    case 'no_fee':
      return {
        tone: 'accent',
        headline: 'Sin cuota configurada',
        amount: null,
        detail: 'Configura importe y frecuencia para llevar sus vencimientos y avisos.',
        context: null,
        primary: { label: 'Configurar cuota', action: 'configure-fee' },
        secondary: null,
        notes,
      };
    default:
      return {
        tone: 'calm',
        headline: 'Sin cobros pendientes',
        amount: null,
        detail: plan?.status === 'ended' ? 'La cuota está finalizada.' : 'Todo lo registrado está liquidado o cerrado.',
        context: null,
        primary: { label: 'Ver cobros', action: 'history' },
        secondary: !plan || plan.status === 'ended' ? { label: 'Configurar cuota', action: 'configure-fee' } : null,
        notes,
      };
  }
}

// --- Operaciones ----------------------------------------------------------------

// Identificador de operación: se genera al abrir un formulario y se reutiliza
// en cada reintento, así un doble clic o un reintento tras un corte de red no
// duplica el pago.
export function newOperationId(prefix: string): string {
  const random =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  return `${prefix}-${random}`;
}

export function paymentsErrorMessage(error: unknown, fallback: string): string {
  const body = (error || {}) as PaymentsApiError;
  if (body.status === 0) return 'Sin conexión. Revisa la red y vuelve a intentarlo: no se ha guardado nada dos veces.';
  if (typeof body.message === 'string' && body.message && !/^Http failure/i.test(body.message)) return body.message;
  return fallback;
}

export function errorCode(error: unknown): string | null {
  const code = (error as PaymentsApiError | null)?.code;
  return typeof code === 'string' ? code : null;
}

export function errorDetail(error: unknown, key: string): number | null {
  const value = (error as PaymentsApiError | null)?.details?.[key];
  return typeof value === 'number' ? value : null;
}

// --- Avisos locales antiguos ------------------------------------------------------

// Hasta 2026-09 la app programaba un aviso local del sistema al crear un
// cobro: título "TrainFit" y cuerpo "Recuerda cobrar a <cliente>: …". Solo
// esos se cancelan; cualquier otra notificación local se conserva.
export function isLegacyPaymentReminder(notification: { title?: string | null; body?: string | null }): boolean {
  return notification.title === 'TrainFit' && typeof notification.body === 'string' && notification.body.startsWith('Recuerda cobrar a ');
}

// --- Avisos in-app del entrenador ---------------------------------------------

export interface PaymentNoticePayload {
  chargeId?: string;
  dueDay?: string;
  balanceCents?: number;
  currency?: string;
  concept?: string | null;
  resolution?: string;
  current?: { status: string; balanceCents: number; dueDay: string; currency: string; clientRelation?: 'active' | 'former' };
}

const CLOSED_LABEL: Record<string, string> = {
  settled: 'liquidado',
  cancelled: 'cerrado sin cobrar el resto',
  void: 'anulado',
  rescheduled: 'con el vencimiento cambiado',
};

// Un aviso antiguo nunca afirma una deuda que ya no existe: se lee con el
// saldo de AHORA (payload.current) o se dice que el cobro ya se cerró.
export function trainerPaymentNoticeTitle(payload: PaymentNoticePayload, clientName: string): string {
  const current = payload.current;
  const closed = current && current.status !== 'open' ? current.status : !current ? payload.resolution : null;
  const due = current?.dueDay ?? payload.dueDay;
  if (closed) return `${clientName} · cobro${due ? ` del ${formatDay(due)}` : ''} ${CLOSED_LABEL[closed] ?? 'cerrado'}`;
  const balance = current?.balanceCents ?? payload.balanceCents;
  if (typeof balance === 'number' && due) {
    return `${clientName} · quedan ${formatCents(balance, current?.currency ?? payload.currency ?? 'EUR')} del cobro del ${formatDay(due)}`;
  }
  return `${clientName} · recordatorio de cobro`;
}

export interface NoticeRoute {
  commands: string[];
  queryParams: Record<string, string>;
}

// Cliente activo → su ficha, en ese cobro. Antiguo cliente → Configuración >
// Cobros, único sitio desde el que se puede cerrar su deuda.
export function trainerPaymentNoticeRoute(clientId: string, payload: PaymentNoticePayload, clientName: string): NoticeRoute {
  const chargeId = payload.chargeId ?? '';
  if (payload.current?.clientRelation === 'former') {
    return { commands: ['/tabs/account/payments'], queryParams: { client: clientId, charge: chargeId, name: clientName } };
  }
  return { commands: ['/tabs/clients', clientId], queryParams: { tab: 'payments', charge: chargeId } };
}
