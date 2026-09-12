// F29 — preferencias nutricionales del cliente (alergias, favoritos, no le
// gusta, si cocina en casa). Un único documento por cliente, no por relación
// trainer-cliente.
export type CooksAtHome = 'yes' | 'no' | 'sometimes';

// Restricciones dietéticas estructuradas — las pauta el intake del
// entrenador (no el editor de preferencias del cliente). Filtro duro del
// cajón de sugerencias de dieta.
export type DietaryFlag = 'vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree';

// TASK-004 (MASTER_BACKLOG.md) — fix mínimo: los 6 slots siguen siendo un
// enum fijo en el resto del sistema; esto es solo una preferencia de
// presentación por cliente (qué slots le aplican, cómo prefiere llamarlos).
// Debe coincidir con diet-days-util.js#MEALS del backend.
export const STANDARD_MEAL_SLOTS = [
  'Desayuno',
  'Almuerzo',
  'Comida',
  'Merienda',
  'Cena',
  'Recena',
] as const;
export type StandardMealSlot = (typeof STANDARD_MEAL_SLOTS)[number];

export interface NutritionPreferences {
  clientId: string;
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  dietaryFlags?: DietaryFlag[];
  cooksAtHome: CooksAtHome | null;
  disabledMealSlots: string[];
  mealSlotLabels: Record<string, string>;
  requestedAt: string | null;
  requestedBy: string | null;
  respondedAt: string | null;
}
