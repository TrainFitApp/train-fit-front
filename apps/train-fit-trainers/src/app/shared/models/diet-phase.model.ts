import { DietTemplateMenuPayload } from '../../features/diet-templates/models/diet-template.model';
import { MacroSet, StepsFromHabit, TargetSource, WeekNeed } from '../../features/diet-templates/models/diet-suggestion.model';

// Fases de dieta de un cliente (train-fit-back/components/dietPhases). Una
// fase es UN documento: el plan pautado desde una fecha, con su contenido
// versionado dentro (la primera versión empieza con la fase y cada semana
// preparada añade otra desde su lunes). Acaba cuando empieza la siguiente.
import { PhaseState } from './phase-state';

export type DietPhaseTarget = MacroSet & { kcal: number; source: TargetSource };

export interface DietPhaseContentSummary {
  _id: string;
  startDate: string;
  menusCount: number;
}

export interface DietPhase {
  _id: string;
  clientId: string;
  // null si la cuenta del profesional ya no existe.
  trainerId: string | null;
  name: string;
  // De qué plantilla salió (informativo); null si se construyó para el cliente.
  sourceTemplateId: string | null;
  startDate: string;
  // Fin REAL: null mientras sigue corriendo.
  endDate: string | null;
  // Solo en listas y en la vigente (el backend conoce la cadena entera).
  state?: PhaseState;
  target: DietPhaseTarget | null;
  proteinPerKg: number | null;
  fatPerKg: number | null;
  createdAt: string;
  contents: DietPhaseContentSummary[];
}

// GET .../diet-phases/current: la que rige hoy, con los días de ella en los
// que el cliente nunca eligió menú.
export interface CurrentDietPhase extends DietPhase {
  stuckDaysCount: number;
}

// Con los menús de cada versión: para abrir el constructor.
export interface DietPhaseContent {
  _id: string;
  startDate: string;
  menus: DietTemplateMenuPayload[];
}

export interface DietPhaseFull extends Omit<DietPhase, 'contents'> {
  contents: DietPhaseContent[];
}

// Empezar una fase: con una plantilla de la biblioteca (`templateId`) o con
// menús construidos para el cliente (`name` + `menus`).
export interface CreateDietPhaseRequest {
  startDate: string;
  templateId?: string;
  name?: string;
  menus?: DietTemplateMenuPayload[];
  target?: DietPhaseTarget | null;
  proteinPerKg?: number | null;
  fatPerKg?: number | null;
  reason?: string;
}

// Con qué empieza una fase elegida en el cajón "Empezar fase": su nombre, el
// objetivo con el que se pauta y los g/kg tocados (ausentes = fórmula por
// defecto). Viaja al constructor cuando se empieza "de cero".
export interface PhaseStartSettings {
  name: string;
  target: DietPhaseTarget | null;
  proteinPerKg?: number | null;
  fatPerKg?: number | null;
}

export interface UpdateDietPhaseRequest {
  name?: string;
  startDate?: string;
  endDate?: string | null;
}

// --- Semanas (docs/plan-semanas.md) ---

// Desvío de un día de la semana actual: lo que comió fuera de pauta y las
// comidas pautadas que no marcó. hasPlan false = ese día no tenía nada
// pautado (p. ej. sin menú elegido).
export interface DailyDeviation {
  date: string;
  hasPlan: boolean;
  unplanned: { meal: string; name: string; quantity: number }[];
  unchecked: string[];
}

export interface NextWeekSuggestion {
  hasData: boolean;
  deltaKcal: number;
  nextKcal: number;
  actualWeeklyRateKg: number | null;
  expectedWeeklyRateKg: number;
  flag: string | null;
  reason: string;
  weightStartKg: number | null;
  weightEndKg: number | null;
  // Con qué semana anterior se comparó el peso (la última que tenía peso).
  comparedToWeek: number | null;
  adherencePct: number | null;
  adherenceDays: number;
  deviations: DailyDeviation[];
}

// Una versión del contenido resumida. `profile` = media diaria de
// kcal/macros: no hay objetivo guardado aparte.
export interface PhaseContentProfile {
  id: string;
  startDate: string;
  menusCount: number;
  profile: MacroSet & { kcal: number };
}

export interface WeekWindow {
  number: number;
  start: string;
  end: string;
}

export interface PhaseWeeksResponse {
  phaseId: string;
  phaseName: string;
  phaseStart: string;
  phaseEnd: string | null;
  target: DietPhaseTarget | null;
  weeks: WeekWindow[];
  current: (WeekWindow & { content: PhaseContentProfile }) | null;
  // null cuando la fase termina dentro de la semana en curso: no hay una
  // semana siguiente que preparar.
  next:
    | (WeekWindow & {
        // Ya preparada por el profesional, o null.
        content: PhaseContentProfile | null;
        // Lo que heredará si nadie toca nada (null si ya está preparada).
        inherits: PhaseContentProfile | null;
        suggestion: NextWeekSuggestion | null;
        // Necesidad con los datos de HOY: referencia, no cambia la sugerencia.
        needNow: WeekNeed | null;
      })
    | null;
  past: (WeekWindow & { profile: MacroSet & { kcal: number }; contentId: string })[];
}

export interface WeekCheckin {
  _id: string;
  values: Record<string, unknown>;
  respondedAt: string;
  updatedAt?: string;
}

export interface WeekNeedResponse {
  weekNumber: number;
  start: string;
  end: string;
  isCurrent: boolean;
  // snapshot = guardado al empezar la fase; computed = al vuelo.
  source: 'snapshot' | 'computed';
  need: WeekNeed | null;
  // Los check-ins de esa semana, del más reciente al más antiguo.
  checkins: WeekCheckin[];
  plannedKcal: number | null;
  target: DietPhaseTarget | null;
}

// Contenido vigente escalado a unas kcal: para abrir el constructor
// precargado al preparar la semana siguiente.
export interface ScaledNextWeek {
  weekNumber: number;
  start: string;
  end: string;
  baseKcal: number;
  targetKcal: number;
  factor: number;
  currentWeekNumber: number | null;
  menus: unknown[];
}

// Fases y semanas de un rango de fechas (calendario y slider).
export interface DietTimeline {
  phases: { id: string; name: string; start: string; end: string | null; colorIndex: number }[];
  weeks: { phaseId: string; number: number; start: string; end: string; colorIndex: number }[];
}

// --- Historial de nutrición (nutrition-history.js en el backend) ---

export type NutritionHistoryEventType = 'phase_started' | 'phase_ended' | 'week';
// met/missed = semana acabada con adherencia >= / < 75 %; no_data =
// acabada sin ningún día registrado; running = todavía en marcha.
export type NutritionWeekStatus = 'running' | 'met' | 'missed' | 'no_data';

interface NutritionHistoryEventBase {
  type: NutritionHistoryEventType;
  // "YYYY-MM-DD": la fecha por la que se ordena el feed.
  date: string;
  phaseId: string;
  phaseName: string;
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
  contentId: string;
  profile: { kcal: number; protein: number; carbs: number; fat: number };
  kcalDelta: number | null;
  adherencePct: number | null;
  adherenceDays: number;
  periodDays: number;
  status: NutritionWeekStatus;
  // Fechas de la semana en las que el cliente se saltó el plan.
  skippedDays: string[];
}

export type NutritionHistoryEvent = NutritionPhaseStartedEvent | NutritionPhaseEndedEvent | NutritionWeekEvent;

export interface NutritionHistoryResponse {
  events: NutritionHistoryEvent[];
}

export type { StepsFromHabit };
