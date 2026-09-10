import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { firstValueFrom, Observable } from 'rxjs';
import { CHECKIN_FIELDS } from 'src/app/core/constants/checkin-fields';
import { ClientDetailTab } from '../../models/client-detail.model';
import { ClientSummary } from '../../models/client-progress.model';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { ClientOverviewApiService } from './client-overview-api.service';
import { buildWeeklyWeightChart, WeeklyWeightChart } from './weekly-weight-chart';
import { BaselineStatus, ClientOverview, IntakeAnswer, OverviewContextValues, OverviewEditor, OverviewIntake, OverviewNote, OverviewNutrition, OverviewReview, OverviewStage, OverviewTask, OverviewWeek } from './client-overview.model';

type Detail = 'intake' | 'notes' | 'tasks' | 'reviews' | null;
interface EditorDraft {
  kind: OverviewEditor;
  id: string | null;
  stageId: string;
  expectedVersion: number;
  requestId: string;
  context: OverviewContextValues;
  profile: { name: string; lastname: string; birth: string; sex: number | null; height: number | null };
  profileVersion: string;
  nutrition: OverviewNutrition;
  nutritionVersion: string;
  text: string;
  pinned: boolean;
  title: string;
  notes: string;
  dueDate: string;
  conclusion: string;
  nextStep: string;
  linkedTaskId: string;
  observedFingerprint: string;
  observedAt: string;
  correctsReviewId: string;
  perimeters: string[];
  measurementField: string;
  measurementValue: number | null;
  measurementDate: string;
  measurementExpectedValue: number | null;
  confirmedExisting: boolean;
}

const EMPTY_CONTEXT: OverviewContextValues = {
  goals: '', healthConditions: '', experienceLevel: null, availability: '', trainingLocation: null,
  equipment: '', equipmentTags: [], customAnswers: [],
};
const EXPERIENCE: Record<string, string> = { none: 'Sin experiencia', beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' };
const LOCATIONS: Record<string, string> = { gym: 'Gimnasio', home: 'Casa', outdoor: 'Exterior', mixed: 'Mixto' };
const EQUIPMENT: Record<string, string> = { dumbbells: 'Mancuernas', barbell: 'Barra y discos', machines: 'Máquinas', bands: 'Bandas elásticas', kettlebells: 'Kettlebells', bench: 'Banco', pullup_bar: 'Barra de dominadas', none: 'Sin material' };
const FIELD_LABELS: Record<string, string> = {
  goals: 'Objetivo personal', healthConditions: 'Salud y limitaciones', experienceLevel: 'Experiencia',
  availability: 'Disponibilidad', equipment: 'Material disponible', trainingLocation: 'Lugar de entrenamiento',
  equipmentTags: 'Material disponible', allergies: 'Alergias', favoriteFoods: 'Alimentos preferidos',
  dislikedFoods: 'Alimentos que evita', cooksAtHome: 'Cocina en casa', weight: 'Peso',
};

@Component({
  selector: 'app-client-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss'],
})
export class ClientOverviewComponent implements OnChanges, OnDestroy {
  @Input() public clientId = '';
  @Input() public clientName = '';
  @Input() public hasTrainingScope = false;
  @Output() public readonly openTab = new EventEmitter<ClientDetailTab>();
  @Output() public readonly changed = new EventEmitter<void>();
  @Output() public readonly clientNameChanged = new EventEmitter<string>();
  @Output() public readonly contextChanged = new EventEmitter<OverviewContextValues>();
  @ViewChild('attentionHeading') private attentionHeading?: ElementRef<HTMLElement>;
  @ViewChild('saveErrorMessage') private saveErrorMessage?: ElementRef<HTMLElement>;

