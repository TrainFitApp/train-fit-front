// Lógica de pantalla del asistente, sin Angular: el humor de la mascota, el
// tono de la barra de ATP, a qué ruta lleva cada pantalla en cada app y el
// total de lo que se va a apuntar con lo elegido.
// Probado en assistant-view.util.test.js.

/** Un día de calendario "YYYY-MM-DD" desplazado `days` días (aritmética de calendario, sin zona). */
export function shiftIsoDay(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export type MascotMood = 'idle' | 'happy' | 'thinking' | 'tired' | 'asleep';
export type EnergyTone = 'full' | 'low' | 'empty';

// Por debajo de esto la mascota se cansa y la barra avisa.
export const LOW_ENERGY_LEVEL = 0.2;

export function energyTone(level: number | null | undefined): EnergyTone {
  const value = Number(level) || 0;
  if (value <= 0) return 'empty';
  return value <= LOW_ENERGY_LEVEL ? 'low' : 'full';
}

/**
 * Cómo está la mascota: dormida sin energía o con el asistente apagado,
 * pensando mientras espera respuesta, contenta un momento tras hacer algo y
 * cansada con poca energía.
 */
export function mascotMood(input: {
  available: boolean;
  level: number | null | undefined;
  busy?: boolean;
  celebrating?: boolean;
}): MascotMood {
  if (!input.available) return 'asleep';
  if (input.busy) return 'thinking';
  const tone = energyTone(input.level);
  if (tone === 'empty') return 'asleep';
  if (input.celebrating) return 'happy';
  return tone === 'low' ? 'tired' : 'idle';
}

export interface AssistantRoute {
  path: string[];
  queryParams?: Record<string, string | number>;
  state?: Record<string, unknown>;
}

const CLIENT_ROUTES: Record<string, string[]> = {
  training: ['/tabs/summary'],
  routines: ['/search-tables'],
  diets: ['/tabs/diets'],
  goals: ['/tabs/diets/nutritional-objectives'],
  supplements: ['/my-supplements'],
  weight: ['/weight-info'],
  nutrition_preferences: ['/nutrition-preferences'],
  statistics: ['/statistics'],
  rm_calculator: ['/rm-calculator'],
  profile: ['/tabs/profile'],
  premium: ['/premium'],
  configuration: ['/configuration'],
  coach: ['/tabs/coach'],
  pain: ['/my-pain'],
};

const TRAINER_ROUTES: Record<string, string[]> = {
  today: ['/tabs/dashboard'],
  clients: ['/tabs/clients'],
  review: ['/tabs/review'],
  library: ['/tabs/templates'],
  routines: ['/tabs/routine-templates'],
  diet_templates: ['/tabs/diet-templates'],
  exercises: ['/tabs/exercises'],
  foods: ['/tabs/foods'],
  method: ['/tabs/method'],
  invites: ['/tabs/invites'],
  subscription: ['/tabs/subscription'],
  account: ['/tabs/account'],
  automations: ['/tabs/automations'],
  checkin_templates: ['/tabs/checkin-templates'],
  protocols: ['/tabs/protocols'],
};

const ID = /^[0-9a-f]{24}$/i;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

// Solo los números positivos viajan en la URL (null = no lo dijo).
function macroParams(params: Record<string, unknown>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const key of ['kcal', 'protein', 'carbs', 'fat']) {
    const value = Number(params[key]);
    if (Number.isFinite(value) && value > 0) out[key] = Math.round(value);
  }
  return out;
}

/**
 * La ruta de una pantalla del asistente en esta app, o null si no existe en
 * ella (lista blanca: el back tampoco puede llevar a otro sitio).
 */
export function routeFor(
  app: 'client' | 'trainer',
  navigate: { screen: string; params?: Record<string, unknown> } | null | undefined
): AssistantRoute | null {
  if (!navigate) return null;
  const params = navigate.params || {};
  if (app === 'client') {
    const path = CLIENT_ROUTES[navigate.screen];
    if (!path) return null;
    const date = String(params['date'] || '');
    return navigate.screen === 'diets' && DAY.test(date) ? { path, state: { selectedDate: date } } : { path };
  }

  const clientId = String(params['clientId'] || '');
  const name = String(params['name'] || '');
  if (navigate.screen === 'client') {
    if (!ID.test(clientId)) return null;
    const tab = String(params['section'] || 'summary');
    return { path: ['/tabs/clients', clientId], queryParams: { tab, ...(name ? { name } : {}) } };
  }
  if (navigate.screen === 'diet_phase_picker') {
    if (!ID.test(clientId)) return null;
    return {
      path: ['/tabs/diet-templates/for-phase', clientId],
      queryParams: { ...(name ? { name } : {}), ...macroParams(params) },
    };
  }
  const path = TRAINER_ROUTES[navigate.screen];
  return path ? { path } : null;
}

