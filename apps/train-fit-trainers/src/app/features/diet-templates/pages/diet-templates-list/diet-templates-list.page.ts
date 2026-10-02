import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietTemplateApiService } from '../../services/diet-template-api.service';
import { DietTemplate } from '../../models/diet-template.model';

type ViewState = 'loading' | 'error' | 'loaded';

// Replanteamiento MVP (nutrición) — biblioteca de plantillas de dieta del
// profesional, reutilizables entre clientes (mismo espíritu que las
// plantillas de Table para rutinas).
@Component({
  selector: 'app-diet-templates-list',
  templateUrl: 'diet-templates-list.page.html',
  styleUrls: ['diet-templates-list.page.scss'],
})
export class DietTemplatesListPage implements OnInit {
  private readonly translate = inject(TranslateService);

  public state: ViewState = 'loading';
  public templates: DietTemplate[] = [];
  public newName = '';
  public isCreating = false;
  // Plantilla abierta en la vista previa de solo lectura (null = cerrada).
  public previewTemplate: DietTemplate | null = null;

  constructor(
    private dietTemplateApi: DietTemplateApiService,
    private router: Router,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  // ion-router-outlet cachea la página al volver del builder (push/pop) —
  // sin esto, "Volver" desde diet-template-builder.page.ts mostraría la
  // lista desactualizada (la plantilla recién creada/editada no aparecería
  // hasta un refresco manual). ngOnInit solo se dispara una vez por
  // instancia. Mismo fix ya aplicado en RoutinesPage (TASK-013).
  public ionViewWillEnter(): void {
    this.load();
  }

  // La página queda cacheada al abrir una plantilla: sin esto, la vista
  // previa seguiría abierta al volver.
  public ionViewWillLeave(): void {
    this.closePreview();
  }

  public openPreview(template: DietTemplate): void {
    this.previewTemplate = template;
  }

  public closePreview(): void {
    this.previewTemplate = null;
  }

  public load(): void {
    this.state = 'loading';
    this.dietTemplateApi.list({ includeOwned: true }).subscribe({
      next: (templates) => {
        this.templates = templates || [];
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public createAndEdit(): void {
    const name = this.newName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;
    this.dietTemplateApi.create(name, []).subscribe({
      next: (template) => {
        this.isCreating = false;
        this.openTemplate(template);
      },
      error: () => {
        this.isCreating = false;
        this.ionicUtilService.showErrorToast(this.translate.instant('DIET_TEMPLATES.NO_SE_PUDO_CREAR_LA_2'), this.translate.instant('COMMON.ERROR'), 3000);
      },
    });
  }

  public openTemplate(template: DietTemplate): void {
    this.router.navigate(['/tabs/diet-templates', template._id]);
  }

  public async confirmDelete(template: DietTemplate, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('DIET_TEMPLATES.ELIMINAR_PLANTILLA_2'),
      message: this.translate.instant('DIET_TEMPLATES.ELIMINAR_NO_AFECTA_LAS_DIETAS', { name: template.name }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            this.dietTemplateApi.delete(template._id).subscribe({
              next: () => this.load(),
              error: () => this.ionicUtilService.showErrorToast(this.translate.instant('DIET_TEMPLATES.NO_SE_PUDO_ELIMINAR'), this.translate.instant('COMMON.ERROR'), 3000),
            });
          },
        },
      ],
    });
  }

  public trackByTemplateId(_index: number, template: DietTemplate): string {
    return template._id;
  }

  public menuCount(template: DietTemplate): number {
    return template.menus?.length || 0;
  }

  // Sugerencias de dieta — aptitud efectiva (derivada ∪ forzada a mano).
  public effectiveSuitableFor(template: DietTemplate): string[] {
    const set = new Set([...(template.suitableFor || []), ...(template.suitableForOverride || [])]);
    return [...set];
  }
}
