export type PurchasableTrainerTier = 'trainer_pro' | 'trainer_growth' | 'trainer_scale';
export type TrainerTier = 'free' | PurchasableTrainerTier | 'trainer_unlimited';
export type TrainerBillingInterval = 'monthly' | 'annual';

export interface TrainerBillingPrice {
  amount: number;
  interval: TrainerBillingInterval;
}

export interface TrainerPlan {
  tier: PurchasableTrainerTier;
  clientLimit: number;
  prices: Record<TrainerBillingInterval, TrainerBillingPrice>;
}

export interface TrainerPlanCatalog {
  enabled: boolean;
  mode: 'test' | 'live';
  currency: 'EUR';
  // stripe_tax: los precios del catálogo son sin IVA; Stripe lo añade al cobrar.
  taxPolicy: 'test_no_tax' | 'stripe_tax' | 'pending';
  plans: TrainerPlan[];
  capabilities: { checkout: boolean; portal: boolean; planChanges: boolean };
}

export interface TrainerCheckoutSession {
  url: string;
  sessionId: string;
  reused: boolean;
}

export interface TrainerPortalSession {
  url: string;
}

export interface TrainerSubscriptionPrice {
  tier: PurchasableTrainerTier;
  interval: TrainerBillingInterval;
  amount: number;
  clientLimit: number;
}

export interface TrainerQuoteLine {
  kind: 'credit' | 'charge' | 'recurring';
  tier: PurchasableTrainerTier;
  interval: TrainerBillingInterval;
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
}

export interface TrainerBillingDetails {
  invoices: TrainerInvoice[];
  paymentMethod: { brand: string; last4: string; expMonth: number; expYear: number } | null;
}

export interface TrainerChangeQuote {
  lines?: TrainerQuoteLine[];
  quoteId: string;
  expiresAt: string;
  kind: 'immediate' | 'scheduled';
  from: TrainerSubscriptionPrice;
  to: TrainerSubscriptionPrice;
  effectiveAt: string;
  amountDueNow: number;
  creditBalance?: number;
  // IVA incluido en amountDueNow (0 sin Stripe Tax).
  taxAmount?: number;
  currency: string;
  nextRenewal: { at: string; amount: number; estimated?: boolean; excludesTax?: boolean };
  usage: { clients: number; limit?: number };
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

export interface TrainerEntitlements {
  isPremium: boolean;
  tier: TrainerTier;
  plan: string | null;
  expiresAt: string | null;
  limits: { clients: number | null };
  usage: { clients: number };
  remaining: { clients: number | null };
  // Opcionales durante el despliegue: los backends anteriores siguen
  // entregando los derechos existentes, pero no habilitan compras nuevas.
  provider?: 'stripe' | 'revenuecat' | 'manual' | null;
  // Plan de pago no gestionado por Stripe (Pro de 15 clientes, Unlimited).
  legacy?: boolean;
  status?: string | null;
  cancelAtPeriodEnd?: boolean;
  currentPeriodEnd?: string | null;
  billing?: {
    enabled: boolean;
    mode: 'test' | 'live';
    taxPolicy?: 'test_no_tax' | 'stripe_tax' | 'pending';
    review?: { reason: 'dispute' | 'refund'; at: string } | null;
    portalAvailable: boolean;
    planChanges: boolean;
    actions?: TrainerBillingActions;
    pendingChange?: { tier: PurchasableTrainerTier; interval: TrainerBillingInterval; effectiveAt: string; clientLimit?: number } | null;
    admissionClientLimit?: number | null;
    pendingPayment?: { url?: string | null; expiresAt?: string | null } | null;
    currentPrice?: TrainerSubscriptionPrice | null;
    // Próximo cargo tal como lo calcula Stripe (descuentos y saldo incluidos).
    // tier/interval: plan que cobrará Stripe (incluye un cambio programado); discounted: lleva descuento o saldo.
    renewal?: { at: string; amount: number; source: 'stripe'; tier?: PurchasableTrainerTier | null;
      interval?: TrainerBillingInterval | null; discounted?: boolean } | null;
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
