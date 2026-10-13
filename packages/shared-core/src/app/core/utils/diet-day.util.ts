import { DietDay } from '../models/dietDay';

// ¿Hay algo en el día que copiar o borrar? Que el día tenga `_id` no lo dice:
// el back lo crea al abrir la fecha (POST /dietdays/date/:date) y borrarlo
// vuelve a crearlo vacío en la recarga, así que un día sin nada también llega
// con `_id`. Cuenta lo que se ha dejado en él: un alimento, una receta o una
// nota, del día o de una comida. Es el mismo criterio que la tarjeta de
// comida, que solo ofrece copiar y borrar cuando tiene alimentos o recetas.
export function dietDayHasContent(dietDay: DietDay | null | undefined): boolean {
  if (!dietDay) return false;
  if (dietDay.notes) return true;
  return (dietDay.meals || []).some(
    (meal) => !!meal?.customProducts?.length || !!meal?.customRecipes?.length || !!meal?.notes
  );
}
