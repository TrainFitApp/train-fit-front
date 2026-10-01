import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
  private readonly translate = inject(TranslateService);

  public goToUsers(): void {
    this.navigationService.goToProfileUsers();
  }

  public goToAppConfig(): void {
    void this.navController.navigateForward(['/management-home', 'env-config']);
  }

  public goToRepo(): void {
    void this.navController.navigateForward(['/management-home', 'repo-config']);
  }

  public goToDb(): void {
    void this.navController.navigateForward(['/management-home', 'db-config']);
  }

  public goToMaintenance(): void {
    void this.navController.navigateForward(['/management-home', 'maintenance-config']);
  }

  public goToTrainerBilling(): void {
    void this.navController.navigateForward(['/management-home', 'trainer-billing']);
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public confirmRestart(): void {
    this.ionicUtil.showAlert({
      header: this.translate.instant('MANAGEMENT.CONFIRM_RESTART.HEADER'),
      message: this.translate.instant('MANAGEMENT.CONFIRM_RESTART.MESSAGE'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        { text: this.translate.instant('MANAGEMENT.CONFIRM_RESTART.CONFIRM'), role: 'confirm', cssClass: 'danger-btn' },
      ],
    }).then((alertRes) => {
      if (alertRes?.role === 'confirm') {
        this.http.post('server/restart', {}).subscribe({
          next: () => this.ionicUtil.showSuccessToast(this.translate.instant('MANAGEMENT.RESTART.SUCCESS')),
          error: (err) => this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.RESTART.ERROR')),
        });
      }
    });
  }
}
