import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DietDay } from 'src/app/core/models/dietDay';
import { User } from 'src/app/core/models/user';
import { NutritionalGoal } from 'src/app/core/models/nutritional-goal';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { NutritionalGoalService } from 'src/app/core/services/nutritional-goal/nutritional-goal.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { NutritionalData } from 'src/app/shared/models/nutritional-data';

interface NutrientItem {
  n: string;
  v: number;
  g: number;
  u: string;
  t?: string;
}

@Component({
  selector: 'app-nutritional-objectives',
  templateUrl: './nutritional-objectives.component.html',
  styleUrls: ['./nutritional-objectives.component.scss'],
})
export class NutritionalObjectivesComponent implements OnInit, OnDestroy {
  @Input() dietDay: DietDay;
  @Input() user: User;

  public nutritionalData: NutritionalData = new NutritionalData();
  public activeGoal: NutritionalGoal | null = null;
  public goals: NutritionalGoal[] = [];

  public get kcalTotal(): number | null { return this.activeGoal?.kcalTotal ?? null; }
  public get proteinsGTotal(): number | null { return this.activeGoal?.proteinsGTotal ?? null; }
  public get carbohydratesGTotal(): number | null { return this.activeGoal?.carbohydratesGTotal ?? null; }
  public get fatGTotal(): number | null { return this.activeGoal?.fatGTotal ?? null; }

  private navCtrl = inject(NavController);
  private dietDayService = inject(DietDayService);
  private nutritionalGoalService = inject(NutritionalGoalService);
  private recipeService = inject(RecipeService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);
  private dietDaySub?: Subscription;

  public kcalRemainingPrefix = '';
  public kcalRemainingValue = '';
  public kcalRemainingSuffix = '';
  public kcalExceededPrefix = '';
  public kcalExceededValue = '';
  public kcalExceededSuffix = '';
  public minerals: NutrientItem[] = [];
  public vitamins: NutrientItem[] = [];
  public otherNutrients: NutrientItem[] = [];

  // Reference values (RDA/AI) in grams
  public references = {
    fiber: 30,
    sugar: 50,
    salt: 5,
    sodium: 2,
    cholesterol: 0.3,
    saturatedFat: 20,
    calcium: 1,
    iron: 0.018,
    magnesium: 0.4,
    phosphorus: 0.7,
    potassium: 3.5,
    zinc: 0.011,
    copper: 0.0009,
    manganese: 0.0023,
    selenium: 0.000055,
    iodine: 0.00015,
    vitaminA: 0.0009,
    vitaminD: 0.000015,
    vitaminE: 0.015,
    vitaminK: 0.00012,
    vitaminC: 0.09,
    vitaminB1: 0.0012,
    vitaminB2: 0.0013,
    vitaminB3: 0.016,
    vitaminB5: 0.005,
    vitaminB6: 0.0013,
    vitaminB9: 0.0004,
    vitaminB12: 0.0000024,
    biotin: 0.00003,
  };

  public animateBars = false;
  public isLoading = false;
  private readonly hideTabsClass = 'hide-tabs';

  ngOnInit() {
    this.user = this.user ?? ({} as User);

    const localUser = this.userService.localUser();
    if (!this.user?._id && localUser) {
      this.user = localUser;
    }

    if (!this.user?._id) {
      const authUser = this.authService.user;
      if (authUser?._id) {
        this.user = authUser as User;
      }
    }

    this.dietDaySub = this.dietDayService.getCurrentDietDay.subscribe((day) => {
      if (!this.dietDay && day) {
        this.dietDay = day;
      }
      this.calculateNutritionalData();
      this.buildNutrientArrays();
      this.updateCalorieText();
    });

    this.initializeGoals();

    setTimeout(() => {
      this.animateBars = true;
    }, 300);
  }

  private initializeGoals(): void {
    const goals = this.nutritionalGoalService.goals();
    if (goals.length) {
      this.goals = goals;
      this.setActiveGoal(goals);
      this.afterGoalReady();
    } else {
      this.nutritionalGoalService.loadGoals().subscribe({
        next: (loaded) => {
          this.goals = loaded;
          this.setActiveGoal(loaded);
          this.afterGoalReady();
        },
        error: (err) => {
          console.error('[NUTRITIONAL_OBJECTIVES] Failed to load goals:', err);
        },
      });
    }
  }

  private setActiveGoal(goals: NutritionalGoal[]): void {
    const match = this.user?.goalInUse
      ? goals.find((g) => g._id === this.user.goalInUse)
      : null;
    if (match) {
      this.activeGoal = match;
    } else {
      const withMacros = goals.find((g) => (g.kcalTotal ?? 0) > 0);
      this.activeGoal = withMacros || goals[0] || null;
    }
  }

