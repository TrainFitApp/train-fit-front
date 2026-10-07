import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IntakeStatus } from 'src/app/core/services/onboarding/onboarding.service';
import {
  ClientEmailScopeStatus,
  ClientIntake,
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
  // ClientIntake, sin las fechas de envío y revisión (no cambian al corregir).
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

  // intakeReviewedGuard: sin enviar o por revisar no se abre la ficha.
  public getIntakeStatus(clientId: string): Observable<{ status: IntakeStatus | null }> {
    return this.http.get<{ status: IntakeStatus | null }>(`trainer/clients/${clientId}/intake/status`);
  }

  // Hasta marcarlo revisado, el cliente puede editar o rehacer su cuestionario.
  public markIntakeReviewed(clientId: string): Observable<ClientIntake> {
    return this.http.post<ClientIntake>(`trainer/clients/${clientId}/intake/reviewed`, {});
  }

  // TASK-049 — configuración de campos activos del cuestionario inicial.
  public getIntakeConfig(): Observable<TrainerIntakeConfig> {
    return this.http.get<TrainerIntakeConfig>('trainer/intake-config');
  }

  // La configuración entera: lo que no se mande se queda vacío.
  public updateIntakeConfig(config: Omit<TrainerIntakeConfig, 'trainerId' | 'catalog'>): Observable<TrainerIntakeConfig> {
    return this.http.put<TrainerIntakeConfig>('trainer/intake-config', config);
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
