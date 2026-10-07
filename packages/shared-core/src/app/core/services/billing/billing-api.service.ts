import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillingEntitlements } from '../../models/billing-entitlements';
import { User } from '../../models/user';
import { HttpService } from '../http/http.service';

export type AdminPremiumDuration =
  | { type: 'preset'; value: '1d' | '1w' | '1m' | '1y' }
  | { type: 'customDate'; expiresAt: string };

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

  public grantPremium(
    userId: string,
    duration: AdminPremiumDuration
  ): Observable<User> {
    return this.http.post<User>(`${BillingApiService.BILLING_ENDPOINT}/admin/grant`, {
      userId,
      duration,
    });
  }

  public extendPremium(
    userId: string,
    duration: AdminPremiumDuration
  ): Observable<User> {
    return this.http.post<User>(`${BillingApiService.BILLING_ENDPOINT}/admin/extend`, {
      userId,
      duration,
    });
  }

  public revokePremium(userId: string): Observable<User> {
    return this.http.post<User>(`${BillingApiService.BILLING_ENDPOINT}/admin/revoke`, {
      userId,
    });
  }
}
