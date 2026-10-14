import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  MAX_VIDEO_BYTES,
  MAX_VIDEO_SECONDS,
  MediaApiError,
  MediaAssetView,
  MediaPurpose,
} from '../../models/media';
import { apiError, putWithProgress, tusUpload } from '../../utils/media-transport.util';
import { MediaApiService } from './media-api.service';

export interface UploadProgress {
  /** 0–1 */
  fraction: number;
  phase: 'preparing' | 'uploading' | 'finishing';
}

type ProgressFn = (progress: UploadProgress) => void;

// Foto recomprimida en el móvil: 1600 px de lado largo y JPEG 0,82 (≈400 KB).
// Recomprimir en un canvas borra el EXIF, GPS incluido.
const PHOTO_MAX_SIDE = 1600;
const PHOTO_QUALITY = 0.82;
const THUMB_MAX_SIDE = 400;
const THUMB_QUALITY = 0.75;

function loadImage(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(apiError('MEDIA_UNREADABLE'));
    };
    img.src = url;
  });
}

function canvasToJpeg(source: CanvasImageSource, width: number, height: number, maxSide: number, quality: number): Promise<Blob> {
  const scale = Math.min(1, maxSide / Math.max(width, height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.reject(apiError('MEDIA_UNREADABLE'));
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(apiError('MEDIA_UNREADABLE'))), 'image/jpeg', quality)
  );
}

interface VideoInfo {
  durationSec: number;
  width: number;
  height: number;
  poster: Blob | null;
}

/** Duración, tamaño y un fotograma de portada, sin subir nada todavía. */
function inspectVideo(file: Blob): Promise<VideoInfo> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    let settled = false;
    const finish = (info: VideoInfo | null, error?: MediaApiError) => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(url);
      video.removeAttribute('src');
      video.load();
      if (info) resolve(info);
      else reject(error || apiError('MEDIA_NO_DURATION'));
    };
    const timeout = setTimeout(() => finish(null, apiError('MEDIA_NO_DURATION')), 15000);

    // Los .webm que graba un navegador (MediaRecorder) llegan sin duración
    // (Infinity) hasta que se salta al final: se fuerza y luego se vuelve.
    let probingDuration = false;
    const seekToPoster = () => {
      const durationSec = Number(video.duration);
      if (!Number.isFinite(durationSec) || durationSec <= 0) {
        clearTimeout(timeout);
        finish(null, apiError('MEDIA_NO_DURATION'));
        return;
      }
      // Portada: un fotograma al principio (medio segundo, o la mitad si es más corto).
      video.currentTime = Math.min(0.5, durationSec / 2);
    };
    video.onloadedmetadata = () => {
      if (video.duration === Infinity) {
        probingDuration = true;
        video.currentTime = 1e101;
        return;
      }
      seekToPoster();
    };
    video.ondurationchange = () => {
      if (probingDuration && Number.isFinite(video.duration)) {
        probingDuration = false;
        seekToPoster();
      }
    };
    video.onseeked = async () => {
      if (probingDuration) return;
      clearTimeout(timeout);
      let poster: Blob | null = null;
      try {
        if (video.videoWidth && video.videoHeight) {
          poster = await canvasToJpeg(video, video.videoWidth, video.videoHeight, THUMB_MAX_SIDE, THUMB_QUALITY);
        }
      } catch {
        poster = null;
      }
      finish({ durationSec: Number(video.duration), width: video.videoWidth, height: video.videoHeight, poster });
    };
    video.onerror = () => {
      clearTimeout(timeout);
      finish(null, apiError('MEDIA_UNREADABLE'));
    };
    video.src = url;
  });
}

/**
 * Sube fotos y vídeos directamente al almacenamiento: el backend solo firma
 * y confirma (docs/plan-medidas-multimedia.md). Las promesas rechazan con
 * { code } — MEDIA_PREMIUM_REQUIRED, MEDIA_CONSENT_REQUIRED, MEDIA_TOO_LONG… —
 * para que cada pantalla enseñe el mensaje que toca.
 */
