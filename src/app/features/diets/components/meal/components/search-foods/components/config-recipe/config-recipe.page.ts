import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, Platform, IonContent } from '@ionic/angular';
import { Subject, takeUntil, forkJoin, firstValueFrom } from 'rxjs';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { IProduct } from 'src/app/core/models/product';
import {
  CustomRecipeInstance,
  CreateCustomRecipeInstanceDTO,
  UpdateCustomRecipeInstanceDTO,
} from 'src/app/core/models/customRecipeInstance';
import { DataRecipe } from 'src/app/core/models/dataRecipe';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { Recipe } from 'src/app/core/models/recipe';
import { User } from 'src/app/core/models/user';
import { CustomRecipeInstanceApiService } from 'src/app/core/services/custom-recipe-instance/custom-recipe-instance-api.service';
import { DataRecipeService } from 'src/app/core/services/data-recipe/data-recipe.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { DietDayAPIService } from 'src/app/core/services/diet-day/diet-day-api.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { fadeIn } from 'src/app/shared/animations/fade';

export type ConfigRecipeMode = 'create' | 'add' | 'edit';

@Component({
  selector: 'app-config-recipe',
  templateUrl: './config-recipe.page.html',
  styleUrls: ['./config-recipe.page.scss'],
  animations: [fadeIn],
})
export class ConfigRecipePage implements OnInit, OnDestroy {
  @ViewChild('quantityInput') quantityInput: any;
  @ViewChild(IonContent) ionContent: IonContent | undefined;

  public mode: ConfigRecipeMode = 'create';
  public recipeForm: FormGroup;
  public recipe: Recipe | null = null;
  public ingredients: CustomProduct[] = [];
  public meal: Meal | null = null;
  public dietDay: DietDay | null = null;
  public customRecipeInstance: CustomRecipeInstance | null = null;
  public user: User;

  public isFavorite = false;
  public loading = false;
  public weightExplainerExpanded = false;
  private successfulSave = false;
  public calculatedMacros = {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    quantity: 0,
  };

  public portionMacros = {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  private destroy$ = new Subject<void>();
  private returnUrl: string = '/search-foods';
  private backButton$: any;
  private routeState: any = {};
  private ingredientsInitialized = false;
  private selectedDate: any = null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private customRecipeInstanceService: CustomRecipeInstanceApiService,
    private dataRecipeService: DataRecipeService,
    private dietDayService: DietDayService,
    private dietDayAPIService: DietDayAPIService,
    private mealService: MealService,
    private userService: UserService,
    private navigationService: NavigationService,
    private ionicUtilService: IonicUtilService,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {
    this.user = this.userService.getLocalUser;
    this.initForm();
  }

  public ngOnInit(): void {
    this.initFromRoute();
  }

  public ionViewWillEnter(): void {
    // Setup hardware back button handler
    this.initializeBackButtonHandler();

    // CRITICAL: Restore mode from tempData if returning from search-foods
    const savedMode =
      this.navigationService.getTempData<ConfigRecipeMode>('configRecipeMode');
    if (savedMode) {
      this.mode = savedMode;
      // Don't clear yet - keep it for potential re-entries
    }

    // Restore recipe and instance from tempData (prevent data loss on return)
    const savedInstance =
      this.navigationService.getTempData<CustomRecipeInstance>(
        'configRecipeInstance'
      );
    if (savedInstance && !this.customRecipeInstance) {
      this.customRecipeInstance = savedInstance;
    }

    const savedRecipe =
      this.navigationService.getTempData<Recipe>('configRecipeDef');
    if (savedRecipe && !this.recipe) {
      this.recipe = savedRecipe;
      this.checkFavorite();
    }

    // Check if returning from search-foods with selected ingredients
    const selectedIngredients = this.navigationService.getTempData<
      CustomProduct[]
    >('selectedIngredients');

    if (selectedIngredients && selectedIngredients.length > 0) {
      this.applyResolvedIngredients(selectedIngredients);
      this.navigationService.clearTempData('selectedIngredients');
    } else if (!this.ingredientsInitialized) {
      const initialIngredients = this.resolveInitialIngredients(
        this.routeState
      );
      this.applyResolvedIngredients(initialIngredients);
    }

    // Check if returning from add-product with an edited ingredient
    const newIngredient =
      this.navigationService.getTempData<CustomProduct>('newIngredient');
    const editingIndex = this.navigationService.getTempData<number>(
      'editingIngredientIndex'
    );

    if (newIngredient) {
      if (typeof editingIndex === 'number' && this.ingredients[editingIndex]) {
        this.ingredients[editingIndex] = newIngredient;
      } else {
        const newProductId = newIngredient.product?._id;
        const existingIndex = this.ingredients.findIndex(
          (ing) => ing.product?._id === newProductId
        );
        if (existingIndex !== -1) {
          this.ingredients[existingIndex] = newIngredient;
        } else {
          this.ingredients.push(newIngredient);
        }
      }

      this.recalculateMacros();
      this.navigationService.clearTempData('newIngredient');
      this.navigationService.clearTempData('editingIngredientIndex');
    }

    // Restore form state if exists (returning from search-foods)
    const savedFormState = this.navigationService.getTempData<any>(
      'configRecipeFormState'
    );
    if (savedFormState) {
      this.recipeForm.patchValue({
        name: savedFormState.name,
        description: savedFormState.description,
        quantityCooked: savedFormState.quantityCooked,
        quantity: savedFormState.quantity,
      });
      this.navigationService.clearTempData('configRecipeFormState');
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    // Cleanup back button handler
    if (this.backButton$) {
      this.backButton$.unsubscribe();
    }
  }

  private initializeBackButtonHandler(): void {
    // Cleanup previous handler if exists
    if (this.backButton$) {
      this.backButton$.unsubscribe();
    }

    // Handle hardware back button same as header back button
    this.backButton$ = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        this.goBack();
      }
    );
  }

