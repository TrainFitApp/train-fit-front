import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  CoachDashboard,
  CoachNotification,
  CoachNotificationType,
  CoachPendingCheckin,
  CoachTask,
} from './models/coach-dashboard.model';
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

// Mismo conjunto de tipos que navegan a algo en openNotification() — de
// aquí sale el chevron que indica que la tarjeta es tocable. Un tipo nuevo
// se añade UNA vez aquí y en el switch de openNotification(), nunca solo
// en uno de los dos (si no, el chevron mentiría sobre si hace algo o no).
const NAVIGABLE_NOTIFICATION_TYPES = new Set<CoachNotificationType>([
  'meal_proposal',
  'nutrition_preferences_requested',
  'checkin_reviewed',
  'routine_assigned',
  'meal_prescribed',
  'anthropometry_requested',
]);

// Al borrar una notificación, quitarla del array de golpe hacía que
// *ngFor la desmontara en el mismo frame: las de abajo saltaban a rellenar
// el hueco de golpe, sin transición. Con :leave, Angular retrasa el
// desmontaje hasta que esta animación termina — la altura arranca en su
// valor real ('*', calculado en ese instante) y baja a 0, así que el hueco
// se cierra en el propio frame a frame del layout y las siguientes
// notificaciones suben deslizándose en vez de saltar. Misma curva que ya usa
// el resto de esta pantalla (--ease-out) para que se sienta parte del mismo
// sistema, no un efecto aparte.
const notificationLeave = trigger('notificationLeave', [
  transition(':leave', [
    style({ height: '*', marginBottom: '*', opacity: 1 }),
    animate('260ms cubic-bezier(0.23, 1, 0.32, 1)', style({ height: 0, marginBottom: 0, opacity: 0 })),
  ]),
]);

// Tab Coach, Fase 1 — hub único de todo lo relacionado con los profesionales
// del cliente (entrenador/nutricionista): invitaciones, profesionales
// activos, historial, más el dashboard (check-ins/comidas/preferencias/
// cobros pendientes, plan actual asignado). Único punto de entrada — el
// tab ya se muestra en cuanto hay una invitación (ver CoachService), así
// que ya no hace falta el acceso alternativo "Mis profesionales" que vivía
// en Configuración. Centraliza ENLAZANDO a pantallas ya construidas
// (my-checkins, nutrition-preferences, diets), no las duplica.
@Component({
  selector: 'app-coach',
  templateUrl: 'coach.page.html',
  styleUrls: ['coach.page.scss'],
  animations: [notificationLeave],
})
export class CoachPage implements OnInit {
  public state: ViewState = 'loading';
  public pendingInvites: PendingInvite[] = [];
  public activeProfessionals: ProfessionalSummary[] = [];
  // Aceptar/rechazar actúa sobre TODAS las invitaciones del grupo (mismo
  // trainer) a la vez, no por scope — de ahí que la clave sea trainerId, no
  // el id de una invitación concreta.
  public respondingTrainerId: string | null = null;
  public unlinkingScope: ProfessionalScope | null = null;

  public history: HistoryEntry[] = [];
  public showHistory = false;

  public dashboardState: ViewState = 'loading';
  public dashboard: CoachDashboard | null = null;

  // coach-tab FASE3 — centro de notificaciones in-app.
  public notificationsState: ViewState = 'loading';
  public notifications: CoachNotification[] = [];

  // Rediseño "menú de cards" — antes se mostraban TODAS las notificaciones
  // apiladas de golpe; ahora un preview corto + "Mostrar más" (mismos datos
  // ya cargados, sin llamada nueva al backend). Calculado explícitamente
  // (no un getter reevaluado en cada ciclo de detección de cambios del
  // *ngFor — mismo criterio ya aplicado varias veces en este código base).
  private static readonly NOTIFICATIONS_PREVIEW_COUNT = 4;
  public visibleNotifications: CoachNotification[] = [];
  public showAllNotifications = false;

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
    public onboardingService: OnboardingService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
    this.loadDashboard();
    this.loadNotifications();
    this.loadTasks();
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

  public get pendingCount(): number {
    if (!this.dashboard) return 0;
    return (
      this.dashboard.pendingCheckins.length +
      this.dashboard.pendingMealProposals.length +
      (this.dashboard.nutritionPreferences?.pending ? 1 : 0) +
      this.dashboard.pendingPayments.length
    );
  }

  // Rediseño "menú de cards" — cada tarjeta de arriba lleva a su sección
  // más abajo en la misma página (no hay pantallas propias por sección
  // todavía). Scroll nativo del elemento, no de IonContent: ion-content usa
  // scroll real del propio host, scrollIntoView funciona tal cual.
  public scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // --- Notificaciones (coach-tab FASE3) ---
  public loadNotifications(): void {
    this.notificationsState = 'loading';
    this.notificationsApi.getMine().subscribe({
      next: (notifications) => {
        this.notifications = notifications || [];
        this.showAllNotifications = false;
        this.updateVisibleNotifications();
        this.notificationsState = 'loaded';
      },
      error: () => {
        this.notificationsState = 'error';
      },
    });
  }

