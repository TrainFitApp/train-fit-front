import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Split } from '../../models/split';
import { Table } from '../../models/table';
import { HttpService } from '../http/http.service';

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

  public updateSplit(split: Split): Observable<any> {
    return this.http.put<Table>(`${SplitAPIService.SPLIT_ENDPOINT}`, split);
  }

  public deleteSplit(idTable: string, idSplit: string): Observable<any> {
    return this.http.delete<any>(
      `${SplitAPIService.SPLIT_ENDPOINT}/${idTable}/${idSplit}`
    );
  }
}
