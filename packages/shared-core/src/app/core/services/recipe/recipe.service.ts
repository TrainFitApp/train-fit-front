import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {
  CustomRecipe,
  ModifiedBaseCustomProduct,
} from '../../models/customRecipe';
import { CustomProduct } from '../../models/customProduct';
import { Recipe } from '../../models/recipe';
import { RecipeApiService } from './recipe-api.service';

export type RecipeWeightBasis = 'raw' | 'cooked';

export interface RecipeMacros {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface RecipeMacroTotals extends RecipeMacros {
  quantity: number;
}

export interface RecipeNutritionCalculation {
  ingredients: CustomProduct[];
  totals: RecipeMacroTotals;
  rawWeight: number;
  cookedWeight: number | null;
  consumed: number;
  portionBaseline: number;
  portionBasis: RecipeWeightBasis;
  portionRatio: number;
  portionMacros: RecipeMacros;
  per100Baseline: number;
  per100Basis: RecipeWeightBasis;
  per100Macros: RecipeMacros;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public static readonly CUSTOM_PRODUCT_COMPARISON_FIELDS: Array<
    keyof CustomProduct
  > = [
    'quantity',
    'energyKcal100g',
    'protein100g',
    'carbohydrates100g',
    'fat100g',
    'saturatedFat100g',
    'sugars100g',
    'fiber100g',
    'salt100g',
    'sodium100g',
    'cholesterol100g',
    'transFat100g',
    'calcium100g',
    'iron100g',
    'magnesium100g',
    'phosphorus100g',
    'potassium100g',
    'zinc100g',
    'copper100g',
    'manganese100g',
    'selenium100g',
    'iodine100g',
    'vitaminA100g',
    'vitaminC100g',
    'vitaminD100g',
    'vitaminE100g',
    'vitaminK100g',
    'vitaminB1100g',
    'vitaminB2100g',
    'vitaminB3100g',
    'vitaminB5100g',
    'vitaminB6100g',
    'vitaminB9100g',
    'vitaminB12100g',
    'biotin100g',
    'omega3100g',
    'omega6100g',
    'omega9100g',
    'caffeine100g',
    'taurine100g',
    'alcohol100g',
    'ingredients',
    'allergens',
    'traces',
    'vegan',
    'vegetarian',
    'lactoseFree',
    'glutenFree',
  ];

  constructor(
    private recipeApiService: RecipeApiService,
    private translate: TranslateService
  ) {}

  public getById(id: string): Observable<Recipe> {
    return this.recipeApiService.getById(id);
  }

  public searchRecipes(
    search: string,
    page: number = 0,
    limit: number = 20,
    filters?: {
      own?: boolean;
      fav?: boolean;
      verified?: boolean;
    }
  ): Observable<Recipe[]> {
    return this.recipeApiService.searchRecipes(search, page, limit, filters);
  }

  public getUserRecipes(
    page: number = 0,
    limit: number = 20,
    search: string = ''
  ): Observable<Recipe[]> {
    return this.recipeApiService.getUserRecipes(page, limit, search);
  }

  public getVerifiedRecipes(
    search: string = '',
    page: number = 0,
    limit: number = 20
  ): Observable<Recipe[]> {
    return this.recipeApiService.getVerifiedRecipes(search, page, limit);
  }

  public create(recipe: Partial<Recipe>): Observable<Recipe> {
    return this.recipeApiService.create(recipe);
  }

  public compose(payload: any): Observable<any> {
    return this.recipeApiService.compose(payload);
  }

  public update(id: string, recipe: Partial<Recipe>): Observable<Recipe> {
    return this.recipeApiService.update(id, recipe);
  }

  public delete(id: string): Observable<void> {
    return this.recipeApiService.delete(id);
  }

  public removeCustomProduct(
    recipeId: string,
    customProductId: string
  ): Observable<Recipe> {
    return this.recipeApiService.removeCustomProduct(recipeId, customProductId);
  }

  public calculateRecipeMacros(recipe: Recipe): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    quantity: number;
  } {
    let kcal = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let quantity = 0;

    const ingredients: any[] =
      (recipe as any).ingredients || recipe.customProducts || [];

    for (const cp of ingredients) {
      const qty = this.toPositiveNumber(cp.quantity) || 0;
      const multiplier = qty / 100;
      const product = (cp.product || {}) as any;

      quantity += qty;
      kcal += (cp.energyKcal100g ?? product.energyKcal100g ?? 0) * multiplier;
      protein += (cp.protein100g ?? product.protein100g ?? 0) * multiplier;
      carbs +=
        (cp.carbohydrates100g ?? product.carbohydrates100g ?? 0) * multiplier;
      fat += (cp.fat100g ?? product.fat100g ?? 0) * multiplier;
    }

    return { kcal, protein, carbs, fat, quantity };
  }

