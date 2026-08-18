import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { CoachDashboard, CoachNotification, CoachNotificationType, CoachTask } from './models/coach-dashboard.model';
import {
  HistoryEntry,
  PendingInvite,
  ProfessionalScope,
  ProfessionalSummary,
} from './models/professional-relation.model';
import { CoachDashboardApiService } from './services/coach-dashboard-api.service';
import { NotificationsApiService } from './services/notifications-api.service';
import { ProfessionalsApiService } from './services/professionals-api.service';
import { TasksApiService } from './services/tasks-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

// Un trainer puede invitar/tener histórico de training+nutrition a la vez
// (2 relaciones, mismo par) — sin agrupar, la tarjeta del profesional se
// repetía una vez por scope. Una fila por PERSONA, igual que ya hace
// activeProfessionals (agrupado server-side) y que se aplicó en la pantalla
// de invitaciones del trainer.
interface GroupedPendingInvite {
  trainerId: string;
  invites: PendingInvite[];
}

interface GroupedHistoryEntry {
  key: string;
  entries: HistoryEntry[];
}

const NOTIFICATION_ICONS: Record<CoachNotificationType, string> = {
  meal_proposal: 'restaurant-outline',
  payment_created: 'cash-outline',
  nutrition_preferences_requested: 'nutrition-outline',
  checkin_requested: 'clipboard-outline',
  routine_assigned: 'barbell-outline',
  goal_assigned: 'flame-outline',
  task_assigned: 'checkbox-outline',
  intake_submitted: 'document-text-outline',
  client_confirmed: 'checkmark-done-outline',
  meal_prescribed: 'restaurant-outline',
};

// Tab Coach, Fase 1 — hub único de todo lo relacionado con los profesionales
// del cliente (entrenador/nutricionista): invitaciones, profesionales
// activos, historial (absorbe lo que antes vivía en `my-professionals`) más
// el dashboard nuevo (check-ins/comidas/preferencias/cobros pendientes,
// plan actual asignado). Centraliza ENLAZANDO a pantallas ya construidas
// (my-checkins, nutrition-preferences, diets), no las duplica.
@Component({
  selector: 'app-coach',
  templateUrl: 'coach.page.html',
  styleUrls: ['coach.page.scss'],
})
export class CoachPage implements OnInit {
  public state: ViewState = 'loading';
  public pendingInvites: PendingInvite[] = [];
  public activeProfessionals: ProfessionalSummary[] = [];
  public respondingId: string | null = null;
  public unlinkingScope: ProfessionalScope | null = null;

  public history: HistoryEntry[] = [];
  public showHistory = false;

  public dashboardState: ViewState = 'loading';
  public dashboard: CoachDashboard | null = null;

  // coach-tab FASE3 — centro de notificaciones in-app.
  public notificationsState: ViewState = 'loading';
  public notifications: CoachNotification[] = [];

  // coach-tab FASE4 — tareas/hábitos de hoy.
  public tasksState: ViewState = 'loading';
  public tasks: CoachTask[] = [];
  public togglingTaskId: string | null = null;

  constructor(
    private router: Router,
    private professionalsApi: ProfessionalsApiService,
    private coachDashboardApi: CoachDashboardApiService,
    private notificationsApi: NotificationsApiService,
    private tasksApi: TasksApiService,
    private coachService: CoachService,
    private notificationsService: NotificationsService,
    private onboardingService: OnboardingService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
    this.loadDashboard();
    this.loadNotifications();
    this.loadTasks();
  }

  public close(): void {
    void this.router.navigate(['/tabs/profile']);
  }

  public load(): void {
    this.state = 'loading';
    Promise.all([
      this.professionalsApi.getPendingInvites().toPromise(),
      this.professionalsApi.getActiveProfessionals().toPromise(),
    ])
      .then(([invites, professionals]) => {
        this.pendingInvites = invites || [];
        this.activeProfessionals = professionals || [];
        this.state = 'loaded';
      })
      .catch(() => {
        this.state = 'error';
      });

    // No bloquea el resto de la pantalla si falla, es una sección aparte.
    this.professionalsApi.getHistory().subscribe({
      next: (history) => (this.history = history || []),
      error: () => (this.history = []),
    });
  }

