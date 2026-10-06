import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { CustomQuestion } from '../../models/custom-question';

// TASK-049 — catálogo cerrado de campos del cuestionario inicial. Debe
// coincidir con train-fit-back/components/trainerIntakeConfig/intake-field-catalog.js.
export type IntakeFieldKey =
  | 'goals'
  | 'healthConditions'
  | 'experienceLevel'
  | 'availability'
  | 'equipment'
  | 'allergies'
  | 'favoriteFoods'
  | 'dislikedFoods'
  | 'cooksAtHome'
  // No toggleables por el entrenador — el backend (getOnboardingStatus) los
  // fuerza: dietaryFlags en scope nutrición; profileBiometrics/activityProfile
  // siempre (confirman datos del registro y se reescriben en User).
  | 'dietaryFlags'
  | 'profileBiometrics'
  | 'activityProfile'
  | 'objective';

// Estado del cuestionario de alta con un profesional (espejo de
// intakeStatusOf en train-fit-back/components/trainerClients/pair-state.js):
// pending = sin enviar; submitted = enviado, editable hasta que el
// profesional lo revise; reviewed = revisado, solo lectura.
export type IntakeStatus = 'pending' | 'submitted' | 'reviewed';

// Un profesional en curso con su cuestionario de alta (uno por profesional,
// aunque lleve los dos scopes).
export interface OnboardingProfessional {
  trainerId: string;
  trainer: { name: string; lastname: string; email: string } | null;
  scopes: ('training' | 'nutrition')[];
  intakeStatus: IntakeStatus;
  // Campos que pide (los que activó más los que el back fuerza) y sus
  // preguntas propias.
  intakeEnabledFields: IntakeFieldKey[];
  intakeCustomQuestions: CustomQuestion[];
}

export interface OnboardingStatus {
  professionals: OnboardingProfessional[];
}

const EMPTY_STATUS: OnboardingStatus = { professionals: [] };

// Cuestionario inicial del cliente. Aceptar una invitación ya le hace
// cliente activo: el cuestionario es un recordatorio, nunca bloquea la app.
// Poblado en user-loader.page.ts junto a CoachService/NotificationsService;
// lo leen el acceso de Coach y onboarding-status.
@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private readonly _status: WritableSignal<OnboardingStatus> = signal(EMPTY_STATUS);
  // El estado más urgente de todos sus profesionales (lo que enseña el
  // acceso de Coach); null = no tiene ningún cuestionario.
  public readonly intakeStatus = computed<IntakeStatus | null>(() => {
    const statuses = this._status().professionals.map((p) => p.intakeStatus);
    return (['pending', 'submitted', 'reviewed'] as const).find((s) => statuses.includes(s)) ?? null;
  });
  public readonly pending = computed(() => this.intakeStatus() === 'pending');

  constructor(private http: HttpService) {}

  public refresh(): Observable<OnboardingStatus> {
    return this.http.get<OnboardingStatus>('trainer/onboarding-status').pipe(
      map((status) => status || EMPTY_STATUS),
      tap((status) => this._status.set(status)),
      catchError(() => {
        this._status.set(EMPTY_STATUS);
        return of(EMPTY_STATUS);
      })
    );
  }
}
