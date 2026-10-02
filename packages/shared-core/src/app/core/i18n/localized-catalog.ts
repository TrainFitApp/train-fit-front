// Catalogs defined in code (check-in fields, muscles, pain zones, …) keep
// their Spanish texts as the source of truth: several of them mirror a
// backend catalog and many consumers read `label`, `hint`, etc. straight
// from the objects, often to build other strings in TypeScript.
//
// Instead of teaching every consumer to translate, each catalog registers
// which properties are display text and under which translation key they
// live. Every time the language table loads, those properties are
// overwritten in place; when a key is missing the original Spanish text is
// restored, so a gap in a translation file never leaves a raw key on screen.
//
// Screens that copied a text into their own state keep the old language
// until they are rebuilt, which is fine because changing the language is a
// rare, deliberate action.

type TranslationTable = Record<string, unknown>;

interface LocalizedProp {
  target: Record<string, unknown>;
  prop: string;
  key: string;
  original: unknown;
}

const registry: LocalizedProp[] = [];
let currentTable: TranslationTable | null = null;
let currentLang = 'es';

function lookup(table: TranslationTable, key: string): unknown {
  return key
    .split('.')
    .reduce<unknown>((node, part) => (node && typeof node === 'object' ? (node as TranslationTable)[part] : undefined), table);
}

function apply(entry: LocalizedProp): void {
  const value = currentTable ? lookup(currentTable, entry.key) : undefined;
  const fits = Array.isArray(entry.original)
    ? Array.isArray(value) && value.length === entry.original.length
    : typeof value === 'string' && value.length > 0;
  entry.target[entry.prop] = fits ? value : entry.original;
}

/**
 * Marks `target[prop]` as display text translated by `key`. Arrays (e.g. the
 * anchors of a scale) are only replaced by a translated array of the same
 * length. Missing or empty props are ignored.
 */
export function localizeProp<T extends object>(target: T, prop: keyof T & string, key: string): void {
  const record = target as unknown as Record<string, unknown>;
  const original = record[prop];
  if (original === undefined || original === null || original === '') return;
  const entry: LocalizedProp = { target: record, prop, key, original };
  registry.push(entry);
  apply(entry);
}

/**
 * Same as localizeProp for a whole exported array of texts (e.g. the anchors
 * of a scale): its contents are replaced in place, so every importer sees
 * the new language. Only a translated array of the same length is used.
 */
export function localizeList(list: string[], key: string): void {
  const holder = {
    set list(value: string[]) {
      list.splice(0, list.length, ...value);
    },
  };
  const entry: LocalizedProp = {
    target: holder as unknown as Record<string, unknown>,
    prop: 'list',
    key,
    original: [...list],
  };
  registry.push(entry);
  apply(entry);
}

/**
 * Translation for plain functions and utils that have no TranslateService
 * (same table the app has loaded). Interpolates {{param}} like ngx-translate
 * and falls back to the key when it is missing.
 */
export function uiText(key: string, params?: Record<string, unknown>): string {
  const value = currentTable ? lookup(currentTable, key) : undefined;
  if (typeof value !== 'string') return key;
  if (!params) return value;
  return value.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (all, name: string) =>
    params[name] === undefined || params[name] === null ? all : String(params[name])
  );
}

/** localizeProp for every entry of a label map: `${prefix}.${key}`. */
export function localizeRecord(record: object, prefix: string): void {
  Object.keys(record).forEach((key) => localizeProp(record as Record<string, unknown>, key, `${prefix}.${key}`));
}

/**
 * Locale for Intl / toLocale*String in the user's language. Plain functions
 * and utils have no TranslateService at hand; this follows the same loads.
 */
export function uiLocale(): string {
  return currentLang === 'en' ? 'en-GB' : 'es-ES';
}

/** Called by the i18n module every time a language table is loaded. */
export function applyCatalogTranslations(table: TranslationTable | null | undefined, lang?: string): void {
  currentTable = table || null;
  if (lang) currentLang = lang;
  registry.forEach(apply);
}