  // Dashboard (check-ins/comidas/preferencias/cobros pendientes, plan
  // actual) — carga independiente de la sección de profesionales: un fallo
  // aquí no debe ocultar "tus profesionales" ni viceversa.
  public loadDashboard(): void {
    this.dashboardState = 'loading';
    this.coachDashboardApi.getDashboard().subscribe({
      next: (dashboard) => {
        this.dashboard = dashboard;
        this.dashboardState = 'loaded';
      },
      error: () => {
        this.dashboardState = 'error';
      },
    });
  }

  // --- Notificaciones (coach-tab FASE3) ---
  public loadNotifications(): void {
    this.notificationsState = 'loading';
    this.notificationsApi.getMine().subscribe({
      next: (notifications) => {
        this.notifications = notifications || [];
        this.notificationsState = 'loaded';
      },
      error: () => {
        this.notificationsState = 'error';
      },
    });
  }

  public notificationIcon(notification: CoachNotification): string {
    return NOTIFICATION_ICONS[notification.type] || 'notifications-outline';
  }

  public notificationTrainerName(notification: CoachNotification): string {
    if (!notification.trainer) return 'Tu profesional';
    return `${notification.trainer.name} ${notification.trainer.lastname}`.trim();
  }

  public notificationTitle(notification: CoachNotification): string {
    const p = notification.payload || {};
    switch (notification.type) {
      case 'meal_proposal':
        return `Nueva propuesta para ${p.mealSlot || 'una comida'}`;
      case 'payment_created':
        return `Nuevo cobro: ${p.amount}${p.currency === 'EUR' ? '€' : p.currency || ''}`;
      case 'nutrition_preferences_requested':
        return 'Te ha pedido tus preferencias nutricionales';
      case 'checkin_requested':
        return `Nuevo check-in: ${p.templateName || ''}`;
      case 'routine_assigned':
        return `Nueva rutina asignada: ${p.routineName || ''}`;
      case 'goal_assigned':
        return `Nuevo objetivo asignado: ${p.goalName || ''}`;
      case 'task_assigned':
        return `Nuevo hábito: ${p.taskLabel || ''}`;
      case 'intake_submitted':
        return 'Cuestionario inicial enviado';
      case 'client_confirmed':
        return 'Tu profesional te ha confirmado';
      case 'meal_prescribed':
        return `Nueva comida pautada: ${p.mealName || ''}`;
      default:
        return 'Nueva actividad';
    }
  }

  public openNotification(notification: CoachNotification): void {
    if (!notification.read) {
      notification.read = true;
      this.notificationsService.decrementBy(1);
      this.notificationsApi.markRead(notification._id).subscribe();
    }

    const p = notification.payload || {};
    switch (notification.type) {
      case 'meal_proposal':
        void this.router.navigate(['/tabs/diets'], { state: { selectedDate: p.date } });
        break;
      case 'nutrition_preferences_requested':
        void this.router.navigate(['/nutrition-preferences']);
        break;
      case 'checkin_requested':
        void this.router.navigate(['/my-checkins']);
        break;
      case 'routine_assigned':
        void this.router.navigate(['/tabs/summary']);
        break;
      case 'goal_assigned':
        void this.router.navigate(['/tabs/diets/nutritional-objectives']);
        break;
      case 'meal_prescribed':
        void this.router.navigate(['/tabs/diets'], { state: { selectedDate: p.date } });
        break;
      // payment_created, task_assigned, intake_submitted, client_confirmed:
      // puramente informativas, sin pantalla propia a la que ir (task_assigned
      // ya se ve en "Tareas de hoy" de esta misma página).
      default:
        break;
    }
  }

