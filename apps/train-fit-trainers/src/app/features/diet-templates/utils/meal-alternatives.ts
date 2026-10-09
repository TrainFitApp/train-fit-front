import { TemplateFoodItem, TemplateMeal, TemplateMealAlternative } from '../models/diet-template.model';

// Abrir el editor de una celda vacía le mete una opción sin alimentos para
// que haya dónde añadir, y "Añadir opción" o borrar el último alimento dejan
// otras igual. Una opción así no es contenido: la comida solo existe por lo
// que se le añade, así que ni se valida ni se guarda.
export function filledAlternatives(meal: TemplateMeal): TemplateMealAlternative[] {
  return (meal.alternatives || []).filter((alt) => (alt.items || []).length > 0);
}

// Al cerrar el editor la celda se queda solo con lo que tiene alimentos: si
// no se añadió nada (o se borró todo), vuelve a estar vacía.
export function pruneEmptyAlternatives(meal: TemplateMeal): void {
  meal.alternatives = filledAlternatives(meal);
}

// Un alimento con la cantidad borrada no se puede guardar: el editor lo
// cuenta como 0 (una receta sin cantidad también) y el producto acababa
// guardado como 100 g sin que nadie lo hubiera puesto.
export function isMissingQuantity(item: TemplateFoodItem): boolean {
  return !!(item.productId || item.recipeId) && !(Number(item.quantity) > 0);
}
