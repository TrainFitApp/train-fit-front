import { CoachAlert } from 'src/app/features/dashboard/models/coach-alert.model';

// Fase 2 Coach Pro — espejo de components/clientProgress/ (backend).

// --- Adherencia multidimensional ---
// Una dimensión "no aplicable" NO es un 0%: es que ese cliente no tiene ese
// ámbito (sin rutina, sin tareas, sin check-in configurado) o todavía no hay
// datos suficientes. La media global solo promedia las aplicables.
export type AdherenceDimensionKey = 'nutrition' | 'training' | 'habits' | 'checkins';

export type AdherenceUnavailableReason =
  | 'sin_datos'
  | 'sin_plan'
  | 'sin_tareas'
  | 'sin_cadencia'
  | 'periodo_corto';

// Un hábito dentro de la dimensión Hábitos. Cada uno se mide contra SUS
// días activos (desde que se creó), no contra una ventana fija igual para
// todos: un hábito puesto anteayer no arrastra 26 días de incumplimiento.
export interface AdherenceHabit {
  id: string;
  label: string;
  target: number | null;
  unit: string;
  percentage: number;
  completions: number;
  activeDays: number;
  detail: string;
}

export interface AdherenceDimension {
  applicable: boolean;
  reason?: AdherenceUnavailableReason;
  percentage?: number;
  // Texto ya compuesto por el backend ("20 de 28 días con plan") — el
  // frontend no recompone el denominador, que es distinto en cada dimensión.
  detail?: string;
  // Solo en Hábitos: el porcentaje de la dimensión es la media de estos.
  breakdown?: AdherenceHabit[];
}

export interface AdherenceBreakdown {
  overall: number | null;
  weakest: AdherenceDimensionKey | null;
  applicableCount: number;
  dimensions: Record<AdherenceDimensionKey, AdherenceDimension>;
}

// --- Serie semanal ---
export interface WeeklyWeight {
  average: number;
  last: number;
  count: number;
}

export interface ProgressWeek {
  start: string;
  end: string;
  weight: WeeklyWeight | null;
  // Clave = campo de Anthropometry (waist, chest…). Último valor de la semana.
  measurements: Record<string, number> | null;
  // Clave = campo del catálogo de check-in (stress_level, sleep_hours…).
  wellbeing: Record<string, number> | null;
  nutritionAdherence: number | null;
  // Sesiones absolutas, no porcentaje: convertirlo exigía saber cuántas
  // tocaban por semana, y `Split` no guarda duración.
  sessions: number;
  habitsAdherence: number | null;
  checkins: number;
}

export interface ProgressDelta {
  current: number;
  previous: number;
  absolute: number;
  percentage: number | null;
  label?: string;
}

export interface ProgressComparison {
  period: {
    current: { start: string; end: string };
    previous: { start: string; end: string };
  };
  weightAverage: ProgressDelta | null;
  nutritionAdherence: ProgressDelta | null;
  sessions: ProgressDelta | null;
  habitsAdherence: ProgressDelta | null;
  measurements: Record<string, ProgressDelta> | null;
  wellbeing: Record<string, ProgressDelta> | null;
}

export interface WeightTrend {
  fromWeek: { start: string; average: number };
  toWeek: { start: string; average: number };
  absolute: number;
  percentage: number | null;
  weeksCovered: number;
}

export interface ClientProgress {
  weeks: number;
  period: { from: string; to: string };
  series: ProgressWeek[];
  comparison: ProgressComparison | null;
  weightTrend: WeightTrend | null;
}

// --- Resumen ---
export interface ClientSummary {
  period: { from: string; to: string; days: number };
  alerts: CoachAlert[];
  adherence: AdherenceBreakdown;
  weightTrend: WeightTrend | null;
  latestWeight: number | null;
  latestWeightDate: string | null;
  lastCheckinAt: string | null;
  checkinCadence: string | null;
  activePlan: { _id: string; startDate: string; endDate: string | null } | null;
  goal: {
    _id: string;
    name: string;
    kcalTotal: number;
    proteinsGTotal: number;
    carbohydratesGTotal: number;
    fatGTotal: number;
  } | null;
  routine: { _id: string; name: string } | null;
}

