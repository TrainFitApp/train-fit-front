import { CustomProduct } from './customProduct';

export interface Recipe {
  _id?: string;
  name: string;
  description?: string;
  customProducts?: CustomProduct[];
  verified?: boolean;
  // userId indica que la receta fue creada por el usuario (reemplaza ownRecipe)
  userId?: string;
}

// Helper para saber si una receta es del usuario
export function isUserRecipe(recipe: Recipe): boolean {
  return !!recipe.userId;
}
