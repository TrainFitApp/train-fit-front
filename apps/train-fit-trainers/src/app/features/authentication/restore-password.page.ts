import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-trainer-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class TrainerRestorePasswordPage {
  private readonly formBuilder = inject(FormBuilder);

  public readonly resetForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirmation: ['', Validators.required],
  });
  public codeSent = false;
  public completed = false;
  public loading = false;
  public showPassword = false;
  public error = '';

  constructor(
    private readonly userService: UserService,
    private readonly translate: TranslateService
  ) {}

  public sendCode(): void {
    const emailControl = this.resetForm.controls.email;
    if (emailControl.invalid || this.loading) {
      emailControl.markAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.userService.sendMailCode(emailControl.value.trim().toLowerCase()).subscribe({
      next: () => {
        this.codeSent = true;
        this.loading = false;
      },
      error: (error) => {
        this.error = this.resolveError(error);
        this.loading = false;
      },
    });
  }

  public resetPassword(): void {
    const value = this.resetForm.getRawValue();
    if (
      this.loading ||
      this.resetForm.controls.code.invalid ||
      this.resetForm.controls.password.invalid ||
      this.resetForm.controls.passwordConfirmation.invalid
    ) {
      this.resetForm.markAllAsTouched();
      return;
    }

    if (value.password !== value.passwordConfirmation) {
      this.error = this.translate.instant('TRAINERS.AUTH.PASSWORD_MISMATCH');
      return;
    }

    this.loading = true;
    this.error = '';
    this.userService
      .checkRestoreCode(
        value.email.trim().toLowerCase(),
        value.password,
        value.code
      )
      .subscribe({
        next: () => {
          this.completed = true;
          this.loading = false;
        },
        error: (error) => {
          this.error = this.resolveError(error);
          this.loading = false;
        },
      });
  }

  private resolveError(error: any): string {
    return (
      error?.message ||
      error?.error?.message ||
      this.translate.instant('TRAINERS.AUTH.GENERIC_ERROR')
    );
  }
}
