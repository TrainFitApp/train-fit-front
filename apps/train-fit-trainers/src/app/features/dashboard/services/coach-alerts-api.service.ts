import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachAlert, CoachAlertStatus } from '../models/coach-alert.model';

@Injectable({ providedIn: 'root' })
export class CoachAlertsApiService {
  private static readonly ENDPOINT = 'trainer/alerts';

  constructor(private http: HttpService) {}

  public getMine(status: CoachAlertStatus = 'open'): Observable<CoachAlert[]> {
    return this.http.get<CoachAlert[]>(`${CoachAlertsApiService.ENDPOINT}?status=${status}`);
  }

  public setStatus(
    id: string,
    status: CoachAlertStatus,
    coachNote?: string
  ): Observable<CoachAlert> {
    return this.http.patch<CoachAlert>(`${CoachAlertsApiService.ENDPOINT}/${id}`, {
      status,
      coachNote,
    });
  }

  // Fuerza la evaluación de las señales de este profesional sin esperar al
  // cron nocturno. Necesario para que un profesional que acaba de dar de
  // alta a sus clientes no vea un panel vacío hasta el día siguiente.
  public evaluateNow(): Observable<{ created: number; refreshed: number; autoResolved: number }> {
    return this.http.post<{ created: number; refreshed: number; autoResolved: number }>(
      `${CoachAlertsApiService.ENDPOINT}/evaluate`,
      {}
    );
  }
}
