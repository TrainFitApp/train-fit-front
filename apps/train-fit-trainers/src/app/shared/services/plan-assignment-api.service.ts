import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ApplyPlanRequest, DietException, PlanAssignment } from '../models/plan-assignment.model';

@Injectable({ providedIn: 'root' })
export class PlanAssignmentApiService {
  private base(clientId: string): string {
    return `trainer/clients/${clientId}/nutrition-plans`;
  }

  constructor(private http: HttpService) {}

  public apply(clientId: string, planId: string, body: ApplyPlanRequest): Observable<PlanAssignment> {
    return this.http.post<PlanAssignment>(`${this.base(clientId)}/${planId}/apply`, body);
  }

  public getActive(clientId: string): Observable<PlanAssignment | null> {
    return this.http.get<PlanAssignment | null>(`${this.base(clientId)}/active`);
  }

  public getHistory(clientId: string): Observable<PlanAssignment[]> {
    return this.http.get<PlanAssignment[]>(`${this.base(clientId)}/history`);
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
