import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Set } from '../../models/set';
import { SetAPIService } from './set-api.service';

@Injectable()
export class SetService {
  constructor(private setAPIService: SetAPIService) {}

  public createSet(set: Set): Observable<Set> {
    return this.setAPIService.createSet(set);
  }

  public createSets(sets: Set[]): Observable<Set[]> {
    return this.setAPIService.createSets(sets);
  }

  public updateSet(set: Set): Observable<Set> {
    if (set.rir === -1) {
      set.rir = -1;
    }

    return this.setAPIService.updateSet(set);
  }

  public deleteSet(id: string): Observable<any> {
    return this.setAPIService.deleteById(id).pipe(take(1));
  }
}
