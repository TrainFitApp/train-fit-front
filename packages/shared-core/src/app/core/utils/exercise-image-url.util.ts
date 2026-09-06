const WEB_RESOURCES_IMG_BASE = 'https://www.trainfit.net/resources/img';

/**
 * Los assets de ejercicios (fotos/gifs) se sirven desde un dominio aparte
 * del backend de la API — la BD guarda rutas relativas
 * ("/assets/img/exercises/...") de una época en que se empaquetaban con el
 * propio front. Única fuente de verdad para resolverlas a una URL real,
 * usada tanto por SafePipe ([src] en plantillas) como por
 * LiveActivityService (Live Activity nativa, que no puede usar un SafeUrl
 * de Angular — necesita el string plano).
 */
export function resolveExerciseImageUrl(rawUrl?: string | null): string | undefined {
  if (!rawUrl) return undefined;

  const normalized = rawUrl.trim();
  if (!normalized) return undefined;

  let finalUrl = normalized;
  if (
    normalized.includes('assets/img/') &&
    !normalized.startsWith('http://') &&
    !normalized.startsWith('https://')
  ) {
    const [, resourcePath = ''] = normalized.split('assets/img/');
    finalUrl = `${WEB_RESOURCES_IMG_BASE}/${resourcePath.replace(/^\/+/, '')}`;
  }

  // Necesario para nombres de fichero con espacios/acentos.
  return encodeURI(finalUrl);
}
