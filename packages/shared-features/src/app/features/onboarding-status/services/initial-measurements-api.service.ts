import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { InitialMeasurementValue, InitialMeasurementsState, PendingInitialMeasurements } from '../models/initial-measurements';

@Injectable({ providedIn: 'root' })
export class InitialMeasurementsApiService {
  constructor(private readonly http: HttpService) {}

  public pending(): Observable<{ items: PendingInitialMeasurements[] }> {
    return this.http.get<{ items: PendingInitialMeasurements[] }>('me/coaching/initial-measurements');
  }

  public get(trainerId: string): Observable<InitialMeasurementsState> {
    return this.http.get<InitialMeasurementsState>(this.path(trainerId));
  }

  public complete(trainerId: string, payload: {
    measurements: InitialMeasurementValue[];
    requestId: string;
    timeZone: string;
    missingMeasurementsAcknowledged: boolean;
  }): Observable<InitialMeasurementsState> {
    return this.http.post<InitialMeasurementsState>(this.path(trainerId), payload);
  }

  private path(trainerId: string): string {
    return `me/coaching/${encodeURIComponent(trainerId)}/initial-measurements`;
  }
}
