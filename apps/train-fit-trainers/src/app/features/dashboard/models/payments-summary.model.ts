export interface PaymentsMonthPoint {
  // "YYYY-MM"
  month: string;
  cents: number;
}

// GET /trainer/payments/summary — panel «Hoy». Céntimos, como el resto de cobros.
export interface PaymentsSummary {
  currency: 'EUR';
  pendingCents: number;
  pendingCount: number;
  overdueCents: number;
  overdueCount: number;
  // Últimos 6 meses, incluido el actual (meses sin cobros a 0). `dueSeries`
  // suma lo que VENCE cada mes (previsto menos anulado), no lo cobrado;
  // `receivedSeries` va por fecha real de recepción.
  dueSeries: PaymentsMonthPoint[];
  receivedSeries: PaymentsMonthPoint[];
  // null si no hay datos del mes anterior con los que comparar (no "0%").
  percentChangeVsLastMonth: number | null;
}
