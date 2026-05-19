import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertOptions, InfiniteScrollCustomEvent } from '@ionic/angular';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  finalize,
} from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  AdminPremiumDuration,
  BillingApiService,
} from 'src/app/core/services/billing/billing-api.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UserAPIService } from 'src/app/core/services/user/user-api.service';
import { UsersFilterPage } from './users-filter.page';
import { UsersFilter } from './users-filter.model';

export interface DashboardUser extends User {
  productsCount?: number;
  exercisesCount?: number;
  hasWorkoutInUse?: boolean;
  hasTableInUse?: boolean;
  hasDietInUse?: boolean;
  tableSplitsCount?: number;
  dietDaysCount?: number;
  matchCount?: number;
}

@Component({
  selector: 'app-profile-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class ProfileUsersPage implements OnInit, OnDestroy {
  private static readonly PAGE_SIZE = 10;

  public users: DashboardUser[] = [];
  public totalUsers = 0;
  public search = '';
  public filters: UsersFilter = new UsersFilter();
  public isLoading = false;
  public hasMoreUsers = true;
  public removingHashUserIds = new Set<string>();
  public grantingPremiumUserIds = new Set<string>();
  public extendingPremiumUserIds = new Set<string>();
  public revokingPremiumUserIds = new Set<string>();
  public localUserId: string | null = null;

  private currentPage = 0;
  private readonly search$ = new Subject<string>();
  private readonly subscriptions = new Subscription();
  private usersRequestSubscription?: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly billingApiService: BillingApiService,
    private readonly authService: AuthService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly navigationService: NavigationService,
    private readonly userAPIService: UserAPIService
  ) { }

  public ngOnInit(): void {
    const localUser = this.userService.getLocalUser;
    if (!localUser?.roles?.includes('admin')) {
      this.navigationService.goBack();
      return;
    }

    this.localUserId = localUser?._id ?? null;

    this.subscriptions.add(
      this.search$
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((value) => {
          this.search = value;
          this.resetAndLoadUsers();
        })
    );

    this.loadUsers();
  }

  public ngOnDestroy(): void {
    this.usersRequestSubscription?.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public onSearchChange(event: CustomEvent): void {
    this.search$.next(event.detail.value ?? '');
  }

  public async openFilterModal(): Promise<void> {
    const res = await this.ionicUtilService.showModal({
      component: UsersFilterPage,
      cssClass: 'mini-modal',
      componentProps: {
        usersFilter: { ...this.filters },
      },
    });

    if (res?.data?.usersFilter) {
      this.filters = res.data.usersFilter;
      this.resetAndLoadUsers();
    }
  }

  public trackByUser(index: number, user: User): string {
    return user._id || `${user.email}-${index}`;
  }

  public loadMoreUsers(event: Event): void {
    if (!this.hasMoreUsers || this.isLoading) {
      (event as InfiniteScrollCustomEvent).target.complete();
      return;
    }

    this.currentPage += 1;
    this.loadUsers((event as InfiniteScrollCustomEvent).target);
  }

  public getUserFullName(user: User): string {
    return `${user?.name ?? ''} ${user?.lastname ?? ''}`.trim() || 'Sin nombre';
  }

  public isPremiumUser(user: User): boolean {
    return user?.premium?.entitled === true;
  }

  public isManualPremiumUser(user: User): boolean {
    return user?.premium?.entitled === true && user?.premium?.source === 'manual';
  }

  public isStorePremiumUser(user: User): boolean {
    return this.isPremiumUser(user) && !this.isManualPremiumUser(user);
  }

  public hasUserHash(user: User): boolean {
    return Boolean(user?.hash);
  }

  public isRemovingUserHash(user: User): boolean {
    return Boolean(user?._id && this.removingHashUserIds.has(user._id));
  }

  public isGrantingPremium(user: User): boolean {
    return Boolean(user?._id && this.grantingPremiumUserIds.has(user._id));
  }

  public isExtendingPremium(user: User): boolean {
    return Boolean(user?._id && this.extendingPremiumUserIds.has(user._id));
  }

  public isRevokingPremium(user: User): boolean {
    return Boolean(user?._id && this.revokingPremiumUserIds.has(user._id));
  }

  public isPremiumActionRunning(user: User): boolean {
    return (
      this.isGrantingPremium(user) ||
      this.isExtendingPremium(user) ||
      this.isRevokingPremium(user)
    );
  }

  public getPremiumStatusLabel(user: User): string {
    if (this.isManualPremiumUser(user)) {
      return `Pro manual${this.getPremiumExpirationLabel(user)}`;
    }
    if (this.isStorePremiumUser(user)) {
      return `Activo via Store${this.getPremiumExpirationLabel(user)}`;
    }
    return 'Sin Pro';
  }

  public getPremiumExpirationLabel(user: User): string {
    if (!user?.premium?.expiresAt) {
      return '';
    }
    return ` hasta ${new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(user.premium.expiresAt))}`;
  }

  public async confirmGrantPremium(user: User): Promise<void> {
    if (!user?._id || this.isPremiumUser(user) || this.isPremiumActionRunning(user)) {
      return;
    }

    const duration = await this.pickPremiumDuration();
    if (!duration) return;
    this.grantPremium(user, duration);
  }

  public async confirmExtendPremium(user: User): Promise<void> {
    if (!user?._id || !this.isManualPremiumUser(user) || this.isPremiumActionRunning(user)) {
      return;
    }

    const duration = await this.pickPremiumDuration();
    if (!duration) return;
    this.extendPremium(user, duration);
  }

  public async confirmRevokePremium(user: User): Promise<void> {
    if (!user?._id || !this.isManualPremiumUser(user) || this.isPremiumActionRunning(user)) {
      return;
    }

    const alertRes = await this.ionicUtilService.showAlert({
      header: 'Revocar',
      message: `Seguro que quieres revocar el Pro manual a ${this.getUserFullName(user)}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Revocar', role: 'confirm' },
      ],
    });

    if (alertRes?.role !== 'confirm') {
      return;
    }

    this.revokePremium(user);
  }

  public async confirmClearUserHash(user: User): Promise<void> {
    if (!user?._id || !this.hasUserHash(user) || this.isRemovingUserHash(user)) {
      return;
    }

    const alertRes = await this.ionicUtilService.showAlert({
      header: 'Eliminar hash',
      message: `Seguro que quieres eliminar el hash de ${this.getUserFullName(user)}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'confirm' },
      ],
    });

    if (alertRes?.role !== 'confirm') {
      return;
    }

    this.clearUserHash(user);
  }

  public async changeUserRole(user: DashboardUser, roles: string[]): Promise<void> {
    if (!user?._id) return;

    const label = roles.includes('admin') ? 'Admin' : 'Usuario';
    const prevLabel = user.roles?.includes('admin') ? 'Admin' : 'Usuario';

    const alertRes = await this.ionicUtilService.showAlert({
      header: 'Cambiar rol',
      message: `¿Cambiar rol de <b>${this.getUserFullName(user)}</b> de <b>${prevLabel}</b> a <b>${label}</b>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Cambiar', role: 'confirm' },
      ],
    });

    if (alertRes?.role !== 'confirm') return;

    this.userAPIService.updateUserRoles(user._id, roles).subscribe({
      next: (res) => {
        user.roles = res.roles;
        this.ionicUtilService.showToast({ message: `Rol cambiado a ${label}` });
      },
      error: () => {
        this.ionicUtilService.showToast({ message: 'Error al cambiar rol', color: 'danger' });
      },
    });
  }

  public async openPremiumDetails(user: DashboardUser): Promise<void> {
    if (!user?._id || this.isPremiumActionRunning(user)) {
      return;
    }

    if (!this.isPremiumUser(user)) {
      return this.confirmGrantPremium(user);
    }

    const statusLabel = this.getPremiumStatusLabel(user);
    const isManual = this.isManualPremiumUser(user);

    const buttons: any[] = [];

    if (isManual) {
      buttons.push(

        {
          text: 'Extender',
          handler: () => {
            this.confirmExtendPremium(user);
          },
        }, {
        text: 'Revocar',
        role: 'destructive',
        cssClass: 'alert-button-danger',
        handler: () => {
          this.confirmRevokePremium(user);
        },
      },
      );
    }

    buttons.push({
      text: 'Cerrar',
      role: 'cancel',
    });

    await this.ionicUtilService.showAlert({
      header: 'Detalle Suscripción Pro',
      message: `Estado: ${statusLabel}`,
      cssClass: 'alert-grid-buttons',
      buttons: buttons,
    });
  }

  public clearPremiumFilter(): void {
    if (!this.filters.premiumOnly) {
      return;
    }

    this.filters = {
      ...this.filters,
      premiumOnly: false,
    };
    this.resetAndLoadUsers();
  }

  public clearHashFilter(): void {
    if (!this.filters.withHashOnly) {
      return;
    }

    this.filters = {
      ...this.filters,
      withHashOnly: false,
    };
    this.resetAndLoadUsers();
  }

  public clearActivityFilter(): void {
    if (this.filters.activitySort === null) {
      return;
    }
    this.filters = { ...this.filters, activitySort: null };
    this.resetAndLoadUsers();
  }

  public isUserOnline(user: User): boolean {
    if (!user?.lastLogin) {
      return false;
    }
    const diffMs = Date.now() - new Date(user.lastLogin).getTime();
    return diffMs < 60 * 1000;
  }

  public getLastLoginLabel(user: User): string {
    if (!user?.lastLogin) {
      return 'Sin actividad';
    }
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(user.lastLogin));
  }

  public get hasActiveFilters(): boolean {
    return Boolean(
      this.filters.premiumOnly ||
      this.filters.withHashOnly ||
      this.filters.activitySort !== null
    );
  }

  public get formattedTotalUsers(): string {
    return new Intl.NumberFormat('es-ES').format(this.totalUsers || 0);
  }

  private resetAndLoadUsers(): void {
    this.usersRequestSubscription?.unsubscribe();
    this.isLoading = false;
    this.currentPage = 0;
    this.users = [];
    this.totalUsers = 0;
    this.hasMoreUsers = true;
    this.loadUsers();
  }

  private clearUserHash(user: User): void {
    if (!user?._id) {
      return;
    }

    this.removingHashUserIds.add(user._id);
    this.userService
      .clearUserHash(user._id)
      .pipe(
        finalize(() => {
          this.removingHashUserIds.delete(user._id);
        })
      )
      .subscribe({
        next: async () => {
          if (this.filters.withHashOnly) {
            this.users = this.users.filter(
              (listUser) => listUser._id !== user._id
            );
          } else {
            this.users = this.users.map((listUser) =>
              listUser._id === user._id
                ? { ...listUser, hash: undefined }
                : listUser
            );
          }

          await this.ionicUtilService.showSuccessToast('Hash eliminado');
        },
        error: async (error) => {
          await this.ionicUtilService.showErrorToast(
            error,
            'No se pudo eliminar el hash del usuario'
          );
        },
      });
  }

  private grantPremium(user: User, duration: AdminPremiumDuration): void {
    if (!user?._id) {
      return;
    }

    this.grantingPremiumUserIds.add(user._id);
    this.billingApiService
      .grantPremium(user._id, duration)
      .pipe(
        finalize(() => {
          this.grantingPremiumUserIds.delete(user._id);
        })
      )
      .subscribe({
        next: async (updatedUser) => {
          this.replaceUser(updatedUser);
          await this.ionicUtilService.showSuccessToast('Pro manual activado');
        },
        error: async (error) => {
          await this.ionicUtilService.showErrorToast(
            error,
            'No se pudo activar Pro manual'
          );
        },
      });
  }

  private extendPremium(user: User, duration: AdminPremiumDuration): void {
    if (!user?._id) {
      return;
    }

    this.extendingPremiumUserIds.add(user._id);
    this.billingApiService
      .extendPremium(user._id, duration)
      .pipe(
        finalize(() => {
          this.extendingPremiumUserIds.delete(user._id);
        })
      )
      .subscribe({
        next: async (updatedUser) => {
          this.replaceUser(updatedUser);
          await this.ionicUtilService.showSuccessToast('Pro manual extendido');
        },
        error: async (error) => {
          await this.ionicUtilService.showErrorToast(
            error,
            'No se pudo extender Pro manual'
          );
        },
      });
  }

  private revokePremium(user: User): void {
    if (!user?._id) {
      return;
    }

    this.revokingPremiumUserIds.add(user._id);
    this.billingApiService
      .revokePremium(user._id)
      .pipe(
        finalize(() => {
          this.revokingPremiumUserIds.delete(user._id);
        })
      )
      .subscribe({
        next: async (updatedUser) => {
          this.replaceUser(updatedUser);
          if (this.filters.premiumOnly) {
            this.users = this.users.filter(
              (listUser) => listUser._id !== updatedUser?._id
            );
          }
          await this.ionicUtilService.showSuccessToast('Pro manual revocado');
        },
        error: async (error) => {
          await this.ionicUtilService.showErrorToast(
            error,
            'No se pudo revocar Pro manual'
          );
        },
      });
  }

  private async pickPremiumDuration(): Promise<AdminPremiumDuration | null> {
    const response = await this.ionicUtilService.showActionSheet({
      header: 'Duracion de Pro manual',
      buttons: [
        { text: '1 dia', data: { type: 'preset', value: '1d' } },
        { text: '1 semana', data: { type: 'preset', value: '1w' } },
        { text: '1 mes', data: { type: 'preset', value: '1m' } },
        { text: '1 año', data: { type: 'preset', value: '1y' } },
        { text: 'Fecha personalizada', role: 'custom' },
      ],
    });


    if (response?.role === 'custom') {
      return this.pickCustomExpirationDate();
    }

    return response?.data ?? null;
  }

  private async pickCustomExpirationDate(): Promise<AdminPremiumDuration | null> {
    const response = await this.ionicUtilService.showAlert({
      header: 'Fecha personalizada',
      message: 'Elige fecha y hora de expiracion del Pro manual.',
      inputs: [
        {
          name: 'expiresAt',
          type: 'datetime-local' as any,
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Aplicar', role: 'confirm' },
      ],
    });

    const value = response?.data?.values?.expiresAt;
    if (response?.role !== 'confirm' || !value) {
      return null;
    }

    const expiresAt = new Date(value);
    if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= Date.now()) {
      await this.ionicUtilService.showWarningToast(
        'La fecha debe ser posterior a la actual'
      );
      return null;
    }

    return {
      type: 'customDate',
      expiresAt: expiresAt.toISOString(),
    };
  }

  private replaceUser(updatedUser: User): void {
    this.users = this.users.map((listUser) =>
      listUser._id === updatedUser?._id ? updatedUser : listUser
    );
  }

  public async confirmDeleteUser(user: User): Promise<void> {
    const alertOptions: AlertOptions = {
      header: 'Eliminar usuario',
      message: `Estas seguro que deseas eliminar permanentemente a ${this.getUserFullName(
        user
      )}? Esta accion no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          cssClass: 'alert-button-danger',
        },
      ],
    };

    const alertRes = await this.ionicUtilService.showAlert(alertOptions);
    if (alertRes?.role !== 'confirm') {
      return;
    }

    this.deleteUser(user);
  }

  private deleteUser(user: User): void {
    if (!user?._id) return;

    this.userService.deleteById(user._id).subscribe({
      next: async () => {
        this.users = this.users.filter((u) => u._id !== user._id);
        if (this.totalUsers > 0) this.totalUsers--;
        await this.ionicUtilService.showSuccessToast('Usuario eliminado con exito');
      },
      error: async (error) => {
        await this.ionicUtilService.showErrorToast(
          error,
          'No se pudo eliminar el usuario'
        );
      },
    });
  }

  public async confirmImpersonate(user: User): Promise<void> {
    if (!user?._id) return;

    const localUser = this.userService.getLocalUser;
    if (!localUser?.roles?.includes('admin')) {
      await this.ionicUtilService.showErrorToast(
        'Solo los administradores pueden impersonar usuarios'
      );
      return;
    }

    const alertRes = await this.ionicUtilService.showAlert({
      header: 'Iniciar sesion como usuario',
      message: `Estas seguro que deseas iniciar sesion como ${this.getUserFullName(user)}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Conectar', role: 'confirm' },
      ],
    });

    if (alertRes?.role !== 'confirm') {
      return;
    }

    this.impersonate(user);
  }

  private async impersonate(user: User): Promise<void> {
    await this.ionicUtilService.showLoading({ message: 'Conectando...' });

    this.authService.impersonate(user._id).subscribe({
      next: async () => {
        await this.ionicUtilService.hideLoading();
        await this.ionicUtilService.showSuccessToast(
          `Conectado como ${this.getUserFullName(user)}`
        );
        window.location.href = '/';
      },
      error: async (err) => {
        await this.ionicUtilService.hideLoading();
        await this.ionicUtilService.showErrorToast(
          err,
          'No se pudo iniciar sesion como este usuario'
        );
      },
    });
  }

  private loadUsers(infiniteTarget?: HTMLIonInfiniteScrollElement): void {
    if (this.isLoading) {
      infiniteTarget?.complete();
      return;
    }

    this.isLoading = true;

    this.usersRequestSubscription = this.userService
      .searchUsers(this.currentPage, this.search.trim(), this.filters)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          infiniteTarget?.complete();
        })
      )
      .subscribe({
        next: (response) => {
          const responseUsers = Array.isArray(response)
            ? response
            : response?.users ?? [];
          const nextUsers = this.applyClientSideFilters(
            responseUsers as DashboardUser[]
          );
          this.users =
            this.currentPage === 0 ? nextUsers : [...this.users, ...nextUsers];
          this.totalUsers = Array.isArray(response)
            ? this.currentPage === 0
              ? nextUsers.length
              : this.users.length
            : response?.total ?? 0;
          this.hasMoreUsers = nextUsers.length === ProfileUsersPage.PAGE_SIZE;
        },
        error: () => {
          if (this.currentPage > 0) {
            this.currentPage -= 1;
          }
          this.hasMoreUsers = false;
        },
      });
  }

  private applyClientSideFilters(usersList: DashboardUser[]): DashboardUser[] {
    let filteredUsers = usersList ?? [];

    if (this.filters.premiumOnly) {
      filteredUsers = filteredUsers.filter(
        (user) => user?.premium?.entitled === true
      );
    }

    if (this.filters.withHashOnly) {
      filteredUsers = filteredUsers.filter((user) => Boolean(user?.hash));
    }

    if (this.filters.activitySort) {
      filteredUsers = filteredUsers.sort((a, b) => {
        const timeA = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
        const timeB = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;

        if (this.filters.activitySort === 'desc') {
          return timeB - timeA;
        } else {
          return timeA - timeB;
        }
      });
    }

    return filteredUsers;
  }
}
