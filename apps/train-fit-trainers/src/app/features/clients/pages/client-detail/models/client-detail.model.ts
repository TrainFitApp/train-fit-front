import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';

export type ClientScope = 'training' | 'nutrition';
export type ClientDetailTab = ClientScope | 'notes' | 'history' | 'checkins' | 'payments' | 'tasks';

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

export interface AnthropometryEntry {
  _id: string;
  date: string;
  weight?: number;
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
}

// TAREA1 (replanteamiento MVP nutrición) — un alimento dentro de una
// alternativa de composición. productId/productName/quantity se rellenan al
// elegir un alimento real de la biblioteca (ProductSearchModalComponent) en
// vez de teclear macros a mano; cuando productId está presente,
// kcal/proteinG/carbsG/fatG representan valores POR 100g (no totales) — ver
// alternativeToCustomProducts.
export interface MealFoodItemInput {
  kcal: number | null;
  proteinG: number | null;
  carbsG: number | null;
  fatG: number | null;
  productId?: string;
  productName?: string;
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

// F30 — resultado por cliente de una operación "aplicar en bloque" (rutina/comida/objetivo).
export interface BulkApplyResult {
  clientId: string;
  success: boolean;
  error?: string;
}

// F29 — preferencias nutricionales del cliente, solo lectura para el profesional.
export interface ClientNutritionPreferences {
  clientId: string;
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  cooksAtHome: 'yes' | 'no' | 'sometimes' | null;
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

export interface NutritionalGoal {
  _id: string;
  name: string;
  kcalTotal: number;
  proteinsGTotal: number;
  carbohydratesGTotal: number;
  fatGTotal: number;
  assignedByTrainerId: string | null;
}
