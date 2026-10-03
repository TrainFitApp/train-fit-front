// Suscripción del entrenador a TrainFit (Stripe). Se paga por plazas de clientes contratadas:
// las incluidas en el plan más las adicionales (catálogo en train-fit-back/components/trainerBilling/src/catalog.ts).
export type TrainerTier = 'free' | 'starter' | 'professional' | 'scale';
export type TrainerBillingInterval = 'monthly' | 'annual';

// Lo que se contrata: plan, periodicidad y plazas adicionales.
export interface TrainerPlanState {
  tier: TrainerTier;
  interval: TrainerBillingInterval;
  extraSeats: number;
}

// Estado con su capacidad total e importe recurrente en céntimos, sin IVA.
export interface TrainerStateView extends TrainerPlanState {
  seats: number;
  amount: number;
}

// Cuota del plan y precio de cada plaza adicional (null: el plan no vende plazas) en céntimos, sin IVA.
export interface TrainerPlanPrice {
  base: number;
  seat: number | null;
}

export interface TrainerPlan {
  tier: TrainerTier;
  includedSeats: number;
  maxSeats: number;
  // Solo las periodicidades a la venta (Free: solo mensual).
  prices: Partial<Record<TrainerBillingInterval, TrainerPlanPrice>>;
}

// Buzón de facturación y condiciones de contratación (vacíos si no están configurados).
export interface TrainerBillingSupport {
  email: string | null;
  termsUrl: string | null;
}

export interface TrainerPlanCatalog {
  enabled: boolean;
  mode: 'test' | 'live';
  currency: 'EUR';
  freeSeats: number;
  plans: TrainerPlan[];
  capabilities: { checkout: boolean; portal: boolean; planChanges: boolean };
  support?: TrainerBillingSupport;
}

export interface TrainerCheckoutSession {
  url: string;
  sessionId: string;
  reused: boolean;
}

export interface TrainerPortalSession {
  url: string;
}

export interface TrainerQuoteLine {
  kind: 'credit' | 'charge' | 'recurring';
  item: 'base' | 'seat';
  tier: TrainerTier;
  interval: TrainerBillingInterval;
  quantity: number;
  amount: number;
  periodStart: string;
  periodEnd: string;
}

export interface TrainerInvoice {
  id: string;
  number: string | null;
  status: 'paid' | 'open' | 'void' | 'uncollectible' | string;
  createdAt: string;
  total: number;
  amountPaid: number;
  amountDue: number;
  currency: string;
  reason: 'subscription_create' | 'subscription_cycle' | 'subscription_update' | 'other';
  periodStart: string | null;
  periodEnd: string | null;
  hostedUrl?: string;
  pdfUrl?: string;
  // Devuelto (reembolsos registrados) y abonado con notas de crédito de Stripe.
  refundedAmount?: number;
  creditedAmount?: number;
}

export interface TrainerPaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  // link: pago guardado con Link; wallet: Apple Pay / Google Pay sobre una tarjeta.
  kind?: 'card' | 'link';
  wallet?: string | null;
}

export interface TrainerBillingDetails {
  invoices: TrainerInvoice[];
  paymentMethod: TrainerPaymentMethod | null;
}

// immediate: se cobra ahora y se aplica al pagar. scheduled: se aplica en la renovación.
export type TrainerChangeKind = 'immediate' | 'scheduled';

export interface TrainerChangeQuote {
  lines?: TrainerQuoteLine[];
  quoteId: string;
  expiresAt: string;
  kind: TrainerChangeKind;
  from: TrainerStateView;
  to: TrainerStateView;
  effectiveAt: string;
  amountDueNow: number;
  creditBalance?: number;
  // IVA incluido en amountDueNow.
  taxAmount?: number;
  currency: string;
  nextRenewal: { at: string; amount: number; estimated?: boolean; excludesTax?: boolean };
  seats: { occupied: number; reserved: number };
  // Clientes que quedarán en solo lectura cuando se aplique (bajadas por debajo de la cartera).
  readOnlyAfter: number;
  // Condiciones de contratación que se aceptan al confirmar (null si no hay condiciones publicadas).
  termsUrl: string | null;
}

export interface TrainerPlanChangeResult {
  status: 'applied' | 'payment_pending' | 'scheduled';
  paymentActionUrl?: string | null;
  entitlements: TrainerEntitlements;
}

export interface TrainerBillingActions {
  canChange: boolean;
  canCancel: boolean;
  canResume: boolean;
  canDiscardChange: boolean;
}

// Plazas: contratadas, ocupadas (clientes que aceptaron), reservadas (invitaciones pendientes)
// y libres. admission: plazas para altas nuevas (con una bajada programada, las del destino).
export interface TrainerSeatSummary {
  capacity: number;
  occupied: number;
  reserved: number;
  available: number;
  admission: number;
}

export interface TrainerEntitlements {
  isPremium: boolean;
  tier: TrainerTier;
  interval: TrainerBillingInterval | null;
  expiresAt: string | null;
  seats: TrainerSeatSummary;
  status?: string | null;
  cancelAtPeriodEnd?: boolean;
  currentPeriodEnd?: string | null;
  billing?: {
    enabled: boolean;
    mode: 'test' | 'live';
    // Cobros en pausa por una incidencia con un pago (el acceso pagado se mantiene).
    hold?: { since: string } | null;
    // Acceso concedido por TrainFit hasta una fecha (no es un cobro).
    accessException?: { until: string; tier: TrainerTier } | null;
    // El pago de este periodo se perdió en una disputa: sin acceso de pago hasta esa fecha.
    accessRevokedUntil?: string | null;
    // Renovación anual en los próximos 30 días.
    renewalNotice?: { at: string; amount: number | null; daysLeft: number } | null;
    support?: TrainerBillingSupport;
    portalAvailable: boolean;
    planChanges: boolean;
    actions?: TrainerBillingActions;
    // Lo contratado y pagado en Stripe; null en Free sin plazas adicionales.
    current?: TrainerStateView | null;
    pendingChange?: (TrainerStateView & { effectiveAt: string }) | null;
    pendingPayment?: { url?: string | null; expiresAt?: string | null } | null;
    // Próximo cargo tal como lo calcula Stripe (descuentos y saldo incluidos); state: lo que cobrará.
    renewal?: { at: string; amount: number; source: 'stripe'; state?: TrainerStateView | null; discounted?: boolean } | null;
    // Renovación impagada mientras Stripe reintenta el cobro.
    renewalPayment?: { url?: string | null; amount: number; graceUntil?: string | null } | null;
    paidUntil?: string | null;
  };
}

export interface TrainerSeatClient {
  clientId: string;
  name: string | null;
  email: string | null;
  active: boolean;
}

export interface TrainerSeats {
  overLimit: boolean;
  limit: number | null;
  usage: number;
  autoSelected: boolean;
  // Tras elegir, la selección queda fija 30 días.
  lockedUntil?: string | null;
  clients: TrainerSeatClient[];
}
