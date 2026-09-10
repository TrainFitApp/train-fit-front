import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerClientsApiService } from '../clients/services/trainer-clients-api.service';
import { TrainerNotificationsApiService } from './services/trainer-notifications-api.service';
import { TrainerNotification, TrainerNotificationType } from './models/trainer-notification.model';
import { TrainerPaymentsApiService } from './services/trainer-payments-api.service';
import { PaymentsSummary } from './models/payments-summary.model';
import { CoachAlertsApiService } from './services/coach-alerts-api.service';
import { CoachTasksApiService } from './services/coach-tasks-api.service';
import { CoachAlert, CoachAlertPriority, CoachAlertType } from './models/coach-alert.model';
import { CoachTask } from './models/coach-task.model';

type ViewState = 'loading' | 'error' | 'loaded';
type AlertFilter = 'all' | 'high';

const NOTIFICATION_ICONS: Record<TrainerNotificationType, string> = {
  invite_accepted: 'person-add-outline',
  intake_submitted_trainer: 'document-text-outline',
  checkin_responded: 'clipboard-outline',
  nutrition_preferences_updated: 'nutrition-outline',
};

// Un icono por TIPO de problema, no por prioridad: la prioridad ya se lee en
// el chip de al lado, y repetirla en el icono gastaría el único canal que
// distingue "peso" de "check-in" de un vistazo.
const ALERT_ICONS: Record<CoachAlertType, string> = {
  pending_review: 'document-text-outline',
  checkin_overdue: 'clipboard-outline',
  plan_ending_soon: 'hourglass-outline',
  stagnation: 'remove-outline',
  weight_change: 'trending-up-outline',
  measurement_change: 'resize-outline',
  low_adherence: 'pie-chart-outline',
  inactive_client: 'moon-outline',
};

const PRIORITY_LABELS: Record<CoachAlertPriority, string> = {
  high: 'Urgente',
  medium: 'Revisar',
  low: 'Menor',
};

// Título por defecto de la tarea que nace de cada alerta. El coach puede
// cambiarlo antes de guardar — esto solo evita empezar con un campo vacío
// cuando el siguiente paso es evidente por el tipo de problema.
const TASK_TITLE_BY_ALERT: Record<CoachAlertType, string> = {
  pending_review: 'Revisar cuestionario inicial',
  checkin_overdue: 'Recordar el check-in',
  plan_ending_soon: 'Renovar el plan de nutrición',
  stagnation: 'Revisar estrategia nutricional',
  weight_change: 'Revisar el cambio de peso',
  measurement_change: 'Revisar las medidas',
  low_adherence: 'Contactar para revisar adherencia',
  inactive_client: 'Contactar con el cliente',
};

const MONTH_LABELS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

// Fase 1 Coach Pro — el dashboard deja de ser un panel de métricas para
// responder una sola pregunta: "¿dónde tengo que intervenir hoy?".
//
// Cambios de fondo respecto a la versión anterior:
//   - "Requiere tu atención" leía AttentionItem (3 señales recalculadas en
//     cada carga, sin prioridad ni estado). Ahora lee CoachAlert: 8 señales
//     ya evaluadas, con prioridad, motivo redactado y acciones reales
//     (resolver, crear tarea) — antes la única acción posible era navegar.
//   - Las 3 stat cards de arriba desaparecen como estructura de la página.
//     "Clientes activos" pasa a la línea de contexto del header (es contexto,
//     no una decisión), "Check-ins pendientes" era un recuento de algo que ya
//     está listado justo debajo, y "Cobros pendientes" se funde con su propia
//     gráfica al final. En su lugar, una barra de triaje que además FILTRA la
//     lista — cuenta y sirve para algo, no solo cuenta.
//   - "Mis pendientes" es nuevo: hasta ahora el profesional no tenía dónde
//     anotar lo que debía hacer, y las alertas no tenían adónde desembocar.
// Un check-in ya contestado que espera respuesta del entrenador.
interface PendingCheckinReview {
  requestId: string;
  clientId: string;
  clientName: string;
  name: string;
  respondedAt: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private static readonly ALERT_PREVIEW_COUNT = 12;

  public activeClientsCount: number | null = null;
  public paymentsSummary: PaymentsSummary | null = null;

