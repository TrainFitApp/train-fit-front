import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginListenerHandle } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import {
  ActionSheetOptions,
  AlertOptions,
  InfiniteScrollCustomEvent,
  IonRouterOutlet,
  Platform,
  PopoverOptions,
  ToastOptions,
} from '@ionic/angular';
import { forkJoin, Subscription, take } from 'rxjs';
import {
  CustomProduct,
  CUSTOM_PRODUCT_VALUES,
} from 'src/app/core/models/customProduct';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { IProduct } from 'src/app/core/models/product';
import { Recipe } from 'src/app/core/models/recipe';
import { User } from 'src/app/core/models/user';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { RecipeApiService } from 'src/app/core/services/recipe/recipe-api.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { BarCodeScannerService } from 'src/app/core/services/util/bar-code-scanner.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { ACTIONS_FAB_TYPES } from 'src/app/shared/constants/actions-fab';
import { MEASURE_FILTER_TYPES } from 'src/app/shared/constants/measureFilter';
import { SearchFilterGroup } from 'src/app/shared/models/filterGroup';
import { FilterMode } from 'src/app/shared/components/filter-icons/filter-icons.component';
import { Theme, THEMES } from 'src/app/shared/models/theme';
import { PopoverActionsComponent } from '../../../../../../shared/components/popover-actions/popover-actions.component';
import {
  ACTION_TYPE,
  ACTION_TYPES,
  ACTIONS,
} from '../../../../../../shared/constants/actions';

@Component({
  selector: 'app-products',
  templateUrl: './search-foods.page.html',
  styleUrls: ['./search-foods.page.scss'],
})
export class SearchFoodsPage implements OnInit, OnDestroy {
  public meal: Meal;
  public user: User;

  public dietDay: DietDay;

  public searchFilterGroup: SearchFilterGroup;

  private readonly _products: WritableSignal<IProduct[]> = signal<IProduct[]>(
    []
  );
  public recipes: Recipe[] = [];
  public idUser: string;

  public load: boolean;

  public isFooterHidden: boolean = false;

  public searchBarValue: string = '';

  private _currentMode: FilterMode = 'products';
  public get currentMode(): FilterMode {
    return this._currentMode;
  }
  public set currentMode(value: FilterMode) {
    console.log(
      '[DEBUG - MODE] currentMode changing from',
      this._currentMode,
      'to',
      value,
      new Error().stack
    );
    this._currentMode = value;
  }

