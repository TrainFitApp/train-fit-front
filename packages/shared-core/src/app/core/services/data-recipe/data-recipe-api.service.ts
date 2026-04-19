import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataRecipe, RecipeSearchResponse } from '../../models/dataRecipe';
import { Recipe } from '../../models/recipe';
import { HttpService } from '../http/http.service';

/**
 * DataRecipe API Service
 * Handles HTTP requests for DataRecipe operations
 * DataRecipe is a wrapper for Recipe with consumption data (quantity, quantityCooked, order)
 */
@Injectable({
  providedIn: 'root',
})
export class DataRecipeApiService {
  public static readonly DATA_RECIPES_ENDPOINT = 'datarecipes';

  constructor(private http: HttpService) {}

  /**
   * Get DataRecipe by ID
   */
  public getById(id: string): Observable<DataRecipe> {
    return this.http.get<DataRecipe>(
      `${DataRecipeApiService.DATA_RECIPES_ENDPOINT}/${id}`
    );
  }

  /**
   * Create a new DataRecipe
   */
  public create(dataRecipe: DataRecipe): Observable<DataRecipe> {
    return this.http.post<DataRecipe>(
      `${DataRecipeApiService.DATA_RECIPES_ENDPOINT}`,
      dataRecipe
    );
  }

  /**
   * Update a DataRecipe
   */
  public update(
    id: string,
    dataRecipe: Partial<DataRecipe>
  ): Observable<DataRecipe> {
    return this.http.put<DataRecipe>(
      `${DataRecipeApiService.DATA_RECIPES_ENDPOINT}/${id}`,
      dataRecipe
    );
  }

  /**
   * Delete a DataRecipe
   */
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `${DataRecipeApiService.DATA_RECIPES_ENDPOINT}/${id}`
    );
  }

  /**
   * Search recipes by name (verified + user's own)
   */
  public searchRecipes(searchTerm: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${
        DataRecipeApiService.DATA_RECIPES_ENDPOINT
      }/search/recipes?q=${encodeURIComponent(searchTerm)}`
    );
  }

  /**
   * Get user's own recipes
   */
  public getUserRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${DataRecipeApiService.DATA_RECIPES_ENDPOINT}/user/recipes`
    );
  }
}
