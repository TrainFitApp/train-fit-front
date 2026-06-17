import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastController, Platform, IonContent } from "@ionic/angular";
import { Subject, firstValueFrom, takeUntil } from "rxjs";
import { CustomProduct } from "src/app/core/models/customProduct";
import { CustomRecipe } from "src/app/core/models/customRecipe";
import { DietDay } from "src/app/core/models/dietDay";
import { Meal } from "src/app/core/models/meal";
import { Recipe } from "src/app/core/models/recipe";
import { User } from "src/app/core/models/user";
import { DietDayService } from "src/app/core/services/diet-day/diet-day.service";
import {
  RecipeDraftMode,
  RecipeDraftService,
} from "src/app/core/services/recipe/recipe-draft.service";
import {
  RecipeNutritionCalculation,
  RecipeService,
} from "src/app/core/services/recipe/recipe.service";
import { UserService } from "src/app/core/services/user/user.service";
import { IonicUtilService } from "src/app/core/services/util/ionic-util.service";
import { NavigationService } from "src/app/core/services/util/navigation.service";
import { fadeIn } from "src/app/shared/animations/fade";
import { AdMobService } from "src/app/core/services/util/ad-mob.service";
import { BillingService } from "src/app/core/services/billing/billing.service";
import { splitTextIntoSteps } from "src/app/shared/utils";

export type ConfigRecipeMode = "create" | "add" | "edit";

@Component({
  selector: "app-config-recipe",
  templateUrl: "./config-recipe.page.html",
  styleUrls: ["./config-recipe.page.scss"],
  animations: [fadeIn],
})
export class ConfigRecipePage implements OnInit, OnDestroy {
  private static readonly INGREDIENT_SNAPSHOT_FIELDS: Array<
    keyof CustomProduct
  > = [
    "_id",
    "quantity",
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
    "ingredients",
    "allergens",
    "traces",
    "vegan",
    "vegetarian",
    "lactoseFree",
    "glutenFree",
  ];

  @ViewChild("quantityInput") quantityInput: any;
  @ViewChild("nameInput") nameInput: any;
  @ViewChild(IonContent) ionContent: IonContent | undefined;

  public mode: ConfigRecipeMode = "create";
  public recipeForm: FormGroup;
  public recipe: Recipe | null = null;
  public customRecipe: CustomRecipe | null = null;
  public meal: Meal | null = null;
  public dietDay: DietDay | null = null;
  public user: User;

  public isFavorite = false;
  public loading = false;
  public editInfoMode = false;
  public editingBaseRecipe = false;
  public showDescriptionDetails = false;
  public weightExplainerExpanded = false;

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
  public recipeNutrition: RecipeNutritionCalculation;

  private readonly destroy$ = new Subject<void>();
  private _ingredients: CustomProduct[] = [];
  private returnUrl = "/search-foods";
  private routeState: any = {};
  private shouldPropagateUpdatedRecipe = false;
  private updatedDietDayToPropagate: DietDay | null = null;
  private backButton$: any;
  private wrapperInitialSnapshot = "";
  private baseInitialSnapshot = "";

  public get ingredients(): CustomProduct[] {
    if (this.recipeDraftService.isActive()) {
      return this.recipeDraftService.ingredients();
    }

    return this._ingredients;
  }

