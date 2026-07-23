import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
  WritableSignal,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PluginListenerHandle } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import {
  ActionSheetOptions,
  AlertOptions,
  InfiniteScrollCustomEvent,
  IonRouterOutlet,
  Platform,
  PopoverOptions,
  ToastOptions,
} from "@ionic/angular";
import { forkJoin, Subscription, take } from "rxjs";
import {
  CustomProduct,
  CUSTOM_PRODUCT_VALUES,
} from "src/app/core/models/customProduct";
import { DietDay } from "src/app/core/models/dietDay";
import { Meal } from "src/app/core/models/meal";
import { IProduct } from "src/app/core/models/product";
import { Recipe } from "src/app/core/models/recipe";
import { User } from "src/app/core/models/user";
import { DietDayService } from "src/app/core/services/diet-day/diet-day.service";
import { DietService } from "src/app/core/services/diet/diet.service";
import { MealService } from "src/app/core/services/meal/meal.service";
import { ProductService } from "src/app/core/services/product/product.service";
import { RecipeDraftService } from "src/app/core/services/recipe/recipe-draft.service";
import { RecipeApiService } from "src/app/core/services/recipe/recipe-api.service";
import { UserService } from "src/app/core/services/user/user.service";
import { BarCodeScannerService } from "src/app/core/services/util/bar-code-scanner.service";
import { TranslateService } from "@ngx-translate/core";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";
import { UtilService } from "src/app/core/services/util/util.service";
import { BillingService } from "src/app/core/services/billing/billing.service";
import { ACTIONS_FAB_TYPES } from "src/app/shared/constants/actions-fab";
import { MEASURE_FILTER_TYPES } from "src/app/shared/constants/measureFilter";
import { SearchFilterGroup } from "src/app/shared/models/filterGroup";
import { FilterIconsComponent, FilterMode } from "src/app/shared/components/filter-icons/filter-icons.component";
import { Theme, THEMES } from "src/app/shared/models/theme";
import { PopoverActionsComponent } from "src/app/shared/components/popover-actions/popover-actions.component";
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTIONS,
} from "src/app/shared/constants/actions";

@Component({
  selector: "app-products",
  templateUrl: "./search-foods.page.html",
  styleUrls: ["./search-foods.page.scss"],
})
export class SearchFoodsPage implements OnInit, OnDestroy {
  // app-filter-icons mantiene su propio estado visual (ownFilter/favFilter/
  // shieldFilter), sin @Input desde aquí — si reseteamos searchFilterGroup
  // por código hay que empujarlo también al hijo o se desincroniza (icono
  // marcado pero búsqueda sin filtrar).
  @ViewChild('filterIconsRef') private filterIconsRef?: FilterIconsComponent;

  public meal: Meal;
  public user: User;

  public dietDay: DietDay;

  public searchFilterGroup: SearchFilterGroup;

  private readonly _products: WritableSignal<IProduct[]> = signal<IProduct[]>(
    [],
  );
  public recipes: Recipe[] = [];
  public recentCustomProducts: CustomProduct[] = [];
  public recentCustomRecipes: any[] = [];
  public hasStartedFoodSearch: boolean = false;
  public loadingRecipeIds = new Set<string>();
  public idUser: string;

  public load: boolean;

  public isFooterHidden: boolean = false;

  public searchBarValue: string = "";

  private _currentMode: FilterMode = "products";
  public get currentMode(): FilterMode {
    return this._currentMode;
  }
  public set currentMode(value: FilterMode) {
    console.log(
      "[DEBUG - MODE] currentMode changing from",
      this._currentMode,
      "to",
      value,
      new Error().stack,
    );
    this._currentMode = value;
  }

  public get products(): IProduct[] {
    return this._products();
  }

  public set products(value: IProduct[] | null | undefined) {
    this._products.set(value ?? []);
  }

  public ingredientMode: boolean = false;
  private readonly _selectedIngredients: WritableSignal<CustomProduct[]> =
    signal<CustomProduct[]>([]);
  private readonly _ingredientMacros: WritableSignal<{
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  }> = signal({ kcal: 0, protein: 0, carbs: 0, fat: 0 });

  public get selectedIngredients(): CustomProduct[] {
    return this._selectedIngredients();
  }

  public set selectedIngredients(value: CustomProduct[] | null | undefined) {
    this._selectedIngredients.set(value ?? []);
  }

