// Fase 5 Coach Pro — espejo de components/foodExchanges/ (backend).
//
// Regla de fondo (§16): el sistema NO calcula equivalencias. No deduce que
// 100 g de pollo equivalen a 120 g de pavo — eso depende del criterio del
// coach (¿iguala proteína? ¿calorías?) y del cliente concreto. Aquí solo se
// guarda lo que el coach decide.

import { IProduct } from 'src/app/core/models/product';

export interface FoodExchangeItem {
  _id?: string;
  // Vincular el alimento al catálogo real es OPCIONAL y siempre lo será: un
  // coach puede querer escribir "Pan integral" sin buscarlo, y un grupo de
  // texto sigue siendo un grupo válido. Lo que desbloquea vincularlo es poder
  // generar alternativas de una comida desde este grupo (ver
  // ExchangeGeneratorModalComponent): sin producto real no hay macros que
  // pautar, solo un nombre.
  productId?: string | null;
  // Solo de lectura, y solo lo rellena GET /trainer/food-exchanges — el
  // backend lo devuelve APARTE de productId a propósito, para que guardar sea
  // reenviar el item tal cual sin tener que aplanar nada. null = sin vincular,
  // o vinculado a un producto que ya no existe.
  product?: IProduct | null;
  name: string;
  quantity: number;
  unit: string;
  note?: string;
}

// Movimiento 5 Coach Pro — el criterio de equivalencia, en forma de número.
// Sigue sin romper la regla de arriba: esto NO convierte un alimento en
// otro. Lo que permite es que, cuando el coach YA ha decidido que su ración
// de hidratos son 15 g, la app le diga que un producto con 30 g por ración
// son 2 raciones. La aritmética la hace la app; la decisión, él.
export type ExchangeBasis = 'protein' | 'carbs' | 'fat' | 'kcal';

export const EXCHANGE_BASES: { key: ExchangeBasis; label: string; unit: string }[] = [
  { key: 'protein', label: 'Proteína', unit: 'g' },
  { key: 'carbs', label: 'Hidratos', unit: 'g' },
  { key: 'fat', label: 'Grasa', unit: 'g' },
  { key: 'kcal', label: 'Calorías', unit: 'kcal' },
];

export interface FoodExchangeGroup {
  _id: string;
  name: string;
  // Categoría libre, no un enum de tres macros: cada metodología nombra sus
  // grupos a su manera, y "Verduras libres" no es ninguno de los tres.
  category: string;
  // Con qué criterio son equivalentes. Es lo que evita que un intercambio se
  // malinterprete ("equivalen en proteína, no en calorías").
  equivalenceNote: string;
  // null = grupo sin base numérica: se comporta exactamente como hasta
  // ahora, una lista de equivalencias escritas a mano.
  basis?: ExchangeBasis | null;
  // Cuánto de `basis` tiene UNA ración (15 g de hidratos, 90 kcal...). Sin
  // basis no significa nada, y por eso van juntos.
  basisAmount?: number | null;
  items: FoodExchangeItem[];
  createdAt: string;
  updatedAt: string;
}

// Sugerencias, no un catálogo cerrado: se ofrecen para no partir de una
// pantalla en blanco, pero el coach puede escribir la suya.
export const EXCHANGE_CATEGORY_SUGGESTIONS = [
  'Proteína',
  'Carbohidrato',
  'Grasa',
  'Verdura',
  'Fruta',
  'Lácteo',
];

export const EXCHANGE_UNITS = ['g', 'ml', 'ud', 'cda', 'taza'];
