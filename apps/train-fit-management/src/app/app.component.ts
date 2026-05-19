import { Component, OnDestroy } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PendingEmailVerificationService } from 'src/app/core/services/auth/pending-email-verification.service';
import { BillingService } from 'src/app/core/services/billing/billing.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';

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
    private authService: AuthService,
    private pendingEmailVerificationService: PendingEmailVerificationService,
    private billingService: BillingService,
    private themeService: ThemeService
  ) {
    void this.billingService.initialize();
    // Force dark theme regardless of OS preference
    this.themeService.toggleColorMode('dark');
    this.initSessionTracking();
    this.routeOnStartup();
    this.restoreSessionOnStartup();
    this.initForegroundBillingRefresh();
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
        if (restored && this.isPublicAuthRoute(this.router.url)) {
          void this.router.navigate(['/user-loader'], { replaceUrl: true });
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
  }
}
