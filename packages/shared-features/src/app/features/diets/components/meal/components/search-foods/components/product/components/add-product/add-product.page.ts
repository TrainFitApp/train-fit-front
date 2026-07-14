import { Component, effect, inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  AlertButton,
  AlertInput,
  AlertOptions,
  Platform,
  ToastOptions,
} from "@ionic/angular";
import { firstValueFrom, Subject, Subscription, take, takeUntil } from "rxjs";
import { CustomProduct } from "src/app/core/models/customProduct";
import { DietDay } from "src/app/core/models/dietDay";
import { Meal } from "src/app/core/models/meal";
import { IProduct } from "src/app/core/models/product";
import { User } from "src/app/core/models/user";
import { CustomProductService } from "src/app/core/services/custom-product/custom-product.service";
import { DietDayService } from "src/app/core/services/diet-day/diet-day.service";
import { ProductService } from "src/app/core/services/product/product.service";
import { RecipeDraftService } from "src/app/core/services/recipe/recipe-draft.service";
import { UserService } from "src/app/core/services/user/user.service";
import { TranslateService } from "@ngx-translate/core";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";

export enum PRODUCT_ATRR {
  name = 0,
  brand = 1,
}
@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.page.html",
  styleUrls: ["./add-product.page.scss"],
})
export class AddProductPage implements OnInit, OnDestroy {
  private static readonly NUTRITION_FIELDS = [
    "energyKcal100g",
    "protein100g",
    "carbohydrates100g",
    "fat100g",
    "saturatedFat100g",
    "sugars100g",
    "fiber100g",
    "salt100g",
    "sodium100g",
    "cholesterol100g",
    "transFat100g",
    "calcium100g",
    "iron100g",
    "magnesium100g",
    "phosphorus100g",
    "potassium100g",
    "zinc100g",
    "copper100g",
    "manganese100g",
    "selenium100g",
    "iodine100g",
    "vitaminA100g",
    "vitaminC100g",
    "vitaminD100g",
    "vitaminE100g",
    "vitaminK100g",
    "vitaminB1100g",
    "vitaminB2100g",
    "vitaminB3100g",
    "vitaminB5100g",
    "vitaminB6100g",
    "vitaminB9100g",
    "vitaminB12100g",
    "biotin100g",
    "omega3100g",
    "omega6100g",
    "omega9100g",
    "caffeine100g",
    "taurine100g",
    "alcohol100g",
  ] as const;

  private static readonly MG_TO_G_FIELDS = new Set<string>([
    "calcium100g",
    "iron100g",
    "magnesium100g",
    "phosphorus100g",
    "potassium100g",
    "zinc100g",
    "copper100g",
    "manganese100g",
    "sodium100g",
    "vitaminE100g",
    "vitaminC100g",
    "vitaminB1100g",
    "vitaminB2100g",
    "vitaminB3100g",
    "vitaminB5100g",
    "vitaminB6100g",
    "cholesterol100g",
    "caffeine100g",
    "taurine100g",
  ]);

  private static readonly MICROGRAM_TO_G_FIELDS = new Set<string>([
    "selenium100g",
    "iodine100g",
    "vitaminA100g",
    "vitaminD100g",
    "vitaminK100g",
    "vitaminB9100g",
    "vitaminB12100g",
    "biotin100g",
  ]);

  public product: IProduct;
  public customProduct: CustomProduct;
  public meal: Meal;
  public dietDay: DietDay;
  public productQuantity: number;
  public isScanned: boolean;
  public isArchived: boolean;
  public isVerified: boolean;
  public selectedUnit: "g" | "portions" = "g";
  public hasPortions: boolean = false;
  private returnUrl?: string;
  public ingredientMode = false;
  private targetMealName?: string;
  public editingIngredient = false;
  public recipeName?: string;
  private ingredientEditingIndex: number | null = null;

  public user: User;
  public addCustomProductForm: FormGroup;

  public getLocalUser$: Subscription;
  public addingFavProduct = false;

  public loading = { value: false };
  private initialFormSnapshot = "";
  private autoPersistInProgress = false;
  private backFlowInProgress = false;
  private allowRouteLeave = false;
  private lastPersistResult:
    | "none"
    | "ingredient-updated"
    | "meal-updated"
    | "meal-created"
    | "profile-updated"
    | "error" = "none";

  public PRODUCT_ATRR = PRODUCT_ATRR;

  // Getters para el resumen de macros dinámico

  /**
   * FIX selector ración/gramos: devuelve la cantidad efectiva en gramos
   * teniendo en cuenta si estamos en modo porciones o gramos.
   * Los getters totalCalories/Protein/Carbs/Fat usan esto para calcular correctamente.
   */
  get effectiveQuantity(): number {
    if (this.selectedUnit === "portions" && this.hasPortions) {
      const portions = this.addCustomProductForm?.get("portions")?.value || 0;
      const servingQuantity =
        this.product?.servingQuantity ??
        this.customProduct?.product?.servingQuantity ??
        0;
      return (portions || 0) * servingQuantity;
    }
    return this.addCustomProductForm?.get("quantity")?.value || 0;
  }

  get totalCalories(): number {
    const kcal100g =
      this.addCustomProductForm?.get("energyKcal100g")?.value || 0;
    return Math.round((kcal100g * this.effectiveQuantity) / 100);
  }

  get totalProtein(): number {
    const protein100g =
      this.addCustomProductForm?.get("protein100g")?.value || 0;
    return Math.round(((protein100g * this.effectiveQuantity) / 100) * 10) / 10;
  }

  get totalCarbs(): number {
    const carbs100g =
      this.addCustomProductForm?.get("carbohydrates100g")?.value || 0;
    return Math.round(((carbs100g * this.effectiveQuantity) / 100) * 10) / 10;
  }

  get totalFat(): number {
    const fat100g = this.addCustomProductForm?.get("fat100g")?.value || 0;
    return Math.round(((fat100g * this.effectiveQuantity) / 100) * 10) / 10;
  }

  get isDietMode(): boolean {
    return !!this.meal || this.ingredientMode;
  }

  get isProductOwnedByUser(): boolean {
    const userId = this.userService.getLocalUser?._id;
    return !!(userId && this.product?.userId && this.product.userId === userId);
  }

  private backButtonSubscription: any;
  private destroy$ = new Subject<void>();
  private edgeSwipeStartX = 0;
  private edgeSwipeStartY = 0;
  private edgeSwipeTracking = false;
  private edgeSwipePromptShown = false;
  private swipeBackOriginalStates = new Map<any, boolean>();
  private readonly onTouchStartBound = (event: TouchEvent) =>
    this.onEdgeSwipeTouchStart(event);
  private readonly onTouchMoveBound = (event: TouchEvent) =>
    this.onEdgeSwipeTouchMove(event);
  private readonly onTouchEndBound = () => this.onEdgeSwipeTouchEnd();

  // Inyección de servicios con Signals
  private readonly userService = inject(UserService);
  private readonly recipeDraftService = inject(RecipeDraftService);

  constructor(
    private navigationService: NavigationService,
    private dietDayService: DietDayService,
    private customProductService: CustomProductService,
    private ionicUtilService: IonicUtilService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private translate: TranslateService,
  ) {
    // Effect para el usuario
    effect(() => {
      const resUser = this.userService.localUser();
      if (resUser) {
        this.user = resUser;
        this.checkIfArchived();
      }
    });
  }

