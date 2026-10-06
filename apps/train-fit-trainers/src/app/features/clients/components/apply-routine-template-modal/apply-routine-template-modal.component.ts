import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import { ClientTable } from '../../pages/client-detail/models/client-detail.model';

// Rutinas -> Plantillas (rediseño 2026-08) — "Usar plantilla" del panel
// "Asignar rutina" de client-detail.page.ts. Reactiva F11 (getAvailableTemplates/
// assignTemplateRoutine en ClientDetailApiService), escrito hace tiempo pero
// nunca consumido desde ningún componente. Mismo patrón de modal real (ion-modal)
// que ApplyCheckinTemplateModalComponent (selección + confirmar + dismiss),
// pero al revés: aquí se elige UNA plantilla para UN cliente ya conocido
// (viene como @Input), no varios clientes para una plantilla ya conocida.
@Component({
  selector: 'app-apply-routine-template-modal',
  templateUrl: './apply-routine-template-modal.component.html',
  styleUrls: ['./apply-routine-template-modal.component.scss'],
})
export class ApplyRoutineTemplateModalComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  @Input() clientId!: string;
  @Input() clientName = this.translate.instant('CLIENTS.ESTE_CLIENTE');

  public loading = true;
  public templates: ClientTable[] = [];
  public selectedTemplateId: string | null = null;
  public isApplying = false;

  constructor(
    private modalController: ModalController,
    private clientDetailApi: ClientDetailApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.clientDetailApi.getAvailableTemplates(this.clientId).subscribe({
      next: (templates) => {
        this.templates = templates || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.ionicUtilService.showErrorToast(this.translate.instant('TABLES.TEMPLATES_LOAD_ERROR'), this.translate.instant('COMMON.ERROR'), 2500);
      },
    });
  }

  public select(template: ClientTable): void {
    this.selectedTemplateId = template._id;
  }

  public microcyclesCount(template: ClientTable): number {
    return (template.splits || []).length;
  }

  public trackByTemplateId(_index: number, template: ClientTable): string {
    return template._id;
  }

  public dismiss(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  public confirmApply(): void {
    if (!this.selectedTemplateId || this.isApplying) return;

    this.isApplying = true;
    this.clientDetailApi.assignTemplateRoutine(this.clientId, this.selectedTemplateId).subscribe({
      next: (table) => {
        this.isApplying = false;
        this.modalController.dismiss(table, 'confirm');
      },
      error: (err) => {
        this.isApplying = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || this.translate.instant('CLIENTS.NO_SE_PUDO_ASIGNAR_LA'),
          this.translate.instant('COMMON.ERROR'),
          3000
        );
      },
    });
  }
}
