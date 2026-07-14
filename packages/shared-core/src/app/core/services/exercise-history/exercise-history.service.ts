import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Exercise } from '../../models/exercise';
import { Table } from '../../models/table';
import { TableService } from '../table/table.service';
import { parseTimeToSeconds } from 'src/app/shared/utils';

export interface HistoricalBestSet {
  weight: number;
  reps: number;
}

export type ExerciseHistoryType = 'strength' | 'cardio' | 'isometric';

export interface ExerciseHistoryStats {
  exerciseId: string | null;
  exerciseName: string;
  exerciseType: ExerciseHistoryType;
  bestSet: HistoricalBestSet | null; // fuerza
  maxWeightEver: number; // fuerza
  bestVelocityEver: number | null; // cardio — "mejor ritmo"
  bestTimeEver: string | null; // isométrico — display "M:SS"
  bestTimeSecondsEver: number; // isométrico — para comparar
}

const ALL_TABLES_LIMIT = 200;

@Injectable()
export class ExerciseHistoryService {
  private allTables$: Observable<Table[]> | null = null;
  private statsCache = new Map<string, ExerciseHistoryStats>();

  constructor(private tableService: TableService) {}

  // Carga (y cachea) todas las rutinas propias del usuario, pobladas por
  // completo. Compartida vía shareReplay(1): si Estadísticas y el
  // video-modal la piden en la misma sesión, solo hay 1 petición HTTP real.
  public loadAllTables(forceRefresh = false): Observable<Table[]> {
    if (!this.allTables$ || forceRefresh) {
      this.allTables$ = this.tableService
        .getAllOwnTables(ALL_TABLES_LIMIT)
        .pipe(shareReplay(1));
    }
    return this.allTables$;
  }

  public getStatsForExercise$(
    exerciseId: string | null,
    exerciseNameFallback: string
  ): Observable<ExerciseHistoryStats> {
    const cacheKey = exerciseId ?? `name:${exerciseNameFallback}`;
    const cached = this.statsCache.get(cacheKey);
    if (cached) return of(cached);

    return this.loadAllTables().pipe(
      map((tables) => {
        const stats = this.extractStats(tables, exerciseId, exerciseNameFallback);
        this.statsCache.set(cacheKey, stats);
        return stats;
      })
    );
  }

  // Llamar tras terminar/guardar un entrenamiento para que un PR reciente
  // se refleje sin esperar a recargar la app.
  public invalidateCache(): void {
    this.allTables$ = null;
    this.statsCache.clear();
  }

  // Cada set + cada entrada de dropSetSeries/restPauseSeries es su propia
  // candidata de volumen (peso x reps) para "mejor serie" — mismo criterio
  // que ya usa calculateVolumeWithSubSeries() en statistics.page.ts para el
  // volumen total de una sesión, aplicado aquí por candidata individual en
  // vez de como suma.
  private extractStats(
    tables: Table[],
    exerciseId: string | null,
    exerciseNameFallback: string
  ): ExerciseHistoryStats {
    let exerciseType: ExerciseHistoryType = 'strength';
    let typeKnown = false;
    let bestSet: HistoricalBestSet | null = null;
    let bestVolume = 0;
    let maxWeightEver = 0;
    let bestVelocityEver: number | null = null;
    let bestTimeEver: string | null = null;
    let bestTimeSecondsEver = 0;

    tables.forEach((table) => {
      table.splits?.forEach((split) => {
        split.workouts?.forEach((workout) => {
          if (!workout.date || workout.rest) return;

          workout.exercises?.forEach((customEx) => {
            if (
              !this.matchesExercise(
                customEx.exercise,
                exerciseId,
                exerciseNameFallback
              )
            ) {
              return;
            }

            if (!typeKnown) {
              if (customEx.exercise?.isIsometric) exerciseType = 'isometric';
              else if (customEx.exercise?.isCardio) exerciseType = 'cardio';
              else exerciseType = 'strength';
              typeKnown = true;
            }

            customEx.sets?.forEach((set) => {
              if (!set.doned) return;

              if (exerciseType === 'cardio') {
                const velocity = set.velocity || 0;
                if (bestVelocityEver === null || velocity > bestVelocityEver) {
                  bestVelocityEver = velocity;
                }
                return;
              }

              if (exerciseType === 'isometric') {
                const seconds = parseTimeToSeconds(set.time);
                if (seconds > bestTimeSecondsEver) {
                  bestTimeSecondsEver = seconds;
                  bestTimeEver = set.time ?? null;
                }
                return;
              }

              const candidates = [
                { weight: set.weight || 0, reps: set.reps || 0 },
                ...(set.dropSetSeries || []).map((s) => ({
                  weight: s.weight || 0,
                  reps: s.reps || 0,
                })),
                ...(set.restPauseSeries || []).map((s) => ({
                  weight: s.weight || 0,
                  reps: s.reps || 0,
                })),
              ];

              candidates.forEach((candidate) => {
                const volume = candidate.weight * candidate.reps;
                if (!bestSet || volume > bestVolume) {
                  bestSet = { weight: candidate.weight, reps: candidate.reps };
                  bestVolume = volume;
                }
                if (candidate.weight > maxWeightEver) {
                  maxWeightEver = candidate.weight;
                }
              });
            });
          });
        });
      });
    });

    return {
      exerciseId,
      exerciseName: exerciseNameFallback,
      exerciseType,
      bestSet,
      maxWeightEver,
      bestVelocityEver,
      bestTimeEver,
      bestTimeSecondsEver,
    };
  }

  // Empareja "el mismo ejercicio" por Exercise._id, con fallback a nombre
  // cuando no hay _id — mismo criterio que extractWorkouts() ya usa en
  // statistics.page.ts (comparación idMatches/nameMatches).
  private matchesExercise(
    exercise: Exercise | undefined,
    exerciseId: string | null,
    exerciseNameFallback: string
  ): boolean {
    if (exerciseId) {
      return exercise?._id === exerciseId;
    }
    return !exercise?._id && exercise?.name === exerciseNameFallback;
  }
}
