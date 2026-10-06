import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { Exercise } from 'src/app/core/models/exercise';
import { Set } from 'src/app/core/models/set';
import { ExerciseAPIService } from './exercise-api.service';
import { SearchFilterGroupExercises } from 'src/app/shared/models/filterGroup';

@Injectable()
export class ExerciseService {
  private _exercises$: BehaviorSubject<Exercise[]> = new BehaviorSubject<
    Exercise[]
  >([]);

  public get getExercises(): Observable<Exercise[]> {
    return this._exercises$.asObservable();
  }

  public set setExercises(exercises: Exercise[]) {
    this._exercises$.next(exercises);
  }

  constructor(private exerciseAPIService: ExerciseAPIService) {}

  public searchExercise(
    searchFilterGroupExercises: SearchFilterGroupExercises
  ): Observable<Exercise[]> {
    return this.exerciseAPIService.searchExercise(searchFilterGroupExercises);
  }

  public createExercise(exerciseData: Partial<Exercise>): Observable<Exercise> {
    return this.exerciseAPIService.createExercise(exerciseData);
  }

  public updateExercise(
    idExercise: string,
    exerciseData: Partial<Exercise>
  ): Observable<Exercise> {
    return this.exerciseAPIService
      .updateExercise(idExercise, exerciseData)
      .pipe(
        tap((updatedExercise) => {
          const currentExercises = this._exercises$.getValue();
          if (!currentExercises?.length) {
            return;
          }

          const exerciseIndex = currentExercises.findIndex(
            (exercise) => exercise._id === idExercise
          );

          if (exerciseIndex === -1) {
            return;
          }

          const mergedExercise: Exercise = {
            ...currentExercises[exerciseIndex],
            ...exerciseData,
            ...(updatedExercise || {}),
            _id: currentExercises[exerciseIndex]._id || idExercise,
          };

          if (!(updatedExercise as any)?.isCardio && !exerciseData?.isCardio) {
            delete (mergedExercise as any).isCardio;
          }

          const nextExercises = [...currentExercises];
          nextExercises[exerciseIndex] = mergedExercise;
          this._exercises$.next(nextExercises);
        })
      );
  }

  public deleteExercise(idExercise: string): Observable<any> {
    return this.exerciseAPIService.deleteExercise(idExercise);
  }
}
