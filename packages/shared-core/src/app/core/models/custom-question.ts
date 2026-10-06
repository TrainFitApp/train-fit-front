// Pregunta propia del profesional, con tipo: la misma en los check-ins y en
// el cuestionario de alta. Espejo de
// train-fit-back/components/forms/custom-question.js.
export type CustomQuestionType = 'scale_1_5' | 'number' | 'text' | 'yes_no' | 'select' | 'frequency';

export interface CustomQuestion {
  _id?: string;
  label: string;
  type: CustomQuestionType;
  // Solo `number` ("horas", "km"…).
  unit?: string;
  // Solo `select`; `frequency` usa FREQUENCY_OPTIONS.
  options?: string[];
  required?: boolean;
  // Desactivar deja de pedirla sin perder el texto.
  enabled?: boolean;
}

export type CustomAnswerValue = number | string | boolean;

// Respuesta guardada con su pregunta copiada (sigue legible aunque el
// profesional la cambie o la borre después).
export interface CustomAnswer {
  questionId: string;
  label: string;
  type: CustomQuestionType;
  unit: string;
  value: CustomAnswerValue;
}

// Escala fija de "frecuencia". Debe coincidir con FREQUENCY_OPTIONS del
// backend: si divergieran, la app ofrecería opciones que el servidor rechaza.
export const FREQUENCY_OPTIONS = ['Nunca', 'Rara vez', 'A veces', 'A menudo', 'Siempre'];
