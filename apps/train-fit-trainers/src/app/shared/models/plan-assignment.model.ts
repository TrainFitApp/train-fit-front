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
  // Info de cálculo de fase (docs/plan-info-calculo-fase.md): g/kg que el
  // entrenador tocó en el cajón (ausentes = fórmula por defecto).
  proteinPerKg?: number | null;
  fatPerKg?: number | null;
}

export interface ApplyPlanRequest {
  startDate: string;
  phase?: PhasePayload;
}

// Historial de nutrición de la ficha — feed de eventos que desglosa fases y
// ciclos (espejo de train-fit-back/components/planAssignments/nutrition-history.js).
export type NutritionHistoryEventType = 'phase_started' | 'phase_ended' | 'cycle' | 'checkin' | 'exception';
// met/missed = ciclo acabado con adherencia >= / < 75 %; no_data = acabado
// sin ningún día registrado; running = todavía en marcha.
export type NutritionCycleStatus = 'running' | 'met' | 'missed' | 'no_data';

export interface NutritionHistoryCheckin {
  id: string;
  respondedAt: string;
  values: Record<string, number | string | boolean>;
}

export interface NutritionHistoryException {
  id: string;
  date: string;
  action: 'override' | 'skip';
  mealSlot: string | null;
}

interface NutritionHistoryEventBase {
  type: NutritionHistoryEventType;
  // "YYYY-MM-DD" — la fecha por la que se ordena el feed.
  date: string;
  phaseId: string;
  phaseName: string | null;
  phaseFocus: 'cut' | 'maintain' | 'bulk' | null;
}

export interface NutritionPhaseStartedEvent extends NutritionHistoryEventBase {
  type: 'phase_started';
  mode: DietTemplateMode | null;
}

export interface NutritionPhaseEndedEvent extends NutritionHistoryEventBase {
  type: 'phase_ended';
  status: 'superseded' | 'finished';
  cyclesCount: number;
}

export interface NutritionCycleEvent extends NutritionHistoryEventBase {
  type: 'cycle';
  number: number;
  start: string;
  end: string;
  // La fase se cortó antes de que este ciclo llegara a su fin natural.
  truncated: boolean;
  overrideId: string;
  profile: { kcal: number; protein: number; carbs: number; fat: number };
  kcalDelta: number | null;
  adherencePct: number | null;
  adherenceDays: number;
  periodDays: number;
  status: NutritionCycleStatus;
  checkin: NutritionHistoryCheckin | null;
  exceptions: NutritionHistoryException[];
}

export interface NutritionCheckinEvent extends NutritionHistoryEventBase {
  type: 'checkin';
  number: number;
  checkin: NutritionHistoryCheckin;
}

export interface NutritionExceptionEvent extends NutritionHistoryEventBase {
  type: 'exception';
  number: number;
  exception: NutritionHistoryException;
}

export type NutritionHistoryEvent =
  | NutritionPhaseStartedEvent
  | NutritionPhaseEndedEvent
  | NutritionCycleEvent
  | NutritionCheckinEvent
  | NutritionExceptionEvent;

export interface NutritionHistoryResponse {
  events: NutritionHistoryEvent[];
}
