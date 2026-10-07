import { Injectable, computed, signal } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { NotificationService } from '../util/notification.service';

export interface ActiveRestTimer {
  workoutId: string;
  setId: string;
  totalSeconds: number;
  // Timestamp (epoch ms) en el que termina el descanso. Se recalcula en cada
  // resume/addSeconds — nunca se acumula un contador, mismo patrón que el
  // cronómetro de entrenamiento (current-workout.page.ts#syncElapsedTimer).
  restEndsAt: number;
}

interface PersistedRestTimer {
  active: ActiveRestTimer;
  paused: boolean;
  pausedRemainingMs: number;
}

@Injectable()
export class RestTimerService {
  // Sobrevive a que la app se cierre/mate en 2º plano — se restaura en el
  // constructor (nueva instancia de servicio tras un cold start).
  private readonly STORAGE_KEY = 'trainfit_rest_timer';

  private readonly _active = signal<ActiveRestTimer | null>(null);
  private readonly _paused = signal(false);
  private readonly _pausedRemainingMs = signal(0);
  private readonly _now = signal(Date.now());
  private tickHandle: ReturnType<typeof setInterval> | undefined;

  public readonly active = this._active.asReadonly();
  public readonly paused = this._paused.asReadonly();

  public readonly remainingSeconds = computed(() => {
    const active = this._active();
    if (!active) return 0;
    if (this._paused()) return Math.ceil(this._pausedRemainingMs() / 1000);
    return Math.max(0, Math.ceil((active.restEndsAt - this._now()) / 1000));
  });

  public readonly isRunning = computed(
    () => !!this._active() && !this._paused() && this.remainingSeconds() > 0
  );
  public readonly isFinished = computed(
    () => !!this._active() && this.remainingSeconds() === 0
  );

  constructor(private notificationService: NotificationService) {
    this.restoreFromStorage();
    this.listenAppStateChange();
  }

  public start(workoutId: string, setId: string, seconds: number): void {
    if (!seconds || seconds <= 0) return;
    this.stopTicker();
    this._paused.set(false);
    this._pausedRemainingMs.set(0);
    this._now.set(Date.now());
    this._active.set({
      workoutId,
      setId,
      totalSeconds: seconds,
      restEndsAt: Date.now() + seconds * 1000,
    });
    this.startTicker();
    this.persist();
    void this.notificationService.scheduleRestEndNotification(seconds);
  }

  public pause(): void {
    const active = this._active();
    if (!active || this._paused()) return;
    this._pausedRemainingMs.set(Math.max(0, active.restEndsAt - Date.now()));
    this._paused.set(true);
    this.stopTicker();
    this.persist();
    void this.notificationService.cancelRestEndNotification();
  }

  public resume(): void {
    const active = this._active();
    if (!active || !this._paused()) return;
    this._active.set({ ...active, restEndsAt: Date.now() + this._pausedRemainingMs() });
    this._paused.set(false);
    this.startTicker();
    this.persist();
    void this.notificationService.scheduleRestEndNotification(this.remainingSeconds());
  }

  public addSeconds(delta: number): void {
    const active = this._active();
    if (!active) return;

    if (this._paused()) {
      this._pausedRemainingMs.set(Math.max(0, this._pausedRemainingMs() + delta * 1000));
    } else {
      this._active.set({
        ...active,
        restEndsAt: Math.max(Date.now(), active.restEndsAt + delta * 1000),
      });
      if (!this.tickHandle && this.remainingSeconds() > 0) this.startTicker();
    }

    this.persist();
    if (!this._paused()) {
      void this.notificationService.scheduleRestEndNotification(this.remainingSeconds());
    }
  }

  public skip(): void {
    this.stopTicker();
    this._active.set(null);
    this._paused.set(false);
    this._pausedRemainingMs.set(0);
    this.clearPersisted();
    void this.notificationService.cancelRestEndNotification();
  }

  private startTicker(): void {
    this.stopTicker();
    this.tickHandle = setInterval(() => {
      this._now.set(Date.now());
      if (this.remainingSeconds() === 0) this.stopTicker();
    }, 1000);
  }

  private stopTicker(): void {
    if (this.tickHandle) clearInterval(this.tickHandle);
    this.tickHandle = undefined;
  }

  private persist(): void {
    const active = this._active();
    if (!active) return;
    const payload: PersistedRestTimer = {
      active,
      paused: this._paused(),
      pausedRemainingMs: this._pausedRemainingMs(),
    };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Almacenamiento no disponible: el timer sigue funcionando en memoria,
      // simplemente no sobrevivirá a un cold start.
    }
  }

  private clearPersisted(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // no-op
    }
  }

  private restoreFromStorage(): void {
    let stored: PersistedRestTimer | null = null;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      stored = raw ? JSON.parse(raw) : null;
    } catch {
      stored = null;
    }
    if (!stored?.active) return;

    this._active.set(stored.active);
    this._paused.set(!!stored.paused);
    this._pausedRemainingMs.set(stored.pausedRemainingMs || 0);
    this._now.set(Date.now());

    if (!this._paused() && this.remainingSeconds() > 0) {
      this.startTicker();
    }
  }

  private listenAppStateChange(): void {
    if (!Capacitor.isNativePlatform()) return;
    void CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (!isActive || !this._active()) return;
      this._now.set(Date.now());
      if (!this._paused() && this.remainingSeconds() === 0) this.stopTicker();
    });
  }
}
