import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { Location } from '@angular/common';
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
  public selectedDate: Date = new Date();
  public currentWeight: number | undefined;
  public currentNotes: string | undefined;
  public dietDay: DietDay | undefined;
  public days = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
  public months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  public load = true;

  public dietDays: DietDay[] = [];
  public daysWeight: DayWeight[] = [];

  public dateMin: Date;
  public dateMax: Date;
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

  constructor(
    private utilService: UtilService,
    private dietDayService: DietDayService,
    private dayWeightService: DayWeightService,
    private userService: UserService,
    private cdref: ChangeDetectorRef,
    private navigationService: NavigationService
  ) {}

  public ionViewWillEnter(): void {
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
            this.utilService.datesAreOnSameDay(wTemp.date, this.selectedDate)
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
            this.utilService.datesAreOnSameDay(wTemp.date, this.selectedDate)
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
    switch (this.chartRange) {
      case CHART_RANGES.week:
        this.pointRadius = POINT_RADIUS.week;
        this.indexCurrentDate = this.selectedDate.getDay() - 1;
        this.label = 'Peso semanal';
        this.getWeekRange();
        break;
      case CHART_RANGES.month:
        this.pointRadius = POINT_RADIUS.month;
        this.indexCurrentDate = this.selectedDate.getDate() - 1;
        this.label = 'Peso mensual';
        this.setMonthRange();
        break;
      default:
        this.pointRadius = POINT_RADIUS.year;
        this.indexCurrentDate = this.selectedDate.getMonth();
        this.label = 'Peso anual';
        this.setYearRange();
        break;
    }
  }

  private getWeekRange(): void {
    const { dateMin, dateMax, dateRange, labels } =
      this.utilService.getWeekRange(this.selectedDate);

    this.dateMin = dateMin;
    this.dateMax = dateMax;
    this.dateRange = dateRange;
    this.labels = labels;
  }

  public getWeekOfMonth(): number {
    return this.utilService.getWeekOfMonth(this.selectedDate);
  }

  private setMonthRange(): void {
    this.dateMin = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      1
    );
    this.dateMax = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      0
    );
    this.dateMax.setHours(23, 59, 59, 59);
    this.dateRange = new DateRange(this.dateMin, this.dateMax);
    //TODO: repetido
    const days = this.utilService.numberDaysBetween(this.dateMin, this.dateMax);
    this.labels = this.utilService.numberArray(days);
  }

  private setYearRange(): void {
    this.dateMin = new Date(this.selectedDate.getFullYear(), 0, 1);
    this.dateMax = new Date(this.selectedDate.getFullYear(), 11, 31);
    this.dateMax.setHours(23, 59, 59, 59);
    this.dateRange = new DateRange(this.dateMin, this.dateMax);
    this.labels = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
  }

  private getDietDaysWeights(dietDays: DietDay[]) {
    this.dietDays = [];
    const days: number = this.utilService.numberDaysBetween(
      this.dateMin,
      this.dateMax
    );

    for (let i = 0; i < days; i++) {
      const date = new Date(
        new Date(this.dateMin).setDate(new Date(this.dateMin).getDate() + i)
      );

      const dietDay = dietDays.find(
        (dietDay) => new Date(dietDay.date).getDate() === date.getDate()
      );

      if (dietDay?._id) {
        // if (!dietDay.weight) dietDay.weight = 0;
        this.dietDays.push(dietDay);
      } else {
        const newDietDay = new DietDay();
        newDietDay.date = date;
        // newDietDay.weight = 0;
        this.dietDays.push(newDietDay);
      }
    }

    const currentDietDay = this.dietDays.find((dietDayTemp) =>
      this.utilService.datesAreOnSameDay(
        new Date(dietDayTemp.date),
        this.selectedDate
      )
    );

    this.dietDay = currentDietDay;
    this.currentWeight = currentDietDay?.weight;
    this.currentNotes = currentDietDay?.notes;

    this.getDayWeights();
    this.initChart();

    this.load = true;
  }

  private getDietDaysWeightsMonthAverage(dietDays: DietDay[]): void {
    const days: number = this.utilService.numberDaysBetween(
      this.dateMin,
      this.dateMax
    );

    let dietDaysTemp: DietDay[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(
        new Date(this.dateMin).setDate(new Date(this.dateMin).getDate() + i)
      );

      const dietDay = dietDays.find(
        (dietDay) => new Date(dietDay.date).getDate() === date.getDate()
      );

      dietDaysTemp.push(dietDay);
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

  public goBack(): void {
    this.navigationService.goBack();
  }
}
