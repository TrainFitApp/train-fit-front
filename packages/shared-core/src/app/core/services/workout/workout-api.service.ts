import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomExercise } from '../../models/customExercise';
import { Split } from '../../models/split';
import { Table } from '../../models/table';
import { Workout } from '../../models/workout';
import { HttpService } from '../http/http.service';
import { Exercise } from '../../models/exercise';

export interface FinishWorkoutResponse {
  workout: Workout;
  userUpdated: boolean;
}

export interface SkipWorkoutResponse {
  workout: Workout;
  userUpdated: boolean;
}

@Injectable()
export class WorkoutAPIService {
  private static readonly WORKOUT_ENDPOINT = 'workouts';

  constructor(private http: HttpService) {}

  public createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}`,
      workout
    );
  }

  public addWorkoutsToSplits(
    idTable: string,
    workouts: Workout | Workout[]
  ): Observable<Split[]> {
    const body = Array.isArray(workouts) ? workouts : [workouts];
    return this.http.post<Split[]>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/multiple/${idTable}`,
      body
    );
  }

  public duplicateWorkoutRow(
    idTable: string,
    idWorkout: string,
    nameSuffix: string
  ): Observable<Split[]> {
    return this.http.post<Split[]>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/duplicate-row/${idTable}/${idWorkout}`,
      { nameSuffix }
    );
  }

  public reorderWorkoutRows(
    idTable: string,
    workoutIdsOrder: string[]
  ): Observable<Split[]> {
    return this.http.put<Split[]>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/rows/order/${idTable}`,
      { workoutIdsOrder }
    );
  }

  public addExerciseToWorkouts(
    workoutIds: string[],
    exerciseId: string
  ): Observable<any[]> {
    return this.http.post<any[]>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/multiple/exercises`,
      { workoutIds, exerciseId }
    );
  }

  public getWorkoutById(id: string): Observable<Workout> {
    return this.http.get<Workout>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/${id}`
    );
  }

  public getWorkoutByIdAndDate(id: string, date: Date): Observable<Workout> {
    return this.http.post<Workout>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/date/${id}`,
      { date }
    );
  }

  public pasteWorkout(workouts: any): Observable<Workout> {
    return this.http.put<Workout>(`workouts/paste`, workouts);
  }

  public pasteExercises(
    tableId: string,
    sourceWorkoutId: string,
    targetWorkoutId: string,
    exercises: CustomExercise[]
  ): Observable<any> {
    return this.http.put<any>(`workouts/paste-exercises`, {
      tableId,
      sourceWorkoutId,
      targetWorkoutId,
      exercises,
    });
  }

  public modifyWorkout(workout: Workout): Observable<Workout> {
    return this.http.put<Workout>(`workouts/modify/one/simple/save`, workout);
  }

  public finishWorkout(
    workoutId: string,
    date: Date
  ): Observable<FinishWorkoutResponse> {
    return this.http.put<FinishWorkoutResponse>(`workouts/finish`, {
      workoutId,
      date,
    });
  }

  public skipWorkout(
    workoutId: string,
    rest: boolean
  ): Observable<SkipWorkoutResponse> {
    return this.http.put<SkipWorkoutResponse>(`workouts/skip`, {
      workoutId,
      rest,
    });
  }

  public updateWorkout(
    workout: Workout,
    customExercise: CustomExercise
  ): Observable<Workout> {
    return this.http.put<Workout>(`workouts`, { workout, customExercise });
  }

  public updateCustomExercises(
    idTable: string,
    idWorkout: string,
    idCustomExercise: string,
    idExercise: string
  ): Observable<Table> {
    return this.http.put<CustomExercise>(
      `workouts/${idTable}/${idWorkout}/${idCustomExercise}/${idExercise}`,
      null
    );
  }

  public updateWorkoutsOrder(
    idWorkout: string,
    idTable: string,
    indexReorderedCustomExercises: number[]
  ): Observable<Table> {
    return this.http.put<Workout>(
      `workouts/${idWorkout}/${idTable}`,
      indexReorderedCustomExercises
    );
  }

  public updateWorkoutsName(
    idTable: string,
    idWorkout: string,
    workoutsName: string
  ): Observable<string> {
    return this.http.put<Workout>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/names/${idTable}/${idWorkout}`,
      { workoutsName: workoutsName }
    );
  }

  public deleteWorkout(id: string): Observable<Workout> {
    return this.http.delete<Workout>(`workouts/delete/${id}`);
  }

  public deleteWorkoutCustomExercises(id: string): Observable<Workout> {
    return this.http.delete<Workout>(`workouts/all/deletes/${id}`);
  }

  public deleteWorkouts(workouts: Workout[]): Observable<Workout[]> {
    return this.http.put<Workout[]>(`workouts/deletes`, workouts);
  }

  public addDataExerciseToWorkout(
    workoutId: string,
    dataExerciseData: any
  ): Observable<Workout> {
    return this.http.post<Workout>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/add-data-exercise/${workoutId}`,
      dataExerciseData
    );
  }
}