// Movimiento 3 Coach Pro — lo único que le falta a la calculadora corporal
// que no esté ya cargado en la pestaña de Medidas. Endpoint propio y barato
// (GET /trainer/clients/:id/body-profile): colgarlo de /summary obligaría a
// Medidas a pagar las ~9 consultas que sirven a Resumen para leer tres
// campos. El backend no manda ningún resultado calculado: las fórmulas son
// puras y corren aquí (core/utils/body-metrics.util.ts).
// Movimiento 5 Coach Pro — reparto del día en INTERCAMBIOS por comida.
// Convive con los gramos, no los sustituye: son dos formas de pautar lo
// mismo y cada entrenador usa la suya. Array vacío = objetivo pautado solo
// en gramos, que es lo que hacían todos hasta ahora.
export interface GoalMealExchange {
  groupId: string;
  // Copiado al pautar: si el grupo se renombra o se borra, la pauta que el
  // cliente ya tiene sigue siendo legible.
  groupName: string;
  // Decimal a propósito: media ración es una pauta real.
  count: number;
}

export interface GoalMeal {
  // Nombre libre: cada entrenador reparte el día a su manera y un enum de
  // cinco comidas dejaría fuera la mitad.
  name: string;
  exchanges: GoalMealExchange[];
}

export interface ClientBodyProfile {
  heightCm: number | null;
  // 0 = femenino, 1 = masculino (SEX_TYPES).
  sex: number | null;
  birth: string | null;
}

export const PROGRESS_WEEK_OPTIONS: readonly number[] = [4, 8, 12];

// --- Entrenamiento (Fase 6) ---
// Espejo de components/clientProgress/training-service.js. Endpoint aparte
// de /progress porque su consulta devuelve una fila por serie completada:
// solo se pide cuando el coach mira entrenamiento, no al abrir la ficha.
export interface TrainingWeek {
  start: string;
  end: string;
  // null (no 0) en una semana sin entrenar: 0 kg se leería como "entrenó y
  // no levantó nada".
  volume: number | null;
  sets: number;
  sessions: number;
}

export interface PersonalRecord {
  exerciseName: string;
  weight: number;
  reps: number;
  date: string;
}

export interface LoadEvolutionExercise {
  exerciseName: string;
  weeks: { start: string; maxWeight: number | null }[];
}

// Movimiento 3 Coach Pro — el mismo trabajo agrupado por MICROCICLO.
// Un microciclo no dura siete días (dura lo que el entrenador decida), así
// que las semanas naturales lo parten por la mitad: comparar la semana 3
// contra la 2 puede estar comparando el final de un bloque contra el
// principio del siguiente. El bloque es la unidad en la que se decide.
export interface TrainingBlock {
  splitId: string;
  name: string;
  start: string;
  end: string;
  volume: number;
  sets: number;
  sessions: number;
  // Volumen por sesión: dos bloques de distinta duración no se comparan por
  // el total, que el más largo gana siempre por ser más largo.
  volumePerSession: number | null;
}

export interface BlockComparisonSide {
  name: string;
  start: string;
  end: string;
  volumePerSession: number;
  sessions: number;
}

export interface ClientTrainingProgress {
  weeks: number;
  period: { from: string; to: string };
  weekly: TrainingWeek[];
  volumeComparison: {
    current: number;
    previous: number;
    absolute: number;
    percentage: number;
  } | null;
  blocks: TrainingBlock[];
  blockComparison: {
    current: BlockComparisonSide;
    previous: BlockComparisonSide;
    absolute: number;
    percentage: number;
  } | null;
  personalRecords: PersonalRecord[];
  loadEvolution: LoadEvolutionExercise[];
  totalSets: number;
}

// --- Historial de cambios (Fase 4) ---
// Espejo de components/planChanges/. Responde "¿por qué está hoy en 2100
// kcal?", que ni NutritionalGoal ni PlanAssignment guardan.
export type PlanChangeEntity =
  | 'nutritional_goal'
  | 'diet_plan'
  | 'routine'
  | 'checkin_config'
  | 'protocol';

export interface PlanChangeField {
  field: string;
  // Etiqueta ya resuelta por el backend ("Calorías") — el frontend no
  // mantiene un diccionario paralelo de nombres de campo.
  label: string;
  previousValue: string | number | null;
  newValue: string | number | null;
}

export interface PlanChange {
  _id: string;
  entity: PlanChangeEntity;
  entityId: string | null;
  entityName: string;
  action: 'created' | 'updated' | 'assigned' | 'replaced';
  changes: PlanChangeField[];
  reason: string;
  createdAt: string;
}
