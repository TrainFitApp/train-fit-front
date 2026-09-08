import { CheckinFieldType } from 'src/app/core/constants/checkin-fields';

export type CheckinCadence = 'weekly' | 'biweekly' | 'once';

// Fase 5 Coach Pro — pregunta propia del coach dentro de un check-in (§7).
// Espejo de components/trainerCheckins/checkin-custom-question.js.
export interface CustomCheckinQuestion {
  _id: string;
  label: string;
  type: CheckinFieldType;
  unit?: string;
  options?: string[];
  required?: boolean;
  enabled?: boolean;
}

export interface MyCheckinConfig {
  _id: string;
  requestId?: string;
  name?: string;
  scheduledAt?: string;
  closesAt?: string | null;
  trainerId: string;
  enabledFields: string[];
  // Ausente en las configuraciones aplicadas antes de la Fase 5 — de ahí el
  // opcional, y de ahí que todo el código las trate como lista vacía.
  customQuestions?: CustomCheckinQuestion[];
  // Ausente cuando requestId está presente: una ocurrencia del sistema de
  // calendario no tiene "cadence" (eso vive en CheckinSchedule) — el backend
  // ya no la inventa, ver cadenceLabel() en my-checkins.page.ts.
  cadence?: CheckinCadence;
  trainer: { name: string; lastname: string } | null;
}

// coach-tab FASE2 — "formularios completados": una respuesta pasada.
export interface CheckinHistoryEntry {
  _id: string;
  name?: string;
  customQuestions?: CustomCheckinQuestion[];
  status?: 'responded' | 'reviewed';
  reviewedAt?: string | null;
  reviewComment?: string;
  trainerId: string;
  respondedAt: string;
  // Las respuestas a preguntas propias viajan aquí mismo, con la clave
  // "custom:<id>" — no hay un segundo contenedor.
  values: Record<string, number | string | boolean>;
  trainer: { name: string; lastname: string } | null;
}

// Prefijo de la clave de una respuesta a pregunta propia. Debe coincidir con
// CUSTOM_KEY_PREFIX del backend.
export const CUSTOM_QUESTION_KEY_PREFIX = 'custom:';

export function customQuestionKey(questionId: string): string {
  return `${CUSTOM_QUESTION_KEY_PREFIX}${questionId}`;
}

export function isCustomQuestionKey(key: string): boolean {
  return key.startsWith(CUSTOM_QUESTION_KEY_PREFIX);
}

// Escala fija de "frecuencia". Debe coincidir con FREQUENCY_OPTIONS del
// backend: si divergieran, el cliente ofrecería opciones que el servidor
// rechazaría al enviar.
export const FREQUENCY_OPTIONS = ['Nunca', 'Rara vez', 'A veces', 'A menudo', 'Siempre'];