  // --- Check-ins por revisar ---
  // El cliente que contesta recibe señal de que alguien lo ha leído. Sin
  // esto, revisar dependía de acordarse de entrar cliente a cliente, y el
  // trabajo de contestar un check-in se quedaba sin respuesta al otro lado.
  public pendingReviews: PendingCheckinReview[] = [];

  // --- Alertas ---
  public alertsState: ViewState = 'loading';
  public alerts: CoachAlert[] = [];
  public alertFilter: AlertFilter = 'all';
  public showAllAlerts = false;
  public isEvaluating = false;
  private resolvingAlertIds = new Set<string>();

  // --- Mis pendientes ---
  public tasksState: ViewState = 'loading';
  public tasks: CoachTask[] = [];
  public showTaskPanel = false;
  public taskTitle = '';
  public taskDueDate = '';
  public taskClientId: string | null = null;
  public taskSourceAlertId: string | null = null;
  public taskClientName: string | null = null;
  public isSavingTask = false;

  // --- Actividad reciente ---
  public notificationsState: ViewState = 'loading';
  public notifications: TrainerNotification[] = [];

  constructor(
    private trainerClientsApi: TrainerClientsApiService,
    private trainerPaymentsApi: TrainerPaymentsApiService,
    private trainerNotificationsApi: TrainerNotificationsApiService,
    private coachAlertsApi: CoachAlertsApiService,
    private coachTasksApi: CoachTasksApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router,
    private http: HttpService
  ) {}

  public ngOnInit(): void {
    this.loadAll();
  }

  public ionViewWillEnter(): void {
    this.loadAll();
  }

  // Cada sección carga por su cuenta: un fallo en cobros no debe dejar sin
  // alertas al profesional, ni al revés. Mismo criterio que ya seguía esta
  // página para notificaciones.
  private loadAll(): void {
    this.loadAlerts();
    this.loadTasks();
    this.loadNotifications();
    this.loadClientsCount();
    this.loadPaymentsSummary();
    this.loadPendingReviews();
  }

  private loadPendingReviews(): void {
    this.http.get<PendingCheckinReview[]>('trainer/checkins/pending-reviews').subscribe({
      next: (reviews) => (this.pendingReviews = reviews || []),
      // Es una banda auxiliar: si falla, el panel sigue sirviendo.
      error: () => (this.pendingReviews = []),
    });
  }

  public openPendingReview(review: PendingCheckinReview): void {
    void this.router.navigate(['/tabs/clients', review.clientId], { queryParams: { tab: 'checkins' } });
  }

  public trackByReviewId(_index: number, review: PendingCheckinReview): string {
    return review.requestId;
  }

  // --- Alertas ---

  public loadAlerts(): void {
    this.alertsState = 'loading';
    this.coachAlertsApi.getMine('open').subscribe({
      next: (alerts) => {
        this.alerts = alerts;
        this.alertsState = 'loaded';
      },
      error: () => {
        this.alertsState = 'error';
      },
    });
  }

  public get highPriorityCount(): number {
    return this.alerts.filter((alert) => alert.priority === 'high').length;
  }

  public get filteredAlerts(): CoachAlert[] {
    if (this.alertFilter === 'high') {
      return this.alerts.filter((alert) => alert.priority === 'high');
    }
    return this.alerts;
  }

  public get visibleAlerts(): CoachAlert[] {
    const filtered = this.filteredAlerts;
    return this.showAllAlerts ? filtered : filtered.slice(0, DashboardPage.ALERT_PREVIEW_COUNT);
  }

  public get hiddenAlertsCount(): number {
    return Math.max(0, this.filteredAlerts.length - DashboardPage.ALERT_PREVIEW_COUNT);
  }

  public setAlertFilter(filter: AlertFilter): void {
    this.alertFilter = filter;
    this.showAllAlerts = false;
  }

  public alertIcon(alert: CoachAlert): string {
    return ALERT_ICONS[alert.type] || 'alert-circle-outline';
  }

  public priorityLabel(priority: CoachAlertPriority): string {
    return PRIORITY_LABELS[priority] || 'Revisar';
  }

