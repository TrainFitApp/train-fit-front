import { Injectable, inject } from '@angular/core';
import {
  AdLoadInfo,
  AdMob,
  AdMobBannerSize,
  AdMobError,
  AdOptions,
  AdmobConsentInfo,
  AdmobConsentStatus,
  BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
  InterstitialAdPluginEvents,
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

type BannerContext = 'tabs' | 'current-workout';
type ActiveBannerRequest = {
  context: BannerContext | 'manual';
  adId: string;
  margin: number;
};
type ActiveInterstitialRequest = {
  placement: InterstitialPlacement;
  adId: string;
};
type AdMobLogLevel = 'debug' | 'info' | 'warn' | 'error';

@Injectable()
export class AdMobService {
  private readonly ID_ANDROID_INTERSTITIAL_DEFAULT =
    'ca-app-pub-7032025540653355/1755796410';
  private readonly ID_IOS_INTERSTITIAL_DEFAULT =
    'ca-app-pub-7032025540653355/5874037227';

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

  private readonly userService = inject(UserService);
  private readonly billingService = inject(BillingService);
  private readonly router = inject(Router);
  private readonly _platform = inject(Platform);

  private readonly useTestAds = !environment.production;
  private readonly diagnosticLoggingEnabled =
    !environment.production || Boolean((environment as any).adMob?.diagnostics);

  private initializing: Promise<void>;
  private canRequestAds = true;
  private bannerVisible = false;
  private onBannerTabRoute = false;
  private bannerRequestId = 0;
  private currentBannerKey: BannerContext | null = null;
  private currentBannerAdId: string | null = null;
  private readonly BANNER_FALLBACK_HEIGHT = 50;
  private readonly TABS_FALLBACK_HEIGHT = 50;
  private readonly BANNER_GAP = 0;
  private bannerHeight = this.BANNER_FALLBACK_HEIGHT;
  private tabsHeight = this.TABS_FALLBACK_HEIGHT;
  private tabsStackHeight = this.TABS_FALLBACK_HEIGHT;
  private lastBannerMargin: number | null = null;
  private resizeRefreshTimer?: ReturnType<typeof setTimeout>;
  private keyboardVisible = false;
  private keyboardListeners: PluginListenerHandle[] = [];
  private adMobListeners: PluginListenerHandle[] = [];
  private activeOverlayCount = 0;
  private profileStartInFlight = false;
  private lastProfileStartAt = 0;
  private activeBannerRequest: ActiveBannerRequest | null = null;
  private activeInterstitialRequest: ActiveInterstitialRequest | null = null;

  constructor() {
    this.initAdMobEventLogging();
    this.initialize();
    this.initKeyboardBannerBehavior();
    this.initOverlayBannerBehavior();
    this.initBannerSizeBehavior();
    this.initViewportBannerBehavior();
    this.initAppStateBannerBehavior();
    this.manageBannerPosition();
  }

  public async interstitial(
    placement: InterstitialPlacement = 'default'
  ): Promise<void> {
    const profileGuardEnabled = placement === 'profile_start';

    if (profileGuardEnabled && !this.reserveProfileStartSlot()) {
      return;
    }

    try {
      if (!Capacitor.isNativePlatform()) {
        this.logAdEvent('debug', 'interstitial_skipped_non_native', {
          placement,
        });
        return;
      }

      await this.initializing;

      const user = this.userService.getLocalUser;
      if (!user || !this.shouldShowAds(user)) {
        this.logAdEvent('debug', 'interstitial_skipped_user_state', {
          placement,
          hasUser: Boolean(user),
        });
        return;
      }

      if (!(await this.ensureAdsCanBeRequested(user, placement))) {
        return;
      }

      const adId = this.getInterstitialAdId(placement);
      const options: AdOptions = {
        adId,
        isTesting: this.useTestAds,
        npa: !user.personalAds,
      };

      this.activeInterstitialRequest = { placement, adId };
      this.logAdEvent('info', 'interstitial_prepare_start', {
        placement,
        adUnit: this.getAdUnitSuffix(adId),
        npa: options.npa,
        isTesting: options.isTesting,
      });

      await AdMob.prepareInterstitial(options);
      this.logAdEvent('info', 'interstitial_show_start', {
        placement,
        adUnit: this.getAdUnitSuffix(adId),
      });
      await AdMob.showInterstitial();
    } catch (error) {
      this.logAdEvent(
        'error',
        'interstitial_request_failed',
        { placement },
        error
      );
      throw error;
    } finally {
      if (profileGuardEnabled) {
        this.profileStartInFlight = false;
      }
    }
  }

  public async interstitialCapgo(): Promise<void> {
    await this.interstitial('acquire_routine');
  }

  public async showBanner(
    margin: number = 0,
    adIdOverride?: string
  ): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      this.logAdEvent('debug', 'banner_skipped_non_native');
      return false;
    }

    await this.initializing;

    const user = this.userService.getLocalUser;
    if (!user || !this.shouldShowAds(user)) {
      this.logAdEvent('debug', 'banner_skipped_user_state', {
        hasUser: Boolean(user),
      });
      return false;
    }

    if (!(await this.ensureAdsCanBeRequested(user, 'banner'))) {
      return false;
    }

    const adId =
      adIdOverride ||
      (this._platform.is('ios') ? this.ID_IOS_BANNER : this.ID_ANDROID_BANNER);
    const roundedMargin = Math.max(0, Math.round(margin));
    const options: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: roundedMargin,
      isTesting: this.useTestAds,
      npa: !user.personalAds,
    };

    this.activeBannerRequest = {
      context: this.currentBannerKey || 'manual',
      adId,
      margin: roundedMargin,
    };
    this.logAdEvent('info', 'banner_show_start', {
      context: this.activeBannerRequest.context,
      adUnit: this.getAdUnitSuffix(adId),
      margin: roundedMargin,
      npa: options.npa,
      isTesting: options.isTesting,
    });

    await AdMob.showBanner(options);
    return true;
  }

  public async removeBanner(): Promise<void> {
    try {
      await AdMob.removeBanner();
    } catch {
      // No-op: removeBanner is called defensively during route and overlay changes.
    }
    this.bannerVisible = false;
    this.onBannerTabRoute = false;
    this.currentBannerKey = null;
    this.currentBannerAdId = null;
    this.lastBannerMargin = null;
    this.activeBannerRequest = null;
    this.clearBannerBodyClasses();
  }

  private reserveProfileStartSlot(): boolean {
    const now = Date.now();
    if (this.profileStartInFlight) {
      this.logAdEvent('debug', 'profile_start_skipped_in_flight');
      return false;
    }
    if (now - this.lastProfileStartAt < 10000) {
      this.logAdEvent('debug', 'profile_start_skipped_throttle');
      return false;
    }
    this.profileStartInFlight = true;
    this.lastProfileStartAt = now;
    return true;
  }

  private async removeNativeBannerForReplacement(): Promise<void> {
    try {
      await AdMob.removeBanner();
    } catch {
      // No-op: replacing a missing banner should not break the next request.
    }
    this.bannerVisible = false;
  }

  private manageBannerPosition(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.refreshBannerForRoute(event.urlAfterRedirects);
      });

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

  private getBannerContext(url: string): BannerContext | null {
    if (this.isMainTabsRootRoute(url)) {
      return 'tabs';
    }
    if (this.isCurrentWorkoutRoute(url)) {
      return 'current-workout';
    }
    return null;
  }

  private getBannerAdId(context: BannerContext): string {
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
    document.body.style.removeProperty('--trainfit-tabs-stack-height');
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
    document.body.style.setProperty(
      '--trainfit-tabs-stack-height',
      `${Math.max(this.tabsStackHeight, this.TABS_FALLBACK_HEIGHT)}px`
    );
  }

  private getViewportHeight(): number {
    return Math.round(
      window.innerHeight ||
        document.documentElement.clientHeight ||
        window.visualViewport?.height ||
        0
    );
  }

  private getTabBarRect(): DOMRect | null {
    try {
      const tabBar = document.querySelector('ion-tab-bar') as HTMLElement | null;
      return tabBar?.getBoundingClientRect() || null;
    } catch {
      return null;
    }
  }

  private getAndroidMajorVersion(): number | null {
    if (typeof navigator === 'undefined') {
      return null;
    }

    const match = navigator.userAgent.match(/Android\s+(\d+)/i);
    const version = match ? Number.parseInt(match[1], 10) : Number.NaN;
    return Number.isFinite(version) ? version : null;
  }

  private getAndroidNativeBottomCorrection(
    bottomInset: number,
    viewportBottomGap: number
  ): number {
    if (Capacitor.getPlatform() !== 'android' || bottomInset <= 0) {
      return 0;
    }

    const androidMajorVersion = this.getAndroidMajorVersion();
    const edgeToEdgeIsEnforced =
      androidMajorVersion === null || androidMajorVersion >= 15;
    if (!edgeToEdgeIsEnforced) {
      return 0;
    }

    // Android 15/16 can position native overlays from the decor view while the
    // WebView already received navigation-bar insets. Add only the missing part.
    return Math.max(0, bottomInset - Math.max(0, viewportBottomGap));
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

  private async getBannerBottomMargin(context: BannerContext): Promise<number> {
    const bottomInset = await this.getBottomInset();
    if (context === 'tabs') {
      const tabRect = this.getTabBarRect();
      const viewportHeight = this.getViewportHeight();
      const tabHeight = Math.round(tabRect?.height || 0);
      const hasUsableTabRect =
        Boolean(tabRect) && viewportHeight > 0 && tabHeight > 0;

      this.tabsHeight = hasUsableTabRect ? tabHeight : this.TABS_FALLBACK_HEIGHT;
      this.tabsStackHeight = hasUsableTabRect
        ? Math.max(this.tabsHeight, Math.round(viewportHeight - tabRect!.top))
        : this.tabsHeight + (Capacitor.getPlatform() === 'ios' ? 0 : bottomInset);
      this.applyBannerLayoutVars();

      if (hasUsableTabRect) {
        const viewportBottomGap = Math.max(
          0,
          Math.round(viewportHeight - tabRect!.bottom)
        );
        const androidNativeBottomCorrection = this.getAndroidNativeBottomCorrection(
          bottomInset,
          viewportBottomGap
        );
        const nativeAnchorBottom =
          viewportHeight -
          (Capacitor.getPlatform() === 'ios' ? this.getCssSafeAreaBottom() : 0) +
          androidNativeBottomCorrection;
        const desiredBannerBottom = tabRect!.top - this.BANNER_GAP;
        const measuredMargin = Math.round(nativeAnchorBottom - desiredBannerBottom);

        if (Number.isFinite(measuredMargin) && measuredMargin >= 0) {
          return measuredMargin;
        }
      }

      return this.tabsStackHeight + this.BANNER_GAP;
    }

    this.tabsHeight = 0;
    this.tabsStackHeight = 0;
    this.applyBannerLayoutVars();

    return (Capacitor.getPlatform() === 'ios' ? 0 : bottomInset) + this.BANNER_GAP;
  }

  private scheduleBannerRefresh(delay = 120): void {
    if (this.resizeRefreshTimer) {
      clearTimeout(this.resizeRefreshTimer);
    }

    this.resizeRefreshTimer = setTimeout(() => {
      this.refreshBannerForRoute(this.router.url);
    }, delay);
  }

  private initAdMobEventLogging(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    this.registerAdMobListener(
      AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        this.logAdEvent('info', 'banner_loaded', this.getActiveBannerLogContext());
      }),
      BannerAdPluginEvents.Loaded
    );
    this.registerAdMobListener(
      AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (error: AdMobError) => {
        this.logAdEvent(
          'error',
          'banner_failed_to_load',
          this.getActiveBannerLogContext(),
          error
        );
      }),
      BannerAdPluginEvents.FailedToLoad
    );
    this.registerAdMobListener(
      AdMob.addListener(BannerAdPluginEvents.Opened, () => {
        this.logAdEvent('info', 'banner_opened', this.getActiveBannerLogContext());
      }),
      BannerAdPluginEvents.Opened
    );
    this.registerAdMobListener(
      AdMob.addListener(BannerAdPluginEvents.Closed, () => {
        this.logAdEvent('info', 'banner_closed', this.getActiveBannerLogContext());
      }),
      BannerAdPluginEvents.Closed
    );
    this.registerAdMobListener(
      AdMob.addListener(BannerAdPluginEvents.AdImpression, () => {
        this.logAdEvent('info', 'banner_impression', this.getActiveBannerLogContext());
      }),
      BannerAdPluginEvents.AdImpression
    );
    this.registerAdMobListener(
      AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
        this.logAdEvent('info', 'interstitial_loaded', {
          ...this.getActiveInterstitialLogContext(),
          loadedAdUnit: this.getAdUnitSuffix(info?.adUnitId),
        });
      }),
      InterstitialAdPluginEvents.Loaded
    );
    this.registerAdMobListener(
      AdMob.addListener(
        InterstitialAdPluginEvents.FailedToLoad,
        (error: AdMobError) => {
          this.logAdEvent(
            'error',
            'interstitial_failed_to_load',
            this.getActiveInterstitialLogContext(),
            error
          );
        }
      ),
      InterstitialAdPluginEvents.FailedToLoad
    );
    this.registerAdMobListener(
      AdMob.addListener(InterstitialAdPluginEvents.Showed, () => {
        this.logAdEvent(
          'info',
          'interstitial_showed',
          this.getActiveInterstitialLogContext()
        );
      }),
      InterstitialAdPluginEvents.Showed
    );
    this.registerAdMobListener(
      AdMob.addListener(
        InterstitialAdPluginEvents.FailedToShow,
        (error: AdMobError) => {
          this.logAdEvent(
            'error',
            'interstitial_failed_to_show',
            this.getActiveInterstitialLogContext(),
            error
          );
        }
      ),
      InterstitialAdPluginEvents.FailedToShow
    );
    this.registerAdMobListener(
      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        this.logAdEvent(
          'info',
          'interstitial_dismissed',
          this.getActiveInterstitialLogContext()
        );
      }),
      InterstitialAdPluginEvents.Dismissed
    );
  }

  private registerAdMobListener(
    registration: Promise<PluginListenerHandle>,
    eventName: string
  ): void {
    void registration
      .then((listener) => this.adMobListeners.push(listener))
      .catch((error) => {
        this.logAdEvent(
          'warn',
          'admob_listener_registration_failed',
          { eventName },
          error
        );
      });
  }

  private initBannerSizeBehavior(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    this.registerAdMobListener(
      AdMob.addListener(
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
          this.logAdEvent('debug', 'banner_size_changed', {
            ...this.getActiveBannerLogContext(),
            width: Math.round(Number(info?.width || 0)),
            height,
          });
        }
      ),
      BannerAdPluginEvents.SizeChanged
    );
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
      this.logAdEvent('warn', 'app_state_listener_registration_failed', {}, error);
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
      .then((shown) => {
        if (requestId !== this.bannerRequestId) {
          return;
        }
        this.bannerVisible = shown;
        if (!shown) {
          this.currentBannerKey = null;
          this.currentBannerAdId = null;
          this.lastBannerMargin = null;
          this.clearBannerBodyClasses();
        }
      })
      .catch((error) => {
        this.bannerVisible = false;
        if (requestId === this.bannerRequestId) {
          this.currentBannerKey = null;
          this.currentBannerAdId = null;
          this.lastBannerMargin = null;
          this.activeBannerRequest = null;
          this.clearBannerBodyClasses();
        }
        this.logAdEvent(
          'error',
          'banner_show_failed',
          { context: bannerContext, adUnit: this.getAdUnitSuffix(adId), margin },
          error
        );
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
      void this.removeBanner();
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
      void this.removeBanner();
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
    try {
      await AdMob.initialize();
      this.logAdEvent('info', 'sdk_initialized', {
        isTesting: this.useTestAds,
      });

      const consentInfo = await this.requestConsentInfo('initialize');
      await this.presentConsentFormIfRequired(consentInfo, 'initialize');
      await this.requestTrackingAuthorizationIfNeeded();
    } catch (error) {
      this.logAdEvent('error', 'sdk_initialize_failed', {}, error);
    }
  }

  public async consent(user: User): Promise<boolean> {
    const consentInfo = await this.requestConsentInfo('user_consent');
    const resolvedConsentInfo = await this.presentConsentFormIfRequired(
      consentInfo,
      'user_consent'
    );

    const personalAds =
      user.personalAds === undefined
        ? this.getDefaultPersonalAdsPreference(resolvedConsentInfo)
        : Boolean(user.personalAds);

    this.userService.setLocalUser = {
      ...user,
      personalAds,
    };

    return this.canRequestAds;
  }

  private async ensureAdsCanBeRequested(
    user: User,
    source: InterstitialPlacement | 'banner'
  ): Promise<boolean> {
    if (user.personalAds === undefined || !this.canRequestAds) {
      await this.consent(user);
    }

    if (!this.canRequestAds) {
      this.logAdEvent('warn', 'ad_request_blocked_by_consent', {
        source,
      });
      return false;
    }

    return true;
  }

  private async requestConsentInfo(
    reason: string
  ): Promise<AdmobConsentInfo | null> {
    try {
      const consentInfo = await AdMob.requestConsentInfo();
      this.updateCanRequestAds(consentInfo, reason);
      return consentInfo;
    } catch (error) {
      this.logAdEvent('warn', 'consent_info_request_failed', { reason }, error);
      return null;
    }
  }

  private async presentConsentFormIfRequired(
    consentInfo: AdmobConsentInfo | null,
    reason: string
  ): Promise<AdmobConsentInfo | null> {
    if (!consentInfo) {
      return null;
    }

    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      try {
        const updatedConsentInfo = await AdMob.showConsentForm();
        this.updateCanRequestAds(updatedConsentInfo, `${reason}_form`);
        return updatedConsentInfo;
      } catch (error) {
        this.logAdEvent('warn', 'consent_form_failed', { reason }, error);
        return consentInfo;
      }
    }

    return consentInfo;
  }

  private updateCanRequestAds(
    consentInfo: AdmobConsentInfo,
    reason: string
  ): void {
    if (typeof consentInfo.canRequestAds === 'boolean') {
      this.canRequestAds = consentInfo.canRequestAds;
    }

    this.logAdEvent('debug', 'consent_state', {
      reason,
      status: consentInfo.status,
      canRequestAds: this.canRequestAds,
      isConsentFormAvailable: Boolean(consentInfo.isConsentFormAvailable),
      privacyOptionsRequirementStatus:
        consentInfo.privacyOptionsRequirementStatus || null,
    });
  }

  private async requestTrackingAuthorizationIfNeeded(): Promise<void> {
    if (Capacitor.getPlatform() !== 'ios') {
      return;
    }

    try {
      const trackingInfo = await AdMob.trackingAuthorizationStatus();
      if (trackingInfo.status === 'notDetermined') {
        await AdMob.requestTrackingAuthorization();
      }
      const authorizationStatus = await AdMob.trackingAuthorizationStatus();
      this.logAdEvent('info', 'tracking_authorization_status', {
        status: authorizationStatus.status,
      });
    } catch (error) {
      this.logAdEvent('warn', 'tracking_authorization_failed', {}, error);
    }
  }

  private getDefaultPersonalAdsPreference(
    consentInfo: AdmobConsentInfo | null
  ): boolean {
    return (
      consentInfo?.status === AdmobConsentStatus.OBTAINED ||
      consentInfo?.status === AdmobConsentStatus.NOT_REQUIRED
    );
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

  private getActiveBannerLogContext(): Record<string, unknown> {
    return {
      context: this.activeBannerRequest?.context || this.currentBannerKey || null,
      adUnit: this.getAdUnitSuffix(
        this.activeBannerRequest?.adId || this.currentBannerAdId
      ),
      margin: this.activeBannerRequest?.margin ?? this.lastBannerMargin,
    };
  }

  private getActiveInterstitialLogContext(): Record<string, unknown> {
    return {
      placement: this.activeInterstitialRequest?.placement || null,
      adUnit: this.getAdUnitSuffix(this.activeInterstitialRequest?.adId),
    };
  }

  private getAdUnitSuffix(adId?: string | null): string | null {
    if (!adId) {
      return null;
    }
    const separatorIndex = adId.lastIndexOf('/');
    return separatorIndex >= 0 ? adId.slice(separatorIndex + 1) : adId;
  }

  private logAdEvent(
    level: AdMobLogLevel,
    event: string,
    context: Record<string, unknown> = {},
    error?: unknown
  ): void {
    if (
      (level === 'debug' || level === 'info') &&
      !this.diagnosticLoggingEnabled
    ) {
      return;
    }

    const payload = {
      event,
      platform: Capacitor.getPlatform(),
      production: environment.production,
      ...context,
    };
    const message = `[AdMob] ${event}`;
    const errorSummary = error ? this.getErrorSummary(error) : undefined;

    if (level === 'debug') {
      console.debug(message, payload, errorSummary || '');
      return;
    }
    if (level === 'info') {
      console.info(message, payload, errorSummary || '');
      return;
    }
    if (level === 'warn') {
      console.warn(message, payload, errorSummary || '');
      return;
    }
    console.error(message, payload, errorSummary || '');
  }

  private getErrorSummary(error: unknown): Record<string, unknown> {
    const maybeError = error as { code?: unknown; message?: unknown };
    return {
      code: maybeError?.code ?? null,
      message: maybeError?.message ?? String(error),
    };
  }
}
