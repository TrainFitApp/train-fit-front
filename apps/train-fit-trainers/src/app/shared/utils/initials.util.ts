// PURO — iniciales del avatar: nombre y primer apellido («Ana Bermúdez
// López» → «AB»), igual que la app del cliente (coach-sheets-view#initials).
// QA 2026-10-09: la ficha cogía la última palabra («CQ») y «Aplicar
// plantilla» el apellido («CC») para la misma persona.
export function personInitials(...parts: Array<string | null | undefined>): string {
  const words = parts
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return (
    words
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase() || '?'
  );
}
