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

// --- Claves dinámicas ----------------------------------------------------------------
//
// Las claves que se montan en ejecución ('MEDIA.POSE_' + pose,
// `MEDIA.ERRORS.${code}`) no las ve el escáner de arriba. En 2026-10 un
// barrido de claves «sin uso» se llevó MEDIA.POSE_FRONT/SIDE/BACK,
// OBJETIVES.KEYWORD_1 y MANAGEMENT.MAINTENANCE.PREVIEW_*, y salían en crudo.
// Aquí cada prefijo dinámico declara los sufijos que tiene que haber (sacados
// del propio código cuando hay un catálogo) y un prefijo nuevo en el código
// que no esté declarado hace fallar el test.

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const quoted = (text) => [...text.matchAll(/['"]([\w-]+)['"]/g)].map((m) => m[1]);

/** Cadenas de un array literal (`NAME ... = [ ... ]`) de un fichero. */
function arrayLiteral(file, name) {
  const match = read(file).match(new RegExp(`\\b${name}\\b[^=]*=\\s*\\[([^\\]]*)\\]`));
  assert.ok(match, `no encuentro ${name} en ${file}`);
  return quoted(match[1]);
}

/** Claves de un objeto literal (`NAME ... = { clave: ... }`). */
function objectKeys(file, name) {
  const match = read(file).match(new RegExp(`\\b${name}\\b[^=]*=\\s*\\{([^}]*)\\}`));
  assert.ok(match, `no encuentro ${name} en ${file}`);
  return [...match[1].matchAll(/^\s*['"]?(\w+)['"]?\s*:/gm)].map((m) => m[1]);
}

const upper = (list) => list.map((value) => value.toUpperCase());
const glossaryTerms = () => {
  const terms = new Set();
  for (const file of [...walk(path.join(ROOT, 'packages')), ...APPS.flatMap((app) => walk(path.join(ROOT, 'apps', app, 'src')))]) {
    if (!file.endsWith('.html')) continue;
    for (const match of fs.readFileSync(file, 'utf8').matchAll(/\bterm="'?([A-Z][A-Z0-9_]*)'?"/g)) terms.add(match[1]);
  }
  return [...terms];
};

const DYNAMIC_KEYS = [
  {
    prefix: 'MEDIA.POSE_',
    layer: 'common',
    keys: () => upper(arrayLiteral('packages/shared-core/src/app/core/models/media.ts', 'PROGRESS_POSES')),
  },
  { prefix: 'OBJETIVES.KEYWORD_', layer: 'common', keys: () => ['0', '1', '2'] },
  { prefix: 'MANAGEMENT.MAINTENANCE.PREVIEW_', layer: 'train-fit-management', keys: () => ['NORMAL', 'WARNING', 'ACTIVE'] },
  {
    prefix: 'MEDIA.ERRORS.',
    layer: 'common',
    keys: () => [...arrayLiteral('packages/shared-core/src/app/core/services/media/media-errors.ts', 'KNOWN_CODES'), 'GENERIC'],
  },
  {
    prefix: 'GLOSSARY.',
    layer: 'common',
    keys: () => glossaryTerms().flatMap((term) => [`${term}.TITLE`, `${term}.DESCRIPTION`]),
  },
  {
    prefix: 'CONCEPTS.',
    layer: 'common',
    keys: () => [...read('packages/shared-features/src/app/features/profile/components/configuration/components/concepts/constants/concepts.ts').matchAll(/\bkey:\s*'([A-Z0-9_]+)'/g)].map((m) => m[1]),
  },
  {
    prefix: 'SUPPLEMENTS.TIMINGS.',
    layer: 'common',
    keys: () =>
      objectKeys(
        'apps/train-fit-trainers/src/app/features/clients/pages/client-detail/components/supplements-panel/supplements-panel.component.ts',
        'TIMING_ICONS',
      ),
  },
  {
    prefix: 'PROFILE.COACH_CARD.',
    layer: 'common',
    keys: () => [...new Set([...read('packages/shared-features/src/app/features/profile/components/coach-card/profile-coach-card.component.ts').matchAll(/\bt\(\s*'([A-Z0-9_]+)'/g)].map((m) => m[1]))],
  },
  { prefix: 'INVITES.STATUS.', layer: 'train-fit-trainers', keys: () => ['pending', 'active', 'declined', 'cancelled', 'revoked'] },
  { prefix: 'INVITES.STATUS_HINT.', layer: 'train-fit-trainers', keys: () => ['pending', 'active', 'declined', 'cancelled', 'revoked'] },
  {
    prefix: 'INVITES.EVENT.',
    layer: 'train-fit-trainers',
    keys: () => ['sent', 'accepted', 'declined', 'cancelled', 'ended_by_trainer', 'ended_by_client', 'ended'],
  },
  { prefix: 'CLIENT_DETAIL.DAY.ITEM_STATUS.', layer: 'train-fit-trainers', keys: () => ['eaten', 'unchecked', 'pending', 'extra'] },
  { prefix: 'CLIENT_DETAIL.DAY.MEAL_STATUS.', layer: 'train-fit-trainers', keys: () => ['done', 'partial', 'unchecked', 'pending', 'extra'] },
  { prefix: 'CHECKIN_FIELD_GROUPS.', layer: 'train-fit-trainers', keys: () => ['composicion_corporal', 'perimetros'] },
  {
    prefix: 'SIGN_UP.ERRORS.',
    layer: 'common',
    keys: () => arrayLiteral('packages/shared-core/src/app/core/utils/signup-errors.util.ts', 'SIGNUP_ERROR_CODES'),
  },
  {
    prefix: 'CLIENT_DETAIL.TASK_ERRORS.',
    layer: 'train-fit-trainers',
    keys: () => arrayLiteral('apps/train-fit-trainers/src/app/features/clients/habit-form.util.ts', 'TASK_ERROR_CODES'),
  },
  {
    prefix: 'MANAGEMENT.BILLING.ERRORS.',
    layer: 'train-fit-management',
    keys: () => arrayLiteral(MANAGEMENT_BILLING_UTIL, 'ADMIN_ERROR_CODES'),
  },
  {
    prefix: 'MANAGEMENT.BILLING.PROBLEMS.',
    layer: 'train-fit-management',
    keys: () => [...new Set([...read(MANAGEMENT_BILLING_UTIL).matchAll(/\bproblem\('([A-Z_]+)'\)/g)].map((m) => m[1]))],
  },
];

const MANAGEMENT_BILLING_UTIL = 'apps/train-fit-management/src/app/features/management-home/components/trainer-billing/trainer-billing-view.util.ts';

/** Prefijos dinámicos que usa el código (concatenación o plantilla). */
function dynamicPrefixesInCode() {
  const found = new Map();
  const files = [...walk(path.join(ROOT, 'packages')), ...APPS.flatMap((app) => walk(path.join(ROOT, 'apps', app, 'src')))];
  for (const file of files) {
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      // localizeProp() traduce catálogos con su propio texto de respaldo.
      if (line.includes('localizeProp(')) continue;
      const patterns = [/['"]([A-Z][A-Z0-9_]*(?:\.[A-Z0-9_]+)*[._])['"]\s*\+/g, /`([A-Z][A-Z0-9_]*(?:\.[A-Z0-9_]+)*[._])\$\{/g];
      for (const pattern of patterns) {
        for (const match of line.matchAll(pattern)) {
          if (!found.has(match[1])) found.set(match[1], path.relative(ROOT, file));
        }
      }
    }
  }
  return found;
}

test('i18n dinámicas: todo prefijo que se completa en ejecución está declarado en DYNAMIC_KEYS', () => {
  const declared = new Set(DYNAMIC_KEYS.map((entry) => entry.prefix));
  const undeclared = [...dynamicPrefixesInCode()].filter(([prefix]) => !declared.has(prefix)).map(([prefix, file]) => `${prefix}  (${file})`);
  assert.deepEqual(undeclared, []);
});

for (const { prefix, layer, keys } of DYNAMIC_KEYS) {
  test(`i18n dinámicas: ${prefix}* tiene todos sus sufijos (es y en)`, () => {
    const suffixes = keys();
    assert.ok(suffixes.length > 0, `${prefix}: sin sufijos (¿cambió el catálogo de origen?)`);
    const missing = suffixes
      .map((suffix) => `${prefix}${suffix}`)
      .filter((key) => !(has(layer, key) || (layer !== 'common' && has('common', key))));
    assert.deepEqual(missing, []);
  });
}
