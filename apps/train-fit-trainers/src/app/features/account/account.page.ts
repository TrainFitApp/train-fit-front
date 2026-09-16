import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { TrainerClientsApiService } from 'src/app/features/clients/services/trainer-clients-api.service';
import { TrainerBillingApiService } from 'src/app/features/subscription/services/trainer-billing-api.service';
import {
  TrainerEntitlements,
  TrainerTier,
} from 'src/app/features/subscription/models/trainer-entitlements.model';
import { LINKS } from 'src/app/shared/constants/links';
import { environment } from '../../../environments/environment';

const PLAN_NAMES: Record<TrainerTier, string> = {
  free: 'Free',
  trainer_pro: 'Pro',
  trainer_unlimited: 'Unlimited',
};

interface SecurityItem {
  label: string;
  sub: string;
  icon: string;
  action: () => void;
  danger?: boolean;
}

interface NotificationItem {
  label: string;
  on: boolean;
}

interface NotificationGroup {
  title: string;
  items: NotificationItem[];
}

interface IntegrationItem {
  name: string;
  icon: string;
}

interface SupportLink {
  label: string;
  icon: string;
  action: () => void;
}

// "Mi cuenta" — antes reutilizaba el ProfilePage compartido con
// train-fit-front/train-fit-management (pantalla de macros/dieta/premium del
// CONSUMIDOR, casi vacía para un rol de entrenador). Página local propia de
// esta app: solo servicios de datos compartidos (UserService/AuthService),
// nunca el componente de pantalla compartido — así no afecta a las otras 2
// apps del monorepo. Ver MVP-trainers/tareas-grandes/TAREA5.
//
// Rediseño 2026-09 (mockup "TrainFit Panel"): las secciones nuevas mezclan
// datos reales (perfil básico, nº de clientes, plan/suscripción) con
// funciones que todavía no existen en el backend (disponibilidad,
// integraciones, 2FA, notificaciones propias de trainer). Estas últimas se
// muestran solo a nivel visual — el tap dispara comingSoon() en vez de
// fingir una acción que no hace nada, mismo patrón que ya usa
// SubscriptionPage.subscribe() para los pagos in-app.
@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
})
export class AccountPage implements OnInit {
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
  public formEmail = '';

  public clientsCount: number | null = null;
  public entitlements: TrainerEntitlements | null = null;

  // Campos de perfil profesional que el modelo de usuario aún no tiene
  // (teléfono, ciudad, país, especialidad, años de experiencia,
  // certificaciones) — se muestran como "Sin definir" en vez de inventar un
  // valor, hasta que el backend los soporte.
  public readonly professionalPlaceholderFields = [
    'Teléfono',
    'Ciudad',
    'País',
    'Especialidad principal',
    'Años de experiencia',
    'Certificaciones',
  ];

  public readonly weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  public readonly securityItems: SecurityItem[] = [
    {
      label: 'Cambiar contraseña',
      sub: 'Recibirás un código por email para confirmarlo',
      icon: 'key-outline',
      action: () => this.navigationService.goToRestorePasswordPage(),
    },
    {
      label: 'Verificación en dos pasos (2FA)',
      sub: 'Añade una capa extra de seguridad',
      icon: 'shield-checkmark-outline',
      action: () => this.comingSoon(),
    },
    {
      label: 'Dispositivos conectados',
      sub: 'Revisa dónde has iniciado sesión',
      icon: 'phone-portrait-outline',
      action: () => this.comingSoon(),
    },
    {
      label: 'Cerrar sesiones activas',
      sub: 'Cierra sesión en todos los dispositivos',
      icon: 'log-out-outline',
      action: () => this.comingSoon(),
    },
    {
      label: 'Exportar mis datos',
      sub: 'Descarga una copia de tu información',
      icon: 'download-outline',
      action: () => this.comingSoon(),
    },
    {
      label: 'Eliminar cuenta',
      sub: 'Acción irreversible',
      icon: 'trash-outline',
      danger: true,
      action: () => this.deleteAccount(),
    },
  ];

  public readonly notificationGroups: NotificationGroup[] = [
    {
      title: 'Clientes',
      items: [
        { label: 'Nuevo cliente', on: true },
        { label: 'Cliente vinculado', on: true },
        { label: 'Cliente desvinculado', on: false },
      ],
    },
    {
      title: 'Check-ins',
      items: [
        { label: 'Check-in recibido', on: true },
        { label: 'Check-in pendiente', on: true },
        { label: 'Check-in atrasado', on: true },
      ],
    },
    {
      title: 'Mensajes',
      items: [
        { label: 'Nuevo mensaje', on: true },
        { label: 'Recordatorios', on: false },
      ],
    },
    {
      title: 'Sistema',
      items: [
        { label: 'Actualizaciones', on: true },
        { label: 'Novedades', on: false },
      ],
    },
  ];

  public readonly integrations: IntegrationItem[] = [
    { name: 'Apple Health', icon: 'heart-outline' },
    { name: 'Google Fit', icon: 'fitness-outline' },
    { name: 'Garmin', icon: 'watch-outline' },
    { name: 'Strava', icon: 'bicycle-outline' },
  ];