  public overview: ClientOverview | null = null;
  public facts: ClientSummary | null = null;
  public loading = true;
  public loadError = '';
  public factsError = '';
  public selectedStageId = '';
  public historical = false;
  public showWeeks = false;
  public weightChart: WeeklyWeightChart | null = null;
  public detail: Detail = null;
  public detailLoading = false;
  public detailError = '';
  public detailIntake: OverviewIntake | null = null;
  public intakeAnswers: IntakeAnswer[] = [];
  public notes: OverviewNote[] = [];
  public tasks: OverviewTask[] = [];
  public reviews: OverviewReview[] = [];
  public detailTotal = 0;
  public nextOffset: number | null = null;
  public loadingMore = false;
  public editor: EditorDraft | null = null;
  public saving = false;
  public saveError = '';
  public conflict = false;
  public notice = '';
  public completingTaskId = '';
  public showCompletedTasks = false;
  public measurementLoading = false;
  public measurementPreviewError = '';
  public correctionConfirmed = false;
  public readonly equipmentOptions = Object.entries(EQUIPMENT);
  public readonly experienceOptions = Object.entries(EXPERIENCE);
  public readonly locationOptions = Object.entries(LOCATIONS);
  public readonly measurementFields = CHECKIN_FIELDS.filter(field => field.anthropometryField === 'weight' || field.group === 'perimetros');
  private readonly expandedTexts = new Set<string>();

  private generation = 0;
  private detailGeneration = 0;
  private destroyed = false;
  private abandonedDraft: EditorDraft | null = null;
  private measurementGeneration = 0;

