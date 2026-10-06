import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  ApplyRoutineRequest,
  RescheduleRoutineRequest,
  RoutineAssignment,
  RoutineScheduleDay,
} from '../models/routine-assignment.model';

@Injectable({ providedIn: 'root' })
export class RoutineAssignmentApiService {
  constructor(private http: HttpService) {}

  public apply(clientId: string, tableId: string, body: ApplyRoutineRequest): Observable<RoutineAssignment> {
    return this.http.post<RoutineAssignment>(
      `trainer/clients/${clientId}/tables/${tableId}/apply`,
      body
    );
  }

  public getHistory(clientId: string): Observable<RoutineAssignment[]> {
    return this.http.get<RoutineAssignment[]>(
      `trainer/clients/${clientId}/routine-assignments/history`
    );
  }

  public getSchedule(clientId: string, from: string, to: string): Observable<RoutineScheduleDay[]> {
    return this.http.get<RoutineScheduleDay[]>(
      `trainer/clients/${clientId}/routine-assignments/schedule?from=${from}&to=${to}`
    );
  }

  // Tarea 4bis (2026-09) — quitar una fase programada (aún no en curso).
  public cancel(clientId: string, assignmentId: string): Observable<void> {
    return this.http.delete<void>(
      `trainer/clients/${clientId}/routine-assignments/${assignmentId}`
    );
  }

  // Tarea 4ter (2026-09) — cambiar la fecha de una fase programada (aún no
  // en curso), p.ej. para alargar la rutina en curso.
  public reschedule(
    clientId: string,
    assignmentId: string,
    body: RescheduleRoutineRequest
  ): Observable<RoutineAssignment> {
    return this.http.patch<RoutineAssignment>(
      `trainer/clients/${clientId}/routine-assignments/${assignmentId}`,
      body
    );
  }
}
