import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  SendInviteResponse,
  TrainerInvite,
  TrainerInviteScope,
} from '../models/trainer-invite.model';

@Injectable({ providedIn: 'root' })
export class TrainerInvitesApiService {
  private static readonly ENDPOINT = 'trainer/invites';

  constructor(private http: HttpService) {}

  public getMyInvites(): Observable<TrainerInvite[]> {
    return this.http.get<TrainerInvite[]>(TrainerInvitesApiService.ENDPOINT);
  }

  public sendInvite(
    clientEmail: string,
    scopes: TrainerInviteScope[]
  ): Observable<SendInviteResponse> {
    return this.http.post<SendInviteResponse>(TrainerInvitesApiService.ENDPOINT, {
      clientEmail,
      scopes,
    });
  }

  public cancelInvite(id: string): Observable<TrainerInvite> {
    return this.http.delete<TrainerInvite>(
      `${TrainerInvitesApiService.ENDPOINT}/${id}`
    );
  }
}
