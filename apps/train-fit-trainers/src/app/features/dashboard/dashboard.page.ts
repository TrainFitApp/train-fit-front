import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TrainerClientsApiService } from '../clients/services/trainer-clients-api.service';
import { CheckinReportsApiService } from '../checkins/services/checkin-reports-api.service';
import { TrainerNotificationsApiService } from './services/trainer-notifications-api.service';
import { TrainerNotification, TrainerNotificationType } from './models/trainer-notification.model';
import { TrainerPaymentsApiService } from './services/trainer-payments-api.service';
import { PaymentsSummary } from './models/payments-summary.model';

type ViewState = 'loading' | 'error' | 'loaded';

const NOTIFICATION_ICONS: Record<TrainerNotificationType, string> = {
  invite_accepted: 'person-add-outline',
  intake_submitted_trainer: 'document-text-outline',
  checkin_responded: 'clipboard-outline',
  nutrition_preferences_updated: 'nutrition-outline',
};

// TASK-001 (MASTER_BACKLOG.md) — antes: KPIs, tareas y alertas 100% inventados
// (nombres de cliente que no existen en la BD real). Ahora conecta con datos
// reales donde ya existe un endpoint que los respalda 1:1. "Tareas de hoy" y
// "Rutinas pendientes de revisar" se retiran en vez de rellenarse con otro
// mock: no existe ningún concepto de agenda del entrenador ni de "rutina
// enviada a revisión" en el backend hoy — inventar una UI para un concepto
// que no existe sería el mismo problema del audit con otro disfraz. Ver
// TASK-077 (seguimiento) para construir esa base real antes de tener un
// hueco que llenar aquí.
//
// "Plantillas de entrenamiento" y "Evolución de clientes (peso)" se
// retiraron a petición del usuario (no aportaban valor operativo diario en
// el dashboard). En su lugar, "Cobros": tarjeta de pendiente/vencido +
// gráfica de barras mensual junto a "Actividad reciente" — una sola query
// agregada (trainer-payment-dao.js#getPaymentsOverview) en vez del fan-out
// por cliente que tenía el gráfico de evolución.
const MONTH_LABELS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public state: ViewState = 'loading';

  public activeClientsCount = 0;
  public checkinResponsesCount = 0;

  public paymentsSummary: PaymentsSummary | null = null;

  // --- Notificaciones (sustituye el hueco "Agenda y revisiones") ---
  public notificationsState: ViewState = 'loading';
  public notifications: TrainerNotification[] = [];

  constructor(
    private trainerClientsApi: TrainerClientsApiService,
    private checkinReportsApi: CheckinReportsApiService,
    private trainerPaymentsApi: TrainerPaymentsApiService,
    private trainerNotificationsApi: TrainerNotificationsApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.load();
    this.loadNotifications();
  }

  public ionViewWillEnter(): void {
    this.load();
    this.loadNotifications();
  }

  // Carga aparte del resto del dashboard — un fallo aquí no debe ocultar
  // los stat cards ni viceversa (mismo criterio que loadDashboard() en
  // coach.page.ts, lado cliente).
  public loadNotifications(): void {
    this.notificationsState = 'loading';
    this.trainerNotificationsApi.getMine().subscribe({
      next: (notifications) => {
        this.notifications = notifications.slice(0, 8);
        this.notificationsState = 'loaded';
      },
      error: () => {
        this.notificationsState = 'error';
      },
    });
  }

  public notificationIcon(notification: TrainerNotification): string {
    return NOTIFICATION_ICONS[notification.type] || 'notifications-outline';
  }

  public notificationClientName(notification: TrainerNotification): string {
    if (!notification.client) return 'Un cliente';
    return `${notification.client.name} ${notification.client.lastname}`.trim();
  }

  public notificationTitle(notification: TrainerNotification): string {
    const name = this.notificationClientName(notification);
    switch (notification.type) {
      case 'invite_accepted':
        return `${name} aceptó tu invitación`;
      case 'intake_submitted_trainer':
        return `${name} completó su cuestionario inicial`;
      case 'checkin_responded':
        return `${name} respondió un check-in`;
      case 'nutrition_preferences_updated':
        return `${name} actualizó sus preferencias nutricionales`;
      default:
        return 'Nueva actividad';
    }
  }

  public openNotification(notification: TrainerNotification): void {
    if (!notification.read) {
      notification.read = true;
      this.trainerNotificationsApi.markRead(notification._id).subscribe();
    }

    switch (notification.type) {
      case 'checkin_responded':
        void this.router.navigate(['/tabs/checkins']);
        break;
      case 'nutrition_preferences_updated':
      case 'intake_submitted_trainer':
      case 'invite_accepted':
        if (notification.client) {
          void this.router.navigate(['/tabs/clients', notification.client._id]);
        } else {
          void this.router.navigate(['/tabs/clients']);
        }
        break;
      default:
        break;
    }
  }

  public markAllNotificationsRead(): void {
    this.trainerNotificationsApi.markAllRead().subscribe(() => {
      this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
    });
  }

  public get hasUnreadNotifications(): boolean {
    return this.notifications.some((n) => !n.read);
  }

  public trackByNotificationId(_index: number, notification: TrainerNotification): string {
    return notification._id;
  }

  public load(): void {
    this.state = 'loading';
    forkJoin({
      clients: this.trainerClientsApi.getMyClients(),
      checkinResponses: this.checkinReportsApi.getMyResponses(),
    }).subscribe({
      next: ({ clients, checkinResponses }) => {
        this.activeClientsCount = clients.length;
        this.checkinResponsesCount = checkinResponses.length;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
    this.loadPaymentsSummary();
  }

  // Carga aparte (mismo criterio que loadNotifications): un fallo aquí no
  // debe tumbar el resto del dashboard.
  public loadPaymentsSummary(): void {
    this.trainerPaymentsApi.getOverview().subscribe({
      next: (summary) => {
        this.paymentsSummary = summary;
      },
      error: () => {
        this.paymentsSummary = null;
      },
    });
  }

  public monthLabel(month: string): string {
    const monthIndex = Number(month.slice(5, 7)) - 1;
    return MONTH_LABELS[monthIndex] || month;
  }

  // Fracción 0..1 para transform: scaleY() — nunca height (layout thrash).
  // Barra a 0 = sin cobros ese mes (visible como línea base, no ausente) —
  // normalizado contra el máximo de la propia serie, no una escala fija.
  public monthBarScale(point: { totalAmount: number }, series: { totalAmount: number }[]): number {
    const max = Math.max(...series.map((p) => p.totalAmount), 1);
    const pct = Math.max((point.totalAmount / max) * 100, point.totalAmount > 0 ? 6 : 2);
    return Number((pct / 100).toFixed(4));
  }
}
