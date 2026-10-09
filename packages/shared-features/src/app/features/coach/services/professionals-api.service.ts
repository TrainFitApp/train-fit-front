import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  HistoryEntry,
  InviteResponse,
  PendingInvite,
  ProfessionalScope,
  ProfessionalSummary,
} from '../models/professional-relation.model';
import { ProfessionalPayments } from '../models/professional-payments.model';

@Injectable({ providedIn: 'root' })
export class ProfessionalsApiService {
  constructor(private http: HttpService) {}

  public getPendingInvites(): Observable<PendingInvite[]> {
    return this.http.get<PendingInvite[]>('trainer/invites/mine');
  }

  public getActiveProfessionals(): Observable<ProfessionalSummary[]> {
    return this.http.get<ProfessionalSummary[]>('trainer/info');
  }

  // Se responde por profesional: todos sus scopes pendientes a la vez.
  public acceptInvite(trainerId: string): Observable<InviteResponse> {
    return this.http.post<InviteResponse>(`trainer/invites/${trainerId}/accept`, {});
  }

  public declineInvite(trainerId: string): Observable<InviteResponse> {
    return this.http.post<InviteResponse>(`trainer/invites/${trainerId}/decline`, {});
  }

  public unlinkProfessional(scope: ProfessionalScope): Observable<unknown> {
    return this.http.delete(`trainer/link/${scope}`);
  }

  // F22 — relaciones pasadas (revoked/declined) con cualquier profesional.
  public getHistory(): Observable<HistoryEntry[]> {
    return this.http.get<HistoryEntry[]>('trainer/history?asClient=1');
  }

  // Lo que le cobra un profesional con el que trabaja ahora (404 si no).
  public getPayments(trainerId: string): Observable<ProfessionalPayments> {
    return this.http.get<ProfessionalPayments>(`coach/professionals/${trainerId}/payments`);
  }
}
