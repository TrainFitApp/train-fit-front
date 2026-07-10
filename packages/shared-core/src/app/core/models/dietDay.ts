import { Meal } from './meal';

export class DietDay {
  _id: string;
  weight: number;
  date: string;
  notes: string;
  steps: number;
  meals: Meal[];

  kcal?: number;
  kcalTotal?: number;
  proteinsG?: number;
  proteinsGTotal?: number;
  carbohydratesG?: number;
  carbohydratesGTotal?: number;
  fatG?: number;
  fatGTotal?: number;
}
