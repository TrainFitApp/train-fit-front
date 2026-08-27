/**
 * Movimiento 3 Coach Pro — las cuentas que un entrenador hace a mano sobre
 * las medidas de un cliente: metabolismo basal, porcentaje graso a partir de
 * perímetros, masa magra y proporciones.
 *
 * TODO ES PURO: entran números, salen números. Sin servicios, sin HTTP, sin
 * modelos. Dos motivos concretos:
 *
 *   - Nada de esto se GUARDA. Son valores derivados de medidas que ya están
 *     en Anthropometry; persistirlos crearía una segunda versión de la
 *     verdad que se queda vieja en cuanto el cliente se vuelve a medir.
 *   - Mifflin-St Jeor ya vivía dentro de UserService (privado, acoplado a
 *     User) para calcular el objetivo del cliente. Al necesitarlo también la
 *     app del entrenador, la salida fácil era copiarlo. Se extrae aquí y
 *     UserService pasa a llamarlo, así que la fórmula existe UNA vez.
 *
 * Todas las funciones devuelven null cuando les falta algún dato, en vez de
 * un 0 o un NaN: "no lo sé" y "sale cero" son cosas distintas, y sobre estos
 * números un entrenador decide qué le manda comer a alguien.
 *
 * SIN IMPORTS, a propósito. Es lo que permite probarlo con el runner que el
 * proyecto ya tiene (node:test en el backend, ver body-metrics.test.js):
 * montar un segundo runner solo para el front sería una arquitectura
 * paralela para nueve funciones puras. De paso desaparece un import de
 * `shared-ui` desde `core`, que iba en la dirección equivocada entre capas.
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

function round(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

// --- Metabolismo basal ---

export type BmrFormulaKey = 'mifflin' | 'harris' | 'katch';

export interface BmrFormula {
  key: BmrFormulaKey;
  label: string;
  // Qué hace distinta a esta fórmula y cuándo conviene. Es lo que decide
  // cuál usar, y sin ello el selector sería tres nombres propios sueltos.
  note: string;
}

export const BMR_FORMULAS: BmrFormula[] = [
  {
    key: 'mifflin',
    label: 'Mifflin-St Jeor',
    note: 'La más fiable en población general. Es la que usa la app para calcular el objetivo del cliente.',
  },
  {
    key: 'harris',
    label: 'Harris-Benedict',
    note: 'La clásica (revisión de 1984). Suele dar algo más alto que Mifflin.',
  },
  {
    key: 'katch',
    label: 'Katch-McArdle',
    note: 'Parte de la masa magra, no del peso total. La mejor si tienes un % graso fiable; sin él no se puede calcular.',
  },
];

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

/**
 * Harris-Benedict, revisión de Roza y Shizgal (1984).
 *   Hombres: 88,362 + (13,397 × peso) + (4,799 × altura) − (5,677 × edad)
 *   Mujeres: 447,593 + (9,247 × peso) + (3,098 × altura) − (4,330 × edad)
 */
export function bmrHarrisBenedict(input: BodyInput): number | null {
  const { weightKg, heightCm, age, sex } = input;
  if (!isPositive(weightKg) || !isPositive(heightCm) || !isPositive(age)) return null;
  const value =
    sex === MALE
      ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
      : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  return round(value, 0);
}

/**
 * Katch-McArdle: 370 + (21,6 × masa magra en kg).
 *
 * No usa sexo ni edad porque no le hacen falta: la masa magra ya recoge esa
 * diferencia. A cambio exige conocerla, así que devuelve null sin ella —
 * estimarla a partir del peso sería volver a Mifflin por la puerta de atrás.
 */
export function bmrKatchMcArdle(leanMassKg: number | null): number | null {
  if (!isPositive(leanMassKg)) return null;
  return round(370 + 21.6 * leanMassKg, 0);
}

// --- Porcentaje graso ---

export type BodyFatMethodKey = 'navy' | 'deurenberg' | 'scale';

export interface BodyFatResult {
  method: BodyFatMethodKey;
  label: string;
  percentage: number;
  // Qué medidas ha usado, para que el entrenador sepa cuál revisar si el
  // número le chirría.
  from: string;
}

/**
 * Método de la Marina de EE. UU. (Hodgdon & Beckett), a partir de
 * perímetros. Es el que un entrenador puede aplicar con una cinta métrica y
 * sin báscula de bioimpedancia.
 *
 *   Hombres: 495 / (1,0324 − 0,19077·log10(cintura − cuello)
 *                          + 0,15456·log10(altura)) − 450
 *   Mujeres: 495 / (1,29579 − 0,35004·log10(cintura + cadera − cuello)
 *                           + 0,22100·log10(altura)) − 450
 *
 * La cadera solo la necesita la fórmula femenina.
 *
 * Devuelve null si la resta interna no es positiva (un cuello mayor que la
 * cintura, típico de una medida mal apuntada): el logaritmo daría NaN, y un
 * NaN paseando por la interfaz es peor que un hueco.
 */
export function bodyFatNavy(params: {
  sex: number | null;
  heightCm: number | null;
  neckCm: number | null;
  waistCm: number | null;
  hipCm?: number | null;
}): number | null {
  const { sex, heightCm, neckCm, waistCm, hipCm } = params;
  if (!isPositive(heightCm) || !isPositive(neckCm) || !isPositive(waistCm)) return null;

  if (sex === MALE) {
    const girth = waistCm - neckCm;
    if (girth <= 0) return null;
    const value =
      495 / (1.0324 - 0.19077 * Math.log10(girth) + 0.15456 * Math.log10(heightCm)) - 450;
    return isPositive(value) ? round(value) : null;
  }

  if (!isPositive(hipCm)) return null;
  const girth = waistCm + hipCm - neckCm;
  if (girth <= 0) return null;
  const value =
    495 / (1.29579 - 0.35004 * Math.log10(girth) + 0.221 * Math.log10(heightCm)) - 450;
  return isPositive(value) ? round(value) : null;
}

