import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import {
  IntakeCustomQuestion,
  IntakeFieldKey,
  IntakeStatus,
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

type ViewState = 'loading' | 'error' | 'loaded';

interface TrainerGroup {
  trainerId: string;
  trainerName: string;
  scopes: string[];
  intakeStatus: IntakeStatus; // el mismo en todas sus relaciones: uno por profesional
  enabledFields: Set<IntakeFieldKey>; // TASK-049 — campos activos del cuestionario de este trainer
  customQuestions: IntakeCustomQuestion[]; // preguntas de texto libre añadidas por el trainer
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

// TAREA 3 (coach-tab) — el cuestionario inicial del cliente. Aceptar una
// invitación ya le hace cliente activo: aquí lo rellena (wizard paso a paso,
// ver components/intake-wizard) cuando quiera, lo edita o rehace mientras
// el profesional no lo marque revisado, y después solo lo ve. Nunca bloquea
// la app: se llega desde Coach (al aceptar o desde su acceso).
@Component({
  selector: 'app-onboarding-status',
  templateUrl: 'onboarding-status.page.html',
  styleUrls: ['onboarding-status.page.scss'],
})
export class OnboardingStatusPage {
  public state: ViewState = 'loading';
  public groups: TrainerGroup[] = [];
  public readonly emptyFieldSet: Set<IntakeFieldKey> = new Set();

  public fillingTrainerId: string | null = null;
  public isSubmitting = false;
  public isLoadingIntake = false;
  public intakePrefill: IntakeWizardPrefill = EMPTY_INTAKE_PREFILL;

  // Invitaciones que TODAVÍA no ha aceptado (status "pending"): se pueden
  // aceptar aquí mismo, y al hacerlo su cuestionario aparece en `groups`.
  public pendingInvites: PendingInvite[] = [];
  public respondingInviteId: string | null = null;

  constructor(
    private router: Router,
    private onboardingService: OnboardingService,
    private intakeApi: IntakeApiService,
    private nutritionPreferencesApi: NutritionPreferencesApiService,
    private professionalsApi: ProfessionalsApiService,
    private ionicUtilService: IonicUtilService,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  public ionViewWillEnter(): void {
    this.load();
  }

  // afterSubmit: acaba de enviar un cuestionario; si ya no le queda ninguno
  // pendiente ni invitación que aceptar, vuelve a Coach en vez de quedarse
  // mirando la lista.
  public load(afterSubmit = false): void {
    this.state = 'loading';
    forkJoin({
      status: this.onboardingService.refresh(),
      pendingInvites: this.professionalsApi.getPendingInvites(),
    }).subscribe({
      next: ({ status, pendingInvites }) => {
        this.pendingInvites = pendingInvites || [];
        const nothingToShow = !status.relations.length && !this.pendingInvites.length;
        const nothingToDo = !this.pendingInvites.length &&
          !status.relations.some((relation) => relation.intakeStatus === 'pending');
        if (nothingToShow || (afterSubmit && nothingToDo)) {
          this.goBack();
          return;
        }
        this.groups = this.groupByTrainer(status.relations);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Vuelve a Coach (no a /tabs en general) porque es de donde sale el aviso
  // que trae de vuelta aquí (ver CoachPage#goToOnboardingStatus).
  public goBack(): void {
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
          err?.error?.message || this.translate.instant('ONBOARDING.INVITE_ERROR'),
          this.translate.instant('COMMON.ERROR'),
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
            : this.translate.instant('ONBOARDING.YOUR_PROFESSIONAL'),
          scopes: [],
          intakeStatus: relation.intakeStatus,
          enabledFields: new Set(),
          customQuestions: relation.intakeCustomQuestions,
        });
      }
      const group = byTrainer.get(relation.trainerId)!;
      // Unión entre las relaciones del mismo trainer: enabledFields es por
      // trainer, PERO el backend fuerza `dietaryFlags` solo en la relación
      // de scope nutrición, así que hay que juntar todas.
      relation.intakeEnabledFields.forEach((f) => group.enabledFields.add(f));
      group.scopes.push(
        this.translate.instant(relation.scope === 'training' ? 'ONBOARDING.SCOPE_TRAINING' : 'ONBOARDING.SCOPE_NUTRITION')
      );
    }
    return [...byTrainer.values()];
  }

  public get pendingCount(): number {
    return this.groups.filter((g) => g.intakeStatus === 'pending').length;
  }

  public get hasEditableIntake(): boolean {
    return this.groups.some((g) => g.intakeStatus === 'submitted');
  }

  public get fillingGroup(): TrainerGroup | undefined {
    return this.groups.find((g) => g.trainerId === this.fillingTrainerId);
  }

  public openIntakeForm(group: TrainerGroup): void {
    this.fillingTrainerId = group.trainerId;
    this.intakePrefill = EMPTY_INTAKE_PREFILL;

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
    }).subscribe({
      next: ({ intake, preferences }) => {
        // El cliente pudo cerrar este formulario o abrir el de otro trainer
        // mientras la petición estaba en curso — no pisar lo que se esté
        // viendo ahora con una respuesta que ya no corresponde.
        if (this.fillingTrainerId !== group.trainerId) return;
        const customAnswers: Record<string, string> = {};
        intake?.customAnswers.forEach((answer) => {
          customAnswers[answer.questionId] = answer.value;
        });
        this.intakePrefill = {
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
        this.isLoadingIntake = false;
      },
      // Fallo silencioso — precargar es una mejora, no un requisito; el
      // formulario ya está en blanco y se puede rellenar igual.
      error: () => {
        this.isLoadingIntake = false;
      },
    });
  }

  public closeIntakeForm(): void {
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

  // El envío reescribe peso/altura/pasos/objetivo en `User` (backend): sin
  // recargarlo, editar después precargaría los datos de antes del envío.
  // Mismo par que user-loader.page.ts (getUserByEmail → setLocalUser).
  private refreshLocalUser(): void {
    const email = this.userService.getLocalUser?.email;
    if (!email) return;
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => (this.userService.setLocalUser = user),
      error: () => {}, // se recarga igual en el próximo arranque
    });
  }

  public submitIntake(result: IntakeWizardResult): void {
    if (!this.fillingTrainerId || this.isSubmitting) return;

    const isEdit = this.fillingGroup?.intakeStatus === 'submitted';
    this.isSubmitting = true;
    this.intakeApi
      .submit({ trainerId: this.fillingTrainerId, ...result })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.fillingTrainerId = null;
          this.ionicUtilService.showToast({
            message: isEdit
              ? this.translate.instant('ONBOARDING.UPDATED')
              : this.translate.instant('ONBOARDING.SUBMITTED'),
            duration: 3500,
          });
          this.refreshLocalUser();
          this.load(true);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || this.translate.instant('ONBOARDING.SUBMIT_ERROR'),
            this.translate.instant('COMMON.ERROR'),
            3000
          );
        },
      });
  }

  public trackByTrainerId(_index: number, group: TrainerGroup): string {
    return group.trainerId;
  }
}