  private updateVisibleNotifications(): void {
    this.visibleNotifications = this.showAllNotifications
      ? this.notifications
      : this.notifications.slice(0, CoachPage.NOTIFICATIONS_PREVIEW_COUNT);
  }

  public toggleShowAllNotifications(): void {
    this.showAllNotifications = !this.showAllNotifications;
    this.updateVisibleNotifications();
  }

  public get unreadNotificationsCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  public markingAllRead = false;

  public markAllRead(): void {
    if (this.markingAllRead || !this.unreadNotificationsCount) return;

    this.markingAllRead = true;
    this.notificationsApi.markAllRead().subscribe({
      next: () => {
        this.markingAllRead = false;
        this.notifications.forEach((n) => (n.read = true));
        this.updateVisibleNotifications();
        this.notificationsService.markAllReadLocally();
      },
      error: () => {
        this.markingAllRead = false;
        this.ionicUtilService.showErrorToast('No se pudieron marcar como leídas', 'Error', 2500);
      },
    });
  }

  public notificationIcon(notification: CoachNotification): string {
    return NOTIFICATION_ICONS[notification.type] || 'notifications-outline';
  }

  public isNotificationInteractive(notification: CoachNotification): boolean {
    return NAVIGABLE_NOTIFICATION_TYPES.has(notification.type);
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
      case 'checkin_reviewed':
        return `Check-in revisado${p.name ? ': ' + p.name : ''}`;
      case 'routine_assigned':
        return `Nueva rutina asignada: ${p.routineName || ''}`;
      case 'task_assigned':
        return `Nuevo hábito: ${p.taskLabel || ''}`;
      case 'intake_submitted':
        return 'Cuestionario inicial enviado';
      case 'client_confirmed':
        return 'Tu profesional te ha confirmado';
      case 'meal_prescribed':
        return `Nueva comida pautada: ${p.mealName || ''}`;
      case 'anthropometry_requested':
        return 'Te ha pedido nuevas medidas corporales';
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
        void this.router.navigate(['/my-checkins'], { queryParams: p.requestId ? { requestId: p.requestId } : {} });
        break;
      case 'routine_assigned':
        void this.router.navigate(['/tabs/summary']);
        break;
      case 'meal_prescribed':
        void this.router.navigate(['/tabs/diets'], { state: { selectedDate: p.date } });
        break;
      case 'anthropometry_requested':
        void this.router.navigate(['/weight-info']);
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

  // Borrado por deslizamiento (ion-item-sliding) — dos gestos llegan aquí:
  // revelar el botón rojo y pulsarlo, o deslizar de un tirón hasta el final
  // (expandable + ionSwipe en la plantilla, estilo Gmail/Spotify). Ambos
  // cuentan como confirmación deliberada, sin alerta nativa encima. Guard de
  // índice: si los dos gestos llegaran a disparar sobre la misma notificación
  // (p.ej. el soltar del swipe completo también registrase como click), la
  // segunda llamada no debe volver a insertar algo que ya se borró.
  // Optimista: si el backend falla, se reinserta en su posición original y se
  // avisa por toast, igual que el resto de acciones de esta pantalla.
  public deleteNotification(notification: CoachNotification, slidingItem: IonItemSliding): void {
    const index = this.notifications.indexOf(notification);
    if (index === -1) return;

    const wasUnread = !notification.read;
    this.notifications = this.notifications.filter((n) => n !== notification);
    this.updateVisibleNotifications();

    this.notificationsApi.delete(notification._id).subscribe({
      next: () => {
        if (wasUnread) this.notificationsService.decrementBy(1);
      },
      error: () => {
        // Solo aquí hace falta cerrar el swipe — la notificación vuelve a su
        // sitio y debe verse en reposo, no a medio deslizar. En el camino
        // feliz no se llama: el item se borra abierto/expandido tal cual
        // estaba, la animación de salida (:leave) lo encoge entero.
        void slidingItem.close();
        this.notifications.splice(index, 0, notification);
        this.updateVisibleNotifications();
        this.ionicUtilService.showErrorToast('No se pudo eliminar la notificación', 'Error', 2500);
      },
    });
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

  public get completedTasksCount(): number {
    return this.tasks.filter((t) => t.completedToday).length;
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

  // Aceptar/rechazar es UNA sola acción para todo el grupo (mismo trainer,
  // sus scopes a la vez) en vez de una por invitación — antes, un trainer
  // que invitaba a entrenamiento+nutrición a la vez mostraba 2 botones
  // Aceptar y 2 Rechazar repitiendo su nombre/avatar. Cada invitación sigue
  // siendo su propia petición al backend (no hay endpoint bulk), pero
  // encadenadas en paralelo y reportadas como un solo resultado.
  public acceptGroup(group: GroupedPendingInvite): void {
    this.respondingTrainerId = group.trainerId;
    const requests = group.invites.map((invite) =>
      this.professionalsApi.acceptInvite(invite._id).pipe(
        map(() => ({ invite, success: true, error: null as string | null })),
        catchError((err) =>
          of({ invite, success: false, error: err?.error?.message || 'No se pudo aceptar' })
        )
      )
    );

    forkJoin(requests).subscribe((results) => {
      this.respondingTrainerId = null;

      const succeeded = results.filter((r) => r.success);
      if (succeeded.length) {
        const scopes = succeeded.map((r) => this.scopeLabel(r.invite.scope).toLowerCase()).join(' y ');
        this.ionicUtilService.showToast({
          message: `Ahora ${this.getTrainerName(group.invites[0])} lleva tu ${scopes}`,
          duration: 3500,
        });
      }
      results
        .filter((r) => !r.success)
        .forEach((r) => {
          this.ionicUtilService.showErrorToast(
            `${this.scopeLabel(r.invite.scope)}: ${r.error}`,
            'No se pudo aceptar',
            4000
          );
        });

      this.load();
      this.loadDashboard();
      this.coachService.refresh().subscribe();

      // Aceptar deja la relación en "cuestionario_pendiente" — el guard que
      // salta a /onboarding-status lee OnboardingService.blocked() de forma
      // síncrona (signal), pero ese signal solo se rellenaba en el arranque
      // (user-loader.page.ts). Sin refrescarlo aquí, el cuestionario no
      // aparecía hasta recargar la app entera. Se navega explícito en vez
      // de esperar a que el usuario toque otra pestaña y dispare el guard
      // por casualidad.
      this.onboardingService.refresh().subscribe(() => {
        if (this.onboardingService.blocked()) {
          void this.router.navigate(['/onboarding-status']);
        }
      });
    });
  }

  public async confirmDeclineGroup(group: GroupedPendingInvite): Promise<void> {
    const scopes = group.invites.map((i) => this.scopeLabel(i.scope)).join(' y ');
    await this.ionicUtilService.showAlert({
      header: 'Rechazar invitación',
      message: `¿Seguro que quieres rechazar la invitación de ${this.getTrainerName(group.invites[0])} (${scopes})?`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Rechazar',
          cssClass: 'alert-button-danger',
          handler: () => this.declineGroup(group),
        },
      ],
    });
  }

  private declineGroup(group: GroupedPendingInvite): void {
    this.respondingTrainerId = group.trainerId;
    const requests = group.invites.map((invite) =>
      this.professionalsApi.declineInvite(invite._id).pipe(
        map(() => true),
        catchError(() => of(false))
      )
    );

    forkJoin(requests).subscribe((results) => {
      this.respondingTrainerId = null;
      if (results.some((success) => !success)) {
        this.ionicUtilService.showErrorToast('No se pudo rechazar alguna invitación', 'Error', 3000);
      }
      this.load();
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

  // El cliente pudo elegir "Más tarde" en onboarding-status (ver
  // OnboardingService#dismiss) — ya no lo bloquea, pero completar el
  // cuestionario inicial sigue pendiente hasta que lo haga. Sin esto, una
  // vez descartada esa pantalla no había forma de volver a ella salvo
  // cerrar sesión y volver a entrar (el guard es el único sitio que
  // navegaba ahí).
  public goToOnboardingStatus(): void {
    void this.router.navigate(['/onboarding-status']);
  }

  // --- Navegación desde "Pendiente de ti" a las pantallas ya existentes ---
  public goToCheckins(scheduleId?: string): void {
    void this.router.navigate(['/my-checkins'], { queryParams: scheduleId ? { scheduleId } : {} });
  }

  public trackByCheckinId(_index: number, item: { trainerId: string; scheduleId?: string }): string {
    return item.scheduleId || item.trainerId;
  }

  // "10.000 a 15.000 pasos" cuando el hábito lleva rango (los pasos se
  // pautan así, ver docs/plan-revisiones.md §12).
  public taskTargetLabel(task: CoachTask): string {
    const rango = task.targetMax ? ` a ${task.targetMax}` : '';
    return `${task.target}${rango} ${task.unit}`;
  }

  // "Revisión 3 · hasta el 20 sept": de qué periodo es el check-in que le
  // están pidiendo.
  public checkinPeriodLabel(item: CoachPendingCheckin): string {
    const fmt = (iso: string): string =>
      new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    const revision = item.revisionNumber ? `Revisión ${item.revisionNumber}` : 'Pedido por ' + item.trainerName;
    const hasta = item.closesDate ? ` · hasta el ${fmt(item.closesDate)}` : '';
    return `${revision}${hasta}`;
  }

  public goToNutritionPreferences(): void {
    void this.router.navigate(['/nutrition-preferences']);
  }

  // Movimiento 3 Coach Pro — registro diario de dolor por zona. Enlazado
  // desde aquí porque lo lee su profesional, y esta pantalla es la que agrupa todo lo que tiene que ver
  // con él.
  public goToPain(): void {
    void this.router.navigate(['/my-pain']);
  }

  // --- Movimiento 5 Coach Pro ---
  // Las tres viven aquí porque son contenido de SU profesional, y esta pantalla es la que lo agrupa.


  public goToSupplements(): void {
    void this.router.navigate(['/my-supplements']);
  }

  public goToShoppingList(): void {
    void this.router.navigate(['/my-shopping-list']);
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
