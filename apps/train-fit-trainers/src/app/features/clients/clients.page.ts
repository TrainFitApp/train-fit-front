import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { TrainerClientsApiService } from './services/trainer-clients-api.service';
import { TrainerClientSummary } from './models/trainer-client-summary.model';

type ViewState = 'loading' | 'error' | 'empty' | 'loaded';
type ScopeFilter = 'all' | 'training' | 'nutrition';

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage implements OnInit {
  public state: ViewState = 'loading';
  public clients: TrainerClientSummary[] = [];
  private hasLoadedOnce = false;

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

  public load(refresher?: IonRefresher): void {
    if (!refresher) {
      this.state = 'loading';
    }

    this.trainerClientsApi.getMyClients().subscribe({
      next: (clients) => {
        this.clients = clients || [];
        this.state = this.clients.length ? 'loaded' : 'empty';
        refresher?.complete();
      },
      error: () => {
        this.state = 'error';
        refresher?.complete();
      },
    });
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

  // --- F23: búsqueda (nombre/email) + filtro por scope, 100% client-side ---
  public get filteredClients(): TrainerClientSummary[] {
    const query = normalizeSearchText(this.searchQuery.trim());

    return this.clients.filter((client) => {
      if (this.scopeFilter !== 'all' && !client.scopes.includes(this.scopeFilter)) {
        return false;
      }
      if (!query) return true;

      const haystack = normalizeSearchText(
        `${this.getFullName(client)} ${client.user?.email || ''}`
      );
      return haystack.includes(query);
    });
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
