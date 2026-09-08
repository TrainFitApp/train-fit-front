import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import {
  WorkoutTemplate,
  WorkoutTemplateBlock,
  WorkoutTemplateBlockType,
  WorkoutTemplateExercise,
  WorkoutTemplateLevel,
} from 'src/app/core/models/workout-template';
import { Exercise } from 'src/app/core/models/exercise';
import { PendingChangesComponent } from 'src/app/core/guards/pending-changes.guard';
import { confirmDiscardChanges } from '../../../../shared/navigation/confirm-discard-changes';
import { SearchExercisesPage } from 'src/app/shared/components/search-exercises/search-exercises.page';
import {
  ExerciseScheme,
  buildSetsFromScheme,
  defaultSchemeFor,
  schemeFromExistingSets,
  schemeSummary,
} from './template-scheme.util';

type ViewState = 'loading' | 'error' | 'loaded';

interface BuilderExercise {
  exercise: Exercise;
  notes: string;
  scheme: ExerciseScheme;
}

interface BuilderBlock {
  name: string;
  type: WorkoutTemplateBlockType;
  rounds: number | null;
  restBetweenExercises: number | null;
  restBetweenRounds: number | null;
  instructions: string;
  exercises: BuilderExercise[];
}

const BLOCK_TYPES: WorkoutTemplateBlockType[] = ['straight', 'superset', 'circuit', 'warmup', 'finisher'];

const BLOCK_TYPE_LABELS: Record<WorkoutTemplateBlockType, string> = {
  straight: 'Recta',
  superset: 'Superserie',
  circuit: 'Circuito',
  warmup: 'Calentamiento',
  finisher: 'Finisher',
};

const LEVEL_LABELS: Record<WorkoutTemplateLevel, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

// Plantillas de entrenamiento — constructor de contenido desde cero (la
// pieza que faltaba: routines.page.ts solo gestionaba metadata, nunca
// bloques/ejercicios/series). Mismo esqueleto que
// diet-template-builder.page.ts: carga vía list() + find por id (sin
// endpoint GET-one dedicado), estado local editable, sin autosave, "Guardar"
// explícito. blocks[].exercises[].exercise viene poblado por el backend
// (populate en workout-template-dao.js#listByTrainer/update) — SIEMPRE
// objeto Exercise aquí, nunca string; se normaliza a id plano solo al
// construir el payload de guardado (ver save()).
@Component({
  selector: 'app-routine-builder',
  templateUrl: 'routine-builder.page.html',
  styleUrls: ['routine-builder.page.scss'],
})
export class RoutineBuilderPage implements OnInit, PendingChangesComponent {
  public state: ViewState = 'loading';
  public templateId = '';

  public name = '';
  public description = '';
  public level: WorkoutTemplateLevel = 'intermedio';
  public tagsText = '';
  public equipmentText = '';
  public blocks: BuilderBlock[] = [];

  public isSaving = false;

  // Sin autoguardado: lo editado solo existe en memoria hasta pulsar
  // "Guardar". Se compara el payload actual contra el de la última carga o
  // guardado para saber si hay cambios que perder (pendingChangesGuard).
  private savedSnapshot = '';

