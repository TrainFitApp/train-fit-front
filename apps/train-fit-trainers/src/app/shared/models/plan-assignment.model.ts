// Auditoría de arquitectura (nutrición) — la pieza que hoy no existía:
// "este plan aplica a este cliente desde tal fecha, hasta tal otra o
// indefinidamente". Ver MVP-trainers/tareas-grandes/TAREA5 (Fase 8).
export type PlanEndMode = 'fixedDate' | 'duration' | 'indefinite';
export type DurationUnit = 'days' | 'weeks';
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
  // Sugerencias de dieta — la fase a la que pertenece este ciclo. `phaseId`
  // apunta al primer ciclo de la fase; phaseName/phaseFocus solo vienen
  // rellenos en ese primer ciclo.
  phaseId?: string | null;
  phaseName?: string | null;
  phaseFocus?: 'cut' | 'maintain' | 'bulk' | null;
  cycleTargetKcal?: number | null;
}

export interface ApplyPlanRequest {
  startDate: string;
  endMode: PlanEndMode;
  fixedEndDate?: string;
  durationValue?: number;
  durationUnit?: DurationUnit;
  // Sugerencias de dieta — presentes solo cuando se EMPIEZA una fase desde el
  // cajón (Hipertrofia / Minicut / ...). Sin ellos, aplicar un plan se
  // comporta como siempre. Tipos en
  // features/diet-templates/models/diet-suggestion.model.ts.
  phase?: {
    name: string;
    focus: 'cut' | 'maintain' | 'bulk' | null;
    targetKcalDelta: number;
    ratePerCycle: number;
  };
  cycleTarget?: { kcal: number; macros: { protein: number; carbs: number; fat: number } };
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
