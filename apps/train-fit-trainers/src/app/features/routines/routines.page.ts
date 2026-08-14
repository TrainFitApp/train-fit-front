import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import { WorkoutTemplate, WorkoutTemplateLevel } from 'src/app/core/models/workout-template';

const LEVEL_LABELS: Record<WorkoutTemplateLevel, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

// Rediseño de entrenamiento (Fase A) — hub "Plantillas de rutinas" conectado
// a datos reales (WorkoutTemplate). El contenido (bloques/ejercicios/series)
// ahora SÍ se autoría directamente aquí — ver RoutineBuilderPage
// (pages/routine-builder/), única superficie de edición (mismo patrón que
// diet-templates: lista con creación inline por nombre + página de builder
// con ruta propia ':id', sin autosave). Ya no hay un alert de edición de
// metadata aparte — evita dos caminos divergentes para lo mismo.
@Component({
  selector: 'app-routines',
  templateUrl: 'routines.page.html',
  styleUrls: ['routines.page.scss'],
})
export class RoutinesPage implements OnInit {
  public templates: WorkoutTemplate[] = [];
  public loading = true;
  public newName = '';
  public isCreating = false;
  public isDuplicating = false;

  public readonly levelLabels = LEVEL_LABELS;

  constructor(
    private workoutTemplateApi: WorkoutTemplateApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadTemplates();
  }

  // ion-router-outlet cachea la página al volver del builder (push/pop) —
  // sin esto, "Volver" desde routine-builder.page.ts mostraría la lista
  // desactualizada (la plantilla recién creada/editada no aparecería hasta
  // un refresco manual). ngOnInit solo se dispara una vez por instancia.
  public ionViewWillEnter(): void {
    this.loadTemplates();
  }

  private loadTemplates(): void {
    this.loading = true;
    this.workoutTemplateApi.list().subscribe({
      next: (templates) => {
        this.templates = templates;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.ionicUtilService.showToast({
          message: 'No se pudieron cargar las plantillas',
          duration: 2500,
        });
      },
    });
  }

  public exerciseCount(template: WorkoutTemplate): number {
    return (template.blocks || []).reduce(
      (total, block) => total + (block.exercises?.length || 0),
      0
    );
  }

  public blockCount(template: WorkoutTemplate): number {
    return (template.blocks || []).length;
  }

  public trackByTemplateId(_index: number, template: WorkoutTemplate): string {
    return template._id;
  }

  public createAndEdit(): void {
    const name = this.newName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;

    this.workoutTemplateApi.create({ name }).subscribe({
      next: (template) => {
        this.isCreating = false;
        this.newName = '';
        this.openTemplate(template);
      },
      error: () => {
        this.isCreating = false;
        this.ionicUtilService.showToast({
          message: 'No se pudo crear la plantilla',
          duration: 2500,
        });
      },
    });
  }

  public openTemplate(template: WorkoutTemplate): void {
    this.router.navigate(['/tabs/routines', template._id]);
  }

  // TASK-039 (MASTER_BACKLOG.md) — antes, una variante ligera de una
  // plantilla existente exigía reconstruirla íntegra desde cero. Duplica
  // en el frontend (sin endpoint nuevo): create() ya acepta blocks
  // completos. exercise viene poblado ({_id, name}) en el listado — se
  // normaliza al id string plano, mismo criterio que
  // routine-builder.page.ts#save() al guardar.
  public duplicateTemplate(template: WorkoutTemplate, event: Event): void {
    event.stopPropagation();
    if (this.isDuplicating) return;
    this.isDuplicating = true;

    this.workoutTemplateApi
      .create({
        name: `${template.name} (copia)`,
        description: template.description,
        level: template.level,
        tags: template.tags,
        equipment: template.equipment,
        blocks: (template.blocks || []).map((block) => ({
          ...block,
          exercises: (block.exercises || []).map((ex) => ({
            ...ex,
            exercise: typeof ex.exercise === 'string' ? ex.exercise : ex.exercise._id,
          })),
        })),
      })
      .subscribe({
        next: (created) => {
          this.isDuplicating = false;
          this.templates = [created, ...this.templates];
          this.ionicUtilService.showToast({ message: 'Plantilla duplicada', duration: 1500 });
        },
        error: () => {
          this.isDuplicating = false;
          this.ionicUtilService.showToast({
            message: 'No se pudo duplicar la plantilla',
            duration: 2500,
          });
        },
      });
  }

  public async confirmDelete(template: WorkoutTemplate, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: 'Borrar plantilla',
      message: `¿Seguro que quieres borrar "${template.name}"? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.workoutTemplateApi.delete(template._id).subscribe({
              next: () => {
                this.templates = this.templates.filter((t) => t._id !== template._id);
                this.ionicUtilService.showToast({ message: 'Plantilla borrada', duration: 1500 });
              },
              error: () => {
                this.ionicUtilService.showToast({
                  message: 'No se pudo borrar la plantilla',
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
