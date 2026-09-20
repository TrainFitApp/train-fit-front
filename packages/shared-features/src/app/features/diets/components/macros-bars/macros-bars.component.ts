import { Component, Input, OnDestroy, effect, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { User } from 'src/app/core/models/user';
import { NutritionalGoal } from 'src/app/core/models/nutritional-goal';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { NutritionalGoalService } from 'src/app/core/services/nutritional-goal/nutritional-goal.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { MacrosBars, MacrosData } from 'src/app/shared/models/macros-data';
import { Theme } from 'src/app/shared/models/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-macros-bars',
  templateUrl: './macros-bars.component.html',
  styleUrls: ['./macros-bars.component.scss'],
})
export class MacrosBarsComponent implements OnDestroy {
  @Input()
  public isFooterHidden!: boolean;

  @Input()
  public macrosBars: MacrosBars;

  @Input()
  public theme: Theme;

  @Input()
  public clickable: boolean = true;

  public user: User;
  public activeGoal: NutritionalGoal | null = null;

  // Con dieta pautada, la meta del día es lo que suma
  // lo pautado (dietDay.plannedTarget); sin pauta ese día, el objetivo en
  // uso de siempre.
  public get _kcalTotal(): number { return this.dietDay?.plannedTarget?.kcal || this.activeGoal?.kcalTotal || (this.user as any)?.kcalTotal || 0; }
  public get _proteinsGTotal(): number { return this.dietDay?.plannedTarget?.protein || this.activeGoal?.proteinsGTotal || (this.user as any)?.proteinsGTotal || 0; }
  public get _carbohydratesGTotal(): number { return this.dietDay?.plannedTarget?.carbs || this.activeGoal?.carbohydratesGTotal || (this.user as any)?.carbohydratesGTotal || 0; }
  public get _fatGTotal(): number { return this.dietDay?.plannedTarget?.fat || this.activeGoal?.fatGTotal || (this.user as any)?.fatGTotal || 0; }

  public macrosData: MacrosData = new MacrosData();

  public dietDay: DietDay;

  private dietDaySubscription: Subscription;

  // Inyección de servicios con signals
  private readonly userService = inject(UserService);
  private readonly nutritionalGoalService = inject(NutritionalGoalService);
  private readonly dietDayService = inject(DietDayService);
  private readonly navCtrl = inject(NavController);

  constructor() {
    // Effect para reaccionar a cambios en el usuario
    effect(() => {
      const updatedUser = this.userService.localUser();
      if (updatedUser) {
        this.user = updatedUser;
        this.loadActiveGoal();
        if (this.dietDay) {
          this.getDietInfo();
        }
      }
    });

    // Suscripción al dietDay actual
    this.dietDaySubscription = this.dietDayService.getCurrentDietDay.subscribe(
      (resDietDay) => {
        this.dietDay = resDietDay;
        if (this.dietDay) {
          setTimeout(() => {
            this.getDietInfo();
          }, 0);
        }
      }
    );
  }

  private loadActiveGoal(): void {
    if (this.user?.goalInUse) {
      const goal = this.nutritionalGoalService.getGoalById(this.user.goalInUse);
      if (goal) {
        this.activeGoal = goal;
      } else {
        this.nutritionalGoalService.refreshFromServer().subscribe((goals) => {
          this.activeGoal = goals.find((g) => g._id === this.user.goalInUse) || null;
        });
      }
    } else {
      this.activeGoal = null;
    }
  }

  public ngOnDestroy(): void {
    // Limpiar suscripción
    if (this.dietDaySubscription) {
      this.dietDaySubscription.unsubscribe();
    }
  }

  public calculateProgressBar(current: number, max: number) {
    return (current * 100) / max / 100;
  }

  public getDietInfo() {
    if (!this.dietDay) return;

    this.macrosData = new MacrosData();
    this.macrosData.kcal = this.dietDayService.getDietDayKcal(this.dietDay);
    this.macrosData.protein = this.dietDayService.getDietDayProteins(
      this.dietDay
    );
    this.macrosData.carbohydrate = this.dietDayService.getDietDayCarbohydrates(
      this.dietDay
    );
    this.macrosData.fat = this.dietDayService.getDietDayFat(this.dietDay);
  }

  public async openNutritionalObjectives(): Promise<void> {
    if (!this.clickable) return;
    await this.navCtrl.navigateForward(['/tabs/diets/nutritional-objectives']);
  }

  private calculateMacros100g(
    mealTemp: Meal,
    customProductTemp: CustomProduct
  ) {
    const energy100 =
      customProductTemp.energyKcal100g ??
      customProductTemp.product?.energyKcal100g ??
      0;
    const protein100 =
      customProductTemp.protein100g ??
      customProductTemp.product?.protein100g ??
      0;
    const carbs100 =
      customProductTemp.carbohydrates100g ??
      customProductTemp.product?.carbohydrates100g ??
      0;
    const fat100 =
      customProductTemp.fat100g ?? customProductTemp.product?.fat100g ?? 0;

    mealTemp.kcal +=
      (energy100 * customProductTemp.quantity) / 100 || 0;

    mealTemp.protein += (protein100 * customProductTemp.quantity) / 100 || 0;

    mealTemp.carbohydrate +=
      (carbs100 * customProductTemp.quantity) / 100 || 0;

    mealTemp.fat += (fat100 * customProductTemp.quantity) / 100 || 0;
  }
}

