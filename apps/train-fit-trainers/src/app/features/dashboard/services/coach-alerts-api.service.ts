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

  // Fuerza la evaluación de las señales de este profesional. El back evalúa
  // solo una vez al día (en la primera lectura); sin esto, un profesional
  // que da de alta clientes a media mañana no los vería hasta el día siguiente.
  public evaluateNow(): Observable<{ created: number; refreshed: number; autoResolved: number }> {
    return this.http.post<{ created: number; refreshed: number; autoResolved: number }>(
      `${CoachAlertsApiService.ENDPOINT}/evaluate`,
      {}
    );
  }
}
