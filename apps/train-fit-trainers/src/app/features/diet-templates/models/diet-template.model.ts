// Replanteamiento MVP (nutrición) — mismo formato "clipboard" que ya usa
// MealAlternativeInput/customProducts en client-detail.model.ts, reutilizado
// aquí para construir plantillas reutilizables entre clientes.
export const MEAL_SLOTS = ['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena', 'Recena'] as const;
export type MealSlot = (typeof MEAL_SLOTS)[number];

export interface TemplateFoodItem {
  productId?: string;
  productName?: string;
  quantity?: number;
  kcal: number | null;
  proteinG: number | null;
  carbsG: number | null;
  fatG: number | null;
}

export interface TemplateMeal {
  slot: MealSlot;
  items: TemplateFoodItem[];
}

export interface TemplateDay {
  dayLabel: string;
  meals: TemplateMeal[];
}

// Forma real en la que el backend persiste cada comida (diet-template-schema.js)
// — "clipboard" (mismo formato que customProducts en meal-schema.js), no
// TemplateFoodItem. TemplateDay/TemplateMeal son el modelo EDITABLE en el
// constructor; este es el que viaja por la red.
export interface DietTemplateMealPayload {
  slot: MealSlot;
  customProducts: Record<string, unknown>[];
  customRecipes: unknown[];
}

export interface DietTemplateDayPayload {
  dayLabel: string;
  meals: DietTemplateMealPayload[];
}

export interface DietTemplate {
  _id: string;
  trainerId: string;
  name: string;
  days: DietTemplateDayPayload[];
  createdAt: string;
}

export interface DietTemplateApplyResult {
  appliedDays: { dayLabel: string; date: string }[];
}
