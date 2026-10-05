// Día de calendario ("YYYY-MM-DD") en la zona horaria del dispositivo.
//
// Nunca `toISOString().slice(0, 10)` para "hoy" ni para el día de un
// instante: eso es el día UTC, que en España va un día por detrás entre las
// 00:00 y las 02:00 y en América un día por delante cada tarde. Para sumar
// días a una fecha "YYYY-MM-DD" ya construida en UTC sí vale.
export function localIsoDate(date: Date | string | number = new Date()): string {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Zona horaria IANA del dispositivo ("Europe/Madrid"). Viaja en la cabecera
// X-Timezone de cada petición (jwt.interceptor.ts): con ella la API calcula
// el "hoy" de cada usuario, también cuando lo mira su entrenador.
export function deviceTimeZone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}
