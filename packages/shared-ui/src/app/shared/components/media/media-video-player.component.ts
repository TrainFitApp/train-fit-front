import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';

export interface VideoMarker {
  atSec: number;
  label?: string;
}

/**
 * Reproductor de vídeos subidos (MP4 de Bunny o archivo local en desarrollo).
 * Un <video> nativo: permite saltar a un segundo exacto, que es lo que usan
 * los comentarios de las revisiones de técnica. Las marcas se pintan sobre
 * la línea de tiempo.
 */
@Component({
  selector: 'app-media-video-player',
  templateUrl: './media-video-player.component.html',
  styleUrls: ['./media-video-player.component.scss'],
})
export class MediaVideoPlayerComponent implements OnDestroy {
  @Input() public src: string | null = null;
  @Input() public poster: string | null = null;
  @Input() public markers: VideoMarker[] = [];
  @Input() public status: 'pending' | 'processing' | 'ready' | 'failed' = 'ready';
  @Input() public autoplay = false;
  @Input() public ariaLabel = '';
  // Duración conocida (la del servidor), por si el archivo no la trae en sus
  // metadatos (p. ej. los .webm que graba un navegador dicen Infinity).
  @Input() public durationSec: number | null = null;
  @Output() public timeChange = new EventEmitter<number>();

  @ViewChild('video') private videoRef?: ElementRef<HTMLVideoElement>;

  public duration = 0;
  public activeMarker: number | null = null;

  public get currentTime(): number {
    return this.videoRef?.nativeElement.currentTime || 0;
  }

  public onMetadata(): void {
    const native = this.videoRef?.nativeElement.duration || 0;
    this.duration = Number.isFinite(native) && native > 0 ? native : this.durationSec || 0;
  }

  public onTimeUpdate(): void {
    const time = this.currentTime;
    this.timeChange.emit(time);
    // La marca activa es la última que ya se ha pasado (con 1 s de margen).
    const passed = (this.markers || []).filter((marker) => marker.atSec != null && marker.atSec <= time + 0.2);
    this.activeMarker = passed.length ? passed[passed.length - 1].atSec : null;
  }

  public seek(seconds: number, play = true): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;
    video.currentTime = Math.max(0, seconds);
    if (play) video.play().catch(() => undefined);
  }

  public pause(): void {
    this.videoRef?.nativeElement.pause();
  }

  public markerLeft(marker: VideoMarker): number {
    const total = this.duration || this.durationSec || 0;
    if (!total) return 0;
    return Math.min(100, Math.max(0, (marker.atSec / total) * 100));
  }

  public formatTime(seconds: number): string {
    const total = Math.max(0, Math.round(seconds));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  public trackMarker(_index: number, marker: VideoMarker): number {
    return marker.atSec;
  }

  public ngOnDestroy(): void {
    this.pause();
  }
}
