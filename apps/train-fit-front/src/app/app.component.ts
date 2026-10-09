import { Component, OnDestroy } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { RemoteConfigGateService } from 'src/app/core/services/remote-config/remote-config-gate.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PendingEmailVerificationService } from 'src/app/core/services/auth/pending-email-verification.service';
import { BillingService } from 'src/app/core/services/billing/billing.service';
import { NotificationService } from 'src/app/core/services/util/notification.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { WorkoutNotificationService } from 'src/app/core/services/workout-notification/workout-notification.service';
import { LiveActivityService } from 'src/app/core/services/live-activity/live-activity.service';
import { startupReturnUrl } from 'src/app/core/utils/startup-return-url.util';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private readonly isNativeClient = Capacitor.isNativePlatform();
  private hasAuthenticatedSession = false;
  private appStateListener: PluginListenerHandle | null = null;
  private currentWorkoutSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private remoteConfigGate: RemoteConfigGateService,
    private authService: AuthService,
    private pendingEmailVerificationService: PendingEmailVerificationService,
    private billingService: BillingService,
    private themeService: ThemeService,
    private notificationService: NotificationService,
    private workoutService: WorkoutService,
    private workoutNotificationService: WorkoutNotificationService,
    private liveActivityService: LiveActivityService
  ) {
    void this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    void this.billingService.initialize();

    // Mantenimiento/actualización obligatoria BEFORE any routing (Inicio Total)
    await this.remoteConfigGate.checkAndPresent();

    // Force dark theme regardless of OS preference
    this.themeService.toggleColorMode('dark');
    void this.notificationService.initialize();
    void this.initWorkoutSetNotifications();
    this.initSessionTracking();
    this.routeOnStartup();
    this.restoreSessionOnStartup();
    this.initForegroundBillingRefresh();
  }

  // Notificación local con el siguiente set pendiente del entrenamiento
  // activo — se re-agenda cada vez que cambia el workout en curso (arranca
  // uno nuevo, se marca un set desde la propia app, termina el workout...).
  private async initWorkoutSetNotifications(): Promise<void> {
    await this.liveActivityService.initialize();
    await this.workoutNotificationService.initialize();
    this.currentWorkoutSubscription = this.workoutService.getCurrentWorkout.subscribe(
      (workout) => void this.workoutNotificationService.refreshForWorkout(workout)
    );
  }

  private routeOnStartup(): void {
    if (this.shouldKeepPendingEmailVerificationVisible()) {
      void this.router.navigate(['/sign-in/sign-up'], { replaceUrl: true });
    }
  }

  private initSessionTracking(): void {
    this.authService.user$.subscribe((user) => {
      this.hasAuthenticatedSession = Boolean(user);
    });
  }

  private restoreSessionOnStartup(): void {
    if (
      this.authService.isSessionValid() ||
      this.shouldKeepPendingEmailVerificationVisible()
    ) {
      return;
    }

    console.info('[AUTH] auth_bootstrap_refresh_attempt');
    this.authService.restoreSessionSilently().subscribe({
      next: (restored) => {
        if (restored && !this.router.url.includes('/user-loader')) {
          // De vuelta a donde estaba al recargar (la navegación inicial aún
          // puede no haber terminado: se lee de la barra de direcciones).
          const returnUrl = startupReturnUrl(`${window.location.pathname}${window.location.search}`);
          void this.router.navigate(['/user-loader'], {
            replaceUrl: true,
            queryParams: returnUrl ? { returnUrl } : undefined,
          });
        }
      },
      error: (error) => {
        if (error?.error?.requiresRelogin || error?.requiresRelogin) {
          this.authService.logout();
        }
      },
    });
  }

  private initForegroundBillingRefresh(): void {
    if (!this.isNativeClient) {
      return;
    }

    void CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) {
        return;
      }

      void this.remoteConfigGate.checkAndPresent();

      if (this.shouldDeferAuthWorkForCurrentRoute()) {
        return;
      }

      if (!this.authService.isAccessTokenExpiringSoon()) {
        void this.billingService.getBackendEntitlements().catch((error) => {
          console.warn('Foreground billing refresh failed', error);
        });
        return;
      }

      this.authService.restoreSessionSilently().subscribe({
        next: (restored) => {
          if (!restored && !this.hasAuthenticatedSession) {
            return;
          }

          void this.billingService.getBackendEntitlements().catch((error) => {
            console.warn('Foreground billing refresh failed', error);
          });
        },
        error: (error) => {
          if (error?.error?.requiresRelogin || error?.requiresRelogin) {
            this.authService.logout();
          }
        },
      });
    }).then((listener) => {
      this.appStateListener = listener;
    });
  }

  private shouldKeepPendingEmailVerificationVisible(): boolean {
    return (
      !this.authService.isAuthenticated() &&
      this.pendingEmailVerificationService.hasPendingVerification()
    );
  }

  private shouldDeferAuthWorkForCurrentRoute(): boolean {
    if (this.authService.isAuthenticated() || this.hasAuthenticatedSession) {
      return false;
    }

    return (
      this.pendingEmailVerificationService.hasPendingVerification() ||
      this.isPublicAuthRoute(this.router.url)
    );
  }

  private isPublicAuthRoute(url: string): boolean {
    const path = (url || '').split('?')[0].split('#')[0];
    return (
      path === '/sign-in' ||
      path.startsWith('/sign-in/sign-up') ||
      path.startsWith('/sign-in/restore-password')
    );
  }

  public ngOnDestroy(): void {
    if (this.appStateListener) {
      void this.appStateListener.remove();
      this.appStateListener = null;
    }
    this.currentWorkoutSubscription?.unsubscribe();
  }
}
