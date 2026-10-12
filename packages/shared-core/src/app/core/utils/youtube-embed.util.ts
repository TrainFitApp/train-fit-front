import { environment } from 'src/environments/environment';

// Reproductor de YouTube de los iframes de las tres apps. La página la sirve
// la API (GET /api/embed/youtube), no la web pública: hace falta una página
// intermedia porque en iOS la app es capacitor://localhost y YouTube exige un
// Referer https (error 153). `id` sale de parseYouTubeId (youtube-id.util).
export function youTubeEmbedUrl(id: string, { autoplay = false } = {}): string {
  return `${environment.API_URL}/embed/youtube?v=${encodeURIComponent(id)}${autoplay ? '&autoplay=1' : ''}`;
}
