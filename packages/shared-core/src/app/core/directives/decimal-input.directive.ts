import { Directive, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

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
    let value = input.value;

    // Reemplazar coma por punto
    value = value.replace(/,/g, '.');

    // Permitir solo un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Eliminar cualquier cosa que no sea número o punto
    value = value.replace(/[^0-9.]/g, '');

    // Aplicar límite de decimales en vivo
    if (this.maxDecimals !== null) {
      const dotIndex = value.indexOf('.');
      if (this.maxDecimals === 0) {
        // Sin decimales: eliminar el punto y todo lo que venga después
        if (dotIndex !== -1) {
          value = value.substring(0, dotIndex);
        }
      } else if (dotIndex !== -1) {
        // Limitar los decimales permitidos
        const intPart = value.substring(0, dotIndex);
        const decPart = value.substring(dotIndex + 1, dotIndex + 1 + this.maxDecimals);
        value = intPart + '.' + decPart;
      }
    }

    // Actualizar el valor en el input y en el control de Angular
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
    input.value = value;
  }
}
