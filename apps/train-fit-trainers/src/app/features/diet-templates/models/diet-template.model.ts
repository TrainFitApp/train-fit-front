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
  // Micronutrientes + macros secundarios (fibra, sodio, vitaminas...) de
  // este item para su cantidad actual — mismo snapshot que kcal/protein/
  // carbs/fat, ver computeItemMicros() en utils/nutrient-fields.ts. Clave =
  // campo *100g de IProduct/CustomProduct (p.ej. 'sodium100g'); ausente o en
  // 0 cuando el producto/receta no tiene ese dato.
  micros?: Record<string, number>;
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

// Una plantilla es una lista de MENÚS intercambiables entre los que el
// cliente elige cada día ("Entrenamiento", "Descanso"…). No hay secuencia de
// días ni patrones por día de la semana: ese nombre es la clave con la que
// el cliente elige, así que dos menús de la misma plantilla no pueden
// llamarse igual (lo garantiza el backend, sanitizeMenus).
export interface TemplateMenu {
  name: string;
  meals: TemplateMeal[];
}

// Forma en la que viaja por la red cada comida de un menú (plantillas y fases,
// diet-menu-schema.js en el backend): alimentos y recetas por alternativa, no
// TemplateFoodItem. TemplateMenu/TemplateMeal son el modelo EDITABLE en el
// constructor; este es el que viaja.
export interface DietTemplateMealAlternativePayload {
  label: string;
  customProducts: Record<string, unknown>[];
  customRecipes: unknown[];
}

export interface DietTemplateMealPayload {
  slot: MealSlot;
  alternatives: DietTemplateMealAlternativePayload[];
}

export interface DietTemplateMenuPayload {
  name: string;
  meals: DietTemplateMealPayload[];
}

export interface DietTemplate {
  _id: string;
  trainerId: string;
  // Puesto = dieta de biblioteca exclusiva de ese cliente; null = plantilla
  // general, aplicable a cualquiera. Aplicarla crea una fase (DietPhase) con
  // su propia copia del contenido.
  ownerClientId: string | null;
  name: string;
  menus: DietTemplateMenuPayload[];
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
