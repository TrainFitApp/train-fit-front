import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { take } from 'rxjs/operators';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IonModal, Platform, ToastOptions } from '@ionic/angular';
import { Subscription, Subject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { NotificationService, NotificationFrequency } from 'src/app/core/services/util/notification.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { MatchPasswords } from 'src/app/core/validators/matchPasswords';
import {
  ACTIVITY_FACTOR,
  ACTIVITY_FACTOR_TYPE,
  ACTIVITY_FACTOR_VALUES,
} from 'src/app/shared/constants/activity-factor';
import { LINKS } from 'src/app/shared/constants/links';
import {
  OBJETIVES,
  OBJETIVES_VALUES,
  OBJETIVE_TYPE,
  OBJETIVE_TYPES,
} from 'src/app/shared/constants/objetives';
import { SEX, SEX_TYPES } from 'src/app/shared/constants/sex';
import {
  STEPS,
  STEPS_TYPES,
  STEPS_VALUES,
} from 'src/app/shared/constants/steps';
import { TRAINING_TYPE } from 'src/app/shared/constants/training';

import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  PendingEmailVerificationService,
  PendingEmailVerificationState,
} from 'src/app/core/services/auth/pending-email-verification.service';
import { SignUpStateService } from 'src/app/core/services/auth/sign-up-state.service';
import { PasswordComplexity } from 'src/app/core/validators/password-complexity';
import Swiper from 'swiper';
import { calculateTrainingValues } from 'src/app/shared/constants/training';
import { EmailExistValidator } from 'src/app/core/validators/email-exist';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, OnDestroy {
  @ViewChild('codeInput') public codeInput: ElementRef<HTMLInputElement>;
  @ViewChild(IonModal) dateModal: IonModal;
  public isDateModalOpen = false;
  @ViewChild('swiperSignUp')
  public swiperSignUpRef:
    | ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }>
    | undefined;

  public swiper: Swiper;

  public signUpForm: FormGroup;

  public name: string;
  public lastname: string;

  public steps: number;

  public weight: string;
  public height: string;
  public birth: number;
  public sex: any;

  public showPass: boolean;
  public showPassRep: boolean;

  public notBegining = 0;
  public isEnding: boolean;

  public user: User;

  public dateValue: number;

  public objetiveKcal: number = 200;

  public currentSlide: number;

  public existPrev: boolean;
  public existNext: boolean;

  public registerSocialPending: boolean;

  public error: string;

  private backButton$: Subscription;
  private destroy$ = new Subject<void>();

  // Data Sheet & Registration variables
  public isProcessing = false;
  public verifyEmailOnly = false;
  public codeSended = false;
  public resendDisabled = false;
  public resendCountdown = 0;
  private resendInterval: any;
  public objetiveMessage: string;
  public kcalTotal: number;
  public years: number;
  private readonly RESEND_COOLDOWN_SECONDS = 60;

  public objetiveSelected: OBJETIVE_TYPE;

  public OBJETIVE_TYPES = OBJETIVE_TYPES;
  public OBJETIVES = OBJETIVES;
  public OBJETIVES_VALUES = OBJETIVES_VALUES;
  public SEX = SEX;
  public SEX_TYPES = SEX_TYPES;
  public ACTIVITY_FACTOR_VALUES = ACTIVITY_FACTOR_VALUES;
  public ACTIVITY_FACTOR = ACTIVITY_FACTOR;
  public STEPS_TYPES = STEPS_TYPES;
  public STEPS = STEPS;
  public STEPS_VALUES = STEPS_VALUES;
  public TRAINING_TYPE_VALUES: TRAINING_TYPE[] = [];
  public LINKS = LINKS;

  public notifEnabled: boolean = false;
  public notifFrequency: NotificationFrequency = 'daily';
  public notifWeekday: number = 1;
  public notifIntervalDays: number = 2;
  public notifTime: string = '';
  public isTimeModalOpen: boolean = false;
  private notifPermissionAttempted: boolean = false;

  private readonly MIN_SIGN_UP_AGE = 13;
  private readonly MAX_SIGN_UP_AGE = 120;
  private _defaultBirthDate: string | null = null;
  private _maxDate: string | null = null;
  private _minDate: string | null = null;

  constructor(
    private userService: UserService,
    private matchPasswords: MatchPasswords,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private platform: Platform,
    private navigationService: NavigationService,
    private authService: AuthService,
    private router: Router,
    private signUpStateService: SignUpStateService,
    private pendingEmailVerificationService: PendingEmailVerificationService,
    private translate: TranslateService,
    private i18nService: I18nService,
    private notificationService: NotificationService
  ) {
    // Determinar tipo de registro
    const localUser = this.userService.getLocalUser;

    const navigation = this.router.getCurrentNavigation();
    const navigationData = navigation?.extras?.state?.data;
    const pendingVerification = this.pendingEmailVerificationService.get();
    const fromSignIn = !!navigationData?.fromSignIn;
    const verificationEmail =
      navigationData?.email ?? pendingVerification?.email ?? null;

    this.verifyEmailOnly =
      !!navigationData?.verifyEmailOnly || !!pendingVerification;
    if (this.verifyEmailOnly) {
      if (!this.user) {
        this.user = new User();
      }
      this.user.email = verificationEmail;
      this.codeSended = true;
      if (verificationEmail && !pendingVerification) {
        this.pendingEmailVerificationService.markCodeSent(verificationEmail);
      }
      this.restoreResendCooldown(pendingVerification);
    }

    // Si NO hay usuario local o viene de Sign In, es registro tradicional (con email/pass)
    this.registerSocialPending = !localUser || fromSignIn;

    // Determinar si es social
    if (localUser && !this.isUserRegistrationComplete(localUser)) {
      // Es un social login pendiente de completar datos
      this.socialProvider = localUser.provider === 'apple' ? 'apple' : 'google';
    }
  }

  /**
   * Verifica si el usuario completó todos los datos de registro
   */
  private isUserRegistrationComplete(user: User): boolean {
    return !!(user?.name && user?.lastname && user?.weight && user?.height);
  }

  // Renombrando para mayor claridad interna si se desea, pero mantengo compatibilidad
  public get isSocialRegistration(): boolean {
    return !this.registerSocialPending;
  }

  public socialProvider: 'google' | 'apple' | null = null;

  public get activityType(): ACTIVITY_FACTOR_TYPE {
    return this.userService.getActivityFactor(
      this.signUpForm.controls.activity.value
    );
  }

  public ngOnInit(): void {
    this.initVariables();
    this.initForm();
    // this.setActivityType();
    this.initializeBackButtonCustomHandler();

    this.signUpForm.valueChanges.subscribe((res) => {
      this.error = this.utilService.handleErrors(this.signUpForm);
      this.name = res.name;
      this.lastname = res.lastname;
      this.steps = res.steps;
      this.weight = res.weight;
      this.height = res.height;
      this.dateValue = this.userService.getAge(new Date(res.birth));
      this.birth = this.dateValue;
      this.sex = res.sex;
    });

    this.signUpForm.get('steps').valueChanges.subscribe(() => {
      if (this.steps !== STEPS[STEPS_TYPES.notCounted].id) {
        this.signUpForm.controls.activity.setValue(null, { emitEvent: false });
        setTimeout(() => this.swiperReady());
      }
    });
  }

  public ngAfterViewInit(): void {
    // TODO: lamentable que se tenga que cargar con un delay
    setTimeout(() => this.swiperReady());
  }

  public ionViewWillLeave(): void {
    this.backButton$?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    if (this.resendInterval) clearInterval(this.resendInterval);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.resendInterval) clearInterval(this.resendInterval);
  }

  private initVariables(): void {
    this.existNext = true;
    this.updateTrainingOptions();

    const date = new Date();
    date.setHours(9, 0, 0, 0);
    this.notifTime = date.toISOString();
  }

  public initForm(): void {
    this.signUpForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        weight: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.min(30),
            Validators.max(300),
          ])
        ),
        height: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.min(70),
            Validators.max(300),
          ])
        ),
        birth: new FormControl(
          this.getDefaultBirthDate(),
          Validators.compose([
            Validators.required,
            this.birthDateAgeRangeValidator(),
          ])
        ),
        steps: new FormControl(null, Validators.required),
        objetive: new FormControl(null, Validators.required),
        sex: new FormControl(null, Validators.required),
        activity: new FormControl(null),
        training: new FormControl(null, Validators.required),
        email: new FormControl(null),
        password: new FormControl(null),
        passwordRep: new FormControl(null),
        termsAndConditions: new FormControl(null, Validators.requiredTrue),
        policyAndPrivacy: new FormControl(null, Validators.requiredTrue),
      },
      {
        validators: this.matchPasswords.matchPassword,
      }
    );

    // this.signUpForm.controls.activity.valueChanges.subscribe(() =>
    //   this.activityType
    // );

    this.signUpForm.controls.steps.valueChanges.subscribe((selectedStep) => {
      this.signUpForm.controls.training.setValue(null);
      if (selectedStep === STEPS[STEPS_TYPES.notCounted].value)
        this.signUpForm.controls.activity.setValidators(Validators.required);
      else {
        this.signUpForm.controls.activity.clearValidators();
        this.signUpForm.controls.activity.setValue(null);
      }
      this.signUpForm.controls.activity.updateValueAndValidity();
      this.updateTrainingOptions(selectedStep);
    });

    if (this.registerSocialPending) {
      this.signUpForm
        .get('email')
        ?.setValidators(
          Validators.compose([Validators.required, Validators.email])
        );

      this.signUpForm
        .get('email')
        ?.setAsyncValidators(
          EmailExistValidator.createValidator(this.userService)
        );

      this.signUpForm
        .get('password')
        ?.setValidators(
          Validators.compose([
            Validators.required,
            PasswordComplexity.basicComplexity(),
          ])
        );

      this.signUpForm
        .get('passwordRep')
        ?.setValidators(
          Validators.compose([
            Validators.required,
            PasswordComplexity.basicComplexity(),
          ])
        );

      // Es importante llamar a updateValueAndValidity() para aplicar los cambios
      this.signUpForm.get('email')?.updateValueAndValidity();
      this.signUpForm.get('password')?.updateValueAndValidity();
      this.signUpForm.get('passwordRep')?.updateValueAndValidity();
    }
  }

  public selectObjetive(objetive: OBJETIVE_TYPE): void {
    if (this.objetiveSelected?.id !== objetive.id) {
      this.objetiveKcal = 200; // resetear al cambiar de objetivo
    }
    this.objetiveSelected = objetive;
    this.signUpForm.get('objetive')?.setValue(objetive.value);
  }

  public selectSteps(stepValue: number): void {
    this.signUpForm.get('steps')?.setValue(stepValue);
  }

  public selectActivity(value: number): void {
    this.signUpForm.controls.activity.setValue(value);
  }

  public selectTraining(value: number | string): void {
    this.signUpForm.controls.training.setValue(value);
  }

  public toggleControl(controlName: string): void {
    const control = this.signUpForm.get(controlName);
    if (!control) return;
    const current = !!control.value;
    control.setValue(!current);
    control.markAsTouched();
    control.updateValueAndValidity({ onlySelf: true });
  }

  private updateTrainingOptions(selectedStep?: number): void {
    // Si no hay un paso seleccionado, usar un valor por defecto
    const stepValue =
      selectedStep || STEPS[STEPS_TYPES.between2000And6000].value;
    const trainingValues = calculateTrainingValues(stepValue);
    if (trainingValues)
      Object.assign(this.TRAINING_TYPE_VALUES, Object.values(trainingValues));
  }

  private swiperReady(): void {
    const swiperEl = Object.assign(this.swiperSignUpRef?.nativeElement, {
      allowTouchMove: false,
    });
    swiperEl.initialize();

    this.swiper = this.swiperSignUpRef?.nativeElement.swiper;
    this.swiper.on('slideChange', () => {
      this.checkNextAndPrev();
      this.checkNotificationSlide();
    });
    setTimeout(() => this.checkNotificationSlide(), 300);
  }

  private checkNextAndPrev(): void {
    const swiper: Swiper = this.swiperSignUpRef.nativeElement.swiper;
    const activeIndex = swiper.activeIndex;

    this.currentSlide = activeIndex;
    this.existNext = activeIndex < swiper.slides.length - 1 && !this.codeSended;
    this.existPrev = activeIndex > 0 && !this.codeSended;
  }

  public get isLastDataSlide(): boolean {
    if (!this.swiper) return false;
    const slides = this.getPresentSlidesControls();
    // El slide de la ficha es el penúltimo si hay verificación, o el último si no hay
    const sheetIndex = this.registerSocialPending
      ? slides.length - 2
      : slides.length - 1;
    return this.swiper.activeIndex >= sheetIndex;
  }

  public get isLastFormSlide(): boolean {
    if (!this.swiper) return false;
    const slides = this.getPresentSlidesControls();
    const formIndex = this.registerSocialPending
      ? slides.length - 4
      : slides.length - 3;
    return this.swiper.activeIndex === formIndex;
  }

  public customFormatter(value: number): string {
    return `${value} h`;
  }

  public nextSlide(): void {
    const swiper = this.swiperSignUpRef.nativeElement.swiper;
    const activeIndex = swiper.activeIndex;

    const controls = this.getControlsForSlideIndex(activeIndex);
    let isValid = true;
    let pendingControl: FormControl | null = null;
    for (const controlName of controls) {
      const control = this.signUpForm.get(controlName);
      if (!control) continue;
      control.markAsTouched();
      const hasAsyncValidator = !!(control as any).asyncValidator;
      if (!hasAsyncValidator) {
        control.updateValueAndValidity({ onlySelf: true });
      }
      if ((control as FormControl).pending)
        pendingControl = control as FormControl;
      if (control.invalid) isValid = false;
    }

    // Si hay una validación asíncrona pendiente (como email), esperar a que finalice
    if (pendingControl) {
      const sub = pendingControl.statusChanges.subscribe((status) => {
        if (status !== 'PENDING') {
          sub.unsubscribe();
          pendingControl.markAsTouched();
          if (pendingControl.invalid) return;
          this.nextSlide();
        }
      });
      return;
    }

    if (!isValid) return;
    swiper.slideNext();
  }

  public prevSlide(): void {
    this.swiperSignUpRef.nativeElement.swiper.slidePrev();
  }

  public async onNotifToggle(): Promise<void> {
    if (this.notifEnabled) {
      const granted = await this.requestNotifPermission();
      if (!granted) {
        this.notifEnabled = false;
        return;
      }
    }
    await this.saveNotifSettings();
  }

  public async onNotifSettingsChange(): Promise<void> {
    await this.saveNotifSettings();
  }

  public changeNotifInterval(delta: number): void {
    const newVal = this.notifIntervalDays + delta;
    if (newVal >= 1 && newVal <= 60) {
      this.notifIntervalDays = newVal;
      void this.saveNotifSettings();
    }
  }

  public getNotifTimeDisplay(): string {
    if (!this.notifTime) return '--:--';
    const date = new Date(this.notifTime);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  private checkNotificationSlide(): void {
    if (this.notifPermissionAttempted || this.verifyEmailOnly || !this.swiper) return;

    const slides = this.getPresentSlidesControls();
    const termsIndex = slides.findIndex(
      (s) =>
        Array.isArray(s) &&
        s.includes('termsAndConditions') &&
        s.includes('policyAndPrivacy'),
    );
    const notifIndex = termsIndex + 1;

    if (this.swiper.activeIndex === notifIndex) {
      this.notifPermissionAttempted = true;
      void this.requestNotifPermission();
    }
  }

  private async requestNotifPermission(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;
    try {
      const granted = await this.notificationService.requestPermissions();
      if (!granted) {
        this.ionicUtilService.showToast({
          message: this.translate.instant('NOTIFICATIONS.PERMISSION_DENIED'),
          duration: 2000,
          color: 'warning',
        });
        return false;
      }
      this.notifEnabled = true;
      if (!this.notifTime) {
        const date = new Date();
        date.setHours(9, 0, 0, 0);
        this.notifTime = date.toISOString();
      }
      await this.saveNotifSettings();
      return true;
    } catch {
      return false;
    }
  }

  private async saveNotifSettings(): Promise<void> {
    if (!this.notifTime) {
      const date = new Date();
      date.setHours(9, 0, 0, 0);
      this.notifTime = date.toISOString();
    }
    const timeDate = new Date(this.notifTime);
    await this.notificationService.saveAndSchedule({
      enabled: this.notifEnabled,
      hour: timeDate.getHours(),
      minute: timeDate.getMinutes(),
      frequency: this.notifFrequency,
      weekday: this.notifFrequency === 'weekly' ? this.notifWeekday : undefined,
      intervalDays: this.notifFrequency === 'interval' ? this.notifIntervalDays : undefined,
    });
  }

  public exitRegistration(): void {
    this.showExitConfirm();
  }

  public register(): void {
    this.isProcessing = true;
    this.kcalTotal = this.userService.calculateKcal(this.user);

    if (this.registerSocialPending) {
      // Registro tradicional (email/password)
      this.userService.createUser(this.user, new Date()).subscribe({
        next: (resUser) => {
          this.user = resUser;
          this.user.email =
            this.user.email || this.signUpForm.get('email')?.value;
          this.pendingEmailVerificationService.start(
            this.user.email
          );
          this.codeSended = true;
          this.mailToast();
          this.startResendCooldown();
          this.isProcessing = false;
          // Avanzar al slide de verificación
          setTimeout(() => {
            this.swiper.slideNext();
          }, 100);
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

      this.signUpStateService.socialProvider$
        .pipe(take(1))
        .subscribe((provider) => {
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

  public verifyCode(): void {
    const code = this.codeInput.nativeElement.value.toString().trim();
    if (!code) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('SIGN_UP.ENTER_CODE'),
        duration: 3000,
      });
      return;
    }

    if (!this.user?.email) {
      this.pendingEmailVerificationService.clear();
      this.ionicUtilService.showToast({
        message: this.translate.instant('SIGN_UP.RECOVER_EMAIL_ERROR'),
        duration: 3000,
      });
      this.navigationService.goToLoginPage();
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
          this.pendingEmailVerificationService.clear();
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

    this.isProcessing = true;
    this.userService.sendMailCode(this.user.email).subscribe({
      next: () => {
        this.pendingEmailVerificationService.markCodeSent(this.user.email);
        this.startResendCooldown();
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.CODE_RESENT'),
          duration: 3000,
        });
        this.isProcessing = false;
      },
      error: (err) => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.RESEND_CODE_ERROR'),
          duration: 3000,
        });
        this.isProcessing = false;
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

  private restoreResendCooldown(
    pendingVerification: PendingEmailVerificationState | null
  ): void {
    if (!pendingVerification?.codeSentAt) {
      return;
    }

    const sentAt = new Date(pendingVerification.codeSentAt).getTime();
    if (Number.isNaN(sentAt)) {
      return;
    }

    const elapsedSeconds = Math.floor((Date.now() - sentAt) / 1000);
    this.startResendCooldown(this.RESEND_COOLDOWN_SECONDS - elapsedSeconds);
  }

  public mailToast(): void {
    const toast: ToastOptions = {
      message: this.translate.instant('SIGN_UP.CODE_SENT_TO_EMAIL'),
      duration: 7000,
    };
    this.ionicUtilService.showToast(toast);
  }

  public getAge(birth: any) {
    if (!birth) return 0;
    return this.userService.getAge(new Date(birth));
  }

  public onDateChange(event: any): void {
    const selectedDate = event.detail.value;
    if (selectedDate) {
      this.signUpForm.get('birth')?.setValue(selectedDate);
      this.signUpForm.get('birth')?.markAsTouched();
    }
  }

  public getMaxDate(): string {
    if (!this._maxDate) {
      const maxDate = this.getTodayDateOnly();
      maxDate.setFullYear(maxDate.getFullYear() - this.MIN_SIGN_UP_AGE);
      maxDate.setMonth(11, 31);
      this._maxDate = maxDate.toISOString();
    }
    return this._maxDate;
  }

  public getMinDate(): string {
    if (!this._minDate) {
      const minDate = this.getTodayDateOnly();
      minDate.setFullYear(minDate.getFullYear() - this.MAX_SIGN_UP_AGE);
      minDate.setMonth(0, 1);
      this._minDate = minDate.toISOString();
    }
    return this._minDate;
  }

  private getDefaultBirthDate(): string {
    if (!this._defaultBirthDate) {
      const defaultBirthDate = this.getTodayDateOnly();
      defaultBirthDate.setFullYear(
        defaultBirthDate.getFullYear() - this.MIN_SIGN_UP_AGE
      );
      this._defaultBirthDate = defaultBirthDate.toISOString();
    }
    return this._defaultBirthDate;
  }

  private birthDateAgeRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const birthDate = this.toDateOnly(control.value);
      if (!birthDate) {
        return { invalidDate: true };
      }

      const youngestAllowedBirthDate = this.getTodayDateOnly();
      youngestAllowedBirthDate.setFullYear(
        youngestAllowedBirthDate.getFullYear() - this.MIN_SIGN_UP_AGE
      );

      if (birthDate > youngestAllowedBirthDate) {
        return { minAge: true };
      }

      const oldestAllowedBirthDate = this.getTodayDateOnly();
      oldestAllowedBirthDate.setFullYear(
        oldestAllowedBirthDate.getFullYear() - this.MAX_SIGN_UP_AGE
      );

      if (birthDate < oldestAllowedBirthDate) {
        return { maxAge: true };
      }

      return null;
    };
  }

  private getTodayDateOnly(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  private toDateOnly(value: string | Date): Date | null {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private getControlsForSlideIndex(index: number): string[] {
    const slides: string[][] = this.getPresentSlidesControls();
    return slides[index] ?? [];
  }

  public getPresentSlidesControls(): string[][] {
    if (this.verifyEmailOnly) {
      return [[]]; // Solo hay un slide de verificación
    }

    const slides: string[][] = [
      ['name', 'lastname'],
      ['birth'],
      ['weight'],
      ['height'],
      ['sex'],
      ['steps'],
    ];

    if (
      this.signUpForm.controls.steps.value &&
      this.signUpForm.controls.steps.value ===
        STEPS[STEPS_TYPES.notCounted].value
    ) {
      slides.push(['activity']);
    }

    slides.push(['training']);
    slides.push(['objetive']);

    if (this.registerSocialPending) {
      slides.push(['email']);
      slides.push(['password', 'passwordRep']);
    }

    slides.push(['termsAndConditions', 'policyAndPrivacy']);
    slides.push([]); // Notificaciones
    slides.push([]); // Ficha de datos
    if (this.registerSocialPending) {
      slides.push([]); // Verificación
    }
    return slides;
  }

  public showSheet(): void {
    if (this.verifyEmailOnly || this.codeSended) {
      this.verifyCode();
      return;
    }

    if (!this.objetiveSelected) return;

    const activity: number = this.signUpForm.controls.activity.value
      ? this.signUpForm.controls.activity.value
      : 1;

    const finalKcal =
      this.objetiveSelected.id === this.OBJETIVE_TYPES.gain
        ? Math.abs(this.objetiveKcal)
        : this.objetiveSelected.id === this.OBJETIVE_TYPES.loss
        ? -Math.abs(this.objetiveKcal)
        : 0;

    this.user = {
      ...this.signUpForm.value,
      activity: activity,
      objetive: finalKcal,
      lang: this.i18nService.current as 'es' | 'en',
    };

    if (this.user.objetive > 0) this.objetiveMessage = this.translate.instant('SIGN_UP.CALORIC_SURPLUS');
    else if (this.user.objetive < 0) this.objetiveMessage = this.translate.instant('SIGN_UP.CALORIC_DEFICIT');
    else this.objetiveMessage = this.translate.instant('SIGN_UP.MAINTENANCE');

    this.years = this.dateValue;
    this.kcalTotal = this.userService.calculateKcal(this.user);

    // Avanzar al slide de la ficha
    this.swiper.slideNext();
  }

  public calculateBirh(date): void {
    this.dateValue = this.userService.getAge(new Date(date));
  }

  // public setActivityType(): void {
  //   for (const type of ACTIVITY_FACTOR_VALUES) {
  //     if (
  //       ACTIVITY_FACTOR[type.id].value ===
  //       this.signUpForm.controls.activity.value
  //     )
  //       this.activityType = type;
  //   }
  // }

  public changeObjetive(event: Event): void {
    const objetive = this.utilService.getEventNumber(event);
    this.objetiveKcal = Number(objetive);
  }

  public onMove(): void {
    this.swiper.disable();
  }

  public onStop(): void {
    this.swiper.enable();
  }

  private initializeBackButtonCustomHandler(): void {
    this.backButton$ = this.platform.backButton.subscribeWithPriority(
      9999,
      async () => {
        if (this.isDateModalOpen) {
          await this.dateModal.dismiss();
          return;
        }
        this.showExitConfirm();
      }
    );
  }

  private showExitConfirm(): void {
    const alertOptions = {
      header: this.translate.instant('COMMON.BACK'),
      message: this.translate.instant('COMMON.LOSE_PROGRESS'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL').toUpperCase(),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.CONFIRM').toUpperCase(),
          cssClass: 'alert-button-primary',
          handler: () => {
            this.pendingEmailVerificationService.clear();
            if (
              this.authService.isAuthenticated() ||
              this.authService.hasStoredAccessToken()
            ) {
              this.authService.logout();
            } else {
              this.navigationService.goToLoginPage();
            }
            this.backButton$?.unsubscribe();
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }
}
