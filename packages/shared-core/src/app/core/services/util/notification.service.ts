import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications, LocalNotificationSchema, Schedule, Channel } from '@capacitor/local-notifications';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export type NotificationFrequency = 'daily' | 'weekly' | 'interval';

export interface NotificationSettings {
  enabled: boolean;
  hour: number;
  minute: number;
  frequency: NotificationFrequency;
  weekday?: number;
  intervalDays?: number;
}

@Injectable()
export class NotificationService {
  private readonly STORAGE_KEY = 'trainfit_notification_settings';
  private readonly CHANNEL_ID = 'trainfit-weight-reminder';
  private cachedSettings: NotificationSettings | null = null;

  constructor() {}

  public async initialize(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    await this.createChannel();
    const settings = await this.getSettings();
    if (settings.enabled) {
      await this.cancelAll();
      await this.scheduleReminder(settings);
    }
  }

  private async createChannel(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    try {
      const channel: Channel = {
        id: this.CHANNEL_ID,
        name: 'Recordatorio de peso',
        description: 'Notificaciones para recordar registrar tu peso',
        importance: 4,
        vibration: true,
        lights: true,
      };
      await LocalNotifications.createChannel(channel);
    } catch (e) {
      console.warn('[NotificationService] Error creating channel', e);
    }
  }

  public async requestExactAlarmIfNeeded(): Promise<void> {
    if (Capacitor.getPlatform() !== 'android') return;
    try {
      const status = await LocalNotifications.checkExactNotificationSetting();
      if (status.exact_alarm !== 'granted') {
        await LocalNotifications.changeExactNotificationSetting();
      }
    } catch (e) {
      console.warn('[NotificationService] Error requesting exact alarm', e);
    }
  }

  public async requestPermissions(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;
    const perm = await LocalNotifications.requestPermissions();
    const granted = perm.display === 'granted';
    if (granted && Capacitor.getPlatform() === 'android') {
      await this.requestExactAlarmIfNeeded();
    }
    return granted;
  }

  public async getSettings(): Promise<NotificationSettings> {
    if (this.cachedSettings) return this.cachedSettings;
    try {
      const { value } = await SecureStoragePlugin.get({ key: this.STORAGE_KEY });
      if (!value) {
        return { enabled: false, hour: 9, minute: 0, frequency: 'daily' };
      }
      this.cachedSettings = JSON.parse(value);
      return this.cachedSettings;
    } catch {
      return { enabled: false, hour: 9, minute: 0, frequency: 'daily' };
    }
  }

  public async saveAndSchedule(settings: NotificationSettings): Promise<void> {
    this.cachedSettings = settings;
    try {
      await SecureStoragePlugin.set({ key: this.STORAGE_KEY, value: JSON.stringify(settings) });
    } catch (e) {
      console.warn('[NotificationService] Error saving settings', e);
    }
    if (settings.enabled) {
      await this.cancelAll();
      await this.scheduleReminder(settings);
    } else {
      await this.cancelAll();
    }
  }

  public async cancelAll(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({
        notifications: pending.notifications.map((n) => ({ id: n.id })),
      });
    }
  }

  private async scheduleReminder(settings: NotificationSettings): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;

    const { hour, minute, frequency, weekday, intervalDays } = settings;
    const title = 'TrainFit';
    const body = '¡No olvides registrar tu peso hoy!';

    if (frequency === 'daily') {
      const schedule: Schedule = {
        on: { hour, minute },
        allowWhileIdle: true,
      };
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title,
            body,
            schedule,
            channelId: this.CHANNEL_ID,
          },
        ],
      });
    } else if (frequency === 'weekly' && weekday) {
      const schedule: Schedule = {
        on: { weekday, hour, minute },
        allowWhileIdle: true,
      };
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title,
            body,
            schedule,
            channelId: this.CHANNEL_ID,
          },
        ],
      });
    } else if (frequency === 'interval' && intervalDays && intervalDays > 0) {
      await this.scheduleIntervalNotifications(hour, minute, intervalDays, title, body);
    }
  }

  private async scheduleIntervalNotifications(
    hour: number,
    minute: number,
    intervalDays: number,
    title: string,
    body: string,
  ): Promise<void> {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(hour, minute, 0, 0);

    if (targetTime.getTime() <= now.getTime()) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const notifications: LocalNotificationSchema[] = [];
    let id = 100;

    for (let i = 0; i < 30; i++) {
      const fireDate = new Date(targetTime);
      fireDate.setDate(fireDate.getDate() + intervalDays * i);

      notifications.push({
        id: id++,
        title,
        body,
        schedule: { at: fireDate, allowWhileIdle: true },
        channelId: this.CHANNEL_ID,
      });
    }

    await LocalNotifications.schedule({ notifications });
  }
}
