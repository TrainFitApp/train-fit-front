import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { DietDay } from 'src/app/core/models/dietDay';
import { DayTypeStatus } from '../models/day-type.model';

// Fase 9 — mismo patrón que meal-proposal-api.service.ts (F28): un servicio
// pequeño y dedicado, sin lógica de negocio, junto al modelo que expone.
@Injectable({ providedIn: 'root' })
export class DayTypeApiService {
  constructor(private http: HttpService) {}

  public getForDate(date: string): Observable<DayTypeStatus> {
    return this.http.get<DayTypeStatus>(`dietdays/date/${date}/day-type`);
  }

  public choose(date: string, patternName: string): Observable<DietDay> {
    return this.http.put<DietDay>(`dietdays/date/${date}/day-type`, { patternName });
  }

  // Ciclos por contenido — "salir del menú": el día vuelve a quedar sin
  // menú; se quita lo pautado (y sus marcas), lo anotado a mano se queda.
  public leave(date: string): Observable<DietDay> {
    return this.http.delete<DietDay>(`dietdays/date/${date}/day-type`);
  }
}
