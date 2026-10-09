import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import { WorkoutTemplate, WorkoutTemplateLevel } from 'src/app/core/models/workout-template';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

const LEVEL_LABELS: Record<WorkoutTemplateLevel, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};
localizeRecord(LEVEL_LABELS, 'PLANNER.TEMPLATE_LEVELS');

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
  private readonly translate = inject(TranslateService);

  public templates: WorkoutTemplate[] = [];
  public loading = true;
  public newName = '';
  public isCreating = false;
  // Hoja inferior de alta (nombre + Crear), como en Dietas.
  public showCreateSheet = false;
  public isDuplicating = false;

  public readonly levelLabels = LEVEL_LABELS;

  @ViewChild('createNameInput') private createNameInput?: ElementRef<HTMLInputElement>;

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

  // La página queda cacheada al abrir una plantilla: sin esto, la hoja de
  // alta seguiría abierta al volver.
  public ionViewWillLeave(): void {
    this.showCreateSheet = false;
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
          message: this.translate.instant('TABLES.TEMPLATES_LOAD_ERROR'),
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

  public openCreateSheet(): void {
    this.newName = '';
    this.showCreateSheet = true;
    // El campo existe tras el siguiente render (*ngIf de la hoja).
    setTimeout(() => this.createNameInput?.nativeElement.focus());
  }

  public closeCreateSheet(): void {
    if (this.isCreating) return;
    this.showCreateSheet = false;
  }

  public createAndEdit(): void {
    const name = this.newName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;

    this.workoutTemplateApi.create({ name }).subscribe({
      next: (template) => {
        this.isCreating = false;
        this.showCreateSheet = false;
        this.openTemplate(template);
      },
      error: () => {
        this.isCreating = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('ROUTINES.NO_SE_PUDO_CREAR_LA'),
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
        name: this.translate.instant('ROUTINES.COPY_NAME', { name: template.name }),
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
          this.ionicUtilService.showToast({ message: this.translate.instant('ROUTINES.PLANTILLA_DUPLICADA'), duration: 1500 });
        },
        error: () => {
          this.isDuplicating = false;
          this.ionicUtilService.showToast({
            message: this.translate.instant('ROUTINES.NO_SE_PUDO_DUPLICAR_LA'),
            duration: 2500,
          });
        },
      });
  }

  public async confirmDelete(template: WorkoutTemplate, event: Event): Promise<void> {
    event.stopPropagation();
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('ROUTINES.BORRAR_PLANTILLA'),
      message: this.translate.instant('ROUTINES.SEGURO_QUE_QUIERES_BORRAR_ESTA', { name: template.name }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.ERASE'),
          cssClass: 'alert-button-danger',
          handler: () => {
            this.workoutTemplateApi.delete(template._id).subscribe({
              next: () => {
                this.templates = this.templates.filter((t) => t._id !== template._id);
                this.ionicUtilService.showToast({ message: this.translate.instant('ROUTINES.PLANTILLA_BORRADA'), duration: 1500 });
              },
              error: () => {
                this.ionicUtilService.showToast({
                  message: this.translate.instant('ROUTINES.NO_SE_PUDO_BORRAR_LA'),
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
