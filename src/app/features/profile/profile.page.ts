import { Component, OnInit, effect, inject } from '@angular/core';
import { Browser } from '@capacitor/browser';
import {
  AlertButton,
  AlertOptions,
  ModalController,
  ModalOptions,
  Platform,
  ToastOptions,
} from '@ionic/angular';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { CustomExercise } from 'src/app/core/models/customExercise';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { Diet } from 'src/app/core/models/diet';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import {
  CHART_RANGES,
  CHART_RANGES_TYPES,
  CHART_RANGES_VALUES,
} from 'src/app/features/diet-days/components/weight-info/constants/chartRanges';
import { DayWeight } from 'src/app/features/diet-days/components/weight-info/models/dayWeight';
import { CALCULATOR_VALUES } from 'src/app/shared/constants/calculators';
import { INFO } from 'src/app/shared/constants/info';
import { LINKS } from 'src/app/shared/constants/links';
import {
  SOCIAL_NETWORKS,
  SOCIAL_NETWORK_TYPE,
  SOCIAL_NETWORK_TYPES,
  SOCIAL_NETWORK_VALUES,
} from 'src/app/shared/constants/social-network';
import { STEPS_VALUES } from 'src/app/shared/constants/steps';
import {
  TRAINING_TYPE,
  calculateTrainingValues,
} from 'src/app/shared/constants/training';
import { DateRange } from 'src/app/shared/models/dateRange';
import { MacrosBars, MacrosData } from 'src/app/shared/models/macros-data';
import { THEMES, Theme } from 'src/app/shared/models/theme';
import { GROUPS_VALUES } from './models/groups';
import { TABLE_GROUPS, TABLE_GROUPS_VALUES } from './models/tableGroups';
import { EditorPage } from './components/configuration/components/editor/editor.page';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user: User;
  public dietInUse: Diet;
  public tableInUse: Table;
  public workoutInUse: Workout;
  public dietDay: DietDay;

  public kcalCirclePercentage: number;

  public dailySteps: number;

  public isWorkoutInUseEnded: boolean;
  public completedExercises: number = 0;

  public prevWeightAverage: number;
  public currWeightAverage: number;

  public objetiveMessage: string;
  public iconArrowObjetive: string;
  public colorObjetive: string;

  public isDietDayCompleted: boolean;
  public dietDay$: Subscription;

  public dietDays: DietDay[] = [];
  public daysWeight: DayWeight[] = [];

  public macrosData = new MacrosData();
  public macrosBars: MacrosBars;

  public label = 'Pasos';
  public labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  public chartRange: string;
  public indexCurrentDate: number;
  public pointRadius: number;
  public prevWeekDateRange: DateRange;
  public currWeekDateRange: DateRange;
  public prevDietDayWeights: number[];
  public currDietDayWeights: number[];
  private lastDietWeightsFetchKey?: string;

  public kcalChartConfig: any;
  public proteinChartConfig: any;
  public carbohydratesChartConfig: any;
  public fatChartConfig: any;

  public selectedGroup: string = CHART_RANGES_TYPES.week;

  public chartMacros: Chart;

  public theme: Theme;
  public THEMES = THEMES;

  public CALCULATOR_VALUES = CALCULATOR_VALUES;

  public GROUPS_VALUES = GROUPS_VALUES;

  public CHART_RANGES = CHART_RANGES;
  public CHART_RANGES_VALUES = CHART_RANGES_VALUES;

  public selectedWorkoutGroup: string = TABLE_GROUPS.workout;
  public TABLE_GROUPS = TABLE_GROUPS;
  public TABLE_GROUPS_VALUES = TABLE_GROUPS_VALUES;

  public INFO = INFO;

  public SOCIAL_NETWORKS = SOCIAL_NETWORKS;
  public SOCIAL_NETWORK_TYPES = SOCIAL_NETWORK_TYPES;
  public SOCIAL_NETWORK_VALUES = SOCIAL_NETWORK_VALUES;

  public LINKS = LINKS;

  public STEPS_VALUES = STEPS_VALUES;
  public TRAINING_TYPE_VALUES: TRAINING_TYPE[] = [];

  // Inyección de servicios con Signals
  private readonly userService = inject(UserService);
  private readonly tableService = inject(TableService);
  private readonly workoutService = inject(WorkoutService);

  constructor(
    public utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private themeService: ThemeService,
    private dietDayService: DietDayService,
    private navigationService: NavigationService,
    public platform: Platform,
    private adMobService: AdMobService
  ) {
    // Effect para el usuario
    effect(() => {
      const resUser = this.userService.localUser();
      if (resUser) {
        this.user = resUser;
        this.initTrainingValues();
        this.setObjetiveMessage();
        this.setWeekRanges();
        this.setDietDaysWeights();
      }
    });

    // Effect para la tabla actual
    effect(() => {
      this.tableInUse = this.tableService.currentTable();
    });

    // Effect para el workout actual
    effect(() => {
      const resCurrentWorkout = this.workoutService.currentWorkoutSignal();
      if (
        this.user?.workoutInUse !== undefined &&
        this.user?.workoutInUse === resCurrentWorkout?._id
      ) {
        // Hay un entrenamiento activamente en uso
        this.workoutInUse = resCurrentWorkout;
        this.completedExercises = this.workoutInUse?.exercises.reduce(
          (acc, curr) => acc + (this.isExerciseDoned(curr) ? 1 : 0),
          0
        );
        this.isCurrentWorkoutEnded();
      } else {
        // No hay entrenamiento activo - solo mostrar rutina si existe
        this.workoutInUse = undefined;
        this.completedExercises = 0;
        this.isWorkoutInUseEnded = false;
      }
    });
  }

  public ngOnInit(): void {
    this.initVariables();
  }

  public ionViewWillEnter(): void {
    this.setWeekRanges();
    this.setDietDaysWeights();

    if (this.user && !this.user.isPremium) {
      this.adMobService.interstitial();
    }
  }

  public ionViewWillLeave(): void {
  }

  public showAlertInfo(): void {
    let message: string = 'Objetivo mantener peso';

    if (this.user.objetive !== 0)
      message =
        this.user.objetive > 0
          ? `Objetivo de superávit calórico de ${this.user.objetive} kcal`
          : `Objetivo de déficit calórico de ${this.user.objetive} kcal`;

    const toastOptions: ToastOptions = {
      message: message,
      duration: 2000,
    };

    this.ionicUtilService.showToast(toastOptions);
  }

  public showInfo(info: string): void {
    const toastOptions: ToastOptions = {
      message: info,
      duration: 1000,
    };
    this.ionicUtilService.showToast(toastOptions);
  }

  public getUserAge(): number {
    if (!this.user?.birth) return 0;

    const birthDate = new Date(this.user.birth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  public getStepsDescription(): string {
    if (!this.user?.steps) return '';
    const stepOption = STEPS_VALUES.find((s) => s.value === this.user.steps);
    return stepOption ? stepOption.name : '';
  }

  public getTrainingDescription(): string {
    if (!this.user) return 'No configurado';

    const steps = this.user.steps || 1.37;
    const training = this.user.training || 1.0;

    const trainingValues = calculateTrainingValues(steps);
    if (!trainingValues) return 'No configurado';

    const trainingOption = Object.values(trainingValues).find(
      (t) => t.value === training
    );
    return trainingOption ? trainingOption.name : 'No configurado';
  }

  private initTrainingValues(): void {
    if (this.user?.steps) {
      const trainingValues = calculateTrainingValues(this.user.steps);
      if (trainingValues) {
        Object.assign(this.TRAINING_TYPE_VALUES, Object.values(trainingValues));
      }
    }
  }

  getWeightChangeClass(current: number, previous: number): string {
    if (!current || !previous) return '';

    if (current < previous) return 'positive';
    if (current > previous) return 'negative';
    return '';
  }

  getWeightChangeText(current: number, previous: number): string {
    if (!current || !previous) return '';

    const diff = current - previous;
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(2)}kg`;
  }

  getWeightChangeIcon(current: number, previous: number): string {
    if (!current || !previous) return '';

    if (current < previous) return '↓ ';
    if (current > previous) return '↑ ';
    return '→ ';
  }

  getWeightTrendClass(period: 'week' | 'month'): string {
    const current = this.currWeightAverage || 0;
    const previous = this.prevWeightAverage || 0;

    if (current < previous) return 'trend-positive';
    if (current > previous) return 'trend-negative';
    return 'trend-neutral';
  }

  getWeightTrendValue(period: 'week' | 'month'): string {
    const current = this.currWeightAverage || 0;
    const previous = this.prevWeightAverage || 0;
    const diff = current - previous;

    if (period === 'month') {
      const monthlyDiff = diff * 4;
      const sign = monthlyDiff > 0 ? '+' : '';
      return `${sign}${monthlyDiff.toFixed(2)}kg`;
    }

    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(2)}kg`;
  }

  getTodayWeight(): number {
    if (this.dietDay && this.dietDay.weight) {
      return this.dietDay.weight;
    }
    return 0;
  }

  getWeeklyDifference(): string {
    const diff = this.getWeeklyDifferenceValue();
    return diff >= 0 ? '+' : '-';
  }

  getWeeklyDifferenceValue(): number {
    const current = this.currWeightAverage || 0;
    const previous = this.prevWeightAverage || 0;
    return current - previous;
  }

  Math = Math;

  public getCurrentPlayingSplit(): number {
    return this.utilService.getCurrentPlayingSplit(this.tableInUse);
  }

  private initVariables(): void {
    this.macrosBars = {
      hideMinKcal: true,
      hideMaxKcal: true,
    };
    this.chartRange = CHART_RANGES.week;
    this.setUser();
    this.getTable();
    this.getCurrentWorkout();
    this.getCurrentDietDay();
    this.setTheme();
  }

  private setUser(): void {
    // Ya gestionado por effect en el constructor
  }

  private setObjetiveMessage(): void {
    if (this.user) {
      if (this.user.objetive > 0) {
        this.objetiveMessage = 'Superávit calórico';
        this.iconArrowObjetive = 'caret-up-outline';
        this.colorObjetive = 'success';
      } else if (this.user.objetive < 0) {
        this.objetiveMessage = 'Déficit calórico';
        this.iconArrowObjetive = 'caret-down-outline';
        this.colorObjetive = 'danger';
      } else {
        this.objetiveMessage = 'Mantenimiento';
        this.iconArrowObjetive = 'chevron-collapse-outline';
        this.colorObjetive = 'tertiary';
      }
    }
  }

  private setTheme(): void {
    this.themeService.theme.subscribe((resTheme: Theme) => {
      if (resTheme) this.theme = resTheme;
    });
  }

  private initCharts(): void {
    this.kcalChartConfig = {
      percent: this.kcalCirclePercentage,
      backgroundColor: 'transparent',
      radius: 40,
      maxPercent: 100,
      units: ' %',
      unitsColor: 'var(--ion-color-light-contrast)',
      outerStrokeWidth: 6,
      outerStrokeColor: 'var(--ion-color-primary)',
      innerStrokeColor: 'var(--ion-color-secondary)',
      titleColor: 'var(--ion-color-light-contrast)',
      subtitleColor: '#483500',
      titleFontSize: '15',
      titleFontWeight: '800',
      unitsFontWeight: '800',
      showSubtitle: false,
      responsive: true,
      showInnerStroke: true,
      startFromZero: true,
    };

    this.proteinChartConfig = {
      radius: 30,
      percent: this.proteinPercentage,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'UI',
      animateTitle: false,
      animationDuration: 0,
      showUnits: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
      responsive: true,
    };
    this.carbohydratesChartConfig = {
      radius: 30,
      percent: this.carbohydratesPercentage,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'UI',
      animateTitle: false,
      animationDuration: 0,
      showUnits: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
      responsive: true,
    };
    this.fatChartConfig = {
      radius: 30,
      percent: this.fatPercentage,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'UI',
      animateTitle: false,
      animationDuration: 0,
      showUnits: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
      responsive: true,
    };
  }

  public chartRangeChange(group: string): void {
    this.chartRange = group;
    this.selectedGroup = group;
  }

  public isExerciseDoned(customExercise: CustomExercise) {
    return !!!customExercise.sets.find((setTemp) => !setTemp.doned);
  }

  private getMacrosPercentages(): void {
    this.kcalCirclePercentage = Math.floor(
      this.calculatePercentage(this.macrosData.kcal, this.user.kcalTotal)
    );
  }

  public calculatePercentage(current: number, max: number): number {
    return (current * 100) / max;
  }

  public setDietInfo(): void {
    this.macrosData = new MacrosData();

    this.dietDay?.meals.forEach((mealTemp) => {
      mealTemp.kcal = 0;
      mealTemp.protein = 0;
      mealTemp.carbohydrate = 0;
      mealTemp.fat = 0;

      mealTemp.customProducts.forEach((productTemp) => {
        this.calculateMacros100g(mealTemp, productTemp);
      });

      this.macrosData.kcal += mealTemp.kcal;
      this.macrosData.protein += mealTemp.protein;
      this.macrosData.carbohydrate += mealTemp.carbohydrate;
      this.macrosData.fat += mealTemp.fat;
    });
  }

  private calculateMacros100g(mealTemp: Meal, customProduct: CustomProduct) {
    let energy100 =
      customProduct.energyKcal100g ?? customProduct.product?.energyKcal100g ?? 0;
    mealTemp.kcal += (energy100 * customProduct.quantity) / 100 || 0;

    let protein100 =
      customProduct.protein100g ?? customProduct.product?.protein100g ?? 0;
    mealTemp.protein += (protein100 * customProduct.quantity) / 100 || 0;

    let carbohydrates100 =
      customProduct.carbohydrates100g ??
      customProduct.product?.carbohydrates100g ??
      0;
    mealTemp.carbohydrate +=
      (carbohydrates100 * customProduct.quantity) / 100 || 0;

    let fat100g = customProduct.fat100g ?? customProduct.product?.fat100g ?? 0;
    mealTemp.fat += (fat100g * customProduct.quantity) / 100 || 0;
  }

  public toggleColor(event): void {
    this.themeService.toggleColorMode(event.detail.value);
  }

  public async playStopDiet(diet: Diet) {
    const buttons: AlertButton[] = [
      {
        text: 'CANCELAR',
        role: 'cancel',
      },
      {
        text: 'OK',
        cssClass: 'alert-button-primary',
        handler: () => {
          this.activeDiet();
        },
      },
    ];
    const alertInput: AlertOptions = {
      header: diet.name,
      message: 'Dejar de seguir dieta',
      buttons: buttons,
    };
    await this.ionicUtilService.showAlert(alertInput);
  }

  public activeDiet() {
    this.userService
      .playStopDiet(this.user._id, this.user.dietInUse)
      .subscribe((resUser) => (this.user = resUser));
  }

  public edit(): void {
    const modal: ModalOptions = {
      component: EditorPage,
    };
    this.ionicUtilService.showModal(modal);
  }

  public navigateSocialNetwork(socialNetwork: SOCIAL_NETWORK_TYPE): void {
    window.location.href = socialNetwork.url;
  }

  public goToCalculatorList(): void {
    this.navigationService.goToCalculatorList();
  }

  public getAge(birth: Date) {
    return this.userService.getAge(birth);
  }

  private getCurrentDietDay() {
    if (this.user?.dietInUse) {
      const today = new Date();

      if (this.dietDay$) this.dietDay$.unsubscribe();

      this.dietDayService
        .getDietDayByIdDietAndDate(this.user.dietInUse, today)
        .subscribe((resDietDay) => {
          if (resDietDay) this.dietDay = resDietDay;
          else this.dietDay = this.dietDayService.getStandardDietDay(today);

          this.dietDayService.setCurrentDietDay = resDietDay;

          this.dietDayService.getCurrentDietDay.subscribe((resDietDay) => {
            this.dietDay = resDietDay;
            this.setDietInfo();
            this.getMacrosPercentages();
            this.initCharts();
            if (
              this.macrosData.protein ||
              this.macrosData.carbohydrate ||
              this.macrosData.fat
            )
              this.initChartMacros();
            this.checkDietDayCompleted();
          });
        });
    }
  }

  private getCurrentWorkout(): void {
    // Ya gestionado por effect en el constructor
  }

  private getTable(): void {
    // Ya gestionado por effect en el constructor
  }

  public goToConfiguration(): void {
    this.navigationService.goToConfiguration();
  }

  public goToWeightInfo(): void {
    this.navigationService.goToWeightInfo();
  }

  public async goToStatistics(): Promise<void> {
    if (this.user.isPremium) {
      this.navigationService.goToStatistics();
      return;
    }

    const alertOptions: AlertOptions = {
      header: 'Estadísticas Premium',
      message:
        'Mira un breve anuncio para desbloquear el acceso a tus estadísticas detalladas.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-primary',
        },
        {
          text: 'Ver Anuncio',
          cssClass: 'alert-button-success',
          handler: () => {
            this.adMobService
              .interstitial()
              .then(() => {
                this.navigationService.goToStatistics();
              })
              .catch((err) => {
                console.error('Error al mostrar anuncio intersticial', err);
                this.navigationService.goToStatistics();
              });
          },
        },
      ],
    };

    await this.ionicUtilService.showAlert(alertOptions);
  }

  public openReferences(): void {
    this.navigationService.goToReferences();
  }

  public isCurrentWorkoutEnded(): void {
    if (this.workoutInUse) {
      let workoutsEnded: boolean[] = [];
      this.workoutInUse.exercises.forEach((exerciseTemp) => {
        workoutsEnded.push(this.isExerciseDoned(exerciseTemp));
      });

      this.isWorkoutInUseEnded = !workoutsEnded.includes(false);
    } else this.isWorkoutInUseEnded = false;
  }

  public checkDietDayCompleted() {
    this.isDietDayCompleted =
      this.kcalCirclePercentage >= 100 &&
      this.proteinPercentage >= 100 &&
      this.carbohydratesPercentage >= 100 &&
      this.fatPercentage >= 100;
  }

  public async openAboutUs(): Promise<void> {
    await Browser.open({ url: 'https://www.trainfit.net/index.html#about' });
  }

  public getISODate(workoutDate: Date): string {
    return workoutDate ? new Date(workoutDate).toISOString() : undefined;
  }

  public changeWorkoutDate(workout: Workout, dateISO) {
    workout.date = new Date(dateISO);
    this.workoutService.modifyWorkout(workout).subscribe();
  }

  public goToSummary(): void {
    this.navigationService.goToTabsSummaryPage();
  }

  public goToDiets(): void {
    this.navigationService.goToTabsDietsPage();
  }

  private setWeekRanges(): void {
    const prevDate = new Date(new Date().setDate(new Date().getDate() - 7));
    const currDate = new Date(new Date().setDate(new Date().getDate()));
    this.prevWeekDateRange = this.utilService.getWeekRange(prevDate).dateRange;
    this.currWeekDateRange = this.utilService.getWeekRange(currDate).dateRange;
  }

  public setDietDayWeightsAverages(): void {
    this.prevWeightAverage = Number(
      this.utilService.average(this.prevDietDayWeights).toFixed(2)
    );
    this.currWeightAverage = Number(
      this.utilService.average(this.currDietDayWeights).toFixed(2)
    );
  }

  private setDietDaysWeights(): void {
    if (this.user?.dietInUse) {
      if (!this.prevWeekDateRange || !this.currWeekDateRange) {
        return;
      }

      const currentFetchKey = [
        this.user.dietInUse,
        this.prevWeekDateRange?.minDate,
        this.prevWeekDateRange?.maxDate,
        this.currWeekDateRange?.minDate,
        this.currWeekDateRange?.maxDate,
      ].join('|');

      if (this.lastDietWeightsFetchKey === currentFetchKey) {
        return;
      }

      this.lastDietWeightsFetchKey = currentFetchKey;

      const obs: Observable<number[]>[] = [
        this.dietDayService.getDietDaysWeightsBetweenDatesByIdDiet(
          this.user.dietInUse,
          this.prevWeekDateRange
        ),
        this.dietDayService.getDietDaysWeightsBetweenDatesByIdDiet(
          this.user.dietInUse,
          this.currWeekDateRange
        ),
      ];

      forkJoin(obs).subscribe(([resPrevWeights, resCurrWeights]) => {
        this.prevDietDayWeights = resPrevWeights;
        this.currDietDayWeights = resCurrWeights;
        this.setDietDayWeightsAverages();
      });
    }
  }

  private initChartMacros() {
    this.chartMacros?.destroy();

    const hasMacrosCanvas = !!document.getElementById('macros');
    if (!hasMacrosCanvas) {
      return;
    }

    const data: ChartData = {
      labels: ['P', 'CBH', 'G'],
      datasets: [
        {
          data: [
            this.macrosData.protein,
            this.macrosData.carbohydrate,
            this.macrosData.fat,
          ],
          borderColor: ['#419EFA', '#35FF1D', '#FFF51D'],
          backgroundColor: [
            'rgba(65, 158, 250, 0.2)',
            'rgba(53, 250, 29, 0.2)',
            'rgba(255, 245, 29,  0.2)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options: ChartOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    this.chartMacros = this.utilService.initChart(
      'macros',
      'bar',
      data,
      options
    );
  }

  // Nutrition section methods
  public showRemainingNutrition: boolean = false;

  public toggleNutritionView(): void {
    this.showRemainingNutrition = !this.showRemainingNutrition;
  }

  public getNutritionValue(): string {
    if (this.showRemainingNutrition) {
      const remaining = this.user.kcalTotal - this.macrosData.kcal;
      return Math.round(remaining).toLocaleString();
    } else {
      return Math.round(this.macrosData.kcal).toLocaleString();
    }
  }

  public getNutritionLabel(): string {
    if (this.showRemainingNutrition) {
      return 'restantes';
    } else {
      return `de ${Math.round(this.user.kcalTotal).toLocaleString()} kcal`;
    }
  }

  public getProteinValues(): string {
    if (this.showRemainingNutrition) {
      const remaining = this.user.proteinsGTotal - this.macrosData.protein;
      return `<strong>${Math.round(remaining)}g</strong>`;
    } else {
      return `<strong>${Math.round(
        this.macrosData.protein
      )}g</strong>/${Math.round(this.user.proteinsGTotal)}g`;
    }
  }

  public getCarbValues(): string {
    if (this.showRemainingNutrition) {
      const remaining =
        this.user.carbohydratesGTotal - this.macrosData.carbohydrate;
      return `<strong>${Math.round(remaining)}g</strong>`;
    } else {
      return `<strong>${Math.round(
        this.macrosData.carbohydrate
      )}g</strong>/${Math.round(this.user.carbohydratesGTotal)}g`;
    }
  }

  public getFatValues(): string {
    if (this.showRemainingNutrition) {
      const remaining = this.user.fatGTotal - this.macrosData.fat;
      return `<strong>${Math.round(remaining)}g</strong>`;
    } else {
      return `<strong>${Math.round(this.macrosData.fat)}g</strong>/${Math.round(
        this.user.fatGTotal
      )}g`;
    }
  }

  // Getter properties for percentages
  public get proteinPercentage(): number {
    return (this.macrosData.protein * 100) / this.user.proteinsGTotal;
  }

  public get carbohydratesPercentage(): number {
    return (this.macrosData.carbohydrate * 100) / this.user.carbohydratesGTotal;
  }

  public get fatPercentage(): number {
    return (this.macrosData.fat * 100) / this.user.fatGTotal;
  }

  // Methods to check if values exceed limits
  public isKcalExceeded(): boolean {
    return this.macrosData.kcal > this.user.kcalTotal;
  }

  public isProteinExceeded(): boolean {
    return this.macrosData.protein > this.user.proteinsGTotal;
  }

  public isCarbExceeded(): boolean {
    return this.macrosData.carbohydrate > this.user.carbohydratesGTotal;
  }

  public isFatExceeded(): boolean {
    return this.macrosData.fat > this.user.fatGTotal;
  }

  // Methods to get CSS classes for exceeded values
  public getKcalValueClass(): string {
    return this.isKcalExceeded() ? 'exceeded-value' : '';
  }

  public getProteinValueClass(): string {
    return this.isProteinExceeded() ? 'exceeded-value' : '';
  }

  public getCarbValueClass(): string {
    return this.isCarbExceeded() ? 'exceeded-value' : '';
  }

  public getFatValueClass(): string {
    return this.isFatExceeded() ? 'exceeded-value' : '';
  }

  /**
   * Obtiene las iniciales del nombre y apellido del usuario
   * @returns String con las iniciales (ej: "JP" para Juan Perez)
   */
  public getUserInitials(): string {
    if (!this.user || !this.user.name) {
      return '';
    }

    const firstName = this.user.name.trim();
    const lastName = this.user.lastname ? this.user.lastname.trim() : '';

    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  }
}
