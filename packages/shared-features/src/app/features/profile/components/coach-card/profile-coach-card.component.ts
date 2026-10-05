import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { CoachDashboard, CoachNotification, CoachTask } from '../../../coach/models/coach-dashboard.model';
import {
  CoachRoute,
  money,
  notificationIcon,
  notificationRoute,
  notificationTitle,
  notificationTrainerName,
} from '../../../coach/models/coach-notification-view';
import { CoachDashboardApiService } from '../../../coach/services/coach-dashboard-api.service';
import { NotificationsApiService } from '../../../coach/services/notifications-api.service';
import { HabitsService } from '../../../coach/services/habits.service';

type ViewState = 'loading' | 'error' | 'loaded';

// Una fila de la tarjeta: algo que el cliente tiene que hacer ('action') o
// una notificación sin leer ('notification').
interface CoachCardItem {
  id: string;
  kind: 'action' | 'notification';
  icon: string;
  title: string;
  subtitle: string;
  route: CoachRoute | null;
  notification?: CoachNotification;
}

const COACH_TAB: CoachRoute = { commands: ['/tabs/coach'] };
const PREVIEW_COUNT = 3;
const coachSection = (section: string): CoachRoute => ({
  commands: ['/tabs/coach'],
  extras: { state: { coachSection: section } },
});

// Resumen del tab Coach en el perfil: solo con un profesional ACTIVO (lo
// decide ProfilePage). Primero lo que le toca hacer (check-ins, elegir
// comida, preferencias, cobros, hábitos de hoy sin marcar) y después las
// notificaciones sin leer. Solo atajos: marcar todas como leídas, borrar y
// el resto siguen en Coach.
@Component({
  selector: 'app-profile-coach-card',
  templateUrl: './profile-coach-card.component.html',
  styleUrls: ['./profile-coach-card.component.scss'],
})
export class ProfileCoachCardComponent implements OnInit {
  public state: ViewState = 'loading';
  public items: CoachCardItem[] = [];
  public visibleItems: CoachCardItem[] = [];
  private inFlight = false;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private coachDashboardApi: CoachDashboardApiService,
    private notificationsApi: NotificationsApiService,
    private habitsService: HabitsService,
    private notificationsService: NotificationsService
  ) {}

  public ngOnInit(): void {
    this.refresh();
  }

  // Al volver al perfil (ProfilePage.ionViewWillEnter) recarga sin pasar
  // por el esqueleto; un fallo entonces deja lo que había.
  public refresh(): void {
    if (this.inFlight) return;
    this.inFlight = true;
    const silent = this.state === 'loaded';
    if (!silent) this.state = 'loading';

    forkJoin({
      dashboard: this.coachDashboardApi.getDashboard().pipe(catchError(() => of(null))),
      notifications: this.notificationsApi.getMine().pipe(catchError(() => of(null))),
      tasks: this.habitsService.load().pipe(catchError(() => of(null))),
    }).subscribe(({ dashboard, notifications, tasks }) => {
      this.inFlight = false;
      if (!dashboard && !notifications && !tasks) {
        if (!silent) this.state = 'error';
        return;
      }
      if (notifications) {
        this.notificationsService.setUnreadCount(notifications.filter((n) => !n.read).length);
      }
      this.items = [
        ...this.actionItems(dashboard, tasks),
        ...(notifications || []).filter((n) => !n.read).map((n) => this.notificationItem(n)),
      ];
      this.visibleItems = this.items.slice(0, PREVIEW_COUNT);
      this.state = 'loaded';
    });
  }

  public open(item: CoachCardItem): void {
    const notification = item.notification;
    if (notification && !notification.read) {
      notification.read = true;
      this.notificationsService.decrementBy(1);
      this.notificationsApi.markRead(notification._id).subscribe({
        error: () => this.notificationsService.setUnreadCount(this.notificationsService.unreadCount() + 1),
      });
      // Ya leída: al volver al perfil no debe seguir en la lista.
      this.items = this.items.filter((i) => i !== item);
      this.visibleItems = this.items.slice(0, PREVIEW_COUNT);
    }
    this.go(item.route || COACH_TAB);
  }

  public goToCoach(): void {
    this.go(coachSection('section-pending'));
  }

  public trackById(_index: number, item: CoachCardItem): string {
    return item.id;
  }

  private go(route: CoachRoute): void {
    void this.router.navigate(route.commands, route.extras);
  }

  private actionItems(dashboard: CoachDashboard | null, tasks: CoachTask[] | null): CoachCardItem[] {
    const t = (key: string, params?: object): string => this.translate.instant(`PROFILE.COACH_CARD.${key}`, params);
    const items: CoachCardItem[] = [];

    for (const c of dashboard?.pendingCheckins || []) {
      items.push({
        id: `checkin-${c.scheduleId}`,
        kind: 'action',
        icon: 'clipboard-outline',
        title: c.name || t('CHECKIN'),
        subtitle: c.closesDate ? t('UNTIL', { date: this.shortDate(c.closesDate) }) : t('REQUESTED_BY', { name: c.trainerName }),
        route: { commands: ['/my-checkins'], extras: { queryParams: { scheduleId: c.scheduleId } } },
      });
    }
    for (const p of dashboard?.pendingMealProposals || []) {
      items.push({
        id: `meal-${p.proposalId}`,
        kind: 'action',
        icon: 'restaurant-outline',
        title: t('MEAL_PROPOSAL', { slot: (p.mealSlot || '').toLowerCase() }),
        subtitle: `${p.trainerName} · ${this.shortDate(p.date)}`,
        route: { commands: ['/tabs/diets'], extras: { state: { selectedDate: p.date } } },
      });
    }
    if (dashboard?.nutritionPreferences?.pending) {
      items.push({
        id: 'nutrition-preferences',
        kind: 'action',
        icon: 'nutrition-outline',
        title: t('PREFERENCES'),
        subtitle: t('REQUESTED_BY', { name: dashboard.nutritionPreferences.requestedByName }),
        route: { commands: ['/nutrition-preferences'] },
      });
    }
    for (const p of dashboard?.pendingPayments || []) {
      items.push({
        id: `payment-${p.paymentId}`,
        kind: 'action',
        icon: 'cash-outline',
        title: t('PAYMENT', { amount: money(p.amount, p.currency) }),
        subtitle: `${p.trainerName} · ${t('DUE', { date: this.shortDate(p.dueDate) })}`,
        route: null,
      });
    }
    const done = (tasks || []).filter((task) => task.completedToday).length;
    if (tasks?.length && done < tasks.length) {
      items.push({
        id: 'habits-today',
        kind: 'action',
        icon: 'checkbox-outline',
        title: t('HABITS'),
        subtitle: t('HABITS_PROGRESS', { done, total: tasks.length }),
        route: coachSection('section-tasks'),
      });
    }
    return items;
  }

  private notificationItem(notification: CoachNotification): CoachCardItem {
    return {
      id: `notification-${notification._id}`,
      kind: 'notification',
      icon: notificationIcon(notification),
      title: notificationTitle(notification, (key, params) => this.translate.instant(key, params)),
      subtitle: `${notificationTrainerName(notification, (key, params) => this.translate.instant(key, params))} · ${this.shortDate(notification.createdAt)}`,
      route: notificationRoute(notification),
      notification,
    };
  }

  // "24 sept". La app no registra LOCALE_ID: el DatePipe saldría en inglés.
  private shortDate(iso: string): string {
    if (!iso) return '';
    const locale = this.translate.currentLang === 'en' ? 'en-GB' : 'es-ES';
    return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
  }
}
