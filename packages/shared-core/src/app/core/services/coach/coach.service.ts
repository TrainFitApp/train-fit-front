import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpService } from '../http/http.service';

interface ActiveProfessionalSummary {
  user: { _id: string } | null;
}

// Tab Coach, Fase 1 — detecta si el usuario autenticado tiene al menos un
// profesional (entrenador/nutricionista) con relación ACTIVA, para decidir
// si el tab "Coach" se muestra en la barra de navegación. Vive en
// shared-core (no en shared-features) porque lo consumen tanto la capa app
// (tabs.page.ts) como shared-features (user-loader.page.ts) — misma
// dirección de dependencias que UserService.
@Injectable({ providedIn: 'root' })
export class CoachService {
  private readonly _hasActiveCoach: WritableSignal<boolean> = signal(false);
  public readonly hasActiveCoach = computed(() => this._hasActiveCoach());

  constructor(private http: HttpService) {}

  // Nunca debe romper el flujo que la llama (arranque de la app, respuesta a
  // una invitación, desvinculación) — cualquier fallo se traduce en "sin
  // coach activo" en vez de propagar el error.
  public refresh(): Observable<boolean> {
    return this.http.get<ActiveProfessionalSummary[]>('trainer/info').pipe(
      map((professionals) => (professionals || []).length > 0),
      tap((hasActiveCoach) => this._hasActiveCoach.set(hasActiveCoach)),
      catchError(() => {
        this._hasActiveCoach.set(false);
        return of(false);
      })
    );
  }
}
