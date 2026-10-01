import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CHECKIN_FIELDS, CheckinField, CheckinFieldGroup } from 'src/app/core/constants/checkin-fields';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ApplyCheckinTemplateModalComponent } from './components/apply-checkin-template-modal/apply-checkin-template-modal.component';
import {
  CUSTOM_QUESTION_TYPES,
  CheckinTemplateDefinition,
  CustomCheckinQuestion,
} from './models/checkin-template.model';
import { CheckinTemplatesApiService } from './services/checkin-templates-api.service';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

type ViewState = 'loading' | 'error' | 'loaded';

// Mismos topes que valida el backend (checkin-controller.js): decirlos aquí
// evita ofrecer un botón "añadir" que siempre acabaría en un 400.
const MAX_CUSTOM_QUESTIONS = 20;
const MAX_QUESTION_OPTIONS = 10;

const GROUP_LABELS: Record<CheckinFieldGroup, string> = {
  composicion_corporal: 'Composición corporal',
  perimetros: 'Perímetros',
  bienestar: 'Bienestar',
  fotos: 'Fotos de progreso',
};
localizeRecord(GROUP_LABELS, 'CHECKIN_FIELD_GROUPS');

const GROUP_ICONS: Record<CheckinFieldGroup, string> = {
  composicion_corporal: 'body-outline',
  perimetros: 'resize-outline',
  bienestar: 'heart-outline',
  fotos: 'camera-outline',
};

@Component({
  selector: 'app-checkin-templates',
  templateUrl: 'checkin-templates.page.html',
  styleUrls: ['checkin-templates.page.scss'],
})
export class CheckinTemplatesPage implements OnInit {
  private readonly translate = inject(TranslateService);

  public state: ViewState = 'loading';
  public templates: CheckinTemplateDefinition[] = [];

  public groups: { key: CheckinFieldGroup; label: string; fields: CheckinField[] }[] = (
    ['composicion_corporal', 'perimetros', 'bienestar', 'fotos'] as CheckinFieldGroup[]
  ).map((key) => ({
    key,
    label: GROUP_LABELS[key],
    fields: CHECKIN_FIELDS.filter((f) => f.group === key),
  }));

  // --- Panel: crear/editar plantilla ---
  public showEditPanel = false;
  public editingId: string | null = null;
  public editingTemplate: CheckinTemplateDefinition | null = null;
  public formName = '';
  // Arrays y no Set: es lo que enlaza <app-checkin-field-selector>, y hay que
  // pasarle SIEMPRE la misma identidad hasta que cambie de verdad (un
  // Array.from(set) en la plantilla recrearía el selector en cada ciclo).
  public formFields: string[] = [];
  // Obligatorios: siempre subconjunto de formFields (el selector los saca al
  // desactivar un campo).
  public formRequired: string[] = [];
  public isSaving = false;
  // Fase 5 Coach Pro — preguntas propias del coach (§7). Conviven con
  // formFields, que sigue siendo el catálogo cerrado.
  public formCustomQuestions: CustomCheckinQuestion[] = [];
  // Plegada por defecto al crear; abierta al editar una plantilla que ya
  // tiene preguntas propias, que es lo que se viene a revisar.
  public showCustomQuestions = false;
  public readonly questionTypes = CUSTOM_QUESTION_TYPES;
  public readonly maxCustomQuestions = MAX_CUSTOM_QUESTIONS;
  public readonly maxQuestionOptions = MAX_QUESTION_OPTIONS;

  // Desglose por grupo ("3 composición corporal", "5 perímetros"...) para
  // que la card muestre de un vistazo QUÉ tiene activado la plantilla, no
  // solo un conteo total — antes solo decía "8 campos", sin decir de qué.
  // Cacheado por _id (no un getter evaluado en cada ciclo de detección de
  // cambios del *ngFor, mismo criterio que filteredApplyClients de abajo).
  private groupSummaryCache = new Map<string, { key: CheckinFieldGroup; label: string; count: number }[]>();

  public templateGroupSummary(
    template: CheckinTemplateDefinition
  ): { key: CheckinFieldGroup; label: string; count: number }[] {
    const cached = this.groupSummaryCache.get(template._id);
    if (cached) return cached;

    const summary = this.groups
      .map((g) => ({
        key: g.key,
        label: g.label,
        count: g.fields.filter((f) => template.enabledFields.includes(f.key)).length,
      }))
      .filter((g) => g.count > 0);

    this.groupSummaryCache.set(template._id, summary);
    return summary;
  }

