import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ReferenceProfile } from 'src/app/core/utils/exchange-plan.util';
import { FoodExchangeGroup } from '../models/food-exchange.model';

@Injectable({ providedIn: 'root' })
export class FoodExchangesApiService {
  private static readonly ENDPOINT = 'trainer/food-exchanges';

  constructor(private http: HttpService) {}

  public getMine(): Observable<FoodExchangeGroup[]> {
    return this.http.get<FoodExchangeGroup[]>(FoodExchangesApiService.ENDPOINT);
  }

  public create(group: Partial<FoodExchangeGroup>): Observable<FoodExchangeGroup> {
    return this.http.post<FoodExchangeGroup>(FoodExchangesApiService.ENDPOINT, group);
  }

  public update(id: string, group: Partial<FoodExchangeGroup>): Observable<FoodExchangeGroup> {
    return this.http.put<FoodExchangeGroup>(`${FoodExchangesApiService.ENDPOINT}/${id}`, group);
  }

  /**
   * Los perfiles de la tabla estándar, para ofrecerlos a quien ya tiene
   * grupos con una sola cifra declarada. Se escalan a su tamaño de ración en
   * el front (referenceCandidates) antes de enseñarlos.
   */
  public getReferenceProfiles(): Observable<ReferenceProfile[]> {
    return this.http.get<ReferenceProfile[]>(
      `${FoodExchangesApiService.ENDPOINT}/reference-profiles`
    );
  }

  /**
   * Copia la tabla de intercambios estándar a su biblioteca.
   *
   * Devuelve cuántos grupos ha creado y cuántos se ha saltado por tenerlos ya
   * con ese nombre: pulsarlo dos veces no duplica nada.
   */
  public importStarterPack(): Observable<{ created: number; skipped: number }> {
    return this.http.post<{ created: number; skipped: number }>(
      `${FoodExchangesApiService.ENDPOINT}/starter-pack`,
      {}
    );
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${FoodExchangesApiService.ENDPOINT}/${id}`);
  }
}
