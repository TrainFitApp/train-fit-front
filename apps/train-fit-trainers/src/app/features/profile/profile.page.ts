import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class TrainerProfilePage {
  public readonly appVersion = environment.APP_VERSION;
  public get user() {
    return this.userService.getLocalUser || this.authService.user;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  public logout(): void {
    this.userService.setLocalUser = null;
    this.authService.logout();
  }
}
