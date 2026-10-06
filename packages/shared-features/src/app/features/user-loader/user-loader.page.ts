import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  Observable,
  catchError,
  forkJoin,
  of,
  switchMap,
  throwError,
} from "rxjs";
import { Table } from "src/app/core/models/table";
import { User } from "src/app/core/models/user";
import { Workout } from "src/app/core/models/workout";
import { I18nService } from "src/app/core/i18n/i18n.service";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { BillingService } from "src/app/core/services/billing/billing.service";
import { CoachService } from "src/app/core/services/coach/coach.service";
import { NotificationsService } from "src/app/core/services/notifications/notifications.service";
import { OnboardingService } from "src/app/core/services/onboarding/onboarding.service";
import { TableService } from "src/app/core/services/table/table.service";
import { UserService } from "src/app/core/services/user/user.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";
import { ThemeService } from "src/app/core/services/util/theme.service";
import { WorkoutService } from "src/app/core/services/workout/workout.service";

@Component({
  selector: "app-user-loader",
  templateUrl: "./user-loader.page.html",
  styleUrls: ["./user-loader.page.scss"],
})
export class UserLoaderPage implements OnInit {
  // Lo que dura el fundido de salida del logo en el SCSS
  // (.is-leaving .logo-stage).
  private readonly EXIT_ANIMATION_MS = 240;
  // Tiempo mínimo del splash en pantalla, a petición expresa: con conexión
  // buena los datos llegaban antes de que diera tiempo a ver el barrido. Es
  // un suelo, no una espera encadenada — si la carga tarda más de 1 s no
  // suma nada, y la navegación sale en cuanto se cumple el que llegue más
  // tarde de los dos.
  private readonly MIN_SPLASH_MS = 1000;
  private readonly MAX_INITIAL_LOAD_RETRIES = 2;

  // El barrido del logo es animación CSS (user-loader.page.scss#sweep): no lo
  // mueven las peticiones ni un temporizador de aquí. Antes lo pintaba este
  // componente frame a frame y avanzaba un tramo por respuesta recibida, de
  // ahí que se coloreara a trozos; y con `prefers-reduced-motion` activo se
  // quedaba directamente sin animación. Lo único que sigue decidiendo el TS
  // es cuándo se sale.

  public email: string;
  public animationState = "in";
  public loadingText: string;
  public loadFailed = false;
  private initialLoadRetryCount = 0;
  private splashStartedAt = Date.now();

  constructor(
    private readonly userService: UserService,
    private readonly tableService: TableService,
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
    private readonly router: Router,
  ) {
    this.email = this.authService.user?.email;
  }

  // TASK-010 (MASTER_BACKLOG.md) — restaura el deep link original (guardado
  // por auth.guard.ts como returnUrl) en vez de caer siempre al dashboard.
  // Validación mínima: debe ser una ruta interna real ('/algo'), nunca una
  // URL absoluta ni protocol-relative ('//host') colada en el query param.
  private getSafeReturnUrl(): string | null {
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    if (
      !returnUrl ||
      !returnUrl.startsWith("/") ||
      returnUrl.startsWith("//")
    ) {
      return null;
    }
    return returnUrl;
  }

  ngOnInit(): void {
    this.startLoadingSequence();
  }

