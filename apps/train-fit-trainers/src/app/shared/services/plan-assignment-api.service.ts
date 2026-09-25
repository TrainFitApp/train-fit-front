import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ApplyPlanRequest, NutritionHistoryResponse, PhasePayload, PlanAssignment } from '../models/plan-assignment.model';
import { DietTemplateMenuPayload } from '../../features/diet-templates/models/diet-template.model';

// "Crear dieta" — mismos campos de fecha/duración que ApplyPlanRequest, más
// el contenido en crudo (mismo shape que DietTemplateApiService#create/
// update): no hay plantilla de origen, el trainer lo construye aquí mismo
// para este cliente (ver plan-assignment-service.js#createDirectPlan).
export interface CreateDirectPlanRequest {
  name: string;
  menus: DietTemplateMenuPayload[];
  startDate: string;
  phase?: PhasePayload;
}

// Editor de una fase/semana ya asignada — contenido completo de la copia
// de ESTE cliente (nunca una plantilla de biblioteca), por su propio _id.
// Funciona igual para el contenido inicial que para cualquier semana
// posterior (sin sourceTemplateId).
export interface PlanContent {
  _id: string;
  name: string;
  // Fase a la que pertenece (apunta a su primer documento) y fecha de inicio
  // de esta copia — para saber qué semana se está editando.
  phaseId?: string | null;
  startDate?: string | null;
  menus: DietTemplateMenuPayload[];
}

// Fases y semanas de un rango de fechas (espejo de
// plan-assignment-service.js#getDietTimeline).
export interface DietTimeline {
  phases: { id: string; name: string | null; start: string; end: string | null; colorIndex: number }[];
  weeks: { phaseId: string; number: number; start: string; end: string; colorIndex: number }[];
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
    body: { name?: string; menus?: DietTemplateMenuPayload[] }
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

  // Ese día el cliente no sigue el plan: se vacía de lo pautado y deja de
  // contar. Lo que anotó por su cuenta se queda.
  public markDaySkipped(clientId: string, date: string): Observable<unknown> {
    return this.http.post(`trainer/clients/${clientId}/skipped-days`, { date });
  }

  // Feed del bloque "Historial de nutrición" de la ficha (fases, semanas,
  // check-ins y días saltados).
  public getNutritionHistory(clientId: string): Observable<NutritionHistoryResponse> {
    return this.http.get<NutritionHistoryResponse>(`trainer/clients/${clientId}/nutrition-history`);
  }

  // Fases y sus SEMANAS en un rango — lo que necesita el calendario para
  // pintar la franja de cada fase y el badge R1/R2 de cada día. Las ventanas
  // las marcan los check-ins, así que no se pueden deducir en el front.
  public getDietTimeline(
    clientId: string,
    from: string,
    to: string
  ): Observable<DietTimeline> {
    return this.http.get<DietTimeline>(
      `trainer/clients/${clientId}/diet-timeline?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
  }
}
