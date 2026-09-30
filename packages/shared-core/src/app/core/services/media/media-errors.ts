import { MediaApiError } from '../../models/media';

// Códigos que la app sabe explicar. El resto cae en el mensaje genérico.
const KNOWN_CODES = [
  'MEDIA_PREMIUM_REQUIRED',
  'MEDIA_CONSENT_REQUIRED',
  'MEDIA_TOO_LARGE',
  'MEDIA_TOO_LONG',
  'MEDIA_NO_DURATION',
  'MEDIA_INVALID_FORMAT',
  'MEDIA_UNREADABLE',
  'MEDIA_UPLOAD_FAILED',
  'MEDIA_UPLOAD_INCOMPLETE',
  'MEDIA_UNAVAILABLE',
  'MEDIA_RATE_LIMIT',
  'MEDIA_LIBRARY_FULL',
  'FORM_CHECK_WEEKLY_LIMIT',
  'FORM_CHECK_NO_TRAINER',
  'FORM_CHECK_NO_COMMENTS',
  'TECHNIQUE_VIDEO_BAD_URL',
];

/** Clave de i18n (MEDIA.ERRORS.*) para un error de subida o de la API de media. */
export function mediaErrorKey(error: MediaApiError | any): string {
  const code = error?.code || error?.error?.code;
  return KNOWN_CODES.includes(code) ? `MEDIA.ERRORS.${code}` : 'MEDIA.ERRORS.GENERIC';
}
