import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DateRange } from 'src/app/shared/models/dateRange';
import { CustomProduct } from '../../models/customProduct';
import { DataRecipe } from '../../models/dataRecipe';
import { DietDay } from '../../models/dietDay';
import { User } from '../../models/user';
import { HttpService } from '../http/http.service';

@Injectable()
export class DietDayAPIService {
  private static readonly DIET_DAYS_ENDPOINT = 'dietdays';

  constructor(private http: HttpService) {}

  public getDietDayByIdDietAndDate(
    id: string,
    date: Date
  ): Observable<DietDay> {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${id}`,
      { date }
    );
  }

  public getDietDaysBetweenDatesByIdDiet(
    id: string,
    dateRage: DateRange
  ): Observable<DietDay[]> {
    return this.http.post<DietDay[]>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/between/${id}`,
      dateRage
    );
  }

  public getDietDaysWeightsBetweenDatesByIdDiet(
    id: string,
    dateRage: DateRange
  ): Observable<number[]> {
    return this.http.post<DietDay[]>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/weights/between/${id}`,
      dateRage
    );
  }

  public createDietDay(dietDay: DietDay): Observable<DietDay> {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}`,
      dietDay
    );
  }

  public createDayWeightOnNewDietDay(
    dayWeight: number,
    dietInUseId: string,
    currentDate: Date
  ) {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/create/on/new/${dietInUseId}`,
      {
        dayWeight,
        currentDate,
      }
    );
  }

  public createCustomProductOnNewDietDay(
    customProduct: CustomProduct,
    indexMeal: number,
    dietInUseId: string,
    currentDate: Date,
    idUser?: string
  ) {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/${dietInUseId}`,
      {
        customProduct,
        indexMeal,
        currentDate,
        idUser,
      }
    );
  }

  public updateDietDay(dietDay: DietDay): Observable<DietDay> {
    return this.http
      .put<DietDay>(
        `${DietDayAPIService.DIET_DAYS_ENDPOINT}/${dietDay._id}`,
        dietDay
      )
      .pipe(take(1));
  }

  public pasteDietDay(
    id: string,
    dietDayClipboard: DietDay,
    dietDayToPaste: DietDay
  ): Observable<DietDay> {
    return this.http.put<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/copy/paste/${id}`,
      {
        dietDayClipboard,
        dietDayToPaste,
      }
    );
  }

  // TODO: Debería devolver user o dietDay?
  public archiveDietDay(idUser: string, idDietDay: string): Observable<User> {
    return this.http.put<User>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/archive/dietday/on/user`,
      { idUser, idDietDay }
    );
  }

  public deleteDietDay(idDiet: string, idDietDay: string): Observable<DietDay> {
    return this.http.delete<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/${idDiet}/${idDietDay}`
    );
  }

  // DataRecipe methods
  public createDataRecipeOnNewDietDay(
    dataRecipe: DataRecipe,
    indexMeal: number,
    dietInUseId: string,
    currentDate: Date
  ): Observable<DietDay> {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/datarecipe/${dietInUseId}`,
      {
        dataRecipe,
        indexMeal,
        currentDate,
      }
    );
  }

  // CustomRecipeInstance methods
  public createCustomRecipeInstanceOnNewDietDay(
    customRecipeInstance: any,
    indexMeal: number,
    dietInUseId: string,
    currentDate: Date
  ): Observable<DietDay> {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/customrecipeinstance/${dietInUseId}`,
      {
        customRecipeInstance,
        indexMeal,
        currentDate,
      }
    );
  }

  public addDataRecipeToMeal(
    mealId: string,
    dataRecipeId: string
  ): Observable<any> {
    return this.http.post<any>(
      `meals/${mealId}/datarecipes/${dataRecipeId}`,
      {}
    );
  }

  public removeDataRecipeFromMeal(
    mealId: string,
    dataRecipeId: string
  ): Observable<any> {
    return this.http.delete<any>(`meals/${mealId}/datarecipes/${dataRecipeId}`);
  }
}
