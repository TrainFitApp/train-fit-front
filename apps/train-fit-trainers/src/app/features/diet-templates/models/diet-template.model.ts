import { IProduct } from 'src/app/core/models/product';
import { Recipe } from 'src/app/core/models/recipe';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { ModifiedBaseCustomProduct } from 'src/app/core/models/customRecipe';

// Replanteamiento MVP (nutrición) — mismo formato "clipboard" que ya usa
// MealAlternativeInput/customProducts en client-detail.model.ts, reutilizado
// aquí para construir plantillas reutilizables entre clientes.
export const MEAL_SLOTS = ['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena', 'Recena'] as const;
export type MealSlot = (typeof MEAL_SLOTS)[number];

export interface TemplateFoodItem {
  productId?: string;
  productName?: string;
  recipeId?: string;
  recipeName?: string;
  quantity?: number;
  // Snapshot de macros calculado UNA vez al elegir el alimento (mismo
  // criterio que CustomProductService.getMacros()/RecipeService
  // .calculateCustomRecipeTotals(), reutilizados sin reinventar el cálculo)
  // — permite pintar la card con el mismo look que search-foods (fila de
  // macro-dots) sin volver a pedir el producto/receta real solo para eso.
  kcal?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  // Producto/receta real cacheado en memoria (nunca viaja al backend, ver
  // itemsToCustomEntries en diet-template-builder.page.ts) — permite
  // recalcular macros en vivo al editar la cantidad in situ, sin volver a
  // pedir el alimento solo para eso.
  product?: IProduct;
  recipe?: Recipe;
  // Personalización de los ingredientes de la receta PARA ESTA comida en
  // concreto — nunca toca la receta base (recipe.customProducts). Mismo
  // modelo que CustomRecipe.addedCustomProducts/modifiedBaseCustomProducts/
  // removedBaseCustomProductIds, ya soportado íntegro por el backend
  // (custom-recipe-dao.js#createCustomRecipe). "Rico" en memoria (product
  // poblado) para poder recalcular macros in situ; itemsToCustomEntries lo
  // aplana a ids reales al guardar.
  addedCustomProducts?: CustomProduct[];
  modifiedBaseCustomProducts?: ModifiedBaseCustomProduct[];
  removedBaseCustomProductIds?: string[];
}

// Fase 9 — una comida ya no es una lista plana de alimentos: son 1+
// "alternativas" nombradas, cada una con sus propios alimentos. 1 sola
// alternativa = sin elección (comportamiento de siempre, la etiqueta no se
// pide ni se muestra); 2+ = el cliente elige cuál comer ese día — mismo
// shape que `MealAlternativeInput` en client-detail.model.ts, reutilizado
// aquí para el mismo patrón visual de tarjetas de alternativa.
export interface TemplateMealAlternative {
  label: string;
  items: TemplateFoodItem[];
}

export interface TemplateMeal {
  slot: MealSlot;
  alternatives: TemplateMealAlternative[];
}

export interface TemplateDay {
  dayLabel: string;
  meals: TemplateMeal[];
}

// Auditoría de arquitectura (nutrición) — "recurring"/"choice" generalizan la
// plantilla más allá de una secuencia finita "Día 1..N":
//   - "recurring": patrón semanal (lunes-viernes distinto al fin de semana),
//     `appliesTo` usa el mismo criterio que Date#getDay(): 0=domingo…6=sábado.
//   - "choice" (Fase 9): igual que "recurring" pero sin día de la semana
//     fijo — el propio cliente elige cada día cuál de los patrones le toca
//     (p. ej. "Entrenamiento"/"Descanso"). `appliesTo` no se usa aquí.
export type TemplateMode = 'sequential' | 'recurring' | 'choice';

export interface WeekdayOption {
  value: number;
  label: string;
  short: string;
}

export const WEEKDAYS: WeekdayOption[] = [
  { value: 1, label: 'Lunes', short: 'L' },
  { value: 2, label: 'Martes', short: 'M' },
  { value: 3, label: 'Miércoles', short: 'X' },
  { value: 4, label: 'Jueves', short: 'J' },
  { value: 5, label: 'Viernes', short: 'V' },
  { value: 6, label: 'Sábado', short: 'S' },
  { value: 0, label: 'Domingo', short: 'D' },
];

export interface TemplateDayPattern {
  name: string;
  appliesTo: number[];
  meals: TemplateMeal[];
}

// Forma real en la que el backend persiste cada comida (diet-template-schema.js)
// — "clipboard" por alternativa (mismo formato que customProducts en
// meal-schema.js), no TemplateFoodItem. TemplateDay/TemplateMeal son el
// modelo EDITABLE en el constructor; este es el que viaja por la red.
export interface DietTemplateMealAlternativePayload {
  label: string;
  customProducts: Record<string, unknown>[];
  customRecipes: unknown[];
}

export interface DietTemplateMealPayload {
  slot: MealSlot;
  alternatives: DietTemplateMealAlternativePayload[];
}

export interface DietTemplateDayPayload {
  dayLabel: string;
  meals: DietTemplateMealPayload[];
}

export interface DietTemplateDayPatternPayload {
  name: string;
  appliesTo: number[];
  meals: DietTemplateMealPayload[];
}

export interface DietTemplate {
  _id: string;
  trainerId: string;
  // Puesto = dieta de biblioteca exclusiva de ese cliente; null = plantilla
  // general, aplicable a cualquiera (ver diet-template-schema.js en el
  // backend). No confundir con `clientId`, que allí marca una copia ya
  // asignada como fase y nunca llega a estos listados.
  ownerClientId?: string | null;
  name: string;
  mode: TemplateMode;
  days: DietTemplateDayPayload[];
  dayPatterns: DietTemplateDayPatternPayload[];
  createdAt: string;
  // Sugerencias de dieta — aptitud dietética DERIVADA del contenido
  // (vegana / sin gluten / ...). `suitableFor` lo calcula el backend en cada
  // guardado; `suitableForOverride` son las que el entrenador fuerza a mano.
  suitableFor?: ('vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree')[];
  suitableForOverride?: ('vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree')[];
  // true = dieta predefinida de administración (sale en el ranking de todos).
  verified?: boolean;
  // Perfil de macros de un día tipo — lo calcula el backend en el listado
  // (GET /trainer/diet-templates) para pintar las cards.
  macroProfile?: { kcal: number; protein: number; carbs: number; fat: number; basedOnDays: number };
}
