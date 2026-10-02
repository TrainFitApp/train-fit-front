// Espejo de components/reviewQueue/review-queue-service.js (backend).

export type ReviewItemType = 'checkin' | 'form_check' | 'intake';

export interface ReviewItem {
  type: ReviewItemType;
  // Respuesta de check-in, revisión de técnica o cuestionario.
  id: string;
  clientId: string;
  clientName: string;
  // Nombre del check-in o del ejercicio; vacío en el cuestionario.
  title: string;
  date?: string;
  week?: { number: number; start: string; end: string | null } | null;
  // Desde cuándo espera: lo que ordena la cola.
  since: string;
  // Solo revisiones de técnica.
  thumbUrl?: string | null;
  durationSec?: number | null;
  keep?: boolean;
  daysLeft?: number | null;
  expiringSoon?: boolean;
}

export interface ReviewCounts {
  total: number;
  checkin: number;
  form_check: number;
  intake: number;
}

export interface ReviewQueueResponse {
  items: ReviewItem[];
  counts: ReviewCounts;
  // Revisiones ya respondidas que se borran esta semana.
  expiringFormChecks: ReviewItem[];
  // false = sin clientes de entrenamiento (nutricionista): no hay técnica.
  technique: boolean;
}
