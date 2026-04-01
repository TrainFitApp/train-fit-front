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

export type InterstitialPlacement =
  | 'default'
  | 'start_statistics'
  | 'start_workout'
  | 'save_nutrition'
  | 'create_routine'
  | 'create_product'
  | 'create_exercise'
  | 'create_recipe'
  | 'acquire_routine'
  | 'profile_start';

@Injectable()
export class AdMobService {
  private readonly ID_ANDROID_INTERSTITIAL_DEFAULT =
    'ca-app-pub-7032025540653355/1755796410';
  private readonly ID_IOS_INTERSTITIAL_DEFAULT =
    'ca-app-pub-7032025540653355/1755796410';

  private readonly ID_ANDROID_BANNER = 'ca-app-pub-7032025540653355/9490763271';
  private readonly ID_IOS_BANNER = 'ca-app-pub-7032025540653355/3590300413';

  private readonly INTERSTITIAL_ANDROID: Record<
    Exclude<InterstitialPlacement, 'default'>,
    string
  > = {
    start_statistics: 'ca-app-pub-7032025540653355/9245951775',
    start_workout: 'ca-app-pub-7032025540653355/4185196788',
    save_nutrition: 'ca-app-pub-7032025540653355/6811360120',
    create_routine: 'ca-app-pub-7032025540653355/8253703220',
    create_product: 'ca-app-pub-7032025540653355/9577124267',
    create_exercise: 'ca-app-pub-7032025540653355/1935706881',
    create_recipe: 'ca-app-pub-7032025540653355/1879866567',
    acquire_routine: 'ca-app-pub-7032025540653355/9629095154',
    profile_start: 'ca-app-pub-7032025540653355/4314458216',
  };

  private readonly INTERSTITIAL_IOS: Record<
    Exclude<InterstitialPlacement, 'default'>,
    string
  > = {
    start_statistics: 'ca-app-pub-7032025540653355/2193458263',
    start_workout: 'ca-app-pub-7032025540653355/4085124438',
    save_nutrition: 'ca-app-pub-7032025540653355/7337973738',
    create_routine: 'ca-app-pub-7032025540653355/7832797754',
    create_product: 'ca-app-pub-7032025540653355/9768695959',
    create_exercise: 'ca-app-pub-7032025540653355/8699156867',
    create_recipe: 'ca-app-pub-7032025540653355/4753441916',
    acquire_routine: 'ca-app-pub-7032025540653355/2238959219',
    profile_start: 'ca-app-pub-7032025540653355/5874037227',
  };

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
  public async interstitial(
    placement: InterstitialPlacement = 'default'
  ): Promise<void> {
    await this.initializing;
    const user: User = this.userService.getLocalUser;
    if (user.personalAds === undefined) await this.consent(user);
    const adId = this.getInterstitialAdId(placement);

    const options: AdOptions = {
      adId,
      isTesting: !environment.production,
      npa: !user.personalAds,
    };

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }

  /**
   * Alias legacy para no romper llamadas existentes tras migración.
   */
  public async interstitialCapgo(): Promise<void> {
    await this.interstitial();
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
        const isTargetPage =
          url.includes('/tabs/summary') ||
          url.includes('/tabs/diets') ||
          url.includes('/tabs/profile');

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
    const isTargetPage =
      url.includes('/tabs/summary') ||
      url.includes('/tabs/diets') ||
      url.includes('/tabs/profile');
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

  private getInterstitialAdId(placement: InterstitialPlacement): string {
    if (placement === 'default') {
      return this._platform.is('ios')
        ? this.ID_IOS_INTERSTITIAL_DEFAULT
        : this.ID_ANDROID_INTERSTITIAL_DEFAULT;
    }

    return this._platform.is('ios')
      ? this.INTERSTITIAL_IOS[placement]
      : this.INTERSTITIAL_ANDROID[placement];
  }
}
