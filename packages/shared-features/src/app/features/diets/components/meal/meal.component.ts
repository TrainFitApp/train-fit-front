import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  ViewChild,
  ElementRef,
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
  public activeCopyMealIndex?: number;
  @Input()
  public clipboardClearCounter = 0;
  @Input()
  public mealIndex!: number;
  @Output()
  public updateMacros = new EventEmitter();
  @Output()
  public pasteEvent = new EventEmitter();
  @Output()
  public copyEvent = new EventEmitter();

  @ViewChild('mealAccordion', { read: ElementRef })
  public mealAccordion!: ElementRef<HTMLIonAccordionElement>;

  public loadPaste!: boolean;

  public arrowRotate = false;
  public isNoteHidden = false;

  public ACTIONS = ACTIONS;
  public ACTION_VALUES = ACTION_VALUES;
  public ACTION_TYPES = ACTION_TYPES;
  public CUSTOM_PRODUCT_KEYS = CUSTOM_PRODUCT_KEYS;

  public selectionMode = false;
  public selectedProductIds = new Set<string>();
  public selectedRecipeIds = new Set<string>();

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
    if (changes.pasteMode && this.pasteMode) {
      this.selectionMode = false;
      this.clearSelection();
    }
    if (
      changes.activeCopyMealIndex &&
      this.selectionMode &&
      this.activeCopyMealIndex !== undefined &&
      this.activeCopyMealIndex !== this.mealIndex
    ) {
      this.selectionMode = false;
      this.clearSelection();
    }
    if (
      changes.clipboardClearCounter &&
      !changes.clipboardClearCounter.firstChange &&
      this.selectionMode
    ) {
      this.exitSelectionMode();
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
    if (this.selectionMode) return;
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
    if (this.selectionMode) return;
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
              this.dietDay.meals[indexMeal].customRecipes.indexOf(instance);

            this.dietDay.meals[indexMeal].customRecipes.splice(indexRecipe, 1);

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

            this.dietDay.meals[indexMeal].customProducts.splice(indexProduct, 1);

            this.mealService
              .deleteMealProduct(meal._id, product._id)
              .subscribe(() => (this.dietDayService.setCurrentDietDay = this.dietDay));
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  public async createMealFromClipboard(meal: Meal): Promise<void> {
    this.loadPaste = true;
    if (!this.dietDay._id) {
      this.dietDay = this.dietDayService.getStandardDietDay(this.dietDay.date);
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

    const clipboard = this.mealService.getMealClipboard;
    if (!clipboard) {
      this.loadPaste = false;
      return;
    }

    const canMerge =
      this.meal.customProducts.length !== 0 ||
      (this.meal.customRecipes?.length ?? 0) !== 0;

    if (clipboard.isFullMeal && canMerge) {
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
              this.pasteEvent.emit({ paste: this.pasteMode });
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
    const clipboard = this.mealService.getMealClipboard;
    if (!clipboard) return;

    clipboard.mealToPaste = this.meal;

    const pasteMealObservable = clipboard.isFullMeal
      ? this.mealService.pasteMeal(clipboard, merge)
      : this.mealService.pasteMeal(clipboard, true);

    pasteMealObservable.subscribe((resMeal) => {
      this.meal = resMeal;
      const indexMeal = this.dietDay.meals.findIndex(
        (mealTemp) => mealTemp._id === resMeal._id
      );
      this.dietDay.meals[indexMeal] = resMeal;
      this.pasteEvent.emit({ pasted: true });

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
    const recipe = typeof instance.recipe === 'object' ? instance.recipe : null;
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
    const recipe = typeof instance.recipe === 'object' ? instance.recipe : null;
    if (!recipe) return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    return this.recipeService.calculateCustomRecipeTotals(recipe, instance).portionMacros;
  }

  public openPopoverOptions(event: Event): void {
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
    const t = this.translate.instant.bind(this.translate);
    const alertOptions: AlertOptions = {
      header: t('COMMON.NOTES'),
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: t('COMMON.WRITE_NOTES_HERE'),
          value: this.meal.notes || '',
        },
      ],
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: t('COMMON.SAVE'),
          handler: (data) => {
            if (!data.notes || data.notes.trim() === '') {
              const errorAlert: AlertOptions = {
                header: t('COMMON.ERROR'),
                message: t('COMMON.FIELD_REQUIRED'),
                buttons: [t('COMMON.OK')],
              };
              this.ionicUtilService.showAlert(errorAlert);
              return false;
            }
            return true;
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions).then(async (result) => {
      if (result.role === 'cancel' || !result.data?.values?.notes) return;
      const notesValue = result.data.values.notes.trim();

      if (!this.dietDay._id) {
        this.dietDay = this.dietDayService.getStandardDietDay(this.dietDay.date);
        this.dietDay = await this.dietDayService.createDietDay(this.dietDay).toPromise();
        this.meal = this.dietDay.meals.find((m) => m.name === this.meal.name);
        await this.dietService.addDietDietDay(this.user.dietInUse, this.dietDay._id).toPromise();
        this.dietDayService.setCurrentDietDay = this.dietDay;
      }

      this.meal.notes = notesValue;
      this.mealService.modifyMeal(this.meal).subscribe({
        next: () => {
          const toast: ToastOptions = {
            message: t('TOOLBAR_CALENDAR.NOTE_UPDATED'),
            duration: 2000,
          };
          this.ionicUtilService.showToast(toast);
        },
        error: (err) => console.error('[MealComponent] Failed to save note', err),
      });
    });
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
        (actionTemp) => actionTemp.id === ACTIONS[this.ACTION_TYPES.note].id
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
        this.enterSelectionMode();
        break;

      case ACTIONS[this.ACTION_TYPES.note].id:
        this.manageNote();
        break;

      case ACTIONS[this.ACTION_TYPES.delete].id:
        this.emptyMeal();
        break;
    }
  }

  private enterSelectionMode(): void {
    this.selectionMode = true;
    this.clearSelection();
    this.arrowRotate = true;
    this.openAccordion();

    this.copyEvent.emit({
      mealId: this.meal._id,
      mealIndex: this.mealIndex,
      selectionMode: true,
      meal: this.meal,
    });
  }

  private openAccordion(): void {
    setTimeout(() => {
      const accordion = this.mealAccordion?.nativeElement;
      const group = accordion?.closest('ion-accordion-group') as
        | HTMLIonAccordionGroupElement
        | null;
      if (!group) return;

      const mealValue = `meal-${this.mealIndex}`;
      const currentValue = group.value;
      if (Array.isArray(currentValue)) {
        group.value = currentValue.includes(mealValue)
          ? currentValue
          : [...currentValue, mealValue];
        return;
      }

      group.value = currentValue ? [currentValue, mealValue] : [mealValue];
    });
  }

  public onSelectAllChange(event: Event): void {
    const checked = (event as CustomEvent).detail?.checked;
    if (checked) {
      this.selectAllItems();
    } else {
      this.clearSelection();
    }
    this.updateClipboardSelection();
  }

  public onProductSelectionChange(product: CustomProduct, event: Event): void {
    const checked = (event as CustomEvent).detail?.checked ?? !(event as MouseEvent).ctrlKey;
    if (checked) {
      this.selectedProductIds.add(product._id);
    } else {
      this.selectedProductIds.delete(product._id);
    }
    this.updateClipboardSelection();
  }

  public onRecipeSelectionChange(recipe: CustomRecipe, event: Event): void {
    const checked = (event as CustomEvent).detail?.checked ?? !(event as MouseEvent).ctrlKey;
    if (checked) {
      this.selectedRecipeIds.add(recipe._id);
    } else {
      this.selectedRecipeIds.delete(recipe._id);
    }
    this.updateClipboardSelection();
  }

  public toggleProductSelection(product: CustomProduct): void {
    if (!this.selectionMode) {
      this.editCustomProduct(product);
      return;
    }

    if (this.selectedProductIds.has(product._id)) {
      this.selectedProductIds.delete(product._id);
    } else {
      this.selectedProductIds.add(product._id);
    }
    this.updateClipboardSelection();
  }

  public toggleRecipeSelection(recipe: CustomRecipe): void {
    if (!this.selectionMode) {
      this.editCustomRecipe(recipe);
      return;
    }

    if (this.selectedRecipeIds.has(recipe._id)) {
      this.selectedRecipeIds.delete(recipe._id);
    } else {
      this.selectedRecipeIds.add(recipe._id);
    }
    this.updateClipboardSelection();
  }

  private selectAllItems(): void {
    this.meal.customProducts?.forEach((cp) => this.selectedProductIds.add(cp._id));
    this.meal.customRecipes?.forEach((cr) => this.selectedRecipeIds.add(cr._id));
  }

  private clearSelection(): void {
    this.selectedProductIds.clear();
    this.selectedRecipeIds.clear();
  }

  private updateClipboardSelection(): void {
    const productIds = Array.from(this.selectedProductIds);
    const recipeIds = Array.from(this.selectedRecipeIds);
    const totalProducts = this.meal.customProducts?.length ?? 0;
    const totalRecipes = this.meal.customRecipes?.length ?? 0;
    const isFullMeal = 
      productIds.length === totalProducts &&
      recipeIds.length === totalRecipes &&
      (totalProducts > 0 || totalRecipes > 0);

    if (isFullMeal) {
      this.mealService.setFullMealClipboard(this.meal, this.meal);
    } else if (productIds.length > 0 || recipeIds.length > 0) {
      this.mealService.setPartialMealClipboard(
        this.meal,
        this.meal,
        productIds,
        recipeIds
      );
    } else {
      this.mealService.clearMealClipboard();
    }

    this.copyEvent.emit({
      mealId: this.meal._id,
      mealIndex: this.mealIndex,
      selectionMode: true,
      meal: this.meal,
      productIds,
      recipeIds,
      isFullMeal,
    });
  }

  public cancelSelection(): void {
    this.exitSelectionMode();
    this.mealService.clearMealClipboard();
    this.copyEvent.emit({
      mealId: this.meal._id,
      mealIndex: this.mealIndex,
      selectionMode: false,
    });
  }

  private exitSelectionMode(): void {
    this.selectionMode = false;
    this.clearSelection();
    this.arrowRotate = false;
  }

  public get hasActiveClipboard(): boolean {
    return this.mealService.hasMealClipboard();
  }

  public isProductSelected(product: CustomProduct): boolean {
    return this.selectedProductIds.has(product._id);
  }

  public isRecipeSelected(recipe: CustomRecipe): boolean {
    return this.selectedRecipeIds.has(recipe._id);
  }

  public isAllSelected(): boolean {
    const productCount = this.meal.customProducts?.length ?? 0;
    const recipeCount = this.meal.customRecipes?.length ?? 0;
    return (
      this.selectedProductIds.size === productCount &&
      this.selectedRecipeIds.size === recipeCount &&
      (productCount > 0 || recipeCount > 0)
    );
  }

  public isAnySelected(): boolean {
    return this.selectedProductIds.size > 0 || this.selectedRecipeIds.size > 0;
  }

  public getSelectedCount(): number {
    return this.selectedProductIds.size + this.selectedRecipeIds.size;
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
