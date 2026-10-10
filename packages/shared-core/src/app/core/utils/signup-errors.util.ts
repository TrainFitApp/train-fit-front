// Errores del alta con su código (QA 2026-10-09: salían en español y sin
// traducir: «El correo no existe», «Nombre, apellidos, email y contraseña son
// obligatorios»). Lo que la app no conoce, el texto del back o el genérico.

type Translate = (key: string) => string;

export const SIGNUP_ERROR_CODES = ['EMAIL_ALREADY_REGISTERED', 'EMAIL_NOT_DELIVERABLE', 'SIGNUP_FIELDS_REQUIRED', 'USER_BIRTH_INVALID', 'USER_UNDER_MIN_AGE'];

export function signupErrorMessage(error: any, translate: Translate): string {
  const code = error?.error?.code;
  if (SIGNUP_ERROR_CODES.includes(code)) return translate(`SIGN_UP.ERRORS.${code}`);
  return error?.error?.message || translate('SIGN_UP.REGISTER_ERROR');
}
