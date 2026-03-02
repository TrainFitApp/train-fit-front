import { Meal } from '../../core/models/meal';

export class MealClipboard {
  public mealClipboard: Meal;
  public mealToPaste: Meal;

  constructor(mealClipboard: Meal, mealToPaste: Meal) {
    this.mealClipboard = mealClipboard;
    this.mealToPaste = mealToPaste;
  }
}
