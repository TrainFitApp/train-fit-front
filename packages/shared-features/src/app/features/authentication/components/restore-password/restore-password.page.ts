import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  @ViewChild('codeInput') public codeInput: ElementRef<HTMLInputElement>;
  public restorePassForm: FormGroup;
  public showPass: boolean;
  public loading: boolean;
  public error: string;
  public codeSended: boolean;
  public codeAccepted: boolean;
  public showFormErrors: boolean;
  public needsEmailInput: boolean;
  public resendDisabled = false;
  public resendCountdown = 0;
  private resendInterval: any;
  private localEmail: string | null;

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
  }

  private initVariables(): void {
    this.showPass = false;
    this.loading = false;
    this.showFormErrors = false;
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
      () => (this.error = this.utilService.handleErrors(this.restorePassForm))
    );
  }

  public sendMailCode(): void {
    this.showFormErrors = true;

    if (this.restorePassForm.valid) {
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

      this.loading = true;
      this.userService.sendMailCode(email).subscribe({
        next: () => {
          this.loading = false;
          this.codeSended = true;
          this.showFormErrors = false;
          this.startResendCooldown();
          this.ionicUtilService.showSuccessToast(
            this.translate.instant('RESTORE_PASSWORD.TOAST_CODE_SENT'),
            3000
          );
        },
        error: () => {
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

    this.loading = true;
    this.userService
      .checkRestoreCode(
        email,
        this.restorePassForm.controls.password.value,
        this.codeInput.nativeElement.value.toString().toLowerCase()
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
        error: () => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(
            err,
            this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_INVALID_CODE'),
            3000
          );
        },
      });
  }

  public submit(): void {
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

    this.loading = true;
    this.userService
      .restorePassword(email, this.restorePassForm.controls.password.value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.ionicUtilService.showSuccessToast(
            this.translate.instant('RESTORE_PASSWORD.TOAST_CHECK_EMAIL'),
            3000
          );
          if (this.userService.getLocalUser) {
            this.navigationService.goBack();
          } else {
            this.navigationService.goToLoginPage();
          }
        },
        error: () => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(
            err,
            this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_CHANGE_PASSWORD'),
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

    this.startResendCooldown();
    this.loading = true;
    this.userService.sendMailCode(email).subscribe({
      next: () => {
        this.loading = false;
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

  private startResendCooldown(): void {
    this.resendDisabled = true;
    this.resendCountdown = 60;

    if (this.resendInterval) clearInterval(this.resendInterval);

    this.resendInterval = setInterval(() => {
      this.resendCountdown--;
      if (this.resendCountdown <= 0) {
        this.resendDisabled = false;
        clearInterval(this.resendInterval);
      }
    }, 1000);
  }

  public ngOnDestroy(): void {
    if (this.resendInterval) clearInterval(this.resendInterval);
  }

  public goBack(): void {
    this.navigationService.goBack();
  }
}
