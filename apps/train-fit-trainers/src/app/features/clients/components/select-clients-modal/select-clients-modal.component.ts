import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TrainerClientSummary, TrainerClientScope } from '../../models/trainer-client-summary.model';
import { TrainerClientsApiService } from '../../services/trainer-clients-api.service';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

// F30 — selector múltiple de clientes destino para "aplicar en bloque"
// (rutinas F11, comidas F12, objetivos F13). Reutilizable desde cualquier
// punto de client-detail.page que necesite propagar una operación ya
// realizada sobre UN cliente hacia varios más. También usado sin cliente
// origen desde el composer multi-cliente (TAREA5, Fase D) — por eso
// excludeClientId es opcional.
@Component({
  selector: 'app-select-clients-modal',
  templateUrl: 'select-clients-modal.component.html',
  styleUrls: ['select-clients-modal.component.scss'],
})
export class SelectClientsModalComponent implements OnInit {
  @Input() public excludeClientId?: string;
  // Fase 3 Coach Pro — pasa a ser OPCIONAL. Los tres consumidores originales
  // (rutinas, comidas, objetivos) siguen pasándolo y filtrando igual; el
  // selector de clientes de una automatización no puede exigir un ámbito,
  // porque una regla sobre el peso vale tanto para un cliente de nutrición
  // como para uno de entrenamiento.
  @Input() public requiredScope?: TrainerClientScope;
  @Input() public title = 'Aplicar a otros clientes';
  // Fase 3 Coach Pro — permite reabrir el selector con lo ya elegido en vez
  // de empezar de cero cada vez que se edita una regla.
  @Input() public preselectedIds: string[] = [];

  public state: ViewState = 'loading';
  public clients: TrainerClientSummary[] = [];
  public selectedIds = new Set<string>();
  // TAREA5 (auditoría UX, Fase D) — aviso de alergias antes de aplicar la
  // misma composición a varios clientes a la vez, para no mandar por error
  // un alimento que alguno no puede comer.
  public allergiesByClientId = new Map<string, string>();

  constructor(
    private trainerClientsApi: TrainerClientsApiService,
    private clientDetailApi: ClientDetailApiService,
    private modalController: ModalController
  ) {}

  public ngOnInit(): void {
    this.preselectedIds.forEach((id) => this.selectedIds.add(id));
    this.trainerClientsApi.getMyClients().subscribe({
      next: (clients) => {
        this.clients = (clients || []).filter(
          (c) =>
            c.user &&
            c.user._id !== this.excludeClientId &&
            // Sin requiredScope no se filtra por ámbito (ver el @Input).
            (!this.requiredScope || c.scopes.includes(this.requiredScope))
        );
        this.state = 'loaded';
        if (this.requiredScope === 'nutrition') this.loadAllergies();
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private loadAllergies(): void {
    const withIds = this.clients.filter((c) => c.user?._id);
    if (!withIds.length) return;
    forkJoin(
      withIds.map((c) =>
        this.clientDetailApi.getNutritionPreferences(c.user!._id).pipe(catchError(() => of(null)))
      )
    ).subscribe((results) => {
      results.forEach((prefs, i) => {
        const allergies = prefs?.allergies?.trim();
        if (allergies) this.allergiesByClientId.set(withIds[i].user!._id, allergies);
      });
    });
  }

  public allergiesFor(clientId: string): string | null {
    return this.allergiesByClientId.get(clientId) || null;
  }

  public toggle(clientId: string): void {
    if (this.clients.find((client) => client.user?._id === clientId)?.readOnly) return;
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
    // targetClients: nombre de cada elegido, para quien pinte el resultado
    // por cliente (protocolos) sin volver a pedir la lista.
    const targetClients = this.clients.flatMap((c) =>
      c.user && this.selectedIds.has(c.user._id)
        ? [{ id: c.user._id, name: `${c.user.name || ''} ${c.user.lastname || ''}`.trim() }]
        : []
    );
    void this.modalController.dismiss({ targetClientIds: Array.from(this.selectedIds), targetClients }, 'confirm');
  }
}
