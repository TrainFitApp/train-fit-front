import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CheckinHistoryEntry, MyCheckinConfig } from '../models/my-checkin.model';

@Injectable({ providedIn: 'root' })
export class MyCheckinsApiService {
  constructor(private http: HttpService) {}

  public getMine(): Observable<MyCheckinConfig[]> {
    return this.http.get<MyCheckinConfig[]>('trainer/checkins/mine');
  }

  // `boolean` desde la Fase 5: las preguntas propias del coach admiten un
  // tipo sí/no, que se guarda como booleano y no como texto.
  // Todo check-in es ya una solicitud concreta: la vía antigua, que
  // respondía "al profesional" sin decir a qué ocurrencia, ya no existe.
  public respond(
    requestId: string,
    values: Record<string, number | string | boolean>
  ): Observable<unknown> {
    return this.http.post(`trainer/checkins/requests/${encodeURIComponent(requestId)}/respond`, { values });
  }

  // coach-tab FASE2 — "formularios completados".
  public getHistory(): Observable<CheckinHistoryEntry[]> {
    return this.http.get<CheckinHistoryEntry[]>('trainer/checkins/mine/history');
  }
}
