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
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SignUpStateService } from 'src/app/core/services/auth/sign-up-state.service';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
  public displayKcal: number = 0;
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
    private signUpStateService: SignUpStateService,
    private translate: TranslateService,
    private i18nService: I18nService
  ) {}

  public ngOnInit(): void {
    this.signUpStateService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.user.lang = this.i18nService.current as 'es' | 'en';
          this.displayKcal = this.userService.calculateKcal(this.user);
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

    if (this.user.objetive > 0) this.objetiveMessage = this.translate.instant('SIGN_UP.CALORIC_SURPLUS');
    else if (this.user.objetive < 0) this.objetiveMessage = this.translate.instant('SIGN_UP.CALORIC_DEFICIT');
    else this.objetiveMessage = this.translate.instant('SIGN_UP.MAINTENANCE');
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
    this.displayKcal = this.userService.calculateKcal(this.user);

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
            err?.error?.message || this.translate.instant('SIGN_UP.REGISTER_ERROR'),
            this.translate.instant('COMMON.ERROR'),
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
            const finish = () => {
              if (res?.user) {
                this.userService.setLocalUser = res.user;
                this.authService.setUser = res.user;
              }
              this.navigationService.goToUserLoader();
              this.isProcessing = false;
            };

            if (res?.access_token) {
              this.authService.applyAuthResponse(res).subscribe({
                next: finish,
                error: (err) => {
                  this.isProcessing = false;
                  this.ionicUtilService.showErrorToast(
                    err,
                    this.translate.instant('SIGN_UP.SESSION_SAVE_ERROR'),
                    3000
                  );
                },
              });
              return;
            }

            finish();
          },
          error: (err) => {
            this.isProcessing = false;
            this.ionicUtilService.showErrorToast(
              err?.error?.message || this.translate.instant('SIGN_UP.SOCIAL_REGISTER_ERROR'),
              this.translate.instant('COMMON.ERROR'),
              3000
            );
          },
        });
      });
    }
  }

  public mailToast(): void {
    const toast: ToastOptions = {
      message: this.translate.instant('SIGN_UP.CODE_SENT_TO_EMAIL'),
      duration: 7000,
    };
    this.ionicUtilService.showToast(toast);
  }

  public onCodeInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '').slice(0, 6);
    if (input.value !== digitsOnly) {
      input.value = digitsOnly;
    }
  }

  public verifyCode(): void {
    const code = this.codeInput.nativeElement.value.toString().trim().replace(/\D/g, '');
    if (!code) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('SIGN_UP.ENTER_CODE'),
        duration: 3000,
      });
      return;
    }

    this.isProcessing = true;

    this.userService.activateAccount(this.user.email, code).subscribe({
      next: (response: any) => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.ACCOUNT_ACTIVATED'),
          duration: 3000,
        });

        if (response?.access_token) {
          this.authService.applyAuthResponse(response).subscribe({
            next: () => this.navigationService.goToUserLoader(),
            error: (err) => {
              this.ionicUtilService.showErrorToast(
                err,
                this.translate.instant('SIGN_UP.SESSION_SAVE_ERROR'),
                3000
              );
            },
          });
        } else {
          this.navigationService.goToSignUp();
          this.navigationService.goToLoginPage();
        }

        this.isProcessing = false;
      },
      error: (err) => {
        this.ionicUtilService.showToast({
          message: err?.error?.message || this.translate.instant('SIGN_UP.INCORRECT_CODE'),
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
    this.userService.resendActivationCode(this.user.email).subscribe({
      next: () => {
        if (this.codeInput) {
          this.codeInput.nativeElement.value = '';
        }
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.CODE_RESENT'),
          duration: 3000,
        });
        this.isProcessing = false;
      },
      error: (err) => {
        console.error(err);
        this.ionicUtilService.showToast({
          message: err?.error?.message || this.translate.instant('SIGN_UP.RESEND_CODE_ERROR'),
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

  public getAge(birth: string) {
    return this.userService.getAge(birth);
  }

  public ngOnDestroy(): void {
    if (this.resendInterval) clearInterval(this.resendInterval);
    this.destroy$.next();
    this.destroy$.complete();
    this.signUpStateService.clearState();
  }
}