/** Objetivo con el que abrir el cajón de sugerencias, si la URL lo trae completo de kcal. */
export function targetFromQuery(query: Record<string, string | null | undefined>): {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
} | null {
  const read = (key: string) => {
    const value = Number(query[key]);
    return Number.isFinite(value) && value > 0 ? Math.round(value) : null;
  };
  const kcal = read('kcal');
  if (!kcal) return null;
  // Lo que no venga se reparte como la fórmula por defecto (30/40/30).
  return {
    kcal,
    protein: read('protein') ?? Math.round((kcal * 0.3) / 4),
    carbs: read('carbs') ?? Math.round((kcal * 0.4) / 4),
    fat: read('fat') ?? Math.round((kcal * 0.3) / 9),
  };
}

interface FoodChoiceLine {
  options: { kcal: number; protein: number; carbs: number; fat: number }[];
}

// Gramos que se aceptan al cambiarlos en la vista previa (los del back).
export const MIN_FOOD_GRAMS = 1;
export const MAX_FOOD_GRAMS = 3000;

/** Los gramos que valen (enteros, en rango) o null. */
export function validFoodGrams(value: unknown): number | null {
  const grams = Number(value);
  return Number.isFinite(grams) && grams >= MIN_FOOD_GRAMS && grams <= MAX_FOOD_GRAMS ? Math.round(grams) : null;
}

/**
 * Total de lo que se apuntaría con la opción elegida de cada alimento
 * (`picks[i]`; fuera de rango, la primera, como hace el back al CONFIRMAR) y
 * los gramos que dejó (`grams[i]`; si no valen, los propuestos).
 */
export function chosenFoodTotal(
  items: (FoodChoiceLine & { grams?: number })[] | null | undefined,
  picks: number[] = [],
  grams: (number | null | undefined)[] = []
): { kcal: number; protein: number; carbs: number; fat: number } {
  const total = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  (items || []).forEach((item, index) => {
    const option = item.options[picks[index]] || item.options[0];
    if (!option) return;
    const wanted = validFoodGrams(grams[index]);
    const ratio = wanted && item.grams ? wanted / item.grams : 1;
    total.kcal += (option.kcal || 0) * ratio;
    total.protein += (option.protein || 0) * ratio;
    total.carbs += (option.carbs || 0) * ratio;
    total.fat += (option.fat || 0) * ratio;
  });
  const round1 = (value: number) => Math.round(value * 10) / 10;
  return { kcal: Math.round(total.kcal), protein: round1(total.protein), carbs: round1(total.carbs), fat: round1(total.fat) };
}

export interface AssistantViewLike {
  screen: string | null;
  date?: string | null;
  clientId?: string | null;
}

const CLIENT_VIEWS: [RegExp, string][] = [
  [/^\/tabs\/diets\/nutritional-objectives/, 'goals'],
  [/^\/tabs\/diets/, 'diets'],
  [/^\/(tabs\/summary|current-workout|mesocycle)/, 'training'],
  [/^\/weight-info/, 'weight'],
  [/^\/my-supplements/, 'supplements'],
  [/^\/statistics/, 'statistics'],
  [/^\/search-tables/, 'routines'],
  [/^\/tabs\/profile/, 'profile'],
];
const TRAINER_VIEWS: [RegExp, string][] = [
  [/^\/tabs\/clients\/?$/, 'clients'],
  [/^\/tabs\/dashboard/, 'today'],
  [/^\/tabs\/review/, 'review'],
  [/^\/tabs\/(templates|routine-templates|diet-templates|exercises|foods)/, 'library'],
];
const CLIENT_FILE = /^\/tabs\/clients\/([0-9a-f]{24})(?:[/?#]|$)/i;

/**
 * Lo que tiene en pantalla, para el contexto del mensaje: la pantalla según
 * la ruta, el día que mira en Dietas (`diaryDate`) y, en trainers, el cliente
 * de la ficha abierta. El back vuelve a validarlo todo.
 */
export function viewFromUrl(app: 'client' | 'trainer', url: string, diaryDate: string | null = null): AssistantViewLike {
  const path = String(url || '').split('?')[0];
  if (app === 'trainer') {
    const file = path.match(CLIENT_FILE);
    if (file) return { screen: 'client', clientId: file[1] };
    const found = TRAINER_VIEWS.find(([pattern]) => pattern.test(path));
    return { screen: found ? found[1] : 'other' };
  }
  const found = CLIENT_VIEWS.find(([pattern]) => pattern.test(path));
  const screen = found ? found[1] : 'other';
  return screen === 'diets' && diaryDate ? { screen, date: diaryDate } : { screen };
}
