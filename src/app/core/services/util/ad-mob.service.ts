import { Injectable, inject } from '@angular/core';
import {
  AdMob,
  AdOptions,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  AdmobConsentStatus,
} from '@capacitor-community/admob';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { User } from 'src/app/core/models/user';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdMobService {
  // IDs TEMPORALES (Se actualizarán tras el registro en AdMob)
  private readonly ID_ANDROID_INTERSTITIAL =
    'ca-app-pub-7032025540653355/1755796410';
  private readonly ID_IOS_INTERSTITIAL =
    'ca-app-pub-7032025540653355/1755796410';



  private readonly ID_ANDROID_BANNER = 'ca-app-pub-7032025540653355/9207478277';
  private readonly ID_IOS_BANNER = 'ca-app-pub-7032025540653355/9207478277';

  // Inyección de servicios
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly _platform = inject(Platform);

  private initializing: Promise<void>;

  constructor() {
    this.initialize();
    this.manageBannerPosition();
  }

  /**
   * Muestra un anuncio Intersticial
   */
  public async interstitial(): Promise<void> {
    await this.initializing;
    const user: User = this.userService.getLocalUser;
    if (user.personalAds === undefined) await this.consent(user);

    const options: AdOptions = {
      adId: this._platform.is('ios')
        ? this.ID_IOS_INTERSTITIAL
        : this.ID_ANDROID_INTERSTITIAL,
      isTesting: !environment.production,
      npa: !user.personalAds,
    };

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }



  /**
   * Muestra un Banner en una posición específica con un posible margen (ej: sobre los tabs)
   */
  public async showBanner(margin: number = 0): Promise<void> {
    await this.initializing;
    const user: User = this.userService.getLocalUser;
    if (user.personalAds === undefined) await this.consent(user);

    const options: BannerAdOptions = {
      adId: this._platform.is('ios')
        ? this.ID_IOS_BANNER
        : this.ID_ANDROID_BANNER,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: margin,
      isTesting: !environment.production,
      npa: !user.personalAds,
    };

    await AdMob.showBanner(options);
  }

  /**
   * Elimina el banner actual
   */
  public async removeBanner(): Promise<void> {
    await AdMob.removeBanner();
  }

  /**
   * Gestiona la posición del banner basándose en la ruta actual
   */
  private manageBannerPosition(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const user = this.userService.getLocalUser;
        if (!user || user.isPremium) {
          document.body.classList.remove('has-ad-banner', 'has-tabs-ad');
          this.removeBanner();
          return;
        }

        const url = event.urlAfterRedirects;
        const isTargetPage = url.includes('/tabs/summary') || url.includes('/tabs/diets') || url.includes('/tabs/profile');

        if (!isTargetPage) {
          document.body.classList.remove('has-ad-banner', 'has-tabs-ad');
          this.removeBanner();
          return;
        }

        document.body.classList.add('has-ad-banner');
        document.body.classList.add('has-tabs-ad');

        // El plugin de capacitor-admob no refresca el margen de forma fluida si ya está visible,
        // por lo que lo removemos y volvemos a mostrar si cambia el margen.
        this.showBanner(50);
      });

    // Llamada inicial para la ruta actual
    const url = this.router.url;
    const isTargetPage = url.includes('/tabs/summary') || url.includes('/tabs/diets') || url.includes('/tabs/profile');
    const user = this.userService.getLocalUser;

    if (user && !user.isPremium && isTargetPage) {
      document.body.classList.add('has-ad-banner', 'has-tabs-ad');
      this.showBanner(50);
    }
  }

  public initialize(): Promise<void> {
    if (!this.initializing) {
      this.initializing = this.doInitialize();
    }
    return this.initializing;
  }

  private async doInitialize(): Promise<void> {
    await AdMob.initialize();
    const [trackingInfo, consentInfo] = await Promise.all([
      AdMob.trackingAuthorizationStatus(),
      AdMob.requestConsentInfo(),
    ]);
    if (trackingInfo.status === 'notDetermined')
      await AdMob.requestTrackingAuthorization();
    const authorizationStatus = await AdMob.trackingAuthorizationStatus();
    if (
      authorizationStatus.status === 'authorized' &&
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      await AdMob.showConsentForm();
    }
  }

  public async consent(user: User): Promise<void> {
    const consentInfo = await AdMob.requestConsentInfo();
    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      const { status } = await AdMob.showConsentForm();
      user.personalAds = status === AdmobConsentStatus.OBTAINED;
    } else {
      user.personalAds = true;
    }
    this.userService.setLocalUser = user;
  }
}
