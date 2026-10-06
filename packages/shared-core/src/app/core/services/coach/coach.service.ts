import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

interface ActiveProfessionalSummary {
  user: { _id: string } | null;
  scopes?: ('training' | 'nutrition')[];
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

  // Distinto de hasCoachRelation (que también cuenta invitaciones sin
  // responder): esto es "asignado" de verdad — al menos un profesional con
  // relación ACTIVA. Lo usa configuration.page.ts para ocultar la
  // configuración de anuncios a un cliente que ya lleva un trainer.
  private readonly _hasActiveTrainer: WritableSignal<boolean> = signal(false);
  public readonly hasActiveTrainer = computed(() => this._hasActiveTrainer());

  // Un profesional ACTIVO lleva su nutrición: los objetivos nutricionales
  // los pauta él y el cliente solo los ve (goal-list, nutritional-objectives).
  private readonly _hasNutritionCoach: WritableSignal<boolean> = signal(false);
  public readonly hasNutritionCoach = computed(() => this._hasNutritionCoach());

  constructor(private http: HttpService) {}

  // Lo llama quien ya tiene en la mano las dos listas (refresh, y la página
  // Coach cada vez que las recarga): así el tab y los permisos cambian en el
  // acto tras aceptar, rechazar o desvincularse, sin otra petición aparte.
  public setRelations(active: ActiveProfessionalSummary[] | null, pending: PendingInviteSummary[] | null): boolean {
    const hasActive = (active || []).length > 0;
    const hasCoachRelation = hasActive || (pending || []).length > 0;
    this._hasActiveTrainer.set(hasActive);
    this._hasNutritionCoach.set((active || []).some((p) => p.scopes?.includes('nutrition')));
    this._hasCoachRelation.set(hasCoachRelation);
    return hasCoachRelation;
  }

  // Nunca debe romper el flujo que la llama (arranque de la app, respuesta a
  // una invitación, desvinculación) — cualquier fallo se traduce en "sin
  // relación" en vez de propagar el error.
  public refresh(): Observable<boolean> {
    return forkJoin({
      active: this.http.get<ActiveProfessionalSummary[]>('trainer/info'),
      pending: this.http.get<PendingInviteSummary[]>('trainer/invites/mine'),
    }).pipe(
      map(({ active, pending }) => this.setRelations(active, pending)),
      catchError(() => {
        this._hasCoachRelation.set(false);
        this._hasActiveTrainer.set(false);
        this._hasNutritionCoach.set(false);
        return of(false);
      })
    );
  }
}
