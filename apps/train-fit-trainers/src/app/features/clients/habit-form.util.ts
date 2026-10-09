// PURO — el panel de hábitos diarios de la ficha (crear y editar). QA
// 2026-10-09 (M14): un rango invertido («Objetivo 8000», «Hasta 5000») se
// mandaba sin tope y se guardaba sin avisar; los errores del back salían en
// español y sin traducir.

export interface HabitForm {
  type: string;
  label: string;
  target: number | null;
  targetMax: number | null;
  unit: string;
}

/** Por qué no se puede guardar (clave i18n), o null. */
export function habitFormError(form: HabitForm): string | null {
  if (form.type === 'custom' && !form.label.trim()) return 'CLIENT_DETAIL.TASK_ERRORS.TASK_LABEL_REQUIRED';
  if (form.target === null || !Number.isFinite(Number(form.target)) || Number(form.target) <= 0) {
    return 'CLIENT_DETAIL.TASK_ERRORS.TASK_INVALID_TARGET';
  }
  if (!form.unit.trim()) return 'CLIENT_DETAIL.TASK_ERRORS.TASK_UNIT_REQUIRED';
  if (form.targetMax !== null && form.targetMax !== undefined && String(form.targetMax) !== '') {
    if (!Number.isFinite(Number(form.targetMax)) || Number(form.targetMax) <= Number(form.target)) {
      return 'CLIENT_DETAIL.TASK_ERRORS.TASK_INVALID_RANGE';
    }
  }
  return null;
}

/** Lo que se manda al back: el tope tal cual (vacío = sin tope). */
export function habitPayload(form: HabitForm): { type: string; label?: string; target: number; targetMax: number | null; unit: string } {
  const hasMax = form.targetMax !== null && form.targetMax !== undefined && String(form.targetMax) !== '';
  return {
    type: form.type,
    label: form.type === 'custom' ? form.label.trim() : undefined,
    target: Number(form.target),
    targetMax: hasMax ? Number(form.targetMax) : null,
    unit: form.unit.trim(),
  };
}

const TASK_ERROR_CODES = [
  'TASK_INVALID_TYPE',
  'TASK_LABEL_REQUIRED',
  'TASK_LABEL_TOO_LONG',
  'TASK_UNIT_REQUIRED',
  'TASK_UNIT_TOO_LONG',
  'TASK_INVALID_TARGET',
  'TASK_TARGET_TOO_HIGH',
  'TASK_INVALID_RANGE',
  'TASK_DUPLICATE',
  'TASK_NOT_FOUND',
];

/** Clave i18n y parámetros de un error del back al guardar un hábito. */
export function habitErrorKey(error: any): { key: string; params: Record<string, unknown> } {
  const body = error?.error || {};
  return TASK_ERROR_CODES.includes(body.code)
    ? { key: `CLIENT_DETAIL.TASK_ERRORS.${body.code}`, params: { max: body.max } }
    : { key: 'CLIENT_DETAIL.NO_SE_PUDO_CREAR_EL', params: {} };
}
