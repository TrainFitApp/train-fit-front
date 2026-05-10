import { Injectable, inject } from '@angular/core';
import {
  AdMob,
  AdOptions,
  AdMobBannerSize,
  BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
  AdmobConsentStatus,
} from '@capacitor-community/admob';
import { App as CapacitorApp } from '@capacitor/app';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { User } from 'src/app/core/models/user';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { BillingService } from '../billing/billing.service';

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
  private readonly ID_ANDROID_BANNER_CURRENT_WORKOUT =
    'ca-app-pub-7032025540653355/7435718641';
  private readonly ID_IOS_BANNER_CURRENT_WORKOUT =
    'ca-app-pub-7032025540653355/6290157939';

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
  private readonly billingService = inject(BillingService);
  private readonly router = inject(Router);
  private readonly _platform = inject(Platform);

  private initializing: Promise<void>;
  private bannerVisible = false;
  private onBannerTabRoute = false;
  private bannerRequestId = 0;
  private currentBannerKey: 'tabs' | 'current-workout' | null = null;
  private currentBannerAdId: string | null = null;
  private readonly BANNER_FALLBACK_HEIGHT = 50;
  private readonly TABS_FALLBACK_HEIGHT = 50;
  private readonly BANNER_GAP = 8;
  private bannerHeight = this.BANNER_FALLBACK_HEIGHT;
  private tabsHeight = this.TABS_FALLBACK_HEIGHT;
  private lastBannerMargin: number | null = null;
  private resizeRefreshTimer?: ReturnType<typeof setTimeout>;
  private keyboardVisible = false;
  private keyboardListeners: PluginListenerHandle[] = [];
  private activeOverlayCount = 0;
  private profileStartInFlight = false;
  private lastProfileStartAt = 0;

  constructor() {
    this.initialize();
    this.initKeyboardBannerBehavior();
    this.initOverlayBannerBehavior();
    this.initBannerSizeBehavior();
    this.initViewportBannerBehavior();
    this.initAppStateBannerBehavior();
    this.manageBannerPosition();
  }

  /**
   * Muestra un anuncio Intersticial
   */
  public async interstitial(
    placement: InterstitialPlacement = 'default'
  ): Promise<void> {
    if (placement === 'profile_start') {
      const now = Date.now();
      if (this.profileStartInFlight) {
        return;
      }
      // Guard anti-doble disparo en arranque/redirecciones rápidas
      if (now - this.lastProfileStartAt < 10000) {
        return;
      }
      this.profileStartInFlight = true;
      this.lastProfileStartAt = now;
    }

    await this.initializing;
    const user: User = this.userService.getLocalUser;
    if (!this.shouldShowAds(user)) {
      return;
    }
    if (user.personalAds === undefined) await this.consent(user);
    const adId = this.getInterstitialAdId(placement);

    const options: AdOptions = {
      adId,
      isTesting: !environment.production,
      npa: !user.personalAds,
    };

    try {
      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
    } finally {
      if (placement === 'profile_start') {
        this.profileStartInFlight = false;
      }
    }
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
  public async showBanner(
    margin: number = 0,
    adIdOverride?: string
  ): Promise<void> {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    await this.initializing;
    const user: User = this.userService.getLocalUser;
    if (user.personalAds === undefined) await this.consent(user);

    const options: BannerAdOptions = {
      adId:
        adIdOverride ||
        (this._platform.is('ios')
          ? this.ID_IOS_BANNER
          : this.ID_ANDROID_BANNER),
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: Math.max(0, Math.round(margin)),
      isTesting: !environment.production,
      npa: !user.personalAds,
    };

    await AdMob.showBanner(options);
  }

  /**
   * Elimina el banner actual
   */
  public async removeBanner(): Promise<void> {
    try {
      await AdMob.removeBanner();
    } catch {
      // ignore remove errors when no banner is currently attached
    }
    this.bannerVisible = false;
    this.onBannerTabRoute = false;
    this.currentBannerKey = null;
    this.currentBannerAdId = null;
    this.lastBannerMargin = null;
    this.clearBannerBodyClasses();
  }

  private async removeNativeBannerForReplacement(): Promise<void> {
    try {
      await AdMob.removeBanner();
    } catch {
      // ignore remove errors when no banner is currently attached
    }
    this.bannerVisible = false;
  }

  /**
   * Gestiona la posición del banner basándose en la ruta actual
   */
  private manageBannerPosition(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.refreshBannerForRoute(event.urlAfterRedirects);
      });

    // Llamada inicial para la ruta actual
    this.refreshBannerForRoute(this.router.url);
  }

  private isMainTabsRootRoute(url: string): boolean {
    const path = (url || '').split('?')[0].split('#')[0];
    return (
      path === '/tabs/summary' ||
      path === '/tabs/diets' ||
      path === '/tabs/profile'
    );
  }

  private isCurrentWorkoutRoute(url: string): boolean {
    const path = (url || '').split('?')[0].split('#')[0];
    return path === '/current-workout';
  }

  private getBannerContext(url: string): 'tabs' | 'current-workout' | null {
    if (this.isMainTabsRootRoute(url)) {
      return 'tabs';
    }
    if (this.isCurrentWorkoutRoute(url)) {
      return 'current-workout';
    }
    return null;
  }

  private getBannerAdId(context: 'tabs' | 'current-workout'): string {
    if (context === 'current-workout') {
      return this._platform.is('ios')
        ? this.ID_IOS_BANNER_CURRENT_WORKOUT
        : this.ID_ANDROID_BANNER_CURRENT_WORKOUT;
    }

    return this._platform.is('ios')
      ? this.ID_IOS_BANNER
      : this.ID_ANDROID_BANNER;
  }

  private clearBannerBodyClasses(): void {
    document.body.classList.remove('has-ad-banner', 'has-tabs-ad', 'has-workout-ad');
    document.body.style.removeProperty('--trainfit-ad-banner-height');
    document.body.style.removeProperty('--trainfit-ad-banner-gap');
    document.body.style.removeProperty('--trainfit-tabs-height');
  }

  private applyBannerLayoutVars(): void {
    document.body.style.setProperty(
      '--trainfit-ad-banner-height',
      `${Math.max(this.bannerHeight, this.BANNER_FALLBACK_HEIGHT)}px`
    );
    document.body.style.setProperty('--trainfit-ad-banner-gap', `${this.BANNER_GAP}px`);
    document.body.style.setProperty(
      '--trainfit-tabs-height',
      `${Math.max(this.tabsHeight, this.TABS_FALLBACK_HEIGHT)}px`
    );
  }

  private getTabsHeight(): number {
    try {
      const tabBar = document.querySelector('ion-tab-bar') as HTMLElement | null;
      const height = Math.round(tabBar?.getBoundingClientRect().height || 0);
      return height > 0 ? height : this.TABS_FALLBACK_HEIGHT;
    } catch {
      return this.TABS_FALLBACK_HEIGHT;
    }
  }

  private getCssSafeAreaBottom(): number {
    if (typeof document === 'undefined' || !document.body) {
      return 0;
    }

    const probe = document.createElement('div');
    probe.style.cssText = [
      'position:fixed',
      'left:0',
      'bottom:0',
      'height:0',
      'width:0',
      'visibility:hidden',
      'pointer-events:none',
      'padding-bottom:env(safe-area-inset-bottom)',
    ].join(';');

    try {
      document.body.appendChild(probe);
      const value = Number.parseFloat(getComputedStyle(probe).paddingBottom || '0');
      return Number.isFinite(value) ? Math.round(value) : 0;
    } finally {
      probe.remove();
    }
  }

  private async getBottomInset(): Promise<number> {
    if (!Capacitor.isNativePlatform()) {
      return 0;
    }

    if (Capacitor.getPlatform() === 'android') {
      try {
        const insets = await EdgeToEdge.getInsets();
        const density = window.devicePixelRatio || 1;
        return Math.max(0, Math.round((insets?.bottom || 0) / density));
      } catch {
        return 0;
      }
    }

    if (Capacitor.getPlatform() === 'ios') {
      return this.getCssSafeAreaBottom();
    }

    return 0;
  }

  private async getBannerBottomMargin(
    context: 'tabs' | 'current-workout'
  ): Promise<number> {
    const bottomInset = await this.getBottomInset();
    this.tabsHeight = context === 'tabs' ? this.getTabsHeight() : 0;
    this.applyBannerLayoutVars();

    if (context === 'tabs') {
      return this.tabsHeight + bottomInset + this.BANNER_GAP;
    }

    return bottomInset + this.BANNER_GAP;
  }

  private scheduleBannerRefresh(delay = 120): void {
    if (this.resizeRefreshTimer) {
      clearTimeout(this.resizeRefreshTimer);
    }

    this.resizeRefreshTimer = setTimeout(() => {
      this.refreshBannerForRoute(this.router.url);
    }, delay);
  }

  private initBannerSizeBehavior(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    void AdMob.addListener(
      BannerAdPluginEvents.SizeChanged,
      (info: AdMobBannerSize) => {
        const height = Math.round(Number(info?.height || 0));
        if (height <= 0) {
          return;
        }

        this.bannerHeight = height;
        if (this.currentBannerKey) {
          this.applyBannerLayoutVars();
        }
      }
    ).catch((error) => {
      console.warn('No se pudo registrar el listener de tamano de banner:', error);
    });
  }

  private initViewportBannerBehavior(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const onViewportChange = () => this.scheduleBannerRefresh();
    window.addEventListener('resize', onViewportChange);
    window.addEventListener('orientationchange', onViewportChange);
  }

  private initAppStateBannerBehavior(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    void CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        this.scheduleBannerRefresh();
      }
    }).catch((error) => {
      console.warn('No se pudo registrar el listener de estado de app:', error);
    });
  }

  private refreshBannerForRoute(url: string): void {
    void this.refreshBannerForRouteAsync(url);
  }

  private async refreshBannerForRouteAsync(url: string): Promise<void> {
    const user = this.userService.getLocalUser;
    if (
      !Capacitor.isNativePlatform() ||
      !user ||
      !this.shouldShowAds(user) ||
      this.keyboardVisible ||
      this.activeOverlayCount > 0
    ) {
      this.bannerRequestId++;
      await this.removeBanner();
      return;
    }

    const bannerContext = this.getBannerContext(url);
    if (!bannerContext) {
      this.bannerRequestId++;
      await this.removeBanner();
      return;
    }

    const isTabs = bannerContext === 'tabs';
    const requestId = ++this.bannerRequestId;
    const margin = await this.getBannerBottomMargin(bannerContext);
    const adId = this.getBannerAdId(bannerContext);

    if (requestId !== this.bannerRequestId) {
      return;
    }

    document.body.classList.add('has-ad-banner');
    document.body.classList.toggle('has-tabs-ad', isTabs);
    document.body.classList.toggle('has-workout-ad', !isTabs);
    this.applyBannerLayoutVars();
    this.onBannerTabRoute = isTabs;

    if (
      this.bannerVisible &&
      this.currentBannerKey === bannerContext &&
      this.lastBannerMargin === margin &&
      this.currentBannerAdId === adId
    ) {
      return;
    }

    if (this.bannerVisible) {
      await this.removeNativeBannerForReplacement();
    }

    if (requestId !== this.bannerRequestId) {
      return;
    }

    this.currentBannerKey = bannerContext;
    this.currentBannerAdId = adId;
    this.lastBannerMargin = margin;

    this.showBanner(margin, adId)
      .then(() => {
        if (requestId !== this.bannerRequestId) {
          return;
        }
        this.bannerVisible = true;
      })
      .catch((error) => {
        this.bannerVisible = false;
        if (requestId === this.bannerRequestId) {
          this.currentBannerKey = null;
          this.currentBannerAdId = null;
          this.lastBannerMargin = null;
          this.clearBannerBodyClasses();
        }
        console.error('Error mostrando banner:', error);
      });
  }

  private initKeyboardBannerBehavior(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    void Keyboard.addListener('keyboardWillShow', () => {
      this.keyboardVisible = true;
      this.clearBannerBodyClasses();
      this.bannerRequestId++;
      this.removeBanner();
    }).then((listener) => this.keyboardListeners.push(listener));

    void Keyboard.addListener('keyboardDidHide', () => {
      this.keyboardVisible = false;
      this.refreshBannerForRoute(this.router.url);
    }).then((listener) => this.keyboardListeners.push(listener));
  }

  private initOverlayBannerBehavior(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const onPresent = () => {
      this.activeOverlayCount++;
      this.clearBannerBodyClasses();
      this.bannerRequestId++;
      this.removeBanner();
    };

    const onDismiss = () => {
      this.activeOverlayCount = Math.max(0, this.activeOverlayCount - 1);
      if (this.activeOverlayCount === 0) {
        this.refreshBannerForRoute(this.router.url);
      }
    };

    document.addEventListener('ionAlertWillPresent', onPresent);
    document.addEventListener('ionAlertDidDismiss', onDismiss);
    document.addEventListener('ionModalWillPresent', onPresent);
    document.addEventListener('ionModalDidDismiss', onDismiss);
    document.addEventListener('ionPickerWillPresent', onPresent);
    document.addEventListener('ionPickerDidDismiss', onDismiss);
    document.addEventListener('ionActionSheetWillPresent', onPresent);
    document.addEventListener('ionActionSheetDidDismiss', onDismiss);
    document.addEventListener('ionPopoverWillPresent', onPresent);
    document.addEventListener('ionPopoverDidDismiss', onDismiss);
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

  private shouldShowAds(user: User | null): boolean {
    if (!user) {
      return false;
    }

    const cachedEntitlements = this.billingService.getCachedEntitlements();
    if (typeof cachedEntitlements?.adsEnabled === 'boolean') {
      return cachedEntitlements.adsEnabled;
    }

    return !Boolean(user?.premium?.entitled);
  }
}
