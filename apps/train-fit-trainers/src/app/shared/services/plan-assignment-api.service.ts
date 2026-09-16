import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ApplyPlanRequest, NutritionHistoryResponse, PhasePayload, PlanAssignment } from '../models/plan-assignment.model';
import {
  DietTemplateDayPatternPayload,
  DietTemplateDayPayload,
  TemplateMode,
} from '../../features/diet-templates/models/diet-template.model';

// "Crear dieta" — mismos campos de fecha/duración que ApplyPlanRequest, más
// el contenido en crudo (mismo shape que DietTemplateApiService#create/
// update): no hay plantilla de origen, el trainer lo construye aquí mismo
// para este cliente (ver plan-assignment-service.js#createDirectPlan).
export interface CreateDirectPlanRequest {
  name: string;
  days: DietTemplateDayPayload[];
  mode: TemplateMode;
  dayPatterns: DietTemplateDayPatternPayload[];
  choiceCycleDays?: number | null;
  startDate: string;
  phase?: PhasePayload;
}

// Editor de fase/ciclo ya asignado — contenido completo de la copia de ESTE
// cliente (nunca una plantilla de biblioteca), por su propio _id. Funciona
// igual para el ciclo 1 que para cualquiera posterior (sin sourceTemplateId).
export interface PlanContent {
  _id: string;
  name: string;
  // Fase a la que pertenece (apunta al primer ciclo) y fecha de inicio de
  // esta copia — para saber qué ciclo se está editando.
  phaseId?: string | null;
  startDate?: string | null;
  mode: TemplateMode;
  choiceCycleDays?: number | null;
  days: DietTemplateDayPayload[];
  dayPatterns: DietTemplateDayPatternPayload[];
}

@Injectable({ providedIn: 'root' })
export class PlanAssignmentApiService {
  private base(clientId: string): string {
    return `trainer/clients/${clientId}/nutrition-plans`;
  }

  constructor(private http: HttpService) {}

  public apply(clientId: string, planId: string, body: ApplyPlanRequest): Observable<PlanAssignment> {
    return this.http.post<PlanAssignment>(`${this.base(clientId)}/${planId}/apply`, body);
  }

  public createDirect(clientId: string, body: CreateDirectPlanRequest): Observable<PlanAssignment> {
    return this.http.post<PlanAssignment>(this.base(clientId), body);
  }

  public getActive(clientId: string): Observable<PlanAssignment | null> {
    return this.http.get<PlanAssignment | null>(`${this.base(clientId)}/active`);
  }

  public getHistory(clientId: string): Observable<PlanAssignment[]> {
    return this.http.get<PlanAssignment[]>(`${this.base(clientId)}/history`);
  }

  public getContent(clientId: string, planId: string): Observable<PlanContent> {
    return this.http.get<PlanContent>(`${this.base(clientId)}/${planId}`);
  }

  public updateContent(
    clientId: string,
    planId: string,
    body: {
      name?: string;
      mode?: TemplateMode;
      days?: DietTemplateDayPayload[];
      dayPatterns?: DietTemplateDayPatternPayload[];
      choiceCycleDays?: number | null;
    }
  ): Observable<PlanContent> {
    return this.http.put<PlanContent>(`${this.base(clientId)}/${planId}`, body);
  }

  // Quitar CUALQUIER fase (futura, pasada/sustituida, o la vigente ahora
  // mismo) — mismo patrón que RoutineAssignmentApiService#cancel para
  // entrenamiento. Si era la fase "active" (el tip de la cadena), el backend
  // reactiva sola la que queda más reciente.
  public cancel(clientId: string, planId: string): Observable<void> {
    return this.http.delete<void>(`${this.base(clientId)}/${planId}`);
  }

  public createException(
    clientId: string,
    body: { date: string; mealSlot?: string; action: 'override' | 'skip'; override?: unknown }
  ): Observable<unknown> {
    return this.http.post(`trainer/clients/${clientId}/diet-exceptions`, body);
  }

  // Feed del bloque "Historial de nutrición" de la ficha (fases, ciclos,
  // check-ins y excepciones).
  public getNutritionHistory(clientId: string): Observable<NutritionHistoryResponse> {
    return this.http.get<NutritionHistoryResponse>(`trainer/clients/${clientId}/nutrition-history`);
  }
}
