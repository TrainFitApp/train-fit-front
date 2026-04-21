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
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UsersFilterPage } from './users-filter.page';
import { UsersFilter } from './users-filter.model';

export interface DashboardUser extends User {
  productsCount?: number;
  exercisesCount?: number;
  hasWorkoutInUse?: boolean;
  hasTableInUse?: boolean;
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
  public grantingLifetimePremiumUserIds = new Set<string>();
  public revokingLifetimePremiumUserIds = new Set<string>();

  private currentPage = 0;
  private readonly search$ = new Subject<string>();
  private readonly subscriptions = new Subscription();
  private usersRequestSubscription?: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly navigationService: NavigationService
  ) {}

  public ngOnInit(): void {
    const localUser = this.userService.getLocalUser;
    if (!localUser?.roles?.includes('admin')) {
      this.navigationService.goBack();
      return;
    }

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

  public isLifetimePremiumUser(user: User): boolean {
    return (
      user?.premium?.entitled === true && user?.premium?.plan === 'lifetime'
    );
  }

  public hasUserHash(user: User): boolean {
    return Boolean(user?.hash);
  }

  public isRemovingUserHash(user: User): boolean {
    return Boolean(user?._id && this.removingHashUserIds.has(user._id));
  }

  public isGrantingLifetimePremium(user: User): boolean {
    return Boolean(
      user?._id && this.grantingLifetimePremiumUserIds.has(user._id)
    );
  }

  public isRevokingLifetimePremium(user: User): boolean {
    return Boolean(
      user?._id && this.revokingLifetimePremiumUserIds.has(user._id)
    );
  }

  public async confirmGrantLifetimePremium(user: User): Promise<void> {
    if (
      !user?._id ||
      this.isPremiumUser(user) ||
      this.isGrantingLifetimePremium(user) ||
      this.isRevokingLifetimePremium(user)
    ) {
      return;
    }

    const alertRes = await this.ionicUtilService.showAlert({
      header: 'Premium de por vida',
      message: `¿Quieres dar premium de por vida a ${this.getUserFullName(
        user
      )}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Activar',
          role: 'confirm',
        },
      ],
    });

    if (alertRes?.role !== 'confirm') {
      return;
    }

    this.grantLifetimePremium(user);
  }

  public async confirmRevokeLifetimePremium(user: User): Promise<void> {
    if (
      !user?._id ||
      !this.isLifetimePremiumUser(user) ||
      this.isRevokingLifetimePremium(user) ||
      this.isGrantingLifetimePremium(user)
    ) {
      return;
    }

    const alertRes = await this.ionicUtilService.showAlert({
      header: 'Quitar Premium Lifetime',
      message: `¿Seguro que quieres quitar el premium lifetime a ${this.getUserFullName(
        user
      )}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Quitar',
          role: 'confirm',
        },
      ],
    });

    if (alertRes?.role !== 'confirm') {
      return;
    }

    this.revokeLifetimePremium(user);
  }

  public async confirmClearUserHash(user: User): Promise<void> {
    if (
      !user?._id ||
      !this.hasUserHash(user) ||
      this.isRemovingUserHash(user)
    ) {
      return;
    }

    const alertRes = await this.ionicUtilService.showAlert({
      header: 'Eliminar hash',
      message: `¿Seguro que quieres eliminar el hash de ${this.getUserFullName(
        user
      )}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'confirm',
        },
      ],
    });

    if (alertRes?.role !== 'confirm') {
      return;
    }

    this.clearUserHash(user);
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

  public clearPremiumLifetimeFilter(): void {
    if (!this.filters.premiumLifetimeOnly) {
      return;
    }

    this.filters = {
      ...this.filters,
      premiumLifetimeOnly: false,
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
    return diffMs < 60 * 1000; // menos de 1 minuto
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
        this.filters.premiumLifetimeOnly ||
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

  private revokeLifetimePremium(user: User): void {
    if (!user?._id) {
      return;
    }

    this.revokingLifetimePremiumUserIds.add(user._id);
    this.userService
      .revokeLifetimePremium(user._id)
      .pipe(
        finalize(() => {
          this.revokingLifetimePremiumUserIds.delete(user._id);
        })
      )
      .subscribe({
        next: async (updatedUser) => {
          this.users = this.users.map((listUser) =>
            listUser._id === updatedUser?._id ? updatedUser : listUser
          );

          if (this.filters.premiumLifetimeOnly) {
            this.users = this.users.filter(
              (listUser) => listUser._id !== user._id
            );
          }

          await this.ionicUtilService.showSuccessToast(
            'Premium lifetime quitado'
          );
        },
        error: async (error) => {
          await this.ionicUtilService.showErrorToast(
            error,
            'No se pudo quitar el premium lifetime'
          );
        },
      });
  }

  private grantLifetimePremium(user: User): void {
    if (!user?._id) {
      return;
    }

    this.grantingLifetimePremiumUserIds.add(user._id);
    this.userService
      .grantLifetimePremium(user._id)
      .pipe(
        finalize(() => {
          this.grantingLifetimePremiumUserIds.delete(user._id);
        })
      )
      .subscribe({
        next: async (updatedUser) => {
          this.users = this.users.map((listUser) =>
            listUser._id === updatedUser?._id ? updatedUser : listUser
          );

          await this.ionicUtilService.showSuccessToast(
            'Premium de por vida activado'
          );
        },
        error: async (error) => {
          await this.ionicUtilService.showErrorToast(
            error,
            'No se pudo activar premium de por vida'
          );
        },
      });
  }

  public async confirmDeleteUser(user: User): Promise<void> {
    const alertOptions: AlertOptions = {
      header: 'Eliminar usuario',
      message: `¿Estás seguro que deseas eliminar permanentemente a ${this.getUserFullName(
        user
      )}? Esta acción no se puede deshacer.`,
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
        await this.ionicUtilService.showSuccessToast(
          'Usuario eliminado con éxito'
        );
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
      await this.ionicUtilService.showErrorToast('Solo los administradores pueden impersonar usuarios');
      return;
    }

    const alertRes = await this.ionicUtilService.showAlert({
      header: 'Iniciar sesión como usuario',
      message: `¿Estás seguro que deseas iniciar sesión como ${this.getUserFullName(
        user
      )}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, conectar',
          role: 'confirm',
        },
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
        await this.ionicUtilService.showSuccessToast(`Conectado como ${this.getUserFullName(user)}`);
        
        // Redirigimos a la app principal
        window.location.href = '/'; 
      },
      error: async (err) => {
        await this.ionicUtilService.hideLoading();
        await this.ionicUtilService.showErrorToast(err, 'No se pudo iniciar sesión como este usuario');
      }
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

    if (this.filters.premiumLifetimeOnly) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user?.premium?.entitled === true && user?.premium?.plan === 'lifetime'
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
