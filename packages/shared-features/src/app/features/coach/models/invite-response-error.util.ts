// PURO — qué se le dice al cliente cuando aceptar una invitación falla.
// Revisión de pagos 2026-10-10: con el profesional sin plazas libres
// (SEAT_UNAVAILABLE) la app enseñaba el texto del back, siempre en español.

const INVITE_ERROR_KEYS: Record<string, string> = {
  SEAT_UNAVAILABLE: 'COACH.ACCEPT_NO_SEAT',
  OVERLAP: 'COACH.ACCEPT_OVERLAP',
  BILLING_BUSY: 'COACH.ACCEPT_BUSY',
};

/** Clave i18n del error (la de `fallbackKey` si el código no es uno conocido). */
export function inviteResponseErrorKey(error: unknown, fallbackKey: string): string {
  const code = (error as { error?: { code?: unknown } } | null)?.error?.code;
  return (typeof code === 'string' && INVITE_ERROR_KEYS[code]) || fallbackKey;
}
