import { Injectable, inject } from '@angular/core';
import {
  AdLoadInfo,
  AdMob,
  AdMobError,
  AdOptions,
  AdmobConsentInfo,
  AdmobConsentStatus,
  InterstitialAdPluginEvents,
} from '@capacitor-community/admob';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { UserService } from '../user/user.service';
import { User } from 'src/app/core/models/user';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { BillingService } from '../billing/billing.service';
import { APP_SHELL_CONFIG } from 'src/app/app-shell.config';

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
  | 'profile_start'
  | 'rm_calculator';

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
    rm_calculator: 'ca-app-pub-7032025540653355/1114289586',
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
    rm_calculator: 'ca-app-pub-7032025540653355/5464185440',
  };

  private readonly userService = inject(UserService);
  private readonly billingService = inject(BillingService);
  private readonly _platform = inject(Platform);

  private readonly useTestAds = !environment.production;
  private readonly diagnosticLoggingEnabled =
    !environment.production || Boolean((environment as any).adMob?.diagnostics);

  private initializing: Promise<void>;
  private canRequestAds = true;
  private adMobListeners: PluginListenerHandle[] = [];
  private profileStartInFlight = false;
  private lastProfileStartAt = 0;
  private activeInterstitialRequest: ActiveInterstitialRequest | null = null;

  // App de entrenadores/gestión — sin anuncios (APP_SHELL_CONFIG.adsEnabled
  // = false ahí): sin este guard, el constructor de este servicio (inyectado
  // en más de una decena de páginas compartidas — nutrition-editor,
  // config-exercise, create-product...) llamaba a AdMob.initialize() en
  // TODAS las apps por igual, disparando el warning nativo "Google Mobile
  // Ads SDK was initialized without an application ID" (esas apps no
  // declaran GADApplicationIdentifier en su Info.plist, a propósito) y el
  // prompt de tracking (ATT) de iOS, ninguno de los dos con sentido fuera
  // del cliente free con anuncios.
  private readonly adsEnabled = APP_SHELL_CONFIG.adsEnabled !== false;

  constructor() {
    if (!this.adsEnabled) {
      return;
    }
    this.initAdMobEventLogging();
    this.initialize();
  }

  public async interstitial(
    placement: InterstitialPlacement = 'default'
  ): Promise<void> {
    if (!this.adsEnabled) {
      return;
    }

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

  private initAdMobEventLogging(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

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
    source: InterstitialPlacement
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
