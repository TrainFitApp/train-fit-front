import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { firstValueFrom } from 'rxjs';
import {
  CustomerInfo,
  GoogleProductChangeInfo,
  LOG_LEVEL,
  MakePurchaseResult,
  PRORATION_MODE,
  Purchases,
  PurchasesOffering,
  PurchasesOfferings,
  PurchasesPackage,
} from '@revenuecat/purchases-capacitor';
import { PAYWALL_RESULT, RevenueCatUI } from '@revenuecat/purchases-capacitor-ui';
import { BillingEntitlements } from '../../models/billing-entitlements';
import { User } from '../../models/user';
import { UserService } from '../user/user.service';
import { BillingApiService } from './billing-api.service';
import { environment } from 'src/environments/environment';

export interface BillingPurchaseError {
  userCancelled: boolean;
  code: string;
  message: string;
}

export interface BillingPurchaseResult {
  customerInfo: CustomerInfo | null;
  error: BillingPurchaseError | null;
  usedGoogleProductChangeInfo: boolean;
  usedFallbackWithoutGoogleProductChangeInfo: boolean;
}

@Injectable()
export class BillingService {
  private readonly isNativeClient = Capacitor.isNativePlatform();
  private readonly platform = Capacitor.getPlatform();
  private initializePromise: Promise<void> | null = null;
  private configured = false;
  private cachedEntitlements: BillingEntitlements | null = null;

  constructor(
    private readonly billingApiService: BillingApiService,
    private readonly userService: UserService
  ) {}

  public get isBillingEnabled(): boolean {
    return this.isNativeClient && environment.revenueCat.enabled;
  }

  public get entitlementId(): string {
    return environment.revenueCat.entitlementId;
  }

  public initialize(): Promise<void> {
    if (this.initializePromise) {
      return this.initializePromise;
    }

    if (!this.isNativeClient) {
      this.initializePromise = Promise.resolve();
      return this.initializePromise;
    }

    this.initializePromise = this.doInitialize();
    return this.initializePromise;
  }

  public async logIn(appUserId: string): Promise<boolean> {
    await this.initialize();
    if (!this.configured) {
      return false;
    }

    const normalizedUserId = appUserId?.trim();
    if (!normalizedUserId) {
      return false;
    }

    try {
      const { appUserID: currentAppUserId } = await Purchases.getAppUserID();
      if (currentAppUserId === normalizedUserId) {
        await this.linkCustomerInBackend(normalizedUserId);
        await this.getBackendEntitlements();
        return true;
      }

      await Purchases.logIn({ appUserID: normalizedUserId });
      await this.linkCustomerInBackend(normalizedUserId);
      await this.getBackendEntitlements();
      return true;
    } catch (error) {
      console.warn('RevenueCat logIn error', error);
      return false;
    }
  }

  public async logOut(): Promise<void> {
    await this.initialize();
    if (!this.configured) {
      return;
    }

    try {
      await Purchases.logOut();
      this.cachedEntitlements = null;
    } catch (error) {
      console.warn('RevenueCat logOut error', error);
    }
  }

  public async getOfferings(): Promise<PurchasesOfferings | null> {
    await this.initialize();
    if (!this.configured) {
      return null;
    }

    try {
      return await Purchases.getOfferings();
    } catch (error) {
      console.error('RevenueCat getOfferings error', error);
      return null;
    }
  }

  public async getCurrentOffering(): Promise<PurchasesOffering | null> {
    const offerings = await this.getOfferings();
    return offerings?.current || null;
  }

  private async purchasePackage(
    selectedPackage: PurchasesPackage,
    googleProductChangeInfo?: GoogleProductChangeInfo | null
  ): Promise<BillingPurchaseResult> {
    await this.initialize();
    if (!this.configured || !selectedPackage) {
      return {
        customerInfo: null,
        error: {
          userCancelled: false,
          code: 'NOT_CONFIGURED_OR_INVALID_PACKAGE',
          message: 'Billing no configurado o paquete no valido',
        },
        usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
        usedFallbackWithoutGoogleProductChangeInfo: false,
      };
    }

    try {
      const result: MakePurchaseResult = await Purchases.purchasePackage({
        aPackage: selectedPackage,
        googleProductChangeInfo: googleProductChangeInfo || null,
      });
      return {
        customerInfo: result?.customerInfo || null,
        error: null,
        usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
        usedFallbackWithoutGoogleProductChangeInfo: false,
      };
    } catch (error) {
      const mappedError = this.mapPurchaseError(error);
      console.error('RevenueCat purchasePackage error', mappedError.code, mappedError.message, error);
      return {
        customerInfo: null,
        error: mappedError,
        usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
        usedFallbackWithoutGoogleProductChangeInfo: false,
      };
    }
  }

