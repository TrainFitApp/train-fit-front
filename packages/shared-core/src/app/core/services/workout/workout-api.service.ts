import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomExercise } from '../../models/customExercise';
import { Split } from '../../models/split';
import { Table } from '../../models/table';
import { Workout, WorkoutBlock } from '../../models/workout';
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

// rowWorkouts: el mismo entrenamiento en los demás microciclos, ya con el
// cambio de bloques aplicado (bloques por fila, 2026-09).
export type WorkoutWithRow = Workout & { rowWorkouts?: Workout[] };
// Reordenar ejercicios: rowWorkouts son SOLO las sesiones de la fila que el
// back reordenó (las que tenían los mismos ejercicios en el mismo orden).
export interface WorkoutsOrderResult {
  modifiedCount: number;
  rowWorkouts?: Workout[];
}

@Injectable()
export class WorkoutAPIService {
  private static readonly WORKOUT_ENDPOINT = 'workouts';

  constructor(private http: HttpService) {}

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

  // Planificador visual (Fase C) — copia un workout suelto a otra semana (o
  // a la misma, como "duplicar en el sitio"). Devuelve table.splits completo,
  // mismo contrato que el resto de altas de workout.
  public copyWorkoutToSplit(idWorkout: string, idSplit: string): Observable<Split[]> {
    return this.http.post<Split[]>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/${idWorkout}/copy-to-split/${idSplit}`,
      {}
    );
  }

  // Reordena las cards DENTRO de una sola columna.
  public reorderWorkoutsInSplit(idSplit: string, workoutIdsOrder: string[]): Observable<Split[]> {
    return this.http.put<Split[]>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/split/${idSplit}/order`,
      { workoutIdsOrder }
    );
  }

  // Rediseño de entrenamiento Fase B — reemplaza Workout.blocks[] completo.
  public updateWorkoutBlocks(
    workoutId: string,
    blocks: Partial<WorkoutBlock>[]
  ): Observable<WorkoutWithRow> {
    return this.http.put<WorkoutWithRow>(
      `${WorkoutAPIService.WORKOUT_ENDPOINT}/${workoutId}/blocks`,
      { blocks }
    );
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
  ): Observable<WorkoutsOrderResult> {
    return this.http.put<WorkoutsOrderResult>(
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
