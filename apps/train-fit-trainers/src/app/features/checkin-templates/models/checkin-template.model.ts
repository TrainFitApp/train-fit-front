import { CheckinFieldType } from 'src/app/core/constants/checkin-fields';


// Fase 5 Coach Pro — pregunta propia del coach (§7). Espejo de
// components/trainerCheckins/checkin-custom-question.js.
export interface CustomCheckinQuestion {
  _id?: string;
  label: string;
  type: CheckinFieldType;
  unit?: string;
  options?: string[];
  required?: boolean;
  enabled?: boolean;
}

export interface CheckinTemplateDefinition {
  _id: string;
  name: string;
  enabledFields: string[];
  // Ausente en plantillas creadas antes de la Fase 5 — de ahí el opcional.
  customQuestions?: CustomCheckinQuestion[];
  // Periodicidad por defecto al aplicar la plantilla a un cliente, en el
  // mismo vocabulario que la programación real.
  frequency: "once" | "daily" | "weekly" | "monthly";
  interval: number;
  createdAt: string;
}

// Los seis tipos de §7, con el texto que ve el coach al elegir. `frequency`
// no lleva opciones configurables: su escala es fija (ver el backend), y eso
// es lo que hace comparables las respuestas entre semanas.
export const CUSTOM_QUESTION_TYPES: {
  key: CheckinFieldType;
  label: string;
  hint: string;
}[] = [
  { key: 'scale_1_5', label: 'Escala 1-5', hint: 'Del 1 al 5, como el resto de campos de bienestar' },
  { key: 'number', label: 'Número', hint: 'Una cifra, con unidad opcional' },
  { key: 'text', label: 'Texto libre', hint: 'Respuesta abierta' },
  { key: 'yes_no', label: 'Sí / No', hint: 'Dos opciones' },
  { key: 'select', label: 'Selector', hint: 'Tú defines las opciones' },
  { key: 'frequency', label: 'Frecuencia', hint: 'Nunca · Rara vez · A veces · A menudo · Siempre' },
];

export interface ApplyResult {
  applied: string[];
  skipped: string[];
}
