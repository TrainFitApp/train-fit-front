import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-management-home',
  templateUrl: './management-home.page.html',
  styleUrls: ['./management-home.page.scss'],
})
export class ManagementHomePage {
  private readonly navigationService = inject(NavigationService);
  private readonly navController = inject(NavController);
  private readonly ionicUtil = inject(IonicUtilService);
  private readonly http = inject(HttpService);

  public goToUsers(): void {
    this.navigationService.goToProfileUsers();
  }

  public goToAppConfig(): void {
    void this.navController.navigateForward(['/management-home', 'env-config']);
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public confirmRestart(): void {
    this.ionicUtil.showAlert({
      header: 'Reiniciar Servidor',
      message: '¿Reiniciar nginx y recargar procesos PM2? Los servicios se detendrán brevemente.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Reiniciar', role: 'confirm', cssClass: 'danger-btn' },
      ],
    }).then((alertRes) => {
      if (alertRes?.role === 'confirm') {
        this.http.post('server/restart', {}).subscribe({
          next: () => this.ionicUtil.showSuccessToast('Comando de reinicio ejecutado'),
          error: (err) => this.ionicUtil.showErrorToast(err, 'Error al ejecutar reinicio'),
        });
      }
    });
  }
}
