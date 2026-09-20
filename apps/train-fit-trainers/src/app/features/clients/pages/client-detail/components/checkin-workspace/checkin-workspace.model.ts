import { CustomCheckinQuestion, CheckinTemplateDefinition } from '../../../../../checkin-templates/models/checkin-template.model';

// Estados de una solicitud de check-in (docs/plan-revisiones.md). No hay
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
// (docs/plan-revisiones.md §10).
export interface CheckinScheduleDraft {
  name: string;
  sourceTemplateId: string | null;
  startDate: string;
  time: string;
  frequency: CheckinFrequency;
  interval: number;
  revision?: number;
}

export interface CheckinSchedule extends CheckinScheduleDraft {
  _id: string;
  active: boolean;
  enabledFields: string[];
  requiredFields?: string[];
  customQuestions: CustomCheckinQuestion[];
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
  // Revisión de la fase de dieta a la que pertenece (R1, R2…), si el cliente
  // tenía fase ese día.
  revision: { phaseId: string; number: number; start: string; end: string | null } | null;
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
