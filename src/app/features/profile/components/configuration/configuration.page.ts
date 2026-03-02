import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertButton, AlertOptions, ModalOptions } from '@ionic/angular';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { Theme } from 'src/app/shared/models/theme';
import { NutritionEditorPage } from './components/editor/components/nutrition-editor/nutrition-editor.page';
import { EditorPage } from './components/editor/editor.page';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage {
  public user: User;

  public theme: Theme;

  public THEMES = Theme;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly themeService: ThemeService,
    private readonly utilService: UtilService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly authService: AuthService,
    private readonly tableService: TableService,
    private readonly dietService: DietService,
    private readonly workoutService: WorkoutService,
    private readonly navigationService: NavigationService,
    private readonly adMobService: AdMobService
  ) {
    this.theme = this.themeService.getTheme;
    this.user = this.userService.getLocalUser;
  }

  public toggleColor(): void {
    this.theme =
      this.theme === this.THEMES.light ? this.THEMES.dark : this.THEMES.light;
    this.themeService.toggleColorMode(this.theme);

    this.user.theme = this.theme;
    this.userService
      .updateUser(this.user)
      .subscribe((resUser) => (this.user = resUser));
  }

  public logout(): void {
    const alertOptions = {
      header: 'Cerrar sesión',
      message: '¿Estás seguro de cerrar sesión?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'CONFIRMAR',
          cssClass: 'alert-button-primary',
          handler: () => {
            this.userService.setLocalUser = null;
            this.workoutService.setCurrentWorkout = null;
            this.dietService.setCurrentDiet = null;
            this.tableService.setCurrentTable = null;
            this.authService.logout();
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public goToRestorePassword(): void {
    this.navigationService.goToRestorePasswordPage();
  }

  public async goToAdConsent(): Promise<void> {
    await this.adMobService.consent(this.user);
  }

  public openTrainers(): void {
    const header = 'Modo entrenadores';
    const message = 'No disponible';
    const buttons: AlertButton[] = [
      {
        text: 'OK',
        cssClass: 'alert-button-primary',
      },
    ];

    const alertOptions: AlertOptions = {
      header: header,
      message: message,
      buttons: buttons,
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public deleteAccount(): void {
    const alertOptions = {
      header: 'Eliminar cuenta',
      message: 'Esta acción no se puede deshacer',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          handler: () => {
            this.userService.deleteById(this.user._id).subscribe((_) => {
              this.authService.logout();
            });
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public close(): void {
    this.navigationService.goBack();
  }

  public editNutritionalGoals(): void {
    const modal: ModalOptions = {
      component: NutritionEditorPage,
      cssClass: 'fullscreen-modal'
    }

    this.ionicUtilService.showModal(modal);
  }

  public editPersonalData(): void {
    const modal: ModalOptions = {
      component: EditorPage
    }

    this.ionicUtilService.showModal(modal);
  }

  public openConcepts(): void {
    this.navigationService.gotoConcepts();
  }

  public openSuggestions(): void {
    this.navigationService.goToSuggestions();
  }

  public openReferences(): void {
    this.navigationService.goToReferences();
  }

  // Links constants
  public LINKS = {
    privacyAndPolicy: 'https://trainfit.net/#/politicas',
    us: 'https://trainfit.net/#/SobreNosotros',
    termsAndConditions: 'https://trainfit.net/#/terminosycondiciones',
  };
}
