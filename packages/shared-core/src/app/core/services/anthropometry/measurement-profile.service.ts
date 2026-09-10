import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { measurementToday } from '../../utils/measurement-weeks.util';

export interface MeasurementProfile { timeZone: string; today: string; }

@Injectable({ providedIn: 'root' })
export class MeasurementProfileService {
  constructor(private http: HttpService) {}

  public get(): Observable<MeasurementProfile> {
    return this.http.get<MeasurementProfile>('me/measurement-profile').pipe(
      // Las apps y el backend pueden desplegarse por separado. El legado usa UTC explícito.
      catchError(() => of({ timeZone: 'UTC', today: measurementToday('UTC') }))
    );
  }

  public update(timeZone: string): Observable<MeasurementProfile> {
    return this.http.put<MeasurementProfile>('me/measurement-profile', { timeZone });
  }
}
