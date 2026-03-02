import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchFilterGroup } from 'src/app/shared/models/filterGroup';
import { MealClipboard } from 'src/app/shared/models/meal-clipboard';
import { Meal } from '../../models/meal';
import { IProduct } from '../../models/product';
import { HttpService } from '../http/http.service';

@Injectable()
export class MealAPIService {
  private static readonly MEAL_ENDPOINT = 'meals';

  constructor(private http: HttpService) {}

  public searchAllWithFilters(
    searchFilterGroup: SearchFilterGroup
  ): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(
      `${MealAPIService.MEAL_ENDPOINT}/search/all`,
      searchFilterGroup
    );
  }

  public pasteMeal(meals: MealClipboard, merge?: boolean): Observable<Meal> {
    return this.http.put<Meal>(`${MealAPIService.MEAL_ENDPOINT}/paste`, {
      meals,
      merge,
    });
  }

  public updateMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/update/all/meal/fields`,
      meal
    );
  }

  public modifyMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/modify/one/simple`,
      meal
    );
  }

  public deleteMealProduct(
    idMeal: string,
    idProduct: string
  ): Observable<Meal> {
    return this.http.delete<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/${idMeal}/${idProduct}`
    );
  }

  public deleteMealCustomProducts(id: string): Observable<Meal> {
    return this.http.delete<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/all/customproducts/${id}`
    );
  }

  public deleteMealRecipeInstances(id: string): Observable<Meal> {
    return this.http.delete<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/all/customrecipeinstances/${id}`
    );
  }

  public addCustomRecipeInstance(
    mealId: string,
    instanceId: string
  ): Observable<Meal> {
    return this.http.post<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/${mealId}/customrecipeinstances/${instanceId}`,
      {}
    );
  }

  public deleteMealCustomRecipeInstance(
    mealId: string,
    instanceId: string
  ): Observable<Meal> {
    return this.http.delete<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/customrecipeinstance/${mealId}/${instanceId}`
    );
  }
}
