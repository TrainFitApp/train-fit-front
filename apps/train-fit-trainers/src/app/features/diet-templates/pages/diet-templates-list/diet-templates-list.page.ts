import { Component, OnInit } from '@angular/core';
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
  public state: ViewState = 'loading';
  public templates: DietTemplate[] = [];
  public newName = '';
  public isCreating = false;

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

  public load(): void {
    this.state = 'loading';
    this.dietTemplateApi.list().subscribe({
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
        this.ionicUtilService.showErrorToast('No se pudo crear la plantilla', 'Error', 3000);
      },
    });
  }

  public openTemplate(template: DietTemplate): void {
    this.router.navigate(['/tabs/diet-templates', template._id]);
  }

  public async confirmDelete(template: DietTemplate, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: 'Eliminar plantilla',
      message: `¿Eliminar "${template.name}"? No afecta a las dietas ya aplicadas a clientes.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.dietTemplateApi.delete(template._id).subscribe({
              next: () => this.load(),
              error: () => this.ionicUtilService.showErrorToast('No se pudo eliminar', 'Error', 3000),
            });
          },
        },
      ],
    });
  }

  public trackByTemplateId(_index: number, template: DietTemplate): string {
    return template._id;
  }

  public dayCount(template: DietTemplate): number {
    return template.days?.length || 0;
  }
}
