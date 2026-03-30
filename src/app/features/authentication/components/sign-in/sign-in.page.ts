import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { Observer } from 'rxjs';
import { Token } from 'src/app/core/models/token';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { GoogleAuthService } from 'src/app/core/services/auth/google-auth.service';
import { AppleAuthService } from 'src/app/core/services/auth/apple-auth.service';
import { UserLocalstorageService } from 'src/app/core/services/user/user-localstorage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
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

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public loginForm: FormGroup;
  public user: User;
  public loading: boolean;
  public theme: Theme;
  public showPass: boolean;
  public showLogo: boolean;
  public hasFormFocus: boolean;

  public isApple: boolean;
  public isAndroid: boolean;

  public error: string;
  private logoSyncTimeoutId?: ReturnType<typeof setTimeout>;

  public THEMES = Theme;
  public SOCIAL_NETWORKS = SOCIAL_NETWORKS;
  public SOCIAL_NETWORK_TYPES = SOCIAL_NETWORK_TYPES;
  public SOCIAL_NETWORK_VALUES = SOCIAL_NETWORK_VALUES;

  constructor(
    private _platform: Platform,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private themeService: ThemeService,
    private navigationService: NavigationService,
    private ionicUtilService: IonicUtilService,
    private userService: UserService,
    private _googleAuthService: GoogleAuthService,
    private _appleAuthService: AppleAuthService,
    private _userLocalStorageService: UserLocalstorageService
  ) {
    this.initVariables();
  }

  public get formControls() {
    return this.loginForm.controls;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ionViewWillLeave(): void {
    this.hasFormFocus = false;
    this.syncLogoVisibility();
    if (this.logoSyncTimeoutId) {
      clearTimeout(this.logoSyncTimeoutId);
      this.logoSyncTimeoutId = undefined;
    }
  }

  private initVariables(): void {
    this.loading = false;
    this.error = '';
    this.showLogo = true;
    this.hasFormFocus = false;

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
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    this.loading = true;
    const observer: Observer<any> = {
      next: () => this.handleLoginCorrect(),
      error: (error) => {
        this.handleLoginError(error);
        this.loading = undefined;
      },
      complete: () => (this.loading = undefined),
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
    try {
      this.loading = true;

      // 1. Obtener credenciales de Google
      const googleResponse = await this._googleAuthService.signIn();
      console.log('Google sign-in response:', googleResponse);

      const email = googleResponse?.result?.profile?.email?.toLowerCase();
      const idToken = googleResponse?.result?.idToken;

      if (!email || !idToken) {
        console.error('Google no retornó email o token válido', {
          email,
          idToken,
        });
        this.ionicUtilService.showErrorToast(
          'No se pudo obtener datos de tu cuenta Google',
          'Error al iniciar sesión con Google',
          2500
        );
        this.loading = false;
        return;
      }

      // 2. Verificar con el backend (verifica token y devuelve/crea usuario)
      // Si el usuario no existe → backend devuelve 404 → handleSocialError redirige al registro
      console.log(`[Google] Verificando usuario con email: ${email}`);
      this.authService.verifyGoogle(email, idToken).subscribe({
        next: (response) => this.handleSocialSuccess(response, 'Google'),
        error: (error) => this.handleSocialError(error, email, 'Google'),
      });
    } catch (error: any) {
      // Este catch solo captura errores del plugin nativo de Google (no errores HTTP)
      console.error('Error en el plugin de Google Sign In:', error);
      // No mostrar toast si el usuario canceló (error de cancelación)
      const isCancelled =
        error?.message?.toLowerCase().includes('cancel') ||
        error?.code === '12501'; // Google Sign-In cancelled
      if (!isCancelled) {
        this.ionicUtilService.showErrorToast(
          'Error al conectar con Google',
          'Error al iniciar sesión con Google',
          2500
        );
      }
      this.loading = false;
    }
  }

  /**
   * Sign in con Apple
   */
  public async signInWithApple(): Promise<void> {
    try {
      this.loading = true;

      // 1. Obtener credenciales de Apple
      const appleResponse = await this._appleAuthService.signIn();
      console.log('Respuesta de Apple:', appleResponse);

      const idToken = appleResponse?.result?.idToken;

      let email = appleResponse?.result?.profile?.email
        ? appleResponse.result.profile.email.toLowerCase()
        : null;

      // Fallback: Intentar obtener email del idToken si no viene en el profile
      if (!email && idToken) {
        try {
          const decodedToken = this.authService.getDecodedUser({
            access_token: idToken,
          });
          if (decodedToken && decodedToken.email) {
            email = decodedToken.email.toLowerCase();
            console.log('Email extraído del idToken:', email);
          }
        } catch (e) {
          console.error('Error decodificando idToken de Apple:', e);
        }
      }

      console.log('Email final para procesar:', email);

      if (!idToken) {
        this.loading = false;
        this.ionicUtilService.showErrorToast(
          'No se pudo obtener token de Apple',
          'Error al iniciar sesión con Apple',
          2500
        );
        return;
      }

      // 2. Verificar con el backend
      this.authService.verifyApple(email, idToken).subscribe({
        next: (response) => this.handleSocialSuccess(response, 'Apple'),
        error: (error) =>
          this.handleSocialError(error, email, 'Apple', idToken),
      });
    } catch (error: any) {
      // Solo capturar errores no HTTP (como problemas con el plugin de Apple)
      if (!error.status && !error.message?.includes('Usuario no encontrado')) {
        console.error('Error en Apple Sign In:', error);
        this.ionicUtilService.showErrorToast(
          'Error al conectar con Apple',
          'Error al iniciar sesión con Apple',
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
    // Guardar token y usuario
    const token: Token = { access_token: response.access_token };
    this._userLocalStorageService.setUserToken(token);

    const userDecoded = this.authService.getDecodedUser(token);
    this.authService.setUser = userDecoded;
    this.userService.setLocalUser = response.user;

    // Verificar si el usuario completó el registro
    if (this.isUserRegistrationComplete(response.user)) {
      // Usuario existente con registro completo → ir a Home
      const colorMode: ColorMode = response.user.theme || 'dark';
      this.themeService.toggleColorMode(colorMode);
      this.navigationService.goToUserLoader();
    } else {
      // Usuario nuevo o incompleto → completar registro
      this.navigationService.goToSignUp();
    }
    this.loading = false;
  }

  /**
   * Maneja error de social auth (usuario no existe)
   * Detecta el 404 de múltiples formas para mayor robustez
   */
  private handleSocialError(
    error: any,
    email: string | null,
    provider: string,
    tokenApple?: string
  ): void {
    console.log(
      `[${provider}] handleSocialError raw error:`,
      JSON.stringify(error)
    );

    // Estrategia multi-capa para detectar "usuario no encontrado"
    // El HttpErrorResponse de Angular puede llegar transformado de varias formas
    const status =
      error?.status ||
      error?.error?.status ||
      error?.statusCode ||
      error?.originalError?.status;

    // Buscar el mensaje en todas las capas posibles del error
    const message = (
      error?.error?.message ||
      error?.message ||
      error?.statusMessage ||
      ''
    ).toLowerCase();

    // El backend devuelve { message: 'Usuario no encontrado' } con status 404
    const isNotFound =
      status === 404 ||
      status === '404' ||
      message.includes('no encontrado') ||
      message.includes('not found') ||
      message.includes('usuario no encontrado');

    console.log(
      `[${provider}] isNotFound: ${isNotFound}, status: ${status}, message: ${message}`
    );

    if (isNotFound) {
      this.createNewSocialUser(email, provider, tokenApple);
    } else {
      console.error(`Error en verificación ${provider}:`, error);
      this.ionicUtilService.showErrorToast(
        error,
        `Error al iniciar sesión con ${provider}`,
        2500
      );
      this.loading = false;
    }
  }

  /**
   * Crea un nuevo usuario social (Google/Apple)
   */
  private async createNewSocialUser(
    email: string | null,
    provider: string,
    tokenApple?: string
  ): Promise<void> {
    // Si es Apple y no tenemos email, hay que pedirlo
    if (provider === 'Apple' && !email) {
      await this.askForEmailAndCreateAppleUser(tokenApple!);
      return;
    }

    if (provider === 'Apple' && !tokenApple) {
      this.ionicUtilService.showErrorToast(
        'No se pudo completar el registro con Apple',
        'Error al crear cuenta con Apple',
        2500
      );
      this.loading = false;
      return;
    }

    const createObs =
      provider === 'Google'
        ? this.userService.createGoogleUser({ email } as User, new Date())
        : this.userService.createAppleUser(
            { email } as User,
            new Date(),
            tokenApple
          );

    createObs.subscribe({
      next: (response) => {
        // Guardar token y usuario
        const token: Token = { access_token: response.access_token };
        this._userLocalStorageService.setUserToken(token);

        const userDecoded = this.authService.getDecodedUser(token);
        this.authService.setUser = userDecoded;
        this.userService.setLocalUser = response.user;

        // Usuario nuevo → completar registro
        this.navigationService.goToSignUp();
        this.loading = false;
      },
      error: (error) => {
        console.error(`Error creando usuario ${provider}:`, error);
        this.ionicUtilService.showErrorToast(
          error,
          `Error al crear cuenta con ${provider}`,
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
    const alert = await this.ionicUtilService.showAlert({
      header: 'Email requerido',
      message:
        'Apple no ha proporcionado tu correo. Por favor, introdúcelo para completar tu registro.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'tu@email.com',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Continuar',
          handler: (data) => {
            if (data.email && data.email.includes('@')) {
              this.loading = true;
              this.executeCreateAppleUser(data.email.toLowerCase(), tokenApple);
            } else {
              this.ionicUtilService.showErrorToast(
                'Por favor, introduce un email válido'
              );
              return false;
            }
          },
        },
      ],
    });
  }

  private executeCreateAppleUser(email: string, tokenApple: string): void {
    this.userService
      .createAppleUser({ email } as User, new Date(), tokenApple)
      .subscribe({
        next: (response) => {
          const token: Token = { access_token: response.access_token };
          this._userLocalStorageService.setUserToken(token);
          const userDecoded = this.authService.getDecodedUser(token);
          this.authService.setUser = userDecoded;
          this.userService.setLocalUser = response.user;
          this.navigationService.goToSignUp();
          this.loading = false;
        },
        error: (error) => {
          console.error(`Error creando usuario Apple:`, error);
          this.ionicUtilService.showErrorToast(
            error,
            'Error al crear cuenta con Apple'
          );
          this.loading = false;
        },
      });
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
    this.loginForm.setErrors(null);

    this.userService
      .getUserByEmail(this.formControls.email.value.toLowerCase())
      .subscribe((resUser) => {
        this.userService.setLocalUser = resUser;
        const colorMode: ColorMode = resUser.theme;
        this.themeService.toggleColorMode(colorMode);
        this.navigationService.goToUserLoader();
      });
  }

  private async handleLoginError(error: any): Promise<void> {
    this.loading = false;

    // Detectar si el usuario no ha verificado su cuenta (error 403)
    const errorCode = error?.error?.error || error?.error;
    if (error?.status === 403 || errorCode === 'ACCOUNT_NOT_VERIFIED') {
      const email =
        error?.email || error?.error?.email || this.formControls.email.value;
      const extras = {
        state: {
          data: { verifyEmailOnly: true, email: email, fromSignIn: true }, // fromSignIn para asegurar el flujo tradicional
        },
      };

      this.ionicUtilService.showToast({
        message: error?.message || 'Cuenta no verificada. Revisa tu correo.',
        duration: 3000,
        color: 'warning',
      });

      this.navigationService.goToSignUp(extras);
      return;
    }

    this.loginForm.setErrors({
      invalidCredentials: true,
    });

    // Mostrar el mensaje de error del backend
    await this.ionicUtilService.showErrorToast(
      error,
      'Usuario o contraseña incorrectos',
      2500
    );
  }

  private showMailNotVerifiedNotification(error): void {
    const alertOptions = {
      header: 'Advertencia',
      message: error.message,
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public goToRestorePass(): void {
    this.navigationService.goToRestorePasswordPage();
  }

  public navigateSignUp(): void {
    const extras = {
      state: {
        data: { fromSignIn: true },
      },
    };
    this.navigationService.goToSignUp(extras);
  }

  public onFormFocusIn(): void {
    this.hasFormFocus = true;
    // En iOS, esconder instantáneamente con *ngIf al ganar foco puede cortar
    // la apertura del teclado; retrasamos mínimamente el update.
    this.syncLogoVisibility(90);
  }

  public onFormFocusOut(): void {
    setTimeout(() => {
      const active = document.activeElement as HTMLElement | null;
      const stillInsideForm = !!active?.closest?.('.login-form');
      this.hasFormFocus = stillInsideForm;
      this.syncLogoVisibility();
    }, 0);
  }

  private syncLogoVisibility(delayMs: number = 0): void {
    if (this.logoSyncTimeoutId) {
      clearTimeout(this.logoSyncTimeoutId);
      this.logoSyncTimeoutId = undefined;
    }

    const apply = () => {
      this.showLogo = !this.hasFormFocus;
      try {
        this.cdr.detectChanges();
      } catch {}
    };

    if (delayMs > 0) {
      this.logoSyncTimeoutId = setTimeout(apply, delayMs);
      return;
    }

    apply();
  }
}
