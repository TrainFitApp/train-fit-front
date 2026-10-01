import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DateRange } from 'src/app/shared/models/dateRange';
import { CustomProduct } from '../../models/customProduct';
import { CustomRecipe } from '../../models/customRecipe';
import { DietDay, DietTimeline, DietWeek, PlannedTarget } from '../../models/dietDay';
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
    week?: DietWeek | null;
  }> {
    return this.http.post<{
      dietDay: DietDay;
      anthropometry: Anthropometry | null;
      plannedTarget?: PlannedTarget | null;
      week?: DietWeek | null;
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

  // Estrena el día de `currentDate` Y añade el producto, en UNA llamada: el
  // backend asegura el día (sin crear nunca un segundo en esa fecha) y mete el
  // producto en el hueco `indexMeal` dentro de la misma petición.
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

  // La nota del día, en una sola llamada y sin necesitar el _id: el backend
  // resuelve el día por (dueño del token, fecha) y lo crea si esa fecha
  // todavía no tenía día. Antes había que crear el día aparte y luego
  // escribir la nota — y si el día ya existía en BD pero la app no lo tenía
  // con _id, aquello creaba un día duplicado en la misma fecha.
  public setDietDayNotes(date: string, notes: string): Observable<DietDay> {
    return this.http
      .put<DietDay>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${date}`, {
        notes,
      })
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
