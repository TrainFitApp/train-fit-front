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
  // Auditoría 2026-09 — distinto de "sin_plan": hay una fase de entrenamiento
  // vigente y con proyección, pero en la ventana medida todos los días
  // proyectados son de descanso planificado (típico al arrancar una fase
  // cuyo primer día de rutina es de descanso). Ver adherence-service.js#trainingDimension.
  | 'sin_sesiones_en_ventana'
  // Auditoría 2026-09 — nutrición: NO hay ningún plan de dieta activo. Antes
  // este caso y "hay plan pero <3 días con datos" decían los dos "sin_datos"
  // — mismo tipo de bug que sin_plan/sin_sesiones_en_ventana de arriba. Ver
  // adherence-service.js#nutritionDimension.
  | 'sin_plan_nutricion'
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
  nextCheckinDate: string | null;
  activePlan: { _id: string; name: string; startDate: string; endDate: string | null } | null;
  routine: { _id: string; name: string } | null;
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

// Tarea 4 (2026-09) — qué comparar en la gráfica de Entrenamiento. Un
// selector, no varios activos a la vez (a diferencia de Nutrición): las
// métricas no comparten escala (sesiones/series son conteos, volumen son
// kg, grupos musculares es un reparto) y no hay un "100% pautado" contra el
// que normalizarlas todas en un único eje.
// 'exercise' (2026-09) — "ejercicios por micros": el mismo ejercicio,
// microciclo a microciclo (peso máximo, con volumen/series de contexto),
// distinto de los 4 agregados de arriba que mezclan todos los ejercicios.
// 'readiness' (2026-09) — el pulso de readiness/esfuerzo (1-5) que el
// cliente deja antes/después de cada sesión, promediado por microciclo.
// Aparte de historial (ver client-detail.page.html, sección "SESIONES
// HECHAS"): comparar bloque a bloque es lo que responde "¿está llegando
// cansado a los bloques duros?", que un badge suelto por sesión no dice.
// 'adherence' (2026-09) — % de series hechas frente a las pautadas. Solo
// tiene un denominador honesto a nivel SESIÓN (ver SessionAdherence): la
// sesión ya existe con sus series reales desde que se le asignó al cliente,
// terminarla no exige tenerlas todas. A nivel microciclo es la suma de esas
// sesiones (BlockAdherence), no una media de porcentajes.
export type TrainingComparisonMetric =
  | 'sessions'
  | 'sets'
  | 'volume'
  | 'muscleGroups'
  | 'exercise'
  | 'readiness'
  | 'adherence';

export const TRAINING_COMPARISON_METRIC_LABELS: Record<TrainingComparisonMetric, string> = {
  sessions: 'Sesiones registradas',
  sets: 'Series por sesión',
  volume: 'Volumen por sesión',
  muscleGroups: 'Series por grupo muscular',
  exercise: 'Progreso de un ejercicio',
  readiness: 'Readiness y esfuerzo percibido',
  adherence: 'Adherencia a lo pautado',
};

// 2026-09 — granularidad del comparador: por microciclo (promedia/agrega,
// como hasta ahora) o por sesión individual (una sesión suelta mala no se
// esconde detrás de la media del bloque). 'sessions' no tiene versión por
// sesión con sentido (es un conteo DE sesiones), así que ese metric ignora
// la granularidad y siempre sale por microciclo.
export type TrainingGranularity = 'block' | 'session';

