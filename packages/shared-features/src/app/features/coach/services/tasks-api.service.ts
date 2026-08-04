import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachTask } from '../models/coach-dashboard.model';

@Injectable({ providedIn: 'root' })
export class TasksApiService {
  constructor(private http: HttpService) {}

  public getMine(): Observable<CoachTask[]> {
    return this.http.get<CoachTask[]>('trainer/tasks/mine');
  }

  public toggle(taskId: string, completed: boolean): Observable<unknown> {
    return this.http.post(`trainer/tasks/${taskId}/toggle`, { completed });
  }
}
