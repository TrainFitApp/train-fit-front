const test = require("node:test");
const assert = require("node:assert/strict");

// Recordatorio de un suplemento (supplement-reminder.util.ts): avisos con
// fecha, solo los días que toca y sin el de hoy si ya está tomado.

let util;

test.before(async () => {
  util = await import("./supplement-reminder.util.ts");
});

// Lunes 12 de octubre de 2026, 10:00 en la zona del dispositivo.
const NOW = new Date(2026, 9, 12, 10, 0);
const daily = { startDate: "2026-10-01", endDate: null, weekdays: [] };

test("todos los días: hoy si aún no ha pasado la hora, y los siguientes", () => {
  const fires = util.reminderFireTimes(daily, { hour: 21, minute: 30 }, NOW, false, 3);
  assert.deepEqual(fires.map((f) => f.date), ["2026-10-12", "2026-10-13", "2026-10-14"]);
  assert.deepEqual([fires[0].at.getHours(), fires[0].at.getMinutes()], [21, 30]);
});

test("hoy no si ya ha pasado la hora o ya lo ha tomado", () => {
  assert.deepEqual(util.reminderFireTimes(daily, { hour: 8, minute: 0 }, NOW, false, 2).map((f) => f.date), ["2026-10-13"]);
  assert.deepEqual(util.reminderFireTimes(daily, { hour: 21, minute: 0 }, NOW, true, 2).map((f) => f.date), ["2026-10-13"]);
});

test("solo los días de la semana que toca y dentro de sus fechas", () => {
  const mondaysAndWednesdays = { startDate: "2026-10-01", endDate: "2026-10-19", weekdays: [1, 3] };
  const fires = util.reminderFireTimes(mondaysAndWednesdays, { hour: 21, minute: 0 }, NOW);
  assert.deepEqual(fires.map((f) => f.date), ["2026-10-12", "2026-10-14", "2026-10-19"]);

  const future = { startDate: "2026-10-15", endDate: null, weekdays: [] };
  assert.equal(util.reminderFireTimes(future, { hour: 21, minute: 0 }, NOW, false, 5)[0].date, "2026-10-15");
});

test("ids: uno por ranura y día, sin repetirse en la ventana", () => {
  const ids = util.reminderFireTimes(daily, { hour: 21, minute: 0 }, NOW).map((f) => util.reminderNotificationId(2, f.date));
  assert.equal(new Set(ids).size, util.REMINDER_DAYS_AHEAD);
  const slotIds = new Set(util.slotNotificationIds(2));
  assert.ok(ids.every((id) => slotIds.has(id)), "todos dentro de su ranura");
  assert.ok(util.slotNotificationIds(1).every((id) => !slotIds.has(id)), "las ranuras no se pisan");
  assert.equal(util.nextFreeSlot([0, 1, 3]), 2);
  assert.equal(util.nextFreeSlot([]), 0);
});

test("hora propuesta según el momento de la toma", () => {
  assert.deepEqual(util.defaultReminderTime("before_bed"), { hour: 22, minute: 30 });
  assert.deepEqual(util.defaultReminderTime("custom"), { hour: 9, minute: 0 });
});
