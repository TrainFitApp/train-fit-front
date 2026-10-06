import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TrainerClientSummary } from '../models/trainer-client-summary.model';

@Injectable({ providedIn: 'root' })
export class TrainerClientsApiService {
  private static readonly ENDPOINT = 'trainer/clients';

  constructor(private http: HttpService) {}

  public getMyClients(): Observable<TrainerClientSummary[]> {
    return this.http.get<TrainerClientSummary[]>(
      TrainerClientsApiService.ENDPOINT
    );
  }

  // "Mi cuenta" > tarjeta "Número de cambios" — clientes distintos que en
  // algún momento llegaron a estar activos con este trainer, sigan vinculados
  // hoy o no (turnover).
  public getLifetimeClientsCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${TrainerClientsApiService.ENDPOINT}/lifetime-count`);
  }
}
