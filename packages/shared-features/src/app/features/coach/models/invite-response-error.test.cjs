const test = require('node:test');
const assert = require('node:assert/strict');

let inviteResponseErrorKey;
test.before(async () => {
  ({ inviteResponseErrorKey } = await import('./invite-response-error.util.ts'));
});

test('sin plaza, con otro profesional del mismo ámbito o con el plan del profesional cambiando: su texto', () => {
  assert.equal(inviteResponseErrorKey({ status: 409, error: { code: 'SEAT_UNAVAILABLE', message: 'Tu profesional…' } }, 'X'), 'COACH.ACCEPT_NO_SEAT');
  assert.equal(inviteResponseErrorKey({ status: 400, error: { code: 'OVERLAP' } }, 'X'), 'COACH.ACCEPT_OVERLAP');
  assert.equal(inviteResponseErrorKey({ status: 409, error: { code: 'BILLING_BUSY' } }, 'X'), 'COACH.ACCEPT_BUSY');
});

test('lo demás, el genérico de la pantalla (nunca el mensaje del back)', () => {
  assert.equal(inviteResponseErrorKey({ status: 500, error: { message: 'Error interno' } }, 'COACH.ACCEPT_ERROR'), 'COACH.ACCEPT_ERROR');
  assert.equal(inviteResponseErrorKey(null, 'ONBOARDING.INVITE_ERROR'), 'ONBOARDING.INVITE_ERROR');
});
