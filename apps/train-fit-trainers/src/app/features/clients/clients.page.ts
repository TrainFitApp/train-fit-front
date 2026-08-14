import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { TrainerClientsApiService } from './services/trainer-clients-api.service';
import { TrainerClientSummary } from './models/trainer-client-summary.model';

type ViewState = 'loading' | 'error' | 'empty' | 'loaded';
type ScopeFilter = 'all' | 'training' | 'nutrition';

const PAGE_SIZE = 20;

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage implements OnInit {
  public state: ViewState = 'loading';
  public clients: TrainerClientSummary[] = [];
  public total = 0;
  private hasLoadedOnce = false;
  private page = 0;
  private searchDebounceHandle: ReturnType<typeof setTimeout> | null = null;

  // --- F23: búsqueda y filtro ---
  public searchQuery = '';
  public scopeFilter: ScopeFilter = 'all';

  constructor(
    private trainerClientsApi: TrainerClientsApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.load();
    this.hasLoadedOnce = true;
  }

  // Ionic reutiliza la instancia de esta página dentro del stack del tab —
  // ngOnInit solo se dispara una vez. Sin esto, volver aquí tras revocar una
  // relación (F08) o asignar algo en F06 mostraría datos obsoletos hasta un
  // refresco manual.
  public ionViewWillEnter(): void {
    if (this.hasLoadedOnce) this.load();
  }

  // TASK-022 (MASTER_BACKLOG.md) — antes traía TODAS las relaciones activas
  // de golpe y filtraba en memoria en cada tecleo (lag confirmado con
  // cientos de clientes). Ahora pagina y busca en servidor
  // (GET trainer/clients/paginated); scopeFilter se mantiene en cliente,
  // aplicado sobre la página ya cargada — es un filtro secundario grueso,
  // no la búsqueda principal que causaba el problema de escala.
  public load(refresher?: IonRefresher): void {
    if (!refresher) {
      this.state = 'loading';
    }
    this.page = 0;

    this.trainerClientsApi.getMyClientsPaginated(this.page, PAGE_SIZE, this.searchQuery).subscribe({
      next: ({ clients, total }) => {
        this.clients = clients || [];
        this.total = total;
        this.state = this.total ? 'loaded' : 'empty';
        refresher?.complete();
      },
      error: () => {
        this.state = 'error';
        refresher?.complete();
      },
    });
  }

  public loadMore(event: any): void {
    this.page++;
    this.trainerClientsApi.getMyClientsPaginated(this.page, PAGE_SIZE, this.searchQuery).subscribe({
      next: ({ clients }) => {
        this.clients = this.clients.concat(clients || []);
        event.target.complete();
        if (this.clients.length >= this.total) {
          event.target.disabled = true;
        }
      },
      error: () => {
        this.page--;
        event.target.complete();
      },
    });
  }

  public onSearchChange(value: string): void {
    this.searchQuery = value;
    if (this.searchDebounceHandle) clearTimeout(this.searchDebounceHandle);
    this.searchDebounceHandle = setTimeout(() => this.load(), 300);
  }

  public onRefresh(event: CustomEvent): void {
    this.load((event.target as unknown) as IonRefresher);
  }

  public goToInvite(): void {
    void this.router.navigate(['/tabs/invites']);
  }

  public openClient(client: TrainerClientSummary): void {
    if (!client.user) return;
    void this.router.navigate(['/tabs/clients', client.user._id], {
      queryParams: {
        name: this.getFullName(client),
        scopes: client.scopes.join(','),
      },
    });
  }

  public getFullName(client: TrainerClientSummary): string {
    if (!client.user) return 'Cliente';
    return `${client.user.name} ${client.user.lastname}`.trim();
  }

  public getInitials(client: TrainerClientSummary): string {
    if (!client.user) return '?';
    const name = client.user.name?.charAt(0) || '';
    const lastname = client.user.lastname?.charAt(0) || '';
    return (name + lastname).toUpperCase() || '?';
  }

  public getScopeLabels(client: TrainerClientSummary): string[] {
    return client.scopes.map((scope) =>
      scope === 'training' ? 'Entrenamiento' : 'Nutrición'
    );
  }

  // scopeFilter ya no filtra por búsqueda de texto (eso ahora es
  // server-side, ver load()) — solo aplica el filtro de scope sobre la
  // página ya cargada.
  public get filteredClients(): TrainerClientSummary[] {
    if (this.scopeFilter === 'all') return this.clients;
    return this.clients.filter((client) => client.scopes.includes(this.scopeFilter as 'training' | 'nutrition'));
  }

  public setScopeFilter(filter: ScopeFilter): void {
    this.scopeFilter = filter;
  }

  public trackByClientId(_index: number, client: TrainerClientSummary): string {
    return client.user?._id || _index.toString();
  }

  private static readonly AVATAR_HUES = [18, 45, 200, 260, 320, 160];

  public getAvatarHue(client: TrainerClientSummary): number {
    const id = client.user?._id || '';
    let sum = 0;
    for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
    return ClientsPage.AVATAR_HUES[sum % ClientsPage.AVATAR_HUES.length];
  }
}
