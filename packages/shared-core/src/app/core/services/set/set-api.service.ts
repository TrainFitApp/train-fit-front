import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Set } from '../../models/set';
import { HttpService } from '../http/http.service';

@Injectable()
export class SetAPIService {
  private static readonly SET_ENDPOINT = 'sets';

  constructor(private http: HttpService) {}

  public createSet(set: Set): Observable<Set> {
    return this.http.post<Set>(`${SetAPIService.SET_ENDPOINT}/one`, set);
  }
  public createSets(sets: Set[]): Observable<Set[]> {
    return this.http.post<Set[]>(`${SetAPIService.SET_ENDPOINT}`, sets);
  }

  public updateSet(set: Set): Observable<Set> {
    return this.http.put<Set>(`${SetAPIService.SET_ENDPOINT}`, set);
  }

  public deleteById(id: string): Observable<any> {
    return this.http.delete<Set>(`${SetAPIService.SET_ENDPOINT}/${id}`);
  }
}
