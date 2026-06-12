import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private ionicUtilService: IonicUtilService
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
          'No se encontró el correo del usuario. Inicia sesión y vuelve a intentarlo.',
          'Error',
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
            'Si existe una cuenta con ese correo, enviaremos un código. Revisa spam.',
            3000
          );
        },
        error: () => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(
            'No se pudo procesar la solicitud. Inténtalo de nuevo en unos minutos.',
            'Solicitud no completada',
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
        'No se encontró el correo del usuario. Inicia sesión y vuelve a intentarlo.',
        'Error',
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
            '¡Contraseña cambiada con éxito!',
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
            'El código no es válido o ha expirado.',
            'Código inválido',
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
        'No se encontró el correo del usuario. Inicia sesión y vuelve a intentarlo.',
        'Error',
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
            'Revise el correo para finalizar el cambio de contraseña',
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
            'Error al cambiar contraseña',
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
          'Si existe una cuenta con ese correo, enviaremos un código. Revisa spam.',
          3000
        );
      },
      error: () => {
        this.loading = false;
        this.ionicUtilService.showErrorToast(
          'No se pudo procesar la solicitud. Inténtalo de nuevo en unos minutos.',
          'Solicitud no completada',
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
