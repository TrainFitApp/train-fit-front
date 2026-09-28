import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, of } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { PaymentSettings, SettingsPreview } from '../../models/payments.model';
import { TrainerPaymentsService } from '../../services/trainer-payments.service';
import { formatDay, paymentsErrorMessage } from '../../utils/payments-view.util';

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
    if (!Number.isInteger(before) || before < 0 || before > -this.limits.offsetMin) return `Antes: de 0 a ${-this.limits.offsetMin} días.`;
    if (!Number.isInteger(after) || after < 0 || after > this.limits.offsetMax) return `Después: de 0 a ${this.limits.offsetMax} días.`;
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
    if (this.beforeDays > 0) parts.push(`${this.beforeDays} ${this.beforeDays === 1 ? 'día' : 'días'} antes`);
    if (this.onDue) parts.push('el día del vencimiento');
    if (this.afterDays > 0) parts.push(`${this.afterDays} ${this.afterDays === 1 ? 'día' : 'días'} después si queda saldo`);
    return parts.length ? `${parts.join(', ')} · a las ${this.time}` : 'Sin avisos de cobro';
  }

  public onChange(): void {
    this.errorMessage = null;
    this.previewRequests.next(this.zoneOrTimeChanged && !this.daysError);
  }

  public instant(value: string | null | undefined, zone: string): string {
    if (!value) return 'sin avisos pendientes';
    return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: zone })
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
        void this.ionicUtil.showSuccessToast('Avisos de cobro guardados');
        this.saved.emit(settings);
        this.closed.emit();
      },
      error: (error) => {
        this.saving = false;
        this.errorMessage = paymentsErrorMessage(error, 'No se pudieron guardar los avisos.');
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
