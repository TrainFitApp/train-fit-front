import { uiLocale } from 'src/app/core/i18n/localized-catalog';
// Resumen de una serie para las revisiones de técnica. Prescrito y ejecutado
// siempre por separado (docs/domain.md). RIR: -1 = fallo, 0 = cero real,
// ausente = «—».

function list(value: unknown): number[] {
  if (Array.isArray(value)) return value.map(Number).filter((item) => Number.isFinite(item));
  const single = Number(value);
  return value != null && value !== '' && Number.isFinite(single) ? [single] : [];
}

function rirLabel(values: number[], failLabel: string): string | null {
  if (!values.length) return null;
  return values.map((value) => (value === -1 ? failLabel : String(value))).join('–');
}

function number(value: unknown): string | null {
  const parsed = Number(value);
  return value != null && value !== '' && Number.isFinite(parsed) ? parsed.toLocaleString(uiLocale(), { maximumFractionDigits: 2 }) : null;
}

/** «80 kg × 8 · RIR 2» con lo ejecutado, o null si aún no hay nada. */
export function executedSummary(set: Record<string, any> | null | undefined, failLabel = 'Fallo'): string | null {
  if (!set) return null;
  const parts: string[] = [];
  const weight = number(set['weight']);
  const reps = number(set['reps']);
  if (weight && reps) parts.push(`${weight} kg × ${reps}`);
  else if (reps) parts.push(`${reps} reps`);
  else if (weight) parts.push(`${weight} kg`);
  if (set['time']) parts.push(String(set['time']));
  if (number(set['distance'])) parts.push(`${number(set['distance'])} m`);
  const rir = rirLabel(list(set['rir']), failLabel);
  if (rir && parts.length) parts.push(`RIR ${rir}`);
  return parts.length ? parts.join(' · ') : null;
}

/** «8–10 reps · RIR 1–2» con lo pautado, o null. */
export function prescribedSummary(set: Record<string, any> | null | undefined, failLabel = 'Fallo'): string | null {
  if (!set) return null;
  const parts: string[] = [];
  const reps = list(set['expectedReps']);
  if (reps.length) parts.push(`${reps.join('–')} reps`);
  if (set['expectedTime']) parts.push(String(set['expectedTime']));
  if (number(set['expectedDistance'])) parts.push(`${number(set['expectedDistance'])} m`);
  const rir = rirLabel(list(set['expectedRir']), failLabel);
  if (rir) parts.push(`RIR ${rir}`);
  return parts.length ? parts.join(' · ') : null;
}

/** Copia de la serie que viaja con la revisión (lo que el backend acepta). */
export function setSnapshotOf(set: Record<string, any> | null | undefined, index: number): Record<string, any> | null {
  if (!set) return null;
  const snapshot: Record<string, any> = { index };
  for (const key of ['reps', 'weight', 'restSeconds', 'expectedDistance', 'distance', 'expectedTime', 'time']) {
    if (set[key] != null && set[key] !== '') snapshot[key] = set[key];
  }
  for (const key of ['rir', 'expectedRir', 'expectedReps']) {
    const values = list(set[key]);
    if (values.length) snapshot[key] = values;
  }
  if (set['drop']) snapshot['drop'] = true;
  return snapshot;
}
