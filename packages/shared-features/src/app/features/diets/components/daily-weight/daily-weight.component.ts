import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastOptions } from '@ionic/angular';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { DietDay } from 'src/app/core/models/dietDay';
import { User } from 'src/app/core/models/user';
import { AnthropometryService } from 'src/app/core/services/anthropometry/anthropometry.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import {
  shake,
  STATE_ACTIVE,
  STATE_INACTIVE,
} from 'src/app/shared/animations/shake';
import { WEEK_DAYS } from 'src/app/shared/constants/week-days';
import { DateRange } from 'src/app/shared/models/dateRange';
import { Anthropometry } from '../../../diet-days/components/weight-info/models/anthropometry';

@Component({
  selector: 'app-daily-weight',
  templateUrl: './daily-weight.component.html',
  styleUrls: ['./daily-weight.component.scss'],
  animations: [shake],
})
export class DailyWeightComponent implements OnInit, OnChanges {
  @Input()
  public user: User;
  @Input()
  public selectedDate: string;
  @Input()
  public anthropometry: Anthropometry | null = null;

  @Output()
  public createdDietDay = new EventEmitter();
  @Output()
  public scrollToBottom = new EventEmitter<void>();
  @Output()
  public anthropometrySaved = new EventEmitter<Anthropometry>();

  public dietDay: DietDay;
  public firstWeekDay: Date;
  public lastWeekDay: Date;
  public week: DietDay[] = [];
  public weightForm: FormGroup;
  public chart: Chart;

  public shakeState = STATE_INACTIVE;
  public showSuccess: boolean = false;
  public showChart: boolean = false;

  public isLoad = true;
  private loadedWeekKey: string | null = null;

  constructor(
    private dietDayService: DietDayService,
    private anthropometryService: AnthropometryService,
    private utilService: UtilService,
    private navigationService: NavigationService,
    private ionicUtilService: IonicUtilService,
    private _utilService: UtilService
  ) {}

  public ngOnInit(): void {
    this.dietDayService.getCurrentDietDay.subscribe((resDietDay) => {
      this.dietDay = resDietDay;
      this.initForm();
      this.refreshWeekDataIfNeeded();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.anthropometry && !changes.anthropometry.firstChange) {
      this.initForm();
    }
    if (
      changes.selectedDate &&
      !changes.selectedDate.firstChange &&
      changes.selectedDate.currentValue !== changes.selectedDate.previousValue
    ) {
      this.loadedWeekKey = null;
      this.refreshWeekDataIfNeeded();
    }
  }

  private refreshWeekDataIfNeeded(): void {
    if (!this.selectedDate || !this.user?.dietInUse) {
      return;
    }

    const firstWeekDayStr = this._utilService.getFirstWeekDayStr(
      this.selectedDate,
      WEEK_DAYS.monday
    );

    if (this.loadedWeekKey === firstWeekDayStr) {
      return;
    }

    this.loadedWeekKey = firstWeekDayStr;
    this.getDietDaysWeightsOnWeek();
  }

  public saveWeight(): void {
    this.saveDayWeight(this.weightForm.get('weight').value);
  }

  public openWeightInfo(): void {
    this.navigationService.goToWeightInfo();
  }

  public startShakeAnimation(): void {
    this.shakeState =
      this.shakeState === STATE_INACTIVE ? STATE_ACTIVE : STATE_INACTIVE;
  }

  public toggleChart(): void {
    this.showChart = !this.showChart;

    // Si se muestra el gráfico, emitir evento para hacer scroll hacia abajo
    if (this.showChart) {
      setTimeout(() => {
        this.scrollToBottom.emit();
      }, 100);
    }
  }

  private initForm(): void {
    const weight =
      this.anthropometry?.weight ??
      (this.dietDay?.date === this.selectedDate ? this.dietDay?.weight : null);

    this.weightForm = new FormGroup({
      weight: new FormControl(weight ?? null),
    });
  }

  private initChart(): void {
    const weights = this.week.map((resWeek) =>
      resWeek.weight ? resWeek.weight : undefined
    );

    const minWeight = Math.floor(this.utilService.getMinNumber(weights) - 5);

    const labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const data: ChartData = {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: 'Peso semanal (Kg)',
          data: weights,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 2,
        },
      ],
    };

    const options: ChartOptions = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          min: minWeight,
        },
      },
    };

    if (this.chart) this.chart.destroy();

    this.chart = this.utilService.initChart(
      'dailyWeight',
      'bar',
      data,
      options
    );
  }

  private updateChart(weights: number[]): void {
    this.chart.data.datasets[0].data = weights;
    this.utilService.updateChart(this.chart);
  }

  private saveDayWeight(weight: number): void {
    this.isLoad = false;
    this.showSuccess = false;
    const parsedWeight = Number(weight);

    const message = 'Peso guardado';
    const duration = 500;
    const toastOptions: ToastOptions = { message, duration };

    if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
      this.isLoad = true;
      return;
    }

    this.anthropometryService
      .upsertAnthropometry({
        ...(this.anthropometry || {}),
        date: this.selectedDate,
        weight: parsedWeight,
      })
      .subscribe((anthropometry) => {
        this.anthropometry = anthropometry;
        if (this.dietDay) {
          this.dietDay.weight = anthropometry.weight;
        }
        this.updateWeightOnCurrentDate(anthropometry.weight);
        this.refreshWeekAfterSave();
        this.anthropometrySaved.emit(anthropometry);
        this.ionicUtilService.showToast(toastOptions);
        this.isLoad = true;
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 2000);
        setTimeout(() => this.createdDietDay.emit());
      });
  }

  private updateWeightOnCurrentDate(weight: number): void {
    const index = this.week.findIndex(
      (dietDayTemp) => dietDayTemp.date === this.selectedDate
    );
    if (index !== -1) {
      this.week[index].weight = weight;
    }
  }

  private refreshWeekAfterSave(): void {
    this.loadedWeekKey = null;
    this.getDietDaysWeightsOnWeek();
  }

  public getCheckIconName(): string {
    if (!this.isLoad) {
      return 'hourglass-outline';
    }
    if (this.showSuccess) {
      return 'checkmark-circle';
    }
    return 'checkmark-outline';
  }

  public getTrend(): string {
    if (this.week.length < 2) return 'stable';

    const currentWeight = this.week[this.week.length - 1]?.weight || 0;
    const previousWeight = this.week[this.week.length - 2]?.weight || 0;

    if (currentWeight > previousWeight) return 'up';
    if (currentWeight < previousWeight) return 'down';
    return 'stable';
  }

  public getTrendText(): string {
    const trend = this.getTrend();
    switch (trend) {
      case 'up':
        return 'Tendencia al alza';
      case 'down':
        return 'Tendencia a la baja';
      case 'stable':
      default:
        return 'Peso estable';
    }
  }

  private getDietDaysWeightsOnWeek(): void {
    const { dateMin, dateMax, dateRange } = this._utilService.getWeekRangeStr(
      this.selectedDate
    );
    this.loadedWeekKey = dateMin;
    this.firstWeekDay = this._utilService.parseYYYYMMDD(dateMin);
    this.lastWeekDay = this._utilService.parseYYYYMMDD(dateMax);

    this.dietDayService
      .getDietDaysBetweenDatesByIdDiet(
        this.user.dietInUse,
        dateRange
      )
      .subscribe((resDietsDay) => {
        this.week = this.dietDayService.getWeek(this.firstWeekDay, resDietsDay);
        // TODO: refactor ya que se llama dos veces a esta función
        if (!this.chart) this.initChart();
        else this.updateChart(this.week.map((resWeek) => resWeek.weight));
      });
  }
}