  public set ingredients(value: CustomProduct[]) {
    const dedupedIngredients = this.dedupeIngredients(value || []);
    this._ingredients = dedupedIngredients;

    if (this.recipeDraftService.isActive()) {
      this.recipeDraftService.setIngredients(dedupedIngredients);
    }
  }

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private recipeDraftService: RecipeDraftService,
    private userService: UserService,
    private navigationService: NavigationService,
    private dietDayService: DietDayService,
    private ionicUtilService: IonicUtilService,
    private toastCtrl: ToastController,
    private platform: Platform,
    private adMobService: AdMobService,
    private billingService: BillingService,
  ) {
    this.user = this.userService.getLocalUser;
    this.recipeNutrition = this.recipeService.getEmptyRecipeNutrition();
    this.recipeForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: [""],
      quantityCooked: [null, [Validators.min(1)]],
      quantity: [null, [Validators.min(1)]],
    });

    this.recipeForm
      .get("quantityCooked")
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.normalizePositiveControlValue("quantityCooked");
        this.recalculateMacros();
      });

    this.recipeForm
      .get("quantity")
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.normalizePositiveControlValue("quantity");
        this.recalculateMacros();
      });

    this.recipeForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.recipeDraftService.isActive()) return;

        // El draft vive en memoria y debe reflejar siempre el último
        // estado real del formulario mientras se edita la receta.
        this.recipeDraftService.setForm(
          this.normalizeFormState(this.recipeForm.getRawValue()),
        );
      });
  }

  ngOnInit(): void {
    this.initFromRoute();
    this.initializeBackButtonHandler();
  }

  ionViewWillEnter(): void {
    this.syncDraftState();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.backButton$?.unsubscribe();
  }

  private initFromRoute(): void {
    const state: any = window.history.state || {};
    this.routeState = state;
    const savedMode = this.navigationService.getTempData<RecipeDraftMode>("configRecipeMode");
    const routeMode = (state.mode || savedMode || "create") as RecipeDraftMode;
    let routeRecipe = state.recipe || null;
    let routeCustomRecipe = state.customRecipe || null;
    const routeMeal = state.meal || null;
    const routeDietDay = state.dietDay || null;
    const routeReturnUrl = state.returnUrl || this.returnUrl;

    const selectedIngredients = this.navigationService.getTempData<
      CustomProduct[]
    >("selectedIngredients");
    const formState = this.navigationService.getTempData<any>(
      "configRecipeFormState",
    );
    const savedCustomRecipe = this.navigationService.getTempData<CustomRecipe>(
      "configRecipeInstance",
    );
    const savedRecipe =
      this.navigationService.getTempData<Recipe>("configRecipeDef");

    if (!routeCustomRecipe && savedCustomRecipe) {
      routeCustomRecipe = savedCustomRecipe;
    }
    if (!routeRecipe && savedRecipe) {
      routeRecipe = savedRecipe;
    }

    if (
      !routeRecipe &&
      routeCustomRecipe &&
      typeof routeCustomRecipe.recipe === "object"
    ) {
      routeRecipe = routeCustomRecipe.recipe;
    }

    const reuseExistingDraft = this.recipeDraftService.matchesContext({
      mode: routeMode,
      recipe: routeRecipe,
      customRecipe: routeCustomRecipe,
      meal: routeMeal,
    });

    if (reuseExistingDraft) {
      this.mode = this.recipeDraftService.mode() as ConfigRecipeMode;
      this.recipe = this.recipeDraftService.recipe();
      this.customRecipe = this.recipeDraftService.customRecipe();
      this.meal = this.recipeDraftService.meal();
      this.dietDay = this.recipeDraftService.dietDay();
      this.returnUrl = this.recipeDraftService.returnUrl() || routeReturnUrl;
      this.editingBaseRecipe = this.recipeDraftService.editingBaseRecipe();
      this.patchForm(this.recipeDraftService.form());
      this.ingredients = this.recipeDraftService.ingredients();
    } else {
      this.mode = routeMode as ConfigRecipeMode;
      this.recipe = routeRecipe;
      this.customRecipe = routeCustomRecipe;
      this.meal = routeMeal;
      this.dietDay = routeDietDay;
      this.returnUrl = routeReturnUrl;
      this.editingBaseRecipe = false;

      this.patchForm();
      this.ingredients = selectedIngredients?.length
        ? selectedIngredients
        : this.getCurrentIngredients();

      if (formState) {
        this.recipeForm.patchValue(formState);
      }

      this.startRecipeDraft();
    }

    this.persistSelectedIngredients();

    this.checkFavorite();
    this.recalculateMacros();
    this.captureInitialSnapshot();

    this.dietDayService.getCurrentDietDay
      .pipe(takeUntil(this.destroy$))
      .subscribe((dietDay) => {
        if (!dietDay || !this.meal) return;
        this.dietDay = dietDay;
        this.meal = this.findMealInDietDay(dietDay, this.meal) || this.meal;
      });
  }

  private patchForm(
    formOverrides?: Partial<{
      name: string;
      description: string;
      quantity: number | null;
      quantityCooked: number | null;
    }>,
  ): void {
    this.recipeForm.patchValue({
      name: formOverrides?.name ?? this.recipe?.name ?? "",
      description: formOverrides?.description ?? this.recipe?.description ?? "",
      quantity: formOverrides?.quantity ?? this.customRecipe?.quantity ?? null,
      quantityCooked:
        formOverrides?.quantityCooked ??
        this.customRecipe?.quantityCooked ??
        null,
    });

    if (!this.editingBaseRecipe && !this.isCreateMode) {
      this.recipeForm.get("name")?.disable();
      this.recipeForm.get("description")?.disable();
    }
  }

  private initializeBackButtonHandler(): void {
    this.backButton$?.unsubscribe();
    this.backButton$ = this.platform.backButton.subscribeWithPriority(
      9999,
      () => this.goBack(),
    );
  }

  private startRecipeDraft(): void {
    // Esta pantalla es la dueña del draft de recipes.
    // SearchFoods y AddProduct leen/escriben contra esta misma copia
    // en memoria para que el estado no dependa del orden de navegación.
    this.recipeDraftService.startDraft({
      mode: this.mode,
      recipe: this.recipe,
      customRecipe: this.customRecipe,
      meal: this.meal,
      dietDay: this.dietDay,
      returnUrl: this.returnUrl,
      ingredients: this.ingredients,
      editingBaseRecipe: this.editingBaseRecipe,
      form: this.normalizeFormState(this.recipeForm.getRawValue()),
    });
  }

  private syncDraftState(): void {
    if (!this.recipeDraftService.isActive()) return;

    this.ingredients = this.recipeDraftService.ingredients();
    this.editingBaseRecipe = this.recipeDraftService.editingBaseRecipe();
    this.recalculateMacros();
  }

  public get isCreateMode(): boolean {
    return this.mode === "create";
  }

  public get isAddMode(): boolean {
    return this.mode === "add";
  }

  public get isEditMode(): boolean {
    return this.mode === "edit";
  }

  public get pageTitle(): string {
    if (this.editingBaseRecipe) return "Editar receta original";
    if (this.isCreateMode) return "Crear receta";
    if (this.isAddMode) return "Añadir receta";
    return "Editar receta";
  }

  public get canEditOriginalRecipe(): boolean {
    return (
      !!this.recipe?._id &&
      this.normalizeId(this.recipe.userId) === this.normalizeId(this.user?._id)
    );
  }

  public get canDeleteOwnRecipe(): boolean {
    const recipeUserId = this.normalizeId(this.recipe?.userId);
    const currentUserId = this.normalizeId(this.user?._id);
    return (
      !!this.recipe?._id && !!recipeUserId && recipeUserId === currentUserId
    );
  }

  public get canSave(): boolean {
    return this.recipeForm.valid && this.ingredients.length >= 2;
  }

  public get recipeDescriptionSteps(): string[] {
    return splitTextIntoSteps(this.recipeForm.getRawValue()?.description);
  }

  public get showRecipeDescriptionSteps(): boolean {
    return (
      !this.editingBaseRecipe &&
      !this.isCreateMode &&
      this.recipeDescriptionSteps.length > 0
    );
  }

  public get showPortionFields(): boolean {
    return !this.editingBaseRecipe;
  }

  public get footerUsesConsumedQuantity(): boolean {
    return this.recipeNutrition.consumed > 0;
  }

  public get footerMacrosHint(): string {
    if (!this.footerUsesConsumedQuantity) {
      return "* Sin ración consumida: valores de la ración a 0.";
    }

    return this.recipeNutrition.portionBasis === "cooked"
      ? "* Ración consumida calculada sobre el peso total cocinado."
      : "* Ración consumida calculada sobre el peso en crudo.";
  }

  public get footerKcal(): number {
    return this.portionMacros.kcal;
  }

  public get footerProtein(): number {
    return this.portionMacros.protein;
  }

  public get footerCarbs(): number {
    return this.portionMacros.carbs;
  }

  public get footerFat(): number {
    return this.portionMacros.fat;
  }

  public get per100Title(): string {
    return this.recipeNutrition.per100Basis === "cooked"
      ? "Información nutricional por 100g cocinado"
      : "Información nutricional por 100g en crudo";
  }

  public get per100Kcal(): number {
    return this.recipeNutrition.per100Macros.kcal;
  }

  public get per100Protein(): number {
    return this.recipeNutrition.per100Macros.protein;
  }

  public get per100Carbs(): number {
    return this.recipeNutrition.per100Macros.carbs;
  }

  public get per100Fat(): number {
    return this.recipeNutrition.per100Macros.fat;
  }

  public get baseRecipePer100Title(): string {
    return "Información nutricional por 100g en crudo";
  }

  public async startEditingOriginalRecipe(): Promise<void> {
    if (!this.recipe) return;

    if (
      !this.editingBaseRecipe &&
      this.buildWrapperSnapshot() !== this.wrapperInitialSnapshot
    ) {
      const shouldDiscard = await this.ionicUtilService.showAlert({
        header: "Cambios sin guardar",
        message:
          "Tienes cambios sin guardar en esta configuración. Si editas la receta original, se descartarán.",
        buttons: [
          { text: "Cancelar", role: "cancel" },
          { text: "Descartar", role: "destructive" },
        ],
      });

      if (shouldDiscard?.role !== "destructive") {
        return;
      }

      this.patchForm();
      this.ingredients = this.getCurrentIngredients();
    }

    this.editingBaseRecipe = true;
    this.recipeDraftService.setEditingBaseRecipe(true);
    this.editInfoMode = true;
    this.recipeForm.get("name")?.enable();
    this.recipeForm.get("description")?.enable();
    this.ingredients = [...(this.recipe.customProducts || [])];
    this.recalculateMacros();
  }

  public cancelOriginalRecipeEdit(): void {
    this.editingBaseRecipe = false;
    this.recipeDraftService.setEditingBaseRecipe(false);
    this.editInfoMode = false;
    this.patchForm();
    this.ingredients = this.getCurrentIngredients();
    this.recalculateMacros();
  }

  public toggleEditInfo(): void {
    if (this.canEditOriginalRecipe) {
      this.startEditingOriginalRecipe();
    }
  }

  public async confirmEditInfo(): Promise<void> {
    await this.saveOriginalRecipePrompt();
  }

  public cancelEditInfo(): void {
    this.cancelOriginalRecipeEdit();
  }

  public async addIngredients(): Promise<void> {
    this.recipeDraftService.setEditingIngredientIndex(null);
    this.recipeDraftService.setForm(
      this.normalizeFormState(this.recipeForm.getRawValue()),
    );
    this.navigationService.setTempData(
      "configRecipeFormState",
      this.recipeForm.getRawValue(),
    );
    this.navigationService.setTempData(
      "configRecipeInstance",
      this.customRecipe,
    );
    this.navigationService.setTempData("configRecipeDef", this.recipe);
    this.navigationService.setTempData("configRecipeMode", this.mode);

    this.navigationService.goToSearchFoods({
      state: {
        ingredientMode: true,
        existingIngredients: this.ingredients,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: "/search-foods/config-recipe",
      },
    });
  }

  public removeIngredient(index: number): void {
    const nextIngredients = [...this.ingredients];
    nextIngredients.splice(index, 1);
    this.ingredients = nextIngredients;
    this.persistSelectedIngredients();
    this.recalculateMacros();
  }

  public revertIngredient(index: number): void {
    if (!this.recipe || this.editingBaseRecipe) return;
    const current = this.ingredients[index];
    if (!current) return;

    const original = this.getOriginalIngredient(current);

    if (!original) {
      this.removeIngredient(index);
      return;
    }

    const nextIngredients = [...this.ingredients];
    nextIngredients[index] = { ...original };
    this.ingredients = nextIngredients;
    this.persistSelectedIngredients();
    this.recalculateMacros();
  }

  public async editIngredientQuantity(
    ingredient: CustomProduct,
    index: number,
  ): Promise<void> {
    this.persistSelectedIngredients();
    this.recipeDraftService.setEditingIngredientIndex(index);
    this.navigationService.goToAddProduct({
      state: {
        product: ingredient.product,
        productQuantity: ingredient.quantity,
        customProduct: ingredient,
        ingredientMode: true,
        returnUrl: "/search-foods/config-recipe",
      },
    });
  }

  public getIngredientName(ingredient: CustomProduct): string {
    return ingredient.product?.name || "Ingrediente";
  }

  public getIngredientStatus(ingredient: CustomProduct): string | null {
    if (!this.recipe || this.editingBaseRecipe) return null;
    const original = this.getOriginalIngredient(ingredient);
    if (!original) return "Añadido";
    if (!this.recipeService.areCustomProductsEquivalent(original, ingredient)) {
      return "Modificado";
    }
    return null;
  }

  public hasRevertAction(ingredient: CustomProduct): boolean {
    if (!this.recipe || this.editingBaseRecipe) return false;
    const original = this.getOriginalIngredient(ingredient);
    if (!original) return false;
    return !this.recipeService.areCustomProductsEquivalent(
      original,
      ingredient,
    );
  }

  private persistSelectedIngredients(): void {
    const ingredientsCopy = this.ingredients.map((ingredient: any) => ({
      ...ingredient,
      product:
        typeof ingredient.product === "object" && ingredient.product
          ? { ...ingredient.product }
          : ingredient.product,
    }));

    this.recipeDraftService.setIngredients(ingredientsCopy);
    this.navigationService.setTempData("selectedIngredients", ingredientsCopy);
  }

  private captureInitialSnapshot(): void {
    this.wrapperInitialSnapshot = this.buildWrapperSnapshot();
    this.baseInitialSnapshot = this.buildBaseSnapshot();
  }

  private buildWrapperSnapshot(): string {
    return JSON.stringify({
      form: this.normalizeFormState(this.recipeForm.getRawValue()),
      ingredients: this.serializeIngredients(this.ingredients),
    });
  }

  private buildBaseSnapshot(): string {
    return JSON.stringify({
      form: {
        name: this.recipe?.name || "",
        description: this.recipe?.description || "",
      },
      ingredients: this.serializeIngredients(
        (this.recipe?.customProducts || []) as CustomProduct[],
      ),
    });
  }

  private normalizeFormState(raw: any): any {
    return {
      name: raw?.name || "",
      description: raw?.description || "",
      quantity: this.toPositiveNumber(raw?.quantity),
      quantityCooked: this.toPositiveNumber(raw?.quantityCooked),
    };
  }

  private serializeIngredients(ingredients: CustomProduct[]): any[] {
    return (ingredients || []).map((ingredient: any) => {
      const snapshot: any = {
        _id: ingredient?._id || null,
        productId: ingredient?.product?._id || ingredient?.product || null,
      };

      ConfigRecipePage.INGREDIENT_SNAPSHOT_FIELDS.forEach((field) => {
        const value = ingredient?.[field];
        snapshot[field] = Array.isArray(value) ? [...value] : value ?? null;
      });

      return snapshot;
    });
  }

  private hasUnsavedChanges(): boolean {
    if (this.editingBaseRecipe) {
      return (
        JSON.stringify({
          form: {
            name: this.recipeForm.getRawValue()?.name || "",
            description: this.recipeForm.getRawValue()?.description || "",
          },
          ingredients: this.serializeIngredients(this.ingredients),
        }) !== this.baseInitialSnapshot
      );
    }

    return this.buildWrapperSnapshot() !== this.wrapperInitialSnapshot;
  }

  private async confirmDiscardChanges(): Promise<boolean> {
    if (!this.hasUnsavedChanges()) return true;

    const result = await this.ionicUtilService.showAlert({
      header: "Hay cambios sin guardar",
      message:
        "Si sales ahora, se descartarán los cambios realizados en la receta.",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Descartar",
          role: "destructive",
        },
      ],
    });

    return result?.role === "destructive";
  }

  private clearConfigTempData(): void {
    this.recipeDraftService.reset();
    this.navigationService.clearTempData("selectedIngredients");
    this.navigationService.clearTempData("configRecipeFormState");
    this.navigationService.clearTempData("configRecipeMode");
    this.navigationService.clearTempData("configRecipeInstance");
    this.navigationService.clearTempData("configRecipeDef");
    this.navigationService.clearTempData("newIngredient");
    this.navigationService.clearTempData("editingIngredientIndex");
  }

  public getRemovedBaseIngredients(): CustomProduct[] {
    return this.recipeService.getRemovedBaseIngredients(
      this.recipe,
      this.ingredients,
    );
  }

  public restoreRemovedBaseIngredient(ingredient: CustomProduct): void {
    if (!this.recipe || this.editingBaseRecipe || !ingredient?._id) return;
    if (this.ingredients.some((current) => current?._id === ingredient._id))
      return;

    const nextIngredients = [...this.ingredients];
    const baseIngredients = (this.recipe.customProducts ||
      []) as CustomProduct[];
    const baseIndex = baseIngredients.findIndex(
      (baseIngredient) => baseIngredient?._id === ingredient._id,
    );

    if (baseIndex < 0) {
      nextIngredients.push({ ...ingredient });
    } else {
      let insertAt = nextIngredients.length;

      for (let i = baseIndex + 1; i < baseIngredients.length; i += 1) {
        const nextBaseIngredientId = baseIngredients[i]?._id;
        const currentIndex = nextIngredients.findIndex(
          (currentIngredient) =>
            currentIngredient?._id === nextBaseIngredientId,
        );

        if (currentIndex >= 0) {
          insertAt = currentIndex;
          break;
        }
      }

      nextIngredients.splice(insertAt, 0, { ...ingredient });
    }

    this.ingredients = nextIngredients;
    this.persistSelectedIngredients();
    this.recalculateMacros();
  }

  public getIngredientMacros(ingredient: CustomProduct): {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    const multiplier = (ingredient.quantity || 0) / 100;
    return {
      kcal:
        ((ingredient.energyKcal100g ?? ingredient.product?.energyKcal100g) ||
          0) * multiplier,
      protein:
        ((ingredient.protein100g ?? ingredient.product?.protein100g) || 0) *
        multiplier,
      carbs:
        ((ingredient.carbohydrates100g ??
          ingredient.product?.carbohydrates100g) ||
          0) * multiplier,
      fat:
        ((ingredient.fat100g ?? ingredient.product?.fat100g) || 0) * multiplier,
    };
  }

  public toggleFavorite(): void {
    if (!this.recipe?._id) return;
    this.recipeService.toggleArchived(this.recipe._id).subscribe({
      next: (res) => {
        this.isFavorite = res.isArchived;
      },
      error: () => this.showToast("Error al actualizar favoritos", "danger"),
    });
  }

  public deleteOwnRecipe(): void {
    if (!this.canDeleteOwnRecipe || !this.recipe?._id || this.loading) return;

    const recipeId = this.recipe._id;
    const recipeName = this.recipe.name || "esta receta";

    this.ionicUtilService.showAlert({
      header: "Eliminar receta",
      message:
        `¿Estás seguro de que quieres eliminar ${recipeName}? ` +
        "Se eliminará la receta base, todas sus configuraciones asociadas y desaparecerá de todas las comidas de todos los días donde se haya usado.",
      buttons: [
        {
          text: "CANCELAR",
          role: "cancel",
        },
        {
          text: "ELIMINAR",
          role: "destructive",
          handler: () => {
            void this.confirmDeleteOwnRecipe(recipeId);
          },
        },
      ],
    });
  }

  private async confirmDeleteOwnRecipe(recipeId: string): Promise<void> {
    if (!recipeId || this.loading) return;

    this.loading = true;

    try {
      await firstValueFrom(this.recipeService.delete(recipeId));
      this.removeDeletedRecipeLocally(recipeId);
      void this.billingService.refreshBackendEntitlements();
      await this.showToast("Receta eliminada");
      this.navigateAfterRecipeDeleted(recipeId);
    } catch (error) {
      console.error("[deleteOwnRecipe] Error:", error);
      this.loading = false;
      await this.showToast("Error al eliminar la receta", "danger");
    }
  }

  public async save(): Promise<void> {
    if (!this.canSave || this.loading) return;
    this.loading = true;

    try {
      if (this.isCreateMode) {
        await this.saveNewRecipe();
      } else if (this.isAddMode) {
        await this.addRecipeToMeal();
      } else {
        await this.saveOriginalRecipePrompt();
      }
    } catch (error) {
      console.error(error);
      if (this.handleRecipeLimitError(error)) {
        this.loading = false;
        return;
      }
      this.showToast("Error guardando la receta", "danger");
      this.loading = false;
    }
  }

  private async saveNewRecipe(): Promise<void> {
    const raw = this.recipeForm.getRawValue();
    const composePayload: any = {
      recipe: {
        name: raw.name,
        description: raw.description || undefined,
        customProducts: this.normalizeCustomProducts(this.ingredients),
      },
    };

    if (this.meal) {
      composePayload.customRecipe = {
        quantity: this.toPositiveNumber(raw.quantity),
        quantityCooked: this.toPositiveNumber(raw.quantityCooked),
        addedCustomProducts: [],
        modifiedBaseCustomProducts: [],
        removedBaseCustomProductIds: [],
      };
      composePayload.context = this.buildComposeContext();
    }

    const result = await firstValueFrom(
      this.recipeService.compose(composePayload),
    );
    this.applyComposeResult(result);
    this.captureInitialSnapshot();
    void this.billingService.refreshBackendEntitlements();
    this.adMobService.interstitial("create_recipe");
    this.goBack();
  }

  private async addRecipeToMeal(): Promise<void> {
    if (!this.recipe?._id) throw new Error("Recipe not found");
    const raw = this.recipeForm.getRawValue();
    const composePayload: any = {
      recipeId: this.recipe._id,
      customRecipe: {
        quantity: this.toPositiveNumber(raw.quantity),
        quantityCooked: this.toPositiveNumber(raw.quantityCooked),
        addedCustomProducts: this.calculateAdditionalIngredients(),
        modifiedBaseCustomProducts: this.calculateModifiedIngredients(),
        removedBaseCustomProductIds: this.calculateRemovedIngredients(),
      },
      context: this.buildComposeContext(),
    };

    const result = await firstValueFrom(
      this.recipeService.compose(composePayload),
    );
    this.applyComposeResult(result);
    this.captureInitialSnapshot();
    this.goBack();
  }

  private async updateExistingRecipe(
    updateOriginalRecipe: boolean,
  ): Promise<void> {
    if (!this.recipe?._id) {
      throw new Error("Recipe not found");
    }

    const raw = this.recipeForm.getRawValue();

    if (updateOriginalRecipe) {
      // Editar la receta original y editar la envoltura son caminos distintos.
      // Guardar la base no debe vaciar ni tocar los deltas del CustomRecipe.
      const recipeUpdatePayload: any = {
        name: raw.name,
        description: raw.description || undefined,
      };

      // Si solo cambian nombre/descripcion, evitamos resincronizar ingredientes
      // y no tocamos los CustomProduct base innecesariamente.
      if (this.hasBaseIngredientChanges()) {
        recipeUpdatePayload.customProducts = this.normalizeCustomProducts(
          this.ingredients,
        );
      }

      const updatedRecipe = await firstValueFrom(
        this.recipeService.update(this.recipe._id, recipeUpdatePayload),
      );

      this.recipe = updatedRecipe;
      // La pantalla anterior no debe seguir con una copia vieja de la receta
      // después de guardar cambios base como nombre/descripcion vacíos.
      this.recipeDraftService.syncRecipe(updatedRecipe);
      if (this.customRecipe && typeof this.customRecipe.recipe === "object") {
        this.customRecipe = {
          ...this.customRecipe,
          recipe: updatedRecipe,
        };
      }
      this.syncUpdatedRecipeLocally(updatedRecipe);
      this.shouldPropagateUpdatedRecipe = true;
      this.cancelOriginalRecipeEdit();
      this.persistSelectedIngredients();
      this.captureInitialSnapshot();
      this.loading = false;
      await this.showToast("Receta original actualizada");
      return;
    }

    if (!this.customRecipe?._id) {
      throw new Error("Custom recipe not found");
    }

    const normalizedQuantity = this.toPositiveNumber(raw.quantity);
    const normalizedQuantityCooked = this.toPositiveNumber(raw.quantityCooked);
    const composePayload: any = {
      mode: "edit",
      recipeId: this.recipe._id,
      context: {
        mealId: this.meal?._id,
        customRecipeId: this.customRecipe._id,
      },
      customRecipe: {
        quantity: normalizedQuantity,
        quantityCooked: normalizedQuantityCooked,
        addedCustomProducts: this.calculateAdditionalIngredients(),
        modifiedBaseCustomProducts: this.calculateModifiedIngredients(),
        removedBaseCustomProductIds: this.calculateRemovedIngredients(),
      },
    };

    const result = await firstValueFrom(
      this.recipeService.compose(composePayload),
    );
    this.applyComposeResult(result);
    this.captureInitialSnapshot();
    this.goBack();
  }

  public async saveOriginalRecipePrompt(): Promise<void> {
    if (!this.editingBaseRecipe) {
      await this.updateExistingRecipe(false);
      return;
    }

    this.loading = false;
    await this.ionicUtilService.showAlert({
      header: "Modificar receta original",
      message:
        "Has modificado los valores originales de la receta. Si confirmas, el cambio se reflejará en todos los sitios donde se use.",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Confirmar",
          handler: () => {
            this.loading = true;
            this.updateExistingRecipe(true);
          },
        },
      ],
    });
  }

  private calculateModifiedIngredients(): Array<{
    baseCustomProductId: string;
    quantity: number;
  }> {
    const originalIngredients = this.recipe?.customProducts || [];
    return originalIngredients
      .map((ingredient: any) => {
        const current = this.ingredients.find(
          (item) => item._id === ingredient._id,
        );
        if (!current) return null;
        if (
          this.recipeService.areCustomProductsEquivalent(ingredient, current)
        ) {
          return null;
        }
        return this.recipeService.buildModifiedBaseCustomProduct(
          ingredient,
          current,
        );
      })
      .filter(Boolean) as Array<{
      baseCustomProductId: string;
      quantity: number;
    }>;
  }

  private calculateRemovedIngredients(): string[] {
    const originalIngredients = this.recipe?.customProducts || [];
    return originalIngredients
      .filter(
        (ingredient: any) =>
          !this.ingredients.find((current) => current._id === ingredient._id),
      )
      .map((ingredient: any) => ingredient._id);
  }

  private calculateAdditionalIngredients(): any[] {
    const originalIds = new Set(
      (this.recipe?.customProducts || []).map(
        (ingredient: any) => ingredient._id,
      ),
    );
    return this.normalizeCustomProducts(
      this.ingredients.filter((ingredient) => !originalIds.has(ingredient._id)),
    );
  }

  private normalizeCustomProducts(products: CustomProduct[]): any[] {
    return products.map((ingredient) =>
      this.recipeService.serializeCustomProductForPersistence(ingredient),
    );
  }

  private hasBaseIngredientChanges(): boolean {
    return (
      JSON.stringify(this.serializeIngredients(this.ingredients)) !==
      JSON.stringify(
        this.serializeIngredients(
          (this.recipe?.customProducts || []) as CustomProduct[],
        ),
      )
    );
  }

  private applyComposeResult(result: any): void {
    if (result?.dietDay) {
      this.dietDay = result.dietDay;
      this.dietDayService.setCurrentDietDay = result.dietDay;
      return;
    }

    if (result?.meal && this.dietDay) {
      const mealIndex = this.findMealIndexInDietDay(this.dietDay, this.meal);
      if (mealIndex !== -1) {
        this.dietDay.meals[mealIndex] = result.meal;
        this.dietDayService.setCurrentDietDay = { ...this.dietDay };
      }
      this.meal = result.meal;
    }
  }

  private syncUpdatedRecipeLocally(updatedRecipe: Recipe): void {
    const updatedDietDay =
      this.dietDayService.syncUpdatedRecipeInCurrentDietDay(updatedRecipe);

    if (!updatedDietDay) {
      return;
    }

    this.updatedDietDayToPropagate = updatedDietDay;
    this.dietDay = updatedDietDay;

    if (!this.meal) {
      return;
    }

    const updatedMeal = this.findMealInDietDay(updatedDietDay, this.meal);

    if (updatedMeal) {
      this.meal = updatedMeal;
    }
  }

  private buildComposeContext(): any | null {
    if (!this.meal) return null;
    if (this.dietDay?._id && this.meal._id) {
      return { mealId: this.meal._id };
    }
    if (!this.dietDay) return null;

    const indexMeal = this.findMealIndexInDietDay(this.dietDay, this.meal);

    if (indexMeal === -1) return null;

    return {
      dietInUseId: this.user.dietInUse,
      indexMeal,
      currentDate: this.dietDay.date,
    };
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

  private getCurrentIngredients(): CustomProduct[] {
    return this.dedupeIngredients(
      this.recipeService.mergeRecipeIngredients(this.recipe, this.customRecipe),
    );
  }

  public recalculateMacros(): void {
    const raw = this.recipeForm.getRawValue();
    this.recipeNutrition =
      this.recipeService.calculateRecipeNutritionFromIngredients(
        this.ingredients,
        this.editingBaseRecipe ? null : raw.quantity,
        this.editingBaseRecipe ? null : raw.quantityCooked,
      );
    this.calculatedMacros = this.recipeNutrition.totals;

    if (this.editingBaseRecipe) {
      this.portionMacros = {
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };
      return;
    }

    this.portionMacros = this.recipeNutrition.portionMacros;
  }

  private dedupeIngredients(list: CustomProduct[]): CustomProduct[] {
    const seen = new Set<string>();
    return (list || []).filter((ingredient: any) => {
      const key = ingredient._id;
      if (!key) return true;
      if (seen.has(key.toString())) return false;
      seen.add(key.toString());
      return true;
    });
  }

  private getOriginalIngredient(
    ingredient: CustomProduct,
  ): CustomProduct | undefined {
    return (this.recipe?.customProducts || []).find(
      (item: any) => item._id === ingredient._id,
    );
  }

  private checkFavorite(): void {
    this.isFavorite = !!(
      this.recipe?._id && this.user?.archivedRecipes?.includes(this.recipe._id)
    );
  }

  private toPositiveNumber(value: any): number | null {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    return parsed;
  }

  private normalizePositiveControlValue(
    controlName: "quantity" | "quantityCooked",
  ): void {
    const control = this.recipeForm.get(controlName);
    const value = control?.value;
    if (value === null || value === undefined || value === "") return;

    const textValue = typeof value === "string" ? value.trim() : `${value}`;
    const parsed = Number(value);
    if (textValue.startsWith("-") || !Number.isFinite(parsed) || parsed <= 0) {
      control?.setValue(null, { emitEvent: false });
    }
  }

  private removeDeletedRecipeLocally(recipeId: string): void {
    if (this.user?.archivedRecipes?.includes(recipeId)) {
      this.user.archivedRecipes = this.user.archivedRecipes.filter(
        (id) => id !== recipeId,
      );
      this.userService.setLocalUser = this.user;
    }

    const currentDietDay = this.dietDayService.currentDietDay;
    if (!currentDietDay?.meals?.length) return;

    let hasChanges = false;
    const nextMeals = currentDietDay.meals.map((meal) => {
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
      this.dietDayService.setCurrentDietDay = {
        ...currentDietDay,
        meals: nextMeals,
      };
    }
  }

  private getRecipeIdFromCustomRecipe(customRecipe: any): string | null {
    const recipeRef = customRecipe?.recipe;
    return this.normalizeId(recipeRef);
  }

  private normalizeId(value: any): string | null {
    if (!value) return null;
    if (typeof value === "string") return value;
    return value?._id?.toString?.() || value?.toString?.() || null;
  }

  private handleRecipeLimitError(error: any): boolean {
    if (error?.error?.code !== "PREMIUM_LIMIT_RECIPES") {
      return false;
    }

    void this.ionicUtilService.showPremiumLimitAlert({
      message:
        "Has alcanzado el limite de recetas propias. Activa Pro para crear mas.",
      onUpgrade: () => this.navigationService.goToPremium(),
    });
    return true;
  }

  private navigateAfterRecipeDeleted(recipeId: string): void {
    this.clearConfigTempData();

    if (this.returnUrl) {
      this.navigationService.backTo(this.returnUrl, {
        state: {
          returningFromConfigRecipe: true,
          currentMode: "recipes",
          deletedRecipe: recipeId,
        },
      });
      return;
    }

    this.navigationService.backNoAnim();
  }

  private async showToast(
    message: string,
    color: "success" | "warning" | "danger" = "success",
  ): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1800,
      color,
      position: "bottom",
    });
    await toast.present();
  }

  public async goBack(): Promise<void> {
    const shouldLeave = await this.confirmDiscardChanges();
    if (!shouldLeave) return;

    const updatedRecipeState =
      this.shouldPropagateUpdatedRecipe && this.recipe?._id
        ? {
            updatedRecipe: this.recipe,
            updatedDietDay: this.updatedDietDayToPropagate,
          }
        : {};

    this.clearConfigTempData();

    if (this.returnUrl) {
      this.navigationService.backTo(this.returnUrl, {
        state: {
          returningFromConfigRecipe: true,
          currentMode: "recipes",
          ...updatedRecipeState,
        },
      });
      return;
    }

    this.navigationService.backNoAnim();
  }
}
