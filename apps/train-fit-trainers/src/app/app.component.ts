import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PendingEmailVerificationService } from 'src/app/core/services/auth/pending-email-verification.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly pendingVerification: PendingEmailVerificationService,
    themeService: ThemeService
  ) {
    themeService.toggleColorMode('dark');
    this.restoreSession();
  }

  private restoreSession(): void {
    if (this.pendingVerification.hasPendingVerification()) {
      void this.router.navigate(['/sign-in/sign-up'], { replaceUrl: true });
      return;
    }

    if (this.authService.isSessionValid() || this.isPublicAuthRoute()) {
      return;
    }

    this.authService.restoreSessionSilently().subscribe({
      next: (restored) => {
        if (restored) {
          void this.router.navigate(['/user-loader'], { replaceUrl: true });
        }
      },
      error: () => undefined,
    });
  }

  private isPublicAuthRoute(): boolean {
    return (
      this.router.url === '/' ||
      this.router.url === '/sign-in' ||
      this.router.url.startsWith('/sign-in/')
    );
  }
}
