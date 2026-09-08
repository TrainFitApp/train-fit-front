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
  | 'cooksAtHome';

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
];

export interface IntakeCustomQuestion {
  id: string;
  label: string;
}

export interface OnboardingRelation {
  trainerId: string;
  scope: 'training' | 'nutrition';
  status: 'cuestionario_pendiente' | 'en_revision';
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

export interface OnboardingStatus {
  blocked: boolean;
  relations: OnboardingRelation[];
}

const EMPTY_STATUS: OnboardingStatus = { blocked: false, relations: [] };

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

// TAREA 3 (coach-tab) — ¿debe el cliente ver la pantalla de cuestionario/
// espera en vez del resto de la app? Solo true si NO tiene ninguna relación
// activa con nadie todavía Y tiene al menos una relación en curso de alta.
// Poblado en user-loader.page.ts junto a CoachService/NotificationsService,
// consumido de forma síncrona por onboarding.guard.ts.
@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private readonly _status: WritableSignal<OnboardingStatus> = signal(EMPTY_STATUS);
  public readonly blocked = computed(() => this._status().blocked);
  public readonly relations = computed(() => this._status().relations);

  // El cliente puede elegir "seguir usando la app" desde onboarding-status
  // aunque le quede cuestionario por rellenar — completar el intake ya no es
  // obligatorio para navegar, es un recordatorio. Dura lo que dure la
  // sesión: onboarding-status sigue accesible para volver a rellenarlo
  // cuando quiera, y el guard vuelve a preguntar en el próximo login
  // (servicio providedIn:'root', se recrea entero con la app).
  private readonly _dismissed: WritableSignal<boolean> = signal(false);
  public readonly dismissed = this._dismissed.asReadonly();

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

  public dismiss(): void {
    this._dismissed.set(true);
  }
}
