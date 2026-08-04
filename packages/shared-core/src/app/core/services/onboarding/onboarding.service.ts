import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

export interface OnboardingRelation {
  trainerId: string;
  scope: 'training' | 'nutrition';
  status: 'cuestionario_pendiente' | 'en_revision';
  trainer: { name: string; lastname: string; email: string } | null;
}

export interface OnboardingStatus {
  blocked: boolean;
  relations: OnboardingRelation[];
}

const EMPTY_STATUS: OnboardingStatus = { blocked: false, relations: [] };

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

  constructor(private http: HttpService) {}

  public refresh(): Observable<OnboardingStatus> {
    return this.http.get<OnboardingStatus>('trainer/onboarding-status').pipe(
      tap((status) => this._status.set(status || EMPTY_STATUS)),
      catchError(() => {
        this._status.set(EMPTY_STATUS);
        return of(EMPTY_STATUS);
      })
    );
  }
}
