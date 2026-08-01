import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { MyProfessionalsApiService } from './services/my-professionals-api.service';
import {
  PendingInvite,
  ProfessionalScope,
  ProfessionalSummary,
} from './models/professional-relation.model';

type ViewState = 'loading' | 'error' | 'loaded';

@Component({
  selector: 'app-my-professionals',
  templateUrl: 'my-professionals.page.html',
  styleUrls: ['my-professionals.page.scss'],
})
export class MyProfessionalsPage implements OnInit {
  public state: ViewState = 'loading';
  public pendingInvites: PendingInvite[] = [];
  public activeProfessionals: ProfessionalSummary[] = [];
  public respondingId: string | null = null;
  public unlinkingScope: ProfessionalScope | null = null;

  constructor(
    private router: Router,
    private myProfessionalsApi: MyProfessionalsApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public close(): void {
    void this.router.navigate(['/tabs/profile']);
  }

  public load(): void {
    this.state = 'loading';
    Promise.all([
      this.myProfessionalsApi.getPendingInvites().toPromise(),
      this.myProfessionalsApi.getActiveProfessionals().toPromise(),
    ])
      .then(([invites, professionals]) => {
        this.pendingInvites = invites || [];
        this.activeProfessionals = professionals || [];
        this.state = 'loaded';
      })
      .catch(() => {
        this.state = 'error';
      });
  }

  public getTrainerName(invite: PendingInvite): string {
    if (!invite.trainer) return 'Un profesional';
    return `${invite.trainer.name} ${invite.trainer.lastname}`.trim();
  }

  public getProfessionalName(professional: ProfessionalSummary): string {
    if (!professional.user) return 'Profesional';
    return `${professional.user.name} ${professional.user.lastname}`.trim();
  }

  public scopeLabel(scope: ProfessionalScope): string {
    return scope === 'training' ? 'Entrenamiento' : 'Nutrición';
  }

  public getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?';
  }

  public accept(invite: PendingInvite): void {
    this.respondingId = invite._id;
    this.myProfessionalsApi.acceptInvite(invite._id).subscribe({
      next: () => {
        this.respondingId = null;
        this.ionicUtilService.showToast({
          message: `Ahora ${this.getTrainerName(invite)} lleva tu ${this.scopeLabel(invite.scope).toLowerCase()}`,
          duration: 3500,
        });
        this.load();
      },
      error: (err) => {
        this.respondingId = null;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo aceptar la invitación',
          'Error',
          3500
        );
      },
    });
  }

  public async confirmDecline(invite: PendingInvite): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Rechazar invitación',
      message: `¿Seguro que quieres rechazar la invitación de ${this.getTrainerName(invite)} (${this.scopeLabel(invite.scope)})?`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Rechazar',
          cssClass: 'alert-button-danger',
          handler: () => this.decline(invite),
        },
      ],
    });
  }

  private decline(invite: PendingInvite): void {
    this.respondingId = invite._id;
    this.myProfessionalsApi.declineInvite(invite._id).subscribe({
      next: () => {
        this.respondingId = null;
        this.load();
      },
      error: () => {
        this.respondingId = null;
        this.ionicUtilService.showErrorToast('No se pudo rechazar la invitación', 'Error', 3000);
      },
    });
  }

  public async confirmUnlink(professional: ProfessionalSummary, scope: ProfessionalScope): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Desvincular',
      message: `¿Seguro que quieres desvincularte de ${this.getProfessionalName(professional)} en ${this.scopeLabel(scope).toLowerCase()}?`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Desvincular',
          cssClass: 'alert-button-danger',
          handler: () => this.unlink(scope),
        },
      ],
    });
  }

  private unlink(scope: ProfessionalScope): void {
    this.unlinkingScope = scope;
    this.myProfessionalsApi.unlinkProfessional(scope).subscribe({
      next: () => {
        this.unlinkingScope = null;
        this.load();
      },
      error: () => {
        this.unlinkingScope = null;
        this.ionicUtilService.showErrorToast('No se pudo desvincular', 'Error', 3000);
      },
    });
  }

  public trackByInviteId(_index: number, invite: PendingInvite): string {
    return invite._id;
  }

  public trackByProfessionalId(_index: number, professional: ProfessionalSummary): string {
    return professional.user?._id || _index.toString();
  }
}
