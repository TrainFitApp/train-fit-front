import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import {
  TrainerAnthropometry,
  TrainerClientApiService,
  TrainerClientSummary,
  TrainerDietDay,
  TrainerNutritionalGoal,
  TrainerRoutine,
  TrainerScope,
  TrainerWorkout,
} from '../../services/trainer-client-api.service';

@Component({
  selector: 'app-trainer-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
})
export class TrainerClientDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(TrainerClientApiService);

  public readonly clientId = this.route.snapshot.paramMap.get('clientId') || '';
  public client: TrainerClientSummary | null = null;
  public selectedScope: TrainerScope = 'training';
  public selectedDate = this.localDate(new Date());
  public activeRoutine: TrainerRoutine | null = null;
  public workoutHistory: TrainerWorkout[] = [];
  public anthropometries: TrainerAnthropometry[] = [];
  public dietDay: TrainerDietDay | null = null;
  public activeGoal: TrainerNutritionalGoal | null = null;
  public loading = true;
  public dietLoading = false;
  public error = false;

  public ionViewWillEnter(): void {
    this.loadClient();
  }

  public get hasTraining(): boolean {
    return this.client?.scopes.includes('training') ?? false;
  }

  public get hasNutrition(): boolean {
    return this.client?.scopes.includes('nutrition') ?? false;
  }

  public get latestWeight(): TrainerAnthropometry | null {
    return this.anthropometries.find((item) => item.weight != null) || null;
  }

  public get routineStats(): { splits: number; workouts: number; exercises: number } {
    const splits = this.activeRoutine?.splits || [];
    const workouts = splits.flatMap((split) => split.workouts || []);
    return {
      splits: splits.length,
      workouts: workouts.length,
      exercises: workouts.reduce((total, workout) => total + (workout.exercises?.length || 0), 0),
    };
  }

  public selectScope(scope: TrainerScope): void {
    this.selectedScope = scope;
  }

  public changeDate(value: string): void {
    if (!value || value === this.selectedDate || !this.hasNutrition) return;
    this.selectedDate = value;
    this.loadDiet();
  }

  public shiftDate(days: number): void {
    const date = new Date(`${this.selectedDate}T12:00:00`);
    date.setDate(date.getDate() + days);
    this.selectedDate = this.localDate(date);
    this.loadDiet();
  }

  public retry(): void {
    this.loadClient();
  }

  public completedSets(workout: TrainerWorkout): number {
    return (workout.exercises || []).reduce(
      (total, exercise) => total + (exercise.sets || []).filter((set) => set.doned).length,
      0
    );
  }

  public duration(workout: TrainerWorkout): string {
    let seconds = Number(workout.cronometer || 0);
    if (!seconds && workout.startedAt && workout.date) {
      seconds = Math.max(
        0,
        Math.round((new Date(workout.date).getTime() - new Date(workout.startedAt).getTime()) / 1000)
      );
    }
    if (!seconds) return '-';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours ? `${hours}h ${minutes}min` : `${minutes}min`;
  }

  private loadClient(): void {
    if (!this.clientId) {
      void this.router.navigate(['/tabs/clients'], { replaceUrl: true });
      return;
    }

    this.loading = true;
    this.error = false;
    this.api
      .getClients()
      .pipe(
        switchMap((clients) => {
          this.client = clients.find((item) => item.user?._id === this.clientId) || null;
          if (!this.client) throw new Error('CLIENT_NOT_FOUND');

          this.selectedScope = this.client.scopes.includes('training') ? 'training' : 'nutrition';
          return forkJoin({
            tables: this.hasTraining ? this.api.getClientTables(this.clientId) : of(null),
            history: this.hasTraining ? this.api.getClientWorkoutHistory(this.clientId) : of([]),
            anthropometries: this.api.getClientAnthropometries(this.clientId),
            diet: this.hasNutrition
              ? this.api.getClientDiet(this.clientId, this.selectedDate)
              : of(null),
            goals: this.hasNutrition
              ? this.api.getClientNutritionalGoals(this.clientId)
              : of(null),
          });
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: ({ tables, history, anthropometries, diet, goals }) => {
          this.anthropometries = anthropometries;
          this.workoutHistory = history;
          this.dietDay = diet?.dietDay || null;
          this.activeRoutine = tables?.activeTable || null;
          this.activeGoal =
            goals?.goals.find((goal) => goal._id === String(goals.goalInUse)) || null;
        },
        error: () => (this.error = true),
      });
  }

  private loadDiet(): void {
    if (!this.hasNutrition || this.dietLoading) return;
    this.dietLoading = true;
    this.api
      .getClientDiet(this.clientId, this.selectedDate)
      .pipe(finalize(() => (this.dietLoading = false)))
      .subscribe({
        next: ({ dietDay }) => (this.dietDay = dietDay),
        error: () => (this.error = true),
      });
  }

  private localDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
