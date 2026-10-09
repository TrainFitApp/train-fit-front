const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// QA 2026-10-09 (A3): lo pautado quedaba bloqueado para siempre, también
// cuando el cliente ya no tenía al profesional que lo pautó.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { activeTrainerIdsByScope, isLockedByTrainer, NO_ACTIVE_TRAINERS } = loadFromSource(__filename, __dirname, {
  activeTrainerIdsByScope: 'src/app/core/utils/trainer-lock.util',
  isLockedByTrainer: 'src/app/core/utils/trainer-lock.util',
  NO_ACTIVE_TRAINERS: 'src/app/core/utils/trainer-lock.util',
});

const ids = activeTrainerIdsByScope([
  { user: { _id: 'ana' }, scopes: ['training'] },
  { user: { _id: 'luis' }, scopes: ['nutrition', 'training'] },
  { user: null, scopes: ['training'] },
]);

test('agrupa los profesionales activos por ámbito', () => {
  assert.deepEqual(ids, { training: ['ana', 'luis'], nutrition: ['luis'] });
  assert.deepEqual(activeTrainerIdsByScope(null), { training: [], nutrition: [] });
});

test('bloqueado solo mientras quien lo pautó siga siendo su profesional de ese ámbito', () => {
  assert.equal(isLockedByTrainer('ana', 'training', ids), true);
  assert.equal(isLockedByTrainer('ana', 'nutrition', ids), false, 'ana no lleva su nutrición');
  assert.equal(isLockedByTrainer('pedro', 'training', ids), false, 'el profesional anterior ya no bloquea');
  assert.equal(isLockedByTrainer({ _id: 'luis' }, 'nutrition', ids), true, 'acepta el id poblado');
  assert.equal(isLockedByTrainer(null, 'training', ids), false, 'lo propio nunca');
  assert.equal(isLockedByTrainer('ana', 'training', NO_ACTIVE_TRAINERS), false, 'sin profesionales, nada bloqueado');
});
