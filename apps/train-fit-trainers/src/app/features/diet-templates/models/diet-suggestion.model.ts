// Sugerencias de dieta — tipos de los endpoints del cajón lateral
// (train-fit-back/components/dietTemplates/diet-suggestion-controller.js y
// plan-assignment-controller.js#getNextCycleSuggestion / advanceCycle).

export type DietaryFlag = 'vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree';
export type PhaseFocus = 'cut' | 'maintain' | 'bulk';

export interface MacroSet {
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionTarget extends MacroSet {
  kcal: number;
  objetiveKcalDelta: number;
}

export interface MacroProfile extends MacroSet {
  kcal: number;
  basedOnDays: number;
}

export interface RankedTemplate {
  _id: string;
  name: string;
  verified: boolean;
  ownerClientId: string | null;
  mode: 'sequential' | 'recurring' | 'choice';
  suitableFor: DietaryFlag[];
  effectiveSuitableFor: DietaryFlag[];
  profile: MacroProfile;
  basedOnDays: number;
  distance: number;
  deltas: { kcal: number; protein: number; carbs: number; fat: number };
  rank: number;
  // Restricciones del cliente que esta dieta NO cumple. Vacío = las cumple
  // todas. No la descarta: sale igual en la lista, detrás de las que sí
  // cumplen y con un aviso rojo — cambiar los alimentos que fallan suele ser
  // más barato que descartar la que mejor cuadra de macros.
  missingFlags: DietaryFlag[];
}

export interface DietSuggestionResponse {
  target: NutritionTarget;
  // `from: 'anthropometry'` trae `date`; `from: 'signup'` no (viene del
  // registro del cliente, sin fecha).
  weightSource: { weightKg: number; from: 'anthropometry' | 'signup'; date?: string } | null;
  // Peso sobre el que se aplican los g/kg (el ajustado si IMC ≥ 30).
  macroWeightKg?: number | null;
  // Objetivo del cliente al registrarse (delta kcal con signo). El cajón lo
  // usa para arrancar en el focus correcto.
  clientObjetive?: number | null;
  // Restricciones dietéticas del cliente (del intake) — el cajón las pre-marca.
  clientDietaryFlags?: DietaryFlag[];
  requiredFlags: DietaryFlag[];
  ranked: RankedTemplate[];
}

// 422 cuando faltan datos biométricos del cliente.
export interface MissingBiometricsError {
  code: 'MISSING_BIOMETRICS';
  missing: string[];
}

export type DietSource = 'general' | 'client' | 'verified';

export interface DietSuggestionRequest {
  objetiveKcalDelta: number;
  dietaryFlags?: DietaryFlag[];
  // Origen de las dietas a incluir. Sin este campo = las tres.
  sources?: DietSource[];
  // Override manual del reparto de macros (g por kg de peso) — sin esto, el
  // backend usa su fórmula por defecto según objetiveKcalDelta y sexo (ver
  // nutrition-target.js#proteinGrams/fatGrams). Los carbohidratos siempre
  // son el resto de las kcal objetivo.
  proteinPerKg?: number;
  fatPerKg?: number;
}

// Bloque que viaja con apply / createDirect cuando se EMPIEZA una fase.
export interface PhasePayload {
  name: string;
  focus: PhaseFocus | null;
  targetKcalDelta: number;
  ratePerCycle: number;
}

export interface CycleTargetPayload {
  kcal: number;
  macros: MacroSet;
}

// --- Ciclos por contenido (docs/plan-ciclos-por-contenido.md) ---

// Desvío de un día del ciclo actual: lo que comió fuera de pauta y las
// comidas pautadas que no marcó. hasPlan false = ese día no tenía nada
// pautado (p. ej. `choice` sin menú elegido).
export interface DailyDeviation {
  date: string;
  hasPlan: boolean;
  unplanned: { meal: string; name: string; quantity: number }[];
  unchecked: string[];
}

export interface NextCycleSuggestion {
  hasData: boolean;
  deltaKcal: number;
  nextCycleKcal: number;
  actualWeeklyRateKg: number | null;
  flag: string | null;
  reason: string;
  weightStartKg: number | null;
  weightEndKg: number | null;
  // Con qué ciclo anterior se comparó el peso (el último que tenía peso).
  comparedToCycle: number | null;
  adherencePct: number | null;
  adherenceDays: number;
  deviations: DailyDeviation[];
}

// Un ciclo persistido (doc DietTemplate) resumido. `profile` = media diaria
// de kcal/macros de su contenido — no hay objetivo guardado aparte.
export interface CycleOverrideSummary {
  id: string;
  startDate: string;
  mode: 'sequential' | 'recurring' | 'choice' | null;
  cycleDays: number;
  daysCount: number;
  choiceCycleDays: number | null;
  profile: MacroSet & { kcal: number };
}

// --- Info de cálculo de fase (docs/plan-info-calculo-fase.md) ---

// Cómo se calculó la necesidad del cliente: lo que entró y la cuenta. Es la
// misma forma para el snapshot del C1 (persistido) y para los ciclos 2+
// (calculados al vuelo). `missing` con contenido = no se pudo calcular.
export interface CycleNeed {
  computedAt: string;
  missing?: string[] | null;
  inputs: {
    weightKg: number | null;
    weightFrom: 'anthropometry' | 'signup' | null;
    weightDate: string | null;
    heightCm: number | null;
    age: number | null;
    sex: 0 | 1 | null;
    activity: number | null;
    stepsValue: number | null;
    stepsLabel: string | null;
    // profile = rango declarado en el perfil; logged = media diaria que el
    // cliente declaró en el check-in del ciclo anterior.
    stepsFrom: 'profile' | 'logged';
    stepsAvg: number | null;
    stepsFallbackReason?: 'profile_unresolved';
    trainingValue: number | null;
    // exact false = el factor del perfil no casa con ninguna columna de la
    // tabla (dato viejo): se tomó la más cercana.
    trainingDays: { id: number; key: string; label: string; exact: boolean } | null;
    objetiveKcalDelta: number;
    proteinPerKg: number | null;
    fatPerKg: number | null;
  };
  breakdown: {
    weightKg: number;
    adjustedWeightKg: number | null;
    bmr: number;
    usesActivity: boolean;
    activityFactor: number | null;
    trainingFactor: number;
    factor: number;
    expenditure: number;
    delta: number;
    proteinPerKg: number;
    fatPerKg: number;
  } | null;
  target: (MacroSet & { kcal: number }) | null;
}

export interface CycleNeedResponse {
  cycleNumber: number;
  start: string;
  end: string;
  isCurrent: boolean;
  // snapshot = guardado al empezar la fase (C1); computed = al vuelo (C2+);
  // null = fase anterior a guardar el cálculo.
  source: 'snapshot' | 'computed' | null;
  need: CycleNeed | null;
  stepsDone: { avg: number | null; respondedAt: string | null };
  plannedKcal: number | null;
}

export interface CycleWindow {
  number: number;
  start: string;
  end: string;
}

export interface PhaseCyclesResponse {
  phaseId: string;
  phaseName: string | null;
  phaseFocus: PhaseFocus | null;
  phaseStart: string;
  // Todas las ventanas desde C1 hasta el siguiente (incluido), para numerar
  // el calendario.
  windows: CycleWindow[];
  current: CycleWindow & { override: CycleOverrideSummary };
  next: CycleWindow & {
    len: number;
    // Ya preparado por el entrenador, o null.
    override: CycleOverrideSummary | null;
    // Lo que heredará si nadie toca nada (null si hay override).
    inherits: CycleOverrideSummary | null;
    suggestion: NextCycleSuggestion;
    // Necesidad con los datos de HOY (último peso, pasos del ciclo en
    // curso) — referencia para el modal; no cambia la sugerencia de kcal.
    needNow: CycleNeed | null;
  };
  past: (CycleWindow & { profile: MacroSet & { kcal: number }; overrideId: string })[];
}

// Contenido del ciclo vigente escalado a unas kcal — para abrir el builder
// precargado al preparar el siguiente.
export interface ScaledNextCycle {
  cycleNumber: number;
  start: string;
  end: string;
  baseKcal: number;
  targetKcal: number;
  factor: number;
  currentCycleNumber: number;
  content: {
    mode: 'sequential' | 'recurring' | 'choice';
    days: unknown[];
    dayPatterns: unknown[];
    choiceCycleDays: number | null;
  };
}

export interface PrepareNextCycleRequest {
  mode: 'sequential' | 'recurring' | 'choice';
  days: unknown[];
  dayPatterns: unknown[];
  choiceCycleDays?: number | null;
}
