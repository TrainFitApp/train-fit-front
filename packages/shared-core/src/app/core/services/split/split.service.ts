import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Split } from '../../models/split';
import {
  DeleteSplitsResponse,
  SplitAPIService,
} from './split-api.service';

@Injectable()
export class SplitService {
  public _addOrDeleteSplitSlide$ = new Subject();

  constructor(private splitAPIService: SplitAPIService) {}

  public addSplitToTable(
    idTable: string,
    idSplit?: string,
    withSets?: boolean
  ): Observable<Split> {
    return this.splitAPIService.addSplitToTable(idTable, idSplit, withSets);
  }

  public updateSplit(id: string, patch: Partial<Split>): Observable<any> {
    return this.splitAPIService.updateSplit(id, patch);
  }

  public deleteSplit(idTable: string, idSplit: string): Observable<any> {
    return this.splitAPIService.deleteSplit(idTable, idSplit);
  }

  public deleteSplits(
    idTable: string,
    splitIds: string[]
  ): Observable<DeleteSplitsResponse> {
    return this.splitAPIService.deleteSplits(idTable, splitIds);
  }

  public createBlankSplitAndAddToTable(idTable: string, name?: string): Observable<Split[]> {
    return this.splitAPIService.createBlankSplitAndAddToTable(idTable, name);
  }

  public reorderSplits(idTable: string, splitIdsOrder: string[]): Observable<Split[]> {
    return this.splitAPIService.reorderSplits(idTable, splitIdsOrder);
  }

  public getStandarSplit(): Split {
    const split = new Split();
    split.name = 'Split';
    split.workouts = [];
    return split;
  }
}
