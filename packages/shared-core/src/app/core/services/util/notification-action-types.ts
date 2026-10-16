import { LocalNotifications } from '@capacitor/local-notifications';
import { TranslateService } from '@ngx-translate/core';

// Botones de las notificaciones locales de la app del cliente.
//
// Se registran TODOS en la misma llamada: en iOS cada `registerActionTypes`
// sustituye el juego entero de categorías, así que registrar los del entreno
// y después los de suplementos por separado dejaría solo los últimos.

/** Serie pendiente del entreno: "Hecha" y "Saltar" (WorkoutNotificationService). */
export const SET_ACTION_TYPE_ID = 'CURRENT_SET_ACTIONS';
/** Recordatorio de un suplemento: "Tomado" (SupplementReminderService). */
export const SUPPLEMENT_ACTION_TYPE_ID = 'SUPPLEMENT_REMINDER_ACTIONS';
export const SUPPLEMENT_TAKEN_ACTION_ID = 'taken';

export async function registerNotificationActionTypes(translate: TranslateService): Promise<void> {
  await LocalNotifications.registerActionTypes({
    types: [
      {
        id: SET_ACTION_TYPE_ID,
        actions: [
          { id: 'done', title: translate.instant('WORKOUT_NOTIFICATION.DONE') },
          { id: 'skip', title: translate.instant('WORKOUT_NOTIFICATION.SKIP') },
        ],
      },
      {
        id: SUPPLEMENT_ACTION_TYPE_ID,
        // foreground: en iOS una acción de fondo con la app cerrada puede no
        // llegar a ejecutar el JS que marca la toma.
        actions: [{ id: SUPPLEMENT_TAKEN_ACTION_ID, title: translate.instant('LOCAL_NOTIFICATIONS.SUPPLEMENT_TAKEN'), foreground: true }],
      },
    ],
  });
}
