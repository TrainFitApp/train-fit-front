// El correo con el código de verificación puede no salir (proveedor caído).
// El back ya no responde 500 en el alta: crea la cuenta y lo dice con
// `verificationMailSent: false` (también en el 403 ACCOUNT_NOT_VERIFIED del
// login). Al reenviar, un 503 es justo eso: el correo no salió.

type Translate = (key: string) => string;

/** true si la respuesta dice que el correo con el código NO salió. */
export function verificationMailFailed(body: { verificationMailSent?: boolean } | null | undefined): boolean {
  return body?.verificationMailSent === false;
}

/** Igual, para el error del login de una cuenta sin verificar. */
export function verificationMailFailedIn(error: any): boolean {
  return verificationMailFailed(error?.error ?? error);
}

/** Texto para un fallo al reenviar el código. */
export function resendCodeErrorMessage(error: any, translate: Translate): string {
  if (error?.status === 503) return translate('SIGN_UP.MAIL_NOT_SENT');
  return error?.error?.message || translate('SIGN_UP.RESEND_CODE_ERROR');
}
