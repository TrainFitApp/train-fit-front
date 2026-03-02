import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CustomRecipeInstance,
  CreateCustomRecipeInstanceDTO,
  UpdateCustomRecipeInstanceDTO,
} from '../../models/customRecipeInstance';
import { HttpService } from '../http/http.service';

/**
 * CustomRecipeInstance API Service
 * Handles HTTP requests for CustomRecipeInstance operations
 *
 * CustomRecipeInstance represents a specific recipe usage in a meal
 * with local overrides and customizations
 */
@Injectable({
  providedIn: 'root',
})
export class CustomRecipeInstanceApiService {
  public static readonly ENDPOINT = 'customrecipeinstances';

  constructor(private http: HttpService) {}

  /**
   * Get CustomRecipeInstance by ID
   * Returns the instance with populated dataRecipe
   */
  public getById(id: string): Observable<CustomRecipeInstance> {
    return this.http.get<CustomRecipeInstance>(
      `${CustomRecipeInstanceApiService.ENDPOINT}/${id}`
    );
  }

  /**
   * Create a new CustomRecipeInstance (add recipe to meal)
   */
  public create(
    instanceData: CreateCustomRecipeInstanceDTO
  ): Observable<CustomRecipeInstance> {
    return this.http.post<CustomRecipeInstance>(
      `${CustomRecipeInstanceApiService.ENDPOINT}`,
      instanceData
    );
  }

  /**
   * Update CustomRecipeInstance (modify overrides)
   * IMPORTANT: dataRecipeId cannot be changed (immutable)
   */
  public update(
    id: string,
    updateData: UpdateCustomRecipeInstanceDTO
  ): Observable<CustomRecipeInstance> {
    return this.http.put<CustomRecipeInstance>(
      `${CustomRecipeInstanceApiService.ENDPOINT}/${id}`,
      updateData
    );
  }

  /**
   * Delete CustomRecipeInstance (remove recipe from meal)
   */
  public delete(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      `${CustomRecipeInstanceApiService.ENDPOINT}/${id}`
    );
  }

  /**
   * Get all CustomRecipeInstances for a meal
   */
  public getByMealId(mealId: string): Observable<Array<CustomRecipeInstance>> {
    return this.http.get<Array<CustomRecipeInstance>>(
      `${CustomRecipeInstanceApiService.ENDPOINT}/meal/${mealId}`
    );
  }
}
