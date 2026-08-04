import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachNotification } from '../models/coach-dashboard.model';

@Injectable({ providedIn: 'root' })
export class NotificationsApiService {
  constructor(private http: HttpService) {}

  public getMine(): Observable<CoachNotification[]> {
    return this.http.get<CoachNotification[]>('notifications/mine');
  }

  public markRead(id: string): Observable<CoachNotification> {
    return this.http.patch<CoachNotification>(`notifications/${id}/read`, {});
  }

  public markAllRead(): Observable<unknown> {
    return this.http.post('notifications/mark-all-read', {});
  }
}
