import { Component, OnDestroy } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { RemoteConfigGateService } from 'src/app/core/services/remote-config/remote-config-gate.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PendingEmailVerificationService } from 'src/app/core/services/auth/pending-email-verification.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';

// Sólo destinos privados de Trainers. Conserva query y fragmento (p. ej.
// session_id de Stripe), sin aceptar URLs externas ni volver al propio loader.
export function getTrainerStartupReturnUrl(...candidates: Array<string | null | undefined>): string | null {
  return candidates.find((value): value is string => typeof value === 'string' &&
    /^\/(?:tabs(?:\/|[?#]|$)|subscription(?:[?#]|$))/.test(value) &&
    !/[\\\u0000-\u001f\u007f]/.test(value)) ?? null;
}

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

  constructor(
    private router: Router,
    private remoteConfigGate: RemoteConfigGateService,
    private authService: AuthService,
    private pendingEmailVerificationService: PendingEmailVerificationService,
    private themeService: ThemeService
  ) {
    void this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    // Mantenimiento/actualización obligatoria BEFORE any routing (Inicio Total)
    await this.remoteConfigGate.checkAndPresent();

    // Force dark theme regardless of OS preference
    this.themeService.toggleColorMode('dark');
    this.initSessionTracking();
    this.routeOnStartup();
    this.restoreSessionOnStartup();
    this.initForegroundGateRefresh();
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
    // En una carga dura router.url puede seguir en '/': la navegación inicial
    // o la URL del navegador conservan el destino mientras se renueva la cookie.
    const returnUrl = getTrainerStartupReturnUrl(
      this.router.getCurrentNavigation()?.extractedUrl?.toString(),
      this.router.url,
      typeof window !== 'undefined'
        ? window.location.pathname + window.location.search + window.location.hash
        : null,
    );
    this.authService.restoreSessionSilently().subscribe({
      next: (restored) => {
        const loaderInProgress = [this.router.url, this.router.getCurrentNavigation()?.extractedUrl?.toString()]
          .some((url) => /^\/user-loader(?:[?#]|$)/.test(url || ''));
        if (restored && !loaderInProgress) {
          void this.router.navigate(['/user-loader'], {
            replaceUrl: true,
            ...(returnUrl ? { queryParams: { returnUrl } } : {}),
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

  private initForegroundGateRefresh(): void {
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

      if (this.authService.isAccessTokenExpiringSoon()) {
        this.authService.restoreSessionSilently().subscribe({
          error: (error) => {
            if (error?.error?.requiresRelogin || error?.requiresRelogin) {
              this.authService.logout();
            }
          },
        });
      }
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
  }
}
