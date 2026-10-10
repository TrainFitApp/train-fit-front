const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { of, throwError } = require('rxjs');

// QA 2026-10-09: el contador «Por revisar» del menú solo se recalculaba al
// navegar; revisar el último check-in desde la ficha (sin navegar) lo dejaba
// en 1. Cada revisión avisa por `changed$` y el menú vuelve a contar.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { ReviewQueueApiService, TrainerInvitesApiService } = loadFromSource(
  __filename,
  __dirname,
  {
    ReviewQueueApiService: 'src/app/features/review-queue/review-queue-api.service',
    TrainerInvitesApiService: 'src/app/features/invites/services/trainer-invites-api.service',
  },
  { app: 'train-fit-trainers' }
);

test('notifyChanged avisa a quien escucha changed$', () => {
  const api = new ReviewQueueApiService({});
  let calls = 0;
  const subscription = api.changed$.subscribe(() => calls++);
  api.notifyChanged();
  api.notifyChanged();
  subscription.unsubscribe();
  api.notifyChanged();
  assert.equal(calls, 2);
});

test('marcar revisado un cuestionario avisa al contador solo si sale bien', () => {
  const queue = new ReviewQueueApiService({});
  let notices = 0;
  queue.changed$.subscribe(() => notices++);

  const ok = new TrainerInvitesApiService({ post: () => of({ status: 'reviewed' }) }, queue);
  ok.markIntakeReviewed('c1').subscribe();
  assert.equal(notices, 1);

  const failing = new TrainerInvitesApiService({ post: () => throwError(() => new Error('500')) }, queue);
  failing.markIntakeReviewed('c1').subscribe({ error: () => undefined });
  assert.equal(notices, 1);
});
