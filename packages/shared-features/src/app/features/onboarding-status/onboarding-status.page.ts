import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IntakeFieldKey,
  OnboardingRelation,
  OnboardingService,
} from 'src/app/core/services/onboarding/onboarding.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { IntakeApiService, IntakeSubmission } from './services/intake-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

interface TrainerGroup {
  trainerId: string;
  trainerName: string;
  scopes: string[];
  needsIntake: boolean; // true si alguna relación sigue en cuestionario_pendiente
  enabledFields: Set<IntakeFieldKey>; // TASK-049 — campos activos del cuestionario de este trainer
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

  constructor(
    private router: Router,
    private onboardingService: OnboardingService,
    private intakeApi: IntakeApiService,
    private authService: AuthService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ionViewWillEnter(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.onboardingService.refresh().subscribe({
      next: (status) => {
        if (!status.blocked) {
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
        });
      }
      const group = byTrainer.get(relation.trainerId)!;
      group.scopes.push(relation.scope === 'training' ? 'Entrenamiento' : 'Nutrición');
      if (relation.status === 'cuestionario_pendiente') group.needsIntake = true;
    }
    return [...byTrainer.values()];
  }

  public openIntakeForm(group: TrainerGroup): void {
    this.fillingTrainerId = group.trainerId;
    this.goals = '';
    this.healthConditions = '';
    this.experienceLevel = null;
    this.availability = '';
    this.equipment = '';
    this.allergies = '';
    this.favoriteFoods = '';
    this.dislikedFoods = '';
    this.cooksAtHome = null;
  }

  public closeIntakeForm(): void {
    this.fillingTrainerId = null;
  }

  public submitIntake(): void {
    if (!this.fillingTrainerId || this.isSubmitting) return;

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

  public logout(): void {
    this.authService.logout();
  }

  public trackByTrainerId(_index: number, group: TrainerGroup): string {
    return group.trainerId;
  }
}
