import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchFilterGroup } from 'src/app/shared/models/filterGroup';
import { MealClipboard } from 'src/app/shared/models/meal-clipboard';
import { Meal } from '../../models/meal';
import { IProduct } from '../../models/product';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';

@Injectable()
export class MealAPIService {
  private static readonly MEAL_ENDPOINT = 'meals';

  constructor(private http: HttpService, private userService: UserService) {}

  public searchAllWithFilters(
    searchFilterGroup: SearchFilterGroup
  ): Observable<IProduct[]> {
    const payload = {
      ...searchFilterGroup,
      userId: searchFilterGroup?.userId || this.userService.getLocalUser?._id,
    };

    return this.http.post<IProduct[]>(
      `${MealAPIService.MEAL_ENDPOINT}/search/all`,
      payload
    );
  }

  public pasteMeal(clipboard: MealClipboard, merge?: boolean): Observable<Meal> {
    const mealToSend = clipboard.getFilteredMeal();
    return this.http.put<Meal>(`${MealAPIService.MEAL_ENDPOINT}/paste`, {
      meals: {
        mealClipboard: mealToSend,
        mealToPaste: clipboard.mealToPaste,
      },
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

  public deleteMealRecipes(id: string): Observable<Meal> {
    return this.http.delete<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/all/customrecipesref/${id}`
    );
  }

  public addCustomRecipe(
    mealId: string,
    customRecipeId: string
  ): Observable<Meal> {
    return this.http.post<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/${mealId}/customrecipes/${customRecipeId}`,
      {}
    );
  }

  public deleteMealCustomRecipe(
    mealId: string,
    customRecipeId: string
  ): Observable<Meal> {
    return this.http.delete<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/customrecipe/${mealId}/${customRecipeId}`
    );
  }

  // TAREA (meals pautados) — marcar/desmarcar consumido un producto/receta
  // pautados (mismo patrón que setMealCompleted en la app de trainer).
  public setCustomProductConsumed(
    mealId: string,
    customProductId: string,
    consumed: boolean
  ): Observable<Meal> {
    return this.http.patch<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/${mealId}/customproducts/${customProductId}/consumed`,
      { consumed }
    );
  }

  public setCustomRecipeConsumed(
    mealId: string,
    customRecipeId: string,
    consumed: boolean
  ): Observable<Meal> {
    return this.http.patch<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/${mealId}/customrecipes/${customRecipeId}/consumed`,
      { consumed }
    );
  }
}