  public get recipesOrdered(): Recipe[] {
    if (!this.recipes || !this.meal?.customRecipeInstances) {
      return this.recipes || [];
    }

    // Get IDs of recipes already in meal
    const recipesInMeal = new Set<string>();
    this.meal.customRecipeInstances.forEach((instance) => {
      const dataRecipe =
        typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
      if (dataRecipe) {
        const recipe =
          typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
        if (recipe?._id) {
          recipesInMeal.add(recipe._id);
        }
      }
    });

    // Split recipes into two groups
    const inMeal: Recipe[] = [];
    const notInMeal: Recipe[] = [];

    this.recipes.forEach((recipe) => {
      if (recipesInMeal.has(recipe._id!)) {
        inMeal.push(recipe);
      } else {
        notInMeal.push(recipe);
      }
    });

    // Return recipes in meal first, then the rest
    return [...inMeal, ...notInMeal];
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
      | undefined
  ) {
    this._ingredientMacros.set(
      value ?? { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }

  public CUSTOM_PRODUCT_VALUES = CUSTOM_PRODUCT_VALUES;

  public ACTION_TYPES = ACTION_TYPES;

  private returnUrl?: string;
  private hasInitialized = false;
  private productByCodeSub?: Subscription;
  private backButton$?: Subscription;
  private keyboardWillShowHandle?: PluginListenerHandle;
  private keyboardWillHideHandle?: PluginListenerHandle;
  private keyboardDidShowHandle?: PluginListenerHandle;
  private keyboardDidHideHandle?: PluginListenerHandle;
  private visualViewportResizeHandler?: () => void;
  private baseViewportHeight?: number;

  constructor(
    private dietDayService: DietDayService,
    private utilService: UtilService,
    private ionicUtilService: IonicUtilService,
    private mealService: MealService,
    private productService: ProductService,
    private recipeApiService: RecipeApiService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private barCodeScannerService: BarCodeScannerService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private cdr: ChangeDetectorRef
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
      '[DEBUG - LIFECYCLE] ionViewWillEnter called, currentMode:',
      this.currentMode,
      'hasInitialized:',
      this.hasInitialized
    );
    console.log(
      '[DEBUG - LIFECYCLE] selectedIngredients at START:',
      this.selectedIngredients.length
    );
    console.log(
      '[DEBUG - LIFECYCLE] ingredientMode at START:',
      this.ingredientMode
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
            (m) => m._id === stateMeal._id
          );
        }

        if (!updatedMeal && stateMeal?.name) {
          updatedMeal = currentDietDay.meals.find(
            (m) => m.name === stateMeal.name
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
        this.navigationService.getTempData<any>('searchFoodsState');
      if (savedState) {
        console.log('[DEBUG] Restoring complete search state:', savedState);
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

        // Get UPDATED meal and dietDay from service (they may have been updated in config-recipe)
        const currentDietDay = this.dietDayService.currentDietDay;
        if (currentDietDay) {
          this.dietDay = currentDietDay;
          // Find the updated meal in the diet day
          // Try by _id first, if not found (new dietDay case), try by name
          let updatedMeal;
          if (savedState.meal?._id) {
            updatedMeal = currentDietDay.meals.find(
              (m) => m._id === savedState.meal._id
            );
          }

          // If not found by ID (new dietDay scenario), search by name
          if (!updatedMeal && savedState.meal?.name) {
            updatedMeal = currentDietDay.meals.find(
              (m) => m.name === savedState.meal.name
            );
          }

          if (updatedMeal) {
            // Create a new reference to force Angular change detection
            this.meal = { ...updatedMeal };
            console.log(
              '[DEBUG] Updated meal from dietDay service:',
              this.meal
            );
            console.log(
              '[DEBUG] Meal customRecipeInstances:',
              this.meal.customRecipeInstances
            );
            console.log(
              '[DEBUG] Number of recipe instances:',
              this.meal.customRecipeInstances?.length
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
          '[DEBUG] Setting currentMode from state:',
          state.currentMode
        );
        this.currentMode = state.currentMode;
      }

      // Clear the flag and temp data
      this.navigationService.clearStateKeys(['returningFromConfigRecipe']);
      this.navigationService.clearTempData('searchFoodsState');
    }

    // Ingredient mode for recipe creation - CRITICAL: must be read here too
    // Check if we have newIngredient first to avoid unnecessary operations
    const hasNewIngredient =
      this.navigationService.getTempData<CustomProduct>('newIngredient');

    if (state.ingredientMode) {
      this.ingredientMode = true;
      // Force mode to products when in ingredient mode
      this.currentMode = 'products';

      // Store ingredient mode state in tempData for back button handler
      // This ensures the state persists even if ionViewWillEnter is called multiple times
      if (state.returnUrl) {
        this.returnUrl = state.returnUrl;
        this.navigationService.setTempData('ingredientModeState', {
          active: true,
          returnUrl: state.returnUrl,
        });
      }

      // 🔧 FIX: PRIMERO restaurar de tempData si existe (volviendo de create-product)
      const tempIngredients = this.navigationService.getTempData<
        CustomProduct[]
      >('selectedIngredients');
      if (tempIngredients && tempIngredients.length > 0) {
        console.log(
          '[DEBUG] Restoring selectedIngredients from tempData:',
          tempIngredients.length
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
          '[DEBUG] Loading existingIngredients from state:',
          state.existingIngredients.length
        );
        this.selectedIngredients = state.existingIngredients;
      }

      console.log(
        '[DEBUG - STATE] Final selectedIngredients.length:',
        this.selectedIngredients.length
      );

      console.log(
        '[DEBUG] Entering ingredient mode with ingredients:',
        this.selectedIngredients.length
      );
      console.log(
        '[DEBUG] Existing ingredients:',
        this.selectedIngredients.map((i) => i.product?.name)
      );
      this.calculateIngredientMacros();

      // Force initial search when entering ingredient mode
      // BUT: Skip search if we're returning from add-product with a new ingredient
      if (!returningFromConfigRecipe && !hasNewIngredient) {
        console.log('[DEBUG] Ingredient mode: performing initial search');
        this.hasInitialized = true; // Mark as initialized to prevent double search
        this.search();
      } else if (hasNewIngredient) {
        console.log(
          '[DEBUG] Skipping search - processing newIngredient instead'
        );
      }
    } else if (!returningFromConfigRecipe) {
      // 🔧 FIX: Check if we have tempData (returning from create-product in ingredient mode)
      // If we have tempData with ingredients or newIngredient, we're still in ingredient mode
      const tempIngredients = this.navigationService.getTempData<
        CustomProduct[]
      >('selectedIngredients');
      const hasNewIngredient =
        this.navigationService.getTempData<CustomProduct>('newIngredient');

      if (!tempIngredients && !hasNewIngredient) {
        // Only reset ingredient mode if NOT returning from config-recipe AND no tempData
        // This means we're truly entering normal mode (not coming from create-product)
        console.log('[DEBUG] Resetting ingredient mode - entering normal mode');
        this.ingredientMode = false;
        this.selectedIngredients = [];
        this.ingredientMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

        // Limpiar tempData de ingredientes al salir del modo ingrediente
        this.navigationService.clearTempData('selectedIngredients');
        this.navigationService.clearTempData('ingredientModeState');
      } else {
        console.log(
          '[DEBUG] Has tempData - staying/activating ingredient mode'
        );
        // We're returning from create-product, stay in (or activate) ingredient mode
        this.ingredientMode = true;
        this.currentMode = 'products';

        // Restore ingredients from tempData
        if (tempIngredients && tempIngredients.length > 0) {
          console.log(
            '[DEBUG] Restoring selectedIngredients from tempData (fallback):',
            tempIngredients.length
          );
          this.selectedIngredients = tempIngredients;
        }

        this.calculateIngredientMacros();
      }
    } else if (!this.ingredientMode && this.selectedIngredients.length > 0) {
      console.log(
        '[DEBUG] ingredientMode=false but selectedIngredients not empty, clearing'
      );
      this.selectedIngredients = [];
      this.ingredientMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
      this.navigationService.clearTempData('selectedIngredients');
      this.navigationService.clearTempData('ingredientModeState');
    }

    // Check if returning from add-product with a new ingredient
    // Process AFTER setting ingredientMode to ensure proper context
    const newIngredient =
      this.navigationService.getTempData<CustomProduct>('newIngredient');
    console.log('[DEBUG] Checking for newIngredient...');
    console.log('[DEBUG] newIngredient:', newIngredient);
    console.log('[DEBUG] this.ingredientMode:', this.ingredientMode);
    console.log('[DEBUG] state.ingredientMode:', state.ingredientMode);

    if (newIngredient && this.ingredientMode) {
      console.log(
        '[DEBUG] Received new ingredient from add-product:',
        newIngredient
      );
      console.log(
        '[DEBUG] Current selectedIngredients before processing:',
        this.selectedIngredients.length
      );
      console.log('[DEBUG] Full selectedIngredients array:');
      this.selectedIngredients.forEach((ing, idx) => {
        console.log(`  [${idx}]:`, {
          name: ing.product?.name,
          productId: ing.product?._id,
          quantity: ing.quantity,
        });
      });
      console.log('[DEBUG] newIngredient details:', {
        name: newIngredient.product?.name,
        productId: newIngredient.product?._id,
        quantity: newIngredient.quantity,
      });

      // Get the product ID to compare
      const newProductId = newIngredient.product?._id;
      console.log('[DEBUG] Looking for product with ID:', newProductId);

      // Check if already exists by product ID
      const existingIngredient = this.selectedIngredients.find(
        (ing) => ing.product?._id && ing.product._id === newProductId
      );

      if (existingIngredient) {
        // Update existing ingredient in place
        console.log(
          '[DEBUG] Ingredient already exists, updating:',
          existingIngredient.product?.name
        );

        // Update properties while keeping the reference
        existingIngredient.quantity = newIngredient.quantity;
        existingIngredient.energyKcal100g = newIngredient.energyKcal100g;
        existingIngredient.protein100g = newIngredient.protein100g;
        existingIngredient.carbohydrates100g = newIngredient.carbohydrates100g;
        existingIngredient.fat100g = newIngredient.fat100g;

        this.calculateIngredientMacros();
        console.log('[DEBUG] Updated ingredient successfully');
      } else {
        // Add new ingredient
        console.log(
          '[DEBUG] Adding NEW ingredient:',
          newIngredient.product?.name
        );
        this.selectedIngredients = [...this.selectedIngredients, newIngredient];
        this.calculateIngredientMacros();
        console.log(
          '[DEBUG] Added new ingredient, total:',
          this.selectedIngredients.length
        );
      }

      // Final state after add/update
      console.log(
        '[DEBUG] FINAL selectedIngredients count:',
        this.selectedIngredients.length
      );
      console.log('[DEBUG] FINAL selectedIngredients:');
      this.selectedIngredients.forEach((ing, idx) => {
        console.log(`  [${idx}]:`, {
          name: ing.product?.name,
          productId: ing.product?._id,
          quantity: ing.quantity,
        });
      });

      // Update the filtered products list to show selected at top
      if (this.currentMode === 'products') {
        console.log('[DEBUG] Calling setSelectedIngredientsFirst()');
        this.setSelectedIngredientsFirst();
      }

      // Clear the temp data
      this.navigationService.clearTempData('newIngredient');
    }

    // Manejo de resultados al volver desde AddProduct por ruta (sin modales)
    const navStateResult: any = this.navigationService.getState() || {};
    const navStateTemp: any =
      this.navigationService.getTempData('searchFoodsResult') || {};
    this.navigationService.clearTempData('searchFoodsResult');
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
      this.currentMode = 'products';
      this.syncMealAndDietDayFromService();
      // Force search to refresh products list from API after creation
      shouldSearch = true;
    } else if (result?.createdViaCreateProduct) {
      // Switch to products segment when creating a custom product
      this.currentMode = 'products';
      this.syncMealAndDietDayFromService();
      // Force search to refresh products list from API after creation
      shouldSearch = true;
    } else if (result?.refresh) {
      // Force refresh requested
      this.syncMealAndDietDayFromService();
      shouldSearch = true;
      if (result?.switchSegmentToOwn) {
        this.currentMode = 'products';
        if (this.searchFilterGroup) {
          this.searchFilterGroup.ownFilter = true;
          this.searchFilterGroup.shieldFilter = false;
          this.searchFilterGroup.favFilter = false;
        }
      }
    } else if (!returningFromConfigRecipe) {
      // Only do initial search on first entry
      if (!this.hasInitialized) {
        console.log(
          '[DEBUG - INIT] About to call search(), currentMode:',
          this.currentMode
        );
        this.hasInitialized = true;
        shouldSearch = true;
      }
    } else {
      console.log(
        '[DEBUG] Returning from config-recipe, keeping current products:',
        this.products.length
      );

      const activeListIsEmpty =
        this.currentMode === 'recipes'
          ? !this.recipes || this.recipes.length === 0
          : !this.products || this.products.length === 0;

      // If active segment list is empty, execute search
      if (activeListIsEmpty) {
        console.log(
          '[DEBUG] Active segment list is empty, executing search anyway',
          this.currentMode
        );
        shouldSearch = true;
      } else {
        // Ensure load is true to hide skeletons
        this.load = true;
      }
    }

    // Execute search only once if needed
    if (shouldSearch) {
      this.search();
    }

    // 🍎 iOS: Inhabilitar gesto de ir hacia atrás si estamos en modo ingrediente
    // Esto evita que el swipe-back nos lleve a 'diets' en lugar de volver a 'config-recipe'
    if (this.platform.is('ios') && this.ingredientMode) {
      console.log('[iOS] Disabling swipe-back gesture in ingredient mode');
      this.routerOutlet.swipeGesture = false;
    }

    // 🔧 FIX: Procesar posible producto actualizado desde navegación
    if (state.updatedProduct) {
      console.log(
        '[DEBUG] Processing updatedProduct from state:',
        state.updatedProduct.name
      );
      const idx = this.products.findIndex(
        (p) => p._id === state.updatedProduct._id
      );
      if (idx !== -1) {
        this.products = this.products.map((p, index) =>
          index === idx ? { ...state.updatedProduct } : p
        );
        console.log('[DEBUG] Updated product in local list at index:', idx);
      }

      const hasDietDayChanges =
        this.dietDayService.syncUpdatedProductInCurrentDietDay(
          state.updatedProduct
        );
      if (hasDietDayChanges) {
        this.syncMealAndDietDayFromService();
      }
    }
  }

  public ngOnDestroy(): void {
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
          'ingredientModeState'
        );
        if (
          this.ingredientMode ||
          (tempIngredientModeState && tempIngredientModeState.active)
        ) {
          console.log(
            '[BACK BUTTON] Ingredient mode detected, using returnUrl'
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
      }
    );
  }

  public async ionViewWillLeave(): Promise<void> {
    await this.removeKeyboardListeners();
    if (this.ingredientMode && this.returnUrl) {
      const ingredientsCopy = this.selectedIngredients.map((ing) => ({
        product: ing.product,
        quantity: ing.quantity,
        energyKcal100g: ing.energyKcal100g,
        protein100g: ing.protein100g,
        carbohydrates100g: ing.carbohydrates100g,
        fat100g: ing.fat100g,
      }));

      this.navigationService.setTempData(
        'selectedIngredients',
        ingredientsCopy
      );
    }
    this.cancelProductLookup();

    // 🍎 Re-habilitar gesto de ir hacia atrás al salir
    if (this.platform.is('ios')) {
      this.routerOutlet.swipeGesture = true;
    }
  }

  private async initializeKeyboardListeners(): Promise<void> {
    await this.removeKeyboardListeners();

    const handleShow = () => this.setFooterHidden(true);
    const handleHide = () => this.setFooterHidden(false);

    try {
      this.keyboardWillShowHandle = await Keyboard.addListener(
        'keyboardWillShow',
        handleShow
      );
      this.keyboardWillHideHandle = await Keyboard.addListener(
        'keyboardWillHide',
        handleHide
      );
      this.keyboardDidShowHandle = await Keyboard.addListener(
        'keyboardDidShow',
        handleShow
      );
      this.keyboardDidHideHandle = await Keyboard.addListener(
        'keyboardDidHide',
        handleHide
      );
    } catch (error) {
      console.error('[Keyboard] Failed to register listeners', error);
    }

    if (this.platform.is('ios') && window.visualViewport) {
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
        'resize',
        this.visualViewportResizeHandler
      );
    }
  }

