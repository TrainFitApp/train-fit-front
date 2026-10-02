import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { RosterQuery, RosterResponse } from '../models/client-roster.model';

@Injectable({ providedIn: 'root' })
export class ClientRosterApiService {
  private static readonly ENDPOINT = 'trainer/roster';

  constructor(private http: HttpService) {}

  // Una página de la Cartera: búsqueda, filtros y orden se resuelven en el
  // servidor, que es quien tiene a todos los clientes (ver getRoster en
  // client-progress-controller.js).
  public getRoster(query: RosterQuery): Observable<RosterResponse> {
    const params = new URLSearchParams({
      page: String(query.page),
      limit: String(query.limit),
      sort: query.sort,
      dir: query.descending ? 'desc' : 'asc',
    });
    if (query.search.trim()) params.set('search', query.search.trim());
    if (query.weakest) params.set('weakest', query.weakest);
    if (query.onlyWithAlerts) params.set('alerts', '1');
    if (query.onlyOverdueCheckin) params.set('overdue', '1');
    if (query.onlyWithPending) params.set('pending', '1');
    return this.http.get<RosterResponse>(`${ClientRosterApiService.ENDPOINT}?${params.toString()}`);
  }
}
