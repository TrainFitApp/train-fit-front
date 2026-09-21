import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  PurchasableTrainerTier,
  TrainerBillingInterval,
  TrainerCheckoutSession,
  TrainerEntitlements,
  TrainerPlanCatalog,
  TrainerPortalSession,
  TrainerChangeQuote,
  TrainerPlanChangeResult,
  TrainerSeats,
  TrainerBillingDetails,
} from '../models/trainer-entitlements.model';

@Injectable({ providedIn: 'root' })
export class TrainerBillingApiService {
  constructor(private http: HttpService) {}

  public getEntitlements(): Observable<TrainerEntitlements> {
    return this.http.get<TrainerEntitlements>('billing/trainer/entitlements/me');
  }

  public getPlans(): Observable<TrainerPlanCatalog> {
    return this.http.get<TrainerPlanCatalog>('billing/trainer/plans');
  }

  public createCheckout(tier: PurchasableTrainerTier, interval: TrainerBillingInterval): Observable<TrainerCheckoutSession> {
    return this.http.post<TrainerCheckoutSession>('billing/trainer/checkout', { tier, interval });
  }

  public createPortal(): Observable<TrainerPortalSession> {
    return this.http.post<TrainerPortalSession>('billing/trainer/portal', {});
  }

  public sync(sessionId?: string): Observable<TrainerEntitlements> {
    return this.http.post<TrainerEntitlements>('billing/trainer/sync', sessionId ? { sessionId } : {});
  }

  public previewChange(tier: PurchasableTrainerTier, interval: TrainerBillingInterval): Observable<TrainerChangeQuote> {
    return this.http.post<TrainerChangeQuote>('billing/trainer/change-preview', { tier, interval });
  }

  public changePlan(quoteId: string): Observable<TrainerPlanChangeResult> {
    return this.http.post<TrainerPlanChangeResult>('billing/trainer/change-plan', { quoteId });
  }

  public cancel(): Observable<TrainerEntitlements> {
    return this.http.post<TrainerEntitlements>('billing/trainer/cancel', {});
  }

  public resume(): Observable<TrainerEntitlements> {
    return this.http.post<TrainerEntitlements>('billing/trainer/resume', {});
  }

  public discardChange(): Observable<TrainerEntitlements> {
    return this.http.post<TrainerEntitlements>('billing/trainer/discard-change', {});
  }

  public getBillingDetails(): Observable<TrainerBillingDetails> {
    return this.http.get<TrainerBillingDetails>('billing/trainer/billing-details');
  }

  public getSeats(): Observable<TrainerSeats> {
    return this.http.get<TrainerSeats>('trainer/seats');
  }

  public updateSeats(clientIds: string[]): Observable<TrainerSeats> {
    return this.http.put<TrainerSeats>('trainer/seats', { clientIds });
  }
}
