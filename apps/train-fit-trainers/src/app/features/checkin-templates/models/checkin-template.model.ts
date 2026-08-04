export type CheckinCadence = 'weekly' | 'biweekly' | 'once';

export interface CheckinTemplateDefinition {
  _id: string;
  name: string;
  enabledFields: string[];
  cadence: CheckinCadence;
  createdAt: string;
}

export interface ApplyResult {
  applied: string[];
  skipped: string[];
}
