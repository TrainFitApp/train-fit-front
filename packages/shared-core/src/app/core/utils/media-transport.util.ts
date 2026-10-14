import type { MediaApiError, UploadTarget } from '../models/media';

// Envío de fotos y vídeos directo al almacenamiento (R2 y Bunny). Vive fuera
// del servicio de Angular para poder probarlo con `node --test`.

// Trozos de la subida TUS: si se corta la conexión, se reanuda desde el último.
// En las apps nativas cada trozo cruza el puente de Capacitor como base64
// (un tercio más grande) y pasa varias veces por la memoria de Java: 4 MB
// mantienen el pico bajo en móviles modestos.
export const TUS_CHUNK_BYTES = 4 * 1024 * 1024;
const TUS_MAX_RETRIES = 5;
const TUS_CONTENT_TYPE = 'application/offset+octet-stream';

export function apiError(code: string, message = ''): MediaApiError {
  return { code, message };
}

/**
 * Cuerpo que sobrevive al puente de Capacitor.
 *
 * Las apps nativas tienen `CapacitorHttp` activo: todo XMLHttpRequest a una
 * URL absoluta (R2, Bunny) sale por el HTTP nativo, y el puente solo sabe
 * convertir cuerpos `File`, `FormData`, `Uint8Array` y poco más. Un `Blob`
 * a secas —lo que devuelven `canvas.toBlob` y `File.slice`— lo trata como
 * JSON y manda `{}`: el almacenamiento lo rechaza (firma y longitud no
 * cuadran) y la subida falla al instante. Un `File` con el mismo contenido sí
 * viaja entero. En la web da igual: un `File` es un `Blob`.
 */
export function asUploadBody(body: Blob, type: string = body.type): File {
  const mime = type.toLowerCase();
  if (body instanceof File && body.type === mime) return body;
  return new File([body], 'upload', { type: mime });
}

function headerValue(headers: Record<string, string>, name: string): string | undefined {
  const key = Object.keys(headers).find((candidate) => candidate.toLowerCase() === name);
  return key === undefined ? undefined : headers[key];
}

/**
 * PUT de un objeto con URL firmada. `onProgress` recibe los bytes enviados:
 * en el navegador, mientras sube; en las apps nativas el puente no emite
 * progreso, así que al terminar se avisa con el total.
 */
export function putWithProgress(target: UploadTarget, body: Blob, onProgress?: (loaded: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const headers = target.headers || {};
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', target.url);
    Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    xhr.upload.onprogress = (event) => onProgress?.(event.loaded);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(body.size);
        resolve();
      } else {
        reject(apiError('MEDIA_UPLOAD_FAILED'));
      }
    };
    xhr.onerror = () => reject(apiError('MEDIA_UPLOAD_FAILED'));
    xhr.onabort = () => reject(apiError('MEDIA_UPLOAD_ABORTED'));
    xhr.send(asUploadBody(body, headerValue(headers, 'content-type') ?? body.type));
  });
}

function base64(value: string): string {
  return btoa(unescape(encodeURIComponent(value)));
}

/** PATCH de un trozo TUS. Devuelve el nuevo offset. */
function tusPatch(location: string, headers: Record<string, string>, chunk: Blob, offset: number, onProgress: (loaded: number) => void): Promise<number> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', location);
    Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    xhr.setRequestHeader('Tus-Resumable', '1.0.0');
    xhr.setRequestHeader('Upload-Offset', String(offset));
    xhr.setRequestHeader('Content-Type', TUS_CONTENT_TYPE);
    xhr.upload.onprogress = (event) => onProgress(offset + event.loaded);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const next = Number(xhr.getResponseHeader('Upload-Offset')) || offset + chunk.size;
        onProgress(next);
        resolve(next);
      } else {
        reject(apiError('MEDIA_UPLOAD_FAILED'));
      }
    };
    xhr.onerror = () => reject(apiError('MEDIA_UPLOAD_FAILED'));
    xhr.send(asUploadBody(chunk, TUS_CONTENT_TYPE));
  });
}

async function tusOffset(location: string, headers: Record<string, string>): Promise<number> {
  const response = await fetch(location, { method: 'HEAD', headers: { ...headers, 'Tus-Resumable': '1.0.0' } });
  if (!response.ok) throw apiError('MEDIA_UPLOAD_FAILED');
  return Number(response.headers.get('Upload-Offset')) || 0;
}

/**
 * Subida TUS reanudable (Bunny Stream). Implementación mínima del protocolo:
 * crear, subir por trozos y, si un trozo falla, preguntar el offset y seguir.
 */
export async function tusUpload(target: UploadTarget, file: Blob, onProgress: (loaded: number) => void): Promise<void> {
  const metadata = Object.entries(target.metadata || {})
    .map(([key, value]) => `${key} ${base64(value)}`)
    .join(',');
  const created = await fetch(target.url, {
    method: 'POST',
    headers: {
      ...target.headers,
      'Tus-Resumable': '1.0.0',
      'Upload-Length': String(file.size),
      'Upload-Metadata': metadata,
    },
  });
  const locationHeader = created.headers.get('Location');
  if (!created.ok || !locationHeader) throw apiError('MEDIA_UPLOAD_FAILED');
  const location = new URL(locationHeader, target.url).toString();

  let offset = 0;
  let retries = 0;
  while (offset < file.size) {
    try {
      offset = await tusPatch(location, target.headers, file.slice(offset, offset + TUS_CHUNK_BYTES), offset, onProgress);
      retries = 0;
    } catch (error) {
      retries += 1;
      if (retries > TUS_MAX_RETRIES) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
      offset = await tusOffset(location, target.headers).catch(() => offset);
    }
  }
}
