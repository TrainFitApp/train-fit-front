import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })
export class CheckinPushService {
  public readonly native = Capacitor.isNativePlatform();
  public enabled = false;
  private initialized = false;
  private token: string | null = null;
  private initializing?: Promise<void>;
  constructor(private auth: AuthService, private http: HttpService, private router: Router, private zone: NgZone) {}

  public initialize(): Promise<void> {
    if (!this.native || this.initialized) return Promise.resolve();
    if (!this.initializing) this.initializing = this.setup().finally(() => { this.initializing = undefined; });
    return this.initializing;
  }
  private async setup(): Promise<void> {
    await PushNotifications.addListener('registration', token => {
      this.token = token.value;
      void this.bindDevice().catch(() => { this.enabled = false; });
    });
    await PushNotifications.addListener('registrationError', () => { this.enabled = false; });
    await PushNotifications.addListener('pushNotificationActionPerformed', event => {
      const requestId: unknown = event.notification.data?.requestId;
      this.zone.run(() => void this.router.navigate(['/my-checkins'], {
        queryParams: typeof requestId === 'string' && /^[a-f\d]{24}$/i.test(requestId) ? { requestId } : {},
      }));
    });
    if (Capacitor.getPlatform() === 'android') await PushNotifications.createChannel({ id: 'checkins', name: 'Check-ins', description: 'Solicitudes y revisiones de tu profesional', importance: 4 });
    this.initialized = true;
    this.auth.user$.subscribe(user => {
      if (user) void this.registerIfGranted().catch(() => { this.enabled = false; });
      else this.enabled = false;
    });
  }
  private async bindDevice(): Promise<void> {
    if (!this.auth.user || !this.token) return;
    await firstValueFrom(this.http.post('notifications/devices', { platform: Capacitor.getPlatform(), token: this.token }));
    this.zone.run(() => { this.enabled = true; });
  }
  private async registerIfGranted(): Promise<void> {
    const permission = await PushNotifications.checkPermissions();
    if (permission.receive !== 'granted') return;
    if (this.token) await this.bindDevice();
    else await PushNotifications.register();
  }
  public async enable(): Promise<boolean> {
    if (!this.native) return false;
    await this.initialize();
    let permission = await PushNotifications.checkPermissions();
    if (permission.receive === 'prompt' || permission.receive === 'prompt-with-rationale') permission = await PushNotifications.requestPermissions();
    if (permission.receive !== 'granted') return false;
    await this.registerIfGranted();
    return true;
  }
}
