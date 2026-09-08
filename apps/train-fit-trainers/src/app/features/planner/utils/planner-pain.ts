import { PainEntry, PainThreshold } from 'src/app/core/constants/pain';

export interface PlannerPain extends PainEntry {
  threshold: PainThreshold | null;
  overThreshold: boolean;
}

/** Último registro de cada zona; conserva el cero como registro explícito. */
export function latestPlannerPain(entries: PainEntry[], thresholds: PainThreshold[]): PlannerPain[] {
  const latest = new Map<string, PainEntry>();
  for (const entry of entries) {
    if (!entry.zone || !Number.isFinite(entry.level) || entry.level < 0 || entry.level > 10) continue;
    if (!latest.has(entry.zone) || entry.date >= latest.get(entry.zone)!.date) latest.set(entry.zone, entry);
  }
  return [...latest.values()].map((entry) => {
    const threshold = thresholds.find((item) => item.zone === entry.zone) || null;
    return { ...entry, threshold, overThreshold: entry.level > 0 && threshold !== null && entry.level >= threshold.painLevel };
  }).sort((a, b) => b.level - a.level || b.date.localeCompare(a.date));
}
