import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

/** El borrador nunca se comparte entre cuentas o etapas y se borra al enviar. */
@Injectable({ providedIn: 'root' })
export class IntakeDraftService {
  constructor(private readonly auth: AuthService) {}

  public key(kind: 'intake' | 'measurements', trainerId: string, stageId: string): string {
    return `trainfit:${kind}-draft:v1:${this.auth.user?._id || this.auth.user?.email || ''}:${trainerId}:${stageId}`;
  }

  public read<T>(key: string): T | null {
    try {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) as T : null;
    } catch { return null; }
  }

  public save<T>(key: string, draft: T): void {
    if (!key) return;
    try { sessionStorage.setItem(key, JSON.stringify(draft)); } catch { /* La memoria del formulario sigue disponible. */ }
  }

  public clear(key: string): void {
    try { sessionStorage.removeItem(key); } catch { /* Storage puede estar deshabilitado. */ }
  }
}
