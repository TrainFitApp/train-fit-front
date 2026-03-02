import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastOptions } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { MatchPasswords } from 'src/app/core/validators/matchPasswords';
import { PasswordComplexity } from 'src/app/core/validators/password-complexity';
import { EmailExistValidator } from 'src/app/core/validators/email-exist';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {
  @ViewChild('codeInput') public codeInput: ElementRef<HTMLInputElement>;
  public restorePassForm: FormGroup;
  public showPass: boolean;
  public loading: boolean;
  public error: string;
  public codeSended: boolean;
  public codeAccepted: boolean;
  public showFormErrors: boolean;
  public needsEmailInput: boolean;
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

  // TODO: Validador que compruebe que el correo existe
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
        Validators.compose([Validators.required, Validators.email]),
        (control) =>
          from(
            EmailExistValidator.createValidator(this.userService)(control)
          ).pipe(map((res) => (res ? null : { emailExist: true })))
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
          this.ionicUtilService.showSuccessToast(
            '¡Código enviado, revisa spam!',
            3000
          );
        },
        error: (err) => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(
            err,
            'Error al enviar código',
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
          this.codeAccepted = true;
          this.ionicUtilService.showSuccessToast('¡Código verificado!', 2000);
        },
        error: (err) => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(err, 'Código inválido', 3000);
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
          this.navigationService.goToLoginPage();
        },
        error: (err) => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(
            err,
            'Error al cambiar contraseña',
            3000
          );
        },
      });
  }

  public goBack(): void {
    this.navigationService.goBack();
  }
}
