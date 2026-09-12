import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  IntakeCustomQuestion,
  IntakeFieldKey,
  OnboardingRelation,
  OnboardingService,
} from 'src/app/core/services/onboarding/onboarding.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { NutritionPreferencesApiService } from '../nutrition-preferences/services/nutrition-preferences-api.service';
import { PendingInvite } from '../coach/models/professional-relation.model';
import { ProfessionalsApiService } from '../coach/services/professionals-api.service';
import { IntakeApiService } from './services/intake-api.service';
import { IntakeWizardPrefill, IntakeWizardResult } from './components/intake-wizard/intake-wizard.component';
import { InitialMeasurementConflict, InitialMeasurementDefinition, InitialMeasurementsState, deviceTimeZone, initialMeasurementConflicts, newIntakeRequestId, todayInTimeZone } from './models/initial-measurements';
import { InitialMeasurementsApiService } from './services/initial-measurements-api.service';
import { IntakeDraftService } from './services/intake-draft.service';

type ViewState = 'loading' | 'error' | 'loaded';

interface TrainerGroup {
  trainerId: string;
  trainerName: string;
  scopes: string[];
  needsIntake: boolean; // true si alguna relación sigue en cuestionario_pendiente
  enabledFields: Set<IntakeFieldKey>; // TASK-049 — campos activos del cuestionario de este trainer
  customQuestions: IntakeCustomQuestion[]; // preguntas de texto libre añadidas por el trainer
  intakeConfigVersion?: number;
}

interface IntakeDraftEnvelope {
  form: IntakeWizardPrefill;
  requestId: string;
  signature: string;
}

const EMPTY_INTAKE_PREFILL: IntakeWizardPrefill = {
  goals: '',
  healthConditions: '',
  experienceLevel: null,
  availability: '',
  trainingLocation: null,
  equipmentTags: [],
  allergies: '',
  favoriteFoods: '',
  dislikedFoods: '',
  cooksAtHome: null,
  dietaryFlags: [],
  weight: null,
  height: null,
  sex: null,
  birth: '',
  steps: null,
  activity: null,
  training: null,
  objective: null,
  customAnswers: {},
};

// TAREA 3 (coach-tab) — pantalla que ve el cliente mientras no tiene ninguna
// relación activa todavía: si alguno de sus profesionales sigue esperando el
// cuestionario inicial, lo rellena aquí (wizard paso a paso, ver
// components/intake-wizard); si ya lo envió, ve un mensaje de espera hasta
// que el profesional lo confirme explícitamente.
@Component({
  selector: 'app-onboarding-status',
  templateUrl: 'onboarding-status.page.html',
  styleUrls: ['onboarding-status.page.scss'],
})
export class OnboardingStatusPage implements OnDestroy {
  public state: ViewState = 'loading';
  public groups: TrainerGroup[] = [];
  public readonly emptyFieldSet: Set<IntakeFieldKey> = new Set();

  public fillingTrainerId: string | null = null;
  public isSubmitting = false;
  public isLoadingIntake = false;
  public intakePrefill: IntakeWizardPrefill = EMPTY_INTAKE_PREFILL;
  public measurementsState: InitialMeasurementsState | null = null;
  public measurementDefinitions: InitialMeasurementDefinition[] = [];
  public intakeLoadError = '';
  public submitError = '';
  public canReloadIntake = false;
  public measurementConflicts: InitialMeasurementConflict[] = [];
  private lastSubmission: IntakeWizardResult | null = null;
  public readonly timeZone = deviceTimeZone();
  private draftKey = '';
  private requestId = '';
  private requestSignature = '';
  private latestDraft: IntakeWizardPrefill = EMPTY_INTAKE_PREFILL;

  public get measurementToday(): string { return todayInTimeZone(this.timeZone); }

  // Invitaciones YA aceptadas por el cliente están en `groups` (relaciones
  // cuestionario_pendiente/en_revision). Estas son las que TODAVÍA no ha
  // aceptado (status "pending") — sin esto, un cliente bloqueado por tener
  // otra relación en curso con un trainer no podía llegar nunca al tab de
  // Coach (bloqueado también por el mismo guard) para aceptar una invitación
  // nueva, y se quedaba sin forma de rellenar ese segundo cuestionario.
  public pendingInvites: PendingInvite[] = [];
  public respondingInviteId: string | null = null;

