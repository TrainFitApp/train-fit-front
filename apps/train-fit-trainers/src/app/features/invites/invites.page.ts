import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerInvitesApiService } from './services/trainer-invites-api.service';
import { ClientIntake, TrainerInvite, TrainerInviteScope } from './models/trainer-invite.model';

type ListState = 'loading' | 'error' | 'loaded';

@Component({
  selector: 'app-invites',
  templateUrl: 'invites.page.html',
  styleUrls: ['invites.page.scss'],
})
export class InvitesPage implements OnInit {
  public form: FormGroup;
  public isSending = false;

  public listState: ListState = 'loading';
  public pendingInvites: TrainerInvite[] = [];
  // TAREA 3 — relaciones con cuestionario enviado, esperando confirmación explícita.
  public reviewInvites: TrainerInvite[] = [];
  public historyInvites: TrainerInvite[] = [];
  public cancellingId: string | null = null;

  public reviewingClientId: string | null = null;
  public reviewingIntake: ClientIntake | null = null;
  public isLoadingIntake = false;
  public isConfirming = false;
  public readonly experienceLabels: Record<string, string> = {
    none: 'Sin experiencia',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  };

  constructor(
    private trainerInvitesApi: TrainerInvitesApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      clientEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      training: new FormControl(false),
      nutrition: new FormControl(false),
    });

    this.loadInvites();
  }

  public toggleScope(controlName: 'training' | 'nutrition'): void {
    const control = this.form.get(controlName);
    control?.setValue(!control.value);
  }

  public get hasScopeSelected(): boolean {
    return !!(this.form?.value.training || this.form?.value.nutrition);
  }

  public loadInvites(): void {
    this.listState = 'loading';
    this.trainerInvitesApi.getMyInvites().subscribe({
      next: (invites) => {
        const sorted = [...(invites || [])].sort(
          (a, b) => new Date(b.invitedAt).getTime() - new Date(a.invitedAt).getTime()
        );
        this.pendingInvites = sorted.filter(
          (invite) => invite.status === 'pending' || invite.status === 'cuestionario_pendiente'
        );
        this.reviewInvites = sorted.filter((invite) => invite.status === 'en_revision');
        this.historyInvites = sorted.filter(
          (invite) => !['pending', 'cuestionario_pendiente', 'en_revision'].includes(invite.status)
        );
        this.listState = 'loaded';
      },
      error: () => {
        this.listState = 'error';
      },
    });
  }

  public submit(): void {
    if (this.form.invalid || !this.hasScopeSelected || this.isSending) {
      this.form.markAllAsTouched();
      return;
    }

    const scopes: TrainerInviteScope[] = [
      ...(this.form.value.training ? (['training'] as const) : []),
      ...(this.form.value.nutrition ? (['nutrition'] as const) : []),
    ];

    this.isSending = true;
    this.trainerInvitesApi
      .sendInvite(this.form.value.clientEmail.trim().toLowerCase(), scopes)
      .subscribe({
        next: (response) => {
          this.isSending = false;
          this.handleSendResults(response.results);
        },
        error: (err) => {
          this.isSending = false;
          // MVP-trainers F21 — límite de clientes del plan alcanzado: llevar
          // al paywall (F02) en vez de un error genérico sin acción posible.
          if (err?.error?.code === 'TRAINER_LIMIT_REACHED') {
            this.ionicUtilService.showErrorToast(
              err.error.message,
              'Límite de tu plan alcanzado',
              3500
            );
            void this.router.navigate(['/tabs/subscription']);
            return;
          }
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo enviar la invitación',
            'Error',
            3000
          );
        },
      });
  }

  private handleSendResults(
    results: { scope: TrainerInviteScope; success: boolean; error: string | null }[]
  ): void {
    const succeeded = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    if (succeeded.length) {
      const labels = succeeded.map((r) => this.scopeLabel(r.scope)).join(' y ');
      this.ionicUtilService.showToast({
        message: `Invitación de ${labels} enviada correctamente`,
        duration: 3500,
      });
      this.form.reset({ clientEmail: null, training: false, nutrition: false });
      this.loadInvites();
    }

    failed.forEach((r) => {
      this.ionicUtilService.showErrorToast(
        `${this.scopeLabel(r.scope)}: ${r.error}`,
        'No se pudo invitar',
        4000
      );
    });
  }

  public async confirmCancel(invite: TrainerInvite): Promise<void> {
    const alert = await this.ionicUtilService.showAlert({
      header: 'Cancelar invitación',
      message: `¿Seguro que quieres cancelar la invitación de ${this.scopeLabel(invite.scope)} a ${invite.clientEmail}?`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Cancelar invitación',
          cssClass: 'alert-button-danger',
          handler: () => this.cancelInvite(invite),
        },
      ],
    });
    void alert;
  }

  private cancelInvite(invite: TrainerInvite): void {
    this.cancellingId = invite._id;
    this.trainerInvitesApi.cancelInvite(invite._id).subscribe({
      next: () => {
        this.cancellingId = null;
        this.ionicUtilService.showToast({
          message: 'Invitación cancelada',
          duration: 2500,
        });
        this.loadInvites();
      },
      error: () => {
        this.cancellingId = null;
        this.ionicUtilService.showErrorToast(
          'No se pudo cancelar la invitación',
          'Error',
          3000
        );
      },
    });
  }

  public scopeLabel(scope: TrainerInviteScope): string {
    return scope === 'training' ? 'Entrenamiento' : 'Nutrición';
  }

  public statusLabel(status: TrainerInvite['status']): string {
    switch (status) {
      case 'pending':
        return 'Invitación enviada';
      case 'cuestionario_pendiente':
        return 'Esperando cuestionario';
      case 'en_revision':
        return 'Cuestionario recibido';
      case 'active':
        return 'Aceptada';
      case 'declined':
        return 'Rechazada';
      case 'revoked':
        return 'Finalizada';
      default:
        return status;
    }
  }

  public trackByInviteId(_index: number, invite: TrainerInvite): string {
    return invite._id;
  }

  // --- TAREA 3: revisar cuestionario + confirmar cliente ---
  public openReview(invite: TrainerInvite): void {
    if (!invite.clientId) return;
    this.reviewingClientId = invite.clientId;
    this.isLoadingIntake = true;
    this.reviewingIntake = null;
    this.trainerInvitesApi.getClientIntake(invite.clientId).subscribe({
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

  public confirmClient(): void {
    if (!this.reviewingClientId || this.isConfirming) return;
    this.isConfirming = true;
    this.trainerInvitesApi.confirmClient(this.reviewingClientId).subscribe({
      next: () => {
        this.isConfirming = false;
        this.ionicUtilService.showToast({ message: 'Cliente confirmado, coaching desbloqueado', duration: 3000 });
        this.closeReview();
        this.loadInvites();
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
}
