import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  PendingInvite,
  ProfessionalScope,
  ProfessionalSummary,
} from '../models/professional-relation.model';

@Injectable({ providedIn: 'root' })
export class MyProfessionalsApiService {
  constructor(private http: HttpService) {}

  public getPendingInvites(): Observable<PendingInvite[]> {
    return this.http.get<PendingInvite[]>('trainer/invites/mine');
  }

  public getActiveProfessionals(): Observable<ProfessionalSummary[]> {
    return this.http.get<ProfessionalSummary[]>('trainer/info');
  }

  public acceptInvite(id: string): Observable<unknown> {
    return this.http.post(`trainer/invites/${id}/accept`, {});
  }

  public declineInvite(id: string): Observable<unknown> {
    return this.http.post(`trainer/invites/${id}/decline`, {});
  }

  public unlinkProfessional(scope: ProfessionalScope): Observable<unknown> {
    return this.http.delete(`trainer/link/${scope}`);
  }
}