  public readonly supportLinks: SupportLink[] = [
    { label: 'Centro de ayuda', icon: 'help-circle-outline', action: () => this.comingSoon() },
    {
      label: 'Enviar sugerencia o incidencia',
      icon: 'chatbubbles-outline',
      action: () => this.sendSupportMessage(),
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
    if (!user?.name) return 'Tu cuenta';
    return `${user.name} ${user.lastname || ''}`.trim();
  }

  public get planName(): string {
    const tier = this.entitlements?.tier;
    return tier ? PLAN_NAMES[tier] : '—';
  }

  public get usagePercent(): number {
    const limit = this.entitlements?.limits.clients;
    const used = this.entitlements?.usage.clients || 0;
    if (!limit) return 0;
    return Math.min(100, Math.round((used / limit) * 100));
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

    this.trainerBillingApi.getEntitlements().subscribe({
      next: (entitlements) => (this.entitlements = entitlements),
      error: () => (this.entitlements = null),
    });
  }

  public goToSubscription(): void {
    void this.router.navigate(['/tabs/subscription']);
  }

  public openEditPanel(): void {
    const user = this.user();
    this.formName = user?.name || '';
    this.formLastname = user?.lastname || '';
    this.formEmail = user?.email || '';
    this.showEditPanel = true;
  }

  public closeEditPanel(): void {
    this.showEditPanel = false;
  }

  public saveProfile(): void {
    const user = this.user();
    if (!user || !this.formName.trim() || !this.formLastname.trim() || !this.formEmail.trim()) return;

    const userToUpdate: Partial<User> = { _id: user._id };
    if (this.formName.trim() !== user.name) userToUpdate.name = this.formName.trim();
    if (this.formLastname.trim() !== user.lastname) userToUpdate.lastname = this.formLastname.trim();
    if (this.formEmail.trim() !== user.email) userToUpdate.email = this.formEmail.trim();

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
          message: 'Perfil actualizado',
          color: 'success',
          duration: 2000,
        });
      },
      error: () => {
        this.isSavingProfile = false;
        void this.ionicUtilService.showToast({
          message: 'No se pudo actualizar el perfil',
          color: 'danger',
          duration: 2000,
        });
      },
    });
  }

  public async confirmLogout(): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Cerrar sesión',
      message: '¿Seguro que quieres cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cerrar sesión',
          cssClass: 'alert-button-danger',
          handler: () => this.authService.logout(),
        },
      ],
    });
  }

  public comingSoon(): void {
    void this.ionicUtilService.showToast({
      message: 'Esta función estará disponible próximamente',
      duration: 2000,
    });
  }

  public sendSupportMessage(): void {
    void this.ionicUtilService.showAlert({
      header: 'Enviar sugerencia o incidencia',
      message: 'Cuéntanos qué falla o qué te gustaría ver en la app.',
      inputs: [
        {
          name: 'message',
          type: 'textarea',
          placeholder: 'Escribe aquí tu mensaje (mínimo 20 caracteres)',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Enviar',
          cssClass: 'alert-button-primary',
          handler: (data) => {
            const message = (data?.message || '').trim();
            if (message.length < 20) {
              void this.ionicUtilService.showToast({
                message: 'Escribe al menos 20 caracteres',
                color: 'warning',
                duration: 2000,
              });
              return false;
            }

            const email = this.user()?.email || '';
            this.userService.sendSuggestions(email, message).subscribe({
              next: () => {
                void this.ionicUtilService.showToast({
                  message: '¡Gracias por tu mensaje!',
                  color: 'success',
                  duration: 2000,
                });
              },
              error: () => {
                void this.ionicUtilService.showToast({
                  message: 'No se pudo enviar, inténtalo de nuevo',
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
      header: 'Eliminar cuenta',
      message: 'Esta acción es irreversible. Introduce tu contraseña para confirmar.',
      inputs: [{ name: 'password', type: 'password', placeholder: 'Contraseña' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          cssClass: 'alert-button-danger',
          handler: (data) => {
            if (!data?.password) {
              void this.ionicUtilService.showToast({
                message: 'Introduce tu contraseña',
                color: 'warning',
                duration: 2000,
              });
              return false;
            }

            this.userService.verifyPassword(data.password).subscribe({
              next: () => this.performAccountDeletion(user._id),
              error: () => {
                void this.ionicUtilService.showToast({
                  message: 'Contraseña incorrecta',
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
      header: 'Eliminar cuenta',
      message: `Esta acción es irreversible. Escribe "${confirmWord}" para confirmar.`,
      inputs: [{ name: 'confirmWord', type: 'text', placeholder: confirmWord }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          cssClass: 'alert-button-danger',
          handler: (data) => {
            const typed = (data?.confirmWord || '').trim().toUpperCase();
            if (typed !== confirmWord) {
              void this.ionicUtilService.showToast({
                message: `Escribe "${confirmWord}" para confirmar`,
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
          message: 'No se pudo eliminar la cuenta',
          color: 'danger',
          duration: 2500,
        });
      },
    });
  }
}
