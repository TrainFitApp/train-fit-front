// PURO y sin imports: node:test lo carga directamente (supplement-dose.test.js).
//
// La dosis se sigue guardando como texto ("5 g", "2 cápsulas"): es lo que
// leen la app del cliente y el calendario de nutrición. El formulario la
// parte en cantidad (solo número) + unidad de una lista cerrada, y la vuelve
// a juntar al guardar.

export interface DoseUnit {
  // Lo que se guarda detrás del número y lo que se ve en el desplegable.
  value: string;
  // Con cantidad 1: "1 cápsula", no "1 cápsulas".
  one: string;
  // Cómo puede venir escrita en una dosis antigua de texto libre.
  aliases: string[];
}

export const DOSE_UNITS: DoseUnit[] = [
  { value: 'g', one: 'g', aliases: ['gr', 'grs', 'gramo', 'gramos'] },
  { value: 'mg', one: 'mg', aliases: ['miligramo', 'miligramos'] },
  { value: 'µg', one: 'µg', aliases: ['μg', 'mcg', 'ug', 'microgramo', 'microgramos'] },
  { value: 'UI', one: 'UI', aliases: ['iu'] },
  { value: 'ml', one: 'ml', aliases: ['mililitro', 'mililitros'] },
  { value: 'gotas', one: 'gota', aliases: [] },
  { value: 'cápsulas', one: 'cápsula', aliases: ['capsula', 'capsulas', 'caps', 'cap'] },
  { value: 'comprimidos', one: 'comprimido', aliases: ['pastilla', 'pastillas', 'tableta', 'tabletas'] },
  { value: 'medidas', one: 'medida', aliases: ['cacito', 'cacitos', 'scoop', 'scoops'] },
  { value: 'sobres', one: 'sobre', aliases: [] },
  { value: 'cucharaditas', one: 'cucharadita', aliases: [] },
];

export const DOSE_UNIT_VALUES = DOSE_UNITS.map((unit) => unit.value);

export const DEFAULT_DOSE_UNIT = 'g';

export function isKnownDoseUnit(unit: string): boolean {
  return DOSE_UNIT_VALUES.includes(unit);
}

function findUnit(text: string): DoseUnit | undefined {
  const key = text.trim().replace(/\.$/, '').toLowerCase();
  if (!key) return undefined;
  return DOSE_UNITS.find(
    (unit) => unit.value.toLowerCase() === key || unit.one.toLowerCase() === key || unit.aliases.includes(key)
  );
}

/**
 * "5 g" → { amount: '5', unit: 'g' }; "1,5g" → { amount: '1.5', unit: 'g' }.
 * Una unidad fuera de la lista ("1 medida rasa") se devuelve tal cual para no
 * perderla al editar; sin número delante, amount queda vacío.
 */
export function parseDose(dose: string): { amount: string; unit: string } {
  const text = String(dose ?? '').trim();
  const match = /^(\d+(?:[.,]\d+)?)\s*(.*)$/.exec(text);
  const amount = match ? match[1].replace(',', '.') : '';
  const rest = match ? match[2] : text;
  return { amount, unit: findUnit(rest)?.value ?? rest.trim() };
}

/**
 * Cantidad + unidad → texto que se guarda. Coma decimal, como se escribe en
 * español, y singular con cantidad 1. '' si la cantidad no es un número > 0.
 */
export function formatDose(amount: string, unit: string): string {
  const value = Number(amount);
  if (!String(amount ?? '').trim() || !Number.isFinite(value) || value <= 0) return '';
  const known = DOSE_UNITS.find((candidate) => candidate.value === unit);
  const label = known ? (value === 1 ? known.one : known.value) : String(unit ?? '').trim();
  const number = String(value).replace('.', ',');
  return label ? `${number} ${label}` : number;
}
