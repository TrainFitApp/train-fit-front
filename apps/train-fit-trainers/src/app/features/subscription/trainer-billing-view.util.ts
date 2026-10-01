import type { TrainerBillingInterval, TrainerEntitlements, TrainerPlanCatalog, TrainerTier } from './models/trainer-entitlements.model';
import { uiLocale, uiText } from 'src/app/core/i18n/localized-catalog';

export const TRAINER_PLAN_NAMES: Record<TrainerTier, string> = {
  free: 'Free',
  trainer_pro: 'Pro',
  trainer_growth: 'Growth',
  trainer_scale: 'Scale',
  trainer_unlimited: 'Unlimited',
};

export const TRAINER_INTERVAL_NAMES: Record<TrainerBillingInterval, string> = { monthly: 'mensual', annual: 'anual' };

export function trainerPlanLabel(tier: TrainerTier, interval: TrainerBillingInterval | null | undefined): string {
  return interval ? `${TRAINER_PLAN_NAMES[tier]} ${TRAINER_INTERVAL_NAMES[interval]}` : TRAINER_PLAN_NAMES[tier];
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

export type TrainerStateTone = 'ok' | 'warning' | 'danger' | 'neutral';
export type TrainerBillingStateKind = 'renewal_failed' | 'change_unpaid' | 'canceling' | 'change_scheduled' | 'active' | 'ended';

// Estado único de una suscripción Stripe: de aquí salen la etiqueta, la línea
// temporal y el aviso con su acción. Orden = urgencia para el entrenador.
export function trainerBillingState(entitlements: TrainerEntitlements | null): { kind: TrainerBillingStateKind; tone: TrainerStateTone; label: string } | null {
  if (!entitlements || entitlements.provider !== 'stripe') return null;
  const billing = entitlements.billing;
  if (billing?.renewalPayment || ['past_due', 'unpaid'].includes(entitlements.status || '')) {
    return { kind: 'renewal_failed', tone: 'danger', label: uiText('SUBSCRIPTION.PAGO_PENDIENTE') };
  }
  if (billing?.pendingPayment) return { kind: 'change_unpaid', tone: 'warning', label: uiText('SUBSCRIPTION.CAMBIO_SIN_PAGAR') };
  if (entitlements.cancelAtPeriodEnd && entitlements.isPremium) return { kind: 'canceling', tone: 'warning', label: uiText('SUBSCRIPTION.NO_SE_RENOVARA') };
  if (billing?.pendingChange) return { kind: 'change_scheduled', tone: 'neutral', label: uiText('SUBSCRIPTION.CAMBIO_PROGRAMADO') };
  if (entitlements.status === 'active' && entitlements.isPremium) return { kind: 'active', tone: 'ok', label: uiText('CLIENT_DETAIL.PHASE_ACTIVE') };
  if (entitlements.status === 'canceled') return { kind: 'ended', tone: 'neutral', label: uiText('CLIENT_DETAIL.PHASE_ENDED') };
  return null;
}

export interface TrainerBillingSummary {
  label: string;
  date: string | null;
  attention: boolean;
}

export function isLegacyTrainerPlan(entitlements: TrainerEntitlements | null): boolean {
  if (typeof entitlements?.legacy === 'boolean') return entitlements.legacy;
  // Backends anteriores sin el indicador explícito.
  return entitlements?.tier === 'trainer_unlimited' ||
    (entitlements?.tier === 'trainer_pro' && entitlements.limits.clients === 15);
}

export function trainerPlanName(entitlements: TrainerEntitlements | null): string {
  if (!entitlements) return '—';
  const name = TRAINER_PLAN_NAMES[entitlements.tier] || uiText('SUBSCRIPTION.PLAN_ACTUAL');
  return isLegacyTrainerPlan(entitlements) ? `${name} (plan anterior)` : name;
}

function validDate(value: string | null | undefined): string | null {
  return value && Number.isFinite(Date.parse(value)) ? value : null;
}

export function trainerBillingSummary(entitlements: TrainerEntitlements | null): TrainerBillingSummary {
  if (!entitlements) return { label: uiText('SUBSCRIPTION.ESTADO_NO_DISPONIBLE'), date: null, attention: false };
  const date = validDate(entitlements.currentPeriodEnd || entitlements.expiresAt);
  if (entitlements.billing?.pendingPayment) {
    return { label: uiText('SUBSCRIPTION.EL_CAMBIO_DE_PLAN_ESTA'), date: null, attention: true };
  }
  if (entitlements.billing?.renewalPayment) {
    return { label: uiText('SUBSCRIPTION.NO_HEMOS_PODIDO_COBRAR_LA'), date: null, attention: true };
  }
  if (entitlements.cancelAtPeriodEnd && entitlements.isPremium) {
    return { label: date ? uiText('SUBSCRIPTION.NO_SE_RENOVARA_ACCESO_HASTA') : uiText('SUBSCRIPTION.RENOVACION_CANCELADA'), date, attention: false };
  }
  if (['past_due', 'unpaid', 'incomplete'].includes(entitlements.status || '')) {
    return { label: uiText('SUBSCRIPTION.HAY_UN_PAGO_PENDIENTE_REVISA'), date: null, attention: true };
  }
  if (entitlements.isPremium) {
    if (entitlements.provider === 'stripe' && entitlements.status === 'active') {
      return { label: date ? uiText('SUBSCRIPTION.PROXIMA_RENOVACION') : uiText('SUBSCRIPTION.PLAN_ACTIVO'), date, attention: false };
    }
    if (entitlements.provider === 'stripe' && entitlements.status === 'trialing') {
      return { label: date ? uiText('SUBSCRIPTION.PRUEBA_HASTA') : uiText('SUBSCRIPTION.PRUEBA_ACTIVA'), date, attention: false };
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

export function canStartTrainerCheckout(
  catalog: TrainerPlanCatalog | null,
  entitlements: TrainerEntitlements | null
): boolean {
  // Catálogo y derechos deben venir del mismo entorno de pagos (test o live).
  if (!catalog?.enabled || !isBillingMode(catalog.mode) || !catalog.capabilities.checkout ||
      !entitlements?.billing?.enabled || entitlements.billing.mode !== catalog.mode || entitlements.isPremium || isLegacyTrainerPlan(entitlements)) {
    return false;
  }
  // Una suscripción abierta se gestiona en el portal; no se crea una segunda.
  return entitlements.provider !== 'stripe' ||
    !['active', 'trialing', 'past_due', 'unpaid', 'paused', 'incomplete'].includes(entitlements.status || '');
}

export function checkoutConfirmationState(entitlements: TrainerEntitlements): 'confirmed' | 'pending' | 'payment_required' {
  if (entitlements.provider === 'stripe' && entitlements.isPremium &&
      ['active', 'trialing'].includes(entitlements.status || '')) {
    return 'confirmed';
  }
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
