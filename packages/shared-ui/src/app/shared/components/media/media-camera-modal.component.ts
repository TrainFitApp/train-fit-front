import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

export type CameraMode = 'photo' | 'video';
type Facing = 'user' | 'environment';
type CameraState = 'starting' | 'ready' | 'countdown' | 'recording' | 'error';

export const CAMERA_TIMERS = [0, 3, 5, 10] as const;
type CameraTimer = (typeof CAMERA_TIMERS)[number];

// Preferencias del propio móvil: se recuerdan entre sesiones.
const PREFS_KEY = 'tf-camera-prefs';

// Orden de preferencia al grabar: Safari graba MP4; Chrome/Android, WebM.
const RECORDER_TYPES = ['video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];

export interface CameraResult {
  file: File;
}

/**
 * Cámara dentro de la app para fotos de progreso y vídeos: temporizador
 * (3/5/10 s) con cuenta atrás que suena, para poder apoyar el móvil y
 * colocarse; cambio de cámara; y, en fotos, la foto anterior de esa pose
 * superpuesta para repetir el encuadre.
 *
 * Cierra con role 'captured' y { file }. Como <input capture>, lo capturado
 * no pasa por el carrete. Si el móvil no deja abrir la cámara aquí (permiso
 * denegado, WebView antiguo, http en livereload) ofrece la cámara del
 * sistema, que es lo que había antes.
 */
@Component({
  selector: 'app-media-camera-modal',
  templateUrl: './media-camera-modal.component.html',
  styleUrls: ['./media-camera-modal.component.scss'],
})
export class MediaCameraModalComponent implements AfterViewInit, OnDestroy {
  @Input() public mode: CameraMode = 'photo';
  @Input() public maxDurationSec = 180;
  // Foto anterior de la misma pose, en transparencia sobre la imagen.
  @Input() public referenceUrl: string | null = null;
  @Input() public title = '';

  @ViewChild('preview') private previewRef?: ElementRef<HTMLVideoElement>;

  public readonly timers = CAMERA_TIMERS;
  public state: CameraState = 'starting';
  public errorKey = 'MEDIA.CAMERA_UNAVAILABLE';
  public facing: Facing = 'environment';
  public timer: CameraTimer = 0;
  public countdown = 0;
  public elapsed = 0;
  public showGhost = true;
  public canFlip = false;
  public flash = false;

  private stream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private discardRecording = false;
  private countdownHandle: ReturnType<typeof setInterval> | null = null;
  private recordHandle: ReturnType<typeof setInterval> | null = null;
  private audio: AudioContext | null = null;
  private destroyed = false;

  constructor(private modalController: ModalController, private zone: NgZone) {}

  public ngAfterViewInit(): void {
    this.restorePrefs();
    void this.start();
  }

  public ngOnDestroy(): void {
    this.destroyed = true;
    this.clearTimers();
    this.discardRecording = true;
    if (this.recorder?.state === 'recording') this.recorder.stop();
    this.stopStream();
    void this.audio?.close().catch(() => undefined);
  }

  // --- Cámara ---

  public async start(): Promise<void> {
    this.stopStream();
    this.state = 'starting';
    const media = typeof navigator !== 'undefined' ? navigator.mediaDevices : undefined;
    if (!media?.getUserMedia || (this.mode === 'video' && typeof MediaRecorder === 'undefined')) {
      this.fail('MEDIA.CAMERA_UNAVAILABLE');
      return;
    }
    try {
      const stream = await media.getUserMedia({
        video: { facingMode: this.facing, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      if (this.destroyed) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      const video = this.previewRef?.nativeElement;
      if (video) {
        video.srcObject = stream;
        video.muted = true;
        await video.play().catch(() => undefined);
      }
      this.state = 'ready';
      const devices = await media.enumerateDevices().catch(() => [] as MediaDeviceInfo[]);
      this.canFlip = devices.filter((device) => device.kind === 'videoinput').length > 1;
    } catch (error) {
      const name = (error as DOMException)?.name;
      this.fail(name === 'NotAllowedError' || name === 'SecurityError' ? 'MEDIA.CAMERA_DENIED' : 'MEDIA.CAMERA_UNAVAILABLE');
    }
  }

  private fail(key: string): void {
    this.stopStream();
    this.errorKey = key;
    this.state = 'error';
  }

  private stopStream(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
  }

  public flip(): void {
    if (this.state !== 'ready') return;
    this.facing = this.facing === 'user' ? 'environment' : 'user';
    this.savePrefs();
    void this.start();
  }

  public setTimer(timer: CameraTimer): void {
    if (this.state === 'countdown' || this.state === 'recording') return;
    this.timer = timer;
    this.savePrefs();
  }

  // --- Disparador ---

  public shutter(): void {
    if (this.state === 'recording') {
      this.stopRecording();
      return;
    }
    if (this.state === 'countdown') {
      this.cancelCountdown();
      return;
    }
    if (this.state !== 'ready') return;
    // El AudioContext tiene que nacer en un toque del usuario (iOS).
    this.prepareAudio();
    if (this.timer) this.runCountdown(this.timer);
    else this.fire();
  }

  private fire(): void {
    if (this.mode === 'photo') void this.capturePhoto();
    else this.startRecording();
  }

  private runCountdown(seconds: number): void {
    this.state = 'countdown';
    this.countdown = seconds;
    this.beep(false);
    this.countdownHandle = setInterval(() => {
      this.zone.run(() => {
        this.countdown -= 1;
        if (this.countdown <= 0) {
          this.clearTimers();
          this.beep(true);
          this.state = 'ready';
          this.fire();
        } else {
          this.beep(false);
        }
      });
    }, 1000);
  }

  private cancelCountdown(): void {
    this.clearTimers();
    this.countdown = 0;
    this.state = 'ready';
  }

  private async capturePhoto(): Promise<void> {
    const video = this.previewRef?.nativeElement;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Se guarda sin espejo aunque la vista previa de la frontal lo lleve.
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.flash = true;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
    if (!blob) {
      this.flash = false;
      return;
    }
    this.finish(new File([blob], `foto-${Date.now()}.jpg`, { type: 'image/jpeg' }));
  }

  private startRecording(): void {
    if (!this.stream) return;
    const mimeType = RECORDER_TYPES.find((type) => MediaRecorder.isTypeSupported?.(type));
    try {
      this.recorder = new MediaRecorder(this.stream, mimeType ? { mimeType, videoBitsPerSecond: 2_500_000 } : undefined);
    } catch {
      this.fail('MEDIA.CAMERA_UNAVAILABLE');
      return;
    }
    this.chunks = [];
    this.discardRecording = false;
    this.recorder.ondataavailable = (event) => {
      if (event.data?.size) this.chunks.push(event.data);
    };
    this.recorder.onstop = () =>
      this.zone.run(() => {
        if (this.discardRecording || !this.chunks.length) return;
        // Sin ";codecs=…": el servidor valida el tipo base.
        const type = (this.recorder?.mimeType || mimeType || 'video/webm').split(';')[0];
        const extension = type === 'video/mp4' ? 'mp4' : 'webm';
        this.finish(new File(this.chunks, `video-${Date.now()}.${extension}`, { type }));
      });
    this.recorder.start(1000);
    this.state = 'recording';
    this.elapsed = 0;
    const startedAt = Date.now();
    this.recordHandle = setInterval(() => {
      this.zone.run(() => {
        this.elapsed = Math.floor((Date.now() - startedAt) / 1000);
        if (this.elapsed >= this.maxDurationSec) this.stopRecording();
      });
    }, 250);
  }

  private stopRecording(): void {
    this.clearTimers();
    if (this.recorder?.state === 'recording') this.recorder.stop();
    this.state = 'ready';
  }

  private finish(file: File): void {
    this.stopStream();
    void this.modalController.dismiss({ file } as CameraResult, 'captured');
  }

  // Cámara del sistema: la de siempre, cuando esta no se puede abrir.
  public onSystemFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file) this.finish(file);
  }

  public close(): void {
    this.clearTimers();
    this.discardRecording = true;
    if (this.recorder?.state === 'recording') this.recorder.stop();
    this.stopStream();
    void this.modalController.dismiss(null, 'cancel');
  }

  // --- Utilidades ---

  public time(seconds: number): string {
    const total = Math.max(0, Math.floor(seconds));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  private clearTimers(): void {
    if (this.countdownHandle) clearInterval(this.countdownHandle);
    if (this.recordHandle) clearInterval(this.recordHandle);
    this.countdownHandle = null;
    this.recordHandle = null;
  }

  private prepareAudio(): void {
    try {
      const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!this.audio && AudioCtor) this.audio = new AudioCtor();
      void this.audio?.resume();
    } catch {
      this.audio = null;
    }
  }

  // Un pitido por segundo y uno más agudo al disparar: con el móvil apoyado
  // lejos, la cuenta atrás no se ve.
  private beep(last: boolean): void {
    navigator.vibrate?.(last ? 120 : 40);
    const ctx = this.audio;
    if (!ctx) return;
    try {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.frequency.value = last ? 1320 : 880;
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (last ? 0.25 : 0.12));
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + (last ? 0.25 : 0.12));
    } catch {
      // Sin sonido no pasa nada: la cuenta atrás se ve igual.
    }
  }

  private restorePrefs(): void {
    try {
      const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
      if (CAMERA_TIMERS.includes(prefs.timer)) this.timer = prefs.timer;
      if (prefs.facing === 'user' || prefs.facing === 'environment') this.facing = prefs.facing;
    } catch {
      // Sin almacenamiento: valores por defecto.
    }
  }

  private savePrefs(): void {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ timer: this.timer, facing: this.facing }));
    } catch {
      // Sin almacenamiento: solo dura esta sesión.
    }
  }
}

/** Abre la cámara a pantalla completa y devuelve lo capturado (o null). */
export async function openMediaCamera(
  modalController: ModalController,
  props: { mode: CameraMode; title?: string; referenceUrl?: string | null; maxDurationSec?: number }
): Promise<File | null> {
  const modal = await modalController.create({
    component: MediaCameraModalComponent,
    componentProps: props,
    cssClass: 'fullscreen-modal',
  });
  await modal.present();
  const { data, role } = await modal.onWillDismiss<CameraResult>();
  return role === 'captured' && data?.file ? data.file : null;
}
