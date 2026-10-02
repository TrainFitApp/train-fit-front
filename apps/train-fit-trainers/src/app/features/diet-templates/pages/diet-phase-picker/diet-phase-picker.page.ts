import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { TrainerNavigationService } from '../../../../core/services/trainer-navigation.service';
import { DietSuggestionDrawerComponent } from '../../components/diet-suggestion-drawer/diet-suggestion-drawer.component';
import { DietSuggestionSessionService } from '../../services/diet-suggestion-session.service';
import { DietTemplate } from '../../models/diet-template.model';
import { DietTemplateApiService } from '../../services/diet-template-api.service';

// Sugerencias de dieta — "Empezar fase" (ficha del cliente) trae AQUÍ, a la
// biblioteca de dietas, en vez de pintar la lista rankeada dentro de la
// propia ficha. Elegir la dieta de una fase es elegir de la biblioteca: es
// la misma tarjeta (app-diet-card) y la misma colección, solo que ordenada
// por lo que pide este cliente. Tenerla en dos sitios obligaba a mantener
// dos rejillas y dejaba la ficha en un "modo" del que había que salir.
//
// El panel de parámetros (diet-suggestion-drawer) se abre a la derecha de
// ESTA pantalla y es quien aplica la fase; la lista solo marca cuál. Estado
// compartido en DietSuggestionSessionService.
@Component({
  selector: 'app-diet-phase-picker',
  templateUrl: 'diet-phase-picker.page.html',
  styleUrls: ['diet-phase-picker.page.scss'],
})
export class DietPhasePickerPage {
  private readonly translate = inject(TranslateService);

  public clientId = '';
  public clientName = this.translate.instant('DIET_TEMPLATES.ESTE_CLIENTE');

  private drawer: HTMLIonModalElement | null = null;

  // Dieta abierta en la vista previa de solo lectura (null = cerrada).
  public previewTemplate: DietTemplate | null = null;
  public previewFlags: string[] = [];

  // El panel se cierra desde dos sitios: él mismo (confirmar / cancelar) o
  // esta página al abandonarla (botón Volver, atrás del sistema). Solo el
  // primero decide a dónde se va después.
  private leaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private navigation: TrainerNavigationService,
    private session: DietSuggestionSessionService,
    private dietTemplateApi: DietTemplateApiService
  ) {}

  // En ionViewWillEnter y no en ngOnInit: ion-router-outlet cachea la
  // página, así que ngOnInit solo se dispara la primera vez y volver a
  // entrar (otro cliente, u otra fase del mismo) no abriría el panel.
  public ionViewWillEnter(): void {
    this.clientId = this.route.snapshot.paramMap.get('clientId') || '';
    this.clientName = this.route.snapshot.queryParamMap.get('name') || this.translate.instant('DIET_TEMPLATES.ESTE_CLIENTE');
    this.leaving = false;
    this.closePreview();
    void this.openDrawer();
  }

  // Sin esto, el panel se quedaría flotando sobre la pantalla anterior: un
  // ion-modal vive en el injector raíz, no en el árbol de esta ruta.
  public ionViewWillLeave(): void {
    this.leaving = true;
    this.closePreview();
    void this.drawer?.dismiss(null, 'cancel');
  }

  public openPreview(event: { template: DietTemplate; flags: string[] }): void {
    this.previewTemplate = event.template;
    this.previewFlags = event.flags;
  }

  public closePreview(): void {
    this.previewTemplate = null;
  }

  private async openDrawer(): Promise<void> {
    if (this.drawer) return;
    this.session.reset();

    const modal = await this.modalController.create({
      component: DietSuggestionDrawerComponent,
      cssClass: 'tf-panel-modal-overlay',
      showBackdrop: false,
      backdropDismiss: false,
      componentProps: {
        clientId: this.clientId,
        clientName: this.clientName,
      },
    });
    this.drawer = modal;
    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    this.drawer = null;
    this.session.reset();
    if (this.leaving) return;

    if (role === 'create-from-scratch' && data) {
      // "Empezar de cero" → el builder en modo "para este cliente",
      // arrastrando el objetivo y el bloque de fase que ya se había
      // decidido en el panel.
      void this.router.navigate(['/tabs/diet-templates/for-client', this.clientId], {
        state: {
          clientName: this.clientName,
          name: data.phase?.name || this.translate.instant('DIET_TEMPLATES.NUEVA_DIETA'),
          startDate: data.startDate,
          phase: data.phase,
        },
      });
      return;
    }

    if (role === 'edit-before-apply' && data) {
      // Mismo builder "para este cliente" que "empezar de cero", pero
      // precargado con el contenido de la plantilla elegida (nunca se toca
      // esa plantilla: el builder construye una NUEVA propia del cliente a
      // partir de este contenido, igual que si se hubiera tecleado a mano).
      const template = await firstValueFrom(this.dietTemplateApi.getById(data.sourceTemplateId));
      void this.router.navigate(['/tabs/diet-templates/for-client', this.clientId], {
        state: {
          clientName: this.clientName,
          name: data.phase?.name || template.name || this.translate.instant('DIET_TEMPLATES.NUEVA_DIETA'),
          startDate: data.startDate,
          phase: data.phase,
          prefill: { name: template.name, menus: template.menus },
        },
      });
      return;
    }

    // Confirmada o cancelada, el sitio al que se vuelve es el mismo: la
    // ficha del cliente. Por navigation.back() y no con un navigate propio
    // para caer en la URL EXACTA de la que se vino (con sus query params) y
    // que la ficha se reconozca como vuelta atrás y restaure su pestaña. Si
    // la fase se ha aplicado, su ionViewWillEnter recarga plan y nutrición.
    this.navigation.back();
  }
}
