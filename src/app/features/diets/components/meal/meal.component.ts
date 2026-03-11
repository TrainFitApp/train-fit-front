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
import { CustomRecipeInstanceApiService } from 'src/app/core/services/custom-recipe-instance/custom-recipe-instance-api.service';
import { CustomRecipeInstance } from 'src/app/core/models/customRecipeInstance';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
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
    private customRecipeInstanceService: CustomRecipeInstanceApiService,
    private navigationService: NavigationService
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
      state: { returnUrl: '/tabs/diets' },
    });
  }

  public editCustomRecipeInstance(instance: CustomRecipeInstance): void {
    this.navigationService.goToConfigRecipe({
      state: {
        mode: 'edit',
        customRecipeInstance: instance,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: '/tabs/diets',
      },
    });
  }

  public deleteRecipe(meal: Meal, instance: CustomRecipeInstance): void {
    const recipeName =
      typeof instance.dataRecipe === 'object'
        ? typeof instance.dataRecipe.recipe === 'object'
          ? instance.dataRecipe.recipe.name
          : 'esta receta'
        : 'esta receta';

    const alertOptions: AlertOptions = {
      header: 'Eliminar receta',
      message: `¿Estás seguro de que quieres eliminar ${recipeName}?`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          handler: () => {
            const indexMeal = this.dietDay.meals.findIndex(
              (mealTemp) => mealTemp._id === meal._id
            );

            const indexRecipe =
              this.dietDay.meals[indexMeal].customRecipeInstances.indexOf(
                instance
              );

            this.dietDay.meals[indexMeal].customRecipeInstances.splice(
              indexRecipe,
              1
            );

            this.customRecipeInstanceService
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
    const alertOptions: AlertOptions = {
      header: 'Eliminar producto',
      message: `¿Estás seguro de que quieres eliminar ${productTemp.name}?`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
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
        new Date(this.dietDay.date)
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
      (this.meal.customRecipeInstances?.length ?? 0) !== 0;

    if (canMerge) {
      const alertOptions: AlertOptions = {
        cssClass: 'alert-grid-buttons',
        header: 'Pegar',
        message: '¿Desea fusionar ambas comidas?',
        buttons: [
          {
            text: 'CANCELAR',
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
            text: 'REEMPLAZAR',
            handler: () => {
              this.handleMealPaste(false);
            },
          },
          {
            text: 'FUSIONAR',
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

      const toast: ToastOptions = {
        message: 'Productos copiados',
        duration: 2000,
      };
      this.ionicUtilService.showToast(toast);
    });
  }

  public getProductsAndOwnProductsOrdered(meal: Meal): CustomProduct[] {
    return (meal.customProducts || []).sort((a, b) =>
      a.order < b.order ? -1 : 1
    );
  }

  public getCustomRecipeInstancesOrdered(meal: Meal): CustomRecipeInstance[] {
    return meal.customRecipeInstances || [];
  }

  public getRecipeName(instance: CustomRecipeInstance): string {
    const dataRecipe =
      typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
    if (!dataRecipe) return 'Receta sin nombre';

    const recipe =
      typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
    if (!recipe) return 'Receta sin nombre';

    return recipe.name || 'Receta sin nombre';
  }

  public getInstanceMacros(instance: CustomRecipeInstance): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    // Calcular macros en tiempo real
    const dataRecipe =
      typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
    if (!dataRecipe) return { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    const recipe =
      typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
    if (!recipe || !recipe.customProducts)
      return { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    // Crear mapa de overrides
    const overridesMap = new Map();
    if (instance.customProductsOverrides) {
      instance.customProductsOverrides.forEach((override) => {
        const id =
          typeof override.customProductId === 'string'
            ? override.customProductId
            : (override.customProductId as any)?._id ||
              override.customProductId;
        overridesMap.set(id, override);
      });
    }

    let mergedRecipeQuantity = 0;

    recipe.customProducts.forEach((cp: any) => {
      const cpId = typeof cp === 'string' ? cp : cp._id;
      const cpData = typeof cp === 'object' ? cp : null;
      if (!cpData) return;

      const override = overridesMap.get(cpId);
      if (override?.removed) return;

      mergedRecipeQuantity += override?.quantity ?? cpData.quantity ?? 0;
    });

    if (instance.additionalCustomProducts) {
      instance.additionalCustomProducts.forEach((addCP) => {
        mergedRecipeQuantity += addCP.quantity || 0;
      });
    }

    const baselineQuantity =
      dataRecipe.quantityCooked || dataRecipe.quantity || mergedRecipeQuantity;
    const portionRatio =
      baselineQuantity > 0 ? instance.quantity / baselineQuantity : 0;

    let totalMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    // Calcular macros de customProducts originales con overrides
    recipe.customProducts.forEach((cp: any) => {
      const cpId = typeof cp === 'string' ? cp : cp._id;
      const cpData = typeof cp === 'object' ? cp : null;
      if (!cpData) return;

      const override = overridesMap.get(cpId);

      // Si está marcado como removed, saltar
      if (override?.removed) return;

      // Usar cantidad del override o la original
      const originalQuantity = override?.quantity ?? cpData.quantity;

      const scaledQuantity = originalQuantity * portionRatio;

      // Calcular macros de este ingrediente
      const macros = this.customProductService.getMacros({
        ...cpData,
        quantity: scaledQuantity,
      });

      totalMacros.kcal += macros.kcal;
      totalMacros.protein += macros.protein;
      totalMacros.carbs += macros.carbs;
      totalMacros.fat += macros.fat;
    });

    // Añadir macros de ingredientes adicionales
    if (instance.additionalCustomProducts) {
      instance.additionalCustomProducts.forEach((addCP) => {
        const scaledQuantity = addCP.quantity * portionRatio;

        const macros = this.customProductService.getMacros({
          ...addCP,
          quantity: scaledQuantity,
        });

        totalMacros.kcal += macros.kcal;
        totalMacros.protein += macros.protein;
        totalMacros.carbs += macros.carbs;
        totalMacros.fat += macros.fat;
      });
    }

    return totalMacros;
  }

  public openPopoverOptions(event: Event): void {
    if (
      this.meal.customProducts?.length > 0 ||
      this.meal.customRecipeInstances?.length > 0
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
      const toastOptions: ToastOptions = {
        message: 'No hay acciones disponibles',
        duration: 500,
      };
      this.ionicUtilService.showToast(toastOptions);
    }
  }

  private openEditNameAlert(): void {
    const alertOptions: AlertOptions = {
      header: 'Editar nombre',
      message: 'Meal',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.meal.name,
          placeholder: 'Nombre de la comida',
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'GUARDAR',
          cssClass: 'alert-button-success',
          handler: (data) => {
            if (data.name && data.name.trim() !== '') {
              this.meal.name = data.name;
              this.mealService.modifyMeal(this.meal).subscribe(() => {
                const message = `Nombre de meal actualizado`;
                const duration = 500;
                const toastOptions: ToastOptions = {
                  message,
                  duration,
                };
                this.ionicUtilService.showToast(toastOptions);
              });
              return true;
            } else {
              const toastOptions: ToastOptions = {
                message: 'El campo no puede estar vacío',
                duration: 2000,
              };
              this.ionicUtilService.showToast(toastOptions);
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
    this.meal.customRecipeInstances?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).kcal)
    );
    return totals;
  }

  public get mealProtein(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).protein)
    );
    this.meal.customRecipeInstances?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).protein)
    );
    return totals;
  }

  public get mealCarbs(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).carbs)
    );
    this.meal.customRecipeInstances?.forEach(
      (instance) => (totals += this.getInstanceMacros(instance).carbs)
    );
    return totals;
  }

  public get mealFat(): number {
    let totals = 0;
    this.meal.customProducts?.forEach(
      (cp) => (totals += this.customProductService.getMacros(cp).fat)
    );
    this.meal.customRecipeInstances?.forEach(
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
      (this.meal.customRecipeInstances?.length || 0) === 0
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
      const alertOptions: AlertOptions = {
        header: 'Vaciar comida',
        message: `¿Estás seguro de que quieres vaciar ${this.meal.name}?`,
        buttons: [
          {
            text: 'CANCELAR',
            role: 'cancel',
          },
          {
            text: 'VACIAR',
            role: 'destructive',
            handler: () => {
              const observables = [
                this.mealService.deleteMealCustomProducts(this.meal._id),
                this.mealService.deleteMealRecipeInstances(this.meal._id),
              ];

              forkJoin(observables).subscribe(() => {
                this.meal.customProducts = [];
                this.meal.customRecipeInstances = [];
                this.dietDayService.setCurrentDietDay = this.dietDay;
                this.utilService.setUnselected = true;

                const showToast: ToastOptions = {
                  message: `${this.meal.name} vaciada`,
                  duration: 1000,
                };
                this.ionicUtilService.showToast(showToast);
              });
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    }
  }
}
