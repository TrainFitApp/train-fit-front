import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { isDragGesture, scrollEdges, wheelScrollDelta } from './horizontal-scroll.util';

interface MouseDrag {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
  moved: boolean;
}

/**
 * Fila con scroll horizontal (overflow-x: auto) que se puede recorrer
 * también con ratón. Con el dedo o el trackpad ya se desliza sola, pero con
 * la barra oculta un ratón no tenía forma de llegar a lo que no cabe (los
 * chips de filtros en el panel lateral de 420px de trainers): la rueda
 * vertical pasa a mover la fila y se puede arrastrar con el botón pulsado.
 *
 * Marca el elemento con `is-scrollable-start` / `is-scrollable-end` mientras
 * quede contenido escondido por ese lado (para pintar el degradado que lo
 * avisa) y con `is-dragging` durante el arrastre.
 */
@Directive({ selector: '[appHorizontalScroll]' })
export class HorizontalScrollDirective implements OnInit, OnDestroy {
  private readonly cleanups: Array<() => void> = [];
  private resizeObserver?: ResizeObserver;
  private drag: MouseDrag | null = null;
  private suppressNextClick = false;

  constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly zone: NgZone
  ) {}

  public ngOnInit(): void {
    const row = this.element.nativeElement;
    // Fuera de la zona: rueda, scroll y movimiento disparan decenas de
    // eventos por segundo y ninguno cambia nada que pinte Angular.
    this.zone.runOutsideAngular(() => {
      this.listen(row, 'wheel', (event) => this.onWheel(event as WheelEvent), { passive: false });
      this.listen(row, 'scroll', () => this.updateEdges(), { passive: true });
      this.listen(row, 'pointerdown', (event) => this.onPointerDown(event as PointerEvent));
      this.listen(row, 'pointermove', (event) => this.onPointerMove(event as PointerEvent));
      this.listen(row, 'pointerup', (event) => this.onPointerEnd(event as PointerEvent));
      this.listen(row, 'pointercancel', (event) => this.onPointerEnd(event as PointerEvent));
      // En captura: tiene que llegar antes que el (click) del chip.
      this.listen(row, 'click', (event) => this.onClickCapture(event), { capture: true });

      if (typeof ResizeObserver !== 'undefined') {
        // También el contenido: un chip que aparece (Pautados) o cambia de
        // texto (Productos/Recetas) cambia lo que cabe sin cambiar la fila.
        this.resizeObserver = new ResizeObserver(() => this.updateEdges());
        this.resizeObserver.observe(row);
        if (row.firstElementChild) this.resizeObserver.observe(row.firstElementChild);
      }
    });
    this.updateEdges();
  }

  public ngOnDestroy(): void {
    this.cleanups.forEach((cleanup) => cleanup());
    this.resizeObserver?.disconnect();
  }

  private onWheel(event: WheelEvent): void {
    const delta = wheelScrollDelta(this.element.nativeElement, event);
    if (!delta) return;
    event.preventDefault();
    this.element.nativeElement.scrollLeft += delta;
  }

  private onPointerDown(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const row = this.element.nativeElement;
    const edges = scrollEdges(row);
    if (!edges.start && !edges.end) return;
    this.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: row.scrollLeft,
      moved: false,
    };
  }

  private onPointerMove(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const row = this.element.nativeElement;
    if (!drag.moved) {
      if (!isDragGesture(drag.startX, event.clientX)) return;
      drag.moved = true;
      // Sin captura el arrastre se cortaría al salir el puntero de la fila.
      row.setPointerCapture(event.pointerId);
      row.classList.add('is-dragging');
    }
    row.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
  }

  private onPointerEnd(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    this.drag = null;
    if (!drag.moved) return;
    this.element.nativeElement.classList.remove('is-dragging');
    // El click que sigue a soltar no es un toque al chip sobre el que acabó
    // el arrastre. Si el navegador no lo manda, se olvida en el siguiente
    // turno (pointerup, mouseup y click van en la misma tarea).
    this.suppressNextClick = true;
    setTimeout(() => (this.suppressNextClick = false));
  }

  private onClickCapture(event: Event): void {
    if (!this.suppressNextClick) return;
    this.suppressNextClick = false;
    event.preventDefault();
    event.stopPropagation();
  }

  private updateEdges(): void {
    const row = this.element.nativeElement;
    const edges = scrollEdges(row);
    row.classList.toggle('is-scrollable-start', edges.start);
    row.classList.toggle('is-scrollable-end', edges.end);
  }

  private listen(
    target: HTMLElement,
    type: string,
    handler: (event: Event) => void,
    options?: AddEventListenerOptions
  ): void {
    target.addEventListener(type, handler, options);
    this.cleanups.push(() => target.removeEventListener(type, handler, options));
  }
}
