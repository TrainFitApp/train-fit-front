const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { of, throwError } = require('rxjs');

// Alta de profesional: el código que se reenvía es el de VERIFICACIÓN (antes
// pedía el de restablecer la contraseña) y, si el correo no salió al darse de
// alta, se dice y se deja reenviar sin esperar (QA 2026-10-09, A5).

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}
const { loadFromSource } = require(path.join(repoRoot(__dirname), 'tests/support/ng-harness.cjs'));
const { SignUpPage: ProfessionalSignUpPage } = loadFromSource(
  __filename,
  __dirname,
  { SignUpPage: 'src/app/features/professional-sign-up/sign-up.page' },
  { app: 'train-fit-trainers' }
);

function page({ created = {}, resend = () => of({}) } = {}) {
  const calls = { resendActivationCode: [], sendMailCode: [], toasts: [], cooldowns: 0 };
  const component = Object.create(ProfessionalSignUpPage.prototype);
  Object.assign(component, {
    email: 'pro@example.test',
    resendDisabled: false,
    form: {
      invalid: false,
      value: { name: 'Pro', lastname: 'Fesional', email: 'pro@example.test', password: 'Secreta-123' },
      markAllAsTouched() {},
    },
    userService: {
      createProfessionalUser: () => of(created),
      resendActivationCode: (email) => {
        calls.resendActivationCode.push(email);
        return resend();
      },
      sendMailCode: (email) => {
        calls.sendMailCode.push(email);
        return of({});
      },
    },
    pendingEmailVerificationService: { start() {}, markCodeSent() {} },
    ionicUtilService: { showToast: (options) => calls.toasts.push(options.message), showErrorToast: (message) => calls.toasts.push(message) },
    translate: { instant: (key) => key },
  });
  component.startResendCooldown = () => {
    calls.cooldowns += 1;
  };
  return { component, calls };
}

test('reenviar pide el código de verificación del alta, nunca el de la contraseña', () => {
  const { component, calls } = page();
  component.resendCode();
  assert.deepEqual(calls.resendActivationCode, ['pro@example.test']);
  assert.deepEqual(calls.sendMailCode, []);
  assert.deepEqual(calls.toasts, ['SIGN_UP.CODE_RESENT']);
  assert.equal(calls.cooldowns, 1);
});

test('reenviar con el correo caído (503) lo dice', () => {
  const { component, calls } = page({ resend: () => throwError(() => ({ status: 503, error: { message: 'Ha ocurrido un error inesperado' } })) });
  component.resendCode();
  assert.deepEqual(calls.toasts, ['SIGN_UP.MAIL_NOT_SENT']);
});

test('alta con el correo caído: avisa y no bloquea el reenvío', () => {
  const { component, calls } = page({ created: { _id: 'u1', verificationMailSent: false } });
  component.register();
  assert.equal(component.codeSended, true);
  assert.deepEqual(calls.toasts, ['SIGN_UP.MAIL_NOT_SENT']);
  assert.equal(calls.cooldowns, 0, 'sin la espera de un minuto');
});

test('alta normal: código enviado y espera de reenvío', () => {
  const { component, calls } = page({ created: { _id: 'u1', verificationMailSent: true } });
  component.register();
  assert.deepEqual(calls.toasts, ['SIGN_UP.CODE_SENT_TO_EMAIL']);
  assert.equal(calls.cooldowns, 1);
});
