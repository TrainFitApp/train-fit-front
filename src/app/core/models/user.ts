import { DayWeight } from '../../features/diet-days/components/weight-info/models/dayWeight';
import { ColorMode } from '../services/util/theme.service';
import { Diet } from './diet';
import { Table } from './table';

export class User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
  status: string;
  height: number;
  weight: number;
  birth: Date;
  sex: number;
  activity: number;
  objetive: number;
  steps: number;
  training: number;
  stepGoal: number;
  dietInUse: any;
  tableInUse: any;
  workoutInUse: any;
  diets: Diet[];
  tables: Table[];
  dayWeights: DayWeight[];
  ownTables: string[];
  access_token?: string;
  hash?: string;
  theme?: ColorMode;
  provider?: 'google' | 'apple';
  personalAds?: boolean;
  isPremium?: boolean;

  kcalCurrent?: number;
  proteinsGCurrent?: number;
  carbohydratesGCurrent?: number;
  fatGCurrent?: number;

  kcalTotal: number;
  proteinsGTotal: number;
  carbohydratesGTotal: number;
  fatGTotal: number;

  archivedDietDays?: string[];
  archivedProducts?: string[];

  archivedSplits?: string[];
  archivedWorkouts?: string[];
  archivedExercises?: string[];
  favoriteRecipes?: string[];
}
