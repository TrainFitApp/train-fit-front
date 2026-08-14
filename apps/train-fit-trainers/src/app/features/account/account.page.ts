import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
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

  public goToConfiguration(): void {
    void this.router.navigate(['/tabs/configuration']);
  }

  public goToSubscription(): void {
    void this.router.navigate(['/tabs/subscription']);
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