  private initForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      quantityCooked: [null, [Validators.required, Validators.min(1)]],
      // For add mode only
      quantity: [null],
    });

    // Sync quantity with quantityCooked by default in add/create mode
    this.recipeForm
      .get('quantityCooked')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        if (this.mode === 'add' || this.mode === 'create') {
          const qtyControl = this.recipeForm.get('quantity');

          // In add/create mode, only sync if quantity is empty or matches raw weight
          if (
            !qtyControl?.value ||
            qtyControl?.value === this.calculatedMacros.quantity
          ) {
            qtyControl?.setValue(val, { emitEvent: false });
          }
        }
        this.recalculateMacros();
      });

    // Also listen to quantity changes to update portion macros
    this.recipeForm
      .get('quantity')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.recalculateMacros();
      });
  }

  private initFromRoute(): void {
    const state: any = window.history.state || {};
    this.routeState = state;

    // Get mode
    this.mode = state.mode || 'create';

    // Get customRecipeInstance first if editing from meal
    if (state.customRecipeInstance) {
      this.customRecipeInstance = state.customRecipeInstance;

      // Extract recipe from customRecipeInstance
      if (typeof this.customRecipeInstance.dataRecipe === 'object') {
        const dataRecipe = this.customRecipeInstance.dataRecipe;
        if (typeof dataRecipe.recipe === 'object') {
          this.recipe = dataRecipe.recipe;
        }
      }
    }

    // Get recipe if editing or adding (can override from state)
    if (state.recipe) {
      this.recipe = state.recipe;
    }

    // Prepare form/favorite state (ingredients are resolved in ionViewWillEnter)
    if (this.recipe) {
      this.checkFavorite();
      this.patchFormForMode();
    }

    // Get meal and dietDay context
    if (state.meal) this.meal = state.meal;
    if (state.dietDay) this.dietDay = state.dietDay;
    if (state.returnUrl) this.returnUrl = state.returnUrl;
    if (state.selectedDate) this.selectedDate = state.selectedDate;

    // Subscribe to dietDay updates
    this.dietDayService.getCurrentDietDay
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: DietDay) => {
        if (res) {
          this.dietDay = res;
          if (this.meal) {
            this.meal =
              res.meals?.find((m) => m.name === this.meal?.name) || this.meal;
          }
        }
      });

    // Macros are calculated after ingredients are resolved
  }

  /**
   * Resolve the initial ingredients list from route state.
   * Priority (lowest to highest):
   * 1) Recipe ingredients (base or merged)
   * 2) existingIngredients (create mode)
   */
  private resolveInitialIngredients(state: any): CustomProduct[] {
    // If creating a new recipe from ingredients, load them from state
    if (
      this.mode === 'create' &&
      !this.recipe &&
      state?.existingIngredients &&
      state.existingIngredients.length > 0
    ) {
      return [...state.existingIngredients];
    }

    // If editing an instance, load merged ingredients (with overrides applied)
    if (this.recipe) {
      if (this.customRecipeInstance && this.mode === 'edit') {
        return this.getMergedIngredients();
      }
      // Otherwise, load base recipe ingredients
      return this.recipe?.customProducts || [];
    }

    return [];
  }

  /**
   * Apply ingredients once, dedupe and recalculate.
   */
  private applyResolvedIngredients(list: CustomProduct[]): void {
    this.ingredients = this.dedupeIngredients(list);
    this.ingredientsInitialized = true;

    this.recalculateMacros();

    // In CREATE mode with meal, update quantity defaults when ingredients change
    if (this.mode === 'create' && this.meal) {
      const currentQty = this.recipeForm.get('quantity')?.value;
      const currentQtyCooked = this.recipeForm.get('quantityCooked')?.value;

      // Keep inputs empty in create mode - don't populate with calculated values
      // Only update if user hasn't entered anything yet
      if (!currentQty && !currentQtyCooked) {
        // Keep them null/empty, don't patch with calculated values
        // This allows the user to manually enter values
      }
    }
  }

  /**
   * Remove duplicated ingredients by product/customProduct id.
   */
  private dedupeIngredients(list: CustomProduct[]): CustomProduct[] {
    if (!list || list.length === 0) return [];
    const seen = new Set<string>();
    const result: CustomProduct[] = [];

    list.forEach((item) => {
      const id = item.product?._id || (item as any)._id;
      if (!id) {
        result.push(item);
        return;
      }
      if (!seen.has(id.toString())) {
        seen.add(id.toString());
        result.push(item);
      }
    });

    return result;
  }

  private patchFormForMode(): void {
    if (this.mode === 'edit' && this.recipe) {
      this.recipeForm.patchValue({
        name: this.recipe.name,
        description: this.recipe.description || '',
      });

      if (this.customRecipeInstance) {
        const dataRecipe =
          typeof this.customRecipeInstance.dataRecipe === 'object'
            ? this.customRecipeInstance.dataRecipe
            : null;
        this.recipeForm.patchValue({
          quantity: this.customRecipeInstance.quantity,
          quantityCooked: dataRecipe?.quantityCooked ?? null,
        });
      }
    } else if (this.mode === 'add' && this.recipe) {
      // In add mode, recipe definition is readonly (we are just adding a portion)
      this.recipeForm.get('name')?.disable();
      this.recipeForm.get('description')?.disable();

      if (this.customRecipeInstance) {
        const dataRecipe =
          typeof this.customRecipeInstance.dataRecipe === 'object'
            ? this.customRecipeInstance.dataRecipe
            : null;
        this.recipeForm.patchValue({
          quantity: this.customRecipeInstance.quantity,
          quantityCooked: dataRecipe?.quantityCooked ?? null,
        });
      } else {
        // New addition: set default quantity based on ingredients
        this.recipeForm.patchValue({
          quantityCooked: null,
          quantity: null,
        });
      }
    } else if (this.mode === 'create') {
      // In create mode, keep inputs empty (not populated)
      // The form is initialized with null values, so just leave them as is
      // Don't patch any values here to keep inputs visually empty
    }
  }

  public get isCreateMode(): boolean {
    return this.mode === 'create';
  }

  public get isAddMode(): boolean {
    return this.mode === 'add';
  }

  public get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  public get canEditDefinition(): boolean {
    // Enable editing for create mode OR edit mode (regardless of ownership per user request)
    return this.isCreateMode || this.isEditMode;
  }

  public get canEditIngredients(): boolean {
    // Can ALWAYS edit ingredients (changes saved as overrides, never modifying the original recipe)
    return true;
  }

  /**
   * Merges base recipe ingredients with customRecipeInstance overrides
   * Returns the CURRENT state of ingredients for this instance
   */
  private getMergedIngredients(): CustomProduct[] {
    if (!this.customRecipeInstance || !this.recipe) {
      return this.recipe?.customProducts || [];
    }

    const baseIngredients = this.recipe.customProducts || [];
    const overrides = this.customRecipeInstance.customProductsOverrides || [];
    const additional = this.customRecipeInstance.additionalCustomProducts || [];

    // Create map of overrides by customProductId
    const overridesMap = new Map<string, any>();
    overrides.forEach((override) => {
      let id: string | undefined;
      if (typeof override.customProductId === 'string') {
        id = override.customProductId;
      } else if (
        override.customProductId &&
        typeof override.customProductId === 'object'
      ) {
        id = (override.customProductId as any)._id;
      }
      if (id) {
        overridesMap.set(id.toString(), override);
      }
    });

    // Apply overrides to base ingredients
    const modifiedIngredients = baseIngredients
      .map((ingredient) => {
        const override = overridesMap.get(ingredient._id.toString());

        // If marked as removed, skip this ingredient
        if (override?.removed) {
          const productName =
            typeof ingredient.product === 'string'
              ? ingredient.product
              : ingredient.product?.name || 'Unknown';
          return null;
        }

        // If quantity override exists, use it
        if (override && override.quantity !== undefined) {
          const productName =
            typeof ingredient.product === 'string'
              ? ingredient.product
              : ingredient.product?.name || 'Unknown';
          return { ...ingredient, quantity: override.quantity };
        }

        // Otherwise, use base ingredient as-is
        return ingredient;
      })
      .filter((ing): ing is CustomProduct => ing !== null);

    // Add additional ingredients
    const result = [...modifiedIngredients, ...additional];
    return result;
  }

  public get pageTitle(): string {
    switch (this.mode) {
      case 'create':
        return 'Crear receta';
      case 'add':
        return 'Añadir receta';
      case 'edit':
        return 'Editar receta';
      default:
        return 'Receta';
    }
  }

  public get canSave(): boolean {
    if (this.mode === 'add') {
      const qty = this.recipeForm.get('quantity')?.value;
      const qtyCooked = this.recipeForm.get('quantityCooked')?.value;
      return qty > 0 && qtyCooked > 0;
    }

    // Create mode with meal - require quantities
    if (this.mode === 'create' && this.meal) {
      const qty = this.recipeForm.get('quantity')?.value;
      const qtyCooked = this.recipeForm.get('quantityCooked')?.value;
      const hasEnoughIngredients = this.ingredients.length >= 2;
      return (
        hasEnoughIngredients &&
        this.recipeForm.valid &&
        qty > 0 &&
        qtyCooked > 0
      );
    }

    // Create or Edit mode without meal
    const hasEnoughIngredients = this.ingredients.length >= 2;
    return hasEnoughIngredients && this.recipeForm.valid;
  }

  public recalculateMacros(): void {
    const tempRecipe: Recipe = {
      name: '',
      customProducts: this.ingredients,
    };

    // 1. Total Recipe Macros (Always calculated)
    this.calculatedMacros =
      this.recipeService.calculateRecipeMacros(tempRecipe);

    // 2. Portion Macros (Based on form values if in add/edit/create mode)
    if (
      this.mode === 'add' ||
      this.mode === 'edit' ||
      (this.mode === 'create' && this.meal)
    ) {
      const formVal = this.recipeForm.getRawValue();
      // Portion macros are based on consumed quantity vs cooked total weight
      const cookedTotal =
        formVal.quantityCooked || this.calculatedMacros.quantity || 1;
      const quantityRatio = (formVal.quantity || 0) / cookedTotal;
      this.portionMacros = {
        kcal: this.calculatedMacros.kcal * quantityRatio,
        protein: this.calculatedMacros.protein * quantityRatio,
        carbs: this.calculatedMacros.carbs * quantityRatio,
        fat: this.calculatedMacros.fat * quantityRatio,
      };
    }
  }

  public async addIngredients(): Promise<void> {
    // Save current form state before navigating
    const formState = {
      name: this.recipeForm.get('name')?.value,
      description: this.recipeForm.get('description')?.value,
      quantityCooked: this.recipeForm.get('quantityCooked')?.value,
      quantity: this.recipeForm.get('quantity')?.value,
    };
    this.navigationService.setTempData('configRecipeFormState', formState);

    // Save recipe and instance state to persist across navigation
    this.navigationService.setTempData(
      'configRecipeInstance',
      this.customRecipeInstance
    );
    this.navigationService.setTempData('configRecipeDef', this.recipe);

    // CRITICAL: Save mode state so it persists when returning from search-foods
    this.navigationService.setTempData('configRecipeMode', this.mode);

    // Navigate to search-foods in ingredient mode with existing ingredients
    this.navigationService.goToSearchFoods({
      state: {
        ingredientMode: true,
        existingIngredients: this.ingredients, // Pass existing to show them selected
        returnUrl: '/search-foods/config-recipe',
        meal: this.meal,
        dietDay: this.dietDay,
      },
    });
  }

  public removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.recalculateMacros();
  }

  public async editIngredientQuantity(
    ingredient: CustomProduct,
    index: number
  ): Promise<void> {
    // Navigate to add-product to edit all ingredient details
    const product = ingredient.product;
    if (!product) {
      console.error('No product found in ingredient');
      return;
    }

    // Save the ingredient index to update when returning
    this.navigationService.setTempData('editingIngredientIndex', index);

    // Navigate to add-product with the ingredient
    this.navigationService.goToAddProduct({
      state: {
        product: product,
        productQuantity: ingredient.quantity,
        ingredientMode: true,
        customProduct: ingredient, // Pass the full customProduct for editing
        returnUrl: '/search-foods/config-recipe',
        selectedDate: this.selectedDate || this.dietDay?.date,
      },
    });
  }

  public getIngredientName(ingredient: CustomProduct): string {
    return ingredient.product?.name || 'Desconocido';
  }

  public getIngredientMacros(ingredient: CustomProduct): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    const multiplier = (ingredient.quantity || 0) / 100;

    // Read macros from product in real-time (saves DB space)
    const energyKcal100g =
      ingredient.energyKcal100g ||
      (ingredient.product as any)?.energyKcal100g ||
      0;

    const protein100g =
      ingredient.protein100g || (ingredient.product as any)?.protein100g || 0;

    const carbohydrates100g =
      ingredient.carbohydrates100g ||
      (ingredient.product as any)?.carbohydrates100g ||
      0;

    const fat100g =
      ingredient.fat100g || (ingredient.product as any)?.fat100g || 0;

    return {
      kcal: energyKcal100g * multiplier,
      protein: protein100g * multiplier,
      carbs: carbohydrates100g * multiplier,
      fat: fat100g * multiplier,
    };
  }

  private checkFavorite(): void {
    if (this.recipe && this.user) {
      this.isFavorite =
        this.user.archivedRecipes?.includes(this.recipe._id) || false;
    }
  }

  public toggleFavorite(): void {
    if (!this.recipe) return;

    this.recipeService.toggleArchived(this.recipe._id).subscribe({
      next: (res) => {
        this.isFavorite = res.isArchived;
        // Update user state locally
        if (this.isFavorite) {
          if (!this.user.archivedRecipes) this.user.archivedRecipes = [];
          if (!this.user.archivedRecipes.includes(this.recipe._id)) {
            this.user.archivedRecipes.push(this.recipe._id);
          }
        } else {
          this.user.archivedRecipes = this.user.archivedRecipes?.filter(
            (id) => id !== this.recipe?._id
          );
        }
        this.userService.setLocalUser = this.user;

        this.showToast(
          this.isFavorite ? 'Añadida a favoritos' : 'Eliminada de favoritos'
        );
      },
      error: () => {
        this.showToast('Error al actualizar favoritos', 'danger');
      },
    });
  }

  public scrollToQuantityInput(): void {
    if (this.quantityInput && this.ionContent) {
      this.quantityInput.setFocus();
      setTimeout(() => {
        this.ionContent?.scrollToPoint(
          0,
          this.quantityInput.el.offsetTop - 100,
          500
        );
      }, 100);
    }
  }

  public async save(): Promise<void> {
    // Use getRawValue() to include disabled fields
    const formValue = this.recipeForm.getRawValue();

    if (!this.canSave) {
      if (this.ingredients.length < 2) {
        this.showToast('You need at least 2 ingredients', 'warning');
      }
      return;
    }

    // 🔒 Prevent double submissions
    if (this.loading) {
      return;
    }

    this.loading = true;

    try {
      if (this.mode === 'create') {
        await this.saveNewRecipe();
      } else if (this.mode === 'add') {
        await this.addRecipeToMeal();
      } else if (this.mode === 'edit') {
        await this.updateExistingRecipe();
      }
      // ✅ Loading stays true until navigation completes (component destroyed)
      // No need to set loading = false on success since we're navigating away
    } catch (error) {
      console.error('Error saving recipe:', error);
      this.showToast('Error saving recipe', 'danger');
      // ❌ Only reset loading on error (so user can retry)
      this.loading = false;
    }
  }

  private async saveNewRecipe(): Promise<void> {
    const formValue = this.recipeForm.getRawValue();

    try {
      const composePayload: any = {
        recipe: {
          name: formValue.name,
          description: formValue.description || undefined,
          customProducts: this.normalizeCustomProducts(this.ingredients),
        },
      };

      if (this.meal) {
        composePayload.dataRecipe = {
          quantityCooked: formValue.quantityCooked,
        };
        composePayload.instance = {
          quantity:
            formValue.quantity ||
            formValue.quantityCooked ||
            this.calculatedMacros.quantity,
          customProductsOverrides: [],
          additionalCustomProducts: [],
        };
        composePayload.context = this.buildComposeContext();
      }

      const result = await firstValueFrom(
        this.recipeService.compose(composePayload)
      );

      if (this.meal) {
        this.applyComposeResult(result);
        this.showToast('Receta añadida a la comida', 'success');
      } else {
        this.showToast('Receta creada con éxito', 'success');
      }

      this.successfulSave = true;
      this.goBack();
    } catch (err) {
      console.error('Error creating recipe:', err);
      this.showToast('Error al crear la receta', 'danger');
    }
  }

  private async addRecipeToMeal(): Promise<void> {
    if (!this.recipe || !this.meal) {
      throw new Error('Recipe or meal not found');
    }

    const formValue = this.recipeForm.getRawValue();

    try {
      const instanceQuantity = formValue.quantity || formValue.quantityCooked;

      const composePayload: any = {
        recipeId: this.recipe._id,
        dataRecipe: {
          quantityCooked: formValue.quantityCooked,
        },
        instance: {
          quantity: instanceQuantity,
          customProductsOverrides: this.calculateIngredientOverrides(),
          additionalCustomProducts: this.calculateAdditionalIngredients(),
        },
        context: this.buildComposeContext(),
      };

      const result = await firstValueFrom(
        this.recipeService.compose(composePayload)
      );

      this.applyComposeResult(result);
      this.showToast('Receta añadida a la comida', 'success');
      this.successfulSave = true;
      this.goBack();
    } catch (err) {
      console.error('Error creating DataRecipe:', err);
      this.showToast('Error al crear DataRecipe', 'danger');
    }
  }

  private async updateExistingRecipe(): Promise<void> {
    if (!this.recipe?._id || !this.customRecipeInstance?._id) {
      throw new Error('Recipe ID or CustomRecipeInstance ID not found');
    }

    const formValue = this.recipeForm.getRawValue();

    // Extract dataRecipeId (dataRecipe can be string or object)
    const dataRecipeId =
      typeof this.customRecipeInstance.dataRecipe === 'string'
        ? this.customRecipeInstance.dataRecipe
        : (this.customRecipeInstance.dataRecipe as any)?._id;

    if (!dataRecipeId) {
      throw new Error('DataRecipe ID not found');
    }

    // Build unified edit payload
    const editPayload: any = {
      mode: 'edit',
      recipeId: this.recipe._id,
      context: {
        mealId: this.meal?._id,
        dataRecipeId,
        customRecipeInstanceId: this.customRecipeInstance._id,
      },
    };

    // Add recipe data unconditionally (user requested ability to edit regardless of ownership)
    // The backend should handle whether this updates the original or creates a copy if needed.
    // For now, we send the data as requested.
    editPayload.recipe = {
      name: formValue.name,
      description: formValue.description || undefined,
      customProducts: this.normalizeCustomProducts(this.ingredients),
    };

    // Always update instance (overrides and quantities)
    editPayload.dataRecipe = {
      quantityCooked: formValue.quantityCooked,
    };

    editPayload.instance = {
      quantity: formValue.quantity || formValue.quantityCooked,
      customProductsOverrides: this.calculateIngredientOverrides(),
      additionalCustomProducts: this.calculateAdditionalIngredients(),
    };

    // Single API call handles both recipe + instance updates
    const result = await firstValueFrom(
      this.recipeService.compose(editPayload)
    );

    this.applyComposeResult(result);

    this.showToast('Receta actualizada con éxito', 'success');
    this.goBack();
  }

  private calculateIngredientOverrides(): any[] {
    // Compare current ingredients with original recipe ingredients
    // Return only the changes (quantity modifications or removed items)
    const originalIngredients = this.recipe?.customProducts || [];
    const overrides: any[] = [];

    originalIngredients.forEach((originalIng: any) => {
      const currentIng = this.ingredients.find(
        (ing) => ing._id === originalIng._id
      );

      if (!currentIng) {
        // Ingredient was removed
        overrides.push({
          customProductId: originalIng._id,
          removed: true,
        });
      } else if (currentIng.quantity !== originalIng.quantity) {
        // Quantity was changed
        overrides.push({
          customProductId: originalIng._id,
          quantity: currentIng.quantity,
        });
      }
    });

    return overrides;
  }

  private calculateAdditionalIngredients(): any[] {
    // Find ingredients that are NOT in the original recipe
    const originalIngredients = this.recipe?.customProducts || [];
    const additionalIngredients: CustomProduct[] = [];

    this.ingredients.forEach((currentIng) => {
      const existsInOriginal = originalIngredients.some(
        (origIng: any) => origIng._id === currentIng._id
      );

      if (!existsInOriginal) {
        // Collect the additional ingredient
        additionalIngredients.push(currentIng);
      }
    });

    // Normalize collected ingredients (same format as recipe customProducts)
    return this.normalizeCustomProducts(additionalIngredients);
  }

  private buildComposeContext(): any | null {
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
          dietInUseId: this.user.dietInUse,
          indexMeal,
          currentDate: this.dietDay.date,
        };
      }
    }

    return null;
  }

  /**
   * Normalize customProducts for API payload:
   * - If product already exists (has _id): send only { quantity, product: id }
   * - If product is new (no _id): send full { quantity, product, energyKcal100g, ... }
   */
  private normalizeCustomProducts(products: CustomProduct[]): any[] {
    return products.map((cp) => {
      const p = cp.product;
      const productId = p?._id || p;

      // If product exists in DB (has _id), send only reference
      if (productId) {
        return {
          quantity: cp.quantity,
          product: productId,
        };
      }

      // If neither exists, send full product data (new ingredient being created)
      return {
        quantity: cp.quantity,
        product: cp.product,
        energyKcal100g: cp.energyKcal100g,
        protein100g: cp.protein100g,
        carbohydrates100g: cp.carbohydrates100g,
        fat100g: cp.fat100g,
      };
    });
  }

  private applyComposeResult(result: any): void {
    if (result?.dietDay) {
      this.dietDay = result.dietDay;
      this.dietDayService.setCurrentDietDay = result.dietDay;
      return;
    }

    if (result?.meal && this.dietDay) {
      const mealIndex = this.dietDay.meals.findIndex(
        (m) => m._id === this.meal?._id || m.name === this.meal?.name
      );

      if (mealIndex !== -1) {
        const updatedMeals = [...this.dietDay.meals];
        updatedMeals[mealIndex] = result.meal;
        const updatedDietDay = {
          ...this.dietDay,
          meals: updatedMeals,
        };
        this.dietDay = updatedDietDay;
        this.meal = result.meal;
        this.dietDayService.setCurrentDietDay = updatedDietDay;
      }
    }
  }

  private async createCustomRecipeInstanceAndAddToMeal(
    instanceData: CreateCustomRecipeInstanceDTO
  ): Promise<void> {
    if (!this.meal) {
      throw new Error('Meal not found');
    }

    // Check if dietDay exists
    if (this.dietDay && this.dietDay._id) {
      // DietDay exists - create instance and add to existing meal
      await this.createInstanceAndAddToExistingMeal(instanceData);
    } else {
      // DietDay doesn't exist - create dietDay/meal first
      await this.createInstanceOnNewDietDay(instanceData);
    }
  }

  private async createInstanceAndAddToExistingMeal(
    instanceData: CreateCustomRecipeInstanceDTO
  ): Promise<void> {
    if (!this.meal?._id) {
      throw new Error('Meal ID not found');
    }

    // Step 1: Create the CustomRecipeInstance
    const createdInstance = await firstValueFrom(
      this.customRecipeInstanceService.create(instanceData)
    );

    // Step 2: Add the instance to the meal
    if (!createdInstance._id) {
      throw new Error('Created instance has no ID');
    }

    const updatedMeal = await firstValueFrom(
      this.mealService.addCustomRecipeInstance(
        this.meal._id,
        createdInstance._id
      )
    );

    // Update local state
    if (this.dietDay) {
      const mealIndex = this.dietDay.meals.findIndex(
        (m) => m._id === this.meal!._id
      );
      if (mealIndex !== -1) {
        this.dietDay.meals[mealIndex] = updatedMeal;
        this.dietDayService.setCurrentDietDay = this.dietDay;
      }
    }

    this.showToast('Receta añadida a la comida', 'success');
    this.successfulSave = true;
    this.goBack();
  }

  private async createInstanceOnNewDietDay(
    instanceData: CreateCustomRecipeInstanceDTO
  ): Promise<void> {
    if (!this.meal || !this.dietDay) {
      throw new Error('Meal or DietDay not found');
    }

    // Get necessary data
    const dietInUseId = this.user.dietInUse;
    const indexMeal = this.dietDay.meals.findIndex(
      (mealTemp) => mealTemp.name === this.meal!.name
    );
    const currentDate = this.dietDay.date;

    if (!dietInUseId || indexMeal === -1) {
      throw new Error('Datos incompletos para crear dietDay');
    }

    const createdDietDay = await firstValueFrom(
      this.dietDayAPIService.createCustomRecipeInstanceOnNewDietDay(
        instanceData,
        indexMeal,
        dietInUseId,
        currentDate
      )
    );

    // Update local state
    this.dietDayService.setCurrentDietDay = createdDietDay;

    this.showToast('Receta añadida a la comida', 'success');
    this.goBack();
  }

  private async showToast(
    message: string,
    color: 'success' | 'warning' | 'danger' = 'success'
  ): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  public get canDelete(): boolean {
    // Can only delete if editing/adding an existing recipe primarily in edit mode or add mode if checking detials
    // AND the recipe belongs to the current user
    return (
      (this.isEditMode || this.isAddMode) &&
      !!this.recipe &&
      this.recipe.userId === this.user._id
    );
  }

  public async deleteRecipe(): Promise<void> {
    if (!this.recipe?._id) return;

    const alert = await this.ionicUtilService.showAlert({
      header: 'Eliminar receta',
      message:
        '¿Estás seguro de que quieres eliminar esta receta permanentemente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.performDelete();
          },
        },
      ],
    });
  }

  private performDelete(): void {
    if (!this.recipe?._id) return;

    this.loading = true;
    this.recipeService.delete(this.recipe._id).subscribe({
      next: () => {
        this.showToast('Receta eliminada', 'success');
        this.loading = false;

        // Remove recipe from local state (meal and dietDay)
        this.removeRecipeFromLocalState(this.recipe._id);

        // Return to recipes list ensuring refresh
        this.navigationService.backTo(this.returnUrl, {
          state: {
            returningFromConfigRecipe: true,
            currentMode: 'recipes',
            refresh: true,
          },
        });
      },
      error: (err) => {
        console.error('Error deleting recipe:', err);
        this.showToast('Error al eliminar la receta', 'danger');
        this.loading = false;
      },
    });
  }

  /**
   * Remove recipe from meal and dietDay local state when permanently deleted
   */
  private removeRecipeFromLocalState(recipeId: string): void {
    if (!this.meal || !this.dietDay) {
      return;
    }

    // Filter out CustomRecipeInstances that reference this recipe
    const initialCount = this.meal.customRecipeInstances?.length || 0;

    this.meal.customRecipeInstances = (
      this.meal.customRecipeInstances || []
    ).filter((instance) => {
      const dataRecipe =
        typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
      if (!dataRecipe) return true; // Keep if invalid

      const recipe =
        typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
      if (!recipe) return true; // Keep if invalid

      // Remove if this instance references the deleted recipe
      return recipe._id !== recipeId;
    });

    const removedCount =
      initialCount - (this.meal.customRecipeInstances?.length || 0);

    // Update the meal in dietDay
    const mealIndex = this.dietDay.meals?.findIndex(
      (m) => m._id === this.meal._id
    );
    if (mealIndex !== undefined && mealIndex >= 0) {
      this.dietDay.meals[mealIndex] = { ...this.meal };
    }

    // Update service
    this.dietDayService.setCurrentDietDay = this.dietDay;
  }

  public goBack(): void {
    // Clear any ingredient mode state before going back
    this.navigationService.clearStateKeys([
      'ingredientMode',
      'existingIngredients',
      'selectedIngredients',
      'returnUrl',
    ]);
    this.navigationService.clearTempData('selectedIngredients');
    this.navigationService.clearTempData('configRecipeState');
    // Clear mode tempData when leaving successfully
    this.navigationService.clearTempData('configRecipeMode');

    if (this.returnUrl && this.returnUrl !== '/config-recipe') {
      // If saved successfully, always go to recipes segment
      // Otherwise, restore the segment that was active before
      let targetMode = 'recipes';
      if (!this.successfulSave) {
        const savedState =
          this.navigationService.getTempData<any>('searchFoodsState');
        targetMode = savedState?.currentMode || 'recipes';
      }

      // Add flag to indicate we're returning from config-recipe
      this.navigationService.backTo(this.returnUrl, {
        state: {
          returningFromConfigRecipe: true,
          currentMode: targetMode,
          ingredientMode: false,
          mealName: this.meal?.name,
          selectedDate: this.selectedDate || this.dietDay?.date,
        },
      });
    } else {
      this.navigationService.backNoAnim();
    }
  }
}
