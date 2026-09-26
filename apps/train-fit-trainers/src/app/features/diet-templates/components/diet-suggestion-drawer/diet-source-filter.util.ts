// PURO. Chips de ORIGEN del cajón "Empezar fase": "Todas" + uno por origen.
// Con "Todas" activo ningún chip individual se pinta como marcado, así que
// tocar uno significa "solo este" (no "quitar este"). Con un subconjunto, tocar
// alterna. Quitar el último vuelve a "Todas": sin origen el backend tampoco
// filtra.
export function nextSources<T>(current: ReadonlySet<T>, clicked: T, all: readonly T[]): Set<T> {
  if (current.size === all.length) return new Set([clicked]);
  const next = new Set(current);
  if (!next.delete(clicked)) next.add(clicked);
  return next.size ? next : new Set(all);
}
