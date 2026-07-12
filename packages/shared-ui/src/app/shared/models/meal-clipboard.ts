import { Meal } from 'src/app/core/models/meal';
import { CustomProduct } from 'src/app/core/models/customProduct';
import { CustomRecipe } from 'src/app/core/models/customRecipe';

export class MealClipboard {
  public mealClipboard: Meal;
  public mealToPaste: Meal;
  public selectedProducts: string[] = [];
  public selectedRecipes: string[] = [];
  public isFullMeal: boolean = true;

  constructor(mealClipboard: Meal, mealToPaste: Meal) {
    this.mealClipboard = mealClipboard;
    this.mealToPaste = mealToPaste;
  }

  public setFullMeal(): void {
    this.isFullMeal = true;
    this.selectedProducts = [];
    this.selectedRecipes = [];
  }

  public setPartialSelection(productIds: string[], recipeIds: string[]): void {
    this.isFullMeal = false;
    this.selectedProducts = productIds;
    this.selectedRecipes = recipeIds;
  }

  public getFilteredMeal(): Meal {
    if (this.isFullMeal || !this.mealClipboard) {
      return this.mealClipboard;
    }

    const filteredMeal = new Meal();
    filteredMeal._id = this.mealClipboard._id;
    filteredMeal.name = this.mealClipboard.name;
    filteredMeal.notes = this.mealClipboard.notes;

    if (this.mealClipboard.customProducts) {
      filteredMeal.customProducts = this.mealClipboard.customProducts.filter(
        (cp: CustomProduct) => this.selectedProducts.includes(cp._id)
      );
    }

    if (this.mealClipboard.customRecipes) {
      filteredMeal.customRecipes = this.mealClipboard.customRecipes.filter(
        (cr: CustomRecipe) => this.selectedRecipes.includes(cr._id)
      );
    }

    return filteredMeal;
  }

  public getSelectedProductsCount(): number {
    return this.isFullMeal 
      ? (this.mealClipboard?.customProducts?.length ?? 0)
      : this.selectedProducts.length;
  }

  public getSelectedRecipesCount(): number {
    return this.isFullMeal
      ? (this.mealClipboard?.customRecipes?.length ?? 0)
      : this.selectedRecipes.length;
  }

  public getTotalItemsCount(): number {
    return this.getSelectedProductsCount() + this.getSelectedRecipesCount();
  }

  public hasSelection(): boolean {
    return this.getTotalItemsCount() > 0;
  }
}