import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DietDayService } from '../diet-day/diet-day.service';
import { ProductService } from '../product/product.service';
import { CustomProduct } from '../../models/customProduct';
import { Diet } from '../../models/diet';
import { HttpService } from '../http/http.service';

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

  public searchDiet(search: string, page: number) {
    return this.http
      .post<Diet[]>(`diets/search?page=${page}&limit=10`, { search })
      .pipe(
        map((resDiets) =>
          resDiets.map((dietTemp) => {
            dietTemp.kcalAverage = this.getDietAverageKcal(dietTemp);
            dietTemp.proteinsGAverage = this.getDietAverageProtein(dietTemp);
            dietTemp.carbohydratesGAverage =
              this.getDietAverageCarbohydrates(dietTemp);
            dietTemp.fatGAverage = this.getDietAverageFat(dietTemp);
            return dietTemp;
          })
        )
      );
  }

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

  createDiet(diet: Diet): Observable<Diet> {
    return this.http.post<Diet>(`diets`, diet);
  }

  addDietDietDay(idDiet: string, idDietDay: string): Observable<Diet> {
    return this.http.put<Diet>(`diets/${idDiet}/${idDietDay}`, null);
  }

  addDietUser(idUser: string, idDiet: string): Observable<any> {
    return this.http.put<Diet>(`diets/add/${idUser}/${idDiet}`, null);
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