  public getEmptyRecipeNutrition(): RecipeNutritionCalculation {
    return this.buildNutritionCalculation([], this.zeroMacroTotals(), null, null);
  }

  public calculateRecipeNutritionFromIngredients(
    ingredients: CustomProduct[],
    consumedQuantity?: number | null,
    cookedWeight?: number | null
  ): RecipeNutritionCalculation {
    const normalizedIngredients = ingredients || [];
    const totals = this.calculateRecipeMacros({
      name: '',
      customProducts: normalizedIngredients,
    });

    return this.buildNutritionCalculation(
      normalizedIngredients,
      totals,
      consumedQuantity,
      cookedWeight
    );
  }

  public areCustomProductsEquivalent(
    left?: Partial<CustomProduct> | null,
    right?: Partial<CustomProduct> | null
  ): boolean {
    if (!left && !right) return true;
    if (!left || !right) return false;

    return RecipeService.CUSTOM_PRODUCT_COMPARISON_FIELDS.every((field) =>
      this.areValuesEquivalent((left as any)?.[field], (right as any)?.[field])
    );
  }

  public buildModifiedBaseCustomProduct(
    baseIngredient: CustomProduct,
    currentIngredient: CustomProduct
  ): ModifiedBaseCustomProduct {
    const modified: ModifiedBaseCustomProduct = {
      baseCustomProductId: baseIngredient._id!,
      quantity: currentIngredient.quantity,
    };

    RecipeService.CUSTOM_PRODUCT_COMPARISON_FIELDS.forEach((field) => {
      const currentValue = (currentIngredient as any)?.[field];
      const baseValue = (baseIngredient as any)?.[field];
      if (!this.areValuesEquivalent(currentValue, baseValue)) {
        (modified as any)[field] = this.cloneComparableValue(currentValue);
      }
    });

    return modified;
  }

  public serializeCustomProductForPersistence(
    ingredient: CustomProduct
  ): Partial<CustomProduct> {
    const payload: any = {
      quantity: ingredient.quantity,
    };

    const normalizedProductId = this.normalizeObjectId(
      ingredient.product?._id || ingredient.product
    );
    if (normalizedProductId) {
      payload.product = normalizedProductId;
    }

    const normalizedIngredientId = this.normalizeObjectId(ingredient._id);
    if (normalizedIngredientId) {
      payload._id = normalizedIngredientId;
    }

    RecipeService.CUSTOM_PRODUCT_COMPARISON_FIELDS.forEach((field) => {
      if (field === 'quantity') return;

      if (!Object.prototype.hasOwnProperty.call(ingredient, field)) {
        return;
      }

      const value = (ingredient as any)?.[field];
      if (value === undefined) {
        return;
      }

      if (typeof value === 'string' && value.trim() === '') {
        return;
      }

      payload[field] = this.cloneComparableValue(value);
    });

    return payload;
  }

  public mergeRecipeIngredients(
    recipe: Recipe | null | undefined,
    customRecipe?: CustomRecipe | null
  ): CustomProduct[] {
    if (!recipe) return [];
    if (!customRecipe) return [...(recipe.customProducts || [])];

    const removedIds = new Set(
      (customRecipe.removedBaseCustomProductIds || []).map((id: any) =>
        (id?._id || id).toString()
      )
    );
    const modifiedMap = new Map<string, ModifiedBaseCustomProduct>();

    (customRecipe.modifiedBaseCustomProducts || []).forEach((item: any) => {
      const id = item?.baseCustomProductId;
      if (id) {
        modifiedMap.set(id.toString(), item);
      }
    });

    const mergedBase = (recipe.customProducts || [])
      .filter((ingredient: any) => !removedIds.has(ingredient?._id?.toString?.()))
      .map((ingredient: any) => {
        const id = ingredient?._id?.toString?.();
        const modified = id ? modifiedMap.get(id) : null;
        if (!modified) return ingredient;

        const nextIngredient: any = { ...ingredient };
        RecipeService.CUSTOM_PRODUCT_COMPARISON_FIELDS.forEach((field) => {
          if ((modified as any)?.[field] !== undefined) {
            nextIngredient[field] = this.cloneComparableValue(
              (modified as any)[field]
            );
          }
        });

        return nextIngredient;
      });

    return [
      ...mergedBase,
      ...((customRecipe.addedCustomProducts || []) as CustomProduct[]),
    ];
  }

