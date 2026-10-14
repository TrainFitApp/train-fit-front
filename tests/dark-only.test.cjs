const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// La app es siempre oscura, sea cual sea el modo del sistema operativo: el
// tema lo fija ThemeService y ningún estilo puede depender del modo del SO.

const root = path.join(__dirname, '..');
const { loadFromSource } = require(path.join(__dirname, 'support/ng-harness.cjs'));
const { ThemeService } = loadFromSource(__filename, path.join(root, 'packages/shared-core/src/app/core'), {
  ThemeService: 'src/app/core/services/util/theme.service',
});

test('ThemeService marca el body como oscuro y no ofrece cambiarlo', async () => {
  const attrs = {};
  global.document = { body: {} };
  const renderer = { setAttribute: (el, name, value) => { attrs[name] = value; } };
  const service = new ThemeService({ createRenderer: () => renderer });
  assert.equal(attrs['color-theme'], 'dark');
  assert.equal(service.getTheme, 'dark');
  assert.equal(service.toggleColorMode, undefined);
  delete global.document;
});

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'www', 'build', 'Pods', 'public', 'DerivedData', '.angular'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(scss|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

test('ningún estilo depende de prefers-color-scheme', () => {
  const offenders = [...walk(path.join(root, 'packages')), ...walk(path.join(root, 'apps'))]
    .filter((file) => /@media[^{]*prefers-color-scheme/.test(fs.readFileSync(file, 'utf8')));
  assert.deepEqual(offenders.map((f) => path.relative(root, f)), []);
});

test('index.html de las tres apps declara color-scheme dark y el body oscuro', () => {
  for (const app of ['train-fit-front', 'train-fit-trainers', 'train-fit-management']) {
    const html = fs.readFileSync(path.join(root, 'apps', app, 'src/index.html'), 'utf8');
    assert.match(html, /<meta name="color-scheme" content="dark"/, app);
    assert.match(html, /<body color-theme="dark">/, app);
  }
});
