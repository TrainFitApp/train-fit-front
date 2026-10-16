import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import { TranslateService } from '@ngx-translate/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { firstValueFrom, Subject } from 'rxjs';
import { NotificationService } from 'src/app/core/services/util/notification.service';
import {
  registerNotificationActionTypes,
  SUPPLEMENT_ACTION_TYPE_ID,
  SUPPLEMENT_TAKEN_ACTION_ID,
} from 'src/app/core/services/util/notification-action-types';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import {
  nextFreeSlot,
  ReminderSchedule,
  reminderFireTimes,
  reminderNotificationId,
  ReminderTime,
  slotNotificationIds,
} from '../supplement-reminder.util';
import { MySupplement, MySupplementsApiService, SupplementIntakeResult } from './my-supplements-api.service';

/**
 * Lo guardado de un recordatorio. Se queda con una copia de lo que hace
 * falta para programarlo (nombre, dosis, fechas, días) porque la lista de
 * "hoy" no trae los que empiezan más adelante.
 */
interface StoredReminder extends ReminderTime, ReminderSchedule {
  slot: number;
  name: string;
  dose: string;
}

type ReminderStore = Record<string, StoredReminder>;

/** Lo que lleva cada notificación para que el botón "Tomado" sepa qué marcar. */
interface ReminderExtra {
  kind: 'supplement';
  supplementId: string;
  date: string;
}

const STORAGE_KEY = 'trainfit_supplement_reminders';
const CHANNEL_ID = 'trainfit-supplement-reminder';

/**
 * Recordatorio de la hora de toma de cada suplemento, propio o pautado. Como
 * el del peso: notificación local guardada en el móvil, sin pasar por el
 * backend, y solo en la app nativa.
 *
 * Programa avisos con fecha para los próximos días (supplement-reminder.util.ts)
 * y los rehace al abrir la app (`sync`): así no suena un día que no toca, ni
 * después de terminar la pauta, ni si ya está marcado como tomado. Un
 * suplemento que ya no aparece (quitado, terminado o de un profesional con
 * el que acabó la relación) pierde su recordatorio en el siguiente `sync`.
 */
@Injectable({ providedIn: 'root' })
export class SupplementReminderService {
  /** Tomas marcadas desde el botón de la notificación: Dietas las refleja si está abierta. */
  public readonly takenFromNotification$ = new Subject<SupplementIntakeResult>();

  private initialized = false;
  private store: ReminderStore | null = null;
  // En fila: un sync al volver a la app y un cambio desde la hoja no se cruzan.
  private chain: Promise<unknown> = Promise.resolve();

