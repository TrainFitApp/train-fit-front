// Fase 1 Coach Pro — espejo de components/coachAlerts/coach-alert-schema.js.
// Sustituye a AttentionItem (que solo tenía tipo + nombre de cliente y se
// recalculaba en cada carga): una alerta persistida trae además prioridad,
// motivo redactado, contexto numérico, estado y desde cuándo está abierta.

export type CoachAlertType =
  | 'checkin_overdue'
  | 'plan_ending_soon'
  | 'stagnation'
  | 'weight_change'
  | 'measurement_change'
  | 'low_adherence'
  | 'inactive_client'
  | 'no_training_activity'
  // Dolor reciente por encima del umbral de «parar» de su zona.
  | 'pain_high';

export type CoachAlertPriority = 'high' | 'medium' | 'low';

export type CoachAlertStatus = 'open' | 'resolved' | 'dismissed';

// Los números crudos detrás de `reason`. Cada tipo de alerta rellena solo
// las claves que le aplican — por eso todas son opcionales.
export interface CoachAlertContext {
  metric?: string;
  metricLabel?: string;
  value?: number;
  previousValue?: number;
  changePct?: number;
  weeklyChangePct?: number;
  periodDays?: number;
  weeks?: number;
  adherencePct?: number;
  daysWithData?: number;
  daysLeft?: number;
  overdueCycles?: number;
  daysSinceLastSession?: number;
  lastSessionAt?: string | null;
  cadence?: string;
  lastResponseAt?: string | null;
  endDate?: string | null;
}

export interface CoachAlert {
  _id: string;
  type: CoachAlertType;
  priority: CoachAlertPriority;
  // Frase ya redactada por el backend, con los números dentro. El frontend
  // NO la recompone: se pinta tal cual.
  reason: string;
  context: CoachAlertContext;
  status: CoachAlertStatus;
  coachNote: string;
  clientId: string;
  clientName: string;
  ruleId: string | null;
  // Primera detección. Distinto de lastSeenAt (última vez que se confirmó
  // que el problema sigue ahí).
  createdAt: string;
  lastSeenAt: string;
  resolvedAt: string | null;
}
