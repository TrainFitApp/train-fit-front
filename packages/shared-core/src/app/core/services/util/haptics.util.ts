// PURO: decide qué háptico toca, sin depender de Capacitor.

export type HapticKind = 'light' | 'medium' | 'success' | 'warning' | 'error';

/** Los toasts con color de éxito, aviso o error vibran; el resto no. */
export function hapticForToastColor(color?: string | null): HapticKind | null {
  if (color === 'success') return 'success';
  if (color === 'warning') return 'warning';
  if (color === 'danger') return 'error';
  return null;
}

const TYPING_INPUT_TYPES = new Set(['', 'text', 'search', 'email', 'password', 'number', 'tel', 'url']);

/** Solo campos de texto: un checkbox o un range también lanzan `input`. */
export function isTypingTarget(target: { tagName?: string; type?: string } | null | undefined): boolean {
  if (!target?.tagName) return false;
  const tag = target.tagName.toUpperCase();
  if (tag === 'TEXTAREA') return true;
  return tag === 'INPUT' && TYPING_INPUT_TYPES.has((target.type || '').toLowerCase());
}

/** Deja pasar como mucho una llamada cada `minGapMs` (teclear rápido no encadena vibraciones). */
export function createHapticThrottle(minGapMs: number, now: () => number = Date.now): () => boolean {
  let last = Number.NEGATIVE_INFINITY;
  return () => {
    const current = now();
    if (current - last < minGapMs) return false;
    last = current;
    return true;
  };
}
