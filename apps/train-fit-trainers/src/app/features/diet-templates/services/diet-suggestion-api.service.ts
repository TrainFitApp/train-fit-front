import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  DietSuggestionRequest,
  DietSuggestionResponse,
  PhaseRevisionsResponse,
  PrepareNextRevisionRequest,
  RevisionNeedResponse,
  ScaledNextRevision,
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

  // Revisiones de una fase: la que corre, la siguiente (con sugerencia) y
  // las pasadas, en una sola llamada.
  public getPhaseRevisions(clientId: string, phaseId: string): Observable<PhaseRevisionsResponse> {
    return this.http.get<PhaseRevisionsResponse>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/revisions`
    );
  }

  // Cómo se calculó la necesidad del cliente en esa revisión.
  public getRevisionNeed(
    clientId: string,
    phaseId: string,
    revisionNumber: number
  ): Observable<RevisionNeedResponse> {
    return this.http.get<RevisionNeedResponse>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/revisions/${revisionNumber}/need`
    );
  }

  // Contenido vigente escalado a `kcal` (no escribe nada).
  public scaleNextRevision(clientId: string, phaseId: string, kcal: number): Observable<ScaledNextRevision> {
    return this.http.post<ScaledNextRevision>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/revisions/next/scale`,
      { kcal }
    );
  }

  // Preparar la revisión siguiente. La fecha la pone el check-in que la
  // abre. Responde 204 (body vacío → null) si el contenido no cambia nada.
  public prepareNextRevision(
    clientId: string,
    phaseId: string,
    body: PrepareNextRevisionRequest
  ): Observable<PlanAssignment | null> {
    return this.http.put<PlanAssignment | null>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/revisions/next`,
      body
    );
  }

  public discardNextRevision(clientId: string, phaseId: string): Observable<void> {
    return this.http.delete<void>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/revisions/next`
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
