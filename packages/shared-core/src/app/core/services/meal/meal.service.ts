import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { SearchFilterGroup } from 'src/app/shared/models/filterGroup';
import { MealClipboard } from 'src/app/shared/models/meal-clipboard';
import { Meal } from '../../models/meal';
import { IProduct } from '../../models/product';
import { MealAPIService } from './meal-api.service';

@Injectable()
export class MealService {
  private mealClipboardSubject = new BehaviorSubject<MealClipboard | null>(null);

  constructor(private mealAPIService: MealAPIService) {}

  public get getMealClipboard(): MealClipboard | null {
    return this.mealClipboardSubject.value;
  }

  public get mealClipboard$(): Observable<MealClipboard | null> {
    return this.mealClipboardSubject.asObservable();
  }

  public setFullMealClipboard(mealClipboard: Meal, mealToPaste: Meal): void {
    const clipboard = new MealClipboard(mealClipboard, mealToPaste);
    clipboard.setFullMeal();
    this.mealClipboardSubject.next(clipboard);
  }

  public setPartialMealClipboard(
    mealClipboard: Meal,
    mealToPaste: Meal,
    productIds: string[],
    recipeIds: string[]
  ): void {
    const clipboard = new MealClipboard(mealClipboard, mealToPaste);
    clipboard.setPartialSelection(productIds, recipeIds);
    this.mealClipboardSubject.next(clipboard);
  }

  public clearMealClipboard(): void {
    this.mealClipboardSubject.next(null);
  }

  public hasMealClipboard(): boolean {
    return !!this.mealClipboardSubject.value;
  }

  public searchAllWithFilters(
    searchFilterGroup: SearchFilterGroup,
    recentIds: string[] = []
  ): Observable<IProduct[]> {
    return this.mealAPIService.searchAllWithFilters(
      searchFilterGroup,
      recentIds
    );
  }

  public pasteMeal(
    mealClipboard: MealClipboard,
    merge?: boolean
  ): Observable<Meal> {
    return this.mealAPIService.pasteMeal(mealClipboard, merge);
  }

  public chooseAlternative(mealId: string, chosenIndex: number): Observable<Meal> {
    return this.mealAPIService.chooseAlternative(mealId, chosenIndex).pipe(take(1));
  }

  public modifyMeal(meal: Meal): Observable<Meal> {
    return this.mealAPIService.modifyMeal(meal).pipe(take(1));
  }

  public deleteMealProduct(
    idMeal: string,
    idProduct: string
  ): Observable<Meal> {
    return this.mealAPIService.deleteMealProduct(idMeal, idProduct);
  }

  public deleteMealCustomProducts(id: string): Observable<Meal> {
    return this.mealAPIService.deleteMealCustomProducts(id);
  }

  public deleteMealRecipes(id: string): Observable<Meal> {
    return this.mealAPIService.deleteMealRecipes(id);
  }

  public deleteMealCustomRecipe(
    mealId: string,
    customRecipeId: string
  ): Observable<Meal> {
    return this.mealAPIService.deleteMealCustomRecipe(
      mealId,
      customRecipeId
    );
  }

  public setCustomProductConsumed(
    mealId: string,
    customProductId: string,
    consumed: boolean
  ): Observable<Meal> {
    return this.mealAPIService.setCustomProductConsumed(mealId, customProductId, consumed);
  }

  public setCustomRecipeConsumed(
    mealId: string,
    customRecipeId: string,
    consumed: boolean
  ): Observable<Meal> {
    return this.mealAPIService.setCustomRecipeConsumed(mealId, customRecipeId, consumed);
  }

  public setCustomProductQuantity(
    mealId: string,
    customProductId: string,
    quantity: number
  ): Observable<Meal> {
    return this.mealAPIService.setCustomProductQuantity(mealId, customProductId, quantity);
  }

  public setCustomRecipeQuantity(
    mealId: string,
    customRecipeId: string,
    quantity: number
  ): Observable<Meal> {
    return this.mealAPIService.setCustomRecipeQuantity(mealId, customRecipeId, quantity);
  }
}