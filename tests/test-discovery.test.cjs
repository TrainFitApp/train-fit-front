const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Guardarraíl del propio runner.
//
// Hasta 2026-10 el script `test` llevaba la lista de ficheros escrita a mano:
// 18 ficheros de test en disco y solo 10 en la lista. Los 8 que se quedaron
// fuera no se ejecutaban desde hacía meses, así que 5 de sus casos habían
// dejado de pasar sin que nadie se enterara (nombres de método renombrados,
// textos migrados a i18n, un constructor con una dependencia nueva).
//
// Ahora el script usa globs, y este test comprueba que esos globs cubren
// TODO lo que hay en disco: si alguien deja un test en una carpeta que los
// globs no miran, falla aquí en vez de no ejecutarse nunca en silencio.

const ROOT = path.resolve(__dirname, '..');

// Mismas raíces que los globs de `npm test` en package.json. Al añadir una
// carpeta nueva ahí, hay que añadirla aquí (y este test avisa si no).
const COVERED = [
  (rel) => rel.startsWith('packages/'),
  (rel) => /^apps\/[^/]+\/src\//.test(rel),
  (rel) => rel.startsWith('tests/'),
];

// Carpetas que no son código fuente: dependencias, salidas de build y la
// copia compilada de la app que Capacitor deja dentro de android/.
const IGNORED_DIR = new Set(['node_modules', '.git', 'www', 'dist', 'out-tsc', '.build', 'android', 'ios', 'platforms']);

function findTestFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORED_DIR.has(entry.name)) continue;
      findTestFiles(path.join(dir, entry.name), acc);
    } else if (/\.test\.(js|cjs|mjs|ts)$/.test(entry.name)) {
      acc.push(path.relative(ROOT, path.join(dir, entry.name)).split(path.sep).join('/'));
    }
  }
  return acc;
}

test('todo fichero de test vive en una raíz que `npm test` recorre', () => {
  const uncovered = findTestFiles(ROOT).filter(
    (rel) => !COVERED.some((isCovered) => isCovered(rel))
  );
  assert.deepEqual(
    uncovered,
    [],
    'Estos tests no los ejecuta `npm test`: muévelos a packages/, apps/<app>/src/ o tests/, ' +
      'o añade su raíz a los globs del script `test` en package.json y a COVERED aquí.'
  );
});

test('los globs solo aceptan .js y .cjs: un .test.ts no se ejecutaría', () => {
  // `node --test "**/*.test.{js,cjs}"` no recoge .ts. Los tests importan el
  // .ts que prueban (con --experimental-strip-types), pero el fichero de test
  // en sí tiene que ser .js o .cjs o no lo ve nadie.
  const wrongExtension = findTestFiles(ROOT).filter((rel) => /\.test\.(mjs|ts)$/.test(rel));
  assert.deepEqual(
    wrongExtension,
    [],
    'Renómbralos a .test.js (ESM, puede importar .ts) o .test.cjs (CommonJS).'
  );
});
