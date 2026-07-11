import { Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, take, tap, map, of } from 'rxjs';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { IProduct } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/user';
import { UtilService } from 'src/app/core/services/util/util.service';
import { DateRange } from 'src/app/shared/models/dateRange';
import { MACROS_VALUES } from 'src/app/shared/models/macros-data';
import { DietDay } from '../../models/dietDay';
import { MEAL_TYPES, Meal } from '../../models/meal';
import { CustomProductService } from '../custom-product/custom-product.service';
import { CustomRecipe } from '../../models/customRecipe';
import { RecipeService } from '../recipe/recipe.service';
import { DietDayAPIService } from './diet-day-api.service';
import { Recipe } from '../../models/recipe';
import { Anthropometry } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';

@Injectable()
export class DietDayService {
  public dietDayClipboard: DietDay;
  private readonly _currentDietDay: WritableSignal<DietDay | null> =
    signal<DietDay | null>(null);
  private readonly _currentDietDay$ = toObservable(this._currentDietDay);
  public MEALS = MEAL_TYPES;
  public MACROS_VALUES = MACROS_VALUES;

  public get getDietDayClipboard() {
    return this.dietDayClipboard;
  }

  public set setDietDayClipboard(dietDayClipboard: DietDay) {
    this.dietDayClipboard = dietDayClipboard;
  }

  public get currentDietDay() {
    return this._currentDietDay();
  }

  public get getCurrentDietDay() {
    return this._currentDietDay$;
  }

  public set setCurrentDietDay(dietDay: DietDay) {
    this._currentDietDay.set(dietDay);
  }

  constructor(
    private dietDayAPIService: DietDayAPIService,
    private customProductService: CustomProductService,
    private utilService: UtilService,
    private recipeService: RecipeService
  ) {}

  public getDietDayByIdDietAndDate(
    id: string,
    date: string
  ): Observable<DietDay> {
    return this.dietDayAPIService.getDietDayByIdDietAndDate(id, date).pipe(
      map((response: { dietDay: DietDay; anthropometry: any }) => {
        // If anthropometry has weight, set it on the dietDay for backwards compatibility
        if (response?.dietDay && response?.anthropometry?.weight !== undefined) {
          response.dietDay.weight = response.anthropometry.weight;
        }
        return response.dietDay;
      })
    );
  }

  public getDietDaysBetweenDatesByIdDiet(
    id: string,
    dateRage: DateRange
  ): Observable<DietDay[]> {
    return this.dietDayAPIService.getDietDaysBetweenDatesByIdDiet(id, dateRage);
  }

  public getDietDaysWeightsBetweenDatesByIdDiet(
    id: string,
    dateRage: DateRange
  ): Observable<number[]> {
    return this.dietDayAPIService.getDietDaysWeightsBetweenDatesByIdDiet(
      id,
      dateRage
    );
  }

  public createDietDay(dietDay: DietDay): Observable<DietDay> {
    return this.dietDayAPIService.createDietDay(dietDay);
  }

  public createDayWeightOnNewDietDay(
    dayWeight: number,
    dietInUseId: string,
    currentDate: string
  ) {
    return this.dietDayAPIService
      .createDayWeightOnNewDietDay(dayWeight, dietInUseId, currentDate)
      .pipe(
        take(1),
        map((response: { dietDay: DietDay; anthropometry: Anthropometry | null }) => {
          if (response?.anthropometry?.weight !== undefined) {
            response.dietDay.weight = response.anthropometry.weight;
          }
          return response.dietDay;
        })
      );
  }

  public createCustomProduct(
    loading: any,
    dietDay: DietDay,
    customProduct: CustomProduct,
    meal: Meal,
    idDietInUse?: string,
    idUser?: string
  ): Observable<CustomProduct | DietDay> {
    loading.value = true;

    if (!dietDay._id) {
      this.utilService.setLoading = true;
    }

    return this.createCustomProductOnDietDayMeal(
      customProduct,
      meal,
      dietDay,
      idDietInUse,
      idUser
    ).pipe(
      take(1),
      tap((response) => {
        this.applyCustomProductResponseToLocalState(response, dietDay, meal);
        loading.value = false;
      })
    );
  }

