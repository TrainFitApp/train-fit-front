import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataRecipe } from '../../models/dataRecipe';
import { Recipe } from '../../models/recipe';
import { DataRecipeApiService } from './data-recipe-api.service';

/**
 * DataRecipe Service
 * Business logic layer for DataRecipe operations
 * DataRecipe is a wrapper for Recipe with consumption data (quantity, quantityCooked, order)
 *
 * IMPORTANT:
 * - DataRecipe does NOT contain customProducts directly
 * - The Recipe reference contains the customProducts
 * - quantity = raw consumption amount
 * - quantityCooked = total cooked weight of the recipe (for ratio calculation)
 */
@Injectable({
  providedIn: 'root',
})
export class DataRecipeService {
  constructor(private dataRecipeApiService: DataRecipeApiService) {}

  /**
   * Get DataRecipe by ID
   */
  public getById(id: string): Observable<DataRecipe> {
    return this.dataRecipeApiService.getById(id);
  }

  /**
   * Create a new DataRecipe
   */
  public create(dataRecipe: DataRecipe): Observable<DataRecipe> {
    return this.dataRecipeApiService.create(dataRecipe);
  }

  /**
   * Update a DataRecipe
   */
  public update(
    id: string,
    dataRecipe: Partial<DataRecipe>
  ): Observable<DataRecipe> {
    return this.dataRecipeApiService.update(id, dataRecipe);
  }

  /**
   * Delete a DataRecipe
   */
  public delete(id: string): Observable<void> {
    return this.dataRecipeApiService.delete(id);
  }

  /**
   * Search recipes by name (verified + user's own)
   */
  public searchRecipes(searchTerm: string): Observable<Recipe[]> {
    return this.dataRecipeApiService.searchRecipes(searchTerm);
  }

  /**
   * Get user's own recipes
   */
  public getUserRecipes(): Observable<Recipe[]> {
    return this.dataRecipeApiService.getUserRecipes();
  }

  /**
   * Calculate macros for a DataRecipe based on consumed portion
   * The Recipe's customProducts contain the nutritional info
   *
   * @param dataRecipe - The DataRecipe with recipe reference populated
   * @returns Calculated macros for the consumed portion
   */
  public calculateMacros(dataRecipe: DataRecipe): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    if (!dataRecipe || !dataRecipe.recipe) {
      return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    }

    let totalKcal = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalRawWeight = 0;

    // 1. Calculate total macros for the WHOLE recipe (sum of raw ingredients)
    const recipe =
      typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
    if (!recipe) {
      return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    }

    const ingredients = recipe.customProducts || [];
    for (const ing of ingredients) {
      const qty = ing.quantity || 0;
      const multiplier = qty / 100;
      totalRawWeight += qty;

      // Use properties directly or fallback to inner product
      const energy = ing.energyKcal100g ?? ing.product?.energyKcal100g ?? 0;
      const protein = ing.protein100g ?? ing.product?.protein100g ?? 0;
      const carbs =
        ing.carbohydrates100g ?? ing.product?.carbohydrates100g ?? 0;
      const fat = ing.fat100g ?? ing.product?.fat100g ?? 0;

      totalKcal += energy * multiplier;
      totalProtein += protein * multiplier;
      totalCarbs += carbs * multiplier;
      totalFat += fat * multiplier;
    }

    // 2. Determine the reference weight (prefers quantityCooked if provided)
    const baselineQuantity = dataRecipe.quantityCooked || totalRawWeight;

    if (baselineQuantity <= 0 || !dataRecipe.quantity) {
      return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    }

    // 3. Apply the "Rule of Three" (Regla de 3)
    // Ratio = What I consume / Total what was made
    const ratio = dataRecipe.quantity / baselineQuantity;

    return {
      kcal: totalKcal * ratio,
      protein: totalProtein * ratio,
      carbs: totalCarbs * ratio,
      fat: totalFat * ratio,
    };
  }
}
