import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import { AlertOptions } from "@ionic/angular";
import { PAYWALL_RESULT } from "@revenuecat/purchases-capacitor-ui";
import { BillingEntitlements } from "src/app/core/models/billing-entitlements";
import {
  BillingPurchaseIntent,
  BillingPurchaseResult,
  BillingService,
} from "src/app/core/services/billing/billing.service";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";

@Component({
  selector: "app-premium",
  templateUrl: "./premium.page.html",
  styleUrls: ["./premium.page.scss"],
})
export class PremiumPage {
  private readonly LEGAL_LINKS = {
    privacy: "https://trainfit.net/privacidad/",
    iosTerms:
      "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
    defaultTerms: "https://trainfit.net/terminos/",
  } as const;

  public readonly isNativeBillingAvailable: boolean;
  public readonly platform = Capacitor.getPlatform();
  public isPremium = false;
  public isLoading = false;
  public isPurchasingMonthly = false;
  public isPurchasingAnnual = false;
  public isPresentingPaywall = false;
  public isRestoring = false;
  public isOpeningManageSubscription = false;
  public monthlyPriceLabel = "Cargando...";
  public annualPriceLabel = "Cargando...";
  public isMonthlyAvailable = false;
  public isAnnualAvailable = false;
  public entitlements: BillingEntitlements | null = null;
  public selectedPlan: "annual" | "monthly" = "annual";

  constructor(
    private readonly billingService: BillingService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly navigationService: NavigationService,
    private readonly translate: TranslateService,
  ) {
    this.isNativeBillingAvailable = this.billingService.isBillingEnabled;
  }

  public ionViewWillEnter(): void {
    void this.loadData();
  }

  public close(): void {
    this.navigationService.goBack();
  }

  public selectPlan(plan: "annual" | "monthly"): void {
    if (plan === "annual" && !this.canSelectPlan("annual")) {
      return;
    }

    if (plan === "monthly" && !this.canSelectPlan("monthly")) {
      return;
    }

    this.selectedPlan = plan;
  }

  public async purchaseSelected(): Promise<void> {
    if (!this.canPurchaseSelectedPlan) {
      if (this.platform === "ios") {
        await this.openPaywall();
        return;
      }

      this.showError(this.translate.instant("PREMIUM.LOAD_PRICE_ERROR"));
      return;
    }

    await this.purchasePlan(this.selectedPlan);
  }

  public async changeToAnnual(): Promise<void> {
    await this.purchasePlan("annual");
  }

  public async openPaywall(): Promise<void> {
    if (!this.ensureNativeBilling() || this.isPresentingPaywall) {
      return;
    }

    this.isPresentingPaywall = true;
    try {
      const result = await this.billingService.presentPaywallIfNeeded();
      if (result === PAYWALL_RESULT.ERROR) {
        this.showError(this.translate.instant("PREMIUM.PAYWALL_ERROR"));
        return;
      }

      // I1: resolver el plan comprado antes de sincronizar para evitar plan=null en BD
      const customerInfo = await this.billingService.getCustomerInfo();
      const purchasedPlan =
        await this.billingService.resolvePlanFromCustomerInfo(customerInfo);
      await this.billingService.syncEntitlementsWithBackend(
        customerInfo,
        purchasedPlan,
      );

      if (result === PAYWALL_RESULT.PURCHASED) {
          this.showSuccess(this.translate.instant("PREMIUM.ACTIVATED"));
      } else if (result === PAYWALL_RESULT.RESTORED) {
        this.showSuccess(this.translate.instant("PREMIUM.RESTORED"));
      } else if (result === PAYWALL_RESULT.NOT_PRESENTED) {
        this.showSuccess(this.translate.instant("PREMIUM.ALREADY_ACTIVE"));
      }
    } finally {
      this.isPresentingPaywall = false;
      // I2: loadData solo en finally — no duplicar llamadas dentro del try
      await this.loadData();
    }
  }

  public async restorePurchases(): Promise<void> {
    if (!this.ensureNativeBilling() || this.isRestoring) {
      return;
    }

    this.isRestoring = true;
    try {
      const customerInfo = await this.billingService.restorePurchases();
      const entitlements =
        await this.billingService.syncEntitlementsWithBackend(customerInfo);

      if (entitlements?.isPremium) {
        this.showSuccess(this.translate.instant("PREMIUM.RESTORED"));
      } else {
        this.showError(this.translate.instant("PREMIUM.NO_PURCHASES_FOUND"));
      }
    } finally {
      this.isRestoring = false;
      // I2: loadData solo en finally
      await this.loadData();
    }
  }

  public async openManageSubscription(): Promise<void> {
    if (!this.ensureNativeBilling() || this.isOpeningManageSubscription) {
      return;
    }

    this.isOpeningManageSubscription = true;
    try {
      const opened = await this.billingService.openNativeManageSubscriptions();
      if (!opened) {
        this.showError(this.translate.instant("PREMIUM.MANAGE_SUBSCRIPTION_ERROR"));
      }
    } finally {
      this.isOpeningManageSubscription = false;
    }
  }