  private async removeKeyboardListeners(): Promise<void> {
    try {
      await this.keyboardWillShowHandle?.remove();
      await this.keyboardWillHideHandle?.remove();
      await this.keyboardDidShowHandle?.remove();
      await this.keyboardDidHideHandle?.remove();
    } catch (error) {
      console.error('[Keyboard] Failed to remove listeners', error);
    }

    this.keyboardWillShowHandle = undefined;
    this.keyboardWillHideHandle = undefined;
    this.keyboardDidShowHandle = undefined;
    this.keyboardDidHideHandle = undefined;

    if (this.visualViewportResizeHandler && window.visualViewport) {
      window.visualViewport.removeEventListener(
        'resize',
        this.visualViewportResizeHandler
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
      '[DEBUG - SEARCH] search() called, event:',
      event,
      new Error().stack
    );
    this.searchFilterGroup.page = 0;
    if (event)
      this.searchFilterGroup.search =
        typeof event === 'string'
          ? event
          : this.utilService.getEventString(event);

    this.products = [];
    this.recipes = [];

    if (this.currentMode === 'products') {
      this.searchProducts();
    } else {
      this.searchRecipes();
    }
  }

  public setFilterIconsValueBySelection(event: SearchFilterGroup): void {
    Object.assign(this.searchFilterGroup, event);
    this.searchFilterGroup.page = 0;
    this.products = [];
    this.recipes = [];

    if (this.currentMode === 'products') {
      this.searchProducts();
    } else {
      this.searchRecipes();
    }
  }

  public onModeChange(mode: FilterMode): void {
    // Prevent mode change in ingredient mode - always stay in products
    if (this.ingredientMode && mode !== 'products') {
      return;
    }

    this.currentMode = mode;
    this.searchFilterGroup.ownFilter = false;
    this.searchFilterGroup.favFilter = false;
    this.searchFilterGroup.shieldFilter = false;
    this.searchFilterGroup.page = 0;
    this.products = [];
    this.recipes = [];

    if (mode === 'products') {
      this.searchProducts();
    } else {
      this.searchRecipes();
    }
  }

  public setMode(mode: FilterMode): void {
    // Prevent mode change in ingredient mode
    if (this.ingredientMode && mode !== 'products') {
      return;
    }

    if (this.currentMode !== mode) {
      this.onModeChange(mode);
    }
  }

  public loadData(event: InfiniteScrollCustomEvent): void {
    this.searchFilterGroup.page++;
    setTimeout(() => {
      event.target.complete();
      if (this.currentMode === 'products') {
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
        '[DEBUG] Saving selectedIngredients before scanner:',
        this.selectedIngredients
      );
      this.navigationService.setTempData(
        'selectedIngredients',
        this.selectedIngredients
      );
    }

    const scannedCode = await this.barCodeScannerService.startScanner();
    if (!scannedCode) return;

    await this.ionicUtilService.showLoading({
      message: 'Buscando producto...',
      spinner: 'crescent',
      cssClass: 'loading-orange',
    });

    this.productByCodeSub = this.productService
      .getProductByCode(this.user._id, scannedCode)
      .subscribe({
        next: (resProduct) => {
          const isScanned = true;
          const product = resProduct['product'];

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
              returnUrl: '/search-foods',
            };

            if (this.ingredientMode) {
              // ✅ MODO INGREDIENTE: No pasar meal/dietDay, SÍ pasar ingredientMode
              console.log('[DEBUG] Scanner → add-product (ingredientMode)');
              baseState.ingredientMode = true;
            } else {
              // MODO NORMAL: Incluir meal y dietDay
              console.log('[DEBUG] Scanner → add-product (normal mode)');
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
          const alertOptions = {
            header: 'Error',
            message: 'No se pudo buscar el producto',
            buttons: ['OK'],
          };
          this.ionicUtilService.showAlert(alertOptions);
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
        this.createRecipe();
        break;
    }
  }

  public async openCreateActionSheet(): Promise<void> {
    const actionSheetOptions: ActionSheetOptions = {
      cssClass: 'create-action-sheet',
      mode: 'ios',
      buttons: [
        {
          text: 'Nuevo Producto',
          icon: 'nutrition-outline',
          data: ACTIONS_FAB_TYPES.createProduct,
          cssClass: 'action-sheet-product',
        },
        {
          text: 'Nueva Receta',
          icon: 'restaurant-outline',
          data: ACTIONS_FAB_TYPES.createRecipe,
          cssClass: 'action-sheet-recipe',
        },
      ],
    };

    const result = await this.ionicUtilService.showActionSheet(
      actionSheetOptions
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
    const productName = product ? product.name : 'este producto';

    const alertOptions: AlertOptions = {
      header: 'Eliminar producto',
      message: `¿Estás seguro de que quieres eliminar ${productName}? Este producto se eliminará permanentemente de todas tus comidas y recetas.`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          handler: () => {
            this.productService.deleteProduct(productId).subscribe({
              next: () => {
                this.handleProductDeletedLocally(productId);
                // Refrescar la lista de productos
                this.search();
              },
              error: (err) => {
                console.error('[deleteProduct] Error:', err);
                this.ionicUtilService.showToast({
                  message: 'Error al eliminar el producto',
                  duration: 2000,
                  color: 'danger',
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

    this.products = (this.products || []).filter((p) => p?._id !== productId);

    // Limpiar selectedIngredients (modo ingredientes)
    if (this.selectedIngredients?.length) {
      const filteredIngredients = this.selectedIngredients.filter(
        (ing) => ing?.product?._id !== productId
      );

      // Actualizar usando el setter para disparar el signal
      this.selectedIngredients = filteredIngredients;

      this.calculateIngredientMacros();
      this.navigationService.setTempData(
        'selectedIngredients',
        this.selectedIngredients
      );
      if (this.currentMode === 'products') {
        this.setSelectedIngredientsFirst();
      }
    } else if (this.ingredientMode) {
      this.selectedIngredients = [];
      this.navigationService.setTempData('selectedIngredients', []);
    }

    // Limpiar receta en tempData si existe (para config-recipe)
    const savedRecipe =
      this.navigationService.getTempData<any>('configRecipeDef');
    if (savedRecipe && Array.isArray(savedRecipe.customProducts)) {
      savedRecipe.customProducts = savedRecipe.customProducts.filter(
        (cp: any) => {
          const cpProductId =
            typeof cp?.product === 'string' ? cp.product : cp?.product?._id;
          return cpProductId !== productId;
        }
      );
      this.navigationService.setTempData('configRecipeDef', savedRecipe);
    }

    // Limpiar customRecipeInstance en tempData si existe
    const savedInstance = this.navigationService.getTempData<any>(
      'configRecipeInstance'
    );
    if (savedInstance) {
      // Limpiar additionalCustomProducts
      if (Array.isArray(savedInstance.additionalCustomProducts)) {
        savedInstance.additionalCustomProducts =
          savedInstance.additionalCustomProducts.filter((addCp: any) => {
            const addProductId =
              typeof addCp?.product === 'string'
                ? addCp.product
                : addCp?.product?._id;
            return addProductId !== productId;
          });
      }

      // Limpiar de la receta base dentro de dataRecipe
      const dataRecipe =
        typeof savedInstance.dataRecipe === 'object'
          ? savedInstance.dataRecipe
          : null;
      const recipe =
        dataRecipe && typeof dataRecipe.recipe === 'object'
          ? dataRecipe.recipe
          : null;

      if (recipe && Array.isArray(recipe.customProducts)) {
        const removedCustomProductIds = new Set<string>();

        recipe.customProducts = recipe.customProducts.filter((cp: any) => {
          const cpProductId =
            typeof cp?.product === 'string' ? cp.product : cp?.product?._id;
          const keep = cpProductId !== productId;
          if (!keep && cp?._id) {
            removedCustomProductIds.add(cp._id.toString());
          }
          return keep;
        });

        // Limpiar overrides relacionados
        if (
          removedCustomProductIds.size > 0 &&
          Array.isArray(savedInstance.customProductsOverrides)
        ) {
          savedInstance.customProductsOverrides =
            savedInstance.customProductsOverrides.filter((override: any) => {
              const overrideId =
                typeof override?.customProductId === 'string'
                  ? override.customProductId
                  : override?.customProductId?._id;
              return !removedCustomProductIds.has(
                (overrideId || '').toString()
              );
            });
        }
      }

      this.navigationService.setTempData('configRecipeInstance', savedInstance);
    }

    if (this.user?.archivedProducts?.includes(productId)) {
      this.user.archivedProducts = this.user.archivedProducts.filter(
        (id) => id !== productId
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
          (cp) => cp?.product?._id !== productId
        );
        if (mealTemp.customProducts.length !== originalLen) {
          hasDietDayChanges = true;
        }
      }

      if (mealTemp?.customRecipeInstances?.length) {
        mealTemp.customRecipeInstances.forEach((instance: any) => {
          if (!instance) return;

          if (Array.isArray(instance.additionalCustomProducts)) {
            const originalAdditional = instance.additionalCustomProducts.length;
            instance.additionalCustomProducts =
              instance.additionalCustomProducts.filter((addCp: any) => {
                const addProductId =
                  typeof addCp?.product === 'string'
                    ? addCp.product
                    : addCp?.product?._id;
                return addProductId !== productId;
              });
            if (
              instance.additionalCustomProducts.length !== originalAdditional
            ) {
              hasDietDayChanges = true;
            }
          }

          const dataRecipe =
            typeof instance.dataRecipe === 'object'
              ? instance.dataRecipe
              : null;
          const recipe =
            dataRecipe && typeof dataRecipe.recipe === 'object'
              ? dataRecipe.recipe
              : null;

          if (recipe && Array.isArray(recipe.customProducts)) {
            const removedCustomProductIds = new Set<string>();
            const originalRecipeCpLen = recipe.customProducts.length;

            recipe.customProducts = recipe.customProducts.filter((cp: any) => {
              const cpProductId =
                typeof cp?.product === 'string' ? cp.product : cp?.product?._id;
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
              Array.isArray(instance.customProductsOverrides)
            ) {
              const originalOverridesLen =
                instance.customProductsOverrides.length;
              instance.customProductsOverrides =
                instance.customProductsOverrides.filter((override: any) => {
                  const overrideId =
                    typeof override?.customProductId === 'string'
                      ? override.customProductId
                      : override?.customProductId?._id;
                  return !removedCustomProductIds.has(
                    (overrideId || '').toString()
                  );
                });

              if (
                instance.customProductsOverrides.length !== originalOverridesLen
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

  // Handler for ingredient mode - adds/removes product to local array without API calls
  public onIngredientToggle(data: {
    product: IProduct;
    quantity: number;
    checked: boolean;
  }): void {
    const { product, quantity, checked } = data;

    console.log('[DEBUG] onIngredientToggle called:', {
      productName: product.name,
      productId: product._id,
      quantity,
      checked,
      currentCount: this.selectedIngredients.length,
    });

    if (checked) {
      // Check if already exists to avoid duplicates
      const alreadyExists = this.selectedIngredients.some(
        (ing) => ing.product?._id === product._id
      );

      if (!alreadyExists) {
        // Add to selected ingredients
        const newIngredient: CustomProduct = {
          product: product,
          quantity: quantity,
          energyKcal100g: product.energyKcal100g,
          protein100g: product.protein100g,
          carbohydrates100g: product.carbohydrates100g,
          fat100g: product.fat100g,
        };
        this.selectedIngredients = [...this.selectedIngredients, newIngredient];
        console.log(
          '[DEBUG] Added ingredient, new count:',
          this.selectedIngredients.length
        );
      } else {
        console.log('[DEBUG] Ingredient already exists, skipping');
      }
    } else {
      // Remove from selected ingredients
      const index = this.selectedIngredients.findIndex(
        (ing) => ing.product?._id === product._id
      );
      if (index > -1) {
        this.selectedIngredients = this.selectedIngredients.filter(
          (ing) => ing.product?._id !== product._id
        );
        console.log(
          '[DEBUG] Removed ingredient, new count:',
          this.selectedIngredients.length
        );
      }
    }
    this.calculateIngredientMacros();

    // 🔧 REORDENAR: Poner seleccionados arriba inmediatamente
    this.setSelectedIngredientsFirst();

    console.log(
      '[DEBUG] selectedIngredients names:',
      this.selectedIngredients.map((i) => i.product?.name)
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

  // Check if a product is already selected as ingredient
  public isIngredientSelected(product: IProduct): boolean {
    if (!this.ingredientMode) {
      return false;
    }
    const isSelected = this.selectedIngredients.some(
      (ing) => ing.product?._id === product._id
    );
    // Uncomment for debugging
    // console.log('[DEBUG] isIngredientSelected for', product.name, ':', isSelected);
    return isSelected;
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
      mode: 'ios',
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
    // In ingredient mode, just clear the selected ingredients array
    if (this.ingredientMode) {
      this.selectedIngredients = [];
      this.ingredientMacros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
      this.ionicUtilService.showToast({
        message: 'Ingredientes deseleccionados',
        duration: 1500,
        position: 'bottom',
      });
      return;
    }

    // Verify meal exists
    if (!this.meal || !this.meal._id) {
      console.error('No meal selected');
      return;
    }

    // Determine what to delete based on current mode (segment)
    const isRecipeMode = this.currentMode === 'recipes';
    const itemType = isRecipeMode ? 'recetas' : 'productos';
    const itemTypePlural = isRecipeMode ? 'Recetas' : 'Productos';

    const alertOptions = {
      header: `Eliminar ${itemType}`,
      message:
        `¿Estás seguro de eliminar todas las ${itemType} de ` +
        this.meal.name +
        '?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'ELIMINAR',
          cssClass: 'danger',
          handler: () => {
            // Call the appropriate service method based on current segment
            const observable = isRecipeMode
              ? this.mealService.deleteMealRecipeInstances(this.meal._id)
              : this.mealService.deleteMealCustomProducts(this.meal._id);

            observable.subscribe({
              next: (updatedMeal) => {
                // Update local meal with the response from backend
                this.meal = updatedMeal;

                // Update the meal in the dietDay
                if (this.dietDay) {
                  const mealIndex = this.dietDay.meals.findIndex(
                    (m) => m._id === this.meal._id
                  );
                  if (mealIndex !== -1) {
                    this.dietDay.meals[mealIndex] = updatedMeal;
                  }

                  // Update dietDay in service to recalculate macros
                  this.dietDayService.setCurrentDietDay = this.dietDay;
                }

                this.utilService.setUnselected = true;
                this.ionicUtilService.showToast({
                  message: `${itemTypePlural} eliminadas de ${this.meal.name}`,
                  duration: 1000,
                });
              },
              error: (err) => {
                console.error(`Error deleting ${itemType}:`, err);
                this.ionicUtilService.showToast({
                  message: `Error al eliminar ${itemType}`,
                  duration: 2000,
                  color: 'danger',
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
            (mealTemp) => mealTemp.name === this.meal.name
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

    let updatedMeal: Meal | undefined;
    if (this.meal._id) {
      updatedMeal = currentDietDay.meals.find((m) => m._id === this.meal._id);
    }

    if (!updatedMeal && this.meal.name) {
      updatedMeal = currentDietDay.meals.find((m) => m.name === this.meal.name);
    }

    if (updatedMeal) {
      this.meal = { ...updatedMeal };
    }
  }

  private searchProducts(): void {
    console.log(
      '[DEBUG - API] searchProducts() called, page:',
      this.searchFilterGroup.page,
      new Error().stack
    );
    this.load = false;
    this.mealService
      .searchAllWithFilters(this.searchFilterGroup)
      .subscribe((resFoods: IProduct[]) => {
        this.products = this.products.concat(resFoods as IProduct[]);

        // Priority: ingredient mode takes precedence over meal mode
        if (this.ingredientMode) {
          this.setSelectedIngredientsFirst();
        } else if (this.meal) {
          this.setCustomProductsFirst();
        }

        this.load = true;
      });
  }

  /**
   * 🔧 Poner recetas de la meal primero (igual que setCustomProductsFirst)
   * Extrae recetas de meal.customRecipeInstances, las filtra y las pone al inicio
   */
  private setCustomRecipesFirst(): void {
    if (!this.meal?.customRecipeInstances) {
      return;
    }

    // Obtención de recipes de customRecipeInstances provenientes de meal
    const recipesOnMeal = this.meal.customRecipeInstances
      .map((customRecipeInstance) => {
        const dataRecipe =
          typeof customRecipeInstance.dataRecipe === 'object'
            ? customRecipeInstance.dataRecipe
            : null;
        if (dataRecipe) {
          return typeof dataRecipe.recipe === 'object'
            ? dataRecipe.recipe
            : null;
        }
        return null;
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
      '[setCustomRecipesFirst] Recipes on meal after filters:',
      recipesOnMeal.length,
      recipesOnMeal.map((r) => r.name)
    );

    // Sacamos estas recipes de la lista general de recipes (evitar duplicados)
    this.recipes = this.recipes.filter(
      (recipeTemp) =>
        !recipesOnMeal.find(
          (recipeOnMealTemp) => recipeTemp._id === recipeOnMealTemp._id
        )
    );

    // Poner las recipes de la meal al inicio
    this.recipes = [...recipesOnMeal, ...this.recipes];

    console.log(
      '[setCustomRecipesFirst] ✅ Final recipes count:',
      this.recipes.length,
      'First 3:',
      this.recipes.slice(0, 3).map((r) => r.name)
    );
  }

  private searchRecipes(): void {
    console.log(
      '[DEBUG - API] searchRecipes() called, page:',
      this.searchFilterGroup.page,
      new Error().stack
    );
    this.load = false;
    const search = this.searchFilterGroup.search || '';
    const page = this.searchFilterGroup.page || 0;

    let request$;

    if (this.searchFilterGroup.ownFilter) {
      // User's own recipes
      request$ = this.recipeApiService.getUserRecipes(page);
    } else if (
      this.searchFilterGroup.favFilter &&
      this.searchFilterGroup.shieldFilter
    ) {
      // Favorites + Verified (start from favorites, filter verified locally)
      request$ = this.recipeApiService.getArchivedRecipes(search, page);
    } else if (this.searchFilterGroup.shieldFilter) {
      // Verified recipes
      request$ = this.recipeApiService.getVerifiedRecipes(search, page);
    } else if (this.searchFilterGroup.favFilter) {
      // Favorite recipes
      request$ = this.recipeApiService.getArchivedRecipes(search, page);
    } else {
      // All recipes (verified + user's own)
      request$ = this.recipeApiService.searchRecipes(search, page);
    }

    request$.subscribe({
      next: (recipes: Recipe[]) => {
        // Apply local filters if needed
        let filtered = recipes;

        // If own filter + fav, filter favorites from own
        if (
          this.searchFilterGroup.ownFilter &&
          this.searchFilterGroup.favFilter
        ) {
          filtered = recipes.filter((r) =>
            this.user?.archivedRecipes?.includes(r._id)
          );
        }

        // If fav + verified, filter verified locally
        if (
          this.searchFilterGroup.favFilter &&
          this.searchFilterGroup.shieldFilter
        ) {
          filtered = filtered.filter((r) => !!r.verified);
        }

        // Local search filter for own recipes
        if (this.searchFilterGroup.ownFilter && search) {
          filtered = filtered.filter((r) =>
            r.name.toLowerCase().includes(search.toLowerCase())
          );
        }

        // 🔧 FILTRAR DUPLICADOS: Evitar recetas que ya están en la lista
        const existingIds = new Set(this.recipes.map((r) => r._id));
        filtered = filtered.filter((r) => !existingIds.has(r._id));

        console.log(
          '[DEBUG - searchRecipes] Recipes from API:',
          recipes.length,
          'After filters:',
          filtered.length,
          'Existing:',
          this.recipes.length
        );

        this.recipes = this.recipes.concat(filtered);

        // 🔧 Poner recetas de la meal primero (igual que setCustomProductsFirst)
        if (this.meal) {
          this.setCustomRecipesFirst();
        }

        console.log(
          '[DEBUG - searchRecipes] Total recipes now:',
          this.recipes.length
        );
        this.load = true;
      },
      error: () => {
        this.load = true;
      },
    });
  }

  // Recipe event handlers
  public onRecipeToggle(recipe: Recipe): void {
    // Check if recipe is already in meal
    const existingInstance = this.meal?.customRecipeInstances?.find(
      (instance) => {
        const dataRecipe =
          typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
        if (!dataRecipe) return false;
        const instanceRecipe =
          typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
        if (!instanceRecipe) return false;
        return instanceRecipe._id === recipe._id;
      }
    );

    if (existingInstance) {
      // If already in meal, edit it
      this.editRecipeFromMeal(recipe, existingInstance);
    } else {
      // If not in meal, add it
      this.addRecipeToMeal(recipe);
    }
  }

  public onRecipeQuickAdd(recipe: Recipe): void {
    // If already in meal, checkbox acts as remove via recipe-card
    // This is just a safety fallback.
    const existingInstance = this.meal?.customRecipeInstances?.find(
      (instance) => {
        const dataRecipe =
          typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
        if (!dataRecipe) return false;
        const instanceRecipe =
          typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
        if (!instanceRecipe) return false;
        return instanceRecipe._id === recipe._id;
      }
    );

    if (existingInstance) {
      this.removeRecipeFromMeal(existingInstance);
      return;
    }

    this.quickAddRecipeToMeal(recipe);
  }

  public onRecipeRemove(recipe: Recipe): void {
    // Find the instance for this recipe
    const existingInstance = this.meal?.customRecipeInstances?.find(
      (instance) => {
        const dataRecipe =
          typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
        if (!dataRecipe) return false;
        const instanceRecipe =
          typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
        if (!instanceRecipe) return false;
        return instanceRecipe._id === recipe._id;
      }
    );

    if (existingInstance) {
      this.removeRecipeFromMeal(existingInstance);
    }
  }

  private quickAddRecipeToMeal(recipe: Recipe): void {
    if (!this.meal || !recipe?._id) {
      return;
    }

    const fallbackCooked = this.getRecipeRawWeight(recipe);
    const quantityCooked =
      this.toPositiveNumber(recipe.quantityCooked) ?? fallbackCooked;
    const quantity =
      this.toPositiveNumber(recipe.quantity) ??
      100;

    const composePayload: any = {
      recipeId: recipe._id,
      dataRecipe: {
        quantityCooked,
      },
      instance: {
        quantity,
        customProductsOverrides: [],
        additionalCustomProducts: [],
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
          this.meal = result.meal;
          if (this.dietDay) {
            const mealIndex = this.dietDay.meals.findIndex(
              (m) => m._id === this.meal?._id || m.name === this.meal?.name
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
          message: 'Receta añadida a la comida',
          duration: 1500,
          color: 'success',
        });
      },
      error: (error) => {
        console.error('[quickAddRecipeToMeal] Error:', error);
        this.ionicUtilService.showToast({
          message: 'No se pudo añadir la receta',
          duration: 2000,
          color: 'danger',
        });
      },
    });
  }

  private removeRecipeFromMeal(instance: any): void {
    if (!this.meal?._id || !instance._id) return;

    // Show confirmation
    this.ionicUtilService.showAlert({
      header: '¿Eliminar receta?',
      message:
        '¿Estás seguro de que quieres eliminar esta receta de la comida?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            // Delete the CustomRecipeInstance
            this.mealService
              .deleteMealCustomRecipeInstance(this.meal!._id!, instance._id)
              .subscribe({
                next: (updatedMeal) => {
                  // Update local state
                  this.meal = updatedMeal;
                  if (this.dietDay) {
                    const mealIndex = this.dietDay.meals.findIndex(
                      (m) => m._id === this.meal!._id
                    );
                    if (mealIndex !== -1) {
                      this.dietDay.meals[mealIndex] = updatedMeal;
                      this.dietDayService.setCurrentDietDay = this.dietDay;
                    }
                  }
                  this.ionicUtilService.showToast({
                    message: 'Receta eliminada de la comida',
                    duration: 2000,
                    color: 'success',
                  });
                },
                error: (err) => {
                  console.error('Error deleting recipe instance:', err);
                  this.ionicUtilService.showToast({
                    message: 'Error al eliminar la receta',
                    duration: 2000,
                    color: 'danger',
                  });
                },
              });
          },
        },
      ],
    });
  }

  private addRecipeToMeal(recipe: Recipe): void {
    // Save current search state to restore when returning
    this.navigationService.setTempData('searchFoodsState', {
      searchFilterGroup: { ...this.searchFilterGroup },
      currentMode: this.currentMode,
      searchTerm: this.searchFilterGroup.search,
      returnUrl: this.returnUrl,
      meal: this.meal,
      dietDay: this.dietDay,
      ingredientMode: this.ingredientMode,
    });

    // Navigate to add recipe flow
    this.navigationService.goToConfigRecipe({
      state: {
        mode: 'add',
        recipe: recipe,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: '/search-foods',
        selectedDate: window.history.state?.selectedDate || this.dietDay?.date,
      },
    });
  }

  private buildRecipeComposeContext(): any | null {
    if (!this.meal) return null;

    if (this.dietDay?._id && this.meal?._id) {
      return { mealId: this.meal._id };
    }

    if (this.dietDay) {
      const indexMeal = this.dietDay.meals.findIndex(
        (m) => m._id === this.meal?._id || m.name === this.meal?.name
      );

      if (indexMeal !== -1) {
        return {
          dietInUseId: this.user?.dietInUse || this.userService.getLocalUser?.dietInUse,
          indexMeal,
          currentDate: this.dietDay.date,
        };
      }
    }

    return null;
  }

  private getRecipeRawWeight(recipe: Recipe): number {
    return (recipe.customProducts || []).reduce((sum, cp: any) => {
      const quantity = Number(cp?.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return sum;
      }
      return sum + quantity;
    }, 0);
  }

  private toPositiveNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return parsed;
  }

  public onRecipeEdit(recipe: Recipe): void {
    // Find the instance for this recipe
    const existingInstance = this.meal?.customRecipeInstances?.find(
      (instance) => {
        const dataRecipe =
          typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
        if (!dataRecipe) return false;
        const instanceRecipe =
          typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
        if (!instanceRecipe) return false;
        return instanceRecipe._id === recipe._id;
      }
    );

    if (existingInstance) {
      this.editRecipeFromMeal(recipe, existingInstance);
    }
  }

  private editRecipeFromMeal(recipe: Recipe, customRecipeInstance: any): void {
    // Save current search state to restore when returning
    this.navigationService.setTempData('searchFoodsState', {
      searchFilterGroup: { ...this.searchFilterGroup },
      currentMode: this.currentMode,
      searchTerm: this.searchFilterGroup.search,
      returnUrl: this.returnUrl,
      meal: this.meal,
      dietDay: this.dietDay,
      ingredientMode: this.ingredientMode,
    });

    this.navigationService.goToConfigRecipe({
      state: {
        mode: 'edit',
        recipe: recipe,
        customRecipeInstance: customRecipeInstance,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: '/search-foods',
        selectedDate: window.history.state?.selectedDate || this.dietDay?.date,
      },
    });
  }

  public onRecipeFavoriteToggle(recipe: Recipe): void {
    this.recipeApiService.toggleArchived(recipe._id).subscribe({
      next: (res) => {
        // Update local user favorites
        if (res.isArchived) {
          if (!this.user.archivedRecipes) this.user.archivedRecipes = [];
          this.user.archivedRecipes.push(recipe._id);
        } else {
          const idx = this.user.archivedRecipes?.indexOf(recipe._id);
          if (idx > -1) this.user.archivedRecipes.splice(idx, 1);
        }
        this.userService.setLocalUser = this.user;

        const toastOptions: ToastOptions = {
          message: res.isArchived
            ? 'Receta añadida a favoritos'
            : 'Receta eliminada de favoritos',
          duration: 1500,
        };
        this.ionicUtilService.showToast(toastOptions);
      },
      error: () => {
        const toastOptions: ToastOptions = {
          message: 'Error al actualizar favoritos',
          duration: 1500,
        };
        this.ionicUtilService.showToast(toastOptions);
      },
    });
  }

  private setCustomProductsFirst(): void {
    // Show products already in meal at the top, excluding them from API results
    const searchTerm = this.searchFilterGroup.search?.toLowerCase() || '';
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
        .filter((id) => !!id)
    );

    this.products = this.products.filter(
      (productTemp) => !productsOnMealIds.has(productTemp._id)
    );

    this.products = [...productsOnMeal, ...this.products];
  }

  private setSelectedIngredientsFirst(): void {
    // Show selected ingredients at the top, excluding them from API results
    const searchTerm = this.searchFilterGroup.search?.toLowerCase() || '';
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
        .filter((id) => !!id)
    );

    this.products = this.products.filter(
      (productTemp) => !selectedProductIds.has(productTemp._id)
    );

    // Put selected products first
    this.products = [...selectedProducts, ...this.products];
  }

  private createProduct(scannedCode?: string): void {
    const queryParams: any = {
      user: JSON.stringify(this.user),
      codeBar: scannedCode || undefined,
      returnUrl: '/search-foods',
    };

    const baseState: any = {
      user: this.user,
      codeBar: scannedCode,
      returnUrl: '/search-foods',
    };

    if (this.ingredientMode) {
      // ✅ MODO INGREDIENTE: No pasar meal/dietDay, SÍ pasar ingredientMode
      console.log('[DEBUG] createProduct → create-product (ingredientMode)');
      baseState.ingredientMode = true;
    } else {
      // MODO NORMAL: Incluir meal y dietDay
      console.log('[DEBUG] createProduct → create-product (normal mode)');
      queryParams.meal = this.meal ? JSON.stringify(this.meal) : undefined;
      queryParams.dietDay = this.meal
        ? JSON.stringify(this.dietDay)
        : undefined;
      baseState.meal = this.meal;
      baseState.dietDay = this.dietDay;
      baseState.selectedDate = window.history.state?.selectedDate || this.dietDay?.date;
    }

    // Limpiar undefined para evitar '?meal=undefined'
    Object.keys(queryParams).forEach(
      (k) => queryParams[k] === undefined && delete queryParams[k]
    );

    this.navigationService.goToCreateProduct({
      queryParams,
      state: baseState,
    });
  }

  private createRecipe(): void {
    // Save current search state to restore when returning
    this.navigationService.setTempData('searchFoodsState', {
      searchFilterGroup: { ...this.searchFilterGroup },
      currentMode: this.currentMode,
      searchTerm: this.searchFilterGroup.search,
      returnUrl: this.returnUrl,
      meal: this.meal,
      dietDay: this.dietDay,
      ingredientMode: this.ingredientMode,
    });

    this.navigationService.goToConfigRecipe({
      state: {
        mode: 'create',
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: '/search-foods',
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
        if (params['user']) {
          try {
            this.user = JSON.parse(params['user']);
          } catch (_) {}
        } else if (params['userId']) {
          this.user = { _id: params['userId'] } as any;
        }
      }
      if (!this.meal) {
        if (params['meal']) {
          try {
            this.meal = JSON.parse(params['meal']);
          } catch (_) {}
        } else if (params['mealName']) {
          this.meal = { name: params['mealName'] } as any;
        }
      }
      // No procesar codeBar desde query/state en esta página
      if (params['returnUrl']) this.returnUrl = params['returnUrl'];
    });
  }

  public async close(result?: any): Promise<void> {
    console.log('SearchFoods: close called', {
      returnUrl: this.returnUrl,
      meal: !!this.meal,
      mealName: this.meal?.name,
      ingredientMode: this.ingredientMode,
      selectedIngredientsCount: this.selectedIngredients.length,
    });

    // In ingredient mode, pass back selected ingredients using temp storage
    if (this.ingredientMode && this.returnUrl) {
      console.log(
        'SearchFoods: storing ingredients in temp storage:',
        this.selectedIngredients.length
      );
      console.log('SearchFoods: Detailed ingredient list:');
      this.selectedIngredients.forEach((ing, idx) => {
        console.log(
          `  [${idx}] ${ing.product?.name} - ${ing.quantity}g - ID: ${ing.product?._id}`
        );
      });

      // Create a deep copy to avoid reference issues
      const ingredientsCopy = this.selectedIngredients.map((ing) => ({
        product: ing.product,
        quantity: ing.quantity,
        energyKcal100g: ing.energyKcal100g,
        protein100g: ing.protein100g,
        carbohydrates100g: ing.carbohydrates100g,
        fat100g: ing.fat100g,
      }));

      // Store in temp storage (more reliable than navigation state)
      this.navigationService.setTempData(
        'selectedIngredients',
        ingredientsCopy
      );

      // Clear ingredient mode state from tempData when returning
      this.navigationService.clearTempData('ingredientModeState');

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
    if (this.returnUrl && this.returnUrl !== '/search-foods') {
      console.log('SearchFoods: navigating to returnUrl:', this.returnUrl);
      this.navigationService.backTo(this.returnUrl, {
        state: {
          result: finalResult,
          selectedDate: finalResult.selectedDate,
        },
      });
    } else {
      // Default navigation based on context
      if (this.meal) {
        console.log('SearchFoods: returning to diets (has meal)');
        this.navigationService.backTo(['/tabs/diets'], {
          state: {
            selectedDate: finalResult.selectedDate,
          },
        });
      } else {
        console.log('SearchFoods: back with no animation');
        this.navigationService.backNoAnim();
      }
    }
  }

  /**
   * Create a new recipe from selected ingredients in ingredient mode
   */
  public createRecipeFromIngredients(): void {
    if (this.selectedIngredients.length < 2) {
      const toastOptions = {
        message: 'Necesitas al menos 2 ingredientes para crear una receta',
        duration: 2000,
        color: 'warning',
      };
      this.ionicUtilService.showToast(toastOptions);
      return;
    }

    console.log(
      '[DEBUG] Creating recipe from ingredients:',
      this.selectedIngredients.length
    );

    // Navigate to config-recipe in create mode with selected ingredients
    this.navigationService.goToConfigRecipe({
      state: {
        mode: 'create',
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
    console.log('[DEBUG] Creating new product for ingredient mode');

    // Save current ingredients state
    this.navigationService.setTempData(
      'selectedIngredients',
      this.selectedIngredients
    );

    this.navigationService.goToCreateProduct({
      state: {
        ingredientMode: true,
        returnUrl: '/search-foods',
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
