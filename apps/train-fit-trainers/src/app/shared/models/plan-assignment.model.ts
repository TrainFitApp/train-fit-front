// Auditoría de arquitectura (nutrición) — la pieza que hoy no existía:
// "este plan aplica a este cliente desde tal fecha, hasta tal otra o
// indefinidamente". Ver MVP-trainers/tareas-grandes/TAREA5 (Fase 8).
export type PlanAssignmentStatus = 'active' | 'superseded' | 'ended';
export type DietTemplateMode = 'sequential' | 'recurring' | 'choice';

export interface PlanAssignment {
  // La copia congelada de la plantilla ES la asignación — un solo documento,
  // sin PlanAssignment aparte (ver train-fit-back/components/dietTemplates/diet-template-schema.js).
  _id: string;
  // Informativo — de qué plantilla se copió, solo para "ver plantilla
  // aplicada" (openActivePlanTemplate). Puede ser null si la plantilla
  // original ya se borró.
  sourceTemplateId: string | null;
  clientId: string;
  trainerId: string;
  startDate: string;
  // Fin REAL: null mientras la fase sigue corriendo, con fecha en cuanto otra
  // la corta. No hay fin estimado (ciclos por contenido: una fase acaba
  // cuando empieza otra).
  endDate: string | null;
  status: PlanAssignmentStatus;
  // Nº de días de contenido del doc (days[]). 0 en recurring/choice.
  daysCount?: number | null;
  // Días que dura un ciclo de ESTE doc (contenido): days.length, 7, o
  // choiceCycleDays. Ver cycle-window.js en el backend.
  cycleDays?: number | null;
  choiceCycleDays?: number | null;
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
  // Sugerencias de dieta — la fase a la que pertenece este ciclo. `phaseId`
  // apunta al primer ciclo de la fase; phaseName/phaseFocus solo vienen
  // rellenos en ese primer ciclo.
  phaseId?: string | null;
  phaseName?: string | null;
  phaseFocus?: 'cut' | 'maintain' | 'bulk' | null;
}

// El bloque con el que nace toda fase (objetivo elegido en el builder al
// crear el C1, o en el cajón de sugerencias). Sin él la copia es un plan
// "de siempre", sin ciclos.
export interface PhasePayload {
  name: string;
  focus: 'cut' | 'maintain' | 'bulk' | null;
  targetKcalDelta: number;
  ratePerCycle: number;
}

export interface ApplyPlanRequest {
  startDate: string;
  phase?: PhasePayload;
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
