import type {
  TrainerBillingInterval, TrainerEntitlements, TrainerInvoice, TrainerPaymentMethod, TrainerPlan, TrainerPlanCatalog,
  TrainerPlanState, TrainerTier,
} from './models/trainer-entitlements.model';
import { localizeRecord, uiLocale, uiText } from 'src/app/core/i18n/localized-catalog';

export const TRAINER_TIERS: TrainerTier[] = ['free', 'starter', 'professional', 'scale'];

export const TRAINER_PLAN_NAMES: Record<TrainerTier, string> = {
  free: 'Free',
  starter: 'Inicio',
  professional: 'Profesional',
  scale: 'Escala',
};
localizeRecord(TRAINER_PLAN_NAMES, 'SUBSCRIPTION.PLAN_NAMES');

export const TRAINER_INTERVAL_NAMES: Record<TrainerBillingInterval, string> = { monthly: 'mensual', annual: 'anual' };
localizeRecord(TRAINER_INTERVAL_NAMES, 'SUBSCRIPTION.INTERVAL_NAMES');

export function trainerPlanLabel(tier: TrainerTier, interval: TrainerBillingInterval | null | undefined): string {
  return interval ? `${TRAINER_PLAN_NAMES[tier]} ${TRAINER_INTERVAL_NAMES[interval]}` : TRAINER_PLAN_NAMES[tier];
}

// "Inicio mensual · 25 plazas".
export function trainerStateLabel(state: { tier: TrainerTier; interval: TrainerBillingInterval | null; seats: number }): string {
  return uiText('SUBSCRIPTION.STATE_LABEL', { plan: trainerPlanLabel(state.tier, state.interval), seats: state.seats });
}

// Formateadores creados una vez: Intl es caro y la página los usa en cada
// ciclo de render. La app no registra LOCALE_ID, así que el DatePipe sale en inglés.
const MONEY = new Map<string, Intl.NumberFormat>();
const DATE_LONG = () => new Intl.DateTimeFormat(uiLocale(), { day: 'numeric', month: 'short', year: 'numeric' });
const DATE_SHORT = () => new Intl.DateTimeFormat(uiLocale(), { day: 'numeric', month: 'short' });

export function formatTrainerAmount(cents: number, currency = 'EUR'): string {
  const code = currency.toUpperCase();
  const cacheKey = `${uiLocale()}|${code}`;
  if (!MONEY.has(cacheKey)) MONEY.set(cacheKey, new Intl.NumberFormat(uiLocale(), { style: 'currency', currency: code }));
  return MONEY.get(cacheKey)!.format(cents / 100);
}

export function formatTrainerDate(value: string | Date | null | undefined, withYear = true): string {
  if (!value) return '';
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? (withYear ? DATE_LONG() : DATE_SHORT()).format(date).replace('.', '') : '';
}

// ---------- Catálogo y precios ----------

export function trainerPlanOf(catalog: TrainerPlanCatalog | null | undefined, tier: TrainerTier | undefined): TrainerPlan | null {
  return (tier && catalog?.plans.find((plan) => plan.tier === tier)) || null;
}

// Importe recurrente (cuota + plazas adicionales) en céntimos sin IVA; null si esa periodicidad no está a la venta.
export function trainerStateAmount(plan: TrainerPlan, interval: TrainerBillingInterval, extraSeats: number): number | null {
  const price = plan.prices[interval];
  if (!price) return null;
  return price.base + (price.seat || 0) * extraSeats;
}

// Al llegar al máximo de un plan se recomienda el siguiente (decisión 2026-10-02): Free con 12 plazas
// → Inicio; Inicio con 40 → Profesional (mismo precio, más plazas); Profesional con 125 → Escala
// (mismo precio). Por encima de Escala, oferta a medida. Nunca cambia de plan por sí sola.
export interface TrainerSeatAdvice {
  kind: 'next_plan' | 'contact';
  tier?: TrainerTier;
  interval?: TrainerBillingInterval;
  seats?: number;
  amount?: number;
  samePrice?: boolean;
}

export function trainerSeatAdvice(catalog: TrainerPlanCatalog | null, state: TrainerPlanState): TrainerSeatAdvice | null {
  const plan = trainerPlanOf(catalog, state.tier);
  if (!plan || plan.includedSeats + state.extraSeats < plan.maxSeats) return null;
  const next = trainerPlanOf(catalog, TRAINER_TIERS[TRAINER_TIERS.indexOf(state.tier) + 1]);
  if (!next) return { kind: 'contact' };
  const interval = next.prices[state.interval] ? state.interval : 'monthly';
  const amount = trainerStateAmount(next, interval, 0)!;
  const current = trainerStateAmount(plan, interval, state.extraSeats);
  return { kind: 'next_plan', tier: next.tier, interval, seats: next.includedSeats, amount, samePrice: current === amount };
}

