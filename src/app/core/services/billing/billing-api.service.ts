import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillingEntitlements } from '../../models/billing-entitlements';
import { HttpService } from '../http/http.service';

@Injectable()
export class BillingApiService {
  private static readonly BILLING_ENDPOINT = 'billing';

  constructor(private readonly http: HttpService) {}

  public linkCustomer(appUserId: string): Observable<any> {
    return this.http.post(
      `${BillingApiService.BILLING_ENDPOINT}/customer/link`,
      {
        appUserId,
      }
    );
  }

  public getEntitlementsMe(): Observable<BillingEntitlements> {
    return this.http.get<BillingEntitlements>(
      `${BillingApiService.BILLING_ENDPOINT}/entitlements/me`
    );
  }

  public restore(payload?: {
    appUserId?: string;
    customerInfo?: unknown;
    plan?: 'monthly' | 'annual';
  }): Observable<BillingEntitlements> {
    return this.http.post<BillingEntitlements>(
      `${BillingApiService.BILLING_ENDPOINT}/restore`,
      payload || {}
    );
  }
}
