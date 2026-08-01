import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { TrainerInvitesApiService } from './services/trainer-invites-api.service';
import { TrainerInvite, TrainerInviteScope } from './models/trainer-invite.model';

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
  public historyInvites: TrainerInvite[] = [];
  public cancellingId: string | null = null;

  constructor(
    private trainerInvitesApi: TrainerInvitesApiService,
    private ionicUtilService: IonicUtilService
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
        this.pendingInvites = sorted.filter((invite) => invite.status === 'pending');
        this.historyInvites = sorted.filter((invite) => invite.status !== 'pending');
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
}