// Comparar por ejercicio — mismo agrupado por microciclo que TrainingBlock,
// pero filtrado a UN ejercicio. maxWeight es la cifra principal (mismo
// criterio que PersonalRecord: "así lee un récord un entrenador"); volume/
// sets quedan de contexto en el tooltip de la gráfica, no como líneas
// propias — misma razón que TrainingComparisonMetric es un selector y no
// varias métricas activas a la vez.
export interface BlockExerciseProgress {
  splitId: string;
  name: string;
  start: string;
  end: string;
  maxWeight: number;
  volume: number;
  sets: number;
  totalReps?: number;
  bestSet?: { weight: number; reps: number; rir: number[] } | null;
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

// 2026-09 — readiness/esfuerzo promediado por microciclo. El pulso es
// opcional, así que avgReadinessPre/avgPerceivedEffortPost salen null (no
// 0) cuando ninguna sesión del bloque lo trajo — mismo criterio que
// TrainingWeek.volume. sessionsWithPulse dice sobre cuántas sesiones se
// calculó, para no leer un "4.8" como representativo de todo el bloque
// cuando solo 1 de 12 sesiones lo dejó.
export interface BlockReadiness {
  splitId: string;
  name: string;
  start: string;
  avgReadinessPre: number | null;
  avgPerceivedEffortPost: number | null;
  sessionsWithPulse: number;
}

export interface BlockComparisonSide {
  name: string;
  start: string;
  end: string;
  volumePerSession: number;
  sessions: number;
}

// Tarea 4 (2026-09) — carga por grupo muscular, por microciclo. `group` es
// el string crudo del catálogo (Exercise.muscleGroups1/2), sin diccionario
// de traducción propio en el frontend: mismo criterio que `splitName` en
// TrainingBlock, el backend no inventa una etiqueta distinta de la que ya
// usa el resto de la app para nombrar grupos musculares.
export interface BlockMuscleGroup {
  splitId: string;
  name: string;
  start: string;
  end: string;
  muscleGroups: { group: string; volume: number; sets?: number }[];
}

// 2026-09 — granularidad "Por sesión": los mismos agregados que arriba pero
// sin colapsar por microciclo, una fila por fecha con sesión. splitId/
// splitName van de contexto (para pintar "Semana 2" junto a la fecha en la
// etiqueta), no para agrupar.
export interface SessionTraining {
  date: string;
  splitId: string | null;
  splitName: string | null;
  volume: number;
  sets: number;
}

export interface SessionMuscleGroup {
  date: string;
  splitId: string | null;
  splitName: string | null;
  muscleGroups: { group: string; volume: number }[];
}

export interface SessionReadiness {
  date: string;
  splitId: string | null;
  splitName: string | null;
  readinessPre: number | null;
  perceivedEffortPost: number | null;
}

export interface SessionExerciseProgress {
  date: string;
  splitId: string | null;
  splitName: string | null;
  maxWeight: number;
  volume: number;
  sets: number;
}

// Adherencia (2026-09) — series hechas frente a las pautadas. totalSets/
// donedSets vienen para que el frontend pueda mostrar "18 de 24 series" y
// no solo el %.
export interface SessionAdherence {
  date: string;
  splitId: string | null;
  splitName: string | null;
  totalSets: number;
  donedSets: number;
  adherence: number | null;
}

export interface BlockAdherence {
  splitId: string;
  name: string;
  start: string;
  adherence: number | null;
  sessions: number;
}

export interface ClientTrainingProgress {
  period: { from: string; to: string };
  blocks: TrainingBlock[];
  blockComparison: {
    current: BlockComparisonSide;
    previous: BlockComparisonSide;
    absolute: number;
    percentage: number;
  } | null;
  blockReadiness: BlockReadiness[];
  blockMuscleGroups: BlockMuscleGroup[];
  blockAdherence: BlockAdherence[];
  sessionTraining: SessionTraining[];
  sessionMuscleGroups: SessionMuscleGroup[];
  sessionReadiness: SessionReadiness[];
  sessionAdherence: SessionAdherence[];
  // Comparar por ejercicio — nombres con carga real disponibles en el
  // periodo (alimenta el selector). blockExerciseByName/sessionExerciseByName
  // solo llegan cuando se pidió al menos un ejercicio (query `exercises`,
  // ver client-detail-api.service.ts#getTrainingBlocks) — varios a la vez
  // (2026-09 bis), tope de 5 (MAX_COMPARED_EXERCISES en el backend): más
  // líneas en la misma gráfica deja de leerse.
  exerciseNames: string[];
  blockExerciseByName?: Record<string, BlockExerciseProgress[]>;
  sessionExerciseByName?: Record<string, SessionExerciseProgress[]>;
  // "Elegir el workout a ver" (2026-09) — nombres de entrenamiento (p.ej.
  // "Día de pierna") con sesión en el rango. A diferencia de exerciseNames,
  // este filtro no es una métrica aparte: cuando se pide `workout`, TODOS
  // los agregados de arriba (blocks, sessionTraining, etc.) salen ya
  // recortados a ese workout — el backend filtra antes de calcular nada.
  workoutNames: string[];
  totalSets: number;
  // Presentes solo en modo `weeks` (Resumen); ausentes en modo `from`/`to`
  // (comparación por microciclo de Entrenamiento) — ver
  // client-progress-controller.js#getTrainingProgress.
  weeks?: number;
  weekly?: TrainingWeek[];
  volumeComparison?: {
    current: number;
    previous: number;
    absolute: number;
    percentage: number;
  } | null;
  personalRecords?: PersonalRecord[];
  loadEvolution?: LoadEvolutionExercise[];
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
