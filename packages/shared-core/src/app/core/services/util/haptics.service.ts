import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import {
  HapticKind,
  createHapticThrottle,
  hapticForToastColor,
  isTypingTarget,
} from './haptics.util';

// Solo vibra en nativo y si la app lleva el plugin (hoy, la del cliente): en
// web y en las apps sin `@capacitor/haptics` todas las llamadas son no-op.
@Injectable({
  providedIn: 'root',
})
export class HapticsService {
  private readonly enabled =
    Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('Haptics');
  private readonly typingThrottle = createHapticThrottle(60);
  private listeningTyping = false;

  /** Toque suave: abrir, añadir, marcar algo hecho. */
  public light(): void {
    this.play('light');
  }

  /** Toque firme: arrancar un entrenamiento. */
  public medium(): void {
    this.play('medium');
  }

  public success(): void {
    this.play('success');
  }

  public warning(): void {
    this.play('warning');
  }

  public error(): void {
    this.play('error');
  }

  public forToastColor(color?: string | null): void {
    const kind = hapticForToastColor(color);
    if (kind) this.play(kind);
  }

  /** Toque ligero al escribir en cualquier campo de texto de la app. */
  public listenTyping(): void {
    if (!this.enabled || this.listeningTyping) return;
    this.listeningTyping = true;
    document.addEventListener(
      'input',
      (event) => {
        if (isTypingTarget(event.target as HTMLInputElement) && this.typingThrottle()) {
          this.play('light');
        }
      },
      { capture: true, passive: true }
    );
  }

  private play(kind: HapticKind): void {
    if (!this.enabled) return;
    const request =
      kind === 'light' || kind === 'medium'
        ? Haptics.impact({ style: IMPACT_STYLES[kind] })
        : Haptics.notification({ type: NOTIFICATION_TYPES[kind] });
    // Un háptico que falla nunca debe romper la acción que lo dispara.
    request.catch(() => undefined);
  }
}

const IMPACT_STYLES = { light: ImpactStyle.Light, medium: ImpactStyle.Medium };

const NOTIFICATION_TYPES = {
  success: NotificationType.Success,
  warning: NotificationType.Warning,
  error: NotificationType.Error,
};
