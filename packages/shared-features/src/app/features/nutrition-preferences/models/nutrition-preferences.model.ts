// F29 — preferencias nutricionales del cliente (alergias, favoritos, no le
// gusta, si cocina en casa). Un único documento por cliente, no por relación
// trainer-cliente.
export type CooksAtHome = 'yes' | 'no' | 'sometimes';

export interface NutritionPreferences {
  clientId: string;
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  cooksAtHome: CooksAtHome | null;
  requestedAt: string | null;
  requestedBy: string | null;
  respondedAt: string | null;
}
