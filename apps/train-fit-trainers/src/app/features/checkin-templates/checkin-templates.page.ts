import { Component, OnInit } from '@angular/core';
import { CHECKIN_FIELDS, CheckinField, CheckinFieldGroup } from 'src/app/core/constants/checkin-fields';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ApplyCheckinTemplateModalComponent } from './components/apply-checkin-template-modal/apply-checkin-template-modal.component';
import { CheckinCadence, CheckinTemplateDefinition } from './models/checkin-template.model';
import { CheckinTemplatesApiService } from './services/checkin-templates-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

const GROUP_LABELS: Record<CheckinFieldGroup, string> = {
  composicion_corporal: 'Composición corporal',
  perimetros: 'Perímetros',
  bienestar: 'Bienestar',
};

const GROUP_ICONS: Record<CheckinFieldGroup, string> = {
  composicion_corporal: 'body-outline',
  perimetros: 'resize-outline',
  bienestar: 'heart-outline',
};

export const CADENCE_OPTIONS: { value: CheckinCadence; label: string }[] = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'biweekly', label: 'Quincenal' },
  { value: 'once', label: 'Una vez' },
];

const CADENCE_LABELS: Record<CheckinCadence, string> = {
  weekly: 'semanal',
  biweekly: 'quincenal',
  once: 'una vez',
};

@Component({
  selector: 'app-checkin-templates',
  templateUrl: 'checkin-templates.page.html',
  styleUrls: ['checkin-templates.page.scss'],
})
export class CheckinTemplatesPage implements OnInit {
  public state: ViewState = 'loading';
  public templates: CheckinTemplateDefinition[] = [];

  public groups: { key: CheckinFieldGroup; label: string; fields: CheckinField[] }[] = (
    ['composicion_corporal', 'perimetros', 'bienestar'] as CheckinFieldGroup[]
  ).map((key) => ({
    key,
    label: GROUP_LABELS[key],
    fields: CHECKIN_FIELDS.filter((f) => f.group === key),
  }));

  // --- Panel: crear/editar plantilla ---
  public showEditPanel = false;
  public editingId: string | null = null;
  public formName = '';
  public formFields = new Set<string>();
  public formCadence: CheckinCadence = 'weekly';
  public isSaving = false;
  public CADENCE_OPTIONS = CADENCE_OPTIONS;
  public cadenceLabel(template: CheckinTemplateDefinition): string {
    return CADENCE_LABELS[template.cadence] || template.cadence;
  }

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
    private ionicUtilService: IonicUtilService
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
    this.formName = '';
    this.formFields = new Set();
    this.formCadence = 'weekly';
    this.showEditPanel = true;
  }

  public openEditPanel(template: CheckinTemplateDefinition): void {
    this.editingId = template._id;
    this.formName = template.name;
    this.formFields = new Set(template.enabledFields);
    this.formCadence = template.cadence;
    this.showEditPanel = true;
  }

  public closeEditPanel(): void {
    this.showEditPanel = false;
  }

  public toggleField(key: string): void {
    if (this.formFields.has(key)) this.formFields.delete(key);
    else this.formFields.add(key);
  }

  public isFieldEnabled(key: string): boolean {
    return this.formFields.has(key);
  }

  public saveTemplate(): void {
    const name = this.formName.trim();
    if (!name || this.isSaving) return;

    const enabledFields = [...this.formFields];
    this.isSaving = true;

    const request$ = this.editingId
      ? this.checkinTemplatesApi.update(this.editingId, { name, enabledFields, cadence: this.formCadence })
      : this.checkinTemplatesApi.create(name, enabledFields, this.formCadence);

    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditPanel = false;
        this.ionicUtilService.showToast({
          message: this.editingId ? 'Plantilla actualizada' : 'Plantilla creada',
          duration: 2500,
        });
        this.load();
      },
      error: (err) => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo guardar la plantilla',
          'Error',
          3000
        );
      },
    });
  }

  public async confirmDelete(template: CheckinTemplateDefinition): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Borrar plantilla',
      message: `¿Seguro que quieres borrar "${template.name}"? Los clientes que ya la tengan aplicada conservan su configuración actual.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => this.deleteTemplate(template),
        },
      ],
    });
  }

  private deleteTemplate(template: CheckinTemplateDefinition): void {
    this.checkinTemplatesApi.delete(template._id).subscribe({
      next: () => {
        this.ionicUtilService.showToast({ message: 'Plantilla borrada', duration: 2000 });
        this.load();
      },
      error: () => {
        this.ionicUtilService.showErrorToast('No se pudo borrar la plantilla', 'Error', 2500);
      },
    });
  }

  // --- Aplicar a clientes ---
  // Modal real (ver comentario en ApplyCheckinTemplateModalComponent) en vez
  // del <div position:fixed> hecho a mano de antes: ese quedaba tapado por
  // el <ion-header> de esta página en escritorio (contain: layout de Ionic
  // en .ion-page). cssClass: 'tf-panel-modal' le da el mismo aspecto de
  // panel anclado a la derecha.
  public async openApplyPanel(template: CheckinTemplateDefinition): Promise<void> {
    await this.ionicUtilService.showModal({
      component: ApplyCheckinTemplateModalComponent,
      componentProps: { template },
      cssClass: 'tf-panel-modal',
    });
  }

  public trackByTemplateId(_index: number, template: CheckinTemplateDefinition): string {
    return template._id;
  }

  public trackByFieldKey(_index: number, field: CheckinField): string {
    return field.key;
  }
}
