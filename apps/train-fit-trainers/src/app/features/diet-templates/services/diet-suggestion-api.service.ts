import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  DietSuggestionRequest,
  DietSuggestionResponse,
  PhaseCyclesResponse,
  PrepareNextCycleRequest,
  ScaledNextCycle,
} from '../models/diet-suggestion.model';
import { PlanAssignment } from '../../../shared/models/plan-assignment.model';

@Injectable({ providedIn: 'root' })
export class DietSuggestionApiService {
  constructor(private http: HttpService) {}

  // Objetivo del cliente + plantillas rankeadas por cercanía. 422 si faltan
  // biométricos (el cajón manda pedir una antropometría).
  public suggest(clientId: string, body: DietSuggestionRequest): Observable<DietSuggestionResponse> {
    return this.http.post<DietSuggestionResponse>(
      `trainer/clients/${clientId}/diet-suggestions`,
      body
    );
  }

  // Ciclos por contenido — ciclo actual, siguiente (con sugerencia) y
  // pasados de una fase, en una sola llamada.
  public getPhaseCycles(clientId: string, phaseId: string): Observable<PhaseCyclesResponse> {
    return this.http.get<PhaseCyclesResponse>(`trainer/clients/${clientId}/nutrition-phases/${phaseId}/cycles`);
  }

  // Contenido del ciclo vigente escalado a `kcal` (no escribe nada).
  public scaleNextCycle(clientId: string, phaseId: string, kcal: number): Observable<ScaledNextCycle> {
    return this.http.post<ScaledNextCycle>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/cycles/next/scale`,
      { kcal }
    );
  }

  // Preparar el siguiente ciclo. La fecha la pone el servidor. Responde
  // 204 (body vacío → null) si el contenido no cambia nada.
  public prepareNextCycle(
    clientId: string,
    phaseId: string,
    body: PrepareNextCycleRequest
  ): Observable<PlanAssignment | null> {
    return this.http.put<PlanAssignment | null>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/cycles/next`,
      body
    );
  }

  public discardNextCycle(clientId: string, phaseId: string): Observable<void> {
    return this.http.delete<void>(`trainer/clients/${clientId}/nutrition-phases/${phaseId}/cycles/next`);
  }
}
