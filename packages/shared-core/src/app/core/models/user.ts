import { DayWeight } from 'src/app/features/diet-days/components/weight-info/models/dayWeight';
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
  dayWeights: DayWeight[];
  tables: string[];
  access_token?: string;
  hash?: string;
  theme?: ColorMode;
  lang?: 'es' | 'en';
  provider?: 'google' | 'apple';
  personalAds?: boolean;
  premium?: {
    entitled?: boolean;
    plan?: 'monthly' | 'annual' | 'manual' | 'unknown' | string | null;
    expiresAt?: string | Date;
    source?: string;
    lastSyncAt?: string | Date;
  };

  goalInUse?: string;

  onboarding?: {
    pendingTutorials?: string[];
    lastSyncAt?: string | Date;
  };

  archivedProducts?: string[];
  archivedRecipes?: string[];
  archivedExercises?: string[];
  lastLogin?: string | Date;
}
