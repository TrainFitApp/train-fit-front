import { Component, OnDestroy } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { AppUpdateService } from 'src/app/core/services/app-update/app-update.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
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
    private appUpdateService: AppUpdateService,
    private authService: AuthService,
    private billingService: BillingService,
    private themeService: ThemeService
  ) {
    void this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    void this.billingService.initialize();
    
    // Check version BEFORE any routing (Inicio Total)
    await this.appUpdateService.checkForRequiredUpdate();
    
    this.rootRoutes();
    
    // Force dark theme regardless of OS preference
    this.themeService.toggleColorMode('dark');
    this.initSessionTracking();
    this.initForegroundBillingRefresh();
  }

  private rootRoutes(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  private initSessionTracking(): void {
    this.authService.user$.subscribe((user) => {
      this.hasAuthenticatedSession = Boolean(user);
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

      void this.appUpdateService.checkForRequiredUpdate();

      if (!this.hasAuthenticatedSession) {
        return;
      }

      void this.billingService.getBackendEntitlements().catch((error) => {
        console.warn('Foreground billing refresh failed', error);
      });
    }).then((listener) => {
      this.appStateListener = listener;
    });
  }

  public ngOnDestroy(): void {
    if (this.appStateListener) {
      void this.appStateListener.remove();
      this.appStateListener = null;
    }
  }
}
