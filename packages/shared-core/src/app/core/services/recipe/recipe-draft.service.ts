import { Injectable, computed, signal } from '@angular/core';
import { CustomProduct } from '../../models/customProduct';
import { CustomRecipe } from '../../models/customRecipe';
import { DietDay } from '../../models/dietDay';
import { Meal } from '../../models/meal';
import { Recipe } from '../../models/recipe';

export type RecipeDraftMode = 'create' | 'add' | 'edit';

export interface RecipeDraftFormState {
  name: string;
  description: string;
  quantity: number | null;
  quantityCooked: number | null;
}

export interface RecipeDraftState {
  active: boolean;
  mode: RecipeDraftMode;
  recipe: Recipe | null;
  customRecipe: CustomRecipe | null;
  meal: Meal | null;
  dietDay: DietDay | null;
  returnUrl: string | null;
  ingredients: CustomProduct[];
  editingIngredientIndex: number | null;
  editingBaseRecipe: boolean;
  form: RecipeDraftFormState;
}

const EMPTY_FORM: RecipeDraftFormState = {
  name: '',
  description: '',
  quantity: null,
  quantityCooked: null,
};

const EMPTY_STATE: RecipeDraftState = {
  active: false,
  mode: 'create',
  recipe: null,
  customRecipe: null,
  meal: null,
  dietDay: null,
  returnUrl: null,
  ingredients: [],
  editingIngredientIndex: null,
  editingBaseRecipe: false,
  form: EMPTY_FORM,
};

@Injectable({
  providedIn: 'root',
})
export class RecipeDraftService {
  /**
   * Fuente única en memoria para el draft de recipes.
   * Evita depender de tempData/history.state al navegar entre:
   * config-recipe -> search-foods -> add-product -> config-recipe
   */
  private readonly _state = signal<RecipeDraftState>(EMPTY_STATE);

  public readonly state = computed(() => this._state());
  public readonly isActive = computed(() => this._state().active);
  public readonly mode = computed(() => this._state().mode);
  public readonly recipe = computed(() => this._state().recipe);
  public readonly customRecipe = computed(() => this._state().customRecipe);
  public readonly meal = computed(() => this._state().meal);
  public readonly dietDay = computed(() => this._state().dietDay);
  public readonly returnUrl = computed(() => this._state().returnUrl);
  public readonly form = computed(() => this._state().form);
  public readonly ingredients = computed(() => this._state().ingredients);
  public readonly editingIngredientIndex = computed(
    () => this._state().editingIngredientIndex,
  );
  public readonly editingBaseRecipe = computed(
    () => this._state().editingBaseRecipe,
  );
  public readonly editingIngredient = computed(() => {
    const state = this._state();
    const index = state.editingIngredientIndex;
    if (index === null || index < 0 || index >= state.ingredients.length) {
      return null;
    }

    return state.ingredients[index];
  });

  public startDraft(input: Partial<RecipeDraftState> & {
    mode: RecipeDraftMode;
    recipe: Recipe | null;
    customRecipe?: CustomRecipe | null;
    meal?: Meal | null;
    dietDay?: DietDay | null;
    returnUrl?: string | null;
  }): void {
    this._state.set({
      active: true,
      mode: input.mode,
      recipe: this.cloneRecipe(input.recipe),
      customRecipe: this.cloneCustomRecipe(input.customRecipe ?? null),
      meal: this.cloneMeal(input.meal ?? null),
      dietDay: this.cloneDietDay(input.dietDay ?? null),
      returnUrl: input.returnUrl ?? null,
      ingredients: this.cloneIngredients(input.ingredients ?? []),
      editingIngredientIndex: input.editingIngredientIndex ?? null,
      editingBaseRecipe: !!input.editingBaseRecipe,
      form: {
        ...EMPTY_FORM,
        ...(input.form ?? EMPTY_FORM),
      },
    });
  }

  public matchesContext(context: {
    mode: RecipeDraftMode;
    recipe?: Recipe | null;
    customRecipe?: CustomRecipe | null;
    meal?: Meal | null;
  }): boolean {
    const current = this._state();
    if (!current.active) return false;

    return (
      current.mode === context.mode &&
      this.normalizeId(current.recipe) === this.normalizeId(context.recipe) &&
      this.normalizeId(current.customRecipe) ===
        this.normalizeId(context.customRecipe) &&
      this.normalizeId(current.meal) === this.normalizeId(context.meal)
    );
  }

  public setForm(partial: Partial<RecipeDraftFormState>): void {
    this._state.update((state) => ({
      ...state,
      form: {
        ...state.form,
        ...partial,
      },
    }));
  }

  public setIngredients(ingredients: CustomProduct[]): void {
    this._state.update((state) => ({
      ...state,
      ingredients: this.cloneIngredients(ingredients),
    }));
  }

  public setEditingIngredientIndex(index: number | null): void {
    this._state.update((state) => ({
      ...state,
      editingIngredientIndex: index,
    }));
  }

  public setEditingBaseRecipe(editingBaseRecipe: boolean): void {
    this._state.update((state) => ({
      ...state,
      editingBaseRecipe,
    }));
  }

  public syncRecipe(recipe: Recipe | null): void {
    this._state.update((state) => {
      if (!state.active) return state;

      const nextRecipe = this.cloneRecipe(recipe);
      const nextCustomRecipe = state.customRecipe
        ? {
            ...state.customRecipe,
            recipe:
              typeof state.customRecipe.recipe === 'object' && nextRecipe
                ? nextRecipe
                : state.customRecipe.recipe,
          }
        : null;

      return {
        ...state,
        recipe: nextRecipe,
        customRecipe: nextCustomRecipe,
        form: {
          ...state.form,
          name: nextRecipe?.name ?? '',
          description: nextRecipe?.description ?? '',
        },
      };
    });
  }

