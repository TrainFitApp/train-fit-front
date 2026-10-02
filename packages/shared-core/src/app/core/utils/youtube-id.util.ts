// Id de un vídeo de YouTube a partir de su enlace (watch, youtu.be o embed).
// Lo usan la ficha del ejercicio y el reproductor de la sesión (cliente) y la
// biblioteca de ejercicios de trainers: el entrenador pega el enlace en una
// app y el cliente lo ve en la otra, así que las tres entienden exactamente
// las mismas URLs (tests/youtube-id-parity.test.cjs lo vigila).
//
// El id acaba en la URL del iframe (youtube-embed.html?v=…): solo vale algo
// con forma de id real, 11 caracteres [A-Za-z0-9_-]. Antes se devolvía
// cualquier texto que viniera detrás de v=.
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function parseYouTubeId(url?: string | null): string {
  if (!url) return '';
  let raw = '';
  if (url.includes('youtube.com/watch?v=')) {
    raw = url.split('v=')[1]?.split('&')[0] || '';
  } else if (url.includes('youtu.be/')) {
    raw = url.split('youtu.be/')[1]?.split('?')[0] || '';
  } else if (url.includes('youtube.com/embed/')) {
    raw = url.split('embed/')[1]?.split('?')[0] || '';
  }
  return YOUTUBE_ID.test(raw) ? raw : '';
}
