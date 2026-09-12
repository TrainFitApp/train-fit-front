import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  AdvanceCycleRequest,
  DietSuggestionRequest,
  DietSuggestionResponse,
  NextCycleResponse,
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

  // Borrador del siguiente ciclo de una fase (tendencia de peso + adherencia).
  public nextCycleSuggestion(clientId: string, phaseId: string): Observable<NextCycleResponse> {
    return this.http.get<NextCycleResponse>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/next-cycle-suggestion`
    );
  }

  // Confirmar un ciclo nuevo (posiblemente editado respecto al borrador).
  public advanceCycle(
    clientId: string,
    phaseId: string,
    body: AdvanceCycleRequest
  ): Observable<PlanAssignment & { goalId?: string }> {
    return this.http.post<PlanAssignment & { goalId?: string }>(
      `trainer/clients/${clientId}/nutrition-phases/${phaseId}/cycles`,
      body
    );
  }
}
