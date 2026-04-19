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
    if (changes.meal || changes.isIngredientSelected || changes.product) {
      this.existCustomProduct();
      this.isProductChecked();
      this.setBrand();
    }
  }

  // Handler for row click in ingredient mode - navigate to add-product
  public onRowClickIngredientMode(): void {
    console.log(
      '[DEBUG] Row clicked in ingredient mode, navigating to add-product'
    );
    // Navigate to add-product in ingredient mode
    this.navigationService.goToAddProduct({
      state: {
        product: this.product,
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
      quantity: this.productQuantity || 100,
    });
    this.ingredientToggle.emit({
      product: this.product,
      quantity: this.productQuantity || 100,
      checked: this.isChecked,
    });
  }

  public toggleProduct(event: Event): void {
    const checked = this.utilService.getEventCheck(event);

    // In ingredient mode, just emit the product without API calls
    if (this.ingredientMode) {
      this.isChecked = checked;
      this.ingredientToggle.emit({
        product: this.product,
        quantity: this.productQuantity || 100,
        checked: checked,
      });
      return;
    }

    const newCustomProduct = this.customProductService.composeCustomProduct(
      this.product,
      this.productQuantity,
      0
    );

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
        newCustomProduct.energyKcal100g = this.product.energyKcal100g;
        newCustomProduct.protein100g = this.product.protein100g;
        newCustomProduct.carbohydrates100g = this.product.carbohydrates100g;
        newCustomProduct.fat100g = this.product.fat100g;

        const idDietInUse = this.userService.getLocalUser.dietInUse;
        this.dietDayService
          .createCustomProduct(
            this.loading,
            this.dietDay,
            newCustomProduct,
            this.meal,
            idDietInUse
          )
          .subscribe(() => {
            this.isChecked = true;
          });
      } else {
        this.isChecked = false;
        this.openAddProduct();
      }
    } else {
      this.loading.value = true;
      const customProductToDelete = this.meal.customProducts.find(
        (resCustomProduct) => resCustomProduct.product?._id === this.product._id
      );

      if (!customProductToDelete) {
        console.warn(
          '[toggleProduct] No se encontró customProduct para eliminar. Puede que ya estuviera borrado.',
          this.product._id
        );
        this.isChecked = false;
        this.loading.value = false;
        return;
      }

      this.customProductService
        .deleteCustomProduct(customProductToDelete._id)
        .pipe(take(1))
        .subscribe(() => {
          this.isChecked = false;
          const indexCustomProduct = this.meal.customProducts.findIndex(
            (customProductTemp) =>
              customProductTemp._id === customProductToDelete._id
          );
          this.meal.customProducts.splice(indexCustomProduct, 1);
          this.dietDayService.setCurrentDietDay = this.dietDay;
          this.customProduct = undefined;
          this.loading.value = false;
        });
    }
  }

  public checkIfInfoExist(): boolean {
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

    this.isChecked = !!this.meal.customProducts.find(
      (customProductTemp) => customProductTemp.product?._id === this.product._id
    );
  }

  private existCustomProduct(): void {
    if (this.meal?.customProducts)
      this.customProduct = this.meal.customProducts.find(
        (customProductTemp) =>
          customProductTemp.product?._id === this.product._id
      );
  }

  private getLoading(): void {
    this.utilService.getLoading.subscribe((res) => (this.loading.value = res));
  }

  public openAddProduct(): void {
    const queryParams: any = {
      dietDay: JSON.stringify(this.dietDay),
      meal: JSON.stringify(this.meal),
      product: JSON.stringify(this.product),
      productQuantity: this.productQuantity,
    };
    this.navigationService.goToAddProduct({
      replaceUrl: false,
      queryParams,
      state: {
        dietDay: this.dietDay,
        meal: this.meal,
        product: this.product,
        productQuantity: this.productQuantity,
        ingredientMode: this.ingredientMode,
        customProduct: this.customProduct, // Pass existing customProduct for editing
        returnUrl: '/search-foods',
      },
    });
  }

  private setBrand(): void {
    this.brand = this.customProduct
      ? this.customProduct.product?.brand
      : this.product.brand;
  }
}

