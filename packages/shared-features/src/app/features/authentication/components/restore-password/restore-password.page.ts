import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { MatchPasswords } from 'src/app/core/validators/matchPasswords';
import { PasswordComplexity } from 'src/app/core/validators/password-complexity';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit, OnDestroy {
  public restorePassForm: FormGroup;
  public code: string;
  public showPass: boolean;
  public loading: boolean;
  public codeSended: boolean;
  public codeAccepted: boolean;
  public needsEmailInput: boolean;
  public resendDisabled = false;
  public resendCountdown = 0;
  public showEmailRequiredError = false;
  public showPassRequiredError = false;
  public showPassRepRequiredError = false;
  private resendInterval: any;
  private localEmail: string | null;
  private readonly RESEND_COOLDOWN_SECONDS = 60;
  // El componente se destruye/recrea al navegar (atrás/adelante), lo que
  // reseteaba resendDisabled a false aunque el cooldown de 60s del backend
  // siguiera activo: el usuario podía pulsar "Reenviar" dentro de esa
  // ventana y recibir un 200/429 sin que el código cambiase. Se persiste el
  // timestamp del último envío para reconstruir el cooldown restante.
  private readonly RESEND_STORAGE_KEY = 'trainfit.restorePasswordCodeSentAt';

  public get effectiveEmail(): string | null {
    return this.needsEmailInput
      ? this.restorePassForm?.get('email')?.value
      : this.localEmail;
  }

  public get getLocalUser() {
    return this.userService.getLocalUser;
  }

  constructor(
    public navigationService: NavigationService,
    private matchPasswords: MatchPasswords,
    public modalController: ModalController,
    private userService: UserService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.initVariables();
    this.initForm();
    this.restoreResendCooldown();
  }

  private initVariables(): void {
    this.showPass = false;
    this.loading = false;
    this.localEmail = this.userService.getLocalUser?.email ?? null;
    this.needsEmailInput = !this.localEmail;
  }

  private initForm(): void {
    const controls: { [key: string]: FormControl } = {
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
    };

    if (this.needsEmailInput) {
      controls['email'] = new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      );
    }

    this.restorePassForm = new FormGroup(controls, {
      validators: this.matchPasswords.matchPassword,
    });

    this.restorePassForm.valueChanges.subscribe(
      () => {
        this.showEmailRequiredError = false;
        this.showPassRequiredError = false;
        this.showPassRepRequiredError = false;
      }
    );
  }

  public sendMailCode(): void {
    this.showEmailRequiredError = !this.restorePassForm.get('email')?.value;

    const email = this.needsEmailInput
      ? this.restorePassForm.get('email')?.value
      : this.userService.getLocalUser?.email;

    const emailValid = this.needsEmailInput
      ? this.restorePassForm.get('email')?.valid
      : !!email;

    if (emailValid) {
      if (!email) {
        this.ionicUtilService.showErrorToast(
          this.translate.instant('RESTORE_PASSWORD.TOAST_USER_EMAIL_NOT_FOUND'),
          this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_DEFAULT'),
          3000
        );
        return;
      }

      this.loading = true;
      this.userService.sendMailCode(email).subscribe({
        next: () => {
          this.loading = false;
          this.codeSended = true;
          this.persistCodeSentAt(email);
          this.startResendCooldown();
          this.ionicUtilService.showSuccessToast(
            this.translate.instant('RESTORE_PASSWORD.TOAST_CODE_SENT'),
            3000
          );
        },
        error: (err: any) => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(
            err,
            this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_SEND_CODE'),
            3000
          );
        },
      });
    }
  }

  public checkRestoreCode(): void {
    const email = this.needsEmailInput
      ? this.restorePassForm.get('email')?.value
      : this.userService.getLocalUser?.email;
    if (!email) {
      this.ionicUtilService.showErrorToast(
        this.translate.instant('RESTORE_PASSWORD.TOAST_USER_EMAIL_NOT_FOUND'),
        this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_DEFAULT'),
        3000
      );
      return;
    }

    const password = this.restorePassForm.controls.password.value;
    const passwordRep = this.restorePassForm.controls.passwordRep.value;
    this.showPassRequiredError = !password;
    this.showPassRepRequiredError = !passwordRep;
    if (!password || !passwordRep) {
      this.ionicUtilService.showErrorToast(
        this.translate.instant('USER_ERRORS.PASSWORD_REQUIRED')
      );
      return;
    }
    if (this.restorePassForm.errors?.['notSame']) {
      this.ionicUtilService.showErrorToast(
        this.translate.instant('USER_ERRORS.PASSWORDS_NOT_MATCH')
      );
      return;
    }

    this.loading = true;
    this.userService
      .checkRestoreCode(
        email,
        password,
        (this.code || '').toLowerCase()
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this.ionicUtilService.showSuccessToast(
            this.translate.instant('RESTORE_PASSWORD.TOAST_PASSWORD_CHANGED'),
            2000
          );
          if (this.userService.getLocalUser) {
            this.navigationService.goBack();
          } else {
            this.codeAccepted = true;
          }
        },
        error: (err: any) => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(
            err,
            this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_INVALID_CODE'),
            3000
          );
        },
      });
  }

  public resendCode(): void {
    if (this.resendDisabled) return;

    const email = this.needsEmailInput
      ? this.restorePassForm.get('email')?.value
      : this.userService.getLocalUser?.email;
    if (!email) return;

    this.persistCodeSentAt(email);
    this.startResendCooldown();
    this.loading = true;
    this.userService.sendMailCode(email).subscribe({
      next: () => {
        this.loading = false;
        this.code = '';
        this.ionicUtilService.showSuccessToast(
          this.translate.instant('RESTORE_PASSWORD.TOAST_CODE_RESENT'),
          3000
        );
      },
      error: (err: any) => {
        this.loading = false;
        this.ionicUtilService.showErrorToast(
          err,
          this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_RESEND_CODE'),
          3000
        );
      },
    });
  }

  private startResendCooldown(seconds = this.RESEND_COOLDOWN_SECONDS): void {
    if (this.resendInterval) clearInterval(this.resendInterval);

    if (seconds <= 0) {
      this.resendDisabled = false;
      this.resendCountdown = 0;
      return;
    }

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

  private persistCodeSentAt(email: string): void {
    try {
      localStorage.setItem(
        this.RESEND_STORAGE_KEY,
        JSON.stringify({ email: (email || '').toLowerCase(), sentAt: new Date().toISOString() })
      );
    } catch {
      // localStorage no disponible (modo privado, etc.) — el cooldown seguirá
      // aplicándose igualmente en el backend, solo se pierde la restauración
      // de la cuenta atrás tras recrear el componente.
    }
  }

  private restoreResendCooldown(): void {
    try {
      const raw = localStorage.getItem(this.RESEND_STORAGE_KEY);
      if (!raw) return;

      const stored = JSON.parse(raw) as { email: string; sentAt: string };
      const email = (this.effectiveEmail || '').toLowerCase();
      if (!email || stored.email !== email) return;

      const sentAt = new Date(stored.sentAt).getTime();
      if (Number.isNaN(sentAt)) return;

      const elapsedSeconds = Math.floor((Date.now() - sentAt) / 1000);
      const remaining = this.RESEND_COOLDOWN_SECONDS - elapsedSeconds;
      if (remaining > 0) {
        this.startResendCooldown(remaining);
      }
    } catch {
      // Estado corrupto en localStorage: se ignora, el cooldown del backend
      // sigue protegiendo el endpoint aunque la UI no lo refleje.
    }
  }

  public ngOnDestroy(): void {
    if (this.resendInterval) clearInterval(this.resendInterval);
  }

  public goBack(): void {
    this.navigationService.goBack();
  }
}