  public updateIngredientAt(index: number, ingredient: CustomProduct): void {
    this._state.update((state) => {
      const nextIngredients = this.cloneIngredients(state.ingredients);

      if (index >= 0 && index < nextIngredients.length) {
        nextIngredients[index] = this.cloneIngredient(ingredient);
      } else {
        nextIngredients.push(this.cloneIngredient(ingredient));
      }

      return {
        ...state,
        ingredients: nextIngredients,
      };
    });
  }

  public removeProductReferences(productId: string): void {
    if (!productId) return;

    this._state.update((state) => {
      if (!state.active) return state;

      const nextRecipe = state.recipe
        ? {
            ...state.recipe,
            customProducts: this.cloneIngredients(
              ((state.recipe.customProducts || []) as CustomProduct[]).filter(
                (ingredient) => this.getProductId(ingredient) !== productId,
              ),
            ),
          }
        : null;

      const removedBaseIds = new Set<string>(
        (((state.recipe?.customProducts || []) as CustomProduct[])
          .filter((ingredient) => this.getProductId(ingredient) === productId)
          .map((ingredient) => ingredient?._id?.toString?.())
          .filter(Boolean) as string[]),
      );

      const nextCustomRecipe = state.customRecipe
        ? {
            ...state.customRecipe,
            recipe:
              typeof state.customRecipe.recipe === 'object' && nextRecipe
                ? nextRecipe
                : state.customRecipe.recipe,
            addedCustomProducts: this.cloneIngredients(
              ((state.customRecipe.addedCustomProducts || []) as CustomProduct[]).filter(
                (ingredient) => this.getProductId(ingredient) !== productId,
              ),
            ),
            modifiedBaseCustomProducts: (state.customRecipe.modifiedBaseCustomProducts || []).filter(
              (item) =>
                !removedBaseIds.has((item?.baseCustomProductId || '').toString()),
            ),
            removedBaseCustomProductIds: (state.customRecipe.removedBaseCustomProductIds || []).filter(
              (id: any) => !removedBaseIds.has((id?._id || id || '').toString()),
            ),
          }
        : null;

      const nextIngredients = this.cloneIngredients(
        state.ingredients.filter((ingredient) => this.getProductId(ingredient) !== productId),
      );

      const currentEditingIndex = state.editingIngredientIndex;
      const nextEditingIngredientIndex =
        typeof currentEditingIndex === 'number' &&
        currentEditingIndex >= nextIngredients.length
          ? null
          : currentEditingIndex;

      return {
        ...state,
        recipe: nextRecipe,
        customRecipe: nextCustomRecipe,
        ingredients: nextIngredients,
        editingIngredientIndex: nextEditingIngredientIndex,
      };
    });
  }

  public reset(): void {
    this._state.set(EMPTY_STATE);
  }

  private normalizeId(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value?._id) return value._id.toString();
    if (value?.name) return `name:${value.name}`;
    if (value?.date) return `date:${value.date}`;
    return null;
  }

  private cloneIngredients(ingredients: CustomProduct[]): CustomProduct[] {
    return (ingredients || []).map((ingredient) => this.cloneIngredient(ingredient));
  }

  private cloneIngredient(ingredient: CustomProduct): CustomProduct {
    return {
      ...ingredient,
      allergens: ingredient?.allergens ? [...ingredient.allergens] : undefined,
      traces: ingredient?.traces ? [...ingredient.traces] : undefined,
      product:
        typeof ingredient?.product === 'object' && ingredient.product
          ? { ...ingredient.product }
          : ingredient?.product,
    };
  }

  private cloneRecipe(recipe: Recipe | null): Recipe | null {
    if (!recipe) return null;

    return {
      ...recipe,
      customProducts: this.cloneIngredients(
        (recipe.customProducts || []) as CustomProduct[],
      ),
    };
  }

  private cloneCustomRecipe(customRecipe: CustomRecipe | null): CustomRecipe | null {
    if (!customRecipe) return null;

    return {
      ...customRecipe,
      recipe:
        typeof customRecipe.recipe === 'object' && customRecipe.recipe
          ? this.cloneRecipe(customRecipe.recipe)
          : customRecipe.recipe,
      addedCustomProducts: this.cloneIngredients(
        (customRecipe.addedCustomProducts || []) as CustomProduct[],
      ),
      modifiedBaseCustomProducts: (customRecipe.modifiedBaseCustomProducts || []).map(
        (item) => ({
          ...item,
          allergens: item?.allergens ? [...item.allergens] : undefined,
          traces: item?.traces ? [...item.traces] : undefined,
        }),
      ),
      removedBaseCustomProductIds: [
        ...(customRecipe.removedBaseCustomProductIds || []),
      ],
    };
  }

  private cloneMeal(meal: Meal | null): Meal | null {
    if (!meal) return null;
    return {
      ...meal,
      customProducts: this.cloneIngredients((meal.customProducts || []) as CustomProduct[]),
      customRecipes: [...(meal.customRecipes || [])],
    };
  }

  private cloneDietDay(dietDay: DietDay | null): DietDay | null {
    if (!dietDay) return null;
    return {
      ...dietDay,
      meals: [...(dietDay.meals || [])],
    };
  }

  private getProductId(ingredient: Partial<CustomProduct> | null | undefined): string | null {
    const product = ingredient?.product as any;
    return product?._id?.toString?.() || product?.toString?.() || null;
  }
}