  public async restorePurchases(): Promise<CustomerInfo | null> {
    await this.initialize();
    if (!this.configured) {
      return null;
    }

    try {
      const { customerInfo } = await Purchases.restorePurchases();
      return customerInfo;
    } catch (error) {
      console.error('RevenueCat restorePurchases error', error);
      return null;
    }
  }

  public async getCustomerInfo(): Promise<CustomerInfo | null> {
    await this.initialize();
    if (!this.configured) {
      return null;
    }

    try {
      const { customerInfo } = await Purchases.getCustomerInfo();
      return customerInfo;
    } catch (error) {
      console.error('RevenueCat getCustomerInfo error', error);
      return null;
    }
  }

  public async purchasePlan(
    plan: 'monthly' | 'annual'
  ): Promise<BillingPurchaseResult> {
    const currentOffering = await this.getCurrentOffering();
    if (!currentOffering) {
      return {
        customerInfo: null,
        error: {
          userCancelled: false,
          code: 'NO_OFFERING',
          message: 'No hay offering activo en RevenueCat',
        },
        usedGoogleProductChangeInfo: false,
        usedFallbackWithoutGoogleProductChangeInfo: false,
      };
    }

    const selectedPackage =
      plan === 'monthly' ? currentOffering.monthly : currentOffering.annual;

    if (!selectedPackage) {
      return {
        customerInfo: null,
        error: {
          userCancelled: false,
          code: 'PACKAGE_NOT_AVAILABLE',
          message: `Paquete ${plan} no disponible en el offering`,
        },
        usedGoogleProductChangeInfo: false,
        usedFallbackWithoutGoogleProductChangeInfo: false,
      };
    }

    let googleProductChangeInfo: GoogleProductChangeInfo | null = null;
    const currentCustomerInfo = await this.getCustomerInfo();
    const currentProductIdentifier = this.resolveCurrentSubscriptionProductId(
      currentCustomerInfo,
      currentOffering
    );
    const selectedProductIdentifier = selectedPackage.product?.identifier;

    if (
      this.platform === 'android' &&
      currentProductIdentifier &&
      selectedProductIdentifier &&
      currentProductIdentifier !== selectedProductIdentifier
    ) {
      googleProductChangeInfo = {
        oldProductIdentifier: currentProductIdentifier,
        prorationMode: PRORATION_MODE.IMMEDIATE_WITH_TIME_PRORATION,
      };
    }

    const purchaseResult = await this.purchasePackage(
      selectedPackage,
      googleProductChangeInfo
    );
    if (purchaseResult.customerInfo || !googleProductChangeInfo) {
      return purchaseResult;
    }

    const shouldRetryWithoutProductChangeInfo =
      !purchaseResult.error?.userCancelled;

    if (!shouldRetryWithoutProductChangeInfo) {
      return purchaseResult;
    }

    console.warn(
      '[Billing] purchasePlan retry without googleProductChangeInfo',
      {
        platform: this.platform,
        currentProductIdentifier,
        selectedProductIdentifier,
        errorCode: purchaseResult.error?.code,
        errorMessage: purchaseResult.error?.message,
      }
    );

    const fallbackResult = await this.purchasePackage(selectedPackage, null);
    return {
      ...fallbackResult,
      usedFallbackWithoutGoogleProductChangeInfo: true,
      usedGoogleProductChangeInfo: false,
    };
  }

