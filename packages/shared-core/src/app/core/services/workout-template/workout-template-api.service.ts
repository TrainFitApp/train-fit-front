import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { Split } from '../../models/split';
import {
  WorkoutTemplate,
  WorkoutTemplateInput,
} from '../../models/workout-template';

// Rediseño de entrenamiento (Fase A) — vive en shared-core (no en
// train-fit-trainers) porque lo consumen tanto el hub de plantillas
// (routines.page.ts, solo trainer) como el editor real compartido
// (workout.component.ts dentro de mesocycle.page.ts, reusado por varias
// apps) — ver comentario de isModal en mesocycle.page.ts para el mismo
// patrón de "solo visible en el panel del entrenador".
@Injectable({ providedIn: 'root' })
export class WorkoutTemplateApiService {
  constructor(private http: HttpService) {}

  public list(): Observable<WorkoutTemplate[]> {
    return this.http.get<WorkoutTemplate[]>('trainer/workout-templates');
  }

  public create(data: WorkoutTemplateInput): Observable<WorkoutTemplate> {
    return this.http.post<WorkoutTemplate>('trainer/workout-templates', data);
  }

  public update(id: string, patch: Partial<WorkoutTemplateInput>): Observable<WorkoutTemplate> {
    return this.http.put<WorkoutTemplate>(`trainer/workout-templates/${id}`, patch);
  }

  public delete(id: string): Observable<unknown> {
    return this.http.delete(`trainer/workout-templates/${id}`);
  }

  // Aplicar plantilla real dentro de un split de un cliente concreto
  // (materializa exercises/sets ya prescritos). Devuelve table.splits
  // completo — mismo shape que workout.service.ts#addWorkoutsToSplits.
  public applyToSplit(
    clientId: string,
    splitId: string,
    templateId: string
  ): Observable<Split[]> {
    return this.http.post<Split[]>(
      `trainer/clients/${clientId}/splits/${splitId}/workout-templates/${templateId}/apply`,
      {}
    );
  }

  // Inverso — un Workout real ya construido en el editor se guarda como
  // plantilla reutilizable.
  public saveWorkoutAsTemplate(
    workoutId: string,
    data: WorkoutTemplateInput
  ): Observable<WorkoutTemplate> {
    return this.http.post<WorkoutTemplate>(
      `trainer/workouts/${workoutId}/save-as-template`,
      data
    );
  }
}
