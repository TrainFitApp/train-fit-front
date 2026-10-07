import { ChangeDetectorRef, Component, ViewChild, inject, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fadeIn, fadeOut } from 'src/app/shared/animations/fade';
import { DateRange } from 'src/app/shared/models/dateRange';
import { CHART_RANGES } from './constants/chartRanges';
import { AnthropometryService } from 'src/app/core/services/anthropometry/anthropometry.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { Anthropometry } from './models/anthropometry';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { AnthropometryModalComponent } from 'src/app/shared/components/anthropometry';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-weight-info',
  templateUrl: './weight-info.page.html',
  styleUrls: ['./weight-info.page.scss'],
  animations: [fadeIn, fadeOut],
})
export class WeightInfoPage implements OnDestroy {
  @ViewChild('weightCalendar')
  private weightCalendar?: CalendarComponent;

  public selectedDate: string;
  public currentAnthropometry: Anthropometry | null = null;
  public currentNotes: string | undefined;
  public allAnthropometryData: Anthropometry[] = [];

  public get months(): string[] {
    return this.translate.instant('WEIGHT_INFO.MONTHS');
  }

  private langChangeSubscription: any;

  public load = true;

  public dateMin: string;
  public dateMax: string;
  public dateRange: DateRange;

  public monthYear: string;
  public CHART_RANGES = CHART_RANGES;
  // Números (peso y perímetros), fotos o vídeos de progreso.
  public section: 'numbers' | 'photos' | 'videos' = 'numbers';
  public chartRange: string;

  private translate = inject(TranslateService);

  constructor(
    public utilService: UtilService,
    private anthropometryService: AnthropometryService,
    private cdref: ChangeDetectorRef,
    private navigationService: NavigationService,
    private ionicUtilService: IonicUtilService
  ) {
    this.selectedDate = this.utilService.formatDateToYYYYMMDD(new Date());

    // Listen for language changes to update monthYear
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      const d = this.utilService.parseYYYYMMDD(this.selectedDate);
      this.monthYear = `${this.months[d.getMonth()]} ${d.getFullYear()}`;
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  public ionViewWillEnter(): void {
    const d = this.utilService.parseYYYYMMDD(this.selectedDate);
    this.monthYear = `${this.months[d.getMonth()]} ${d.getFullYear()}`;
    this.chartRange = CHART_RANGES.month;
    this.getChartConfigurationByRange();
    this.loadAnthropometryData();
  }

  public onSectionChange(event: any): void {
    const value = event?.detail?.value;
    if (value === 'numbers' || value === 'photos' || value === 'videos') this.section = value;
  }

  public chartRangeChange(event: any): void {
    const range = event.detail.value;
    if (range && range !== this.chartRange) {
      this.chartRange = range;
      this.getChartConfigurationByRange();
      this.loadAnthropometryData();
    }
  }

  private loadAnthropometryData(): void {
    this.load = false;
    this.anthropometryService
      .getAnthropometriesBetweenDates(this.dateMin, this.dateMax)
      .subscribe({
        next: (data) => {
          this.allAnthropometryData = data;
          this.currentAnthropometry = data.find(
            (a) => a.date === this.selectedDate
          ) || null;
          this.currentNotes = this.currentAnthropometry?.notes;
          this.cdref.detectChanges();
          this.load = true;
        },
        error: () => {
          this.allAnthropometryData = [];
          this.currentAnthropometry = null;
          this.currentNotes = undefined;
          this.load = true;
        },
      });
  }

  public selectDate(event: any): void {
    this.selectedDate = event.selectedDate;

    const oldDateMin = this.dateMin;
    const oldDateMax = this.dateMax;

    this.getChartConfigurationByRange();

    if (oldDateMin !== this.dateMin || oldDateMax !== this.dateMax) {
      this.loadAnthropometryData();
    } else {
      this.currentAnthropometry = this.allAnthropometryData.find(
        (a) => a.date === this.selectedDate
      ) || null;
      this.currentNotes = this.currentAnthropometry?.notes;
    }

    this.cdref.detectChanges();
  }

  public setMonthYear(monthYear: string): void {
    this.monthYear = monthYear;
  }

  public setLoading(loading: boolean): void {
    this.load = !loading;
  }

  public getChartConfigurationByRange(): void {
    switch (this.chartRange) {
      case CHART_RANGES.week:
        this.getWeekRange();
        break;
      case CHART_RANGES.month:
        this.setMonthRange();
        break;
    }
  }

  private getWeekRange(): void {
    const { dateMin, dateMax, dateRange } = this.utilService.getWeekRangeStr(this.selectedDate);
    this.dateMin = dateMin;
    this.dateMax = dateMax;
    this.dateRange = dateRange;
  }

  private setMonthRange(): void {
    const parsed = this.utilService.parseYYYYMMDD(this.selectedDate);
    const year = parsed.getFullYear();
    const month = parsed.getMonth();
    this.dateMin = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    this.dateMax = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    this.dateRange = new DateRange(this.dateMin, this.dateMax);
  }

  async openAnthropometryModal(): Promise<void> {
    const modalResult = await this.ionicUtilService.showModal({
      component: AnthropometryModalComponent,
      componentProps: {
        selectedDate: this.selectedDate,
        existingData: this.currentAnthropometry,
        allAnthropometryData: this.allAnthropometryData,
      },
      cssClass: 'fullscreen-modal',
    });

    if (modalResult.role === 'saved') {
      const savedAnthropometry = modalResult.data as Anthropometry | undefined;

      if (savedAnthropometry) {
        this.upsertAnthropometryData(savedAnthropometry);
        this.weightCalendar?.upsertWeightForDate(
          savedAnthropometry.date,
          savedAnthropometry.weight,
          savedAnthropometry.notes
        );
      }

      this.weightCalendar?.refreshDietDaysForMonth();
      this.loadAnthropometryData();
    }
  }

  private upsertAnthropometryData(anthropometry: Anthropometry): void {
    const existingIndex = this.allAnthropometryData.findIndex(
      (item) => item.date === anthropometry.date
    );

    if (existingIndex >= 0) {
      this.allAnthropometryData = this.allAnthropometryData.map((item, index) =>
        index === existingIndex ? anthropometry : item
      );
    } else {
      this.allAnthropometryData = [...this.allAnthropometryData, anthropometry];
    }

    this.allAnthropometryData = [...this.allAnthropometryData].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    this.currentAnthropometry =
      anthropometry.date === this.selectedDate
        ? anthropometry
        : this.allAnthropometryData.find((a) => a.date === this.selectedDate) || null;
    this.currentNotes = this.currentAnthropometry?.notes;
    this.cdref.detectChanges();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }
}
