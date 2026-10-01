import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { RoutineTemplateApiService } from 'src/app/core/services/routine-template/routine-template-api.service';
import { Table } from 'src/app/core/models/table';

// Rutinas -> Plantillas (rediseño 2026-08) — reemplaza a la antigua
// RoutinesOverviewPage (mostraba rutinas YA ASIGNADAS a clientes, sin
// relación con lo que promete el nombre "Rutinas" en el hub de Plantillas).
// Esta pantalla es la biblioteca real de plantillas de rutina COMPLETA
// (microciclos/splits/workouts) del profesional — distinta de RoutinesPage
// (/tabs/routines, "Entrenamientos": plantilla de un solo día/sesión).
// El contenido (semanas/entrenamientos/ejercicios/series) se autoría con el
// mismo Planificador (PlannerModule) que ya usan las rutinas reales de
// cliente — ver shell-routing.module.ts, ruta 'routine-templates/:tableId/planner'.
// Aplicar una plantilla a un cliente concreto vive en la ficha del cliente
// (client-detail.page.ts, panel "Asignar rutina" > "Usar plantilla"), no aquí.
@Component({
  selector: 'app-routine-templates',
  templateUrl: 'routine-templates.page.html',
  styleUrls: ['routine-templates.page.scss'],
})
export class RoutineTemplatesPage implements OnInit {
  private readonly translate = inject(TranslateService);

  public templates: Table[] = [];
  public loading = true;
  public newName = '';
  public isCreating = false;

  constructor(
    private routineTemplateApi: RoutineTemplateApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadTemplates();
  }

  // ion-router-outlet cachea la página al volver del Planificador (push/pop)
  // — mismo criterio que RoutinesPage/DietTemplatesListPage.
  public ionViewWillEnter(): void {
    this.loadTemplates();
  }

  private loadTemplates(): void {
    this.loading = true;
    this.routineTemplateApi.list().subscribe({
      next: (templates) => {
        this.templates = templates;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('TABLES.TEMPLATES_LOAD_ERROR'),
          duration: 2500,
        });
      },
    });
  }

  public microcyclesCount(template: Table): number {
    return (template.splits || []).length;
  }

  public workoutsCount(template: Table): number {
    return (template.splits || []).reduce(
      (total, split) => total + (split.workouts?.length || 0),
      0
    );
  }

  public trackByTemplateId(_index: number, template: Table): string {
    return template._id;
  }

  public createAndEdit(): void {
    const name = this.newName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;

    this.routineTemplateApi.create(name).subscribe({
      next: (template) => {
        this.isCreating = false;
        this.newName = '';
        this.openTemplate(template);
      },
      error: () => {
        this.isCreating = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('ROUTINE_TEMPLATES.NO_SE_PUDO_CREAR_LA'),
          duration: 2500,
        });
      },
    });
  }

  public openTemplate(template: Table): void {
    this.router.navigate(['/tabs/routine-templates', template._id, 'planner']);
  }

  public async confirmDelete(template: Table, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('ROUTINE_TEMPLATES.BORRAR_PLANTILLA'),
      message: this.translate.instant('ROUTINE_TEMPLATES.SEGURO_QUE_QUIERES_BORRAR_ESTA', { name: template.name }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.ERASE'),
          cssClass: 'alert-button-danger',
          handler: () => {
            this.routineTemplateApi.delete(template._id).subscribe({
              next: () => {
                this.templates = this.templates.filter((t) => t._id !== template._id);
                this.ionicUtilService.showToast({ message: this.translate.instant('ROUTINE_TEMPLATES.PLANTILLA_BORRADA'), duration: 1500 });
              },
              error: () => {
                this.ionicUtilService.showToast({
                  message: this.translate.instant('ROUTINE_TEMPLATES.NO_SE_PUDO_BORRAR_LA'),
                  duration: 2500,
                });
              },
            });
          },
        },
      ],
    });
  }
}
