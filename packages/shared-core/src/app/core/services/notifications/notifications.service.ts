import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

interface UnreadCountResponse {
  count: number;
}

// Tab Coach, Fase 3 — contador de notificaciones no leídas para el badge del
// tab Coach. Nunca push remoto (00-riesgos.md R5): el cliente lo ve la
// próxima vez que abre la app o refresca. Cualquier fallo se traduce en 0
// en vez de propagar el error (mismo criterio que CoachService).
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly _unreadCount: WritableSignal<number> = signal(0);
  public readonly unreadCount = computed(() => this._unreadCount());

  constructor(private http: HttpService) {}

  public refresh(): Observable<number> {
    return this.http.get<UnreadCountResponse>('notifications/mine/unread-count').pipe(
      map((res) => res?.count || 0),
      tap((count) => this._unreadCount.set(count)),
      catchError(() => {
        this._unreadCount.set(0);
        return of(0);
      })
    );
  }

  // Actualización optimista tras marcar leída(s) — evita esperar un
  // roundtrip solo para que el badge baje.
  public decrementBy(amount: number): void {
    this._unreadCount.set(Math.max(0, this._unreadCount() - amount));
  }

  public markAllReadLocally(): void {
    this._unreadCount.set(0);
  }
}
