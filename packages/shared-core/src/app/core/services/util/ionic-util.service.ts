import { EnvironmentInjector, Injector, Injectable } from '@angular/core';
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
  AngularDelegate,
} from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { NavigationBar } from '@capgo/capacitor-navigation-bar';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'src/environments/environment';
import { submitOnEnter } from 'src/app/shared/directives/submit-on-enter.util';
import { alertEnterSubmitIndex } from './alert-enter-submit.util';
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

  // --- Paneles laterales apilados ("doble sidenav", Planner 2026-09) ---
  // Abiertos desde Planner: el tablero y los demás paneles siguen activos.
  // Cada componente recibe un ModalController local para que dismiss() sin
  // id cierre su propio panel, aunque haya otro abierto después.
  // Las clases solo tienen CSS en train-fit-trainers (theme/tokens.scss).
  private readonly sidePanelStack: HTMLIonModalElement[] = [];
  private readonly sidePanelParents = new Map<HTMLIonModalElement, HTMLIonModalElement>();
  // Paneles abiertos ENCIMA de su padre (misma columna, lo tapan): p. ej.
  // Configurar ejercicio desde el buscador. Lo que abran ellos sale a su
  // izquierda como cualquier otro.
  private readonly sidePanelsOverParent = new Set<HTMLIonModalElement>();
  private sidePanelAccessibilityCleanup: (() => void) | null = null;
  // Componentes con un panel en creación (entre create() y entrar en la
  // pila): un doble clic rápido no debe abrir dos.
  private readonly pendingSidePanelComponents = new Set<unknown>();
  private static readonly SIDE_PANEL_LEVELS = [
    'tf-panel-modal',
    'tf-panel-modal-left',
    'tf-panel-modal-left-2',
  ];

  public showSidePanel(modalOptions: ModalOptions) {
    return this.presentSidePanel(modalOptions);
  }

  // Para lo que se abre desde DENTRO de otro modal (sustituir ejercicio,
  // editar serie...): si ese modal es un panel de la pila, este va a su
  // izquierda (o encima, con overParent); si no (app de cliente, gestión),
  // es el showModal de siempre.
  public showNestedModal(
    modalOptions: ModalOptions,
    origin?: HTMLElement,
    placement: { overParent?: boolean } = {},
  ) {
    this.pruneSidePanels();
    // El foco no identifica al propietario en táctil ni tras una petición
    // asíncrona. El componente entrega el modal que Ionic le ha inyectado.
    if (origin && !origin.isConnected) return Promise.resolve({ data: undefined, role: 'cancel' });
    const parent = origin?.closest('ion-modal');
    return parent && this.sidePanelStack.includes(parent)
      ? this.presentSidePanel(modalOptions, parent, !!placement.overParent)
      : this.showModal(modalOptions);
  }

  private async presentSidePanel(
    modalOptions: ModalOptions,
    parent?: HTMLIonModalElement,
    overParent = false,
  ) {
    this.pruneSidePanels();
    const stack = this.sidePanelStack;
    const levels = IonicUtilService.SIDE_PANEL_LEVELS;
    const levelClass = levels[Math.min(stack.length, levels.length - 1)];
    // Fuera las clases de marco que traía la llamada (panel, mini-modal):
    // el marco lo decide el nivel. El resto (p. ej. workout-summary-modal)
    // se conserva.
    const extraClasses = [modalOptions.cssClass ?? []]
      .flat()
      .flatMap((cls) => cls.split(' '))
      .filter((cls) => cls && !cls.startsWith('tf-panel-modal') && cls !== 'mini-modal');

    this.pendingSidePanelComponents.add(modalOptions.component);
    const modal = await this.modalController.create({
      component: modalOptions.component,
      componentProps: modalOptions.componentProps,
      cssClass: [levelClass, 'tf-planner-panel', 'ion-disable-focus-trap', ...extraClasses],
      animated: true,
      showBackdrop: false,
      backdropDismiss: false,
    }).finally(() => this.pendingSidePanelComponents.delete(modalOptions.component));

    const scopedController: Pick<ModalController, 'create' | 'dismiss' | 'getTop'> = {
      create: (options) => this.modalController.create(options),
      dismiss: (data, role, id) => this.modalController.dismiss(data, role, id ?? modal.id),
      getTop: () => this.modalController.getTop(),
    };
    const panelInjector = Injector.create({
      parent: this.injector,
      providers: [{ provide: ModalController, useValue: scopedController }],
    });
    modal.delegate = this.injector.get(AngularDelegate).create(
      this.injector.get(EnvironmentInjector), panelInjector, 'modal',
    );
    if (parent) this.sidePanelParents.set(modal, parent);
    if (parent && overParent) this.sidePanelsOverParent.add(modal);
    stack.push(modal);
    this.updateSidePanelLevels();
    this.watchSidePanelAccessibility();
    modal.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      void modal.dismiss(undefined, 'cancel');
    });
    modal.addEventListener('ionModalWillDismiss', () => {
      for (const child of [...stack].reverse()) {
        if (this.sidePanelParents.get(child) === modal) void child.dismiss(undefined, 'cancel');
      }
    }, { once: true });
    try {
      await modal.present();
      modal.shadowRoot?.querySelector('[part="content"]')?.setAttribute('aria-modal', 'false');
      this.syncSidePanelAccessibility();
      return await modal.onDidDismiss();
    } finally {
      const index = stack.indexOf(modal);
      if (index >= 0) stack.splice(index, 1);
      this.sidePanelParents.delete(modal);
      this.sidePanelsOverParent.delete(modal);
      this.updateSidePanelLevels();
      this.syncSidePanelAccessibility();
      if (!stack.length) {
        this.sidePanelAccessibilityCleanup?.();
        this.sidePanelAccessibilityCleanup = null;
      }
    }
  }

  // El panel abierto (o a punto de abrirse) con este componente, para no
  // apilar dos iguales: p. ej. el buscador de ejercicios del Planner.
  public isSidePanelOpening(component: unknown): boolean {
    return this.pendingSidePanelComponents.has(component);
  }

  public findSidePanel(component: unknown): HTMLIonModalElement | undefined {
    this.pruneSidePanels();
    return this.sidePanelStack.find((panel) => panel.component === component);
  }

  // Pide a un panel que se cierre por su propia vía (p. ej. con su aviso de
  // cambios sin guardar). El panel que lo gestione escucha "tfRequestClose",
  // hace preventDefault() y llama a detail.cancel() si el usuario se queda.
  // Si nadie lo gestiona, se cierra sin más. true = cerrado.
  public requestSidePanelClose(panel: HTMLIonModalElement): Promise<boolean> {
    return new Promise((resolve) => {
      let settled = false;
      const settle = (closed: boolean) => {
        if (settled) return;
        settled = true;
        resolve(closed);
      };
      void panel.onDidDismiss().then(() => settle(true));
      const request = new CustomEvent('tfRequestClose', {
        cancelable: true,
        detail: { cancel: () => settle(false) },
      });
      if (panel.dispatchEvent(request)) void panel.dismiss(undefined, 'cancel');
    });
  }

  public async closeSidePanels(): Promise<void> {
    for (const panel of [...this.sidePanelStack].reverse()) {
      await panel.dismiss(undefined, 'cancel');
    }
  }

  // Cierra solo los paneles abiertos desde `origin` (p. ej. Filtros al abrir
  // Configurar ejercicio desde el buscador): sin esto quedaban los dos a la
  // vez, cada uno en su columna.
  public async closeChildSidePanels(origin?: HTMLElement): Promise<void> {
    const parent = origin?.closest('ion-modal');
    if (!parent) return;
    for (const panel of [...this.sidePanelStack].reverse()) {
      if (this.sidePanelParents.get(panel) === parent) await panel.dismiss(undefined, 'cancel');
    }
  }

  // Columna de cada panel (0 = derecha): un hijo va una a la izquierda de
  // su padre, o en la misma si se abrió encima; uno sin padre, según su
  // posición en la pila (como hasta ahora).
  private updateSidePanelLevels(): void {
    const levels = IonicUtilService.SIDE_PANEL_LEVELS;
    const columns = new Map<HTMLIonModalElement, number>();
    this.sidePanelStack.forEach((panel, index) => {
      const parent = this.sidePanelParents.get(panel);
      const column = parent && columns.has(parent)
        ? columns.get(parent)! + (this.sidePanelsOverParent.has(panel) ? 0 : 1)
        : index;
      columns.set(panel, column);
      panel.classList.remove(...levels);
      panel.classList.add(levels[Math.min(column, levels.length - 1)]);
    });
  }

  // Ionic oculta el router y los overlays anteriores también al presentar
  // un toast. Restaurarlos solo mientras no haya un diálogo realmente modal
  // mantiene operativos teclado/lector, sin afectar confirmaciones ni alerts.
  private watchSidePanelAccessibility(): void {
    if (this.sidePanelAccessibilityCleanup) return;
    const events = ['Modal', 'Alert', 'Popover', 'ActionSheet', 'Loading', 'Picker', 'Toast']
      .flatMap((name) => [`ion${name}DidPresent`, `ion${name}DidDismiss`]);
    const sync = () => { setTimeout(() => this.syncSidePanelAccessibility()); };
    events.forEach((name) => document.addEventListener(name, sync));
    this.sidePanelAccessibilityCleanup = () => {
      events.forEach((name) => document.removeEventListener(name, sync));
    };
  }

  private syncSidePanelAccessibility(): void {
    const blockingOverlay = Array.from(document.querySelectorAll(
      'ion-modal, ion-alert, ion-action-sheet, ion-loading, ion-picker, ion-popover',
    )).some((overlay) => !overlay.classList.contains('overlay-hidden') &&
      !overlay.classList.contains('tf-planner-panel'));
    if (blockingOverlay) return;
    const root = document.querySelector('ion-app') ?? document.body;
    root.querySelector('ion-router-outlet, ion-nav, #ion-view-container-root')?.removeAttribute('aria-hidden');
    this.sidePanelStack.forEach((panel) => panel.removeAttribute('aria-hidden'));
  }

  // Un panel destruido sin pasar por onDidDismiss (navegación) no debe
  // seguir contando como "abierto".
  private pruneSidePanels(): void {
    for (let i = this.sidePanelStack.length - 1; i >= 0; i--) {
      if (!this.sidePanelStack[i].isConnected) {
        this.sidePanelParents.delete(this.sidePanelStack[i]);
        this.sidePanelsOverParent.delete(this.sidePanelStack[i]);
        this.sidePanelStack.splice(i, 1);
      }
    }
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
    const enterSubmitIndex = environment.auth?.clientFamily === 'trainfit-trainers'
      ? alertEnterSubmitIndex(alert) : -1;
    const onEnter = (event: KeyboardEvent) => {
      const button = showAlert.querySelectorAll<HTMLButtonElement>('.alert-button')[enterSubmitIndex];
      submitOnEnter(event, showAlert, button);
    };
    if (enterSubmitIndex >= 0) {
      showAlert.setAttribute('data-enter-submit-scope', '');
      showAlert.addEventListener('keydown', onEnter);
    }

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
    showAlert.removeEventListener('keydown', onEnter);
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
    defaultMessage: string = this.injector.get(TranslateService).instant('HTTP_ERRORS.GENERIC'),
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
