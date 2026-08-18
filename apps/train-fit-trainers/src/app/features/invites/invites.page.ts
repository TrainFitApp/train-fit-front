import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { IntakeFieldKey } from 'src/app/core/services/onboarding/onboarding.service';
import { TrainerInvitesApiService } from './services/trainer-invites-api.service';
import { ClientIntake, TrainerInvite, TrainerInviteScope } from './models/trainer-invite.model';

type ListState = 'loading' | 'error' | 'loaded';

// Invitar entrenamiento+nutrición a la vez crea 2 TrainerClient por scope
// (ver trainer-client-service.js#inviteClient) — sin agrupar, el listado
// repetía el mismo email en 2 filas. Una fila por CLIENTE, con un chip por
// scope, en vez de una fila por invitación.
interface GroupedInvite {
  clientEmail: string;
  clientId: string | null;
  invites: TrainerInvite[];
}

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

  // Getters (no estado propio) — se recalculan solos cada vez que
  // pending/review/historyInvites cambian (loadInvites), sin un punto extra
  // que mantener sincronizado.
  public get groupedPendingInvites(): GroupedInvite[] {
    return this.groupByClient(this.pendingInvites);
  }

  public get groupedReviewInvites(): GroupedInvite[] {
    return this.groupByClient(this.reviewInvites);
  }

  public get groupedHistoryInvites(): GroupedInvite[] {
    return this.groupByClient(this.historyInvites);
  }

  private groupByClient(invites: TrainerInvite[]): GroupedInvite[] {
    const groups = new Map<string, GroupedInvite>();
    for (const invite of invites) {
      const key = invite.clientEmail.toLowerCase();
      if (!groups.has(key)) {
        groups.set(key, { clientEmail: invite.clientEmail, clientId: invite.clientId, invites: [] });
      }
      groups.get(key)!.invites.push(invite);
    }
    return [...groups.values()];
  }

  public trackByClientEmail(_index: number, group: GroupedInvite): string {
    return group.clientEmail;
  }

  public isGroupCancelling(group: GroupedInvite): boolean {
    return group.invites.some((invite) => invite._id === this.cancellingId);
  }

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

  // TASK-049 (MASTER_BACKLOG.md) — personalización del cuestionario inicial.
  public readonly intakeFieldLabels: Record<IntakeFieldKey, string> = {
    goals: 'Objetivos',
    healthConditions: 'Salud y lesiones',
    experienceLevel: 'Nivel de experiencia',
    availability: 'Disponibilidad',
    equipment: 'Equipamiento disponible',
    allergies: 'Alergias',
    favoriteFoods: 'Alimentos favoritos',
    dislikedFoods: 'Alimentos que no le gustan',
    cooksAtHome: 'Cocina en casa',
  };
  public showIntakeConfig = false;
  public intakeConfigState: 'loading' | 'error' | 'loaded' = 'loading';
  // El catálogo de campos es un conjunto cerrado ya conocido en compilación
  // (intakeFieldLabels arriba) — no depende de lo que devuelva el backend en
  // cada carga, así que no hace falta guardarlo como estado propio ni
  // esperar la respuesta para saber qué checkboxes mostrar.
  public readonly intakeConfigFields = Object.keys(this.intakeFieldLabels) as IntakeFieldKey[];
  public selectedIntakeFields = new Set<IntakeFieldKey>();
  public savingIntakeConfig = false;

  // El panel de cuestionario es GLOBAL del trainer (no hay un enabledFields
  // por scope en el backend, ver train-fit-back/components/trainerIntakeConfig)
  // — este filtro es puramente de presentación: qué checkboxes se OFRECEN en
  // esta pantalla según el scope marcado en el form de invitar de ARRIBA, no
  // cambia qué se guarda (sigue siendo la misma config de 9 campos).
  private readonly trainingIntakeFields: IntakeFieldKey[] = [
    'goals',
    'healthConditions',
    'experienceLevel',
    'availability',
    'equipment',
  ];
  private readonly nutritionIntakeFields: IntakeFieldKey[] = [
    'allergies',
    'favoriteFoods',
    'dislikedFoods',
    'cooksAtHome',
  ];

  // Sin ningún scope marcado todavía (el trainer abrió el panel antes de
  // elegir), se muestran los 9 — no tiene sentido un panel vacío.
  public get visibleIntakeConfigFields(): IntakeFieldKey[] {
    const wantsTraining = !!this.form?.value.training;
    const wantsNutrition = !!this.form?.value.nutrition;
    if (!wantsTraining && !wantsNutrition) return this.intakeConfigFields;

    return this.intakeConfigFields.filter(
      (field) =>
        (wantsTraining && this.trainingIntakeFields.includes(field)) ||
        (wantsNutrition && this.nutritionIntakeFields.includes(field))
    );
  }

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

  // TASK-035 (MASTER_BACKLOG.md) — antes no existía NINGUNA forma de
  // rechazar un cliente en "en_revision" desde esta pantalla (solo
  // "Confirmar" o "Cerrar", que no decide nada). Reutiliza el mismo
  // cancelInvite() del backend ya corregido para revocar de verdad este
  // estado (antes devolvía éxito falso — ver DECISIONS.md).
  // Recibe el GRUPO (no una invitación suelta) — con la fila unificada por
  // cliente, rechazar debe cortar TODOS los scopes en revisión de ese par a
  // la vez, no dejar uno rechazado y otro activo por accidente.
  public async confirmReject(group: GroupedInvite): Promise<void> {
    const alert = await this.ionicUtilService.showAlert({
      header: 'Rechazar cliente',
      message: `¿Seguro que quieres rechazar a ${group.clientEmail} tras revisar su cuestionario? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Rechazar',
          cssClass: 'alert-button-danger',
          handler: () => {
            group.invites.forEach((invite) => this.cancelInvite(invite));
            this.closeReview();
          },
        },
      ],
    });
    void alert;
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

  // --- TASK-049: personalizar cuestionario inicial ---
  public toggleIntakeConfigPanel(): void {
    this.showIntakeConfig = !this.showIntakeConfig;
    if (this.showIntakeConfig && this.intakeConfigState !== 'loaded') {
      this.loadIntakeConfig();
    }
  }

  public loadIntakeConfig(): void {
    this.intakeConfigState = 'loading';
    this.trainerInvitesApi.getIntakeConfig().subscribe({
      next: (config) => {
        this.selectedIntakeFields = new Set(config.enabledFields);
        this.intakeConfigState = 'loaded';
      },
      error: () => {
        this.intakeConfigState = 'error';
      },
    });
  }

  public toggleIntakeField(field: IntakeFieldKey): void {
    if (this.selectedIntakeFields.has(field)) {
      this.selectedIntakeFields.delete(field);
    } else {
      this.selectedIntakeFields.add(field);
    }
  }

  public saveIntakeConfig(): void {
    if (this.savingIntakeConfig) return;
    this.savingIntakeConfig = true;
    this.trainerInvitesApi
      .updateIntakeConfig([...this.selectedIntakeFields])
      .subscribe({
        next: (config) => {
          this.savingIntakeConfig = false;
          this.selectedIntakeFields = new Set(config.enabledFields);
          this.ionicUtilService.showToast({ message: 'Cuestionario actualizado', duration: 2500 });
        },
        error: (err) => {
          this.savingIntakeConfig = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo guardar la configuración',
            'Error',
            3000
          );
        },
      });
  }
}