@Injectable({ providedIn: 'root' })
export class MediaUploadService {
  constructor(private api: MediaApiService) {}

  async uploadPhoto(file: Blob, purpose: MediaPurpose, onProgress?: ProgressFn): Promise<MediaAssetView> {
    onProgress?.({ fraction: 0, phase: 'preparing' });
    const img = await loadImage(file);
    const [photo, thumb] = await Promise.all([
      canvasToJpeg(img, img.naturalWidth, img.naturalHeight, PHOTO_MAX_SIDE, PHOTO_QUALITY),
      canvasToJpeg(img, img.naturalWidth, img.naturalHeight, THUMB_MAX_SIDE, THUMB_QUALITY),
    ]);
    const scale = Math.min(1, PHOTO_MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const signed = await firstValueFrom(
      this.api.createUpload({
        purpose,
        mime: 'image/jpeg',
        bytes: photo.size,
        width: Math.round(img.naturalWidth * scale),
        height: Math.round(img.naturalHeight * scale),
        thumbMime: 'image/jpeg',
        thumbBytes: thumb.size,
      })
    );
    const total = photo.size + thumb.size;
    const report = (loaded: number) => onProgress?.({ fraction: Math.min(0.98, loaded / total), phase: 'uploading' });
    try {
      await putWithProgress(signed.upload, photo, report);
      if (signed.thumbUpload) await putWithProgress(signed.thumbUpload, thumb, (loaded) => report(photo.size + loaded));
      onProgress?.({ fraction: 0.99, phase: 'finishing' });
      const { asset } = await firstValueFrom(this.api.completeUpload(signed.assetId));
      onProgress?.({ fraction: 1, phase: 'finishing' });
      return asset;
    } catch (error) {
      this.api.cancelUpload(signed.assetId).subscribe({ error: () => undefined });
      throw error;
    }
  }

  /** Comprueba duración y tamaño antes de firmar nada. */
  async inspectVideo(file: File): Promise<VideoInfo> {
    if (file.size > MAX_VIDEO_BYTES) throw apiError('MEDIA_TOO_LARGE');
    const info = await inspectVideo(file);
    if (info.durationSec > MAX_VIDEO_SECONDS + 1) throw apiError('MEDIA_TOO_LONG');
    return info;
  }

  async uploadVideo(file: File, purpose: MediaPurpose, onProgress?: ProgressFn, known?: VideoInfo): Promise<MediaAssetView> {
    onProgress?.({ fraction: 0, phase: 'preparing' });
    const info = known || (await this.inspectVideo(file));
    const mime = (file.type || 'video/mp4').toLowerCase();
    const signed = await firstValueFrom(
      this.api.createUpload({
        purpose,
        mime,
        bytes: file.size,
        durationSec: Math.round(info.durationSec * 10) / 10,
        width: info.width || undefined,
        height: info.height || undefined,
        ...(info.poster ? { thumbMime: 'image/jpeg', thumbBytes: info.poster.size } : {}),
      })
    );
    const total = file.size + (info.poster?.size || 0);
    const report = (loaded: number) => onProgress?.({ fraction: Math.min(0.98, loaded / total), phase: 'uploading' });
    try {
      if (signed.thumbUpload && info.poster) await putWithProgress(signed.thumbUpload, info.poster);
      if (signed.upload.method === 'TUS') {
        await tusUpload(signed.upload, file, (loaded) => report((info.poster?.size || 0) + loaded));
      } else {
        await putWithProgress(signed.upload, file, (loaded) => report((info.poster?.size || 0) + loaded));
      }
      onProgress?.({ fraction: 0.99, phase: 'finishing' });
      const { asset } = await firstValueFrom(this.api.completeUpload(signed.assetId));
      onProgress?.({ fraction: 1, phase: 'finishing' });
      return asset;
    } catch (error) {
      this.api.cancelUpload(signed.assetId).subscribe({ error: () => undefined });
      throw error;
    }
  }
}