  private applyCustomProductResponseToLocalState(
    response: CustomProduct | DietDay,
    dietDay: DietDay,
    meal: Meal
  ): void {
    if (this.isCustomProductResponse(response)) {
      const updatedDietDay = this.addCreatedCustomProductToMeal(
        dietDay,
        meal,
        response
      );
      this.setCurrentDietDay = updatedDietDay;
      return;
    }

    this.setCurrentDietDay = response;
    this.utilService.setLoading = false;
  }

  private isCustomProductResponse(
    response: CustomProduct | DietDay
  ): response is CustomProduct {
    return !!response && 'product' in response;
  }

  private addCreatedCustomProductToMeal(
    dietDay: DietDay,
    meal: Meal,
    customProduct: CustomProduct
  ): DietDay {
    const mealIndex = dietDay.meals.findIndex(
      (mealTemp) => mealTemp.name === meal.name
    );

    if (mealIndex === -1) {
      return dietDay;
    }

    const targetMeal = dietDay.meals[mealIndex];
    targetMeal.customProducts = targetMeal.customProducts || [];
    targetMeal.customProducts.push(customProduct);

    return { ...dietDay };
  }

  public updateCustomProduct(
    customProduct: CustomProduct,
    meal: Meal,
    dietDay: DietDay
  ) {
    this.customProductService
      .updateCustomProduct(customProduct)
      .pipe(take(1))
      .subscribe((resCustomProduct) => {
        const indexMeal = dietDay.meals.findIndex(
          (mealTemp) => mealTemp._id === meal._id
        );
        const indexProduct = dietDay.meals[indexMeal].customProducts.findIndex(
          (customProductTemp) => customProductTemp._id === customProduct._id
        );

        dietDay.meals[indexMeal].customProducts[indexProduct] =
          resCustomProduct;

        this.setCurrentDietDay = dietDay;
      });
  }

  public createCustomProductOnNewDietDay(
    customProduct: CustomProduct,
    indexMeal: number,
    dietInUseId: string,
    currentDate: string,
    idUser?: string
  ) {
    return this.dietDayAPIService.createCustomProductOnNewDietDay(
      customProduct,
      indexMeal,
      dietInUseId,
      currentDate,
      idUser
    );
  }

  public updateDietDay(dietDay: DietDay): Observable<DietDay> {
    return this.dietDayAPIService.updateDietDay(dietDay);
  }

  public pasteDietDay(
    id: string,
    dietDayClipboard: DietDay,
    dietDayToPaste: DietDay
  ): Observable<DietDay> {
    return this.dietDayAPIService
      .pasteDietDay(id, dietDayClipboard, dietDayToPaste)
      .pipe(take(1));
  }

  public archiveDietDay(idUser: string, idDietDay: string): Observable<User> {
    return this.dietDayAPIService.archiveDietDay(idUser, idDietDay);
  }

  public deleteDietDay(idDiet: string, idDietDay: string): Observable<DietDay> {
    return this.dietDayAPIService.deleteDietDay(idDiet, idDietDay).pipe(
      take(1),
      tap(() => {
        const dateStr: string = this.currentDietDay?.date || this.utilService.formatDateToYYYYMMDD(new Date());
        const clearedDietDay = this.getStandardDietDay(dateStr);
        this.setCurrentDietDay = clearedDietDay;
        this.utilService.setUnselected = true;
      })
    );
  }

  public createCustomProductOnDietDayMeal(
    customProduct: CustomProduct,
    meal: Meal,
    dietDay: DietDay,
    idDietInUse?: string,
    idUser?: string
  ): Observable<CustomProduct | DietDay> {
    let createCustomProductOnDietDayMeal$: Observable<CustomProduct | DietDay>;

    if (dietDay._id) {
      createCustomProductOnDietDayMeal$ =
        this.customProductService.createCustomProductAndAddToMeal(
          meal._id,
          customProduct,
          idUser
        );
    } else {
      createCustomProductOnDietDayMeal$ = this.createCustomProductOnNewDietDay(
        customProduct,
        dietDay.meals.findIndex((mealTemp) => mealTemp.name === meal.name),
        idDietInUse,
        dietDay.date,
        idUser
      );
    }
    return createCustomProductOnDietDayMeal$;
  }

