import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthErrorService } from 'src/app/core/services/auth/auth-error.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PendingEmailVerificationService } from 'src/app/core/services/auth/pending-email-verification.service';

@Component({
  selector: 'app-trainer-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class TrainerSignInPage {
  private readonly formBuilder = inject(FormBuilder);

  public readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  public loading = false;
  public showPassword = false;
  public error = '';

  constructor(
    private readonly authService: AuthService,
    private readonly authErrorService: AuthErrorService,
    private readonly pendingVerification: PendingEmailVerificationService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {}

  public login(): void {
    if (this.loading || this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    const email = this.loginForm.controls.email.value.trim().toLowerCase();

    this.authService.login(email, this.loginForm.controls.password.value).subscribe({
      next: () => {
        if (!this.authService.user?.roles?.includes('trainer')) {
          this.error = this.translate.instant('TRAINERS.AUTH.TRAINER_ONLY');
          this.loading = false;
          this.authService.logout();
          return;
        }

        void this.router.navigate(['/user-loader'], { replaceUrl: true });
      },
      error: (error) => {
        const feedback = this.authErrorService.toLoginFeedback(error);
        if (feedback.kind === 'account-not-verified') {
          this.pendingVerification.start(email);
          void this.router.navigate(['/sign-in/sign-up']);
        } else {
          this.error = feedback.message;
        }
        this.loading = false;
      },
    });
  }
}
