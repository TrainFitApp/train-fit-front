import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastOptions } from '@ionic/angular';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { DietDay } from 'src/app/core/models/dietDay';
import { User } from 'src/app/core/models/user';
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
import {
  numberRangeValidator,
  VALIDATION_LIMITS,
} from 'src/app/core/constants/validation-limits';

@Component({
  selector: 'app-daily-weight',
  templateUrl: './daily-weight.component.html',
  styleUrls: ['./daily-weight.component.scss'],
  animations: [shake],
})
export class DailyWeightComponent implements OnInit {
  @Input()
  public user: User;
  @Input()
  public selectedDate: Date;

  @Output()
  public createdDietDay = new EventEmitter();
  @Output()
  public scrollToBottom = new EventEmitter<void>();

  public dietDay: DietDay;
  public firstWeekDay: Date;
  public lastWeekDay: Date;
  public weeklyAverage: number;
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

  private refreshWeekDataIfNeeded(): void {
    if (!this.selectedDate || !this.user?.dietInUse) {
      return;
    }

    const firstWeekDay = this.utilService.getFirstWeekDay(
      this.selectedDate,
      WEEK_DAYS.monday
    );
    firstWeekDay.setHours(0, 0, 0, 0);
    const weekKey = firstWeekDay.toISOString();

    if (this.loadedWeekKey === weekKey) {
      return;
    }

    this.loadedWeekKey = weekKey;
    this.getDietDaysWeightsOnWeek();
  }

  public saveWeight(): void {
    if (this.weightForm.invalid) {
      this.ionicUtilService.showToast({
        message: 'Introduce un peso válido',
        duration: 2000,
      });
      return;
    }
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
    this.weightForm = new FormGroup({
      weight: new FormControl(this.dietDay ? this.dietDay.weight : null, [
        Validators.required,
        numberRangeValidator(
          VALIDATION_LIMITS.profile.weightMin,
          VALIDATION_LIMITS.profile.weightMax
        ),
      ]),
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

    const message = 'Peso guardado';
    const duration = 500;
    const toastOptions: ToastOptions = { message, duration };

    if (this.dietDay._id) {
      this.dietDay.weight = weight;
      this.dietDayService
        .updateDietDay(this.dietDay)
        .subscribe((resDietDay) => {
          this.updateWeightOnCurrentDietDay(resDietDay);

          // Recalcular el promedio semanal localmente
          const weightsInWeek = this.week
            .map((d) => d.weight)
            .filter((w) => w !== null && w !== undefined);
          this.weeklyAverage =
            weightsInWeek.length > 0
              ? weightsInWeek.reduce((sum, w) => sum + w, 0) /
                weightsInWeek.length
              : 0;

          // Actualizar el gráfico con los datos locales
          this.updateChart(this.week.map((dietDayTemp) => dietDayTemp.weight));

          this.ionicUtilService.showToast(toastOptions);

          // Mostrar animación de éxito
          this.isLoad = true;
          this.showSuccess = true;

          // Resetear animación después de 2 segundos
          setTimeout(() => {
            this.showSuccess = false;
          }, 2000);
        });
    } else {
      this.dietDayService
        .createDayWeightOnNewDietDay(
          weight,
          this.user.dietInUse,
          this.selectedDate
        )
        .subscribe((resDietDay) => {
          this.dietDayService.setCurrentDietDay = resDietDay;

          // Añadir el nuevo dietDay a la semana local
          const dayOfWeek = this.selectedDate.getDay();
          const weekIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Lunes = 0, Domingo = 6
          this.week[weekIndex] = resDietDay;

          // Recalcular el promedio semanal localmente
          const weightsInWeek = this.week
            .map((d) => d.weight)
            .filter((w) => w !== null && w !== undefined);
          this.weeklyAverage =
            weightsInWeek.length > 0
              ? weightsInWeek.reduce((sum, w) => sum + w, 0) /
                weightsInWeek.length
              : 0;

          // Inicializar o actualizar el gráfico
          if (!this.chart) {
            this.initChart();
          } else {
            this.updateChart(this.week.map((resWeek) => resWeek.weight));
          }

          this.ionicUtilService.showToast(toastOptions);

          // Mostrar animación de éxito
          this.isLoad = true;
          this.showSuccess = true;

          // Resetear animación después de 2 segundos
          setTimeout(() => {
            this.showSuccess = false;
          }, 2000);

          setTimeout(() => this.createdDietDay.emit());
        });
    }
  }

  private updateWeightOnCurrentDietDay(dietDay: DietDay): void {
    const index = this.week.findIndex(
      (dietDayTemp) => dietDayTemp._id === dietDay._id
    );
    if (index !== -1) {
      this.week[index].weight = dietDay.weight;
    }
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
    this.firstWeekDay = this.utilService.getFirstWeekDay(
      this.selectedDate,
      WEEK_DAYS.monday
    );
    this.firstWeekDay.setHours(0, 0, 0, 0);
    this.lastWeekDay = new Date(
      new Date(this.firstWeekDay).setDate(this.firstWeekDay.getDate() + 6)
    );
    this.lastWeekDay.setHours(23, 59, 59, 59);

    this.dietDayService
      .getDietDaysBetweenDatesByIdDiet(
        this.user.dietInUse,
        new DateRange(this.firstWeekDay, this.lastWeekDay)
      )
      .subscribe((resDietsDay) => {
        this.week = this.dietDayService.getWeek(this.firstWeekDay, resDietsDay);
        this.weeklyAverage =
          this.dietDayService.getWeekWeightAverage(resDietsDay);

        // TODO: refactor ya que se llama dos veces a esta función
        if (!this.chart) this.initChart();
        else this.updateChart(this.week.map((resWeek) => resWeek.weight));
      });
  }
}
