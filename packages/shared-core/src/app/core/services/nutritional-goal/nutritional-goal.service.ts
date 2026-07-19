import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { NutritionalGoal } from '../../models/nutritional-goal';
import {
  NutritionalGoalActivationResponse,
  NutritionalGoalApiService,
  NutritionalGoalDeleteResponse,
} from './nutritional-goal-api.service';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NutritionalGoalService {
  private readonly _goals: WritableSignal<NutritionalGoal[]> = signal([]);
  public readonly goals = computed(() => this._goals());

  constructor(
    private api: NutritionalGoalApiService,
    private userService: UserService,
  ) {}

  loadGoals(): Observable<NutritionalGoal[]> {
    return this.api.getAll().pipe(
      tap((goals) => this._goals.set(goals)),
    );
  }

  get activeGoal(): NutritionalGoal | null {
    const user = this.userService.getLocalUser;
    if (!user?.goalInUse) return null;
    return this._goals().find((g) => g._id === user.goalInUse) || null;
  }

  getGoalById(id: string): NutritionalGoal | undefined {
    return this._goals().find((g) => g._id === id);
  }

  create(data: Partial<NutritionalGoal>): Observable<NutritionalGoal> {
    return this.api.create(data).pipe(
      tap((goal) => {
        this._goals.update((list) => [goal, ...list]);
        const user = this.userService.getLocalUser;
        if (user && !user.goalInUse) {
          this.userService.setLocalUser = { ...user, goalInUse: goal._id };
        }
      }),
    );
  }

  update(id: string, data: Partial<NutritionalGoal>): Observable<NutritionalGoal> {
    return this.api.update(id, data).pipe(
      tap((updated) =>
        this._goals.update((list) =>
          list.map((g) => (g._id === id ? updated : g)),
        ),
      ),
    );
  }

  delete(id: string): Observable<NutritionalGoalDeleteResponse> {
    return this.api.delete(id).pipe(
      tap((response) => {
        this._goals.update((list) => list.filter((g) => g._id !== id));
        const user = this.userService.getLocalUser;
        if (user) {
          this.userService.setLocalUser = {
            ...user,
            goalInUse: response?.goalInUse || undefined,
          };
        }
      }),
    );
  }

  setActive(goalId: string): Observable<NutritionalGoalActivationResponse> {
    return this.api.activate(goalId).pipe(
      tap((response) => {
        const user = this.userService.getLocalUser;
        if (!user) return;
        this.userService.setLocalUser = {
          ...user,
          goalInUse: response.goalInUse,
        };
      }),
    );
  }

  refreshFromServer(): Observable<NutritionalGoal[]> {
    return this.api.getAll().pipe(
      tap((goals) => this._goals.set(goals)),
    );
  }
}
