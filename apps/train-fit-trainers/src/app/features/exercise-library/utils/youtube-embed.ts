// Mismo criterio que config-exercise.page.ts#parseYouTubeIdFromUrl +
// updateVideoEmbedSrc — proxy propio para evitar restricciones de embed
// directo de YouTube. Compartido por la ficha y el formulario de la
// biblioteca, que antes lo iban a necesitar por duplicado.
export function parseYouTubeId(url?: string | null): string {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=')) {
    return url.split('v=')[1]?.split('&')[0] || '';
  }
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1]?.split('?')[0] || '';
  }
  if (url.includes('youtube.com/embed/')) {
    return url.split('embed/')[1]?.split('?')[0] || '';
  }
  return '';
}

export function youTubeEmbedUrl(id: string): string {
  return `https://trainfit.net/youtube-embed.html?v=${id}`;
}
