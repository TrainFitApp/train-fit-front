import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { RoutineTemplateApiService } from 'src/app/core/services/routine-template/routine-template-api.service';
import { Table } from 'src/app/core/models/table';
import { SelectClientsModalComponent } from '../clients/components/select-clients-modal/select-clients-modal.component';
import { DietTemplateApiService } from '../diet-templates/services/diet-template-api.service';
import { DietTemplate } from '../diet-templates/models/diet-template.model';
import { MacroSet } from '../diet-templates/models/diet-suggestion.model';
import { CheckinTemplatesApiService } from '../checkin-templates/services/checkin-templates-api.service';
import { CheckinTemplateDefinition } from '../checkin-templates/models/checkin-template.model';
import { CoachRulesApiService } from '../automations/services/coach-rules-api.service';
import { CoachRule } from '../automations/models/coach-rule.model';
import { checkinFieldLabel } from '../clients/checkin-labels.util';
import { KCAL_PER_G, MacroAdjustComponent } from '../../shared/components/macro-adjust/macro-adjust.component';
import { CoachProtocolsApiService } from './services/coach-protocols-api.service';
import {
  CHECKIN_CADENCE_PRESETS,
  CoachProtocol,
  PROTOCOL_TASK_PRESETS,
  ProtocolApplyResult,
  ProtocolCheckin,
  ProtocolCheckinFrequency,
  ProtocolDailyTask,
  ProtocolNutritionTarget,
  ProtocolTaskType,
  cadencePresetKey,
  protocolCadenceLabel,
  protocolCheckins,
} from './models/coach-protocol.model';

type ViewState = 'loading' | 'error' | 'loaded';

// Qué se previsualiza en el panel secundario.
interface PreviewTarget {
  kind: 'checkin' | 'diet' | 'routine' | 'rule';
  id: string;
}

interface ApplyDraft {
  protocol: CoachProtocol;
  clients: { id: string; name: string }[];
  startDate: string;
  reason: string;
}

// Punto de partida al fijar un objetivo sin dieta de referencia: 2000 kcal
// con un reparto 30/40/30 (P/C/G), cuadrado con las kcal.
const DEFAULT_TARGET_MACROS: MacroSet = { protein: 150, carbs: 200, fat: 66.7 };

// Fase 4 Coach Pro — protocolos (§20): la metodología del coach, empaquetada.
//
// Un protocolo NO guarda contenido: guarda referencias a las plantillas que
// el coach ya tiene (más la cadencia de cada check-in y, si quiere, un
// objetivo de kcal y macros). Al aplicarlo el backend ejecuta las mismas
// operaciones que el coach haría a mano, una por una.
//
// Tres paneles laterales (hoja inferior en móvil): el detalle de un
// protocolo, el editor y la confirmación de aplicar. Encima de cualquiera de
// ellos, un cuarto previsualiza la plantilla elegida sin salir de la página.
@Component({
  selector: 'app-protocols',
  templateUrl: 'protocols.page.html',
  styleUrls: ['protocols.page.scss'],
})
export class ProtocolsPage {
  public readonly taskPresets = PROTOCOL_TASK_PRESETS;
  public readonly cadencePresets = CHECKIN_CADENCE_PRESETS;
  public readonly customFrequencies: { key: ProtocolCheckinFrequency; label: string }[] = [
    { key: 'daily', label: 'días' },
    { key: 'weekly', label: 'semanas' },
    { key: 'monthly', label: 'meses' },
  ];
  public readonly macroKeys: { key: keyof MacroSet; label: string; short: string }[] = [
    { key: 'protein', label: 'Proteína', short: 'P' },
    { key: 'carbs', label: 'Carbohidratos', short: 'C' },
    { key: 'fat', label: 'Grasa', short: 'G' },
  ];

  public state: ViewState = 'loading';
  public protocols: CoachProtocol[] = [];

  // Plantillas del coach: alimentan los selectores, los nombres de las
  // tarjetas y las previsualizaciones.
  public checkinTemplates: CheckinTemplateDefinition[] = [];
  public dietTemplates: DietTemplate[] = [];
  public routineTemplates: Table[] = [];
  public rules: CoachRule[] = [];
  public optionsLoaded = false;

