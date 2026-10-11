import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { AssistantUsageApiService, AssistantUsageReport } from './services/assistant-usage-api.service';
import { historyBars, shiftMonth } from './assistant-usage-view.util';

// Consumo del asistente trAInfit por mes: mensajes, personas, ATP, coste
// estimado, reparto por app y por caso, y la evolución de los últimos meses.
@Component({
  selector: 'app-assistant-usage',
  templateUrl: './assistant-usage.page.html',
  styleUrls: ['./assistant-usage.page.scss'],
})
export class AssistantUsagePage implements OnInit, OnDestroy {
  private readonly navigationService = inject(NavigationService);
  private readonly ionicUtil = inject(IonicUtilService);
  private readonly translate = inject(TranslateService);
  private readonly api = inject(AssistantUsageApiService);
  private readonly destroy$ = new Subject<void>();

  public readonly currentMonth = localIsoDate().slice(0, 7);
  public month = this.currentMonth;
  public report: AssistantUsageReport | null = null;
  public loading = true;

  public ngOnInit(): void {
    this.load();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public load(): void {
    this.loading = true;
    this.api
      .getUsage(this.month)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (report) => {
          this.report = report;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.ASSISTANT_USAGE.LOAD_ERROR'));
        },
      });
  }

  public shift(delta: number): void {
    const next = shiftMonth(this.month, delta);
    if (next > this.currentMonth) return;
    this.month = next;
    this.load();
  }

  public monthLabel(month: string): string {
    const date = new Date(`${month}-15T12:00:00`);
    return new Intl.DateTimeFormat(uiLocale(), { month: 'long', year: 'numeric' }).format(date);
  }

  public shortMonth(month: string): string {
    return new Intl.DateTimeFormat(uiLocale(), { month: 'short' }).format(new Date(`${month}-15T12:00:00`));
  }

  // Céntimos de dólar con hasta cuatro decimales: un mes flojo cuesta menos de un céntimo.
  public usd(value: number | null | undefined): string {
    return new Intl.NumberFormat(uiLocale(), { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(
      value || 0
    );
  }

  public percent(value: number | null | undefined): string {
    return new Intl.NumberFormat(uiLocale(), { style: 'percent', maximumFractionDigits: 0 }).format(value || 0);
  }

  public get bars() {
    return historyBars(this.report?.history || []);
  }
}
