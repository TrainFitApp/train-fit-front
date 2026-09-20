// Sugerencias de dieta — tipos de los endpoints del cajón lateral
// (train-fit-back/components/dietTemplates/diet-suggestion-controller.js) y
// de las revisiones de una fase (plan-assignment-controller.js).

export type DietaryFlag = 'vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree';
export type TargetSource = 'calculated' | 'manual';

export interface MacroSet {
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionTarget extends MacroSet {
  kcal: number;
  // calculated = el valor de referencia que sale de los datos del cliente;
  // manual = el entrenador tecleó encima sus propias kcal/macros.
  source: TargetSource;
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
  // El de referencia, siempre — aunque el entrenador haya tecleado encima:
  // es lo que permite volver al calculado de un vistazo.
  calculated: MacroSet & { kcal: number };
  // Qué pasos entraron en el cálculo (null = del rango del perfil).
  stepsFromHabit: StepsFromHabit | null;
  // Inputs y cuenta paso a paso, para el bloque "cómo se ha calculado".
  needBreakdown: { inputs: RevisionNeed['inputs']; breakdown: RevisionNeed['breakdown'] };
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
  // kcal/macros tecleados por el entrenador. Sin esto, el backend usa el
  // valor calculado del cliente.
  target?: MacroSet & { kcal: number };
  dietaryFlags?: DietaryFlag[];
  // Origen de las dietas a incluir. Sin este campo = las tres.
  sources?: DietSource[];
  // Override manual del reparto de macros (g por kg de peso) — sin esto, el
  // backend usa su fórmula por defecto (ver nutrition-target.js#proteinGrams/
  // fatGrams). Los carbohidratos siempre son el resto de las kcal objetivo.
  proteinPerKg?: number;
  fatPerKg?: number;
}

// Bloque que viaja con apply / createDirect cuando se EMPIEZA una fase: su
// nombre y con qué números se pauta. Ya no hay enfoque ni ajuste de kcal ni
// ritmo por revisión — lo que importa es el objetivo con el que se pauta.
export interface PhasePayload {
  name: string;
  target: (MacroSet & { kcal: number; source: TargetSource }) | null;
  proteinPerKg?: number | null;
  fatPerKg?: number | null;
}

// --- Revisiones (docs/plan-revisiones.md) ---

// Desvío de un día de la revisión actual: lo que comió fuera de pauta y las
// comidas pautadas que no marcó. hasPlan false = ese día no tenía nada
// pautado (p. ej. `choice` sin menú elegido).
export interface DailyDeviation {
  date: string;
  hasPlan: boolean;
  unplanned: { meal: string; name: string; quantity: number }[];
  unchecked: string[];
}

export interface NextRevisionSuggestion {
  hasData: boolean;
  deltaKcal: number;
  nextKcal: number;
  actualWeeklyRateKg: number | null;
  expectedWeeklyRateKg: number;
  flag: string | null;
  reason: string;
  weightStartKg: number | null;
  weightEndKg: number | null;
  // Con qué revisión anterior se comparó el peso (la última que tenía peso).
  comparedToRevision: number | null;
  adherencePct: number | null;
  adherenceDays: number;
  deviations: DailyDeviation[];
}

// Un contenido persistido (doc DietTemplate) resumido. `profile` = media
// diaria de kcal/macros — no hay objetivo guardado aparte.
export interface RevisionOverrideSummary {
  id: string;
  startDate: string;
  menusCount: number;
  profile: MacroSet & { kcal: number };
}

// Pasos que entraron en el cálculo: los que pauta el HÁBITO de pasos del
// cliente y los días que lo marcó dentro de la revisión mirada
// (docs/plan-revisiones.md §12). null = sin hábito, o marcado menos de la
// mitad de los días: manda el rango de su perfil.
export interface StepsFromHabit {
  key: string;
  label: string;
  target: number;
  targetMax: number | null;
  completedDays: number;
  windowDays: number;
}

// Cómo se calculó la necesidad del cliente: lo que entró y la cuenta. Es la
// misma forma para el snapshot de la fase (persistido) y para las revisiones
// siguientes (al vuelo). `missing` con contenido = no se pudo calcular.
export interface RevisionNeed {
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
    stepsRangeKey: string | null;
    // profile = rango del perfil del cliente; habit = el rango de su hábito
    // de pasos, cumplido los días suficientes.
    stepsFrom: 'profile' | 'habit';
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
  stepsFromHabit?: StepsFromHabit | null;
}

export interface RevisionNeedResponse {
  revisionNumber: number;
  start: string;
  end: string | null;
  isCurrent: boolean;
  // snapshot = guardado al empezar la fase; computed = al vuelo.
  source: 'snapshot' | 'computed' | null;
  need: RevisionNeed | null;
  checkin: { values: Record<string, unknown>; respondedAt: string; updatedAt: string } | null;
  plannedKcal: number | null;
  phaseTarget: (MacroSet & { kcal: number; source: TargetSource }) | null;
}

export interface RevisionWindow {
  number: number;
  start: string;
  // null solo en la última cuando la fase sigue abierta y no hay otro
  // check-in programado por delante.
  end: string | null;
}

export interface PhaseRevisionsResponse {
  phaseId: string;
  phaseName: string | null;
  phaseStart: string;
  phaseEnd: string | null;
  phaseTarget: (MacroSet & { kcal: number; source: TargetSource }) | null;
  // false = el cliente no tiene ningún check-in programado, así que la fase
  // es una sola ventana abierta. La ficha ofrece crearlo.
  hasSchedules: boolean;
  revisions: RevisionWindow[];
  current: (RevisionWindow & { override: RevisionOverrideSummary }) | null;
  // null mientras no se sepa cuándo empieza la siguiente (sin check-in
  // programado por delante).
  next:
    | (RevisionWindow & {
        // Ya preparada por el entrenador, o null.
        override: RevisionOverrideSummary | null;
        // Lo que heredará si nadie toca nada (null si hay override).
        inherits: RevisionOverrideSummary | null;
        suggestion: NextRevisionSuggestion | null;
        // Necesidad con los datos de HOY — referencia, no cambia la sugerencia.
        needNow: RevisionNeed | null;
      })
    | null;
  past: (RevisionWindow & { profile: MacroSet & { kcal: number }; overrideId: string })[];
}

// Contenido vigente escalado a unas kcal — para abrir el builder precargado
// al preparar la revisión siguiente.
export interface ScaledNextRevision {
  revisionNumber: number;
  start: string;
  end: string | null;
  baseKcal: number;
  targetKcal: number;
  factor: number;
  currentRevisionNumber: number | null;
  content: {
    menus: unknown[];
  };
}

export interface PrepareNextRevisionRequest {
  menus: unknown[];
}
