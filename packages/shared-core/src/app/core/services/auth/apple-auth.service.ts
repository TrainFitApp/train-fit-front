import { Injectable } from '@angular/core';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AppleAuthService {
  private initialized = false;

  constructor(private _platform: Platform) {
    // Inicialización bajo demanda en signIn
  }

  private async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const config: any = {
        apple: {
          clientId: 'com.trainfit.trainfit',
        },
        google: {
          webClientId: '775987417074-s1e767h7tps05ectmrb85uqh7hhp9p8n.apps.googleusercontent.com',
        },
      };

      if (this._platform.is('ios')) {
        config.google.iOSClientId = '775987417074-ibu27rm1ku8uuunaacebmp14ahvuuk4u.apps.googleusercontent.com';
      }

      console.log('Inicializando SocialLogin (AppleService)...');
      await SocialLogin.initialize(config);
      this.initialized = true;
    } catch (error) {
      console.error('Error inicializando Apple Auth:', error);
    }
  }

  public async signIn(): Promise<any> {
    if (!this.initialized) {
      await this.initialize();
    }
    return await SocialLogin.login({
      provider: 'apple',
      options: {
        scopes: ['email', 'fullName'],
      },
    });
  }
}
