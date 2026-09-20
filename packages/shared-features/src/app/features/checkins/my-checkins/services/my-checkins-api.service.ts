import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CheckinHistoryEntry, MyCheckin } from '../models/my-checkin.model';

@Injectable({ providedIn: 'root' })
export class MyCheckinsApiService {
  constructor(private http: HttpService) {}

  // Los check-ins ABIERTOS hoy. Los de periodos ya cerrados no vuelven:
  // esa revisión pasó y no se puede rellenar hacia atrás.
  public getMine(): Observable<MyCheckin[]> {
    return this.http.get<MyCheckin[]>('trainer/checkins/mine');
  }

  // `boolean` desde la Fase 5: las preguntas propias del coach admiten un
  // tipo sí/no, que se guarda como booleano y no como texto.
  public respond(
    scheduleId: string,
    values: Record<string, number | string | boolean>
  ): Observable<unknown> {
    return this.http.post(`trainer/checkins/${encodeURIComponent(scheduleId)}/respond`, { values });
  }

  // coach-tab FASE2 — "formularios completados".
  public getHistory(): Observable<CheckinHistoryEntry[]> {
    return this.http.get<CheckinHistoryEntry[]>('trainer/checkins/mine/history');
  }
}
