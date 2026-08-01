import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { TrainerClientSummary } from '../models/trainer-client-summary.model';

@Injectable({ providedIn: 'root' })
export class TrainerClientsApiService {
  private static readonly ENDPOINT = 'trainer/clients';

  constructor(private http: HttpService) {}

  public getMyClients(): Observable<TrainerClientSummary[]> {
    return this.http.get<TrainerClientSummary[]>(
      TrainerClientsApiService.ENDPOINT
    );
  }
}
