// Cuentas de la pantalla de consumo del asistente, sin Angular. Probado en
// assistant-usage-view.test.js.

/** "2026-10" desplazado `delta` meses (también al cruzar el año). */
export function shiftMonth(month: string, delta: number): string {
  const [year, monthNumber] = month.split('-').map(Number);
  const index = year * 12 + (monthNumber - 1) + delta;
  return `${Math.floor(index / 12)}-${String((index % 12) + 1).padStart(2, '0')}`;
}

/** Ancho de cada barra de la evolución (% del mes que más gastó; 0 sin gasto). */
export function historyBars<T extends { atp: number }>(history: T[]): (T & { width: number })[] {
  const max = Math.max(0, ...history.map((entry) => entry.atp || 0));
  return history.map((entry) => ({ ...entry, width: max ? Math.round(((entry.atp || 0) / max) * 100) : 0 }));
}
