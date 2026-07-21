import { Directive, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Saneo puro compartido: coma->punto, un solo punto decimal, solo dígitos/punto,
 * y truncado opcional de decimales. Única fuente de verdad usada tanto por esta
 * directiva como por `NumericInputComponent` (`app-numeric-input`), que antes
 * reimplementaba esta misma lógica de forma independiente.
 */
export function sanitizeDecimalString(
  rawValue: string,
  maxDecimals: number | null = null,
): string {
  let value = rawValue.replace(/,/g, '.');

  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }

  value = value.replace(/[^0-9.]/g, '');

  if (maxDecimals !== null) {
    const dotIndex = value.indexOf('.');
    if (maxDecimals === 0) {
      if (dotIndex !== -1) {
        value = value.substring(0, dotIndex);
      }
    } else if (dotIndex !== -1) {
      const intPart = value.substring(0, dotIndex);
      const decPart = value.substring(dotIndex + 1, dotIndex + 1 + maxDecimals);
      value = intPart + '.' + decPart;
    }
  }

  return value;
}

@Directive({
  selector: '[appDecimalInput]'
})
export class DecimalInputDirective {
  /** Max number of decimal places allowed. null = unlimited. 0 = integers only. */
  @Input() maxDecimals: number | null = null;

  constructor(@Optional() @Self() private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const value = sanitizeDecimalString(input.value, this.maxDecimals);

    // Actualizar el valor en el input y en el control de Angular
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
    input.value = value;
  }
}
