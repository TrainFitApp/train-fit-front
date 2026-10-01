import { localizeProp } from 'src/app/core/i18n/localized-catalog';

// F29 — preferencias nutricionales del cliente (alergias, favoritos, no le
// gusta, si cocina en casa). Un único documento por cliente, no por relación
// trainer-cliente.
export type CooksAtHome = 'yes' | 'no' | 'sometimes';

// Restricciones dietéticas estructuradas. Las pone el intake y las editan
// el cliente (aquí) y el entrenador (nutrition-preferences-panel).
export type DietaryFlag = 'vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree';

// Mismo icono y color por restricción que la app del entrenador
// (dietary-flag-ui.util.ts): se tiene que leer como la misma cosa.
export const DIETARY_FLAG_OPTIONS: { key: DietaryFlag; label: string; icon: string; colorClass: string }[] = [
  { key: 'vegan', label: 'Vegana', icon: 'leaf', colorClass: 'flag-vegan' },
  { key: 'vegetarian', label: 'Vegetariana', icon: 'leaf-outline', colorClass: 'flag-vegetarian' },
  { key: 'lactoseFree', label: 'Sin lactosa', icon: 'water-outline', colorClass: 'flag-lactose-free' },
  { key: 'glutenFree', label: 'Sin gluten', icon: 'ban-outline', colorClass: 'flag-gluten-free' },
];
DIETARY_FLAG_OPTIONS.forEach((option) => localizeProp(option, 'label', `INTAKE.DIETARY.${option.key}`));

export const COOKS_AT_HOME_OPTIONS: { value: CooksAtHome; label: string; icon: string }[] = [
  { value: 'yes', label: 'Sí', icon: 'home-outline' },
  { value: 'sometimes', label: 'A veces', icon: 'swap-horizontal-outline' },
  { value: 'no', label: 'No', icon: 'fast-food-outline' },
];
COOKS_AT_HOME_OPTIONS.forEach((option) => localizeProp(option, 'label', `INTAKE.COOKS.${option.value}`));

// TASK-004 (MASTER_BACKLOG.md) — fix mínimo: los 6 slots siguen siendo un
// enum fijo en el resto del sistema; esto es solo una preferencia por
// cliente (qué slots le aplican). Debe coincidir con diet-days-util.js#MEALS
// del backend.
export const STANDARD_MEAL_SLOTS = [
  'Desayuno',
  'Almuerzo',
  'Comida',
  'Merienda',
  'Cena',
  'Recena',
] as const;
export type StandardMealSlot = (typeof STANDARD_MEAL_SLOTS)[number];

// Un icono por comida, los mismos que el panel del entrenador.
export const MEAL_SLOT_ICONS: Record<StandardMealSlot, string> = {
  Desayuno: 'cafe-outline',
  Almuerzo: 'sunny-outline',
  Comida: 'restaurant-outline',
  Merienda: 'ice-cream-outline',
  Cena: 'moon-outline',
  Recena: 'bed-outline',
};

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
