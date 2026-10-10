const test = require('node:test');
const assert = require('node:assert/strict');

let personInitials;
test.before(async () => {
  ({ personInitials } = await import('./initials.util.ts'));
});

test('nombre y primer apellido, con el nombre entero o por partes', () => {
  assert.equal(personInitials('Cliente Cliente QA'), 'CC');
  assert.equal(personInitials('Cliente', 'Cliente QA'), 'CC', 'mismo resultado que con el nombre entero');
  assert.equal(personInitials('ana', 'bermúdez lópez'), 'AB');
});

test('una sola palabra o nada', () => {
  assert.equal(personInitials('Ana'), 'A');
  assert.equal(personInitials('', null, undefined), '?');
  assert.equal(personInitials('   '), '?');
});
