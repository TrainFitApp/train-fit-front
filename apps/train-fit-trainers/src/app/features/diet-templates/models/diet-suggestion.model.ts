// Sugerencias de dieta: tipos del cajón lateral "Empezar fase"
// (train-fit-back/components/dietTemplates/diet-suggestion-service.js) y de la
// necesidad calculada del cliente, que comparten las semanas de una fase
// (shared/models/diet-phase.model.ts).

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
  // El objetivo nutricional que el cliente tiene ahora (null = ninguno): el
  // panel deja alternar entre él y el calculado. `source` es el suyo (manual =
  // alguien lo fijó a mano), no el de la fase.
  currentGoal: (MacroSet & { kcal: number; source: TargetSource; updatedAt: string | null }) | null;
  // Qué pasos entraron en el cálculo (null = del rango del perfil).
  stepsFromHabit: StepsFromHabit | null;
  // Inputs y cuenta paso a paso, para el bloque "cómo se ha calculado".
  needBreakdown: { inputs: WeekNeed['inputs']; breakdown: WeekNeed['breakdown'] };
  // El último peso de sus medidas (el del registro también es una medida).
  weightSource: { weightKg: number; from: 'anthropometry'; date: string } | null;
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

// Pasos que entraron en el cálculo: los que pauta el HÁBITO de pasos del
// cliente y los días que lo marcó dentro de la semana mirada
// (docs/plan-semanas.md). null = sin hábito, o marcado menos de la
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
// misma forma para el snapshot de la fase (persistido) y para las semanas
// siguientes (al vuelo). `missing` con contenido = no se pudo calcular.
export interface WeekNeed {
  computedAt: string;
  missing?: string[] | null;
  inputs: {
    weightKg: number | null;
    weightFrom: 'anthropometry' | null;
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
