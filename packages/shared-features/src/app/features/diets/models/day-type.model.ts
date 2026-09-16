// Fase 9 — cuando el plan activo del cliente tiene 2+ menús nombrados que el
// propio cliente elige cada día (p. ej. "Entrenamiento"/"Descanso"), este
// estado dice si hace falta preguntar hoy y con qué opciones. Para el 100%
// de los clientes sin un plan de este tipo, needsChoice es siempre false —
// no aparece ningún aviso.
export interface DayTypeStatus {
  needsChoice: boolean;
  selected: string | null;
  options: string[];
  // Ciclos por contenido — qué hay en cada menú (solo lectura) para que el
  // cliente lo vea antes de elegir.
  previews?: DayTypePreview[];
}

export interface DayTypePreview {
  name: string;
  meals: { name: string; items: { name: string; quantity: number | null; unit: string }[] }[];
}
