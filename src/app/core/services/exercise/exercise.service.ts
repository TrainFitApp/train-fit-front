import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  public archiveExercise(idExercise: string, idUser: string): Observable<any> {
    return this.exerciseAPIService.archiveExercise(idExercise, idUser);
  }

  public addExerciseToFavorites(
    idExercise: string,
    idUser: string
  ): Observable<{ isFavorite: boolean; message?: string }> {
    return this.exerciseAPIService.addExerciseToFavorites(idExercise, idUser);
  }

  public getCombinedMuscularGroups(exercise: Exercise) {
    return [...exercise.muscleGroups1, ...exercise.muscleGroups2];
  }

  public createExercise(exerciseData: Partial<Exercise>): Observable<Exercise> {
    return this.exerciseAPIService.createExercise(exerciseData);
  }

  public deleteExercise(idExercise: string): Observable<any> {
    return this.exerciseAPIService.deleteExercise(idExercise);
  }
}