  public groupIcon(key: CheckinFieldGroup): string {
    return GROUP_ICONS[key];
  }

  constructor(
    private checkinTemplatesApi: CheckinTemplatesApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.checkinTemplatesApi.list().subscribe({
      next: (templates) => {
        this.templates = templates || [];
        // Invalida el caché de desglose por grupo — una plantilla editada
        // conserva el mismo _id, así que sin esto seguiría mostrando el
        // desglose de campos anterior tras guardar cambios.
        this.groupSummaryCache.clear();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // --- Crear/editar ---
  public openCreatePanel(): void {
    this.editingId = null;
    this.editingTemplate = null;
    this.formName = '';
    this.formFields = [];
    this.formRequired = [];
    this.showCustomQuestions = false;
    this.formCustomQuestions = [];
    this.showEditPanel = true;
  }

  public openEditPanel(template: CheckinTemplateDefinition): void {
    this.editingId = template._id;
    // La plantilla entera y no solo su id: el botón de borrar del pie del
    // panel necesita su nombre para el diálogo de confirmación.
    this.editingTemplate = template;
    this.formName = template.name;
    this.formFields = [...template.enabledFields];
    this.formRequired = (
      (template.requiredFields || []).filter((key) => this.formFields.includes(key))
    );
    // Copia, no referencia: cancelar el panel no debe dejar editada la
    // plantilla de la lista de detrás.
    this.formCustomQuestions = (template.customQuestions || []).map((q) => ({
      ...q,
      options: [...(q.options || [])],
    }));
    this.showCustomQuestions = this.formCustomQuestions.length > 0;
    this.showEditPanel = true;
  }

  // --- Preguntas propias (Fase 5, §7) ---

  public addCustomQuestion(): void {
    if (this.formCustomQuestions.length >= MAX_CUSTOM_QUESTIONS) return;
    this.formCustomQuestions = [
      ...this.formCustomQuestions,
      { label: '', type: 'scale_1_5', unit: '', options: [], required: false, enabled: true },
    ];
  }

  public removeCustomQuestion(index: number): void {
    this.formCustomQuestions = this.formCustomQuestions.filter((_, i) => i !== index);
  }

  // Al cambiar de tipo se limpia lo que ya no aplica: una pregunta que era
  // "selector" y pasa a "número" arrastraría opciones invisibles que el
  // backend seguiría guardando.
  public onQuestionTypeChange(question: CustomCheckinQuestion): void {
    if (question.type !== 'select') question.options = [];
    if (question.type !== 'number') question.unit = '';
  }

  public addOption(question: CustomCheckinQuestion): void {
    if ((question.options?.length || 0) >= MAX_QUESTION_OPTIONS) return;
    question.options = [...(question.options || []), ''];
  }

  public removeOption(question: CustomCheckinQuestion, index: number): void {
    question.options = (question.options || []).filter((_, i) => i !== index);
  }

  public trackByIndex(index: number): number {
    return index;
  }

  // Qué significa el tipo elegido, dicho debajo del selector: "frecuencia"
  // no dice por sí solo que su escala sea fija y cuál es.
  public hintFor(question: CustomCheckinQuestion): string {
    return this.questionTypes.find((t) => t.key === question.type)?.hint || '';
  }

  // Por qué no se puede guardar, dicho siempre en vez de dejar el botón
  // desactivado sin explicación.
  public get customQuestionsError(): string | null {
    for (const question of this.formCustomQuestions) {
      if (!question.label.trim()) return this.translate.instant('CHECKIN_TEMPLATES.TODAS_LAS_PREGUNTAS_NECESITAN_UN');
      if (question.type === 'select') {
        const options = (question.options || []).filter((o) => o.trim());
        if (options.length < 2) {
          return this.translate.instant('CHECKIN_TEMPLATES.NECESITA_AL_MENOS_2_OPCIONES', { p0: question.label || 'Sin título' });
        }
      }
    }
    return null;
  }

  public closeEditPanel(): void {
    this.showEditPanel = false;
    this.editingTemplate = null;
  }


  public requiredCount(template: CheckinTemplateDefinition): number {
    return (template.requiredFields || []).length +
      (template.customQuestions || []).filter((q) => q.required && q.enabled !== false).length;
  }

  public saveTemplate(): void {
    const name = this.formName.trim();
    if (!name || this.isSaving) return;

    const questionsError = this.customQuestionsError;
    if (questionsError) {
      this.ionicUtilService.showErrorToast(questionsError, this.translate.instant('CHECKIN_TEMPLATES.REVISA_LAS_PREGUNTAS'), 3000);
      return;
    }

    const enabledFields = [...this.formFields];
    const requiredFields = enabledFields.filter((key) => this.formRequired.includes(key));
    // Se limpian antes de enviar: las opciones en blanco de un selector a
    // medio escribir no deben llegar a la plantilla que verá el cliente.
    const customQuestions = this.formCustomQuestions.map((q) => ({
      ...q,
      label: q.label.trim(),
      options: (q.options || []).map((o) => o.trim()).filter(Boolean),
    }));
    this.isSaving = true;

    const request$ = this.editingId
      ? this.checkinTemplatesApi.update(this.editingId, {
          name,
          enabledFields,
          requiredFields,
          customQuestions,
        })
      : this.checkinTemplatesApi.create(name, enabledFields, customQuestions, requiredFields);

    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditPanel = false;
        this.ionicUtilService.showToast({
          message: this.editingId ? this.translate.instant('CHECKIN_TEMPLATES.PLANTILLA_ACTUALIZADA') : this.translate.instant('CHECKIN_TEMPLATES.PLANTILLA_CREADA'),
          duration: 2500,
        });
        this.load();
      },
      error: (err) => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || this.translate.instant('TABLES.TEMPLATE_SAVE_ERROR'),
          this.translate.instant('COMMON.ERROR'),
          3000
        );
      },
    });
  }

  public async confirmDelete(template: CheckinTemplateDefinition): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('CHECKIN_TEMPLATES.BORRAR_PLANTILLA_2'),
      message: this.translate.instant('CHECKIN_TEMPLATES.SEGURO_QUE_QUIERES_BORRAR_LOS', { name: template.name }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.ERASE'),
          cssClass: 'alert-button-danger',
          handler: () => this.deleteTemplate(template),
        },
      ],
    });
  }

  private deleteTemplate(template: CheckinTemplateDefinition): void {
    this.checkinTemplatesApi.delete(template._id).subscribe({
      next: () => {
        this.ionicUtilService.showToast({ message: this.translate.instant('CHECKIN_TEMPLATES.PLANTILLA_BORRADA'), duration: 2000 });
        // Borrada desde el propio panel: dejarlo abierto sería seguir
        // editando algo que ya no existe.
        if (this.editingId === template._id) this.closeEditPanel();
        this.load();
      },
      error: () => {
        this.ionicUtilService.showErrorToast(this.translate.instant('CHECKIN_TEMPLATES.NO_SE_PUDO_BORRAR_LA'), this.translate.instant('COMMON.ERROR'), 2500);
      },
    });
  }

  // --- Aplicar a un cliente ---
  // Modal real (ver comentario en ApplyCheckinTemplateModalComponent) en vez
  // del <div position:fixed> hecho a mano de antes: ese quedaba tapado por
  // el <ion-header> de esta página en escritorio (contain: layout de Ionic
  // en .ion-page). cssClass: 'tf-panel-modal' le da el mismo aspecto de
  // panel anclado a la derecha.
  //
  // Aplicar ya no crea la programación a ciegas (fecha y frecuencia por
  // defecto): lleva a "Medidas y check-ins" del cliente elegido con
  // "Nueva programación" abierta y esta plantilla ya escogida.
  public async openApplyPanel(template: CheckinTemplateDefinition): Promise<void> {
    const { data, role } = await this.ionicUtilService.showModal({
      component: ApplyCheckinTemplateModalComponent,
      componentProps: { template },
      cssClass: 'tf-panel-modal',
    });
    if (role !== 'confirm' || !data?.clientId) return;

    void this.router.navigate(['/tabs/clients', data.clientId], {
      queryParams: { name: data.clientName, tab: 'measurements', checkinTemplate: template._id },
    });
  }

  public trackByTemplateId(_index: number, template: CheckinTemplateDefinition): string {
    return template._id;
  }
}
