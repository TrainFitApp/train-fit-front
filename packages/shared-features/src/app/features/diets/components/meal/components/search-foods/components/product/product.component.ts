import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
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
import { TranslateService } from '@ngx-translate/core';
import { DB_ES_EN_MAP } from 'src/app/shared/constants/db-translations/es-en-db.map';
import { THEMES } from 'src/app/shared/models/theme';
import {
  MEASURE_FILTER,
  MEASURE_FILTER_TYPES,
} from 'src/app/shared/constants/measureFilter';
import { PautadoItemViewComponent } from '../../../../../pautado-item-view/pautado-item-view.component';

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
  // TAREA5 (train-fit-trainers) — selección múltiple: cuando está activa, un
  // click en la fila o en el checkbox marca/desmarca este producto en la
  // "cesta" del panel (ver SearchFoodsPage#trainerSelection) en vez de
  // escribir contra la dieta del CONSUMIDOR logueado (que es lo que hacen
  // toggleProduct()/openAddProduct() más abajo — ninguno de los dos sirve
  // para "la dieta de OTRO usuario"). Código nuevo, no reutiliza ni modifica
  // la rama de ingredientMode.
  @Input()
  public trainerMultiSelect = false;
  @Input()
  public isTrainerSelected = false;
  // Fix — sin esto, la card de un producto ya marcado en la cesta (modo
  // entrenador) mostraba SIEMPRE la cantidad/macros por defecto del
  // producto (servingQuantity/100g), nunca la cantidad custom que el
  // trainer puso en la cesta o en el panel de detalle — displayCustomProduct
  // solo miraba meal.customProducts (vacío en modo entrenador) y
  // recentCustomProduct (histórico, no la selección actual).
  @Input()
  public trainerSelectedQuantity: number | null = null;
  // TAREA5 (auditoría UX, Fase B) — favoritos personales del entrenador.
  @Input()
  public isTrainerFavorite = false;
  // Fix (ronda detalle) — resaltado naranja cuando este producto es el que
  // se está previsualizando en el panel de detalle aparte (ver
  // SearchFoodsPage#onFocusItem). No implica selección.
  @Input()
  public isTrainerFocused = false;

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

  @Output()
  public trainerToggle = new EventEmitter<{
    product: IProduct;
    checked: boolean;
  }>();

  @Output()
  public trainerFavoriteToggle = new EventEmitter<IProduct>();

  @Output()
  public trainerFocus = new EventEmitter<IProduct>();

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

  get mealNameTranslated(): string {
    if (this.ingredientMode) {
      return this.translate.instant('FILTER.RECIPE');
    }
    const name = this.meal?.name || '';
    if (this.translate.currentLang === 'en') {
      return DB_ES_EN_MAP[name] || name;
    }
    return name;
  }

  constructor(
    private customProductService: CustomProductService,
    private translate: TranslateService,
    private utilService: UtilService,
    private dietDayService: DietDayService,
    private userService: UserService,
    private navigationService: NavigationService,
    private mealService: MealService,
    private modalController: ModalController
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
      changes.isTrainerSelected ||
      changes.trainerSelectedQuantity ||
      changes.product ||
      changes.recentCustomProduct
    ) {
      this.existCustomProduct();
      this.isProductChecked();
      this.setBrand();
    }
  }

  // Mientras el día de esta fecha se está creando (lo estrena la primera
  // escritura del buscador), ningún checkbox puede dispararse: la segunda
  // escritura tiene que esperar a que el día exista, no pedir otro día para la
  // misma fecha (ver DietDayService#trackDietDayCreation). En modo entrenador
  // no aplica: ahí la dieta es la del cliente y esta pantalla no crea días.
  public get isBusy(): boolean {
    return (
      this.loading.value ||
      this.actionLoading ||
      (!this.trainerMultiSelect &&
        this.dietDayService.isCreatingDietDay(this.dietDay?.date))
    );
  }

  // Pautado por el profesional en esta comida. Es de solo lectura: el
  // backend rechaza cambiar su composición (assertMealEditable), así que
  // enseñar checkbox aquí sería ofrecer algo que va a fallar. Solo cuenta en
  // el modo normal del cliente — en modo entrenador (trainerMultiSelect) la
  // comida es de OTRO usuario y no hay customProduct propio que mirar.
  public get isPautado(): boolean {
    if (this.trainerMultiSelect || this.ingredientMode) return false;
    return !!this.customProduct?.assignedByTrainerId;
  }

  public get displayCustomProduct(): CustomProduct | null {
    if (this.trainerMultiSelect && this.isTrainerSelected && this.trainerSelectedQuantity != null) {
      return {
        ...(this.customProduct || {}),
        product: this.product,
        quantity: this.trainerSelectedQuantity,
      } as CustomProduct;
    }
    return this.customProduct || this.recentCustomProduct || null;
  }

  // Mismo badge +N/-N que la fila de la comida (ver
  // MealComponent#productAssignedDelta) — diferencia entre lo pautado y lo
  // ya consumido, para que se vea también aquí sin tener que abrir la
  // vista de solo lectura. Solo tiene sentido si isPautado (ver arriba).
  public get productAssignedDelta(): number {
    if (this.customProduct?.assignedQuantity == null) return 0;
    return Math.round((Number(this.customProduct.quantity) || 0) - this.customProduct.assignedQuantity);
  }

  public onCardClick(): void {
    if (this.isBusy) return;

    // Un pautado no se edita: se consulta. Va a la vista de solo lectura con
    // toda su información nutricional (única cosa editable ahí: la cantidad
    // consumida), nunca a add-product, que es el editor de composición.
    if (this.isPautado) {
      void this.openPautadoView();
      return;
    }

    if (this.trainerMultiSelect) {
      // Fix (ronda detalle) — tocar la card ya NO añade/quita de la
      // selección (eso es exclusivo del checkbox, ver onTrainerCheckboxChange
      // más abajo): solo previsualiza en el panel de detalle aparte.
      this.trainerFocus.emit(this.product);
      return;
    }

    if (this.ingredientMode) {
      this.onRowClickIngredientMode();
      return;
    }

    this.openAddProduct();
  }

  // Checkbox dedicado del modo entrenador — separado de
  // onCheckboxChangeIngredientMode/toggleProduct para no arrastrar ninguna
  // de sus llamadas a la API del consumidor.
  public onTrainerCheckboxChange(event: any): void {
    this.trainerToggle.emit({ product: this.product, checked: event.detail.checked });
    // Añadir con el check también previsualiza — no solo tocar la card.
    if (event.detail.checked) {
      this.trainerFocus.emit(this.product);
    }
  }

  public onTrainerFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.trainerFavoriteToggle.emit(this.product);
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
    if (this.trainerMultiSelect) {
      this.isChecked = this.isTrainerSelected;
      return;
    }

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

  private async openPautadoView(): Promise<void> {
    const modal = await this.modalController.create({
      component: PautadoItemViewComponent,
      componentProps: {
        kind: 'product',
        product: this.customProduct,
        mealId: this.meal?._id,
      },
      cssClass: 'auto-height-modal',
    });
    await modal.present();
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
