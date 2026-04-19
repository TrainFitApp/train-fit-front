import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-ad-preferences',
  templateUrl: './ad-preferences.page.html',
  styleUrls: ['./ad-preferences.page.scss'],
})
export class AdPreferencesPage {
  public selectedOption: boolean;

  constructor(
    private readonly userService: UserService,
    public modalController: ModalController
  ) {
    const user: User = this.userService.getLocalUser;
    this.selectedOption =
      user.personalAds === undefined ? true : !!user.personalAds;
  }

  public dismiss(): void {
    this.modalController.dismiss(this.selectedOption);
  }
}