  public syncUpdatedProductInCurrentDietDay(updatedProduct: IProduct): boolean {
    if (!updatedProduct?._id) {
      return false;
    }

    const currentDietDay = this.currentDietDay;
    if (!currentDietDay?.meals?.length) {
      return false;
    }

    const productId = updatedProduct._id;
    let hasChanges = false;

    const getProductId = (productRef: any): string | null => {
      if (!productRef) return null;
      if (typeof productRef === 'string') return productRef;
      return productRef._id || null;
    };

    currentDietDay.meals.forEach((meal) => {
      if (Array.isArray(meal.customProducts)) {
        meal.customProducts.forEach((customProduct: CustomProduct) => {
          const customProductProductId = getProductId(customProduct?.product);
          if (customProductProductId === productId) {
            customProduct.product = { ...updatedProduct } as IProduct;
            hasChanges = true;
          }
        });
      }

      if (Array.isArray((meal as any).customRecipes)) {
        (meal as any).customRecipes.forEach((instance: any) => {
          if (!instance) return;

          if (Array.isArray(instance.addedCustomProducts)) {
            instance.addedCustomProducts.forEach((additionalCp: any) => {
              const addProductId = getProductId(additionalCp?.product);
              if (addProductId === productId) {
                additionalCp.product = { ...updatedProduct };
                hasChanges = true;
              }
            });
          }

          const recipe =
            typeof instance.recipe === 'object' ? instance.recipe : null;

          if (recipe && Array.isArray(recipe.customProducts)) {
            recipe.customProducts.forEach((recipeCp: any) => {
              const recipeProductId = getProductId(recipeCp?.product);
              if (recipeProductId === productId) {
                recipeCp.product = { ...updatedProduct };
                hasChanges = true;
              }
            });
          }
        });
      }
    });

    if (hasChanges) {
      this.setCurrentDietDay = { ...currentDietDay };
    }

    return hasChanges;
  }

  public syncUpdatedRecipeInCurrentDietDay(
    updatedRecipe: Recipe
  ): DietDay | null {
    if (!updatedRecipe?._id) {
      return null;
    }

    const currentDietDay = this.currentDietDay;
    if (!currentDietDay?.meals?.length) {
      return null;
    }

    const recipeId = updatedRecipe._id.toString();
    let hasChanges = false;

    const nextMeals = currentDietDay.meals.map((meal) => {
      const customRecipes = meal.customRecipes || [];
      let mealChanged = false;

      const nextCustomRecipes = customRecipes.map((customRecipe: CustomRecipe) => {
        const recipeRef = customRecipe?.recipe;
        const currentRecipe =
          recipeRef && typeof recipeRef === 'object' ? recipeRef : null;
        const currentRecipeId = this.getRecipeId(recipeRef);

        if (!currentRecipeId || currentRecipeId !== recipeId) {
          return customRecipe;
        }

        hasChanges = true;
        mealChanged = true;

        if (currentRecipe) {
          Object.assign(currentRecipe, updatedRecipe);
        }

        return {
          ...customRecipe,
          recipe: {
            ...(currentRecipe || {}),
            ...updatedRecipe,
          },
        };
      });

      return mealChanged ? { ...meal, customRecipes: nextCustomRecipes } : meal;
    });

    if (!hasChanges) {
      return null;
    }

    const updatedDietDay = {
      ...currentDietDay,
      meals: nextMeals,
    };
    this.setCurrentDietDay = updatedDietDay;
    return updatedDietDay;
  }

  private getRecipeId(recipeRef: Recipe | string | any): string | null {
    if (!recipeRef) return null;
    if (typeof recipeRef === 'string') return recipeRef;
    return recipeRef?._id?.toString?.() || recipeRef?.toString?.() || null;
  }

