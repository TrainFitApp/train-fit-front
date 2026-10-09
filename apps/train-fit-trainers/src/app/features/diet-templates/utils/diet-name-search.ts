// PURO. Buscador por nombre de las listas de dietas (biblioteca y "Elige una
// dieta para la fase"). Sin distinguir mayúsculas ni acentos ("Definicion"
// encuentra "Definición") y cada palabra escrita tiene que aparecer en el
// nombre, en cualquier orden ("volumen 3000" encuentra "3000 kcal volumen").
// Filtra sin reordenar: en el selector se conserva el ranking.

function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export function filterDietsByName<T extends { name?: string | null }>(diets: readonly T[], query: string | null | undefined): T[] {
  const words = fold(query || '')
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return [...diets];
  return diets.filter((diet) => {
    const name = fold(diet.name || '');
    return words.every((word) => name.includes(word));
  });
}
