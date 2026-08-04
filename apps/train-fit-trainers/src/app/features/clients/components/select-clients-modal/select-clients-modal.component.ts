import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrainerClientSummary, TrainerClientScope } from '../../models/trainer-client-summary.model';
import { TrainerClientsApiService } from '../../services/trainer-clients-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

// F30 — selector múltiple de clientes destino para "aplicar en bloque"
// (rutinas F11, comidas F12, objetivos F13). Reutilizable desde cualquier
// punto de client-detail.page que necesite propagar una operación ya
// realizada sobre UN cliente hacia varios más.
@Component({
  selector: 'app-select-clients-modal',
  templateUrl: 'select-clients-modal.component.html',
  styleUrls: ['select-clients-modal.component.scss'],
})
export class SelectClientsModalComponent implements OnInit {
  @Input() public excludeClientId!: string;
  @Input() public requiredScope!: TrainerClientScope;
  @Input() public title = 'Aplicar a otros clientes';

  public state: ViewState = 'loading';
  public clients: TrainerClientSummary[] = [];
  public selectedIds = new Set<string>();

  constructor(
    private trainerClientsApi: TrainerClientsApiService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.trainerClientsApi.getMyClients().subscribe({
      next: (clients) => {
        this.clients = (clients || []).filter(
          (c) => c.user && c.user._id !== this.excludeClientId && c.scopes.includes(this.requiredScope)
        );
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public toggle(clientId: string): void {
    if (this.selectedIds.has(clientId)) {
      this.selectedIds.delete(clientId);
    } else {
      this.selectedIds.add(clientId);
    }
  }

  public isSelected(clientId: string): boolean {
    return this.selectedIds.has(clientId);
  }

  public fullName(client: TrainerClientSummary): string {
    if (!client.user) return 'Cliente';
    return `${client.user.name} ${client.user.lastname}`.trim();
  }

  public trackByClientId(_index: number, client: TrainerClientSummary): string {
    return client.user?._id || _index.toString();
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public confirm(): void {
    if (!this.selectedIds.size) return;
    void this.modalController.dismiss({ targetClientIds: Array.from(this.selectedIds) }, 'confirm');
  }
}
