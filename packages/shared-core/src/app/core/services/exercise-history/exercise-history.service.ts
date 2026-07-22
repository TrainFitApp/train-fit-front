import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

export interface HistoricalBestSet {
  weight: number;
  reps: number;
}

export type ExerciseHistoryType = 'strength' | 'cardio' | 'isometric';

export interface ExerciseHistoryStats {
  exerciseId: string | null;
  exerciseName: string;
  exerciseType: ExerciseHistoryType;
  bestSet: HistoricalBestSet | null;
  maxWeightEver: number;
  bestVelocityEver: number | null;
  bestTimeEver: string | null;
  bestTimeSecondsEver: number;
}

@Injectable()
export class ExerciseHistoryService {
  private statsCache = new Map<string, ExerciseHistoryStats>();

  constructor(private http: HttpService) {}

  public getStatsForExercise$(
    exerciseId: string | null,
    exerciseNameFallback: string
  ): Observable<ExerciseHistoryStats> {
    const cacheKey = exerciseId ?? `name:${exerciseNameFallback}`;
    const cached = this.statsCache.get(cacheKey);
    if (cached) return of(cached);

    const params = new URLSearchParams();
    if (exerciseId) params.set('exerciseId', exerciseId);
    else params.set('exerciseName', exerciseNameFallback);

    return this.http
      .get<ExerciseHistoryStats>(`tables/exercise-history/stats?${params}`)
      .pipe(
        tap((stats) => this.statsCache.set(cacheKey, stats)),
        shareReplay(1)
      );
  }

  public invalidateCache(): void {
    this.statsCache.clear();
  }
}
