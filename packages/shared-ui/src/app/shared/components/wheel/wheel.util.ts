// Matemática de la rueda (app-wheel): del scroll al índice y vuelta. Sin DOM
// ni Angular, para poder probarla con node --test.

export interface WheelOption {
  label: string;
  // 'accent' pinta la opción en el naranja de marca (p. ej. FALLO) y 'muted'
  // la apaga (el hueco «-»); sin tono, el de los números.
  tone?: 'accent' | 'muted';
}

// Filas que se saltan con RePág/AvPág: las visibles menos la elegida.
const WHEEL_PAGE_STEP = 4;

export function clampWheelIndex(index: number, count: number): number {
  if (!Number.isFinite(index) || count <= 0) return 0;
  return Math.min(count - 1, Math.max(0, Math.round(index)));
}

// La fila que está en el centro es la que queda a `scrollTop / itemHeight`
// filas del principio: cada fila mide `itemHeight` y los rellenos de arriba y
// abajo dejan la primera y la última en el centro al llegar a los extremos.
export function wheelIndexFromScroll(scrollTop: number, itemHeight: number, count: number): number {
  if (!(itemHeight > 0)) return 0;
  return clampWheelIndex(scrollTop / itemHeight, count);
}

export function wheelScrollTop(index: number, itemHeight: number, count: number): number {
  return clampWheelIndex(index, count) * itemHeight;
}

// Fila a la que lleva una tecla, o null si la tecla no mueve la rueda.
export function wheelKeyTarget(key: string, current: number, count: number): number | null {
  switch (key) {
    case 'ArrowDown':
      return clampWheelIndex(current + 1, count);
    case 'ArrowUp':
      return clampWheelIndex(current - 1, count);
    case 'PageDown':
      return clampWheelIndex(current + WHEEL_PAGE_STEP, count);
    case 'PageUp':
      return clampWheelIndex(current - WHEEL_PAGE_STEP, count);
    case 'Home':
      return 0;
    case 'End':
      return clampWheelIndex(count - 1, count);
    default:
      return null;
  }
}
