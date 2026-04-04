import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { AuthService } from './core/services/auth/auth.service';
import { SecurityService } from './core/services/security/security.service';
import { ThemeService } from './core/services/util/theme.service';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private isRefreshingToken = false;
  private readonly isNativeClient = Capacitor.isNativePlatform();

  constructor(
    private router: Router,
    private authService: AuthService,
    private securityService: SecurityService,
    private themeService: ThemeService
  ) {
    this.rootRoutes();
    // Force dark theme regardless of OS preference
    this.themeService.toggleColorMode('dark');
    this.initTokenRefresh();
  }

  private rootRoutes(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  private initTokenRefresh(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        if (this.isNativeClient) {
          // In native apps the refresh flow is driven by 401 responses to avoid
          // races with cookie/header transport and background timers.
          this.securityService.stopTokenExpirationCheck();
          return;
        }

        this.securityService.startTokenExpirationCheck(() => {
          if (this.isRefreshingToken) {
            return;
          }
          this.isRefreshingToken = true;
          this.authService.refreshToken().subscribe({
            next: () => {
              this.isRefreshingToken = false;
            },
            error: (error) => {
              this.isRefreshingToken = false;
              // Only force logout when backend explicitly marks session as unrecoverable.
              if (error?.error?.requiresRelogin) {
                this.authService.logout();
              }
            },
          });
        });
      } else {
        this.securityService.stopTokenExpirationCheck();
      }
    });
  }
}
