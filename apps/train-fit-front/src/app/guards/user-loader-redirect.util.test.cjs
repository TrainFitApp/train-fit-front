const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Al recargar, la app cliente siempre pasa por el user-loader y no recuerda la
// pantalla en la que estaba: sin usuario en memoria no se abre ninguna ruta
// privada (antes dependía de si el guard o el arranque de AppComponent
// acababan antes, y a veces se veía la pestaña sin datos; después se volvía a
// la pantalla anterior, pero sin su estado ni su historial de «atrás»).

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { mustPassThroughUserLoader } = loadFromSource(__filename, __dirname, {
  mustPassThroughUserLoader: './user-loader-redirect.util',
});

test('sin usuario cargado, cualquier ruta privada pasa por el cargador', () => {
  for (const route of ['tabs', 'statistics', 'my-checkins', 'onboarding-status', 'configuration']) {
    assert.equal(mustPassThroughUserLoader(false, route), true, route);
  }
});

test('con el usuario ya cargado la ruta se abre sin más', () => {
  assert.equal(mustPassThroughUserLoader(true, 'tabs'), false);
  assert.equal(mustPassThroughUserLoader(true, 'statistics'), false);
});

test('el propio cargador nunca se manda al cargador', () => {
  assert.equal(mustPassThroughUserLoader(false, 'user-loader'), false);
  assert.equal(mustPassThroughUserLoader(true, 'user-loader'), false);
});

test('el guard no lleva returnUrl: recargar no recuerda dónde se estaba', () => {
  const guard = fs.readFileSync(path.join(__dirname, 'user-loaded.guard.ts'), 'utf8');
  assert.match(guard, /createUrlTree\(\['\/user-loader'\]\)/);
  assert.doesNotMatch(guard, /returnUrl/);
  const app = fs.readFileSync(path.join(__dirname, '../app.component.ts'), 'utf8');
  assert.doesNotMatch(app, /returnUrl|startupReturnUrl/);
});

test('las rutas privadas de la app cliente usan el guard del usuario cargado, y solo el cargador el compartido', () => {
  const routing = fs.readFileSync(path.join(__dirname, '../app-routing.module.ts'), 'utf8');
  const routes = routing.split(/\r?\n {2}\{\r?\n/).filter((block) => block.includes('canMatch'));
  assert.ok(routes.length > 10);
  for (const block of routes) {
    const route = /path: '([^']*)'/.exec(block)?.[1];
    const guard = /canMatch: \[(\w+)\]/.exec(block)?.[1];
    assert.equal(guard, route === 'user-loader' ? 'authMatchGuard' : 'userLoadedMatchGuard', `ruta ${route}`);
  }
});
