import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';

const NUMERIC_INPUT_SELECTOR = '.numeric-value-input';

/**
 * Puente entre el teclado a medida y el <input> nativo actualmente enfocado.
 * En vez de mantener un registro de instancias (frágil: los sets se
 * reordenan/añaden/eliminan en caliente), cada acción vuelve a resolver el
 * input activo contra document.activeElement y dispara un evento 'input'
 * real sobre él — así el pipeline de saneo/patch que ya vive en
 * NumericInputComponent.onInputChange() se reutiliza tal cual, sin
 * duplicar lógica ni guardar referencias a componentes.
 */
@Injectable({ providedIn: 'root' })
export class NumericKeypadService {
  private readonly visibleSubject = new BehaviorSubject<boolean>(false);
  public readonly visible$ = this.visibleSubject.asObservable();

  // El teclado a medida solo tiene sentido en nativo: en web (navegador de
  // escritorio o movil) se escribe con el teclado del sistema, asi que el
  // input deja de ser inputmode="none" y este componente no se muestra.
  public readonly enabled = Capacitor.isNativePlatform();

  public show(): void {
    if (!this.enabled) return;
    this.visibleSubject.next(true);
  }

  public hide(): void {
    this.visibleSubject.next(false);
  }

  // Se llama en (blur) del input; diferido un tick porque un blur por
  // "Siguiente" o por tocar otro numeric-input dispara focus en el
  // siguiente inmediatamente después — sin el defer, el teclado
  // parpadearía (hide + show) en cada salto entre inputs.
  public hideIfFocusLeftKeypadInputs(): void {
    setTimeout(() => {
      if (!this.isNumericInput(document.activeElement)) {
        this.hide();
      }
    });
  }

  private isNumericInput(element: Element | null): element is HTMLInputElement {
    return !!element && element instanceof HTMLInputElement && element.matches(NUMERIC_INPUT_SELECTOR);
  }

  private get activeInput(): HTMLInputElement | null {
    return this.isNumericInput(document.activeElement) ? document.activeElement : null;
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

  // Para (click) en el ion-content de la página: cerrar el teclado si se
  // interactúa con cualquier cosa que NO sea otro numeric-input (ese caso
  // ya lo cubre su propio (focus) -> show(); cerrarlo aquí también pisaría
  // esa apertura, porque el click llega DESPUÉS del focus del nuevo input).
  public hideKeyboardIfInteractingElsewhere(target: EventTarget | null): void {
    if (target instanceof Element && target.closest(NUMERIC_INPUT_SELECTOR)) {
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

  // Salta al siguiente .numeric-value-input en orden de documento (peso ->
  // reps de la misma serie, o al primer input de la siguiente si es el
  // último de su fila). Si no hay siguiente, oculta el teclado.
  public focusNext(): void {
    const input = this.activeInput;
    if (!input) return;
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>(NUMERIC_INPUT_SELECTOR));
    const next = inputs[inputs.indexOf(input) + 1];
    if (next) {
      next.focus();
    } else {
      this.hideKeyboard();
    }
  }
}
