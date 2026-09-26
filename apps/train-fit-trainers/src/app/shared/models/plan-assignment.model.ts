// Auditoría de arquitectura (nutrición) — la pieza que hoy no existía:
// "este plan aplica a este cliente desde tal fecha, hasta tal otra o
// indefinidamente". Ver MVP-trainers/tareas-grandes/TAREA5 (Fase 8).
export type PlanAssignmentStatus = 'active' | 'superseded' | 'ended';

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
  // la corta o el entrenador se lo pone a mano (editar fechas de la fase).
  endDate: string | null;
  status: PlanAssignmentStatus;
  // Nº de menús de contenido del doc.
  menusCount?: number | null;
  supersededBy: string | null;
  createdAt: string;
  planName?: string | null;
  // TASK-044 (MASTER_BACKLOG.md) — cuántos días desde startDate el cliente
  // nunca eligió menú (DietDay.menuName sigue null).
  stuckDaysCount?: number | null;
  // La fase a la que pertenece este contenido. `phaseId` apunta al primer
  // documento de la fase; phaseName/phaseTarget solo vienen rellenos ahí.
  phaseId?: string | null;
  phaseName?: string | null;
  // Objetivo con el que se pauta la fase (calculado del cliente o tecleado
  // a mano en el cajón).
  phaseTarget?: {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    source: 'calculated' | 'manual';
  } | null;
}

// El bloque con el que nace toda fase: su nombre y con qué números se
// pauta. Sin él la copia es un plan suelto, sin semanas.
export interface PhasePayload {
  name: string;
  // kcal/macros de la fase: los calculados del cliente o los que el
  // entrenador tecleó encima (source 'manual').
  target: {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    source: 'calculated' | 'manual';
  } | null;
  // g/kg que el entrenador tocó en el cajón (ausentes = fórmula por defecto).
  proteinPerKg?: number | null;
  fatPerKg?: number | null;
}

export interface ApplyPlanRequest {
  startDate: string;
  phase?: PhasePayload;
}

// Historial de nutrición de la ficha — feed de eventos que desglosa fases y
// semanas (espejo de train-fit-back/components/planAssignments/nutrition-history.js).
export type NutritionHistoryEventType = 'phase_started' | 'phase_ended' | 'week';
// met/missed = semana acabada con adherencia >= / < 75 %; no_data =
// acabada sin ningún día registrado; running = todavía en marcha.
export type NutritionWeekStatus = 'running' | 'met' | 'missed' | 'no_data';

interface NutritionHistoryEventBase {
  type: NutritionHistoryEventType;
  // "YYYY-MM-DD" — la fecha por la que se ordena el feed.
  date: string;
  phaseId: string;
  phaseName: string | null;
}

export interface NutritionPhaseStartedEvent extends NutritionHistoryEventBase {
  type: 'phase_started';
}

export interface NutritionPhaseEndedEvent extends NutritionHistoryEventBase {
  type: 'phase_ended';
  status: 'superseded' | 'finished';
  weeksCount: number;
}

export interface NutritionWeekEvent extends NutritionHistoryEventBase {
  type: 'week';
  number: number;
  start: string;
  end: string;
  // La fase se cortó antes de que esta semana llegara a su fin natural.
  truncated: boolean;
  overrideId: string;
  profile: { kcal: number; protein: number; carbs: number; fat: number };
  kcalDelta: number | null;
  adherencePct: number | null;
  adherenceDays: number;
  periodDays: number;
  status: NutritionWeekStatus;
  // Fechas de la semana en las que el cliente se saltó el plan.
  skippedDays: string[];
}

export type NutritionHistoryEvent =
  | NutritionPhaseStartedEvent
  | NutritionPhaseEndedEvent
  | NutritionWeekEvent;

export interface NutritionHistoryResponse {
  events: NutritionHistoryEvent[];
}
