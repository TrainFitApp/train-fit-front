import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  Observable,
  catchError,
  forkJoin,
  from,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Diet } from 'src/app/core/models/diet';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BillingService } from 'src/app/core/services/billing/billing.service';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { OnboardingService } from 'src/app/core/services/onboarding/onboarding.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';

@Component({
  selector: 'app-user-loader',
  templateUrl: './user-loader.page.html',
  styleUrls: ['./user-loader.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('logoAnimation', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
    trigger('textAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('400ms 300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('progressAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('400ms 600ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserLoaderPage implements OnInit, OnDestroy {
  private readonly LOADING_CONFIG = {
    STEP_DELAY: 300,
    COMPLETION_DELAY: 800,
    EXIT_ANIMATION_DELAY: 500,
  };
  private readonly MAX_INITIAL_LOAD_RETRIES = 2;

  public email: string;
  public loadingStep = 0;
  public animationState = 'in';
  public progress = 0;
  public loadingText: string;
  private initialLoadRetryCount = 0;

  private readonly loadingMessages = [
    'USER_LOADER.LOGGING_IN',
    'USER_LOADER.LOADING_PROFILE',
    'USER_LOADER.PREPARING_ROUTINES',
    'USER_LOADER.LOADING_DIET',
    'USER_LOADER.FINALIZING',
  ];

  constructor(
    private readonly userService: UserService,
    private readonly tableService: TableService,
    private readonly dietService: DietService,
    private readonly workoutService: WorkoutService,
    private readonly themeService: ThemeService,
    private readonly navigationService: NavigationService,
    private readonly i18nService: I18nService,
    private readonly authService: AuthService,
    private readonly billingService: BillingService,
    private readonly coachService: CoachService,
    private readonly notificationsService: NotificationsService,
    private readonly onboardingService: OnboardingService,
    private readonly translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.email = this.authService.user?.email;
  }

  // TASK-010 (MASTER_BACKLOG.md) — restaura el deep link original (guardado
  // por auth.guard.ts como returnUrl) en vez de caer siempre al dashboard.
  // Validación mínima: debe ser una ruta interna real ('/algo'), nunca una
  // URL absoluta ni protocol-relative ('//host') colada en el query param.
  private getSafeReturnUrl(): string | null {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (!returnUrl || !returnUrl.startsWith('/') || returnUrl.startsWith('//')) {
      return null;
    }
    return returnUrl;
  }

  ngOnInit(): void {
    this.startLoadingSequence();
  }

  ngOnDestroy(): void {
    // Cleanup no longer needed since we removed fake intervals
  }

  private startLoadingSequence(): void {
    if (!this.email) {
      this.authService.logout();
      return;
    }

    this.loadingText = this.translate.instant(this.loadingMessages[0]);
    this.updateLoadingStep(1);
    this.updateProgress(10);

    this.userService
      .getUserByEmail(this.email)
      .pipe(
        switchMap((resUser) => {
          this.updateLoadingStep(2);
          this.updateProgress(30);
          this.userService.setLocalUser = resUser;
          if (resUser.lang) this.i18nService.switchLang(resUser.lang);

          return from(this.billingService.logIn(resUser?._id)).pipe(
            catchError((error) => {
              console.warn(
                'Billing logIn no disponible durante carga inicial',
                error
              );
              return of(false);
            }),
            switchMap(() => {
              if (!this.isUserRegistrationComplete(resUser)) {
                throw new Error('INCOMPLETE_USER');
              }

              this.themeService.toggleColorMode(resUser.theme || 'dark');
              this.updateLoadingStep(3);
              this.updateProgress(40);

              const tableObservable: Observable<Table> = resUser.tableInUse
                ? this.recoverFromStalePointer(
                    this.tableService.getTableById(resUser.tableInUse),
                    'tableInUse'
                  )
                : of(null);

              const dietObservable: Observable<Diet> = resUser.dietInUse
                ? this.recoverFromStalePointer(
                    this.dietService.getDietById(resUser.dietInUse),
                    'dietInUse'
                  )
                : of(null);

              const workoutInUseObservable: Observable<Workout> =
                resUser.workoutInUse
                  ? this.recoverFromStalePointer(
                      this.workoutService.getWorkoutById(resUser.workoutInUse),
                      'workoutInUse'
                    )
                  : of(null);

              // Tab Coach (Fases 1/3) y TAREA 3 (onboarding) — endpoints del
              // lado CLIENTE (auth(["user", ...]) en el backend). Una cuenta
              // profesional pura (roles:["trainer"], sin "user" — ver
              // POST /users/professional) nunca tiene acceso, así que ni se
              // llaman: antes se llamaban igual y el 403 se tragaba en
              // silencio (ruido de consola en cada login de trainer, cero
              // impacto funcional, pero sin motivo para seguir así).
              const isClientAccount = !!resUser.roles?.includes('user');

              return forkJoin([
                tableObservable,
                dietObservable,
                workoutInUseObservable,
                isClientAccount ? this.coachService.refresh() : of(false),
                isClientAccount ? this.notificationsService.refresh() : of(0),
                isClientAccount ? this.onboardingService.refresh() : of(null),
              ]);
            })
          );
        })
      )
      .subscribe(
        ([resTable, resDiet, resWorkoutInUse]: [Table, Diet, Workout, boolean, number, unknown]) => {
          this.initialLoadRetryCount = 0;
          this.updateLoadingStep(4);
          this.updateProgress(80);

          // Always sync (not just when truthy) so a leftover signal from a
          // previous session/account never survives into one with no table,
          // diet, or workout in use.
          this.tableService.setCurrentTable = resTable ?? null;
          this.dietService.setCurrentDiet = resDiet ?? null;
          this.workoutService.setCurrentWorkout = resWorkoutInUse ?? null;

          setTimeout(() => {
            this.updateLoadingStep(5);
            this.updateProgress(100);
            this.loadingText = this.translate.instant('USER_LOADER.READY');

            setTimeout(() => {
              this.startExitAnimation();
              setTimeout(() => {
                const returnUrl = this.getSafeReturnUrl();
                if (returnUrl) {
                  void this.router.navigateByUrl(returnUrl, { replaceUrl: true });
                } else {
                  this.navigationService.goToTabsPage();
                }
              }, this.LOADING_CONFIG.EXIT_ANIMATION_DELAY);
            }, this.LOADING_CONFIG.COMPLETION_DELAY);
          }, this.LOADING_CONFIG.STEP_DELAY);
        },
        (err) => {
          if (err.message === 'INCOMPLETE_USER') {
            this.navigationService.goToSignUp();
            return;
          }

          console.error('Error cargando usuario inicial:', err);
          if (this.requiresRelogin(err)) {
            this.userService.setLocalUser = null;
            this.workoutService.setCurrentWorkout = null;
            this.dietService.setCurrentDiet = null;
            this.tableService.setCurrentTable = null;
            this.authService.logout();
            return;
          }

          if (this.initialLoadRetryCount < this.MAX_INITIAL_LOAD_RETRIES) {
            this.initialLoadRetryCount += 1;
            this.loadingText = this.translate.instant('USER_LOADER.RETRYING');
            this.updateProgress(20);
            setTimeout(
              () => this.startLoadingSequence(),
              1200 * this.initialLoadRetryCount
            );
            return;
          }

          this.loadingText = this.translate.instant('USER_LOADER.FAILED');
          this.updateProgress(0);
        }
      );
  }

  // `tableInUse` / `dietInUse` / `workoutInUse` son punteros: guardan un id,
  // no el documento. Si lo apuntado se borra (o deja de ser accesible), el id
  // se queda colgado en el usuario y este arranque pedía un documento que ya
  // no existe. Antes eso reventaba el forkJoin entero: reintento, reintento, y
  // la pantalla de carga se quedaba fija para siempre — con la app instalada,
  // sin forma de salir. Un puntero muerto degrada a "nada en uso" (la app
  // arranca y el usuario elige otra rutina/dieta, lo que reescribe el
  // puntero); cualquier otro error sí sube, para no tapar un 401 que debe
  // acabar en re-login ni un backend caído que sí merece el reintento.
  private recoverFromStalePointer<T>(
    source$: Observable<T>,
    pointer: string
  ): Observable<T> {
    return source$.pipe(
      catchError((error) => {
        const status = error?.status ?? error?.error?.status;
        if (status !== 404 && status !== 403) {
          return throwError(() => error);
        }
        console.warn(
          `[user-loader] ${pointer} apunta a un documento inaccesible (${status}); se arranca sin él`,
          error
        );
        return of(null as T);
      })
    );
  }

  private requiresRelogin(error: any): boolean {
    return !!(error?.requiresRelogin || error?.error?.requiresRelogin);
  }

  private isUserRegistrationComplete(user: User): boolean {
    // MVP-trainers F01: las cuentas profesionales (roles: ["trainer"]) nunca
    // tienen datos biométricos por diseño — exigirlos aquí las mandaría en
    // bucle a un sign-up de consumidor que no les corresponde.
    if (user?.roles?.includes('trainer')) {
      return !!(user?.name && user?.lastname);
    }
    return !!(user?.name && user?.lastname && user?.weight && user?.height);
  }

  private updateProgress(value: number): void {
    this.progress = Math.min(value, 100);
  }

  public startExitAnimation(): void {
    this.animationState = 'out';
  }

  private updateLoadingStep(step: number): void {
    this.loadingStep = step;
    if (step <= this.loadingMessages.length) {
      this.loadingText = this.translate.instant(this.loadingMessages[step - 1]);
    }
  }
}