  // "Detectado hoy" / "hace 3 días" — la antigüedad importa: un
  // estancamiento de hace tres semanas pesa más que el de esta mañana, y una
  // fecha absoluta obliga a calcularlo mentalmente.
  public alertAge(alert: CoachAlert): string {
    const days = Math.floor(
      (Date.now() - new Date(alert.createdAt).getTime()) / 86400000
    );
    if (days <= 0) return 'Detectado hoy';
    if (days === 1) return 'Detectado ayer';
    return `Detectado hace ${days} días`;
  }

  public isResolving(alert: CoachAlert): boolean {
    return this.resolvingAlertIds.has(alert._id);
  }

  public openAlertClient(alert: CoachAlert): void {
    void this.router.navigate(['/tabs/clients', alert.clientId]);
  }

  // Se retira de la lista al instante y se ofrece deshacer en el propio
  // toast: en un panel de triaje, esperar la respuesta del servidor para
  // cada fila hace el trabajo lento, y confirmar cada resolución con un
  // diálogo lo hace insoportable. Si la llamada falla, la fila vuelve.
  public resolveAlert(alert: CoachAlert, event: Event): void {
    event.stopPropagation();
    if (this.resolvingAlertIds.has(alert._id)) return;

    const index = this.alerts.findIndex((a) => a._id === alert._id);
    if (index === -1) return;

    this.resolvingAlertIds.add(alert._id);
    this.alerts = this.alerts.filter((a) => a._id !== alert._id);

    this.coachAlertsApi.setStatus(alert._id, 'resolved').subscribe({
      next: () => {
        this.resolvingAlertIds.delete(alert._id);
        void this.presentUndoToast(alert, index);
      },
      error: (error) => {
        this.resolvingAlertIds.delete(alert._id);
        this.restoreAlert(alert, index);
        void this.ionicUtilService.showErrorToast(error, 'No se pudo resolver la alerta');
      },
    });
  }

  private async presentUndoToast(alert: CoachAlert, index: number): Promise<void> {
    await this.ionicUtilService.showToast({
      message: `Resuelta: ${alert.clientName}`,
      duration: 5000,
      position: 'bottom',
      cssClass: 'toast-safe-area',
      buttons: [
        {
          text: 'Deshacer',
          handler: () => {
            this.coachAlertsApi.setStatus(alert._id, 'open').subscribe({
              next: () => this.restoreAlert(alert, index),
              error: (error) =>
                void this.ionicUtilService.showErrorToast(error, 'No se pudo reabrir la alerta'),
            });
          },
        },
      ],
    });
  }

  // Devuelve la fila a su sitio original, no al final — el orden lo decide la
  // prioridad, y reinsertar al final la haría "saltar" al recargar.
  private restoreAlert(alert: CoachAlert, index: number): void {
    const next = [...this.alerts];
    next.splice(Math.min(index, next.length), 0, alert);
    this.alerts = next;
  }

  // El ciclo natural del evaluador es de 24 h. Sin esta acción, un
  // profesional que acaba de dar de alta a sus clientes vería un panel vacío
  // hasta la mañana siguiente y concluiría que no funciona.
  public evaluateNow(): void {
    if (this.isEvaluating) return;
    this.isEvaluating = true;

    this.coachAlertsApi.evaluateNow().subscribe({
      next: () => {
        this.isEvaluating = false;
        this.loadAlerts();
      },
      error: (error) => {
        this.isEvaluating = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo revisar a tus clientes');
      },
    });
  }

  public trackByAlertId(_index: number, alert: CoachAlert): string {
    return alert._id;
  }

  // --- Mis pendientes ---

