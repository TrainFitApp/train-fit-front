import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
} from '@angular/core';
import { AlertOptions, PopoverOptions, ToastOptions } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import {
  CUSTOM_PRODUCT_KEYS,
  CustomProduct,
} from 'src/app/core/models/customProduct';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { User } from 'src/app/core/models/user';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { CustomRecipeApiService } from 'src/app/core/services/custom-recipe/custom-recipe-api.service';
import { CustomRecipe } from 'src/app/core/models/customRecipe';
import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { PopoverActionsComponent } from 'src/app/shared/components/popover-actions/popover-actions.component';
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTION_VALUES,
  ACTIONS,
} from 'src/app/shared/constants/actions';
import { MealClipboard } from 'src/app/shared/models/meal-clipboard';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnChanges {
  @Input()
  public meal!: Meal;
  @Input()
  public user!: User;
  @Input()
  public load: boolean = false;
  @Input()
  public dietDay!: DietDay;
  @Input()
  public pasteMode = false;
  @Input()
  public mealIndex!: number;
  @Output()
  public updateMacros = new EventEmitter();
  @Output()
  public pasteEvent = new EventEmitter();

  public loadPaste!: boolean;

  public arrowRotate = false;
  public isNoteHidden = false;

  public ACTIONS = ACTIONS;
  public ACTION_VALUES = ACTION_VALUES;
  public ACTION_TYPES = ACTION_TYPES;
  public CUSTOM_PRODUCT_KEYS = CUSTOM_PRODUCT_KEYS;

  constructor(
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private mealService: MealService,
    private dietDayService: DietDayService,
    private dietService: DietService,
    private customProductService: CustomProductService,
    private customRecipeService: CustomRecipeApiService,
    private recipeService: RecipeService,
    private navigationService: NavigationService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.getMealInfo();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.meal || changes.dietDay) {
      this.getMealInfo();
    }
  }

  public openSearchFoods(): void {
    this.navigationService.goToSearchFoods({
      state: {
        user: this.user,
        meal: this.meal,
        fromDiets: true,
        selectedDate: this.dietDay.date,
      },
    });
  }

  public editCustomProduct(customProduct: CustomProduct): void {
    const product = customProduct.product;
    const isOwnProduct = !!product?.userId;
    const queryParams: any = {
      product: JSON.stringify(product),
      isOwnProduct,
      productQuantity: customProduct.quantity,
      dietDay: JSON.stringify(this.dietDay),
      meal: JSON.stringify(this.meal),
      isScanned: false,
    };

    this.navigationService.goToAddProduct({
      replaceUrl: false,
      queryParams,
      state: { 
        returnUrl: '/tabs/diets',
        selectedDate: this.dietDay.date,
      },
    });
  }

  public editCustomRecipe(instance: CustomRecipe): void {
    this.navigationService.goToConfigRecipe({
      state: {
        mode: 'edit',
        customRecipe: instance,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: '/tabs/diets',
        selectedDate: this.dietDay.date,
      },
    });
  }

  public deleteRecipe(meal: Meal, instance: CustomRecipe): void {
    const recipeName =
      typeof instance.recipe === 'object' ? instance.recipe.name : this.translate.instant('COMMON.THIS');

    const alertOptions: AlertOptions = {
      header: this.translate.instant('MEAL.DELETE_RECIPE_HEADER'),
      message: this.translate.instant('MEAL.DELETE_RECIPE_CONFIRM', { name: recipeName }),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL').toUpperCase(),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.DELETE').toUpperCase(),
          role: 'destructive',
          handler: () => {
            const indexMeal = this.dietDay.meals.findIndex(
              (mealTemp) => mealTemp._id === meal._id
            );

            const indexRecipe =
              this.dietDay.meals[indexMeal].customRecipes.indexOf(
                instance
              );

            this.dietDay.meals[indexMeal].customRecipes.splice(
              indexRecipe,
              1
            );

            this.customRecipeService
              .delete(instance._id!)
              .subscribe(() => {
                this.dietDayService.setCurrentDietDay = this.dietDay;
              });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public deleteProduct(meal: Meal, product: CustomProduct): void {
    const productTemp = product.product;
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('MEAL.DELETE_PRODUCT_HEADER'),
      message: t('MEAL.DELETE_PRODUCT_CONFIRM', { name: productTemp.name }),
      buttons: [
        {
          text: t('COMMON.CANCEL').toUpperCase(),
          role: 'cancel',
        },
        {
          text: t('COMMON.DELETE').toUpperCase(),
          role: 'destructive',
          handler: () => {
            const indexMeal = this.dietDay.meals.findIndex(
              (mealTemp) => mealTemp._id === meal._id
            );

            const indexProduct =
              this.dietDay.meals[indexMeal].customProducts.indexOf(product);

            this.dietDay.meals[indexMeal].customProducts.splice(
              indexProduct,
              1
            );

            this.mealService
              .deleteMealProduct(meal._id, product._id)
              .subscribe(
                () => (this.dietDayService.setCurrentDietDay = this.dietDay)
              );
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public async createMealFromClipboard(meal: Meal): Promise<void> {
    this.loadPaste = true;
    if (!this.dietDay._id) {
      this.dietDay = this.dietDayService.getStandardDietDay(
        this.dietDay.date
      );
      this.dietDay = await this.dietDayService
        .createDietDay(this.dietDay)
        .toPromise();
      this.meal = this.dietDay.meals.find(
        (mealTemp) => mealTemp.name === meal.name
      );
      await this.dietService
        .addDietDietDay(this.user.dietInUse, this.dietDay._id)
        .toPromise();
    }

    const canMerge =
      this.meal.customProducts.length !== 0 ||
      (this.meal.customRecipes?.length ?? 0) !== 0;

    if (canMerge) {
      const t = this.translate.instant.bind(this.translate);
      const alertOptions: AlertOptions = {
        cssClass: 'alert-grid-buttons',
        header: t('MEAL.PASTE_HEADER'),
        message: t('MEAL.PASTE_MERGE_MESSAGE'),
        buttons: [
          {
            text: t('COMMON.CANCEL').toUpperCase(),
            role: 'cancel',
            handler: () => {
              this.pasteMode = false;
              this.pasteEvent.emit({
                paste: this.pasteMode,
              });
              this.loadPaste = false;
            },
          },
          {
            text: t('MEAL.PASTE_REPLACE'),
            handler: () => {
              this.handleMealPaste(false);
            },
          },
          {
            text: t('MEAL.PASTE_MERGE'),
            handler: () => {
              this.handleMealPaste(true);
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    } else {
      this.handleMealPaste(false);
    }
  }

  private handleMealPaste(merge: boolean): void {
    const mealClipboard = new MealClipboard(
      this.mealService.getMealClipboard,
      this.meal
    );
    const pasteMealObservable = merge
      ? this.mealService.pasteMeal(mealClipboard, merge)
      : this.mealService.pasteMeal(mealClipboard);

    pasteMealObservable.subscribe((resMeal) => {
      this.meal = resMeal;
      const indexMeal = this.dietDay.meals.findIndex(
        (mealTemp) => mealTemp._id === resMeal._id
      );
      this.dietDay.meals[indexMeal] = resMeal;
      // TODO: esto es necesario?
      this.pasteEvent.emit();

      this.getMealInfo();

      this.dietDayService.setCurrentDietDay = this.dietDay;

      this.loadPaste = false;

      this.ionicUtilService.showToast({
        message: this.translate.instant('MEAL.PRODUCTS_COPIED'),
        duration: 2000,
      });
    });
  }

  public getProductsAndOwnProductsOrdered(meal: Meal): CustomProduct[] {
    return (meal.customProducts || []).sort((a, b) =>
      a.order < b.order ? -1 : 1
    );
  }

  public getCustomRecipesOrdered(meal: Meal): CustomRecipe[] {
    return meal.customRecipes || [];
  }

  public getRecipeName(instance: CustomRecipe): string {
    const recipe =
      typeof instance.recipe === 'object' ? instance.recipe : null;
    const noName = this.translate.instant('MEAL.RECIPE_NO_NAME');
    if (!recipe) return noName;

    return recipe.name || noName;
  }

  public getRecipeConsumedQuantity(instance: CustomRecipe): number {
    const quantity = Number(instance.quantity);
    return Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
  }

  public getInstanceMacros(instance: CustomRecipe): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    const recipe =
      typeof instance.recipe === 'object' ? instance.recipe : null;
    if (!recipe)
      return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    return this.recipeService.calculateCustomRecipeTotals(recipe, instance).portionMacros;
  }

  public openPopoverOptions(event: Event): void {
    if (
      this.meal.customProducts?.length > 0 ||
      this.meal.customRecipes?.length > 0
    ) {
      const popover: PopoverOptions = {
        component: PopoverActionsComponent,
        componentProps: {
          actionsPopover: this.getActionsPopover(),
        },
        event: event,
        mode: 'ios',
      };

      const showPopover = this.ionicUtilService.showPopover(popover);
      showPopover.then((res) => this.handleActions(res.data));
    } else {
      this.ionicUtilService.showToast({
        message: this.translate.instant('COMMON.NO_ACTIONS'),
        duration: 500,
      });
    }
  }

  private openEditNameAlert(): void {
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('MEAL.EDIT_NAME_HEADER'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.meal.name,
          placeholder: t('MEAL.NAME_PLACEHOLDER'),
        },
      ],
      buttons: [
        {
          text: t('COMMON.CANCEL').toUpperCase(),
          role: 'cancel',
        },
        {
          text: t('COMMON.SAVE').toUpperCase(),
          cssClass: 'alert-button-success',
          handler: (data) => {
            if (data.name && data.name.trim() !== '') {
              this.meal.name = data.name;
              this.mealService.modifyMeal(this.meal).subscribe(() => {
                this.ionicUtilService.showToast({
                  message: t('MEAL.NAME_UPDATED'),
                  duration: 500,
                });
              });
              return true;
            } else {
              this.ionicUtilService.showToast({
                message: t('COMMON.FIELD_REQUIRED'),
                duration: 2000,
              });
              return false;
            }
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private manageNote(): void {
    this.utilService.manageNote(this.meal, this.mealService);
  }

  public getCustomProductInfo(
    customProduct: CustomProduct,
    key: string
  ): number {
    return this.customProductService.getCustomProductInfo(customProduct, key);
  }

  public get mealKcal(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).kcal)
    );
    this.meal.customRecipes?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).kcal)
    );
    return totals;
  }

  public get mealProtein(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).protein)
    );
    this.meal.customRecipes?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).protein)
    );
    return totals;
  }

  public get mealCarbs(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).carbs)
    );
    this.meal.customRecipes?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).carbs)
    );
    return totals;
  }

  public get mealFat(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).fat)
    );
    this.meal.customRecipes?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).fat)
    );
    return totals;
  }

  private getMealInfo(): void {
    // Keep internal meal properties synced for other logic
    this.meal.kcal = this.mealKcal;
    this.meal.protein = this.mealProtein;
    this.meal.carbohydrate = this.mealCarbs;
    this.meal.fat = this.mealFat;
  }

  private initMeal(): void {
    this.meal.kcal = 0;
    this.meal.protein = 0;
    this.meal.carbohydrate = 0;
    this.meal.fat = 0;
  }

  private getActionsPopover(): ACTION_TYPE[] {
    let actions = this.ACTION_VALUES;
    if (
      (this.meal.customProducts?.length || 0) === 0 &&
      (this.meal.customRecipes?.length || 0) === 0
    ) {
      actions = actions.filter(
        (actionTemp) =>
          actionTemp.id === ACTIONS[this.ACTION_TYPES.delete].id ||
          actionTemp.id === ACTIONS[this.ACTION_TYPES.edit].id
      );
    } else {
      actions = actions.filter(
        (actionTemp) =>
          actionTemp.id !== ACTIONS[this.ACTION_TYPES.deselect].id &&
          actionTemp.id !== ACTIONS[this.ACTION_TYPES.moveExercises].id &&
          actionTemp.id !== ACTIONS[this.ACTION_TYPES.edit].id &&
          actionTemp.id !== ACTIONS[this.ACTION_TYPES.duplicate].id
      );
    }

    // Sort to put delete at the end
    return actions.sort((a, b) => {
      if (a.id === ACTIONS[this.ACTION_TYPES.delete].id) return 1;
      if (b.id === ACTIONS[this.ACTION_TYPES.delete].id) return -1;
      return 0;
    });
  }

  private handleActions(action: ACTION_TYPE): void {
    switch (action?.id) {
      case ACTIONS[this.ACTION_TYPES.edit].id:
        this.openEditNameAlert();
        break;

      case ACTIONS[this.ACTION_TYPES.copy].id:
        this.pasteMode = true;
        this.mealService.setMealClipboard = this.meal;
        this.pasteEvent.emit({
          mealId: this.meal._id,
          paste: this.pasteMode,
        });
        break;

      case ACTIONS[this.ACTION_TYPES.note].id:
        this.manageNote();
        break;

      case ACTIONS[this.ACTION_TYPES.delete].id:
        this.emptyMeal();
        break;
    }
  }

  private emptyMeal(): void {
    if (this.meal) {
      const t = this.translate.instant.bind(this.translate);
      const alertOptions: AlertOptions = {
        header: t('MEAL.EMPTY_MEAL_HEADER'),
        message: t('MEAL.EMPTY_MEAL_CONFIRM', { name: this.meal.name }),
        buttons: [
          {
            text: t('COMMON.CANCEL').toUpperCase(),
            role: 'cancel',
          },
          {
            text: t('MEAL.DELETE_EMPTY'),
            role: 'destructive',
            handler: () => {
              const observables = [
                this.mealService.deleteMealCustomProducts(this.meal._id),
                this.mealService.deleteMealRecipes(this.meal._id),
              ];

              forkJoin(observables).subscribe(() => {
                this.meal.customProducts = [];
                this.meal.customRecipes = [];
                this.dietDayService.setCurrentDietDay = this.dietDay;
                this.utilService.setUnselected = true;

                this.ionicUtilService.showToast({
                  message: t('MEAL.EMPTY_MEAL_SUCCESS', { name: this.meal.name }),
                  duration: 1000,
                });
              });
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    }
  }
}
