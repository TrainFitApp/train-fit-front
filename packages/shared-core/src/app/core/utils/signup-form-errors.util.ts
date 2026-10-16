// PURO. Resumen de errores del alta del cliente para el último paso (además
// del aviso bajo cada campo): las mismas claves que pinta cada slide, en el
// orden de los slides y sin repetir. Solo cuenta lo que ya se ha tocado, para
// no avisar antes de que el usuario haga nada (QA 2026-10-09).

interface ControlLike {
  invalid: boolean;
  touched: boolean;
  dirty?: boolean;
  errors: Record<string, any> | null;
}

interface FormLike {
  get(name: string): ControlLike | null;
  errors: Record<string, any> | null;
}

// [control, error del validador (o '*' = cualquiera), clave de traducción].
// Control null = error del formulario (contraseñas distintas).
const CONTROL_ERRORS: [string | null, string, string][] = [
  ['name', 'required', 'SIGN_UP.NAME_REQUIRED'],
  ['lastname', 'required', 'SIGN_UP.LASTNAME_REQUIRED'],
  ['birth', 'required', 'SIGN_UP.BIRTH_REQUIRED'],
  ['birth', 'minAge', 'SIGN_UP.BIRTH_MIN_AGE'],
  ['birth', 'maxAge', 'SIGN_UP.BIRTH_INVALID'],
  ['weight', 'required', 'SIGN_UP.WEIGHT_REQUIRED'],
  ['weight', 'min', 'SIGN_UP.WEIGHT_MIN'],
  ['weight', 'max', 'SIGN_UP.WEIGHT_MAX'],
  ['height', 'required', 'SIGN_UP.HEIGHT_REQUIRED'],
  ['height', 'min', 'SIGN_UP.HEIGHT_MIN'],
  ['height', 'max', 'SIGN_UP.HEIGHT_MAX'],
  ['sex', 'required', 'SIGN_UP.SEX_REQUIRED'],
  ['steps', '*', 'SIGN_UP.STEPS_REQUIRED'],
  ['activity', '*', 'SIGN_UP.ACTIVITY_REQUIRED'],
  ['training', '*', 'SIGN_UP.TRAINING_REQUIRED'],
  ['objetive', '*', 'SIGN_UP.GOAL_REQUIRED'],
  ['email', 'required', 'SIGN_UP.EMAIL_REQUIRED'],
  ['email', 'email', 'SIGN_UP.EMAIL_INVALID'],
  ['email', 'emailExist', 'SIGN_UP.EMAIL_EXISTS'],
  ['password', 'required', 'SIGN_UP.PASS_REQUIRED'],
  ['password', 'length', 'SIGN_UP.PASS_LENGTH'],
  ['password', 'uppercase', 'SIGN_UP.PASS_UPPERCASE'],
  ['password', 'lowercase', 'SIGN_UP.PASS_LOWERCASE'],
  ['passwordRep', 'required', 'SIGN_UP.PASS_CONFIRM'],
  ['passwordRep', 'length', 'SIGN_UP.PASS_LENGTH'],
  ['passwordRep', 'uppercase', 'SIGN_UP.PASS_UPPERCASE'],
  ['passwordRep', 'lowercase', 'SIGN_UP.PASS_LOWERCASE'],
  [null, 'notSame', 'SIGN_UP.PASS_NOT_MATCH'],
  ['termsAndConditions', '*', 'SIGN_UP.TERMS_REQUIRED'],
  ['policyAndPrivacy', '*', 'SIGN_UP.PRIVACY_REQUIRED'],
];

export function signupFormErrorKeys(form: FormLike): string[] {
  const keys: string[] = [];
  for (const [name, error, key] of CONTROL_ERRORS) {
    if (keys.includes(key) || !isShown(form, name, error)) continue;
    keys.push(key);
  }
  return keys;
}

function isShown(form: FormLike, name: string | null, error: string): boolean {
  if (name === null) {
    const touched = form.get('password')?.touched || form.get('passwordRep')?.touched;
    return !!touched && !!form.errors?.[error];
  }
  const control = form.get(name);
  // El email avisa también mientras se escribe (dirty), como en su slide.
  const visible = control?.touched || (name === 'email' && control?.dirty);
  if (!control?.invalid || !visible) return false;
  return error === '*' || !!control.errors?.[error];
}
