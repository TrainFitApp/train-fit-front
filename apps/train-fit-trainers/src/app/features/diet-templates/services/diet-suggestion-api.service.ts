import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  DietSuggestionRequest,
  DietSuggestionResponse,
  PhaseWeeksResponse,
  PrepareNextWeekRequest,
  WeekNeedResponse,
  ScaledNextWeek,
} from '../models/diet-suggestion.model';
import { PlanAssignment } from '../../../shared/models/plan-assignment.model';

@Injectable({ providedIn: 'root' })
export class DietSuggestionApiService {
  constructor(private http: HttpService) {}

  // Objetivo de referencia del cliente (o el que teclee el entrenador) +
  // plantillas rankeadas por cercanía. 422 si faltan biométricos.
  public suggest(clientId: string, body: DietSuggestionRequest): Observable<DietSuggestionResponse> {
    return this.http.post<DietSuggestionResponse>(
      `trainer/clients/${clientId}/diet-suggestions`,
      body
    );
  }

  // Semanas de una fase: la que corre, la siguiente (con sugerencia) y
  // las pasadas, en una sola llamada.
  public getPhaseWeeks(clientId: string, phaseId: string): Observable<PhaseWeeksResponse> {
    return this.http.get<PhaseWeeksResponse>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/weeks`
    );
  }

  // Cómo se calculó la necesidad del cliente en esa semana.
  public getWeekNeed(
    clientId: string,
    phaseId: string,
    weekNumber: number
  ): Observable<WeekNeedResponse> {
    return this.http.get<WeekNeedResponse>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/weeks/${weekNumber}/need`
    );
  }

  // Contenido vigente escalado a `kcal` (no escribe nada).
  public scaleNextWeek(clientId: string, phaseId: string, kcal: number): Observable<ScaledNextWeek> {
    return this.http.post<ScaledNextWeek>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/weeks/next/scale`,
      { kcal }
    );
  }

  // Preparar la semana siguiente. La fecha la pone el check-in que la
  // abre. Responde 204 (body vacío → null) si el contenido no cambia nada.
  public prepareNextWeek(
    clientId: string,
    phaseId: string,
    body: PrepareNextWeekRequest
  ): Observable<PlanAssignment | null> {
    return this.http.put<PlanAssignment | null>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/weeks/next`,
      body
    );
  }

  public discardNextWeek(clientId: string, phaseId: string): Observable<void> {
    return this.http.delete<void>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/weeks/next`
    );
  }

  // Corregir cuándo empieza y acaba una fase ya aplicada (409 si se solapa
  // con otra).
  public updatePhaseDates(
    clientId: string,
    phaseId: string,
    dates: { startDate?: string; endDate?: string | null }
  ): Observable<PlanAssignment> {
    return this.http.patch<PlanAssignment>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/dates`,
      dates
    );
  }
}
