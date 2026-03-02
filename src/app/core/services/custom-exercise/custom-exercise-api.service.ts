import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CustomExercise } from '../../models/customExercise';
import { HttpService } from '../http/http.service';
import { Set } from 'src/app/core/models/set';

@Injectable()
export class CustomExerciseAPIService {
  public static readonly CUSTOM_EXERCISE_ENDPOINT = 'customexercises';

  constructor(private http: HttpService) {}

  public updateCustomExercise(
    customExercise: CustomExercise,
    setsToCreate: Set[],
    setsToUpdate: Set[],
    setsToDelete: string[]
  ): Observable<CustomExercise> {
    return this.http.put<CustomExercise>(
      `${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}`,
      { customExercise, setsToCreate, setsToUpdate, setsToDelete }
    );
  }

  public copySetOnCustomExercise(
    order: number,
    set: CustomExercise
  ): Observable<CustomExercise> {
    return this.http.put<CustomExercise>(
      `${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/copy/${order}`,
      set
    );
  }

  public addSetToCustomExercise(
    id: string,
    set: Set
  ): Observable<CustomExercise> {
    return this.http.put<CustomExercise>(
      `${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/${id}`,
      set
    );
  }

  public deleteCustomExercise(id: string): Observable<any> {
    return this.http.delete<CustomExercise>(
      `${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/${id}`
    );
  }

  public deleteCustomExercises(exercisesIds: string[]): Observable<any> {
    return this.http
      .post<any>(
        `${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/delete/multiple`,
        exercisesIds
      )
      .pipe(take(1));
  }
}