  public loadTasks(): void {
    this.tasksState = 'loading';
    this.coachTasksApi.getMine('pending').subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.tasksState = 'loaded';
      },
      error: () => {
        this.tasksState = 'error';
      },
    });
  }

  public openTaskPanel(): void {
    this.taskTitle = '';
    this.taskDueDate = '';
    this.taskClientId = null;
    this.taskClientName = null;
    this.taskSourceAlertId = null;
    this.showTaskPanel = true;
  }

  // Desde una alerta: el título viene propuesto por tipo y la tarea queda
  // atada al cliente y a la alerta de origen, para que la ficha pueda
  // enseñar más tarde de dónde salió.
  public openTaskPanelFromAlert(alert: CoachAlert, event: Event): void {
    event.stopPropagation();
    this.taskTitle = TASK_TITLE_BY_ALERT[alert.type] || 'Revisar cliente';
    this.taskDueDate = '';
    this.taskClientId = alert.clientId;
    this.taskClientName = alert.clientName;
    this.taskSourceAlertId = alert._id;
    this.showTaskPanel = true;
  }

  public closeTaskPanel(): void {
    this.showTaskPanel = false;
  }

  public get canSubmitTask(): boolean {
    return !!this.taskTitle.trim() && !this.isSavingTask;
  }

  public submitTask(): void {
    if (!this.canSubmitTask) return;
    this.isSavingTask = true;

    this.coachTasksApi
      .create({
        title: this.taskTitle.trim(),
        dueDate: this.taskDueDate || null,
        clientId: this.taskClientId,
        sourceAlertId: this.taskSourceAlertId,
      })
      .subscribe({
        next: () => {
          this.isSavingTask = false;
          this.showTaskPanel = false;
          this.loadTasks();
        },
        error: (error) => {
          this.isSavingTask = false;
          void this.ionicUtilService.showErrorToast(error, 'No se pudo crear la tarea');
        },
      });
  }

  // Marcar hecha retira la tarea de la lista de pendientes al instante,
  // mismo criterio optimista que resolver una alerta.
  public completeTask(task: CoachTask, event: Event): void {
    event.stopPropagation();
    const index = this.tasks.findIndex((t) => t._id === task._id);
    this.tasks = this.tasks.filter((t) => t._id !== task._id);

    this.coachTasksApi.update(task._id, { status: 'done' }).subscribe({
      error: (error) => {
        const next = [...this.tasks];
        next.splice(Math.min(index, next.length), 0, task);
        this.tasks = next;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo completar la tarea');
      },
    });
  }

  public openTaskClient(task: CoachTask): void {
    if (!task.clientId) return;
    void this.router.navigate(['/tabs/clients', task.clientId._id]);
  }

  public taskClientLabel(task: CoachTask): string | null {
    if (!task.clientId) return null;
    return `${task.clientId.name} ${task.clientId.lastname}`.trim();
  }

  // "Vence hoy" / "Vencida" / "Vence el 4 sep" — el estado de vencimiento es
  // lo que decide si una tarea sube en la lista, así que se nombra en vez de
  // dejar una fecha suelta que hay que comparar mentalmente con hoy.
  public taskDueLabel(task: CoachTask): string | null {
    if (!task.dueDate) return null;
    const today = new Date().toISOString().slice(0, 10);
    if (task.dueDate < today) return 'Vencida';
    if (task.dueDate === today) return 'Vence hoy';
    return `Vence el ${this.formatShortDate(task.dueDate)}`;
  }

  public isTaskOverdue(task: CoachTask): boolean {
    if (!task.dueDate) return false;
    return task.dueDate <= new Date().toISOString().slice(0, 10);
  }

  private formatShortDate(isoDate: string): string {
    const [, month, day] = isoDate.split('-');
    return `${Number(day)} ${MONTH_LABELS[Number(month) - 1] || ''}`.trim();
  }

  public trackByTaskId(_index: number, task: CoachTask): string {
    return task._id;
  }

  // --- Actividad reciente ---

  public loadNotifications(): void {
    this.notificationsState = 'loading';
    this.trainerNotificationsApi.getMine().subscribe({
      next: (notifications) => {
        this.notifications = notifications.slice(0, 6);
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
        // A la ficha del cliente, subpestaña Check-ins. Antes iba a la
        // bandeja agregada, que se retiró por redundante con esta.
        if (notification.client) {
          void this.router.navigate(['/tabs/clients', notification.client._id], {
            queryParams: { tab: 'checkins' },
          });
        } else {
          void this.router.navigate(['/tabs/clients']);
        }
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

  // --- Contexto (clientes activos, cobros) ---

  public loadClientsCount(): void {
    this.trainerClientsApi.getMyClients().subscribe({
      next: (clients) => {
        this.activeClientsCount = clients.length;
      },
      error: () => {
        this.activeClientsCount = null;
      },
    });
  }

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
