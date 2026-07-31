import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PendingEmailVerificationService } from 'src/app/core/services/auth/pending-email-verification.service';
import { TrainerAuthApiService } from '../../services/trainer-auth-api.service';

@Component({
  selector: 'app-trainer-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class TrainerSignUpPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly pendingVerification = inject(PendingEmailVerificationService);

  public readonly registrationForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirmation: ['', Validators.required],
  });
  public readonly verificationForm = this.formBuilder.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  public verificationMode = this.pendingVerification.hasPendingVerification();
  public loading = false;
  public showPassword = false;
  public error = '';

  public get verificationEmail(): string {
    return (
      this.pendingVerification.get()?.email ||
      this.registrationForm.controls.email.value
    );
  }

  constructor(
    private readonly api: TrainerAuthApiService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {}

  public register(): void {
    if (this.loading || this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const value = this.registrationForm.getRawValue();
    if (value.password !== value.passwordConfirmation) {
      this.error = this.translate.instant('TRAINERS.AUTH.PASSWORD_MISMATCH');
      return;
    }

    this.loading = true;
    this.error = '';
    this.api
      .register({
        name: value.name.trim(),
        lastname: value.lastname.trim(),
        email: value.email.trim().toLowerCase(),
        password: value.password,
      })
      .subscribe({
        next: () => {
          this.pendingVerification.start(value.email);
          this.verificationMode = true;
          this.loading = false;
        },
        error: (error) => {
          this.error = this.resolveError(error);
          this.loading = false;
        },
      });
  }

  public verify(): void {
    if (this.loading || this.verificationForm.invalid || !this.verificationEmail) {
      this.verificationForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.api
      .activate(this.verificationEmail, this.verificationForm.controls.code.value)
      .subscribe({
        next: (response) => {
          this.authService.applyAuthResponse(response).subscribe({
            next: () => {
              this.pendingVerification.clear();
              void this.router.navigate(['/user-loader'], { replaceUrl: true });
            },
            error: (error) => {
              this.error = this.resolveError(error);
              this.loading = false;
            },
          });
        },
        error: (error) => {
          this.error = this.resolveError(error);
          this.loading = false;
        },
      });
  }

  public changeEmail(): void {
    this.pendingVerification.clear();
    this.verificationMode = false;
    this.verificationForm.reset();
    this.error = '';
  }

  private resolveError(error: any): string {
    return (
      error?.message ||
      error?.error?.message ||
      this.translate.instant('TRAINERS.AUTH.GENERIC_ERROR')
    );
  }
}
