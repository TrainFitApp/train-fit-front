import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { TrainerClientsApiService } from 'src/app/features/clients/services/trainer-clients-api.service';
import { TrainerBillingApiService } from 'src/app/features/subscription/services/trainer-billing-api.service';
import { TrainerEntitlements } from 'src/app/features/subscription/models/trainer-entitlements.model';
import { trainerBillingSummary, trainerPlanName } from 'src/app/features/subscription/trainer-billing-view.util';
import { LINKS } from 'src/app/shared/constants/links';
import { environment } from '../../../environments/environment';

interface SecurityItem {
  label: string;
  sub: string;
  icon: string;
  action: () => void;
  danger?: boolean;
}

interface SupportLink {
  label: string;
  icon: string;
  action: () => void;
}

type SuggestionCategoryKey = 'suggestion' | 'bug' | 'other';

interface SuggestionCategory {
  key: SuggestionCategoryKey;
  label: string;
  icon: string;
}

const SUGGESTION_CATEGORY_TAG: Record<SuggestionCategoryKey, string> = {
  suggestion: 'Sugerencia',
  bug: 'Error',
  other: 'Otro',
};

// "Mi cuenta" — antes reutilizaba el ProfilePage compartido con
// train-fit-front/train-fit-management (pantalla de macros/dieta/premium del
// CONSUMIDOR, casi vacía para un rol de entrenador). Página local propia de
// esta app: solo servicios de datos compartidos (UserService/AuthService),
// nunca el componente de pantalla compartido — así no afecta a las otras 2
// apps del monorepo. Ver MVP-trainers/tareas-grandes/TAREA5.
//
// Rediseño 2026-09 (mockup "TrainFit Panel"). Solo funciones reales: 2FA,
// dispositivos conectados, cerrar sesiones activas, exportar datos y
// "Centro de ayuda" se quitaron de aquí (2026-09-18) porque no existen en el
// backend — mostrarlas con un toast de "próximamente" invitaba al entrenador
// a tocar algo que no hacía nada. Si se implementan de verdad, vuelven a
// securityItems/supportLinks con su action real, no con comingSoon().
@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
})
export class AccountPage implements OnInit {
  private readonly translate = inject(TranslateService);

  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly ionicUtilService = inject(IonicUtilService);
  private readonly router = inject(Router);
  private readonly trainerClientsApi = inject(TrainerClientsApiService);
  private readonly trainerBillingApi = inject(TrainerBillingApiService);
  private readonly navigationService = inject(NavigationService);

  public readonly user = this.userService.localUser;
  public readonly LINKS = LINKS;
  public readonly appVersion = environment.APP_VERSION;

  public showEditPanel = false;
  public isSavingProfile = false;
  public formName = '';
  public formLastname = '';

  public showSuggestionPanel = false;
  public isSendingSuggestion = false;
  public suggestionCategory: SuggestionCategoryKey = 'suggestion';
  public suggestionMessage = '';
  public readonly suggestionMinLength = 20;
  public readonly suggestionCategories: SuggestionCategory[] = [
    { key: 'suggestion', label: this.translate.instant('ACCOUNT.SUGERENCIA'), icon: 'bulb-outline' },
    { key: 'bug', label: this.translate.instant('COMMON.ERROR'), icon: 'bug-outline' },
    { key: 'other', label: this.translate.instant('ACCOUNT.OTRO'), icon: 'chatbubble-ellipses-outline' },
  ];

  public clientsCount: number | null = null;
  public lifetimeClientsCount: number | null = null;
  public entitlements: TrainerEntitlements | null = null;

  public readonly securityItems: SecurityItem[] = [
    {
      label: this.translate.instant('ACCOUNT.CAMBIAR_CONTRASENA'),
      sub: this.translate.instant('ACCOUNT.RECIBIRAS_UN_CODIGO_POR_EMAIL'),
      icon: 'key-outline',
      action: () => this.navigationService.goToRestorePasswordPage(),
    },
    {
      label: this.translate.instant('ACCOUNT.ELIMINAR_CUENTA'),
      sub: this.translate.instant('ACCOUNT.ACCION_IRREVERSIBLE'),
      icon: 'trash-outline',
      danger: true,
      action: () => this.deleteAccount(),
    },
  ];

