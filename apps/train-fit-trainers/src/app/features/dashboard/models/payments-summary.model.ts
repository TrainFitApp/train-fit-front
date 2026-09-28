export interface PaymentsMonthPoint {
  // "YYYY-MM"
  month: string;
  totalAmount: number;
}

export interface PaymentsSummary {
  pendingAmount: number;
  pendingCount: number;
  overdueCount: number;
  // Últimos 6 meses, incluido el actual (siempre 6 puntos, meses sin cobros
  // vienen con totalAmount: 0 — ver trainer-payment-dao.js#getPaymentsOverview).
  monthlySeries: PaymentsMonthPoint[];
  // null si no hay datos del mes anterior con los que comparar (no "0%").
  percentChangeVsLastMonth: number | null;
  // Cobros 2026-09 — la serie de arriba es POR VENCIMIENTO (importe previsto
  // menos lo anulado), no dinero recibido; lo recibido va aparte, por fecha
  // real de recepción. Opcionales: un backend anterior no los manda.
  seriesBasis?: 'due_date';
  receivedSeries?: PaymentsMonthPoint[];
  overdueAmount?: number;
  currency?: 'EUR';
}
