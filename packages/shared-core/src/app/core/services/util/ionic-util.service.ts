import { Injector, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ActionSheetController,
  ActionSheetOptions,
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ModalController,
  ModalOptions,
  PickerController,
  PopoverController,
  PopoverOptions,
  ToastController,
  ToastOptions,
  Platform,
} from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { NavigationBar } from '@capgo/capacitor-navigation-bar';
import { ErrorHandlerService } from './error-handler.service';
import {
  alertSheetEnter,
  alertSheetLeave,
  enableAlertSheetSwipe,
} from './alert-sheet';

@Injectable({
  providedIn: 'root'
})
export class IonicUtilService {
  private loading: HTMLIonLoadingElement | null = null;
  private alertSheetSeq = 0;
  private _translate: TranslateService | null = null;

  private get translate(): TranslateService {
    if (!this._translate) {
      this._translate = this.injector.get(TranslateService);
    }
    return this._translate;
  }

  constructor(
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private pickerController: PickerController,
    private platform: Platform,
    private errorHandlerService: ErrorHandlerService,
    private injector: Injector
  ) {
    this.configureStatusBar();
  }

  public async showModal(modalOptions: ModalOptions) {
    const showModal = await this.modalController.create({
      component: modalOptions.component,
      componentProps: modalOptions.componentProps,
      cssClass: modalOptions.cssClass,
      initialBreakpoint: modalOptions.initialBreakpoint,
      breakpoints: modalOptions.breakpoints,
      animated: true,
    });

    showModal.present();
    return showModal.onDidDismiss();
  }

  public async closeModal(): Promise<void> {
    await this.modalController.dismiss();
  }

  public async showPicker(options: {
    columns: Array<{
      name: string;
      options: Array<{ text: string; value: any; cssClass?: string }>;
      selectedIndex?: number;
    }>;
    buttons?: Array<{
      text: string;
      role?: string;
      handler?: (value: any) => boolean | void;
    }>;
    mode?: 'ios' | 'md';
    cssClass?: string | string[];
  }) {
    const picker = await this.pickerController.create({
      columns: options.columns,
      buttons: options.buttons || [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.OK'),
        },
      ],
      mode: options.mode || 'ios',
      cssClass: options.cssClass,
      animated: true,
    });

