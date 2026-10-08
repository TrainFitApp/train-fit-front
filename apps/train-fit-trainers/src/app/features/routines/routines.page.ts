import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import { WorkoutTemplate, WorkoutTemplateExerciseRef } from 'src/app/core/models/workout-template';
import {
  estimateSessionSeconds,
  exerciseKind,
  fromTemplateSets,
  roundedMinutes,
  templateEquipment,
} from './utils/template-sets';

const PREVIEW_EXERCISES = 4;

// Lo que pinta cada tarjeta, calculado una vez al cargar (no en cada
// detección de cambios).
interface TemplateCard {
  template: WorkoutTemplate;
  exerciseNames: string[];
  moreExercises: number;
  exerciseCount: number;
  setCount: number;
  minutes: number;
  // Material, sacado de los ejercicios (el guardado puede ser de antes).
  equipment: string[];
  searchText: string;
}

// Biblioteca de plantillas de entrenamiento (WorkoutTemplate: una sesión).
// Crear abre el builder en '/tabs/routines/new': la plantilla no existe en
// el back hasta que se guarda (ver RoutineBuilderPage). Mismo patrón que
// diet-templates: lista + builder con ruta propia, sin autoguardado.
@Component({
  selector: 'app-routines',
  templateUrl: 'routines.page.html',
  styleUrls: ['routines.page.scss'],
})
export class RoutinesPage implements OnInit {
  private readonly translate = inject(TranslateService);

  public cards: TemplateCard[] = [];
  public loading = true;
  public search = '';
  public isDuplicating = false;

  // Misma referencia mientras no cambien la búsqueda ni la lista (*ngFor).
  private filterCache: { cards: TemplateCard[]; term: string; value: TemplateCard[] } | null = null;

  constructor(
    private workoutTemplateApi: WorkoutTemplateApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadTemplates();
  }

  // ion-router-outlet cachea la página al volver del builder: sin esto la
  // lista no mostraría la plantilla recién creada o editada.
  public ionViewWillEnter(): void {
    this.loadTemplates();
  }

  private loadTemplates(): void {
    this.loading = !this.cards.length;
    this.workoutTemplateApi.list().subscribe({
      next: (templates) => {
        this.cards = templates.map((template) => this.toCard(template));
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

  private toCard(template: WorkoutTemplate): TemplateCard {
    const exercises = (template.blocks || []).flatMap((block) => block.exercises || []);
    const refs = exercises.map((ex) => (typeof ex.exercise === 'string' ? null : (ex.exercise as WorkoutTemplateExerciseRef)));
    const equipment = templateEquipment(refs);
    const names = exercises.map((ex) =>
      typeof ex.exercise === 'string' ? this.translate.instant('TABLES.EXERCISE_DELETED') : ex.exercise?.name || ''
    );
    const durationBlocks = (template.blocks || []).map((block) => ({
      type: block.type,
      restBetweenExercises: block.restBetweenExercises ?? null,
      restBetweenRounds: block.restBetweenRounds ?? null,
      exercises: (block.exercises || []).map((ex) => {
        const kind = exerciseKind(typeof ex.exercise === 'string' ? null : ex.exercise);
        return { kind, sets: fromTemplateSets(ex.sets) };
      }),
    }));

    return {
      template,
      exerciseNames: names.slice(0, PREVIEW_EXERCISES),
      moreExercises: Math.max(0, names.length - PREVIEW_EXERCISES),
      exerciseCount: exercises.length,
      setCount: exercises.reduce((total, ex) => total + (ex.sets?.length || 0), 0),
      minutes: roundedMinutes(estimateSessionSeconds(durationBlocks)),
      equipment,
      searchText: [template.name, template.description, ...(template.tags || []), ...names, ...equipment]
        .join(' ')
        .toLowerCase(),
    };
  }

  public get filteredCards(): TemplateCard[] {
    const term = this.search.trim().toLowerCase();
    if (this.filterCache?.cards !== this.cards || this.filterCache.term !== term) {
      this.filterCache = {
        cards: this.cards,
        term,
        value: term ? this.cards.filter((card) => card.searchText.includes(term)) : this.cards,
      };
    }
    return this.filterCache.value;
  }

  public clearFilters(): void {
    this.search = '';
  }

  public trackByTemplateId(_index: number, card: TemplateCard): string {
    return card.template._id;
  }

  public createTemplate(): void {
    void this.router.navigate(['/tabs/routines', 'new']);
  }

  public openTemplate(template: WorkoutTemplate): void {
    void this.router.navigate(['/tabs/routines', template._id]);
  }

  // Una variante de una plantilla existente (TASK-039): se copia entera y se
  // abre la copia para cambiar lo que haga falta. Las fichas de ejercicio
  // se mandan como id, igual que al guardar desde el builder.
  public duplicateTemplate(template: WorkoutTemplate, event: Event): void {
    event.stopPropagation();
    if (this.isDuplicating) return;
    this.isDuplicating = true;

    this.workoutTemplateApi
      .create({
        name: this.translate.instant('ROUTINES.NOMBRE_COPIA', { name: template.name }).slice(0, 100),
        notes: template.notes,
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
          this.cards = [this.toCard(created), ...this.cards];
          this.ionicUtilService.showToast({ message: this.translate.instant('ROUTINES.PLANTILLA_DUPLICADA'), duration: 1500 });
          this.openTemplate(created);
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
                this.cards = this.cards.filter((card) => card.template._id !== template._id);
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
