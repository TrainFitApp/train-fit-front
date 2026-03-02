import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomProduct } from '../../models/customProduct';
import { Recipe } from '../../models/recipe';
import { RecipeApiService } from './recipe-api.service';

/**
 * Recipe Service
 * Business logic layer for Recipe operations
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private recipeApiService: RecipeApiService) {}

  /**
   * Get Recipe by ID
   */
  public getById(id: string): Observable<Recipe> {
    return this.recipeApiService.getById(id);
  }

  /**
   * Search recipes (verified + user's own)
   */
  public searchRecipes(
    search: string,
    page: number = 0,
    limit: number = 20
  ): Observable<Recipe[]> {
    return this.recipeApiService.searchRecipes(search, page, limit);
  }

  /**
   * Get user's own recipes
   */
  public getUserRecipes(
    page: number = 0,
    limit: number = 20
  ): Observable<Recipe[]> {
    return this.recipeApiService.getUserRecipes(page, limit);
  }

  /**
   * Get verified recipes
   */
  public getVerifiedRecipes(
    search: string = '',
    page: number = 0,
    limit: number = 20
  ): Observable<Recipe[]> {
    return this.recipeApiService.getVerifiedRecipes(search, page, limit);
  }

  /**
   * Get user's favorite recipes
   */
  public getFavoriteRecipes(
    search: string = '',
    page: number = 0,
    limit: number = 20
  ): Observable<Recipe[]> {
    return this.recipeApiService.getFavoriteRecipes(search, page, limit);
  }

  /**
   * Create a new Recipe
   */
  public create(recipe: Partial<Recipe>): Observable<Recipe> {
    return this.recipeApiService.create(recipe);
  }

  public compose(payload: any): Observable<any> {
    return this.recipeApiService.compose(payload);
  }

  /**
   * Update a Recipe
   */
  public update(id: string, recipe: Partial<Recipe>): Observable<Recipe> {
    return this.recipeApiService.update(id, recipe);
  }

  /**
   * Delete a Recipe
   */
  public delete(id: string): Observable<void> {
    return this.recipeApiService.delete(id);
  }

  /**
   * Toggle favorite status
   */
  public toggleFavorite(
    recipeId: string
  ): Observable<{ isFavorite: boolean; message: string }> {
    return this.recipeApiService.toggleFavorite(recipeId);
  }

  /**
   * Add customProduct to Recipe
   */
  public addCustomProduct(
    recipeId: string,
    customProductId: string
  ): Observable<Recipe> {
    return this.recipeApiService.addCustomProduct(recipeId, customProductId);
  }

  /**
   * Remove customProduct from Recipe
   */
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

    // Support both new 'ingredients' and legacy 'customProducts'
    const ingredients: any[] =
      (recipe as any).ingredients || recipe.customProducts || [];

    if (ingredients.length > 0) {
      for (const cp of ingredients) {
        const qtyRaw = Number(cp.quantity);
        const qty = Number.isFinite(qtyRaw) ? qtyRaw : 0;
        const multiplier = qty / 100;

        // Pull up macros from linked product if not present on CP level
        const product = (cp.product || {}) as any;
        const k = cp.energyKcal100g ?? product.energyKcal100g ?? 0;
        const p = cp.protein100g ?? product.protein100g ?? 0;
        const c = cp.carbohydrates100g ?? product.carbohydrates100g ?? 0;
        const f = cp.fat100g ?? product.fat100g ?? 0;

        quantity += qty;
        kcal += k * multiplier;
        protein += p * multiplier;
        carbs += c * multiplier;
        fat += f * multiplier;
      }
    }

    return { kcal, protein, carbs, fat, quantity };
  }

  /**
   * Get top ingredients as a comma-separated string
   */
  public getTopIngredients(recipe: Recipe, count: number = 3): string {
    const ingredients: any[] =
      (recipe as any).ingredients || recipe.customProducts || [];

    if (ingredients.length === 0) {
      return '';
    }

    const sorted = [...ingredients]
      .sort((a, b) => (b.quantity || 0) - (a.quantity || 0))
      .slice(0, count);

    return sorted
      .map((cp) => {
        const name = cp.product?.name || 'Ingrediente';
        return name;
      })
      .join(', ');
  }

  /**
   * Get ingredients list sorted by quantity (descending)
   */
  public getIngredientsList(
    recipe: Recipe
  ): { name: string; quantity: number }[] {
    if (!recipe.customProducts || recipe.customProducts.length === 0) {
      return [];
    }

    return [...recipe.customProducts]
      .sort((a, b) => (b.quantity || 0) - (a.quantity || 0))
      .map((cp) => ({
        name: cp.product?.name || 'Ingrediente',
        quantity: cp.quantity || 0,
      }));
  }

  /**
   * Check if recipe is owned by user
   */
  public isOwnRecipe(recipe: Recipe, userId: string): boolean {
    return recipe.userId === userId;
  }

  /**
   * Check if recipe is in favorites
   */
  public isFavorite(recipe: Recipe, favoriteRecipes: string[]): boolean {
    return recipe._id ? favoriteRecipes.includes(recipe._id) : false;
  }
}
