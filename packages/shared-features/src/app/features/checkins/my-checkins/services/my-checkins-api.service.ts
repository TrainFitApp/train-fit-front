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

  public respond(trainerId: string, values: Record<string, number | string>): Observable<unknown> {
    return this.http.post(`trainer/checkins/${trainerId}/respond`, { values });
  }

  // coach-tab FASE2 — "formularios completados".
  public getHistory(): Observable<CheckinHistoryEntry[]> {
    return this.http.get<CheckinHistoryEntry[]>('trainer/checkins/mine/history');
  }
}
