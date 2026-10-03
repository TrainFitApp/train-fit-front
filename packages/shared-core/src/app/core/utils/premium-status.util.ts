/**
 * ¿Es PRO ahora mismo? La misma regla que el backend
 * (feature-access-service#isEffectivelyEntitled): `premium.entitled` es una
 * copia cacheada y solo vale mientras no haya pasado `expiresAt`.
 *
 * Sin esto, el tiempo que concede management (o una suscripción cuyo webhook
 * de EXPIRATION no llega) seguía saliendo como PRO en las pantallas que leen
 * el usuario guardado: la app abierta al acabarse el plazo y el listado de
 * management. Puro y sin imports para poder probarlo con node:test.
 */

export interface PremiumStatus {
  entitled?: boolean | null;
  expiresAt?: string | Date | null;
}

export function isPremiumActive(premium: PremiumStatus | null | undefined, now: number = Date.now()): boolean {
  if (!premium?.entitled) return false;
  if (!premium.expiresAt) return true;
  return new Date(premium.expiresAt).getTime() > now;
}

/**
 * Milisegundos hasta que caduca un premium vigente con fecha; null si no es
 * PRO o no caduca (para programar el refresco justo al acabarse).
 */
export function msUntilPremiumExpiry(premium: PremiumStatus | null | undefined, now: number = Date.now()): number | null {
  if (!isPremiumActive(premium, now) || !premium?.expiresAt) return null;
  return new Date(premium.expiresAt).getTime() - now;
}