  public ngOnInit(): void {
    this.user = this.userService.getLocalUser;

    // 1. Initial capture from state (fastest)
    const state: any = window.history.state || {};
    if (state.returnUrl)
      this.returnUrl = this.normalizeReturnUrl(state.returnUrl);
    if (state.ingredientMode) this.ingredientMode = state.ingredientMode;
    if (state.mealName) this.targetMealName = state.mealName;
    if (state.meal) {
      this.meal = state.meal;
      this.targetMealName = this.meal.name;
    }
    if (state.product) this.product = state.product;
    if (state.dietDay) this.dietDay = state.dietDay;
    if (state.customProduct) {
      this.customProduct = state.customProduct;
      this.editingIngredient = !!this.customProduct;
    }
    if (state.recipeName) {
      this.recipeName = state.recipeName;
    }

    const stateEditingIngredientIndex =
      typeof state.editingIngredientIndex === "number"
        ? state.editingIngredientIndex
        : null;
    this.ingredientEditingIndex = stateEditingIngredientIndex;

    // Ingredient mode canonical source:
    // prefer the explicit navigation payload for the clicked product.
    // A stale editing index from a previous ingredient must not override it.
    if (this.ingredientMode && this.recipeDraftService.isActive()) {
      if (state.customProduct) {
        const currentIngredient = state.customProduct as CustomProduct;
        this.customProduct = currentIngredient;
        this.product = currentIngredient.product as IProduct;
        this.productQuantity = currentIngredient.quantity;
        this.editingIngredient = true;
        this.ingredientEditingIndex =
          stateEditingIngredientIndex ??
          this.findDraftIngredientIndex(currentIngredient);
        this.recipeDraftService.setEditingIngredientIndex(
          this.ingredientEditingIndex,
        );
      } else {
        this.ingredientEditingIndex = null;
        this.recipeDraftService.setEditingIngredientIndex(null);
      }
    } else if (this.ingredientMode) {
      const selectedIngredients = this.navigationService.getTempData<
        CustomProduct[]
      >("selectedIngredients");

      if (state.customProduct) {
        const currentIngredient = state.customProduct as CustomProduct;
        this.ingredientEditingIndex =
          stateEditingIngredientIndex ??
          this.findIngredientIndex(selectedIngredients || [], currentIngredient);
        this.customProduct = currentIngredient;
        this.product = currentIngredient.product as IProduct;
        this.productQuantity = currentIngredient.quantity;
        this.editingIngredient = true;
      } else if (
        stateEditingIngredientIndex !== null &&
        stateEditingIngredientIndex >= 0 &&
        selectedIngredients?.[stateEditingIngredientIndex]
      ) {
        const currentIngredient = selectedIngredients[stateEditingIngredientIndex];
        this.customProduct = currentIngredient;
        this.product = currentIngredient.product as IProduct;
        this.productQuantity = currentIngredient.quantity;
        this.editingIngredient = true;
      }

      if (this.ingredientEditingIndex !== null) {
        this.navigationService.setTempData(
          "editingIngredientIndex",
          this.ingredientEditingIndex,
        );
      }
    }

    if (this.ingredientMode && !this.recipeName) {
      if (this.recipeDraftService.isActive()) {
        this.recipeName = this.recipeDraftService.form().name;
      } else {
        const formState = this.navigationService.getTempData<any>(
          "configRecipeFormState",
        );
        this.recipeName = formState?.name;
      }
    }

    // 2. Load from route (handles deep links/refreshes)
    this.loadParametersFromRoute();

    if (this.meal) this.existCustomProduct();
    this.checkHasPortions();
    this.initForm();
    this.subsPortions();

    // 3. Link with shared diet day state for CUMULATIVE additions
    // We subscribe to the service to ensure that if we are adding A then B,
    // we have the latest version of the diet day before saving.
    this.dietDayService.getCurrentDietDay
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: DietDay) => {
        if (res && !this.ingredientMode) {
          console.log("[DEBUG] AddProduct: Syncing with service state");
          this.dietDay = res;

          const mName = this.targetMealName || this.meal?.name;
          if (mName) {
            const found = res.meals.find((m) => m.name === mName);
            if (found) {
              this.meal = found;
              this.existCustomProduct();
              // Re-init form if it's the first time we get valid data
              if (!this.addCustomProductForm && this.product) {
                this.initForm();
              }
            }
          }
        }
      });

    // Fallback init if data was synchronous
    if (this.product) {
      this.existCustomProduct();
      this.initForm();
    }

    this.checkIfArchived();
    this.checkVerified();
  }

  public get headerTitle(): string {
    if (this.ingredientMode && this.recipeName) {
      return this.recipeName;
    }

    return this.meal ? this.meal.name : this.translate.instant('ADD_PRODUCT.YOUR_PRODUCTS');
  }

  public ionViewWillEnter(): void {
    this.initializeBackButtonHandler();
    this.attachIosEdgeSwipeInterceptor();
    this.updateNativeSwipeBackForUnsavedChanges();

    const state = this.navigationService.getState();
    console.log(
      "[AddProduct] ionViewWillEnter: state recibido:",
      state ? JSON.stringify(Object.keys(state)) : "null",
    );

    // C-05 FIX: leer tempData 'updatedProductForAddProduct' (mecanismo sin push al historial)
    const updatedProductFromTemp = this.navigationService.getTempData<IProduct>(
      "updatedProductForAddProduct",
    );
    if (updatedProductFromTemp) {
      this.navigationService.clearTempData("updatedProductForAddProduct");

      if (this.meal && this.customProduct) {
        const t = this.translate.instant.bind(this.translate);
        this.ionicUtilService.showAlert({
          header: t('ADD_PRODUCT.PRODUCT_UPDATED_HEADER'),
          message: t('ADD_PRODUCT.PRODUCT_UPDATED_MESSAGE'),
          buttons: [
            {
              text: t('ADD_PRODUCT.KEEP'),
              role: "cancel",
              handler: () => {
                // Actualizar referencia del producto base pero mantener los valores nutricionales del customProduct
                // con los valores anteriores (no sincroniza nutrición)
                const oldProduct = this.product;

                this.product = updatedProductFromTemp;

                if (this.customProduct) {
                  this.customProduct.product = this.product;

                  // "Pinchar" (Decouple) el perfil nutricional original como overrides en el customProduct
                  // Esto garantiza que el customProduct mantenga sus valores 100g originales
                  this.customProductService.mapNutritionalValues(
                    oldProduct,
                    this.customProduct,
                  );
                }

                this.checkHasPortions();
                this.initForm(); // Refrescar el formulario completo con los nuevos overrides y propiedades físicas
                this.checkIfArchived();
                this.checkVerified();
              },
            },
            {
              text: t('COMMON.SAVE'),
              handler: () => {
                // Actualizar producto base y sincronizar los valores nutricionales del customProduct
                this.product = updatedProductFromTemp;
                if (this.meal) this.existCustomProduct();

                // Forzar actualización del customProduct con los nuevos valores nutricionales
                if (this.customProduct) {
                  this.customProduct.product = this.product;
                  this.customProductService.mapNutritionalValues(
                    this.product,
                    this.customProduct,
                  );
                }

                this.checkHasPortions();
                this.initForm();
                this.checkIfArchived();
                this.checkVerified();
              },
            },
          ],
        });
      } else {
        // CASO 2: No hay meal (modo perfil) o no hay customProduct previo
        // Actualizar directamente para que los cambios sean visibles inmediatamente
        this.product = updatedProductFromTemp;
        if (this.meal) this.existCustomProduct();
        this.checkHasPortions();
        this.initForm();
        this.checkIfArchived();
        this.checkVerified();
      }
    }

      if (state && state.updatedProduct) {
        console.log(
          "[AddProduct] ionViewWillEnter: updatedProduct recibido:",
          state.updatedProduct?.name,
        );
        if (this.meal && this.customProduct) {
          const t = this.translate.instant.bind(this.translate);
          this.ionicUtilService.showAlert({
            header: t('ADD_PRODUCT.PRODUCT_UPDATED_HEADER'),
            message: t('ADD_PRODUCT.PRODUCT_UPDATED_MESSAGE'),
            buttons: [
              {
                text: t('ADD_PRODUCT.KEEP'),
                role: "cancel",
                handler: () => {
                // Actualizar referencia del producto base pero mantener los valores nutricionales del customProduct
                // con los valores anteriores (no sincroniza nutrición)
                const oldProduct = this.product;

                this.product = state.updatedProduct;

                if (this.customProduct) {
                  this.customProduct.product = this.product;

                  // Decouple original profile
                  this.customProductService.mapNutritionalValues(
                    oldProduct,
                    this.customProduct,
                  );
                }

                this.checkHasPortions();
                this.initForm();
                this.checkIfArchived();
                this.checkVerified();
              },
            },
            {
              text: t('COMMON.SAVE'),
              handler: () => {
                this.product = state.updatedProduct;
                // Actualizar producto base y sincronizar los valores nutricionales del customProduct
                if (this.meal) this.existCustomProduct();

                // Forzamos actualización del customProduct con los nuevos valores del producto base
                if (this.customProduct) {
                  this.customProduct.product = this.product;
                  // Sincronizar valores nutricionales del producto al customProduct
                  this.customProductService.mapNutritionalValues(
                    this.product,
                    this.customProduct,
                  );
                }

                this.checkHasPortions();
                this.initForm();
                this.checkIfArchived();
                this.checkVerified();
              },
            },
          ],
        });
      } else {
        // En modo creación o sin customProduct previo, actualizamos directamente
        this.product = state.updatedProduct;
        if (this.meal) this.existCustomProduct();
        this.checkHasPortions();
        this.initForm();
        this.checkIfArchived();
        this.checkVerified();
      }

      // Limpiar el estado para evitar recargas accidentales posteriores
      this.navigationService.clearStateKeys(["updatedProduct"]);
    }
  }

  private initializeBackButtonHandler(): void {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(9999, () => {
        this.goBack();
      });
  }

  private attachIosEdgeSwipeInterceptor(): void {
    if (!this.platform.is("ios")) return;

    document.addEventListener("touchstart", this.onTouchStartBound, {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchmove", this.onTouchMoveBound, {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchend", this.onTouchEndBound, {
      capture: true,
      passive: true,
    });
    document.addEventListener("touchcancel", this.onTouchEndBound, {
      capture: true,
      passive: true,
    });
  }

  private detachIosEdgeSwipeInterceptor(): void {
    if (!this.platform.is("ios")) return;

    document.removeEventListener("touchstart", this.onTouchStartBound, true);
    document.removeEventListener("touchmove", this.onTouchMoveBound, true);
    document.removeEventListener("touchend", this.onTouchEndBound, true);
    document.removeEventListener("touchcancel", this.onTouchEndBound, true);
  }

  private onEdgeSwipeTouchStart(event: TouchEvent): void {
    const touch = event.touches?.[0];
    if (!touch) return;

    this.edgeSwipeStartX = touch.clientX;
    this.edgeSwipeStartY = touch.clientY;
    this.edgeSwipeTracking = touch.clientX <= 28;
    this.edgeSwipePromptShown = false;

    if (this.edgeSwipeTracking) {
      this.updateNativeSwipeBackForUnsavedChanges();
      if (this.hasPersistableChanges()) {
        event.preventDefault();
      }
    }
  }

  private onEdgeSwipeTouchMove(event: TouchEvent): void {
    if (!this.edgeSwipeTracking) return;

    // Si ya mostramos el alert y el dedo sigue en pantalla, bloquear
    // cualquier arrastre residual para que no se mueva la vista de fondo.
    if (this.edgeSwipePromptShown) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!this.hasPersistableChanges()) return;

    const touch = event.touches?.[0];
    if (!touch) return;

    const deltaX = touch.clientX - this.edgeSwipeStartX;
    const deltaY = Math.abs(touch.clientY - this.edgeSwipeStartY);
    const isBackSwipeStart = deltaX > 2 && deltaX > deltaY + 2;

    if (!isBackSwipeStart) return;

    event.preventDefault();
    event.stopPropagation();
    this.updateNativeSwipeBackForUnsavedChanges();
    this.edgeSwipePromptShown = true;
    void this.goBack();
  }

  private onEdgeSwipeTouchEnd(): void {
    this.edgeSwipeTracking = false;
    this.edgeSwipePromptShown = false;
  }

  public ngOnDestroy(): void {
    this.detachIosEdgeSwipeInterceptor();
    this.restoreNativeSwipeBackGestures();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ionViewWillLeave(): void {
    this.detachIosEdgeSwipeInterceptor();
    this.restoreNativeSwipeBackGestures();
    if (this.getLocalUser$) this.getLocalUser$.unsubscribe();
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  public async addCustomProduct(): Promise<void> {
    if (this.loading.value || this.autoPersistInProgress) return;

    await this.goBack({
      forceSave: true,
      forceCreateMealProduct: true,
    });
  }

  private getFinalQuantity(formValues: any): number {
    if (!(this.meal || this.ingredientMode)) return 0;

    if (this.selectedUnit === "portions" && this.hasPortions) {
      const servingQuantity =
        this.product?.servingQuantity ??
        this.customProduct?.product?.servingQuantity ??
        0;
      const portions = this.normalizeNumericInput(formValues?.portions) ?? 0;
      return Math.round(portions * servingQuantity);
    }

    return Math.round(this.normalizeNumericInput(formValues?.quantity) ?? 0);
  }

  private buildPersistSnapshot(): string {
    if (!this.addCustomProductForm) return "";

    const formValues = this.addCustomProductForm.getRawValue();
    const snapshot: any = {};

    if (this.meal || this.ingredientMode) {
      snapshot.quantity = this.getFinalQuantity(formValues);
    } else {
      snapshot.name = `${formValues.name ?? ""}`.trim();
      snapshot.brand = `${formValues.brand ?? ""}`.trim();
      snapshot.ingredients = `${formValues.ingredients ?? ""}`.trim();
      snapshot.allergens = `${formValues.allergens ?? ""}`.trim();
      snapshot.traces = `${formValues.traces ?? ""}`.trim();
    }

    AddProductPage.NUTRITION_FIELDS.forEach((field) => {
      snapshot[field] = this.toStorageNutritionValue(field, formValues[field]);
    });

    return JSON.stringify(snapshot);
  }

  private syncInitialSnapshot(): void {
    this.initialFormSnapshot = this.buildPersistSnapshot();
    this.addCustomProductForm?.markAsPristine();
    this.updateNativeSwipeBackForUnsavedChanges();
  }

  private hasPersistableChanges(): boolean {
    if (!this.addCustomProductForm || !this.initialFormSnapshot) return false;
    return this.buildPersistSnapshot() !== this.initialFormSnapshot;
  }

  private updateNativeSwipeBackForUnsavedChanges(): void {
    if (!this.platform.is("ios")) return;

    const hasChanges = this.hasPersistableChanges();
    const outlets = Array.from(
      document.querySelectorAll("ion-router-outlet"),
    ) as any[];

    outlets.forEach((outlet) => {
      if (!this.swipeBackOriginalStates.has(outlet)) {
        this.swipeBackOriginalStates.set(outlet, !!outlet.swipeGesture);
      }

      const originalValue = this.swipeBackOriginalStates.get(outlet) ?? true;
      outlet.swipeGesture = hasChanges ? false : originalValue;
    });
  }

  private restoreNativeSwipeBackGestures(): void {
    this.swipeBackOriginalStates.forEach((value, outlet) => {
      outlet.swipeGesture = value;
    });
    this.swipeBackOriginalStates.clear();
  }

  private async persistChangesIfNeeded(options?: {
    forceSaveEvenWithoutChanges?: boolean;
    forceCreateMealProduct?: boolean;
  }): Promise<
    | "none"
    | "ingredient-updated"
    | "meal-updated"
    | "meal-created"
    | "profile-updated"
    | "error"
  > {
    const hasChanges = this.hasPersistableChanges();
    const shouldForceMealCreate =
      !!options?.forceCreateMealProduct && !!this.meal && !this.customProduct;
    const shouldPersist =
      hasChanges ||
      !!options?.forceSaveEvenWithoutChanges ||
      shouldForceMealCreate;

    if (
      this.autoPersistInProgress ||
      !this.addCustomProductForm ||
      !this.product ||
      !shouldPersist
    ) {
      return "none";
    }

    if (this.addCustomProductForm.invalid) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('ADD_PRODUCT.INVALID_FIELDS'),
        duration: 1400,
        color: "warning",
      });
      return "error";
    }

    this.autoPersistInProgress = true;
    this.loading = { value: true };

    try {
      const formValues = this.addCustomProductForm.getRawValue();
      const finalQuantity = this.getFinalQuantity(formValues);

      if (this.ingredientMode) {
        const newCustomProduct = this.customProduct
          ? ({
              ...this.customProduct,
              product: this.product,
              quantity: finalQuantity,
            } as CustomProduct)
          : this.customProductService.composeCustomProduct(
              this.product,
              finalQuantity,
              0,
            );

        this.mapFormToProduct(formValues, newCustomProduct);

        if (this.customProduct && this.customProduct._id) {
          newCustomProduct._id = this.customProduct._id;
        }

        if (this.recipeDraftService.isActive()) {
          const editingIngredientIndex =
            this.recipeDraftService.editingIngredientIndex();

          if (
            typeof editingIngredientIndex === "number" &&
            editingIngredientIndex >= 0
          ) {
            // La edición de ingredientes de recipes siempre debe aterrizar
            // en el mismo draft compartido para que config-recipe refleje
            // el cambio nada más volver.
            this.recipeDraftService.updateIngredientAt(
              editingIngredientIndex,
              newCustomProduct,
            );
          } else {
            this.recipeDraftService.setIngredients([
              ...this.recipeDraftService.ingredients(),
              newCustomProduct,
            ]);
          }

          this.recipeDraftService.setEditingIngredientIndex(null);
        } else {
          const editingIngredientIndex =
            this.ingredientEditingIndex ??
            this.navigationService.getTempData<number>(
              "editingIngredientIndex",
            );
          const selectedIngredients =
            this.navigationService.getTempData<CustomProduct[]>(
              "selectedIngredients",
            ) || [];

          if (
            typeof editingIngredientIndex === "number" &&
            editingIngredientIndex >= 0 &&
            editingIngredientIndex < selectedIngredients.length
          ) {
            const nextIngredients = [...selectedIngredients];
            nextIngredients[editingIngredientIndex] = {
              ...nextIngredients[editingIngredientIndex],
              ...newCustomProduct,
            };
            this.navigationService.setTempData(
              "selectedIngredients",
              nextIngredients,
            );
          } else {
            this.navigationService.setTempData("selectedIngredients", [
              ...selectedIngredients,
              newCustomProduct,
            ]);
          }

          this.navigationService.setTempData("newIngredient", newCustomProduct);
        }
        this.syncInitialSnapshot();
        return "ingredient-updated";
      }

      if (this.meal) {
        if (this.customProduct) {
          this.customProduct.quantity = finalQuantity;
          this.mapFormToProduct(formValues, this.customProduct);

          const resCustomProduct = await firstValueFrom(
            this.customProductService
              .updateCustomProduct(this.customProduct)
              .pipe(take(1)),
          );

          const index = this.meal.customProducts.findIndex(
            (customProductTemp) =>
              customProductTemp._id === resCustomProduct._id,
          );
          if (index !== -1) {
            this.meal.customProducts[index] = resCustomProduct;
          }

          const indexMeal = this.dietDay?.meals?.findIndex(
            (mealTemp) => mealTemp._id === this.meal._id,
          );
          if (indexMeal !== undefined && indexMeal > -1 && this.dietDay) {
            this.dietDay.meals[indexMeal] = this.meal;
            this.dietDayService.setCurrentDietDay = this.dietDay;
          }

          this.syncInitialSnapshot();
          return "meal-updated";
        }

        const newCustomProduct = this.customProductService.composeCustomProduct(
          this.product,
          finalQuantity,
          0,
        );

        this.mapFormToProduct(formValues, newCustomProduct);
        const idDietInUse = this.userService.getLocalUser.dietInUse;

        await firstValueFrom(
          this.dietDayService.createCustomProduct(
            this.loading,
            this.dietDay,
            newCustomProduct,
            this.meal,
            idDietInUse,
          ),
        );

        this.syncInitialSnapshot();
        return "meal-created";
      }

      this.mapFormToProduct(formValues, this.product);
      await firstValueFrom(this.productService.updateProduct(this.product));
      this.syncInitialSnapshot();
      return "profile-updated";
    } catch (error) {
      console.error("[AddProduct] Error al guardar cambios automáticos", error);
      this.ionicUtilService.showToast({
        message: this.translate.instant('ADD_PRODUCT.AUTO_SAVE_ERROR'),
        duration: 1600,
        color: "danger",
      });
      return "error";
    } finally {
      this.loading = { value: false };
      this.autoPersistInProgress = false;
    }
  }

  private async askForUnsavedChangesAction(): Promise<
    "cancel" | "save" | "discard"
  > {
    const t = this.translate.instant.bind(this.translate);
    const alertResult = await this.ionicUtilService.showAlert({
      cssClass: "unsaved-exit-alert",
      header: t('ADD_PRODUCT.UNSAVED_CHANGES_HEADER'),
      message: t('ADD_PRODUCT.UNSAVED_CHANGES_MESSAGE'),
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: "cancel",
          cssClass: "unsaved-neutral-btn unsaved-cancel-btn",
        },
        {
          text: t('COMMON.SAVE'),
          role: "save",
          cssClass: "unsaved-save-btn",
        },
        {
          text: t('ADD_PRODUCT.DISCARD'),
          role: "discard",
          cssClass: "unsaved-neutral-btn unsaved-discard-btn",
        },
      ],
    });

    if (alertResult.role === "save") return "save";
    if (alertResult.role === "discard") return "discard";
    return "cancel";
  }

  public async canDeactivate(): Promise<boolean> {
    if (this.allowRouteLeave) {
      this.allowRouteLeave = false;
      this.lastPersistResult = "none";
      return true;
    }

    if (this.backFlowInProgress) return false;
    if (!this.hasPersistableChanges()) return true;

    this.backFlowInProgress = true;

    try {
      const unsavedAction = await this.askForUnsavedChangesAction();
      if (unsavedAction === "cancel") return false;

      if (unsavedAction === "save") {
        const persistResult = await this.persistChangesIfNeeded();
        if (persistResult === "error") return false;
        this.lastPersistResult = persistResult;
      } else {
        this.lastPersistResult = "none";
      }

      this.allowRouteLeave = true;
      return true;
    } finally {
      this.backFlowInProgress = false;
    }
  }

  public addFavoriteProduct(): void {
    this.addingFavProduct = true;
    this.productService
      .addFavoriteProduct(this.product._id, this.userService.getLocalUser._id)
      .subscribe((res) => {
        const isFavorite = !!res?.isFavorite;
        const archivedProducts = this.user.archivedProducts || [];
        const archivedIndex = archivedProducts.indexOf(this.product._id);

        if (isFavorite && archivedIndex === -1) {
          archivedProducts.push(this.product._id);
          this.ionicUtilService.showToast({
            message: this.translate.instant('ADD_PRODUCT.PRODUCT_ARCHIVED', { name: this.product.name }),
            duration: 1000,
          });
        } else if (!isFavorite && archivedIndex > -1) {
          archivedProducts.splice(archivedIndex, 1);
          this.ionicUtilService.showToast({
            message: this.translate.instant('ADD_PRODUCT.PRODUCT_UNARCHIVED', { name: this.product.name }),
            duration: 1000,
          });
        }

        this.user.archivedProducts = archivedProducts;
        this.userService.setLocalUser = this.user;
        this.addingFavProduct = false;
        this.checkIfArchived();
      });
  }

  public async goBack(params?: {
    closeAll?: boolean;
    refresh?: boolean;
    deleteOwnProduct?: string;
    forceSave?: boolean;
    forceCreateMealProduct?: boolean;
  }): Promise<void> {
    let closeAll = !!params?.closeAll;
    let refresh = !!params?.refresh;

    if (params?.deleteOwnProduct) {
      this.allowRouteLeave = true;
      this.lastPersistResult = "none";
    } else if (params?.forceSave) {
      const persistResult = await this.persistChangesIfNeeded({
        forceSaveEvenWithoutChanges: true,
        forceCreateMealProduct: !!params?.forceCreateMealProduct,
      });
      if (persistResult === "error") return;

      if (persistResult === "meal-created") closeAll = true;
      if (persistResult === "profile-updated") refresh = true;

      this.allowRouteLeave = true;
      this.lastPersistResult = "none";
    } else {
      const canLeave = await this.canDeactivate();
      if (!canLeave) return;

      if (this.lastPersistResult === "meal-created") closeAll = true;
      if (this.lastPersistResult === "profile-updated") refresh = true;
      this.lastPersistResult = "none";
    }

    console.log("AddProductPage: goBack called", {
      params,
      returnUrl: this.returnUrl,
    });

    if (closeAll) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('ADD_PRODUCT.PRODUCT_ADDED_TO_MEAL', { mealName: this.meal?.name || this.translate.instant('COMMON.THE_MEAL') }),
        duration: 1000,
      });
    }

    const result = params?.deleteOwnProduct
      ? { deleteOwnProduct: params.deleteOwnProduct }
      : closeAll
      ? { createdViaAddProduct: true }
      : refresh
      ? { refresh: true }
      : undefined;

    // Capturar fecha seleccionada para persistencia
    const navState = window.history.state;
    const selectedDate = navState?.selectedDate || this.dietDay?.date;

    // Si venimos de Diets, hacer pop para evitar recargar y rehacer llamadas
    if (this.returnUrl === "/tabs/diets") {
      console.log("AddProductPage: returning to diets");
      this.navigationService.backTo(["/tabs/diets"], {
        state: { selectedDate },
      });
      return;
    }

    // Si el retorno es config-recipe, hacer pop
    if (this.returnUrl === "/search-foods/config-recipe") {
      console.log("AddProductPage: returning to config-recipe");
      this.clearIngredientEditingContext();
      this.navigationService.backTo([this.returnUrl], {
        state: { selectedDate },
      });
      return;
    }

    // Si el retorno es SearchFoods (o no hay returnUrl), hacer pop al SearchFoods previo
    if (this.returnUrl === "/search-foods") {
      console.log("AddProductPage: returning to search-foods");
      this.clearIngredientEditingContext();
      this.navigationService.backTo(["/search-foods"], {
        state: {
          ...(result || {}),
          ingredientMode: this.ingredientMode,
          // Devolver siempre el producto actualizado por si se ha editado
          updatedProduct: this.product,
          selectedDate,
        },
      });
    } else if (!this.returnUrl) {
      console.log("AddProductPage: no returnUrl, popping");
      this.clearIngredientEditingContext();
      this.navigationService.backNoAnim();
    } else {
      console.log("AddProductPage: returning to " + this.returnUrl);
      this.clearIngredientEditingContext();
      // Para otros returnUrl, mantener comportamiento anterior con posible resultado
      this.navigationService.backTo(this.returnUrl, {
        state: {
          ...(result ? { result } : {}),
          selectedDate,
        },
      });
    }
  }

  private findDraftIngredientIndex(ingredient: CustomProduct): number | null {
    return this.findIngredientIndex(
      this.recipeDraftService.ingredients(),
      ingredient,
    );
  }

  private findIngredientIndex(
    ingredients: CustomProduct[],
    ingredient: CustomProduct,
  ): number | null {
    const productId = this.getCustomProductProductId(ingredient);
    if (!productId) return null;

    const index = (ingredients || []).findIndex(
      (currentIngredient) =>
        this.getCustomProductProductId(currentIngredient) === productId,
    );

    return index >= 0 ? index : null;
  }

  private getCustomProductProductId(
    customProduct: CustomProduct,
  ): string | null {
    const product = customProduct?.product as any;
    if (!product) return null;
    if (typeof product === "string") return product;
    return product?._id?.toString?.() || null;
  }

  private clearIngredientEditingContext(): void {
    if (!this.ingredientMode) return;

    this.ingredientEditingIndex = null;

    if (this.recipeDraftService.isActive()) {
      this.recipeDraftService.setEditingIngredientIndex(null);
    }

    this.navigationService.clearTempData("editingIngredientIndex");
  }

  public changeAtributtes(name: PRODUCT_ATRR): void {
    if (!this.meal) {
      const t = this.translate.instant.bind(this.translate);
      const isName = name === PRODUCT_ATRR.name;
      const alertButtons: AlertButton[] = [
        {
          text: t('COMMON.CANCEL').toUpperCase(),
          role: "cancel",
        },
        {
          text: t('COMMON.CONFIRM'),
          handler: (res) =>
            this.addCustomProductForm.controls[
              isName ? "name" : "brand"
            ].setValue(res.attribute),
        },
      ];
      const alertInputs: AlertInput[] = [
        {
          name: "attribute",
          type: "textarea",
          value: this.product[isName ? "name" : "brand"],
          placeholder: isName ? t('ADD_PRODUCT.NAME_PLACEHOLDER') : t('ADD_PRODUCT.BRAND_PLACEHOLDER'),
        },
      ];

      const alertOptions: AlertOptions = {
        header: isName ? t('ADD_PRODUCT.NAME_PRODUCT') : t('ADD_PRODUCT.BRAND_PRODUCT'),
        inputs: alertInputs,
        buttons: alertButtons,
      };

      this.ionicUtilService.showAlert(alertOptions);

      // NO FUNCIONA PORQUE ESTA SUPERPUESTA POR ENCIMA DE VARIOS MODALES
      // const sweetAlertOptions = {
      //   text: `${name === PRODUCT_ATRR.name ? 'Nombre' : 'Marca'} de producto`,
      //   inputPlaceholder: `${name === PRODUCT_ATRR.name ? 'nombre' : 'marca'}`,
      //   icon: 'question',
      //   input: 'textarea',
      //   inputValue:
      //     name === PRODUCT_ATRR.name ? this.product.name : this.product.brand,
      //   showCancelButton: true,
      //   showConfirmButton: true,
      //   confirmButtonText: 'GUARDAR',
      //   confirmButtonColor: 'var(--ion-color-primary)',
      //   cancelButtonText: 'CANCELAR',
      // };
      // this.utilService
      //   .showSweetAlert(sweetAlertOptions)
      //   .then((res) => {
      //     if (res.isConfirmed) {
      //       this.ownProductService
      //         .updateOwnProduct({
      //           ...this.product,
      //           [res.value === PRODUCT_ATRR.name
      //             ? 'nombre' : 'marca']: res.value,
      //         })
      //         .subscribe();
      //     }
      //   });
    }
  }

  private checkHasPortions(): void {
    const servingQuantity =
      this.product?.servingQuantity ??
      this.customProduct?.product?.servingQuantity;
    this.hasPortions = !!servingQuantity && servingQuantity > 0;
  }

  private subsPortions(): void {
    if (!this.addCustomProductForm) return;

    // Porciones → gramos: actualizar 'quantity' para que el backend/guardado reciba gramos
    // Se emite el evento para que Angular detecte el cambio y los getters de macros se recalculen
    this.addCustomProductForm.controls.portions.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        if (this.selectedUnit === "portions" && this.hasPortions) {
          const servingQuantity =
            this.product?.servingQuantity ??
            this.customProduct?.product?.servingQuantity ??
            0;
          const finalQuantity = Math.round((val || 0) * servingQuantity);
          // FIX: sin 'emitEvent: false' para que Angular actualice los getters del template
          this.addCustomProductForm.controls.quantity.setValue(finalQuantity, {
            emitEvent: false, // mantener false pero los getters ahora leen 'portions' directamente
          });
        }
      });

    // Gramos → porciones: actualizar contador de raciones (UI bidireccional)
    this.addCustomProductForm.controls.quantity.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        if (this.selectedUnit === "g" && this.hasPortions) {
          const servingQuantity =
            this.product?.servingQuantity ??
            this.customProduct?.product?.servingQuantity ??
            0;
          if (servingQuantity > 0) {
            const finalPortions =
              Math.round((val / servingQuantity) * 100) / 100;
            this.addCustomProductForm.controls.portions.setValue(
              finalPortions,
              { emitEvent: false },
            );
          }
        }
      });
  }

  public changeUnit(unit: "g" | "portions"): void {
    this.selectedUnit = unit;

    if (!this.addCustomProductForm) return;

    const quantityControl = this.addCustomProductForm.controls.quantity;
    const portionsControl = this.addCustomProductForm.controls.portions;

    if (unit === "portions") {
      // En modo porciones: raciones es obligatorio, gramos no
      portionsControl.setValue(1); // FIX: dejar de serie a 1 cuando se cambie a raciones
      quantityControl.clearValidators();
      quantityControl.setErrors(null);
      portionsControl.setValidators([
        Validators.required,
        Validators.min(0.01),
      ]);
    } else {
      // En modo gramos: gramos es obligatorio, raciones no
      quantityControl.setValidators(
        this.meal || this.ingredientMode ? [Validators.required] : [],
      );
      portionsControl.clearValidators();
      portionsControl.setErrors(null);
    }

    quantityControl.updateValueAndValidity();
    portionsControl.updateValueAndValidity();
  }

  private mapFormToProduct(formValues: any, target: any): void {
    const isCustomProductTarget = !!target?.product;
    if (isCustomProductTarget) {
      this.applyCustomProductNutritionOverrides(target, formValues);
    } else {
      target.name = formValues.name;
      target.brand = formValues.brand;
      this.setProductNutritionFields(target, formValues);
      target.vegan = this.product.vegan;
      target.vegetarian = this.product.vegetarian;
      target.lactoseFree = this.product.lactoseFree;
      target.glutenFree = this.product.glutenFree;
    }

    // Textos (Convertir string a array)
    const splitText = (text: any) =>
      typeof text === "string"
        ? text
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i.length > 0)
        : text;

    if (!isCustomProductTarget) {
      target.ingredients = formValues.ingredients;
      target.allergens = splitText(formValues.allergens);
      target.traces = splitText(formValues.traces);
    }
  }

  public goToEditProduct(): void {
    if (this.isProductOwnedByUser) {
      this.navigationService.goToCreateProduct({
        queryParams: {
          product: JSON.stringify(this.product),
          isEditMode: true,
          returnUrl: "/search-foods/add-product",
        },
        state: {
          product: this.product,
          isEditMode: true,
          returnUrl: "/search-foods/add-product",
          user: this.user,
        },
      });
    }
  }

  public deleteOwnProduct(): void {
    if (this.isProductOwnedByUser) {
      const productName = this.product
        ? this.product.name
        : this.customProduct.product.name;
      const t = this.translate.instant.bind(this.translate);
      const alertOptions: AlertOptions = {
        header: t('ADD_PRODUCT.DELETE_PRODUCT_HEADER'),
        message: t('ADD_PRODUCT.DELETE_PRODUCT_CONFIRM', { name: productName }),
        buttons: [
          {
            text: t('COMMON.CANCEL').toUpperCase(),
            role: "cancel",
          },
          {
            text: t('COMMON.DELETE').toUpperCase(),
            role: "destructive",
            handler: () => {
              this.productService
                .deleteProduct(this.product._id)
                .subscribe(() => {
                  this.recipeDraftService.removeProductReferences(
                    this.product._id,
                  );

                  // Eliminar de archivedProducts si estaba
                  const archivedIndex = this.user.archivedProducts.indexOf(
                    this.product._id,
                  );
                  if (archivedIndex > -1) {
                    this.user.archivedProducts.splice(archivedIndex, 1);
                  }

                  this.userService.setLocalUser = this.user;

                  // Eliminar referencias locales en TODAS las meals/recetas del dietDay
                  if (this.dietDay && this.dietDay.meals) {
                    let shouldUpdateDietDay = false;
                    this.dietDay.meals.forEach((m) => {
                      const mealTemp: any = m;

                      if (m.customProducts) {
                        const originalLength = m.customProducts.length;
                        m.customProducts = m.customProducts.filter(
                          (cp) => cp.product?._id !== this.product._id,
                        );
                        if (m.customProducts.length !== originalLength) {
                          shouldUpdateDietDay = true;
                          // Si es la meal actual que estamos editando, actualizar la referencia local
                          if (this.meal && this.meal._id === m._id) {
                            this.meal = m;
                          }
                        }
                      }

                      if (mealTemp.customRecipes?.length) {
                        mealTemp.customRecipes.forEach((instance: any) => {
                          if (!instance) return;

                          if (Array.isArray(instance.addedCustomProducts)) {
                            const originalAdditionalLen =
                              instance.addedCustomProducts.length;
                            instance.addedCustomProducts =
                              instance.addedCustomProducts.filter(
                                (addCp: any) => {
                                  const addProductId =
                                    typeof addCp?.product === "string"
                                      ? addCp.product
                                      : addCp?.product?._id;
                                  return addProductId !== this.product._id;
                                },
                              );
                            if (
                              instance.addedCustomProducts.length !==
                              originalAdditionalLen
                            ) {
                              shouldUpdateDietDay = true;
                            }
                          }

                          const recipe =
                            typeof instance.recipe === "object"
                              ? instance.recipe
                              : null;

                          if (recipe && Array.isArray(recipe.customProducts)) {
                            const removedCustomProductIds = new Set<string>();
                            const originalRecipeCpLen =
                              recipe.customProducts.length;

                            recipe.customProducts =
                              recipe.customProducts.filter((cp: any) => {
                                const cpProductId =
                                  typeof cp?.product === "string"
                                    ? cp.product
                                    : cp?.product?._id;
                                const keep = cpProductId !== this.product._id;
                                if (!keep && cp?._id) {
                                  removedCustomProductIds.add(
                                    cp._id.toString(),
                                  );
                                }
                                return keep;
                              });

                            if (
                              recipe.customProducts.length !==
                              originalRecipeCpLen
                            ) {
                              shouldUpdateDietDay = true;
                            }

                            if (
                              removedCustomProductIds.size > 0 &&
                              Array.isArray(instance.modifiedBaseCustomProducts)
                            ) {
                              const originalOverridesLen =
                                instance.modifiedBaseCustomProducts.length;
                              instance.modifiedBaseCustomProducts =
                                instance.modifiedBaseCustomProducts.filter(
                                  (override: any) => {
                                    const overrideId =
                                      typeof override?.baseCustomProductId ===
                                      "string"
                                        ? override.baseCustomProductId
                                        : override?.baseCustomProductId?._id;
                                    return !removedCustomProductIds.has(
                                      (overrideId || "").toString(),
                                    );
                                  },
                                );
                              if (
                                instance.modifiedBaseCustomProducts.length !==
                                originalOverridesLen
                              ) {
                                shouldUpdateDietDay = true;
                              }
                            }
                          }
                        });
                      }
                    });

                    if (shouldUpdateDietDay) {
                      this.dietDayService.setCurrentDietDay = this.dietDay;
                    }
                  }

                  this.ionicUtilService.showToast({
                    message: this.translate.instant('ADD_PRODUCT.PRODUCT_DELETED', { name: this.product.name }),
                    duration: 1000,
                  });
                  this.goBack({ deleteOwnProduct: this.product._id });
                });
            },
          },
        ],
      };

      this.ionicUtilService.showAlert(alertOptions);
    }
  }

  private checkIfArchived(): void {
    if (!this.user || !this.product) return;
    this.isArchived =
      this.user.archivedProducts?.includes(this.product._id) || false;
  }

  private checkVerified(): void {
    this.isVerified =
      this.product?.verified ?? this.customProduct?.product?.verified;
  }

  private existCustomProduct(): void {
    if (this.ingredientMode) {
      // In ingredient mode, the current ingredient comes from
      // config-recipe tempData/state, not from meal.customProducts.
      return;
    }

    this.customProduct = this.meal?.customProducts.find(
      (customProductTemp) =>
        customProductTemp.product?._id === this.product._id,
    );
  }

  private initVariables(): void {
    // Ya gestionado por effect en el constructor
  }

  private initForm(): void {
    const quantity = this.customProduct
      ? this.customProduct.quantity
      : this.productQuantity;

    // Si el producto tiene raciones y es una entrada nueva, preseleccionamos 'raciones'
    if (this.hasPortions && !quantity) {
      this.selectedUnit = "portions";
    }

    // Redondear kilocalorías sin decimales
    // Cadena de fallback: override directo en customProduct → producto viejo en customProduct.product → this.product
    const roundedEnergyKcal = this.roundDisplayValue(
      this.getEffectiveProductValue("energyKcal100g"),
      0,
    );

    // Redondear macronutrientes con máximo 1 decimal
    const roundedProtein = this.roundDisplayValue(
      this.getEffectiveProductValue("protein100g"),
      1,
    );

    const roundedCarbohydrates = this.roundDisplayValue(
      this.getEffectiveProductValue("carbohydrates100g"),
      1,
    );

    const roundedFat = this.roundDisplayValue(
      this.getEffectiveProductValue("fat100g"),
      1,
    );

    const roundedSaturatedFat = this.roundDisplayValue(
      this.getEffectiveProductValue("saturatedFat100g"),
      1,
    );

    const roundedSugars = this.roundDisplayValue(
      this.getEffectiveProductValue("sugars100g"),
      1,
    );

    const roundedFiber = this.roundDisplayValue(
      this.getEffectiveProductValue("fiber100g"),
      1,
    );

    // Helper: prioriza overrides directos del customProduct, luego su producto original,
    // y finalmente el producto nuevo (this.product). Esto es clave para "Mantener":
    // cuando cp no tiene override directo (cp[key] === undefined), los valores vienen
    // del producto que tenía el customProduct ANTES de ser reemplazado (cp.product),
    // no del nuevo producto editado (this.product).
    const cpOrP = <K extends keyof IProduct>(key: K) => {
      return this.getEffectiveProductValue(key as keyof IProduct);
    };

    // Minerales
    this.addCustomProductForm = new FormGroup({
      name: new FormControl(this.product.name, Validators.required),
      brand: new FormControl(this.product.brand),
      quantity: new FormControl(
        quantity,
        this.meal || this.ingredientMode ? Validators.required : null,
      ),
      portions: new FormControl(1),
      energyKcal100g: new FormControl(roundedEnergyKcal, Validators.required),
      protein100g: new FormControl(roundedProtein, [
        Validators.required,
        Validators.min(0),
      ]),
      carbohydrates100g: new FormControl(roundedCarbohydrates, [
        Validators.required,
        Validators.min(0),
      ]),
      fat100g: new FormControl(roundedFat, [
        Validators.required,
        Validators.min(0),
      ]),
      saturatedFat100g: new FormControl(roundedSaturatedFat, [
        Validators.min(0),
      ]),
      sugars100g: new FormControl(roundedSugars, [Validators.min(0)]),
      fiber100g: new FormControl(roundedFiber, [Validators.min(0)]),

      // Minerales (Cargar convirtiendo a unidades de visualización)
      // NOTA: cpOrP prioriza los valores del customProduct (entrada en meal) sobre el producto base
      calcium100g: new FormControl(
        this.toDisplayNutritionValue("calcium100g", cpOrP("calcium100g")),
      ),
      iron100g: new FormControl(
        this.toDisplayNutritionValue("iron100g", cpOrP("iron100g")),
      ),
      magnesium100g: new FormControl(
        this.toDisplayNutritionValue("magnesium100g", cpOrP("magnesium100g")),
      ),
      phosphorus100g: new FormControl(
        this.toDisplayNutritionValue(
          "phosphorus100g",
          cpOrP("phosphorus100g"),
        ),
      ),
      potassium100g: new FormControl(
        this.toDisplayNutritionValue("potassium100g", cpOrP("potassium100g")),
      ),
      zinc100g: new FormControl(
        this.toDisplayNutritionValue("zinc100g", cpOrP("zinc100g")),
      ),
      copper100g: new FormControl(
        this.toDisplayNutritionValue("copper100g", cpOrP("copper100g")),
      ),
      manganese100g: new FormControl(
        this.toDisplayNutritionValue("manganese100g", cpOrP("manganese100g")),
      ),
      selenium100g: new FormControl(
        this.toDisplayNutritionValue("selenium100g", cpOrP("selenium100g")),
      ),
      iodine100g: new FormControl(
        this.toDisplayNutritionValue("iodine100g", cpOrP("iodine100g")),
      ),
      sodium100g: new FormControl(
        this.toDisplayNutritionValue("sodium100g", cpOrP("sodium100g")),
      ),
      salt100g: new FormControl(
        this.toDisplayNutritionValue("salt100g", cpOrP("salt100g")),
      ),

      // Vitaminas
      vitaminA100g: new FormControl(
        this.toDisplayNutritionValue("vitaminA100g", cpOrP("vitaminA100g")),
      ),
      vitaminD100g: new FormControl(
        this.toDisplayNutritionValue("vitaminD100g", cpOrP("vitaminD100g")),
      ),
      vitaminE100g: new FormControl(
        this.toDisplayNutritionValue("vitaminE100g", cpOrP("vitaminE100g")),
      ),
      vitaminK100g: new FormControl(
        this.toDisplayNutritionValue("vitaminK100g", cpOrP("vitaminK100g")),
      ),
      vitaminC100g: new FormControl(
        this.toDisplayNutritionValue("vitaminC100g", cpOrP("vitaminC100g")),
      ),
      vitaminB1100g: new FormControl(
        this.toDisplayNutritionValue("vitaminB1100g", cpOrP("vitaminB1100g")),
      ),
      vitaminB2100g: new FormControl(
        this.toDisplayNutritionValue("vitaminB2100g", cpOrP("vitaminB2100g")),
      ),
      vitaminB3100g: new FormControl(
        this.toDisplayNutritionValue("vitaminB3100g", cpOrP("vitaminB3100g")),
      ),
      vitaminB5100g: new FormControl(
        this.toDisplayNutritionValue("vitaminB5100g", cpOrP("vitaminB5100g")),
      ),
      vitaminB6100g: new FormControl(
        this.toDisplayNutritionValue("vitaminB6100g", cpOrP("vitaminB6100g")),
      ),
      vitaminB9100g: new FormControl(
        this.toDisplayNutritionValue("vitaminB9100g", cpOrP("vitaminB9100g")),
      ),
      vitaminB12100g: new FormControl(
        this.toDisplayNutritionValue(
          "vitaminB12100g",
          cpOrP("vitaminB12100g"),
        ),
      ),
      biotin100g: new FormControl(
        this.toDisplayNutritionValue("biotin100g", cpOrP("biotin100g")),
      ),

      // Otros
      cholesterol100g: new FormControl(
        this.toDisplayNutritionValue(
          "cholesterol100g",
          cpOrP("cholesterol100g"),
        ),
      ),
      transFat100g: new FormControl(
        this.toDisplayNutritionValue("transFat100g", cpOrP("transFat100g")),
      ),
      omega3100g: new FormControl(
        this.toDisplayNutritionValue("omega3100g", cpOrP("omega3100g")),
      ),
      omega6100g: new FormControl(
        this.toDisplayNutritionValue("omega6100g", cpOrP("omega6100g")),
      ),
      omega9100g: new FormControl(
        this.toDisplayNutritionValue("omega9100g", cpOrP("omega9100g")),
      ),
      caffeine100g: new FormControl(
        this.toDisplayNutritionValue("caffeine100g", cpOrP("caffeine100g")),
      ),
      taurine100g: new FormControl(
        this.toDisplayNutritionValue("taurine100g", cpOrP("taurine100g")),
      ),
      alcohol100g: new FormControl(
        this.toDisplayNutritionValue("alcohol100g", cpOrP("alcohol100g")),
      ),

      // Textos (C-06 FIX: Usar cpOrP para priorizar overrides de CustomProduct)
      ingredients: new FormControl(
        Array.isArray(cpOrP("ingredients"))
          ? (cpOrP("ingredients") as string[]).join(", ")
          : cpOrP("ingredients"),
      ),
      allergens: new FormControl(
        Array.isArray(cpOrP("allergens"))
          ? (cpOrP("allergens") as string[]).join(", ")
          : cpOrP("allergens"),
      ),
      traces: new FormControl(
        Array.isArray(cpOrP("traces"))
          ? (cpOrP("traces") as string[]).join(", ")
          : cpOrP("traces"),
      ),
    });

    this.addCustomProductForm.markAllAsTouched();

    // Sincronizar validadores según el modo inicial (puede haber arrancado en 'portions')
    // changeUnit hace el intercambio de required entre quantity <-> portions
    if (this.selectedUnit === "portions") {
      this.changeUnit("portions");
    }

    this.syncInitialSnapshot();
  }

  public roundCalories(event: any): void {
    const value = event.target.value;
    if (value && !isNaN(value)) {
      const roundedValue = Math.round(parseFloat(value));
      this.addCustomProductForm.patchValue({
        energyKcal100g: roundedValue,
      });
    }
  }

  public roundMicro(event: any, controlName: string): void {
    const value = event.target.value;
    if (value && !isNaN(value)) {
      const roundedValue = Math.round(parseFloat(value) * 10) / 10;
      this.addCustomProductForm.patchValue({
        [controlName]: roundedValue,
      });
    }
  }

  public roundMicro1000(event: any, controlName: string): void {
    const value = event.target.value;
    if (value && !isNaN(value)) {
      const roundedValue = Math.round(parseFloat(value) * 1000) / 1000;
      this.addCustomProductForm.patchValue({
        [controlName]: roundedValue,
      });
    }
  }

  public showOverrideMeta(field: string): boolean {
    if (!this.addCustomProductForm) return false;

    const baseValue = this.getBaseNutritionValue(field);
    if (baseValue === null) return false;

    const currentDisplayValue = this.addCustomProductForm.get(field)?.value;
    const currentValue = this.toStorageNutritionValue(
      field,
      currentDisplayValue,
    );
    if (currentValue === null) return true;

    return !this.areNutritionValuesEqual(currentValue, baseValue);
  }

  public restoreOriginalValue(field: string): void {
    if (!this.addCustomProductForm) return;

    const baseValue = this.getBaseNutritionValue(field);
    const displayValue = this.toDisplayNutritionValue(field, baseValue);

    this.addCustomProductForm.patchValue({ [field]: displayValue });
    this.addCustomProductForm.get(field)?.markAsDirty();
    this.addCustomProductForm.get(field)?.markAsTouched();
  }

  private normalizeNumericInput(value: any): number | null {
    if (value === null || value === undefined) return null;
    if (typeof value === "string" && value.trim() === "") return null;

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private toStorageNutritionValue(field: string, value: any): number | null {
    const normalized = this.normalizeNumericInput(value);
    if (normalized === null) return null;

    if (AddProductPage.MG_TO_G_FIELDS.has(field)) return normalized / 1000;
    if (AddProductPage.MICROGRAM_TO_G_FIELDS.has(field))
      return normalized / 1000000;

    return normalized;
  }

  private toDisplayNutritionValue(field: string, value: any): number | null {
    const normalized = this.normalizeNumericInput(value);
    if (normalized === null) return null;

    if (AddProductPage.MG_TO_G_FIELDS.has(field)) {
      return parseFloat((normalized * 1000).toFixed(1));
    }

    if (AddProductPage.MICROGRAM_TO_G_FIELDS.has(field)) {
      return parseFloat((normalized * 1000000).toFixed(1));
    }

    return normalized;
  }

  private hasCustomProductField(
    field: keyof CustomProduct | keyof IProduct,
  ): boolean {
    return (
      !!this.customProduct &&
      Object.prototype.hasOwnProperty.call(this.customProduct, field)
    );
  }

  private getEffectiveProductValue(field: keyof IProduct): any {
    if (this.hasCustomProductField(field)) {
      return (this.customProduct as any)?.[field];
    }

    const customProductBase = this.customProduct?.product as any;
    if (customProductBase?.[field] !== undefined) {
      return customProductBase[field];
    }

    return (this.product as any)?.[field];
  }

  private roundDisplayValue(
    value: number | null | undefined,
    maxDecimals: number,
  ): number | null | undefined {
    if (value === null || value === undefined) {
      return value;
    }

    if (maxDecimals === 0) {
      return Math.round(value);
    }

    const multiplier = 10 ** maxDecimals;
    return Math.round(value * multiplier) / multiplier;
  }

  private getBaseNutritionValue(field: string): number | null {
    return this.normalizeNumericInput((this.product as any)?.[field]);
  }

  private areNutritionValuesEqual(
    a: number | null,
    b: number | null,
    epsilon = 1e-9,
  ): boolean {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    return Math.abs(a - b) < epsilon;
  }

  private setNutritionValue(target: any, field: string, formValues: any): void {
    target[field] = this.toStorageNutritionValue(field, formValues[field]);
  }

  private setProductNutritionFields(target: any, formValues: any): void {
    AddProductPage.NUTRITION_FIELDS.forEach((field) => {
      this.setNutritionValue(target, field, formValues);
    });
  }

  private applyCustomProductNutritionOverrides(
    target: any,
    formValues: any,
  ): void {
    AddProductPage.NUTRITION_FIELDS.forEach((field) => {
      const normalizedValue = this.toStorageNutritionValue(
        field,
        formValues[field],
      );
      const baseValue = this.normalizeNumericInput(target?.product?.[field]);

      if (normalizedValue === null) {
        target[field] = null;
        return;
      }

      if (this.areNutritionValuesEqual(normalizedValue, baseValue)) {
        delete target[field];
        return;
      }

      target[field] = normalizedValue;
    });
  }

  private loadParametersFromRoute(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      let needsInit = false;
      if (params["product"]) {
        this.product = JSON.parse(params["product"]);
        needsInit = true;
      }
      if (params["meal"]) {
        this.meal = JSON.parse(params["meal"]);
        this.targetMealName = this.meal.name;
        needsInit = true;
      } else if (params["mealName"]) {
        this.targetMealName = params["mealName"];
      }

      if (params["dietDay"]) {
        this.dietDay = JSON.parse(params["dietDay"]);
      }
      if (params["productQuantity"]) {
        this.productQuantity = parseFloat(params["productQuantity"]);
        needsInit = true;
      }
      if (params["isScanned"]) {
        this.isScanned = params["isScanned"] === "true";
      }
      if (params["ingredientMode"]) {
        this.ingredientMode = params["ingredientMode"] === "true";
      }
      if (params["returnUrl"]) {
        this.returnUrl = this.normalizeReturnUrl(params["returnUrl"]);
      }

      if (needsInit && this.product && !this.addCustomProductForm) {
        if (!this.ingredientMode) {
          this.existCustomProduct();
        }
        this.initForm();
      }
    });

    // Soportar navegación sin animación via NavController usando history.state
    const state: any = window.history.state || {};
    if (state.product && !this.product) {
      try {
        this.product = state.product;
      } catch (_) {}
    }
    if (state.meal && !this.meal) {
      try {
        this.meal = state.meal;
      } catch (_) {}
    }
    if (state.dietDay && !this.dietDay) {
      try {
        this.dietDay = state.dietDay;
      } catch (_) {}
    }
    if (
      state.productQuantity !== undefined &&
      state.productQuantity !== null &&
      !this.productQuantity
    ) {
      const pq = parseFloat(state.productQuantity);
      if (!isNaN(pq)) this.productQuantity = pq;
    }
    if (state.isScanned !== undefined && state.isScanned !== null) {
      this.isScanned = !!state.isScanned;
    }
    if (state.returnUrl)
      this.returnUrl = this.normalizeReturnUrl(state.returnUrl);
  }

  private normalizeReturnUrl(url: string): string {
    if (url === "/config-recipe") {
      return "/search-foods/config-recipe";
    }
    return url;
  }
}
