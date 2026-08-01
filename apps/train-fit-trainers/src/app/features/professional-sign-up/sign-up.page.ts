import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  PendingEmailVerificationService,
  PendingEmailVerificationState,
} from 'src/app/core/services/auth/pending-email-verification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { EmailExistValidator } from 'src/app/core/validators/email-exist';
import { MatchPasswords } from 'src/app/core/validators/matchPasswords';
import { PasswordComplexity } from 'src/app/core/validators/password-complexity';
import { LINKS } from 'src/app/shared/constants/links';

@Component({
  selector: 'app-professional-sign-up',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss'],
})
export class SignUpPage implements OnInit, OnDestroy {
  @ViewChild('codeInput') public codeInput: ElementRef<HTMLInputElement>;

  public form: FormGroup;
  public email: string;
  public showPass = false;
  public showPassRep = false;
  public isProcessing = false;
  public codeSended = false;
  public resendDisabled = false;
  public resendCountdown = 0;
  public error: string;

  public readonly LINKS = LINKS;

  private resendInterval: ReturnType<typeof setInterval>;
  private readonly RESEND_COOLDOWN_SECONDS = 60;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private matchPasswords: MatchPasswords,
    private ionicUtilService: IonicUtilService,
    private navigationService: NavigationService,
    private pendingEmailVerificationService: PendingEmailVerificationService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    // Restaura la pantalla de verificación si el registro ya se completó
    // antes (p. ej. la app se cerró o recargó a mitad de la verificación) —
    // sin esto, volver a esta pantalla mostraría el formulario de registro
    // de nuevo y el envío fallaría por email duplicado, un callejón sin salida.
    const pending = this.pendingEmailVerificationService.get();
    if (pending) {
      this.email = pending.email;
      this.codeSended = true;
      this.restoreResendCooldown(pending);
    }

    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(
          null,
          Validators.compose([Validators.required, Validators.email]),
          EmailExistValidator.createValidator(this.userService)
        ),
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            PasswordComplexity.basicComplexity(),
          ])
        ),
        passwordRep: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            PasswordComplexity.basicComplexity(),
          ])
        ),
        termsAndConditions: new FormControl(null, Validators.requiredTrue),
        policyAndPrivacy: new FormControl(null, Validators.requiredTrue),
      },
      { validators: this.matchPasswords.matchPassword }
    );
  }

  public ngOnDestroy(): void {
    if (this.resendInterval) clearInterval(this.resendInterval);
  }

  public toggleControl(controlName: string): void {
    const control = this.form.get(controlName);
    if (!control) return;
    control.setValue(!control.value);
    control.markAsTouched();
  }

  public register(): void {
    if (this.form.invalid || this.isProcessing) {
      this.form.markAllAsTouched();
      return;
    }

    this.isProcessing = true;
    const { name, lastname, email, password } = this.form.value;

    this.userService
      .createProfessionalUser({ name, lastname, email, password })
      .subscribe({
        next: () => {
          this.email = email;
          this.pendingEmailVerificationService.start(email);
          this.codeSended = true;
          this.isProcessing = false;
          this.startResendCooldown();
          this.ionicUtilService.showToast({
            message: this.translate.instant('SIGN_UP.CODE_SENT_TO_EMAIL'),
            duration: 5000,
          });
        },
        error: (err) => {
          this.isProcessing = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message ||
              this.translate.instant('SIGN_UP.REGISTER_ERROR'),
            this.translate.instant('COMMON.ERROR'),
            3000
          );
        },
      });
  }

  public verifyCode(): void {
    const code = this.codeInput?.nativeElement.value?.toString().trim();
    if (!code) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('SIGN_UP.ENTER_CODE'),
        duration: 3000,
      });
      return;
    }

    this.isProcessing = true;
    this.userService.activateAccount(this.email, code).subscribe({
      next: (response: any) => {
        this.isProcessing = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.ACCOUNT_ACTIVATED'),
          duration: 3000,
        });

        if (response?.access_token) {
          this.authService.applyAuthResponse(response).subscribe({
            next: () => this.navigationService.goToUserLoader(),
          });
        } else {
          this.pendingEmailVerificationService.clear();
          this.navigationService.goToLoginPage();
        }
      },
      error: (err) => {
        this.isProcessing = false;
        this.ionicUtilService.showToast({
          message:
            err?.error?.message ||
            this.translate.instant('SIGN_UP.INCORRECT_CODE'),
          duration: 3000,
        });
      },
    });
  }

  public resendCode(): void {
    if (!this.email || this.resendDisabled) return;

    this.userService.sendMailCode(this.email).subscribe({
      next: () => {
        this.pendingEmailVerificationService.markCodeSent(this.email);
        this.startResendCooldown();
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.CODE_RESENT'),
          duration: 3000,
        });
      },
      error: () => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.RESEND_CODE_ERROR'),
          duration: 3000,
        });
      },
    });
  }

  public goToLogin(): void {
    this.navigationService.goToLoginPage();
  }

  private restoreResendCooldown(pending: PendingEmailVerificationState): void {
    const sentAt = new Date(pending.codeSentAt).getTime();
    if (Number.isNaN(sentAt)) return;

    const elapsedSeconds = Math.floor((Date.now() - sentAt) / 1000);
    const remaining = this.RESEND_COOLDOWN_SECONDS - elapsedSeconds;
    if (remaining > 0) this.startResendCooldown(remaining);
  }

  private startResendCooldown(seconds = this.RESEND_COOLDOWN_SECONDS): void {
    if (this.resendInterval) clearInterval(this.resendInterval);
    this.resendDisabled = true;
    this.resendCountdown = seconds;
    this.resendInterval = setInterval(() => {
      this.resendCountdown--;
      if (this.resendCountdown <= 0) {
        this.resendDisabled = false;
        clearInterval(this.resendInterval);
      }
    }, 1000);
  }
}
