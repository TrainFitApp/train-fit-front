const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Integridad de las traducciones de las tres apps.
//
// El texto vive en dos capas por idioma (común en shared-core y una por app,
// ver docs/frontend.md#i18n) y el código pide las claves por nombre. Nada de
// eso lo comprueba el compilador: una clave que falta en inglés, un
// {{placeholder}} renombrado en un idioma o una clave que solo existe en la
// capa de una app pero se usa desde packages/ se ven como la clave en crudo
// en pantalla. Estos tests lo cazan antes.

const ROOT = path.resolve(__dirname, '..');
const LANGS = ['es', 'en'];
const APPS = ['train-fit-front', 'train-fit-trainers', 'train-fit-management'];
const LAYERS = {
  common: 'packages/shared-core/src/assets/i18n',
  ...Object.fromEntries(APPS.map((app) => [app, `apps/${app}/src/assets/i18n`])),
};

function flatten(object, prefix = '', out = {}) {
  for (const [key, value] of Object.entries(object || {})) {
    if (value && typeof value === 'object' && !Array.isArray(value)) flatten(value, `${prefix}${key}.`, out);
    else out[`${prefix}${key}`] = value;
  }
  return out;
}

function loadLayer(dir, lang) {
  const file = path.join(ROOT, dir, `${lang}.json`);
  return flatten(JSON.parse(fs.readFileSync(file, 'utf8')));
}

const tables = Object.fromEntries(
  Object.entries(LAYERS).map(([layer, dir]) => [layer, Object.fromEntries(LANGS.map((lang) => [lang, loadLayer(dir, lang)]))]),
);

// Textos vacíos a propósito: en inglés la frase se construye sin ese prefijo.
const INTENTIONALLY_EMPTY = new Set(['en:NUTRITIONAL_OBJECTIVES.KCAL_REMAINING_PREFIX']);

const placeholders = (text) => [...String(text).matchAll(/\{\{\s*([\w.]+)\s*\}\}/g)].map((m) => m[1]).sort();

for (const [layer, byLang] of Object.entries(tables)) {
  test(`i18n ${layer}: es y en tienen exactamente las mismas claves`, () => {
    const es = Object.keys(byLang.es);
    const en = new Set(Object.keys(byLang.en));
    const missingInEn = es.filter((key) => !en.has(key));
    const missingInEs = [...en].filter((key) => !(key in byLang.es));
    assert.deepEqual({ missingInEn, missingInEs }, { missingInEn: [], missingInEs: [] });
  });

  test(`i18n ${layer}: ningún texto vacío; las listas (meses, anclas…) con el mismo largo en los dos idiomas`, () => {
    const bad = [];
    for (const lang of LANGS) {
      for (const [key, value] of Object.entries(byLang[lang])) {
        if (Array.isArray(value)) {
          const other = byLang[lang === 'es' ? 'en' : 'es'][key];
          const filled = (item) =>
            typeof item === 'string'
              ? !!item.trim()
              : !!item && typeof item === 'object' && Object.values(item).every((v) => typeof v === 'string' && v.trim());
          if (!value.length || !value.every(filled)) bad.push(`${lang}:${key} (lista con huecos)`);
          if (!Array.isArray(other) || other.length !== value.length) bad.push(`${lang}:${key} (largo distinto entre idiomas)`);
          continue;
        }
        if (INTENTIONALLY_EMPTY.has(`${lang}:${key}`)) continue;
        if (typeof value !== 'string' || !value.trim()) bad.push(`${lang}:${key}`);
      }
    }
    assert.deepEqual([...new Set(bad)], []);
  });

  test(`i18n ${layer}: los {{parámetros}} coinciden entre idiomas`, () => {
    const mismatched = [];
    for (const [key, esText] of Object.entries(byLang.es)) {
      const enText = byLang.en[key];
      if (typeof enText !== 'string') continue;
      if (placeholders(esText).join() !== placeholders(enText).join()) {
        mismatched.push(`${key}: es{${placeholders(esText)}} en{${placeholders(enText)}}`);
      }
    }
    assert.deepEqual(mismatched, []);
  });
}

