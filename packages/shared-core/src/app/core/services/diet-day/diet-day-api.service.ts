import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DateRange } from 'src/app/shared/models/dateRange';
import { CustomProduct } from '../../models/customProduct';
import { CustomRecipe } from '../../models/customRecipe';
import { DietDay, DietTimeline, PlannedTarget } from '../../models/dietDay';
import { Anthropometry } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';
import { User } from '../../models/user';
import { HttpService } from '../http/http.service';

@Injectable()
export class DietDayAPIService {
  private static readonly DIET_DAYS_ENDPOINT = 'dietdays';

  constructor(private http: HttpService) {}

  public getDietDayByIdDietAndDate(
    id: string,
    date: string
  ): Observable<{
    dietDay: DietDay;
    anthropometry: Anthropometry | null;
    plannedTarget?: PlannedTarget | null;
  }> {
    return this.http.post<{
      dietDay: DietDay;
      anthropometry: Anthropometry | null;
      plannedTarget?: PlannedTarget | null;
    }>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${id}`, { date });
  }

  // Fases y semanas del cliente en un rango, para el slider de días de la
  // pantalla de dieta.
  public getTimeline(from: string, to: string): Observable<DietTimeline> {
    return this.http.get<DietTimeline>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/timeline?from=${from}&to=${to}`);
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

  public createDietDay(dietDay: DietDay): Observable<DietDay> {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}`,
      dietDay
    );
  }

  public createDayWeightOnNewDietDay(
    dayWeight: number,
    dietInUseId: string,
    currentDate: string
  ) {
    return this.http.post<{ dietDay: DietDay; anthropometry: Anthropometry | null }>(
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
    currentDate: string,
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

  public createCustomRecipeOnNewDietDay(
    customRecipe: CustomRecipe,
    indexMeal: number,
    dietInUseId: string,
    currentDate: string
  ): Observable<DietDay> {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/create/recipe/new/${dietInUseId}`,
      {
        customRecipe,
        indexMeal,
        currentDate,
      }
    );
  }

  public addCustomRecipeToMeal(
    mealId: string,
    customRecipeId: string
  ): Observable<any> {
    return this.http.post<any>(`meals/${mealId}/customrecipes/${customRecipeId}`, {});
  }

  public removeCustomRecipeFromMeal(
    mealId: string,
    customRecipeId: string
  ): Observable<any> {
    return this.http.delete<any>(`meals/customrecipe/${mealId}/${customRecipeId}`);
  }
}
