import { Injectable } from '@angular/core';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { Platform } from '@ionic/angular';

@Injectable()
export class GoogleAuthService {
  private WEB_CLIENT_ID =
    '775987417074-s1e767h7tps05ectmrb85uqh7hhp9p8n.apps.googleusercontent.com';
  private IOS_CLIENT_ID =
    '775987417074-ibu27rm1ku8uuunaacebmp14ahvuuk4u.apps.googleusercontent.com';
  private initialized = false;

  constructor(private _platform: Platform) {
    // No inicializamos automáticamente en el constructor para evitar carreras
    // La inicialización se hará bajo demanda en el signIn
  }

  private async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const config: any = {
        google: {
          webClientId: this.WEB_CLIENT_ID,
        },
      };

      if (this._platform.is('ios')) {
        config.google.iOSClientId = this.IOS_CLIENT_ID;
        config.apple = {
          clientId: 'com.trainfit.trainfit',
        };
      }

      console.log('Inicializando SocialLogin con config:', config);
      await SocialLogin.initialize(config);
      this.initialized = true;
    } catch (error) {
      console.error('Error inicializando Google Auth:', error);
    }
  }

  public async signIn(): Promise<any> {
    if (!this.initialized) {
      await this.initialize();
    }
    console.log('Ejecutando SocialLogin.login para google...');

    try {
      // Intentar logout previo para forzar el selector de cuentas
      await SocialLogin.logout({ provider: 'google' });
    } catch (e) {
      // Ignoramos error si no estaba logueado
      console.log('No había sesión previa de Google para cerrar o error en logout', e);
    }

    const response = await SocialLogin.login({
      provider: 'google',
      options: {},
    });
    console.log('Respuesta de SocialLogin.login google:', response);
    return response;
  }
}
