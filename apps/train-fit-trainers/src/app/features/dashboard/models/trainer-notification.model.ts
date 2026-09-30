// Dashboard trainer (2026-08-18) — mismo concepto que CoachNotification del
// lado cliente (packages/shared-features/.../coach/models/coach-dashboard.model.ts),
// sentido inverso: aquí el que dispara el evento es el CLIENTE, no el
// trainer, así que trae `client` en vez de `trainer`.
export type TrainerNotificationType =
  | 'invite_accepted'
  | 'intake_submitted_trainer'
  | 'checkin_responded'
  | 'nutrition_preferences_updated'
  // Cobros 2026-09 — recordatorio de un cobro con saldo (job del backend).
  // payload.current trae el estado VIGENTE del cobro al leer la lista.
  | 'payment_reminder'
  // Revisiones de técnica (docs/plan-medidas-multimedia.md): el cliente
  // mandó un vídeo, y aviso único de que una revisión se borra en 7 días.
  | 'form_check_submitted'
  | 'form_check_expiring';

export interface TrainerNotificationClient {
  _id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface TrainerNotification {
  _id: string;
  type: TrainerNotificationType;
  payload: Record<string, unknown>;
  read: boolean;
  readAt: string | null;
  createdAt: string;
  client: TrainerNotificationClient | null;
}
