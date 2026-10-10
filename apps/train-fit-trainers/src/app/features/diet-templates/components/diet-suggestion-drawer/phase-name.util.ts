// PURO — el nombre con el que arranca la fase al elegir dieta en el cajón de
// sugerencias. QA 2026-10-09: se quedaba en «Nueva fase» aunque se eligiera
// una plantilla. Ahora hereda el de la dieta, salvo que el profesional ya lo
// haya escrito a mano.

/**
 * `current`: lo que pone ahora el campo. `lastSuggested`: lo último que puso
 * la app (el por defecto o el de otra dieta). Si coinciden (o está vacío), el
 * campo no es del profesional y se sustituye; si no, devuelve null (se deja
 * lo que escribió).
 */
export function suggestedPhaseName(
  current: string,
  lastSuggested: string,
  defaultName: string,
  templateName: string | null | undefined
): string | null {
  const typed = (current || '').trim();
  const untouched = !typed || typed === lastSuggested.trim() || typed === defaultName.trim();
  if (!untouched) return null;
  return (templateName || '').trim() || defaultName;
}
