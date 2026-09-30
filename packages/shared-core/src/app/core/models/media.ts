// Fotos y vídeos (docs/plan-medidas-multimedia.md). Espejo de las vistas que
// devuelve el backend: las URL vienen firmadas y caducan (urlExpiresAt).

export type MediaPurpose = 'progress_photo' | 'progress_video' | 'form_check' | 'technique_video';
export type MediaKind = 'image' | 'video';
export type MediaStatus = 'pending' | 'processing' | 'ready' | 'failed';
export type ProgressPose = 'front' | 'side' | 'back' | 'extra';

export const PROGRESS_POSES: ProgressPose[] = ['front', 'side', 'back', 'extra'];
// Las tres que se piden siempre; `extra` es opcional.
export const REQUIRED_POSES: ProgressPose[] = ['front', 'side', 'back'];

export const MAX_VIDEO_SECONDS = 180;
export const MAX_VIDEO_BYTES = 1024 * 1024 * 1024;

export interface MediaAssetView {
  id: string;
  purpose: MediaPurpose;
  kind: MediaKind;
  status: MediaStatus;
  url: string | null;
  thumbUrl: string | null;
  mime: string;
  bytes: number;
  width: number | null;
  height: number | null;
  durationSec: number | null;
  createdAt: string;
  urlExpiresAt: string;
}

export interface MediaStatusView {
  enabled: boolean;
  imagesEnabled: boolean;
  videosEnabled: boolean;
  canUpload: boolean;
  reason: 'premium_required' | null;
  hasActiveTrainer: boolean;
  hasTrainingTrainer: boolean;
  consentAt: string | null;
  formChecksPerWeek: number;
  libraryBytes: number | null;
  libraryUsedBytes: number | null;
}

export interface UploadTarget {
  method: 'PUT' | 'TUS';
  url: string;
  headers: Record<string, string>;
  metadata?: Record<string, string>;
}

export interface CreateUploadResponse {
  assetId: string;
  upload: UploadTarget;
  thumbUpload: UploadTarget | null;
}

export interface ProgressPhotoView {
  pose: ProgressPose;
  asset: MediaAssetView;
}

export interface ProgressVideoView {
  note: string;
  createdAt: string;
  asset: MediaAssetView;
}

export interface ProgressDayView {
  id: string;
  date: string;
  note: string;
  hiddenFromTrainers: boolean;
  answersCheckin: boolean;
  answersCheckinFor?: boolean;
  photos: ProgressPhotoView[];
  videos: ProgressVideoView[];
  anthropometry: Record<string, any> | null;
}

export interface ProgressTrainerShare {
  trainerId: string;
  name: string;
  scopes: string[];
  since: string | null;
  historyShared: boolean;
  historyAsked: boolean;
  previousDays: number;
}

export interface FormCheckComment {
  id: string;
  atSec: number | null;
  text: string;
  createdAt: string;
  techniqueVideo: TechniqueVideoView | null;
}

export interface FormCheckView {
  id: string;
  clientId: string;
  clientName?: string;
  trainerId: string;
  exerciseId: string | null;
  exerciseName: string;
  tableId: string | null;
  date: string;
  setSnapshot: Record<string, any> | null;
  clientNote: string;
  status: 'pending' | 'reviewed';
  reviewedAt: string | null;
  createdAt: string;
  keep: boolean;
  expiresAt: string | null;
  daysLeft: number | null;
  expiringSoon: boolean;
  unseenFeedback: boolean;
  video: MediaAssetView | null;
  comments: FormCheckComment[];
}

export interface TechniqueVideoView {
  id: string;
  trainerId: string;
  trainerName: string;
  title: string;
  cues: string;
  source: 'upload' | 'youtube' | 'vimeo';
  externalUrl: string | null;
  youtubeId: string | null;
  vimeoId: string | null;
  video: MediaAssetView | null;
  exercises: { id: string; name: string }[];
  updatedAt: string;
  assignedToYou?: boolean;
}

/** Error de la API con su código (MEDIA_PREMIUM_REQUIRED, MEDIA_CONSENT_REQUIRED…). */
export interface MediaApiError {
  status?: number;
  code?: string;
  message?: string;
}
