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

  // TASK-020 (MASTER_BACKLOG.md) — clientId opcional: cuando se llama desde
  // el contexto trainer (StatisticsPage detecta :clientId en la ruta), pega
  // al endpoint YA EXISTENTE y autorizado `GET /trainer/clients/:clientId/
  // workouts/history` (mismo `tableModel.getExerciseHistoryStats` por debajo,
  // mismo shape de respuesta) en vez del endpoint self-service — así se
  // consulta el histórico del CLIENTE, no el del propio entrenador logueado.
  public getStatsForExercise$(
    exerciseId: string | null,
    exerciseNameFallback: string,
    clientId?: string | null
  ): Observable<ExerciseHistoryStats> {
    const cacheKey = `${clientId || 'self'}:${exerciseId ?? `name:${exerciseNameFallback}`}`;
    const cached = this.statsCache.get(cacheKey);
    if (cached) return of(cached);

    const params = new URLSearchParams();
    if (exerciseId) params.set('exerciseId', exerciseId);
    else params.set('exerciseName', exerciseNameFallback);

    const url = clientId
      ? `trainer/clients/${clientId}/workouts/history?${params}`
      : `tables/exercise-history/stats?${params}`;

    return this.http.get<ExerciseHistoryStats>(url).pipe(
      tap((stats) => this.statsCache.set(cacheKey, stats)),
      shareReplay(1)
    );
  }

  public invalidateCache(): void {
    this.statsCache.clear();
  }
}
