export type CheckinCadence = 'weekly' | 'biweekly' | 'once';

export interface MyCheckinConfig {
  _id: string;
  trainerId: string;
  enabledFields: string[];
  cadence: CheckinCadence;
  trainer: { name: string; lastname: string } | null;
}

// coach-tab FASE2 — "formularios completados": una respuesta pasada.
export interface CheckinHistoryEntry {
  _id: string;
  trainerId: string;
  respondedAt: string;
  values: Record<string, number | string>;
  trainer: { name: string; lastname: string } | null;
}
