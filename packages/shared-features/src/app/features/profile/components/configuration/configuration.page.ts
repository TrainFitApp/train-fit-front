import { Component } from '@angular/core';
import { AlertButton, AlertOptions, ModalOptions } from '@ionic/angular';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { Theme } from 'src/app/shared/models/theme';
import { AdPreferencesPage } from './components/ad-preferences/ad-preferences.page';
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
  public isPremium: boolean = false;

  public THEMES = Theme;

  constructor(
    private readonly userService: UserService,
    private readonly themeService: ThemeService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly authService: AuthService,
    private readonly tableService: TableService,
    private readonly dietService: DietService,
    private readonly workoutService: WorkoutService,
    private readonly navigationService: NavigationService,
  ) {
    this.theme = this.themeService.getTheme;
    this.user = this.userService.getLocalUser;
    this.isPremium = !!this.user?.isPremium;
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
    const modal: ModalOptions = {
      component: AdPreferencesPage,
      cssClass: 'fullscreen-modal',
    };

    const res: any = await this.ionicUtilService.showModal(modal);
    if (res?.data === undefined || res?.data === null) return;

    const selectedOption = !!res.data;
    if (this.user?.personalAds === selectedOption) return;

    const updatedUser: User = {
      ...this.user,
      personalAds: selectedOption,
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: (userUpdated) => {
        this.user = userUpdated;
        this.ionicUtilService.showToast({
          message: 'Preferencias de anuncios actualizadas',
          duration: 1400,
          color: 'success',
        });
      },
      error: () => {
        this.ionicUtilService.showToast({
          message: 'No se pudieron guardar las preferencias',
          duration: 1600,
          color: 'danger',
        });
      },
    });
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

  public openPremiumPage(): void {
    this.navigationService.goToPremium();
  }

  // Links constants
  public LINKS = {
    privacyAndPolicy: 'https://trainfit.net/#/politicas',
    us: 'https://trainfit.net/#/SobreNosotros',
    termsAndConditions: 'https://trainfit.net/#/terminosycondiciones',
  };
}
