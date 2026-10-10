const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Alta del cliente, último paso (QA 2026-10-09): el resumen «Este campo es
// obligatorio» salía antes de tocar nada, y «Registrarme» con las casillas
// sin marcar no hacía nada ni decía por qué.

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { SignUpPage } = loadFromSource(
  __filename,
  __dirname,
  { SignUpPage: 'src/app/features/authentication/components/sign-up/sign-up.page' },
  { app: 'train-fit-front' }
);

function page({ invalid }) {
  const calls = { touched: 0, created: 0 };
  const component = Object.create(SignUpPage.prototype);
  Object.assign(component, {
    registerAttempted: false,
    signUpForm: { invalid, markAllAsTouched: () => calls.touched++, get: () => ({ value: 'a@b.test' }) },
    userService: {
      calculateKcal: () => 2000,
      createUser: () => {
        calls.created++;
        return { subscribe() {} };
      },
    },
    registerSocialPending: true,
    user: {},
  });
  return { component, calls };
}

test('registrarse con el formulario incompleto enseña los errores (y no llama al back)', () => {
  const { component, calls } = page({ invalid: true });
  component.register();
  assert.equal(component.registerAttempted, true);
  assert.equal(calls.touched, 1);
  assert.equal(calls.created, 0);
});

test('con el formulario completo, registra', () => {
  const { component, calls } = page({ invalid: false });
  component.register();
  assert.equal(calls.touched, 0);
  assert.equal(calls.created, 1);
});
