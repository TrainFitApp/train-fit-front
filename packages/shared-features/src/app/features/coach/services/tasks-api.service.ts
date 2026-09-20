import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CoachTask } from '../models/coach-dashboard.model';

@Injectable({ providedIn: 'root' })
export class TasksApiService {
  constructor(private http: HttpService) {}

  // Los hábitos del cliente con el cumplimiento de ESE día resuelto (hoy por
  // defecto): la pantalla de dieta los pinta bajo las comidas del día que se
  // está mirando.
  public getMine(date?: string): Observable<CoachTask[]> {
    return this.http.get<CoachTask[]>(
      date ? `trainer/tasks/mine?date=${encodeURIComponent(date)}` : 'trainer/tasks/mine'
    );
  }

  public toggle(taskId: string, completed: boolean, date?: string): Observable<unknown> {
    return this.http.post(`trainer/tasks/${taskId}/toggle`, { completed, ...(date ? { date } : {}) });
  }
}
