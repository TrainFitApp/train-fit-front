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

export interface BulkResult {
  upserted: number;
  modified: number;
  saved: number;
  skipped: { exerciseId: string | null; reason: string }[];
}

export interface SessionLoad {
  muscles: { name: string; load: number }[];
  joints: { name: string; load: number }[];
  // Ejercicios de la sesión que el entrenador todavía no ha puntuado. Se
  // dicen: un reparto que ignora media sesión en silencio parece completo.
  unscoredExercises: number;
  totalExercises: number;
  estimatedSeconds: number;
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

  // Puntuar 200 ejercicios de uno en uno es lo que hace que nadie lo haga
  // nunca. Las filas mal formadas se descartan y se cuentan, no tumban la
  // carga entera.
  public bulkSave(entries: Partial<ExerciseScore>[]): Observable<BulkResult> {
    return this.http.put<BulkResult>(`${ExerciseScoresApiService.ENDPOINT}/bulk`, { entries });
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
}
