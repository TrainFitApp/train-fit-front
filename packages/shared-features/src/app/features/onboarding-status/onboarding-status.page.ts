import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  IntakeCustomQuestion,
  IntakeFieldKey,
  OnboardingRelation,
  OnboardingService,
} from 'src/app/core/services/onboarding/onboarding.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NutritionPreferencesApiService } from '../nutrition-preferences/services/nutrition-preferences-api.service';
import { PendingInvite } from '../coach/models/professional-relation.model';
import { ProfessionalsApiService } from '../coach/services/professionals-api.service';
import { IntakeApiService, IntakeSubmission } from './services/intake-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

interface TrainerGroup {
  trainerId: string;
  trainerName: string;
  scopes: string[];
  needsIntake: boolean; // true si alguna relación sigue en cuestionario_pendiente
  enabledFields: Set<IntakeFieldKey>; // TASK-049 — campos activos del cuestionario de este trainer
  customQuestions: IntakeCustomQuestion[]; // preguntas de texto libre añadidas por el trainer
}

const EXPERIENCE_OPTIONS: { value: IntakeSubmission['experienceLevel']; label: string }[] = [
  { value: 'none', label: 'Sin experiencia' },
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
];

const COOKS_OPTIONS: { value: IntakeSubmission['cooksAtHome']; label: string }[] = [
  { value: 'yes', label: 'Sí' },
  { value: 'no', label: 'No' },
  { value: 'sometimes', label: 'A veces' },
];

// TAREA 3 (coach-tab) — pantalla que ve el cliente mientras no tiene ninguna
// relación activa todavía: si alguno de sus profesionales sigue esperando el
// cuestionario inicial, lo rellena aquí; si ya lo envió, ve un mensaje de
// espera hasta que el profesional lo confirme explícitamente.
@Component({
  selector: 'app-onboarding-status',
  templateUrl: 'onboarding-status.page.html',
  styleUrls: ['onboarding-status.page.scss'],
})
export class OnboardingStatusPage {
  public state: ViewState = 'loading';
  public groups: TrainerGroup[] = [];

  public fillingTrainerId: string | null = null;
  public isSubmitting = false;
  public isLoadingIntake = false;
  public readonly experienceOptions = EXPERIENCE_OPTIONS;
  public readonly cooksOptions = COOKS_OPTIONS;

  public goals = '';
  public healthConditions = '';
  public experienceLevel: IntakeSubmission['experienceLevel'] = null;
  public availability = '';
  public equipment = '';
  public allergies = '';
  public favoriteFoods = '';
  public dislikedFoods = '';
  public cooksAtHome: IntakeSubmission['cooksAtHome'] = null;
  public customAnswers: Record<string, string> = {};

  // Invitaciones YA aceptadas por el cliente están en `groups` (relaciones
  // cuestionario_pendiente/en_revision). Estas son las que TODAVÍA no ha
  // aceptado (status "pending") — sin esto, un cliente bloqueado por tener
  // otra relación en curso con un trainer no podía llegar nunca al tab de
  // Coach (bloqueado también por el mismo guard) para aceptar una invitación
  // nueva, y se quedaba sin forma de rellenar ese segundo cuestionario.
  public pendingInvites: PendingInvite[] = [];
  public respondingInviteId: string | null = null;

  constructor(
    private router: Router,
    private onboardingService: OnboardingService,
    private intakeApi: IntakeApiService,
    private nutritionPreferencesApi: NutritionPreferencesApiService,
    private professionalsApi: ProfessionalsApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ionViewWillEnter(): void {
    this.load();
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
          void this.router.navigate(['/tabs']);
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
          enabledFields: new Set(relation.intakeEnabledFields),
          customQuestions: relation.intakeCustomQuestions,
        });
      }
      const group = byTrainer.get(relation.trainerId)!;
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

  public openIntakeForm(group: TrainerGroup): void {
    this.fillingTrainerId = group.trainerId;
    this.resetIntakeForm();

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
        if (intake) {
          this.goals = intake.goals || '';
          this.healthConditions = intake.healthConditions || '';
          this.experienceLevel = intake.experienceLevel;
          this.availability = intake.availability || '';
          this.equipment = intake.equipment || '';
          intake.customAnswers.forEach((answer) => {
            this.customAnswers[answer.questionId] = answer.value;
          });
        }
        if (preferences) {
          this.allergies = preferences.allergies || '';
          this.favoriteFoods = preferences.favoriteFoods || '';
          this.dislikedFoods = preferences.dislikedFoods || '';
          this.cooksAtHome = preferences.cooksAtHome;
        }
        this.isLoadingIntake = false;
      },
      // Fallo silencioso — precargar es una mejora, no un requisito; el
      // formulario ya está en blanco y se puede rellenar igual.
      error: () => {
        this.isLoadingIntake = false;
      },
    });
  }

  private resetIntakeForm(): void {
    this.goals = '';
    this.healthConditions = '';
    this.experienceLevel = null;
    this.availability = '';
    this.equipment = '';
    this.allergies = '';
    this.favoriteFoods = '';
    this.dislikedFoods = '';
    this.cooksAtHome = null;
    this.customAnswers = {};
  }

  public closeIntakeForm(): void {
    this.fillingTrainerId = null;
  }

  public submitIntake(): void {
    if (!this.fillingTrainerId || this.isSubmitting) return;

    const group = this.groups.find((g) => g.trainerId === this.fillingTrainerId);
    const customAnswers = (group?.customQuestions || []).map((q) => ({
      questionId: q.id,
      label: q.label,
      value: (this.customAnswers[q.id] || '').trim(),
    }));

    this.isSubmitting = true;
    this.intakeApi
      .submit({
        trainerId: this.fillingTrainerId,
        goals: this.goals.trim(),
        healthConditions: this.healthConditions.trim(),
        experienceLevel: this.experienceLevel,
        availability: this.availability.trim(),
        equipment: this.equipment.trim(),
        allergies: this.allergies.trim(),
        favoriteFoods: this.favoriteFoods.trim(),
        dislikedFoods: this.dislikedFoods.trim(),
        cooksAtHome: this.cooksAtHome,
        customAnswers,
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.fillingTrainerId = null;
          this.ionicUtilService.showToast({
            message: 'Cuestionario enviado. Tu profesional lo revisará en breve.',
            duration: 3500,
          });
          this.load();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || 'No se pudo enviar el cuestionario',
            'Error',
            3000
          );
        },
      });
  }

  public trackByTrainerId(_index: number, group: TrainerGroup): string {
    return group.trainerId;
  }

  public trackByQuestionId(_index: number, question: IntakeCustomQuestion): string {
    return question.id;
  }
}
