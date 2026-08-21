import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerClientSummary } from '../../../clients/models/trainer-client-summary.model';
import { TrainerClientsApiService } from '../../../clients/services/trainer-clients-api.service';
import { CheckinTemplateDefinition } from '../../models/checkin-template.model';
import { CheckinTemplatesApiService } from '../../services/checkin-templates-api.service';

// Extraído de checkin-templates.page.ts / templates.page.ts (duplicado en
// ambas) a un modal standalone real. El panel "Aplicar" vivía como un
// <div position:fixed> hecho a mano DENTRO de la página que lo abría —
// Ionic marca `.ion-page` con `contain: layout`, que la convierte en
// containing block de ese `fixed`: el panel dejaba de posicionarse contra
// el viewport y se apilaba codo a codo con el <ion-header> de esa misma
// página, quedando tapado por él. Un ion-modal real (ModalController) se
// adjunta fuera de `.ion-page`, en la capa de overlays de Ionic — mismo
// mecanismo que ya usan sin problema los buscadores de clientes/ejercicios.
// cssClass: 'tf-panel-modal' (theme/tokens.scss) le da el mismo aspecto de
// panel anclado a la derecha en escritorio que tenía el div original.
@Component({
  selector: 'app-apply-checkin-template-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './apply-checkin-template-modal.component.html',
  styleUrls: ['./apply-checkin-template-modal.component.scss'],
})
export class ApplyCheckinTemplateModalComponent implements OnInit {
  @Input() template!: CheckinTemplateDefinition;

  public loadingClients = true;
  public myClients: TrainerClientSummary[] = [];
  public selectedClientIds = new Set<string>();
  public isApplying = false;
  public searchQuery = '';
  public filteredClients: TrainerClientSummary[] = [];

  constructor(
    private modalController: ModalController,
    private checkinTemplatesApi: CheckinTemplatesApiService,
    private trainerClientsApi: TrainerClientsApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.trainerClientsApi.getMyClients().subscribe((clients) => {
      this.myClients = clients || [];
      this.loadingClients = false;
      this.applyFilteredClients();
    });
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }

  public onSearchChange(value: string): void {
    this.searchQuery = value;
    this.applyFilteredClients();
  }

  private applyFilteredClients(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredClients = !query
      ? this.myClients
      : this.myClients.filter((c) => {
          if (!c.user) return false;
          const haystack = `${c.user.name} ${c.user.lastname} ${c.user.email}`.toLowerCase();
          return haystack.includes(query);
        });
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
    if (!this.selectedClientIds.size || this.isApplying) return;

    this.isApplying = true;
    this.checkinTemplatesApi.apply(this.template._id, [...this.selectedClientIds]).subscribe({
      next: (result) => {
        this.isApplying = false;
        const total = result.applied.length + result.skipped.length;
        this.ionicUtilService.showToast({
          message:
            result.skipped.length > 0
              ? `Aplicada a ${result.applied.length} de ${total} clientes (${result.skipped.length} sin relación activa)`
              : `Aplicada a ${result.applied.length} cliente${result.applied.length === 1 ? '' : 's'}`,
          duration: 3500,
        });
        this.modalController.dismiss(true);
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

  // Mismo patrón de avatar (iniciales + tono por hash del id) que clients.page.ts.
  public getInitials(client: TrainerClientSummary): string {
    if (!client.user) return '?';
    const name = client.user.name?.charAt(0) || '';
    const lastname = client.user.lastname?.charAt(0) || '';
    return (name + lastname).toUpperCase() || '?';
  }

  private static readonly AVATAR_HUES = [18, 45, 200, 260, 320, 160];

  public getAvatarHue(client: TrainerClientSummary): number {
    const id = client.user?._id || '';
    let sum = 0;
    for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
    return ApplyCheckinTemplateModalComponent.AVATAR_HUES[
      sum % ApplyCheckinTemplateModalComponent.AVATAR_HUES.length
    ];
  }

  public trackByClientId(_index: number, client: TrainerClientSummary): string {
    return client.user?._id || _index.toString();
  }
}
