import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { isLegacyPaymentReminder } from '../utils/payments-view.util';

// Hasta 2026-09, crear un cobro programaba un aviso LOCAL del sistema en el
// móvil del entrenador (id derivado del cobro, título "TrainFit", cuerpo
// "Recuerda cobrar a …"). Los avisos de cobro ahora son solo in-app, así que
// se cancelan los pendientes que se reconocen con seguridad como de cobros;
// cualquier otra notificación local (descanso, peso…) se deja intacta.
// Limitación: uno programado en OTRO dispositivo solo se limpia cuando ese
// dispositivo abre esta versión de la app.
@Injectable({ providedIn: 'root' })
export class LegacyPaymentRemindersService {
  private done = false;

  public async cleanUp(): Promise<number> {
    if (this.done || !Capacitor.isNativePlatform()) return 0;
    this.done = true;
    try {
      const pending = await LocalNotifications.getPending();
      const legacy = pending.notifications.filter((notification) => isLegacyPaymentReminder(notification));
      if (!legacy.length) return 0;
      await LocalNotifications.cancel({ notifications: legacy.map((notification) => ({ id: notification.id })) });
      return legacy.length;
    } catch (error) {
      console.warn('[Cobros] No se pudieron revisar los avisos locales antiguos', error);
      return 0;
    }
  }
}
