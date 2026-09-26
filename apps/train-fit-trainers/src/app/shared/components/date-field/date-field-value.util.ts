// PURO y sin imports: node:test lo carga directamente (date-field-value.test.js).
//
// ion-datetime emite ISO completo ("2026-09-26T10:30:00") aunque la
// presentación sea solo fecha u hora. Las pantallas trabajan con lo mismo que
// daba el <input> nativo: "YYYY-MM-DD" / "HH:mm", y '' si está vacío.
export function toDateValue(value: unknown): string {
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(String(value ?? ''));
  return match ? match[1] : '';
}

export function toTimeValue(value: unknown): string {
  const match = /(?:T|^)(\d{2}:\d{2})/.exec(String(value ?? ''));
  return match ? match[1] : '';
}
