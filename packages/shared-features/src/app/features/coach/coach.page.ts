import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  CoachCurrentPlan,
  CoachDashboard,
  CoachNotification,
  CoachPendingCheckin,
  CoachTask,
} from './models/coach-dashboard.model';
import {
  notificationIcon,
  notificationRoute,
  notificationTitle,
  notificationTrainerName,
} from './models/coach-notification-view';
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

// Continúa hacia el lado del gesto antes de cerrar el hueco. Congelar la
// transición de Ionic evita su rebote al ancho del botón después de ionSwipe.
const notificationLeave = trigger('notificationLeave', [
  transition(':leave', [
    style({ height: '*', marginBottom: '*', overflow: 'hidden', pointerEvents: 'none' }),
    group([
      query('.notification-card-item', [
        style({ transform: '*', transition: 'none' }),
        animate('100ms cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'translateX(-100%)', opacity: 0 })),
      ]),
      query('ion-item-options', [animate('100ms ease-out', style({ opacity: 0 }))]),
    ]),
    animate('150ms cubic-bezier(0.23, 1, 0.32, 1)', style({ height: 0, marginBottom: 0, opacity: 0 })),
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
  // Ya se sabe (una vez) si tiene profesional o invitaciones. Hasta entonces
  // no se pinta el resto de Coach: quien solo tiene una invitación vería el
  // panel entero un instante y luego desaparecería.
  public professionalsResolved = false;
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
  public refreshingNotifications = false;
  public notificationsRefreshFailed = false;
  public readonly deletingNotificationIds = new Set<string>();
  public readonly notificationMotionPreference = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  private readonly readingNotificationIds = new Set<string>();
  private notificationWasDragged = false;

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

  // La página del tab sigue viva al abrir otra pantalla (preferencias,
  // check-ins...), así que volver no repite ngOnInit y "Pendiente de ti"
  // enseñaría lo ya resuelto. La primera entrada ya la carga ngOnInit.
  public ionViewWillEnter(): void {
    if (this.dashboardState === 'loaded') this.loadDashboard(true);
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
        this.professionalsResolved = true;
      })
      .catch(() => {
        this.state = 'error';
        this.professionalsResolved = true;
      });

    // No bloquea el resto de la pantalla si falla, es una sección aparte.
    this.professionalsApi.getHistory().subscribe({
      next: (history) => (this.history = history || []),
      error: () => (this.history = []),
    });
  }

  // Dashboard (check-ins/comidas/preferencias/cobros pendientes, plan
  // actual) — carga independiente de la sección de profesionales: un fallo
  // aquí no debe ocultar "tus profesionales" ni viceversa. En silencio
  // (al volver al tab) no pasa por el esqueleto y un fallo deja lo que había.
  public loadDashboard(silent = false): void {
    if (!silent) this.dashboardState = 'loading';
    this.coachDashboardApi.getDashboard().subscribe({
      next: (dashboard) => {
        this.dashboard = dashboard;
        this.dashboardState = 'loaded';
      },
      error: () => {
        if (!silent) this.dashboardState = 'error';
      },
    });
  }

  // Sin profesional activo y con una invitación pendiente, Coach solo
  // enseña esa invitación: el resto (plan, tareas, check-ins...) está vacío
  // hasta que acepte y solo despista de lo único que puede hacer.
  public get inviteOnly(): boolean {
    return !this.activeProfessionals.length && this.pendingInvites.length > 0;
  }

  public get showCoachContent(): boolean {
    return this.professionalsResolved && !this.inviteOnly;
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

  // "2 planes", "1 plan" o "Sin asignar".
  public get currentPlansStat(): string {
    const count = [this.dashboard?.currentPlans?.training, this.dashboard?.currentPlans?.nutrition].filter(Boolean).length;
    return count ? `${count} plan${count === 1 ? '' : 'es'}` : 'Sin asignar';
  }

  public planDatePrefix(plan: CoachCurrentPlan): string {
    if (plan.status === 'scheduled') return 'empieza el';
    if (plan.status === 'assigned') return 'asignada el';
    return 'desde el';
  }

  // Rediseño "menú de cards" — cada tarjeta de arriba lleva a su sección
  // más abajo en la misma página (no hay pantallas propias por sección
  // todavía). Scroll nativo del elemento, no de IonContent: ion-content usa
  // scroll real del propio host, scrollIntoView funciona tal cual.
  public scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // --- Notificaciones (coach-tab FASE3) ---
  public get notificationsRefreshDisabled(): boolean {
    return this.refreshingNotifications || this.markingAllRead
      || this.deletingNotificationIds.size > 0 || this.readingNotificationIds.size > 0;
  }

  public loadNotifications(): void {
    if (this.notificationsRefreshDisabled) return;

    const hadNotifications = this.notificationsState === 'loaded';
    this.refreshingNotifications = true;
    this.notificationsRefreshFailed = false;
    if (!hadNotifications) this.notificationsState = 'loading';

    this.notificationsApi.getMine().pipe(
      finalize(() => (this.refreshingNotifications = false))
    ).subscribe({
      next: (notifications) => {
        this.notifications = notifications || [];
        this.updateVisibleNotifications();
        this.notificationsState = 'loaded';
        this.notificationsService.setUnreadCount(this.unreadNotificationsCount);
      },
      error: () => {
        this.notificationsRefreshFailed = true;
        this.notificationsState = hadNotifications ? 'loaded' : 'error';
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
    if (this.notificationsRefreshDisabled || !this.unreadNotificationsCount) return;

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
    return notificationIcon(notification);
  }

  public isNotificationInteractive(notification: CoachNotification): boolean {
    return notificationRoute(notification) !== null;
  }

  public notificationTrainerName(notification: CoachNotification): string {
    return notificationTrainerName(notification);
  }

  public notificationTitle(notification: CoachNotification): string {
    return notificationTitle(notification);
  }

  public startNotificationPointer(): void {
    // Solo un nuevo gesto deliberado vuelve a habilitar el click. El click
    // sintetizado al soltar un swipe no va precedido de otro pointerdown.
    this.notificationWasDragged = false;
  }

  public dragNotification(): void {
    this.notificationWasDragged = true;
  }

  public async openNotification(
    notification: CoachNotification,
    event: MouseEvent,
    slidingItem: IonItemSliding
  ): Promise<void> {
    if (
      (event.detail !== 0 && this.notificationWasDragged)
      || this.refreshingNotifications || this.markingAllRead
      || this.deletingNotificationIds.has(notification._id)
      || !this.notifications.some((item) => item._id === notification._id)
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Tocar una tarjeta con acciones abiertas solo cierra el deslizamiento.
    if (Math.abs(await slidingItem.getOpenAmount()) > 0) {
      event.preventDefault();
      event.stopPropagation();
      void slidingItem.close();
      return;
    }

    // getOpenAmount es asíncrono: mientras tanto puede comenzar un refresh
    // o borrarse esta fila por el gesto que acaba de terminar.
    if (this.refreshingNotifications || this.markingAllRead
      || !this.notifications.some((item) => item._id === notification._id)) return;

    if (!notification.read) {
      notification.read = true;
      this.notificationsService.decrementBy(1);
      this.readingNotificationIds.add(notification._id);
      this.notificationsApi.markRead(notification._id).pipe(
        finalize(() => this.readingNotificationIds.delete(notification._id))
      ).subscribe({
        error: () => {
          notification.read = false;
          this.notificationsService.setUnreadCount(this.unreadNotificationsCount);
        },
      });
    }

    // task_assigned ya se ve en "Tareas de hoy" de esta misma página.
    const route = notificationRoute(notification);
    if (route) void this.router.navigate(route.commands, route.extras);
  }

  public trackByNotificationId(_index: number, notification: CoachNotification): string {
    return notification._id;
  }

  // Tanto el swipe completo como el botón borran de forma optimista. El id
  // pendiente protege la fila que Angular conserva durante la animación.
  public deleteNotification(
    notification: CoachNotification,
    slidingItem: IonItemSliding,
    event: Event
  ): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.refreshingNotifications || this.markingAllRead || this.readingNotificationIds.has(notification._id)) return;

    const index = this.notifications.findIndex((item) => item._id === notification._id);
    if (index === -1 || this.deletingNotificationIds.has(notification._id)) return;

    const followingIds = new Set(this.notifications.slice(index + 1).map((item) => item._id));
    this.deletingNotificationIds.add(notification._id);
    this.notifications = this.notifications.filter((item) => item._id !== notification._id);
    this.updateVisibleNotifications();
    this.notificationsService.setUnreadCount(this.unreadNotificationsCount);

    this.notificationsApi.delete(notification._id).pipe(
      finalize(() => this.deletingNotificationIds.delete(notification._id))
    ).subscribe({
      error: () => {
        void slidingItem.close();
        // Las respuestas de varios borrados pueden volver desordenadas.
        const followingIndex = this.notifications.findIndex((item) => followingIds.has(item._id));
        this.notifications.splice(followingIndex === -1 ? this.notifications.length : followingIndex, 0, notification);
        this.updateVisibleNotifications();
        this.notificationsService.setUnreadCount(this.unreadNotificationsCount);
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

      // Aceptar ya le hace cliente activo, pero deja el cuestionario inicial
      // pendiente: se le abre al momento (puede volver sin rellenarlo; el
      // aviso de arriba de Coach se queda hasta que lo envíe). El signal solo
      // se rellenaba en el arranque (user-loader.page.ts), por eso se refresca.
      this.onboardingService.refresh().subscribe(() => {
        if (succeeded.length && this.onboardingService.pending()) {
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

  // Acceso a su cuestionario inicial: rellenarlo, editarlo mientras no esté
  // revisado o verlo después.
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
  // pautan así, ver docs/plan-semanas.md §12).
  public taskTargetLabel(task: CoachTask): string {
    const rango = task.targetMax ? ` a ${task.targetMax}` : '';
    return `${task.target}${rango} ${task.unit}`;
  }

  // "Semana 3 · hasta el 20 sept": de qué periodo es el check-in que le
  // están pidiendo.
  public checkinPeriodLabel(item: CoachPendingCheckin): string {
    const fmt = (iso: string): string =>
      new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    const week = item.weekNumber ? `Semana ${item.weekNumber}` : 'Pedido por ' + item.trainerName;
    const hasta = item.closesDate ? ` · hasta el ${fmt(item.closesDate)}` : '';
    return `${week}${hasta}`;
  }

  // "24 ago 2026". La app no registra LOCALE_ID, así que el DatePipe saldría
  // en inglés ("24 Aug 2026").
  public planDateLabel(iso: string): string {
    if (!iso) return '';
    return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
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
