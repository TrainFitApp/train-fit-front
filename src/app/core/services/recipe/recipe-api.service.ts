import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe';
import { HttpService } from '../http/http.service';

/**
 * Recipe API Service
 * Handles HTTP requests for Recipe CRUD and search operations
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  public static readonly RECIPES_ENDPOINT = 'recipes';

  constructor(private http: HttpService) {}

  /**
   * Get Recipe by ID
   */
  public getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${RecipeApiService.RECIPES_ENDPOINT}/${id}`);
  }

  /**
   * Search recipes (verified + user's own)
   */
  public searchRecipes(
    search: string,
    page: number = 0,
    limit: number = 10
  ): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${RecipeApiService.RECIPES_ENDPOINT}/search?search=${encodeURIComponent(
        search
      )}&page=${page}&limit=${limit}`
    );
  }

  /**
   * Get user's own recipes
   */
  public getUserRecipes(
    page: number = 0,
    limit: number = 10
  ): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${RecipeApiService.RECIPES_ENDPOINT}/user?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get verified recipes
   */
  public getVerifiedRecipes(
    search: string = '',
    page: number = 0,
    limit: number = 10
  ): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${
        RecipeApiService.RECIPES_ENDPOINT
      }/verified?search=${encodeURIComponent(
        search
      )}&page=${page}&limit=${limit}`
    );
  }

  /**
   * Get user's favorite recipes
   */
  public getFavoriteRecipes(
    search: string = '',
    page: number = 0,
    limit: number = 10
  ): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${
        RecipeApiService.RECIPES_ENDPOINT
      }/favorites?search=${encodeURIComponent(
        search
      )}&page=${page}&limit=${limit}`
    );
  }

  /**
   * Create a new Recipe
   */
  public create(recipe: Partial<Recipe>): Observable<Recipe> {
    return this.http.post<Recipe>(
      `${RecipeApiService.RECIPES_ENDPOINT}`,
      recipe
    );
  }

  /**
   * Compose Recipe + (optional) DataRecipe + CustomRecipeInstance in one call
   */
  public compose(payload: any): Observable<any> {
    return this.http.post<any>(
      `${RecipeApiService.RECIPES_ENDPOINT}/compose`,
      payload
    );
  }

  /**
   * Update a Recipe (only owner can update)
   */
  public update(id: string, recipe: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(
      `${RecipeApiService.RECIPES_ENDPOINT}/${id}`,
      recipe
    );
  }

  /**
   * Delete a Recipe (only owner can delete)
   */
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${RecipeApiService.RECIPES_ENDPOINT}/${id}`);
  }

  /**
   * Toggle favorite status for a recipe
   */
  public toggleFavorite(
    recipeId: string
  ): Observable<{ isFavorite: boolean; message: string }> {
    return this.http.post<{ isFavorite: boolean; message: string }>(
      `${RecipeApiService.RECIPES_ENDPOINT}/${recipeId}/favorite`,
      {}
    );
  }

  /**
   * Add customProduct to Recipe
   */
  public addCustomProduct(
    recipeId: string,
    customProductId: string
  ): Observable<Recipe> {
    return this.http.post<Recipe>(
      `${RecipeApiService.RECIPES_ENDPOINT}/${recipeId}/customproducts/${customProductId}`,
      {}
    );
  }

  /**
   * Remove customProduct from Recipe
   */
  public removeCustomProduct(
    recipeId: string,
    customProductId: string
  ): Observable<Recipe> {
    return this.http.delete<Recipe>(
      `${RecipeApiService.RECIPES_ENDPOINT}/${recipeId}/customproducts/${customProductId}`
    );
  }
}
