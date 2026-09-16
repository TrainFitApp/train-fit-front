import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NUMERIC_KEYPAD_ATTR, NumericKeypadService } from './numeric-keypad.service';

// Ionic (input-shims, solo iOS) consume y borra este atributo en el focusin
// de cada <ion-input> para saltarse su scroll-assist esa vez. Nuestro
// focusin se registra antes que el suyo (el de Ionic llega tras hidratar el
// componente), así que ponerlo ahí en cada foco lo desactiva siempre: ese
// scroll-assist espera un keyboardDidShow nativo que con inputmode="none"
// nunca llega (hasta 1 s con el input clonado y fuera de pantalla), y aquí
// el desplazamiento ya lo hace scrollIntoView() con ion-app encogido.
const SKIP_IONIC_SCROLL_ASSIST_ATTR = 'data-ionic-skip-scroll-assist';

/**
 * Marca un <input> o <ion-input> numérico para editarlo con el teclado a
 * medida (app-numeric-keypad) en vez del teclado del sistema.
 *
 * En nativo: bloquea el teclado del sistema (inputmode="none"), pasa
 * type="number" a "text" (un type=number rechaza valores intermedios como
 * "12." al asignarlos por script, y el teclado escribe carácter a carácter;
 * el value accessor de Angular/Ionic se eligió en compilación por el type de
 * la plantilla, así que el control sigue recibiendo números) y abre/cierra
 * el teclado con el foco.
 *
 * En web (NumericKeypadService.enabled = false) no hace nada: el input
 * conserva su type/inputmode y se escribe con el teclado normal.
 */
@Directive({
  selector: 'input[appNumericKeypad], ion-input[appNumericKeypad]',
})
export class NumericKeypadDirective implements OnInit, OnDestroy {
  // Selector CSS del ancestro que se centra en pantalla al enfocar (por
  // defecto, el propio input). app-numeric-input lo usa para centrar la
  // serie entera en vez de solo la casilla.
  @Input('appNumericKeypadScrollTarget') scrollTargetSelector = '';

  private focused = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private numericKeypadService: NumericKeypadService
  ) {}

  ngOnInit(): void {
    if (!this.numericKeypadService.enabled) return;

    // Para <ion-input>, inputmode/type son props del web component que
    // Ionic vuelca en su <input> nativo; para <input> son las propiedades
    // DOM de siempre. Mismo nombre en ambos casos.
    const host = this.el.nativeElement as HTMLElement & {
      inputmode?: string;
      inputMode?: string;
      type?: string;
    };
    host.setAttribute(NUMERIC_KEYPAD_ATTR, '');
    if (host instanceof HTMLInputElement) {
      host.inputMode = 'none';
    } else {
      host.inputmode = 'none';
    }
    if (host.type === 'number') {
      host.type = 'text';
    }
  }

  // focusin/focusout (y no focus/blur) porque burbujean: en <ion-input> el
  // foco lo recibe el <input> nativo de dentro, no el host.
  @HostListener('focusin', ['$event.target'])
  onFocusIn(target: EventTarget | null): void {
    if (
      !this.numericKeypadService.enabled ||
      !this.numericKeypadService.isKeypadInput(target as Element | null)
    ) {
      return;
    }
    const input = target as HTMLInputElement;
    input.setAttribute(SKIP_IONIC_SCROLL_ASSIST_ATTR, 'true');
    this.focused = true;
    this.numericKeypadService.show();
    this.scrollIntoView(input);
  }

  @HostListener('focusout')
  onFocusOut(): void {
    if (!this.focused) return;
    this.focused = false;
    this.numericKeypadService.hideIfFocusLeftKeypadInputs();
  }

  // Un modal que se cierra con el input enfocado no siempre dispara blur:
  // sin esto el teclado se quedaría abierto sobre la pantalla de debajo.
  ngOnDestroy(): void {
    if (this.focused) {
      this.numericKeypadService.hideIfFocusLeftKeypadInputs();
    }
  }

  // ion-app se encoge al abrirse el teclado (ver global.scss); esperar un
  // frame para medir ya con el hueco del teclado descontado. Solo se
  // desplaza si el objetivo no cabe entero en el área visible: centrar
  // siempre movería el contenido bajo el dedo al tocar un campo visible.
  // iOS puede aplicar el cambio de tamaño con retraso; segundo intento.
  private scrollIntoView(input: HTMLInputElement): void {
    const target =
      (this.scrollTargetSelector &&
        input.closest<HTMLElement>(this.scrollTargetSelector)) ||
      this.el.nativeElement;

    const scrollIfHidden = () => {
      if (!this.focused) return;
      // Sin ion-content (p. ej. un modal con scroll propio) vale el ion-app
      // encogido: su borde inferior es justo donde empieza el teclado.
      const scroller = target.closest('ion-content') ?? target.closest('ion-app');
      if (!scroller) return;
      const bounds = scroller.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      if (rect.top >= bounds.top && rect.bottom <= bounds.bottom) return;
      try {
        target.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
      } catch {}
    };

    requestAnimationFrame(scrollIfHidden);
    setTimeout(scrollIfHidden, 220);
  }
}
