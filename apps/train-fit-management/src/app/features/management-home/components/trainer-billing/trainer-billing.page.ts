import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { AdminInterventionRequest, TrainerBillingAdminApiService } from './services/trainer-billing-admin-api.service';
import {
  ACTION_HELP, ACTION_LABELS, AdminAction, AdminAdjustment, AdminCase, AdminIntervention, AdminTrainerDetail, DISPUTE_STATUS, KIND_LABELS,
  PLAN_NAMES, REFUND_STATUS, ROLE_LABELS, SUGGESTED_ACTION, SUGGESTIONS, adminErrorMessage, availableActions, financedLabel,
  formatAmount, formatDate, interventionProblem, planLabel, stateLabel,
} from './trainer-billing-view.util';

interface InterventionForm {
  action: AdminAction | '';
  reason: string;
  note: string;
  caseId: string;
  resolveCase: boolean;
  until: string;
  tier: string;
  adjustmentId: string;
}
const emptyForm = (): InterventionForm => ({ action: '', reason: '', note: '', caseId: '', resolveCase: true, until: '', tier: 'starter', adjustmentId: '' });

// Facturación de Trainers en Gestión: casos de dinero (reembolsos, disputas, avisos de fraude)
// y ficha del entrenador con sus intervenciones. Sin ruta de entrenador muestra la bandeja de casos.
@Component({
  selector: 'app-trainer-billing',
  templateUrl: './trainer-billing.page.html',
  styleUrls: ['./trainer-billing.page.scss'],
})
export class TrainerBillingPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly navController = inject(NavController);
  private readonly navigationService = inject(NavigationService);
  private readonly ionicUtil = inject(IonicUtilService);
  private readonly api = inject(TrainerBillingAdminApiService);
  private readonly translate = inject(TranslateService);
  private readonly subscriptions = new Subscription();
  // Una sola carga viva: cambiar de filtro o de ficha cancela la anterior para que no pise a la nueva.
  private loadRequest: Subscription | null = null;

  public userId: string | null = null;
  public filter: 'open' | 'resolved' | 'all' = 'open';
  public loading = false;
  public error = '';
  public mode: 'test' | 'live' | '' = '';
  public pendingEvents = 0;
  public cases: AdminCase[] = [];
  public detail: AdminTrainerDetail | null = null;
  public lookupEmail = '';
  public form: InterventionForm = emptyForm();
  public submitting = false;

  public readonly actionLabels = ACTION_LABELS;
  public readonly actionHelp = ACTION_HELP;
  public readonly disputeStatus = DISPUTE_STATUS;
  public readonly refundStatus = REFUND_STATUS;
  public readonly roleLabels = ROLE_LABELS;
  public readonly suggestions = SUGGESTIONS;
  public readonly planNames = PLAN_NAMES;
  public readonly tiers = Object.keys(PLAN_NAMES);
  public readonly formatAmount = formatAmount;
  public readonly formatDate = formatDate;
  public readonly planLabel = planLabel;
  public readonly stateLabel = stateLabel;
  public readonly financedLabel = financedLabel;

  public get actions(): AdminAction[] { return availableActions(this.detail); }
  public get openCases(): AdminCase[] { return (this.detail?.cases || []).filter((entry) => entry.status === 'open'); }
  public get activeAdjustments(): AdminAdjustment[] {
    const kind = this.form.action === 'end_grant' ? 'grant' : 'revoke_period';
    return (this.detail?.account?.adjustments || []).filter((entry) => entry.kind === kind && !entry.liftedAt);
  }
  public get formProblem(): string | null { return interventionProblem(this.form); }
  public get noCasesKey(): string {
    if (this.filter === 'open') return 'MANAGEMENT.BILLING.NO_CASES_OPEN';
    return this.filter === 'resolved' ? 'MANAGEMENT.BILLING.NO_CASES_RESOLVED' : 'MANAGEMENT.BILLING.NO_CASES';
  }

  public caseStatusKey(entry: AdminCase): string {
    if (entry.status === 'resolved') return 'MANAGEMENT.BILLING.STATUS_RESOLVED';
    return entry.priority === 'high' ? 'MANAGEMENT.BILLING.PRIORITY_HIGH' : 'MANAGEMENT.BILLING.STATUS_OPEN';
  }

  // Coletilla del historial: fallida (con su error) o sin terminar; '' si se aplicó.
  public interventionSuffixKey(entry: AdminIntervention): string {
    if (entry.status === 'failed') return 'MANAGEMENT.BILLING.FAILED_SUFFIX';
    return entry.status === 'pending' ? 'MANAGEMENT.BILLING.PENDING_SUFFIX' : '';
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
      this.detail = null;
      this.form = emptyForm();
      this.load();
    }));
  }

  public ngOnDestroy(): void {
    this.loadRequest?.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  public goBack(): void { this.navigationService.goBack(); }

  public load(): void {
    this.loadRequest?.unsubscribe();
    this.loading = true;
    this.error = '';
    this.loadRequest = this.userId
      ? this.api.getTrainer(this.userId).pipe(finalize(() => { this.loading = false; })).subscribe({
        next: (detail) => { this.detail = detail; this.mode = detail.mode; },
        error: (err) => { this.error = adminErrorMessage(err, 'MANAGEMENT.BILLING.LOAD_TRAINER_ERROR'); },
      })
      : this.api.getCases(this.filter).pipe(finalize(() => { this.loading = false; })).subscribe({
        next: (response) => { this.cases = response.cases; this.pendingEvents = response.pendingEvents; this.mode = response.mode; },
        error: (err) => { this.error = adminErrorMessage(err, 'MANAGEMENT.BILLING.LOAD_CASES_ERROR'); },
      });
  }

  public setFilter(filter: 'open' | 'resolved' | 'all'): void {
    if (this.filter === filter) return;
    this.filter = filter;
    this.load();
  }

  public openTrainer(userId: string): void {
    void this.navController.navigateForward(['/management-home', 'trainer-billing', userId]);
  }

  public lookup(): void {
    const email = this.lookupEmail.trim();
    if (!email || this.loading) return;
    this.subscriptions.add(this.api.lookup(email).subscribe({
      next: (result) => this.openTrainer(result.userId),
      error: (err) => this.toastError(err, 'MANAGEMENT.BILLING.LOOKUP_ERROR'),
    }));
  }

  // Prepara el formulario con el caso y la acción sugerida (la decisión sigue siendo de quien confirma).
  public useCase(entry: AdminCase): void {
    this.form = { ...emptyForm(), caseId: entry.caseId, action: SUGGESTED_ACTION[entry.suggestion] || 'resolve_case' };
  }

  public prepareAdjustment(adjustment: AdminAdjustment): void {
    this.form = { ...emptyForm(), action: adjustment.kind === 'grant' ? 'end_grant' : 'restore_period_access', adjustmentId: adjustment.id };
  }

  public caseTitle(entry: AdminCase): string {
    const status = entry.kind === 'dispute' && entry.disputeStatus ? ` · ${DISPUTE_STATUS[entry.disputeStatus] || entry.disputeStatus}` : '';
    return this.translate.instant('MANAGEMENT.BILLING.CASE_TITLE', { kind: KIND_LABELS[entry.kind], amount: formatAmount(entry.amount) }) + status;
  }

  public submit(): void {
    if (!this.userId || this.submitting || this.formProblem || !this.form.action) return;
    const action = this.form.action;
    void this.ionicUtil.showAlert({
      header: ACTION_LABELS[action],
      message: `${ACTION_HELP[action]} ${this.translate.instant('MANAGEMENT.BILLING.CONFIRM_SUFFIX')}`,
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        { text: this.translate.instant('COMMON.CONFIRM'), role: 'confirm', cssClass: action === 'end_service_now' ? 'danger-btn' : 'alert-button-primary' },
      ],
    }).then((result) => {
      if (result?.role === 'confirm') this.send(action);
    });
  }

  private send(action: AdminAction): void {
    const form = this.form;
    const request: AdminInterventionRequest = { action, reason: form.reason.trim() };
    if (form.note.trim()) request.note = form.note.trim();
    if (form.caseId) { request.caseId = form.caseId; request.resolveCase = action === 'resolve_case' || form.resolveCase; }
    if (action === 'grant_access') { request.until = new Date(form.until).toISOString(); request.tier = form.tier; }
    if (action === 'end_grant' || action === 'restore_period_access') request.adjustmentId = form.adjustmentId;
    this.submitting = true;
    this.subscriptions.add(this.api.intervene(this.userId!, request).pipe(finalize(() => { this.submitting = false; })).subscribe({
      next: (detail) => {
        this.detail = detail;
        this.form = emptyForm();
        this.ionicUtil.showSuccessToast(this.translate.instant('MANAGEMENT.BILLING.APPLIED'));
      },
      error: (err) => {
        this.toastError(err, 'MANAGEMENT.BILLING.APPLY_ERROR');
        this.load();
      },
    }));
  }

  // El toast enseña el texto ya traducido (el del back viene en español); el
  // status se conserva para el color y el aviso de conexión.
  private toastError(err: unknown, fallbackKey: string): void {
    const text = adminErrorMessage(err, fallbackKey);
    void this.ionicUtil.showErrorToast({ status: (err as { status?: number } | null)?.status, error: { message: text } }, text);
  }
}
