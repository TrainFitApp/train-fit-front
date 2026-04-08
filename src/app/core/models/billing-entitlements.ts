export interface BillingEntitlements {
  isPremium: boolean;
  source: string | null;
  plan: string | null;
  expiresAt: string | null;
  limits: {
    routines: number | null;
    microcyclesPerRoutine: number | null;
    customExercises: number | null;
    recipes: number | null;
  };
  usage: {
    routines: number;
    customExercises: number;
    recipes: number;
  };
  remaining: {
    routines: number | null;
    customExercises: number | null;
    recipes: number | null;
  };
  adsEnabled: boolean;
}
