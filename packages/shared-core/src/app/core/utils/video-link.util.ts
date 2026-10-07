// Plataforma e id de un enlace de vídeo de técnica (biblioteca del
// entrenador). Las MISMAS URLs que acepta el back
// (train-fit-back/components/techniqueVideos/technique-video-service.js,
// parseYouTubeId / parseVimeoId); tests/video-link-parity.test.cjs lo vigila.
// La plataforma sale del propio enlace: pegar uno de Vimeo con YouTube
// marcado no es un error.

const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
const VIMEO_ID = /vimeo\.com\/(?:video\/)?(\d{6,12})/;
const MAX_LINK_LENGTH = 500;

export interface VideoLink {
  source: 'youtube' | 'vimeo';
  youtubeId: string | null;
  vimeoId: string | null;
}

/** null si está vacío, es demasiado largo o no es de YouTube ni de Vimeo. */
export function parseVideoLink(url: string | null | undefined): VideoLink | null {
  const link = String(url || '').trim();
  if (!link || link.length > MAX_LINK_LENGTH) return null;
  const youtubeId = link.match(YOUTUBE_ID)?.[1];
  if (youtubeId) return { source: 'youtube', youtubeId, vimeoId: null };
  const vimeoId = link.match(VIMEO_ID)?.[1];
  if (vimeoId) return { source: 'vimeo', youtubeId: null, vimeoId };
  return null;
}
