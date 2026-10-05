import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import { CoachTask } from '../models/coach-dashboard.model';
import { TasksApiService } from './tasks-api.service';

// Hábitos del cliente por día ("YYYY-MM-DD"), en un único sitio. Coach
// (hoy), Dieta (el día que se esté mirando) y la tarjeta del perfil leen de
// aquí, así que lo que se marca en una pantalla se ve al instante en las
// demás, sin esperar a que vuelvan a pedirlo.
@Injectable({ providedIn: 'root' })
export class HabitsService {
  private readonly _byDate = signal<Record<string, CoachTask[]>>({});

  constructor(private tasksApi: TasksApiService) {}

  // "Hoy" es el día del móvil, no el del servidor: Coach y Dieta tienen que
  // hablar del mismo día.
  public today(): string {
    return localIsoDate();
  }

  public forDate(date: string): CoachTask[] {
    return this._byDate()[date] ?? [];
  }

  public load(date: string = this.today()): Observable<CoachTask[]> {
    return this.tasksApi.getMine(date).pipe(
      map((tasks) => tasks || []),
      tap((tasks) => this._byDate.update((all) => ({ ...all, [date]: tasks })))
    );
  }

  // Optimista: se pinta marcado al momento y se deshace si el servidor falla.
  public toggle(task: CoachTask, date: string): Observable<unknown> {
    const completed = !task.completedToday;
    this.setCompleted(task._id, date, completed);
    return this.tasksApi.toggle(task._id, completed, date).pipe(
      catchError((error) => {
        this.setCompleted(task._id, date, !completed);
        return throwError(() => error);
      })
    );
  }

  private setCompleted(taskId: string, date: string, completed: boolean): void {
    this._byDate.update((all) =>
      all[date]
        ? { ...all, [date]: all[date].map((t) => (t._id === taskId ? { ...t, completedToday: completed } : t)) }
        : all
    );
  }
}
