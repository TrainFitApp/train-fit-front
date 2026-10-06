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

  /**
   * `recentIds` son los productos recientes de la comida que la pantalla ya
   * tiene en memoria. El backend los usa solo para subirlos en el ranking
   * (ver meal-dao.js#searchAllWithFilters): lo que el usuario come a diario
   * sale primero también cuando escribe, y el orden no se rompe al paginar.
   */
  public searchAllWithFilters(
    searchFilterGroup: SearchFilterGroup,
    recentIds: string[] = []
  ): Observable<IProduct[]> {
    const payload = {
      ...searchFilterGroup,
      userId: searchFilterGroup?.userId || this.userService.getLocalUser?._id,
      recentIds,
    };

    return this.http.post<IProduct[]>(`${MealAPIService.MEAL_ENDPOINT}/search`, payload);
  }

  // Pega el portapapeles en la comida destino (mealToPaste).
  public pasteMeal(clipboard: MealClipboard, merge?: boolean): Observable<Meal> {
    return this.http.put<Meal>(`${MealAPIService.MEAL_ENDPOINT}/${clipboard.mealToPaste._id}/paste`, {
      mealClipboard: clipboard.getFilteredMeal(),
      merge,
    });
  }

  // Nombre y nota de la comida.
  public modifyMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${MealAPIService.MEAL_ENDPOINT}/${meal._id}`, {
      name: meal.name,
      notes: meal.notes,
    });
  }

  // El cliente elige (o cambia) una de las opciones que pautó su profesional.
  public chooseAlternative(mealId: string, chosenIndex: number): Observable<Meal> {
    return this.http.put<Meal>(`${MealAPIService.MEAL_ENDPOINT}/${mealId}/alternative`, { chosenIndex });
  }

  public deleteMealProduct(mealId: string, customProductId: string): Observable<Meal> {
    return this.http.delete<Meal>(`${MealAPIService.MEAL_ENDPOINT}/${mealId}/customproducts/${customProductId}`);
  }

  public deleteMealCustomProducts(mealId: string): Observable<Meal> {
    return this.http.delete<Meal>(`${MealAPIService.MEAL_ENDPOINT}/${mealId}/customproducts`);
  }

  public deleteMealRecipes(mealId: string): Observable<Meal> {
    return this.http.delete<Meal>(`${MealAPIService.MEAL_ENDPOINT}/${mealId}/customrecipes`);
  }

  public deleteMealCustomRecipe(mealId: string, customRecipeId: string): Observable<Meal> {
    return this.http.delete<Meal>(`${MealAPIService.MEAL_ENDPOINT}/${mealId}/customrecipes/${customRecipeId}`);
  }

  // Marcar/desmarcar consumido un producto/receta pautados.
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

  // Cantidad realmente consumida de un pautado — mismo patrón que
  // setCustomProductConsumed/setCustomRecipeConsumed de arriba.
  public setCustomProductQuantity(
    mealId: string,
    customProductId: string,
    quantity: number
  ): Observable<Meal> {
    return this.http.patch<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/${mealId}/customproducts/${customProductId}/quantity`,
      { quantity }
    );
  }

  public setCustomRecipeQuantity(
    mealId: string,
    customRecipeId: string,
    quantity: number
  ): Observable<Meal> {
    return this.http.patch<Meal>(
      `${MealAPIService.MEAL_ENDPOINT}/${mealId}/customrecipes/${customRecipeId}/quantity`,
      { quantity }
    );
  }
}