  public readonly levels = LEVEL_LABELS;
  public readonly levelKeys: WorkoutTemplateLevel[] = ['principiante', 'intermedio', 'avanzado'];
  public readonly blockTypeLabels = BLOCK_TYPE_LABELS;
  public readonly schemeSummary = schemeSummary;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private workoutTemplateApi: WorkoutTemplateApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  // TASK-051 (MASTER_BACKLOG.md) — antes leía el :id una sola vez de
  // route.snapshot en ngOnInit. Sin explotar hoy (routines.page.ts no
  // navega de una plantilla abierta directamente a otra sin pasar por la
  // lista), pero si el Router llegara a reutilizar esta instancia entre dos
  // navegaciones ':id' distintas de la misma ruta (comportamiento por
  // defecto de Angular cuando solo cambia el parámetro), ngOnInit no
  // volvería a dispararse y se seguiría editando la plantilla vieja.
  // Suscripción reactiva en vez de snapshot — recarga si el id cambia.
  public ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.templateId = params.get('id') || '';
      this.load();
    });
  }

  public load(): void {
    this.state = 'loading';
    this.workoutTemplateApi.list().subscribe({
      next: (templates) => {
        const template = (templates || []).find((t) => t._id === this.templateId);
        if (!template) {
          this.state = 'error';
          return;
        }
        this.applyTemplate(template);
        this.savedSnapshot = this.snapshot();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private applyTemplate(template: WorkoutTemplate): void {
    this.name = template.name;
    this.description = template.description || '';
    this.level = template.level || 'intermedio';
    this.tagsText = (template.tags || []).join(', ');
    this.equipmentText = (template.equipment || []).join(', ');
    this.blocks = (template.blocks || []).map((block) => this.blockFromTemplate(block));
  }

  private blockFromTemplate(block: WorkoutTemplateBlock): BuilderBlock {
    return {
      name: block.name || '',
      type: block.type || 'straight',
      rounds: block.rounds ?? null,
      restBetweenExercises: block.restBetweenExercises ?? null,
      restBetweenRounds: block.restBetweenRounds ?? null,
      instructions: block.instructions || '',
      exercises: (block.exercises || []).map((ex) => this.exerciseFromTemplate(ex)),
    };
  }

  private exerciseFromTemplate(ex: WorkoutTemplateExercise): BuilderExercise {
    const exercise =
      typeof ex.exercise === 'string' ? ({ _id: ex.exercise, name: '?' } as Exercise) : (ex.exercise as Exercise);
    return {
      exercise,
      notes: ex.notes || '',
      scheme: schemeFromExistingSets(ex.sets, exercise),
    };
  }

  public trackByIndex(index: number): number {
    return index;
  }

  // --- Bloques ---

  public async addBlockAlert(): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Nuevo bloque',
      inputs: [{ name: 'name', type: 'text', placeholder: 'Nombre (opcional)' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Siguiente',
          handler: (data: any) => {
            this.chooseBlockTypeAlert((data?.name || '').trim());
            return true;
          },
        },
      ],
    });
  }

  // AlertController no soporta mezclar inputs de texto con radio en el mismo
  // alert — el tipo de bloque se elige en un segundo paso encadenado, mismo
  // patrón que chooseBlockTypeAlert en workout.component.ts.
  private async chooseBlockTypeAlert(name: string): Promise<void> {
    const inputs = BLOCK_TYPES.map((type, index) => ({
      type: 'radio' as const,
      label: this.blockTypeLabels[type],
      value: type,
      checked: index === 0,
    }));

    await this.ionicUtilService.showAlert({
      header: 'Tipo de bloque',
      inputs,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (type: WorkoutTemplateBlockType) => {
            this.blocks.push({
              name,
              type: type || 'straight',
              rounds: null,
              restBetweenExercises: null,
              restBetweenRounds: null,
              instructions: '',
              exercises: [],
            });
            return true;
          },
        },
      ],
    });
  }

  public async editBlockAlert(block: BuilderBlock): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: block.name || this.blockTypeLabels[block.type],
      buttons: [
        {
          text: 'Renombrar',
          handler: () => {
            this.renameBlockAlert(block);
            return false;
          },
        },
        {
          text: 'Rondas / descansos',
          handler: () => {
            this.blockTimingAlert(block);
            return false;
          },
        },
        {
          text: 'Borrar bloque',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.confirmDeleteBlock(block);
            return false;
          },
        },
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
  }

  private async renameBlockAlert(block: BuilderBlock): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Renombrar bloque',
      inputs: [{ name: 'name', type: 'text', value: block.name }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data: any) => {
            block.name = (data?.name || '').trim();
            return true;
          },
        },
      ],
    });
  }

  private async blockTimingAlert(block: BuilderBlock): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Rondas y descansos',
      inputs: [
        { name: 'rounds', type: 'number', placeholder: 'Rondas', value: block.rounds ?? '' },
        {
          name: 'restBetweenExercises',
          type: 'number',
          placeholder: 'Descanso entre ejercicios (s)',
          value: block.restBetweenExercises ?? '',
        },
        {
          name: 'restBetweenRounds',
          type: 'number',
          placeholder: 'Descanso entre rondas (s)',
          value: block.restBetweenRounds ?? '',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data: any) => {
            block.rounds = data?.rounds !== '' && data?.rounds != null ? Number(data.rounds) : null;
            block.restBetweenExercises =
              data?.restBetweenExercises !== '' && data?.restBetweenExercises != null
                ? Number(data.restBetweenExercises)
                : null;
            block.restBetweenRounds =
              data?.restBetweenRounds !== '' && data?.restBetweenRounds != null
                ? Number(data.restBetweenRounds)
                : null;
            return true;
          },
        },
      ],
    });
  }

  private async confirmDeleteBlock(block: BuilderBlock): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Borrar bloque',
      message: `¿Seguro que quieres borrar "${block.name || this.blockTypeLabels[block.type]}"? Se perderán sus ejercicios.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.blocks = this.blocks.filter((b) => b !== block);
          },
        },
      ],
    });
  }

  // --- Ejercicios ---

  public async addExercise(block: BuilderBlock): Promise<void> {
    const modalOptions: ModalOptions = {
      component: SearchExercisesPage,
      componentProps: { pickerMode: true },
      cssClass: 'tf-panel-modal',
    };

    // pickerMode ahora es selección múltiple — confirma con todos los
    // ejercicios marcados a la vez (ver confirmPickerSelection() en
    // SearchExercisesPage), no con uno solo por apertura del picker.
    const res = await this.ionicUtilService.showModal(modalOptions);
    const exercises = res?.data as Exercise[] | undefined;
    if (!exercises?.length) return;

    exercises.forEach((exercise) => {
      block.exercises.push({
        exercise,
        notes: '',
        scheme: defaultSchemeFor(exercise),
      });
    });
  }

  public removeExercise(block: BuilderBlock, exercise: BuilderExercise): void {
    block.exercises = block.exercises.filter((e) => e !== exercise);
  }

  public isSchemeNormal(scheme: ExerciseScheme): scheme is Extract<ExerciseScheme, { kind: 'normal' }> {
    return scheme.kind === 'normal';
  }

  public isSchemeIsometric(scheme: ExerciseScheme): scheme is Extract<ExerciseScheme, { kind: 'isometric' }> {
    return scheme.kind === 'isometric';
  }

  public isSchemeCardio(scheme: ExerciseScheme): scheme is Extract<ExerciseScheme, { kind: 'cardio' }> {
    return scheme.kind === 'cardio';
  }

  // --- Guardar ---

  public get canSave(): boolean {
    return this.name.trim().length > 0 && !this.isSaving;
  }

  private buildPayload(): Partial<WorkoutTemplate> {
    const tags = this.tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const equipment = this.equipmentText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const blocks: WorkoutTemplateBlock[] = this.blocks.map((block, blockIndex) => ({
      name: block.name,
      type: block.type,
      order: blockIndex,
      rounds: block.rounds,
      restBetweenExercises: block.restBetweenExercises,
      restBetweenRounds: block.restBetweenRounds,
      instructions: block.instructions,
      exercises: block.exercises.map((ex, exIndex) => ({
        // Normalizar a id string plano — el estado local guarda el Exercise
        // poblado completo; enviarlo tal cual haría que Mongoose falle al
        // castear un objeto plano a ObjectId.
        exercise: ex.exercise._id,
        order: exIndex,
        notes: ex.notes,
        sets: buildSetsFromScheme(ex.scheme),
      })),
    }));

    return {
      name: this.name.trim(),
      description: this.description.trim(),
      level: this.level,
      tags,
      equipment,
      blocks,
    };
  }

  private snapshot(): string {
    return JSON.stringify(this.buildPayload());
  }

  public async canDeactivate(): Promise<boolean> {
    if (this.state !== 'loaded' || this.snapshot() === this.savedSnapshot) return true;
    return confirmDiscardChanges(this.ionicUtilService);
  }

  public save(): void {
    if (!this.canSave) return;
    this.isSaving = true;

    const payload = this.buildPayload();

    this.workoutTemplateApi
      .update(this.templateId, payload)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.savedSnapshot = JSON.stringify(payload);
          this.ionicUtilService.showToast({ message: 'Plantilla guardada', duration: 1500 });
        },
        error: () => {
          this.isSaving = false;
          this.ionicUtilService.showToast({ message: 'No se pudo guardar la plantilla', duration: 2500 });
        },
      });
  }
}
