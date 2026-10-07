import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, Platform } from '@ionic/angular';
import { Observer } from 'rxjs';
import { User } from 'src/app/core/models/user';
import {
  AUTH_LOGIN_CONNECTION_QUERY_VALUE,
  AUTH_LOGIN_FEEDBACK_QUERY_PARAM,
  AuthErrorService,
  LoginErrorKind,
} from 'src/app/core/services/auth/auth-error.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { GoogleAuthService } from 'src/app/core/services/auth/google-auth.service';
import { AppleAuthService } from 'src/app/core/services/auth/apple-auth.service';
import { PendingEmailVerificationService } from 'src/app/core/services/auth/pending-email-verification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import {
  ColorMode,
  ThemeService,
} from 'src/app/core/services/util/theme.service';
import {
  SOCIAL_NETWORKS,
  SOCIAL_NETWORK_TYPE,
  SOCIAL_NETWORK_TYPES,
  SOCIAL_NETWORK_VALUES,
} from 'src/app/shared/constants/social-network';
import { Theme } from 'src/app/shared/models/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  @ViewChild(IonModal) public loginModal: IonModal;

  public loginForm: FormGroup;
  public user: User;
  public loading: boolean;
  public theme: Theme;
  public showPass: boolean;
  public isLoginModalOpen = false;

  public isApple: boolean;
  public isAndroid: boolean;

  // Este sign-in es compartido literalmente (mismo archivo) entre las 3
  // apps vía path alias — environment.auth.clientFamily es lo único que
  // distingue en qué build se está compilando, ver environment.ts de cada app.
  public readonly isTrainerApp = environment.auth?.clientFamily === 'trainfit-trainers';

  public error: string;
  public loginErrorKind: LoginErrorKind | null;
  public isLoginErrorRetryable: boolean;

  public THEMES = Theme;
  public SOCIAL_NETWORKS = SOCIAL_NETWORKS;
  public SOCIAL_NETWORK_TYPES = SOCIAL_NETWORK_TYPES;
  public SOCIAL_NETWORK_VALUES = SOCIAL_NETWORK_VALUES;

  constructor(
    private _platform: Platform,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
    private navigationService: NavigationService,
    private ionicUtilService: IonicUtilService,
    private authErrorService: AuthErrorService,
    private pendingEmailVerificationService: PendingEmailVerificationService,
    private userService: UserService,
    private _googleAuthService: GoogleAuthService,
    private _appleAuthService: AppleAuthService,
    private translate: TranslateService
  ) {
    this.initVariables();
  }

  public get formControls() {
    return this.loginForm.controls;
  }

  public get loginErrorIcon(): string {
    switch (this.loginErrorKind) {
      case 'invalid-credentials':
        return 'lock-closed-outline';
      case 'network':
      case 'timeout':
        return 'cloud-offline-outline';
      case 'wrong-app-for-role':
        return 'swap-horizontal-outline';
      default:
        return 'alert-circle-outline';
    }
  }

  public ngOnInit(): void {
    this.initForm();
    this.applyNavigationFeedback();
    // Si venimos de un intento de login fallido (p.ej. sesión expirada,
    // fallo de red al reintentar), el error debe verse ya abierto — la
    // pantalla de Bienvenida por defecto lo dejaría oculto dentro del modal.
    if (this.error) {
      this.isLoginModalOpen = true;
    }
  }

  private initVariables(): void {
    this.loading = false;
    this.error = '';
    this.loginErrorKind = null;
    this.isLoginErrorRetryable = false;

    // DETECCIÓN DE PLATAFORMA PARA PRO
    // Android: Solo Google
    // iOS: Google y Apple
    // Web: Google y Apple (opcional, pero habilitado por defecto si no es android)
    this.isAndroid = this._platform.is('android');
    this.isApple =
      this._platform.is('ios') ||
      this._platform.is('iphone') ||
      this._platform.is('ipad');

    this.themeService.theme.subscribe(
      (resTheme: Theme) => (this.theme = resTheme)
    );
  }

  public navigateSocialNetwork(socialNetwork: SOCIAL_NETWORK_TYPE): void {
    window.location.href = socialNetwork.url;
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginForm.valueChanges.subscribe(() => this.clearLoginError());
  }

  public login(): void {
    if (this.loading) {
      return;
    }

    this.clearLoginError();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const observer: Observer<any> = {
      next: () => this.handleLoginCorrect(),
      error: (error) => {
        void this.handleLoginError(error);
      },
      complete: () => (this.loading = false),
    };

    this.authService
      .login(
        this.formControls.email.value.trim().toLowerCase(),
        this.formControls.password.value
      )
      .subscribe(observer);
  }

  /**
   * Sign in con Google
   * Flujo:
   * 1. Obtener token de Google via Capacitor Social Login
   * 2. Enviar al backend para verificar/crear usuario
   * 3. Si usuario ya completó registro → ir a Home
   * 4. Si usuario nuevo o incompleto → ir a SignUp para completar datos
   */
  public async signInWithGoogle(): Promise<void> {
    if (this.loading) {
      return;
    }

    try {
      this.clearLoginError();
      this.loading = true;

      // 1. Obtener credenciales de Google
      const googleResponse = await this._googleAuthService.signIn();

      const email = googleResponse?.result?.profile?.email?.toLowerCase();
      const idToken = googleResponse?.result?.idToken;

      if (!email || !idToken) {
        console.warn('[AUTH] google_sign_in_missing_credentials');
        this.ionicUtilService.showErrorToast(
          this.translate.instant('SIGN_IN.GOOGLE_NO_DATA'),
          this.translate.instant('SIGN_IN.GOOGLE_LOGIN_ERROR'),
          2500
        );
        this.loading = false;
        return;
      }

      // 2. Verificar con el backend (verifica token y devuelve/crea usuario)
      // Si el usuario no existe → backend devuelve 404 → handleSocialError redirige al registro
      this.authService.verifyGoogle(email, idToken).subscribe({
        next: (response) => this.handleSocialSuccess(response, 'Google'),
        error: (error) => this.handleSocialError(error, email, 'Google', idToken),
      });
    } catch (error: any) {
      // Este catch solo captura errores del plugin nativo de Google (no errores HTTP)
      console.warn('[AUTH] google_sign_in_plugin_failed', {
        reason: error?.code || error?.message || 'unknown',
      });
      // No mostrar toast si el usuario canceló (error de cancelación)
      const isCancelled =
        error?.message?.toLowerCase().includes('cancel') ||
        error?.code === '12501';
      if (!isCancelled) {
        this.ionicUtilService.showErrorToast(
          this.translate.instant('SIGN_IN.GOOGLE_CONNECT_ERROR'),
          this.translate.instant('SIGN_IN.GOOGLE_LOGIN_ERROR'),
          2500
        );
      }
      this.loading = false;
    }
  }

  public async signInWithApple(): Promise<void> {
    if (this.loading) {
      return;
    }

    try {
      this.clearLoginError();
      this.loading = true;

      const appleResponse = await this._appleAuthService.signIn();

      const idToken = appleResponse?.result?.idToken;

      let email = appleResponse?.result?.profile?.email
        ? appleResponse.result.profile.email.toLowerCase()
        : null;

      if (!email && idToken) {
        try {
          const decodedToken = this.authService.getDecodedUser({
            access_token: idToken,
          });
          if (decodedToken && decodedToken.email) {
            email = decodedToken.email.toLowerCase();
          }
        } catch (e) {
          console.warn('[AUTH] apple_token_email_decode_failed');
        }
      }

      if (!idToken) {
        this.loading = false;
        this.ionicUtilService.showErrorToast(
          this.translate.instant('SIGN_IN.APPLE_NO_TOKEN'),
          this.translate.instant('SIGN_IN.APPLE_LOGIN_ERROR'),
          2500
        );
        return;
      }

      this.authService.verifyApple(email, idToken).subscribe({
        next: (response) => this.handleSocialSuccess(response, 'Apple'),
        error: (error) =>
          this.handleSocialError(error, email, 'Apple', idToken),
      });
    } catch (error: any) {
      if (!error.status && !error.message?.includes('Usuario no encontrado')) {
        console.warn('[AUTH] apple_sign_in_plugin_failed', {
          reason: error?.code || error?.message || 'unknown',
        });
        this.ionicUtilService.showErrorToast(
          this.translate.instant('SIGN_IN.APPLE_CONNECT_ERROR'),
          this.translate.instant('SIGN_IN.APPLE_LOGIN_ERROR'),
          2500
        );
      }
      this.loading = false;
    }
  }

  /**
   * Maneja respuesta exitosa de social auth (Google/Apple)
   */
  private handleSocialSuccess(response: any, provider: string): void {
    this.authService.applyAuthResponse(response).subscribe({
      next: () => {
        this.userService.setLocalUser = response.user;

        if (this.isUserRegistrationComplete(response.user)) {
          const colorMode: ColorMode = response.user.theme || 'dark';
          this.themeService.toggleColorMode(colorMode);
          this.navigationService.goToUserLoader(this.getReturnUrl());
        } else {
          this.navigationService.goToSignUp();
        }
        this.loading = false;
      },
      error: (error) => {
        this.ionicUtilService.showErrorToast(
          error,
          this.translate.instant('SIGN_IN.LOGIN_ERROR_WITH_PROVIDER', { provider }),
          2500
        );
        this.loading = false;
      },
    });
  }

  private handleSocialError(
    error: any,
    email: string | null,
    provider: string,
    socialToken?: string
  ): void {
    const feedback = this.authErrorService.toLoginFeedback(error);
    const status = feedback.status;

    const message = (
      error?.error?.message ||
      error?.message ||
      error?.statusMessage ||
      ''
    ).toLowerCase();

    const isNotFound =
      status === 404 ||
      message.includes('no encontrado') ||
      message.includes('not found') ||
      message.includes('usuario no encontrado');

    if (isNotFound) {
      this.createNewSocialUser(email, provider, socialToken);
    } else {
      console.warn('[AUTH] social_sign_in_failed', {
        provider,
        status,
        kind: feedback.kind,
      });
      this.ionicUtilService.showErrorToast(
        this.getSocialAuthMessage(feedback, provider),
        this.translate.instant('SIGN_IN.LOGIN_ERROR_WITH_PROVIDER', { provider }),
        2500
      );
      this.loading = false;
    }
  }

  private getSocialAuthMessage(
    feedback: { kind: LoginErrorKind; message: string },
    provider: string
  ): string {
    if (['network', 'timeout', 'server', 'storage'].includes(feedback.kind)) {
      return feedback.message;
    }

    return this.translate.instant('SIGN_IN.SOCIAL_AUTH_RETRY', { provider });
  }

  /**
   * Crea un nuevo usuario social (Google/Apple)
   */
  private async createNewSocialUser(
    email: string | null,
    provider: string,
    socialToken?: string
  ): Promise<void> {
    // Si es Apple y no tenemos email, hay que pedirlo
    if (provider === 'Apple' && !email) {
      await this.askForEmailAndCreateAppleUser(socialToken!);
      return;
    }

    if (!socialToken) {
      this.ionicUtilService.showErrorToast(
        this.translate.instant('SIGN_IN.REGISTER_ERROR_WITH_PROVIDER', { provider }),
        this.translate.instant('SIGN_IN.CREATE_ACCOUNT_ERROR_WITH_PROVIDER', { provider }),
        2500
      );
      this.loading = false;
      return;
    }

    const createObs =
      provider === 'Google'
        ? this.userService.createGoogleUser(
            { email } as User,
            new Date(),
            socialToken
          )
        : this.userService.createAppleUser(
            { email } as User,
            new Date(),
            socialToken
          );

    createObs.subscribe({
      next: (response) => {
        this.authService.applyAuthResponse(response).subscribe({
          next: () => {
            this.userService.setLocalUser = response.user;
            this.navigationService.goToSignUp();
            this.loading = false;
          },
          error: (error) => {
            this.ionicUtilService.showErrorToast(
              error,
              this.translate.instant('SIGN_IN.CREATE_ACCOUNT_ERROR_WITH_PROVIDER', { provider }),
              2500
            );
            this.loading = false;
          },
        });
      },
      error: (error) => {
        console.warn('[AUTH] social_user_creation_failed', {
          provider,
          status: error?.status,
        });
        this.ionicUtilService.showErrorToast(
          error,
          this.translate.instant('SIGN_IN.CREATE_ACCOUNT_ERROR_WITH_PROVIDER', { provider }),
          2500
        );
        this.loading = false;
      },
    });
  }

  /**
   * Pide el email al usuario cuando Apple no lo proporciona (sucede en re-intentos de registro)
   */
  private async askForEmailAndCreateAppleUser(
    tokenApple: string
  ): Promise<void> {
    this.loading = false;
  }

  /**
   * Verifica si el usuario completó todos los datos de registro
   * Un usuario de Google recién creado solo tiene: _id, email, roles, refreshToken, __v
   * Un usuario completo tiene: name, lastname, weight, height, etc.
   */
  private isUserRegistrationComplete(user: User): boolean {
    return !!(user?.name && user?.lastname && user?.weight && user?.height);
  }

  private handleLoginCorrect(): void {
    this.clearLoginError();

    this.userService
      .getUserByEmail(this.formControls.email.value.toLowerCase())
      .subscribe({
        next: async (resUser) => {
          this.userService.setLocalUser = resUser;
          const colorMode: ColorMode = resUser.theme;
          this.themeService.toggleColorMode(colorMode);
          // Mismo motivo que goToRestorePass/navigateSignUp: hay que esperar
          // el dismiss() real del modal antes de navegar, si no se queda
          // "vivo" superpuesto encima de la pantalla de carga.
          await this.loginModal?.dismiss();
          this.navigationService.goToUserLoader(this.getReturnUrl());
        },
        error: (error) => {
          const feedback = this.authErrorService.toLoginFeedback(error);
          this.setLoginFeedback({
            ...feedback,
            message:
              feedback.kind === 'network' || feedback.kind === 'timeout'
                ? feedback.message
                : this.translate.instant('SIGN_IN.UNEXPECTED_ERROR'),
          });
          this.loading = false;
        },
      });
  }

  private handleLoginError(error: any): void {
    this.loading = false;
    const feedback = this.authErrorService.toLoginFeedback(error);

    // Detectar si el usuario no ha verificado su cuenta (error 403)
    if (feedback.kind === 'account-not-verified') {
      const email = this.formControls.email.value;
      this.pendingEmailVerificationService.markCodeSent(email);
      const extras = {
        state: {
          data: { verifyEmailOnly: true, email: email, fromSignIn: true },
        },
      };

      this.ionicUtilService.showToast({
        message: feedback.message,
        duration: 3000,
        color: 'warning',
        icon: 'mail-unread-outline',
      });

      this.navigationService.goToSignUp(extras);
      return;
    }

    console.warn('[AUTH] sign_in_failed', {
      kind: feedback.kind,
      status: feedback.status,
      retryable: feedback.retryable,
    });
    this.setLoginFeedback(feedback);
  }

  private setLoginFeedback(feedback: {
    kind: LoginErrorKind;
    message: string;
    retryable: boolean;
  }): void {
    this.error = feedback.message;
    this.loginErrorKind = feedback.kind;
    this.isLoginErrorRetryable = feedback.retryable;
  }

  private clearLoginError(): void {
    if (!this.error && !this.loginErrorKind) {
      return;
    }

    this.error = '';
    this.loginErrorKind = null;
    this.isLoginErrorRetryable = false;
    this.loginForm?.setErrors(null);
  }

  private applyNavigationFeedback(): void {
    if (this.applyQueryParamFeedback()) {
      return;
    }

    const state = this.navigationService.getState<{
      loginErrorKind?: LoginErrorKind;
      loginErrorMessage?: string;
      loginErrorRetryable?: boolean;
    }>();

    if (this.applyFeedbackState(state)) {
      this.navigationService.clearStateKeys([
        'loginErrorKind',
        'loginErrorMessage',
        'loginErrorRetryable',
      ]);
    }
  }

  // TASK-010 — reenvía el returnUrl capturado por auth.guard.ts (si lo hay)
  // hacia user-loader.page.ts, que es quien decide a dónde navegar una vez
  // termina de precargar los datos del usuario.
  private getReturnUrl(): string | null {
    return this.route.snapshot.queryParamMap.get('returnUrl');
  }

  private applyQueryParamFeedback(): boolean {
    const issue = this.route.snapshot.queryParamMap.get(
      AUTH_LOGIN_FEEDBACK_QUERY_PARAM
    );

    if (issue !== AUTH_LOGIN_CONNECTION_QUERY_VALUE) {
      return false;
    }

    this.setLoginFeedback(this.authErrorService.toLoginFeedback({ status: 0 }));
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [AUTH_LOGIN_FEEDBACK_QUERY_PARAM]: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    return true;
  }

  private applyFeedbackState(state?: {
    loginErrorKind?: LoginErrorKind;
    loginErrorMessage?: string;
    loginErrorRetryable?: boolean;
  } | null): boolean {
    if (!state?.loginErrorMessage || !state?.loginErrorKind) {
      return false;
    }

    this.setLoginFeedback({
      kind: state.loginErrorKind,
      message: state.loginErrorMessage,
      retryable: state.loginErrorRetryable ?? true,
    });
    return true;
  }

  public async goToRestorePass(): Promise<void> {
    // Con isOpen=false a secas, si la navegacion se dispara en el mismo
    // tick la pagina de sign-in pasa a estar inactiva antes de que Ionic
    // termine de animar el cierre (ion-router-outlet mantiene la pagina
    // saliente montada) y el modal se queda "vivo" superpuesto encima de
    // la siguiente pantalla. Esperar el dismiss() real evita eso.
    await this.loginModal?.dismiss();
    this.navigationService.goToRestorePasswordPage();
  }

  public async navigateSignUp(): Promise<void> {
    await this.loginModal?.dismiss();
    const extras = {
      state: {
        data: { fromSignIn: true },
      },
    };
    this.navigationService.goToSignUp(extras);
  }

  public openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  public closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }
}
