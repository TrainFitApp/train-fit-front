import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { take } from 'rxjs';
import {
  CUSTOM_PRODUCT_KEYS,
  CustomProduct,
} from 'src/app/core/models/customProduct';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { IProduct } from 'src/app/core/models/product';
import { CustomProductService } from 'src/app/core/services/custom-product/custom-product.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { THEMES } from 'src/app/shared/models/theme';
import {
  MEASURE_FILTER,
  MEASURE_FILTER_TYPES,
} from 'src/app/shared/constants/measureFilter';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnChanges {
  @Input()
  public dietDay: DietDay;
  @Input()
  public meal: Meal;
  @Input()
  public product: IProduct;
  @Input()
  public ingredientMode: boolean = false;
  @Input()
  public isIngredientSelected: boolean = false;
  @Input()
  public recentCustomProduct?: CustomProduct | null;
  @Input()
  public showRecentIcon: boolean = false;

  @Output()
  public delete = new EventEmitter<string>();

  @Output()
  public update = new EventEmitter<IProduct>();

  @Output()
  public ingredientToggle = new EventEmitter<{
    product: IProduct;
    quantity: number;
    checked: boolean;
  }>();

  public measureFilter: MEASURE_FILTER_TYPES;

  public brand: string;

  public loading = { value: false };
  public actionLoading = false;
  public isChecked: boolean;
  public customProduct: CustomProduct;

  public productQuantity: number;

  public MEASURE_FILTER_TYPES = MEASURE_FILTER_TYPES;
  public CUSTOM_PRODUCT_KEYS = CUSTOM_PRODUCT_KEYS;
  public MEASURE_FILTER = MEASURE_FILTER;
  public THEMES = THEMES;

  constructor(
    private customProductService: CustomProductService,
    private utilService: UtilService,
    private dietDayService: DietDayService,
    private userService: UserService,
    private navigationService: NavigationService,
    private mealService: MealService
  ) {}

  public ngOnInit(): void {
    this.getLoading();
    this.existCustomProduct();
    if (this.meal && !this.ingredientMode)
      this.utilService.getUnselected.subscribe(() => this.isProductChecked());
    this.getProductQuanityByFilter();
    this.setBrand();
    this.isProductChecked();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.meal ||
      changes.isIngredientSelected ||
      changes.product ||
      changes.recentCustomProduct
    ) {
      this.existCustomProduct();
      this.isProductChecked();
      this.setBrand();
    }
  }

  public get isBusy(): boolean {
    return this.loading.value || this.actionLoading;
  }

  public get displayCustomProduct(): CustomProduct | null {
    return this.customProduct || this.recentCustomProduct || null;
  }

  public onCardClick(): void {
    if (this.isBusy) return;

    this.ingredientMode ? this.onRowClickIngredientMode() : this.openAddProduct();
  }

  // Handler for row click in ingredient mode - navigate to add-product
  public onRowClickIngredientMode(): void {
    console.log(
      '[DEBUG] Row clicked in ingredient mode, navigating to add-product'
    );
    const selectedIngredient = this.customProduct || null;
    const editingIngredientIndex = selectedIngredient
      ? this.getSelectedIngredientIndex(selectedIngredient)
      : null;

    // Navigate to add-product in ingredient mode
    this.navigationService.goToAddProduct({
      state: {
        product:
          selectedIngredient && typeof selectedIngredient.product === 'object'
            ? selectedIngredient.product
            : this.product,
        customProduct: selectedIngredient,
        editingIngredientIndex,
        meal: this.meal,
        dietDay: this.dietDay,
        ingredientMode: true, // Special flag to handle differently
        returnUrl: '/search-foods',
      },
    });
  }

  // Handler for checkbox change in ingredient mode
  public onCheckboxChangeIngredientMode(event: any): void {
    const checked = event.detail.checked;
    this.isChecked = checked;
    console.log('[DEBUG] Checkbox changed in ingredient mode:', {
      productName: this.product.name,
      productId: this.product._id,
      isChecked: this.isChecked,
      quantity: this.getEffectiveQuantity(),
    });
    this.ingredientToggle.emit({
      product: this.product,
      quantity: this.getEffectiveQuantity(),
      checked: this.isChecked,
    });
  }

  public toggleProduct(event: Event): void {
    if (this.isBusy) return;

    const checked = this.utilService.getEventCheck(event);

    // In ingredient mode, just emit the product without API calls
    if (this.ingredientMode) {
      this.isChecked = checked;
      this.ingredientToggle.emit({
        product: this.product,
        quantity: this.getEffectiveQuantity(),
        checked: checked,
      });
      return;
    }

    const newCustomProduct = this.buildCustomProductForAdd();

    if (checked) {
      if (
        this.product.energyKcal100g !== undefined &&
        this.product.energyKcal100g !== null &&
        this.product.protein100g !== undefined &&
        this.product.protein100g !== null &&
        this.product.carbohydrates100g !== undefined &&
        this.product.carbohydrates100g !== null &&
        this.product.fat100g !== undefined &&
        this.product.fat100g !== null &&
        (this.product.productQuantity ||
          MEASURE_FILTER[MEASURE_FILTER_TYPES.total].id !==
            this.measureFilter) &&
        (this.product.servingQuantity ||
          MEASURE_FILTER[MEASURE_FILTER_TYPES.racion].id !== this.measureFilter)
      ) {
        this.actionLoading = true;
        const idDietInUse = this.userService.getLocalUser.dietInUse;
        this.dietDayService
          .createCustomProduct(
            this.loading,
            this.dietDay,
            newCustomProduct,
            this.meal,
            idDietInUse
          )
          .subscribe({
            next: () => {
              this.isChecked = true;
              this.actionLoading = false;
            },
            error: () => {
              this.isChecked = false;
              this.actionLoading = false;
              this.loading.value = false;
            },
          });
      } else {
        this.isChecked = false;
        this.openAddProduct();
      }
    } else {
      this.actionLoading = true;
      this.loading.value = true;
      const customProductToDelete = this.meal.customProducts.find(
        (resCustomProduct) =>
          this.getCustomProductProductId(resCustomProduct) ===
          this.getProductId(this.product)
      );

      if (!customProductToDelete) {
        console.warn(
          '[toggleProduct] No se encontró customProduct para eliminar. Puede que ya estuviera borrado.',
          this.product._id
        );
        this.isChecked = false;
        this.loading.value = false;
        this.actionLoading = false;
        return;
      }

      this.customProductService
        .deleteCustomProduct(customProductToDelete._id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.isChecked = false;
            const indexCustomProduct = this.meal.customProducts.findIndex(
              (customProductTemp) =>
                customProductTemp._id === customProductToDelete._id
            );
            this.meal.customProducts.splice(indexCustomProduct, 1);
            this.dietDayService.setCurrentDietDay = this.dietDay;
            this.customProduct = undefined;
            this.loading.value = false;
            this.actionLoading = false;
          },
          error: () => {
            this.loading.value = false;
            this.actionLoading = false;
          },
        });
    }
  }

  public checkIfInfoExist(): boolean {
    if (typeof this.displayCustomProduct?.quantity === 'number' && this.displayCustomProduct.quantity > 0) {
      return false;
    }

    if (
      this.measureFilter === this.MEASURE_FILTER_TYPES.auto ||
      this.measureFilter === this.MEASURE_FILTER_TYPES.cieng
    ) {
      return false;
    }

    return (
      (!this.product.servingQuantity &&
        this.measureFilter === this.MEASURE_FILTER_TYPES.racion) ||
      (!this.product.productQuantity &&
        this.measureFilter === this.MEASURE_FILTER_TYPES.total)
    );
  }

  private getProductQuanityByFilter(): void {
    this.utilService.getMeasureFilter.subscribe((resMeasureFilter) => {
      this.measureFilter = resMeasureFilter;
      switch (this.measureFilter) {
        case MEASURE_FILTER_TYPES.auto:
          this.productQuantity = this.product.servingQuantity || 100;
          break;
        case MEASURE_FILTER_TYPES.cieng:
          this.productQuantity = 100;
          break;
        case MEASURE_FILTER_TYPES.racion:
          this.productQuantity = this.product.servingQuantity;
          break;
        case MEASURE_FILTER_TYPES.total:
          this.productQuantity = this.product.productQuantity;
          break;
      }
    });
  }

  private isProductChecked(): void {
    // In ingredient mode, use the input from parent
    if (this.ingredientMode) {
      this.isChecked = this.isIngredientSelected;
      return;
    }

    // Guard against null meal or customProducts
    if (!this.meal?.customProducts) {
      this.isChecked = false;
      return;
    }

    const productId = this.getProductId(this.product);
    this.isChecked = !!this.meal.customProducts.find(
      (customProductTemp) =>
        this.getCustomProductProductId(customProductTemp) === productId
    );
  }

  private existCustomProduct(): void {
    const productId = this.getProductId(this.product);
    if (this.meal?.customProducts)
      this.customProduct = this.meal.customProducts.find(
        (customProductTemp) =>
          this.getCustomProductProductId(customProductTemp) === productId
      );
  }

  private getSelectedIngredientIndex(
    selectedIngredient: CustomProduct
  ): number | null {
    if (!this.meal?.customProducts?.length) return null;

    const selectedProductId = this.getCustomProductProductId(selectedIngredient);
    if (!selectedProductId) return null;

    const index = this.meal.customProducts.findIndex(
      (customProductTemp) =>
        this.getCustomProductProductId(customProductTemp) === selectedProductId
    );

    return index >= 0 ? index : null;
  }

  private getCustomProductProductId(customProduct: CustomProduct): string | null {
    return this.getProductId(customProduct?.product);
  }

  private getProductId(product: any): string | null {
    if (!product) return null;
    if (typeof product === 'string') return product;
    return product?._id?.toString?.() || null;
  }

  private getLoading(): void {
    this.utilService.getLoading.subscribe((res) => (this.loading.value = res));
  }

  public openAddProduct(): void {
    const queryParams: any = {
      dietDay: JSON.stringify(this.dietDay),
      meal: JSON.stringify(this.meal),
      product: JSON.stringify(this.product),
      productQuantity: this.getEffectiveQuantity(),
    };
    this.navigationService.goToAddProduct({
      replaceUrl: false,
      queryParams,
      state: {
        dietDay: this.dietDay,
        meal: this.meal,
        product: this.product,
        productQuantity: this.getEffectiveQuantity(),
        ingredientMode: this.ingredientMode,
        customProduct: this.customProduct, // Pass existing customProduct for editing
        returnUrl: '/search-foods',
      },
    });
  }

  private setBrand(): void {
    this.brand = this.displayCustomProduct
      ? this.displayCustomProduct.product?.brand
      : this.product.brand;
  }

  private getEffectiveQuantity(): number {
    return (
      this.customProduct?.quantity ??
      this.recentCustomProduct?.quantity ??
      this.productQuantity ??
      100
    );
  }

  private buildCustomProductForAdd(): CustomProduct {
    if (this.recentCustomProduct && !this.customProduct) {
      const recentPayload = { ...this.recentCustomProduct } as CustomProduct & {
        lastUsedAt?: string;
      };
      delete recentPayload._id;
      delete recentPayload.mealId;
      delete recentPayload.customRecipeId;
      delete recentPayload.baseCustomProductId;
      delete recentPayload.lastUsedAt;

      return {
        ...recentPayload,
        quantity: this.getEffectiveQuantity(),
        order: 0,
        product: this.product,
      };
    }

    return this.customProductService.composeCustomProduct(
      this.product,
      this.getEffectiveQuantity(),
      0
    );
  }
}
