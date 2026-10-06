// Contratos de /trainer/payments/* (train-fit-back/components/trainerPayments,
// src/dto.ts). Importes SIEMPRE en céntimos enteros; días como "YYYY-MM-DD"
// civiles (nunca se convierten a Date para calcular: se pintan tal cual).

export type ChargeOrigin = 'one_off' | 'recurring';
export type ChargeStatus = 'open' | 'settled' | 'cancelled' | 'void';
export type TemporalState = 'overdue' | 'due_today' | 'upcoming' | 'closed';
export type PaymentMethod = 'bizum' | 'transfer' | 'cash' | 'card_external' | 'other' | 'unknown';
export type RecurrenceUnit = 'week' | 'month';
export type PlanStatus = 'active' | 'paused' | 'ended';
export type PaymentsAccess = 'active' | 'former';
export type CardState = 'overdue' | 'due_today' | 'paused' | 'upcoming' | 'no_fee' | 'no_pending';

export interface PaymentCharge {
  id: string;
  clientId: string;
  origin: ChargeOrigin;
  concept: string | null;
  note: string | null;
  currency: string;
  dueDay: string;
  amountCents: number;
  originalAmountCents: number;
  receivedCents: number;
  cancelledCents: number;
  balanceCents: number;
  status: ChargeStatus;
  voidReason: string | null;
  temporal: TemporalState;
  forecast: boolean;
  historical: boolean;
  manualOverride: boolean;
  paymentsCount: number;
  lastReceivedDay: string | null;
  settledAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  revision: number;
  anomalies: string[];
}

export interface PaymentMovement {
  id: string;
  amountCents: number;
  receivedDay: string;
  // marked_paid: cobro anterior al libro de pagos; el día es cuándo se marcó pagado.
  receivedDaySource: 'entered' | 'marked_paid';
  method: PaymentMethod;
  note: string | null;
  recordedAt: string | null;
  source: 'app' | 'migration';
  status: 'valid' | 'voided';
  voidedAt: string | null;
  voidReason: string | null;
  correctionOf: string | null;
}

export interface PaymentAdjustment {
  id: string;
  type:
    | 'amount_changed'
    | 'due_changed'
    | 'concept_changed'
    | 'note_changed'
    | 'price_change'
    | 'cancel_balance'
    | 'restore_balance'
    | 'payment_corrected'
    | 'voided';
  at: string;
  reason: string | null;
  from: string | number | null;
  to: string | number | null;
}

export interface PaymentChargeDetail extends PaymentCharge {
  payments: PaymentMovement[];
  adjustments: PaymentAdjustment[];
}

export interface FeePlanHistoryEntry {
  at: string;
  action: 'created' | 'reactivated' | 'price_changed' | 'concept_changed' | 'rescheduled' | 'paused' | 'resumed' | 'ended';
  details: Record<string, string | number | boolean | null>;
}

export interface FeePlanView {
  status: PlanStatus;
  concept: string;
  currency: 'EUR';
  unit: RecurrenceUnit;
  interval: number;
  amountCents: number;
  nextDueDay: string | null;
  anchorDay: string;
  scheduledPrice: { fromDay: string; amountCents: number } | null;
  startedAt: string;
  pausedAt: string | null;
  endedAt: string | null;
  endReason: 'trainer' | 'relation_ended' | null;
  history: FeePlanHistoryEntry[];
}

export interface PaymentPreferences {
  clientRemindersEnabled: boolean;
  clientRemindersEnabledAt: string | null;
  clientRemindersDisabledReason: 'trainer' | 'relation_ended' | null;
  reminderOffsets: number[] | null;
  inheritedOffsets: number[];
}

export interface ClientPaymentsSummary {
  state: CardState;
  currency: 'EUR';
  overdue: { balanceCents: number; count: number; oldestDueDay: string } | null;
  dueToday: { balanceCents: number; count: number; chargeId: string | null } | null;
  next: { dueDay: string; amountCents: number; chargeId: string | null; origin: ChargeOrigin | 'plan' } | null;
  pendingCents: number;
  openCount: number;
  plan: { status: PlanStatus; unit: RecurrenceUnit; interval: number; amountCents: number; nextDueDay: string | null } | null;
  otherCurrencies: Array<{ currency: string; balanceCents: number }>;
  needsReview: number;
  hasCharges: boolean;
}

