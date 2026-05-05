import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ModalController, ToastOptions } from '@ionic/angular';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { SEX } from 'src/app/shared/constants/sex';
import { STEPS, STEPS_TYPES } from 'src/app/shared/constants/steps';
import { UtilService } from 'src/app/core/services/util/util.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Token } from 'src/app/core/models/token';
import { SignUpStateService } from 'src/app/core/services/auth/sign-up-state.service';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data-sheet',
  templateUrl: './data-sheet.page.html',
  styleUrls: ['./data-sheet.page.scss'],
})
export class DataSheetPage implements OnInit, OnDestroy {
  @ViewChild('codeInput') public codeInput: ElementRef<HTMLInputElement>;
  private destroy$ = new Subject<void>();
  public user: User;
  public years: number;
  public activityType: any;
  public isProcessing = false;
  public objetiveMessage: string;
  public registerSocialPending: boolean;
  public codeSended = false;
  public resendDisabled = false;
  public resendCountdown = 0;
  private resendInterval: any;

  public SEX = SEX;
  public STEPS = STEPS;
  public STEPS_TYPES = STEPS_TYPES;

  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private navigationService: NavigationService,
    private ionicUtilService: IonicUtilService,
    private utilService: UtilService,
    private authService: AuthService,
    private signUpStateService: SignUpStateService
  ) {}

  public ngOnInit(): void {
    // Obtener datos del servicio de estado
    this.signUpStateService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          // Calcular kcal totales para mostrar en la ficha
          this.user.kcalTotal = this.userService.calculateKcal(this.user);
        }
      });

    this.signUpStateService.years$
      .pipe(takeUntil(this.destroy$))
      .subscribe((years) => {
        if (years) {
          this.years = years;
        }
      });

    this.signUpStateService.activityType$
      .pipe(takeUntil(this.destroy$))
      .subscribe((activityType) => {
        if (activityType) {
          this.activityType = activityType;
        }
      });

    this.signUpStateService.registerSocialPending$
      .pipe(takeUntil(this.destroy$))
      .subscribe((pending) => {
        this.registerSocialPending = pending;
      });

    if (this.user.objetive > 0) this.objetiveMessage = 'Superávit calórico';
    else if (this.user.objetive < 0) this.objetiveMessage = 'Déficit calórico';
    else this.objetiveMessage = 'Mantenimiento';
  }

  public goBack(): void {
    if (this.codeSended) {
      this.codeSended = false; // Permitir "volver" al estado anterior si se desea reintentar o corregir algo
    } else {
      this.navigationService.goBack();
    }
  }

  public register(): void {
    this.isProcessing = true;
    this.user.kcalTotal = this.userService.calculateKcal(this.user);

    if (this.registerSocialPending) {
      // Registro tradicional (email/password)
      this.userService.createUser(this.user, new Date()).subscribe({
        next: (resUser) => {
          this.user = resUser;
          this.codeSended = true;
          this.mailToast();
          this.startResendCooldown();
          this.isProcessing = false;
        },
        error: (err) => {
          this.isProcessing = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'Error al completar el registro',
            'Error',
            3000
          );
        },
      });
    } else {
      // Registro social (Google/Apple) - Actualizar perfil existente
      this.user.email = this.userService.getLocalUser.email;

      const socialProvider$ = this.signUpStateService.socialProvider$.pipe(
        take(1)
      );

      socialProvider$.subscribe((provider) => {
        const updateObs =
          provider === 'apple'
            ? this.userService.updateAppleUser(this.user)
            : this.userService.updateGoogleUser(this.user);

        updateObs.subscribe({
          next: (res) => {
            if (res?.access_token) {
              const token: Token = {
                access_token: res.access_token,
                refresh_token: res.refresh_token,
              };
              const userDecoded = this.authService.getDecodedUser(token);
              this.authService.persistAuthTokens(token);
              this.authService.setUser = userDecoded;
            }

            if (res?.user) {
              this.userService.setLocalUser = res.user;
            }

            this.navigationService.goToUserLoader();
            this.isProcessing = false;
          },
          error: (err) => {
            this.isProcessing = false;
            this.ionicUtilService.showErrorToast(
              err?.error?.message || 'Error al completar el registro social',
              'Error',
              3000
            );
          },
        });
      });
    }
  }

  public mailToast(): void {
    const toast: ToastOptions = {
      message: 'Código enviado a tu correo',
      duration: 7000,
    };
    this.ionicUtilService.showToast(toast);
  }

  public verifyCode(): void {
    const code = this.codeInput.nativeElement.value.toString().trim();
    if (!code) {
      this.ionicUtilService.showToast({
        message: 'Introduce el código',
        duration: 3000,
      });
      return;
    }

    this.isProcessing = true;

    this.userService.activateAccount(this.user.email, code).subscribe({
      next: (response: any) => {
        this.ionicUtilService.showToast({
          message: 'Cuenta activada correctamente',
          duration: 3000,
        });

        // Guardar token y navegar directamente a la app
        if (response?.access_token) {
          const token: Token = {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          };

          const userDecoded = this.authService.getDecodedUser(token);
          this.authService.persistAuthTokens(token);
          this.authService.setUser = userDecoded;

          // Navegar al user loader para cargar los datos del usuario
          this.navigationService.goToUserLoader();
        } else {
          // Fallback si no viene el token
          this.navigationService.goToSignUp();
          this.navigationService.goToLoginPage();
        }

        this.isProcessing = false;
      },
      error: (err) => {
        this.ionicUtilService.showToast({
          message: err?.error?.message || 'Código incorrecto',
          duration: 3000,
        });
        this.isProcessing = false;
      },
    });
  }

  public resendCode(): void {
    if (!this.user?.email || this.resendDisabled) return;

    this.startResendCooldown();
    this.isProcessing = true;
    this.userService.sendMailCode(this.user.email).subscribe({
      next: () => {
        this.ionicUtilService.showToast({
          message: 'Código reenviado',
          duration: 3000,
        });
        this.isProcessing = false;
      },
      error: (err) => {
        console.error(err);
        this.ionicUtilService.showToast({
          message: 'Error al reenviar código',
          duration: 3000,
        });
        this.isProcessing = false;
      },
    });
  }

  private startResendCooldown() {
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

  public getAge(birth: Date) {
    return this.userService.getAge(birth);
  }

  public ngOnDestroy(): void {
    if (this.resendInterval) clearInterval(this.resendInterval);
    this.destroy$.next();
    this.destroy$.complete();
    this.signUpStateService.clearState();
  }
}