  constructor(
    private readonly api: ClientOverviewApiService,
    private readonly detailApi: ClientDetailApiService,
    private readonly alerts: AlertController,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && this.clientId) {
      this.selectedStageId = '';
      this.editor = null;
      this.abandonedDraft = null;
      this.detail = null;
      this.overview = null;
      this.weightChart = null;
      this.expandedTexts.clear();
      this.facts = null;
      void this.refresh();
    }
  }

  ngOnDestroy(): void { this.destroyed = true; this.generation++; this.detailGeneration++; }

  public async refresh(): Promise<void> {
    const generation = ++this.generation;
    this.loading = true;
    this.loadError = '';
    const clientId = this.clientId;
    // Las dos fuentes se resuelven de forma independiente: un error de analítica no oculta el contexto.
    await Promise.allSettled([
      firstValueFrom(this.api.get(clientId, this.selectedStageId)).then(data => {
        if (this.destroyed || generation !== this.generation) return;
        this.overview = {
          ...data, stages: data.stages || [], pinnedNotes: data.pinnedNotes || [],
          context: { ...data.context, values: { ...EMPTY_CONTEXT, ...data.context?.values, equipmentTags: data.context?.values?.equipmentTags || [], customAnswers: data.context?.values?.customAnswers || [] } },
          tasks: data.tasks || { items: [], total: 0 },
          sectionsErrors: data.sectionsErrors || {},
        };
        this.historical = data.readOnly === true || Boolean(data.stage.endedAt);
        this.weightChart = buildWeeklyWeightChart(data.body?.weight.weekly || []);
        if (!this.historical) { this.clientNameChanged.emit(this.displayName); this.contextChanged.emit(this.context); }
        this.loading = false;
      }).catch((error: unknown) => {
        if (this.destroyed || generation !== this.generation) return;
        this.loadError = this.errorMessage(error, 'No se ha podido cargar el resumen.');
        this.loading = false;
      }),
      firstValueFrom(this.detailApi.getSummary(clientId)).then(data => {
        if (this.destroyed || generation !== this.generation) return;
        this.facts = data;
        this.factsError = '';
      }).catch(() => {
        if (this.destroyed || generation !== this.generation) return;
        this.factsError = 'No se ha podido actualizar el estado del plan.';
      }),
    ]);
  }

  public selectStage(): void {
    this.overview = null;
    this.detail = null;
    this.editor = null;
    this.abandonedDraft = null;
    void this.refresh();
  }

  public get displayName(): string {
    const identity = this.overview?.identity;
    return identity ? [identity.name, identity.lastname].filter(Boolean).join(' ') || this.clientName : this.clientName;
  }
  public get age(): number | null {
    const identity = this.overview?.identity;
    if (!identity) return null;
    if (identity.age !== null && identity.age !== undefined) return identity.age;
    if (!identity.birth) return null;
    const birth = new Date(identity.birth);
    const today = new Date();
    if (!Number.isFinite(birth.getTime()) || birth > today) return null;
    let age = today.getFullYear() - birth.getUTCFullYear();
    if (today.getMonth() < birth.getUTCMonth() || (today.getMonth() === birth.getUTCMonth() && today.getDate() < birth.getUTCDate())) age--;
    return age;
  }
  public get context(): OverviewContextValues { return this.overview?.context?.values || EMPTY_CONTEXT; }
  public get equipmentText(): string { return [...(this.context.equipmentTags || []).map(tag => EQUIPMENT[tag] || tag), this.context.equipment].filter(Boolean).join(', '); }
  public get missingMeasurementLabels(): string { return (this.overview?.intake.missingMeasurements || []).map(key => this.fieldLabel(key)).join(', '); }
  public get measurementUnit(): string { return this.measurementFields.find(field => field.anthropometryField === this.editor?.measurementField)?.unit || ''; }
  public get measurementHint(): string { return this.measurementFields.find(field => field.anthropometryField === this.editor?.measurementField)?.hint || ''; }
  public get newestWeeks(): OverviewWeek[] {
    return [...(this.overview?.body?.weight.weekly || [])].reverse();
  }
  public get visibleTasks(): OverviewTask[] { return this.tasks.filter(task => this.showCompletedTasks || task.status === 'pending'); }
  public get canEdit(): boolean { return Boolean(this.overview) && !this.historical && !this.loadError; }
  public get hasNutritionScope(): boolean { return (this.overview?.identity.scopes || this.overview?.scopes || []).includes('nutrition'); }
  public get detailTitle(): string {
    return { intake: 'Cuestionario inicial', notes: 'Notas privadas', tasks: 'Tareas del entrenador', reviews: 'Historial de revisiones' }[this.detail || 'intake'];
  }
  public get editorTitle(): string {
    const titles: Record<OverviewEditor, string> = {
      context: 'Editar contexto actual', profile: 'Editar datos del cliente', note: this.editor?.id ? 'Editar nota privada' : 'Nueva nota privada',
      nutrition: 'Editar preferencias alimentarias',
      task: 'Nueva tarea privada', review: 'Registrar revisión privada', perimeters: 'Perímetros destacados',
      measurement: 'Registrar una medición', baseline: 'Confirmar referencia inicial',
    };
    return this.editor ? titles[this.editor.kind] : '';
  }

  public civilDate(value: string | null | undefined): string {
    if (!value) return 'Sin fecha';
    const date = new Date(`${value.slice(0, 10)}T12:00:00Z`);
    return Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date) : 'Sin fecha';
  }
  public shortCivilDate(value: string): string {
    const date = new Date(`${value.slice(0, 10)}T12:00:00Z`);
    return Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(date) : '';
  }
  public timestamp(value: string | null | undefined): string {
    if (!value) return 'Sin fecha';
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date) : 'Sin fecha';
  }
  public number(value: number | null | undefined, signed = false): string {
    if (value === null || value === undefined || !Number.isFinite(value)) return '—';
    return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2, signDisplay: signed ? 'exceptZero' : 'auto' }).format(value);
  }
  public experience(value: string | null): string { return EXPERIENCE[value || ''] || 'Sin especificar'; }
  public location(value: string | null): string { return LOCATIONS[value || ''] || 'Sin especificar'; }
  public fieldLabel(key: string): string {
    return FIELD_LABELS[key] || this.measurementFields.find(field => field.anthropometryField === key || field.key === key)?.label || key;
  }
  public baselineWarning(status: BaselineStatus): string {
    return status === 'source_changed' ? 'La medición de origen se ha corregido. Revisa esta referencia.'
      : status === 'source_missing' ? 'La medición de origen ya no está disponible. Revisa esta referencia.' : '';
  }
  public stageLabel(stage: OverviewStage): string {
    return `${stage.endedAt ? 'Etapa anterior' : 'Etapa actual'} · ${stage.startedAt ? this.civilDate(stage.startedAt) : 'Inicio no disponible'}${stage.startEstimated ? ' (aprox.)' : ''}`;
  }
  public isOverdue(task: OverviewTask): boolean {
    return task.status === 'pending' && Boolean(task.dueDate && task.dueDate < (this.overview?.body?.today || new Date().toISOString().slice(0, 10)));
  }
  public answerText(value: unknown): string {
    if (value === null || value === undefined || value === '') return 'Sin respuesta';
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';
    if (Array.isArray(value)) return value.map(item => this.answerText(item)).join(', ') || 'Sin respuesta';
    if (typeof value === 'object') return Object.entries(value as Record<string, unknown>).map(([key, item]) => `${this.fieldLabel(key)}: ${this.answerText(item)}`).join('\n');
    return String(value);
  }
  public intakeAnswerText(answer: IntakeAnswer): string {
    if (answer.key === 'experienceLevel') return this.experience(typeof answer.value === 'string' ? answer.value : null);
    if (answer.key === 'trainingLocation') return this.location(typeof answer.value === 'string' ? answer.value : null);
    if (answer.key === 'cooksAtHome') return { yes: 'Sí', no: 'No', sometimes: 'A veces' }[String(answer.value)] || 'Sin respuesta';
    if (answer.key === 'equipment' && typeof answer.value === 'string') return answer.value.split(' · ').map(item => LOCATIONS[item] || EQUIPMENT[item] || item).join(' · ');
    if (answer.key === 'equipmentTags' && Array.isArray(answer.value)) return answer.value.map(item => EQUIPMENT[String(item)] || String(item)).join(', ') || 'Sin respuesta';
    return this.answerText(answer.value);
  }

  public async openDetail(detail: Detail, append = false): Promise<void> {
    this.detail = detail;
    this.detailError = '';
    if (!detail) return;
    const generation = ++this.detailGeneration;
    if (append) this.loadingMore = true;
    else { this.detailLoading = true; this.nextOffset = null; }
    try {
      if (detail === 'intake') {
        const data = await firstValueFrom(this.api.intake(this.clientId, this.selectedStageId));
        if (generation !== this.detailGeneration || this.destroyed) return;
        this.detailIntake = data;
        this.intakeAnswers = data?.responses || this.snapshotAnswers(data?.answers || data?.snapshot || {});
      } else {
        const offset = append ? this.nextOffset || 0 : 0;
        const api: Observable<{items: (OverviewNote | OverviewTask | OverviewReview)[]; total: number; nextOffset: number | null}> = detail === 'notes' ? this.api.notes(this.clientId, this.selectedStageId, offset)
          : detail === 'tasks' ? this.api.tasks(this.clientId, this.selectedStageId, offset) : this.api.reviews(this.clientId, this.selectedStageId, offset);
        const data = await firstValueFrom(api);
        if (generation !== this.detailGeneration || this.destroyed) return;
        this.detailTotal = data.total;
        this.nextOffset = data.nextOffset ?? null;
        if (detail === 'notes') this.notes = [...(append ? this.notes : []), ...data.items as OverviewNote[]];
        else if (detail === 'tasks') this.tasks = [...(append ? this.tasks : []), ...data.items as OverviewTask[]];
        else this.reviews = [...(append ? this.reviews : []), ...data.items as OverviewReview[]];
      }
    } catch (error: unknown) {
      if (generation === this.detailGeneration) this.detailError = this.errorMessage(error, 'No se ha podido cargar el detalle.');
    } finally {
      if (generation === this.detailGeneration) this.detailLoading = false;
      if (generation === this.detailGeneration) this.loadingMore = false;
    }
  }

  public openEditor(kind: OverviewEditor, note?: OverviewNote, field = 'weight'): void {
    if (!this.canEdit || !this.overview) return;
    this.saveError = '';
    this.conflict = false;
    this.measurementPreviewError = '';
    this.measurementLoading = false;
    this.correctionConfirmed = false;
    if (this.abandonedDraft?.kind === kind && this.abandonedDraft.id === (note?._id || null)
      && (!['baseline', 'measurement'].includes(kind) || this.abandonedDraft.measurementField === field)) {
      this.editor = this.abandonedDraft;
      this.abandonedDraft = null;
      if (kind === 'measurement' || kind === 'baseline') void this.loadMeasurementPreview();
      return;
    }
    const identity = this.overview.identity;
    const comparison = field === 'weight' ? this.overview.body?.weight : this.overview.body?.perimeters.find(row => row.key === field);
    this.editor = {
      kind, id: note?._id || null, stageId: this.overview.stage.id, expectedVersion: note?.version ?? this.overview.context.version,
      requestId: this.requestId(), context: JSON.parse(JSON.stringify(this.context)) as OverviewContextValues,
      profile: { name: identity.name || '', lastname: identity.lastname || '', birth: identity.birth?.slice(0, 10) || '', sex: identity.sex ?? null, height: identity.heightCm ?? null },
      profileVersion: identity.profileVersion,
      nutrition: { allergies: '', favoriteFoods: '', dislikedFoods: '', cooksAtHome: null, ...this.overview.nutrition?.values },
      nutritionVersion: this.overview.nutrition?.version || '', text: note?.text || '', pinned: note?.pinned ?? true,
      title: '', notes: '', dueDate: '', conclusion: '', nextStep: '', linkedTaskId: '',
      observedFingerprint: this.overview.review.observedFingerprint, observedAt: this.overview.review.observedAt || new Date().toISOString(), correctsReviewId: '',
      perimeters: [...this.overview.settings.highlightedPerimeters], measurementField: field,
      measurementValue: kind === 'baseline' ? comparison?.initial?.value ?? null : null,
      measurementDate: kind === 'baseline' ? comparison?.initial?.date || '' : this.overview.body?.today || '',
      measurementExpectedValue: null, confirmedExisting: false,
    };
    if (kind === 'perimeters') this.editor.expectedVersion = this.overview.settings.version;
    if (kind === 'measurement' || kind === 'baseline') void this.loadMeasurementPreview();
  }
  public closeEditor(): void {
    if (this.saving || !this.editor) return;
    this.abandonedDraft = this.editor;
    this.editor = null;
  }
  public async discardDraft(): Promise<void> {
    const alert = await this.alerts.create({
      header: 'Descartar el borrador', message: 'Se cargarán los datos actuales. Los cambios de este formulario se perderán.',
      buttons: [{ text: 'Conservar borrador', role: 'cancel' }, { text: 'Descartar', role: 'destructive', handler: () => {
        const kind = this.editor?.kind;
        const noteId = this.editor?.id;
        this.abandonedDraft = null;
        this.editor = null;
        void this.refresh().then(() => {
          if (kind === 'note' && noteId) { void this.openDetail('notes'); return; }
          if (kind) this.openEditor(kind);
        });
      } }],
    });
    await alert.present();
  }
  public togglePerimeter(key: string): void {
    if (!this.editor) return;
    const index = this.editor.perimeters.indexOf(key);
    if (index >= 0) this.editor.perimeters.splice(index, 1);
    else if (this.editor.perimeters.length < 3) this.editor.perimeters.push(key);
  }
  public toggleEquipment(key: string): void {
    if (!this.editor) return;
    const selected = this.editor.context.equipmentTags;
    this.editor.context.equipmentTags = selected.includes(key) ? selected.filter(item => item !== key)
      : key === 'none' ? ['none'] : [...selected.filter(item => item !== 'none'), key];
  }
  public async loadMeasurementPreview(): Promise<void> {
    const draft = this.editor;
    if (!draft || !['baseline', 'measurement'].includes(draft.kind)) return;
    const generation = ++this.measurementGeneration;
    this.measurementPreviewError = '';
    this.measurementLoading = false;
    this.correctionConfirmed = false;
    draft.confirmedExisting = false;
    draft.measurementExpectedValue = null;
    if (!draft.measurementDate) return;
    this.measurementLoading = true;
    try {
      const entries = await firstValueFrom(this.api.measurementsOnDate(this.clientId, draft.measurementDate));
      if (this.destroyed || generation !== this.measurementGeneration || this.editor !== draft) return;
      const entry = entries.find(item => String(item.date).slice(0, 10) === draft.measurementDate);
      const raw = entry ? (entry as unknown as Record<string, unknown>)[draft.measurementField] : null;
      draft.measurementExpectedValue = typeof raw === 'number' && Number.isFinite(raw) ? raw : null;
    } catch (error: unknown) {
      if (generation === this.measurementGeneration) this.measurementPreviewError = this.errorMessage(error, 'No se ha podido comprobar si hay una medición en esta fecha.');
    } finally { if (generation === this.measurementGeneration) this.measurementLoading = false; }
  }
  public reuseMeasurement(): void {
    if (!this.editor || this.editor.measurementExpectedValue === null) return;
    this.editor.measurementValue = this.editor.measurementExpectedValue;
    this.editor.confirmedExisting = true;
  }

  public async save(): Promise<void> {
    const draft = this.editor;
    if (!draft || this.saving || !this.canEdit || this.conflict) return;
    this.saveError = '';
    const error = this.validateDraft(draft);
    if (error) { this.saveError = error; this.focusSaveError(draft); return; }
    let operation: Observable<unknown>;
    const common = { requestId: draft.requestId, expectedVersion: draft.expectedVersion, stageId: draft.stageId };
    switch (draft.kind) {
      case 'context': operation = this.api.context(this.clientId, draft.expectedVersion, this.contextPatch(draft), draft.stageId); break;
      case 'profile': operation = this.api.profile(this.clientId, { stageId: draft.stageId, expectedVersion: draft.profileVersion, patch: this.profilePatch(draft) }); break;
      case 'nutrition': operation = this.api.nutrition(this.clientId, { stageId: draft.stageId, expectedVersion: draft.nutritionVersion, patch: draft.nutrition }); break;
      case 'perimeters': operation = this.api.settings(this.clientId, draft.expectedVersion, draft.perimeters, draft.stageId); break;
      case 'note': operation = this.api.saveNote(this.clientId, draft.id, { ...common, text: draft.text.trim(), pinned: draft.pinned }); break;
      case 'task': operation = this.api.saveTask(this.clientId, null, { ...common, title: draft.title.trim(), notes: draft.notes.trim(), dueDate: draft.dueDate || null }); break;
      case 'review': operation = this.api.saveReview(this.clientId, { ...common, conclusion: draft.conclusion.trim(), nextStep: draft.nextStep.trim(), linkedTaskId: draft.linkedTaskId || null, observedFingerprint: draft.observedFingerprint, observedAt: draft.observedAt, correctsReviewId: draft.correctsReviewId || null }); break;
      case 'baseline': operation = this.api.saveBaseline(this.clientId, { ...common, measurements: [{ field: draft.measurementField, value: draft.measurementValue, date: draft.measurementDate, confirmedExisting: draft.confirmedExisting, expectedValue: draft.measurementExpectedValue }] }); break;
      case 'measurement': operation = this.api.saveMeasurement(this.clientId, { ...common, date: draft.measurementDate, fields: { [draft.measurementField]: draft.measurementValue }, expectedValues: { [draft.measurementField]: draft.measurementExpectedValue } }); break;
    }
    this.saving = true;
    const savingClientId = this.clientId;
    try {
      await firstValueFrom(operation);
    } catch (saveError: unknown) {
      if (this.destroyed || this.clientId !== savingClientId) return;
      this.conflict = this.status(saveError) === 409;
      this.saveError = this.errorMessage(saveError, 'No se ha podido guardar. Tu borrador sigue aquí; puedes reintentarlo.');
      if (this.conflict) this.saveError = 'La información ha cambiado desde que abriste este formulario. Tu borrador se conserva. Consulta los datos actuales antes de volver a guardar.';
      this.focusSaveError(draft);
      return;
    } finally { this.saving = false; }
    if (this.destroyed || this.clientId !== savingClientId) return;
    // Ionic debe permitir el cierre antes de cambiar isOpen y esperar la recarga.
    this.editor = null;
    this.abandonedDraft = null;
    this.notice = draft.kind === 'review' ? 'Revisión privada guardada. Los check-ins mantienen su estado.' : 'Cambios guardados.';
    this.changed.emit();
    await this.refresh();
    if (this.detail) await this.openDetail(this.detail);
  }

  public async completeTask(task: OverviewTask): Promise<void> {
    if (!this.canEdit || this.completingTaskId) return;
    this.completingTaskId = task._id;
    try {
      await firstValueFrom(this.api.saveTask(this.clientId, task._id, { status: 'done', expectedVersion: task.version ?? 0, stageId: this.overview?.stage.id }));
      this.notice = 'Tarea completada.';
      await this.refresh();
      if (this.detail === 'tasks') await this.openDetail('tasks');
    } catch (error: unknown) { this.notice = this.errorMessage(error, 'No se ha podido completar la tarea. Reinténtalo.'); }
    finally { this.completingTaskId = ''; }
  }
  public focusAttention(): void {
    this.attentionHeading?.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    this.attentionHeading?.nativeElement.focus({ preventScroll: true });
  }
  private focusSaveError(draft: EditorDraft): void {
    const clientId = this.clientId;
    requestAnimationFrame(() => {
      if (this.destroyed || this.clientId !== clientId || this.editor !== draft || !this.saveError) return;
      const message = this.saveErrorMessage?.nativeElement;
      message?.scrollIntoView({ behavior: 'auto', block: 'center' });
      message?.focus({ preventScroll: true });
    });
  }
  public isTextExpanded(key: string): boolean { return this.expandedTexts.has(key); }
  public toggleText(key: string): void {
    if (this.expandedTexts.has(key)) this.expandedTexts.delete(key);
    else this.expandedTexts.add(key);
  }
  public textPreview(text: string, key: string): string {
    if (!text || text.length <= 320 || this.expandedTexts.has(key)) return text;
    const limit = text.lastIndexOf(' ', 320);
    return `${text.slice(0, limit > 240 ? limit : 320).trimEnd()}…`;
  }

  private validateDraft(draft: EditorDraft): string {
    if (draft.kind === 'note' && !draft.text.trim()) return 'Escribe el contenido de la nota.';
    if (draft.kind === 'task' && !draft.title.trim()) return 'Escribe qué tarea necesitas realizar.';
    if (draft.kind === 'review' && !draft.conclusion.trim()) return 'Escribe la conclusión de esta revisión.';
    if (draft.kind === 'profile' && !draft.profile.name.trim()) return 'El nombre es obligatorio.';
    if (draft.kind === 'profile' && !Object.keys(this.profilePatch(draft)).length) return 'No has cambiado ningún dato del perfil.';
    if (draft.kind === 'review' && !draft.observedFingerprint) return 'Actualiza las mediciones del resumen antes de registrar una revisión.';
    if (draft.kind === 'measurement' || draft.kind === 'baseline') {
      if (this.measurementLoading || this.measurementPreviewError) return 'Comprueba primero los registros de esta fecha.';
      const field = this.measurementFields.find(item => item.anthropometryField === draft.measurementField);
      const value = draft.measurementValue;
      if (!field || value === null || !Number.isFinite(value) || (field.min !== undefined && value < field.min) || (field.max !== undefined && value > field.max)) return `Introduce una medida válida${field ? ` entre ${field.min} y ${field.max} ${field.unit}` : ''}.`;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.measurementDate)) return 'Indica la fecha real de la medición.';
      if (this.overview?.body?.today && draft.measurementDate > this.overview.body.today) return 'La medición no puede tener una fecha futura.';
      if (draft.measurementExpectedValue !== null && draft.measurementExpectedValue !== value && !this.correctionConfirmed) return 'Confirma la corrección del valor que ya existe en esta fecha.';
    }
    return '';
  }
  public rectifyReview(review: OverviewReview): void {
    this.openEditor('review');
    if (!this.editor) return;
    this.editor.correctsReviewId = review._id;
    this.editor.conclusion = review.conclusion;
    this.editor.nextStep = review.nextStep;
    this.editor.observedFingerprint = review.observedFingerprint || this.editor.observedFingerprint;
    this.editor.linkedTaskId = review.linkedTaskId || '';
  }
  private profilePatch(draft: EditorDraft): Record<string, unknown> {
    const identity = this.overview?.identity;
    const current: Record<string, unknown> = { name: identity?.name || '', lastname: identity?.lastname || '', birth: identity?.birth?.slice(0, 10) || null, sex: identity?.sex ?? null, height: identity?.heightCm ?? null };
    const proposed: Record<string, unknown> = { ...draft.profile, birth: draft.profile.birth || null };
    return Object.fromEntries(Object.entries(proposed).filter(([key, value]) => value !== current[key]));
  }
  private contextPatch(draft: EditorDraft): Partial<OverviewContextValues> {
    return Object.fromEntries(Object.entries(draft.context).filter(([key, value]) => {
      if (!this.hasTrainingScope && ['trainingLocation', 'equipmentTags', 'equipment'].includes(key)) return false;
      return JSON.stringify(value) !== JSON.stringify(this.context[key as keyof OverviewContextValues]);
    })) as Partial<OverviewContextValues>;
  }
  private snapshotAnswers(snapshot: Record<string, unknown>): IntakeAnswer[] {
    return Object.entries(snapshot).filter(([key]) => !['_id', '__v', 'trainerId', 'clientId', 'stageId', 'submittedAt', 'version'].includes(key))
      .map(([key, value]) => ({ key, label: this.fieldLabel(key), value }));
  }
  private requestId(): string {
    return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  }
  private status(error: unknown): number | null {
    return error && typeof error === 'object' && 'status' in error ? Number(error.status) : null;
  }
  private errorMessage(error: unknown, fallback: string): string {
    const status = this.status(error);
    if (status === 401 || status === 403) return 'Tu acceso a este cliente ha cambiado. Vuelve a la lista de clientes para actualizarlo.';
    if (status === 400 && error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') return error.message;
    return fallback;
  }
}