  // Bug real (2026-09) — esta pantalla no tenía NINGÚN control de
  // navegación (ni back, ni tab bar —estructuralmente ausente mientras el
  // guard bloquea /tabs—) en cuanto la única relación pendiente pasaba a
  // "en_revision": el cliente quedaba atrapado hasta forzar el cierre de la
  // app. Auto-desatasco por si el entrenador confirma mientras el cliente
  // sigue en esta pantalla, más una salida real (ver goBack/
  // OnboardingService#dismiss): completar el cuestionario ya no es
  // obligatorio para poder navegar.
  private pollHandle: ReturnType<typeof setInterval> | null = null;

  constructor(
    private router: Router,
    private onboardingService: OnboardingService,
    private intakeApi: IntakeApiService,
    private nutritionPreferencesApi: NutritionPreferencesApiService,
    private professionalsApi: ProfessionalsApiService,
    private ionicUtilService: IonicUtilService,
    private initialMeasurementsApi: InitialMeasurementsApiService,
    private drafts: IntakeDraftService,
    private userService: UserService
  ) {}

  public ionViewWillEnter(): void {
    this.load();
  }

  public ionViewWillLeave(): void {
    this.stopPolling();
  }

  public ngOnDestroy(): void {
    this.stopPolling();
  }

  public load(): void {
    this.state = 'loading';
    forkJoin({
      status: this.onboardingService.refresh(),
      pendingInvites: this.professionalsApi.getPendingInvites(),
    }).subscribe({
      next: ({ status, pendingInvites }) => {
        this.pendingInvites = pendingInvites || [];
        if (!status.blocked && !this.pendingInvites.length) {
          this.stopPolling();
          void this.router.navigate(['/tabs']);
          return;
        }
        this.groups = this.groupByTrainer(status.relations);
        this.state = 'loaded';

        // Nada que rellenar, solo esperar confirmación: se sondea cada 30s
        // para que el cliente entre solo a /tabs en cuanto se confirme, sin
        // tener que forzar el cierre de la app. Mientras quede algún
        // cuestionario por rellenar (pendingCount > 0) no hay nada que
        // "esperar" todavía, así que no se sondea.
        if (this.pendingCount === 0) {
          this.startPolling();
        } else {
          this.stopPolling();
        }
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private startPolling(): void {
    if (this.pollHandle) return;
    this.pollHandle = setInterval(() => this.load(), 30000);
  }

  private stopPolling(): void {
    if (this.pollHandle) {
      clearInterval(this.pollHandle);
      this.pollHandle = null;
    }
  }

  // Válvula de escape siempre disponible: la espera de confirmación del
  // entrenador no tiene SLA (puede ser minutos o días), y el cuestionario
  // deja de ser obligatorio para navegar en cuanto se llama a dismiss() —
  // onboardingMatchGuard no vuelve a redirigir aquí hasta el próximo login.
  // Vuelve a Coach (no a /tabs en general) porque es de donde sale el
  // recordatorio que trae de vuelta aquí (ver CoachPage#goToOnboardingStatus)
  // — esta pantalla no desaparece, sigue accesible para completarlo luego.
  public goBack(): void {
    this.stopPolling();
    this.onboardingService.dismiss();
    void this.router.navigate(['/tabs/coach']);
  }

  public respondToInvite(invite: PendingInvite, decision: 'accept' | 'decline'): void {
    if (this.respondingInviteId) return;
    this.respondingInviteId = invite._id;
    const request$ =
      decision === 'accept'
        ? this.professionalsApi.acceptInvite(invite._id)
        : this.professionalsApi.declineInvite(invite._id);
    request$.subscribe({
      next: () => {
        this.respondingInviteId = null;
        this.load();
      },
      error: (err) => {
        this.respondingInviteId = null;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo procesar la invitación',
          'Error',
          3000
        );
      },
    });
  }

  public trackByInviteId(_index: number, invite: PendingInvite): string {
    return invite._id;
  }

  private groupByTrainer(relations: OnboardingRelation[]): TrainerGroup[] {
    const byTrainer = new Map<string, TrainerGroup>();
    for (const relation of relations) {
      if (!byTrainer.has(relation.trainerId)) {
        byTrainer.set(relation.trainerId, {
          trainerId: relation.trainerId,
          trainerName: relation.trainer
            ? `${relation.trainer.name} ${relation.trainer.lastname}`.trim()
            : 'Tu profesional',
          scopes: [],
          needsIntake: false,
          enabledFields: new Set(),
          customQuestions: relation.intakeCustomQuestions,
          intakeConfigVersion: (relation as OnboardingRelation & { intakeConfigVersion?: number }).intakeConfigVersion,
        });
      }
      const group = byTrainer.get(relation.trainerId)!;
      // Unión entre las relaciones del mismo trainer: enabledFields es por
      // trainer, PERO el backend fuerza `dietaryFlags` solo en la relación
      // de scope nutrición, así que hay que juntar todas.
      relation.intakeEnabledFields.forEach((f) => group.enabledFields.add(f));
      group.scopes.push(relation.scope === 'training' ? 'Entrenamiento' : 'Nutrición');
      if (relation.status === 'cuestionario_pendiente') group.needsIntake = true;
    }
    // Los que aún hay que rellenar primero — el cliente no debe tener que
    // desplazarse pasado los que ya están "esperando confirmación" para
    // encontrar el siguiente cuestionario pendiente.
    return [...byTrainer.values()].sort((a, b) => Number(b.needsIntake) - Number(a.needsIntake));
  }

  public get pendingCount(): number {
    return this.groups.filter((g) => g.needsIntake).length;
  }

  public get fillingGroup(): TrainerGroup | undefined {
    return this.groups.find((g) => g.trainerId === this.fillingTrainerId);
  }

  public openIntakeForm(group: TrainerGroup): void {
    this.stopPolling();
    this.fillingTrainerId = group.trainerId;
    this.intakePrefill = EMPTY_INTAKE_PREFILL;
    this.measurementsState = null;
    this.measurementDefinitions = [];
    this.intakeLoadError = '';
    this.submitError = '';
    this.canReloadIntake = false;

    // El cuestionario es UNO por par (trainer, cliente) — si este trainer ya
    // le había respondido antes (p. ej. rellenó nutrición y ahora también
    // hay que rellenar entrenamiento), se precarga en vez de partir de cero
    // y perder lo ya escrito. allergies/favoriteFoods/dislikedFoods/
    // cooksAtHome no son por trainer (ClientNutritionPreferences, F29), se
    // precargan igual pero desde su propio endpoint.
    this.isLoadingIntake = true;
    forkJoin({
      intake: this.intakeApi.getMine(group.trainerId),
      preferences: this.nutritionPreferencesApi.getMine(),
      measurements: this.initialMeasurementsApi.get(group.trainerId),
    }).subscribe({
      next: ({ intake, preferences, measurements }) => {
        // El cliente pudo cerrar este formulario o abrir el de otro trainer
        // mientras la petición estaba en curso — no pisar lo que se esté
        // viendo ahora con una respuesta que ya no corresponde.
        if (this.fillingTrainerId !== group.trainerId) return;
        const customAnswers: Record<string, string> = {};
        intake?.customAnswers.forEach((answer) => {
          customAnswers[answer.questionId] = answer.value;
        });
        this.measurementsState = measurements;
        this.measurementDefinitions = measurements.catalog.filter((definition) =>
          measurements.requestedFields.includes(definition.key) && measurements.missingFields.includes(definition.key)
        );
        this.draftKey = this.drafts.key('intake', group.trainerId, measurements.stageId);
        const saved = this.drafts.read<IntakeDraftEnvelope>(this.draftKey);
        // Un borrador guardado antes de que el intake pidiera el perfil no trae
        // esas claves: el perfil del registro las rellena, pero sin pisar lo que
        // el cliente ya haya escrito (aunque lo haya dejado a null a proposito).
        this.intakePrefill = saved?.form
          ? { ...this.profilePrefillFromUser(), ...saved.form }
          : {
              goals: intake?.goals || '',
              healthConditions: intake?.healthConditions || '',
              experienceLevel: intake?.experienceLevel ?? null,
              availability: intake?.availability || '',
              trainingLocation: intake?.trainingLocation ?? null,
              equipmentTags: intake?.equipmentTags || [],
              allergies: preferences?.allergies || '',
              favoriteFoods: preferences?.favoriteFoods || '',
              dislikedFoods: preferences?.dislikedFoods || '',
              cooksAtHome: preferences?.cooksAtHome ?? null,
              dietaryFlags: preferences?.dietaryFlags || [],
              // Reciclar lo del registro: el cliente autenticado ya tiene su
              // perfil cargado en local, el intake solo lo confirma.
              ...this.profilePrefillFromUser(),
              customAnswers,
            };
        this.latestDraft = this.intakePrefill;
        this.requestId = saved?.requestId || newIntakeRequestId();
        this.requestSignature = saved?.signature || '';
        this.isLoadingIntake = false;
      },
      error: () => {
        if (this.fillingTrainerId !== group.trainerId) return;
        this.intakeLoadError = 'No se pudo cargar el cuestionario y sus medidas. Reintenta para conservar tus datos anteriores.';
        this.isLoadingIntake = false;
      },
    });
  }

  public closeIntakeForm(): void {
    if (this.isSubmitting) return;
    this.fillingTrainerId = null;
  }

  // El perfil (peso/altura/sexo/pasos/actividad/frecuencia) que el cliente ya
  // metió al registrarse — el wizard lo enseña prerellenado y el cliente solo
  // ajusta lo que haya cambiado.
  private profilePrefillFromUser(): Pick<
    IntakeWizardPrefill,
    'weight' | 'height' | 'sex' | 'birth' | 'steps' | 'activity' | 'training' | 'objective'
  > {
    const u = this.userService.getLocalUser;
    return {
      weight: Number.isFinite(u?.weight) ? u!.weight : null,
      height: Number.isFinite(u?.height) ? u!.height : null,
      sex: u?.sex === 0 || u?.sex === 1 ? u!.sex : null,
      birth: u?.birth ? new Date(u.birth).toISOString().slice(0, 10) : '',
      steps: Number.isFinite(u?.steps) ? u!.steps : null,
      activity: Number.isFinite(u?.activity) ? u!.activity : null,
      training: Number.isFinite(u?.training) ? u!.training : null,
      objective: Number.isFinite(u?.objetive) ? u!.objetive : null,
    };
  }

  public saveDraft(form: IntakeWizardPrefill): void {
    if (this.isSubmitting) return;
    this.latestDraft = form;
    this.measurementConflicts = [];
    this.drafts.save(this.draftKey, { form, requestId: this.requestId, signature: this.requestSignature });
  }

  public submitIntake(result: IntakeWizardResult): void {
    if (!this.fillingTrainerId || this.isSubmitting) return;
    const trainerId = this.fillingTrainerId;
    this.lastSubmission = result;
    const payload = { trainerId, ...result, timeZone: this.timeZone, intakeConfigVersion: this.measurementsState?.configVersion ?? this.fillingGroup?.intakeConfigVersion };
    const signature = JSON.stringify(payload);
    if (this.requestSignature && this.requestSignature !== signature) this.requestId = newIntakeRequestId();
    this.requestSignature = signature;
    this.drafts.save(this.draftKey, { form: this.latestDraft, requestId: this.requestId, signature });
    this.submitError = '';
    this.isSubmitting = true;
    this.intakeApi
      .submit({ ...payload, requestId: this.requestId })
      .subscribe({
        next: () => {
          this.drafts.clear(this.draftKey);
          this.isSubmitting = false;
          this.fillingTrainerId = null;
          this.ionicUtilService.showToast({
            message: result.missingMeasurementsAcknowledged
              ? 'Cuestionario enviado. Puedes completar las medidas pendientes desde tu perfil.'
              : 'Cuestionario enviado. Tu profesional lo revisará en breve.',
            duration: 3500,
          });
          this.load();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submitError = err?.error?.message || 'No se pudo enviar el cuestionario. Conservamos tus respuestas; puedes reintentar.';
          this.measurementConflicts = initialMeasurementConflicts(err, result.measurements || [], this.measurementDefinitions);
          this.canReloadIntake = ['INTAKE_CONFIG_CHANGED', 'INTAKE_ALREADY_SUBMITTED'].includes(err?.error?.code);
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo enviar el cuestionario',
            'Error',
            3000
          );
        },
      });
  }

  public confirmMeasurementConflict(): void {
    if (!this.lastSubmission || !this.measurementConflicts.length) return;
    const measurements = (this.lastSubmission.measurements || []).map((value) => {
      const conflict = this.measurementConflicts.find((item) => item.field === value.field);
      return conflict ? { ...value, confirmedExisting: false, expectedValue: conflict.currentValue } : value;
    });
    this.latestDraft = { ...this.latestDraft, measurementDrafts: measurements.map((value) => ({ ...value, value: String(value.value) })) };
    this.intakePrefill = this.latestDraft;
    this.measurementConflicts = [];
    this.submitIntake({ ...this.lastSubmission, measurements });
  }

  public reloadIntake(): void {
    if (this.isSubmitting || !this.fillingTrainerId) return;
    const trainerId = this.fillingTrainerId;
    this.onboardingService.refresh().subscribe((status) => {
      this.groups = this.groupByTrainer(status.relations);
      const group = this.groups.find((item) => item.trainerId === trainerId);
      if (group?.needsIntake) this.openIntakeForm(group);
      else { this.fillingTrainerId = null; this.load(); }
    });
  }

  public trackByTrainerId(_index: number, group: TrainerGroup): string {
    return group.trainerId;
  }
}
