import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, take } from 'rxjs';
import { CustomExercise } from '../../models/customExercise';
import { Split } from '../../models/split';
import { Workout } from '../../models/workout';
import { WorkoutAPIService } from './workout-api.service';
import { FinishWorkoutResponse, SkipWorkoutResponse } from './workout-api.service';
import { Exercise } from '../../models/exercise';
import { Table } from '../../models/table';

@Injectable()
export class WorkoutService {
  private workoutClipboard: Workout;

  // Signal para el workout actual
  private readonly _currentWorkout: WritableSignal<Workout | null> =
    signal<Workout | null>(null);

  // Signal de solo lectura
  public readonly currentWorkoutSignal = computed(() => this._currentWorkout());

  // Observable para compatibilidad con código existente
  public readonly getCurrentWorkout = toObservable(this._currentWorkout);

  public get getWorkoutClipboard() {
    return this.workoutClipboard;
  }

  public set setWorkoutClipboard(workoutClipboard: Workout) {
    this.workoutClipboard = workoutClipboard;
  }

  // Getter sincrónico para acceso directo al valor
  public get currentWorkout(): Workout | null {
    return this._currentWorkout();
  }

  // Setter para actualizar el workout
  public set setCurrentWorkout(workout: Workout | null) {
    if (!workout) {
      this._currentWorkout.set(null);
      return;
    }
    this._currentWorkout.set({ ...workout });
  }

  constructor(private workoutAPIService: WorkoutAPIService) {}

  public createWorkout(workout: Workout): Observable<Workout> {
    return this.workoutAPIService.createWorkout(workout);
  }

  public addWorkoutsToSplits(
    idTable: string,
    workouts: Workout | Workout[]
  ): Observable<Split[]> {
    return this.workoutAPIService.addWorkoutsToSplits(idTable, workouts);
  }

  public duplicateWorkoutRow(
    idTable: string,
    idWorkout: string,
    nameSuffix: string
  ): Observable<Split[]> {
    return this.workoutAPIService
      .duplicateWorkoutRow(idTable, idWorkout, nameSuffix)
      .pipe(take(1));
  }

  public reorderWorkoutRows(
    idTable: string,
    workoutIdsOrder: string[]
  ): Observable<Split[]> {
    return this.workoutAPIService
      .reorderWorkoutRows(idTable, workoutIdsOrder)
      .pipe(take(1));
  }

  public addExerciseToWorkouts(
    workoutIds: string[],
    exerciseId: string
  ): Observable<any[]> {
    return this.workoutAPIService.addExerciseToWorkouts(workoutIds, exerciseId);
  }

  public getWorkoutById(id: string): Observable<Workout> {
    return this.workoutAPIService.getWorkoutById(id).pipe(take(1));
  }

  public getWorkoutByIdAndDate(id: string, date: Date): Observable<Workout> {
    return this.workoutAPIService.getWorkoutByIdAndDate(id, date);
  }

  public pasteWorkout(workouts: any): Observable<Workout> {
    return this.workoutAPIService.pasteWorkout(workouts);
  }

  public modifyWorkout(workout: Workout): Observable<Workout> {
    return this.workoutAPIService.modifyWorkout(workout).pipe(take(1));
  }

  // Limpia el startedAt de un workout que quedó "en curso" sin querer (Stop,
  // o abandonado en silencio al empezar otro) para que el cronómetro no siga
  // contando desde un timestamp viejo cuando se retome.
  public clearStartedAt(workout: Workout): Observable<Workout> {
    return this.modifyWorkout({ ...workout, startedAt: null });
  }

  // Workout previamente en curso (previousWorkoutId) que quedaría "colgado"
  // (startedAt sin date) si se empieza uno distinto sin resolverlo antes.
  public getDanglingWorkout(
    previousWorkoutId: string | undefined,
    newWorkoutId: string,
    table: Table | undefined
  ): Workout | undefined {
    if (!previousWorkoutId || previousWorkoutId === newWorkoutId) return undefined;

    const danglingWorkout = table?.splits
      ?.flatMap((split) => split.workouts)
      .find((workoutTemp) => workoutTemp._id === previousWorkoutId);

    return danglingWorkout?.startedAt && !danglingWorkout.date
      ? danglingWorkout
      : undefined;
  }

  public hasProgress(workout: Workout): boolean {
    return !!workout.exercises?.some((exercise) =>
      exercise.sets?.some((set) => set.doned)
    );
  }

  public finishWorkout(
    workoutId: string,
    date: Date
  ): Observable<FinishWorkoutResponse> {
    return this.workoutAPIService.finishWorkout(workoutId, date).pipe(take(1));
  }

  public skipWorkout(
    workoutId: string,
    rest: boolean
  ): Observable<SkipWorkoutResponse> {
    return this.workoutAPIService.skipWorkout(workoutId, rest).pipe(take(1));
  }

  public updateWorkout(
    workout: Workout,
    customExercise: CustomExercise
  ): Observable<Workout> {
    return this.workoutAPIService.updateWorkout(workout, customExercise);
  }

  public updateCustomExercises(
    idTable: string,
    idWorkout: string,
    idCustomExercise: string,
    idExercise: string
  ): Observable<Table> {
    return this.workoutAPIService.updateCustomExercises(
      idTable,
      idWorkout,
      idCustomExercise,
      idExercise
    );
  }

  public updateWorkoutsOrder(
    idWorkout: string,
    idTable: string,
    indexReorderedCustomExercises: number[]
  ): Observable<Table> {
    return this.workoutAPIService.updateWorkoutsOrder(
      idWorkout,
      idTable,
      indexReorderedCustomExercises
    );
  }

  public updateWorkoutsName(
    idTable: string,
    idWorkout: string,
    workoutsName: string
  ): Observable<string> {
    return this.workoutAPIService.updateWorkoutsName(
      idTable,
      idWorkout,
      workoutsName
    );
  }

  public deleteWorkout(id: string): Observable<Workout> {
    return this.workoutAPIService.deleteWorkout(id);
  }

  public deleteWorkoutCustomExercises(id: string): Observable<Workout> {
    return this.workoutAPIService
      .deleteWorkoutCustomExercises(id)
      .pipe(take(1));
  }

  public deleteWorkouts(workouts: Workout[]): Observable<Workout[]> {
    return this.workoutAPIService.deleteWorkouts(workouts).pipe(take(1));
  }

  public getStandarWorkout() {
    const workout = new Workout();
    workout.name = 'Entrenamiento';
    workout.exercises = [];
    return workout;
  }

  public addDataExerciseToWorkout(
    workoutId: string,
    dataExerciseData: any
  ): Observable<Workout> {
    return this.workoutAPIService.addDataExerciseToWorkout(
      workoutId,
      dataExerciseData
    );
  }
}
