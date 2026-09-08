export const PRODUCT_FILTERS = {
  own: 'own',
  shield: 'shield',
  fav: 'fav',
  // Lo que el profesional ha pautado en la comida que se está editando. A
  // diferencia de los otros tres, no viaja al backend: se resuelve en el
  // cliente sobre meal.customProducts/customRecipes (ver
  // search-foods.page.ts#applyPautadoFilter).
  pautado: 'pautado',
} as const;
