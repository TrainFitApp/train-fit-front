import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription, of } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  DatedAmount,
  FeePlanView,
  PaymentPreferences,
  PlanBody,
  PlanPreview,
  PlanResult,
  RecurrenceUnit,
} from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import {
  FREQUENCY_PRESETS,
  INTERVAL_LIMITS,
  centsToInput,
  formatCents,
  formatDay,
  formatDayLong,
  frequencyLabel,
  newOperationId,
  occurrencesFrom,
  parseAmountInput,
  paymentsErrorMessage,
} from '../../utils/payments-view.util';

let formSeq = 0;

// Configurar, editar o reanudar la cuota de un cliente. Antes de guardar se
// ven las tres próximas fechas y, al editar, qué vencimientos ya generados
// cambian, se anulan o se protegen (el backend lo calcula: una sola verdad).
@Component({
  selector: 'app-fee-plan-panel',
  templateUrl: './fee-plan-panel.component.html',
  styleUrls: ['./fee-plan-panel.component.scss'],
})
export class FeePlanPanelComponent implements OnInit, OnDestroy {
  private readonly translate = inject(TranslateService);

  @Input() public clientId = '';
  @Input() public clientName: string | null = null;
  @Input() public today = '';
  @Input() public plan: FeePlanView | null = null;
  @Input() public preferences: PaymentPreferences | null = null;
  @Input() public mode: 'configure' | 'resume' = 'configure';
  @Output() public closed = new EventEmitter<void>();
  @Output() public saved = new EventEmitter<PlanResult | null>();

  public readonly presets = FREQUENCY_PRESETS;
  public readonly formId = `fee-plan-${++formSeq}`;
  public concept = this.translate.instant('PAYMENTS.CUOTA');
  public amountText = '';
  public presetKey = 'monthly';
  public customUnit: RecurrenceUnit = 'month';
  public customInterval = '1';
  public nextDueDay = '';
  public effectiveFromDay: string | null = null;
  public remindClient = false;
  public preview: PlanPreview | null = null;
  public previewState: 'idle' | 'loading' | 'error' = 'idle';
  public saving = false;
  public errorMessage: string | null = null;

  private readonly operationId = newOperationId('plan');
  private readonly previewRequests = new Subject<PlanBody | null>();
  private previewSubscription: Subscription | null = null;

  constructor(private payments: TrainerPaymentsService, private ionicUtil: IonicUtilService) {}

  public ngOnInit(): void {
    const plan = this.plan;
    this.remindClient = Boolean(this.preferences?.clientRemindersEnabled);
    if (plan) {
      this.concept = plan.concept;
      this.amountText = centsToInput(plan.amountCents);
      const preset = FREQUENCY_PRESETS.find((item) => item.unit === plan.unit && item.interval === plan.interval);
      this.presetKey = preset ? preset.key : 'custom';
      this.customUnit = plan.unit;
      this.customInterval = String(plan.interval);
    }
    this.nextDueDay = this.mode === 'resume' ? '' : this.isNew ? this.today : plan?.nextDueDay ?? this.today;
    this.effectiveFromDay = plan?.nextDueDay ?? null;

    this.previewSubscription = this.previewRequests
      .pipe(
        debounceTime(350),
        switchMap((body) => {
          if (!body) return of(null);
          this.previewState = 'loading';
          return this.payments.previewPlan(this.clientId, body).pipe(
            catchError((error) => {
              this.previewState = 'error';
              this.errorMessage = paymentsErrorMessage(error, this.translate.instant('PAYMENTS.NO_SE_PUDO_CALCULAR_LA'));
              return of(null);
            })
          );
        })
      )
      .subscribe((preview) => {
        this.preview = preview;
        if (preview) {
          this.previewState = 'idle';
          this.errorMessage = null;
        }
      });
    this.refreshPreview();
  }

  public ngOnDestroy(): void {
    this.previewSubscription?.unsubscribe();
  }

  // --- Estado del formulario ---

  public get isNew(): boolean {
    return !this.plan || this.plan.status === 'ended';
  }

