import type { NavigationExtras } from '@angular/router';
import { CoachNotification, CoachNotificationType } from './coach-dashboard.model';

// PURO — cómo se pinta y adónde lleva una notificación del Coach. Lo
// comparten el tab Coach y la tarjeta "Tu coach" del perfil, para que un
// tipo nuevo se añada una sola vez.

const NOTIFICATION_ICONS: Record<CoachNotificationType, string> = {
  meal_proposal: 'restaurant-outline',
  payment_created: 'cash-outline',
  // Histórico: ya no se crea (la solicitud sale en "Pendiente de ti"). Se
  // mantiene para las que siguen en la bandeja.
  nutrition_preferences_requested: 'nutrition-outline',
  checkin_reviewed: 'checkmark-circle-outline',
  routine_assigned: 'barbell-outline',
  task_assigned: 'checkbox-outline',
  intake_submitted: 'document-text-outline',
  client_confirmed: 'checkmark-done-outline',
  meal_prescribed: 'restaurant-outline',
  // Histórico: ya no se crea ninguna (las medidas se piden dentro de un
  // check-in). Se mantiene para que las que siguen en la bandeja de un
  // cliente se lean y se abran como siempre, no como "Nueva actividad".
  anthropometry_requested: 'body-outline',
};

export interface CoachRoute {
  commands: string[];
  extras?: NavigationExtras;
}

export function notificationIcon(notification: CoachNotification): string {
  return NOTIFICATION_ICONS[notification.type] || 'notifications-outline';
}

export function notificationTrainerName(notification: CoachNotification): string {
  if (!notification.trainer) return 'Tu profesional';
  return `${notification.trainer.name} ${notification.trainer.lastname}`.trim();
}

export function notificationTitle(notification: CoachNotification): string {
  const p = notification.payload || {};
  switch (notification.type) {
    case 'meal_proposal':
      return `Nueva propuesta para ${p['mealSlot'] || 'una comida'}`;
    case 'payment_created':
      return `Nuevo cobro: ${p['amount']}${p['currency'] === 'EUR' ? '€' : p['currency'] || ''}`;
    case 'nutrition_preferences_requested':
      return 'Te ha pedido tus preferencias nutricionales';
    case 'checkin_reviewed':
      return `Check-in revisado${p['name'] ? ': ' + p['name'] : ''}`;
    case 'routine_assigned':
      return `Nueva rutina asignada: ${p['routineName'] || ''}`;
    case 'task_assigned':
      return `Nuevo hábito: ${p['taskLabel'] || ''}`;
    case 'intake_submitted':
      return 'Cuestionario inicial enviado';
    case 'client_confirmed':
      return 'Tu profesional te ha confirmado';
    case 'meal_prescribed':
      return `Nueva comida pautada: ${p['mealName'] || ''}`;
    case 'anthropometry_requested':
      return 'Te ha pedido nuevas medidas corporales';
    default:
      return 'Nueva actividad';
  }
}

// null = puramente informativa (payment_created, task_assigned,
// intake_submitted, client_confirmed): sin pantalla propia a la que ir. De
// aquí sale también el chevron que indica que la tarjeta es tocable.
export function notificationRoute(notification: CoachNotification): CoachRoute | null {
  const p = notification.payload || {};
  switch (notification.type) {
    case 'meal_proposal':
    case 'meal_prescribed':
      return { commands: ['/tabs/diets'], extras: { state: { selectedDate: p['date'] } } };
    case 'nutrition_preferences_requested':
      return { commands: ['/nutrition-preferences'] };
    case 'checkin_reviewed':
      return { commands: ['/my-checkins'] };
    case 'routine_assigned':
      return { commands: ['/tabs/summary'] };
    case 'anthropometry_requested':
      return { commands: ['/weight-info'] };
    default:
      return null;
  }
}
