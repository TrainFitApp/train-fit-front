import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachProtocol, ProtocolApplyResult } from '../models/coach-protocol.model';

@Injectable({ providedIn: 'root' })
export class CoachProtocolsApiService {
  private static readonly ENDPOINT = 'trainer/protocols';

  constructor(private http: HttpService) {}

  public getMine(): Observable<CoachProtocol[]> {
    return this.http.get<CoachProtocol[]>(CoachProtocolsApiService.ENDPOINT);
  }

  public create(protocol: Partial<CoachProtocol>): Observable<CoachProtocol> {
    return this.http.post<CoachProtocol>(CoachProtocolsApiService.ENDPOINT, protocol);
  }

  public update(id: string, protocol: Partial<CoachProtocol>): Observable<CoachProtocol> {
    return this.http.put<CoachProtocol>(`${CoachProtocolsApiService.ENDPOINT}/${id}`, protocol);
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${CoachProtocolsApiService.ENDPOINT}/${id}`);
  }

  // Devuelve un resultado POR CLIENTE y, dentro, uno por paso: aplicar un
  // protocolo son 6 operaciones distintas y cualquiera puede fallar sola.
  public applyToClients(
    id: string,
    clientIds: string[],
    options: { startDate?: string; reason?: string } = {}
  ): Observable<ProtocolApplyResult[]> {
    return this.http.post<ProtocolApplyResult[]>(`${CoachProtocolsApiService.ENDPOINT}/${id}/apply`, {
      clientIds,
      ...options,
    });
  }
}
