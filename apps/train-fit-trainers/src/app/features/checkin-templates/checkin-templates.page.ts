import { Component, OnInit } from '@angular/core';
import { CHECKIN_FIELDS, CheckinField, CheckinFieldGroup } from 'src/app/core/constants/checkin-fields';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerClientSummary } from '../clients/models/trainer-client-summary.model';
import { TrainerClientsApiService } from '../clients/services/trainer-clients-api.service';
import { CheckinCadence, CheckinTemplateDefinition } from './models/checkin-template.model';
import { CheckinTemplatesApiService } from './services/checkin-templates-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

const GROUP_LABELS: Record<CheckinFieldGroup, string> = {
  composicion_corporal: 'Composición corporal',
  perimetros: 'Perímetros',
  bienestar: 'Bienestar',
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

  // --- Panel: aplicar a clientes ---
  public showApplyPanel = false;
  public applyingTemplate: CheckinTemplateDefinition | null = null;
  public myClients: TrainerClientSummary[] = [];
  public selectedClientIds = new Set<string>();
  public isApplying = false;

  constructor(
    private checkinTemplatesApi: CheckinTemplatesApiService,
    private trainerClientsApi: TrainerClientsApiService,
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
  public openApplyPanel(template: CheckinTemplateDefinition): void {
    this.applyingTemplate = template;
    this.selectedClientIds = new Set();
    this.showApplyPanel = true;
    if (!this.myClients.length) {
      this.trainerClientsApi.getMyClients().subscribe((clients) => {
        this.myClients = clients || [];
      });
    }
  }

  public closeApplyPanel(): void {
    this.showApplyPanel = false;
  }

  public toggleClientSelected(client: TrainerClientSummary): void {
    const id = client.user?._id;
    if (!id) return;
    if (this.selectedClientIds.has(id)) this.selectedClientIds.delete(id);
    else this.selectedClientIds.add(id);
  }

  public isClientSelected(client: TrainerClientSummary): boolean {
    return !!client.user && this.selectedClientIds.has(client.user._id);
  }

  public confirmApply(): void {
    if (!this.applyingTemplate || !this.selectedClientIds.size || this.isApplying) return;

    this.isApplying = true;
    this.checkinTemplatesApi
      .apply(this.applyingTemplate._id, [...this.selectedClientIds])
      .subscribe({
        next: (result) => {
          this.isApplying = false;
          this.showApplyPanel = false;
          const total = result.applied.length + result.skipped.length;
          this.ionicUtilService.showToast({
            message:
              result.skipped.length > 0
                ? `Aplicada a ${result.applied.length} de ${total} clientes (${result.skipped.length} sin relación activa)`
                : `Aplicada a ${result.applied.length} cliente${result.applied.length === 1 ? '' : 's'}`,
            duration: 3500,
          });
        },
        error: () => {
          this.isApplying = false;
          this.ionicUtilService.showErrorToast('No se pudo aplicar la plantilla', 'Error', 3000);
        },
      });
  }

  public getFullName(client: TrainerClientSummary): string {
    if (!client.user) return 'Cliente';
    return `${client.user.name} ${client.user.lastname}`.trim();
  }

  public trackByTemplateId(_index: number, template: CheckinTemplateDefinition): string {
    return template._id;
  }

  public trackByFieldKey(_index: number, field: CheckinField): string {
    return field.key;
  }

  public trackByClientId(_index: number, client: TrainerClientSummary): string {
    return client.user?._id || _index.toString();
  }
}
