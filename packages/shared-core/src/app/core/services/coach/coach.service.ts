import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

interface ActiveProfessionalSummary {
  user: { _id: string } | null;
}

interface PendingInviteSummary {
  _id: string;
}

// Tab Coach, Fase 1 — detecta si el usuario autenticado tiene algo que ver
// en el tab "Coach": un profesional con relación ACTIVA, o una invitación
// todavía sin responder. Antes solo miraba "activa", así que un cliente
// recién invitado no veía el tab y tenía que encontrar el acceso oculto en
// Configuración ("Mis profesionales", ya eliminado) para responder — ahora
// el tab aparece en cuanto hay una invitación, sea cual sea su estado.
// Vive en shared-core (no en shared-features) porque lo consumen tanto la
// capa app (tabs.page.ts) como shared-features (user-loader.page.ts) —
// misma dirección de dependencias que UserService.
@Injectable({ providedIn: 'root' })
export class CoachService {
  private readonly _hasCoachRelation: WritableSignal<boolean> = signal(false);
  public readonly hasCoachRelation = computed(() => this._hasCoachRelation());

  constructor(private http: HttpService) {}

  // Nunca debe romper el flujo que la llama (arranque de la app, respuesta a
  // una invitación, desvinculación) — cualquier fallo se traduce en "sin
  // relación" en vez de propagar el error.
  public refresh(): Observable<boolean> {
    return forkJoin({
      active: this.http.get<ActiveProfessionalSummary[]>('trainer/info'),
      pending: this.http.get<PendingInviteSummary[]>('trainer/invites/mine'),
    }).pipe(
      map(({ active, pending }) => (active || []).length > 0 || (pending || []).length > 0),
      tap((hasCoachRelation) => this._hasCoachRelation.set(hasCoachRelation)),
      catchError(() => {
        this._hasCoachRelation.set(false);
        return of(false);
      })
    );
  }
}
