import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { Anthropometry } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';

export type ClientScope = 'training' | 'nutrition';
export type ClientDetailTab =
  | ClientScope
  | 'measurements'
  | 'notes'
  | 'history'
  | 'checkins'
  | 'payments'
  | 'tasks';

export interface TrainerNote {
  _id: string;
  text: string;
  pinned: boolean;
  createdAt: string;
}

// F09: reutiliza el modelo real de Table/Split/Workout/CustomExercise/Set del
// consumidor (packages/shared-core) en vez de un tipo empobrecido propio —
// el backend (getClientTables) devuelve exactamente esa misma estructura.
export type ClientTable = Table;

// Un workout "aplanado" fuera de su split, con contexto de a qué rutina
// pertenece — usado por la sección de historial (F09) y F18.
export interface CompletedWorkoutEntry extends Workout {
  tableName: string;
  splitName: string;
}

// F17 — configuración de check-in ya aplicada a este cliente por este profesional.
export interface CheckinConfig {
  _id: string;
  enabledFields: string[];
  cadence: 'weekly';
  sourceTemplateId: string | null;
  updatedAt: string;
}

export interface CheckinResponseEntry {
  _id: string;
  respondedAt: string;
  values: Record<string, number>;
}

// F26 — recordatorio de cobro (agenda manual, sin pagos reales).
export interface TrainerPayment {
  _id: string;
  amount: number;
  currency: string;
  dueDate: string;
  paidAt: string | null;
  note?: string;
}

// F20 — vista de adherencia nutricional.
export interface AdherenceSummary {
  status: 'ok' | 'no_goal';
  percentage?: number;
  daysCounted?: number;
  daysInRange?: number;
  dailyBreakdown?: { date: string; kcal: number; withinMargin: boolean }[];
}

// F20-bis — mismo tipo que alimenta <app-anthropometry-chart> (shared-ui):
// el backend ya devuelve el árbol completo de medidas, así que en vez de un
// tipo empobrecido propio (antes solo {_id,date,weight}) se reutiliza el
// modelo real.
export type AnthropometryEntry = Anthropometry;

// F20-bis — un día del calendario de nutrición: cumplimiento (% de items
// pautados marcados como hechos) y si hubo alguna excepción ese día.
export interface NutritionComplianceDay {
  date: string;
  hasPlan: boolean;
  completionPercentage: number | null;
  hasException: boolean;
  exceptionType: 'override' | 'skip' | null;
}

export interface NutritionComplianceSummary {
  status: 'ok';
  dailyBreakdown: NutritionComplianceDay[];
}

// F30 — resultado por cliente de una operación "aplicar en bloque" (rutina/comida/objetivo).
export interface BulkApplyResult {
  clientId: string;
  success: boolean;
  error?: string;
}

export interface MealSummary {
  _id: string;
  name: string;
  customProducts: unknown[];
  customRecipes: unknown[];
}

export interface DietDaySummary {
  _id: string;
  date: string;
  meals: MealSummary[];
  // TAREA5 — id de la Diet contenedora (User.dietInUse del cliente), no del
  // propio DietDay. Necesario para pedir productos/recetas recientes de esta
  // comida (GET /diets/:dietId/recent-products|recipes).
  dietId?: string;
}

// TAREA1/TAREA5 (replanteamiento MVP nutrición) — un alimento dentro de una
// alternativa de composición. Siempre un producto real O una receta real de
// la biblioteca (ProductSearchModalComponent, panel lateral) — ya no existe
// la opción de teclear macros a mano (no tenía sentido: un profesional pauta
// comida real, no un número inventado).
export interface MealFoodItemInput {
  productId?: string;
  productName?: string;
  recipeId?: string;
  recipeName?: string;
  quantity?: number;
}

// F12/F28 — una alternativa de composición al pautar una comida. Con 1 sola
// se aplica de inmediato (F12); con 2+ se guardan como propuestas para que
// el cliente elija (F28). Cada alternativa contiene VARIOS alimentos
// (`items`) — antes solo admitía uno, así que pautar "pollo + arroz +
// ensalada" en una misma comida exigía sobrescribir en 3 envíos sucesivos;
// ahora se acumulan en el panel y se envían juntos en un solo `customProducts`.
export interface MealAlternativeInput {
  label: string;
  items: MealFoodItemInput[];
}

// F29 — preferencias nutricionales del cliente, solo lectura para el profesional.
export interface ClientNutritionPreferences {
  clientId: string;
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  cooksAtHome: 'yes' | 'no' | 'sometimes' | null;
  disabledMealSlots: string[];
  mealSlotLabels: Record<string, string>;
  requestedAt: string | null;
  requestedBy: string | null;
  respondedAt: string | null;
}

// coach-tab FASE4 — tarea/hábito diario, entrada de cumplimiento 100% manual
// (sin integración con salud del dispositivo), solo el profesional la crea.
export type TrainerTaskType = 'steps' | 'water' | 'sleep' | 'cardio' | 'custom';

export interface TrainerTask {
  _id: string;
  type: TrainerTaskType;
  label: string | null;
  target: number;
  unit: string;
  active: boolean;
  createdAt: string;
}

// "Solicitar antropometría" — cadencia propia, independiente de la del
// check-in de bienestar (mismo catálogo de campos, ver checkin-fields.ts,
// filtrado a storage === 'anthropometry').
export type AnthropometryRequestCadence = 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';

export interface AnthropometryRequest {
  _id: string;
  fields: string[];
  notes: string;
  cadence: AnthropometryRequestCadence;
  customIntervalDays: number | null;
  active: boolean;
  lastRequestedAt: string;
  lastFulfilledAt: string | null;
}

export interface NutritionalGoal {
  _id: string;
  name: string;
  kcalTotal: number;
  proteinsGTotal: number;
  carbohydratesGTotal: number;
  fatGTotal: number;
  // Histórico: quién CREÓ este objetivo (o null si lo hizo el propio
  // cliente) — no cambia aunque se active/desactive.
  assignedByTrainerId: string | null;
  // Estado ACTUAL: si es el objetivo vigente del cliente ahora mismo
  // (User.goalInUse en el backend) — independiente de quién lo creó, un
  // cliente puede tener en uso un objetivo propio aunque el trainer le
  // haya asignado otro que todavía no activó, o viceversa.
  isInUse: boolean;
}
