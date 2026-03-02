import { Recipe } from './recipe';

/**
 * DataRecipe - Plantilla de receta reutilizable
 * Una DataRecipe es una plantilla que referencia una Recipe inmutable
 * y puede ser reutilizada en múltiples Meals sin duplicar datos
 *
 * Estructura:
 * DataRecipe → Recipe (INMUTABLE) → CustomProduct[] (INMUTABLE)
 */
export interface DataRecipe {
  _id?: string;
  // REFERENCIA INMUTABLE a Recipe
  recipe: Recipe | string;
  // Cantidad cruda en gramos (opcional)
  quantity?: number;
  // Cantidad tras cocinar en gramos (opcional)
  quantityCooked?: number;
}

/**
 * DTO para crear una DataRecipe
 */
export interface CreateDataRecipeDTO {
  recipeId: string; // ID de la Recipe
  quantity?: number;
  quantityCooked?: number;
}

/**
 * DTO para actualizar una DataRecipe
 * NOTA: recipe NO se puede cambiar (es referencia inmutable)
 */
export interface UpdateDataRecipeDTO {
  quantity?: number;
  quantityCooked?: number;
}

// Response para búsqueda de recetas
export interface RecipeSearchResponse {
  recipes: Recipe[];
  total: number;
  page: number;
  limit: number;
}
