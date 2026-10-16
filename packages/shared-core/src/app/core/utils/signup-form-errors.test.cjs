const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { signupFormErrorKeys } = loadFromSource(__filename, __dirname, { signupFormErrorKeys: 'src/app/core/utils/signup-form-errors.util' });

// Formulario mínimo: { control: { errors, touched?, dirty? } } y errores del grupo.
function form(controls, errors = null) {
  return {
    errors,
    get: (name) => {
      const c = controls[name];
      if (!c) return null;
      return { invalid: !!c.errors, touched: c.touched !== false, dirty: !!c.dirty, errors: c.errors ?? null };
    },
  };
}

test('apila los errores en el orden de los slides', () => {
  const keys = signupFormErrorKeys(
    form({
      policyAndPrivacy: { errors: { required: true } },
      name: { errors: { required: true } },
      weight: { errors: { max: true } },
      termsAndConditions: { errors: { required: true } },
    })
  );
  assert.deepEqual(keys, ['SIGN_UP.NAME_REQUIRED', 'SIGN_UP.WEIGHT_MAX', 'SIGN_UP.TERMS_REQUIRED', 'SIGN_UP.PRIVACY_REQUIRED']);
});

test('sin tocar no avisa (salvo el email mientras se escribe)', () => {
  assert.deepEqual(signupFormErrorKeys(form({ name: { errors: { required: true }, touched: false } })), []);
  assert.deepEqual(signupFormErrorKeys(form({ email: { errors: { email: true }, touched: false, dirty: true } })), ['SIGN_UP.EMAIL_INVALID']);
});

test('sin repetir y con las contraseñas distintas tras el slide de contraseñas', () => {
  const keys = signupFormErrorKeys(
    form(
      {
        password: { errors: { length: true } },
        passwordRep: { errors: { length: true } },
        termsAndConditions: { errors: { required: true } },
      },
      { notSame: true }
    )
  );
  assert.deepEqual(keys, ['SIGN_UP.PASS_LENGTH', 'SIGN_UP.PASS_NOT_MATCH', 'SIGN_UP.TERMS_REQUIRED']);
});

test('formulario válido: nada', () => {
  assert.deepEqual(signupFormErrorKeys(form({ name: {}, termsAndConditions: {} })), []);
});
