import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications, LocalNotificationSchema, Schedule } from '@capacitor/local-notifications';

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

  constructor() {}

  public async initialize(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    const settings = this.getSettings();
    if (settings.enabled) {
      await this.cancelAll();
      await this.scheduleReminder(settings);
    }
  }

  public async requestPermissions(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;
    const perm = await LocalNotifications.requestPermissions();
    return perm.display === 'granted';
  }

  public getSettings(): NotificationSettings {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      return { enabled: false, hour: 9, minute: 0, frequency: 'daily' };
    }
    return JSON.parse(raw);
  }

  public async saveAndSchedule(settings: NotificationSettings): Promise<void> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
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
        every: 'day',
        on: { hour, minute },
      };
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title,
            body,
            schedule,
          },
        ],
      });
    } else if (frequency === 'weekly' && weekday) {
      const schedule: Schedule = {
        every: 'week',
        on: { weekday, hour, minute },
      };
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title,
            body,
            schedule,
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
        schedule: { at: fireDate },
      });
    }

    await LocalNotifications.schedule({ notifications });
  }
}
