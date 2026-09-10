import { CheckinFieldType } from 'src/app/core/constants/checkin-fields';


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

// Un check-in abierto del cliente. Siempre es una solicitud concreta, con su
// fecha de apertura y su fecha de cierre: la "configuración aplicada" del
// sistema antiguo, que estaba abierta para siempre, ya no existe.
export interface MyCheckinConfig {
  _id: string;
  requestId: string;
  name?: string;
  scheduledAt?: string;
  closesAt?: string | null;
  trainerId: string;
  enabledFields: string[];
  customQuestions?: CustomCheckinQuestion[];
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
