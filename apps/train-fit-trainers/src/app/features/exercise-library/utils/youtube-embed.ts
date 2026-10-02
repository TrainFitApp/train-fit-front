// Proxy propio para evitar restricciones de embed directo de YouTube.
// Compartido por la ficha y el formulario de la biblioteca. El parser es el
// mismo que usa la app del cliente (src/app/core/utils/youtube-id.util).
export { parseYouTubeId } from 'src/app/core/utils/youtube-id.util';

export function youTubeEmbedUrl(id: string): string {
  return `https://trainfit.net/youtube-embed.html?v=${id}`;
}
