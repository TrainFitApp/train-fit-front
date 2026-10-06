// Estado de una fase (de dieta o de rutina) hoy, en la zona del cliente. Lo
// calcula el backend a partir de las fechas (components/util/phase-chain.js):
// la cadena de fases no guarda ningún estado.
export type PhaseState = 'scheduled' | 'current' | 'past';

// Orden de la cadena: por inicio y, con el mismo inicio, por creación.
export function compareChain(
  a: { startDate: string; createdAt?: string },
  b: { startDate: string; createdAt?: string }
): number {
  if (a.startDate !== b.startDate) return a.startDate < b.startDate ? -1 : 1;
  return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
}
