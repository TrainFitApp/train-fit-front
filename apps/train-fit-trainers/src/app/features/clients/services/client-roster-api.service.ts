import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { RosterResponse } from '../models/client-roster.model';

@Injectable({ providedIn: 'root' })
export class ClientRosterApiService {
  private static readonly ENDPOINT = 'trainer/roster';

  constructor(private http: HttpService) {}

  // Sin paginación ni parámetros: la cartera entera de un profesional en una
  // petición. Ordenar y filtrar se hace en el cliente — ver el comentario de
  // getRoster en client-progress-controller.js.
  public getRoster(): Observable<RosterResponse> {
    return this.http.get<RosterResponse>(ClientRosterApiService.ENDPOINT);
  }
}