  private startLoadingSequence(): void {
    if (!this.email) {
      this.authService.logout();
      return;
    }

    this.userService
      .getUserByEmail(this.email)
      .pipe(
        switchMap((resUser) => {
          this.userService.setLocalUser = resUser;
          if (resUser.lang) this.i18nService.switchLang(resUser.lang);

          if (!this.isUserRegistrationComplete(resUser)) {
            throw new Error("INCOMPLETE_USER");
          }

          this.themeService.toggleColorMode(resUser.theme || "dark");

          // Tab Coach (Fases 1/3) y TAREA 3 (onboarding) — endpoints del
          // lado CLIENTE (auth(["user", ...]) en el backend). Una cuenta
          // profesional pura (roles:["trainer"], sin "user" — ver
          // POST /users/professional) nunca tiene acceso, así que ni se
          // llaman: antes se llamaban igual y el 403 se tragaba en
          // silencio (ruido de consola en cada login de trainer, cero
          // impacto funcional, pero sin motivo para seguir así).
          const isClientAccount = !!resUser.roles?.includes("user");

          this.startBackgroundLoad(resUser, isClientAccount);

          const tableObservable: Observable<Table> = resUser.tableInUse
            ? this.recoverFromStalePointer(
                this.tableService.getTableById(resUser.tableInUse),
                "tableInUse",
              )
            : of(null);

          const workoutInUseObservable: Observable<Workout> =
            resUser.workoutInUse
              ? this.recoverFromStalePointer(
                  this.workoutService.getWorkoutById(resUser.workoutInUse),
                  "workoutInUse",
                )
              : of(null);

          // Lo que el splash espera: lo que ya debe estar en memoria cuando
          // se pinta la primera pantalla (rutina y entreno en uso) más
          // CoachService, que decide si existe el tab Coach — resolverlo
          // después haría aparecer un tab sobre los tabs ya pintados. Las
          // tres vuelan en paralelo, no en cadena.
          return forkJoin([
            tableObservable,
            workoutInUseObservable,
            isClientAccount ? this.coachService.refresh() : of(false),
          ]);
        }),
      )
      .subscribe(
        ([resTable, resWorkoutInUse]: [Table, Workout, boolean]) => {
          this.initialLoadRetryCount = 0;

          // Always sync (not just when truthy) so a leftover signal from a
          // previous session/account never survives into one with no table
          // or workout in use.
          this.tableService.setCurrentTable = resTable ?? null;
          this.workoutService.setCurrentWorkout = resWorkoutInUse ?? null;

          // Los datos ya están en los servicios; lo único que espera es el
          // mínimo en pantalla, y solo lo que le falte.
          const pending = Math.max(
            0,
            this.MIN_SPLASH_MS - (Date.now() - this.splashStartedAt),
          );
          setTimeout(() => {
            this.startExitAnimation();
            setTimeout(() => this.goToApp(), this.EXIT_ANIMATION_MS);
          }, pending);
        },
        (err) => {
          if (err.message === "INCOMPLETE_USER") {
            this.navigationService.goToSignUp();
            return;
          }

          console.error("Error cargando usuario inicial:", err);
          if (this.requiresRelogin(err)) {
            this.userService.setLocalUser = null;
            this.workoutService.setCurrentWorkout = null;
            this.tableService.setCurrentTable = null;
            this.authService.logout();
            return;
          }

          if (this.initialLoadRetryCount < this.MAX_INITIAL_LOAD_RETRIES) {
            this.initialLoadRetryCount += 1;
            setTimeout(
              () => this.startLoadingSequence(),
              1200 * this.initialLoadRetryCount,
            );
            return;
          }

          this.loadingText = this.translate.instant("USER_LOADER.FAILED");
          this.loadFailed = true;
        },
      );
  }

  // Peticiones que no pintan nada de la primera pantalla: RevenueCat (los
  // consumidores de premium lo piden cuando entran, o leen user.premium), el
  // badge de notificaciones y el estado del cuestionario inicial (ambos
  // signals, se refrescan solos en cuanto responden). Salen ya, en paralelo
  // con las esenciales, pero el splash no se queda esperándolas; se dejan
  // vivas a propósito tras destruir la pantalla y todas se tragan sus
  // propios errores.
  private startBackgroundLoad(user: User, isClientAccount: boolean): void {
    void this.billingService
      .logIn(user?._id)
      .catch((error) =>
        console.warn(
          "Billing logIn no disponible durante carga inicial",
          error,
        ),
      );

    if (!isClientAccount) return;

    this.notificationsService.refresh().subscribe();
    this.onboardingService.refresh().subscribe();
  }

  private goToApp(): void {
    const returnUrl = this.getSafeReturnUrl();
    if (returnUrl) {
      void this.router.navigateByUrl(returnUrl, { replaceUrl: true });
      return;
    }
    this.navigationService.goToTabsPage();
  }

  // `tableInUse` / `workoutInUse` son punteros: guardan un id,
  // no el documento. Si lo apuntado se borra (o deja de ser accesible), el id
  // se queda colgado en el usuario y este arranque pedía un documento que ya
  // no existe. Antes eso reventaba el forkJoin entero: reintento, reintento, y
  // la pantalla de carga se quedaba fija para siempre — con la app instalada,
  // sin forma de salir. Un puntero muerto degrada a "nada en uso" (la app
  // arranca y el usuario elige otra rutina, lo que reescribe el
  // puntero); cualquier otro error sí sube, para no tapar un 401 que debe
  // acabar en re-login ni un backend caído que sí merece el reintento.
  private recoverFromStalePointer<T>(
    source$: Observable<T>,
    pointer: string,
  ): Observable<T> {
    return source$.pipe(
      catchError((error) => {
        const status = error?.status ?? error?.error?.status;
        if (status !== 404 && status !== 403) {
          return throwError(() => error);
        }
        console.warn(
          `[user-loader] ${pointer} apunta a un documento inaccesible (${status}); se arranca sin él`,
          error,
        );
        return of(null as T);
      }),
    );
  }

  private requiresRelogin(error: any): boolean {
    return !!(error?.requiresRelogin || error?.error?.requiresRelogin);
  }

  private isUserRegistrationComplete(user: User): boolean {
    // MVP-trainers F01: las cuentas profesionales (roles: ["trainer"]) nunca
    // tienen datos biométricos por diseño — exigirlos aquí las mandaría en
    // bucle a un sign-up de consumidor que no les corresponde.
    if (user?.roles?.includes("trainer")) {
      return !!(user?.name && user?.lastname);
    }
    return !!(user?.name && user?.lastname && user?.weight && user?.height);
  }

  public startExitAnimation(): void {
    this.animationState = "out";
  }
}
