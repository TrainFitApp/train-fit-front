import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TrainerNotification } from '../models/trainer-notification.model';

@Injectable({ providedIn: 'root' })
export class TrainerNotificationsApiService {
  private static readonly ENDPOINT = 'trainer/notifications';

  constructor(private http: HttpService) {}

  public getMine(): Observable<TrainerNotification[]> {
    return this.http.get<TrainerNotification[]>(`${TrainerNotificationsApiService.ENDPOINT}/mine`);
  }

  public markRead(id: string): Observable<TrainerNotification> {
    return this.http.patch<TrainerNotification>(`${TrainerNotificationsApiService.ENDPOINT}/${id}/read`, {});
  }

  public markAllRead(): Observable<void> {
    return this.http.post<void>(`${TrainerNotificationsApiService.ENDPOINT}/mark-all-read`, {});
  }
}