export type TrainerStateTone = 'ok' | 'warning' | 'danger' | 'neutral';
export type TrainerBillingStateKind = 'access_revoked' | 'on_hold' | 'renewal_failed' | 'change_unpaid' | 'canceling' |
  'change_scheduled' | 'exception' | 'active' | 'ended';

// Estado único de una suscripción: de aquí salen la etiqueta, la línea temporal y el aviso con
// su acción. Orden = urgencia para el entrenador. Sin cuenta de facturación (Free sin plazas
// adicionales que nunca contrató) no hay estado.
export function trainerBillingState(entitlements: TrainerEntitlements | null): { kind: TrainerBillingStateKind; tone: TrainerStateTone; label: string } | null {
  if (!entitlements?.status || entitlements.status === 'none') return null;
  const billing = entitlements.billing;
  // Disputa perdida: el pago del periodo volvió al banco (los datos se conservan).
  if (billing?.accessRevokedUntil && !billing.accessException) return { kind: 'access_revoked', tone: 'danger', label: uiText('SUBSCRIPTION.STATE_ACCESS_REVOKED') };
  // Cobros en pausa por una incidencia: no se cobra ni se ofrece pagar hasta que facturación lo resuelva.
  if (billing?.hold) return { kind: 'on_hold', tone: 'warning', label: uiText('SUBSCRIPTION.STATE_ON_HOLD') };
  if (billing?.renewalPayment || ['past_due', 'unpaid'].includes(entitlements.status || '')) {
    return { kind: 'renewal_failed', tone: 'danger', label: uiText('SUBSCRIPTION.PAGO_PENDIENTE') };
  }
  if (billing?.pendingPayment) return { kind: 'change_unpaid', tone: 'warning', label: uiText('SUBSCRIPTION.CAMBIO_SIN_PAGAR') };
  if (entitlements.cancelAtPeriodEnd && entitlements.isPremium) return { kind: 'canceling', tone: 'warning', label: uiText('SUBSCRIPTION.NO_SE_RENOVARA') };
  if (billing?.pendingChange) return { kind: 'change_scheduled', tone: 'neutral', label: uiText('SUBSCRIPTION.CAMBIO_PROGRAMADO') };
  if (billing?.accessException && entitlements.isPremium) return { kind: 'exception', tone: 'neutral', label: uiText('SUBSCRIPTION.STATE_EXCEPTION') };
  if (entitlements.status === 'active' && entitlements.isPremium) return { kind: 'active', tone: 'ok', label: uiText('CLIENT_DETAIL.PHASE_ACTIVE') };
  if (entitlements.status === 'canceled') return { kind: 'ended', tone: 'neutral', label: uiText('CLIENT_DETAIL.PHASE_ENDED') };
  return null;
}

const CARD_BRANDS: Record<string, string> = { visa: 'Visa', mastercard: 'Mastercard', amex: 'American Express' };
const WALLETS: Record<string, string> = { apple_pay: 'Apple Pay', google_pay: 'Google Pay' };

// "Visa •••• 4242", "Mastercard •••• 4444 · Apple Pay" o "Link".
export function trainerPaymentMethodLabel(method: TrainerPaymentMethod | null | undefined): string | null {
  if (!method) return null;
  if (method.kind === 'link') return 'Link';
  const brand = CARD_BRANDS[method.brand] || method.brand.charAt(0).toUpperCase() + method.brand.slice(1);
  const wallet = method.wallet && WALLETS[method.wallet] ? ` · ${WALLETS[method.wallet]}` : '';
  return `${brand} •••• ${method.last4}${wallet}`;
}

// Devoluciones y abonos de una factura: el estado "Pagada" de Stripe no cambia al reembolsar.
export function trainerInvoiceAdjustment(invoice: TrainerInvoice): string | null {
  if (invoice.refundedAmount) return uiText('SUBSCRIPTION.INVOICE_REFUNDED', { amount: formatTrainerAmount(invoice.refundedAmount, invoice.currency) });
  if (invoice.creditedAmount) return uiText('SUBSCRIPTION.INVOICE_CREDITED', { amount: formatTrainerAmount(invoice.creditedAmount, invoice.currency) });
  return null;
}

export interface TrainerBillingSummary {
  label: string;
  date: string | null;
  attention: boolean;
}

export function trainerPlanName(entitlements: TrainerEntitlements | null): string {
  if (!entitlements) return '—';
  return TRAINER_PLAN_NAMES[entitlements.tier] || uiText('SUBSCRIPTION.PLAN_ACTUAL');
}

function validDate(value: string | null | undefined): string | null {
  return value && Number.isFinite(Date.parse(value)) ? value : null;
}