  public readonly supportLinks: SupportLink[] = [
    {
      label: this.translate.instant('ACCOUNT.ENVIAR_SUGERENCIA_INCIDENCIA'),
      icon: 'chatbubbles-outline',
      action: () => this.openSuggestionPanel(),
    },
  ];

  public get initials(): string {
    const user = this.user();
    if (!user?.name) return '?';
    const first = user.name.charAt(0) || '';
    const last = user.lastname?.charAt(0) || '';
    return (first + last).toUpperCase() || '?';
  }

  public get fullName(): string {
    const user = this.user();
    if (!user?.name) return this.translate.instant('ACCOUNT.TU_CUENTA');
    return `${user.name} ${user.lastname || ''}`.trim();
  }

  public get planName(): string {
    return trainerPlanName(this.entitlements);
  }

  public get billingSummary() { return trainerBillingSummary(this.entitlements); }

  // Plazas en uso (ocupadas + reservadas por invitaciones) sobre las contratadas.
  public get usedSeats(): number {
    const seats = this.entitlements?.seats;
    return seats ? seats.occupied + seats.reserved : 0;
  }

  public get usagePercent(): number {
    const capacity = this.entitlements?.seats.capacity;
    if (!capacity) return 0;
    return Math.min(100, Math.round((this.usedSeats / capacity) * 100));
  }

  public ngOnInit(): void {
    this.refresh();
  }

  public ionViewWillEnter(): void {
    this.refresh();
  }

  private refresh(): void {
    this.trainerClientsApi.getMyClients().subscribe({
      next: (clients) => (this.clientsCount = clients.length),
      error: () => (this.clientsCount = null),
    });

    this.trainerClientsApi.getLifetimeClientsCount().subscribe({
      next: ({ total }) => (this.lifetimeClientsCount = total),
      error: () => (this.lifetimeClientsCount = null),
    });

    this.trainerBillingApi.getEntitlements().subscribe({
      next: (entitlements) => (this.entitlements = entitlements),
      error: () => (this.entitlements = null),
    });
  }

  // Cobros a clientes (lo que te pagan ellos), no la suscripción a TrainFit.
  public goToPayments(): void {
    void this.router.navigate(['/tabs/account/payments']);
  }

  public goToSubscription(): void {
    void this.router.navigate(['/tabs/subscription']);
  }

  public openEditPanel(): void {
    const user = this.user();
    this.formName = user?.name || '';
    this.formLastname = user?.lastname || '';
    this.showEditPanel = true;
  }

  public closeEditPanel(): void {
    this.showEditPanel = false;
  }

  public saveProfile(): void {
    const user = this.user();
    if (!user || !this.formName.trim() || !this.formLastname.trim()) return;

    const userToUpdate: Partial<User> = { _id: user._id };
    if (this.formName.trim() !== user.name) userToUpdate.name = this.formName.trim();
    if (this.formLastname.trim() !== user.lastname) userToUpdate.lastname = this.formLastname.trim();

    if (Object.keys(userToUpdate).length === 1) {
      this.showEditPanel = false;
      return;
    }

    this.isSavingProfile = true;
    this.userService.updateUser(userToUpdate as User).subscribe({
      next: () => {
        this.isSavingProfile = false;
        this.showEditPanel = false;
        void this.ionicUtilService.showToast({
          message: this.translate.instant('ACCOUNT.PERFIL_ACTUALIZADO'),
          color: 'success',
          duration: 2000,
        });
      },
      error: () => {
        this.isSavingProfile = false;
        void this.ionicUtilService.showToast({
          message: this.translate.instant('ACCOUNT.NO_SE_PUDO_ACTUALIZAR_EL'),
          color: 'danger',
          duration: 2000,
        });
      },
    });
  }

