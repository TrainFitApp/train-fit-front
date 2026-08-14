// TAREA5 (auditoría UX, Fase D) — "Componer para varios clientes": mismo
// alimento (producto/receta real, nunca macros a mano) para un grupo de
// clientes de una sola vez, en vez de repetir pautar comida cliente a
// cliente. Mismo shape "clipboard" que ya acepta mealModel.pasteMeal
// (customProducts/customRecipes), igual que client-detail y diet-template-
// builder.
export interface ComposeMealFoodItem {
  productId?: string;
  productName?: string;
  recipeId?: string;
  recipeName?: string;
  quantity?: number;
}

export interface BulkApplyResult {
  clientId: string;
  success: boolean;
  error?: string;
}
