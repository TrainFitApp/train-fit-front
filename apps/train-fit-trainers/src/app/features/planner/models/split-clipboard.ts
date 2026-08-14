// Planificador visual (Fase C) — "Copiar semana"/"Pegar semana": clipboard
// cliente-side minúsculo, mismo espíritu que ExerciseClipboard
// (packages/shared-ui/.../models/exercise-clipboard.ts) pero sin snapshot de
// contenido — solo recuerda EL ID del split origen. "Pegar" reutiliza el
// endpoint de duplicar (addSplitToTable) con ese id, así que el contenido
// real siempre viene del backend, nunca queda desincronizado.
export class SplitClipboard {
  constructor(
    public readonly splitId: string,
    public readonly splitName: string
  ) {}
}
