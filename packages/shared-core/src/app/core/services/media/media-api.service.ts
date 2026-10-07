import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import {
  CreateUploadResponse,
  FormCheckView,
  MediaAssetView,
  MediaPurpose,
  MediaStatusView,
  ProgressDayView,
  ProgressPose,
  ProgressTrainerShare,
  TechniqueVideoView,
} from '../../models/media';

export interface CreateUploadRequest {
  purpose: MediaPurpose;
  mime: string;
  bytes: number;
  durationSec?: number;
  width?: number;
  height?: number;
  thumbMime?: string;
  thumbBytes?: number;
}

/**
 * Todas las llamadas de fotos y vídeos (docs/plan-medidas-multimedia.md):
 * firma de subidas, días de progreso, revisiones de técnica y biblioteca del
 * entrenador. La subida de bytes va aparte (media-upload.service.ts).
 */
@Injectable({ providedIn: 'root' })
export class MediaApiService {
  constructor(private http: HttpService) {}

  // --- Subidas ---

  status(): Observable<MediaStatusView> {
    return this.http.get<MediaStatusView>('media/status').pipe(take(1));
  }

  giveConsent(): Observable<{ consentAt: string }> {
    return this.http.post<{ consentAt: string }>('media/consent', {}).pipe(take(1));
  }

  createUpload(body: CreateUploadRequest): Observable<CreateUploadResponse> {
    return this.http.post<CreateUploadResponse>('media/uploads', body).pipe(take(1));
  }

  completeUpload(assetId: string): Observable<{ asset: MediaAssetView }> {
    return this.http.post<{ asset: MediaAssetView }>(`media/uploads/${assetId}/complete`, {}).pipe(take(1));
  }

  cancelUpload(assetId: string): Observable<void> {
    return this.http.delete<void>(`media/uploads/${assetId}`).pipe(take(1));
  }

  // --- Progreso (cliente) ---

  listMyProgress(range: { from?: string; to?: string } = {}): Observable<{ days: ProgressDayView[] }> {
    const query = new URLSearchParams();
    if (range.from) query.set('from', range.from);
    if (range.to) query.set('to', range.to);
    const suffix = query.toString() ? `?${query}` : '';
    return this.http.get<{ days: ProgressDayView[] }>(`progress-media/mine${suffix}`).pipe(take(1));
  }

  setPhoto(date: string, pose: ProgressPose, assetId: string): Observable<{ day: ProgressDayView }> {
    return this.http.put<{ day: ProgressDayView }>(`progress-media/mine/${date}/photos/${pose}`, { assetId }).pipe(take(1));
  }

  removePhoto(date: string, pose: ProgressPose): Observable<{ day: ProgressDayView | null }> {
    return this.http.delete<{ day: ProgressDayView | null }>(`progress-media/mine/${date}/photos/${pose}`).pipe(take(1));
  }

  addVideo(date: string, assetId: string, note: string): Observable<{ day: ProgressDayView }> {
    return this.http.post<{ day: ProgressDayView }>(`progress-media/mine/${date}/videos`, { assetId, note }).pipe(take(1));
  }

  removeVideo(date: string, assetId: string): Observable<{ day: ProgressDayView | null }> {
    return this.http.delete<{ day: ProgressDayView | null }>(`progress-media/mine/${date}/videos/${assetId}`).pipe(take(1));
  }

  updateDay(date: string, body: { note?: string; hiddenFromTrainers?: boolean }): Observable<{ day: ProgressDayView }> {
    return this.http.patch<{ day: ProgressDayView }>(`progress-media/mine/${date}`, body).pipe(take(1));
  }

  listMyTrainers(): Observable<{ trainers: ProgressTrainerShare[] }> {
    return this.http.get<{ trainers: ProgressTrainerShare[] }>('progress-media/mine/trainers').pipe(take(1));
  }

  setHistoryShared(trainerId: string, shared: boolean): Observable<{ trainers: ProgressTrainerShare[] }> {
    return this.http
      .put<{ trainers: ProgressTrainerShare[] }>(`progress-media/mine/trainers/${trainerId}/history`, { shared })
      .pipe(take(1));
  }

  // --- Progreso (profesional) ---

  listClientProgress(clientId: string): Observable<{ since: string | null; historyShared: boolean; days: ProgressDayView[] }> {
    return this.http.get<any>(`trainer/clients/${clientId}/progress-media`).pipe(take(1));
  }

  clientProgressDay(clientId: string, dayId: string): Observable<{ day: ProgressDayView }> {
    return this.http.get<{ day: ProgressDayView }>(`trainer/clients/${clientId}/progress-media/${dayId}`).pipe(take(1));
  }

  // --- Revisiones de técnica (cliente) ---

