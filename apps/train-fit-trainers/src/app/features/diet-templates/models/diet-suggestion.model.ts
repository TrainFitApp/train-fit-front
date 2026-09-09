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
}

export interface HiddenTemplate {
  _id: string;
  name: string;
  missingFlags: DietaryFlag[];
}

export interface DietSuggestionResponse {
  target: NutritionTarget;
  weightSource: { weightKg: number; date: string };
  requiredFlags: DietaryFlag[];
  ranked: RankedTemplate[];
  hidden: HiddenTemplate[];
}

// 422 cuando faltan datos biométricos del cliente.
export interface MissingBiometricsError {
  code: 'MISSING_BIOMETRICS';
  missing: string[];
}

export interface DietSuggestionRequest {
  objetiveKcalDelta: number;
  dietaryFlags?: DietaryFlag[];
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

// --- Progresión ciclo a ciclo ---

export interface NextCycleSuggestion {
  hasData: boolean;
  deltaKcal: number;
  nextCycleKcal: number;
  actualWeeklyRateKg: number | null;
  flag: string | null;
  reason: string;
}

export interface NextCycleResponse {
  phaseId: string;
  phaseName: string | null;
  currentCycleId: string;
  currentCycleKcal: number | null;
  weightStartKg: number | null;
  weightEndKg: number | null;
  suggestion: NextCycleSuggestion;
  draft: {
    mode: 'sequential' | 'recurring' | 'choice';
    days: unknown[];
    dayPatterns: unknown[];
    cycleTargetKcal: number;
    cycleTargetMacros: MacroSet;
  };
}

export interface AdvanceCycleRequest {
  startDate?: string;
  mode?: 'sequential' | 'recurring' | 'choice';
  days?: unknown[];
  dayPatterns?: unknown[];
  cycleTargetKcal: number;
  cycleTargetMacros?: MacroSet;
  name?: string;
}
