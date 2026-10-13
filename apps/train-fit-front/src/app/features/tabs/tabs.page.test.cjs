const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Play verde en el tab de Entrenamiento mientras hay un entreno empezado y sin
// terminar. «En uso» es `user.workoutInUse`: lo pone EMPEZAR y lo quitan
// TERMINAR y PARAR, y es el mismo puntero con el que el resumen decide si
// enseña «Continuar».

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));

const { TabsPage } = loadFromSource(__filename, __dirname, { TabsPage: './tabs.page' });

/** `hasWorkoutInUse` de la página con ese usuario cargado en el servicio. */
function tabsWith(user) {
  const page = Object.create(TabsPage.prototype);
  page.userService = { localUser: () => user };
  return page;
}

test('sin usuario cargado no hay entreno en uso', () => {
  assert.equal(tabsWith(null).hasWorkoutInUse, false);
  assert.equal(tabsWith(undefined).hasWorkoutInUse, false);
});

test('un usuario sin entreno empezado no enseña el play', () => {
  assert.equal(tabsWith({ _id: 'u1' }).hasWorkoutInUse, false);
  assert.equal(tabsWith({ _id: 'u1', workoutInUse: undefined }).hasWorkoutInUse, false);
  assert.equal(tabsWith({ _id: 'u1', workoutInUse: null }).hasWorkoutInUse, false);
});

test('con un entreno empezado enseña el play', () => {
  assert.equal(tabsWith({ _id: 'u1', workoutInUse: 'w1' }).hasWorkoutInUse, true);
});

test('sigue al puntero aunque cambie sobre el propio objeto del usuario', () => {
  // EMPEZAR, TERMINAR y PARAR escriben `user.workoutInUse` en el objeto que ya
  // está en el signal: si el tab lo guardara en un computed, no se enteraría.
  const user = { _id: 'u1' };
  const page = tabsWith(user);
  assert.equal(page.hasWorkoutInUse, false);
  user.workoutInUse = 'w1';
  assert.equal(page.hasWorkoutInUse, true);
  delete user.workoutInUse;
  assert.equal(page.hasWorkoutInUse, false);
});

test('el play vive en el tab de Entrenamiento y en ningún otro', () => {
  const html = fs.readFileSync(path.join(__dirname, 'tabs.page.html'), 'utf8');
  const tabs = [...html.matchAll(/<ion-tab-button \[tab\]="TABS\.(\w+)"[^>]*>([\s\S]*?)<\/ion-tab-button>/g)];
  assert.deepEqual(tabs.map((tab) => tab[1]), ['summary', 'diets', 'coach', 'profile']);
  const withPlay = tabs.filter((tab) => tab[2].includes('hasWorkoutInUse')).map((tab) => tab[1]);
  assert.deepEqual(withPlay, ['summary']);
});