  public getDietDayKcal(dietDay: DietDay): number {
    let kcal = 0;
    dietDay.meals?.forEach((meal) => {
      // Sum products
      kcal +=
        meal.customProducts?.reduce((total, cp) => {
          return total + this.customProductService.getMacros(cp).kcal;
        }, 0) || 0;

      // Sum recipes
      kcal +=
        meal.customRecipes?.reduce((total, instance) => {
          return total + this.calculateInstanceMacros(instance).kcal;
        }, 0) || 0;
    });
    return kcal;
  }

  public getDietDayProteins(dietDay: DietDay): number {
    let protein = 0;
    dietDay.meals?.forEach((meal) => {
      protein +=
        meal.customProducts?.reduce((total, cp) => {
          return total + this.customProductService.getMacros(cp).protein;
        }, 0) || 0;

      protein +=
        meal.customRecipes?.reduce((total, instance) => {
          return total + this.calculateInstanceMacros(instance).protein;
        }, 0) || 0;
    });
    return protein;
  }

  public getDietDayCarbohydrates(dietDay: DietDay): number {
    let carbs = 0;
    dietDay.meals?.forEach((meal) => {
      carbs +=
        meal.customProducts?.reduce((total, cp) => {
          return total + this.customProductService.getMacros(cp).carbs;
        }, 0) || 0;

      carbs +=
        meal.customRecipes?.reduce((total, instance) => {
          return total + this.calculateInstanceMacros(instance).carbs;
        }, 0) || 0;
    });
    return carbs;
  }

  public getDietDayFat(dietDay: DietDay): number {
    let fat = 0;
    dietDay.meals?.forEach((meal) => {
      fat +=
        meal.customProducts?.reduce((total, cp) => {
          return total + this.customProductService.getMacros(cp).fat;
        }, 0) || 0;

      fat +=
        meal.customRecipes?.reduce((total, instance) => {
          return total + this.calculateInstanceMacros(instance).fat;
        }, 0) || 0;
    });
    return fat;
  }

  public getStandardDietDay(date: string) {
    let dietDay = new DietDay();
    dietDay.date = date;

    dietDay.meals = [];

    for (let i = 0; i < 6; i++) {
      let meal = new Meal();
      meal.name = MEAL_TYPES[i];
      meal.customProducts = [];
      meal.customRecipes = [];
      dietDay.meals.push(meal);
    }

    return dietDay;
  }

  public getWeek(firstWeekDay: Date, dietDays: DietDay[]) {
    let week: DietDay[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(
        new Date(firstWeekDay).setDate(new Date(firstWeekDay).getDate() + i)
      );
      const dateStr = this.utilService.formatDateToYYYYMMDD(date);

      const dietDay = dietDays.find(
        (dietDay) => dietDay.date === dateStr
      );

      if (dietDay?._id) {
        if (!dietDay.weight) dietDay.weight = undefined;
        week.push(dietDay);
      } else {
        const newDietDay = new DietDay();
        newDietDay.date = dateStr;
        newDietDay.weight = undefined;
        week.push(newDietDay);
      }
    }

    return week;
  }

  public getWeekWeightAverage(dietsDay: DietDay[]): number {
    let sumWeights = 0;
    let sumDaysWithWeight = 0;
    dietsDay.forEach((dietDay) => {
      if (dietDay.weight) {
        sumWeights += dietDay.weight;
        sumDaysWithWeight++;
      }
    });

    return sumWeights / sumDaysWithWeight;
  }

  public getRecipeInstancePortionRatio(instance: any): number {
    const recipe =
      typeof instance.recipe === 'object' ? instance.recipe : null;
    if (!recipe) return 0;

    const totals = this.recipeService.calculateCustomRecipeTotals(recipe, instance);
    return totals.portionRatio;
  }

  private calculateInstanceMacros(instance: any): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    const recipe =
      typeof instance.recipe === 'object' ? instance.recipe : null;
    if (!recipe)
      return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    return this.recipeService.calculateCustomRecipeTotals(recipe, instance).portionMacros;
  }
}