  createFormCheck(body: {
    assetId: string;
    exerciseId?: string | null;
    exerciseName?: string;
    tableId?: string | null;
    date?: string;
    setSnapshot?: Record<string, any> | null;
    clientNote?: string;
  }): Observable<{ formCheck: FormCheckView }> {
    return this.http.post<{ formCheck: FormCheckView }>('form-checks/mine', body).pipe(take(1));
  }

  listMyFormChecks(exerciseId?: string | null): Observable<{ formChecks: FormCheckView[]; weeklyLimit: number; weeklyUsed: number }> {
    const suffix = exerciseId ? `?exerciseId=${encodeURIComponent(exerciseId)}` : '';
    return this.http.get<any>(`form-checks/mine${suffix}`).pipe(take(1));
  }

  markFormCheckSeen(id: string): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(`form-checks/mine/${id}/seen`, {}).pipe(take(1));
  }

  deleteMyFormCheck(id: string): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`form-checks/mine/${id}`).pipe(take(1));
  }

  // --- Revisiones de técnica (profesional) ---

  listTrainerFormChecks(params: { status?: 'pending' | 'reviewed'; clientId?: string } = {}): Observable<{
    formChecks: FormCheckView[];
    pendingCount: number;
    expiringSoonCount: number;
  }> {
    const query = new URLSearchParams();
    if (params.status) query.set('status', params.status);
    if (params.clientId) query.set('clientId', params.clientId);
    const suffix = query.toString() ? `?${query}` : '';
    return this.http.get<any>(`trainer/form-checks${suffix}`).pipe(take(1));
  }

  trainerFormChecksPendingCount(): Observable<{ pendingCount: number }> {
    return this.http.get<{ pendingCount: number }>('trainer/form-checks/pending-count').pipe(take(1));
  }

  getTrainerFormCheck(id: string): Observable<{ formCheck: FormCheckView }> {
    return this.http.get<{ formCheck: FormCheckView }>(`trainer/form-checks/${id}`).pipe(take(1));
  }

  addFormCheckComment(
    id: string,
    body: { atSec?: number | null; text?: string; techniqueVideoId?: string | null }
  ): Observable<{ formCheck: FormCheckView }> {
    return this.http.post<{ formCheck: FormCheckView }>(`trainer/form-checks/${id}/comments`, body).pipe(take(1));
  }

  removeFormCheckComment(id: string, commentId: string): Observable<{ formCheck: FormCheckView }> {
    return this.http.delete<{ formCheck: FormCheckView }>(`trainer/form-checks/${id}/comments/${commentId}`).pipe(take(1));
  }

  reviewFormCheck(id: string): Observable<{ formCheck: FormCheckView }> {
    return this.http.post<{ formCheck: FormCheckView }>(`trainer/form-checks/${id}/review`, {}).pipe(take(1));
  }

  keepFormCheck(id: string, keep: boolean): Observable<{ formCheck: FormCheckView }> {
    return this.http.put<{ formCheck: FormCheckView }>(`trainer/form-checks/${id}/keep`, { keep }).pipe(take(1));
  }

  // --- Vídeos de técnica ---

  myTechniqueVideos(): Observable<{ byExercise: Record<string, TechniqueVideoView> }> {
    return this.http.get<{ byExercise: Record<string, TechniqueVideoView> }>('technique-videos/mine').pipe(take(1));
  }

  listLibrary(): Observable<{ videos: TechniqueVideoView[] }> {
    return this.http.get<{ videos: TechniqueVideoView[] }>('trainer/technique-videos').pipe(take(1));
  }

  createLibraryVideo(body: {
    title: string;
    cues?: string;
    source: 'upload' | 'youtube' | 'vimeo';
    assetId?: string;
    externalUrl?: string;
    exerciseIds?: string[];
  }): Observable<{ video: TechniqueVideoView }> {
    return this.http.post<{ video: TechniqueVideoView }>('trainer/technique-videos', body).pipe(take(1));
  }

  updateLibraryVideo(
    id: string,
    body: { title?: string; cues?: string; exerciseIds?: string[]; externalUrl?: string }
  ): Observable<{ video: TechniqueVideoView }> {
    return this.http.put<{ video: TechniqueVideoView }>(`trainer/technique-videos/${id}`, body).pipe(take(1));
  }

  deleteLibraryVideo(id: string): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`trainer/technique-videos/${id}`).pipe(take(1));
  }

  clientVideoOverrides(clientId: string): Observable<{ overrides: { exerciseId: string; techniqueVideoId: string }[] }> {
    return this.http.get<any>(`trainer/clients/${clientId}/technique-videos`).pipe(take(1));
  }

  setClientVideoOverride(
    clientId: string,
    exerciseId: string,
    techniqueVideoId: string | null
  ): Observable<{ overrides: { exerciseId: string; techniqueVideoId: string }[] }> {
    return this.http
      .put<any>(`trainer/clients/${clientId}/technique-videos/${exerciseId}`, { techniqueVideoId })
      .pipe(take(1));
  }
}
