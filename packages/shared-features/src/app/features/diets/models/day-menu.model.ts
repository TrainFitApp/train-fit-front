// El plan del cliente son MENÚS entre los que elige cada día (p. ej.
// "Entrenamiento"/"Descanso"). Este estado dice si hace falta preguntar hoy y
// con qué opciones. Para el 100% de los clientes sin plan activo,
// needsChoice es siempre false — no aparece ningún aviso.
export interface DayMenuStatus {
  needsChoice: boolean;
  selected: string | null;
  options: string[];
  // El profesional marcó ese día como saltado: no hay nada que elegir ni
  // nada pautado, y decirlo evita que el cliente lo intente.
  skipped?: boolean;
  // Qué hay en cada menú (solo lectura) para que el cliente lo vea antes de
  // elegir.
  previews?: DayMenuPreview[];
}

export interface DayMenuPreviewItem {
  name: string;
  quantity: number | null;
  unit: string;
}

// Una opción de una comida con varias (2+); `label` vacío = sin nombre puesto.
export interface DayMenuPreviewAlternative {
  label: string;
  items: DayMenuPreviewItem[];
}

export interface DayMenuPreview {
  name: string;
  meals: {
    name: string;
    // La 1ª opción: la que queda aplicada al elegir el menú.
    items: DayMenuPreviewItem[];
    // Solo cuando la comida tiene 2+ opciones (incluida la 1ª). Un back
    // anterior no lo manda.
    alternatives?: DayMenuPreviewAlternative[];
  }[];
}
