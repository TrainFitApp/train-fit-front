import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerReviewStatusService } from '../invites/services/trainer-review-status.service';
import { TrainerInvitesApiService } from '../invites/services/trainer-invites-api.service';
import { ClientIntake, TrainerInvite } from '../invites/models/trainer-invite.model';

type ScopeFilter = 'all' | 'training' | 'nutrition';

// Movimiento 1 Coach Pro — dos formas de mirar la MISMA lista, no dos
// destinos distintos del menú:
//   lista   -> ¿quién es? (buscar a alguien concreto, dar de alta, filtrar)
//   cartera -> ¿cómo van? (comparar a todos entre sí y decidir a quién
//              atender hoy)

// El badge del sidenav en "Clientes" avisa de cuestionarios en_revision
// (ver shell.page.ts TASK-023: "son literalmente clientes en proceso de
// alta"). Antes esto llevaba a la pestaña "Invitar" — pero un cliente que ya
// aceptó y mandó el cuestionario ES, para el trainer, un cliente pendiente
// de confirmar, no una invitación; por eso la revisión (ver openReview más
// abajo) vive aquí mismo, no en Invitar.
interface ReviewSummary {
  clientEmail: string;
  clientId: string | null;
  // Puede venir null (el cliente borró la cuenta u otro edge case) — la fila
  // sigue mostrando el email como único dato fiable en ese caso.
  clientName: string | null;
}

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage implements OnInit {
  // Persistida: un entrenador que trabaja desde la Cartera no debería tener
  // que volver a elegirla cada vez que entra. Mismo criterio que el sidebar
  // contraído (shell.page.ts).

  private hasLoadedOnce = false;
  private searchDebounceHandle: ReturnType<typeof setTimeout> | null = null;

  // --- F23: búsqueda y filtro ---

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
    this.trainerReviewStatus.refresh();
    this.hasLoadedOnce = true;
  }

  private groupReviewInvites(invites: TrainerInvite[]): ReviewSummary[] {
    const map = new Map<string, ReviewSummary>();
    for (const invite of invites) {
      const key = invite.clientEmail.toLowerCase();
      if (!map.has(key)) {
        const name = invite.client ? `${invite.client.name || ''} ${invite.client.lastname || ''}`.trim() : '';
        map.set(key, {
          clientEmail: invite.clientEmail,
          clientId: invite.clientId,
          clientName: name || null,
        });
      }
    }
    return [...map.values()];
  }

  // Ionic reutiliza la instancia de esta página dentro del stack del tab —
  // ngOnInit solo se dispara una vez. Sin esto, volver aquí tras revocar una
  // relación (F08) o asignar algo en F06 mostraría datos obsoletos hasta un
  // refresco manual.
  public ionViewWillEnter(): void {
    if (this.hasLoadedOnce) this.trainerReviewStatus.refresh();
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
        this.trainerReviewStatus.refresh();
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
      message: `¿Seguro que quieres rechazar a ${review.clientName || review.clientEmail} tras revisar su cuestionario? Esta acción no se puede deshacer.`,
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



  // Tirar para refrescar: recarga el banner de revisiones. La Cartera se
  // refresca por su cuenta al montarse.
  public onRefresh(event: CustomEvent): void {
    this.trainerReviewStatus.refresh();
    ((event.target as unknown) as IonRefresher).complete();
  }

  public goToInvite(): void {
    void this.router.navigate(['/tabs/invites']);
  }






  public trackByClientEmail(_index: number, review: ReviewSummary): string {
    return review.clientEmail;
  }

  private static readonly AVATAR_HUES = [18, 45, 200, 260, 320, 160];

}
