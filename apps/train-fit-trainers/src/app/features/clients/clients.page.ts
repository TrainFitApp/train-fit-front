import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerClientsApiService } from './services/trainer-clients-api.service';
import { TrainerClientSummary } from './models/trainer-client-summary.model';
import { TrainerReviewStatusService } from '../invites/services/trainer-review-status.service';
import { TrainerInvitesApiService } from '../invites/services/trainer-invites-api.service';
import { ClientIntake, TrainerInvite } from '../invites/models/trainer-invite.model';

type ViewState = 'loading' | 'error' | 'empty' | 'loaded';
type ScopeFilter = 'all' | 'training' | 'nutrition';

const PAGE_SIZE = 20;

// El badge del sidenav en "Clientes" avisa de cuestionarios en_revision
// (ver shell.page.ts TASK-023: "son literalmente clientes en proceso de
// alta"). Antes esto llevaba a la pestaña "Invitar" — pero un cliente que ya
// aceptó y mandó el cuestionario ES, para el trainer, un cliente pendiente
// de confirmar, no una invitación; por eso la revisión (ver openReview más
// abajo) vive aquí mismo, no en Invitar.
interface ReviewSummary {
  clientEmail: string;
  clientId: string | null;
}

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

  // Calculado UNA VEZ por cada emisión de reviewInvites (ver ngOnInit), no
  // en un getter — un getter usado en el template se re-ejecuta en cada
  // ciclo de detección de cambios y devuelve un array nuevo cada vez, lo
  // que hace que *ngFor destruya y recree las filas sin parar (visto en
  // vivo: la pestaña dejaba de responder por completo al entrar con algún
  // cuestionario en_revision, aunque las peticiones de red ya hubieran
  // respondido bien).
  public reviewSummaries: ReviewSummary[] = [];
  // Invites crudos detrás de reviewSummaries — hace falta el _id de cada
  // relación (no solo el clientId agrupado) para poder rechazarlas todas
  // a la vez en rejectReviewedClient, sin otra llamada a la red.
  private reviewInvitesRaw: TrainerInvite[] = [];

  // --- Revisar cuestionario + confirmar cliente, inline en esta pantalla
  // (antes vivía solo en invites.page.ts — ver comentario de ReviewSummary). ---
  public reviewingClientId: string | null = null;
  public reviewingIntake: ClientIntake | null = null;
  public isLoadingIntake = false;
  public isConfirming = false;
  public isRejecting = false;
  public readonly experienceLabels: Record<string, string> = {
    none: 'Sin experiencia',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  };

  constructor(
    private trainerClientsApi: TrainerClientsApiService,
    private trainerReviewStatus: TrainerReviewStatusService,
    private trainerInvitesApi: TrainerInvitesApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.trainerReviewStatus.reviewInvites.subscribe((invites) => {
      this.reviewInvitesRaw = invites;
      this.reviewSummaries = this.groupReviewInvites(invites);
    });
    this.load();
    this.hasLoadedOnce = true;
  }

  private groupReviewInvites(invites: TrainerInvite[]): ReviewSummary[] {
    const map = new Map<string, ReviewSummary>();
    for (const invite of invites) {
      const key = invite.clientEmail.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { clientEmail: invite.clientEmail, clientId: invite.clientId });
      }
    }
    return [...map.values()];
  }

  // Ionic reutiliza la instancia de esta página dentro del stack del tab —
  // ngOnInit solo se dispara una vez. Sin esto, volver aquí tras revocar una
  // relación (F08) o asignar algo en F06 mostraría datos obsoletos hasta un
  // refresco manual.
  public ionViewWillEnter(): void {
    if (this.hasLoadedOnce) this.load();
  }

  public openReview(review: ReviewSummary): void {
    if (!review.clientId) return;
    if (this.reviewingClientId === review.clientId) {
      this.closeReview();
      return;
    }
    this.reviewingClientId = review.clientId;
    this.isLoadingIntake = true;
    this.reviewingIntake = null;
    this.trainerInvitesApi.getClientIntake(review.clientId).subscribe({
      next: (intake) => {
        this.isLoadingIntake = false;
        this.reviewingIntake = intake;
      },
      error: () => {
        this.isLoadingIntake = false;
        this.ionicUtilService.showErrorToast('No se pudo cargar el cuestionario', 'Error', 3000);
      },
    });
  }

  public closeReview(): void {
    this.reviewingClientId = null;
    this.reviewingIntake = null;
  }

  public experienceLabel(level: ClientIntake['experienceLevel']): string {
    return level ? this.experienceLabels[level] || level : 'No indicado';
  }

  public confirmReviewedClient(): void {
    if (!this.reviewingClientId || this.isConfirming) return;
    this.isConfirming = true;
    this.trainerInvitesApi.confirmClient(this.reviewingClientId).subscribe({
      next: () => {
        this.isConfirming = false;
        this.ionicUtilService.showToast({ message: 'Cliente confirmado, coaching desbloqueado', duration: 3000 });
        this.closeReview();
        this.load();
        this.trainerReviewStatus.refresh();
      },
      error: (err) => {
        this.isConfirming = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo confirmar al cliente',
          'Error',
          3000
        );
      },
    });
  }

  public async confirmRejectReviewedClient(review: ReviewSummary): Promise<void> {
    const alert = await this.ionicUtilService.showAlert({
      header: 'Rechazar cliente',
      message: `¿Seguro que quieres rechazar a ${review.clientEmail} tras revisar su cuestionario? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Rechazar',
          cssClass: 'alert-button-danger',
          handler: () => this.rejectReviewedClient(review),
        },
      ],
    });
    void alert;
  }

  private rejectReviewedClient(review: ReviewSummary): void {
    if (!review.clientId || this.isRejecting) return;
    const relations = this.reviewInvitesRaw.filter((invite) => invite.clientId === review.clientId);
    if (!relations.length) {
      this.closeReview();
      return;
    }

    this.isRejecting = true;
    let remaining = relations.length;
    let anyFailed = false;
    relations.forEach((invite) => {
      this.trainerInvitesApi.cancelInvite(invite._id).subscribe({
        next: () => this.finishRejectReviewedClient(--remaining, anyFailed),
        error: () => {
          anyFailed = true;
          this.finishRejectReviewedClient(--remaining, anyFailed);
        },
      });
    });
  }

  private finishRejectReviewedClient(remaining: number, anyFailed: boolean): void {
    if (remaining > 0) return;
    this.isRejecting = false;
    this.closeReview();
    this.trainerReviewStatus.refresh();
    if (anyFailed) {
      this.ionicUtilService.showErrorToast('No se pudo rechazar al cliente del todo', 'Error', 3000);
    } else {
      this.ionicUtilService.showToast({ message: 'Cliente rechazado', duration: 2500 });
    }
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
        // Encadenada, no en paralelo con la de arriba — ver comentario en
        // trainer-review-status.service.ts.
        this.trainerReviewStatus.refresh();
      },
      error: () => {
        this.state = 'error';
        refresher?.complete();
        this.trainerReviewStatus.refresh();
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

  public trackByClientEmail(_index: number, review: ReviewSummary): string {
    return review.clientEmail;
  }

  private static readonly AVATAR_HUES = [18, 45, 200, 260, 320, 160];

  public getAvatarHue(client: TrainerClientSummary): number {
    const id = client.user?._id || '';
    let sum = 0;
    for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
    return ClientsPage.AVATAR_HUES[sum % ClientsPage.AVATAR_HUES.length];
  }
}
