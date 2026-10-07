import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ExerciseScore } from 'src/app/core/constants/exercise-score';

export interface ScoreCatalog {
  muscles: string[];
  joints: string[];
  min: number;
  max: number;
  muscleAnchors: string[];
  jointAnchors: string[];
}

export interface SessionLoad {
  muscles: { name: string; load: number }[];
  joints: { name: string; load: number }[];
  // Ejercicios de la sesión que el entrenador todavía no ha puntuado. Se
  // dicen: un reparto que ignora media sesión en silencio parece completo.
  unscoredExercises: number;
  totalExercises: number;
  // Ejercicios sin puntuación guardada que cuentan con la sugerencia por
  // defecto (exercise-score-defaults.js en el back).
  suggestedExercises?: number;
  // Solo en la carga de UNA sesión (no en la del microciclo).
  estimatedSeconds?: number;
}

@Injectable({ providedIn: 'root' })
export class ExerciseScoresApiService {
  private static readonly ENDPOINT = 'trainer/exercise-scores';

  constructor(private http: HttpService) {}

  // El vocabulario lo decide el backend, igual que el de reglas y el de
  // dolor: así es imposible ofrecer un músculo que el validador no conoce.
  public getCatalog(): Observable<ScoreCatalog> {
    return this.http.get<ScoreCatalog>(`${ExerciseScoresApiService.ENDPOINT}/catalog`);
  }

  public getMine(): Observable<ExerciseScore[]> {
    return this.http.get<ExerciseScore[]>(ExerciseScoresApiService.ENDPOINT);
  }

  public save(exerciseId: string, score: Partial<ExerciseScore>): Observable<ExerciseScore> {
    return this.http.put<ExerciseScore>(
      `${ExerciseScoresApiService.ENDPOINT}/${exerciseId}`,
      score
    );
  }

  public remove(exerciseId: string): Observable<void> {
    return this.http.delete<void>(`${ExerciseScoresApiService.ENDPOINT}/${exerciseId}`);
  }

  // 2026-09 — sugerencia inicial por patrón de movimiento (ver
  // exercise-score-defaults.js en el backend, fuente única de la
  // biblioteca) para cuando el entrenador todavía no ha puntuado ESTE
  // ejercicio. `null` = ningún patrón conocido encaja, el editor arranca
  // vacío como hasta ahora.
  public getDefault(
    exerciseId: string
  ): Observable<Pick<ExerciseScore, 'muscleScores' | 'jointScores'> | null> {
    return this.http.get<Pick<ExerciseScore, 'muscleScores' | 'jointScores'> | null>(
      `${ExerciseScoresApiService.ENDPOINT}/default/${exerciseId}`
    );
  }

  // El reparto de UNA sesión, para el panel del planificador. Se calcula en
  // el backend porque necesita las puntuaciones del entrenador, y bajarse
  // las 200 del catálogo para sumar las 6 de la sesión abierta sería mover
  // mucho para calcular poco.
  public getSessionLoad(workoutId: string): Observable<SessionLoad> {
    return this.http.get<SessionLoad>(
      `${ExerciseScoresApiService.ENDPOINT}/session/${workoutId}`
    );
  }

  // Lo mismo sumado sobre un microciclo entero (pestaña Semana).
  public getSplitLoad(splitId: string): Observable<SessionLoad> {
    return this.http.get<SessionLoad>(
      `${ExerciseScoresApiService.ENDPOINT}/split/${splitId}`
    );
  }
}