  public async openPrivacyPolicy(): Promise<void> {
    await this.openLegalLink(this.LEGAL_LINKS.privacy);
  }

  public async openTermsOfUse(): Promise<void> {
    await this.openLegalLink(this.termsUrl);
  }

  public get currentPlanLabel(): string {
    if (this.isManualPremium) return this.translate.instant("PREMIUM.MANUAL_PREMIUM_LABEL");

    const currentPlan = this.getNormalizedCurrentPlan();
    if (currentPlan === "annual") return this.translate.instant("PREMIUM.ANNUAL_PLAN");
    if (currentPlan === "monthly") return this.translate.instant("PREMIUM.MONTHLY_PLAN");
    return this.entitlements?.plan ?? this.translate.instant("PREMIUM.PRO_PLAN");
  }

  public get isManualPremium(): boolean {
    return (
      this.isPremium &&
      (this.entitlements?.source === "manual" ||
        this.entitlements?.plan === "manual")
    );
  }

  public get isStorePremium(): boolean {
    return this.isPremium && !this.isManualPremium;
  }

  public get premiumDateLabel(): string {
    return this.isManualPremium ? this.translate.instant("PREMIUM.VALID_UNTIL") : this.translate.instant("PREMIUM.RENEWAL");
  }

  public get premiumStatusDescription(): string {
    if (this.isManualPremium) {
      return this.translate.instant("PREMIUM.MANUAL_ACCESS_DESC");
    }

    return this.translate.instant("PREMIUM.SUBSCRIPTION_ACTIVE_DESC");
  }

  public get showChangeToAnnual(): boolean {
    if (this.isManualPremium) return false;

    const currentPlan = this.getNormalizedCurrentPlan();
    return this.isPremium && currentPlan !== null && currentPlan !== "annual";
  }

  public get canPurchaseSelectedPlan(): boolean {
    if (this.platform === "ios") {
      // En iOS dejamos compra habilitada para que App Review no encuentre CTA bloqueado.
      // Si no hay precios cargados en el selector, el fallback es abrir el paywall nativo.
      return true;
    }

    if (this.selectedPlan === "annual") {
      return this.isAnnualAvailable;
    }

    return this.isMonthlyAvailable;
  }

  public canSelectPlan(plan: "annual" | "monthly"): boolean {
    if (this.platform === "ios") {
      return true;
    }

    if (plan === "annual") {
      return this.isAnnualAvailable;
    }

    return this.isMonthlyAvailable;
  }

  public get selectedPlanPriceCaption(): string {
    if (this.selectedPlan === "annual") {
      const price = this.annualPriceLabel;
      return this.translate.instant("PREMIUM.ANNUAL_PRICE_CAPTION", { price });
    }
    const price = this.monthlyPriceLabel;
    return this.translate.instant("PREMIUM.MONTHLY_PRICE_CAPTION", { price });
  }

  public get termsLabel(): string {
    return this.platform === "ios"
      ? this.translate.instant("PREMIUM.TERMS_IOS")
      : this.translate.instant("PREMIUM.TERMS_DEFAULT");
  }

  public get termsUrl(): string {
    return this.platform === "ios"
      ? this.LEGAL_LINKS.iosTerms
      : this.LEGAL_LINKS.defaultTerms;
  }

  private async purchasePlan(plan: "monthly" | "annual"): Promise<void> {
    if (!this.ensureNativeBilling()) {
      return;
    }

    const wasPremiumBeforePurchase = this.isPremium;
    const currentPlan = this.getNormalizedCurrentPlan();

    if (this.isPremium && currentPlan === "annual" && plan === "monthly") {
      this.showError(this.translate.instant("PREMIUM.DOWNGRADE_INFO"));
      return;
    }

    if (this.isPremium && currentPlan === plan) {
      this.showSuccess(
        plan === "annual"
          ? this.translate.instant("PREMIUM.ALREADY_ANNUAL")
          : this.translate.instant("PREMIUM.ALREADY_MONTHLY"),
      );
      return;
    }

    if (plan === "monthly") {
      this.isPurchasingMonthly = true;
    } else {
      this.isPurchasingAnnual = true;
    }

    try {
      const purchaseIntent: BillingPurchaseIntent = this.isPremium
        ? "change_plan"
        : "activate";
      const purchaseResult = await this.billingService.purchasePlan(
        plan,
        purchaseIntent,
      );
      if (!purchaseResult.customerInfo) {
        await this.handleFailedPurchaseResult(purchaseResult, purchaseIntent);
        return;
      }

      const entitlements =
        await this.billingService.syncEntitlementsWithBackend(
          purchaseResult.customerInfo,
          plan,
        );

      if (!entitlements) {
        await this.showSyncWarningAlert();
        return;
      }

      if (entitlements.isPremium) {
        if (wasPremiumBeforePurchase) {
          this.showSuccess(this.translate.instant("PREMIUM.PLAN_UPDATED"));
        } else {
        this.showSuccess(this.translate.instant("PREMIUM.ACTIVATED"));
        }
      } else {
        this.showError(this.translate.instant("PREMIUM.PURCHASE_NOT_ACTIVATED"));
      }
    } catch (error) {
      console.error("Premium purchase error", error);
      this.showError(this.translate.instant("PREMIUM.PURCHASE_ERROR"));
    } finally {
      this.isPurchasingMonthly = false;
      this.isPurchasingAnnual = false;
      // I2: loadData solo en finally — syncEntitlementsWithBackend ya actualizó la caché
      await this.loadData();
    }
  }

