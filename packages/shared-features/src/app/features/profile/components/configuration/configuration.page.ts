import { Component } from '@angular/core';
import { AlertButton, AlertOptions, ModalOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { NotificationService, NotificationFrequency } from 'src/app/core/services/util/notification.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { Theme } from 'src/app/shared/models/theme';
import { AdPreferencesPage } from './components/ad-preferences/ad-preferences.page';
import { NutritionEditorPage } from './components/editor/components/nutrition-editor/nutrition-editor.page';
import { EditorPage } from './components/editor/editor.page';
import { GoalListPage } from './components/goal-list/goal-list.page';

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

  public currentLang: string = 'es';

  get locale(): string {
    return this.currentLang === 'en' ? 'en-US' : 'es-ES';
  }

  public notifEnabled: boolean = false;
  public notifFrequency: NotificationFrequency = 'daily';
  public notifWeekday: number = 1;
  public notifIntervalDays: number = 2;
  public notifTime: string = '';
  public isTimeModalOpen: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly themeService: ThemeService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly authService: AuthService,
    private readonly tableService: TableService,
    private readonly dietService: DietService,
    private readonly workoutService: WorkoutService,
    private readonly navigationService: NavigationService,
    private readonly notificationService: NotificationService,
    private readonly translate: TranslateService,
    private readonly i18nService: I18nService,
  ) {
    this.theme = this.themeService.getTheme;
    this.user = this.userService.getLocalUser;
    this.isPremium = !!this.user?.premium?.entitled;
    this.currentLang = this.i18nService.current;
    void this.loadNotificationSettings();
  }

  private async loadNotificationSettings(): Promise<void> {
    const settings = await this.notificationService.getSettings();
    this.notifEnabled = settings.enabled;
    this.notifFrequency = settings.frequency;
    this.notifWeekday = settings.weekday ?? 1;
    this.notifIntervalDays = settings.intervalDays ?? 2;

    const date = new Date();
    date.setHours(settings.hour, settings.minute, 0, 0);
    this.notifTime = date.toISOString();
  }

  public async onToggleReminder(): Promise<void> {
    if (this.notifEnabled) {
      const granted = await this.notificationService.requestPermissions();
      if (!granted) {
        this.ionicUtilService.showToast({
          message: this.translate.instant('NOTIFICATIONS.PERMISSION_DENIED'),
          duration: 2000,
          color: 'warning',
        });
        this.notifEnabled = false;
        return;
      }
    }
    await this.saveNotifSettings();
  }

  public async onSettingsChange(): Promise<void> {
    await this.saveNotifSettings();
  }

  public changeInterval(delta: number): void {
    const newVal = this.notifIntervalDays + delta;
    if (newVal >= 1 && newVal <= 60) {
      this.notifIntervalDays = newVal;
      void this.saveNotifSettings();
    }
  }

  public openTimePicker(): void {
    const trigger = document.getElementById('notif-time-trigger');
    if (trigger) {
      trigger.click();
    }
  }

  public getNotifTimeDisplay(): string {
    if (!this.notifTime) return '--:--';
    const date = new Date(this.notifTime);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  private async saveNotifSettings(): Promise<void> {
    const timeDate = new Date(this.notifTime);
    const hour = timeDate.getHours();
    const minute = timeDate.getMinutes();

    await this.notificationService.saveAndSchedule({
      enabled: this.notifEnabled,
      hour,
      minute,
      frequency: this.notifFrequency,
      weekday: this.notifFrequency === 'weekly' ? this.notifWeekday : undefined,
      intervalDays: this.notifFrequency === 'interval' ? this.notifIntervalDays : undefined,
    });
  }

  public switchLang(lang: 'es' | 'en'): void {
    this.i18nService.switchLang(lang);
    this.currentLang = lang;
    this.user.lang = lang;
    this.userService.updateUser(this.user).subscribe(() => {
      this.navigationService.goToUserLoader();
    });
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
      header: this.translate.instant('CONFIGURATION.LOGOUT_HEADER'),
      message: this.translate.instant('CONFIGURATION.LOGOUT_MSG'),
      buttons: [
        {
          text: this.translate.instant('CONFIGURATION.CANCEL_BTN'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('CONFIGURATION.CONFIRM'),
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
          message: this.translate.instant('CONFIGURATION.AD_UPDATED'),
          duration: 1400,
          color: 'success',
        });
      },
      error: () => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('CONFIGURATION.AD_UPDATE_ERROR'),
          duration: 1600,
          color: 'danger',
        });
      },
    });
  }

  public openTrainers(): void {
    const header = this.translate.instant('CONFIGURATION.TRAINER_MODE_HEADER');
    const message = this.translate.instant('CONFIGURATION.TRAINER_MODE_MSG');
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
    // Cuentas sociales (Google/Apple) no tienen contraseña propia que verificar.
    if (this.user?.provider) {
      this.confirmDeleteAccountWithoutPassword();
      return;
    }

    const alertOptions: AlertOptions = {
      header: this.translate.instant('CONFIGURATION.DELETE_HEADER'),
      message: this.translate.instant('CONFIGURATION.DELETE_MSG'),
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: this.translate.instant(
            'CONFIGURATION.DELETE_PASSWORD_PLACEHOLDER',
          ),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('CONFIGURATION.CANCEL_BTN'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('CONFIGURATION.DELETE_BTN'),
          role: 'destructive',
          handler: (data) => {
            if (!data?.password) {
              this.ionicUtilService.showToast({
                message: this.translate.instant(
                  'CONFIGURATION.DELETE_PASSWORD_REQUIRED',
                ),
                duration: 2000,
                color: 'warning',
              });
              return false;
            }
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then((result) => {
      if (result.role === 'cancel') return;

      const password = result.data?.values?.password;
      if (!password) return;

      this.userService.verifyPassword(password).subscribe({
        next: () => this.performAccountDeletion(),
        error: () => {
          this.ionicUtilService.showToast({
            message: this.translate.instant(
              'CONFIGURATION.DELETE_PASSWORD_INCORRECT',
            ),
            duration: 2500,
            color: 'danger',
          });
        },
      });
    });
  }

  private confirmDeleteAccountWithoutPassword(): void {
    // Cuentas Google/Apple no tienen contraseña propia que pedir: en su lugar,
    // se exige escribir la palabra de confirmación tal cual.
    const confirmWord = this.translate.instant('CONFIGURATION.DELETE_CONFIRM_WORD');

    const alertOptions: AlertOptions = {
      header: this.translate.instant('CONFIGURATION.DELETE_HEADER'),
      message: this.translate.instant('CONFIGURATION.DELETE_MSG_SOCIAL', {
        word: confirmWord.toUpperCase(),
      }),
      inputs: [
        {
          name: 'confirmWord',
          type: 'text',
          placeholder: confirmWord.toUpperCase(),
        },
      ],
      buttons: [
        {
          text: this.translate.instant('CONFIGURATION.CANCEL_BTN'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('CONFIGURATION.DELETE_BTN'),
          role: 'destructive',
          handler: (data) => {
            const typed = (data?.confirmWord || '').trim().toLowerCase();
            if (typed !== confirmWord.trim().toLowerCase()) {
              this.ionicUtilService.showToast({
                message: this.translate.instant(
                  'CONFIGURATION.DELETE_CONFIRM_WORD_MISMATCH',
                  { word: confirmWord.toUpperCase() },
                ),
                duration: 2200,
                color: 'warning',
              });
              return false;
            }
            this.performAccountDeletion();
            return true;
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  private performAccountDeletion(): void {
    this.userService.deleteById(this.user._id).subscribe(() => {
      this.authService.logout();
    });
  }

  public close(): void {
    this.navigationService.goBack();
  }

  public async editNutritionalGoals(): Promise<void> {
    const user = this.userService.getLocalUser;
    if (!user?._id) return;

    const modal: ModalOptions = {
      component: GoalListPage,
      cssClass: 'fullscreen-modal'
    }

    await this.ionicUtilService.showModal(modal);
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
