import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

// "Mi cuenta" — antes reutilizaba el ProfilePage compartido con
// train-fit-front/train-fit-management (pantalla de macros/dieta/premium del
// CONSUMIDOR, casi vacía para un rol de entrenador). Página local propia de
// esta app: solo servicios de datos compartidos (UserService/AuthService),
// nunca el componente de pantalla compartido — así no afecta a las otras 2
// apps del monorepo. Ver MVP-trainers/tareas-grandes/TAREA5.
@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
})
export class AccountPage {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly ionicUtilService = inject(IonicUtilService);
  private readonly router = inject(Router);

  public readonly user = this.userService.localUser;

  public showEditPanel = false;
  public isSavingProfile = false;
  public formName = '';
  public formLastname = '';
  public formEmail = '';

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
}
