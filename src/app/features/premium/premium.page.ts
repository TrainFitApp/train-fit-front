import { Component } from '@angular/core';
import { AlertOptions } from '@ionic/angular';
import { PAYWALL_RESULT } from '@revenuecat/purchases-capacitor-ui';
import { BillingEntitlements } from 'src/app/core/models/billing-entitlements';
import { BillingService } from 'src/app/core/services/billing/billing.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.page.html',
  styleUrls: ['./premium.page.scss'],
})
export class PremiumPage {
  public readonly isNativeBillingAvailable: boolean;
  public isPremium = false;
  public isLoading = false;
  public isPurchasingMonthly = false;
  public isPurchasingAnnual = false;
  public isPresentingPaywall = false;
  public isRestoring = false;
  public isOpeningManageSubscription = false;
  public monthlyPriceLabel = 'Cargando...';
  public annualPriceLabel = 'Cargando...';
  public entitlements: BillingEntitlements | null = null;
  public selectedPlan: 'annual' | 'monthly' = 'annual';
  public showCompare = false;

  constructor(
    private readonly billingService: BillingService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly navigationService: NavigationService
  ) {
    this.isNativeBillingAvailable = this.billingService.isBillingEnabled;
  }

  public ionViewWillEnter(): void {
    void this.loadData();
  }

  public close(): void {
    this.navigationService.goBack();
  }

  public async buyMonthly(): Promise<void> {
    await this.purchasePlan('monthly');
  }

  public async buyAnnual(): Promise<void> {
    await this.purchasePlan('annual');
  }

  public selectPlan(plan: 'annual' | 'monthly'): void {
    this.selectedPlan = plan;
  }

  public toggleCompare(): void {
    this.showCompare = !this.showCompare;
  }

  public async purchaseSelected(): Promise<void> {
    await this.purchasePlan(this.selectedPlan);
  }

  public async openPaywall(): Promise<void> {
    if (!this.ensureNativeBilling() || this.isPresentingPaywall) {
      return;
    }

    this.isPresentingPaywall = true;
    try {
      const result = await this.billingService.presentPaywallIfNeeded();
      if (result === PAYWALL_RESULT.PURCHASED) {
        this.showSuccess('Suscripcion activada correctamente');
      } else if (result === PAYWALL_RESULT.RESTORED) {
        this.showSuccess('Compras restauradas correctamente');
      } else if (result === PAYWALL_RESULT.NOT_PRESENTED) {
        this.showSuccess('Ya tienes acceso premium activo');
      } else if (result === PAYWALL_RESULT.ERROR) {
        this.showError('No se pudo abrir el paywall');
      }

      const customerInfo = await this.billingService.getCustomerInfo();
      await this.billingService.syncEntitlementsWithBackend(customerInfo);
    } finally {
      this.isPresentingPaywall = false;
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
      const entitlements = await this.billingService.syncEntitlementsWithBackend(
        customerInfo
      );
      if (entitlements?.isPremium) {
        this.showSuccess('Premium restaurado correctamente');
      } else {
        this.showError('No se encontraron compras activas');
      }
    } finally {
      this.isRestoring = false;
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
        this.showError('No se pudo abrir la gestion de suscripcion');
      }
    } finally {
      this.isOpeningManageSubscription = false;
    }
  }

  private async purchasePlan(plan: 'monthly' | 'annual'): Promise<void> {
    if (!this.ensureNativeBilling()) {
      return;
    }

    if (plan === 'monthly') {
      this.isPurchasingMonthly = true;
    } else {
      this.isPurchasingAnnual = true;
    }

    try {
      const customerInfo = await this.billingService.purchasePlan(plan);
      if (!customerInfo) {
        this.showError('Plan no disponible. Revisa el offering en RevenueCat');
        return;
      }

      const entitlements = await this.billingService.syncEntitlementsWithBackend(
        customerInfo
      );

      if (!entitlements) {
        await this.showSyncWarningAlert();
        return;
      }

      if (entitlements.isPremium) {
        await this.showPremiumSuccessAlert();
      } else {
        this.showError('La compra no activo premium. Prueba Restaurar compras');
      }
    } catch (error) {
      console.error('Premium purchase error', error);
      this.showError('Error durante la compra');
    } finally {
      this.isPurchasingMonthly = false;
      this.isPurchasingAnnual = false;
      await this.loadData();
    }
  }

  private async loadData(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.monthlyPriceLabel = 'Cargando...';
    this.annualPriceLabel = 'Cargando...';
    try {
      const [offering, entitlements] = await Promise.all([
        this.isNativeBillingAvailable
          ? this.billingService.getCurrentOffering()
          : Promise.resolve(null),
        this.billingService.getBackendEntitlements(),
      ]);

      this.entitlements = entitlements;
      this.isPremium = Boolean(entitlements?.isPremium);
      this.monthlyPriceLabel =
        offering?.monthly?.product?.priceString || 'No disponible';
      this.annualPriceLabel =
        offering?.annual?.product?.priceString || 'No disponible';
    } finally {
      this.isLoading = false;
    }
  }

  private ensureNativeBilling(): boolean {
    if (this.isNativeBillingAvailable) {
      return true;
    }

    this.showError(
      'Las compras in-app solo estan disponibles en la app instalada (Android/iOS)'
    );
    return false;
  }

  private showSuccess(message: string): void {
    this.ionicUtilService.showToast({
      message,
      duration: 1500,
      color: 'success',
    });
  }

  private showError(message: string): void {
    this.ionicUtilService.showToast({
      message,
      duration: 1800,
      color: 'danger',
    });
  }

  private async showPremiumSuccessAlert(): Promise<void> {
    const alertOptions: AlertOptions = {
      header: 'Bienvenido a Premium',
      message:
        'Ya tienes funciones premium activas, sin anuncios y limites ampliados.',
      buttons: ['Empezar'],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }

  private async showSyncWarningAlert(): Promise<void> {
    const alertOptions: AlertOptions = {
      header: 'Compra detectada',
      message:
        'No se pudo sincronizar premium con el backend. Pulsa Restaurar compras para completar la activacion.',
      buttons: ['Entendido'],
    };
    await this.ionicUtilService.showAlert(alertOptions);
  }
}
