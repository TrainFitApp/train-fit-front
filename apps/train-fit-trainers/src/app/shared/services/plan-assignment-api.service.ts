import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ApplyPlanRequest, DietException, DurationUnit, PlanAssignment, PlanEndMode } from '../models/plan-assignment.model';
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
  startDate: string;
  endMode: PlanEndMode;
  fixedEndDate?: string;
  durationValue?: number;
  durationUnit?: DurationUnit;
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

  // TASK-045 (MASTER_BACKLOG.md)
  public getExceptions(clientId: string): Observable<DietException[]> {
    return this.http.get<DietException[]>(`trainer/clients/${clientId}/diet-exceptions`);
  }
}
