import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { TrainerAuthApiService } from '../../services/trainer-auth-api.service';

@Component({
  selector: 'app-trainer-user-loader',
  templateUrl: './user-loader.page.html',
  styleUrls: ['./user-loader.page.scss'],
})
export class TrainerUserLoaderPage implements OnInit {
  public failed = false;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly api: TrainerAuthApiService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.authService
      .ensureAuthenticated()
      .pipe(switchMap(() => this.resolveUser()))
      .subscribe({
        next: (user) => {
          if (!user?.roles?.includes('trainer')) {
            this.authService.logout();
            return;
          }

          this.userService.setLocalUser = user;
          void this.router.navigate(['/tabs/clients'], { replaceUrl: true });
        },
        error: () => {
          this.failed = true;
        },
      });
  }

  public retry(): void {
    this.failed = false;
    this.ngOnInit();
  }

  private resolveUser(): Observable<User> {
    if (this.authService.user) {
      return of(this.authService.user);
    }
    return this.api.me().pipe(switchMap((response) => of(response.user)));
  }
}
