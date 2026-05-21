import { Component, ViewChild } from '@angular/core';
// No importar IonTextarea directamente para compatibilidad con NgModules
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import {
  normalizeLongTextInput,
  VALIDATION_LIMITS,
} from 'src/app/core/constants/validation-limits';

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
    private ionicUtilService: IonicUtilService
  ) {}

  public sendSuggestions(): void {
    this.isSending = true;
    const email = this.userService.getLocalUser?.email || this.userEmail;
    const message = normalizeLongTextInput(
      this.ionTextArea?.value || '',
      VALIDATION_LIMITS.text.feedbackMax
    );
    if (message.length < VALIDATION_LIMITS.text.feedbackMin) {
      this.isSending = false;
      return;
    }
    this.userService.sendSuggestions(email, message).subscribe(
      () => {
        const alertOptions = {
          header: 'Éxito',
          message: '¡Sugerencia enviada!',
          buttons: ['OK'],
        };
        this.ionicUtilService.showAlert(alertOptions);
        this.showThanks = true;
        this.isSending = false;
        if (this.ionTextArea) this.ionTextArea.value = '';
      },
      () => {
        this.isSending = false;
        this.ionicUtilService.showAlert({
          header: 'Error',
          message: 'No se pudo enviar la sugerencia. Por favor, inténtalo de nuevo más tarde.',
          buttons: ['OK'],
        });
      }
    );
  }

  public close(): void {
    this.navigationService.goBack();
  }
}
