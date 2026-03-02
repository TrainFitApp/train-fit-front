import { CustomProduct } from './customProduct';
import { DataRecipe } from './dataRecipe';

/**
 * CustomRecipeInstance - Instancia de una receta en una MEAL
 *
 * Una CustomRecipeInstance representa una receta específica que fue añadida
 * a una comida (Meal), con los cambios locales respecto a la receta original.
 *
 * Estructura:
 * CustomRecipeInstance
 * ├── dataRecipe → DataRecipe → Recipe (INMUTABLE)
 * ├── quantity: 300 (gramos de receta que se añaden)
 * ├── customProductsOverrides (SOLO cambios)
 * └── additionalCustomProducts (nuevos ingredientes en esta meal)
 *
 * Flujo:
 * 1. Se selecciona una DataRecipe (plantilla)
 * 2. Se crea una CustomRecipeInstance referenciando esa DataRecipe
 * 3. Si se modifica un ingrediente, se guarda en customProductsOverrides
 * 4. Si se añade un ingrediente, se guarda en additionalCustomProducts
 * 5. Los cálculos de macros se hacen mergeando todos estos datos
 */

export interface CustomRecipeInstance {
  _id?: string;
  // REFERENCIA a DataRecipe (plantilla)
  dataRecipe: DataRecipe | string;
  // Cantidad de receta que se añade a la meal (en gramos)
  quantity: number;
  // Overrides: cambios respecto a los CustomProducts originales
  customProductsOverrides?: CustomProductOverride[];
  // Ingredientes adicionales específicos de esta instancia
  additionalCustomProducts?: CustomProduct[];
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Override de un CustomProduct original
 * Solo se guarda si cambió algo respecto a la receta original
 */
export interface CustomProductOverride {
  // ID del CustomProduct original en la Recipe
  customProductId: string;
  // Nueva cantidad (null/undefined = usar cantidad original)
  quantity?: number | null;
  // true = excluir este ingrediente de la comida
  removed?: boolean;
}

/**
 * DTO para crear una CustomRecipeInstance
 * (Añadir una receta a una meal)
 */
export interface CreateCustomRecipeInstanceDTO {
  dataRecipeId: string; // ID de la DataRecipe
  quantity: number; // Gramos de receta que se añaden
  customProductsOverrides?: CustomProductOverride[];
  additionalCustomProducts?: CustomProduct[];
}

/**
 * DTO para actualizar una CustomRecipeInstance
 * (Modificar una receta en una meal)
 */
export interface UpdateCustomRecipeInstanceDTO {
  quantity?: number;
  customProductsOverrides?: CustomProductOverride[];
  additionalCustomProducts?: CustomProduct[];
}
