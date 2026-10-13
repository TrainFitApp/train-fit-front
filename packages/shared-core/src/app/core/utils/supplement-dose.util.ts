// PURO y sin imports: node:test lo carga directamente (supplement-dose.test.js).
//
// La dosis de un suplemento se guarda como texto ("5 g", "2 cápsulas"): es lo
// que leen las apps y el calendario de nutrición. Los formularios (el del
// cliente y el del profesional) la parten en cantidad (solo número) + unidad
// de una lista cerrada, y la vuelven a juntar al guardar.
//
// La unidad se escribe en el idioma de quien rellena el formulario ("2
// cápsulas" / "2 capsules"), igual que el nombre o el motivo: es texto de la
// pauta, no un valor de catálogo. Al editar se reconoce en cualquiera de los
// dos idiomas, y también la que escribió a mano el asistente ("2 capsules").

export type DoseLang = 'es' | 'en';

interface DoseUnitText {
  // Lo que se guarda detrás del número y lo que se ve en el desplegable.
  value: string;
  // Con cantidad 1: "1 cápsula", no "1 cápsulas".
  one: string;
}

interface DoseUnit {
  es: DoseUnitText;
  en: DoseUnitText;
  // Otras formas de escribirla en una dosis de texto libre (en minúsculas).
  aliases: string[];
}

const DOSE_UNITS: DoseUnit[] = [
  {
    es: { value: 'g', one: 'g' },
    en: { value: 'g', one: 'g' },
    aliases: ['gr', 'grs', 'gramo', 'gramos', 'gram', 'grams'],
  },
  {
    es: { value: 'mg', one: 'mg' },
    en: { value: 'mg', one: 'mg' },
    aliases: ['miligramo', 'miligramos', 'milligram', 'milligrams'],
  },
  {
    es: { value: 'µg', one: 'µg' },
    en: { value: 'mcg', one: 'mcg' },
    aliases: ['μg', 'ug', 'microgramo', 'microgramos', 'microgram', 'micrograms'],
  },
  { es: { value: 'UI', one: 'UI' }, en: { value: 'IU', one: 'IU' }, aliases: [] },
  {
    es: { value: 'ml', one: 'ml' },
    en: { value: 'ml', one: 'ml' },
    aliases: ['mililitro', 'mililitros', 'milliliter', 'milliliters', 'millilitre', 'millilitres'],
  },
  { es: { value: 'gotas', one: 'gota' }, en: { value: 'drops', one: 'drop' }, aliases: [] },
  {
    es: { value: 'cápsulas', one: 'cápsula' },
    en: { value: 'capsules', one: 'capsule' },
    aliases: ['capsula', 'capsulas', 'caps', 'cap'],
  },
  {
    es: { value: 'comprimidos', one: 'comprimido' },
    en: { value: 'tablets', one: 'tablet' },
    aliases: ['pastilla', 'pastillas', 'tableta', 'tabletas', 'pill', 'pills'],
  },
  {
    es: { value: 'medidas', one: 'medida' },
    en: { value: 'scoops', one: 'scoop' },
    aliases: ['cacito', 'cacitos'],
  },
  {
    es: { value: 'sobres', one: 'sobre' },
    en: { value: 'packets', one: 'packet' },
    aliases: ['sachet', 'sachets'],
  },
  {
    es: { value: 'cucharaditas', one: 'cucharadita' },
    en: { value: 'teaspoons', one: 'teaspoon' },
    aliases: ['tsp'],
  },
];

const LANGS: DoseLang[] = ['es', 'en'];

export const DEFAULT_DOSE_UNIT = 'g';

function findUnit(text: string): DoseUnit | undefined {
  const key = text.trim().replace(/\.$/, '').toLowerCase();
  if (!key) return undefined;
  return DOSE_UNITS.find(
    (unit) =>
      unit.aliases.includes(key) ||
      LANGS.some((lang) => unit[lang].value.toLowerCase() === key || unit[lang].one.toLowerCase() === key)
  );
}

/**
 * Las unidades del desplegable, en el idioma pedido. Si la dosis que se edita
 * trae una que no está en la lista ("1 medida rasa"), se añade como una opción
 * más para no perderla al guardar.
 */
export function doseUnitOptions(current = '', lang: DoseLang = 'es'): string[] {
  const values = DOSE_UNITS.map((unit) => unit[lang].value);
  return !current || values.includes(current) ? values : [...values, current];
}

/**
 * "5 g" → { amount: '5', unit: 'g' }; "1,5g" → { amount: '1.5', unit: 'g' }.
 * La unidad conocida sale en el idioma pedido ("2 capsules" → 'cápsulas' en
 * español). Una fuera de la lista ("1 medida rasa") se devuelve tal cual para
 * no perderla al editar; sin número delante, amount queda vacío.
 */
export function parseDose(dose: string, lang: DoseLang = 'es'): { amount: string; unit: string } {
  const text = String(dose ?? '').trim();
  const match = /^(\d+(?:[.,]\d+)?)\s*(.*)$/.exec(text);
  const amount = match ? match[1].replace(',', '.') : '';
  const rest = match ? match[2] : text;
  return { amount, unit: findUnit(rest)?.[lang].value ?? rest.trim() };
}

/**
 * Cantidad + unidad → texto que se guarda. Coma decimal en español y punto en
 * inglés, como se escribe en cada uno, y singular con cantidad 1. '' si la
 * cantidad no es un número > 0.
 */
export function formatDose(amount: string, unit: string, lang: DoseLang = 'es'): string {
  const value = Number(amount);
  if (!String(amount ?? '').trim() || !Number.isFinite(value) || value <= 0) return '';
  const known = DOSE_UNITS.find((candidate) => candidate[lang].value === unit);
  const label = known ? (value === 1 ? known[lang].one : known[lang].value) : String(unit ?? '').trim();
  const number = String(value).replace('.', lang === 'en' ? '.' : ',');
  return label ? `${number} ${label}` : number;
}
