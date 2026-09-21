import { CHECKIN_FIELDS_BY_KEY } from 'src/app/core/constants/checkin-fields';

// Cómo se lee una respuesta de check-in. Vivía suelto en client-detail.page.ts
// hasta que el panel de resumen de semana necesitó lo mismo: se extrae aquí en
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

export interface CheckinCadenceLike {
  startDate: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  interval: number;
}

// "Cada martes", "Cada 3 semanas", "Día 15 de cada mes".
export function checkinCadenceLabel(schedule: CheckinCadenceLike): string {
  if (schedule.frequency === 'once') return 'Una vez';
  if (schedule.frequency === 'weekly' && schedule.interval === 1) {
    return `Cada ${new Date(`${schedule.startDate}T12:00:00`).toLocaleDateString('es-ES', { weekday: 'long' })}`;
  }
  if (schedule.frequency === 'monthly' && schedule.interval === 1) {
    return `Día ${Number(schedule.startDate.slice(-2))} de cada mes`;
  }
  if (schedule.interval === 1) return 'Cada día';
  const unit = schedule.frequency === 'daily' ? 'días' : schedule.frequency === 'weekly' ? 'semanas' : 'meses';
  return `Cada ${schedule.interval} ${unit}`;
}

// "S3 · 7 sept – 13 sept": a qué semana de la fase de dieta pertenece.
export function checkinWeekLabel(week: { number: number; start: string; end: string | null } | null): string {
  if (!week) return '';
  return `S${week.number} · ${shortDayLabel(week.start)}${week.end ? ` – ${shortDayLabel(week.end)}` : ''}`;
}

export function shortDayLabel(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}
