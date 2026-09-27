import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

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

export const ALL_INTAKE_FIELDS: IntakeFieldKey[] = [
  'goals',
  'healthConditions',
  'experienceLevel',
  'availability',
  'equipment',
  'allergies',
  'favoriteFoods',
  'dislikedFoods',
  'cooksAtHome',
  'dietaryFlags',
  'profileBiometrics',
  'activityProfile',
  'objective',
];

export interface IntakeCustomQuestion {
  id: string;
  label: string;
}

// Estado del cuestionario inicial de un profesional (espejo de
// intakeStatusFor en train-fit-back/components/trainerClients/intake-pending.js):
// pending = sin enviar; submitted = enviado, editable hasta que el
// profesional lo revise; reviewed = revisado, solo lectura.
export type IntakeStatus = 'pending' | 'submitted' | 'reviewed';

// Una relación activa con su cuestionario inicial.
export interface OnboardingRelation {
  trainerId: string;
  scope: 'training' | 'nutrition';
  intakeStatus: IntakeStatus;
  trainer: { name: string; lastname: string; email: string } | null;
  // TASK-049 — siempre poblado tras refresh(), nunca undefined: normalizado
  // aquí (fallback al catálogo completo si el backend no lo manda) para que
  // ningún consumidor de OnboardingRelation tenga que conocer esa regla de
  // compatibilidad. Antes vivía en onboarding-status.page.ts (único
  // consumidor hoy), pero es una propiedad del modelo compartido, no de esa
  // pantalla.
  intakeEnabledFields: IntakeFieldKey[];
  // Preguntas de texto libre que el trainer añadió a su cuestionario, por
  // trainer igual que intakeEnabledFields (no depende del scope de esta
  // relación concreta).
  intakeCustomQuestions: IntakeCustomQuestion[];
}

// El backend manda también `blocked`, siempre false: solo lo leen builds
// antiguas, que con true redirigían al cuestionario.
export interface OnboardingStatus {
  relations: OnboardingRelation[];
}

const EMPTY_STATUS: OnboardingStatus = { relations: [] };

function normalizeStatus(status: OnboardingStatus | null): OnboardingStatus {
  if (!status) return EMPTY_STATUS;
  return {
    ...status,
    relations: (status.relations || []).map((r) => ({
      ...r,
      intakeEnabledFields: r.intakeEnabledFields?.length ? r.intakeEnabledFields : ALL_INTAKE_FIELDS,
      intakeCustomQuestions: r.intakeCustomQuestions || [],
    })),
  };
}

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
    const statuses = this._status().relations.map((r) => r.intakeStatus);
    return (['pending', 'submitted', 'reviewed'] as const).find((s) => statuses.includes(s)) ?? null;
  });
  public readonly pending = computed(() => this.intakeStatus() === 'pending');

  constructor(private http: HttpService) {}

  public refresh(): Observable<OnboardingStatus> {
    return this.http.get<OnboardingStatus>('trainer/onboarding-status').pipe(
      map((status) => normalizeStatus(status)),
      tap((status) => this._status.set(status)),
      catchError(() => {
        this._status.set(EMPTY_STATUS);
        return of(EMPTY_STATUS);
      })
    );
  }
}