  public getRemovedBaseIngredients(
    recipe: Recipe | null | undefined,
    ingredients: CustomProduct[]
  ): CustomProduct[] {
    if (!recipe) return [];

    return (recipe.customProducts || []).filter(
      (ingredient: any) =>
        !ingredients.find((current) => current?._id === ingredient?._id)
    );
  }

  public calculateCustomRecipeTotals(
    recipe: Recipe | null | undefined,
    customRecipe?: CustomRecipe | null
  ): {
    ingredients: CustomProduct[];
    totals: RecipeMacroTotals;
    baseline: number;
    consumed: number;
    rawWeight: number;
    cookedWeight: number | null;
    portionBaseline: number;
    portionBasis: RecipeWeightBasis;
    portionRatio: number;
    portionMacros: RecipeMacros;
    per100Baseline: number;
    per100Basis: RecipeWeightBasis;
    per100Macros: RecipeMacros;
  } {
    const ingredients = this.mergeRecipeIngredients(recipe, customRecipe);
    const nutrition = this.calculateRecipeNutritionFromIngredients(
      ingredients,
      customRecipe?.quantity,
      customRecipe?.quantityCooked
    );

    return {
      ingredients,
      totals: nutrition.totals,
      baseline: nutrition.portionBaseline,
      consumed: nutrition.consumed,
      rawWeight: nutrition.rawWeight,
      cookedWeight: nutrition.cookedWeight,
      portionBaseline: nutrition.portionBaseline,
      portionBasis: nutrition.portionBasis,
      portionRatio: nutrition.portionRatio,
      portionMacros: nutrition.portionMacros,
      per100Baseline: nutrition.per100Baseline,
      per100Basis: nutrition.per100Basis,
      per100Macros: nutrition.per100Macros,
    };
  }

  public getTopIngredients(recipe: Recipe, count: number = 3): string {
    const ingredients: any[] =
      (recipe as any).ingredients || recipe.customProducts || [];

    if (ingredients.length === 0) {
      return '';
    }

    return [...ingredients]
      .sort((a, b) => (b.quantity || 0) - (a.quantity || 0))
      .slice(0, count)
      .map((cp) => cp.product?.name || this.translate.instant('RECIPE_CARD.INGREDIENT_FALLBACK'))
      .join(', ');
  }

  private areValuesEquivalent(left: any, right: any): boolean {
    if (Array.isArray(left) || Array.isArray(right)) {
      return JSON.stringify(left || []) === JSON.stringify(right || []);
    }

    return left === right;
  }

  private cloneComparableValue(value: any): any {
    if (Array.isArray(value)) {
      return [...value];
    }

    return value;
  }

  private buildNutritionCalculation(
    ingredients: CustomProduct[],
    totals: RecipeMacroTotals,
    consumedQuantity?: number | null,
    cookedWeight?: number | null
  ): RecipeNutritionCalculation {
    const rawWeight = totals.quantity || 0;
    const normalizedCookedWeight = this.toPositiveNumber(cookedWeight);
    const consumed = this.toPositiveNumber(consumedQuantity) || 0;
    const hasCookedWeight = !!normalizedCookedWeight;
    const baseline = hasCookedWeight ? normalizedCookedWeight : rawWeight;
    const basis: RecipeWeightBasis = hasCookedWeight ? 'cooked' : 'raw';
    const portionRatio = baseline > 0 && consumed > 0 ? consumed / baseline : 0;

    return {
      ingredients,
      totals,
      rawWeight,
      cookedWeight: normalizedCookedWeight,
      consumed,
      portionBaseline: baseline,
      portionBasis: basis,
      portionRatio,
      portionMacros: this.scaleMacros(totals, portionRatio),
      per100Baseline: baseline,
      per100Basis: basis,
      per100Macros:
        baseline > 0 ? this.scaleMacros(totals, 100 / baseline) : this.zeroMacros(),
    };
  }

  private scaleMacros(macros: RecipeMacros, ratio: number): RecipeMacros {
    return {
      kcal: macros.kcal * ratio,
      protein: macros.protein * ratio,
      carbs: macros.carbs * ratio,
      fat: macros.fat * ratio,
    };
  }

  private zeroMacros(): RecipeMacros {
    return {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
  }

  private zeroMacroTotals(): RecipeMacroTotals {
    return {
      ...this.zeroMacros(),
      quantity: 0,
    };
  }

  private toPositiveNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }

    return parsed;
  }

  private normalizeObjectId(value: any): string | null {
    if (!value) return null;

    const rawValue = value?._id || value;
    const normalizedValue =
      typeof rawValue === 'string' ? rawValue : rawValue?.toString?.();

    return /^[a-f\d]{24}$/i.test(normalizedValue || '') ? normalizedValue : null;
  }
}
