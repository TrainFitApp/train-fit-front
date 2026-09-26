// PURO y sin imports: node:test lo carga directamente
// (instant-select-popover.test.js).
//
// Los desplegables (ion-select con interface="popover") se abren con la
// animación por defecto de Ionic: escalado de 300ms más un fundido de 150ms.
// Para una lista corta que se abre y se cierra decenas de veces al día es
// espera pura (PRODUCT.md: velocidad sobre ceremonia).
//
// Se aplica en ionPopoverWillPresent, que Ionic emite ANTES de construir la
// animación. `animated = false` recorta a 0 el escalado y el cierre, pero no
// el fundido de entrada: Ionic le fija sus 150ms al envoltorio por su cuenta.
// Ese se anula dejando el envoltorio ya opaco: un `opacity` inline con
// !important gana a una animación.

export interface SelectPopoverLike {
  animated: boolean;
  classList: { contains(name: string): boolean };
  shadowRoot: {
    querySelector(selector: string): {
      style: { setProperty(name: string, value: string, priority?: string): void };
    } | null;
  } | null;
}

/** true si era el desplegable de un ion-select y se ha vuelto instantáneo. */
export function makeSelectPopoverInstant(popover: SelectPopoverLike | null | undefined): boolean {
  if (!popover?.classList?.contains('select-popover')) return false;
  popover.animated = false;
  popover.shadowRoot?.querySelector('.popover-wrapper')?.style.setProperty('opacity', '1', 'important');
  return true;
}
