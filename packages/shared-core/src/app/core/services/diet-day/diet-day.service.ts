import { Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, take, tap, map, of, defer, finalize, shareReplay, switchMap } from 'rxjs';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { IProduct } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/user';
import { UtilService } from 'src/app/core/services/util/util.service';
import { DateRange } from 'src/app/shared/models/dateRange';
import { MACROS_VALUES } from 'src/app/shared/models/macros-data';
import { DietDay, DietTimeline } from '../../models/dietDay';
import { MEAL_TYPES, Meal } from '../../models/meal';
import { CustomProductService } from '../custom-product/custom-product.service';
import { CustomRecipe } from '../../models/customRecipe';
import { RecipeService } from '../recipe/recipe.service';
import { DietDayAPIService } from './diet-day-api.service';
import { Recipe } from '../../models/recipe';

@Injectable()
export class DietDayService {
  public dietDayClipboard: DietDay;
  private readonly _currentDietDay: WritableSignal<DietDay | null> =
    signal<DietDay | null>(null);
  private readonly _currentDietDay$ = toObservable(this._currentDietDay);
  // Un día que todavía no está en base de datos se "estrena" con la primera
  // escritura, y es esa misma petición la que lo crea (una sola llamada: el
  // backend asegura el día y añade el alimento). Mientras está en vuelo,
  // cualquier otra escritura sobre la MISMA fecha espera a que termine y
  // escribe sobre el día ya creado, en vez de lanzar su propia creación: era
  // eso lo que dejaba dos DietDay solapados en la misma fecha (dos checkbox
  // seguidos del buscador de alimentos).
  private readonly _creatingDietDayDate: WritableSignal<string | null> =
    signal<string | null>(null);
  private dietDayCreation$: Observable<DietDay> | null = null;
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

