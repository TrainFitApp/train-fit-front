import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  ChargeMutationResult,
  ClientLedger,
  ClientSummaryResponse,
  OverviewQuery,
  PaymentChargeDetail,
  PaymentPreferences,
  PaymentSettings,
  PaymentsChangeEvent,
  PaymentsOverview,
  PlanBody,
  PlanPreview,
  PlanResult,
  SettingsPreview,
} from '../models/payments.model';

// API de cobros del entrenador (/trainer/payments/*). Toda escritura que
// termina bien emite en `changes$`: la ficha, la tarjeta del Resumen y
// Configuración > Cobros se refrescan solas, estén o no a la vista (Ionic
// mantiene las páginas vivas y ngOnInit no vuelve a pasar).
@Injectable({ providedIn: 'root' })
export class TrainerPaymentsService {
  private static readonly BASE = 'trainer/payments';
  private readonly changesSubject = new Subject<PaymentsChangeEvent>();
  public readonly changes$ = this.changesSubject.asObservable();

  constructor(private http: HttpService) {}

  public notifyChanged(event: PaymentsChangeEvent): void {
    this.changesSubject.next(event);
  }

  private client(clientId: string): string {
    return `${TrainerPaymentsService.BASE}/clients/${clientId}`;
  }

  private emitAfter<T>(clientId: string, request: Observable<T>, chargeId: string | null = null): Observable<T> {
    return request.pipe(tap(() => this.notifyChanged({ clientId, chargeId })));
  }

  // --- Lecturas ---
  public getLedger(clientId: string): Observable<ClientLedger> {
    return this.http.get<ClientLedger>(this.client(clientId));
  }

  public getClientSummary(clientId: string): Observable<ClientSummaryResponse> {
    return this.http.get<ClientSummaryResponse>(`${this.client(clientId)}/summary`);
  }

  public getCharge(clientId: string, chargeId: string): Observable<PaymentChargeDetail> {
    return this.http.get<PaymentChargeDetail>(`${this.client(clientId)}/charges/${chargeId}`);
  }

  public getOverview(query: OverviewQuery): Observable<PaymentsOverview> {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') params.set(key, String(value));
    }
    const suffix = params.toString();
    return this.http.get<PaymentsOverview>(`${TrainerPaymentsService.BASE}/overview${suffix ? `?${suffix}` : ''}`);
  }

  public getSettings(): Observable<PaymentSettings> {
    return this.http.get<PaymentSettings>(`${TrainerPaymentsService.BASE}/settings`);
  }

  // --- Cuota ---
  public previewPlan(clientId: string, body: PlanBody): Observable<PlanPreview> {
    return this.http.post<PlanPreview>(`${this.client(clientId)}/plan/preview`, body);
  }

  public savePlan(clientId: string, body: PlanBody): Observable<PlanResult> {
    return this.emitAfter(clientId, this.http.put<PlanResult>(`${this.client(clientId)}/plan`, body));
  }

  public pausePlan(clientId: string, operationId: string): Observable<PlanResult> {
    return this.emitAfter(clientId, this.http.post<PlanResult>(`${this.client(clientId)}/plan/pause`, { operationId }));
  }

  public resumePlan(clientId: string, body: { nextDueDay: string; amount?: string; operationId: string }): Observable<PlanResult> {
    return this.emitAfter(clientId, this.http.post<PlanResult>(`${this.client(clientId)}/plan/resume`, body));
  }

  public endPlan(clientId: string, operationId: string): Observable<PlanResult> {
    return this.emitAfter(clientId, this.http.post<PlanResult>(`${this.client(clientId)}/plan/end`, { operationId }));
  }

  public setPreferences(
    clientId: string,
    body: { clientRemindersEnabled: boolean; reminderOffsets?: number[] | null }
  ): Observable<PaymentPreferences> {
    return this.emitAfter(clientId, this.http.put<PaymentPreferences>(`${this.client(clientId)}/preferences`, body));
  }

  // --- Cobros ---
  public createCharge(
    clientId: string,
    body: { amount: string; dueDay: string; concept?: string | null; note?: string | null; operationId: string; confirmPastDue?: boolean }
  ): Observable<ChargeMutationResult> {
    return this.emitAfter(clientId, this.http.post<ChargeMutationResult>(`${this.client(clientId)}/charges`, body));
  }

  public editCharge(clientId: string, chargeId: string, body: Record<string, unknown>): Observable<ChargeMutationResult> {
    return this.emitAfter(clientId, this.http.patch<ChargeMutationResult>(`${this.client(clientId)}/charges/${chargeId}`, body), chargeId);
  }

  public registerPayment(
    clientId: string,
    chargeId: string,
    body: { amount: string; receivedDay: string; method: string; note?: string | null; operationId: string }
  ): Observable<ChargeMutationResult> {
    return this.emitAfter(
      clientId,
      this.http.post<ChargeMutationResult>(`${this.client(clientId)}/charges/${chargeId}/payments`, body),
      chargeId
    );
  }

  public correctPayment(clientId: string, chargeId: string, paymentId: string, body: Record<string, unknown>): Observable<ChargeMutationResult> {
    return this.emitAfter(
      clientId,
      this.http.post<ChargeMutationResult>(`${this.client(clientId)}/charges/${chargeId}/payments/${paymentId}/correct`, body),
      chargeId
    );
  }

  public cancelBalance(
    clientId: string,
    chargeId: string,
    body: { reason: string; confirmBalanceCents: number; operationId: string }
  ): Observable<ChargeMutationResult> {
    return this.emitAfter(clientId, this.http.post<ChargeMutationResult>(`${this.client(clientId)}/charges/${chargeId}/cancel`, body), chargeId);
  }

  public restoreCancelled(
    clientId: string,
    chargeId: string,
    body: { amount: string; reason: string; confirmBalanceCents: number; operationId: string }
  ): Observable<ChargeMutationResult> {
    return this.emitAfter(clientId, this.http.post<ChargeMutationResult>(`${this.client(clientId)}/charges/${chargeId}/restore`, body), chargeId);
  }

  // --- Preferencias comunes ---
  public saveSettings(body: { timeZone: string; time: string; offsets: number[] }): Observable<PaymentSettings> {
    return this.http.put<PaymentSettings>(`${TrainerPaymentsService.BASE}/settings`, body);
  }

  public previewSettings(body: { timeZone: string; time: string; offsets: number[] }): Observable<SettingsPreview> {
    return this.http.post<SettingsPreview>(`${TrainerPaymentsService.BASE}/settings/preview`, body);
  }
}
