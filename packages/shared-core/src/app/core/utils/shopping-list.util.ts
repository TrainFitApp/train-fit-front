/**
 * Lista de la compra — modelos y la suma con el reparto que elige quien la
 * mira (cuántos días de cada menú, qué alternativa de cada comida).
 *
 * PURO y sin imports, como body-metrics.util.ts, para probarlo con node:test.
 * `aggregateShopping` es ESPEJO de
 * train-fit-back/components/dietDays/shopping-list-service.js#aggregateShopping:
 * si tocas una, toca la otra (shopping-list.test.js prueba los mismos casos).
 * El servidor ya manda `items` sumado con el reparto por defecto; esto solo
 * recalcula al cambiarlo, sin volver a pedir.
 */

export interface ShoppingListItem {
  name: string;
  // Siempre en gramos (o ml): la unidad en que CustomProduct guarda las
  // cantidades.
  quantity: number;
  // En cuántos días del reparto aparece.
  dayCount: number;
}

export interface ShoppingAlternative {
  label: string;
  // Lo de UN día de esa alternativa, ya sumado por producto.
  items: { key: string; name: string; quantity: number }[];
}

export interface ShoppingMeal {
  slot: string;
  alternatives: ShoppingAlternative[];
}

export interface ShoppingMenu {
  name: string;
  // Días del tramo en que el cliente ya eligió este menú.
  chosenDays: number;
  // Reparto por defecto: lo elegido + el resto a partes iguales.
  defaultDays: number;
  meals: ShoppingMeal[];
}

// Un tramo por versión del contenido de una fase: una semana preparada o una
// fase nueva dentro del rango cambian lo que se come y abren tramo.
export interface ShoppingSegment {
  id: string;
  name: string;
  from: string;
  to: string;
  days: number;
  menus: ShoppingMenu[];
}

export interface ShoppingList {
  items: ShoppingListItem[];
  // Días del rango que REALMENTE tienen plan (sin saltados ni huecos).
  daysWithPlan: number;
  segments: ShoppingSegment[];
  period: { from: string; to: string } | null;
}

export interface ShoppingSegmentSelection {
  menuDays: Record<string, number>;
  // "menú|slot" → índice de la alternativa.
  alternatives: Record<string, number>;
}

export type ShoppingSelection = Record<string, ShoppingSegmentSelection>;

export function alternativeKey(menu: ShoppingMenu, meal: ShoppingMeal): string {
  return `${menu.name}|${meal.slot}`;
}

export function defaultShoppingSelection(segments: ShoppingSegment[]): ShoppingSelection {
  const selection: ShoppingSelection = {};
  for (const segment of segments || []) {
    const menuDays: Record<string, number> = {};
    for (const menu of segment.menus) menuDays[menu.name] = menu.defaultDays || 0;
    selection[segment.id] = { menuDays, alternatives: {} };
  }
  return selection;
}

/** Días del tramo que quedan sin menú con este reparto. */
export function unassignedDays(segment: ShoppingSegment, selection: ShoppingSelection): number {
  const menuDays = selection[segment.id]?.menuDays || {};
  const used = segment.menus.reduce((acc, menu) => acc + (menuDays[menu.name] || 0), 0);
  return segment.days - used;
}

export function aggregateShopping(
  segments: ShoppingSegment[],
  selection: ShoppingSelection = {}
): ShoppingListItem[] {
  const byKey = new Map<string, { name: string; quantity: number; dayCount: number; lastDays: string | null }>();
  for (const segment of segments || []) {
    const chosen = selection[segment.id];
    for (const menu of segment.menus || []) {
      const days = chosen?.menuDays?.[menu.name] ?? menu.defaultDays ?? 0;
      if (!(days > 0)) continue;
      for (const meal of menu.meals || []) {
        const index = chosen?.alternatives?.[alternativeKey(menu, meal)] ?? 0;
        const alternative = meal.alternatives[index] || meal.alternatives[0];
        for (const item of alternative?.items || []) {
          const current = byKey.get(item.key) || { name: item.name, quantity: 0, dayCount: 0, lastDays: null };
          current.quantity += item.quantity * days;
          // Un producto en dos comidas del mismo menú cuenta sus días una vez.
          const dayKey = `${segment.id}|${menu.name}`;
          if (current.lastDays !== dayKey) current.dayCount += days;
          current.lastDays = dayKey;
          byKey.set(item.key, current);
        }
      }
    }
  }
  return [...byKey.values()]
    .map(({ name, quantity, dayCount }) => ({ name, quantity: Math.round(quantity * 10) / 10, dayCount }))
    .sort((a, b) => b.quantity - a.quantity || a.name.localeCompare(b.name, 'es'));
}

// Valor del desplegable de menús que no filtra. Los nombres de menú los pone
// el profesional, pero este no lo va a escribir nadie.
export const ALL_SHOPPING_MENUS = '__all__';

// Menú que se mira en cada tramo (id del tramo → nombre). Sin entrada o con
// ALL_SHOPPING_MENUS, todos.
export type ShoppingMenuFilter = Record<string, string>;

/**
 * La lista que se enseña: en los tramos con un menú elegido en el
 * desplegable, solo lo de ese menú con sus días; en el resto, todo. Recorta
 * la VISTA, no el reparto: los días de los demás menús no se tocan y vuelven
 * a contar al elegir «Todos». Solo existe en la app (el servidor manda la
 * lista entera), así que no tiene espejo en el back.
 */
export function aggregateShoppingView(
  segments: ShoppingSegment[],
  selection: ShoppingSelection,
  menuFilter: ShoppingMenuFilter
): ShoppingListItem[] {
  const view: ShoppingSelection = {};
  for (const segment of segments || []) {
    const chosen = selection[segment.id];
    const only = menuFilter[segment.id];
    if (!only || only === ALL_SHOPPING_MENUS) {
      if (chosen) view[segment.id] = chosen;
      continue;
    }
    const menuDays: Record<string, number> = {};
    for (const menu of segment.menus) {
      menuDays[menu.name] = menu.name === only ? chosen?.menuDays?.[menu.name] ?? menu.defaultDays ?? 0 : 0;
    }
    view[segment.id] = { menuDays, alternatives: chosen?.alternatives || {} };
  }
  return aggregateShopping(segments, view);
}

// Por encima del kilo en kg: "3400 g de pollo" obliga a dividir de cabeza.
// `format` pinta el número en el idioma de la app («3,4 kg»); este fichero
// no importa nada para poder probarse tal cual con node.
export function shoppingQuantityLabel(quantity: number, format: (value: number) => string = String): string {
  if (quantity >= 1000) return `${format(Math.round(quantity / 100) / 10)} kg`;
  return `${format(quantity)} g`;
}
