import { CustomCheckinQuestion, CheckinTemplateDefinition } from '../../../../../checkin-templates/models/checkin-template.model';
import { CheckinResponseEntry } from '../../models/client-detail.model';

export type CheckinStatus = 'scheduled' | 'pending' | 'unanswered' | 'responded' | 'reviewed' | 'cancelled' | 'legacy';
export type CheckinFrequency = 'once' | 'daily' | 'weekly' | 'monthly';
export interface CheckinScheduleDraft {
  name: string;
  sourceTemplateId: string | null;
  // Fase 8 — alternativa a sourceTemplateId al CREAR: campos sueltos del
  // catálogo, sin pasar por una plantilla guardada. Solo se manda al
  // backend cuando sourceTemplateId es null; al editar una programación
  // existente no se toca (mismo criterio que ya tenía sourceTemplateId).
  enabledFields?: string[];
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
  // Grupo del catálogo al que pertenece el dato. La tabla lo usa para meter
  // una cabecera cuando cambia: peso, cintura y calidad del sueño no son la
  // misma clase de número y no deben leerse en una lista plana.
  group: string;
  // Solo la primera fila de cada grupo lo lleva; las demás, cadena vacía.
  groupLabel: string;
  label: string;
  previous: string;
  current: string;
  change: string;
  direction: 'up' | 'down' | 'flat' | 'missing';
  anchor: string | null;
}
export type { CheckinTemplateDefinition };