  // --- Detalle ---
  public detail: CoachProtocol | null = null;

  // --- Editor ---
  public showEditor = false;
  public editingId: string | null = null;
  public isSaving = false;
  public name = '';
  public description = '';
  public checkins: ProtocolCheckin[] = [];
  // Filas de check-in con "Otra" abierta aunque su cadencia coincida con un
  // atajo (el coach la está tecleando).
  public customCadenceRows = new Set<number>();
  public dietTemplateId: string | null = null;
  public routineTemplateId: string | null = null;
  public ruleIds: string[] = [];
  public dailyTasks: ProtocolDailyTask[] = [];
  // Objetivo nutricional: las kcal mandan y los macros cuadran con ellas,
  // igual que "Objetivo nutricional" en la ficha del cliente.
  public setsNutritionTarget = false;
  public targetKcal = 0;
  public targetDefaultMacros: MacroSet = { ...DEFAULT_TARGET_MACROS };
  public targetAdjustedMacros: MacroSet | null = null;
  private targetBaseMacros: MacroSet = { ...DEFAULT_TARGET_MACROS };
  @ViewChild(MacroAdjustComponent) private macroAdjust?: MacroAdjustComponent;

  // --- Previsualización ---
  public preview: PreviewTarget | null = null;

  // --- Aplicar ---
  public applyDraft: ApplyDraft | null = null;
  public applyResults: ProtocolApplyResult[] = [];
  public applyResultsName = '';
  public applyingId: string | null = null;
  private clientNames = new Map<string, string>();

  constructor(
    private coachProtocolsApi: CoachProtocolsApiService,
    private checkinTemplatesApi: CheckinTemplatesApiService,
    private dietTemplateApi: DietTemplateApiService,
    private routineTemplateApi: RoutineTemplateApiService,
    private coachRulesApi: CoachRulesApiService,
    private ionicUtilService: IonicUtilService,
    private modalController: ModalController
  ) {}

  public ionViewWillEnter(): void {
    this.load();
    this.loadOptions();
  }