  public trackByNotificationId(_index: number, notification: CoachNotification): string {
    return notification._id;
  }

  // --- Tareas de hoy (coach-tab FASE4) ---
  public loadTasks(): void {
    this.tasksState = 'loading';
    this.tasksApi.getMine().subscribe({
      next: (tasks) => {
        this.tasks = tasks || [];
        this.tasksState = 'loaded';
      },
      error: () => {
        this.tasksState = 'error';
      },
    });
  }

  public toggleTask(task: CoachTask): void {
    if (this.togglingTaskId) return;
    const nextCompleted = !task.completedToday;
    this.togglingTaskId = task._id;
    this.tasksApi.toggle(task._id, nextCompleted).subscribe({
      next: () => {
        this.togglingTaskId = null;
        task.completedToday = nextCompleted;
      },
      error: () => {
        this.togglingTaskId = null;
        this.ionicUtilService.showErrorToast('No se pudo actualizar la tarea', 'Error', 2500);
      },
    });
  }

  public trackByTaskId(_index: number, task: CoachTask): string {
    return task._id;
  }

  public toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  // Getters (sin estado propio) — se recalculan solos cada vez que
  // pendingInvites/history cambian (load()).
  public get groupedPendingInvites(): GroupedPendingInvite[] {
    const groups = new Map<string, GroupedPendingInvite>();
    for (const invite of this.pendingInvites) {
      if (!groups.has(invite.trainerId)) {
        groups.set(invite.trainerId, { trainerId: invite.trainerId, invites: [] });
      }
      groups.get(invite.trainerId)!.invites.push(invite);
    }
    return [...groups.values()];
  }

  // HistoryEntry no trae trainerId (solo el objeto trainer sin _id) — el
  // email es el identificador estable disponible; sin trainer (null,
  // cuenta borrada) cada entrada queda en su propio grupo por su propio id,
  // nunca se fusionan "Un profesional" distintos entre sí por accidente.
  public get groupedHistory(): GroupedHistoryEntry[] {
    const groups = new Map<string, GroupedHistoryEntry>();
    for (const entry of this.history) {
      const key = entry.trainer?.email || entry._id;
      if (!groups.has(key)) groups.set(key, { key, entries: [] });
      groups.get(key)!.entries.push(entry);
    }
    return [...groups.values()];
  }

  public trackByPendingGroup(_index: number, group: GroupedPendingInvite): string {
    return group.trainerId;
  }

  public trackByHistoryGroup(_index: number, group: GroupedHistoryEntry): string {
    return group.key;
  }

  public getHistoryTrainerName(entry: HistoryEntry): string {
    if (!entry.trainer) return 'Un profesional';
    return `${entry.trainer.name} ${entry.trainer.lastname}`.trim();
  }

  public historyEndedByLabel(entry: HistoryEntry): string {
    if (entry.status === 'declined') return 'Rechazada';
    if (entry.revokedBy === 'client') return 'Finalizada por ti';
    if (entry.revokedBy === 'trainer') return 'Finalizada por el profesional';
    return 'Finalizada';
  }

  public getTrainerName(invite: PendingInvite): string {
    if (!invite.trainer) return 'Un profesional';
    return `${invite.trainer.name} ${invite.trainer.lastname}`.trim();
  }

  public getProfessionalName(professional: ProfessionalSummary): string {
    if (!professional.user) return 'Profesional';
    return `${professional.user.name} ${professional.user.lastname}`.trim();
  }

  public scopeLabel(scope: ProfessionalScope): string {
    return scope === 'training' ? 'Entrenamiento' : 'Nutrición';
  }

  // Mismo par de iconos que ya usa el resto de la app para estos 2 ámbitos
  // (selector de scope al invitar, iconos de notificación) — un chip
  // reconocible de un vistazo, no solo texto.
  public scopeIcon(scope: ProfessionalScope): string {
    return scope === 'training' ? 'barbell-outline' : 'nutrition-outline';
  }