export function trainerBillingSummary(entitlements: TrainerEntitlements | null): TrainerBillingSummary {
  if (!entitlements) return { label: uiText('SUBSCRIPTION.ESTADO_NO_DISPONIBLE'), date: null, attention: false };
  const date = validDate(entitlements.currentPeriodEnd || entitlements.expiresAt);
  const billing = entitlements.billing;
  if (billing?.accessException && entitlements.isPremium) {
    return { label: uiText('SUBSCRIPTION.SUMMARY_EXCEPTION'), date: validDate(billing.accessException.until), attention: false };
  }
  if (billing?.accessRevokedUntil) {
    return { label: uiText('SUBSCRIPTION.SUMMARY_REVOKED'), date: validDate(billing.accessRevokedUntil), attention: true };
  }
  if (billing?.hold) {
    return { label: uiText('SUBSCRIPTION.SUMMARY_ON_HOLD'), date: null, attention: true };
  }
  if (billing?.renewalNotice && entitlements.isPremium && !entitlements.cancelAtPeriodEnd) {
    return { label: uiText('SUBSCRIPTION.SUMMARY_ANNUAL_RENEWAL'), date: validDate(billing.renewalNotice.at), attention: true };
  }
  if (billing?.pendingPayment) {
    return { label: uiText('SUBSCRIPTION.EL_CAMBIO_DE_PLAN_ESTA'), date: null, attention: true };
  }
  if (billing?.renewalPayment) {
    return { label: uiText('SUBSCRIPTION.NO_HEMOS_PODIDO_COBRAR_LA'), date: null, attention: true };
  }
  if (entitlements.cancelAtPeriodEnd && entitlements.isPremium) {
    return { label: date ? uiText('SUBSCRIPTION.NO_SE_RENOVARA_ACCESO_HASTA') : uiText('SUBSCRIPTION.RENOVACION_CANCELADA'), date, attention: false };
  }
  if (['past_due', 'unpaid', 'incomplete'].includes(entitlements.status || '')) {
    return { label: uiText('SUBSCRIPTION.HAY_UN_PAGO_PENDIENTE_REVISA'), date: null, attention: true };
  }
  if (entitlements.isPremium) {
    if (entitlements.status === 'active') {
      return { label: date ? uiText('SUBSCRIPTION.PROXIMA_RENOVACION') : uiText('SUBSCRIPTION.PLAN_ACTIVO'), date, attention: false };
    }
    const accessDate = validDate(entitlements.expiresAt);
    return { label: accessDate ? uiText('SUBSCRIPTION.ACCESO_HASTA') : uiText('SUBSCRIPTION.PLAN_ACTIVO'), date: accessDate, attention: false };
  }
  if (entitlements.status === 'checkout_pending') {
    return { label: uiText('SUBSCRIPTION.CONTRATACION_PENDIENTE'), date: null, attention: true };
  }
  if (entitlements.status === 'paused') {
    return { label: uiText('SUBSCRIPTION.SUSCRIPCION_PAUSADA'), date: null, attention: true };
  }
  return { label: entitlements.status === 'canceled' ? uiText('SUBSCRIPTION.SUSCRIPCION_FINALIZADA') : uiText('SUBSCRIPTION.PLAN_GRATUITO'), date: null, attention: false };
}

// Contratar desde cero (Checkout) solo sin suscripción viva; con ella, los cambios van por propuesta.
export function canStartTrainerCheckout(
  catalog: TrainerPlanCatalog | null,
  entitlements: TrainerEntitlements | null
): boolean {
  // Catálogo y derechos deben venir del mismo entorno de pagos (test o live).
  if (!catalog?.enabled || !isBillingMode(catalog.mode) || !catalog.capabilities.checkout ||
      !entitlements?.billing?.enabled || entitlements.billing.mode !== catalog.mode || entitlements.billing.current) {
    return false;
  }
  return !['active', 'trialing', 'past_due', 'unpaid', 'paused', 'incomplete'].includes(entitlements.status || '');
}

export function checkoutConfirmationState(entitlements: TrainerEntitlements): 'confirmed' | 'pending' | 'payment_required' {
  if (entitlements.isPremium && ['active', 'trialing'].includes(entitlements.status || '')) return 'confirmed';
  return ['canceled', 'incomplete_expired', 'unpaid', 'past_due', 'paused'].includes(entitlements.status || '')
    ? 'payment_required'
    : 'pending';
}

export function isBillingMode(value: unknown): value is 'test' | 'live' {
  return value === 'test' || value === 'live';
}

// Formato de id de Checkout; el backend comprueba además que sea del entorno configurado.
export function isCheckoutSessionId(value: string): boolean {
  return /^cs_(test|live)_[a-zA-Z0-9]+$/.test(value);
}

export function safeStripeRedirectUrl(value: unknown, destination: 'checkout' | 'portal' | 'invoice'): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const allowed = destination === 'checkout'
      ? url.hostname === 'checkout.stripe.com' && (url.pathname.startsWith('/c/pay/') || url.pathname.startsWith('/pay/'))
      : destination === 'portal'
        // Stripe entrega tanto /p/session/<token> como /p/session?<session>.
        ? url.hostname === 'billing.stripe.com' && (url.pathname.startsWith('/p/session/') ||
          (url.pathname === '/p/session' && !!url.search))
        : url.hostname === 'invoice.stripe.com' && url.pathname.startsWith('/i/');
    return allowed ? url.href : null;
  } catch {
    return null;
  }
}
