import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// No importar IonTextarea directamente para compatibilidad con NgModules
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage {
  @ViewChild('ionTextArea')
  public ionTextArea: any;

  public userEmail: string;
  public isSending = false;
  public showThanks = false;

  constructor(
    private navigationService: NavigationService,
    private userService: UserService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService,
  ) {}

  public sendSuggestions(): void {
    this.isSending = true;
    const email = this.userService.getLocalUser?.email || this.userEmail;
    const message = (this.ionTextArea?.value || '').trim();
    if (message.length < 20) {
      this.isSending = false;
      return;
    }
    this.userService.sendSuggestions(email, message).subscribe(
      () => {
        const alertOptions = {
          header: this.translate.instant('SUGGESTIONS.SUCCESS_HEADER'),
          message: this.translate.instant('SUGGESTIONS.SUCCESS_MSG'),
          buttons: [this.translate.instant('COMMON.OK')],
        };
        this.ionicUtilService.showAlert(alertOptions);
        this.showThanks = true;
        this.isSending = false;
        if (this.ionTextArea) this.ionTextArea.value = '';
      },
      () => {
        this.isSending = false;
        this.ionicUtilService.showAlert({
          header: this.translate.instant('SUGGESTIONS.ERROR_HEADER'),
          message: this.translate.instant('SUGGESTIONS.ERROR_MSG'),
          buttons: [this.translate.instant('COMMON.OK')],
        });
      }
    );
  }

  public close(): void {
    this.navigationService.goBack();
  }
}