  public async confirmLogout(): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('ACCOUNT.CERRAR_SESION'),
      message: this.translate.instant('ACCOUNT.SEGURO_QUE_QUIERES_CERRAR_SESION'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('ACCOUNT.CERRAR_SESION'),
          cssClass: 'alert-button-danger',
          handler: () => this.authService.logout(),
        },
      ],
    });
  }

  public openSuggestionPanel(): void {
    this.suggestionCategory = 'suggestion';
    this.suggestionMessage = '';
    this.showSuggestionPanel = true;
  }

  public closeSuggestionPanel(): void {
    if (this.isSendingSuggestion) return;
    this.showSuggestionPanel = false;
  }

  public selectSuggestionCategory(key: SuggestionCategoryKey): void {
    this.suggestionCategory = key;
  }

  public submitSuggestion(): void {
    const trimmed = this.suggestionMessage.trim();
    if (trimmed.length < this.suggestionMinLength || this.isSendingSuggestion) return;

    const tag = SUGGESTION_CATEGORY_TAG[this.suggestionCategory];
    const email = this.user()?.email || '';

    this.isSendingSuggestion = true;
    this.userService.sendSuggestions(email, `[${tag}] ${trimmed}`).subscribe({
      next: () => {
        this.isSendingSuggestion = false;
        this.showSuggestionPanel = false;
        void this.ionicUtilService.showToast({
          message: this.translate.instant('ACCOUNT.GRACIAS_POR_TU_MENSAJE'),
          color: 'success',
          duration: 2000,
        });
      },
      error: () => {
        this.isSendingSuggestion = false;
        void this.ionicUtilService.showToast({
          message: this.translate.instant('ACCOUNT.NO_SE_PUDO_ENVIAR_INTENTALO'),
          color: 'danger',
          duration: 2500,
        });
      },
    });
  }

  // Mismo flujo que ConfigurationPage.deleteAccount() (shared-features): esa
  // pantalla ya no es alcanzable desde trainers (ver shell-routing.module.ts),
  // pero la acción sigue siendo real — verifyPassword/deleteById son
  // endpoints genéricos, no específicos de un rol.
  public deleteAccount(): void {
    const user = this.user();
    if (!user) return;

    if (user.provider) {
      this.confirmDeleteAccountWithoutPassword(user._id);
      return;
    }

    void this.ionicUtilService.showAlert({
      header: this.translate.instant('ACCOUNT.ELIMINAR_CUENTA'),
      message: this.translate.instant('ACCOUNT.ESTA_ACCION_ES_IRREVERSIBLE_INTRODUCE'),
      inputs: [{ name: 'password', type: 'password', placeholder: this.translate.instant('ACCOUNT.CONTRASENA') }],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          cssClass: 'alert-button-danger',
          handler: (data) => {
            if (!data?.password) {
              void this.ionicUtilService.showToast({
                message: this.translate.instant('ACCOUNT.INTRODUCE_TU_CONTRASENA'),
                color: 'warning',
                duration: 2000,
              });
              return false;
            }

            this.userService.verifyPassword(data.password).subscribe({
              next: () => this.performAccountDeletion(user._id),
              error: () => {
                void this.ionicUtilService.showToast({
                  message: this.translate.instant('ACCOUNT.CONTRASENA_INCORRECTA'),
                  color: 'danger',
                  duration: 2500,
                });
              },
            });
            return true;
          },
        },
      ],
    });
  }

  // Cuentas Google/Apple no tienen contraseña propia que pedir: en su lugar,
  // se exige escribir la palabra de confirmación tal cual (mismo criterio que
  // ConfigurationPage).
  private confirmDeleteAccountWithoutPassword(userId: string): void {
    const confirmWord = 'ELIMINAR';

    void this.ionicUtilService.showAlert({
      header: this.translate.instant('ACCOUNT.ELIMINAR_CUENTA'),
      message: this.translate.instant('ACCOUNT.ESTA_ACCION_ES_IRREVERSIBLE_ESCRIBE', { confirmWord }),
      inputs: [{ name: 'confirmWord', type: 'text', placeholder: confirmWord }],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          cssClass: 'alert-button-danger',
          handler: (data) => {
            const typed = (data?.confirmWord || '').trim().toUpperCase();
            if (typed !== confirmWord) {
              void this.ionicUtilService.showToast({
                message: this.translate.instant('ACCOUNT.ESCRIBE_PARA_CONFIRMAR', { confirmWord }),
                color: 'warning',
                duration: 2200,
              });
              return false;
            }

            this.performAccountDeletion(userId);
            return true;
          },
        },
      ],
    });
  }

  private performAccountDeletion(userId: string): void {
    this.userService.deleteById(userId).subscribe({
      next: () => this.authService.logout(),
      error: () => {
        void this.ionicUtilService.showToast({
          message: this.translate.instant('ACCOUNT.NO_SE_PUDO_ELIMINAR_LA'),
          color: 'danger',
          duration: 2500,
        });
      },
    });
  }
}