  public get title(): string {
    if (this.mode === 'resume') return this.translate.instant('PAYMENTS.REANUDAR_CUOTA');
    if (!this.plan) return this.translate.instant('PAYMENTS.CONFIGURAR_CUOTA');
    return this.plan.status === 'ended' ? this.translate.instant('PAYMENTS.NUEVA_CUOTA') : this.translate.instant('PAYMENTS.EDITAR_CUOTA');
  }

  public get subtitle(): string | null {
    if (this.mode === 'resume') return this.translate.instant('PAYMENTS.NO_SE_GENERAN_CUOTAS_DEL');
    if (this.plan?.status === 'ended') return this.translate.instant('PAYMENTS.EMPIEZA_UN_CALENDARIO_NUEVO_LOS');
    return this.clientName ? this.translate.instant('PAYMENTS.UNA_SOLA_CUOTA_PARA_ENGLOBA', { clientName: this.clientName }) : null;
  }

  public get unit(): RecurrenceUnit {
    const preset = FREQUENCY_PRESETS.find((item) => item.key === this.presetKey);
    return preset ? preset.unit : this.customUnit;
  }

  public get interval(): number {
    const preset = FREQUENCY_PRESETS.find((item) => item.key === this.presetKey);
    return preset ? preset.interval : Number(this.customInterval);
  }

  public get presetHint(): string | null {
    return FREQUENCY_PRESETS.find((item) => item.key === this.presetKey)?.hint ?? null;
  }

  public get intervalError(): string | null {
    if (this.presetKey !== 'custom') return null;
    const limits = INTERVAL_LIMITS[this.customUnit];
    const value = Number(this.customInterval);
    return Number.isInteger(value) && value >= limits.min && value <= limits.max
      ? null
      : this.translate.instant('PAYMENTS.ENTRE', { min: limits.min, max: limits.max, p2: this.customUnit === 'week' ? 'semanas' : 'meses' });
  }

  public get amountCents(): number | null {
    return parseAmountInput(this.amountText);
  }

  public get amountError(): string | null {
    if (!this.amountText.trim()) return null;
    return this.amountCents === null ? this.translate.instant('PAYMENTS.IMPORTE_NO_VALIDO_USA_COMO_2') : null;
  }

  public get scheduleChanged(): boolean {
    const plan = this.plan;
    if (!plan || this.isNew) return false;
    return plan.unit !== this.unit || plan.interval !== this.interval || (!!this.nextDueDay && this.nextDueDay !== plan.nextDueDay);
  }

  public get priceChanged(): boolean {
    return !!this.plan && !this.isNew && this.amountCents !== null && this.amountCents !== this.plan.amountCents;
  }

  // Cambio de precio sin tocar el calendario: elige desde qué vencimiento rige.
  public get choosesEffectiveDay(): boolean {
    return this.mode === 'configure' && this.priceChanged && !this.scheduleChanged;
  }

  public get effectiveOptions(): string[] {
    const plan = this.plan;
    if (!plan) return [];
    return occurrencesFrom(plan.unit, plan.interval, plan.anchorDay, this.today, 4);
  }

  public get planDirty(): boolean {
    if (this.mode === 'resume' || this.isNew) return true;
    return this.scheduleChanged || this.priceChanged || this.concept.trim() !== this.plan!.concept;
  }

  public get remindersDirty(): boolean {
    return this.remindClient !== Boolean(this.preferences?.clientRemindersEnabled);
  }

  public get anchorAtMonthEnd(): boolean {
    return this.unit === 'month' && !!this.nextDueDay && Number(this.nextDueDay.slice(8, 10)) >= 29;
  }

  public get startError(): string | null {
    if (!this.nextDueDay) return this.mode === 'resume' || this.isNew ? this.translate.instant('PAYMENTS.ELIGE_LA_FECHA_DEL_VENCIMIENTO') : null;
    if ((this.mode === 'resume' || this.isNew || this.scheduleChanged) && this.nextDueDay < this.today) {
      return this.translate.instant('PAYMENTS.NO_PUEDE_SER_ANTERIOR_HOY');
    }
    return null;
  }

