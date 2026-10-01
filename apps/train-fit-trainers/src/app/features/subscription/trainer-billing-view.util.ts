import type {
  TrainerBillingInterval, TrainerEntitlements, TrainerInvoice, TrainerPaymentMethod, TrainerPlanCatalog, TrainerTier,
} from './models/trainer-entitlements.model';

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
const DATE_LONG = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
const DATE_SHORT = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' });

export function formatTrainerAmount(cents: number, currency = 'EUR'): string {
  const code = currency.toUpperCase();
  if (!MONEY.has(code)) MONEY.set(code, new Intl.NumberFormat('es-ES', { style: 'currency', currency: code }));
  return MONEY.get(code)!.format(cents / 100);
}

export function formatTrainerDate(value: string | Date | null | undefined, withYear = true): string {
  if (!value) return '';
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? (withYear ? DATE_LONG : DATE_SHORT).format(date).replace('.', '') : '';
}

export type TrainerStateTone = 'ok' | 'warning' | 'danger' | 'neutral';
export type TrainerBillingStateKind = 'access_revoked' | 'on_hold' | 'renewal_failed' | 'change_unpaid' | 'canceling' |
  'change_scheduled' | 'exception' | 'active' | 'ended';

// Estado único de una suscripción Stripe: de aquí salen la etiqueta, la línea
// temporal y el aviso con su acción. Orden = urgencia para el entrenador.
export function trainerBillingState(entitlements: TrainerEntitlements | null): { kind: TrainerBillingStateKind; tone: TrainerStateTone; label: string } | null {
  if (!entitlements || entitlements.provider !== 'stripe') return null;
  const billing = entitlements.billing;
  // Disputa perdida: el pago del periodo volvió al banco (los datos se conservan).
  if (billing?.accessRevokedUntil && !billing.accessException) return { kind: 'access_revoked', tone: 'danger', label: 'Acceso retirado' };
  // Cobros en pausa por una incidencia: no se cobra ni se ofrece pagar hasta que facturación lo resuelva.
  if (billing?.hold) return { kind: 'on_hold', tone: 'warning', label: 'Cobros en pausa' };
  if (billing?.renewalPayment || ['past_due', 'unpaid'].includes(entitlements.status || '')) {
    return { kind: 'renewal_failed', tone: 'danger', label: 'Pago pendiente' };
  }
  if (billing?.pendingPayment) return { kind: 'change_unpaid', tone: 'warning', label: 'Cambio sin pagar' };
  if (entitlements.cancelAtPeriodEnd && entitlements.isPremium) return { kind: 'canceling', tone: 'warning', label: 'No se renovará' };
  if (billing?.pendingChange) return { kind: 'change_scheduled', tone: 'neutral', label: 'Cambio programado' };
  if (billing?.accessException && entitlements.isPremium) return { kind: 'exception', tone: 'neutral', label: 'Acceso concedido' };
  if (entitlements.status === 'active' && entitlements.isPremium) return { kind: 'active', tone: 'ok', label: 'Activa' };
  if (entitlements.status === 'canceled') return { kind: 'ended', tone: 'neutral', label: 'Finalizada' };
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
  if (invoice.refundedAmount) return `Reembolsado ${formatTrainerAmount(invoice.refundedAmount, invoice.currency)}`;
  if (invoice.creditedAmount) return `Abonado ${formatTrainerAmount(invoice.creditedAmount, invoice.currency)}`;
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
  const name = TRAINER_PLAN_NAMES[entitlements.tier] || 'Plan actual';
  return isLegacyTrainerPlan(entitlements) ? `${name} (plan anterior)` : name;
}

function validDate(value: string | null | undefined): string | null {
  return value && Number.isFinite(Date.parse(value)) ? value : null;
}

export function trainerBillingSummary(entitlements: TrainerEntitlements | null): TrainerBillingSummary {
  if (!entitlements) return { label: 'Estado no disponible', date: null, attention: false };
  const date = validDate(entitlements.currentPeriodEnd || entitlements.expiresAt);
  const billing = entitlements.billing;
  if (billing?.accessException && entitlements.isPremium) {
    return { label: 'Acceso concedido por TrainFit hasta', date: validDate(billing.accessException.until), attention: false };
  }
  if (billing?.accessRevokedUntil) {
    return { label: 'El pago de este periodo se devolvió. Acceso de pago retirado hasta', date: validDate(billing.accessRevokedUntil), attention: true };
  }
  if (billing?.hold) {
    return { label: 'Cobros en pausa mientras revisamos una incidencia con un pago. Tu acceso se mantiene.', date: null, attention: true };
  }
  if (billing?.renewalNotice && entitlements.isPremium && !entitlements.cancelAtPeriodEnd) {
    return { label: 'Tu plan anual se renueva el', date: validDate(billing.renewalNotice.at), attention: true };
  }
  if (entitlements.billing?.pendingPayment) {
    return { label: 'El cambio de plan está pendiente de pago.', date: null, attention: true };
  }
  if (entitlements.billing?.renewalPayment) {
    return { label: 'No hemos podido cobrar la renovación.', date: null, attention: true };
  }
  if (entitlements.cancelAtPeriodEnd && entitlements.isPremium) {
    return { label: date ? 'No se renovará. Acceso hasta' : 'Renovación cancelada', date, attention: false };
  }
  if (['past_due', 'unpaid', 'incomplete'].includes(entitlements.status || '')) {
    return { label: 'Hay un pago pendiente. Revisa tu suscripción.', date: null, attention: true };
  }
  if (entitlements.isPremium) {
    if (entitlements.provider === 'stripe' && entitlements.status === 'active') {
      return { label: date ? 'Próxima renovación' : 'Plan activo', date, attention: false };
    }
    if (entitlements.provider === 'stripe' && entitlements.status === 'trialing') {
      return { label: date ? 'Prueba hasta' : 'Prueba activa', date, attention: false };
    }
    const accessDate = validDate(entitlements.expiresAt);
    return { label: accessDate ? 'Acceso hasta' : 'Plan activo', date: accessDate, attention: false };
  }
  if (entitlements.status === 'checkout_pending') {
    return { label: 'Contratación pendiente', date: null, attention: true };
  }
  if (entitlements.status === 'paused') {
    return { label: 'Suscripción pausada', date: null, attention: true };
  }
  return { label: entitlements.status === 'canceled' ? 'Suscripción finalizada' : 'Plan gratuito', date: null, attention: false };
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
