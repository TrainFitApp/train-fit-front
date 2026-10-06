import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Exercise } from 'src/app/core/models/exercise';
import { Set } from 'src/app/core/models/set';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SearchFilterGroupExercises } from 'src/app/shared/models/filterGroup';

@Injectable()
export class ExerciseAPIService {
  private static readonly EXERCISE_ENDPOINT = 'exercises';

  constructor(private http: HttpService) {}

  public searchExercise(
    searchExercisesFilterGroup: SearchFilterGroupExercises
  ): Observable<Exercise[]> {
    // Do not send ownFilter for exercises; rely on userId + favFilter
    const { ownFilter, isCardio, ...restPayload } =
      (searchExercisesFilterGroup as any) || {};
    const payload: any = { ...restPayload };

    if (isCardio === true) {
      payload.isCardio = true;
    }

    return this.http.post<Exercise[]>(
      `${ExerciseAPIService.EXERCISE_ENDPOINT}/search?page=${searchExercisesFilterGroup.page}&limit=10`,
      payload
    );
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