  // ¿Se está creando ahora mismo el día de esta fecha? Las tarjetas de
  // alimento lo usan para deshabilitar sus checkbox mientras el día no existe
  // (ver ProductComponent#isBusy / RecipeCardComponent#isBusy). Sin `date`,
  // responde por cualquier fecha.
  public isCreatingDietDay(date?: string): boolean {
    const creating = this._creatingDietDayDate();
    return !!creating && (!date || creating === date);
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
      map((response) => {
        // If anthropometry has weight, set it on the dietDay for backwards compatibility
        if (response?.dietDay && response?.anthropometry?.weight !== undefined) {
          response.dietDay.weight = response.anthropometry.weight;
        }
        // La meta del día (lo pautado) viaja junto al día para que
        // macros-bars la lea de aquí, sin otra petición.
        if (response?.dietDay) {
          response.dietDay.plannedTarget = response.plannedTarget ?? null;
          response.dietDay.week = response.week ?? null;
        }
        return response.dietDay;
      })
    );
  }

  // Fases y semanas del cliente en un rango.
  public getTimeline(from: string, to: string): Observable<DietTimeline> {
    return this.dietDayAPIService.getTimeline(from, to);
  }

  public getDietDaysBetweenDatesByIdDiet(
    id: string,
    dateRage: DateRange
  ): Observable<DietDay[]> {
    return this.dietDayAPIService.getDietDaysBetweenDatesByIdDiet(id, dateRage);
  }

  // "Asegúrame el día de esta fecha". El backend es idempotente (nunca crea un
  // segundo día para la misma fecha), y aquí se registra además como la
  // creación en vuelo de esa fecha para que el resto de escrituras la esperen
  // en lugar de pedir otra.
  public createDietDay(dietDay: DietDay): Observable<DietDay> {
    return (
      this.pendingDietDayCreation(dietDay.date) ||
      this.trackDietDayCreation(
        dietDay.date,
        this.dietDayAPIService.createDietDay(dietDay)
      )
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
      }),
      // También si falla: el loading global deshabilita los checkbox de todas
      // las tarjetas, así que dejarlo encendido tras un error congelaría el
      // buscador entero.
      finalize(() => {
        loading.value = false;
        this.utilService.setLoading = false;
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
  }

  // Se mira `meals` (el día) y no `product` (el producto): una adición rápida
  // es un CustomProduct SIN `product`, así que discriminar por ahí la tomaba
  // por un DietDay y publicaba el producto suelto como día actual.
  private isCustomProductResponse(
    response: CustomProduct | DietDay
  ): response is CustomProduct {
    return !!response && !('meals' in response);
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

  // La nota del día. Va por fecha, no por _id: así funciona igual sobre un día
  // que todavía no existe (el backend lo asegura en la misma llamada) y no hay
  // ninguna vía en la que la app pueda pedir "crear un día" por su cuenta.
  public updateDietDay(dietDay: DietDay): Observable<DietDay> {
    // `defer` porque hay llamadores (NotesComponent) que construyen el
    // observable primero y escriben la nota en el objeto justo antes de
    // suscribirse: la nota se lee al suscribir, no al construir.
    return defer(() =>
      this.dietDayAPIService.setDietDayNotes(dietDay.date, dietDay.notes || '')
    ).pipe(tap((updated) => (this.setCurrentDietDay = updated)));
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
    if (dietDay._id) {
      return this.customProductService.createCustomProductAndAddToMeal(
        meal._id,
        customProduct,
        idUser
      );
    }

    const indexMeal = dietDay.meals.findIndex(
      (mealTemp) => mealTemp.name === meal.name
    );

    // Ya se está creando el día de esta fecha: esperamos a esa creación y
    // añadimos el producto a la comida REAL del día que devuelva, en vez de
    // pedir otra creación para la misma fecha.
    const pendingCreation$ = this.pendingDietDayCreation(dietDay.date);
    if (pendingCreation$) {
      return pendingCreation$.pipe(
        switchMap((createdDietDay) => {
          const createdMeal = createdDietDay?.meals?.[indexMeal];
          if (!createdMeal?._id) {
            // El día no llegó: se reintenta por la vía de una sola llamada,
            // que es idempotente en el backend y no puede duplicar la fecha.
            return this.createCustomProductOnNewDietDay(
              customProduct,
              indexMeal,
              idDietInUse,
              dietDay.date,
              idUser
            );
          }

          return this.customProductService
            .createCustomProductAndAddToMeal(
              createdMeal._id,
              customProduct,
              idUser
            )
            // Se devuelve el DÍA ya creado con el producto dentro, no el
            // producto suelto: el `dietDay` con el que entró esta llamada es
            // el de antes de la creación (sin _id) y publicarlo como día
            // actual desharía el día recién creado.
            .pipe(
              map((created) =>
                this.addCreatedCustomProductToMeal(
                  createdDietDay,
                  createdMeal,
                  created
                )
              )
            );
        })
      );
    }

    return this.trackDietDayCreation(
      dietDay.date,
      this.createCustomProductOnNewDietDay(
        customProduct,
        indexMeal,
        idDietInUse,
        dietDay.date,
        idUser
      )
    );
  }

  // La creación del día de `date` que haya en vuelo, o null si no hay ninguna.
  public pendingDietDayCreation(date: string): Observable<DietDay> | null {
    return this.isCreatingDietDay(date) ? this.dietDayCreation$ : null;
  }

  // Marca la petición que está estrenando el día de `date` para que el resto de
  // escrituras de esa fecha la esperen en vez de duplicarla. `shareReplay` para
  // que quien llegue tarde reciba el día ya creado sin relanzar nada, y
  // suscripción propia para que la puerta se abra (y el día quede publicado)
  // aunque quien la pidió se desuscriba antes — si no, un checkbox cancelado a
  // media petición dejaría todas las tarjetas deshabilitadas.
  public trackDietDayCreation(
    date: string,
    creation$: Observable<DietDay>
  ): Observable<DietDay> {
    const tracked$ = creation$.pipe(
      take(1),
      finalize(() => {
        this.dietDayCreation$ = null;
        this._creatingDietDayDate.set(null);
      }),
      shareReplay({ bufferSize: 1, refCount: false })
    );

    this.dietDayCreation$ = tracked$;
    this._creatingDietDayDate.set(date);
    tracked$.subscribe({ error: () => undefined });

    return tracked$;
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

  // Lo pautado por el trainer solo cuenta como ingesta cuando el cliente lo
  // marca como consumido; lo que añade por su cuenta suma siempre.
  private countsAsIntake(item: { assignedByTrainerId?: string | null; consumed?: boolean }): boolean {
    return !item.assignedByTrainerId || !!item.consumed;
  }

  public getDietDayKcal(dietDay: DietDay): number {
    let kcal = 0;
    dietDay.meals?.forEach((meal) => {
      // Sum products
      kcal +=
        meal.customProducts?.reduce((total, cp) => {
          if (!this.countsAsIntake(cp)) return total;
          return total + this.customProductService.getMacros(cp).kcal;
        }, 0) || 0;

      // Sum recipes
      kcal +=
        meal.customRecipes?.reduce((total, instance) => {
          if (!this.countsAsIntake(instance)) return total;
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
          if (!this.countsAsIntake(cp)) return total;
          return total + this.customProductService.getMacros(cp).protein;
        }, 0) || 0;

      protein +=
        meal.customRecipes?.reduce((total, instance) => {
          if (!this.countsAsIntake(instance)) return total;
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
          if (!this.countsAsIntake(cp)) return total;
          return total + this.customProductService.getMacros(cp).carbs;
        }, 0) || 0;

      carbs +=
        meal.customRecipes?.reduce((total, instance) => {
          if (!this.countsAsIntake(instance)) return total;
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
          if (!this.countsAsIntake(cp)) return total;
          return total + this.customProductService.getMacros(cp).fat;
        }, 0) || 0;

      fat +=
        meal.customRecipes?.reduce((total, instance) => {
          if (!this.countsAsIntake(instance)) return total;
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
