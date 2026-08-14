// TAREA5 (auditoría UX, Fase C) — pieza de comida reutilizable ("Desayuno
// alto en proteína"), guardada una vez e insertable en 1 clic en cualquier
// celda del tablero semanal o al pautar comida a un cliente. Mismo formato
// "clipboard" que DietTemplate.
export interface MealSnippet {
  _id: string;
  trainerId: string;
  name: string;
  customProducts: Record<string, unknown>[];
  customRecipes: unknown[];
  createdAt: string;
}