  public load(): void {
    this.state = 'loading';
    this.coachProtocolsApi.getMine().subscribe({
      next: (protocols) => {
        this.protocols = protocols;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Las cuatro fuentes en paralelo y tolerantes a fallo individual: que un
  // coach no tenga plantillas de dieta no debe impedirle elegir una rutina.
  // Se recargan al volver a la página: puede venir de crear una plantilla.
  private loadOptions(): void {
    forkJoin({
      checkins: this.checkinTemplatesApi.list().pipe(catchError(() => of([] as CheckinTemplateDefinition[]))),
      diets: this.dietTemplateApi.list().pipe(catchError(() => of([] as DietTemplate[]))),
      routines: this.routineTemplateApi.list().pipe(catchError(() => of([] as Table[]))),
      rules: this.coachRulesApi.getMine().pipe(catchError(() => of([] as CoachRule[]))),
    }).subscribe((result) => {
      this.checkinTemplates = result.checkins || [];
      this.dietTemplates = result.diets || [];
      this.routineTemplates = result.routines || [];
      this.rules = result.rules || [];
      this.optionsLoaded = true;
    });
  }

  // --- Búsquedas por id (plantillas borradas → null) ---

  public checkinTemplate(id: string | null | undefined): CheckinTemplateDefinition | null {
    return this.checkinTemplates.find((t) => t._id === id) || null;
  }

  public dietTemplate(id: string | null | undefined): DietTemplate | null {
    return this.dietTemplates.find((t) => t._id === id) || null;
  }

  public routineTemplate(id: string | null | undefined): Table | null {
    return this.routineTemplates.find((t) => t._id === id) || null;
  }

  public rule(id: string | null | undefined): CoachRule | null {
    return this.rules.find((r) => r._id === id) || null;
  }

  // Mientras cargan las plantillas no se sabe si existe: no se acusa de
  // "eliminada" antes de tiempo.
  public missingName(): string {
    return this.optionsLoaded ? 'Plantilla eliminada' : '…';
  }

  public checkinsOf(protocol: CoachProtocol): ProtocolCheckin[] {
    return protocolCheckins(protocol);
  }

  public cadenceLabel(checkin: ProtocolCheckin): string {
    return `${protocolCadenceLabel(checkin)} · ${checkin.time}`;
  }

  // --- Detalle ---

  public openDetail(protocol: CoachProtocol): void {
    this.detail = protocol;
  }

  public closeDetail(): void {
    this.detail = null;
    this.preview = null;
  }

  // --- Editor ---

  public openEditor(protocol?: CoachProtocol): void {
    this.detail = null;
    this.preview = null;
    this.editingId = protocol?._id || null;
    this.name = protocol?.name || '';
    this.description = protocol?.description || '';
    this.checkins = (protocol ? protocolCheckins(protocol) : []).map((c) => ({ ...c }));
    this.customCadenceRows = new Set(
      this.checkins.map((c, i) => (cadencePresetKey(c) === 'custom' ? i : -1)).filter((i) => i >= 0)
    );
    this.dietTemplateId = protocol?.dietTemplateId || null;
    this.routineTemplateId = protocol?.routineTemplateId || null;
    this.ruleIds = [...(protocol?.ruleIds || [])];
    this.dailyTasks = (protocol?.dailyTasks || []).map((t) => ({ ...t }));
    this.startTarget(protocol?.nutritionTarget || null);
    this.showEditor = true;
  }

  public closeEditor(): void {
    this.showEditor = false;
    this.preview = null;
  }

  // --- Check-ins ---

  public addCheckin(): void {
    const used = new Set(this.checkins.map((c) => c.templateId));
    const next = this.checkinTemplates.find((t) => !used.has(t._id));
    if (!next) return;
    this.checkins = [...this.checkins, { templateId: next._id, frequency: 'weekly', interval: 1, time: '09:00' }];
  }

  public removeCheckin(index: number): void {
    this.checkins = this.checkins.filter((_, i) => i !== index);
    // Los índices de las filas siguientes bajan uno.
    this.customCadenceRows = new Set(
      [...this.customCadenceRows].filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
    );
  }

  public get canAddCheckin(): boolean {
    return this.checkins.length < this.checkinTemplates.length;
  }

  // Una plantilla ya usada en otra fila no se ofrece: dos programaciones con
  // la misma plantilla se pisarían al aplicar.
  public isTemplateTaken(templateId: string, rowIndex: number): boolean {
    return this.checkins.some((c, i) => i !== rowIndex && c.templateId === templateId);
  }

  public cadenceKey(index: number): string {
    return this.customCadenceRows.has(index) ? 'custom' : cadencePresetKey(this.checkins[index]);
  }

  public setCadence(index: number, key: string): void {
    const checkin = this.checkins[index];
    if (key === 'custom') {
      this.customCadenceRows.add(index);
      if (checkin.frequency === 'once') checkin.frequency = 'weekly';
      return;
    }
    const preset = this.cadencePresets.find((p) => p.key === key);
    if (!preset) return;
    this.customCadenceRows.delete(index);
    checkin.frequency = preset.frequency;
    checkin.interval = preset.interval;
  }

  public checkinQuestionCount(templateId: string): number {
    const template = this.checkinTemplate(templateId);
    if (!template) return 0;
    return (
      (template.enabledFields || []).length + (template.customQuestions || []).filter((q) => q.enabled !== false).length
    );
  }

  // --- Objetivo nutricional ---

  private startTarget(target: ProtocolNutritionTarget | null): void {
    this.setsNutritionTarget = !!target;
    this.targetAdjustedMacros = null;
    this.targetBaseMacros = target
      ? { protein: target.protein, carbs: target.carbs, fat: target.fat }
      : { ...DEFAULT_TARGET_MACROS };
    this.onTargetKcalChange(target?.kcal ?? 2000);
  }

  public setNutritionTargetMode(enabled: boolean): void {
    if (enabled === this.setsNutritionTarget) return;
    this.setsNutritionTarget = enabled;
    // Al activarlo con una dieta elegida, se parte de sus macros.
    if (enabled && this.selectedDietProfile) this.useDietMacros();
  }

  // Escala sobre la suma de kcal de los macros: sin tocar los macros, siguen
  // a las kcal en la misma proporción (mismo criterio que la ficha).
  public onTargetKcalChange(kcal: number | null): void {
    this.targetKcal = Number(kcal) || 0;
    const baseKcal = this.macroKcal(this.targetBaseMacros);
    const factor = baseKcal > 0 ? this.targetKcal / baseKcal : 0;
    this.targetDefaultMacros = {
      protein: this.targetBaseMacros.protein * factor,
      carbs: this.targetBaseMacros.carbs * factor,
      fat: this.targetBaseMacros.fat * factor,
    };
  }

  public get selectedDietProfile(): DietTemplate['macroProfile'] | null {
    const profile = this.dietTemplate(this.dietTemplateId)?.macroProfile;
    return profile && profile.kcal > 0 ? profile : null;
  }

  // Copia kcal y reparto del día tipo de la dieta elegida.
  public useDietMacros(): void {
    const profile = this.selectedDietProfile;
    if (!profile) return;
    this.targetBaseMacros = { protein: profile.protein, carbs: profile.carbs, fat: profile.fat };
    this.targetAdjustedMacros = null;
    // Las kcal salen de los macros (no del perfil redondeado): así cuadra.
    this.onTargetKcalChange(Math.round(this.macroKcal(this.targetBaseMacros)));
  }

  private get targetMacros(): MacroSet {
    return this.targetAdjustedMacros ?? this.targetDefaultMacros;
  }

  private macroKcal(macros: MacroSet): number {
    return (
      (macros.protein || 0) * KCAL_PER_G.protein +
      (macros.carbs || 0) * KCAL_PER_G.carbs +
      (macros.fat || 0) * KCAL_PER_G.fat
    );
  }

  // Reparto sobre las kcal (no sobre los gramos): la grasa pesa 9 kcal/g.
  public macroShare(target: ProtocolNutritionTarget, key: keyof MacroSet): number {
    const total = this.macroKcal(target);
    return total > 0 ? Math.round(((target[key] || 0) * KCAL_PER_G[key] * 100) / total) : 0;
  }

  // --- Reglas y hábitos ---

  public toggleRule(ruleId: string): void {
    this.ruleIds = this.ruleIds.includes(ruleId)
      ? this.ruleIds.filter((id) => id !== ruleId)
      : [...this.ruleIds, ruleId];
  }

  public isRuleSelected(ruleId: string): boolean {
    return this.ruleIds.includes(ruleId);
  }

  public hasTask(type: ProtocolTaskType): boolean {
    return type !== 'custom' && this.dailyTasks.some((t) => t.type === type);
  }

  public addTask(preset: ProtocolTaskType): void {
    if (this.hasTask(preset)) return;
    const base = this.taskPresets.find((p) => p.type === preset);
    this.dailyTasks = [
      ...this.dailyTasks,
      {
        type: preset,
        label: base?.label || null,
        target: base?.target || 1,
        unit: base?.unit || '',
      },
    ];
  }

  public removeTask(index: number): void {
    this.dailyTasks = this.dailyTasks.filter((_, i) => i !== index);
  }

  // --- Guardar ---

  public get validationError(): string | null {
    if (!this.name.trim()) return 'Ponle un nombre al protocolo.';
    if (this.checkins.some((c) => !c.templateId)) return 'Elige la plantilla de cada check-in.';
    if (this.checkins.some((c) => !(Number.isInteger(Number(c.interval)) && c.interval >= 1 && c.interval <= 52))) {
      return 'El intervalo de cada check-in va de 1 a 52.';
    }
    if (this.checkins.some((c) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(c.time || ''))) {
      return 'Pon la hora de cada check-in.';
    }
    if (this.setsNutritionTarget && !(this.targetKcal > 0)) return 'Pon las kcal del objetivo.';
    if (this.dailyTasks.some((t) => !(Number(t.target) > 0))) {
      return 'Cada hábito necesita un objetivo mayor que 0.';
    }
    // Un protocolo que no hace nada es casi seguro un olvido.
    const hasContent =
      this.checkins.length ||
      this.dietTemplateId ||
      this.setsNutritionTarget ||
      this.routineTemplateId ||
      this.ruleIds.length ||
      this.dailyTasks.length;
    if (!hasContent) return 'Añade al menos una cosa: un check-in, una plantilla, un objetivo, una regla o un hábito.';
    return null;
  }

  public save(): void {
    const error = this.validationError;
    if (error) {
      void this.ionicUtilService.showWarningToast(error);
      return;
    }
    // Macros que no cuadran con las kcal: no se guarda (abre el ajuste y
    // lo trae a la vista).
    const macroError = this.setsNutritionTarget ? this.macroAdjust?.validate() : null;
    if (macroError) {
      void this.ionicUtilService.showWarningToast(macroError);
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;

    const macros = this.targetMacros;
    const payload: Partial<CoachProtocol> = {
      name: this.name.trim(),
      description: this.description.trim(),
      checkins: this.checkins.map((c) => ({ ...c, interval: Number(c.interval) })),
      dietTemplateId: this.dietTemplateId || null,
      routineTemplateId: this.routineTemplateId || null,
      ruleIds: this.ruleIds,
      dailyTasks: this.dailyTasks.map((t) => ({ ...t, target: Number(t.target) })),
      nutritionTarget: this.setsNutritionTarget
        ? {
            kcal: Math.round(this.targetKcal),
            protein: Math.round(macros.protein),
            carbs: Math.round(macros.carbs),
            fat: Math.round(macros.fat),
          }
        : null,
    };

    const request$ = this.editingId
      ? this.coachProtocolsApi.update(this.editingId, payload)
      : this.coachProtocolsApi.create(payload);

    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.closeEditor();
        this.load();
      },
      error: (error) => {
        this.isSaving = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo guardar el protocolo');
      },
    });
  }

  public async confirmDelete(protocol: CoachProtocol): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Eliminar protocolo',
      message: `"${protocol.name}" desaparecerá de tu biblioteca. Los clientes a los que ya se lo aplicaste conservan todo lo que se les asignó.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.coachProtocolsApi.remove(protocol._id).subscribe({
              next: () => {
                this.protocols = this.protocols.filter((p) => p._id !== protocol._id);
                if (this.detail?._id === protocol._id) this.closeDetail();
              },
              error: (error) =>
                void this.ionicUtilService.showErrorToast(error, 'No se pudo eliminar el protocolo'),
            });
          },
        },
      ],
    });
  }

  // --- Previsualización ---

  // Pulsar otra vez la misma plantilla cierra la previsualización.
  public openPreview(target: { kind: PreviewTarget['kind']; id: string | null | undefined }): void {
    const id = target.id;
    if (!id) return;
    this.preview = this.preview?.kind === target.kind && this.preview.id === id ? null : { kind: target.kind, id };
  }

  public closePreview(): void {
    this.preview = null;
  }

  public isPreviewing(kind: PreviewTarget['kind'], id: string | null | undefined): boolean {
    return !!id && this.preview?.kind === kind && this.preview.id === id;
  }

  public get previewCheckin(): CheckinTemplateDefinition | null {
    return this.preview?.kind === 'checkin' ? this.checkinTemplate(this.preview.id) : null;
  }

  public get previewDiet(): DietTemplate | null {
    return this.preview?.kind === 'diet' ? this.dietTemplate(this.preview.id) : null;
  }

  public get previewRoutine(): Table | null {
    return this.preview?.kind === 'routine' ? this.routineTemplate(this.preview.id) : null;
  }

  public get previewRule(): CoachRule | null {
    return this.preview?.kind === 'rule' ? this.rule(this.preview.id) : null;
  }

  public fieldLabel(key: string): string {
    return checkinFieldLabel(key);
  }

  public isRequiredField(template: CheckinTemplateDefinition, key: string): boolean {
    return (template.requiredFields || []).includes(key);
  }

  // --- Aplicar ---

  public async applyProtocol(protocol: CoachProtocol): Promise<void> {
    const modal = await this.modalController.create({
      component: SelectClientsModalComponent,
      componentProps: { title: `Aplicar "${protocol.name}"` },
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role !== 'confirm' || !data?.targetClientIds?.length) return;

    const names = new Map<string, string>(
      (data.targetClients || []).map((c: { id: string; name: string }) => [c.id, c.name] as [string, string])
    );
    names.forEach((name, id) => this.clientNames.set(id, name));
    this.detail = null;
    this.preview = null;
    this.applyDraft = {
      protocol,
      clients: (data.targetClientIds as string[]).map((id) => ({ id, name: names.get(id) || 'Cliente' })),
      startDate: this.todayIso(),
      reason: '',
    };
  }

  public closeApply(): void {
    if (this.applyingId) return;
    this.applyDraft = null;
    this.preview = null;
  }

  public confirmApply(): void {
    const draft = this.applyDraft;
    if (!draft || this.applyingId) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.startDate || '')) {
      void this.ionicUtilService.showWarningToast('Elige la fecha de inicio.');
      return;
    }
    this.applyingId = draft.protocol._id;
    this.applyResults = [];

    this.coachProtocolsApi
      .applyToClients(
        draft.protocol._id,
        draft.clients.map((c) => c.id),
        { startDate: draft.startDate, reason: draft.reason.trim() || undefined }
      )
      .subscribe({
        next: (results) => {
          this.applyingId = null;
          this.applyDraft = null;
          this.applyResults = results;
          this.applyResultsName = draft.protocol.name;
          const failed = results.filter((r) => !r.success || r.steps?.some((s) => s.status === 'failed')).length;
          if (!failed) {
            void this.ionicUtilService.showSuccessToast(
              `Protocolo aplicado a ${results.length} cliente${results.length === 1 ? '' : 's'}`
            );
          } else {
            void this.ionicUtilService.showWarningToast(
              `${results.length - failed} de ${results.length} sin incidencias. Revisa el detalle.`
            );
          }
        },
        error: (error) => {
          this.applyingId = null;
          void this.ionicUtilService.showErrorToast(error, 'No se pudo aplicar el protocolo');
        },
      });
  }

  public clientName(clientId: string): string {
    return this.clientNames.get(clientId) || 'Cliente';
  }

  public dismissResults(): void {
    this.applyResults = [];
  }

  private todayIso(): string {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }

  // --- Resumen para la tarjeta ---

  public contentSummary(protocol: CoachProtocol): { icon: string; text: string }[] {
    const parts: { icon: string; text: string }[] = [];
    const checkins = protocolCheckins(protocol);
    if (checkins.length === 1) {
      parts.push({ icon: 'clipboard-outline', text: `Check-in ${protocolCadenceLabel(checkins[0]).toLowerCase()}` });
    } else if (checkins.length > 1) {
      parts.push({ icon: 'clipboard-outline', text: `${checkins.length} check-ins` });
    }
    if (protocol.dietTemplateId) {
      parts.push({ icon: 'restaurant-outline', text: this.dietTemplate(protocol.dietTemplateId)?.name || 'Plan de dieta' });
    }
    if (protocol.nutritionTarget) {
      parts.push({ icon: 'flame-outline', text: `${protocol.nutritionTarget.kcal.toLocaleString('es-ES')} kcal` });
    }
    if (protocol.routineTemplateId) {
      parts.push({ icon: 'barbell-outline', text: this.routineTemplate(protocol.routineTemplateId)?.name || 'Rutina' });
    }
    if (protocol.ruleIds?.length) {
      parts.push({
        icon: 'flash-outline',
        text: `${protocol.ruleIds.length} ${protocol.ruleIds.length === 1 ? 'aviso' : 'avisos'}`,
      });
    }
    if (protocol.dailyTasks?.length) {
      parts.push({
        icon: 'checkmark-done-outline',
        text: `${protocol.dailyTasks.length} hábito${protocol.dailyTasks.length === 1 ? '' : 's'}`,
      });
    }
    return parts;
  }

  public stepStatusLabel(status: string): string {
    return status === 'applied' ? 'Aplicado' : status === 'skipped' ? 'No incluido' : 'Falló';
  }

  public trackByProtocolId(_index: number, protocol: CoachProtocol): string {
    return protocol._id;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