  public async presentPaywallIfNeeded(
    requiredEntitlementIdentifier: string = environment.revenueCat.entitlementId
  ): Promise<PAYWALL_RESULT | null> {
    await this.initialize();
    if (!this.configured || !requiredEntitlementIdentifier) {
      return null;
    }

    try {
      const result = await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier,
      });
      return result?.result || null;
    } catch (error) {
      console.error('RevenueCat presentPaywallIfNeeded error', error);
      return null;
    }
  }

  public async openNativeManageSubscriptions(): Promise<boolean> {
    try {
      if (this.platform === 'android') {
        await Browser.open({
          url: 'https://play.google.com/store/account/subscriptions?package=com.trainfit.trainfit&sku=trainfit_pro',
        });
        return true;
      }

      if (this.platform === 'ios') {
        await Browser.open({
          url: 'https://apps.apple.com/account/subscriptions',
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Open native manage subscriptions error', error);
      return false;
    }
  }

  public async getBackendEntitlements(): Promise<BillingEntitlements | null> {
    try {
      const entitlements = await firstValueFrom(
        this.billingApiService.getEntitlementsMe()
      );
      this.cachedEntitlements = entitlements;
      this.applyPremiumToLocalUser(entitlements);
      return entitlements;
    } catch (error) {
      console.error('Billing getBackendEntitlements error', error);
      return this.cachedEntitlements;
    }
  }

  public async syncEntitlementsWithBackend(
    customerInfo?: CustomerInfo | null
  ): Promise<BillingEntitlements | null> {
    const appUserId = this.userService.getLocalUser?._id || null;
    try {
      const entitlements = await firstValueFrom(
        this.billingApiService.restore({
          appUserId: appUserId || undefined,
          customerInfo: customerInfo || undefined,
        })
      );
      this.cachedEntitlements = entitlements;
      this.applyPremiumToLocalUser(entitlements);
      return entitlements;
    } catch (error) {
      console.error('Billing syncEntitlementsWithBackend error', error);
      return null;
    }
  }

  public getCachedEntitlements(): BillingEntitlements | null {
    return this.cachedEntitlements;
  }

  public hasActiveEntitlement(
    customerInfo: CustomerInfo | null,
    entitlementId: string = environment.revenueCat.entitlementId
  ): boolean {
    if (!customerInfo || !entitlementId) {
      return false;
    }

    return !!customerInfo.entitlements?.active?.[entitlementId];
  }

  private async doInitialize(): Promise<void> {
    const apiKey = this.getApiKeyForPlatform();
    if (!apiKey) {
      console.warn(
        'RevenueCat disabled: missing api key or unsupported platform.'
      );
      return;
    }

    try {
      if (!environment.production) {
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      }

      await Purchases.configure({ apiKey });
      this.configured = true;

      const localUserId = this.userService.getLocalUser?._id;
      if (localUserId) {
        await this.linkCustomerInBackend(localUserId);
      }
    } catch (error) {
      this.configured = false;
      console.error('RevenueCat configure error', error);
    }
  }

  private async linkCustomerInBackend(appUserId: string): Promise<void> {
    if (!appUserId) return;
    try {
      await firstValueFrom(this.billingApiService.linkCustomer(appUserId));
    } catch (error) {
      console.warn('Billing linkCustomerInBackend error', error);
    }
  }

  private applyPremiumToLocalUser(entitlements: BillingEntitlements | null): void {
    if (!entitlements) return;
    const localUser = this.userService.getLocalUser;
    if (!localUser) return;

    const updatedUser: User = {
      ...localUser,
      isPremium: !!entitlements.isPremium,
      premium: {
        entitled: !!entitlements.isPremium,
        plan: entitlements.plan,
        expiresAt: entitlements.expiresAt,
        source: entitlements.source,
        lastSyncAt: new Date().toISOString(),
      },
    };
    this.userService.setLocalUser = updatedUser;
  }

  private resolveCurrentSubscriptionProductId(
    customerInfo: CustomerInfo | null,
    offering: PurchasesOffering | null
  ): string | null {
    if (!customerInfo || !offering) {
      return null;
    }

    const activeSubscriptions = customerInfo.activeSubscriptions || [];
    if (!activeSubscriptions.length) {
      return null;
    }

    const offeringProductIds = new Set<string>([
      offering.monthly?.product?.identifier,
      offering.annual?.product?.identifier,
    ].filter(Boolean) as string[]);

    const match = activeSubscriptions.find((id) => offeringProductIds.has(id));
    return match || activeSubscriptions[0] || null;
  }

  private mapPurchaseError(error: any): BillingPurchaseError {
    const userCancelled = Boolean(
      error?.userCancelled || error?.code === 'PURCHASE_CANCELLED'
    );
    const code = String(error?.code || error?.rcCode || 'PURCHASE_ERROR');
    const message = String(
      error?.message || error?.readableErrorCode || 'Error de compra'
    );

    return { userCancelled, code, message };
  }

  private getApiKeyForPlatform(): string {
    if (!environment.revenueCat.enabled) {
      return '';
    }

    if (this.platform === 'android') {
      return environment.revenueCat.androidApiKey;
    }

    if (this.platform === 'ios') {
      return environment.revenueCat.iosApiKey;
    }

    return '';
  }
}