  private afterGoalReady(): void {
    this.personalizeReferences();
    this.calculateNutritionalData();
    this.buildNutrientArrays();
    this.updateCalorieText();
  }

  ngOnDestroy(): void {
    this.showTabs();
    this.dietDaySub?.unsubscribe();
  }

  ionViewWillEnter(): void {
    this.hideTabs();
  }

  ionViewWillLeave(): void {
    this.showTabs();
  }

  private hideTabs(): void {
    document.body.classList.add(this.hideTabsClass);
  }

  private showTabs(): void {
    document.body.classList.remove(this.hideTabsClass);
  }

  private personalizeReferences() {
    const kcal = this.kcalTotal;
    if (!kcal) return;
    const isFemale = this.user.sex === 0; // SEX_TYPES.female = 0

    // 1. Fibra: 14g por cada 1000 kcal (Recomendación clínica estándar)
    this.references.fiber = parseFloat(((kcal / 1000) * 14).toFixed(1));

    // 2. Azúcar: Límite del 10% de la energía total (OMS)
    // 4 kcal por gramo de azúcar
    this.references.sugar = Math.round((kcal * 0.1) / 4);

    // 3. Grasas Saturadas: Límite del 10% de la energía total
    // 9 kcal por gramo de grasa
    this.references.saturatedFat = Math.round((kcal * 0.1) / 9);

    // 4. Hierro: Varía significativamente por sexo
    // Hombres: ~8mg | Mujeres fértiles: ~18mg
    this.references.iron = isFemale ? 0.018 : 0.008;

    // 5. Calcio: Aunque suele ser 1000mg, en adolescentes o +50 años sube a 1200mg
    // Por ahora lo dejamos en 1g (1000mg) como base sólida.
    this.references.calcium = 1;

    // 6. Colesterol: Límite estándar de 300mg
    this.references.cholesterol = 0.3;
  }

  private updateCalorieText() {
    if (this.kcalTotal == null) {
      this.kcalRemainingPrefix = '';
      this.kcalRemainingValue = '';
      this.kcalRemainingSuffix = '';
      this.kcalExceededPrefix = '';
      this.kcalExceededValue = '';
      this.kcalExceededSuffix = '';
      return;
    }
    const diff = this.kcalTotal - this.nutritionalData.energyKcal;
    const value = Math.abs(diff).toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (diff >= 0) {
      this.kcalRemainingPrefix = this.translate.instant('NUTRITIONAL_OBJECTIVES.KCAL_REMAINING_PREFIX');
      this.kcalRemainingValue = value;
      this.kcalRemainingSuffix = this.translate.instant('NUTRITIONAL_OBJECTIVES.KCAL_REMAINING_SUFFIX');
    } else {
      this.kcalExceededPrefix = this.translate.instant('NUTRITIONAL_OBJECTIVES.KCAL_EXCEEDED_PREFIX');
      this.kcalExceededValue = value;
      this.kcalExceededSuffix = this.translate.instant('NUTRITIONAL_OBJECTIVES.KCAL_EXCEEDED_SUFFIX');
    }
  }

