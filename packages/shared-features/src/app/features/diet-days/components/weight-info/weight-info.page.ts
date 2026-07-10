import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DietDay } from 'src/app/core/models/dietDay';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { DayWeightService } from 'src/app/core/services/util/day-weight.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { fadeIn, fadeOut } from 'src/app/shared/animations/fade';
import { WEEK_DAYS } from 'src/app/shared/constants/week-days';
import { DateRange } from 'src/app/shared/models/dateRange';
import { CHART_RANGES } from './constants/chartRanges';
import { POINT_RADIUS } from './constants/point-radius';
import { DayWeight } from './models/dayWeight';
import { CalendarComponent } from 'src/app/features/diet-days/components/calendar/calendar.component';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

@Component({
  selector: 'app-weight-info',
  templateUrl: './weight-info.page.html',
  styleUrls: ['./weight-info.page.scss'],
  animations: [fadeIn, fadeOut],
})
export class WeightInfoPage {
  public selectedDate: string;
  public currentWeight: number | undefined;
  public currentNotes: string | undefined;
  public dietDay: DietDay | undefined;
  public get days(): string[] {
    return this.translate.instant('WEIGHT_INFO.DAYS');
  }
  public get months(): string[] {
    return this.translate.instant('WEIGHT_INFO.MONTHS');
  }

  public load = true;

  public dietDays: DietDay[] = [];
  public daysWeight: DayWeight[] = [];

  public dateMin: string;
  public dateMax: string;
  public dateRange: DateRange;

  public label: string;
  public labels: string[] = [];
  public weights: number[] = [];
  public weightsObjetive: number[] = [];
  public pointRadius: number;
  public indexCurrentDate: number;
  public chart: Chart;
  public average: number;

  public monthYear: string;

  public WEEK_DAYS: typeof WEEK_DAYS;
  public CHART_RANGES = CHART_RANGES;
  public chartRange: string;

  private translate = inject(TranslateService);

  constructor(
    private utilService: UtilService,
    private dietDayService: DietDayService,
    private dayWeightService: DayWeightService,
    private userService: UserService,
    private cdref: ChangeDetectorRef,
    private navigationService: NavigationService
  ) {
    this.selectedDate = this.utilService.formatDateToYYYYMMDD(new Date());
  }

  public ionViewWillEnter(): void {
    const d = this.utilService.parseYYYYMMDD(this.selectedDate);
    this.monthYear = `${this.months[d.getMonth()]} ${d.getFullYear()}`;
    this.chartRange = CHART_RANGES.week;
    this.getChartConfigurationByRange();
    this.getDietDays();
  }

  public chartRangeChange(event: any): void {
    const range = event.detail.value;
    if (range) {
      if (range === this.chartRange) {
        return;
      }

      this.chartRange = range;
      this.getChartConfigurationByRange();
      this.getDietDays();
    }
  }

  public getDietDays(): void {
    this.load = false;
    this.dietDayService
      .getDietDaysBetweenDatesByIdDiet(
        this.userService.getLocalUser.dietInUse,
        this.dateRange
      )
      .subscribe({
        next: (resDietsDay) => {
          if (this.chartRange === CHART_RANGES.year)
            this.getDietDaysWeightsMonthAverage(resDietsDay);
          else this.getDietDaysWeights(resDietsDay);
        },
        error: () => {
          this.dietDays = [];
          this.weights = [];
          this.currentWeight = undefined;
          this.currentNotes = undefined;
          this.load = true;
        },
      });
  }

  public selectDate(event: any): void {
    this.selectedDate = event.selectedDate;

    switch (this.chartRange) {
      case CHART_RANGES.week:
        this.weights = event.weekDays.map((dTemp) =>
          dTemp.weight ? dTemp.weight : undefined
        );

        const selectedWeekDay = event.weekDays.find(
          (wTemp) =>
            wTemp.date &&
            this.utilService.datesStrAreOnSameDay(
              this.utilService.formatDateToYYYYMMDD(wTemp.date),
              this.selectedDate
            )
        );

        this.currentWeight = selectedWeekDay?.weight;
        this.currentNotes = selectedWeekDay?.notes;

        break;
      case CHART_RANGES.month:
        this.weights = event.monthDays.map((dTemp) =>
          dTemp.weight ? dTemp.weight : undefined
        );

        const selectedMonthDay = event.monthDays.find(
          (wTemp) =>
            wTemp.date &&
            this.utilService.datesStrAreOnSameDay(
              this.utilService.formatDateToYYYYMMDD(wTemp.date),
              this.selectedDate
            )
        );

        this.currentWeight = selectedMonthDay?.weight;

        this.getAverage();

        this.currentNotes = selectedMonthDay?.notes;

        break;
    }

    this.initChart();

    this.cdref.detectChanges();
  }

