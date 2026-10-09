import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise, ExerciseSearchPage } from 'src/app/core/models/exercise';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SearchFilterGroupExercises } from 'src/app/shared/models/filterGroup';

@Injectable()
export class ExerciseAPIService {
  private static readonly EXERCISE_ENDPOINT = 'exercises';

  constructor(private http: HttpService) {}

  public searchExercise(
    searchExercisesFilterGroup: SearchFilterGroupExercises
  ): Observable<Exercise[]> {
    return this.http.post<Exercise[]>(
      `${ExerciseAPIService.EXERCISE_ENDPOINT}/search?page=${searchExercisesFilterGroup.page}&limit=10`,
      this.toSearchPayload(searchExercisesFilterGroup)
    );
  }

  // Misma búsqueda con el total de coincidencias y si quedan más páginas
  // (withTotal=1). La página va aparte del filtro para que una respuesta
  // tardía no dependa de cómo esté el filtro cuando llega.
  public searchExercisePage(
    searchExercisesFilterGroup: SearchFilterGroupExercises,
    page: number,
    limit: number
  ): Observable<ExerciseSearchPage> {
    return this.http.post<ExerciseSearchPage>(
      `${ExerciseAPIService.EXERCISE_ENDPOINT}/search?page=${page}&limit=${limit}&withTotal=1`,
      this.toSearchPayload(searchExercisesFilterGroup)
    );
  }

  private toSearchPayload(searchExercisesFilterGroup: SearchFilterGroupExercises): any {
    // Do not send ownFilter for exercises; rely on userId + favFilter
    const { ownFilter, isCardio, page, ...restPayload } =
      (searchExercisesFilterGroup as any) || {};
    const payload: any = { ...restPayload };

    if (isCardio === true) {
      payload.isCardio = true;
    }

    return payload;
  }

  public createExercise(exerciseData: Partial<Exercise>): Observable<Exercise> {
    return this.http.post<Exercise>(
      `${ExerciseAPIService.EXERCISE_ENDPOINT}`,
      exerciseData
    );
  }

  public updateExercise(
    idExercise: string,
    exerciseData: Partial<Exercise>
  ): Observable<Exercise> {
    return this.http.patch<Exercise>(
      `${ExerciseAPIService.EXERCISE_ENDPOINT}/${idExercise}`,
      exerciseData
    );
  }

  public deleteExercise(idExercise: string): Observable<any> {
    return this.http.delete<any>(
      `${ExerciseAPIService.EXERCISE_ENDPOINT}/${idExercise}`
    );
  }
}