  private buildNutrientArrays() {
    this.minerals = [
      { n: 'ADD_PRODUCT.CALCIUM', v: this.nutritionalData.calcium * 1000, g: this.references.calcium * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.IRON', v: this.nutritionalData.iron * 1000, g: this.references.iron * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.MAGNESIUM', v: this.nutritionalData.magnesium * 1000, g: this.references.magnesium * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.PHOSPHORUS', v: this.nutritionalData.phosphorus * 1000, g: this.references.phosphorus * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.POTASSIUM', v: this.nutritionalData.potassium * 1000, g: this.references.potassium * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.ZINC', v: this.nutritionalData.zinc * 1000, g: this.references.zinc * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.SODIUM', v: this.nutritionalData.sodium * 1000, g: this.references.sodium * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.COPPER', v: this.nutritionalData.copper * 1000, g: this.references.copper * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.MANGANESE', v: this.nutritionalData.manganese * 1000, g: this.references.manganese * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'ADD_PRODUCT.SELENIUM', v: this.nutritionalData.selenium * 1000000, g: this.references.selenium * 1000000, u: 'NUTRITIONAL_OBJECTIVES.MICROGRAMS' },
      { n: 'ADD_PRODUCT.IODINE', v: this.nutritionalData.iodine * 1000000, g: this.references.iodine * 1000000, u: 'NUTRITIONAL_OBJECTIVES.MICROGRAMS' },
    ];
    this.vitamins = [
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_A', v: this.nutritionalData.vitaminA * 1000000, g: this.references.vitaminA * 1000000, u: 'NUTRITIONAL_OBJECTIVES.MICROGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_C', v: this.nutritionalData.vitaminC * 1000, g: this.references.vitaminC * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_D', v: this.nutritionalData.vitaminD * 1000000, g: this.references.vitaminD * 1000000, u: 'NUTRITIONAL_OBJECTIVES.MICROGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_E', v: this.nutritionalData.vitaminE * 1000, g: this.references.vitaminE * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_K', v: this.nutritionalData.vitaminK * 1000000, g: this.references.vitaminK * 1000000, u: 'NUTRITIONAL_OBJECTIVES.MICROGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_B1', v: this.nutritionalData.vitaminB1 * 1000, g: this.references.vitaminB1 * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_B2', v: this.nutritionalData.vitaminB2 * 1000, g: this.references.vitaminB2 * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_B3', v: this.nutritionalData.vitaminB3 * 1000, g: this.references.vitaminB3 * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_B5', v: this.nutritionalData.vitaminB5 * 1000, g: this.references.vitaminB5 * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_B6', v: this.nutritionalData.vitaminB6 * 1000, g: this.references.vitaminB6 * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_B9', v: this.nutritionalData.vitaminB9 * 1000000, g: this.references.vitaminB9 * 1000000, u: 'NUTRITIONAL_OBJECTIVES.MICROGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.VITAMIN_B12', v: this.nutritionalData.vitaminB12 * 1000000, g: this.references.vitaminB12 * 1000000, u: 'NUTRITIONAL_OBJECTIVES.MICROGRAMS' },
      { n: 'NUTRITIONAL_OBJECTIVES.BIOTIN', v: this.nutritionalData.biotin * 1000000, g: this.references.biotin * 1000000, u: 'NUTRITIONAL_OBJECTIVES.MICROGRAMS' },
    ];
    this.otherNutrients = [
      { n: 'NUTRITIONAL_OBJECTIVES.OMEGA_3', v: this.nutritionalData.omega3, g: 1.6, u: 'NUTRITIONAL_OBJECTIVES.GRAMS', t: 'requirement' },
      { n: 'NUTRITIONAL_OBJECTIVES.OMEGA_6', v: this.nutritionalData.omega6, g: 17, u: 'NUTRITIONAL_OBJECTIVES.GRAMS', t: 'requirement' },
      { n: 'NUTRITIONAL_OBJECTIVES.OMEGA_9', v: this.nutritionalData.omega9, g: 12, u: 'NUTRITIONAL_OBJECTIVES.GRAMS', t: 'requirement' },
      { n: 'NUTRITIONAL_OBJECTIVES.SATURATED_FAT', v: this.nutritionalData.saturatedFat, g: this.references.saturatedFat, u: 'NUTRITIONAL_OBJECTIVES.GRAMS', t: 'limit' },
      { n: 'NUTRITIONAL_OBJECTIVES.TRANS_FAT', v: this.nutritionalData.transFat, g: 2, u: 'NUTRITIONAL_OBJECTIVES.GRAMS', t: 'limit' },
      { n: 'NUTRITIONAL_OBJECTIVES.CHOLESTEROL', v: this.nutritionalData.cholesterol * 1000, g: this.references.cholesterol * 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS', t: 'limit' },
      { n: 'NUTRITIONAL_OBJECTIVES.CAFFEINE', v: this.nutritionalData.caffeine * 1000, g: 400, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS', t: 'limit' },
      { n: 'NUTRITIONAL_OBJECTIVES.TAURINE', v: this.nutritionalData.taurine * 1000, g: 1000, u: 'NUTRITIONAL_OBJECTIVES.MILLIGRAMS', t: 'limit' },
      { n: 'NUTRITIONAL_OBJECTIVES.ALCOHOL', v: this.nutritionalData.alcohol, g: 10, u: 'NUTRITIONAL_OBJECTIVES.GRAMS', t: 'limit' },
    ];
  }

  goBack() {
    this.navCtrl.back();
  }

  private calculateNutritionalData() {
    if (!this.dietDay) return;

    const data = new NutritionalData();

    this.dietDay.meals.forEach((meal) => {
      // 1. Productos directos en la comida
      if (meal.customProducts) {
        meal.customProducts.forEach((cp: any) => {
          this.appendNutrients(data, cp, cp.quantity);
        });
      }

      // 2. Instancias de recetas en la comida
      if (meal.customRecipes) {
        meal.customRecipes.forEach((instance: any) => {
          this.processRecipeInstance(data, instance);
        });
      }
    });

    this.nutritionalData = data;
  }

  private processRecipeInstance(data: NutritionalData, instance: any) {
    const recipe =
      typeof instance.recipe === 'object' ? instance.recipe : null;
    if (!recipe) return;

    const merged = this.recipeService.calculateCustomRecipeTotals(recipe, instance);
    const scaleFactor = merged.portionRatio;

    merged.ingredients.forEach((cpData: any) => {
      this.appendNutrients(data, cpData, (cpData.quantity || 0) * scaleFactor);
    });
  }

  private appendNutrients(
    target: NutritionalData,
    cpData: any,
    quantity: number
  ) {
    if (!quantity) return;
    const factor = quantity / 100;

    const getVal = (key: string) => {
      return cpData[key] ?? cpData.product?.[key] ?? 0;
    };

    // Macros
    target.energyKcal += getVal('energyKcal100g') * factor;
    target.protein += getVal('protein100g') * factor;
    target.carbohydrate += getVal('carbohydrates100g') * factor;
    target.fat += getVal('fat100g') * factor;

    // Basic nutrients
    target.fiber += getVal('fiber100g') * factor;
    target.sugar += getVal('sugars100g') * factor;
    target.salt += getVal('salt100g') * factor;
    target.saturatedFat += getVal('saturatedFat100g') * factor;
    target.sodium += getVal('sodium100g') * factor;
    target.cholesterol += getVal('cholesterol100g') * factor;
    target.transFat += getVal('transFat100g') * factor;
    target.omega3 += getVal('omega3100g') * factor;
    target.omega6 += getVal('omega6100g') * factor;
    target.omega9 += getVal('omega9100g') * factor;
    target.alcohol += getVal('alcohol100g') * factor;

    // Minerals
    target.calcium += getVal('calcium100g') * factor;
    target.iron += getVal('iron100g') * factor;
    target.magnesium += getVal('magnesium100g') * factor;
    target.phosphorus += getVal('phosphorus100g') * factor;
    target.potassium += getVal('potassium100g') * factor;
    target.zinc += getVal('zinc100g') * factor;
    target.copper += getVal('copper100g') * factor;
    target.manganese += getVal('manganese100g') * factor;
    target.selenium += getVal('selenium100g') * factor;
    target.iodine += getVal('iodine100g') * factor;

    // Vitamins
    target.vitaminA += getVal('vitaminA100g') * factor;
    target.vitaminD += getVal('vitaminD100g') * factor;
    target.vitaminE += getVal('vitaminE100g') * factor;
    target.vitaminK += getVal('vitaminK100g') * factor;
    target.vitaminC += getVal('vitaminC100g') * factor;
    target.vitaminB1 += getVal('vitaminB1100g') * factor;
    target.vitaminB2 += getVal('vitaminB2100g') * factor;
    target.vitaminB3 += getVal('vitaminB3100g') * factor;
    target.vitaminB5 += getVal('vitaminB5100g') * factor;
    target.vitaminB6 += getVal('vitaminB6100g') * factor;
    target.vitaminB9 += getVal('vitaminB9100g') * factor;
    target.vitaminB12 += getVal('vitaminB12100g') * factor;
    target.biotin += getVal('biotin100g') * factor;

    // Others
    target.caffeine += getVal('caffeine100g') * factor;
    target.taurine += getVal('taurine100g') * factor;
  }

  public getProgress(current: number, goal: number): number {
    if (!goal || goal <= 0) return 0;
    const progress = current / goal;
    return progress > 1 ? 1 : progress;
  }

  public getPercent(current: number, goal: number): number {
    if (!goal || goal <= 0) return 0;
    return (current / goal) * 100;
  }

  public getProgressClass(current: number, goal: number, type: string): string {
    if (!goal || goal <= 0) return 'primary';
    const percentage = (current / goal) * 100;

    if (type === 'limit') {
      return percentage > 100 ? 'danger' : 'primary';
    } else {
      return percentage >= 100 ? 'success' : 'primary';
    }
  }

  public onGoalChange(event: any): void {
    this.isLoading = true;
    const goalId = event.detail.value;
    const goal = this.goals.find((g) => g._id === goalId);
    if (!goal) {
      this.isLoading = false;
      return;
    }
    this.activeGoal = goal;
    this.personalizeReferences();
    this.buildNutrientArrays();
    this.updateCalorieText();
    this.nutritionalGoalService.setActive(goalId).subscribe(() => {
      this.user = this.userService.getLocalUser!;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }
}
