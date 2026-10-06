import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { DietTemplateMenuPayload } from '../../features/diet-templates/models/diet-template.model';
import {
  CreateDietPhaseRequest,
  CurrentDietPhase,
  DietPhase,
  DietPhaseFull,
  DietTimeline,
  NutritionHistoryResponse,
  PhaseWeeksResponse,
  ScaledNextWeek,
  UpdateDietPhaseRequest,
  WeekNeedResponse,
} from '../models/diet-phase.model';

// Fases de dieta de un cliente (train-fit-back/components/dietPhases).
@Injectable({ providedIn: 'root' })
export class DietPhaseApiService {
  private base(clientId: string): string {
    return `trainer/clients/${clientId}/diet-phases`;
  }

  constructor(private http: HttpService) {}

  // Empezar una fase (con una plantilla o con menús nuevos). Si ya tenía una,
  // la corta. 409 PLAN_OVERLAP si pisa una fase programada.
  public create(clientId: string, body: CreateDietPhaseRequest): Observable<DietPhase> {
    return this.http.post<DietPhase>(this.base(clientId), body);
  }

  // Todas, de la más reciente a la más antigua.
  public list(clientId: string): Observable<DietPhase[]> {
    return this.http.get<DietPhase[]>(this.base(clientId));
  }

  // La que rige hoy, o null.
  public getCurrent(clientId: string): Observable<CurrentDietPhase | null> {
    return this.http.get<CurrentDietPhase | null>(`${this.base(clientId)}/current`);
  }

  // Con los menús de cada versión del contenido.
  public get(clientId: string, phaseId: string): Observable<DietPhaseFull> {
    return this.http.get<DietPhaseFull>(`${this.base(clientId)}/${phaseId}`);
  }

  // Renombrar o mover fechas (409 si se solapa con otra fase).
  public update(clientId: string, phaseId: string, body: UpdateDietPhaseRequest): Observable<DietPhase> {
    return this.http.patch<DietPhase>(`${this.base(clientId)}/${phaseId}`, body);
  }

  // Quitar CUALQUIER fase. Si era la última aplicada, la anterior vuelve a regir.
  public cancel(clientId: string, phaseId: string): Observable<void> {
    return this.http.delete<void>(`${this.base(clientId)}/${phaseId}`);
  }

  // Editar el contenido de una versión (la primera o una semana preparada).
  public updateContent(
    clientId: string,
    phaseId: string,
    contentId: string,
    menus: DietTemplateMenuPayload[]
  ): Observable<DietPhaseFull> {
    return this.http.put<DietPhaseFull>(`${this.base(clientId)}/${phaseId}/contents/${contentId}`, { menus });
  }

  // --- Semanas ---

  // La que corre, la siguiente (con sugerencia) y las pasadas.
  public getWeeks(clientId: string, phaseId: string): Observable<PhaseWeeksResponse> {
    return this.http.get<PhaseWeeksResponse>(`${this.base(clientId)}/${phaseId}/weeks`);
  }

  // Cómo se calculó la necesidad del cliente en esa semana.
  public getWeekNeed(clientId: string, phaseId: string, weekNumber: number): Observable<WeekNeedResponse> {
    return this.http.get<WeekNeedResponse>(`${this.base(clientId)}/${phaseId}/weeks/${weekNumber}/need`);
  }

  // Contenido vigente escalado a `kcal` (no escribe nada).
  public scaleNextWeek(clientId: string, phaseId: string, kcal: number): Observable<ScaledNextWeek> {
    return this.http.post<ScaledNextWeek>(`${this.base(clientId)}/${phaseId}/weeks/next/scale`, { kcal });
  }

  // Preparar la semana siguiente (desde su lunes). 204 (null) si el contenido
  // no cambia nada.
  public prepareNextWeek(
    clientId: string,
    phaseId: string,
    menus: DietTemplateMenuPayload[]
  ): Observable<DietPhase | null> {
    return this.http.put<DietPhase | null>(`${this.base(clientId)}/${phaseId}/weeks/next`, { menus });
  }

  public discardNextWeek(clientId: string, phaseId: string): Observable<void> {
    return this.http.delete<void>(`${this.base(clientId)}/${phaseId}/weeks/next`);
  }

  // --- Calendario, historial y días saltados ---

  // Fases y sus semanas en un rango: la franja de cada fase y el badge S1/S2
  // de cada día del calendario.
  public getTimeline(clientId: string, from: string, to: string): Observable<DietTimeline> {
    return this.http.get<DietTimeline>(
      `trainer/clients/${clientId}/diet-timeline?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
  }

  // Feed del bloque "Historial de nutrición" de la ficha.
  public getNutritionHistory(clientId: string): Observable<NutritionHistoryResponse> {
    return this.http.get<NutritionHistoryResponse>(`trainer/clients/${clientId}/nutrition-history`);
  }

  // Ese día el cliente no sigue el plan: se vacía de lo pautado y deja de
  // contar. Lo que anotó por su cuenta se queda.
  public skipDay(clientId: string, date: string): Observable<unknown> {
    return this.http.post(`trainer/clients/${clientId}/skipped-days`, { date });
  }
}
