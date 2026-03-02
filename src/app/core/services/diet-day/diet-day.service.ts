import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap, switchMap, of } from 'rxjs';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { DataRecipe } from 'src/app/core/models/dataRecipe';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { DateRange } from 'src/app/shared/models/dateRange';
import { MACROS_VALUES } from 'src/app/shared/models/macros-data';
import { DietDay } from '../../models/dietDay';
import { MEAL_TYPES, Meal } from '../../models/meal';
import { CustomProductService } from '../custom-product/custom-product.service';
import { DataRecipeService } from '../data-recipe/data-recipe.service';
import { ProductService } from '../product/product.service';
import { DietDayAPIService } from './diet-day-api.service';

@Injectable()
export class DietDayService {
  // TODO: Sustituir por BehaviourSubject
  public dietDayClipboard: DietDay;
  private _currentDietDay$ = new BehaviorSubject<DietDay>(null);
  public MEALS = MEAL_TYPES;
  public MACROS_VALUES = MACROS_VALUES;

  public get getDietDayClipboard() {
    return this.dietDayClipboard;
  }

  public set setDietDayClipboard(dietDayClipboard: DietDay) {
    this.dietDayClipboard = dietDayClipboard;
  }

  public get currentDietDay() {
    return this._currentDietDay$.value;
  }

  public get getCurrentDietDay() {
    return this._currentDietDay$.asObservable();
  }

  public set setCurrentDietDay(dietDay: DietDay) {
    this._currentDietDay$.next(dietDay);
  }

  constructor(
    private dietDayAPIService: DietDayAPIService,
    private productService: ProductService,
    private userService: UserService,
    private customProductService: CustomProductService,
    private dataRecipeService: DataRecipeService,
    private utilService: UtilService
  ) {}

  public getDietDayByIdDietAndDate(
    id: string,
    date: Date
  ): Observable<DietDay> {
    return this.dietDayAPIService.getDietDayByIdDietAndDate(id, date);
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
    currentDate: Date
  ) {
    return this.dietDayAPIService
      .createDayWeightOnNewDietDay(dayWeight, dietInUseId, currentDate)
      .pipe(take(1));
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

    if (!dietDay._id) this.utilService.setLoading = true;

    return this.createCustomProductOnDietDayMeal(
      customProduct,
      meal,
      dietDay,
      idDietInUse,
      idUser
    ).pipe(
      take(1),
      tap((resCustomProductOrDietDay) => {
        const mealIndex = dietDay.meals.findIndex(
          (mealTemp) => mealTemp.name == meal.name
        );
        // Devuelve customProduct
        if ('product' in resCustomProductOrDietDay) {
          dietDay.meals[mealIndex].customProducts.push(
            resCustomProductOrDietDay as CustomProduct
          );
          this.setCurrentDietDay = dietDay;
        }
        // Devuelve una dietDay
        else {
          this.setCurrentDietDay = resCustomProductOrDietDay as DietDay;
          this.utilService.setLoading = false;
        }

        // Refresca el usuario local
        this.userService
          .getUserByEmail(this.userService.getLocalUser.email)
          .pipe(take(1))
          .subscribe((resUser) => (this.userService.setLocalUser = resUser));

        loading.value = false;
      })
    );
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
    currentDate: Date,
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
        // Vaciar el currentDietDay local para evitar refresh y llamadas extra a la API
        // Garantizar que la fecha sea un objeto Date
        const dateRaw: any = this.currentDietDay?.date;
        const date: Date = dateRaw ? new Date(dateRaw) : new Date();
        const clearedDietDay = this.getStandardDietDay(date);
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

  /**
   * @deprecated Use CustomRecipeInstanceApiService directly instead
   * Create a DataRecipe and add it to a Meal
   * Similar pattern to createCustomProduct
   */
  public createDataRecipe(
    loading: any,
    dietDay: DietDay,
    dataRecipe: DataRecipe,
    meal: Meal,
    idDietInUse?: string
  ): Observable<any> {
    console.warn(
      'createDataRecipe is deprecated. Use CustomRecipeInstanceApiService instead'
    );
    loading.value = false;
    return of(dietDay);
  }

  /**
   * @deprecated Use CustomRecipeInstanceApiService directly instead
   */
  public createDataRecipeOnDietDayMeal(
    dataRecipe: DataRecipe,
    meal: Meal,
    dietDay: DietDay,
    idDietInUse?: string
  ): Observable<any> {
    console.warn('createDataRecipeOnDietDayMeal is deprecated');
    return of(dietDay);
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
        meal.customRecipeInstances?.reduce((total, instance) => {
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
        meal.customRecipeInstances?.reduce((total, instance) => {
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
        meal.customRecipeInstances?.reduce((total, instance) => {
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
        meal.customRecipeInstances?.reduce((total, instance) => {
          return total + this.calculateInstanceMacros(instance).fat;
        }, 0) || 0;
    });
    return fat;
  }

  public getStandardDietDay(date: Date) {
    let dietDay = new DietDay();
    dietDay.date = date;

    dietDay.meals = [];

    for (let i = 0; i < 6; i++) {
      let meal = new Meal();
      meal.name = MEAL_TYPES[i];
      meal.customProducts = [];
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

      const dietDay = dietDays.find(
        (dietDay) => new Date(dietDay.date).getDate() === date.getDate()
      );

      if (dietDay?._id) {
        if (!dietDay.weight) dietDay.weight = undefined;
        week.push(dietDay);
      } else {
        const newDietDay = new DietDay();
        newDietDay.date = date;
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

  private calculateInstanceMacros(instance: any): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    // Calcular macros de CustomRecipeInstance
    const dataRecipe =
      typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
    if (!dataRecipe) return { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    const recipe =
      typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
    if (!recipe || !recipe.customProducts)
      return { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    const overridesMap = new Map();
    if (instance.customProductsOverrides) {
      instance.customProductsOverrides.forEach((override: any) => {
        const id =
          typeof override.customProductId === 'string'
            ? override.customProductId
            : (override.customProductId as any)?._id ||
              override.customProductId;
        overridesMap.set(id, override);
      });
    }

    let totalMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    recipe.customProducts.forEach((cp: any) => {
      const cpId = typeof cp === 'string' ? cp : cp._id;
      const cpData = typeof cp === 'object' ? cp : null;
      if (!cpData) return;

      const override = overridesMap.get(cpId);
      if (override?.removed) return;

      const originalQuantity = override?.quantity ?? cpData.quantity;
      const scaleFactor = instance.quantity / 100;
      const scaledQuantity = originalQuantity * scaleFactor;

      const macros = this.customProductService.getMacros({
        ...cpData,
        quantity: scaledQuantity,
      });

      totalMacros.kcal += macros.kcal;
      totalMacros.protein += macros.protein;
      totalMacros.carbs += macros.carbs;
      totalMacros.fat += macros.fat;
    });

    if (instance.additionalCustomProducts) {
      instance.additionalCustomProducts.forEach((addCP: any) => {
        const scaleFactor = instance.quantity / 100;
        const scaledQuantity = addCP.quantity * scaleFactor;

        const macros = this.customProductService.getMacros({
          ...addCP,
          quantity: scaledQuantity,
        });

        totalMacros.kcal += macros.kcal;
        totalMacros.protein += macros.protein;
        totalMacros.carbs += macros.carbs;
        totalMacros.fat += macros.fat;
      });
    }

    return totalMacros;
  }
}
