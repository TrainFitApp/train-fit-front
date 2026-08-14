import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CheckinReportEntry } from '../models/checkin-report.model';

@Injectable({ providedIn: 'root' })
export class CheckinReportsApiService {
  constructor(private http: HttpService) {}

  public getMyResponses(): Observable<CheckinReportEntry[]> {
    return this.http.get<CheckinReportEntry[]>('trainer/checkins/responses');
  }

  // TASK-024 (MASTER_BACKLOG.md)
  public getUnseenCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>('trainer/checkins/unseen-count');
  }

  public markSeen(): Observable<void> {
    return this.http.post<void>('trainer/checkins/mark-seen', {});
  }
}
