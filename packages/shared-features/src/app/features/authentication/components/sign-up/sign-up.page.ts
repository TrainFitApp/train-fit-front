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
import { Platform, ToastOptions } from '@ionic/angular';
import { Subscription, Subject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { localIsoDate, parseLocalIsoDate } from 'src/app/core/utils/local-date.util';
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

  public user: User;

  public dateValue: number;

  public objetiveKcal: number = 200;

  public currentSlide: number = 0;

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

  private readonly MIN_SIGN_UP_AGE = 14;
  private readonly MAX_SIGN_UP_AGE = 120;
  private _defaultBirthDate: string | null = null;

  get locale(): string {
    return this.i18nService.current === 'en' ? 'en-US' : 'es-ES';
  }

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
    private i18nService: I18nService
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
      this.dateValue = this.userService.getAge(res.birth);
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
    // Un setTimeout(0) compite con el propio layout async de Swiper (init()
    // no es síncrono): si corre antes de que Swiper termine de posicionar
    // los slides fuera de pantalla, el scrollHeight de esas wheels es 0 en
    // ese instante y el scrollTop inicial se clampea a 0 en silencio (se
    // queda ahí para siempre, el layout posterior no lo reajusta solo). Dos
    // rAF encadenados garantizan que ya hubo un pintado real de por medio.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        this.initWeightHeightWheels();
        this.initBirthWheels();
      })
    );
  }

  // ---------- Wheel pickers (peso/altura/fecha de nacimiento), portados de
  // trainfit-onboarding-prototype.html. Peso y altura se escriben como
  // NÚMERO: bmrMifflinStJeor rechaza strings y el objetivo calórico salía 0.
  // La fecha de nacimiento sigue en ISO date.
  private readonly WHEEL_ITEM_HEIGHT = 52;
  private wheelsInitialized = false;
  private weightWheelInt = 70;
  private weightWheelDecimal = 0;

  public heightWheelValues: number[] = this.range(70, 300);
  public weightIntWheelValues: number[] = this.range(30, 300);
  public weightDecWheelValues: number[] = this.range(0, 9);

  private range(min: number, max: number): number[] {
    const values: number[] = [];
    for (let v = min; v <= max; v++) values.push(v);
    return values;
  }

  private initWeightHeightWheels(): void {
    if (this.wheelsInitialized || this.verifyEmailOnly) return;
    this.wheelsInitialized = true;

    const currentHeight = parseInt(this.signUpForm.get('height')?.value, 10);
    this.initWheel(
      'wheel-height',
      70,
      300,
      Number.isFinite(currentHeight) ? currentHeight : 170,
      (val) => {
        this.signUpForm.get('height')?.setValue(val);
        this.signUpForm.get('height')?.markAsTouched();
      }
    );

    const rawWeight = parseFloat(this.signUpForm.get('weight')?.value);
    this.weightWheelInt = Number.isFinite(rawWeight) ? Math.trunc(rawWeight) : 70;
    const rawDecimal = Number.isFinite(rawWeight)
      ? Math.round((rawWeight % 1) * 10)
      : 0;
    this.weightWheelDecimal = Math.min(9, Math.max(0, rawDecimal));

    this.initWheel('wheel-weight-int', 30, 300, this.weightWheelInt, (val) => {
      this.weightWheelInt = val;
      this.commitWeightWheel();
    });
    this.initWheel('wheel-weight-dec', 0, 9, this.weightWheelDecimal, (val) => {
      this.weightWheelDecimal = val;
      this.commitWeightWheel();
    });
  }

  private commitWeightWheel(): void {
    const value = Math.round((this.weightWheelInt + this.weightWheelDecimal / 10) * 10) / 10;
    this.signUpForm.get('weight')?.setValue(value);
    this.signUpForm.get('weight')?.markAsTouched();
  }

  // ---------- Wheel de fecha de nacimiento (día/mes/año) ----------
  // El día depende del mes+año seleccionados (28-31, bisiestos) — a
  // diferencia de peso/altura, esta wheel necesita re-renderizar su propia
  // columna cuando cambia el rango, así que se reinicializa (initWheel es
  // idempotente: vuelve a leer los .wheel-item actuales del DOM).
  private birthWheelsInitialized = false;
  private birthDay = 1;
  private birthMonth = 0;
  private birthYear = 2000;

  public dayWheelValues: number[] = this.range(1, 31);
  public monthWheelValues: { value: number; label: string }[] = [];
  public yearWheelValues: number[] = [];

  private daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private buildLocalizedMonths(): { value: number; label: string }[] {
    const formatter = new Intl.DateTimeFormat(this.locale, { month: 'long' });
    return this.range(0, 11).map((month) => {
      const label = formatter.format(new Date(2000, month, 1));
      return { value: month, label: label.charAt(0).toUpperCase() + label.slice(1) };
    });
  }

  private initBirthWheels(): void {
    if (this.birthWheelsInitialized || this.verifyEmailOnly) return;
    this.birthWheelsInitialized = true;

    const currentYear = new Date().getFullYear();
    this.yearWheelValues = this.range(
      currentYear - this.MAX_SIGN_UP_AGE,
      currentYear - this.MIN_SIGN_UP_AGE
    );
    this.monthWheelValues = this.buildLocalizedMonths();

    const existing = this.toDateOnly(this.signUpForm.get('birth')?.value);
    const base = existing || this.toDateOnly(this.getDefaultBirthDate()) || new Date();

    this.birthDay = base.getDate();
    this.birthMonth = base.getMonth();
    this.birthYear = base.getFullYear();
    this.dayWheelValues = this.range(1, this.daysInMonth(this.birthYear, this.birthMonth));

    // Los 3 arrays de arriba acaban de asignarse: Angular todavía no ha
    // vuelto a renderizar los *ngFor con ellos, así que initWheel encontraría
    // 0 .wheel-item por columna (y el scroll caería al principio de la
    // lista). Un tick de margen para que el DOM se ponga al día primero.
    setTimeout(() => {
      const firstYear = this.yearWheelValues[0];
      const lastYear = this.yearWheelValues[this.yearWheelValues.length - 1];
      this.initWheel('wheel-birth-year', firstYear, lastYear, this.birthYear, (val) => {
        this.birthYear = val;
        this.onBirthMonthOrYearChange();
      });

      this.initWheel('wheel-birth-month', 0, 11, this.birthMonth, (val) => {
        this.birthMonth = val;
        this.onBirthMonthOrYearChange();
      });

      this.initBirthDayWheel();
    });
  }

  private initBirthDayWheel(): void {
    this.initWheel(
      'wheel-birth-day',
      1,
      this.dayWheelValues.length,
      this.birthDay,
      (val) => {
        this.birthDay = val;
        this.commitBirthDate();
      }
    );
  }

  private onBirthMonthOrYearChange(): void {
    const maxDay = this.daysInMonth(this.birthYear, this.birthMonth);
    const dayCountChanged = this.dayWheelValues.length !== maxDay;
    this.birthDay = Math.min(this.birthDay, maxDay);

    if (dayCountChanged) {
      this.dayWheelValues = this.range(1, maxDay);
      // Esperar a que Angular re-renderice la columna con el nuevo número
      // de .wheel-item antes de volver a engancharle los listeners.
      setTimeout(() => this.initBirthDayWheel());
    }

    this.commitBirthDate();
  }

  private commitBirthDate(): void {
    // Día de calendario tal cual lo eligió: sin hora ni huso.
    const date = new Date(this.birthYear, this.birthMonth, this.birthDay);
    this.signUpForm.get('birth')?.setValue(localIsoDate(date));
    this.signUpForm.get('birth')?.markAsTouched();
  }

  private initWheel(
    idBase: string,
    min: number,
    max: number,
    defVal: number,
    onSettle: (val: number) => void
  ): void {
    const scrollEl = document.getElementById(`${idBase}-scroll`) as
      | (HTMLElement & { __wheelScrollHandler?: EventListener })
      | null;
    if (!scrollEl) return;
    // Reinicializable: la wheel de día se vuelve a llamar cuando cambian los
    // días del mes. *ngFor sin trackBy reutiliza los nodos cuyo valor
    // coincide (p.ej. día 1-28 persiste entre meses), así que hay que quitar
    // el listener de scroll anterior (si no, se acumulan y onSettle se
    // dispara N veces) y no volver a enganchar click en items ya enganchados.
    if (scrollEl.__wheelScrollHandler) {
      scrollEl.removeEventListener('scroll', scrollEl.__wheelScrollHandler);
    }
    const items = Array.from(
      scrollEl.querySelectorAll<HTMLElement & { __wheelClickBound?: boolean }>('.wheel-item')
    );

    const setActive = (centerIdx: number): void => {
      items.forEach((item, i) => {
        item.classList.remove('is-active', 'is-near');
        const delta = Math.abs(i - centerIdx);
        if (delta === 0) item.classList.add('is-active');
        else if (delta === 1) item.classList.add('is-near');
      });
    };

    const pulse = (centerIdx: number): void => {
      const activeEl = items[centerIdx];
      if (!activeEl) return;
      activeEl.classList.add('is-settled');
      const handler = () => {
        activeEl.classList.remove('is-settled');
        activeEl.removeEventListener('animationend', handler);
      };
      activeEl.addEventListener('animationend', handler);
    };

    const initialIdx = Math.min(Math.max(defVal - min, 0), items.length - 1);
    // Forzar layout antes de fijar scrollTop: si los .wheel-item se acaban
    // de insertar en este mismo tick (wheel de nacimiento, con arrays que se
    // rellenan justo antes de esto), el navegador aún no tiene calculado el
    // scrollHeight real y clampea el scrollTop a 0 de forma silenciosa y
    // definitiva — no se reajusta solo cuando el layout llega después.
    void scrollEl.offsetHeight;
    scrollEl.scrollTop = initialIdx * this.WHEEL_ITEM_HEIGHT;
    setActive(initialIdx);

    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    const scrollHandler = () => {
      const idxFloat = scrollEl.scrollTop / this.WHEEL_ITEM_HEIGHT;
      const idx = Math.max(0, Math.min(items.length - 1, Math.round(idxFloat)));
      setActive(idx);
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const snapped = Math.max(
          0,
          Math.min(items.length - 1, Math.round(scrollEl.scrollTop / this.WHEEL_ITEM_HEIGHT))
        );
        scrollEl.scrollTo({ top: snapped * this.WHEEL_ITEM_HEIGHT, behavior: 'smooth' });
        setActive(snapped);
        pulse(snapped);
        onSettle(min + snapped);
      }, 120);
    };
    scrollEl.__wheelScrollHandler = scrollHandler;
    scrollEl.addEventListener('scroll', scrollHandler, { passive: true });

    items.forEach((item, i) => {
      if (item.__wheelClickBound) return;
      item.__wheelClickBound = true;
      item.addEventListener('click', () => {
        scrollEl.scrollTo({ top: i * this.WHEEL_ITEM_HEIGHT, behavior: 'smooth' });
      });
    });
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

  // Mismo criterio que ya usaba el footer original pa elegir entre "Anterior"
  // y "Salir" (*ngIf="existPrev" / *ngIf="!existPrev"): existPrev ya vale
  // false en slide 0, en verifyEmailOnly y en la pantalla de verificacion
  // (codeSended), asi que cubre los 3 casos sin logica nueva.
  public handleHeaderBack(): void {
    if (this.existPrev) {
      this.prevSlide();
    } else {
      this.exitRegistration();
    }
  }

  // Getters puramente de presentacion pa la barra de progreso/contador del
  // header prototype. No tocan signUpForm ni validacion.
  public get stepProgressPercent(): number {
    const total = this.getPresentSlidesControls().length;
    if (total <= 1) return 100;
    return (this.currentSlide / (total - 1)) * 100;
  }

  // Reskin del paso sexo: mismo patron click-to-select que steps/activity/
  // training/objetive (selectSteps/selectActivity...), solo pa unificar el
  // control nativo radio bajo option-card en vez de 2 tarjetas lado a lado.
  public selectSex(value: number): void {
    this.signUpForm.get('sex')?.setValue(value);
    this.autoAdvanceAfterSelection('sex', value);
  }

  public selectSteps(stepValue: number): void {
    this.signUpForm.get('steps')?.setValue(stepValue);
    this.autoAdvanceAfterSelection('steps', stepValue);
  }

  public selectActivity(value: number): void {
    this.signUpForm.controls.activity.setValue(value);
    this.autoAdvanceAfterSelection('activity', value);
  }

  public selectTraining(value: number | string): void {
    this.signUpForm.controls.training.setValue(value);
    this.autoAdvanceAfterSelection('training', value);
  }

  // Avanza solo automaticamente en selects de opcion unica cuya pantalla no
  // tiene nada mas que interactuar despues de elegir (objetivo se queda
  // fuera a proposito: debajo tiene el slider de superavit/deficit calorico,
  // avanzar solo se lo saltaria sin que el usuario llegue a verlo). El boton
  // "Siguiente" del footer sigue ahi igual, esto es un atajo, no un
  // reemplazo — por eso la guarda: si el usuario ya le dio a "Siguiente" a
  // mano o cambio de opcion antes de que salte el timer, no hace nada.
  private autoAdvanceAfterSelection(controlName: string, value: unknown): void {
    const slideAtSelection = this.currentSlide;
    setTimeout(() => {
      if (
        this.currentSlide === slideAtSelection &&
        this.signUpForm.get(controlName)?.value === value
      ) {
        this.nextSlide();
      }
    }, 420);
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
    });
  }

  private checkNextAndPrev(): void {
    const swiper: Swiper = this.swiperSignUpRef.nativeElement.swiper;
    const activeIndex = swiper.activeIndex;

    this.currentSlide = activeIndex;
    this.existNext = activeIndex < swiper.slides.length - 1 && !this.codeSended;
    this.existPrev = activeIndex > 0 && !this.codeSended;

    // El scroll vertical vive en .signup-form (por encima del propio
    // swiper, ver sign-up.page.scss), no por-slide — sin esto, si el
    // usuario dejaba una slide alta (p.ej. "Tu actividad diaria") scrolleada
    // hacia abajo, la siguiente slide (aunque fuera corta) aparecia igual
    // de desplazada, cortada por arriba.
    const form = this.swiperSignUpRef.nativeElement.closest('form');
    if (form) form.scrollTop = 0;
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
      ? slides.length - 3
      : slides.length - 2;
    return this.swiper.activeIndex === formIndex;
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

  public exitRegistration(): void {
    this.showExitConfirm();
  }

  public register(): void {
    if (this.signUpForm.invalid) return;
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

  // Cubre tanto tecleo como pegado (paste dispara 'input' igual que teclear):
  // el código solo puede contener dígitos, máximo 6, tanto si el usuario
  // escribe letras como si pega el texto completo del email.
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
    this.userService.resendActivationCode(this.user.email).subscribe({
      next: () => {
        this.pendingEmailVerificationService.markCodeSent(this.user.email);
        this.codeInput.nativeElement.value = '';
        this.startResendCooldown();
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.CODE_RESENT'),
          duration: 3000,
        });
        this.isProcessing = false;
      },
      error: (err) => {
        this.ionicUtilService.showToast({
          message: err?.error?.message || this.translate.instant('SIGN_UP.RESEND_CODE_ERROR'),
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

  public getAge(birth: string) {
    if (!birth) return 0;
    return this.userService.getAge(birth);
  }

  private getDefaultBirthDate(): string {
    if (!this._defaultBirthDate) {
      const defaultBirthDate = this.getTodayDateOnly();
      defaultBirthDate.setFullYear(
        defaultBirthDate.getFullYear() - this.MIN_SIGN_UP_AGE
      );
      this._defaultBirthDate = localIsoDate(defaultBirthDate);
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

  private toDateOnly(value: string): Date | null {
    return parseLocalIsoDate(value);
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

    if (this.signUpForm.invalid) return;
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
