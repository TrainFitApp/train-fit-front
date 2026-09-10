import { isCivilDate, measurementToday } from 'src/app/core/utils/measurement-weeks.util';
export { isCivilDate } from 'src/app/core/utils/measurement-weeks.util';

export interface InitialMeasurementDefinition {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  hint?: string;
}

export interface InitialMeasurementValue {
  field: string;
  value: number;
  date: string;
  confirmedExisting?: boolean;
  expectedValue?: number | null;
}

export interface InitialMeasurementDraft {
  field: string;
  value: string;
  date: string;
  confirmedExisting?: boolean;
  expectedValue?: number | null;
}

export interface InitialMeasurementsState {
  stageId: string;
  version: number;
  requestedFields: string[];
  catalog: InitialMeasurementDefinition[];
  missingFields: string[];
  baselines: { key: string; value: number; date: string; source?: string }[];
  recent: InitialMeasurementValue[];
  timeZone: string;
  configVersion?: number;
  submitted?: boolean;
}

export interface PendingInitialMeasurements {
  trainerId: string;
  trainerName: string;
  stageId: string;
  missingFields: string[];
  requestedFields: string[];
}

export function deviceTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

export function todayInTimeZone(timeZone: string, now = new Date()): string {
  return measurementToday(timeZone, now);
}

export interface InitialMeasurementConflict {
  field: string;
  label: string;
  unit: string;
  date: string;
  value: number;
  currentValue: number | null;
}

export function initialMeasurementConflicts(error: unknown, values: InitialMeasurementValue[], catalog: InitialMeasurementDefinition[]): InitialMeasurementConflict[] {
  const response = error as { error?: { code?: string; currentValues?: Record<string, number | null> } };
  if (response?.error?.code !== 'MEASUREMENT_CONFLICT' || !response.error.currentValues) return [];
  return Object.entries(response.error.currentValues).flatMap(([field, currentValue]) => {
    const submitted = values.find((item) => item.field === field);
    const definition = catalog.find((item) => item.key === field);
    return submitted && definition ? [{ field, label: definition.label, unit: definition.unit, date: submitted.date, value: submitted.value, currentValue }] : [];
  });
}

export function validateInitialMeasurements(
  definitions: InitialMeasurementDefinition[],
  drafts: InitialMeasurementDraft[],
  today: string
): { values: InitialMeasurementValue[]; missing: InitialMeasurementDefinition[]; errors: Record<string, string> } {
  const values: InitialMeasurementValue[] = [];
  const missing: InitialMeasurementDefinition[] = [];
  const errors: Record<string, string> = {};
  for (const definition of definitions) {
    const draft = drafts.find((row) => row.field === definition.key);
    if (!draft || !draft.value.trim()) {
      missing.push(definition);
      continue;
    }
    const raw = draft.value.trim().replace(',', '.');
    const value = Number(raw);
    if (!/^\d+(?:\.\d+)?$/.test(raw) || !Number.isFinite(value) || value <= 0 || value < definition.min || value > definition.max) {
      errors[definition.key] = `Introduce un valor entre ${definition.min} y ${definition.max} ${definition.unit}.`;
    } else if (!isCivilDate(draft.date) || draft.date > today) {
      errors[definition.key] = 'Indica la fecha real de la medición, hasta hoy.';
    } else {
      values.push({
        field: definition.key, value, date: draft.date,
        ...(draft.confirmedExisting ? { confirmedExisting: true } : {}),
        ...(draft.expectedValue !== undefined ? { expectedValue: draft.expectedValue } : {}),
      });
    }
  }
  return { values, missing, errors };
}

export function newIntakeRequestId(): string {
  return globalThis.crypto.randomUUID();
}
