import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IntakeFieldKey } from 'src/app/core/services/onboarding/onboarding.service';
import {
  ClientEmailScopeStatus,
  ClientIntake,
  CustomIntakeQuestion,
  SendInviteResponse,
  TrainerInvite,
  TrainerInviteScope,
  TrainerIntakeConfig,
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

  // TAREA 3 — cuestionario inicial del cliente.
  public getClientIntake(clientId: string): Observable<ClientIntake | null> {
    return this.http.get<ClientIntake | null>(`trainer/clients/${clientId}/intake`);
  }

  // El profesional corrige el cuestionario ya enviado por el cliente (ver
  // updateClientIntake en trainer-client-controller.js) — mismos campos que
  // ClientIntake, sin trainerId/clientId/submittedAt (los pone el backend).
  public updateClientIntake(
    clientId: string,
    intake: Pick<
      ClientIntake,
      | 'goals'
      | 'healthConditions'
      | 'experienceLevel'
      | 'availability'
      | 'trainingLocation'
      | 'equipmentTags'
      | 'customAnswers'
    >
  ): Observable<ClientIntake> {
    return this.http.put<ClientIntake>(`trainer/clients/${clientId}/intake`, intake);
  }

  // TASK-049 — configuración de campos activos del cuestionario inicial.
  public getIntakeConfig(): Observable<TrainerIntakeConfig> {
    return this.http.get<TrainerIntakeConfig>('trainer/intake-config');
  }

  public updateIntakeConfig(
    enabledFields: IntakeFieldKey[],
    customQuestions: CustomIntakeQuestion[],
    lastScopes: TrainerInviteScope[]
  ): Observable<TrainerIntakeConfig> {
    return this.http.put<TrainerIntakeConfig>('trainer/intake-config', {
      enabledFields,
      customQuestions,
      lastScopes,
    });
  }

  // Estado por scope (training/nutrition) de este email con ESTE trainer —
  // para avisar en el form de invitar antes de enviar, no solo dejar que
  // falle el submit contra el índice único del backend.
  public checkClientEmailStatus(email: string): Observable<ClientEmailScopeStatus> {
    return this.http.get<ClientEmailScopeStatus>(
      `trainer/clients/check-email?email=${encodeURIComponent(email)}`
    );
  }
}
