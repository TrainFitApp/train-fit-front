// PURO — qué rutina sale ya elegida al abrir «Programar rutina». QA
// 2026-10-09: con una sola rutina el selector arrancaba vacío y el botón
// deshabilitado sin decir por qué.

export interface SelectableRoutine {
  _id: string;
}

/** Con una sola rutina, esa; con varias, ninguna (que elija el profesional). */
export function initialRoutineSelection(tables: SelectableRoutine[] | null | undefined): string | null {
  return tables?.length === 1 ? tables[0]._id : null;
}