export interface ClientLedger {
  access: PaymentsAccess;
  today: string;
  timeZone: string;
  plan: FeePlanView | null;
  preferences: PaymentPreferences;
  summary: ClientPaymentsSummary;
  charges: PaymentCharge[];
  voided: PaymentCharge[];
}

export interface ClientSummaryResponse {
  access: PaymentsAccess;
  today: string;
  summary: ClientPaymentsSummary;
}

export interface DatedAmount {
  day: string;
  amountCents: number;
}

export interface PlanPreview {
  mode: 'create' | 'reactivate' | 'update' | 'noop' | 'replay';
  changes: Array<'price' | 'concept' | 'schedule' | 'status'>;
  priceFromDay: string | null;
  nextDates: DatedAmount[];
  effects: {
    updates: Array<{ chargeId: string; dueDay: string; fromCents: number; toCents: number }>;
    voids: Array<{ chargeId: string; dueDay: string; amountCents: number; reason: string | null }>;
    protected: Array<{ chargeId: string; dueDay: string; reason: 'has_movements' | 'manual_override' }>;
  };
}

export interface PlanResult {
  mode: PlanPreview['mode'];
  changes: PlanPreview['changes'];
  priceFromDay: string | null;
  nextDates: DatedAmount[];
  plan: FeePlanView | null;
  preferences: PaymentPreferences;
}

export interface PlanBody {
  concept: string;
  amount: string;
  unit: RecurrenceUnit;
  interval: number;
  nextDueDay?: string | null;
  effectiveFromDay?: string | null;
  operationId?: string;
}

export interface ChargeMutationResult {
  replay: boolean;
  charge: PaymentChargeDetail;
  reopened?: boolean;
  movementId?: string;
}

export interface OverviewRow {
  id: string;
  clientId: string;
  clientName: string;
  clientRelation: PaymentsAccess;
  origin: ChargeOrigin;
  concept: string | null;
  historical: boolean;
  hasNote: boolean;
  currency: string;
  dueDay: string;
  amountCents: number;
  receivedCents: number;
  cancelledCents: number;
  balanceCents: number;
  status: ChargeStatus;
  temporal: TemporalState;
  forecast: boolean;
  anomalies: string[];
}

export type OverviewState = 'pending' | 'overdue' | 'due_today' | 'upcoming' | 'settled' | 'cancelled' | 'all';
export type OverviewRelation = 'active' | 'former' | 'all';

export interface OverviewQuery {
  search?: string;
  state?: OverviewState;
  relation?: OverviewRelation;
  from?: string | null;
  to?: string | null;
  page?: number;
  limit?: number;
}

export interface PaymentsOverview {
  scope: {
    relation: OverviewRelation;
    search: string | null;
    clients: number;
    currency: 'EUR';
    today: string;
    month: string;
    timeZone: string;
  };
  totals: {
    pendingCents: number;
    overdueCents: number;
    overdueCount: number;
    receivedThisMonthCents: number;
    forecastCents: number;
    otherCurrencies: Array<{ currency: string; pendingCents: number; receivedThisMonthCents: number }>;
  };
  results: {
    count: number;
    balanceCents: number;
    page: number;
    limit: number;
    state: OverviewState;
    from: string | null;
    to: string | null;
  };
  rows: OverviewRow[];
}

export interface PaymentSettings {
  timeZone: string;
  time: string;
  offsets: number[];
  persisted: boolean;
  revision: number;
  defaults: { timeZone: string; time: string; offsets: number[] };
  limits: { offsetMin: number; offsetMax: number; maxCount: number };
}

export interface SettingsPreview {
  todayChanges: { from: string; to: string } | null;
  samples: Array<{
    chargeId: string;
    dueDay: string;
    currentNext: { offset: number; instant: string } | null;
    nextNext: { offset: number; instant: string } | null;
  }>;
  note: string;
}

// Error tal y como lo entrega HttpService (cuerpo del backend + status).
export interface PaymentsApiError {
  status?: number;
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
}

// Lo que un panel hijo pide a su contenedor al cerrarse con cambios.
export interface PaymentsChangeEvent {
  clientId: string;
  chargeId?: string | null;
}
