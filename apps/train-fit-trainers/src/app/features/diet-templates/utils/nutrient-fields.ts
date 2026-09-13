import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { IProduct } from 'src/app/core/models/product';
import { Recipe } from 'src/app/core/models/recipe';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

export interface NutrientFieldDef {
  key: string;
  label: string;
  unit: 'mg' | 'µg' | 'g';
  toDisplay: 1 | 1000 | 1000000;
}

// Micros y macros secundarios — mismos campos/etiquetas/unidades que
// ProductDetailPanelComponent (SECONDARY_MACROS + MICRONUTRIENTS), para que
// el total del día hable el mismo idioma que el detalle de un alimento
// suelto. Fuera de aquí: kcal/proteína/carbos/grasa, que ya tienen su propio
// bloque en el tablero (dayTotals/alternativeTotals).
export const TOTALS_NUTRIENT_FIELDS: NutrientFieldDef[] = [
  { key: 'saturatedFat100g', label: 'Grasas saturadas', unit: 'g', toDisplay: 1 },
  { key: 'sugars100g', label: 'Azúcares', unit: 'g', toDisplay: 1 },
  { key: 'fiber100g', label: 'Fibra', unit: 'g', toDisplay: 1 },
  { key: 'salt100g', label: 'Sal', unit: 'g', toDisplay: 1 },
  { key: 'sodium100g', label: 'Sodio', unit: 'mg', toDisplay: 1000 },
  { key: 'cholesterol100g', label: 'Colesterol', unit: 'mg', toDisplay: 1000 },
  { key: 'calcium100g', label: 'Calcio', unit: 'mg', toDisplay: 1000 },
  { key: 'iron100g', label: 'Hierro', unit: 'mg', toDisplay: 1000 },
  { key: 'magnesium100g', label: 'Magnesio', unit: 'mg', toDisplay: 1000 },
  { key: 'phosphorus100g', label: 'Fósforo', unit: 'mg', toDisplay: 1000 },
  { key: 'potassium100g', label: 'Potasio', unit: 'mg', toDisplay: 1000 },
  { key: 'zinc100g', label: 'Zinc', unit: 'mg', toDisplay: 1000 },
  { key: 'copper100g', label: 'Cobre', unit: 'mg', toDisplay: 1000 },
  { key: 'manganese100g', label: 'Manganeso', unit: 'mg', toDisplay: 1000 },
  { key: 'selenium100g', label: 'Selenio', unit: 'µg', toDisplay: 1000000 },
  { key: 'iodine100g', label: 'Yodo', unit: 'µg', toDisplay: 1000000 },
  { key: 'vitaminA100g', label: 'Vitamina A', unit: 'µg', toDisplay: 1000000 },
  { key: 'vitaminC100g', label: 'Vitamina C', unit: 'mg', toDisplay: 1000 },
  { key: 'vitaminD100g', label: 'Vitamina D', unit: 'µg', toDisplay: 1000000 },
  { key: 'vitaminE100g', label: 'Vitamina E', unit: 'mg', toDisplay: 1000 },
  { key: 'vitaminK100g', label: 'Vitamina K', unit: 'µg', toDisplay: 1000000 },
  { key: 'vitaminB1100g', label: 'Vitamina B1', unit: 'mg', toDisplay: 1000 },
  { key: 'vitaminB2100g', label: 'Vitamina B2', unit: 'mg', toDisplay: 1000 },
  { key: 'vitaminB3100g', label: 'Vitamina B3', unit: 'mg', toDisplay: 1000 },
  { key: 'vitaminB6100g', label: 'Vitamina B6', unit: 'mg', toDisplay: 1000 },
  { key: 'vitaminB9100g', label: 'Vitamina B9 (fólico)', unit: 'µg', toDisplay: 1000000 },
  { key: 'vitaminB12100g', label: 'Vitamina B12', unit: 'µg', toDisplay: 1000000 },
];

interface MicroSourceItem {
  product?: IProduct;
  recipe?: Recipe;
  quantity?: number;
  addedCustomProducts?: CustomProduct[];
  modifiedBaseCustomProducts?: CustomRecipe['modifiedBaseCustomProducts'];
  removedBaseCustomProductIds?: string[];
}

// Snapshot de micronutrientes de un alimento (producto o receta) para su
// cantidad actual — mismo criterio de fallback (override del CustomProduct >
// producto real) que ya usa CustomProductService.getMacros/getCustomProductInfo,
// extendido a TOTALS_NUTRIENT_FIELDS en vez de solo los 4 macros
// principales. Para receta: suma cada ingrediente (ya fusionado con
// added/modified/removed, ver RecipeService.mergeRecipeIngredients) a su
// propia cantidad y escala por portionRatio — mismo camino que
// calculateCustomRecipeTotals().portionMacros para kcal/proteína/carbos/grasa.
export function computeItemMicros(
  customProductService: CustomProductService,
  recipeService: RecipeService,
  item: MicroSourceItem
): Record<string, number> {
  const result: Record<string, number> = {};

  if (item.recipe) {
    const { ingredients, portionRatio } = recipeService.calculateCustomRecipeTotals(item.recipe, {
      quantity: item.quantity ?? undefined,
      quantityCooked: null,
      addedCustomProducts: item.addedCustomProducts,
      modifiedBaseCustomProducts: item.modifiedBaseCustomProducts,
      removedBaseCustomProductIds: item.removedBaseCustomProductIds,
    } as CustomRecipe);

    for (const field of TOTALS_NUTRIENT_FIELDS) {
      let raw = 0;
      for (const ingredient of ingredients) {
        raw += customProductService.getCustomProductInfo(ingredient, field.key);
      }
      result[field.key] = raw * portionRatio;
    }
  } else if (item.product) {
    const cp = { product: item.product, quantity: item.quantity ?? 100 } as CustomProduct;
    for (const field of TOTALS_NUTRIENT_FIELDS) {
      result[field.key] = customProductService.getCustomProductInfo(cp, field.key);
    }
  }

  return result;
}
