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

  // --- Solo lectura, lo añade GET /trainer/food-exchanges ---
  /** Las macros reales de ESTE alimento en la cantidad escrita. null = no comprobable. */
  macros?: ExchangeServing | null;
  /** Cuánto se desvía del anchor del grupo. */
  deviation?: ExchangeItemDeviation | null;
  /** El veredicto ya masticado: la plantilla no debe decidir comparando números. */
  check?: ExchangeItemCheck;
}

// Qué iguala el grupo. Sigue sin romper la regla de arriba: esto NO convierte
// un alimento en otro. Es el criterio que el entrenador declara, y el macro
// que la verificación exige clavado en cada alimento — los otros tres se
// informan pero no se exigen, porque igualar proteína hace que la grasa varíe
// necesariamente y marcar eso como error sería marcar el método.
export type ExchangeBasis = 'protein' | 'carbs' | 'fat' | 'kcal';

export const EXCHANGE_BASES: { key: ExchangeBasis; label: string; unit: string }[] = [
  { key: 'protein', label: 'Proteína', unit: 'g' },
  { key: 'carbs', label: 'Hidratos', unit: 'g' },
  { key: 'fat', label: 'Grasa', unit: 'g' },
  { key: 'kcal', label: 'Calorías', unit: 'kcal' },
];

// El perfil COMPLETO de una ración. Sustituye a `basisAmount`, que era una
// sola cifra — y con una sola cifra el reparto del día no se puede comparar
// contra las kcal ni contra los otros dos macros del objetivo.
export interface ExchangeServing {
  kcal: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
}

// Qué papel juega el grupo al proponer el reparto del día. No se deduce del
// anchor: un grupo puede igualar proteína y ser el lácteo del reparto.
export type ExchangeRole = 'carb' | 'protein' | 'fat' | 'vegetable' | 'fruit' | 'dairy';

export const EXCHANGE_ROLES: { key: ExchangeRole; label: string }[] = [
  { key: 'carb', label: 'Hidratos' },
  { key: 'protein', label: 'Proteína' },
  { key: 'fat', label: 'Grasa' },
  { key: 'vegetable', label: 'Verdura' },
  { key: 'fruit', label: 'Fruta' },
  { key: 'dairy', label: 'Lácteo' },
];

// El veredicto de un alimento contra el criterio del grupo, calculado en el
// backend (food-exchange-controller.js#withVerification) porque ahí ya están
// los productos poblados. Todo de solo lectura: nada de esto se guarda.
export type ExchangeItemCheck = 'ok' | 'off' | 'unknown' | 'no-anchor';

export interface ExchangeItemDeviation {
  macro: ExchangeBasis;
  actual: number;
  expected: number;
  pct: number;
}

export type ExchangeGroupStatus = 'ready' | 'incomplete' | 'no-anchor' | 'free';

export interface FoodExchangeGroup {
  _id: string;
  name: string;
  // Categoría libre, no un enum de tres macros: cada metodología nombra sus
  // grupos a su manera, y "Verduras libres" no es ninguno de los tres.
  category: string;
  // Con qué criterio son equivalentes. Es lo que evita que un intercambio se
  // malinterprete ("equivalen en proteína, no en calorías").
  equivalenceNote: string;
  // LEGACY — los deriva el backend desde anchor/serving en cada guardado,
  // para las apps ya publicadas. No escribas contra ellos.
  basis?: ExchangeBasis | null;
  basisAmount?: number | null;

  /** Qué iguala el grupo. null = sin criterio declarado. */
  anchor?: ExchangeBasis | null;
  /** Las cuatro macros de UNA ración. Cada una null por separado. */
  serving?: ExchangeServing | null;
  /** `manual` no se recalcula solo nunca; `computed` sale de los productos. */
  servingSource?: 'manual' | 'computed';
  /** Cuánto puede desviarse un alimento del anchor antes de marcarse. */
  tolerancePct?: number;
  /** El grupo que no se pesa: fuera del cuadre, y eso NO es que le falte el perfil. */
  freeQuantity?: boolean;
  /** Su papel al proponer el reparto del día. */
  role?: ExchangeRole | null;

  // --- Solo lectura, lo añade GET /trainer/food-exchanges ---
  status?: ExchangeGroupStatus;
  /** Lo que dice el catálogo, aparte de lo que declaró él. Verlos juntos permite corregir con criterio. */
  servingComputed?: ExchangeServing | null;
  linkedCount?: number;
  offCount?: number;
  /** La dispersión real entre alimentos: la calidad del grupo. */
  kcalRange?: { min: number; max: number } | null;

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