  public get canSubmit(): boolean {
    if (this.saving || !this.amountCents || this.amountError || this.intervalError || this.startError) return false;
    if (this.choosesEffectiveDay && !this.effectiveFromDay) return false;
    return this.planDirty || this.remindersDirty;
  }

  // Resumen de fechas: del backend al configurar; calculado aquí al reanudar.
  public get nextDates(): DatedAmount[] {
    if (this.mode === 'resume') {
      const plan = this.plan;
      if (!plan || !this.nextDueDay || this.amountCents === null) return [];
      return occurrencesFrom(plan.unit, plan.interval, this.nextDueDay, this.nextDueDay, 3).map((day) => ({
        day,
        amountCents: this.amountCents ?? 0,
      }));
    }
    return this.preview?.nextDates ?? [];
  }

  public frequencyText(): string {
    return frequencyLabel(this.unit, this.interval);
  }

  public money(cents: number): string {
    return formatCents(cents);
  }

  public day(day: string): string {
    return formatDay(day, true);
  }

  public dayLong(day: string): string {
    return formatDayLong(day);
  }

  public selectPreset(key: string): void {
    this.presetKey = key;
    this.refreshPreview();
  }

  public refreshPreview(): void {
    if (this.mode === 'resume') return;
    this.previewRequests.next(this.canPreview() ? this.buildBody() : null);
  }

  public submit(): void {
    if (!this.canSubmit) return;
    this.saving = true;
    this.errorMessage = null;
    if (!this.planDirty) {
      this.savePreferences(null);
      return;
    }
    const request =
      this.mode === 'resume'
        ? this.payments.resumePlan(this.clientId, {
            nextDueDay: this.nextDueDay,
            amount: this.amountText.trim(),
            operationId: this.operationId,
          })
        : this.payments.savePlan(this.clientId, { ...this.buildBody(), operationId: this.operationId });
    request.subscribe({
      next: (result) => (this.remindersDirty ? this.savePreferences(result) : this.finish(result)),
      error: (error) => {
        this.saving = false;
        this.errorMessage = paymentsErrorMessage(error, this.translate.instant('PAYMENTS.NO_SE_PUDO_GUARDAR_LA'));
      },
    });
  }

  private savePreferences(result: PlanResult | null): void {
    this.payments.setPreferences(this.clientId, { clientRemindersEnabled: this.remindClient }).subscribe({
      next: () => this.finish(result),
      error: (error) => {
        if (result) {
          // La cuota ya está guardada: no se deshace por la preferencia.
          void this.ionicUtil.showErrorToast(error, this.translate.instant('PAYMENTS.CUOTA_GUARDADA_PERO_NO_SE'));
          this.finish(result);
          return;
        }
        this.saving = false;
        this.errorMessage = paymentsErrorMessage(error, this.translate.instant('PAYMENTS.NO_SE_PUDO_CAMBIAR_EL'));
      },
    });
  }

  private finish(result: PlanResult | null): void {
    this.saving = false;
    const message = this.mode === 'resume' ? this.translate.instant('PAYMENTS.CUOTA_REANUDADA') : this.isNew ? this.translate.instant('PAYMENTS.CUOTA_CONFIGURADA') : this.translate.instant('PAYMENTS.CUOTA_ACTUALIZADA');
    void this.ionicUtil.showSuccessToast(message);
    this.saved.emit(result);
    this.closed.emit();
  }

  private canPreview(): boolean {
    return !!this.amountCents && !this.intervalError && !this.startError && (!this.choosesEffectiveDay || !!this.effectiveFromDay);
  }

  private buildBody(): PlanBody {
    return {
      concept: this.concept.trim() || this.translate.instant('PAYMENTS.CUOTA'),
      amount: this.amountText.trim(),
      unit: this.unit,
      interval: this.interval,
      nextDueDay: this.nextDueDay || null,
      effectiveFromDay: this.choosesEffectiveDay ? this.effectiveFromDay : null,
    };
  }
}
