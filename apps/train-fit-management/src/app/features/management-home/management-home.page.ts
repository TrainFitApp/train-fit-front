import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

@Component({
  selector: 'app-management-home',
  templateUrl: './management-home.page.html',
  styleUrls: ['./management-home.page.scss'],
})
export class ManagementHomePage {
  private readonly navigationService = inject(NavigationService);
  private readonly navController = inject(NavController);

  public goToUsers(): void {
    this.navigationService.goToProfileUsers();
  }

  public goToAppConfig(): void {
    void this.navController.navigateForward(['/management-home', 'env-config']);
  }

  public goBack(): void {
    this.navigationService.goBack();
  }
}
