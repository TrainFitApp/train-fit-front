import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DateRange } from 'src/app/shared/models/dateRange';
import { CustomProduct } from '../../models/customProduct';
import { DietDay, DietTimeline, DietWeek, PlannedTarget } from '../../models/dietDay';
import { Anthropometry } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';
import { HttpService } from '../http/http.service';

@Injectable()
export class DietDayAPIService {
  private static readonly DIET_DAYS_ENDPOINT = 'dietdays';

  constructor(private http: HttpService) {}

  // El día del usuario en esa fecha, con el plan ya aplicado (el backend lo
  // crea si no existe, sin duplicar nunca una fecha), su peso, la meta
  // pautada y la semana de la fase.
  public getDay(date: string): Observable<{
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
    }>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${date}`, {});
  }

  // Fases y semanas del cliente en un rango, para el slider de días de la
  // pantalla de dieta.
  public getTimeline(from: string, to: string): Observable<DietTimeline> {
    return this.http.get<DietTimeline>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/timeline?from=${from}&to=${to}`);
  }

  // Los días (con su peso) del usuario entre dos fechas "YYYY-MM-DD".
  public getDaysInRange(dateRange: DateRange): Observable<DietDay[]> {
    return this.http.get<DietDay[]>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/range?from=${dateRange.minDate}&to=${dateRange.maxDate}`
    );
  }

  // Añade el producto a la comida `mealIndex` del día `date` en UNA llamada:
  // el backend asegura el día (sin crear nunca un segundo en esa fecha).
  public addCustomProductToDay(
    date: string,
    mealIndex: number,
    customProduct: CustomProduct
  ): Observable<DietDay> {
    return this.http.post<DietDay>(
      `${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${date}/meals/${mealIndex}/customproducts`,
      { customProduct }
    );
  }

  // La nota del día, por fecha: el backend asegura el día en la misma llamada.
  public setDietDayNotes(date: string, notes: string): Observable<DietDay> {
    return this.http
      .put<DietDay>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${date}/notes`, { notes })
      .pipe(take(1));
  }

  // Pega sobre el día de `date` las comidas del portapapeles.
  public pasteDay(date: string, dietDayClipboard: DietDay): Observable<DietDay> {
    return this.http.put<DietDay>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${date}/paste`, {
      dietDayClipboard,
    });
  }

  public deleteDay(date: string): Observable<void> {
    return this.http.delete<void>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${date}`);
  }

  // Nota fijada de la pantalla de dieta.
  public setPinnedNote(notes: string): Observable<{ pinnedNote: string }> {
    return this.http.put<{ pinnedNote: string }>(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/pinned-note`, { notes });
  }
}
