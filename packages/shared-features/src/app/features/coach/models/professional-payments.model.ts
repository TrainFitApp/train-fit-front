// Lo que le cobra un profesional — espejo de
// GET /coach/professionals/:trainerId/payments (trainerPayments/client-ledger-view.js).
// Importes en céntimos y días civiles "YYYY-MM-DD". Solo informativo: los
// cobros los apunta el profesional y se pagan fuera de la app. Nunca llegan
// notas ni métodos de pago.

export interface ClientFeePlan {
  status: 'active' | 'paused' | 'ended';
  concept: string;
  currency: string;
  unit: 'week' | 'month';
  interval: number;
  amountCents: number;
  nextDueDay: string | null;
  scheduledPrice: { fromDay: string; amountCents: number } | null;
  startedAt: string;
}

export interface ClientPaymentsSummary {
  state: 'overdue' | 'due_today' | 'paused' | 'upcoming' | 'no_fee' | 'no_pending';
  currency: string;
  pendingCents: number;
  overdue: { balanceCents: number; count: number; oldestDueDay: string } | null;
  next: { dueDay: string; amountCents: number } | null;
}

export interface ClientChargePayment {
  id: string;
  amountCents: number;
  receivedDay: string | null;
}

export interface ClientCharge {
  id: string;
  origin: 'one_off' | 'recurring';
  concept: string | null;
  currency: string;
  dueDay: string;
  amountCents: number;
  receivedCents: number;
  cancelledCents: number;
  balanceCents: number;
  // settled = pagado; cancelled = el profesional anuló lo que quedaba.
  status: 'open' | 'settled' | 'cancelled';
  temporal: 'overdue' | 'due_today' | 'upcoming' | 'closed';
  payments: ClientChargePayment[];
}

export interface ProfessionalPayments {
  today: string;
  plan: ClientFeePlan | null;
  summary: ClientPaymentsSummary;
  charges: ClientCharge[];
}
