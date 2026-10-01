import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AdminAction, AdminCase, AdminTrainerDetail } from '../trainer-billing-view.util';

export interface AdminCasesResponse {
  mode: 'test' | 'live';
  // Eventos de Stripe que aún no se han podido procesar (se reintentan solos).
  pendingEvents: number;
  cases: AdminCase[];
}

export interface AdminInterventionRequest {
  action: AdminAction;
  reason: string;
  note?: string;
  caseId?: string;
  resolveCase?: boolean;
  until?: string;
  tier?: string;
  adjustmentId?: string;
}

// Solo administradores (auth admin en el backend). Reembolsar se hace en Stripe; aquí se
// registra la decisión y se aplica su efecto sobre la suscripción y el acceso.
@Injectable({ providedIn: 'root' })
export class TrainerBillingAdminApiService {
  constructor(private http: HttpService) {}

  public getCases(status: 'open' | 'resolved' | 'all'): Observable<AdminCasesResponse> {
    return this.http.get<AdminCasesResponse>(`billing/admin/trainers/cases?status=${status}`);
  }

  public lookup(email: string): Observable<{ userId: string; email: string }> {
    return this.http.get<{ userId: string; email: string }>(`billing/admin/trainers/lookup?email=${encodeURIComponent(email)}`);
  }

  public getTrainer(userId: string): Observable<AdminTrainerDetail> {
    return this.http.get<AdminTrainerDetail>(`billing/admin/trainers/${encodeURIComponent(userId)}`);
  }

  public intervene(userId: string, request: AdminInterventionRequest): Observable<AdminTrainerDetail> {
    return this.http.post<AdminTrainerDetail>(`billing/admin/trainers/${encodeURIComponent(userId)}/interventions`, request);
  }
}
