import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IonItemSliding } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { OPEN_INTAKE_TRAINER_KEY, OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  CoachCurrentPlan,
  CoachDashboard,
  CoachNotification,
  CoachPendingCheckin,
  CoachPendingPayment,
  CoachTask,
} from './models/coach-dashboard.model';
import {
  notificationIcon,
  notificationRoute,
  notificationTitle,
  notificationTrainerName,
  money as formatPaymentMoney,
  shortDay,
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
import { HabitsService } from './services/habits.service';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

type ViewState = 'loading' | 'error' | 'loaded';

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
  // Aceptar/rechazar responde a la vez todos los scopes a los que invita un
  // profesional (una invitación por profesional, ver PendingInvite).
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
  // Salen de HabitsService (el mismo estado que pinta Dieta) para el día
  // que se cargó: si la app pasa la medianoche abierta, al volver a la
  // pestaña se recarga con el día nuevo.
  private tasksDate = '';
  public get tasks(): CoachTask[] {
    return this.habitsService.forDate(this.tasksDate);
  }
  public togglingTaskId: string | null = null;

  // Sección a la que bajar al entrar (state.coachSection, p. ej. desde la
  // tarjeta del perfil).
  private sectionToReveal: string | null = null;

  constructor(
    private router: Router,
    private professionalsApi: ProfessionalsApiService,
    private coachDashboardApi: CoachDashboardApiService,
    private notificationsApi: NotificationsApiService,
    private habitsService: HabitsService,
    private coachService: CoachService,
    private notificationsService: NotificationsService,
    public onboardingService: OnboardingService,
    private navigationService: NavigationService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.load();
    this.loadDashboard();
    this.loadNotifications();
    this.loadTasks();
  }

  // La página del tab sigue viva al abrir otra pantalla (preferencias,
  // check-ins, cuestionario inicial...), así que volver no repite ngOnInit
  // y "Pendiente de ti" enseñaría lo ya resuelto, o la invitación que ya
  // aceptó desde el cuestionario. La primera entrada ya la carga ngOnInit.
  public ionViewWillEnter(): void {
    if (this.state === 'loaded') this.load(true);
    if (this.dashboardState === 'loaded') this.loadDashboard(true);
    if (this.tasksState === 'loaded') this.loadTasks(true);
  }

  // Se borra del history al leerla: volver atrás a Coach no debe repetir
  // el salto.
  public ionViewDidEnter(): void {
    const state = window.history.state;
    if (!state?.coachSection) return;
    this.sectionToReveal = state.coachSection;
    window.history.replaceState({ ...state, coachSection: null }, '');
    this.revealSection();
  }

  // Espera a que todo haya cargado: lo que aparece después por encima
  // (hábitos, pendientes) empujaría la sección fuera de la vista.
  private revealSection(): void {
    if (!this.sectionToReveal) return;
    if (!this.professionalsResolved || this.dashboardState === 'loading' || this.tasksState === 'loading') return;
    const sectionId = this.sectionToReveal;
    this.sectionToReveal = null;
    setTimeout(() => this.scrollToSection(sectionId));
  }

  // silent: recarga al volver a la pestaña, sin esqueleto; si falla se
  // queda lo que había.
  public load(silent = false): void {
    if (!silent) this.state = 'loading';
    Promise.all([
      this.professionalsApi.getPendingInvites().toPromise(),
      this.professionalsApi.getActiveProfessionals().toPromise(),
    ])
      .then(([invites, professionals]) => {
        this.pendingInvites = invites || [];
        this.activeProfessionals = professionals || [];
        // Mismas dos listas que decide el tab Coach: tras rechazar la última
        // invitación o desvincularse, el tab desaparece en el acto (y
        // TabsPage saca al cliente de aquí).
        this.coachService.setRelations(this.activeProfessionals, this.pendingInvites);
        this.state = 'loaded';
        this.professionalsResolved = true;
        this.revealSection();
      })
      .catch(() => {
        if (silent) return;
        this.state = 'error';
        this.professionalsResolved = true;
        this.revealSection();
      });

    // No bloquea el resto de la pantalla si falla, es una sección aparte.
    this.professionalsApi.getHistory().subscribe({
      next: (history) => (this.history = history || []),
      error: () => {
        if (!silent) this.history = [];
      },
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
        this.revealSection();
      },
      error: () => {
        if (!silent) this.dashboardState = 'error';
        this.revealSection();
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
      (this.dashboard.nutritionPreferences?.pending ? 1 : 0) +
      this.dashboard.pendingPayments.length
    );
  }

  // "2 planes", "1 plan" o "Sin asignar".
  public get currentPlansStat(): string {
    const count = [this.dashboard?.currentPlans?.training, this.dashboard?.currentPlans?.nutrition].filter(Boolean).length;
    if (!count) return this.translate.instant('COACH.PLANS_NONE');
    return this.translate.instant(count === 1 ? 'COACH.PLANS_ONE' : 'COACH.PLANS_MANY', { count });
  }

  public planDatePrefix(plan: CoachCurrentPlan): string {
    if (plan.status === 'scheduled') return this.translate.instant('COACH.PLAN_STARTS');
    if (plan.status === 'assigned') return this.translate.instant('COACH.PLAN_ASSIGNED');
    return this.translate.instant('COACH.PLAN_SINCE');
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
        this.ionicUtilService.showErrorToast(this.translate.instant('COACH.MARK_READ_ERROR'), this.translate.instant('COMMON.ERROR'), 2500);
      },
    });
  }

  public notificationIcon(notification: CoachNotification): string {
    return notificationIcon(notification);
  }

  public isNotificationInteractive(notification: CoachNotification): boolean {
    return notificationRoute(notification) !== null;
  }

  private readonly t = (key: string, params?: object): string => this.translate.instant(key, params);

  public notificationTrainerName(notification: CoachNotification): string {
    return notificationTrainerName(notification, this.t);
  }

  public notificationTitle(notification: CoachNotification): string {
    return notificationTitle(notification, this.t);
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
        this.ionicUtilService.showErrorToast(this.translate.instant('COACH.DELETE_NOTIFICATION_ERROR'), this.translate.instant('COMMON.ERROR'), 2500);
      },
    });
  }

  // --- Tareas de hoy (coach-tab FASE4) ---
  // silent: recarga al volver a la pestaña, sin esqueleto; si falla se
  // queda lo que había.
  public loadTasks(silent = false): void {
    const date = this.habitsService.today();
    if (!silent) this.tasksState = 'loading';
    this.habitsService.load(date).subscribe({
      next: () => {
        this.tasksDate = date;
        this.tasksState = 'loaded';
        this.revealSection();
      },
      error: () => {
        if (silent) return;
        this.tasksState = 'error';
        this.revealSection();
      },
    });
  }

  public get completedTasksCount(): number {
    return this.tasks.filter((t) => t.completedToday).length;
  }

  public toggleTask(task: CoachTask): void {
    if (this.togglingTaskId) return;
    this.togglingTaskId = task._id;
    this.habitsService.toggle(task, this.tasksDate).subscribe({
      next: () => {
        this.togglingTaskId = null;
      },
      error: () => {
        this.togglingTaskId = null;
        this.ionicUtilService.showErrorToast(this.translate.instant('COACH.TASK_ERROR'), this.translate.instant('COMMON.ERROR'), 2500);
      },
    });
  }

  public trackByTaskId(_index: number, task: CoachTask): string {
    return task._id;
  }

  public toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  // Getter (sin estado propio) — se recalcula solo cada vez que history
  // cambia (load()).
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

  public trackByPendingInvite(_index: number, invite: PendingInvite): string {
    return invite.trainerId;
  }

  public trackByHistoryGroup(_index: number, group: GroupedHistoryEntry): string {
    return group.key;
  }

  public getHistoryTrainerName(entry: HistoryEntry): string {
    if (!entry.trainer) return this.translate.instant('ONBOARDING.A_PROFESSIONAL');
    return `${entry.trainer.name} ${entry.trainer.lastname}`.trim();
  }

  public historyEndedByLabel(entry: HistoryEntry): string {
    if (entry.status === 'declined') return this.translate.instant('COACH.HISTORY_DECLINED');
    if (entry.revokedBy === 'client') return this.translate.instant('COACH.HISTORY_ENDED_BY_YOU');
    if (entry.revokedBy === 'trainer') return this.translate.instant('COACH.HISTORY_ENDED_BY_COACH');
    return this.translate.instant('COACH.HISTORY_ENDED');
  }

  public getTrainerName(invite: PendingInvite): string {
    if (!invite.trainer) return this.translate.instant('ONBOARDING.A_PROFESSIONAL');
    return `${invite.trainer.name} ${invite.trainer.lastname}`.trim();
  }

  public getProfessionalName(professional: ProfessionalSummary): string {
    if (!professional.user) return this.translate.instant('COACH.PROFESSIONAL');
    return `${professional.user.name} ${professional.user.lastname}`.trim();
  }

  public scopeLabel(scope: ProfessionalScope): string {
    return this.translate.instant(scope === 'training' ? 'ONBOARDING.SCOPE_TRAINING' : 'ONBOARDING.SCOPE_NUTRITION');
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

  // «entrenamiento y nutrición»
  private scopeList(scopes: ProfessionalScope[]): string {
    return scopes.map((scope) => this.scopeLabel(scope).toLowerCase()).join(this.translate.instant('COACH.AND'));
  }

  // Aceptar es UNA petición por profesional: el back acepta a la vez todos
  // los scopes a los que invita, y queda un solo cuestionario de alta para
  // todo. (Antes era una petición por scope en paralelo, y el bloqueo de
  // altas del profesional rechazaba la segunda.)
  public acceptInvite(invite: PendingInvite): void {
    this.respondingTrainerId = invite.trainerId;
    this.professionalsApi
      .acceptInvite(invite.trainerId)
      .pipe(finalize(() => (this.respondingTrainerId = null)))
      .subscribe({
        next: (response) => {
          if (response.scopes.length) {
            this.ionicUtilService.showToast({
              message: this.translate.instant('COACH.ACCEPTED', {
                name: this.getTrainerName(invite),
                scopes: this.scopeList(response.scopes),
              }),
              duration: 3500,
            });
          }
          if (response.pending.length) {
            this.ionicUtilService.showErrorToast(
              this.translate.instant('COACH.ACCEPT_TAKEN', { scopes: this.scopeList(response.pending) }),
              this.translate.instant('COACH.ACCEPT_ERROR'),
              4000
            );
          }
          this.load();
          this.loadDashboard();
          if (response.scopes.length) this.openIntakeIfPending(invite.trainerId);
        },
        error: (err) => {
          this.ionicUtilService.showErrorToast(
            err?.error?.message || this.translate.instant('COACH.ACCEPT_ERROR'),
            this.translate.instant('COMMON.ERROR'),
            4000
          );
          this.load();
        },
      });
  }

  // Aceptar ya le hace cliente activo, pero deja el cuestionario inicial
  // pendiente: se le abre al momento, directo en el formulario de ese
  // profesional (puede cerrarlo; el aviso de Coach se queda hasta que lo
  // envíe). El signal solo se rellenaba en el arranque, por eso se refresca.
  private openIntakeIfPending(trainerId: string): void {
    this.onboardingService.refresh().subscribe((status) => {
      const professional = status.professionals.find((p) => p.trainerId === trainerId);
      if (professional?.intakeStatus !== 'pending') return;
      this.navigationService.setTempData(OPEN_INTAKE_TRAINER_KEY, trainerId);
      void this.router.navigate(['/onboarding-status']);
    });
  }

  public async confirmDeclineInvite(invite: PendingInvite): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('COACH.DECLINE_HEADER'),
      message: this.translate.instant('COACH.DECLINE_MSG', {
        name: this.getTrainerName(invite),
        scopes: invite.scopes.map((scope) => this.scopeLabel(scope)).join(this.translate.instant('COACH.AND')),
      }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        {
          text: this.translate.instant('ONBOARDING.DECLINE'),
          cssClass: 'alert-button-danger',
          handler: () => this.declineInvite(invite),
        },
      ],
    });
  }

  private declineInvite(invite: PendingInvite): void {
    this.respondingTrainerId = invite.trainerId;
    this.professionalsApi
      .declineInvite(invite.trainerId)
      .pipe(finalize(() => (this.respondingTrainerId = null)))
      .subscribe({
        next: () => this.load(),
        error: () => {
          this.ionicUtilService.showErrorToast(this.translate.instant('COACH.DECLINE_ERROR'), this.translate.instant('COMMON.ERROR'), 3000);
          this.load();
        },
      });
  }

  public async confirmUnlink(professional: ProfessionalSummary, scope: ProfessionalScope): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('COACH.UNLINK'),
      message: this.translate.instant('COACH.UNLINK_MSG', {
        name: this.getProfessionalName(professional),
        scope: this.scopeLabel(scope).toLowerCase(),
      }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        {
          text: this.translate.instant('COACH.UNLINK'),
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
      },
      error: () => {
        this.unlinkingScope = null;
        this.ionicUtilService.showErrorToast(this.translate.instant('COACH.UNLINK_ERROR'), this.translate.instant('COMMON.ERROR'), 3000);
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
    const rango = task.targetMax ? ` ${this.translate.instant('COACH.RANGE_TO')} ${task.targetMax}` : '';
    return `${task.target}${rango} ${task.unit}`;
  }

  // "Semana 3 · hasta el 20 sept": de qué periodo es el check-in que le
  // están pidiendo.
  public checkinPeriodLabel(item: CoachPendingCheckin): string {
    const fmt = (iso: string): string =>
      new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short', timeZone: 'UTC' });
    const week = item.weekNumber
      ? this.translate.instant('COACH.WEEK_N', { n: item.weekNumber })
      : this.translate.instant('COACH.REQUESTED_BY', { name: item.trainerName });
    const hasta = item.closesDate ? ` · ${this.translate.instant('COACH.UNTIL', { date: fmt(item.closesDate) })}` : '';
    return `${week}${hasta}`;
  }

  // "24 ago 2026". La app no registra LOCALE_ID, así que el DatePipe saldría
  // en inglés ("24 Aug 2026").
  public planDateLabel(iso: string): string {
    if (!iso) return '';
    return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString(uiLocale(), {
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

  public trackByTrainerId(_index: number, item: { trainerId: string }): string {
    return item.trainerId;
  }

  // Saldo restante en euros con formato español ("40,00 €"), igual que la
  // tarjeta "Tu coach" del perfil; el pipe currency seguiría la locale en-US.
  public paymentAmount(item: CoachPendingPayment): string {
    return formatPaymentMoney(item.balanceCents / 100, item.currency);
  }

  // Día civil del vencimiento: nunca se corre por la zona del dispositivo.
  public paymentDue(item: CoachPendingPayment): string {
    return shortDay(item.dueDay);
  }

  public trackByPaymentId(_index: number, item: CoachPendingPayment): string {
    return item.chargeId;
  }
}
