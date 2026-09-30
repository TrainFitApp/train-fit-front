import { CustomCheckinQuestion, CheckinTemplateDefinition } from '../../../../../checkin-templates/models/checkin-template.model';

// Estados de una solicitud de check-in (docs/plan-semanas.md). No hay
// colección de solicitudes: son fechas calculadas a partir de la
// programación, así que el estado se deriva de la fecha + la respuesta.
//   scheduled  todavía no ha llegado su día
//   open       su ventana incluye hoy: el cliente puede responder (o
//              corregir lo que ya respondió)
//   unanswered la ventana se cerró sin respuesta
//   responded  respondida, pendiente de revisar
//   reviewed   revisada por el profesional
export type CheckinStatus = 'scheduled' | 'open' | 'unanswered' | 'responded' | 'reviewed';
export type CheckinFrequency = 'once' | 'daily' | 'weekly' | 'monthly';

// Sin zona horaria: la hora es de reloj y vale igual en cualquier sitio
// (docs/plan-semanas.md).
export interface CheckinScheduleDraft {
  name: string;
  sourceTemplateId: string | null;
  startDate: string;
  time: string;
  frequency: CheckinFrequency;
  interval: number;
  // Campos sueltos del catálogo, cuando las preguntas no salen de una
  // plantilla (sourceTemplateId null).
  enabledFields?: string[];
  // Contador de concurrencia del propio documento (CheckinSchedule.revision
  // en el back), para detectar ediciones desde dos pantallas. Nada que ver
  // con las semanas de dieta.
  revision?: number;
}

export interface CheckinSchedule extends CheckinScheduleDraft {
  _id: string;
  active: boolean;
  enabledFields: string[];
  requiredFields?: string[];
  customQuestions: CustomCheckinQuestion[];
  // Próxima fecha posterior a hoy (calculada en el back); null si está
  // pausada o ya no tiene más.
  nextDate?: string | null;
}

// "Cómo va el seguimiento": ocurrencias de los últimos `days` días.
export interface CheckinSummary {
  days: number;
  open: number;
  missed: number;
}

// Una ocurrencia de la agenda, con su respuesta ya unida si la hay.
export interface CheckinEntry {
  _id: string;
  scheduleId: string;
  name: string;
  // Día en que se pide ("YYYY-MM-DD") y hora de reloj ("HH:mm").
  date: string;
  time: string;
  // Víspera del siguiente check-in: hasta ese día se puede responder.
  closesDate: string | null;
  status: CheckinStatus;
  enabledFields: string[];
  requiredFields: string[];
  customQuestions: CustomCheckinQuestion[];
  values: Record<string, number | string | boolean> | null;
  respondedAt: string | null;
  updatedAt: string | null;
  reviewedAt: string | null;
  reviewComment: string;
  responseId: string | null;
  // Semana de la fase de dieta a la que pertenece (S1, S2…), si el cliente
  // tenía fase ese día.
  week: { phaseId: string; number: number; start: string; end: string | null } | null;
}

// Una página del histórico de UNA programación, de la ocurrencia más nueva a
// la más vieja. `nextBefore` es el cursor de la página siguiente (null = ya
// se llegó al principio).
export interface CheckinScheduleHistory {
  schedule: CheckinSchedule;
  entries: CheckinEntry[];
  nextBefore: string | null;
  total: number;
}

export interface CheckinAgendaData {
  schedules: CheckinSchedule[];
  entries: CheckinEntry[];
  responses: CheckinEntry[];
  reviewCount: number;
}

export interface CheckinDay {
  date: string;
  number: number;
  currentMonth: boolean;
  count: number;
  statuses: CheckinStatus[];
  label: string;
}

export type ComparisonTab = 'peso' | 'composicion_corporal' | 'perimetros' | 'fotos' | 'entrenamiento' | 'bienestar' | 'comentario' | 'custom';

export interface CheckinComparisonRow {
  key: string;
  // Pestaña de la revisión a la que pertenece el dato.
  tab: ComparisonTab;
  label: string;
  previous: string;
  current: string;
  change: string;
  direction: 'up' | 'down' | 'flat' | 'missing';
  anchor: string | null;
}

export type { CheckinTemplateDefinition };
