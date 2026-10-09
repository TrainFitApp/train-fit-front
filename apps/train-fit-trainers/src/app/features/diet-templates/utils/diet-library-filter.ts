import { filterDietsByName } from './diet-name-search';

// PURO. Filtros de la biblioteca de plantillas de dieta (panel derecho, los
// mismos chips que el cajón "Empezar fase"), aplicados en el navegador sobre
// la lista que ya trae `GET /trainer/diet-templates?includeOwned=true`.

export type LibraryDietFlag = 'vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree';
export type LibraryDietSource = 'general' | 'client' | 'verified';

export const LIBRARY_DIET_SOURCES: readonly LibraryDietSource[] = ['general', 'client', 'verified'];

export interface LibraryDiet {
  name?: string | null;
  trainerId?: string | null;
  ownerClientId?: string | null;
  verified?: boolean;
  suitableFor?: readonly string[] | null;
  suitableForOverride?: readonly string[] | null;
}

export interface LibraryDietFilters {
  query?: string | null;
  flags?: ReadonlySet<LibraryDietFlag>;
  // Vacío o con los tres = sin filtrar por origen.
  sources?: ReadonlySet<LibraryDietSource>;
  // Id del profesional que mira la biblioteca: "Añadidas por mí" son las
  // que creó él.
  trainerId?: string | null;
}

// Lo que se deduce de una aptitud: vegana ⇒ vegetariana y sin lactosa
// (mismo criterio que el back, dietTemplates/diet-suitability.js#IMPLIED_BY).
const IMPLIED_BY: Record<string, string[]> = { vegetarian: ['vegan'], lactoseFree: ['vegan'] };

// Aptitud efectiva: la que calcula el backend más la forzada a mano, con lo
// que se deduce de ellas.
export function effectiveSuitableFor(diet: LibraryDiet): string[] {
  const set = new Set([...(diet.suitableFor || []), ...(diet.suitableForOverride || [])]);
  for (const [flag, sources] of Object.entries(IMPLIED_BY)) {
    if (sources.some((source) => set.has(source))) set.add(flag);
  }
  return [...set];
}

// Orígenes de una dieta en la biblioteca. A diferencia del cajón "Empezar
// fase" no son disjuntos: "Añadidas por mí" son TODAS las que creó el
// profesional, también las que hizo para un cliente o marcó de fábrica.
// 'client' es "de cualquier cliente" (la biblioteca no mira a uno solo) y
// una de fábrica nunca cuenta como de cliente.
export function dietSources(diet: LibraryDiet, trainerId?: string | null): Set<LibraryDietSource> {
  const sources = new Set<LibraryDietSource>();
  if (trainerId && diet.trainerId === trainerId) sources.add('general');
  if (diet.verified) sources.add('verified');
  else if (diet.ownerClientId) sources.add('client');
  return sources;
}

export function filterDietLibrary<T extends LibraryDiet>(diets: readonly T[], filters: LibraryDietFilters): T[] {
  const flags = [...(filters.flags || [])];
  const sources = filters.sources;
  const bySource = !!sources?.size && sources.size < LIBRARY_DIET_SOURCES.length;
  return filterDietsByName(diets, filters.query).filter((diet) => {
    if (bySource && ![...dietSources(diet, filters.trainerId)].some((source) => sources!.has(source))) return false;
    if (!flags.length) return true;
    const suitable = effectiveSuitableFor(diet);
    return flags.every((flag) => suitable.includes(flag));
  });
}

// Cuántos filtros del panel hay activos (el número del botón de filtros en
// móvil). El texto del buscador no cuenta: se ve en la propia barra.
export function activeLibraryFilterCount(filters: LibraryDietFilters): number {
  const sources = filters.sources;
  const sourceFilter = !!sources?.size && sources.size < LIBRARY_DIET_SOURCES.length ? 1 : 0;
  return (filters.flags?.size || 0) + sourceFilter;
}
