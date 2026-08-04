import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DietTemplateApiService } from '../../../diet-templates/services/diet-template-api.service';
import { DietTemplate } from '../../../diet-templates/models/diet-template.model';

type ViewState = 'loading' | 'error' | 'loaded' | 'applying';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// Replanteamiento MVP (nutrición) — aplicar una plantilla ya construida a
// ESTE cliente eligiendo solo la fecha de inicio, en vez de pautar cada
// comida de cada día a mano (F12 uno a uno).
@Component({
  selector: 'app-apply-diet-template-modal',
  templateUrl: 'apply-diet-template-modal.component.html',
  styleUrls: ['apply-diet-template-modal.component.scss'],
})
export class ApplyDietTemplateModalComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public clientName = 'este cliente';

  public state: ViewState = 'loading';
  public templates: DietTemplate[] = [];
  public selectedTemplateId: string | null = null;
  public startDate = todayIsoDate();

  constructor(
    private dietTemplateApi: DietTemplateApiService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.dietTemplateApi.list().subscribe({
      next: (templates) => {
        this.templates = templates || [];
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public select(template: DietTemplate): void {
    this.selectedTemplateId = template._id;
  }

  public dayCount(template: DietTemplate): number {
    return template.days?.length || 0;
  }

  public trackByTemplateId(_index: number, template: DietTemplate): string {
    return template._id;
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public confirm(): void {
    if (!this.selectedTemplateId || !this.startDate) return;
    this.state = 'applying';
    this.dietTemplateApi.applyToClient(this.clientId, this.selectedTemplateId, this.startDate).subscribe({
      next: (result) => void this.modalController.dismiss(result, 'confirm'),
      error: () => {
        this.state = 'loaded';
      },
    });
  }
}
