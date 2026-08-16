import { Directive, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Saneo puro compartido: minúsculas + sin espacios (los emails no los llevan
 * en ningún punto, ni al principio/final ni en medio). Única fuente de
 * verdad para no reimplementar esta normalización en cada input de email del
 * front — coincide con `trim()+toLowerCase()` del backend
 * (components/util/normalize-email.js en train-fit-back).
 */
export function sanitizeEmailString(rawValue: string): string {
  return rawValue.toLowerCase().replace(/\s/g, '');
}

@Directive({
  selector: '[appLowercaseEmailInput]',
})
export class LowercaseEmailInputDirective {
  constructor(@Optional() @Self() private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;
    const normalized = sanitizeEmailString(rawValue);
    if (normalized === rawValue) return;

    // Reconstruye la posición del cursor contando cuántos caracteres se
    // eliminaron (espacios) antes de él, para que no salte al final tras
    // reescribir el valor — imprescindible al pegar un email con espacios
    // o mayúsculas en medio del texto ya escrito, no solo al final.
    const cursorPosition = input.selectionStart ?? normalized.length;
    const rawBeforeCursor = rawValue.slice(0, cursorPosition);
    const removedBeforeCursor =
      rawBeforeCursor.length - sanitizeEmailString(rawBeforeCursor).length;
    const newCursorPosition = Math.max(0, cursorPosition - removedBeforeCursor);

    input.value = normalized;
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(normalized, { emitEvent: false });
    }
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  }
}
