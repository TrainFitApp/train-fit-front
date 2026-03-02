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
  private mealClipboard: Meal;
  private _currentMeal$ = new BehaviorSubject<Meal>(null);

  constructor(private mealAPIService: MealAPIService) {}

  public get getCurrentMeal() {
    return this._currentMeal$.value;
  }

  public set setCurrentMeal(meal: Meal) {
    this._currentMeal$.next(meal);
  }

  public get getMealClipboard() {
    return this.mealClipboard;
  }

  public set setMealClipboard(mealClipboard: Meal) {
    this.mealClipboard = mealClipboard;
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

  public deleteMealRecipeInstances(id: string): Observable<Meal> {
    return this.mealAPIService.deleteMealRecipeInstances(id);
  }

  public addCustomRecipeInstance(
    mealId: string,
    instanceId: string
  ): Observable<Meal> {
    return this.mealAPIService.addCustomRecipeInstance(mealId, instanceId);
  }

  public deleteMealCustomRecipeInstance(
    mealId: string,
    instanceId: string
  ): Observable<Meal> {
    return this.mealAPIService.deleteMealCustomRecipeInstance(
      mealId,
      instanceId
    );
  }

  public getMealIndex(meal: Meal, dietDay: DietDay) {
    return dietDay.meals.findIndex((mTemp) => mTemp.name === meal.name);
  }
}
