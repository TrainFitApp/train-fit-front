import { CustomCheckinQuestion, CheckinTemplateDefinition } from '../../../../../checkin-templates/models/checkin-template.model';
import { CheckinConfig, CheckinResponseEntry } from '../../models/client-detail.model';

export type CheckinStatus = 'scheduled' | 'pending' | 'unanswered' | 'responded' | 'reviewed' | 'cancelled' | 'legacy';
export type CheckinFrequency = 'once' | 'daily' | 'weekly' | 'monthly';
export interface CheckinScheduleDraft {
  name: string;
  sourceTemplateId: string | null;
  legacyConfigId?: string | null;
  startDate: string;
  time: string;
  timeZone: string;
  frequency: CheckinFrequency;
  interval: number;
  revision?: number;
}
export interface CheckinSchedule extends CheckinScheduleDraft {
  _id: string;
  active: boolean;
  nextRunAt: string | null;
  enabledFields: string[];
  customQuestions: CustomCheckinQuestion[];
}
export interface CalendarCheckin {
  _id: string;
  scheduleId: string;
  name: string;
  scheduledAt: string;
  closesAt?: string | null;
  timeZone: string;
  status: CheckinStatus;
  respondedAt?: string | null;
  reviewedAt?: string | null;
  reviewComment?: string;
  values?: Record<string, number | string | boolean>;
  enabledFields?: string[];
  customQuestions?: CustomCheckinQuestion[];
}
export interface CheckinCalendarData {
  schedules: CheckinSchedule[];
  entries: CalendarCheckin[];
  responses: CalendarCheckin[];
  pendingReviews: CalendarCheckin[];
  reviewCount: number;
  legacyConfig: CheckinConfig | null;
  legacyResponses: CheckinResponseEntry[];
}
export interface CheckinDay {
  date: string;
  number: number;
  currentMonth: boolean;
  count: number;
  statuses: CheckinStatus[];
  label: string;
}
export interface CheckinComparisonRow {
  key: string;
  label: string;
  previous: string;
  current: string;
  change: string;
  direction: 'up' | 'down' | 'flat' | 'missing';
  anchor: string | null;
}
export type { CheckinTemplateDefinition };
