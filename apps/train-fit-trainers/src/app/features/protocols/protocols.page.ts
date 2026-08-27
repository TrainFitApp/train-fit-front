import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { RoutineTemplateApiService } from 'src/app/core/services/routine-template/routine-template-api.service';
import { SelectClientsModalComponent } from '../clients/components/select-clients-modal/select-clients-modal.component';
import { DietTemplateApiService } from '../diet-templates/services/diet-template-api.service';
import { CheckinTemplatesApiService } from '../checkin-templates/services/checkin-templates-api.service';
import { CoachRulesApiService } from '../automations/services/coach-rules-api.service';
import { CoachProtocolsApiService } from './services/coach-protocols-api.service';
import {
  CoachProtocol,
  PROTOCOL_TASK_PRESETS,
  ProtocolApplyResult,
  ProtocolDailyTask,
  ProtocolTaskType,
} from './models/coach-protocol.model';

type ViewState = 'loading' | 'error' | 'loaded';

interface PickerOption {
  _id: string;
  name: string;
}

// Fase 4 Coach Pro — protocolos (§20): la metodología del coach, empaquetada.
//
// Un protocolo NO guarda contenido: guarda referencias a las plantillas que
// el coach ya tiene. Por eso esta pantalla es fundamentalmente una lista de
// selectores — y por eso al aplicarlo el backend ejecuta exactamente las
// mismas operaciones que el coach haría a mano, una por una.
//
// El editor vive en un panel dentro de esta misma página, no en una ruta
// propia como el constructor de reglas: un protocolo es una lista corta de
// elecciones (nombre, macros, 3 plantillas, hábitos), no un formulario con
// estructura anidada.
@Component({
  selector: 'app-protocols',
  templateUrl: 'protocols.page.html',
  styleUrls: ['protocols.page.scss'],
})
export class ProtocolsPage {
  public readonly taskPresets = PROTOCOL_TASK_PRESETS;

  public state: ViewState = 'loading';
  public protocols: CoachProtocol[] = [];

  // Opciones de los selectores, cargadas una vez al abrir el editor.
  public checkinTemplates: PickerOption[] = [];
  public dietTemplates: PickerOption[] = [];
  public routineTemplates: PickerOption[] = [];
  public rules: PickerOption[] = [];
  public optionsLoaded = false;

  // --- Editor ---
  public showEditor = false;
  public editingId: string | null = null;
  public isSaving = false;
  public name = '';
  public description = '';
  public kcalTotal: number | null = null;
  public proteinsGTotal: number | null = null;
  public carbohydratesGTotal: number | null = null;
  public fatGTotal: number | null = null;
  public checkinTemplateId: string | null = null;
  public dietTemplateId: string | null = null;
  public routineTemplateId: string | null = null;
  public ruleIds: string[] = [];
  public dailyTasks: ProtocolDailyTask[] = [];

  // --- Resultado de aplicar ---
  public applyResults: ProtocolApplyResult[] = [];
  public applyingId: string | null = null;

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
  private loadOptions(): void {
    if (this.optionsLoaded) return;
    forkJoin({
      checkins: this.checkinTemplatesApi.list().pipe(catchError(() => of([]))),
      diets: this.dietTemplateApi.list().pipe(catchError(() => of([]))),
      routines: this.routineTemplateApi.list().pipe(catchError(() => of([]))),
      rules: this.coachRulesApi.getMine().pipe(catchError(() => of([]))),
    }).subscribe((result) => {
      this.checkinTemplates = (result.checkins || []).map((t) => ({ _id: t._id, name: t.name }));
      this.dietTemplates = (result.diets || []).map((t) => ({ _id: t._id, name: t.name }));
      this.routineTemplates = (result.routines || []).map((t) => ({ _id: t._id, name: t.name || 'Rutina' }));
      this.rules = (result.rules || []).map((r) => ({ _id: r._id, name: r.name }));
      this.optionsLoaded = true;
    });
  }

  // --- Editor ---

  public openEditor(protocol?: CoachProtocol): void {
    this.loadOptions();
    this.editingId = protocol?._id || null;
    this.name = protocol?.name || '';
    this.description = protocol?.description || '';
    this.kcalTotal = protocol?.nutritionalGoal?.kcalTotal ?? null;
    this.proteinsGTotal = protocol?.nutritionalGoal?.proteinsGTotal ?? null;
    this.carbohydratesGTotal = protocol?.nutritionalGoal?.carbohydratesGTotal ?? null;
    this.fatGTotal = protocol?.nutritionalGoal?.fatGTotal ?? null;
    this.checkinTemplateId = protocol?.checkinTemplateId || null;
    this.dietTemplateId = protocol?.dietTemplateId || null;
    this.routineTemplateId = protocol?.routineTemplateId || null;
    this.ruleIds = [...(protocol?.ruleIds || [])];
    this.dailyTasks = (protocol?.dailyTasks || []).map((t) => ({ ...t }));
    this.showEditor = true;
  }