  constructor(
    private api: MySupplementsApiService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {}

  public get isSupported(): boolean {
    return Capacitor.isNativePlatform();
  }

  /** Canal, botón "Tomado" y escucha. Una vez por arranque. */
  public async initialize(): Promise<void> {
    if (!this.isSupported || this.initialized) return;
    this.initialized = true;
    try {
      await LocalNotifications.createChannel({
        id: CHANNEL_ID,
        name: this.translate.instant('LOCAL_NOTIFICATIONS.SUPPLEMENT_CHANNEL'),
        description: this.translate.instant('LOCAL_NOTIFICATIONS.SUPPLEMENT_CHANNEL_DESC'),
        importance: 4,
        vibration: true,
      });
    } catch {
      // iOS no tiene canales.
    }
    await registerNotificationActionTypes(this.translate).catch(() => undefined);
    await LocalNotifications.addListener('localNotificationActionPerformed', (action) => void this.handleAction(action));
  }

  /** La hora guardada de un suplemento, o null si no tiene recordatorio. */
  public async getReminder(supplementId: string): Promise<ReminderTime | null> {
    const reminder = (await this.load())[supplementId];
    return reminder ? { hour: reminder.hour, minute: reminder.minute } : null;
  }

  /**
   * Activa (o cambia la hora de) el recordatorio. False si el sistema no da
   * permiso para notificar. `takenToday`: si ya está marcado hoy.
   */
  public async setReminder(supplement: MySupplement, time: ReminderTime, takenToday: boolean): Promise<boolean> {
    if (!this.isSupported) return false;
    // Solo se piden si faltan: pedirlos en cada cambio de hora volvía a abrir
    // los ajustes de alarma exacta de Android.
    const { display } = await LocalNotifications.checkPermissions();
    if (display !== 'granted' && !(await this.notificationService.requestPermissions())) return false;
    await this.queue(async () => {
      const store = await this.load();
      const current = store[supplement._id];
      const slot = current?.slot ?? nextFreeSlot(Object.values(store).map((r) => r.slot));
      store[supplement._id] = { ...snapshot(supplement), ...time, slot };
      await this.save();
      await this.schedule(supplement._id, store[supplement._id], takenToday);
    });
    return true;
  }

  public async removeReminder(supplementId: string): Promise<void> {
    if (!this.isSupported) return;
    await this.queue(async () => {
      const store = await this.load();
      const reminder = store[supplementId];
      if (!reminder) return;
      await cancelSlot(reminder.slot);
      delete store[supplementId];
      await this.save();
    });
  }

  /** Al marcar o desmarcar hoy: quita el aviso de hoy, o lo vuelve a poner. */
  public async onTakenChanged(supplementId: string, date: string, taken: boolean): Promise<void> {
    if (!this.isSupported || date !== localIsoDate()) return;
    await this.queue(async () => {
      const reminder = (await this.load())[supplementId];
      if (!reminder) return;
      if (taken) await LocalNotifications.cancel({ notifications: [{ id: reminderNotificationId(reminder.slot, date) }] });
      else await this.schedule(supplementId, reminder, false);
    });
  }

  /**
   * Rehace todos los avisos con la lista de hoy: al abrir la app, al volver
   * a ella y tras cambiar un suplemento. Sin recordatorios no pide nada.
   */
  public async sync(): Promise<void> {
    if (!this.isSupported) return;
    await this.queue(async () => {
      const store = await this.load();
      const ids = Object.keys(store);
      if (!ids.length) return;
      const today = localIsoDate();
      // Sin conexión se queda lo programado la última vez.
      const supplements = await firstValueFrom(this.api.getMine(today)).catch(() => null);
      if (!supplements) return;
      const byId = new Map<string, MySupplement>(supplements.map((s) => [s._id, s]));
      for (const id of ids) {
        const supplement = byId.get(id);
        // Si hoy no sale y aún no ha empezado, se queda para cuando empiece,
        // pero solo si sigue existiendo ese día (lo pudo quitar él o su
        // profesional antes de empezar).
        if (!supplement && store[id].startDate > today && (await this.existsOn(id, store[id].startDate))) {
          await this.schedule(id, store[id], false);
          continue;
        }
        if (!supplement) {
          await cancelSlot(store[id].slot);
          delete store[id];
          continue;
        }
        store[id] = { ...store[id], ...snapshot(supplement) };
        await this.schedule(id, store[id], supplement.taken);
      }
      await this.save();
    });
  }

  /** Al cerrar sesión: que no suenen los de esta cuenta. Lo guardado se queda para cuando vuelva. */
  public async cancelScheduled(): Promise<void> {
    if (!this.isSupported) return;
    const store = await this.load();
    for (const reminder of Object.values(store)) await cancelSlot(reminder.slot);
  }

  private async existsOn(supplementId: string, date: string): Promise<boolean> {
    const supplements = await firstValueFrom(this.api.getMine(date)).catch(() => null);
    // Sin conexión no se borra nada: se decide en el siguiente sync.
    return !supplements || supplements.some((s) => s._id === supplementId);
  }

  private async schedule(supplementId: string, reminder: StoredReminder, takenToday: boolean): Promise<void> {
    await cancelSlot(reminder.slot);
    const title = `${reminder.name} · ${reminder.dose}`;
    const body = this.translate.instant('LOCAL_NOTIFICATIONS.SUPPLEMENT_REMINDER');
    const notifications: LocalNotificationSchema[] = reminderFireTimes(reminder, reminder, new Date(), takenToday).map(
      ({ date, at }) => {
        const extra: ReminderExtra = { kind: 'supplement', supplementId, date };
        return {
          id: reminderNotificationId(reminder.slot, date),
          title,
          body,
          schedule: { at, allowWhileIdle: true },
          channelId: CHANNEL_ID,
          actionTypeId: SUPPLEMENT_ACTION_TYPE_ID,
          extra,
        };
      }
    );
    if (!notifications.length) return;
    try {
      await LocalNotifications.schedule({ notifications });
    } catch (e) {
      console.warn('[SupplementReminderService] Error scheduling', e);
    }
  }

  // Botón "Tomado": marca el día del aviso, no el de hoy (puede pulsarlo
  // pasada la medianoche).
  private async handleAction(action: ActionPerformed): Promise<void> {
    const extra = action.notification.extra as ReminderExtra | undefined;
    if (extra?.kind !== 'supplement' || action.actionId !== SUPPLEMENT_TAKEN_ACTION_ID) return;
    // Pulsado con la app cerrada, la sesión puede estar aún renovándose:
    // se reintenta unos segundos antes de darlo por perdido.
    for (const delayMs of [0, 2000, 5000, 10000]) {
      if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));
      try {
        const result = await firstValueFrom(this.api.markTaken(extra.supplementId, extra.date));
        this.takenFromNotification$.next(result);
        return;
      } catch (e) {
        console.warn('[SupplementReminderService] Error marking taken', e);
      }
    }
  }

  private async load(): Promise<ReminderStore> {
    if (this.store) return this.store;
    try {
      const { value } = await SecureStoragePlugin.get({ key: STORAGE_KEY });
      this.store = value ? JSON.parse(value) : {};
    } catch {
      // Sin clave guardada, el plugin lanza.
      this.store = {};
    }
    return this.store!;
  }

  private async save(): Promise<void> {
    try {
      await SecureStoragePlugin.set({ key: STORAGE_KEY, value: JSON.stringify(this.store || {}) });
    } catch (e) {
      console.warn('[SupplementReminderService] Error saving', e);
    }
  }

  private queue(task: () => Promise<void>): Promise<void> {
    const run = this.chain.then(task);
    this.chain = run.catch(() => undefined);
    return run;
  }
}

function snapshot(supplement: MySupplement): Omit<StoredReminder, 'slot' | 'hour' | 'minute'> {
  return {
    name: supplement.name,
    dose: supplement.dose,
    startDate: supplement.startDate,
    endDate: supplement.endDate,
    weekdays: supplement.weekdays || [],
  };
}

async function cancelSlot(slot: number): Promise<void> {
  await LocalNotifications.cancel({ notifications: slotNotificationIds(slot).map((id) => ({ id })) }).catch(() => undefined);
}
