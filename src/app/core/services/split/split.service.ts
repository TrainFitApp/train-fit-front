import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Split } from '../../models/split';
import { Table } from '../../models/table';
import { SplitAPIService } from './split-api.service';

@Injectable()
export class SplitService {
  public _addOrDeleteSplitSlide$ = new Subject();

  constructor(private splitAPIService: SplitAPIService) {}

  public createSplit(split: Split): Observable<Split> {
    return this.splitAPIService.createSplit(split);
  }

  public createSplitAndAddToTable(tableInUseId: string): Observable<Table> {
    return this.splitAPIService.createSplitAndAddToTable(tableInUseId);
  }

  public addSplitToTable(
    idTable: string,
    idSplit?: string,
    withSets?: boolean
  ): Observable<Split> {
    return this.splitAPIService.addSplitToTable(idTable, idSplit, withSets);
  }

  public getSplitByIdAndDate(id: string, date: Date): Observable<Split> {
    return this.splitAPIService.getSplitByIdAndDate(id, date);
  }

  public addTableSplit(idTable: string, idSplit: string): Observable<any> {
    return this.splitAPIService.addSplitToTable(idTable, idSplit);
  }

  public arhiveSplit(idSplit: string, idUser: string) {
    return this.splitAPIService.arhiveSplit(idSplit, idUser);
  }

  public updateSplit(split: Split): Observable<any> {
    return this.splitAPIService.updateSplit(split);
  }

  public deleteSplit(idTable: string, idSplit: string): Observable<any> {
    return this.splitAPIService.deleteSplit(idTable, idSplit);
  }

  public getStandarSplit(): Split {
    const split = new Split();
    split.name = 'Split';
    split.workouts = [];
    return split;
  }
}
