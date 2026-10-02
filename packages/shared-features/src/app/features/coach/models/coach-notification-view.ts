import type { NavigationExtras } from '@angular/router';
import { CoachNotification, CoachNotificationType } from './coach-dashboard.model';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

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
  payment_reminder: 'wallet-outline',
  form_check_reviewed: 'videocam-outline',
};

const MONEY = () => new Intl.NumberFormat(uiLocale(), { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });

export function money(value: unknown, currency: unknown): string {
  const amount = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(amount)) return '';
  if (currency && currency !== 'EUR') return `${amount.toFixed(2)} ${currency}`;
  return MONEY().format(amount);
}

// Día civil "YYYY-MM-DD" → "5 nov", sin que la zona del dispositivo lo mueva.
export function shortDay(value: unknown): string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
  return new Intl.DateTimeFormat(uiLocale(), { day: 'numeric', month: 'short', timeZone: 'UTC' })
    .format(new Date(`${value}T12:00:00Z`))
    .replace('.', '');
}

// Recordatorio de pago: el saldo de AHORA (payload.current) y, si el cobro ya
// se cerró, se dice en vez de seguir reclamando un importe antiguo.
type Translate = (key: string, params?: object) => string;

function paymentReminderTitle(p: Record<string, unknown>, t: Translate): string {
  const current = (p['current'] || null) as { status?: string; balanceCents?: number; dueDay?: string; currency?: string } | null;
  if ((current && current.status !== 'open') || (!current && p['resolution'])) {
    return t('COACH_NOTIFICATIONS.TITLES.PAYMENT_REMINDER_SETTLED');
  }
  const cents = current?.balanceCents ?? (p['balanceCents'] as number | undefined);
  const due = shortDay(current?.dueDay ?? p['dueDay']);
  const amount = typeof cents === 'number' ? money(cents / 100, current?.currency ?? p['currency']) : '';
  if (!amount) return t('COACH_NOTIFICATIONS.TITLES.PAYMENT_REMINDER');
  return due ? t('COACH_NOTIFICATIONS.TITLES.PAYMENT_REMINDER_AMOUNT_DUE', { amount, due }) : t('COACH_NOTIFICATIONS.TITLES.PAYMENT_REMINDER_AMOUNT', { amount });
}

export interface CoachRoute {
  commands: string[];
  extras?: NavigationExtras;
}

export function notificationIcon(notification: CoachNotification): string {
  return NOTIFICATION_ICONS[notification.type] || 'notifications-outline';
}

export function notificationTrainerName(notification: CoachNotification, t: Translate): string {
  if (!notification.trainer) return t('ONBOARDING.YOUR_PROFESSIONAL');
  return `${notification.trainer.name} ${notification.trainer.lastname}`.trim();
}

export function notificationTitle(notification: CoachNotification, t: Translate): string {
  const p = notification.payload || {};
  switch (notification.type) {
    case 'meal_proposal':
      return t('COACH_NOTIFICATIONS.TITLES.MEAL_PROPOSAL', { meal: p['mealSlot'] || t('COACH_NOTIFICATIONS.TITLES.A_MEAL') });
    case 'payment_created':
      return t('COACH_NOTIFICATIONS.TITLES.PAYMENT_CREATED', { amount: money(p['amount'], p['currency']) });
    case 'payment_reminder':
      return paymentReminderTitle(p, t);
    case 'nutrition_preferences_requested':
      return t('COACH_NOTIFICATIONS.TITLES.PREFERENCES_REQUESTED');
    case 'checkin_reviewed':
      return p['name'] ? t('COACH_NOTIFICATIONS.TITLES.CHECKIN_REVIEWED_NAMED', { name: p['name'] }) : t('COACH_NOTIFICATIONS.TITLES.CHECKIN_REVIEWED');
    case 'routine_assigned':
      return t('COACH_NOTIFICATIONS.TITLES.ROUTINE_ASSIGNED', { name: p['routineName'] || '' });
    case 'task_assigned':
      return t('COACH_NOTIFICATIONS.TITLES.TASK_ASSIGNED', { name: p['taskLabel'] || '' });
    case 'intake_submitted':
      return t('COACH_NOTIFICATIONS.TITLES.INTAKE_SUBMITTED');
    case 'client_confirmed':
      return t('COACH_NOTIFICATIONS.TITLES.CLIENT_CONFIRMED');
    case 'meal_prescribed':
      return t('COACH_NOTIFICATIONS.TITLES.MEAL_PRESCRIBED', { name: p['mealName'] || '' });
    case 'anthropometry_requested':
      return t('COACH_NOTIFICATIONS.TITLES.ANTHROPOMETRY_REQUESTED');
    case 'form_check_reviewed':
      return p['exerciseName'] ? t('COACH_NOTIFICATIONS.TITLES.FORM_CHECK_REVIEWED_NAMED', { name: p['exerciseName'] }) : t('COACH_NOTIFICATIONS.TITLES.FORM_CHECK_REVIEWED');
    default:
      return t('COACH_NOTIFICATIONS.TITLES.DEFAULT');
  }
}

// null = puramente informativa (payment_created, payment_reminder, task_assigned,
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
    case 'form_check_reviewed':
      return { commands: ['/my-form-checks'], extras: { queryParams: { id: p['formCheckId'] } } };
    default:
      return null;
  }
}
