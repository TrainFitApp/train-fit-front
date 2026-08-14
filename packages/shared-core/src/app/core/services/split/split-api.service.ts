import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Split } from '../../models/split';
import { Table } from '../../models/table';
import { HttpService } from '../http/http.service';

export interface DeleteSplitsResponse {
  deletedSplitIds: string[];
  clearedWorkoutInUse: boolean;
}

@Injectable()
export class SplitAPIService {
  private static readonly SPLIT_ENDPOINT = 'splits';

  constructor(private http: HttpService) {}

  public createSplit(split: Split): Observable<Split> {
    return this.http.post<Split>(`${SplitAPIService.SPLIT_ENDPOINT}`, split);
  }

  public createSplitAndAddToTable(tableInUseId: string): Observable<Table> {
    return this.http.post<Table>(
      `${SplitAPIService.SPLIT_ENDPOINT}/${tableInUseId}`,
      null
    );
  }

  public addSplitToTable(
    idTable: string,
    idSplit?: string,
    withSets?: boolean
  ): Observable<Split> {
    return this.http
      .put<Split>(`splits/add/to/table`, { idTable, idSplit, withSets })
      .pipe(take(1));
  }

  public getSplitByIdAndDate(id: string, date: Date): Observable<Split> {
    return this.http.post<Split>(
      `${SplitAPIService.SPLIT_ENDPOINT}/date/${id}`,
      { date }
    );
  }

  public addTableSplit(idTable: string, idSplit: string): Observable<any> {
    return this.http.put<Table>(
      `${SplitAPIService.SPLIT_ENDPOINT}/split/${idTable}/${idSplit}`,
      null
    );
  }

  // Planificador visual (Fase C) — engancha un Workout YA CREADO (standalone,
  // vía WorkoutAPIService.createWorkout) a UN split concreto. Backend ya
  // existía (addWorkoutsSplit, split-routes.js `PUT /:idSplit/:idWorkout`)
  // pero no tenía wrapper en el frontend — nada lo llamaba hasta ahora.
  public addWorkoutToSplit(idSplit: string, idWorkout: string): Observable<Split> {
    return this.http.put<Split>(
      `${SplitAPIService.SPLIT_ENDPOINT}/${idSplit}/${idWorkout}`,
      null
    );
  }

  // Bug preexistente arreglado: apuntaba a `splits` (sin :id) mientras el
  // backend expone `PUT /splits/:id` (split-routes.js) — no tenía ningún
  // caller real hasta el Planificador visual (Fase C), que es el primero en
  // usarlo de verdad (renombrar semana).
  public updateSplit(id: string, patch: Partial<Split>): Observable<any> {
    return this.http.put<Table>(`${SplitAPIService.SPLIT_ENDPOINT}/${id}`, patch);
  }

  public deleteSplit(idTable: string, idSplit: string): Observable<any> {
    return this.http.delete<any>(
      `${SplitAPIService.SPLIT_ENDPOINT}/${idTable}/${idSplit}`
    );
  }

  public deleteSplits(
    idTable: string,
    splitIds: string[]
  ): Observable<DeleteSplitsResponse> {
    return this.http.delete<DeleteSplitsResponse>(
      `${SplitAPIService.SPLIT_ENDPOINT}/${idTable}`,
      { body: { splitIds } }
    );
  }

  // Planificador visual (Fase C) — "Añadir semana" en blanco (a diferencia
  // de addSplitToTable, que siempre duplica un split existente).
  public createBlankSplitAndAddToTable(idTable: string, name?: string): Observable<Split[]> {
    return this.http.post<Split[]>(
      `${SplitAPIService.SPLIT_ENDPOINT}/blank/${idTable}`,
      { name }
    );
  }

  // Reordena las columnas (splits) dentro de una tabla.
  public reorderSplits(idTable: string, splitIdsOrder: string[]): Observable<Split[]> {
    return this.http.put<Split[]>(
      `${SplitAPIService.SPLIT_ENDPOINT}/rows/order/${idTable}`,
      { splitIdsOrder }
    );
  }
}