    await picker.present();
    return picker.onDidDismiss();
  }

  // Todos los alerts de las 3 apps salen como hoja inferior (ver
  // alert-sheet.ts para el porqué de seguir con ion-alert). `mode: 'md'` en
  // todas las plataformas: el CSS de la hoja parte de un solo marcado.
  public async showAlert(alert: AlertOptions) {
    const seq = ++this.alertSheetSeq;
    const inputs = (alert.inputs || []).map((inp, idx) => ({
      ...inp,
      id: inp.id ?? `alert-sheet-${seq}-${idx}`,
    }));
    const fields = inputs.filter(
      (inp) => inp.type !== 'radio' && inp.type !== 'checkbox'
    );
    const cancelHasHandler = (alert.buttons || []).some(
      (btn) => typeof btn !== 'string' && btn.role === 'cancel' && !!btn.handler
    );

    const showAlert = await this.alertController.create({
      ...alert,
      cssClass: [
        'custom-alert',
        // Con campos u opciones es un formulario, no un menú (ver global.scss).
        inputs.length > 0 ? 'alert-sheet-form' : '',
        ...[alert.cssClass ?? []].flat(),
      ].join(' '),
      inputs,
      mode: 'md',
      animated: true,
      enterAnimation: alertSheetEnter,
      leaveAnimation: alertSheetLeave,
      // Tocar fuera cierra como "Cancelar" solo si no hay nada escrito que
      // perder y "Cancelar" no hace nada (en el entreno, "Saltar" lo termina).
      // Arrastrar la hoja cierra siempre: ese gesto no se hace sin querer.
      backdropDismiss: fields.length === 0 && !cancelHasHandler,
    });
    await showAlert.present();

    // Suscribir botón atrás nativo para cerrar el alert
    const backSub = this.platform.backButton.subscribeWithPriority(
      Number.MAX_SAFE_INTEGER,
      () => {
        try {
          showAlert.dismiss(undefined, 'cancel');
        } catch {}
      }
    );
    const swipe = enableAlertSheetSwipe(showAlert);

    // Ionic no pinta el `label` de los inputs de texto/fecha (solo el de
    // radios y checkboxes): sin esto, dos fechas seguidas no dicen cuál es cuál.
    for (const field of fields) {
      const el = showAlert.querySelector(`#${CSS.escape(field.id)}`);
      if (!field.label || !el) continue;
      const label = document.createElement('label');
      label.className = 'alert-sheet-label';
      label.htmlFor = field.id;
      label.textContent = field.label;
      el.before(label);
    }

    const first = showAlert.querySelector('.alert-input') as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (first) {
      first.focus();
      try {
        first.setSelectionRange(first.value.length, first.value.length);
      } catch {}
    }

    const res = await showAlert.onDidDismiss();
    backSub.unsubscribe?.();
    swipe?.destroy();
    // Tocar fuera es cancelar: quien llama solo distingue los roles de sus
    // botones, y sin esto un "backdrop" pasaba por confirmación.
    return res.role === 'backdrop' ? { ...res, role: 'cancel' } : res;
  }

  public async closeAlert(): Promise<void> {
    try {
      const top = await this.alertController.getTop();
      await top?.dismiss(undefined, 'cancel');
    } catch {}
  }

  public async showActionSheet(actionSheet: ActionSheetOptions) {
    const showActionSheet = await this.actionSheetController.create({
      header: actionSheet.header,
      cssClass: 'action-sheet-custom',
      buttons: actionSheet.buttons,
    });
    showActionSheet.present();
    return showActionSheet.onDidDismiss();
  }

  public async showPopover(popover: PopoverOptions) {
    const showPopover = await this.popoverController.create({
      component: popover.component,
      componentProps: popover.componentProps,
      event: popover.event,
      showBackdrop: true,
      mode: 'ios',
      animated: true,
    });
    showPopover.present();
    return showPopover.onDidDismiss();
  }

  public async closePopover(): Promise<void> {
    await this.popoverController.dismiss();
  }

  public async showToast(toast: ToastOptions) {
    const cssClass = toast.cssClass
      ? Array.isArray(toast.cssClass)
        ? ['toast-safe-area', ...toast.cssClass]
        : `toast-safe-area ${toast.cssClass}`
      : 'toast-safe-area';

    const showToast = await this.toastController.create({
      // Forward all provided options to respect platform differences
      message: toast.message,
      duration: toast.duration,
      position: toast.position || 'bottom',
      color: toast.color || 'tertiary',
      icon: toast.icon || 'information-circle-outline',
      buttons: toast.buttons || [
        {
          text: this.translate.instant('COMMON.OK'),
          role: 'cancel',
        },
      ],
      // Ensure keyboard closes so bottom toasts aren't hidden behind it on mobile
      keyboardClose: true,
      // Apply a CSS class for any additional styling
      cssClass,
    });

    showToast.present();
    return showToast.onDidDismiss();
  }

  public async showPremiumLimitAlert(options: {
    header?: string;
    message: string;
    onUpgrade?: () => void | Promise<void>;
  }) {
    return this.showAlert({
      header: options.header ?? this.translate.instant('PREMIUM.LIMIT_REACHED'),
      message: options.message,
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('PREMIUM.GO_PRO'),
          cssClass: 'alert-button-primary',
          handler: () => {
            void options.onUpgrade?.();
          },
        },
      ],
    });
  }

  /**
   * Muestra un toast de error extrayendo automáticamente el mensaje del error
   * @param error - El objeto de error del backend o cualquier error
   * @param defaultMessage - Mensaje por defecto si no se puede extraer uno
   * @param duration - Duración en milisegundos (default 3000)
   */
  public async showErrorToast(
    error: any,
    defaultMessage: string = 'Ocurrió un error', // kept as literal fallback, consumer should provide translated message
    duration: number = 3000
  ): Promise<void> {
    const errorMessage = this.errorHandlerService.getFormattedErrorMessage(
      error,
      defaultMessage
    );
    const toastColor = this.errorHandlerService.getToastColorByError(error);
    const toastIcon = this.errorHandlerService.getToastIconByError(error);

    const showToast = await this.toastController.create({
      message: errorMessage,
      duration,
      position: 'bottom',
      color: toastColor,
      icon: toastIcon,
      buttons: [
        {
          text: this.translate.instant('COMMON.OK'),
          role: 'cancel',
        },
      ],
      keyboardClose: true,
      cssClass: 'toast-safe-area error-toast',
    });

    await showToast.present();
  }

  /**
   * Muestra un toast de éxito
   * @param message - Mensaje a mostrar
   * @param duration - Duración en milisegundos (default 2000)
   */
  public async showSuccessToast(
    message: string = this.translate.instant('COMMON.SUCCESS'),
    duration: number = 2000
  ): Promise<void> {
    const showToast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline',
      buttons: [
        {
          text: this.translate.instant('COMMON.OK'),
          role: 'cancel',
        },
      ],
      keyboardClose: true,
      cssClass: 'toast-safe-area success-toast',
    });

    await showToast.present();
  }

  /**
   * Muestra un toast de advertencia
   * @param message - Mensaje a mostrar
   * @param duration - Duración en milisegundos (default 2500)
   */
  public async showWarningToast(
    message: string = this.translate.instant('COMMON.WARNING'),
    duration: number = 2500
  ): Promise<void> {
    const showToast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'warning',
      icon: 'alert-circle-outline',
      buttons: [
        {
          text: this.translate.instant('COMMON.OK'),
          role: 'cancel',
        },
      ],
      keyboardClose: true,
      cssClass: 'toast-safe-area warning-toast',
    });

    await showToast.present();
  }

  public async closePicker(): Promise<void> {
    await this.pickerController.dismiss();
  }

  public async showLoading(options?: {
    message?: string;
    spinner?: LoadingOptions['spinner'];
    cssClass?: string;
  }): Promise<void> {
    const loadingOptions: LoadingOptions = {
      message: options?.message ?? this.translate.instant('COMMON.LOADING'),
      spinner: options?.spinner ?? 'crescent',
      cssClass: options?.cssClass,
    } as LoadingOptions;
    this.loading = await this.loadingController.create({
      message: loadingOptions.message,
      spinner: loadingOptions.spinner,
      cssClass: loadingOptions.cssClass,
      backdropDismiss: false,
    });
    await this.loading.present();
  }

  public async hideLoading(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  public async scrollToBottom(content: any): Promise<void> {
    if (content) {
      await content.scrollToBottom(300);
    }
  }

  public async showNotes(title: string, content: string): Promise<void> {
    void this.showAlert({
      header: title,
      message: content || this.translate.instant('COMMON.NO_INFO'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CERRAR'),
          role: 'cancel',
          cssClass: 'alert-button-primary',
        },
      ],
      cssClass: 'notes-alert',
    });
  }

  private async configureStatusBar(): Promise<void> {
    try {
      const platform = Capacitor.getPlatform();
      if (platform !== 'web') {
        // Android: fuerza la barra de navegación inferior en oscuro con iconos claros
        if (platform === 'android') {
          try {
            await NavigationBar.setNavigationBarColor({
              color: '#111111',
              darkButtons: false,
            });
          } catch (e) {
            // Ignoramos si el plugin no está disponible en tiempo de desarrollo
          }
        }
      }
    } catch (err) {
      // Fallback silencioso si el plugin no está disponible en web
    }
  }
}