  public get ingredientMacros(): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    return this._ingredientMacros();
  }

  public set ingredientMacros(
    value:
      | {
          kcal: number;
          protein: number;
          carbs: number;
          fat: number;
        }
      | null
      | undefined,
  ) {
    this._ingredientMacros.set(
      value ?? { kcal: 0, protein: 0, carbs: 0, fat: 0 },
    );
  }

  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  public ACTION_TYPES = ACTION_TYPES;

  private returnUrl?: string;
  private hasInitialized = false;
  private readonly recentProductsLimit = 15;
  private readonly recentRecipesLimit = 15;
  private productByCodeSub?: Subscription;
  private recentProductsSub?: Subscription;
  private recentRecipesSub?: Subscription;
  private searchProductsSub?: Subscription;
  private searchRecipesSub?: Subscription;
  private productsRequestVersion = 0;
  private recipesRequestVersion = 0;
  private backButton$?: Subscription;
  private keyboardWillShowHandle?: PluginListenerHandle;
  private keyboardWillHideHandle?: PluginListenerHandle;
  private keyboardDidShowHandle?: PluginListenerHandle;
  private keyboardDidHideHandle?: PluginListenerHandle;
  private visualViewportResizeHandler?: () => void;
  private baseViewportHeight?: number;

  constructor(
    private dietDayService: DietDayService,
    private dietService: DietService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private mealService: MealService,
    private productService: ProductService,
    private recipeApiService: RecipeApiService,
    private recipeDraftService: RecipeDraftService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private barCodeScannerService: BarCodeScannerService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private cdr: ChangeDetectorRef,
    private billingService: BillingService,
    private translate: TranslateService,
  ) {
    this.utilService.setMeasureFilter = MEASURE_FILTER_TYPES.auto;
  }

  public ngOnInit(): void {
    this.initInputsFromRoute();
    this.initVariables();
  }

  public async ionViewWillEnter(): Promise<void> {
    this.initializeBackButtonHandler();
    void this.initializeKeyboardListeners();
    console.log(
      "[DEBUG - LIFECYCLE] ionViewWillEnter called, currentMode:",
      this.currentMode,
      "hasInitialized:",
      this.hasInitialized,
    );
    console.log(
      "[DEBUG - LIFECYCLE] selectedIngredients at START:",
      this.selectedIngredients.length,
    );
    console.log(
      "[DEBUG - LIFECYCLE] ingredientMode at START:",
      this.ingredientMode,
    );

    this.user = this.userService.getLocalUser;

    // Leer posibles parámetros de retorno desde el escáner o config-recipe
    const state: any = this.navigationService.getState() || {};
    if (state.userId && !this.user) this.user = { _id: state.userId } as any;
    if (state.mealName && !this.meal)
      this.meal = { name: state.mealName } as any;
    if (state.returnUrl) this.returnUrl = state.returnUrl;

    if (state.fromDiets) {
      const currentDietDay = this.dietDayService.currentDietDay;
      if (currentDietDay) {
        this.dietDay = currentDietDay;
        const stateMeal = state.meal || this.meal;
        let updatedMeal;

        if (stateMeal?._id) {
          updatedMeal = currentDietDay.meals.find(
            (m) => m._id === stateMeal._id,
          );
        }

        if (!updatedMeal && stateMeal?.name) {
          updatedMeal = currentDietDay.meals.find(
            (m) => m.name === stateMeal.name,
          );
        }

        if (updatedMeal) {
          this.meal = { ...updatedMeal };
        }
      }
    }

    this.syncMealAndDietDayFromService();

    // Check if we're returning from config-recipe
    const returningFromConfigRecipe = state.returningFromConfigRecipe;
    if (returningFromConfigRecipe) {
      // Restore saved search state
      const savedState =
        this.navigationService.getTempData<any>("searchFoodsState");
      if (savedState) {
        console.log("[DEBUG] Restoring complete search state:", savedState);
        if (savedState.searchFilterGroup) {
          Object.assign(this.searchFilterGroup, savedState.searchFilterGroup);
        }
        if (savedState.currentMode) {
          this.currentMode = savedState.currentMode;
        }
        if (savedState.returnUrl !== undefined) {
          this.returnUrl = savedState.returnUrl;
        }
        if (savedState.ingredientMode !== undefined) {
          this.ingredientMode = savedState.ingredientMode;
        }
        if (savedState.hasStartedFoodSearch !== undefined) {
          this.hasStartedFoodSearch = !!savedState.hasStartedFoodSearch;
        }

        // Get UPDATED meal and dietDay from service (they may have been updated in config-recipe)
        const currentDietDay = this.dietDayService.currentDietDay;
        if (currentDietDay) {
          this.dietDay = currentDietDay;
          const updatedMeal = this.findMealInDietDay(
            currentDietDay,
            savedState.meal,
          );

          if (updatedMeal) {
            // Create a new reference to force Angular change detection
            this.meal = { ...updatedMeal };
            console.log(
              "[DEBUG] Updated meal from dietDay service:",
              this.meal,
            );
            console.log(
              "[DEBUG] Meal customRecipes:",
              this.meal.customRecipes,
            );
            console.log(
              "[DEBUG] Number of recipe instances:",
              this.meal.customRecipes?.length,
            );
          } else {
            this.meal = savedState.meal;
          }
        } else {
          // Fallback to saved state if service doesn't have current diet day
          if (savedState.meal !== undefined) {
            this.meal = savedState.meal;
          }
          if (savedState.dietDay !== undefined) {
            this.dietDay = savedState.dietDay;
          }
        }
      }

      // 🔧 FIX PROBLEMA 2: Also read currentMode directly from state (not just savedState)
      // This handles the case when creating a NEW recipe (no savedState exists)
      if (state.currentMode) {
        console.log(
          "[DEBUG] Setting currentMode from state:",
          state.currentMode,
        );
        this.currentMode = state.currentMode;
      }

      if (state.deletedRecipe) {
        this.handleRecipeDeletedLocally(state.deletedRecipe);
      }

      // If recipe name/description was edited inline, update it in the local list
      if (state.updatedRecipe) {
        const idx = this.recipes.findIndex(
          (r) => r._id === state.updatedRecipe._id,
        );
        if (idx !== -1) {
          // Sustituimos el objeto entero para que también se reflejen borrados
          // como description/name vacíos sin heredar propiedades antiguas.
          this.recipes[idx] = { ...state.updatedRecipe };
          this.recipes = [...this.recipes];
        }

        if (this.meal?.customRecipes?.length) {
          this.meal = {
            ...this.meal,
            customRecipes: this.meal.customRecipes.map((customRecipe: any) => {
              const recipeRef =
                typeof customRecipe.recipe === "object" ? customRecipe.recipe : null;

              if (recipeRef?._id !== state.updatedRecipe._id) {
                return customRecipe;
              }

              return {
                ...customRecipe,
                recipe: { ...state.updatedRecipe },
              };
            }),
          };
        }
      }

      // Clear the flag and temp data
      this.navigationService.clearStateKeys([
        "returningFromConfigRecipe",
        "deletedRecipe",
        "updatedRecipe",
      ]);
      this.navigationService.clearTempData("searchFoodsState");
    }

    // Ingredient mode for recipe creation - CRITICAL: must be read here too
    // Check if we have newIngredient first to avoid unnecessary operations
    const hasNewIngredient =
      this.navigationService.getTempData<CustomProduct>("newIngredient");

    if (state.ingredientMode) {
      this.ingredientMode = true;
      // Force mode to products when in ingredient mode
      this.currentMode = "products";
      // Reset search state so loadRecentProductsForMeal runs (page may be reused)
      this.hasStartedFoodSearch = false;

      // Store ingredient mode state in tempData for back button handler
      // This ensures the state persists even if ionViewWillEnter is called multiple times
      if (state.returnUrl) {
        this.returnUrl = state.returnUrl;
        this.navigationService.setTempData("ingredientModeState", {
          active: true,
          returnUrl: state.returnUrl,
        });
      }

      // Recipes usa un draft compartido en memoria como fuente principal.
      // TempData queda solo como compatibilidad/fallback.
      if (this.recipeDraftService.isActive()) {
        this.selectedIngredients = this.recipeDraftService.ingredients();
      }
      // 🔧 FIX: PRIMERO restaurar de tempData si existe (volviendo de create-product)
      else {
        const tempIngredients = this.navigationService.getTempData<
          CustomProduct[]
        >("selectedIngredients");
        if (tempIngredients && tempIngredients.length > 0) {
          console.log(
            "[DEBUG] Restoring selectedIngredients from tempData:",
            tempIngredients.length,
          );
          this.selectedIngredients = tempIngredients;
          // ⚠️ NO limpiar tempData aquí - se necesita para múltiples ciclos de vida
          // Se limpiará cuando salgamos del modo ingrediente
        }
        // SEGUNDO: si no hay tempData, usar state.existingIngredients
        else if (
          state.existingIngredients &&
          state.existingIngredients.length > 0
        ) {
          console.log(
            "[DEBUG] Loading existingIngredients from state:",
            state.existingIngredients.length,
          );
          this.selectedIngredients = state.existingIngredients;
        }
      }

      if (this.recipeDraftService.isActive()) {
        this.syncRecipeDraftIngredients();
      }

      console.log(
        "[DEBUG - STATE] Final selectedIngredients.length:",
        this.selectedIngredients.length,
      );

      console.log(
        "[DEBUG] Entering ingredient mode with ingredients:",
        this.selectedIngredients.length,
      );
      console.log(
        "[DEBUG] Existing ingredients:",
        this.selectedIngredients.map((i) => i.product?.name),
      );
      this.calculateIngredientMacros();

      if (hasNewIngredient) {
        console.log(
          "[DEBUG] Skipping search - processing newIngredient instead",
        );
      }
    } else if (!returningFromConfigRecipe) {
      // 🔧 FIX: Check if we have tempData (returning from create-product in ingredient mode)
      // If we have tempData with ingredients or newIngredient, we're still in ingredient mode
      const tempIngredients = this.navigationService.getTempData<
        CustomProduct[]
      >("selectedIngredients");
      const hasNewIngredient =
        this.navigationService.getTempData<CustomProduct>("newIngredient");

      if (!tempIngredients && !hasNewIngredient) {
        // Only reset ingredient mode if NOT returning from config-recipe AND no tempData
        // This means we're truly entering normal mode (not coming from create-product)
        console.log("[DEBUG] Resetting ingredient mode - entering normal mode");
        this.ingredientMode = false;
        this.selectedIngredients = [];
        this.ingredientMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

        // Limpiar tempData de ingredientes al salir del modo ingrediente
        this.navigationService.clearTempData("selectedIngredients");
        this.navigationService.clearTempData("ingredientModeState");
      } else {
        console.log(
          "[DEBUG] Has tempData - staying/activating ingredient mode",
        );
        // We're returning from create-product, stay in (or activate) ingredient mode
        this.ingredientMode = true;
        this.currentMode = "products";

        // Restore ingredients from tempData
        if (tempIngredients && tempIngredients.length > 0) {
          console.log(
            "[DEBUG] Restoring selectedIngredients from tempData (fallback):",
            tempIngredients.length,
          );
          this.selectedIngredients = tempIngredients;
        }

        this.calculateIngredientMacros();
      }
    } else if (!this.ingredientMode && this.selectedIngredients.length > 0) {
      console.log(
        "[DEBUG] ingredientMode=false but selectedIngredients not empty, clearing",
      );
      this.selectedIngredients = [];
      this.ingredientMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
      this.navigationService.clearTempData("selectedIngredients");
      this.navigationService.clearTempData("ingredientModeState");
    }

    // Check if returning from add-product with a new ingredient
    // Process AFTER setting ingredientMode to ensure proper context
    const newIngredient =
      this.navigationService.getTempData<CustomProduct>("newIngredient");
    console.log("[DEBUG] Checking for newIngredient...");
    console.log("[DEBUG] newIngredient:", newIngredient);
    console.log("[DEBUG] this.ingredientMode:", this.ingredientMode);
    console.log("[DEBUG] state.ingredientMode:", state.ingredientMode);

    if (newIngredient && this.ingredientMode) {
      this.applyNewIngredientToSelection(newIngredient);
      this.navigationService.clearTempData("newIngredient");
    }

    if (this.ingredientMode && this.recipeDraftService.isActive()) {
      this.selectedIngredients = this.recipeDraftService.ingredients();
      this.calculateIngredientMacros();
    }

    // Manejo de resultados al volver desde AddProduct por ruta (sin modales)
    const navStateResult: any = this.navigationService.getState() || {};
    const navStateTemp: any =
      this.navigationService.getTempData("searchFoodsResult") || {};
    this.navigationService.clearTempData("searchFoodsResult");
    const result = {
      ...(navStateResult || {}),
      ...(navStateResult.result || {}),
      ...navStateTemp,
    };

    // Determine if we need to search
    let shouldSearch = false;

    if (result?.deleteOwnProduct) {
      this.handleProductDeletedLocally(result.deleteOwnProduct);
      shouldSearch = false;
    } else if (result?.createdViaAddProduct) {
      // Switch to products segment when creating a product
      this.currentMode = "products";
      // Mostrar "Todos los productos": no dejar arrastrado un filtro own/fav/shield previo
      this.searchFilterGroup.ownFilter = false;
      this.searchFilterGroup.favFilter = false;
      this.searchFilterGroup.shieldFilter = false;
      // app-filter-icons no tiene @Input para esto: hay que resetear su
      // estado visual explícitamente o el icono queda marcado sin filtrar.
      this.filterIconsRef?.selectAllFilter();
      this.syncMealAndDietDayFromService();
      // Force search to refresh products list from API after creation
      this.markFoodSearchStarted();
      shouldSearch = true;
    } else if (result?.createdViaCreateProduct) {
      // Switch to products segment when creating a custom product
      this.currentMode = "products";
      // Mostrar "Todos los productos": no dejar arrastrado un filtro own/fav/shield previo
      this.searchFilterGroup.ownFilter = false;
      this.searchFilterGroup.favFilter = false;
      this.searchFilterGroup.shieldFilter = false;
      this.filterIconsRef?.selectAllFilter();
      this.syncMealAndDietDayFromService();
      // Force search to refresh products list from API after creation
      this.markFoodSearchStarted();
      shouldSearch = true;
    } else if (result?.refresh) {
      // Force refresh requested
      this.syncMealAndDietDayFromService();
      this.markFoodSearchStarted();
      shouldSearch = true;
    } else if (!returningFromConfigRecipe) {
      if (!this.hasInitialized) {
        console.log(
          "[DEBUG - INIT] Loading recent products only, currentMode:",
          this.currentMode,
        );
        this.hasInitialized = true;
      }
    } else {
      console.log(
        "[DEBUG] Returning from config-recipe, keeping current products:",
        this.products.length,
      );

      const activeListIsEmpty =
        this.currentMode === "recipes"
          ? !this.recipes || this.recipes.length === 0
          : !this.products || this.products.length === 0;

      if (activeListIsEmpty) {
        console.log(
          "[DEBUG] Active segment list is empty",
          this.currentMode,
        );
        shouldSearch = this.hasStartedFoodSearch;
      } else {
        // Ensure load is true to hide skeletons
        this.load = true;
      }
    }

    // Execute search only once if needed
    if (shouldSearch) {
      this.search();
    } else if (!this.hasStartedFoodSearch) {
      if (this.currentMode === "products") {
        this.loadRecentProductsForMeal();
      } else if (this.currentMode === "recipes") {
        this.loadRecentRecipesForMeal();
      } else {
        this.load = true;
      }
    }

    // 🍎 iOS: Inhabilitar gesto de ir hacia atrás si estamos en modo ingrediente
    // Esto evita que el swipe-back nos lleve a 'diets' en lugar de volver a 'config-recipe'
    if (this.platform.is("ios") && this.ingredientMode) {
      console.log("[iOS] Disabling swipe-back gesture in ingredient mode");
      this.routerOutlet.swipeGesture = false;
    }

    // 🔧 FIX: Procesar posible producto actualizado desde navegación
    if (state.updatedProduct) {
      console.log(
        "[DEBUG] Processing updatedProduct from state:",
        state.updatedProduct.name,
      );
      const idx = this.products.findIndex(
        (p) => p._id === state.updatedProduct._id,
      );
      if (idx !== -1) {
        this.products = this.products.map((p, index) =>
          index === idx ? { ...state.updatedProduct } : p,
        );
        console.log("[DEBUG] Updated product in local list at index:", idx);
      }

      const hasDietDayChanges =
        this.dietDayService.syncUpdatedProductInCurrentDietDay(
          state.updatedProduct,
        );
      if (hasDietDayChanges) {
        this.syncMealAndDietDayFromService();
      }
    }
  }

  public ngOnDestroy(): void {
    this.recentProductsSub?.unsubscribe();
    this.recentRecipesSub?.unsubscribe();
    this.searchProductsSub?.unsubscribe();
    this.searchRecipesSub?.unsubscribe();
    if (this.backButton$) {
      this.backButton$.unsubscribe();
    }
  }

  private initializeBackButtonHandler(): void {
    if (this.backButton$) {
      this.backButton$.unsubscribe();
    }
    this.backButton$ = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        // Check if we're in ingredient mode by checking component state OR tempData
        // This ensures back button works even if ionViewWillEnter cleared the state
        const tempIngredientModeState = this.navigationService.getTempData<any>(
          "ingredientModeState",
        );
        if (
          this.ingredientMode ||
          (tempIngredientModeState && tempIngredientModeState.active)
        ) {
          console.log(
            "[BACK BUTTON] Ingredient mode detected, using returnUrl",
          );
          // Ensure returnUrl is set from tempData if component state was cleared
          if (!this.returnUrl && tempIngredientModeState?.returnUrl) {
            this.returnUrl = tempIngredientModeState.returnUrl;
          }
          if (!this.ingredientMode && tempIngredientModeState?.active) {
            this.ingredientMode = true;
          }
        }

        this.close();
      },
    );
  }

  public async ionViewWillLeave(): Promise<void> {
    await this.removeKeyboardListeners();
    if (this.ingredientMode && this.returnUrl) {
      this.syncRecipeDraftIngredients();
      const ingredientsCopy = this.cloneSelectedIngredients();

      this.navigationService.setTempData(
        "selectedIngredients",
        ingredientsCopy,
      );
    }
    this.cancelProductLookup();
    this.recentProductsSub?.unsubscribe();
    this.recentRecipesSub?.unsubscribe();
    this.searchProductsSub?.unsubscribe();
    this.searchRecipesSub?.unsubscribe();

    // 🍎 Re-habilitar gesto de ir hacia atrás al salir
    if (this.platform.is("ios")) {
      this.routerOutlet.swipeGesture = true;
    }
  }

  private async initializeKeyboardListeners(): Promise<void> {
    await this.removeKeyboardListeners();

    if (this.platform.is('capacitor')) {
      const handleShow = () => this.setFooterHidden(true);
      const handleHide = () => this.setFooterHidden(false);

      try {
        this.keyboardWillShowHandle = await Keyboard.addListener(
          "keyboardWillShow",
          handleShow,
        );
        this.keyboardWillHideHandle = await Keyboard.addListener(
          "keyboardWillHide",
          handleHide,
        );
        this.keyboardDidShowHandle = await Keyboard.addListener(
          "keyboardDidShow",
          handleShow,
        );
        this.keyboardDidHideHandle = await Keyboard.addListener(
          "keyboardDidHide",
          handleHide,
        );
      } catch (error) {
        console.error("[Keyboard] Failed to register listeners", error);
      }
    }

    if (this.platform.is("ios") && window.visualViewport) {
      this.baseViewportHeight = window.visualViewport.height;
      this.visualViewportResizeHandler = () => {
        const currentHeight = window.visualViewport?.height;
        if (!currentHeight) {
          return;
        }

        if (
          !this.baseViewportHeight ||
          currentHeight > this.baseViewportHeight
        ) {
          this.baseViewportHeight = currentHeight;
        }

        const isKeyboardVisible =
          currentHeight < (this.baseViewportHeight ?? currentHeight) - 120;

        this.setFooterHidden(isKeyboardVisible);

        if (!isKeyboardVisible) {
          this.baseViewportHeight = currentHeight;
        }
      };

      window.visualViewport.addEventListener(
        "resize",
        this.visualViewportResizeHandler,
      );
    }
  }

  private async removeKeyboardListeners(): Promise<void> {
    if (this.platform.is('capacitor')) {
      try {
        await this.keyboardWillShowHandle?.remove();
        await this.keyboardWillHideHandle?.remove();
        await this.keyboardDidShowHandle?.remove();
        await this.keyboardDidHideHandle?.remove();
      } catch (error) {
        console.error("[Keyboard] Failed to remove listeners", error);
      }
    }

    this.keyboardWillShowHandle = undefined;
    this.keyboardWillHideHandle = undefined;
    this.keyboardDidShowHandle = undefined;
    this.keyboardDidHideHandle = undefined;

    if (this.visualViewportResizeHandler && window.visualViewport) {
      window.visualViewport.removeEventListener(
        "resize",
        this.visualViewportResizeHandler,
      );
    }

    this.visualViewportResizeHandler = undefined;
    this.baseViewportHeight = undefined;
  }

  private setFooterHidden(hidden: boolean): void {
    if (this.isFooterHidden === hidden) {
      return;
    }

    this.isFooterHidden = hidden;
    // Forzar detección de cambios inmediata para que los *ngIf del footer
    // se actualicen en el mismo ciclo que la animación del teclado,
    // evitando el estado intermedio que rompe el layout.
    this.cdr.detectChanges();
  }

  public search(event?: Event | string): void {
    console.log(
      "[DEBUG - SEARCH] search() called, event:",
      event,
      new Error().stack,
    );
    if (event !== undefined) {
      this.markFoodSearchStarted();
    }

    if (!this.hasStartedFoodSearch) {
      if (this.currentMode === "products") {
        this.loadRecentProductsForMeal();
      } else if (this.currentMode === "recipes") {
        this.loadRecentRecipesForMeal();
      }
      return;
    }

    this.searchFilterGroup.page = 0;
    if (event !== undefined) {
      this.searchFilterGroup.search =
        typeof event === "string"
          ? event
          : this.utilService.getEventString(event);
      this.searchBarValue = this.searchFilterGroup.search;
    }

    this.products = [];
    this.recipes = [];

    if (this.currentMode === "products" && this.shouldSkipProductsSearch()) {
      this.load = true;
      return;
    }

    if (this.currentMode === "products") {
      this.searchProducts();
    } else {
      this.searchRecipes();
    }
  }

  public setFilterIconsValueBySelection(event: SearchFilterGroup): void {
    this.markFoodSearchStarted();
    Object.assign(this.searchFilterGroup, event);
    this.searchFilterGroup.page = 0;

    this.products = [];
    this.recipes = [];

    if (this.currentMode === "products" && this.shouldSkipProductsSearch()) {
      this.load = true;
      return;
    }

    if (this.currentMode === "products") {
      this.searchProducts();
    } else {
      this.searchRecipes();
    }
  }

  public onModeChange(mode: FilterMode): void {
    // Prevent mode change in ingredient mode - always stay in products
    if (this.ingredientMode && mode !== "products") {
      return;
    }

    // Update segment UI immediately
    this.currentMode = mode;
    this.cdr.detectChanges();

    // Run data work in next tick to avoid delayed visual feedback on mobile
    setTimeout(() => {
      if (this.currentMode !== mode) {
        return;
      }

      this.searchFilterGroup.ownFilter = false;
      this.searchFilterGroup.favFilter = false;
      this.searchFilterGroup.shieldFilter = false;
      this.searchFilterGroup.page = 0;

      this.products = [];
      this.recipes = [];

      // If no search has been performed yet, load recent items first
      // This ensures recent recipes/products appear before any API search
      if (!this.hasStartedFoodSearch) {
        if (mode === "products") {
          this.loadRecentProductsForMeal();
        } else {
          this.loadRecentRecipesForMeal();
        }
        return;
      }

      if (mode === "products" && this.shouldSkipProductsSearch()) {
        this.load = true;
        return;
      }

      if (mode === "products") {
        this.searchProducts();
      } else {
        this.searchRecipes();
      }
    }, 0);
  }

  public setMode(mode: FilterMode): void {
    // Prevent mode change in ingredient mode
    if (this.ingredientMode && mode !== "products") {
      return;
    }

    if (this.currentMode !== mode) {
      this.onModeChange(mode);
    }
  }

  public loadData(event: InfiniteScrollCustomEvent): void {
    if (!this.hasStartedFoodSearch) {
      event.target.complete();
      return;
    }

    if (this.currentMode === "products" && this.shouldSkipProductsSearch()) {
      event.target.complete();
      return;
    }

    this.searchFilterGroup.page++;
    setTimeout(() => {
      event.target.complete();
      if (this.currentMode === "products") {
        this.searchProducts();
      } else {
        this.searchRecipes();
      }
    }, 500);
  }

  public filterByMeasure(eventMeasureFilter: MEASURE_FILTER_TYPES): void {
    this.utilService.setMeasureFilter = eventMeasureFilter;
  }

  public async openScanner(): Promise<void> {
    // 🔧 FIX: Guardar ingredientes antes de navegar (prevención de pérdida)
    if (this.ingredientMode && this.selectedIngredients.length > 0) {
      console.log(
        "[DEBUG] Saving selectedIngredients before scanner:",
        this.selectedIngredients,
      );
      this.navigationService.setTempData(
        "selectedIngredients",
        this.cloneSelectedIngredients(),
      );
    }

    const scannedCode = await this.barCodeScannerService.startScanner();
    if (!scannedCode) return;

    await this.ionicUtilService.showLoading({
      message: this.translate.instant('SEARCH_FOODS.SEARCHING_PRODUCT'),
      spinner: "crescent",
      cssClass: "loading-orange",
    });

    this.productByCodeSub = this.productService
      .getProductByCode(this.user._id, scannedCode)
      .subscribe({
        next: (resProduct) => {
          const isScanned = true;
          const product = resProduct["product"];

          if (product) {
            // 🔧 FIX: Producto encontrado - diferenciar por modo
            const queryParams: any = {
              product: JSON.stringify(product),
              isScanned: isScanned,
              productQuantity: product.servingQuantity,
            };

            const baseState: any = {
              product,
              isScanned,
              productQuantity: product.servingQuantity,
              returnUrl: "/search-foods",
            };

            if (this.ingredientMode) {
              // ✅ MODO INGREDIENTE: No pasar meal/dietDay, SÍ pasar ingredientMode
              console.log("[DEBUG] Scanner → add-product (ingredientMode)");
              baseState.ingredientMode = true;
            } else {
              // MODO NORMAL: Incluir meal y dietDay
              console.log("[DEBUG] Scanner → add-product (normal mode)");
              queryParams.dietDay = JSON.stringify(this.dietDay);
              queryParams.meal = JSON.stringify(this.meal);
              baseState.dietDay = this.dietDay;
              baseState.meal = this.meal;
            }

            this.ionicUtilService.hideLoading();
            this.navigationService.goToAddProduct({
              replaceUrl: false,
              queryParams,
              state: baseState,
            });
          } else {
            // ✅ Producto no encontrado
            this.ionicUtilService.hideLoading();
            this.createProduct(scannedCode);
          }
        },
        error: (_) => {
          this.ionicUtilService.hideLoading();
          const t = this.translate.instant.bind(this.translate);
          this.ionicUtilService.showAlert({
            header: t('COMMON.ERROR'),
            message: t('SEARCH_FOODS.PRODUCT_NOT_FOUND'),
            buttons: [t('COMMON.OK')],
          });
        },
        complete: () => {
          this.productByCodeSub = undefined;
        },
      });
  }

  public onCloseFab(actionFab: ACTIONS_FAB_TYPES): void {
    switch (actionFab) {
      case ACTIONS_FAB_TYPES.createProduct:
        this.createProduct();
        break;
      case ACTIONS_FAB_TYPES.createRecipe:
        void this.createRecipe();
        break;
    }
  }

  public async openCreateActionSheet(): Promise<void> {
    const t = this.translate.instant.bind(this.translate);
    const actionSheetOptions: ActionSheetOptions = {
      cssClass: "create-action-sheet",
      mode: "ios",
      buttons: [
        {
          text: t('ACTIONS_FAB.NEW_PRODUCT'),
          icon: "nutrition-outline",
          data: ACTIONS_FAB_TYPES.createProduct,
          cssClass: "action-sheet-product",
        },
        {
          text: t('ACTIONS_FAB.NEW_RECIPE'),
          icon: "restaurant-outline",
          data: ACTIONS_FAB_TYPES.createRecipe,
          cssClass: "action-sheet-recipe",
        },
      ],
    };

    const result = await this.ionicUtilService.showActionSheet(
      actionSheetOptions,
    );
    if (result.data !== undefined) {
      this.onCloseFab(result.data);
    }
  }

  /**
   * Eliminar un producto del usuario. El producto se identifica por su _id.
   * Solo el creador puede borrar sus propios productos (detectado por product.userId).
   */
  public deleteProduct(productId: string): void {
    const product = this.products?.find((p) => p._id === productId);
    const productName = product ? product.name : this.translate.instant('COMMON.THIS') + " producto";
    const t = this.translate.instant.bind(this.translate);

    const alertOptions: AlertOptions = {
      header: t('SEARCH_FOODS.DELETE_PRODUCT_HEADER'),
      message: t('SEARCH_FOODS.DELETE_PRODUCT_CONFIRM', { name: productName }),
      buttons: [
        {
          text: t('COMMON.CANCEL').toUpperCase(),
          role: "cancel",
        },
        {
          text: t('COMMON.DELETE').toUpperCase(),
          role: "destructive",
          handler: () => {
            this.productService.deleteProduct(productId).subscribe({
              next: () => {
                this.handleProductDeletedLocally(productId);
                this.search();
              },
              error: (err) => {
                console.error("[deleteProduct] Error:", err);
                this.ionicUtilService.showToast({
                  message: t('SEARCH_FOODS.DELETE_PRODUCT_ERROR'),
                  duration: 2000,
                  color: "danger",
                });
              },
            });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private handleProductDeletedLocally(productId: string): void {
    if (!productId) {
      return;
    }

    // Mantener el draft de recipes alineado con el borrado real del Product.
    this.recipeDraftService.removeProductReferences(productId);

    this.products = (this.products || []).filter((p) => p?._id !== productId);

    // Limpiar selectedIngredients (modo ingredientes)
    if (this.selectedIngredients?.length) {
      const filteredIngredients = this.selectedIngredients.filter(
        (ing) => ing?.product?._id !== productId,
      );

      // Actualizar usando el setter para disparar el signal
      this.selectedIngredients = filteredIngredients;

      this.calculateIngredientMacros();
      this.navigationService.setTempData(
        "selectedIngredients",
        this.cloneSelectedIngredients(),
      );
      if (this.currentMode === "products") {
        this.setSelectedIngredientsFirst();
      }
    } else if (this.ingredientMode) {
      this.selectedIngredients = [];
      this.navigationService.setTempData("selectedIngredients", []);
    }

    // Limpiar receta en tempData si existe (para config-recipe)
    const savedRecipe =
      this.navigationService.getTempData<any>("configRecipeDef");
    if (savedRecipe && Array.isArray(savedRecipe.customProducts)) {
      savedRecipe.customProducts = savedRecipe.customProducts.filter(
        (cp: any) => {
          const cpProductId =
            typeof cp?.product === "string" ? cp.product : cp?.product?._id;
          return cpProductId !== productId;
        },
      );
      this.navigationService.setTempData("configRecipeDef", savedRecipe);
    }

    // Limpiar customRecipe en tempData si existe
    const savedInstance = this.navigationService.getTempData<any>(
      "configRecipeInstance",
    );
    if (savedInstance) {
      if (Array.isArray(savedInstance.addedCustomProducts)) {
        savedInstance.addedCustomProducts =
          savedInstance.addedCustomProducts.filter((addCp: any) => {
            const addProductId =
              typeof addCp?.product === "string"
                ? addCp.product
                : addCp?.product?._id;
            return addProductId !== productId;
          });
      }

      const recipe =
        typeof savedInstance.recipe === "object" ? savedInstance.recipe : null;

      if (recipe && Array.isArray(recipe.customProducts)) {
        const removedCustomProductIds = new Set<string>();

        recipe.customProducts = recipe.customProducts.filter((cp: any) => {
          const cpProductId =
            typeof cp?.product === "string" ? cp.product : cp?.product?._id;
          const keep = cpProductId !== productId;
          if (!keep && cp?._id) {
            removedCustomProductIds.add(cp._id.toString());
          }
          return keep;
        });

        // Limpiar overrides relacionados
        if (
          removedCustomProductIds.size > 0 &&
          Array.isArray(savedInstance.modifiedBaseCustomProducts)
        ) {
          savedInstance.modifiedBaseCustomProducts =
            savedInstance.modifiedBaseCustomProducts.filter((override: any) => {
              const overrideId =
                typeof override?.baseCustomProductId === "string"
                  ? override.baseCustomProductId
                  : override?.baseCustomProductId?._id;
              return !removedCustomProductIds.has(
                (overrideId || "").toString(),
              );
            });

          savedInstance.removedBaseCustomProductIds = (
            savedInstance.removedBaseCustomProductIds || []
          ).filter(
            (id: any) => !removedCustomProductIds.has((id?._id || id).toString()),
          );
        }
      }

      this.navigationService.setTempData("configRecipeInstance", savedInstance);
    }

    if (this.user?.archivedProducts?.includes(productId)) {
      this.user.archivedProducts = this.user.archivedProducts.filter(
        (id) => id !== productId,
      );
      this.userService.setLocalUser = this.user;
    }

    const currentDietDay = this.dietDayService.currentDietDay;
    if (!currentDietDay?.meals?.length) {
      return;
    }

    let hasDietDayChanges = false;

    currentDietDay.meals.forEach((mealTemp: Meal) => {
      if (mealTemp?.customProducts?.length) {
        const originalLen = mealTemp.customProducts.length;
        mealTemp.customProducts = mealTemp.customProducts.filter(
          (cp) => cp?.product?._id !== productId,
        );
        if (mealTemp.customProducts.length !== originalLen) {
          hasDietDayChanges = true;
        }
      }

      if (mealTemp?.customRecipes?.length) {
        mealTemp.customRecipes.forEach((customRecipe: any) => {
          if (!customRecipe) return;

          if (Array.isArray(customRecipe.addedCustomProducts)) {
            const originalAdditional = customRecipe.addedCustomProducts.length;
            customRecipe.addedCustomProducts =
              customRecipe.addedCustomProducts.filter((addCp: any) => {
                const addProductId =
                  typeof addCp?.product === "string"
                    ? addCp.product
                    : addCp?.product?._id;
                return addProductId !== productId;
              });
            if (customRecipe.addedCustomProducts.length !== originalAdditional) {
              hasDietDayChanges = true;
            }
          }

          const recipe =
            typeof customRecipe.recipe === "object" ? customRecipe.recipe : null;

          if (recipe && Array.isArray(recipe.customProducts)) {
            const removedCustomProductIds = new Set<string>();
            const originalRecipeCpLen = recipe.customProducts.length;

            recipe.customProducts = recipe.customProducts.filter((cp: any) => {
              const cpProductId =
                typeof cp?.product === "string" ? cp.product : cp?.product?._id;
              const keep = cpProductId !== productId;
              if (!keep && cp?._id) {
                removedCustomProductIds.add(cp._id.toString());
              }
              return keep;
            });

            if (recipe.customProducts.length !== originalRecipeCpLen) {
              hasDietDayChanges = true;
            }

            if (
              removedCustomProductIds.size > 0 &&
              Array.isArray(customRecipe.modifiedBaseCustomProducts)
            ) {
              const originalOverridesLen =
                customRecipe.modifiedBaseCustomProducts.length;
              customRecipe.modifiedBaseCustomProducts =
                customRecipe.modifiedBaseCustomProducts.filter((override: any) => {
                  const overrideId =
                    typeof override?.baseCustomProductId === "string"
                      ? override.baseCustomProductId
                      : override?.baseCustomProductId?._id;
                  return !removedCustomProductIds.has(
                    (overrideId || "").toString(),
                  );
                });

              if (
                customRecipe.modifiedBaseCustomProducts.length !== originalOverridesLen
              ) {
                hasDietDayChanges = true;
              }
            }
          }
        });
      }
    });

    if (hasDietDayChanges) {
      this.dietDay = { ...currentDietDay };
      this.dietDayService.setCurrentDietDay = this.dietDay;
      this.syncMealAndDietDayFromService();
    }
  }

  private handleRecipeDeletedLocally(recipeId: string): void {
    if (!recipeId) {
      return;
    }

    this.recipeDraftService.reset();
    this.recipes = (this.recipes || []).filter((recipe) => recipe?._id !== recipeId);

    if (this.user?.archivedRecipes?.includes(recipeId)) {
      this.user.archivedRecipes = this.user.archivedRecipes.filter(
        (id) => id !== recipeId,
      );
      this.userService.setLocalUser = this.user;
    }

    if (this.meal?.customRecipes?.length) {
      this.meal = {
        ...this.meal,
        customRecipes: this.meal.customRecipes.filter(
          (customRecipe: any) =>
            this.getRecipeIdFromCustomRecipe(customRecipe) !== recipeId,
        ),
      };
    }

    const currentDietDay = this.dietDayService.currentDietDay || this.dietDay;
    if (currentDietDay?.meals?.length) {
      let hasChanges = false;
      const meals = currentDietDay.meals.map((meal) => {
        const currentCustomRecipes = meal.customRecipes || [];
        const nextCustomRecipes = currentCustomRecipes.filter(
          (customRecipe: any) =>
            this.getRecipeIdFromCustomRecipe(customRecipe) !== recipeId,
        );

        if (nextCustomRecipes.length === currentCustomRecipes.length) {
          return meal;
        }

        hasChanges = true;
        return {
          ...meal,
          customRecipes: nextCustomRecipes,
        };
      });

      if (hasChanges) {
        const nextDietDay = {
          ...currentDietDay,
          meals,
        };
        this.dietDay = nextDietDay;
        this.dietDayService.setCurrentDietDay = nextDietDay;
      }
    }

    this.navigationService.clearTempData("configRecipeFormState");
    this.navigationService.clearTempData("configRecipeInstance");
    this.navigationService.clearTempData("configRecipeDef");
    this.navigationService.clearTempData("selectedIngredients");
  }

  private getRecipeIdFromCustomRecipe(customRecipe: any): string | null {
    const recipeRef = customRecipe?.recipe;
    if (!recipeRef) return null;
    if (typeof recipeRef === "string") return recipeRef;
    return recipeRef?._id?.toString?.() || recipeRef?.toString?.() || null;
  }

  // Handler for ingredient mode - adds/removes product to local array without API calls
  public onIngredientToggle(data: {
    product: IProduct;
    quantity: number;
    checked: boolean;
  }): void {
    const { product, quantity, checked } = data;

    console.log("[DEBUG] onIngredientToggle called:", {
      productName: product.name,
      productId: product._id,
      quantity,
      checked,
      currentCount: this.selectedIngredients.length,
    });

    if (checked) {
      // Check if already exists to avoid duplicates
      const alreadyExists = this.selectedIngredients.some(
        (ing) => ing.product?._id === product._id,
      );

      if (!alreadyExists) {
        // Add to selected ingredients
        const newIngredient: CustomProduct = {
          product: product,
          quantity: quantity,
        };
        this.selectedIngredients = [...this.selectedIngredients, newIngredient];
        console.log(
          "[DEBUG] Added ingredient, new count:",
          this.selectedIngredients.length,
        );
      } else {
        console.log("[DEBUG] Ingredient already exists, skipping");
      }
    } else {
      // Remove from selected ingredients
      const index = this.selectedIngredients.findIndex(
        (ing) => ing.product?._id === product._id,
      );
      if (index > -1) {
        this.selectedIngredients = this.selectedIngredients.filter(
          (ing) => ing.product?._id !== product._id,
        );
        console.log(
          "[DEBUG] Removed ingredient, new count:",
          this.selectedIngredients.length,
        );
      }
    }
    this.calculateIngredientMacros();
    this.syncRecipeDraftIngredients();

    console.log(
      "[DEBUG] selectedIngredients names:",
      this.selectedIngredients.map((i) => i.product?.name),
    );
  }

  // Calculate macros for selected ingredients
  private calculateIngredientMacros(): void {
    const nextMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    for (const ing of this.selectedIngredients) {
      const qty = ing.quantity || 0;
      const factor = qty / 100;

      // Pull up macros from product if not present
      const product = (ing.product || {}) as any;
      const kcal = ing.energyKcal100g ?? product.energyKcal100g ?? 0;
      const protein = ing.protein100g ?? product.protein100g ?? 0;
      const carbs = ing.carbohydrates100g ?? product.carbohydrates100g ?? 0;
      const fat = ing.fat100g ?? product.fat100g ?? 0;

      nextMacros.kcal += kcal * factor;
      nextMacros.protein += protein * factor;
      nextMacros.carbs += carbs * factor;
      nextMacros.fat += fat * factor;
    }

    this.ingredientMacros = nextMacros;
  }

  private syncRecipeDraftIngredients(): void {
    if (!this.recipeDraftService.isActive()) return;
    this.recipeDraftService.setIngredients(this.selectedIngredients);
  }

  private applyNewIngredientToSelection(newIngredient: CustomProduct): void {
    if (this.recipeDraftService.isActive()) {
      this.selectedIngredients = this.recipeDraftService.ingredients();
    }

    const clonedIngredient = this.cloneIngredient(newIngredient);
    const newProductId = this.getIngredientProductId(clonedIngredient);
    const existingIndex = newProductId
      ? this.selectedIngredients.findIndex(
          (ingredient) =>
            this.getIngredientProductId(ingredient) === newProductId,
        )
      : -1;

    if (existingIndex >= 0) {
      const nextIngredients = [...this.selectedIngredients];
      nextIngredients[existingIndex] = clonedIngredient;
      this.selectedIngredients = nextIngredients;
    } else {
      this.selectedIngredients = [
        ...this.selectedIngredients,
        clonedIngredient,
      ];
    }

    this.calculateIngredientMacros();
    this.syncRecipeDraftIngredients();
    this.navigationService.setTempData(
      "selectedIngredients",
      this.cloneSelectedIngredients(),
    );

    if (this.currentMode === "products") {
      this.setSelectedIngredientsFirst();
    }
  }

  private getIngredientProductId(ingredient: CustomProduct): string | null {
    const product = ingredient?.product as any;
    return this.getProductId(product);
  }

  private getCustomProductProductId(
    customProduct: CustomProduct | null | undefined,
  ): string | null {
    return this.getProductId(customProduct?.product);
  }

  private getProductId(product: any): string | null {
    if (!product) return null;
    if (typeof product === "string") return product;
    return product?._id?.toString?.() || product?.toString?.() || null;
  }

  private cloneIngredient(ingredient: CustomProduct): CustomProduct {
    return {
      ...ingredient,
      allergens: ingredient?.allergens ? [...ingredient.allergens] : undefined,
      traces: ingredient?.traces ? [...ingredient.traces] : undefined,
      product:
        typeof ingredient?.product === "object" && ingredient.product
          ? { ...ingredient.product }
          : ingredient?.product,
    };
  }

  private cloneRecentCustomProduct(customProduct: any, keepBaseCustomProductId?: boolean): any {
    if (!customProduct) return customProduct;

    const cloned = { ...customProduct };
    delete cloned._id;
    delete cloned.customRecipeId;
    delete cloned.mealId;
    delete cloned.lastUsedAt;

    if (!keepBaseCustomProductId) {
      delete cloned.baseCustomProductId;
    }

    return cloned;
  }

  private cloneSelectedIngredients(): CustomProduct[] {
    return this.selectedIngredients.map((ingredient) =>
      this.cloneIngredient(ingredient),
    );
  }

  // Check if a product is already selected as ingredient
  public isIngredientSelected(product: IProduct): boolean {
    if (!this.ingredientMode) {
      return false;
    }
    const isSelected = this.selectedIngredients.some(
      (ing) => ing.product?._id === product._id,
    );
    // Uncomment for debugging
    // console.log('[DEBUG] isIngredientSelected for', product.name, ':', isSelected);
    return isSelected;
  }

  public getRecentCustomProduct(product: IProduct): CustomProduct | null {
    const productId = this.getProductId(product);
    if (!productId) {
      return null;
    }

    return (
      this.recentCustomProducts.find(
        (customProduct) =>
          this.getCustomProductProductId(customProduct) === productId,
      ) || null
    );
  }

  public isRecentProduct(product: IProduct): boolean {
    return !!this.getRecentCustomProduct(product);
  }

  public getRecentCustomRecipe(recipe: Recipe): any | null {
    const recipeId = recipe?._id;
    if (!recipeId) {
      return null;
    }

    return (
      this.recentCustomRecipes.find((customRecipe) => {
        const recipeRef =
          typeof customRecipe?.recipe === "object"
            ? customRecipe.recipe
            : null;
        return recipeRef?._id === recipeId;
      }) || null
    );
  }

  public isRecentRecipe(recipe: Recipe): boolean {
    return !!this.getRecentCustomRecipe(recipe);
  }

  // Create a virtual meal for ingredient mode to show quantities in product cards
  public getVirtualMealForIngredients(): Meal {
    if (!this.ingredientMode || this.selectedIngredients.length === 0) {
      return null as any;
    }
    return {
      customProducts: this.selectedIngredients,
    } as Meal;
  }

  public deselectedAll(): void {
    const popover: PopoverOptions = {
      component: PopoverActionsComponent,
      componentProps: {
        actionsPopover: [ACTIONS[this.ACTION_TYPES.deselect]],
      },
      event: event,
      mode: "ios",
    };

    this.ionicUtilService.showPopover(popover).then((res) => {
      this.handleAction(res.data);
    });
  }

  private handleAction(actionType: ACTION_TYPE): void {
    switch (actionType) {
      case ACTIONS[this.ACTION_TYPES.deselect]:
        this.handleDeselectAll();
        break;
    }
  }

  private handleDeselectAll(): void {
    if (this.ingredientMode) {
      this.selectedIngredients = [];
      this.ingredientMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
      this.ionicUtilService.showToast({
        message: this.translate.instant('SEARCH_FOODS.INGREDIENTS_DESELECTED'),
        duration: 1500,
        position: "bottom",
      });
      return;
    }

    if (!this.meal || !this.meal._id) {
      console.error("No meal selected");
      return;
    }

    const isRecipeMode = this.currentMode === "recipes";
    const itemTypeKey = isRecipeMode ? 'SEARCH_FOODS.ITEM_TYPE_RECIPES' : 'SEARCH_FOODS.ITEM_TYPE_PRODUCTS';
    const itemTypePluralKey = isRecipeMode ? 'SEARCH_FOODS.ITEM_TYPE_RECIPES_CAP' : 'SEARCH_FOODS.ITEM_TYPE_PRODUCTS_CAP';
    const t = this.translate.instant.bind(this.translate);
    const itemType = t(itemTypeKey);
    const itemTypePlural = t(itemTypePluralKey);

    const alertOptions = {
      header: t('SEARCH_FOODS.DELETE_ITEMS_HEADER', { itemType }),
      message: t('SEARCH_FOODS.DELETE_ITEMS_CONFIRM', { itemType, mealName: this.meal.name }),
      buttons: [
        {
          text: t('COMMON.CANCEL').toUpperCase(),
          role: "cancel",
        },
        {
          text: t('COMMON.DELETE').toUpperCase(),
          cssClass: "danger",
          handler: () => {
            const observable = isRecipeMode
              ? this.mealService.deleteMealRecipes(this.meal._id)
              : this.mealService.deleteMealCustomProducts(this.meal._id);

            observable.subscribe({
              next: (updatedMeal) => {
                this.meal = updatedMeal;

                if (this.dietDay) {
                  const mealIndex = this.dietDay.meals.findIndex(
                    (m) => m._id === this.meal._id,
                  );
                  if (mealIndex !== -1) {
                    this.dietDay.meals[mealIndex] = updatedMeal;
                  }
                  this.dietDayService.setCurrentDietDay = this.dietDay;
                }

                this.utilService.setUnselected = true;
                this.ionicUtilService.showToast({
                  message: t('SEARCH_FOODS.ITEMS_DELETED', { itemType: itemTypePlural, mealName: this.meal.name }),
                  duration: 1000,
                });
              },
              error: (err) => {
                console.error(`Error deleting:`, err);
                this.ionicUtilService.showToast({
                  message: t('SEARCH_FOODS.ITEMS_DELETE_ERROR', { itemType }),
                  duration: 2000,
                  color: "danger",
                });
              },
            });
          },
        },
      ],
    };

    this.ionicUtilService.showAlert(alertOptions);
  }

  private initVariables(): void {
    this.searchFilterGroup = new SearchFilterGroup();
    this.searchFilterGroup.userId =
      this.user?._id || this.userService.getLocalUser?._id;
    // Si proviene de perfil
    this.searchFilterGroup.ownFilter = !!!this.meal;
    this.products = [];

    if (this.meal) {
      this.dietDayService.getCurrentDietDay
        .pipe(take(1))
        .subscribe((res: DietDay) => {
          this.dietDay = res;
          this.meal = res.meals.find(
            (mealTemp) => mealTemp.name === this.meal.name,
          );
        });
    }
  }

  private syncMealAndDietDayFromService(): void {
    const currentDietDay = this.dietDayService.currentDietDay;
    if (!currentDietDay || !this.meal) {
      return;
    }

    this.dietDay = currentDietDay;

    const updatedMeal = this.findMealInDietDay(currentDietDay, this.meal);

    if (updatedMeal) {
      this.meal = { ...updatedMeal };
    }
  }

  private findMealIndexInDietDay(
    dietDay: DietDay | null | undefined,
    referenceMeal: Meal | null | undefined,
  ): number {
    if (!dietDay?.meals?.length || !referenceMeal) {
      return -1;
    }

    if (referenceMeal._id) {
      const indexById = dietDay.meals.findIndex(
        (meal) => meal?._id === referenceMeal._id,
      );

      if (indexById !== -1) {
        return indexById;
      }
    }

    if (referenceMeal.name) {
      return dietDay.meals.findIndex(
        (meal) => meal?.name === referenceMeal.name,
      );
    }

    return -1;
  }

  private findMealInDietDay(
    dietDay: DietDay | null | undefined,
    referenceMeal: Meal | null | undefined,
  ): Meal | undefined {
    const mealIndex = this.findMealIndexInDietDay(dietDay, referenceMeal);

    if (mealIndex === -1 || !dietDay) {
      return undefined;
    }

    return dietDay.meals[mealIndex];
  }

  private markFoodSearchStarted(): void {
    this.hasStartedFoodSearch = true;
    this.recentProductsSub?.unsubscribe();
    this.recentRecipesSub?.unsubscribe();
  }

  private loadRecentProductsForMeal(force = false): void {
    if ((this.hasStartedFoodSearch && !force) || this.currentMode !== "products") {
      return;
    }

    const dietId =
      this.user?.dietInUse || this.userService.getLocalUser?.dietInUse;
    const mealIndex = this.findMealIndexInDietDay(this.dietDay, this.meal);

    if (!dietId || mealIndex === -1) {
      this.recentCustomProducts = [];
      this.products = [];
      this.load = true;

      if (this.ingredientMode) {
        this.setSelectedIngredientsFirst();
      }
      return;
    }

    this.load = false;
    this.recentProductsSub?.unsubscribe();
    this.recentProductsSub = this.dietService
      .getRecentMealProducts(dietId, mealIndex, {
        limit: this.recentProductsLimit,
      })
      .subscribe({
        next: (customProducts) => {
          if (this.hasStartedFoodSearch && !force) {
            return;
          }

          this.recentCustomProducts = customProducts || [];
          this.products = this.getProductsFromCustomProducts(
            this.recentCustomProducts,
          );

          if (this.ingredientMode) {
            this.setSelectedIngredientsFirst();
          } else if (this.meal) {
            this.setCustomProductsFirst();
          }

          this.load = true;
        },
        error: () => {
          if (this.hasStartedFoodSearch && !force) {
            return;
          }

          this.recentCustomProducts = [];
          this.products = [];
          this.load = true;

          if (this.ingredientMode) {
            this.setSelectedIngredientsFirst();
          }
        },
      });
  }

  private loadRecentRecipesForMeal(force = false): void {
    if ((this.hasStartedFoodSearch && !force) || this.currentMode !== "recipes") {
      return;
    }

    const dietId =
      this.user?.dietInUse || this.userService.getLocalUser?.dietInUse;
    const mealIndex = this.findMealIndexInDietDay(this.dietDay, this.meal);

    if (!dietId || mealIndex === -1) {
      this.recentCustomRecipes = [];
      this.recipes = [];
      this.load = true;
      return;
    }

    this.load = false;
    this.recentRecipesSub?.unsubscribe();
    this.recentRecipesSub = this.dietService
      .getRecentMealRecipes(dietId, mealIndex, {
        limit: this.recentRecipesLimit,
      })
      .subscribe({
        next: (customRecipes) => {
          if (this.hasStartedFoodSearch && !force) {
            return;
          }

          this.recentCustomRecipes = customRecipes || [];
          this.recipes = this.getRecipesFromCustomRecipes(
            this.recentCustomRecipes,
          );

          if (this.meal) {
            this.setCustomRecipesFirst();
          }

          this.load = true;
        },
        error: () => {
          if (this.hasStartedFoodSearch && !force) {
            return;
          }

          this.recentCustomRecipes = [];
          this.recipes = [];
          this.load = true;
        },
      });
  }

  private getRecipesFromCustomRecipes(customRecipes: any[]): Recipe[] {
    const recipes: Recipe[] = [];
    const recipeIds = new Set<string>();

    for (const customRecipe of customRecipes || []) {
      const recipe =
        typeof customRecipe?.recipe === "object"
          ? customRecipe.recipe
          : null;
      const recipeId = recipe?._id?.toString();

      if (!recipe || !recipeId || recipeIds.has(recipeId)) {
        continue;
      }

      recipeIds.add(recipeId);
      recipes.push(recipe);
    }

    return recipes;
  }

  private getProductsFromCustomProducts(
    customProducts: CustomProduct[],
  ): IProduct[] {
    const products: IProduct[] = [];
    const productIds = new Set<string>();

    for (const customProduct of customProducts || []) {
      const product =
        typeof customProduct?.product === "object"
          ? customProduct.product
          : null;
      const productId = this.getProductId(product);

      if (!product || !productId || productIds.has(productId)) {
        continue;
      }

      productIds.add(productId);
      products.push(product);
    }

    return products;
  }

  private searchProducts(): void {
    if (this.shouldSkipProductsSearch()) {
      this.load = true;
      this.products = [];
      return;
    }

    const search = (this.searchFilterGroup?.search || "").trim();

    // When search is empty, load recent products and put meal ones first
    if (search.length <= 1 && !this.hasActiveFilters()) {
      this.loadRecentProductsForMeal(true);
      return;
    }

    const page = this.searchFilterGroup.page || 0;
    if (page === 0) {
      this.productsRequestVersion++;
    }
    const requestVersion = this.productsRequestVersion;
    this.searchProductsSub?.unsubscribe();

    console.log(
      "[DEBUG - API] searchProducts() called, page:",
      this.searchFilterGroup.page,
      new Error().stack,
    );
    this.load = false;
    this.searchProductsSub = this.mealService
      .searchAllWithFilters(this.searchFilterGroup)
      .subscribe((resFoods: IProduct[]) => {
        if (requestVersion !== this.productsRequestVersion) {
          return;
        }

        this.products = this.mergeProducts(
          this.products,
          resFoods as IProduct[],
        );

        // Priority: ingredient mode takes precedence over meal mode
        if (this.ingredientMode) {
          this.setSelectedIngredientsFirst();
        } else if (this.meal) {
          this.setCustomProductsFirst();
        }

        this.load = true;
      });
  }

  private mergeProducts(current: IProduct[], incoming: IProduct[]): IProduct[] {
    if (!Array.isArray(incoming) || incoming.length === 0) {
      return [...(current || [])];
    }

    const merged = [...(current || [])];
    const existingIds = new Set(
      merged
        .map((product) => product?._id)
        .filter((id): id is string => typeof id === "string" && id.length > 0),
    );

    for (const product of incoming) {
      const id = product?._id;
      if (typeof id === "string" && id.length > 0) {
        if (existingIds.has(id)) {
          continue;
        }
        existingIds.add(id);
      }
      merged.push(product);
    }

    return merged;
  }

  private hasActiveFilters(): boolean {
    return !!this.searchFilterGroup?.ownFilter
      || !!this.searchFilterGroup?.favFilter
      || !!this.searchFilterGroup?.shieldFilter
      || !!this.searchFilterGroup?.defaultOnly;
  }

  private shouldSkipProductsSearch(): boolean {
    if (this.hasActiveFilters()) {
      return false;
    }
    const search = (this.searchFilterGroup?.search || "").trim();
    if (search.length > 1) {
      return false;
    }
    // Empty search: only skip if there are NO products in meal / selected ingredients
    if (this.ingredientMode) {
      return !(this.selectedIngredients?.length > 0);
    }
    return !(this.meal?.customProducts?.length > 0);
  }

  public isSearchTooShortForProducts(): boolean {
    return this.shouldSkipProductsSearch();
  }

  // No depende de nada específico de productos (solo del término de búsqueda
  // compartido), así que también cubre el estado vacío de recetas.
  public shouldShowProductsEmptyState(): boolean {
    return this.hasStartedFoodSearch && !this.isSearchTooShortForProducts();
  }

  public createProductFromEmptyState(): void {
    this.createProduct();
  }

  public createRecipeFromEmptyState(): void {
    void this.createRecipe();
  }

  /**
   * 🔧 Poner recetas de la meal primero (igual que setCustomProductsFirst)
   * Extrae recetas de meal.customRecipes, las filtra y las pone al inicio
   */
  private setCustomRecipesFirst(): void {
    if (!this.meal?.customRecipes) {
      return;
    }

    // Obtención de recipes de customRecipes provenientes de meal
    const recipesOnMeal = this.meal.customRecipes
      .map((customRecipe) => {
        return typeof customRecipe.recipe === "object" ? customRecipe.recipe : null;
      })
      .filter((recipeTemp) => {
        if (recipeTemp) {
          const idRecipe: string = recipeTemp._id;
          const verified: boolean = !!recipeTemp?.verified;
          const fav: boolean = this.user?.archivedRecipes?.includes(idRecipe);

          // Aplicar filtros activos
          if (this.searchFilterGroup.shieldFilter && !verified) return false;
          if (this.searchFilterGroup.favFilter && !fav) return false;
          if (this.searchFilterGroup.ownFilter && verified) return false; // Own = no verified

          return true;
        }
        return false;
      })
      // Filtro local para los customRecipes
      .filter((recipeTemp) => {
        if (!this.searchFilterGroup.search) return true;
        const nombreRecipe = recipeTemp.name.toLowerCase();
        const terminoBusqueda = this.searchFilterGroup.search.toLowerCase();
        return nombreRecipe.includes(terminoBusqueda);
      });

    console.log(
      "[setCustomRecipesFirst] Recipes on meal after filters:",
      recipesOnMeal.length,
      recipesOnMeal.map((r) => r.name),
    );

    // Sacamos estas recipes de la lista general de recipes (evitar duplicados)
    this.recipes = this.recipes.filter(
      (recipeTemp) =>
        !recipesOnMeal.find(
          (recipeOnMealTemp) => recipeTemp._id === recipeOnMealTemp._id,
        ),
    );

    // Poner las recipes de la meal al inicio
    this.recipes = [...recipesOnMeal, ...this.recipes];

    console.log(
      "[setCustomRecipesFirst] ✅ Final recipes count:",
      this.recipes.length,
      "First 3:",
      this.recipes.slice(0, 3).map((r) => r.name),
    );
  }

  private searchRecipes(): void {
    const search = (this.searchFilterGroup?.search || "").trim();

    // When search is empty, load recent recipes and put meal ones first
    if (search.length <= 1 && !this.hasActiveFilters()) {
      this.loadRecentRecipesForMeal(true);
      return;
    }

    const page = this.searchFilterGroup.page || 0;
    if (page === 0) {
      this.recipesRequestVersion++;
    }
    const requestVersion = this.recipesRequestVersion;
    this.searchRecipesSub?.unsubscribe();

    console.log(
      "[DEBUG - API] searchRecipes() called, page:",
      this.searchFilterGroup.page,
      new Error().stack,
    );
    this.load = false;
    const requestPage = this.searchFilterGroup.page || 0;
    const request$ = this.recipeApiService.searchRecipes(search, requestPage, 10, {
      own: !!this.searchFilterGroup.ownFilter,
      fav: !!this.searchFilterGroup.favFilter,
      verified: !!this.searchFilterGroup.shieldFilter,
    });

    this.searchRecipesSub = request$.subscribe({
      next: (recipes: Recipe[]) => {
        if (requestVersion !== this.recipesRequestVersion) {
          return;
        }

        let filtered = recipes;

        // 🔧 FILTRAR DUPLICADOS: Evitar recetas que ya están en la lista
        const existingIds = new Set(this.recipes.map((r) => r._id));
        filtered = filtered.filter((r) => !existingIds.has(r._id));

        console.log(
          "[DEBUG - searchRecipes] Recipes from API:",
          recipes.length,
          "After filters:",
          filtered.length,
          "Existing:",
          this.recipes.length,
        );

        this.recipes = this.recipes.concat(filtered);

        // 🔧 Poner recetas de la meal primero (igual que setCustomProductsFirst)
        if (this.meal) {
          this.setCustomRecipesFirst();
        }

        console.log(
          "[DEBUG - searchRecipes] Total recipes now:",
          this.recipes.length,
        );
        this.load = true;
      },
      error: () => {
        if (requestVersion !== this.recipesRequestVersion) {
          return;
        }
        this.load = true;
      },
    });
  }

  // Recipe event handlers
  public onRecipeToggle(recipe: Recipe): void {
    const existingInstance = this.findCustomRecipeForRecipe(recipe);

    if (existingInstance) {
      // If already in meal, edit it
      this.editRecipeFromMeal(recipe, existingInstance);
    } else {
      // If not in meal, add it with recent data if available
      const recentCustomRecipe = this.getRecentCustomRecipe(recipe);
      this.addRecipeToMeal(recipe, recentCustomRecipe);
    }
  }

  public onRecipeQuickAdd(recipe: Recipe): void {
    if (this.isRecipeLoading(recipe)) return;

    const existingInstance = this.findCustomRecipeForRecipe(recipe);

    if (existingInstance) {
      this.removeRecipeFromMeal(existingInstance);
      return;
    }

    const recentCustomRecipe = this.getRecentCustomRecipe(recipe);
    this.quickAddRecipeToMeal(recipe, recentCustomRecipe);
  }

  public onRecipeRemove(recipe: Recipe): void {
    const existingInstance = this.findCustomRecipeForRecipe(recipe);

    if (existingInstance) {
      this.removeRecipeFromMeal(existingInstance);
    }
  }

  private quickAddRecipeToMeal(recipe: Recipe, recentCustomRecipe?: any): void {
    if (!this.meal || !recipe?._id) {
      return;
    }

    this.setRecipeLoading(recipe, true);

    let quantity = 100;
    let quantityCooked = null;
    let addedCustomProducts: any[] = [];
    let modifiedBaseCustomProducts: any[] = [];
    let removedBaseCustomProductIds: any[] = [];

    if (recentCustomRecipe) {
      quantity = recentCustomRecipe.quantity ?? 100;
      quantityCooked = recentCustomRecipe.quantityCooked ?? null;

      addedCustomProducts = (recentCustomRecipe.addedCustomProducts || []).map(
        (cp: any) => this.cloneRecentCustomProduct(cp),
      );

      modifiedBaseCustomProducts = (
        recentCustomRecipe.modifiedBaseCustomProducts || []
      ).map((cp: any) => this.cloneRecentCustomProduct(cp, true));

      removedBaseCustomProductIds =
        recentCustomRecipe.removedBaseCustomProductIds || [];
    }

    const composePayload: any = {
      recipeId: recipe._id,
      customRecipe: {
        quantity,
        quantityCooked,
        modifiedBaseCustomProducts,
        removedBaseCustomProductIds,
        addedCustomProducts,
      },
      context: this.buildRecipeComposeContext(),
    };

    this.recipeApiService.compose(composePayload).subscribe({
      next: (result) => {
        if (result?.dietDay) {
          this.dietDay = result.dietDay;
          this.dietDayService.setCurrentDietDay = result.dietDay;
          this.syncMealAndDietDayFromService();
        } else if (result?.meal) {
          const previousMeal = this.meal;
          this.meal = result.meal;
          if (this.dietDay) {
            const mealIndex = this.findMealIndexInDietDay(
              this.dietDay,
              previousMeal,
            );
            if (mealIndex !== -1) {
              this.dietDay.meals[mealIndex] = result.meal;
              this.dietDayService.setCurrentDietDay = { ...this.dietDay };
            }
          }
        } else {
          this.syncMealAndDietDayFromService();
        }

        this.ionicUtilService.showToast({
          message: this.translate.instant('SEARCH_FOODS.RECIPE_ADDED'),
          duration: 1500,
          color: "success",
        });
      },
      error: (error) => {
        this.setRecipeLoading(recipe, false);
        console.error("[quickAddRecipeToMeal] Error:", error);
        this.ionicUtilService.showToast({
          message: this.translate.instant('SEARCH_FOODS.RECIPE_ADD_ERROR'),
          duration: 2000,
          color: "danger",
        });
      },
      complete: () => {
        this.setRecipeLoading(recipe, false);
      },
    });
  }

  public isRecipeLoading(recipe: Recipe): boolean {
    return !!recipe?._id && this.loadingRecipeIds.has(recipe._id);
  }

  private setRecipeLoading(recipe: Recipe, loading: boolean): void {
    if (!recipe?._id) return;

    const nextLoadingRecipeIds = new Set(this.loadingRecipeIds);
    if (loading) {
      nextLoadingRecipeIds.add(recipe._id);
    } else {
      nextLoadingRecipeIds.delete(recipe._id);
    }
    this.loadingRecipeIds = nextLoadingRecipeIds;
  }

  private removeRecipeFromMeal(instance: any): void {
    if (!this.meal?._id || !instance._id) return;

    const t = this.translate.instant.bind(this.translate);
    this.ionicUtilService.showAlert({
      header: t('SEARCH_FOODS.DELETE_RECIPE_CONFIRM_HEADER'),
      message: t('SEARCH_FOODS.DELETE_RECIPE_CONFIRM_MESSAGE'),
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: "cancel",
        },
        {
          text: t('COMMON.DELETE'),
          role: "confirm",
          handler: () => {
            this.mealService
              .deleteMealCustomRecipe(this.meal!._id!, instance._id)
              .subscribe({
                next: (updatedMeal) => {
                  this.meal = updatedMeal;
                  if (this.dietDay) {
                    const mealIndex = this.dietDay.meals.findIndex(
                      (m) => m._id === this.meal!._id,
                    );
                    if (mealIndex !== -1) {
                      this.dietDay.meals[mealIndex] = updatedMeal;
                      this.dietDayService.setCurrentDietDay = this.dietDay;
                    }
                  }
                  this.ionicUtilService.showToast({
                    message: t('SEARCH_FOODS.RECIPE_DELETED_FROM_MEAL'),
                    duration: 2000,
                    color: "success",
                  });
                },
                error: (err) => {
                  console.error("Error deleting recipe instance:", err);
                  this.ionicUtilService.showToast({
                    message: t('SEARCH_FOODS.RECIPE_DELETE_ERROR'),
                    duration: 2000,
                    color: "danger",
                  });
                },
              });
          },
        },
      ],
    });
  }

  private addRecipeToMeal(recipe: Recipe, recentCustomRecipe?: any): void {
    // Save current search state to restore when returning
    this.navigationService.setTempData("searchFoodsState", {
      searchFilterGroup: { ...this.searchFilterGroup },
      currentMode: this.currentMode,
      searchTerm: this.searchFilterGroup.search,
      returnUrl: this.returnUrl,
      meal: this.meal,
      dietDay: this.dietDay,
      ingredientMode: this.ingredientMode,
      hasStartedFoodSearch: this.hasStartedFoodSearch,
    });

    const navState: any = {
      mode: "add",
      recipe: recipe,
      meal: this.meal,
      dietDay: this.dietDay,
      returnUrl: "/search-foods",
      selectedDate: window.history.state?.selectedDate || this.dietDay?.date,
    };

    // Pass recent custom recipe data so config-recipe pre-fills quantity and modifications
    if (recentCustomRecipe) {
      navState.customRecipe = recentCustomRecipe;
    }

    // Navigate to add recipe flow
    this.navigationService.goToConfigRecipe({
      state: navState,
    });
  }

  private buildRecipeComposeContext(): any | null {
    if (!this.meal) return null;

    if (this.dietDay?._id && this.meal?._id) {
      return { mealId: this.meal._id };
    }

    if (this.dietDay) {
      const indexMeal = this.findMealIndexInDietDay(this.dietDay, this.meal);

      if (indexMeal !== -1) {
        return {
          dietInUseId:
            this.user?.dietInUse || this.userService.getLocalUser?.dietInUse,
          indexMeal,
          currentDate: this.dietDay.date,
        };
      }
    }

    return null;
  }

  private toPositiveNumber(value: any): number | null {
    if (value === null || value === undefined || value === "") {
      return null;
    }
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return parsed;
  }

  public onRecipeEdit(recipe: Recipe): void {
    const existingInstance = this.findCustomRecipeForRecipe(recipe);

    if (existingInstance) {
      this.editRecipeFromMeal(recipe, existingInstance);
    }
  }

  private editRecipeFromMeal(recipe: Recipe, customRecipe: any): void {
    // Save current search state to restore when returning
    this.navigationService.setTempData("searchFoodsState", {
      searchFilterGroup: { ...this.searchFilterGroup },
      currentMode: this.currentMode,
      searchTerm: this.searchFilterGroup.search,
      returnUrl: this.returnUrl,
      meal: this.meal,
      dietDay: this.dietDay,
      ingredientMode: this.ingredientMode,
      hasStartedFoodSearch: this.hasStartedFoodSearch,
    });

    this.navigationService.goToConfigRecipe({
      state: {
        mode: "edit",
        recipe: recipe,
        customRecipe: customRecipe,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: "/search-foods",
        selectedDate: window.history.state?.selectedDate || this.dietDay?.date,
      },
    });
  }

  private findCustomRecipeForRecipe(recipe: Recipe): any | null {
    return (
      this.meal?.customRecipes?.find((customRecipe: any) => {
        const recipeRef =
          typeof customRecipe.recipe === "object" ? customRecipe.recipe : null;
        return recipeRef?._id === recipe._id;
      }) || null
    );
  }

  public onRecipeFavoriteToggle(recipe: Recipe): void {
    const t = this.translate.instant.bind(this.translate);
    this.recipeApiService.toggleArchived(recipe._id).subscribe({
      next: (res) => {
        if (res.isArchived) {
          if (!this.user.archivedRecipes) this.user.archivedRecipes = [];
          this.user.archivedRecipes.push(recipe._id);
        } else {
          const idx = this.user.archivedRecipes?.indexOf(recipe._id);
          if (idx > -1) this.user.archivedRecipes.splice(idx, 1);
        }
        this.userService.setLocalUser = this.user;

        this.ionicUtilService.showToast({
          message: res.isArchived
            ? t('SEARCH_FOODS.RECIPE_ADDED_FAV')
            : t('SEARCH_FOODS.RECIPE_REMOVED_FAV'),
          duration: 1500,
        });
      },
      error: () => {
        this.ionicUtilService.showToast({
          message: t('SEARCH_FOODS.FAV_UPDATE_ERROR'),
          duration: 1500,
        });
      },
    });
  }

  private setCustomProductsFirst(): void {
    // Show products already in meal at the top, excluding them from API results
    const searchTerm = this.searchFilterGroup.search?.toLowerCase() || "";
    const hasActiveSearch = searchTerm.length > 0;

    const productsOnMeal = this.meal.customProducts
      .map((customProductTemp) => customProductTemp.product)
      .filter((productTemp) => {
        if (!productTemp) return false;

        if (this.searchFilterGroup.ownFilter) {
          return productTemp.userId === this.user?._id;
        }

        // Apply active filters regardless of search
        const idProduct: string = productTemp._id;
        const verified: boolean = !!productTemp?.verified;
        const fav: boolean =
          this.user.archivedProducts?.includes(idProduct) || false;

        if (this.searchFilterGroup.favFilter && !fav) return false;
        if (this.searchFilterGroup.shieldFilter && !verified) return false;

        // When there's NO active search, show ALL products that pass filters
        if (!hasActiveSearch) {
          return true;
        }

        // When searching, filter by search term
        const matchesSearch = productTemp.name
          .toLowerCase()
          .includes(searchTerm);

        return matchesSearch;
      });

    // Always remove products in meal from API results to avoid duplicates (use Set for O(1) lookup)
    const productsOnMealIds = new Set(
      this.meal.customProducts
        .map((customProductTemp) => customProductTemp.product?._id)
        .filter((id) => !!id),
    );

    this.products = this.products.filter(
      (productTemp) => !productsOnMealIds.has(productTemp._id),
    );

    this.products = [...productsOnMeal, ...this.products];
  }

  private setSelectedIngredientsFirst(): void {
    // Show selected ingredients at the top, excluding them from API results
    const searchTerm = this.searchFilterGroup.search?.toLowerCase() || "";
    const hasActiveSearch = searchTerm.length > 0;

    const selectedProducts = this.selectedIngredients
      .map((customProductTemp) => customProductTemp.product)
      .filter((productTemp) => {
        if (!productTemp) return false;

        if (this.searchFilterGroup.ownFilter) {
          return productTemp.userId === this.user?._id;
        }

        // Apply active filters regardless of search
        const idProduct: string = productTemp._id;
        const verified: boolean = !!productTemp?.verified;
        const fav: boolean =
          this.user.archivedProducts?.includes(idProduct) || false;

        if (this.searchFilterGroup.favFilter && !fav) return false;
        if (this.searchFilterGroup.shieldFilter && !verified) return false;

        // When there's NO active search, show ALL selected ingredients that pass filters
        if (!hasActiveSearch) {
          return true;
        }

        // When searching, filter selected ingredients by search term
        const matchesSearch = productTemp.name
          .toLowerCase()
          .includes(searchTerm);

        return matchesSearch;
      });

    // Always remove selected products from API results to avoid duplicates (use Set for O(1) lookup)
    const selectedProductIds = new Set(
      this.selectedIngredients
        .map((customProductTemp) => customProductTemp.product?._id)
        .filter((id) => !!id),
    );

    this.products = this.products.filter(
      (productTemp) => !selectedProductIds.has(productTemp._id),
    );

    // Put selected products first
    this.products = [...selectedProducts, ...this.products];
  }

  private createProduct(scannedCode?: string): void {
    const queryParams: any = {
      user: JSON.stringify(this.user),
      codeBar: scannedCode || undefined,
      returnUrl: "/search-foods",
    };

    const baseState: any = {
      user: this.user,
      codeBar: scannedCode,
      returnUrl: "/search-foods",
    };

    if (this.ingredientMode) {
      // ✅ MODO INGREDIENTE: No pasar meal/dietDay, SÍ pasar ingredientMode
      console.log("[DEBUG] createProduct → create-product (ingredientMode)");
      baseState.ingredientMode = true;
    } else {
      // MODO NORMAL: Incluir meal y dietDay
      console.log("[DEBUG] createProduct → create-product (normal mode)");
      queryParams.meal = this.meal ? JSON.stringify(this.meal) : undefined;
      queryParams.dietDay = this.meal
        ? JSON.stringify(this.dietDay)
        : undefined;
      baseState.meal = this.meal;
      baseState.dietDay = this.dietDay;
      baseState.selectedDate =
        window.history.state?.selectedDate || this.dietDay?.date;
    }

    // Limpiar undefined para evitar '?meal=undefined'
    Object.keys(queryParams).forEach(
      (k) => queryParams[k] === undefined && delete queryParams[k],
    );

    this.navigationService.goToCreateProduct({
      queryParams,
      state: baseState,
    });
  }

  private async createRecipe(): Promise<void> {
    if (await this.billingService.isFreshLimitReached("recipes")) {
      await this.ionicUtilService.showPremiumLimitAlert({
        message: this.translate.instant('SEARCH_FOODS.PREMIUM_LIMIT_RECIPES'),
        onUpgrade: () => this.navigationService.goToPremium(),
      });
      return;
    }

    // Save current search state to restore when returning
    this.navigationService.setTempData("searchFoodsState", {
      searchFilterGroup: { ...this.searchFilterGroup },
      currentMode: this.currentMode,
      searchTerm: this.searchFilterGroup.search,
      returnUrl: this.returnUrl,
      meal: this.meal,
      dietDay: this.dietDay,
      ingredientMode: this.ingredientMode,
      hasStartedFoodSearch: this.hasStartedFoodSearch,
    });

    this.navigationService.goToConfigRecipe({
      state: {
        mode: "create",
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: "/search-foods",
        selectedDate: window.history.state?.selectedDate || this.dietDay?.date,
      },
    });
  }
  private initInputsFromRoute(): void {
    const state: any = window.history.state || {};
    if (!this.user && (state.user || state.userId)) {
      try {
        this.user = state.user ?? ({ _id: state.userId } as any);
      } catch (_) {}
    }
    if (!this.meal && (state.meal || state.mealName)) {
      try {
        this.meal = state.meal ?? ({ name: state.mealName } as any);
      } catch (_) {}
    }
    if (state.returnUrl) this.returnUrl = state.returnUrl;

    // Ingredient mode for recipe creation
    if (state.ingredientMode) {
      this.ingredientMode = true;
      this.selectedIngredients = state.existingIngredients || [];
    }

    this.activatedRoute.queryParams.subscribe((params) => {
      if (!this.user) {
        if (params["user"]) {
          try {
            this.user = JSON.parse(params["user"]);
          } catch (_) {}
        } else if (params["userId"]) {
          this.user = { _id: params["userId"] } as any;
        }
      }
      if (!this.meal) {
        if (params["meal"]) {
          try {
            this.meal = JSON.parse(params["meal"]);
          } catch (_) {}
        } else if (params["mealName"]) {
          this.meal = { name: params["mealName"] } as any;
        }
      }
      // No procesar codeBar desde query/state en esta página
      if (params["returnUrl"]) this.returnUrl = params["returnUrl"];
    });
  }

  public async close(result?: any): Promise<void> {
    console.log("SearchFoods: close called", {
      returnUrl: this.returnUrl,
      meal: !!this.meal,
      mealName: this.meal?.name,
      ingredientMode: this.ingredientMode,
      selectedIngredientsCount: this.selectedIngredients.length,
    });

    // In ingredient mode, pass back selected ingredients using temp storage
    if (this.ingredientMode && this.returnUrl) {
      this.syncRecipeDraftIngredients();
      console.log(
        "SearchFoods: storing ingredients in temp storage:",
        this.selectedIngredients.length,
      );
      console.log("SearchFoods: Detailed ingredient list:");
      this.selectedIngredients.forEach((ing, idx) => {
        console.log(
          `  [${idx}] ${ing.product?.name} - ${ing.quantity}g - ID: ${ing.product?._id}`,
        );
      });

      const ingredientsCopy = this.cloneSelectedIngredients();

      // Store in temp storage (more reliable than navigation state)
      this.navigationService.setTempData(
        "selectedIngredients",
        ingredientsCopy,
      );

      // Clear ingredient mode state from tempData when returning
      this.navigationService.clearTempData("ingredientModeState");

      // Pass back selected date to diets
      const navState = window.history.state;
      this.navigationService.backTo(this.returnUrl, {
        state: {
          selectedIngredients: ingredientsCopy,
          meal: this.meal,
          dietDay: this.dietDay,
          selectedDate: navState?.selectedDate || this.dietDay?.date,
        },
      });
      return;
    }

    // Pass back selected date in results too
    const finalNavState = window.history.state;
    const finalResult = {
      ...result,
      selectedDate: finalNavState?.selectedDate || this.dietDay?.date,
    };

    // Handle return URL navigation
    if (this.returnUrl && this.returnUrl !== "/search-foods") {
      console.log("SearchFoods: navigating to returnUrl:", this.returnUrl);
      this.navigationService.backTo(this.returnUrl, {
        state: {
          result: finalResult,
          selectedDate: finalResult.selectedDate,
        },
      });
    } else {
      // Default navigation based on context
      if (this.meal) {
        console.log("SearchFoods: returning to diets (has meal)");
        this.navigationService.backTo(["/tabs/diets"], {
          state: {
            selectedDate: finalResult.selectedDate,
          },
        });
      } else {
        console.log("SearchFoods: back with no animation");
        this.navigationService.backNoAnim();
      }
    }
  }

  /**
   * Create a new recipe from selected ingredients in ingredient mode
   */
  public createRecipeFromIngredients(): void {
    if (this.selectedIngredients.length < 2) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('SEARCH_FOODS.MIN_INGREDIENTS'),
        duration: 2000,
        color: "warning",
      });
      return;
    }

    console.log(
      "[DEBUG] Creating recipe from ingredients:",
      this.selectedIngredients.length,
    );

    // Navigate to config-recipe in create mode with selected ingredients
    this.navigationService.goToConfigRecipe({
      state: {
        mode: "create",
        meal: this.meal,
        dietDay: this.dietDay,
        existingIngredients: this.selectedIngredients,
        selectedDate: window.history.state?.selectedDate || this.dietDay?.date,
      },
    });
  }

  /**
   * Create a new product from scratch in ingredient mode
   */
  public createProductForIngredient(): void {
    console.log("[DEBUG] Creating new product for ingredient mode");

    // Save current ingredients state
    this.syncRecipeDraftIngredients();
    this.navigationService.setTempData(
      "selectedIngredients",
      this.cloneSelectedIngredients(),
    );

    this.navigationService.goToCreateProduct({
      state: {
        ingredientMode: true,
        returnUrl: "/search-foods",
        meal: this.meal,
        dietDay: this.dietDay,
      },
    });
  }

  private cancelProductLookup(): void {
    try {
      this.productByCodeSub?.unsubscribe();
      this.productByCodeSub = undefined;
    } catch {}
    this.ionicUtilService.hideLoading();
  }
}
