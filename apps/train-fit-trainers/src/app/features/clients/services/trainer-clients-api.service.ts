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

  // TASK-022 (MASTER_BACKLOG.md) — ruta nueva y aditiva (ver trainer-client-
  // routes.js), no sustituye a getMyClients(): los demás consumidores de
  // esa lista (dashboard, select-clients-modal, etc.) siguen necesitando el
  // listado completo.
  public getMyClientsPaginated(
    page: number,
    limit: number,
    search: string
  ): Observable<{ clients: TrainerClientSummary[]; total: number }> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search.trim()) params.set('search', search.trim());
    return this.http.get<{ clients: TrainerClientSummary[]; total: number }>(
      `${TrainerClientsApiService.ENDPOINT}/paginated?${params.toString()}`
    );
  }

  // "Mi cuenta" > tarjeta "Número de cambios" — clientes distintos que en
  // algún momento llegaron a estar activos con este trainer, sigan vinculados
  // hoy o no (turnover). Ruta propia y aditiva, no toca getMyClients().
  public getLifetimeClientsCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${TrainerClientsApiService.ENDPOINT}/lifetime-count`);
  }
}
