import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { PaymentsSummary } from '../models/payments-summary.model';

@Injectable({ providedIn: 'root' })
export class TrainerPaymentsApiService {
  private static readonly ENDPOINT = 'trainer/payments';

  constructor(private http: HttpService) {}

  public getOverview(): Observable<PaymentsSummary> {
    return this.http.get<PaymentsSummary>(`${TrainerPaymentsApiService.ENDPOINT}/summary`);
  }
}
