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
// Las siete pestañas de la revisión, en el orden en que se muestran. Un
// dato concreto puede aparecer en como mucho una — ver tabOf() en
// checkin-comparison.ts para el reparto exacto.
export type ComparisonTab = 'peso' | 'composicion_corporal' | 'perimetros' | 'entrenamiento' | 'bienestar' | 'comentario' | 'custom';
export interface CheckinComparisonRow {
  key: string;
  // Pestaña a la que pertenece el dato: peso, composición corporal,
  // perímetros, seguimiento del entrenamiento, bienestar (el resto de
  // preguntas de bienestar que no tienen pestaña propia), comentario o tus
  // preguntas. Cada dato aparece en una única pestaña.
  tab: ComparisonTab;
  label: string;
  previous: string;
  current: string;
  change: string;
  direction: 'up' | 'down' | 'flat' | 'missing';
  anchor: string | null;
}
export type { CheckinTemplateDefinition };
