import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DietDay } from 'src/app/core/models/dietDay';
import { Meal } from 'src/app/core/models/meal';
import { Recipe } from 'src/app/core/models/recipe';
import { User } from 'src/app/core/models/user';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;
  @Input() meal: Meal;
  @Input() dietDay: DietDay;
  @Input() user: User;

  @Output() toggle = new EventEmitter<Recipe>();
  @Output() edit = new EventEmitter<Recipe>();
  @Output() remove = new EventEmitter<Recipe>();

  public macros: { kcal: number; protein: number; carbs: number; fat: number };
  public topIngredients: string;
  public isFavorite: boolean = false;
  public isChecked: boolean = false;
  public instanceQuantity: number | null = null;

  constructor(private recipeService: RecipeService) {}

  public ngOnInit(): void {
    this.calculateMacros();
    this.setTopIngredients();
    this.checkFavorite();
    this.checkIsChecked();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.meal) {
      console.log('[RECIPE-CARD] Meal changed, rechecking:', this.recipe.name);
      this.checkIsChecked();
    }
  }

  private checkIsChecked(): void {
    if (!this.meal?.customRecipeInstances) {
      this.isChecked = false;
      this.instanceQuantity = null;
      console.log(
        '[RECIPE-CARD]',
        this.recipe.name,
        'not checked - no instances in meal'
      );
      return;
    }

    const foundInstance = this.meal.customRecipeInstances.find((instance) => {
      const dataRecipe =
        typeof instance.dataRecipe === 'object' ? instance.dataRecipe : null;
      if (!dataRecipe) return false;

      const recipe =
        typeof dataRecipe.recipe === 'object' ? dataRecipe.recipe : null;
      if (!recipe) return false;

      const recipeId = recipe._id;
      return recipeId === this.recipe?._id;
    });

    this.isChecked = !!foundInstance;
    this.instanceQuantity = foundInstance?.quantity || null;

    console.log(
      '[RECIPE-CARD]',
      this.recipe.name,
      'isChecked:',
      this.isChecked
    );
  }

  private calculateMacros(): void {
    this.macros = this.recipeService.calculateRecipeMacros(this.recipe);
  }

  private setTopIngredients(): void {
    this.topIngredients = this.recipeService.getTopIngredients(this.recipe, 3);
  }

  private checkFavorite(): void {
    this.isFavorite =
      this.user?.archivedRecipes?.includes(this.recipe._id) ?? false;
  }

  public onCardClick(): void {
    // Click on card always goes to add/edit mode
    this.toggle.emit(this.recipe);
  }

  public onCheckboxClick(event: Event): void {
    // Stop propagation so card click doesn't fire
    event.stopPropagation();

    // If checked, remove from meal
    if (this.isChecked) {
      this.remove.emit(this.recipe);
    } else {
      // If not checked, add to meal (same as card click)
      this.toggle.emit(this.recipe);
    }
  }

  public onEditClick(event: Event): void {
    event.stopPropagation();
    this.edit.emit(this.recipe);
  }
}