/**
 * Deurenberg (1991), a partir del IMC: solo necesita peso, altura, edad y
 * sexo. Menos fina que Navy —no mira dónde está la grasa— pero sirve cuando
 * no hay perímetros apuntados.
 *
 *   %graso = 1,20·IMC + 0,23·edad − 10,8·(1 si hombre, 0 si mujer) − 5,4
 */
export function bodyFatDeurenberg(input: BodyInput): number | null {
  const { weightKg, heightCm, age, sex } = input;
  if (!isPositive(weightKg) || !isPositive(heightCm) || !isPositive(age)) return null;
  // IMC SIN redondear: bmi() redondea a un decimal para enseñarlo, y meter
  // ese valor ya recortado en la fórmula arrastra el error al resultado.
  const bmiValue = weightKg / (heightCm / 100) ** 2;
  const value = 1.2 * bmiValue + 0.23 * age - 10.8 * (sex === MALE ? 1 : 0) - 5.4;
  return isPositive(value) ? round(value) : null;
}

// --- Composición ---

export function bmi(weightKg: number | null, heightCm: number | null): number | null {
  if (!isPositive(weightKg) || !isPositive(heightCm)) return null;
  return round(weightKg / (heightCm / 100) ** 2, 1);
}

export function fatMassFromPercentage(
  weightKg: number | null,
  bodyFatPct: number | null
): number | null {
  if (!isPositive(weightKg) || !isPositive(bodyFatPct)) return null;
  return round((weightKg * bodyFatPct) / 100, 1);
}

export function leanMassFromPercentage(
  weightKg: number | null,
  bodyFatPct: number | null
): number | null {
  const fat = fatMassFromPercentage(weightKg, bodyFatPct);
  if (fat === null || !isPositive(weightKg)) return null;
  return round(weightKg - fat, 1);
}

// --- Gasto energético ---

/**
 * Gasto total = basal × factor de actividad.
 *
 * El factor sale de ACTIVITY_FACTOR (shared-ui), que ya existía y que usa la
 * app del cliente: dos escalas de actividad distintas darían dos objetivos
 * distintos para la misma persona según quién mire.
 */
export function totalEnergyExpenditure(
  bmrValue: number | null,
  activityFactor: number | null
): number | null {
  if (!isPositive(bmrValue) || !isPositive(activityFactor)) return null;
  return round(bmrValue * activityFactor, 0);
}

// --- Índices de proporción ---

export interface ProportionIndex {
  key: string;
  label: string;
  value: number;
  // La referencia clásica de ese índice, cuando existe. null = no hay una
  // cifra "buena" universal, solo la evolución del propio cliente.
  reference: number | null;
  referenceNote: string;
}

/**
 * Proporciones entre perímetros. Lo que le importa a un entrenador no es el
 * número absoluto de hoy sino cómo se mueve: una cintura que baja mientras
 * el pecho se mantiene no se ve mirando los dos por separado.
 *
 * Solo se devuelven los índices que se pueden calcular con las medidas que
 * REALMENTE hay apuntadas. Rellenar los que faltan con ceros invitaría a
 * leer como "malo" lo que solo es "no medido".
 */
export function proportionIndices(measurements: {
  chest?: number | null;
  waist?: number | null;
  hip?: number | null;
  bicepsContracted?: number | null;
  thighRelaxed?: number | null;
}): ProportionIndex[] {
  const { chest, waist, hip, bicepsContracted, thighRelaxed } = measurements;
  const indices: ProportionIndex[] = [];

  const push = (
    key: string,
    label: string,
    numerator: number | null | undefined,
    denominator: number | null | undefined,
    reference: number | null,
    referenceNote: string
  ) => {
    if (!isPositive(numerator) || !isPositive(denominator)) return;
    indices.push({ key, label, value: round(numerator / denominator, 2), reference, referenceNote });
  };

  push(
    'chest_waist',
    'Pecho / cintura',
    chest,
    waist,
    1.4,
    'La proporción "en V" clásica ronda 1,4. Más importante que acertarla es hacia dónde se mueve.'
  );
  push(
    'arm_waist',
    'Brazo / cintura',
    bicepsContracted,
    waist,
    null,
    'Sin referencia universal: sirve para ver si el brazo crece mientras la cintura no.'
  );
  push(
    'waist_hip',
    'Cintura / cadera',
    waist,
    hip,
    null,
    'Índice de salud reconocido. Por debajo de 0,90 en hombres y 0,85 en mujeres se considera bajo riesgo (OMS).'
  );
  push(
    'thigh_waist',
    'Muslo / cintura',
    thighRelaxed,
    waist,
    null,
    'Sin referencia universal: útil para seguir el desarrollo del tren inferior frente al abdomen.'
  );

  return indices;
}

// --- Edad ---

// Edad cumplida a día de hoy. Aparte porque las tres fórmulas de basal la
// necesitan y un "años = hoy − nacimiento" ingenuo se equivoca en un año
// para quien aún no ha cumplido este año.
export function ageFromBirthDate(birth: string | Date | null | undefined): number | null {
  if (!birth) return null;
  const birthDate = new Date(birth);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDelta = today.getMonth() - birthDate.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age >= 0 && age < 130 ? age : null;
}
