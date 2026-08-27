import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
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

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${FoodExchangesApiService.ENDPOINT}/${id}`);
  }
}
