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

// Un check-in ABIERTO hoy (docs/plan-revisiones.md): su ventana de fechas
// incluye hoy, así que se puede responder y corregir hasta que cierre. Fuera
// de esa ventana no aparece: ese periodo ya pasó.
export interface MyCheckin {
  // "scheduleId:fecha" — identifica la ocurrencia.
  _id: string;
  scheduleId: string;
  name: string;
  // Día en que se pidió y víspera del siguiente (hasta cuándo se puede
  // responder). Fechas de calendario: la hora es de reloj, sin zona horaria.
  date: string;
  time: string;
  closesDate: string | null;
  status: 'open' | 'responded' | 'reviewed';
  trainerId: string;
  enabledFields: string[];
  // Subconjunto de enabledFields que hay que responder sí o sí.
  requiredFields?: string[];
  customQuestions?: CustomCheckinQuestion[];
  // Lo ya respondido (para corregirlo sin empezar de cero).
  values: Record<string, number | string | boolean> | null;
  respondedAt: string | null;
  updatedAt: string | null;
  reviewComment?: string;
  trainer: { name: string; lastname: string } | null;
  // Revisión de la fase de dieta que abre este check-in (R1, R2…).
  revision?: CheckinRevision | null;
}

export interface CheckinRevision {
  phaseId: string;
  phaseName: string | null;
  number: number;
  start: string;
  end: string | null;
}

// coach-tab FASE2 — "formularios completados": una respuesta pasada.
export interface CheckinHistoryEntry {
  _id: string;
  name?: string;
  occurrenceDate?: string;
  revision?: CheckinRevision | null;
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
