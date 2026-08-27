import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachTask, CreateCoachTaskPayload } from '../models/coach-task.model';

@Injectable({ providedIn: 'root' })
export class CoachTasksApiService {
  // "coach-tasks" y no "tasks": /trainer/tasks/* ya existe y son los hábitos
  // diarios del cliente. Ver components/coachTasks/coach-task-routes.js.
  private static readonly ENDPOINT = 'trainer/coach-tasks';

  constructor(private http: HttpService) {}

  public getMine(status?: 'pending' | 'done'): Observable<CoachTask[]> {
    const query = status ? `?status=${status}` : '';
    return this.http.get<CoachTask[]>(`${CoachTasksApiService.ENDPOINT}${query}`);
  }

  public create(payload: CreateCoachTaskPayload): Observable<CoachTask> {
    return this.http.post<CoachTask>(CoachTasksApiService.ENDPOINT, payload);
  }

  public update(id: string, updates: Partial<CoachTask>): Observable<CoachTask> {
    return this.http.patch<CoachTask>(`${CoachTasksApiService.ENDPOINT}/${id}`, updates);
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${CoachTasksApiService.ENDPOINT}/${id}`);
  }
}