  public closeEditor(): void {
    this.showEditor = false;
  }

  public toggleRule(ruleId: string): void {
    this.ruleIds = this.ruleIds.includes(ruleId)
      ? this.ruleIds.filter((id) => id !== ruleId)
      : [...this.ruleIds, ruleId];
  }

  public isRuleSelected(ruleId: string): boolean {
    return this.ruleIds.includes(ruleId);
  }

  public addTask(preset: ProtocolTaskType): void {
    if (this.dailyTasks.some((t) => t.type === preset && preset !== 'custom')) return;
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

  public get validationError(): string | null {
    if (!this.name.trim()) return 'Ponle un nombre al protocolo.';
    if (this.dailyTasks.some((t) => !(Number(t.target) > 0))) {
      return 'Cada hábito necesita un objetivo mayor que 0.';
    }
    // Un protocolo que no hace nada se puede guardar sin error, pero avisa:
    // es casi seguro un olvido, no una intención.
    const hasContent =
      this.kcalTotal !== null ||
      this.checkinTemplateId ||
      this.dietTemplateId ||
      this.routineTemplateId ||
      this.ruleIds.length ||
      this.dailyTasks.length;
    if (!hasContent) return 'Añade al menos una cosa: macros, una plantilla, una regla o un hábito.';
    return null;
  }

  public save(): void {
    const error = this.validationError;
    if (error) {
      void this.ionicUtilService.showWarningToast(error);
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;

    const payload: Partial<CoachProtocol> = {
      name: this.name.trim(),
      description: this.description.trim(),
      nutritionalGoal: {
        kcalTotal: this.kcalTotal === null ? null : Number(this.kcalTotal),
        proteinsGTotal: this.proteinsGTotal === null ? null : Number(this.proteinsGTotal),
        carbohydratesGTotal:
          this.carbohydratesGTotal === null ? null : Number(this.carbohydratesGTotal),
        fatGTotal: this.fatGTotal === null ? null : Number(this.fatGTotal),
      },
      checkinTemplateId: this.checkinTemplateId || null,
      dietTemplateId: this.dietTemplateId || null,
      routineTemplateId: this.routineTemplateId || null,
      ruleIds: this.ruleIds,
      dailyTasks: this.dailyTasks.map((t) => ({ ...t, target: Number(t.target) })),
    };

    const request$ = this.editingId
      ? this.coachProtocolsApi.update(this.editingId, payload)
      : this.coachProtocolsApi.create(payload);

    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditor = false;
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
          handler: () => {
            this.coachProtocolsApi.remove(protocol._id).subscribe({
              next: () => {
                this.protocols = this.protocols.filter((p) => p._id !== protocol._id);
              },
              error: (error) =>
                void this.ionicUtilService.showErrorToast(error, 'No se pudo eliminar el protocolo'),
            });
          },
        },
      ],
    });
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

    this.applyingId = protocol._id;
    this.applyResults = [];

    this.coachProtocolsApi.applyToClients(protocol._id, data.targetClientIds).subscribe({
      next: (results) => {
        this.applyingId = null;
        this.applyResults = results;
        const failed = results.filter((r) => !r.success).length;
        if (!failed) {
          void this.ionicUtilService.showSuccessToast(
            `Protocolo aplicado a ${results.length} cliente${results.length === 1 ? '' : 's'}`
          );
        } else {
          void this.ionicUtilService.showWarningToast(
            `${results.length - failed} de ${results.length} aplicados. Revisa el detalle.`
          );
        }
      },
      error: (error) => {
        this.applyingId = null;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo aplicar el protocolo');
      },
    });
  }

  public dismissResults(): void {
    this.applyResults = [];
  }

  // --- Resumen para la tarjeta ---

  public contentSummary(protocol: CoachProtocol): string[] {
    const parts: string[] = [];
    if (protocol.nutritionalGoal?.kcalTotal !== null && protocol.nutritionalGoal?.kcalTotal !== undefined) {
      parts.push(`${protocol.nutritionalGoal.kcalTotal} kcal`);
    }
    if (protocol.checkinTemplateId) parts.push('Check-in');
    if (protocol.dietTemplateId) parts.push('Plan de dieta');
    if (protocol.routineTemplateId) parts.push('Rutina');
    if (protocol.ruleIds?.length) {
      parts.push(`${protocol.ruleIds.length} automatización${protocol.ruleIds.length === 1 ? '' : 'es'}`);
    }
    if (protocol.dailyTasks?.length) {
      parts.push(`${protocol.dailyTasks.length} hábito${protocol.dailyTasks.length === 1 ? '' : 's'}`);
    }
    return parts;
  }

  public trackByProtocolId(_index: number, protocol: CoachProtocol): string {
    return protocol._id;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
