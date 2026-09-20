import { CHECKIN_FIELDS_BY_KEY } from 'src/app/core/constants/checkin-fields';

// Cómo se lee una respuesta de check-in. Vivía suelto en client-detail.page.ts
// hasta que el panel de resumen de revisión necesitó lo mismo: se extrae aquí en
// vez de copiarlo, que es exactamente como se desincronizaron en su día las
// tres copias de la paleta de fases (ver phase-color.util.ts).

export interface CheckinCustomQuestionLike {
  _id?: unknown;
  label?: string | null;
}

// Fase 5 Coach Pro — las respuestas a preguntas propias del coach viajan con
// la clave "custom:<id>", que no está en el catálogo: su enunciado se busca en
// la configuración aplicada a ESE cliente. Sin esto se mostraría
// "custom:507f1f77bcf86cd799439011".
export function checkinFieldLabel(
  key: string,
  customQuestions: CheckinCustomQuestionLike[] = []
): string {
  if (key.startsWith('custom:')) {
    const questionId = key.slice('custom:'.length);
    const question = (customQuestions || []).find((q) => String(q?._id) === questionId);
    return question?.label || 'Pregunta eliminada';
  }
  return CHECKIN_FIELDS_BY_KEY.get(key)?.label || key;
}

// Un booleano crudo se leería como "true"/"false".
export function checkinValueLabel(value: number | string | boolean): string {
  if (value === true) return 'Sí';
  if (value === false) return 'No';
  return String(value);
}