  public getInitials(name: string): string {
    return (
      name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase() || '?'
    );
  }

  public accept(invite: PendingInvite): void {
    this.respondingId = invite._id;
    this.professionalsApi.acceptInvite(invite._id).subscribe({
      next: () => {
        this.respondingId = null;
        this.ionicUtilService.showToast({
          message: `Ahora ${this.getTrainerName(invite)} lleva tu ${this.scopeLabel(invite.scope).toLowerCase()}`,
          duration: 3500,
        });
        this.load();
        this.loadDashboard();
        this.coachService.refresh().subscribe();

        // Aceptar deja la relación en "cuestionario_pendiente" — el guard
        // que salta a /onboarding-status lee OnboardingService.blocked()
        // de forma síncrona (signal), pero ese signal solo se rellenaba en
        // el arranque (user-loader.page.ts). Sin refrescarlo aquí, el
        // cuestionario no aparecía hasta recargar la app entera. Se navega
        // explícito en vez de esperar a que el usuario toque otra pestaña
        // y dispare el guard por casualidad.
        this.onboardingService.refresh().subscribe(() => {
          if (this.onboardingService.blocked()) {
            void this.router.navigate(['/onboarding-status']);
          }
        });
      },
      error: (err) => {
        this.respondingId = null;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo aceptar la invitación',
          'Error',
          3500
        );
      },
    });
  }

  public async confirmDecline(invite: PendingInvite): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Rechazar invitación',
      message: `¿Seguro que quieres rechazar la invitación de ${this.getTrainerName(invite)} (${this.scopeLabel(invite.scope)})?`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Rechazar',
          cssClass: 'alert-button-danger',
          handler: () => this.decline(invite),
        },
      ],
    });
  }

  private decline(invite: PendingInvite): void {
    this.respondingId = invite._id;
    this.professionalsApi.declineInvite(invite._id).subscribe({
      next: () => {
        this.respondingId = null;
        this.load();
      },
      error: () => {
        this.respondingId = null;
        this.ionicUtilService.showErrorToast('No se pudo rechazar la invitación', 'Error', 3000);
      },
    });
  }

  public async confirmUnlink(professional: ProfessionalSummary, scope: ProfessionalScope): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Desvincular',
      message: `¿Seguro que quieres desvincularte de ${this.getProfessionalName(professional)} en ${this.scopeLabel(scope).toLowerCase()}?`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Desvincular',
          cssClass: 'alert-button-danger',
          handler: () => this.unlink(scope),
        },
      ],
    });
  }

  private unlink(scope: ProfessionalScope): void {
    this.unlinkingScope = scope;
    this.professionalsApi.unlinkProfessional(scope).subscribe({
      next: () => {
        this.unlinkingScope = null;
        this.load();
        this.loadDashboard();
        this.coachService.refresh().subscribe();
      },
      error: () => {
        this.unlinkingScope = null;
        this.ionicUtilService.showErrorToast('No se pudo desvincular', 'Error', 3000);
      },
    });
  }

  public trackByProfessionalId(_index: number, professional: ProfessionalSummary): string {
    return professional.user?._id || _index.toString();
  }

  // --- Navegación desde "Pendiente de ti" a las pantallas ya existentes ---
  public goToCheckins(): void {
    void this.router.navigate(['/my-checkins']);
  }

  public goToNutritionPreferences(): void {
    void this.router.navigate(['/nutrition-preferences']);
  }

  public goToMealProposal(proposalDate: string): void {
    void this.router.navigate(['/tabs/diets'], { state: { selectedDate: proposalDate } });
  }

  public trackByTrainerId(_index: number, item: { trainerId: string }): string {
    return item.trainerId;
  }

  public trackByProposalId(_index: number, item: { proposalId: string }): string {
    return item.proposalId;
  }

  public trackByPaymentId(_index: number, item: { paymentId: string }): string {
    return item.paymentId;
  }
}
