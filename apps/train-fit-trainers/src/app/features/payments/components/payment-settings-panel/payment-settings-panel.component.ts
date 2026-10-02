import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription, of } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { PaymentSettings, SettingsPreview } from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import { formatDay, paymentsErrorMessage } from '../../utils/payments-view.util';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

const COMMON_ZONES = ['Europe/Madrid', 'Atlantic/Canary', 'Europe/Lisbon', 'Europe/London', 'America/Mexico_City', 'America/Bogota', 'America/Argentina/Buenos_Aires'];

// Preferencias comunes de avisos: días respecto al vencimiento, hora y zona.
// Cambiar zona u hora no mueve ninguna fecha de vencimiento ni de recepción:
// solo recalcula los avisos que aún no se han enviado (se previsualiza antes).
@Component({
  selector: 'app-payment-settings-panel',
  templateUrl: './payment-settings-panel.component.html',
  styleUrls: ['./payment-settings-panel.component.scss'],
})
export class PaymentSettingsPanelComponent implements OnInit, OnDestroy {
  private readonly translate = inject(TranslateService);

  @Input() public settings!: PaymentSettings;
  @Output() public closed = new EventEmitter<void>();
  @Output() public saved = new EventEmitter<PaymentSettings>();

  public timeZone = 'Europe/Madrid';
  public time = '09:00';
  public beforeDays = 3;
  public onDue = true;
  public afterDays = 3;
  public commonZones: string[] = [];
  public allZones: string[] = [];
  public preview: SettingsPreview | null = null;
  public saving = false;
  public errorMessage: string | null = null;
  public simplified = false;
  private readonly previewRequests = new Subject<boolean>();
  private previewSubscription: Subscription | null = null;

  constructor(private payments: TrainerPaymentsService, private ionicUtil: IonicUtilService) {}

  public ngOnInit(): void {
    this.timeZone = this.settings.timeZone;
    this.time = this.settings.time;
    const offsets = this.settings.offsets;
    const negatives = offsets.filter((offset) => offset < 0);
    const positives = offsets.filter((offset) => offset > 0);
    this.beforeDays = negatives.length ? -Math.min(...negatives) : 0;
    this.onDue = offsets.includes(0);
    this.afterDays = positives.length ? Math.max(...positives) : 0;
    this.simplified = negatives.length > 1 || positives.length > 1;

    const device = this.deviceZone();
    this.commonZones = [...new Set([this.settings.timeZone, ...COMMON_ZONES, ...(device ? [device] : [])])];
    this.allZones = this.supportedZones().filter((zone) => !this.commonZones.includes(zone));

    this.previewSubscription = this.previewRequests
      .pipe(
        debounceTime(300),
        switchMap((changed) =>
          changed
            ? this.payments.previewSettings(this.body()).pipe(catchError(() => of(null)))
            : of(null)
        )
      )
      .subscribe((preview) => (this.preview = preview));
  }

  public ngOnDestroy(): void {
    this.previewSubscription?.unsubscribe();
  }

  public get offsets(): number[] {
    const result: number[] = [];
    if (this.beforeDays > 0) result.push(-this.beforeDays);
    if (this.onDue) result.push(0);
    if (this.afterDays > 0) result.push(this.afterDays);
    return result;
  }

  public get limits(): PaymentSettings['limits'] {
    return this.settings.limits;
  }

  public get daysError(): string | null {
    const before = Number(this.beforeDays);
    const after = Number(this.afterDays);
    if (!Number.isInteger(before) || before < 0 || before > -this.limits.offsetMin) return this.translate.instant('PAYMENTS.ANTES_DE_0_DIAS', { p0: -this.limits.offsetMin });
    if (!Number.isInteger(after) || after < 0 || after > this.limits.offsetMax) return this.translate.instant('PAYMENTS.DESPUES_DE_0_DIAS', { offsetMax: this.limits.offsetMax });
    return null;
  }

  public get zoneOrTimeChanged(): boolean {
    return this.timeZone !== this.settings.timeZone || this.time !== this.settings.time;
  }

  public get dirty(): boolean {
    return this.zoneOrTimeChanged || JSON.stringify(this.offsets) !== JSON.stringify(this.settings.offsets);
  }

  public get canSubmit(): boolean {
    return !this.saving && !this.daysError && /^([01]\d|2[0-3]):[0-5]\d$/.test(this.time) && this.dirty;
  }

  public get summary(): string {
    const parts: string[] = [];
    if (this.beforeDays > 0) parts.push(`${this.beforeDays} ${this.beforeDays === 1 ? this.translate.instant('PAYMENTS.DIA') : this.translate.instant('PAYMENTS.DIAS')} antes`);
    if (this.onDue) parts.push(this.translate.instant('PAYMENTS.EL_DIA_DEL_VENCIMIENTO'));
    if (this.afterDays > 0) parts.push(this.translate.instant('PAYMENTS.DESPUES_SI_QUEDA_SALDO', { afterDays: this.afterDays, p1: this.afterDays === 1 ? 'día' : 'días' }));
    return parts.length ? this.translate.instant('PAYMENTS.LAS', { p0: parts.join(', '), time: this.time }) : this.translate.instant('PAYMENTS.SIN_AVISOS_DE_COBRO');
  }

  public onChange(): void {
    this.errorMessage = null;
    this.previewRequests.next(this.zoneOrTimeChanged && !this.daysError);
  }

  public instant(value: string | null | undefined, zone: string): string {
    if (!value) return this.translate.instant('PAYMENTS.SIN_AVISOS_PENDIENTES');
    return new Intl.DateTimeFormat(uiLocale(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: zone })
      .format(new Date(value))
      .replace('.', '');
  }

  public day(value: string): string {
    return formatDay(value, true);
  }

  public submit(): void {
    if (!this.canSubmit) return;
    this.saving = true;
    this.errorMessage = null;
    this.payments.saveSettings(this.body()).subscribe({
      next: (settings) => {
        this.saving = false;
        void this.ionicUtil.showSuccessToast(this.translate.instant('PAYMENTS.AVISOS_DE_COBRO_GUARDADOS'));
        this.saved.emit(settings);
        this.closed.emit();
      },
      error: (error) => {
        this.saving = false;
        this.errorMessage = paymentsErrorMessage(error, this.translate.instant('PAYMENTS.NO_SE_PUDIERON_GUARDAR_LOS'));
      },
    });
  }

  private body(): { timeZone: string; time: string; offsets: number[] } {
    return { timeZone: this.timeZone, time: this.time, offsets: this.offsets };
  }

  private deviceZone(): string | null {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch {
      return null;
    }
  }

  private supportedZones(): string[] {
    try {
      const intl = Intl as unknown as { supportedValuesOf?: (key: string) => string[] };
      return intl.supportedValuesOf ? intl.supportedValuesOf('timeZone') : [];
    } catch {
      return [];
    }
  }
}
