import { Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import {
  WorkoutTemplate,
  WorkoutTemplateBlock,
  WorkoutTemplateBlockType,
  WorkoutTemplateExercise,
  WorkoutTemplateExerciseRef,
  WorkoutTemplateInput,
} from 'src/app/core/models/workout-template';
import { Exercise } from 'src/app/core/models/exercise';
import { Workout } from 'src/app/core/models/workout';
import { PendingChangesComponent } from 'src/app/core/guards/pending-changes.guard';
import { confirmDiscardChanges } from '../../../../shared/navigation/confirm-discard-changes';
import { SearchExercisesPage } from 'src/app/shared/components/search-exercises/search-exercises.page';
import { ManageSetComponent } from 'src/app/features/tables/components/summary/components/manage-set/manage-set.component';
import {
  IntensityResult,
  IntensitySheetComponent,
} from 'src/app/features/tables/components/summary/components/mesocycle/components/intensity-sheet/intensity-sheet.component';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import {
  BLOCK_TYPE_LABELS,
  BlockDraft,
  BlockEditorPanelComponent,
  BlockEditorResult,
} from '../../components/block-editor-panel/block-editor-panel.component';
import {
  TemplateExercisePanelComponent,
  TemplateExercisePanelResult,
} from '../../components/template-exercise-panel/template-exercise-panel.component';
import {
  ExerciseKind,
  SetDraft,
  SetsOverview,
  estimateSessionSeconds,
  exerciseKind,
  formatRange,
  fromManageSet,
  fromTemplateSets,
  isFailure,
  parseRangeInput,
  parseRestInput,
  rangeToDraft,
  roundedMinutes,
  setsOverview,
  templateEquipment,
  toManageSet,
  toTemplateSets,
} from '../../utils/template-sets';
import {
  MuscleTreeRow,
  buildMuscleTreeRows,
  countWorkoutMuscleTree,
  keepReferenceWhileEqual,
} from '../../../planner/utils/planner-metrics';

type ViewState = 'loading' | 'error' | 'loaded';
type CellField = 'reps' | 'rir' | 'rest';

interface BuilderExercise {
  uid: number;
  exerciseId: string;
  // Ficha del ejercicio; null si ya no está en el catálogo (se conserva su
  // id al guardar para no perder la fila).
  exercise: WorkoutTemplateExerciseRef | null;
  kind: ExerciseKind;
  notes: string;
  sets: SetDraft[];
}

// Rondas, descansos e instrucciones no se editan (tampoco en el
// Planificador), pero se conservan si la plantilla los trae.
interface BuilderBlock extends BlockDraft {
  uid: number;
  rounds: number | null;
  restBetweenExercises: number | null;
  restBetweenRounds: number | null;
  instructions: string;
  exercises: BuilderExercise[];
}

const NEW_ID = 'new';

// Plantillas de entrenamiento — una sesión reutilizable, construida igual que
// un entrenamiento en el Planificador (workout.component en plannerMode):
//  - ejercicios sueltos o en bloques (nombre y tipo); los sueltos van al
//    final, "Sin agrupar", y se mueven a un bloque con su icono;
//  - cada ejercicio con su tabla de series (reps, RIR, descanso) editable en
//    la celda; el número de serie abre "Serie objetivo" (manage-set) y el
//    ejercicio, "Configurar ejercicio" en un panel lateral;
//  - un ejercicio nuevo entra sin series ("Añadir series").
// Estado local editable, sin autoguardado y "Guardar" explícito, como
// diet-template-builder. Ruta ':id' para editar y 'new' para crear: la
// plantilla no existe en el back hasta el primer guardado.
@Component({
  selector: 'app-routine-builder',
  templateUrl: 'routine-builder.page.html',
  styleUrls: ['routine-builder.page.scss'],
})
export class RoutineBuilderPage implements OnInit, PendingChangesComponent {
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly location = inject(Location);

  @ViewChild('nameInput') private nameInput?: ElementRef<HTMLInputElement>;

  public state: ViewState = 'loading';
  public templateId = '';
  public isNew = false;

  public name = '';
  public notes = '';
  public description = '';
  public tags: string[] = [];
  public blocks: BuilderBlock[] = [];
  public ungrouped: BuilderExercise[] = [];

  public isSaving = false;
  public nameError = false;
  public detailsOpen = false;
  // Móvil: indicaciones de la sesión plegadas (en escritorio, siempre a la vista).
  public notesOpen = false;

  // Etiquetas que el entrenador ya usa en otras plantillas (sugerencias).
  public libraryTags: string[] = [];

  // Ejercicios con las series plegadas (por uid). Solo es vista: no entra en
  // lo que se guarda ni en el aviso de cambios sin guardar.
  public collapsed = new Set<number>();

  // Edición en celda (como workout.component#startEditCell).
  public editing: { uid: number; index: number; field: CellField } | null = null;
  public editMin = '';
  public editMax = '';
  public editValue = '';

  // Sin autoguardado: lo editado solo existe en memoria hasta pulsar
  // "Guardar". Se compara el payload actual contra el de la última carga o
  // guardado para saber si hay cambios que perder (pendingChangesGuard).
  private savedSnapshot = '';
  private nextUid = 1;

  // "Serie objetivo" abierto desde la tabla: uno solo para todo el builder
  // (tocar otra serie la carga en el mismo panel, como en el Planificador).
  private setPanelLoader: ((set?: unknown) => void) | null = null;
  private setPanelTarget: { exercise: BuilderExercise; index: number } | null = null;

  public readonly blockTypeLabels = BLOCK_TYPE_LABELS;
  public readonly formatRange = formatRange;
  public readonly isFailure = isFailure;

  private readonly stableMuscleRows = keepReferenceWhileEqual<MuscleTreeRow[]>();
  private readonly stableEquipment = keepReferenceWhileEqual<string[]>();

  constructor(
    private route: ActivatedRoute,
    private workoutTemplateApi: WorkoutTemplateApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  // TASK-051 — suscripción reactiva al :id en vez de snapshot: si el Router
  // reutiliza la instancia entre dos ':id', no se queda editando la vieja.
  public ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id') || '';
      // Recién creada: el estado ya es el que se acaba de guardar.
      if (id === this.templateId && this.state === 'loaded') return;
      this.templateId = id;
      if (id === NEW_ID) this.startNew();
      else this.load();
    });
  }

  private startNew(): void {
    this.isNew = true;
    this.name = '';
    this.notes = '';
    this.description = '';
    this.tags = [];
    this.blocks = [];
    this.ungrouped = [];
    this.savedSnapshot = this.snapshot();
    this.state = 'loaded';
    this.loadLibraryTags();
    setTimeout(() => this.nameInput?.nativeElement.focus(), 350);
  }

  public load(): void {
    if (this.templateId === NEW_ID) {
      this.startNew();
      return;
    }
    this.isNew = false;
    this.state = 'loading';
    this.workoutTemplateApi.list().subscribe({
      next: (templates) => {
        const template = (templates || []).find((t) => t._id === this.templateId);
        if (!template) {
          this.state = 'error';
          return;
        }
        this.libraryTags = this.collectTags(templates, template._id);
        this.applyTemplate(template);
        this.savedSnapshot = this.snapshot();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private loadLibraryTags(): void {
    this.workoutTemplateApi.list().subscribe({
      next: (templates) => (this.libraryTags = this.collectTags(templates, null)),
      error: () => undefined,
    });
  }

  private collectTags(templates: WorkoutTemplate[], excludeId: string | null): string[] {
    const counts = new Map<string, number>();
    templates
      .filter((t) => t._id !== excludeId)
      .forEach((t) => (t.tags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
  }

  private applyTemplate(template: WorkoutTemplate): void {
    this.name = template.name;
    this.notes = template.notes || '';
    this.description = template.description || '';
    this.tags = [...(template.tags || [])];
    this.blocks = [];
    this.ungrouped = [];
    for (const block of template.blocks || []) {
      const exercises = (block.exercises || []).map((ex) => this.exerciseFromTemplate(ex));
      if (block.ungrouped) this.ungrouped.push(...exercises);
      else this.blocks.push(this.blockFromTemplate(block, exercises));
    }
  }

  private blockFromTemplate(block: WorkoutTemplateBlock, exercises: BuilderExercise[]): BuilderBlock {
    return {
      uid: this.nextUid++,
      name: block.name || '',
      type: block.type || 'straight',
      rounds: block.rounds ?? null,
      restBetweenExercises: block.restBetweenExercises ?? null,
      restBetweenRounds: block.restBetweenRounds ?? null,
      instructions: block.instructions || '',
      exercises,
    };
  }

  private exerciseFromTemplate(ex: WorkoutTemplateExercise): BuilderExercise {
    const ref = typeof ex.exercise === 'string' ? null : ex.exercise;
    return {
      uid: this.nextUid++,
      exerciseId: typeof ex.exercise === 'string' ? ex.exercise : ex.exercise?._id,
      exercise: ref,
      kind: exerciseKind(ref),
      notes: ex.notes || '',
      sets: fromTemplateSets(ex.sets),
    };
  }

  public trackByUid(_index: number, item: { uid: number }): number {
    return item.uid;
  }

  public trackByIndex(index: number): number {
    return index;
  }

  private get allExercises(): BuilderExercise[] {
    return [...this.blocks.flatMap((block) => block.exercises), ...this.ungrouped];
  }

  public exerciseName(ex: BuilderExercise): string {
    return ex.exercise?.name || this.translate.instant('TABLES.EXERCISE_DELETED');
  }

  // --- Bloques (como "Gestionar bloques" del Planificador) ---

  public blockTitle(block: BuilderBlock): string {
    return block.name || this.blockTypeLabels[block.type];
  }

  private async openBlockEditor(block: BlockDraft | null, isNew: boolean): Promise<BlockEditorResult | null> {
    const result = await this.ionicUtilService.showSidePanel({
      component: BlockEditorPanelComponent,
      componentProps: { block: block ? { name: block.name, type: block.type } : null, isNew },
      cssClass: 'tf-panel-modal',
    });
    return (result?.data as BlockEditorResult) || null;
  }

  // Bloque vacío: los ejercicios se mueven a él con su icono de bloques.
  public async addBlock(): Promise<void> {
    const result = await this.openBlockEditor(null, true);
    if (result?.action !== 'save') return;
    this.blocks = [...this.blocks, this.newBlock(result.block.name, result.block.type)];
  }

  public async editBlock(block: BuilderBlock): Promise<void> {
    const result = await this.openBlockEditor(block, false);
    if (!result) return;
    if (result.action === 'delete') {
      await this.confirmDeleteBlock(block);
      return;
    }
    block.name = result.block.name;
    block.type = result.block.type;
  }

  private newBlock(name: string, type: WorkoutTemplateBlockType): BuilderBlock {
    return {
      uid: this.nextUid++,
      name,
      type,
      rounds: null,
      restBetweenExercises: null,
      restBetweenRounds: null,
      instructions: '',
      exercises: [],
    };
  }

  // Como en el Planificador: borrar el bloque no borra sus ejercicios, que
  // pasan a "Sin agrupar".
  private async confirmDeleteBlock(block: BuilderBlock): Promise<void> {
    const remove = () => {
      this.ungrouped = [...this.ungrouped, ...block.exercises];
      this.blocks = this.blocks.filter((b) => b !== block);
    };
    if (!block.exercises.length) {
      remove();
      return;
    }
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('ROUTINES.BORRAR_BLOQUE'),
      message: this.translate.instant('ROUTINES.BORRAR_BLOQUE_MENSAJE', { name: this.blockTitle(block) }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        { text: this.translate.instant('TRAINER_COMMON.ERASE'), cssClass: 'alert-button-danger', handler: remove },
      ],
    });
  }

  // --- Ejercicios ---

  // Buscador en panel lateral, con el mismo comportamiento que en el
  // Planificador: el checkbox añade o quita el ejercicio al momento (sin
  // series, al final y sin bloque) y tocar el resto de la tarjeta abre
  // "Configurar ejercicio" encima del buscador; al guardarlo se añade con
  // sus series y el buscador se cierra.
  public async addExercises(): Promise<void> {
    this.commitPendingEdit();
    if (this.ionicUtilService.isSidePanelOpening(SearchExercisesPage)) return;
    if (this.ionicUtilService.findSidePanel(SearchExercisesPage)) return;
    await this.ionicUtilService.showSidePanel({
      component: SearchExercisesPage,
      componentProps: {
        pickerMode: true,
        pickerAddedLabel: this.translate.instant('ROUTINES.EN_LA_PLANTILLA'),
        pickerIsAdded: (exercise: Exercise) => !!this.findByExerciseId(exercise._id),
        pickerToggle: (exercise: Exercise) => this.toggleFromSearch(exercise),
        pickerConfigure: (exercise: Exercise, origin?: HTMLIonModalElement) => this.configureFromSearch(exercise, origin),
      },
      cssClass: 'tf-panel-modal',
    });
  }

  private findByExerciseId(exerciseId: string): BuilderExercise | undefined {
    return this.allExercises.find((ex) => ex.exerciseId === exerciseId);
  }

  // Checkbox: como en el Planificador, marcar lo añade sin series y
  // desmarcar lo quita. Si ya tiene series pautadas, pregunta antes: de un
  // toque se perdería lo pautado.
  public async toggleFromSearch(exercise: Exercise): Promise<void> {
    const existing = this.findByExerciseId(exercise._id);
    if (!existing) {
      this.ungrouped = [...this.ungrouped, this.newExercise(exercise)];
      return;
    }
    if (!existing.sets.length) {
      this.removeFromCurrentGroup(existing);
      return;
    }
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('ROUTINES.QUITAR_EJERCICIO'),
      message: this.translate.instant('ROUTINES.QUITAR_EJERCICIO_CON_SERIES', {
        name: this.exerciseName(existing),
        n: existing.sets.length,
      }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.REMOVE'),
          cssClass: 'alert-button-danger',
          handler: () => this.removeFromCurrentGroup(existing),
        },
      ],
    });
  }

  // Tarjeta: "Configurar ejercicio" encima del buscador (el del que ya está
  // en la plantilla, o uno nuevo). true = guardado: el buscador se cierra.
  public async configureFromSearch(exercise: Exercise, origin?: HTMLIonModalElement): Promise<boolean> {
    const existing = this.findByExerciseId(exercise._id);
    const target = existing || this.newExercise(exercise);
    const result = await this.runExercisePanel(target, origin);
    if (!result) return false;
    target.sets = result.sets;
    target.notes = result.notes;
    if (!existing) this.ungrouped = [...this.ungrouped, target];
    return true;
  }

  private newExercise(exercise: Exercise): BuilderExercise {
    return {
      uid: this.nextUid++,
      exerciseId: exercise._id,
      exercise: {
        _id: exercise._id,
        name: exercise.name,
        isCardio: exercise.isCardio,
        isIsometric: exercise.isIsometric,
        equipment: exercise.equipment || [],
        muscles: exercise.muscles,
      },
      kind: exerciseKind(exercise),
      notes: '',
      sets: [],
    };
  }

  public onExercisesReordered(list: 'ungrouped' | BuilderBlock, event: CustomEvent<ItemReorderEventDetail>): void {
    if (list === 'ungrouped') this.ungrouped = event.detail.complete([...this.ungrouped]);
    else list.exercises = event.detail.complete([...list.exercises]);
  }

  private removeFromCurrentGroup(ex: BuilderExercise): void {
    this.collapsed.delete(ex.uid);
    this.ungrouped = this.ungrouped.filter((item) => item !== ex);
    this.blocks.forEach((block) => (block.exercises = block.exercises.filter((item) => item !== ex)));
  }

  // Icono de bloques de la tarjeta: "Sin agrupar" o uno de los bloques.
  public async moveToBlock(ex: BuilderExercise): Promise<void> {
    const current = this.blocks.find((block) => block.exercises.includes(ex)) || null;
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('ROUTINES.MOVER_A_BLOQUE'),
      inputs: [
        { type: 'radio', label: this.translate.instant('ROUTINES.SIN_AGRUPAR'), value: '', checked: !current },
        ...this.blocks.map((block) => ({
          type: 'radio' as const,
          label: this.blockTitle(block),
          value: String(block.uid),
          checked: block === current,
        })),
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          cssClass: 'alert-button-primary',
          handler: (value: string) => {
            const target = this.blocks.find((block) => String(block.uid) === value) || null;
            if (target === current) return true;
            this.removeFromCurrentGroup(ex);
            if (target) target.exercises = [...target.exercises, ex];
            else this.ungrouped = [...this.ungrouped, ex];
            return true;
          },
        },
      ],
    });
  }

  public async confirmRemoveExercise(ex: BuilderExercise): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('ROUTINES.QUITAR_EJERCICIO'),
      message: this.translate.instant('ROUTINES.QUITAR_EJERCICIO_MENSAJE', { name: this.exerciseName(ex) }),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.REMOVE'),
          cssClass: 'alert-button-danger',
          handler: () => this.removeFromCurrentGroup(ex),
        },
      ],
    });
  }

  // --- Configurar ejercicio: panel lateral, como en el Planificador ---

  // Un solo panel a la vez: el mismo ejercicio no abre otro; uno distinto
  // pide cerrar el abierto, que avisa si tiene cambios sin guardar.
  public async openExercisePanel(ex: BuilderExercise): Promise<void> {
    this.commitPendingEdit();
    if (this.ionicUtilService.isSidePanelOpening(TemplateExercisePanelComponent)) return;
    const open = this.ionicUtilService.findSidePanel(TemplateExercisePanelComponent);
    if (open) {
      if (open.componentProps?.['uid'] === ex.uid) return;
      if (!(await this.ionicUtilService.requestSidePanelClose(open))) return;
    }

    const result = await this.runExercisePanel(ex);
    if (!result) return;
    ex.sets = result.sets;
    ex.notes = result.notes;
  }

  // Desde el builder, panel raíz; desde el buscador, encima de él (como
  // config-exercise en el Planificador).
  private async runExercisePanel(
    ex: BuilderExercise,
    origin?: HTMLIonModalElement
  ): Promise<TemplateExercisePanelResult | null> {
    const options = {
      component: TemplateExercisePanelComponent,
      componentProps: {
        uid: ex.uid,
        exerciseName: this.exerciseName(ex),
        kind: ex.kind,
        sets: ex.sets,
        notes: ex.notes,
      },
      cssClass: 'tf-panel-modal',
    };
    const res = origin
      ? await this.ionicUtilService.showNestedModal(options, origin, { overParent: true })
      : await this.ionicUtilService.showSidePanel(options);
    return (res?.data as TemplateExercisePanelResult | null | undefined) || null;
  }

  // --- Plegar y desplegar series ---

  public isCollapsed(ex: BuilderExercise): boolean {
    return this.collapsed.has(ex.uid);
  }

  public toggleSets(ex: BuilderExercise): void {
    this.commitPendingEdit();
    if (this.collapsed.has(ex.uid)) this.collapsed.delete(ex.uid);
    else this.collapsed.add(ex.uid);
  }

  private get exercisesWithSets(): BuilderExercise[] {
    return this.allExercises.filter((ex) => ex.sets.length > 0);
  }

  public get canToggleAll(): boolean {
    return this.exercisesWithSets.length > 1;
  }

  public get allCollapsed(): boolean {
    const withSets = this.exercisesWithSets;
    return withSets.length > 0 && withSets.every((ex) => this.collapsed.has(ex.uid));
  }

  public toggleAllSets(): void {
    this.commitPendingEdit();
    if (this.allCollapsed) this.collapsed.clear();
    else this.exercisesWithSets.forEach((ex) => this.collapsed.add(ex.uid));
  }

  public overview(ex: BuilderExercise): SetsOverview {
    return setsOverview(ex.sets, ex.kind);
  }

  // --- Tabla de series (workout.component en plannerMode) ---

  // El número de serie abre "Serie objetivo" de ESA serie.
  public async openSetPanel(ex: BuilderExercise, index: number, event: Event): Promise<void> {
    event.stopPropagation();
    this.commitPendingEdit();
    this.setPanelTarget = { exercise: ex, index };
    const set = toManageSet(ex.sets[index], ex.kind, 'builder-set');
    if (this.setPanelLoader) {
      this.setPanelLoader(set);
      return;
    }
    if (this.ionicUtilService.isSidePanelOpening(ManageSetComponent)) return;

    const res = await this.ionicUtilService.showSidePanel({
      component: ManageSetComponent,
      componentProps: {
        set,
        isCardio: ex.kind === 'cardio',
        isIsometric: ex.kind === 'isometric',
        templateMode: true,
        registerLoader: (load: (set?: unknown) => void) => (this.setPanelLoader = load),
      },
      cssClass: 'tf-panel-modal',
    });
    this.setPanelLoader = null;
    const target = this.setPanelTarget;
    this.setPanelTarget = null;
    if (!res?.data || !target || !target.exercise.sets[target.index]) return;
    this.replaceSet(target.exercise, target.index, fromManageSet(res.data));
  }

  private replaceSet(ex: BuilderExercise, index: number, set: SetDraft): void {
    ex.sets = ex.sets.map((current, i) => (i === index ? set : current));
  }

  // "+ Añadir serie": copia la última, como el Planificador.
  public quickAddSet(ex: BuilderExercise): void {
    this.commitPendingEdit();
    const last = ex.sets[ex.sets.length - 1];
    if (!last) return;
    ex.sets = [...ex.sets, { ...last }];
  }

  public isEditing(ex: BuilderExercise, index: number, field: CellField): boolean {
    return this.editing?.uid === ex.uid && this.editing.index === index && this.editing.field === field;
  }

  public cellId(ex: BuilderExercise, index: number, field: CellField, part = ''): string {
    return `tpl-cell-${ex.uid}-${index}-${field}${part ? '-' + part : ''}`;
  }

  public startEdit(ex: BuilderExercise, index: number, field: CellField, event: Event): void {
    event.stopPropagation();
    if (this.isEditing(ex, index, field)) return;
    const set = ex.sets[index];
    // Fallo, drop set o rest-pause no son un rango: hoja de intensidad, como
    // en el Planificador.
    if (field === 'rir' && (isFailure(set) || set.drop || set.restPause !== null)) {
      void this.openIntensitySheet(ex, index);
      return;
    }
    this.commitPendingEdit();
    this.editing = { uid: ex.uid, index, field };
    if (field === 'rest') {
      this.editValue = set.restSeconds === null ? '' : String(set.restSeconds);
    } else {
      const [min, max] = field === 'reps' ? [set.repsMin, set.repsMax] : [set.rirMin, set.rirMax];
      this.editMin = min === null ? '' : String(min);
      this.editMax = max === null || max === min ? '' : String(max);
    }
    const inputId = this.cellId(ex, index, field, field === 'rest' ? '' : 'min');
    setTimeout(() => {
      const input = document.getElementById(inputId) as HTMLInputElement | null;
      input?.focus();
      input?.select();
    });
  }

  public cancelEdit(): void {
    this.editing = null;
  }

  // Dos cajas (mín y máx): se confirma solo cuando el foco sale del par.
  public onRangeBlur(ex: BuilderExercise, index: number, field: CellField): void {
    setTimeout(() => {
      if (!this.isEditing(ex, index, field)) return;
      const active = document.activeElement as HTMLElement | null;
      if (active?.id?.startsWith(this.cellId(ex, index, field))) return;
      this.commitEdit();
    });
  }

  public commitEdit(): void {
    const editing = this.editing;
    if (!editing) return;
    this.editing = null;
    const ex = this.allExercises.find((item) => item.uid === editing.uid);
    const set = ex?.sets[editing.index];
    if (!ex || !set) return;

    if (editing.field === 'rest') {
      const rest = parseRestInput(this.editValue);
      if (rest === undefined) return;
      this.replaceSet(ex, editing.index, { ...set, restSeconds: rest });
      return;
    }

    const range = parseRangeInput(this.editMin, this.editMax, editing.field);
    if (range === null) {
      this.ionicUtilService.showToast({ message: this.translate.instant('TABLES.RANGE_ERROR'), duration: 3000 });
      return;
    }
    const [min, max] = rangeToDraft(range);
    this.replaceSet(
      ex,
      editing.index,
      editing.field === 'reps' ? { ...set, repsMin: min, repsMax: max } : { ...set, rirMin: min, rirMax: max }
    );
  }

  private commitPendingEdit(): void {
    if (this.editing) this.commitEdit();
  }

  private async openIntensitySheet(ex: BuilderExercise, index: number): Promise<void> {
    this.commitPendingEdit();
    const res = await this.ionicUtilService.showModal({
      component: IntensitySheetComponent,
      componentProps: { set: toManageSet(ex.sets[index], ex.kind), setNumber: index + 1 },
      cssClass: 'intensity-sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    if (res?.role !== 'confirm' || !res.data || !ex.sets[index]) return;
    const intensity = res.data as IntensityResult;
    const [rirMin, rirMax] = rangeToDraft(intensity.expectedRir);
    this.replaceSet(ex, index, {
      ...ex.sets[index],
      rirMin,
      rirMax,
      drop: !!intensity.drop,
      restPause: intensity.restPause ?? null,
    });
  }

  // --- Resumen de la sesión ---

  public get exerciseCount(): number {
    return this.allExercises.length;
  }

  public get totalSets(): number {
    return this.allExercises.reduce((total, ex) => total + ex.sets.length, 0);
  }

  public get estimatedMinutes(): number {
    const ungrouped = { type: 'straight' as const, restBetweenExercises: null, restBetweenRounds: null, exercises: this.ungrouped };
    return roundedMinutes(estimateSessionSeconds([...this.blocks, ungrouped]));
  }

  // Series por grupo muscular con la misma cuenta que el Planificador
  // (planner-metrics.ts): principal ×1, secundario ×0,5.
  public get muscleRows(): MuscleTreeRow[] {
    const workout = {
      exercises: this.allExercises.map((ex) => ({ exercise: ex.exercise, sets: ex.sets })),
    } as unknown as Workout;
    const rows = buildMuscleTreeRows(countWorkoutMuscleTree(workout)).filter((row) => row.sets > 0).slice(0, 8);
    return this.stableMuscleRows(rows);
  }

  public formatSets(sets: number): string {
    return Number.isInteger(sets) ? String(sets) : sets.toLocaleString(uiLocale(), { maximumFractionDigits: 1 });
  }

  public muscleBarWidth(row: MuscleTreeRow, rows: MuscleTreeRow[]): number {
    const max = rows[0]?.sets || 1;
    return Math.max(6, Math.round((row.sets / max) * 100));
  }

  // Material de la sesión, sacado de sus ejercicios (no se escribe a mano).
  public get equipment(): string[] {
    return this.stableEquipment(templateEquipment(this.allExercises.map((ex) => ex.exercise)));
  }

  public get detailsSummary(): string {
    if (!this.tags.length) return this.translate.instant('ROUTINES.SIN_ETIQUETAS');
    return this.tags.slice(0, 3).join(', ') + (this.tags.length > 3 ? '…' : '');
  }

  // --- Guardar ---

  public get isDirty(): boolean {
    return this.state === 'loaded' && this.snapshot() !== this.savedSnapshot;
  }

  private exercisePayload(ex: BuilderExercise, order: number): WorkoutTemplateExercise {
    return {
      // Siempre el id plano: el back no acepta la ficha como referencia.
      exercise: ex.exerciseId,
      order,
      notes: ex.notes.trim(),
      sets: toTemplateSets(ex.sets, ex.kind),
    };
  }

  private buildPayload(): WorkoutTemplateInput {
    const blocks: WorkoutTemplateBlock[] = this.blocks.map((block, blockIndex) => ({
      name: block.name,
      type: block.type,
      order: blockIndex,
      rounds: block.rounds,
      restBetweenExercises: block.restBetweenExercises,
      restBetweenRounds: block.restBetweenRounds,
      instructions: block.instructions,
      exercises: block.exercises.map((ex, index) => this.exercisePayload(ex, index)),
    }));
    if (this.ungrouped.length) {
      blocks.push({
        ungrouped: true,
        name: '',
        type: 'straight',
        order: blocks.length,
        exercises: this.ungrouped.map((ex, index) => this.exercisePayload(ex, index)),
      });
    }

    return {
      name: this.name.trim(),
      notes: this.notes.trim(),
      description: this.description.trim(),
      tags: this.tags,
      equipment: this.equipment,
      blocks,
    };
  }

  private snapshot(): string {
    return JSON.stringify(this.buildPayload());
  }

  public async canDeactivate(): Promise<boolean> {
    this.commitPendingEdit();
    if (!this.isDirty || this.isSaving) return true;
    return confirmDiscardChanges(this.ionicUtilService);
  }

  public save(): void {
    if (this.isSaving) return;
    this.commitPendingEdit();
    if (!this.name.trim()) {
      this.nameError = true;
      this.nameInput?.nativeElement.focus();
      return;
    }
    if (!this.isNew && !this.isDirty) return;

    this.isSaving = true;
    const payload = this.buildPayload();
    const request = this.isNew
      ? this.workoutTemplateApi.create(payload)
      : this.workoutTemplateApi.update(this.templateId, payload);

    request.subscribe({
      next: (template) => {
        this.isSaving = false;
        this.savedSnapshot = JSON.stringify(payload);
        this.ionicUtilService.showToast({
          message: this.translate.instant(this.isNew ? 'ROUTINES.PLANTILLA_CREADA' : 'TABLES.TEMPLATE_SAVED'),
          duration: 1500,
        });
        if (this.isNew) {
          // Solo cambia la URL (recargar o compartir abre esta plantilla):
          // navegar crearía otra instancia de la página.
          this.isNew = false;
          this.templateId = template._id;
          this.location.replaceState(`/tabs/routines/${template._id}`);
        }
      },
      error: () => {
        this.isSaving = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant(this.isNew ? 'ROUTINES.NO_SE_PUDO_CREAR_LA' : 'TABLES.TEMPLATE_SAVE_ERROR'),
          duration: 2500,
        });
      },
    });
  }
}
