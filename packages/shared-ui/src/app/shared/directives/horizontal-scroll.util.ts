/** Lo que hace falta de la fila para decidir: su scroll y su tamaño. */
export interface HorizontalScrollBox {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
}

export interface HorizontalScrollWheel {
  deltaX: number;
  deltaY: number;
  deltaMode: number;
  ctrlKey?: boolean;
}

// WheelEvent.deltaMode: 0 píxeles, 1 líneas, 2 páginas.
const WHEEL_LINE_PX = 16;
// Con zoom o una densidad de píxeles fraccional, scrollLeft se queda en x.5
// del final y nunca llega a cuadrar exacto.
const EDGE_TOLERANCE_PX = 1;
// Lo que se puede mover el ratón con el botón pulsado sin que deje de ser un
// clic en el chip.
const DRAG_THRESHOLD_PX = 5;

/** Si queda contenido escondido a la izquierda (start) o a la derecha (end). */
export function scrollEdges(box: HorizontalScrollBox): { start: boolean; end: boolean } {
  const maxScroll = box.scrollWidth - box.clientWidth;
  if (maxScroll <= EDGE_TOLERANCE_PX) return { start: false, end: false };
  return {
    start: box.scrollLeft > EDGE_TOLERANCE_PX,
    end: box.scrollLeft < maxScroll - EDGE_TOLERANCE_PX,
  };
}

/**
 * Píxeles en horizontal que mueve la rueda vertical del ratón, o 0 si la fila
 * no debe quedarse el evento: gesto horizontal del trackpad (ya lo hace el
 * navegador), pellizco de zoom, fila que cabe entera o fila ya en el tope
 * hacia el que se gira.
 */
export function wheelScrollDelta(box: HorizontalScrollBox, wheel: HorizontalScrollWheel): number {
  if (wheel.ctrlKey) return 0;
  if (Math.abs(wheel.deltaX) >= Math.abs(wheel.deltaY)) return 0;
  const unit = wheel.deltaMode === 1 ? WHEEL_LINE_PX : wheel.deltaMode === 2 ? box.clientWidth : 1;
  const delta = wheel.deltaY * unit;
  const edges = scrollEdges(box);
  if (delta < 0 ? !edges.start : !edges.end) return 0;
  return delta;
}

/** Si el ratón se ha movido lo bastante con el botón pulsado para ser arrastre. */
export function isDragGesture(startX: number, currentX: number): boolean {
  return Math.abs(currentX - startX) > DRAG_THRESHOLD_PX;
}
