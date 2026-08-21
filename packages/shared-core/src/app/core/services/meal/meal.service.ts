import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { DietDay } from 'src/app/core/models/dietDay';
import { SearchFilterGroup } from 'src/app/shared/models/filterGroup';
import { MealClipboard } from 'src/app/shared/models/meal-clipboard';
import { Meal } from '../../models/meal';
import { IProduct } from '../../models/product';
import { MealAPIService } from './meal-api.service';

@Injectable()
export class MealService {
  private mealClipboardSubject = new BehaviorSubject<MealClipboard | null>(null);
  private _currentMeal$ = new BehaviorSubject<Meal>(null);

  constructor(private mealAPIService: MealAPIService) {}

  public get getCurrentMeal() {
    return this._currentMeal$.value;
  }

  public set setCurrentMeal(meal: Meal) {
    this._currentMeal$.next(meal);
  }

  public get getMealClipboard(): MealClipboard | null {
    return this.mealClipboardSubject.value;
  }

  public get mealClipboard$(): Observable<MealClipboard | null> {
    return this.mealClipboardSubject.asObservable();
  }

  public set setMealClipboard(mealClipboard: Meal) {
    this.mealClipboardSubject.next(new MealClipboard(mealClipboard, null));
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
    searchFilterGroup: SearchFilterGroup
  ): Observable<IProduct[]> {
    return this.mealAPIService.searchAllWithFilters(searchFilterGroup);
  }

  public pasteMeal(
    mealClipboard: MealClipboard,
    merge?: boolean
  ): Observable<Meal> {
    return this.mealAPIService.pasteMeal(mealClipboard, merge);
  }

  public updateMeal(meal: Meal): Observable<Meal> {
    return this.mealAPIService.updateMeal(meal).pipe(take(1));
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

  public addCustomRecipe(
    mealId: string,
    customRecipeId: string
  ): Observable<Meal> {
    return this.mealAPIService.addCustomRecipe(mealId, customRecipeId);
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

  public getMealIndex(meal: Meal, dietDay: DietDay) {
    return dietDay.meals.findIndex((mTemp) => mTemp.name === meal.name);
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
}