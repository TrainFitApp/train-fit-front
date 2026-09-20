import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { DietDay } from 'src/app/core/models/dietDay';
import { DayMenuStatus } from '../models/day-menu.model';

// Mismo patrón que meal-proposal-api.service.ts (F28): un servicio pequeño y
// dedicado, sin lógica de negocio, junto al modelo que expone.
@Injectable({ providedIn: 'root' })
export class DayMenuApiService {
  constructor(private http: HttpService) {}

  public getForDate(date: string): Observable<DayMenuStatus> {
    return this.http.get<DayMenuStatus>(`dietdays/date/${date}/menu`);
  }

  public choose(date: string, menuName: string): Observable<DietDay> {
    return this.http.put<DietDay>(`dietdays/date/${date}/menu`, { menuName });
  }

  // "Salir del menú": el día vuelve a quedar sin menú; se quita lo pautado
  // (y sus marcas), lo anotado a mano se queda.
  public leave(date: string): Observable<DietDay> {
    return this.http.delete<DietDay>(`dietdays/date/${date}/menu`);
  }
}