  private async loadData(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.monthlyPriceLabel = this.translate.instant("PREMIUM.LOADING");
    this.annualPriceLabel = this.translate.instant("PREMIUM.LOADING");
    try {
      const [offering, entitlements] = await Promise.all([
        this.isNativeBillingAvailable
          ? this.billingService.getCurrentOffering()
          : Promise.resolve(null),
        this.billingService.getBackendEntitlements(),
      ]);

      this.entitlements = entitlements;
      this.isPremium = Boolean(entitlements?.isPremium);
      this.isMonthlyAvailable = !!offering?.monthly?.product?.priceString;
      this.isAnnualAvailable = !!offering?.annual?.product?.priceString;
      this.monthlyPriceLabel =
        offering?.monthly?.product?.priceString || this.translate.instant("PREMIUM.NOT_AVAILABLE");
      this.annualPriceLabel =
        offering?.annual?.product?.priceString || this.translate.instant("PREMIUM.NOT_AVAILABLE");
    } finally {
      this.isLoading = false;
    }
  }

  private ensureNativeBilling(): boolean {
    if (this.isNativeBillingAvailable) {
      return true;
    }

    this.showError(this.translate.instant("PREMIUM.NATIVE_BILLING_REQUIRED"));
    return false;
  }

  private showSuccess(message: string): void {
    this.ionicUtilService.showToast({
      message,
      duration: 1500,
      color: "success",
    });
  }

  private showError(message: string): void {
    this.ionicUtilService.showToast({
      message,
      duration: 1800,
      color: "danger",
    });
  }

  private async showSyncWarningAlert(): Promise<void> {
    const alertOptions: AlertOptions = {
      header: this.translate.instant("PREMIUM.PURCHASE_DETECTED"),
      message: this.translate.instant("PREMIUM.SYNC_WARNING"),
      buttons: [
        {
          text: this.translate.instant("COMMON.CERRAR"),
          role: "cancel",
        },
        {
          text: this.translate.instant("PREMIUM.RESTORE_PURCHASES"),
          handler: () => {
            void this.restorePurchases();
          },
        },
      ],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  private async handleFailedPurchaseResult(
    purchaseResult: BillingPurchaseResult,
    purchaseIntent: BillingPurchaseIntent,
  ): Promise<void> {
    if (purchaseResult.error?.userCancelled) {
      this.showError(this.translate.instant("PREMIUM.PURCHASE_CANCELLED"));
      return;
    }

    const isChangePlan = purchaseIntent === "change_plan";

    // Fix: al fallar un cambio de plan, abrir gestión nativa directamente
    // en lugar de mostrar un alert — Google Play ya mostrará la UI correcta
    if (isChangePlan) {
      await this.openManageSubscription();
      return;
    }

    const purchaseCode = String(purchaseResult.error?.code || "").toUpperCase();
    if (
      this.platform === "ios" &&
      (purchaseCode === "NO_OFFERING" ||
        purchaseCode === "PACKAGE_NOT_AVAILABLE")
    ) {
      await this.openPaywall();
      return;
    }

    const alertOptions: AlertOptions = {
      header: this.translate.instant("PREMIUM.ACTIVATION_FAILED"),
      message: this.translate.instant("PREMIUM.ACTIVATION_FAILED_MSG"),
      buttons: [
        {
          text: this.translate.instant("COMMON.CERRAR"),
          role: "cancel",
        },
        {
          text: this.translate.instant("PREMIUM.MANAGE"),
          handler: () => {
            void this.openManageSubscription();
          },
        },
      ],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  private async openLegalLink(url: string): Promise<void> {
    try {
      await Browser.open({ url });
    } catch (error) {
      console.error("Open legal link error", error);
      this.showError(this.translate.instant("PREMIUM.LINK_ERROR"));
    }
  }

  private getNormalizedCurrentPlan(): "monthly" | "annual" | null {
    const rawPlan = String(this.entitlements?.plan || "")
      .trim()
      .toLowerCase();

    if (
      rawPlan === "monthly" ||
      rawPlan.includes("month") ||
      rawPlan.includes("mensual")
    ) {
      return "monthly";
    }
    if (
      rawPlan === "annual" ||
      rawPlan.includes("year") ||
      rawPlan.includes("anual")
    ) {
      return "annual";
    }
    return null;
  }
}
