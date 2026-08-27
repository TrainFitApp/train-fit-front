// Auditoría de arquitectura (nutrición) — la pieza que hoy no existía:
// "este plan aplica a este cliente desde tal fecha, hasta tal otra o
// indefinidamente". Ver MVP-trainers/tareas-grandes/TAREA5 (Fase 8).
export type PlanEndMode = 'fixedDate' | 'duration' | 'indefinite';
export type DurationUnit = 'days' | 'weeks';
export type PlanAssignmentStatus = 'active' | 'superseded' | 'ended';
export type DietTemplateMode = 'sequential' | 'recurring' | 'choice';

export interface PlanAssignment {
  _id: string;
  planId: string;
  clientId: string;
  trainerId: string;
  startDate: string;
  endMode: PlanEndMode;
  endDate: string | null;
  status: PlanAssignmentStatus;
  supersededBy: string | null;
  createdAt: string;
  planName?: string | null;
  // TASK-044 (MASTER_BACKLOG.md) — mode ya existía en el plan, solo faltaba
  // exponerlo aquí. stuckDaysCount solo se calcula (no-null) cuando
  // mode === 'choice': cuántos días desde startDate el cliente nunca eligió
  // menú (DietDay.dayTypeName sigue null).
  mode?: DietTemplateMode | null;
  stuckDaysCount?: number | null;
  // F20-octies — solo para mode === 'recurring': cada dayPattern del plan
  // con nombre + sus weekdays (0=domingo…6=sábado, ver WEEKDAYS en
  // diet-template.model.ts), para distinguir "patrón A cubre L/M/S, patrón
  // B cubre X/D" en vez de una única lista mezclada. null para
  // sequential/choice.
  recurringPatterns?: { name: string; appliesTo: number[] }[] | null;
}

export interface ApplyPlanRequest {
  startDate: string;
  endMode: PlanEndMode;
  fixedEndDate?: string;
  durationValue?: number;
  durationUnit?: DurationUnit;
}

// TASK-045 (MASTER_BACKLOG.md) — excepción puntual sobre una fecha exacta
// de un plan activo (ver train-fit-back/components/dietExceptions).
export interface DietException {
  _id: string;
  assignmentId: string;
  clientId: string;
  date: string;
  mealSlot: string | null;
  action: 'override' | 'skip';
  createdAt: string;
}
