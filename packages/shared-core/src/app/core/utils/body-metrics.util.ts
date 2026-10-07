/**
 * Cuentas sobre el cuerpo del usuario: metabolismo basal (Mifflin-St Jeor),
 * con la que UserService calcula el objetivo, y edad a partir de la fecha de
 * nacimiento.
 *
 * TODO ES PURO: entran números, salen números. Nada de esto se GUARDA: son
 * valores derivados de medidas que ya están en Anthropometry y del perfil.
 *
 * Las funciones devuelven null cuando les falta algún dato, en vez de un 0 o
 * un NaN: "no lo sé" y "sale cero" son cosas distintas.
 *
 * SIN IMPORTS, a propósito: así se prueba con node:test (body-metrics.test.js)
 * sin arrancar Angular.
 */

// Espejo de SEX_TYPES.male (shared-ui/constants/sex, donde female = 0 y
// male = 1). Aquí como número suelto para que este módulo no dependa de
// nada; la correspondencia se comprueba en el test.
const MALE = 1;

export interface BodyInput {
  weightKg: number | null;
  heightCm: number | null;
  age: number | null;
  sex: number | null;
}

function isPositive(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function toFiniteOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const num = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  return Number.isFinite(num) ? num : null;
}

/**
 * Las fórmulas son estrictas (solo números), pero los formularios del
 * cliente —registro y editor de perfil— entregan peso y altura como string
 * ("70.5"). Sin esta conversión la basal salía null → 0 y el objetivo
 * calórico quedaba reducido al superávit/déficit.
 */
export function toBodyInput(raw: {
  weight: unknown;
  height: unknown;
  age: unknown;
  sex: unknown;
}): BodyInput {
  return {
    weightKg: toFiniteOrNull(raw.weight),
    heightCm: toFiniteOrNull(raw.height),
    age: toFiniteOrNull(raw.age),
    sex: toFiniteOrNull(raw.sex),
  };
}

function round(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Mifflin-St Jeor (1990). Más precisa (~5%) que Harris-Benedict en
 * poblaciones modernas.
 *   Hombres: (10 × peso) + (6,25 × altura) − (5 × edad) + 5
 *   Mujeres: (10 × peso) + (6,25 × altura) − (5 × edad) − 161
 */
export function bmrMifflinStJeor(input: BodyInput): number | null {
  const { weightKg, heightCm, age, sex } = input;
  if (!isPositive(weightKg) || !isPositive(heightCm) || !isPositive(age)) return null;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return round(sex === MALE ? base + 5 : base - 161, 0);
}

// --- Edad ---

// Edad cumplida a día de hoy. Aparte porque las tres fórmulas de basal la
// necesitan y un "años = hoy − nacimiento" ingenuo se equivoca en un año
// para quien aún no ha cumplido este año. `birth` es un día de calendario
// ("YYYY-MM-DD", sin hora ni huso) y "hoy" el del dispositivo; se comparan
// como texto ("MM-DD"), sin pasar por Date.
export function ageFromBirthDate(birth: string | null | undefined): number | null {
  if (!birth || !/^\d{4}-\d{2}-\d{2}$/.test(birth)) return null;
  const now = new Date();
  const todayMonthDay = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  let age = now.getFullYear() - Number(birth.slice(0, 4));
  if (todayMonthDay < birth.slice(5)) age -= 1;
  return age >= 0 && age < 130 ? age : null;
}
