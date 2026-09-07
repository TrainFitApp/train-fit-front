import { CustomProduct } from './customProduct';
import { Recipe } from './recipe';

export interface ModifiedBaseCustomProduct extends Partial<CustomProduct> {
  baseCustomProductId: string | CustomProduct;
  quantity: number;
}

export interface CustomRecipe {
  _id?: string;
  recipe: Recipe | string;
  quantity?: number;
  quantityCooked?: number;
  addedCustomProducts?: CustomProduct[];
  modifiedBaseCustomProducts?: ModifiedBaseCustomProduct[];
  removedBaseCustomProductIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  // Pautado por trainer (ver custom-recipe-schema.js backend) — mismo
  // criterio que CustomProduct.assignedByTrainerId.
  assignedByTrainerId?: string | null;
  // Cantidad ORIGINAL pautada, fija — mismo criterio que
  // CustomProduct.assignedQuantity (ver ese comentario).
  assignedQuantity?: number | null;
  consumed?: boolean;
}

export interface CreateCustomRecipeDTO {
  recipe: string;
  quantity?: number;
  quantityCooked?: number;
  addedCustomProducts?: CustomProduct[];
  modifiedBaseCustomProducts?: ModifiedBaseCustomProduct[];
  removedBaseCustomProductIds?: string[];
}

export interface UpdateCustomRecipeDTO {
  quantity?: number;
  quantityCooked?: number;
  addedCustomProducts?: CustomProduct[];
  modifiedBaseCustomProducts?: ModifiedBaseCustomProduct[];
  removedBaseCustomProductIds?: string[];
}
