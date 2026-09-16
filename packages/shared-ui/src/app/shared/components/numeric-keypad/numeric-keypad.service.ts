import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';

// Atributo que NumericKeypadDirective pone en el host (<input> o
// <ion-input>) de cada campo que se edita con el teclado a medida. Es la
// única forma en que el servicio reconoce "sus" inputs.
export const NUMERIC_KEYPAD_ATTR = 'data-numeric-keypad';
const NUMERIC_KEYPAD_HOST_SELECTOR = `[${NUMERIC_KEYPAD_ATTR}]`;

/**
 * Puente entre el teclado a medida y el <input> nativo actualmente enfocado.
 * En vez de mantener un registro de instancias (frágil: los sets se
 * reordenan/añaden/eliminan en caliente), cada acción vuelve a resolver el
 * input activo contra document.activeElement y dispara un evento 'input'
 * real sobre él — así el pipeline que ya cuelga de ese evento (value
 * accessors de Angular/Ionic, appDecimalInput, (input) de cada pantalla) se
 * reutiliza tal cual, sin duplicar lógica ni guardar referencias.
 */
@Injectable({ providedIn: 'root' })
export class NumericKeypadService {
  private readonly visibleSubject = new BehaviorSubject<boolean>(false);
  public readonly visible$ = this.visibleSubject.asObservable();

  // El teclado a medida solo tiene sentido en nativo: en web (navegador de
  // escritorio o movil) se escribe con el teclado del sistema, asi que el
  // input conserva su inputmode y este componente no se muestra.
  public readonly enabled = Capacitor.isNativePlatform();

  public show(): void {
    if (!this.enabled) return;
    this.visibleSubject.next(true);
  }

  public hide(): void {
    this.visibleSubject.next(false);
  }

  // Se llama en (blur) del input; diferido un tick porque un blur por
  // "Siguiente" o por tocar otro input del teclado dispara focus en el
  // siguiente inmediatamente después — sin el defer, el teclado
  // parpadearía (hide + show) en cada salto entre inputs.
  public hideIfFocusLeftKeypadInputs(): void {
    setTimeout(() => {
      if (!this.isKeypadInput(document.activeElement)) {
        this.hide();
      }
    });
  }

  // Un input de solo lectura o deshabilitado no es editable aunque tenga la
  // marca: ni abre el teclado ni recibe pulsaciones.
  public isKeypadInput(element: Element | null): element is HTMLInputElement {
    return (
      element instanceof HTMLInputElement &&
      !element.readOnly &&
      !element.disabled &&
      !!element.closest(NUMERIC_KEYPAD_HOST_SELECTOR)
    );
  }

  private get activeInput(): HTMLInputElement | null {
    return this.isKeypadInput(document.activeElement) ? document.activeElement : null;
  }

  // Inputs nativos editables y visibles, en orden de documento. Para
  // <ion-input> el host no es el input: el nativo es el primer <input> que
  // Ionic pinta dentro (los clones de scroll-assist van después).
  private get keypadInputs(): HTMLInputElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>(NUMERIC_KEYPAD_HOST_SELECTOR))
      .map((host) => (host instanceof HTMLInputElement ? host : host.querySelector('input')))
      .filter(
        (input): input is HTMLInputElement =>
          this.isKeypadInput(input) && input.offsetParent !== null
      );
  }

  private dispatchInput(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  public appendChar(char: string): void {
    const input = this.activeInput;
    if (!input) return;
    if (input.maxLength >= 0 && input.value.length >= input.maxLength) return;
    this.dispatchInput(input, input.value + char);
  }

  public backspace(): void {
    const input = this.activeInput;
    if (!input) return;
    this.dispatchInput(input, input.value.slice(0, -1));
  }

  public hideKeyboard(): void {
    this.activeInput?.blur();
    this.hide();
  }

  // Para el click global del documento: cerrar el teclado si se interactúa
  // con cualquier cosa que NO sea otro input del teclado (ese caso ya lo
  // cubre su propio focus -> show(); cerrarlo aquí también pisaría esa
  // apertura, porque el click llega DESPUÉS del focus del nuevo input).
  public hideKeyboardIfInteractingElsewhere(target: EventTarget | null): void {
    if (target instanceof Element && target.closest(NUMERIC_KEYPAD_HOST_SELECTOR)) {
      return;
    }
    this.hideKeyboard();
  }

  // +1/-1 sobre el valor actual (no sobre la posición del cursor) — no
  // baja de 0, redondeado a 2 decimales para evitar el típico error de
  // coma flotante (12.5 - 1 = 11.499999999999998).
  public incrementValue(delta: number): void {
    const input = this.activeInput;
    if (!input) return;
    const current = parseFloat(input.value) || 0;
    const next = Math.max(0, Math.round((current + delta) * 100) / 100);
    this.dispatchInput(input, String(next));
  }

  // Salta al siguiente input del teclado en orden de documento (peso ->
  // reps de la misma serie, o al primer input de la siguiente si es el
  // último de su fila). Si no hay siguiente, oculta el teclado.
  public focusNext(): void {
    const input = this.activeInput;
    if (!input) return;
    const inputs = this.keypadInputs;
    const next = inputs[inputs.indexOf(input) + 1];
    if (next) {
      next.focus();
    } else {
      this.hideKeyboard();
    }
  }
}
