import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { NutritionalGoal } from '../../models/nutritional-goal';
import { NutritionalGoalApiService } from './nutritional-goal-api.service';
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
      tap((goal) => this._goals.update((list) => [goal, ...list])),
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

  delete(id: string): Observable<void> {
    return this.api.delete(id).pipe(
      tap(() =>
        this._goals.update((list) => list.filter((g) => g._id !== id)),
      ),
    );
  }

  setActive(goalId: string): void {
    const user = this.userService.getLocalUser;
    if (!user) return;
    user.goalInUse = goalId;
    this.userService.setLocalUser = user;
  }

  refreshFromServer(): Observable<NutritionalGoal[]> {
    return this.api.getAll().pipe(
      tap((goals) => this._goals.set(goals)),
    );
  }
}
