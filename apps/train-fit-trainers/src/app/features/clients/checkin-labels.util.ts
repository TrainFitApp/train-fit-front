import { CHECKIN_FIELDS_BY_KEY } from 'src/app/core/constants/checkin-fields';
import { uiLocale, uiText } from 'src/app/core/i18n/localized-catalog';

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
    return question?.label || uiText('MY_CHECKINS.QUESTION_DELETED');
  }
  return CHECKIN_FIELDS_BY_KEY.get(key)?.label || key;
}

// Un booleano crudo se leería como "true"/"false".
export function checkinValueLabel(value: number | string | boolean): string {
  if (value === true) return uiText('COMMON.YES');
  if (value === false) return uiText('COMMON.NO');
  return String(value);
}

export interface CheckinCadenceLike {
  startDate: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  interval: number;
}

// "Cada martes", "Cada 3 semanas", "Día 15 de cada mes".
export function checkinCadenceLabel(schedule: CheckinCadenceLike): string {
  if (schedule.frequency === 'once') return uiText('CLIENTS.UNA_VEZ');
  if (schedule.frequency === 'weekly' && schedule.interval === 1) {
    return uiText('CLIENTS.CADA', { p0: new Date(`${schedule.startDate}T12:00:00`).toLocaleDateString(uiLocale(), { weekday: 'long' }) });
  }
  if (schedule.frequency === 'monthly' && schedule.interval === 1) {
    return uiText('CLIENTS.DIA_DE_CADA_MES', { p0: Number(schedule.startDate.slice(-2)) });
  }
  if (schedule.interval === 1) return uiText('CLIENTS.CADA_DIA');
  const unit = schedule.frequency === 'daily' ? uiText('CLIENTS.DIAS_2') : schedule.frequency === 'weekly' ? uiText('CLIENTS.SEMANAS') : uiText('CLIENTS.MESES');
  return uiText('CLIENTS.CADA_2', { interval: schedule.interval, unit });
}

// "S3 · 7 sept – 13 sept": a qué semana de la fase de dieta pertenece.
export function checkinWeekLabel(week: { number: number; start: string; end: string | null } | null): string {
  if (!week) return '';
  return `S${week.number} · ${shortDayLabel(week.start)}${week.end ? ` – ${shortDayLabel(week.end)}` : ''}`;
}

export function shortDayLabel(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}
