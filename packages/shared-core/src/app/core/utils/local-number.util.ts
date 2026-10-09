import { uiLocale } from 'src/app/core/i18n/localized-catalog';

// Números en el idioma del usuario: «1.731», «65,5», «8.000» en español;
// «1,731», «65.5» en inglés. Las apps no registran LOCALE_ID, así que el pipe
// `number` de Angular y `toFixed` pintan siempre en inglés.
//
// Agrupa también los de cuatro cifras («8.000 pasos»): la convención de
// Intl para es-ES los deja sin separador, y en la app conviven con los de
// cinco («10.000»), así que se ve incoherente.

export interface LocalNumberOptions {
  /** Decimales mínimos (por defecto 0). */
  minDecimals?: number;
  /** Decimales máximos (por defecto 2). */
  maxDecimals?: number;
  /** Locale explícito; por defecto el de la interfaz. */
  locale?: string;
}

const formatters = new Map<string, Intl.NumberFormat>();

function formatterFor(locale: string, min: number, max: number): Intl.NumberFormat {
  const key = `${locale}|${min}|${max}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    const options: Intl.NumberFormatOptions = { minimumFractionDigits: min, maximumFractionDigits: max };
    try {
      // `useGrouping: 'always'` es de ES2023: los tipos del proyecto aún lo
      // declaran booleano. Si el motor no lo admite, se agrupa como el locale.
      formatter = new Intl.NumberFormat(locale, { ...options, useGrouping: 'always' } as unknown as Intl.NumberFormatOptions);
    } catch {
      formatter = new Intl.NumberFormat(locale, options);
    }
    formatters.set(key, formatter);
  }
  return formatter;
}

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

/** Número formateado, o '' si no hay número. */
export function formatLocalNumber(value: unknown, options: LocalNumberOptions = {}): string {
  const number = toNumber(value);
  if (number === null) return '';
  const min = Math.max(0, options.minDecimals ?? 0);
  const max = Math.max(min, options.maxDecimals ?? 2);
  // -0 sale como «-0»: un redondeo a cero se pinta como cero.
  const rounded = Object.is(number, -0) ? 0 : number;
  const text = formatterFor(options.locale || uiLocale(), min, max).format(rounded);
  return text === '-0' ? '0' : text;
}

/** Igual, con la unidad detrás («65,5 kg»), o '' si no hay número. */
export function formatLocalQuantity(value: unknown, unit: string, options: LocalNumberOptions = {}): string {
  const text = formatLocalNumber(value, options);
  return text ? `${text} ${unit}` : '';
}
