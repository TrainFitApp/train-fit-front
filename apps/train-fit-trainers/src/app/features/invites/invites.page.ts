import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { IntakeFieldKey } from 'src/app/core/services/onboarding/onboarding.service';
import { TrainerInvitesApiService } from './services/trainer-invites-api.service';
import {
  ClientEmailScopeStatus,
  TrainerInvite,
  TrainerInviteScope,
} from './models/trainer-invite.model';

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

// Historial: un cliente con 2 ámbitos puede tener estados distintos por
// ámbito (p. ej. entrenamiento rechazado, nutrición finalizada más tarde) —
// agrupar por estado en vez de asumir uno solo evita mentir emparejando un
// estado con un ámbito al que no corresponde. En el caso normal (mismo
// estado en ambos, o un solo ámbito) esto da un único grupo.
interface HistoryStatusGroup {
  status: TrainerInvite['status'];
  scopes: TrainerInviteScope[];
  // Las invitaciones de este grupo (no solo su scope) — hace falta el _id
  // de cada una para poder cancelarlas individualmente en "Pendientes"
  // (ver confirmCancel en el template), que reutiliza esta misma card.
  invites: TrainerInvite[];
}

interface HistoryGroup extends GroupedInvite {
  statusGroups: HistoryStatusGroup[];
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
  public historyInvites: TrainerInvite[] = [];
  public cancellingId: string | null = null;

  // Calculados UNA VEZ en loadInvites(), no en un getter/método de plantilla
  // — un getter (o una llamada a método) usado directamente en *ngFor se
  // reevalúa en CADA ciclo de detección de cambios y devuelve arrays/objetos
  // nuevos cada vez, lo que hace que *ngFor destruya y recree todas las
  // filas sin parar y deja la pantalla colgada en cuanto hay invitaciones
  // reales que listar (mismo bug ya visto y corregido en clients.page.ts).
  // Pendientes va por INVITACIÓN, no por grupo de estado — cada fila tiene
  // un único chip de ámbito y un único botón de cancelar, sin ambigüedad de
  // cuál cancela cuál cuando el cliente tiene los dos ámbitos a la vez.
  public groupedPendingInvites: GroupedInvite[] = [];
  public groupedHistoryInvites: HistoryGroup[] = [];

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

  public trackByStatus(_index: number, statusGroup: HistoryStatusGroup): string {
    return statusGroup.status;
  }

  public trackByInviteId(_index: number, invite: TrainerInvite): string {
    return invite._id;
  }

  public clientDisplayName(group: GroupedInvite): string | null {
    const client = group.invites.find((invite) => invite.client)?.client;
    if (!client?.name && !client?.lastname) return null;
    return `${client.name || ''} ${client.lastname || ''}`.trim();
  }

  private groupByStatus(invites: TrainerInvite[]): HistoryStatusGroup[] {
    const groups = new Map<string, HistoryStatusGroup>();
    for (const invite of invites) {
      if (!groups.has(invite.status)) {
        groups.set(invite.status, { status: invite.status, scopes: [], invites: [] });
      }
      const group = groups.get(invite.status)!;
      group.scopes.push(invite.scope);
      group.invites.push(invite);
    }
    return [...groups.values()];
  }

  private groupByClientWithStatus(invites: TrainerInvite[]): HistoryGroup[] {
    return this.groupByClient(invites).map((group) => ({
      ...group,
      statusGroups: this.groupByStatus(group.invites),
    }));
  }

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

  // Estado del email frente a ESTE trainer, comprobado al perder el foco
  // del campo — evita que el trainer marque un ámbito que el backend va a
  // rechazar igual al enviar (índice único trainerId+clientEmail+scope).
  public emailScopeStatus: ClientEmailScopeStatus | null = null;
  public checkingEmail = false;
  private lastCheckedEmail: string | null = null;

  public ngOnInit(): void {
    this.form = new FormGroup({
      clientEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      training: new FormControl(false),
      nutrition: new FormControl(false),
    });

    // Cambiar el email invalida la comprobación anterior — nunca se deja un
    // "ya lo llevas" de un email distinto pegado en pantalla.
    this.form.get('clientEmail')?.valueChanges.subscribe(() => {
      this.emailScopeStatus = null;
      this.lastCheckedEmail = null;
    });

    this.loadInvites();
  }

  public toggleScope(controlName: 'training' | 'nutrition'): void {
    if (this.isScopeBlocked(controlName)) return;
    const control = this.form.get(controlName);
    control?.setValue(!control.value);
  }

  public isScopeBlocked(scope: TrainerInviteScope): boolean {
    return !!this.emailScopeStatus?.[scope]?.blocked;
  }

  public emailScopeStatusMessage(scope: TrainerInviteScope): string | null {
    const state = this.emailScopeStatus?.[scope];
    if (!state?.blocked) return null;
    switch (state.status) {
      case 'active':
        return 'Ya es tu cliente en este ámbito';
      case 'pending':
        return 'Ya tiene una invitación pendiente de respuesta';
      case 'cuestionario_pendiente':
        return 'Ya aceptó, esperando que complete el cuestionario';
      case 'en_revision':
        return 'Cuestionario recibido, pendiente de tu confirmación';
      default:
        return 'Ya existe una relación en curso con este ámbito';
    }
  }

  public onEmailBlur(): void {
    const control = this.form.get('clientEmail');
    const email = (control?.value || '').trim().toLowerCase();
    if (!email || control?.invalid || email === this.lastCheckedEmail) {
      return;
    }

    this.checkingEmail = true;
    this.trainerInvitesApi.checkClientEmailStatus(email).subscribe({
      next: (status) => {
        this.checkingEmail = false;
        this.lastCheckedEmail = email;
        this.emailScopeStatus = status;
        // Un ámbito que ya estaba marcado pero ahora resulta bloqueado no
        // se manda igual — se desmarca solo, junto con el aviso.
        (['training', 'nutrition'] as TrainerInviteScope[]).forEach((scope) => {
          if (status[scope].blocked) {
            this.form.get(scope)?.setValue(false);
          }
        });
      },
      // Fallo silencioso — no bloquea al trainer, el backend igual protege
      // al enviar (mismo índice único), esto es solo el aviso anticipado.
      error: () => {
        this.checkingEmail = false;
      },
    });
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
        // en_revision ya no se lista aquí — el cliente ya aceptó y mandó el
        // cuestionario, así que se revisa/confirma en "Clientes"
        // (clients.page.ts), no en esta pantalla de invitaciones.
        this.historyInvites = sorted.filter(
          (invite) => !['pending', 'cuestionario_pendiente', 'en_revision'].includes(invite.status)
        );

        this.groupedPendingInvites = this.groupByClient(this.pendingInvites);
        this.groupedHistoryInvites = this.groupByClientWithStatus(this.historyInvites);

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