// --- Claves usadas en el código ------------------------------------------------------

const KEY = /^[A-Z][A-Z0-9_]*(\.[A-Z0-9_]+)+$/;
const IGNORED_DIRS = new Set(['node_modules', 'www', 'dist', 'android', 'ios', '.angular', 'assets']);

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) walk(path.join(dir, entry.name), acc);
    } else if (/\.(ts|html)$/.test(entry.name) && !/\.(spec|test)\.ts$/.test(entry.name)) {
      acc.push(path.join(dir, entry.name));
    }
  }
  return acc;
}

/**
 * Claves literales completas: `'A.B' | translate`, `translate.instant('A.B')`
 * (y get/stream), `uiText('A.B')`, `[translate]="'A.B'"`. Las que se montan
 * con concatenación (`'PREFIJO.' + x`) no se pueden comprobar así y se dejan.
 */
function keysUsedIn(file) {
  const source = fs.readFileSync(file, 'utf8');
  const found = new Set();
  // `(?!\s*\+)`: una clave seguida de `+` es un prefijo que se completa en
  // ejecución ('MEDIA.POSE_' + pose), no una clave entera.
  const patterns = [
    /['"`]([A-Z][A-Z0-9_]*(?:\.[A-Z0-9_]+)+)['"`]\s*\|\s*translate\b/g,
    /\btranslate(?:Service)?\.(?:instant|get|stream)\(\s*['"`]([A-Z][A-Z0-9_]*(?:\.[A-Z0-9_]+)+)['"`](?!\s*\+)/g,
    /\buiText\(\s*['"`]([A-Z][A-Z0-9_]*(?:\.[A-Z0-9_]+)+)['"`](?!\s*\+)/g,
    /\[translate\]=["']'([A-Z][A-Z0-9_]*(?:\.[A-Z0-9_]+)+)'["']/g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      if (KEY.test(match[1]) && !/[._]$/.test(match[1])) found.add(match[1]);
    }
  }
  return found;
}

function usageByScope() {
  const usage = { packages: new Map() };
  for (const app of APPS) usage[app] = new Map();
  const record = (scope, file) => {
    for (const key of keysUsedIn(file)) {
      if (!usage[scope].has(key)) usage[scope].set(key, path.relative(ROOT, file));
    }
  };
  for (const file of walk(path.join(ROOT, 'packages'))) record('packages', file);
  for (const app of APPS) for (const file of walk(path.join(ROOT, 'apps', app, 'src'))) record(app, file);
  return usage;
}

const usage = usageByScope();
const has = (layer, key) => LANGS.every((lang) => key in tables[layer][lang]);

test('i18n: hay claves usadas en el código (el escáner funciona)', () => {
  assert.ok(usage.packages.size > 200, `solo ${usage.packages.size} claves en packages/`);
  assert.ok(usage['train-fit-trainers'].size > 200, `solo ${usage['train-fit-trainers'].size} claves en trainers`);
});

test('i18n: toda clave usada desde packages/ existe en la capa común o en las tres apps (es y en)', () => {
  const missing = [];
  for (const [key, file] of usage.packages) {
    if (has('common', key)) continue;
    if (APPS.every((app) => has(app, key))) continue;
    missing.push(`${key}  (${file})`);
  }
  assert.deepEqual(missing, []);
});

for (const app of APPS) {
  test(`i18n: toda clave usada en ${app} existe en su capa o en la común (es y en)`, () => {
    const missing = [];
    for (const [key, file] of usage[app]) {
      if (has('common', key) || has(app, key)) continue;
      missing.push(`${key}  (${file})`);
    }
    assert.deepEqual(missing, []);
  });
}

test('i18n: una clave de la capa de una app no redefine una común con OTROS parámetros', () => {
  const conflicts = [];
  for (const app of APPS) {
    for (const lang of LANGS) {
      for (const [key, text] of Object.entries(tables[app][lang])) {
        const common = tables.common[lang][key];
        if (common === undefined) continue;
        if (placeholders(common).join() !== placeholders(text).join()) conflicts.push(`${app}/${lang}:${key}`);
      }
    }
  }
  assert.deepEqual(conflicts, []);
});
