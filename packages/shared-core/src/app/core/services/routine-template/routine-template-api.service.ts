import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { Table } from '../../models/table';

// Rutinas -> Plantillas (rediseño 2026-08) — biblioteca de plantillas de
// rutina COMPLETA (microciclos/splits/workouts) propia del profesional.
// Distinto de WorkoutTemplateApiService (plantilla de un solo día/sesión).
// Una plantilla aquí es literalmente una Table con userId=trainerId, sin
// cliente asociado — se edita con el mismo Planificador (PlannerModule) que
// las rutinas reales de cliente, solo cambia de dónde sale la Table.
@Injectable({ providedIn: 'root' })
export class RoutineTemplateApiService {
  constructor(private http: HttpService) {}

  public list(): Observable<Table[]> {
    return this.http.get<Table[]>('trainer/routines');
  }

  public create(name: string): Observable<Table> {
    return this.http.post<Table>('trainer/routines', { name });
  }

  // "Guardar como plantilla" desde el Planner: el back copia solo la pauta
  // de la rutina (sin ejecución ni notas del cliente).
  public createFromTable(tableId: string, name: string): Observable<Table> {
    return this.http.post<Table>(`trainer/routines/from-table/${tableId}`, { name });
  }

  public delete(id: string): Observable<unknown> {
    return this.http.delete(`trainer/routines/${id}`);
  }
}
