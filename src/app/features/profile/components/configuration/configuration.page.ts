import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertButton, AlertOptions, ModalOptions } from '@ionic/angular';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BillingService } from 'src/app/core/services/billing/billing.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { PAYWALL_RESULT } from '@revenuecat/purchases-capacitor-ui';
import { Theme } from 'src/app/shared/models/theme';
import { AdPreferencesPage } from './components/ad-preferences/ad-preferences.page';
import { NutritionEditorPage } from './components/editor/components/nutrition-editor/nutrition-editor.page';
import { EditorPage } from './components/editor/editor.page';
import { BillingEntitlements } from 'src/app/core/models/billing-entitlements';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage {
  public user: User;

  public theme: Theme;
  public readonly isBillingAvailable: boolean;
  public isPremium: boolean = false;
  public isLoadingPremiumData: boolean = false;
  public isPurchasingMonthly: boolean = false;
  public isPurchasingAnnual: boolean = false;
  public isPresentingPaywall: boolean = false;
  public isRestoringPurchases: boolean = false;
  public isOpeningCustomerCenter: boolean = false;
  public monthlyPriceLabel: string = 'No disponible';
  public annualPriceLabel: string = 'No disponible';
  public entitlements: BillingEntitlements | null = null;

  public THEMES = Theme;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly themeService: ThemeService,
    private readonly utilService: UtilService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly billingService: BillingService,
    private readonly authService: AuthService,
    private readonly tableService: TableService,
    private readonly dietService: DietService,
    private readonly workoutService: WorkoutService,
    private readonly navigationService: NavigationService,
  ) {
    this.theme = this.themeService.getTheme;
    this.user = this.userService.getLocalUser;
    this.isBillingAvailable = this.billingService.isBillingEnabled;
    this.isPremium = !!this.user?.isPremium;
  }

  public ionViewWillEnter(): void {
    void this.loadPremiumData();
  }

  public toggleColor(): void {
    this.theme =
      this.theme === this.THEMES.light ? this.THEMES.dark : this.THEMES.light;
    this.themeService.toggleColorMode(this.theme);

    this.user.theme = this.theme;
    this.userService
      .updateUser(this.user)
      .subscribe((resUser) => (this.user = resUser));
  }

  public logout(): void {
    const alertOptions = {
      header: 'Cerrar sesión',
      message: '¿Estás seguro de cerrar sesión?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'CONFIRMAR',
          cssClass: 'alert-button-primary',
          handler: () => {
            this.userService.setLocalUser = null;
            this.workoutService.setCurrentWorkout = null;
            this.dietService.setCurrentDiet = null;
            this.tableService.setCurrentTable = null;
            this.authService.logout();
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public goToRestorePassword(): void {
    this.navigationService.goToRestorePasswordPage();
  }

  public async goToAdConsent(): Promise<void> {
    const modal: ModalOptions = {
      component: AdPreferencesPage,
      cssClass: 'fullscreen-modal',
    };

    const res: any = await this.ionicUtilService.showModal(modal);
    if (res?.data === undefined || res?.data === null) return;

    const selectedOption = !!res.data;
    if (this.user?.personalAds === selectedOption) return;

    const updatedUser: User = {
      ...this.user,
      personalAds: selectedOption,
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: (userUpdated) => {
        this.user = userUpdated;
        this.ionicUtilService.showToast({
          message: 'Preferencias de anuncios actualizadas',
          duration: 1400,
          color: 'success',
        });
      },
      error: () => {
        this.ionicUtilService.showToast({
          message: 'No se pudieron guardar las preferencias',
          duration: 1600,
          color: 'danger',
        });
      },
    });
  }

  public openTrainers(): void {
    const header = 'Modo entrenadores';
    const message = 'No disponible';
    const buttons: AlertButton[] = [
      {
        text: 'OK',
        cssClass: 'alert-button-primary',
      },
    ];

    const alertOptions: AlertOptions = {
      header: header,
      message: message,
      buttons: buttons,
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public deleteAccount(): void {
    const alertOptions = {
      header: 'Eliminar cuenta',
      message: 'Esta acción no se puede deshacer',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          handler: () => {
            this.userService.deleteById(this.user._id).subscribe((_) => {
              this.authService.logout();
            });
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public close(): void {
    this.navigationService.goBack();
  }

  public editNutritionalGoals(): void {
    const modal: ModalOptions = {
      component: NutritionEditorPage,
      cssClass: 'fullscreen-modal'
    }

    this.ionicUtilService.showModal(modal);
  }

  public editPersonalData(): void {
    const modal: ModalOptions = {
      component: EditorPage
    }

    this.ionicUtilService.showModal(modal);
  }

  public openConcepts(): void {
    this.navigationService.gotoConcepts();
  }

  public openSuggestions(): void {
    this.navigationService.goToSuggestions();
  }

  public openReferences(): void {
    this.navigationService.goToReferences();
  }

  public openPremiumPage(): void {
    this.navigationService.goToPremium();
  }

  public async openPremiumPaywall(): Promise<void> {
    if (!this.isBillingAvailable || this.isPresentingPaywall) {
      return;
    }

    this.isPresentingPaywall = true;
    try {
      const paywallResult = await this.billingService.presentPaywallIfNeeded();

      if (paywallResult === PAYWALL_RESULT.PURCHASED) {
        this.showSuccessToast('Suscripción activada correctamente');
      } else if (paywallResult === PAYWALL_RESULT.RESTORED) {
        this.showSuccessToast('Compra restaurada correctamente');
      } else if (paywallResult === PAYWALL_RESULT.NOT_PRESENTED) {
        this.showSuccessToast('Ya tienes acceso premium activo');
      } else if (paywallResult === PAYWALL_RESULT.ERROR) {
        this.showErrorToast('No se pudo abrir el paywall, inténtalo de nuevo');
      }
    } finally {
      const currentInfo = await this.billingService.getCustomerInfo();
      await this.billingService.syncEntitlementsWithBackend(currentInfo);
      this.isPresentingPaywall = false;
      await this.loadPremiumData();
    }
  }

  public async purchaseMonthlyPlan(): Promise<void> {
    await this.purchasePlan('monthly');
  }

  public async purchaseAnnualPlan(): Promise<void> {
    await this.purchasePlan('annual');
  }

  public async restorePurchases(): Promise<void> {
    if (!this.isBillingAvailable || this.isRestoringPurchases) {
      return;
    }

    this.isRestoringPurchases = true;
    try {
      const customerInfo = await this.billingService.restorePurchases();
      const entitlements = await this.billingService.syncEntitlementsWithBackend(
        customerInfo
      );
      const hasPremium = !!entitlements?.isPremium;
      this.applyPremiumState(hasPremium, entitlements);

      if (hasPremium) {
        this.showSuccessToast('Compra restaurada correctamente');
      } else {
        this.showErrorToast('No se encontraron compras para restaurar');
      }
    } finally {
      this.isRestoringPurchases = false;
      await this.loadPremiumData();
    }
  }

  public async openCustomerCenter(): Promise<void> {
    if (!this.isBillingAvailable || this.isOpeningCustomerCenter) {
      return;
    }

    this.isOpeningCustomerCenter = true;
    try {
      const opened = await this.billingService.presentCustomerCenter();
      if (!opened) {
        this.showErrorToast('No se pudo abrir la gestión de suscripción');
      }
    } finally {
      this.isOpeningCustomerCenter = false;
      await this.loadPremiumData();
    }
  }

  private async purchasePlan(plan: 'monthly' | 'annual'): Promise<void> {
    if (!this.isBillingAvailable) {
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
        this.showErrorToast(
          'No hay producto disponible en el offering actual. Abre el paywall.'
        );
        return;
      }

      const entitlements = await this.billingService.syncEntitlementsWithBackend(
        customerInfo
      );
      const hasPremium = !!entitlements?.isPremium;
      this.applyPremiumState(hasPremium, entitlements);

      if (hasPremium) {
        this.showSuccessToast('Premium activado correctamente');
      } else {
        this.showErrorToast(
          'La compra no activó el entitlement. Revisa RevenueCat.'
        );
      }
    } catch (error) {
      console.error('Error purchasing plan', error);
      this.showErrorToast('Error en la compra. Inténtalo de nuevo');
    } finally {
      this.isPurchasingMonthly = false;
      this.isPurchasingAnnual = false;
      await this.loadPremiumData();
    }
  }

  private async loadPremiumData(): Promise<void> {
    if (!this.isBillingAvailable || this.isLoadingPremiumData) {
      return;
    }

    this.isLoadingPremiumData = true;
    try {
      const [currentOffering, entitlements] = await Promise.all([
        this.billingService.getCurrentOffering(),
        this.billingService.getBackendEntitlements(),
      ]);

      this.entitlements = entitlements;
      const hasPremium = !!entitlements?.isPremium;
      this.applyPremiumState(hasPremium, entitlements);
      this.annualPriceLabel =
        currentOffering?.annual?.product?.priceString || 'No disponible';
      this.monthlyPriceLabel =
        currentOffering?.monthly?.product?.priceString || 'No disponible';
    } catch (error) {
      console.error('Error loading premium data', error);
      this.showErrorToast('No se pudo cargar el estado premium');
    } finally {
      this.isLoadingPremiumData = false;
    }
  }

  private applyPremiumState(
    isPremium: boolean,
    entitlements?: BillingEntitlements | null
  ): void {
    this.isPremium = isPremium;
    if (entitlements) {
      this.entitlements = entitlements;
    }
    if (!this.user) {
      return;
    }

    this.user = {
      ...this.user,
      isPremium,
      premium: {
        entitled: isPremium,
        plan: entitlements?.plan || null,
        expiresAt: entitlements?.expiresAt || null,
        source: entitlements?.source || 'backend',
        lastSyncAt: new Date().toISOString(),
      },
    };
    this.userService.setLocalUser = this.user;
  }

  private showSuccessToast(message: string): void {
    this.ionicUtilService.showToast({
      message,
      duration: 1600,
      color: 'success',
    });
  }

  private showErrorToast(message: string): void {
    this.ionicUtilService.showToast({
      message,
      duration: 1800,
      color: 'danger',
    });
  }

  // Links constants
  public LINKS = {
    privacyAndPolicy: 'https://trainfit.net/#/politicas',
    us: 'https://trainfit.net/#/SobreNosotros',
    termsAndConditions: 'https://trainfit.net/#/terminosycondiciones',
  };
}
