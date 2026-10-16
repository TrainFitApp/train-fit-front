// PURO. Cuándo suena el recordatorio de un suplemento (supplement-reminder.service.ts).
//
// No es un aviso repetitivo del sistema (`on: { hour, minute }`): uno así
// sonaría también los días que no toca, después de terminar la pauta y el
// día que ya lo ha marcado como tomado. Se programan avisos con fecha para
// los próximos días y se rehacen al abrir la app.

export interface ReminderTime {
  hour: number;
  minute: number;
}

/** Lo que hace falta del suplemento para saber qué días toca. */
export interface ReminderSchedule {
  startDate: string;
  endDate: string | null;
  // Días de la semana (0 = domingo). Vacío = todos los días.
  weekdays?: number[];
}

export interface ReminderFire {
  date: string;
  at: Date;
}

/** Días hacia delante que se programan. Hay que abrir la app al menos una vez en ese plazo. */
export const REMINDER_DAYS_AHEAD = 14;

// Ids de notificación: cada recordatorio tiene una ranura fija y, dentro de
// ella, un id por día (día del calendario módulo 16, que no se repite en la
// ventana de 14). Así se cancela el aviso de hoy sin leer los pendientes.
// Fuera de los que usan el peso (1, 100-129), el descanso (999999) y la serie
// del entreno (888888).
const ID_BASE = 20000;
const IDS_PER_SLOT = 16;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function isoOf(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Id de la notificación de una ranura para un día "YYYY-MM-DD". */
export function reminderNotificationId(slot: number, date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  const dayNumber = Math.floor(Date.UTC(y, m - 1, d) / MS_PER_DAY);
  return ID_BASE + slot * IDS_PER_SLOT + (dayNumber % IDS_PER_SLOT);
}

/** Todos los ids posibles de una ranura: para cancelarla entera. */
export function slotNotificationIds(slot: number): number[] {
  return Array.from({ length: IDS_PER_SLOT }, (_, i) => ID_BASE + slot * IDS_PER_SLOT + i);
}

/** La primera ranura libre. */
export function nextFreeSlot(used: number[]): number {
  const taken = new Set(used);
  let slot = 0;
  while (taken.has(slot)) slot += 1;
  return slot;
}

/** Si el suplemento toca ese día (Date local). */
function appliesOn(schedule: ReminderSchedule, day: Date): boolean {
  const date = isoOf(day);
  if (date < schedule.startDate) return false;
  if (schedule.endDate && date > schedule.endDate) return false;
  const weekdays = schedule.weekdays || [];
  return !weekdays.length || weekdays.includes(day.getDay());
}

/**
 * Los avisos de los próximos `daysAhead` días (hoy incluido), a la hora
 * elegida en la zona del dispositivo: solo días que toca, solo a futuro y,
 * si ya lo ha marcado hoy, sin el de hoy.
 */
export function reminderFireTimes(
  schedule: ReminderSchedule,
  time: ReminderTime,
  now: Date,
  takenToday: boolean,
  daysAhead = REMINDER_DAYS_AHEAD
): ReminderFire[] {
  const fires: ReminderFire[] = [];
  for (let offset = 0; offset < daysAhead; offset += 1) {
    if (offset === 0 && takenToday) continue;
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, time.hour, time.minute, 0, 0);
    if (at.getTime() <= now.getTime() || !appliesOn(schedule, at)) continue;
    fires.push({ date: isoOf(at), at });
  }
  return fires;
}

// Hora que se propone al activar el recordatorio, según el momento de la
// toma. Para durante el entreno y "otro momento" no hay hora obvia.
const DEFAULT_TIMES: Record<string, ReminderTime> = {
  waking: { hour: 8, minute: 0 },
  breakfast: { hour: 8, minute: 30 },
  pre_workout: { hour: 17, minute: 30 },
  post_workout: { hour: 19, minute: 30 },
  with_meal: { hour: 14, minute: 0 },
  before_bed: { hour: 22, minute: 30 },
};

export function defaultReminderTime(timing: string): ReminderTime {
  return DEFAULT_TIMES[timing] || { hour: 9, minute: 0 };
}
