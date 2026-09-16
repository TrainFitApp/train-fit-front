// Icono + color por restricción dietética (vegan/vegetarian/lactoseFree/
// glutenFree) — usado tanto en las cards de dieta (diet-card, sus chips de
// "apta para") como en el filtro de restricciones del cajón de sugerencias
// (diet-suggestion-drawer). Antes cada sitio pintaba el mismo flag como texto
// plano sin distinguirlos; un color+icono por flag hace que se reconozcan de
// un vistazo en vez de tener que leer la etiqueta.
export interface DietaryFlagUi {
  label: string;
  icon: string;
  colorClass: string;
}

export const DIETARY_FLAG_UI: Record<string, DietaryFlagUi> = {
  vegan: { label: 'Vegana', icon: 'leaf', colorClass: 'flag-vegan' },
  vegetarian: { label: 'Vegetariana', icon: 'leaf-outline', colorClass: 'flag-vegetarian' },
  lactoseFree: { label: 'Sin lactosa', icon: 'water-outline', colorClass: 'flag-lactose-free' },
  glutenFree: { label: 'Sin gluten', icon: 'ban-outline', colorClass: 'flag-gluten-free' },
};

export function dietaryFlagUi(flag: string): DietaryFlagUi {
  return DIETARY_FLAG_UI[flag] ?? { label: flag, icon: 'ellipse-outline', colorClass: 'flag-generic' };
}
