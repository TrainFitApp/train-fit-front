import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DietDayService } from '../diet-day/diet-day.service';
import { ProductService } from '../product/product.service';
import { CustomProduct } from '../../models/customProduct';
import { Diet } from '../../models/diet';
import { HttpService } from '../http/http.service';

export type RecentFoodKind = 'product' | 'recipe';

@Injectable()
export class DietService {
  private _currentDiet$: BehaviorSubject<Diet> = new BehaviorSubject<Diet>(
    null
  );

  public get getCurrentDiet() {
    return this._currentDiet$.asObservable();
  }

  public set setCurrentDiet(diet: Diet) {
    this._currentDiet$.next(diet);
  }

  constructor(
    private http: HttpService,
    private httpClient: HttpClient,
    private productService: ProductService,
    private dietDayService: DietDayService
  ) {}

  getDietById(id: number): Observable<Diet> {
    return this.http.get<Diet>(`diets/${id}`);
  }

  getRecentMealProducts(
    dietId: string,
    mealIndex: number,
    options: {
      limit?: number;
    } = {}
  ): Observable<CustomProduct[]> {
    const params = new URLSearchParams({
      mealIndex: String(mealIndex),
      limit: String(options.limit || 15),
    });

    return this.http.get<CustomProduct[]>(
      `diets/${dietId}/recent-products?${params.toString()}`
    );
  }

  getRecentMealRecipes(
    dietId: string,
    mealIndex: number,
    options: {
      limit?: number;
    } = {}
  ): Observable<any[]> {
    const params = new URLSearchParams({
      mealIndex: String(mealIndex),
      limit: String(options.limit || 15),
    });

    return this.http.get<any[]>(
      `diets/${dietId}/recent-recipes?${params.toString()}`
    );
  }

  // Ocultar recientes del buscador de una comida (por posición, como el
  // cálculo de recientes). Los recientes salen del historial, así que no se
  // borran: se dejan de mostrar hasta que se vuelvan a añadir. Siempre del
  // usuario autenticado.
  hideRecentFoods(body: {
    mealIndex: number;
    kind: RecentFoodKind;
    ids?: string[];
    all?: boolean;
  }): Observable<{ success: boolean }> {
    return this.http.post('recent-foods/hidden', body);
  }

  restoreRecentFoods(body: {
    mealIndex: number;
    kind: RecentFoodKind;
    ids: string[];
  }): Observable<{ success: boolean }> {
    return this.http.post('recent-foods/hidden/restore', body);
  }

  getDietAverageKcal(diet: Diet) {
    let kcal = 0;

    diet.dietsDay.forEach((dietDayTemp) => {
      kcal += this.dietDayService.getDietDayKcal(dietDayTemp);
    });

    return kcal / diet.dietsDay.length;
  }

  getDietAverageProtein(diet: Diet) {
    let proteinG = 0;

    diet.dietsDay.forEach((dietDayTemp) => {
      proteinG += this.dietDayService.getDietDayKcal(dietDayTemp) / 4;
    });

    return proteinG / (diet.dietsDay.length + 1);
  }

  getDietAverageCarbohydrates(diet: Diet) {
    let kcal = 0;

    diet.dietsDay.forEach((dietDayTemp) => {
      dietDayTemp.meals.forEach((mealTemp) => {
        mealTemp.customProducts.forEach((productTemp) => {
          kcal += this.productService.getProductKcal(productTemp);
        });
      });
    });

    return kcal;
  }

  getDietAverageFat(diet: Diet) {
    let kcal = 0;

    diet.dietsDay.forEach((dietDayTemp) => {
      dietDayTemp.meals.forEach((mealTemp) => {
        mealTemp.customProducts.forEach((productTemp) => {
          kcal += this.productService.getProductKcal(productTemp);
        });
      });
    });

    return kcal;
  }

  public getStandarDiet() {
    // let mealNames = ["Desayuno", "Almuerzo", "Comida", "Merienda", "Cena", "Recena"];

    // let meals: Meal[] = [];

    // for (let i = 0; i < 6; i++) {
    //   let meal = new Meal();
    //   meal.name = mealNames[i];
    //   meal.customProducts = [];
    //   meals.push(meal);
    // }

    // let dietDay = new DietDay();
    // dietDay.date = new Date();
    // dietDay.name = "Diet Day";
    // dietDay.meals = [];

    let diet = new Diet();
    diet.name = 'Diet';
    diet.dietsDay = [];

    return diet;
  }

  public updatePinnedNote(dietId: string, notes: string): Observable<Diet> {
    return this.http.patch<Diet>(`diets/${dietId}/pinned-note`, { notes });
  }
}
