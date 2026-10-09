// Al recargar con la sesión caducada, la app la renueva y pasa por el
// cargador de usuario (user-loader) antes de enseñar nada. Sin decirle de
// dónde venía, el cargador acababa en la pestaña por defecto: recargar
// Dietas o Coach llevaba siempre a Perfil (QA 2026-10-09, M17).

const NOT_RETURNABLE = ['/user-loader', '/sign-in', '/maintenance', '/app-update'];

/** La ruta a la que volver tras cargar el usuario, o null si no hay que volver a ninguna. */
export function startupReturnUrl(path: string | null | undefined): string | null {
  const url = String(path || '').trim();
  if (!url.startsWith('/') || url.startsWith('//') || url === '/') return null;
  if (NOT_RETURNABLE.some((prefix) => url === prefix || url.startsWith(`${prefix}/`) || url.startsWith(`${prefix}?`))) return null;
  return url;
}