  public setMonthYear(monthYear: string): void {
    this.monthYear = monthYear;
  }

  public setLoading(loading: boolean): void {
    this.load = !loading;
  }

  private initChart(): void {
    this.chart?.destroy();

    const data: ChartData = {
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          data: this.weights,
          pointBackgroundColor: (context) => {
            let index = context.dataIndex;
            return index == this.indexCurrentDate ? '#ffffff' : '#d4af37';
          },
          pointRadius: this.pointRadius,
          pointBorderColor: (context) => {
            let index = context.dataIndex;
            return index == this.indexCurrentDate ? '#d4af37' : '#f4d03f';
          },
          pointBorderWidth: 3,
          pointHoverRadius: this.pointRadius + 2,
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#d4af37',
          pointHoverBorderWidth: 4,
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderColor: '#d4af37',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const minWeight = Math.floor(
      this.utilService.getMinNumber(this.weights) - 5
    );

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(20, 20, 20, 0.9)',
          titleColor: '#d4af37',
          bodyColor: '#ffffff',
          borderColor: '#d4af37',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          titleFont: {
            size: 14,
            weight: 'bold',
          },
          bodyFont: {
            size: 12,
          },
          padding: 12,
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            display: true,
          },
          ticks: {
            color: '#ffffff',
            font: {
              size: 11,
            },
          },
        },
        y: {
          min: minWeight,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            display: true,
          },
          ticks: {
            color: '#ffffff',
            font: {
              size: 11,
            },
            callback: function (value) {
              return value + ' kg';
            },
          },
        },
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart',
      },
      elements: {
        point: {
          hoverRadius: 8,
        },
        line: {
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
        },
      },
    };

    this.chart = this.utilService.initChart('dayWeight', 'line', data, options);
  }

  public getChartConfigurationByRange(): void {
    const parsed = this.utilService.parseYYYYMMDD(this.selectedDate);
    switch (this.chartRange) {
      case CHART_RANGES.week:
        this.pointRadius = POINT_RADIUS.week;
        this.indexCurrentDate = parsed.getDay() - 1;
        this.label = this.translate.instant('WEIGHT_INFO.WEEKLY');
        this.getWeekRange();
        break;
      case CHART_RANGES.month:
        this.pointRadius = POINT_RADIUS.month;
        this.indexCurrentDate = parsed.getDate() - 1;
        this.label = this.translate.instant('WEIGHT_INFO.MONTHLY');
        this.setMonthRange();
        break;
      default:
        this.pointRadius = POINT_RADIUS.year;
        this.indexCurrentDate = parsed.getMonth();
        this.label = this.translate.instant('WEIGHT_INFO.YEARLY');
        this.setYearRange();
        break;
    }
  }

  private getWeekRange(): void {
    const { dateMin, dateMax, dateRange, labels } =
      this.utilService.getWeekRangeStr(this.selectedDate);

    this.dateMin = dateMin;
    this.dateMax = dateMax;
    this.dateRange = dateRange;
    this.labels = labels;
  }

  public getWeekOfMonth(): number {
    return this.utilService.getWeekOfMonthFromStr(this.selectedDate);
  }

  private setMonthRange(): void {
    const parsed = this.utilService.parseYYYYMMDD(this.selectedDate);
    const year = parsed.getFullYear();
    const month = parsed.getMonth();
    this.dateMin = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    this.dateMax = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    this.dateRange = new DateRange(this.dateMin, this.dateMax);
    this.labels = this.utilService.numberArray(lastDay);
  }

  private setYearRange(): void {
    const year = this.utilService.parseYYYYMMDD(this.selectedDate).getFullYear();
    this.dateMin = `${year}-01-01`;
    this.dateMax = `${year}-12-31`;
    this.dateRange = new DateRange(this.dateMin, this.dateMax);
    this.labels = this.translate.instant('WEIGHT_INFO.MONTHS_SHORT');
  }

  private getDietDaysWeights(dietDays: DietDay[]) {
    this.dietDays = [];
    const days: number = this.utilService.numberDaysBetweenStr(
      this.dateMin,
      this.dateMax
    );

    const dateMinParsed = this.utilService.parseYYYYMMDD(this.dateMin);

    for (let i = 0; i <= days; i++) {
      const date = new Date(
        new Date(dateMinParsed).setDate(dateMinParsed.getDate() + i)
      );
      const dateStr = this.utilService.formatDateToYYYYMMDD(date);

      const dietDay = dietDays.find(
        (dietDay) => dietDay.date === dateStr
      );

      if (dietDay?._id) {
        this.dietDays.push(dietDay);
      } else {
        const newDietDay = new DietDay();
        newDietDay.date = dateStr;
        this.dietDays.push(newDietDay);
      }
    }

    const currentDietDay = this.dietDays.find(
      (dietDayTemp) => dietDayTemp.date === this.selectedDate
    );

    this.dietDay = currentDietDay;
    this.currentWeight = currentDietDay?.weight;
    this.currentNotes = currentDietDay?.notes;

    this.getDayWeights();
    this.initChart();

    this.load = true;
  }

  private getDietDaysWeightsMonthAverage(dietDays: DietDay[]): void {
    const dateMinParsed = this.utilService.parseYYYYMMDD(this.dateMin);
    const dietDaysMap = new Map<string, DietDay>();
    dietDays.forEach((dd) => {
      if (dd?.date) dietDaysMap.set(dd.date, dd);
    });

    const lastDay = this.utilService.parseYYYYMMDD(this.dateMax).getDate();
    const dietDaysTemp: (DietDay | undefined)[] = [];

    for (let i = 0; i <= lastDay; i++) {
      const date = new Date(
        new Date(dateMinParsed).setDate(dateMinParsed.getDate() + i)
      );
      const dateStr = this.utilService.formatDateToYYYYMMDD(date);
      dietDaysTemp.push(dietDaysMap.get(dateStr));
    }

    // Inicializar arrays de 12 elementos para almacenar los valores y contadores de cada mes
    const sumasPorMes = Array.from({ length: 12 }, () => 0);
    const conteosPorMes = Array.from({ length: 12 }, () => 0);

    // Recorrer los datos y acumular los valores por mes
    dietDaysTemp.forEach((ddTemp) => {
      if (ddTemp && ddTemp.weight) {
        const fecha = new Date(ddTemp.date);
        const mes = fecha.getMonth(); // Obtener el mes (0 es Enero, 11 es Diciembre)

        sumasPorMes[mes] += ddTemp.weight;
        conteosPorMes[mes] += 1;
      }
    });

    // Calcular la media para cada mes, asegurando que los meses sin datos tengan 0
    const mediasPorMes = sumasPorMes.map((suma, mes) =>
      conteosPorMes[mes] > 0 ? suma / conteosPorMes[mes] : 0
    );

    this.weights = mediasPorMes;

    this.initChart();

    this.load = true;
  }

  private getDayWeights(): void {
    this.daysWeight = this.dayWeightService.getDayWeights(this.dietDays);
    this.weights = this.daysWeight.map((dayWeight) => dayWeight.weight);
    this.getAverage();
  }

  private getAverage(): void {
    this.average = Number(this.utilService.average(this.weights).toFixed(1));
  }

  public getDayOfWeek(dateStr: string): number {
    const d = this.utilService.parseYYYYMMDD(dateStr);
    return d.getDay() - 1;
  }

  public getTrend(): string {
    const actualWeights = this.weights.filter((w) => w !== undefined && w !== null);
    if (actualWeights.length < 2) return 'stable';
    const current = actualWeights[actualWeights.length - 1];
    const previous = actualWeights[actualWeights.length - 2];
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  }

  public getTrendText(): string {
    const trend = this.getTrend();
    switch (trend) {
      case 'up': return this.translate.instant('WEIGHT_INFO.TREND_UP');
      case 'down': return this.translate.instant('WEIGHT_INFO.TREND_DOWN');
      default: return this.translate.instant('WEIGHT_INFO.TREND_STABLE');
    }
  }

  public getTrendIcon(): string {
    const trend = this.getTrend();
    switch (trend) {
      case 'up': return 'trending-up-outline';
      case 'down': return 'trending-down-outline';
      default: return 'remove-outline';
    }
  }

  public goBack(): void {
    this.navigationService.goBack();
  }
}
